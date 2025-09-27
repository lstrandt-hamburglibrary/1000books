// Notification Management System for 1000 Books Before Kindergarten
// Designed to be helpful but not annoying - focuses on weekly reminders

// Check if browser supports notifications
function checkNotificationSupport() {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications');
        return false;
    }
    if (!('serviceWorker' in navigator)) {
        console.log('Service Worker not supported');
        return false;
    }
    return true;
}

// Request notification permission
async function requestNotificationPermission() {
    if (!checkNotificationSupport()) return false;

    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        // Save permission status
        localStorage.setItem('notificationPermission', 'granted');

        // Show success message
        showToast('Notifications enabled! You\'ll get weekly reminders 📚');

        // Schedule initial notifications
        scheduleNotifications();

        return true;
    } else if (permission === 'denied') {
        localStorage.setItem('notificationPermission', 'denied');
        showToast('Notifications blocked. You can enable them in your browser settings.');
        return false;
    }

    return false;
}

// Schedule notifications based on user preferences
function scheduleNotifications() {
    const settings = getNotificationSettings();

    if (!settings.enabled) return;

    // Schedule weekly notifications
    scheduleWeeklyNotifications(settings);
}

// Schedule weekly notifications
function scheduleWeeklyNotifications(settings) {
    const now = new Date();
    const nextNotification = new Date();

    // Default to Sunday at the specified time
    const dayOfWeek = settings.backupReminderDay || 0; // 0 = Sunday
    const [hours, minutes] = settings.reminderTime.split(':').map(Number);

    // Find next occurrence of the specified day
    nextNotification.setHours(hours, minutes, 0, 0);

    // Calculate days until next notification day
    const daysUntilNotification = (dayOfWeek + 7 - now.getDay()) % 7;

    // If it's the notification day but time has passed, schedule for next week
    if (daysUntilNotification === 0 && nextNotification <= now) {
        nextNotification.setDate(nextNotification.getDate() + 7);
    } else if (daysUntilNotification > 0) {
        nextNotification.setDate(nextNotification.getDate() + daysUntilNotification);
    }

    const timeUntilNotification = nextNotification - now;

    // Clear any existing scheduled notification
    if (window.notificationTimeout) {
        clearTimeout(window.notificationTimeout);
    }

    // Schedule the notification
    window.notificationTimeout = setTimeout(() => {
        determineAndShowNotification(settings);
        // Reschedule for next week
        scheduleWeeklyNotifications(settings);
    }, timeUntilNotification);

    console.log(`Next notification scheduled for ${nextNotification.toLocaleString()}`);
}

// Determine which notification to show
async function determineAndShowNotification(settings) {
    const lastBackup = localStorage.getItem('lastBackupTime');
    const lastBackupDate = lastBackup ? new Date(lastBackup) : null;
    const daysSinceBackup = lastBackupDate ?
        Math.floor((Date.now() - lastBackupDate) / (1000 * 60 * 60 * 24)) : 999;

    // Priority 1: Backup reminder (if more than 7 days or never backed up)
    if (settings.backupReminders && daysSinceBackup >= 7) {
        await showBackupReminder();
    }
    // Priority 2: Weekly reading summary
    else if (settings.weeklyProgress) {
        await showWeeklySummary();
    }
}

// Show backup reminder notification
async function showBackupReminder() {
    if (Notification.permission !== 'granted') return;

    const registration = await navigator.serviceWorker.ready;
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const childName = localStorage.getItem('childName') || 'your child';

    registration.showNotification('📱 Time to Backup Reading Progress', {
        body: `${childName} has read ${books.length} books! Tap to backup your reading log and keep it safe.`,
        icon: './icon-192.png',
        badge: './icon-96.png',
        tag: 'backup-reminder',
        requireInteraction: true,
        vibrate: [200, 100, 200],
        actions: [
            {
                action: 'backup',
                title: 'Backup Now'
            },
            {
                action: 'later',
                title: 'Remind Later'
            }
        ],
        data: {
            type: 'backup-reminder',
            timestamp: Date.now()
        }
    });
}

// Show weekly reading summary
async function showWeeklySummary() {
    if (Notification.permission !== 'granted') return;

    const registration = await navigator.serviceWorker.ready;
    const stats = getWeeklyStats();
    const childName = localStorage.getItem('childName') || 'Your reader';

    let title = `📚 ${childName}'s Weekly Reading Summary`;
    let body = '';

    if (stats.booksThisWeek === 0) {
        body = `No books logged this week. Let's get back to reading! Total: ${stats.totalBooks}/1000 books`;
    } else if (stats.booksThisWeek === 1) {
        body = `1 book read this week! Total progress: ${stats.totalBooks}/1000 books`;
    } else {
        body = `${stats.booksThisWeek} books read this week! Amazing! Total: ${stats.totalBooks}/1000 books`;
    }

    // Add milestone notifications
    if (stats.totalBooks >= 900 && stats.totalBooks < 1000) {
        body += ` - Almost there! Only ${1000 - stats.totalBooks} books to go!`;
    } else if (stats.totalBooks % 100 === 0 && stats.totalBooks > 0) {
        body += ` - Milestone reached! 🎉`;
    }

    registration.showNotification(title, {
        body: body,
        icon: './icon-192.png',
        badge: './icon-96.png',
        tag: 'weekly-summary',
        vibrate: [200, 100, 200],
        actions: [
            {
                action: 'view',
                title: 'View Progress'
            },
            {
                action: 'add',
                title: 'Add Book'
            }
        ],
        data: {
            type: 'weekly-summary',
            timestamp: Date.now()
        }
    });
}

// Get weekly reading statistics
function getWeeklyStats() {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const booksThisWeek = books.filter(book =>
        new Date(book.dateAdded) >= oneWeekAgo
    ).length;

    return {
        booksThisWeek,
        totalBooks: books.length
    };
}

// Get notification settings
function getNotificationSettings() {
    const defaultSettings = {
        enabled: false,
        backupReminders: true,      // Weekly backup reminders
        weeklyProgress: false,       // Weekly progress summary
        reminderTime: '10:00',       // Time of day for notifications
        backupReminderDay: 0,        // 0 = Sunday, 1 = Monday, etc.
    };

    const saved = localStorage.getItem('notificationSettings');
    if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
    }

    return defaultSettings;
}

// Save notification settings
function saveNotificationSettings(settings) {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));

    // Reschedule notifications with new settings
    if (settings.enabled && Notification.permission === 'granted') {
        scheduleNotifications();
    }
}

// Test notification - let user choose which type
async function testNotification(type = 'backup') {
    if (Notification.permission !== 'granted') {
        const granted = await requestNotificationPermission();
        if (!granted) return;
    }

    if (type === 'backup') {
        await showBackupReminder();
    } else if (type === 'summary') {
        await showWeeklySummary();
    }
}

// Initialize notification system
function initNotifications() {
    if (!checkNotificationSupport()) {
        console.log('Notifications not supported');
        return;
    }

    // Check if we have permission and schedule notifications
    if (Notification.permission === 'granted') {
        const settings = getNotificationSettings();
        if (settings.enabled) {
            scheduleNotifications();
        }
    }

    // Listen for visibility change to reschedule if needed
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const settings = getNotificationSettings();
            if (settings.enabled && Notification.permission === 'granted') {
                scheduleNotifications();
            }
        }
    });
}

// Export functions for use in main app
window.notificationManager = {
    init: initNotifications,
    requestPermission: requestNotificationPermission,
    scheduleNotifications: scheduleNotifications,
    testNotification: testNotification,
    getSettings: getNotificationSettings,
    saveSettings: saveNotificationSettings,
    getWeeklyStats: getWeeklyStats
};
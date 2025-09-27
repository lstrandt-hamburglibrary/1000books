// Notification Management System for 1000 Books Before Kindergarten

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
        showToast('Notifications enabled! You\'ll get daily reading reminders 📚');

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

    // For now, we'll use local notifications
    // In a production app, you'd use a backend service for push notifications
    scheduleLocalNotifications(settings);
}

// Schedule local notifications (using setTimeout for demo)
function scheduleLocalNotifications(settings) {
    const now = new Date();
    const scheduledTime = new Date();

    // Parse the reminder time (e.g., "09:00")
    const [hours, minutes] = settings.reminderTime.split(':').map(Number);
    scheduledTime.setHours(hours, minutes, 0, 0);

    // If the time has already passed today, schedule for tomorrow
    if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime - now;

    // Clear any existing scheduled notification
    if (window.notificationTimeout) {
        clearTimeout(window.notificationTimeout);
    }

    // Schedule the notification
    window.notificationTimeout = setTimeout(() => {
        showLocalNotification(settings);
        // Reschedule for the next day
        scheduleLocalNotifications(settings);
    }, timeUntilNotification);

    console.log(`Notification scheduled for ${scheduledTime.toLocaleString()}`);
}

// Show a local notification
async function showLocalNotification(settings) {
    if (Notification.permission !== 'granted') return;

    const registration = await navigator.serviceWorker.ready;

    // Get reading statistics
    const stats = getReadingStats();
    const messages = getNotificationMessage(stats, settings);

    // Show notification through service worker
    registration.showNotification(messages.title, {
        body: messages.body,
        icon: './icon-192.png',
        badge: './icon-96.png',
        tag: 'reading-reminder',
        requireInteraction: settings.requireInteraction || false,
        vibrate: [200, 100, 200],
        actions: [
            {
                action: 'read',
                title: 'Start Reading'
            },
            {
                action: 'later',
                title: 'Remind Later'
            }
        ],
        data: {
            type: 'daily-reminder',
            timestamp: Date.now()
        }
    });
}

// Get personalized notification message based on progress
function getNotificationMessage(stats, settings) {
    const childName = localStorage.getItem('childName') || 'Little Reader';
    const messages = {
        title: '',
        body: ''
    };

    // Check for streak
    if (stats.currentStreak > 0) {
        messages.title = `${stats.currentStreak} Day Streak! Keep it up, ${childName}! 🔥`;
    } else {
        messages.title = `Reading Time, ${childName}! 📚`;
    }

    // Personalized body message
    if (stats.booksToday === 0) {
        messages.body = `Let's read your first book today! ${stats.totalBooks}/1000 books so far.`;
    } else if (stats.booksToday < settings.dailyGoal) {
        messages.body = `${stats.booksToday} book${stats.booksToday > 1 ? 's' : ''} today! ${settings.dailyGoal - stats.booksToday} more to reach your goal.`;
    } else {
        messages.body = `Amazing! You've reached today's goal! Total: ${stats.totalBooks}/1000 📖`;
    }

    return messages;
}

// Get reading statistics
function getReadingStats() {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    const today = new Date().toDateString();

    const booksToday = books.filter(book =>
        new Date(book.dateAdded).toDateString() === today
    ).length;

    const totalBooks = books.length;
    const currentStreak = calculateReadingStreak(books);

    return {
        booksToday,
        totalBooks,
        currentStreak
    };
}

// Calculate reading streak
function calculateReadingStreak(books) {
    if (books.length === 0) return 0;

    const booksByDate = {};
    books.forEach(book => {
        const date = new Date(book.dateAdded).toDateString();
        booksByDate[date] = true;
    });

    let streak = 0;
    let checkDate = new Date();

    while (booksByDate[checkDate.toDateString()]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
    }

    // Check if streak was broken (yesterday has no books)
    checkDate = new Date();
    checkDate.setDate(checkDate.getDate() - 1);
    if (streak === 0 && booksByDate[checkDate.toDateString()]) {
        // Count previous streak
        while (booksByDate[checkDate.toDateString()]) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        }
        // But mark it as broken
        streak = 0;
    }

    return streak;
}

// Get notification settings
function getNotificationSettings() {
    const defaultSettings = {
        enabled: false,
        reminderTime: '09:00',
        dailyGoal: 3,
        requireInteraction: false,
        soundEnabled: true,
        weekendReminders: true
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

// Test notification
async function testNotification() {
    if (Notification.permission !== 'granted') {
        const granted = await requestNotificationPermission();
        if (!granted) return;
    }

    const registration = await navigator.serviceWorker.ready;
    registration.showNotification('Test Notification 🎉', {
        body: 'Great! Notifications are working. You\'ll get daily reading reminders.',
        icon: './icon-192.png',
        badge: './icon-96.png',
        vibrate: [200, 100, 200]
    });
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
    getStats: getReadingStats
};
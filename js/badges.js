// Badges and Achievements System

const badges = [
    // Milestone Badges
    { id: 'first-book', name: 'First Steps', icon: '👶', description: 'Read your first book!', requirement: 1 },
    { id: 'ten-books', name: 'Bookworm', icon: '🐛', description: 'Read 10 books', requirement: 10 },
    { id: 'twenty-five', name: 'Page Turner', icon: '📖', description: 'Read 25 books', requirement: 25 },
    { id: 'fifty-books', name: 'Story Hunter', icon: '🏹', description: 'Read 50 books', requirement: 50 },
    { id: 'hundred-books', name: 'Century Reader', icon: '💯', description: 'Read 100 books', requirement: 100 },
    { id: 'two-fifty', name: 'Book Champion', icon: '🏆', description: 'Read 250 books', requirement: 250 },
    { id: 'five-hundred', name: 'Super Reader', icon: '🦸', description: 'Read 500 books', requirement: 500 },
    { id: 'seven-fifty', name: 'Book Master', icon: '🎓', description: 'Read 750 books', requirement: 750 },
    { id: 'thousand', name: 'Reading Legend', icon: '👑', description: 'Read 1000 books!', requirement: 1000 },

    // Streak Badges
    { id: 'week-streak', name: 'Week Warrior', icon: '🗓️', description: '7 day reading streak', requirement: 7, type: 'streak' },
    { id: 'month-streak', name: 'Monthly Master', icon: '📅', description: '30 day reading streak', requirement: 30, type: 'streak' },

    // Special Badges
    { id: 'night-owl', name: 'Night Owl', icon: '🦉', description: 'Read 10 bedtime books', requirement: 10, type: 'special' },
    { id: 'early-bird', name: 'Early Bird', icon: '🐦', description: 'Read in the morning 5 days', requirement: 5, type: 'special' },
    { id: 'favorite-fan', name: 'Favorite Fan', icon: '⭐', description: 'Mark 10 favorite books', requirement: 10, type: 'favorites' },
    { id: 'variety-reader', name: 'Variety Reader', icon: '🌈', description: 'Read books by 20 different authors', requirement: 20, type: 'authors' },
    { id: 're-reader', name: 'Re-Reader', icon: '🔄', description: 'Re-read 5 books', requirement: 5, type: 'rereads' },
];

// Check for new badges after adding a book
function checkForNewBadges() {
    const earnedBadges = getEarnedBadges();
    const savedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');

    earnedBadges.forEach(badgeId => {
        if (!savedBadges.includes(badgeId)) {
            savedBadges.push(badgeId);
            const badge = badges.find(b => b.id === badgeId);
            if (badge) {
                showBadgeNotification(badge);
            }
        }
    });

    localStorage.setItem('earnedBadges', JSON.stringify(savedBadges));
}

// Get list of earned badges
function getEarnedBadges() {
    const earned = [];
    const bookCount = appState.books.length;

    // Milestone badges
    badges.filter(b => !b.type || b.type === 'milestone').forEach(badge => {
        if (bookCount >= badge.requirement) {
            earned.push(badge.id);
        }
    });

    // Streak badges
    if (appState.currentStreak >= 7) earned.push('week-streak');
    if (appState.currentStreak >= 30) earned.push('month-streak');

    // Favorites badge
    const favoriteCount = appState.books.filter(b => b.isFavorite).length;
    if (favoriteCount >= 10) earned.push('favorite-fan');

    // Authors variety badge
    const uniqueAuthors = new Set(appState.books.filter(b => b.author).map(b => b.author)).size;
    if (uniqueAuthors >= 20) earned.push('variety-reader');

    // Re-reads badge (simple check for duplicate titles)
    const titleCounts = {};
    appState.books.forEach(book => {
        titleCounts[book.title] = (titleCounts[book.title] || 0) + 1;
    });
    const rereadCount = Object.values(titleCounts).filter(count => count > 1).length;
    if (rereadCount >= 5) earned.push('re-reader');

    return earned;
}

// Display badges page
function displayBadges() {
    const badgesList = document.getElementById('badgesList');
    const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges') || '[]');

    badgesList.innerHTML = badges.map(badge => {
        const isEarned = earnedBadges.includes(badge.id);
        return `
            <div class="badge-card ${isEarned ? 'earned' : 'locked'}">
                <div class="badge-icon">${badge.icon}</div>
                <div class="badge-name">${badge.name}</div>
                <div class="badge-description">${badge.description}</div>
                ${!isEarned && badge.requirement ? `
                    <div style="margin-top: 0.5rem; font-size: 0.8rem;">
                        ${getProgressText(badge)}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// Get progress text for locked badges
function getProgressText(badge) {
    const bookCount = appState.books.length;

    if (badge.type === 'streak') {
        return `Current: ${appState.currentStreak}/${badge.requirement} days`;
    } else if (badge.type === 'favorites') {
        const favoriteCount = appState.books.filter(b => b.isFavorite).length;
        return `Progress: ${favoriteCount}/${badge.requirement}`;
    } else if (badge.type === 'authors') {
        const uniqueAuthors = new Set(appState.books.filter(b => b.author).map(b => b.author)).size;
        return `Progress: ${uniqueAuthors}/${badge.requirement} authors`;
    } else {
        return `Progress: ${bookCount}/${badge.requirement} books`;
    }
}

// Show badge notification
function showBadgeNotification(badge) {
    // Create a special badge notification
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            z-index: 2000;
            animation: bounceIn 0.5s;
        ">
            <h2 style="color: var(--secondary); margin-bottom: 1rem;">🎉 New Badge Earned! 🎉</h2>
            <div style="font-size: 4rem; margin: 1rem 0;">${badge.icon}</div>
            <h3 style="color: var(--text); margin-bottom: 0.5rem;">${badge.name}</h3>
            <p style="color: var(--text-light);">${badge.description}</p>
            <button onclick="this.closest('.badge-notification').remove()" style="
                margin-top: 1rem;
                padding: 0.75rem 2rem;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                font-weight: 600;
            ">Awesome! 🌟</button>
        </div>
        <style>
            @keyframes bounceIn {
                0% { transform: translate(-50%, -50%) scale(0); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        </style>
    `;
    document.body.appendChild(notification);
}
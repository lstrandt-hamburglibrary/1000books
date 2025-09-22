// Main App JavaScript - Core functionality

// App State
let appState = {
    currentPage: 'dashboard',
    user: {
        childName: 'Little Reader',
        birthDate: '',
        dailyGoal: 3
    },
    books: [],
    currentStreak: 0,
    longestStreak: 0,
    totalDaysActive: 0
};

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    loadAppData();
    // initializeEventListeners(); // Moved to init.js
    updateDashboard();
    setTodaysDate();
    showPage('dashboard');
});

// Navigation
function initializeEventListeners() {
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const page = this.dataset.page;
            showPage(page);
        });
    });

    // Settings button
    document.getElementById('settingsBtn').addEventListener('click', function() {
        openSettingsModal();
    });

    // Close modal
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeSettingsModal();
        });
    }

    // Also close when clicking outside modal
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('settingsModal');
        if (event.target === modal) {
            closeSettingsModal();
        }
    });

    // Save settings
    document.getElementById('saveSettings').addEventListener('click', saveSettings);

    // Export data
    document.getElementById('exportData').addEventListener('click', exportData);

    // Clear data
    document.getElementById('clearData').addEventListener('click', clearAllData);

    // Add book form
    document.getElementById('addBookForm').addEventListener('submit', handleAddBook);

    // Rating buttons
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Search books
    document.getElementById('searchBooks').addEventListener('input', searchBooks);

    // Sort books
    document.getElementById('sortBooks').addEventListener('change', sortBooks);

    // Suggestion categories
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.suggestion-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            showSuggestions(this.dataset.category);
        });
    });

    // Game cards
    document.querySelectorAll('.game-card .play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const game = this.closest('.game-card').dataset.game;
            launchGame(game);
        });
    });
}

// Make functions globally available
window.updateDashboard = updateDashboard;
window.showPage = showPage;
window.showToast = showToast;
window.saveAppData = saveAppData;
window.handleAddBook = handleAddBook;
window.showSuggestions = showSuggestions;
window.launchGame = launchGame;
window.quickAddBook = quickAddBook;

// Show Page
function showPage(pageName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });

    // Show page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageName).classList.add('active');

    // Page-specific updates
    switch(pageName) {
        case 'dashboard':
            updateDashboard();
            break;
        case 'add-book':
            updateQuickAddList();
            break;
        case 'library':
            displayLibrary();
            break;
        case 'badges':
            displayBadges();
            break;
    }

    appState.currentPage = pageName;
}

// Add Book Handler
function handleAddBook(e) {
    e.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const readDate = document.getElementById('readDate').value;
    const notes = document.getElementById('notes').value;
    const isFavorite = document.getElementById('isFavorite').checked;

    const selectedRating = document.querySelector('.rating-btn.selected');
    const rating = selectedRating ? selectedRating.dataset.rating : 'like';

    const book = {
        id: Date.now(),
        title,
        author,
        readDate,
        notes,
        rating,
        isFavorite,
        addedDate: new Date().toISOString()
    };

    appState.books.push(book);
    saveAppData();

    // Check for new badges
    checkForNewBadges();

    // Show success message
    showToast(`"${title}" added to your library! 📚`);

    // Reset form
    document.getElementById('addBookForm').reset();
    document.querySelectorAll('.rating-btn').forEach(btn => btn.classList.remove('selected'));

    // Update dashboard
    updateDashboard();

    // Switch to dashboard
    showPage('dashboard');
}

// Quick Add Books
function updateQuickAddList() {
    const quickAddList = document.getElementById('quickAddList');

    // Get unique recent books
    const recentBooks = [...new Set(appState.books.slice(-10).map(b => b.title))]
        .slice(0, 6);

    if (recentBooks.length === 0) {
        quickAddList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No recent books yet!</p>';
        return;
    }

    quickAddList.innerHTML = recentBooks.map(title => `
        <button class="quick-add-btn" onclick="quickAddBook('${title.replace(/'/g, "\\'")}')">
            📖 ${title}
        </button>
    `).join('');
}

// Quick Add Book Function
function quickAddBook(title) {
    const book = {
        id: Date.now(),
        title,
        author: '',
        readDate: new Date().toISOString().split('T')[0],
        notes: 'Quick re-read!',
        rating: 'like',
        isFavorite: false,
        addedDate: new Date().toISOString()
    };

    appState.books.push(book);
    saveAppData();
    checkForNewBadges();
    showToast(`"${title}" re-read added! 📚`);
    updateDashboard();
    showPage('dashboard');
}

// Dashboard Updates
function updateDashboard() {
    // Update book count
    const bookCount = appState.books.length;
    document.getElementById('bookCount').textContent = bookCount;

    // Update progress circle
    const progressCircle = document.getElementById('progressCircle');
    const percentage = Math.min((bookCount / 1000) * 100, 100);
    const offset = 565 - (565 * percentage) / 100;
    progressCircle.style.strokeDashoffset = offset;

    // Update stats
    updateStats();

    // Update recent books
    displayRecentBooks();
}

// Update Statistics
function updateStats() {
    const bookCount = appState.books.length;

    // Books this week
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const booksThisWeek = appState.books.filter(book =>
        new Date(book.readDate) >= weekAgo
    ).length;

    // Favorites
    const favoriteCount = appState.books.filter(book => book.isFavorite).length;

    // Calculate streak
    calculateReadingStreak();

    // Update DOM
    document.getElementById('booksThisWeek').textContent = booksThisWeek;
    document.getElementById('favoriteCount').textContent = favoriteCount;
    document.getElementById('currentStreak').textContent = appState.currentStreak;
    document.getElementById('daysActive').textContent = appState.totalDaysActive;
}

// Calculate Reading Streak
function calculateReadingStreak() {
    if (appState.books.length === 0) {
        appState.currentStreak = 0;
        appState.totalDaysActive = 0;
        return;
    }

    // Get unique reading days
    const readingDays = [...new Set(appState.books.map(book => book.readDate))].sort().reverse();
    appState.totalDaysActive = readingDays.length;

    // Calculate current streak
    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (readingDays[0] === today || readingDays[0] === yesterdayStr) {
        streak = 1;
        let checkDate = new Date(readingDays[0]);

        for (let i = 1; i < readingDays.length; i++) {
            checkDate.setDate(checkDate.getDate() - 1);
            if (readingDays[i] === checkDate.toISOString().split('T')[0]) {
                streak++;
            } else {
                break;
            }
        }
    }

    appState.currentStreak = streak;
}

// Display Recent Books
function displayRecentBooks() {
    const recentBooksList = document.getElementById('recentBooksList');
    const recentBooks = appState.books.slice(-10).reverse();

    if (recentBooks.length === 0) {
        recentBooksList.innerHTML = '<p style="color: var(--text-light);">No books added yet. Start your reading journey!</p>';
        return;
    }

    recentBooksList.innerHTML = recentBooks.map(book => `
        <div class="book-card">
            <div class="book-card-title">${book.title}</div>
            <div class="book-card-date">${formatDate(book.readDate)}</div>
            ${book.isFavorite ? '⭐' : ''}
        </div>
    `).join('');
}

// Display Library
function displayLibrary() {
    const libraryList = document.getElementById('libraryList');

    if (appState.books.length === 0) {
        libraryList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">Your library is empty. Add your first book!</p>';
        return;
    }

    const books = [...appState.books].reverse();

    libraryList.innerHTML = books.map(book => `
        <div class="library-book">
            <h3>${book.title}</h3>
            ${book.author ? `<p style="color: var(--text-light); font-size: 0.9rem;">by ${book.author}</p>` : ''}
            <p style="margin: 0.5rem 0;">
                ${getRatingEmoji(book.rating)}
                ${book.isFavorite ? '⭐ Favorite' : ''}
            </p>
            <p style="color: var(--text-light); font-size: 0.85rem;">Read: ${formatDate(book.readDate)}</p>
            ${book.notes ? `<p style="margin-top: 0.5rem; font-size: 0.9rem;">"${book.notes}"</p>` : ''}
        </div>
    `).join('');
}

// Search Books
function searchBooks(e) {
    const searchTerm = e.target.value.toLowerCase();
    const books = appState.books.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );

    const libraryList = document.getElementById('libraryList');

    if (books.length === 0) {
        libraryList.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-light);">No books found matching your search.</p>';
        return;
    }

    libraryList.innerHTML = books.reverse().map(book => `
        <div class="library-book">
            <h3>${book.title}</h3>
            ${book.author ? `<p style="color: var(--text-light); font-size: 0.9rem;">by ${book.author}</p>` : ''}
            <p style="margin: 0.5rem 0;">
                ${getRatingEmoji(book.rating)}
                ${book.isFavorite ? '⭐ Favorite' : ''}
            </p>
            <p style="color: var(--text-light); font-size: 0.85rem;">Read: ${formatDate(book.readDate)}</p>
        </div>
    `).join('');
}

// Sort Books
function sortBooks(e) {
    const sortBy = e.target.value;
    let sortedBooks = [...appState.books];

    switch(sortBy) {
        case 'title':
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'author':
            sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
            break;
        case 'rating':
            const ratingOrder = { love: 3, like: 2, okay: 1 };
            sortedBooks.sort((a, b) => ratingOrder[b.rating] - ratingOrder[a.rating]);
            break;
        case 'recent':
        default:
            sortedBooks.reverse();
            break;
    }

    const libraryList = document.getElementById('libraryList');
    libraryList.innerHTML = sortedBooks.map(book => `
        <div class="library-book">
            <h3>${book.title}</h3>
            ${book.author ? `<p style="color: var(--text-light); font-size: 0.9rem;">by ${book.author}</p>` : ''}
            <p style="margin: 0.5rem 0;">
                ${getRatingEmoji(book.rating)}
                ${book.isFavorite ? '⭐ Favorite' : ''}
            </p>
            <p style="color: var(--text-light); font-size: 0.85rem;">Read: ${formatDate(book.readDate)}</p>
        </div>
    `).join('');
}

// Settings Modal
function openSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.add('show');

    // Load current settings
    document.getElementById('dailyGoal').value = appState.user.dailyGoal;

    // Update children list if family features are loaded
    if (typeof updateChildrenList === 'function') {
        updateChildrenList();
    }
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('show');
}

function saveSettings() {
    appState.user.dailyGoal = parseInt(document.getElementById('dailyGoal').value) || 3;

    saveAppData();
    showToast('Settings saved! ✅');
    closeSettingsModal();
}

// Data Management
function saveAppData() {
    localStorage.setItem('bookwormJourney', JSON.stringify(appState));
}

function loadAppData() {
    const savedData = localStorage.getItem('bookwormJourney');
    if (savedData) {
        appState = JSON.parse(savedData);
        // Child name is now handled by the family sync system
    }
}

function exportData() {
    const dataStr = JSON.stringify(appState, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookworm-journey-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    showToast('Data exported! 📥');
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone!')) {
        localStorage.removeItem('bookwormJourney');
        location.reload();
    }
}

// Utility Functions
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function getRatingEmoji(rating) {
    const emojis = {
        love: '😍',
        like: '😊',
        okay: '😐'
    };
    return emojis[rating] || '😊';
}

function setTodaysDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('readDate').value = today;
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
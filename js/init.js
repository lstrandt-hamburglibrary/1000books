// Initialization script to ensure everything loads properly

console.log('BookWorm Journey - Initializing...');

// Wait for everything to be ready
window.addEventListener('load', function() {
    console.log('Window loaded, initializing app...');

    // Initialize settings button
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');

    if (settingsBtn && settingsModal) {
        console.log('Settings button found, adding listener...');

        settingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Settings clicked!');
            settingsModal.classList.add('show');

            // Call the update functions if they exist
            if (typeof updateChildrenList === 'function') {
                updateChildrenList();
            }
        });

        // Close button
        const closeBtn = settingsModal.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                console.log('Close clicked!');
                settingsModal.classList.remove('show');
            });
        }

        // Click outside to close
        settingsModal.addEventListener('click', function(e) {
            if (e.target === settingsModal) {
                settingsModal.classList.remove('show');
            }
        });
    } else {
        console.error('Settings button or modal not found!');
    }

    // Initialize navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');

    console.log(`Found ${navButtons.length} nav buttons and ${pages.length} pages`);

    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.dataset.page;
            console.log('Navigation clicked:', targetPage);

            // Remove active from all buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active to clicked button
            this.classList.add('active');

            // Hide all pages
            pages.forEach(page => page.classList.remove('active'));
            // Show target page
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                console.log('Showed page:', targetPage);
            } else {
                console.error('Page not found:', targetPage);
            }
        });
    });

    // Initialize other buttons
    const addChildBtn = document.getElementById('addChildBtn');
    if (addChildBtn) {
        addChildBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Add child clicked');
            if (typeof addNewChild === 'function') {
                addNewChild();
            }
        });
    }

    const connectFamilyBtn = document.getElementById('connectFamily');
    if (connectFamilyBtn) {
        connectFamilyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Connect family clicked');
            if (typeof connectToFamily === 'function') {
                connectToFamily();
            }
        });
    }

    const syncNowBtn = document.getElementById('syncNow');
    if (syncNowBtn) {
        syncNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Sync now clicked');
            if (typeof syncFamilyData === 'function') {
                syncFamilyData();
            }
        });
    }

    const saveSettingsBtn = document.getElementById('saveSettings');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Save settings clicked');
            const dailyGoal = document.getElementById('dailyGoal').value;
            if (appState) {
                appState.user.dailyGoal = parseInt(dailyGoal) || 3;
                if (typeof saveAppData === 'function') {
                    saveAppData();
                }
            }
            if (typeof showToast === 'function') {
                showToast('Settings saved! ✅');
            }
            settingsModal.classList.remove('show');
        });
    }

    // Initialize form handlers
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Form submitted');
            if (typeof handleAddBook === 'function') {
                handleAddBook(e);
            }
        });
    }

    // Initialize rating buttons
    document.querySelectorAll('.rating-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Initialize suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.suggestion-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (typeof showSuggestions === 'function') {
                showSuggestions(this.dataset.category);
            }
        });
    });

    // Initialize game cards
    document.querySelectorAll('.game-card .play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const game = this.closest('.game-card').dataset.game;
            if (typeof launchGame === 'function') {
                launchGame(game);
            }
        });
    });

    console.log('App initialization complete!');
});
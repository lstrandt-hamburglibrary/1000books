// Coming Soon Features for 1000 Books Before Kindergarten
// This file contains placeholders and UI for upcoming features

// Feature categories with their upcoming features
const comingSoonFeatures = {
    reading: {
        title: "📚 Reading & Book Management",
        features: [
            {
                name: "Book Scanner",
                icon: "📷",
                description: "Scan book barcodes to quickly add books",
                priority: "high",
                status: "planned"
            },
            {
                name: "Reading Timer",
                icon: "⏱️",
                description: "Track reading time for each session",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Book Series",
                icon: "📚",
                description: "Group books in series together",
                priority: "low",
                status: "planned"
            },
            {
                name: "Favorites List",
                icon: "⭐",
                description: "Mark and re-read favorite books easily",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Reading Streaks",
                icon: "🔥",
                description: "Track consecutive reading days",
                priority: "high",
                status: "in-progress"
            }
        ]
    },
    engagement: {
        title: "👨‍👩‍👧‍👦 Parent/Child Features",
        features: [
            {
                name: "Multiple Profiles",
                icon: "👶",
                description: "Support multiple children in one app",
                priority: "high",
                status: "planned"
            },
            {
                name: "Voice Recording",
                icon: "🎙️",
                description: "Record child reading their favorite books",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Photo Memories",
                icon: "📸",
                description: "Attach photos to each book read",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Progress Sharing",
                icon: "📊",
                description: "Beautiful reports to share with family",
                priority: "low",
                status: "planned"
            }
        ]
    },
    games: {
        title: "🎮 Educational Games",
        features: [
            {
                name: "Phonics Practice",
                icon: "🔤",
                description: "Letter sounds matching game",
                priority: "high",
                status: "planned",
                placeholder: "phonicsGame"
            },
            {
                name: "Rhyme Time",
                icon: "🎵",
                description: "Find rhyming words game",
                priority: "medium",
                status: "planned",
                placeholder: "rhymeGame"
            },
            {
                name: "Story Sequencing",
                icon: "📖",
                description: "Put story events in order",
                priority: "medium",
                status: "planned",
                placeholder: "sequenceGame"
            },
            {
                name: "Character Quiz",
                icon: "🤔",
                description: "Remember story character details",
                priority: "low",
                status: "planned",
                placeholder: "characterQuiz"
            },
            {
                name: "Drawing Pad",
                icon: "🎨",
                description: "Draw favorite book scenes",
                priority: "medium",
                status: "planned",
                placeholder: "drawingPad"
            }
        ]
    },
    social: {
        title: "🌟 Social & Community",
        features: [
            {
                name: "Reading Buddies",
                icon: "👫",
                description: "Connect with other families",
                priority: "low",
                status: "planned"
            },
            {
                name: "Friend Recommendations",
                icon: "💭",
                description: "See what friends are reading",
                priority: "low",
                status: "planned"
            },
            {
                name: "Library Integration",
                icon: "🏛️",
                description: "Check book availability at library",
                priority: "medium",
                status: "research"
            },
            {
                name: "Monthly Challenges",
                icon: "🏆",
                description: "Themed reading challenges",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Leaderboards",
                icon: "📈",
                description: "Friendly competition (optional)",
                priority: "low",
                status: "planned"
            }
        ]
    },
    analytics: {
        title: "📊 Analytics & Insights",
        features: [
            {
                name: "Stats Dashboard",
                icon: "📈",
                description: "Detailed reading statistics",
                priority: "high",
                status: "planned"
            },
            {
                name: "Milestone Predictions",
                icon: "🎯",
                description: "Predict when you'll reach 1000 books",
                priority: "medium",
                status: "planned"
            },
            {
                name: "Genre Tracker",
                icon: "📚",
                description: "Track reading diversity",
                priority: "low",
                status: "planned"
            },
            {
                name: "Reading Level",
                icon: "📏",
                description: "Track book complexity over time",
                priority: "low",
                status: "planned"
            }
        ]
    }
};

// Create Coming Soon UI
function createComingSoonUI() {
    const container = document.createElement('div');
    container.innerHTML = `
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px;">🚀 Coming Soon Features</h2>
            <p style="margin-bottom: 20px; color: #666;">
                Exciting features in development! Tap any feature to learn more.
            </p>
            ${Object.entries(comingSoonFeatures).map(([key, category]) => `
                <div style="margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px; color: #667eea;">${category.title}</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
                        ${category.features.map(feature => `
                            <div onclick="showFeatureDetails('${feature.name}', '${feature.description}')"
                                 style="
                                    padding: 15px;
                                    background: ${getStatusColor(feature.status)};
                                    border-radius: 10px;
                                    text-align: center;
                                    cursor: pointer;
                                    transition: transform 0.2s;
                                    position: relative;
                                 "
                                 onmouseover="this.style.transform='scale(1.05)'"
                                 onmouseout="this.style.transform='scale(1)'">
                                <div style="font-size: 2rem; margin-bottom: 5px;">${feature.icon}</div>
                                <div style="font-size: 0.9rem; font-weight: bold;">${feature.name}</div>
                                ${feature.status === 'in-progress' ?
                                    '<span style="position: absolute; top: 5px; right: 5px; background: #ffc107; color: white; padding: 2px 5px; border-radius: 5px; font-size: 0.7rem;">IN PROGRESS</span>' :
                                    ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    return container;
}

// Get status color for feature cards
function getStatusColor(status) {
    switch(status) {
        case 'in-progress': return 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)';
        case 'research': return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
        case 'planned': return 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)';
        default: return 'linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)';
    }
}

// Show feature details
function showFeatureDetails(name, description) {
    showToast(`${name}: ${description}`, 3000);
}

// Create placeholder game cards for coming soon games
function createComingSoonGameCard(game) {
    return `
        <div class="game-card coming-soon-game" style="
            background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
            opacity: 0.8;
            position: relative;
            overflow: hidden;
        ">
            <div style="
                position: absolute;
                top: 10px;
                right: 10px;
                background: #ff9800;
                color: white;
                padding: 5px 10px;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: bold;
            ">COMING SOON</div>
            <h3>${game.icon} ${game.name}</h3>
            <p style="font-size: 0.9rem; color: #666;">${game.description}</p>
            <p style="font-size: 0.8rem; color: #999; margin-top: 10px;">
                Status: ${game.status === 'in-progress' ? '🔨 In Development' : '📋 Planned'}
            </p>
            <button class="game-btn" disabled style="
                background: #ccc;
                cursor: not-allowed;
                opacity: 0.5;
            ">Not Available Yet</button>
        </div>
    `;
}

// Add coming soon section to dashboard
function addComingSoonToDashboard() {
    const quickStats = document.querySelector('.quick-stats');
    if (quickStats) {
        const comingSoonBanner = document.createElement('div');
        comingSoonBanner.innerHTML = `
            <div style="
                margin-top: 20px;
                padding: 15px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 10px;
                text-align: center;
                cursor: pointer;
            " onclick="showPage('coming-soon')">
                <h3 style="margin-bottom: 5px;">🚀 New Features Coming!</h3>
                <p style="margin: 0; font-size: 0.9rem;">Tap to see what's in development</p>
            </div>
        `;
        quickStats.parentElement.insertBefore(comingSoonBanner, quickStats.nextSibling);
    }
}

// Add placeholders to add book page
function addBookPagePlaceholders() {
    const addBookForm = document.querySelector('#add-book form');
    if (addBookForm) {
        const scannerPlaceholder = document.createElement('div');
        scannerPlaceholder.innerHTML = `
            <div style="
                margin-bottom: 20px;
                padding: 20px;
                background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
                border-radius: 10px;
                text-align: center;
                border: 2px dashed #999;
            ">
                <div style="font-size: 2rem; margin-bottom: 10px;">📷</div>
                <h4>Barcode Scanner Coming Soon!</h4>
                <p style="color: #666; font-size: 0.9rem;">
                    Soon you'll be able to scan book barcodes to add them instantly
                </p>
                <button class="submit-btn" disabled style="
                    background: #ccc;
                    cursor: not-allowed;
                    opacity: 0.5;
                ">Scanner Not Available Yet</button>
            </div>
        `;
        addBookForm.parentElement.insertBefore(scannerPlaceholder, addBookForm);
    }
}

// Initialize coming soon features
function initComingSoon() {
    // Add to dashboard after a short delay
    setTimeout(() => {
        addComingSoonToDashboard();
        addBookPagePlaceholders();
        addLibraryPlaceholders();
        addDashboardFeatures();
    }, 1000);
}

// Add features to dashboard
function addDashboardFeatures() {
    const dashboard = document.getElementById('dashboard');
    if (dashboard) {
        // Add reading streak indicator placeholder
        const streakPlaceholder = document.createElement('div');
        streakPlaceholder.innerHTML = `
            <div style="
                margin: 20px 0;
                padding: 15px;
                background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
                color: white;
                border-radius: 10px;
                text-align: center;
            ">
                <h3>🔥 Reading Streaks Coming Soon!</h3>
                <p style="margin: 5px 0; font-size: 0.9rem;">
                    Track consecutive reading days and earn rewards
                </p>
            </div>
        `;

        const quickStats = dashboard.querySelector('.quick-stats');
        if (quickStats) {
            quickStats.parentElement.insertBefore(streakPlaceholder, quickStats);
        }
    }
}

// Add placeholders to library page
function addLibraryPlaceholders() {
    const library = document.getElementById('library');
    if (library && !library.querySelector('.series-placeholder')) {
        const seriesPlaceholder = document.createElement('div');
        seriesPlaceholder.className = 'series-placeholder';
        seriesPlaceholder.innerHTML = `
            <div style="
                margin-bottom: 20px;
                padding: 15px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                border-radius: 10px;
                text-align: center;
            ">
                <h4>📚 Book Series Tracking Coming Soon!</h4>
                <p style="margin: 5px 0; font-size: 0.9rem;">
                    Group books by series and track your progress
                </p>
            </div>
        `;

        const libraryHeader = library.querySelector('h2');
        if (libraryHeader) {
            libraryHeader.insertAdjacentElement('afterend', seriesPlaceholder);
        }
    }
}

// Export for use in main app
window.comingSoon = {
    init: initComingSoon,
    features: comingSoonFeatures,
    createUI: createComingSoonUI,
    showDetails: showFeatureDetails
};
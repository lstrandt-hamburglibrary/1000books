// Coming Soon Features for 1000 Books Before Kindergarten
// This file contains placeholders and UI for upcoming features
// All features listed here CAN be implemented on GitHub Pages (no backend required)

// Feature categories with their upcoming features
const comingSoonFeatures = {
    reading: {
        title: "📚 Reading & Book Management",
        features: [
            {
                name: "Reading Timer",
                icon: "⏱️",
                description: "Track reading time for each session",
                priority: "medium",
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
                name: "Book Search",
                icon: "🔍",
                description: "Search and filter your library",
                priority: "high",
                status: "planned"
            }
        ]
    },
    engagement: {
        title: "👨‍👩‍👧‍👦 Parent/Child Features",
        features: [
            {
                name: "Progress Reports",
                icon: "📊",
                description: "Create beautiful reports to share",
                priority: "high",
                status: "planned",
                note: "PDF/image generation"
            },
            {
                name: "Reading Certificates",
                icon: "🏆",
                description: "Generate achievement certificates",
                priority: "medium",
                status: "planned",
                note: "Printable awards"
            },
            {
                name: "Reading Calendar",
                icon: "📅",
                description: "Visual calendar of reading history",
                priority: "medium",
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
            }
        ]
    },
    sharing: {
        title: "🌟 Sharing & Backup",
        features: [
            {
                name: "Family Sharing",
                icon: "👨‍👩‍👧‍👦",
                description: "Share progress via codes",
                priority: "medium",
                status: "planned",
                note: "Uses shareable links"
            },
            {
                name: "Library Lookup",
                icon: "🏛️",
                description: "Check book availability",
                priority: "medium",
                status: "research",
                note: "Uses OpenLibrary API"
            },
            {
                name: "Export Options",
                icon: "💾",
                description: "Multiple backup formats",
                priority: "high",
                status: "planned",
                note: "JSON, CSV, PDF exports"
            },
            {
                name: "QR Code Sharing",
                icon: "📱",
                description: "Share progress via QR codes",
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
                All features below can be implemented without a server - they work entirely in your browser!
            </p>
            <div style="margin-bottom: 20px; padding: 15px; background: #e8f5e9; border-radius: 10px; border: 2px solid #4caf50;">
                <strong style="color: #2e7d32;">✅ No Backend Required!</strong>
                <p style="margin: 5px 0 0 0; color: #2e7d32;">
                    Every feature here works with GitHub Pages using browser storage,
                    free APIs, and client-side JavaScript.
                </p>
            </div>
            ${Object.entries(comingSoonFeatures).map(([key, category]) => `
                <div style="margin-bottom: 30px;">
                    <h3 style="margin-bottom: 15px; color: #667eea;">${category.title}</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
                        ${category.features.map(feature => `
                            <div onclick="showFeatureDetails('${feature.name}', '${feature.description}', '${feature.note || ''}')"
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
                                ${feature.note ?
                                    '<div style="font-size: 0.7rem; margin-top: 5px; opacity: 0.8;">💡 ' + feature.note + '</div>' :
                                    ''}
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
function showFeatureDetails(name, description, note) {
    const message = note ? `${name}: ${description}\n💡 ${note}` : `${name}: ${description}`;
    showToast(message, 3000);
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
    // Placeholder function - scanner removed
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
    // Currently no dashboard placeholders needed since streaks already exist
    // This function kept for future dashboard enhancements
}

// Library placeholders removed - all features now available!
function addLibraryPlaceholders() {
    // Series tracking placeholder removed
}

// Export for use in main app
window.comingSoon = {
    init: initComingSoon,
    features: comingSoonFeatures,
    createUI: createComingSoonUI,
    showDetails: showFeatureDetails
};
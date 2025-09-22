// Mobile Safari Touch Event Fixes

console.log('Mobile fix loading...');

// Detect if iOS Safari
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if (isIOS || isSafari) {
    console.log('iOS/Safari detected, applying fixes...');
}

// Fix for iOS touch events
document.addEventListener('DOMContentLoaded', function() {

    // Add touchstart events for better mobile response
    function addTouchEvent(element, handler) {
        if (element) {
            // Remove any existing listeners
            element.removeEventListener('click', handler);
            element.removeEventListener('touchstart', handler);

            // Add both click and touchstart
            element.addEventListener('click', handler, false);
            element.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Prevent double-firing
                handler.call(this, e);
            }, {passive: false});
        }
    }

    // Fix settings button
    setTimeout(() => {
        const settingsBtn = document.getElementById('settingsBtn');
        if (settingsBtn) {
            console.log('Fixing settings button for mobile...');

            addTouchEvent(settingsBtn, function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Settings tapped!');
                const modal = document.getElementById('settingsModal');
                if (modal) {
                    modal.style.display = 'flex';
                    modal.classList.add('show');
                }
            });
        }

        // Fix navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            addTouchEvent(button, function(e) {
                e.preventDefault();
                e.stopPropagation();

                const targetPage = this.dataset.page;
                console.log('Nav tapped:', targetPage);

                // Remove active from all
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Hide all pages
                document.querySelectorAll('.page').forEach(page => {
                    page.style.display = 'none';
                    page.classList.remove('active');
                });

                // Show target page
                const target = document.getElementById(targetPage);
                if (target) {
                    target.style.display = 'block';
                    target.classList.add('active');
                }
            });
        });

        // Fix modal close button
        const closeBtn = document.querySelector('.close');
        if (closeBtn) {
            addTouchEvent(closeBtn, function(e) {
                e.preventDefault();
                const modal = document.getElementById('settingsModal');
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('show');
                }
            });
        }

        // Fix all other buttons
        document.querySelectorAll('button').forEach(button => {
            // Add cursor pointer for iOS
            button.style.cursor = 'pointer';

            // Add webkit tap highlight
            button.style.webkitTapHighlightColor = 'rgba(0,0,0,0.1)';
        });

        console.log('Mobile fixes applied!');
    }, 100); // Small delay to ensure DOM is ready
});

// Add CSS fixes for iOS
const style = document.createElement('style');
style.textContent = `
    /* iOS Safari Fixes */
    * {
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
    }

    button, .nav-btn, .icon-btn {
        cursor: pointer !important;
        -webkit-appearance: none !important;
        touch-action: manipulation !important;
    }

    /* Fix for iOS button styling */
    input, textarea, button, select {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
    }

    /* Ensure clickable elements are large enough for touch */
    button, .nav-btn {
        min-height: 44px;
        min-width: 44px;
    }

    /* Fix modal display on iOS */
    .modal.show {
        display: flex !important;
    }

    /* Fix page display */
    .page.active {
        display: block !important;
    }
`;
document.head.appendChild(style);
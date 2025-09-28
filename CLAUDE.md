# Project: 1000 Books Before Kindergarten

## Commit Guidelines
- ALWAYS add a version number to commit messages
- Version format: vX.Y.Z (e.g., v3.7.3)
- Increment versions as follows:
  - Patch (Z): Bug fixes, minor tweaks (v3.7.2 → v3.7.3)
  - Minor (Y): New features, improvements (v3.7.2 → v3.8.0)
  - Major (X): Breaking changes, major redesigns (v3.7.2 → v4.0.0)

## Update Notifications
- The app has a service worker that checks for updates
- When pushing changes, the VERSION constant in index.html should be updated
- This triggers the update notification in the PWA
- Users will see "Update Available! Tap to refresh" notification

## Important Files
- index.html: Main app file containing all functionality (line 30: window.APP_VERSION)
- sw.js: Service worker - handles caching and update notifications
- manifest.json: PWA manifest configuration
- VERSION constant: Located in index.html line 30, controls update detection

## Development Workflow
1. Make changes to code
2. Update VERSION constant in index.html
3. Commit with version number in message
4. Push to GitHub
5. PWA will detect update and notify users

## Testing Commands
- No specific test framework currently set up
- Manual testing in browser/PWA required

## Code Style
- Single-file application (all code in index.html)
- No external dependencies or frameworks
- Pure vanilla JavaScript, HTML, CSS
- Mobile-first design for parents tracking children's reading

## Features
- Track multiple children's reading progress
- Capture book covers via camera
- Gamification with badges and milestones
- Works offline as a PWA
- Data stored in localStorage

## Deployment
- Hosted on GitHub Pages
- Updates deploy automatically on push to main branch
- PWA updates typically appear within minutes to hours
- Repository: https://github.com/lstrandt-hamburglibrary/1000books
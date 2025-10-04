// Service Worker for 1000 Books Before Kindergarten
const VERSION = '3.15.1';
const CACHE_NAME = `1000books-v${VERSION}`;
const BYPASS_CACHE = true; // Always bypass cache to ensure updates are seen

const urlsToCache = [
  './',
  './index.html',
  './js/bookSuggestions.js',
  './js/games.js',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css'
];

// Install service worker
self.addEventListener('install', event => {
  console.log('Installing service worker version:', VERSION);
  // Force new service worker to activate immediately
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch from cache when offline
self.addEventListener('fetch', event => {
  // For HTML files, always fetch fresh to check for updates
  if (event.request.url.includes('.html') || event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Only use cache as fallback when offline
        return caches.match(event.request);
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch new
        if (response && !BYPASS_CACHE) {
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Clone the response because it can only be used once
          const responseToCache = response.clone();

          // Cache the new resource
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch(() => {
          // Return offline fallback if available
          return caches.match('./index.html');
        });
      })
  );
});

// Clean up old caches and notify clients
self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      }),
      // Take control of all clients immediately
      clients.claim()
    ]).then(() => {
      // Notify all clients about the update
      clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({
            type: 'UPDATE_AVAILABLE',
            version: VERSION
          });
        });
      });
    })
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: 'Time for today\'s reading adventure! 📚',
    icon: './icon-192.png',
    badge: './icon-96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'read',
        title: 'Start Reading',
        icon: './icon-96.png'
      },
      {
        action: 'later',
        title: 'Remind Later',
        icon: './icon-96.png'
      }
    ]
  };

  if (event.data) {
    const data = event.data.json();
    options.body = data.body || options.body;
    options.title = data.title || 'Reading Time!';
    if (data.tag) options.tag = data.tag;
    if (data.requireInteraction) options.requireInteraction = true;
  } else {
    options.title = 'Reading Time!';
  }

  event.waitUntil(
    self.registration.showNotification(options.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'backup') {
    // Open settings page for backup
    event.waitUntil(
      clients.openWindow('./?page=settings#backup')
    );
  } else if (event.action === 'view') {
    // View progress dashboard
    event.waitUntil(
      clients.openWindow('./?page=dashboard')
    );
  } else if (event.action === 'add' || event.action === 'read') {
    // Open the app to add a book
    event.waitUntil(
      clients.openWindow('./?page=add-book')
    );
  } else if (event.action === 'later') {
    // Just close for now - they'll get reminded next week
    event.waitUntil(
      clients.openWindow('./')
    );
  } else {
    // Default click - open app
    event.waitUntil(
      clients.openWindow('./')
    );
  }
});
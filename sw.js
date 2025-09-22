// Service Worker for BookWorm Journey
const VERSION = '1.0.1';
const CACHE_NAME = `bookworm-v${VERSION}`;

const urlsToCache = [
  '/',
  '/1000-books-app.html',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg'
];

// Install service worker
self.addEventListener('install', event => {
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch new
        return response || fetch(event.request);
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
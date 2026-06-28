// SW.JS - KAUSAR PRIVATE HUB LIGHTWEIGHT BACKGROUND ENGINE

const CACHE_NAME = 'kausar-hub-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://assets.mixkit.co/active_storage/sfx/2357/2357-84.wav'
];

// Install Event - Caching basic layout
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch Event - Dynamic Off-line support
self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('http')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        return fetch(event.request).catch(() => {
          return caches.match('./index.html');
        });
      })
    );
  }
});

// App Icon Badge Dynamic Syncer Engine
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_BADGE_COUNT') {
    const badgeCount = event.data.count;
    if (navigator.setAppBadge) {
      if (badgeCount > 0) {
        navigator.setAppBadge(badgeCount).catch(err => console.log(err));
      } else {
        navigator.clearAppBadge().catch(err => console.log(err));
      }
    }
  }
});
      

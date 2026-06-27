// KAUSAR PRIVATE HUB - BACKGROUND BADGE & BACKGROUND SYNC SERVICE WORKER
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// LISTEN FOR LIVE BACKGROUND BADGE UPDATE COMMANDS FROM INDEX.HTML
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SYNC_BADGE_COUNT') {
        const unreadCount = event.data.count;
        if (navigator.setAppBadge) {
            if (unreadCount > 0) {
                navigator.setAppBadge(unreadCount).catch(err => console.log(err));
            } else {
                navigator.clearAppBadge().catch(err => console.log(err));
            }
        }
    }
});

// PUSH NOTIFICATION HANDLER TO TRIGGER APP ICON LIGHT-UP UPON NEW SMS
self.addEventListener('push', (event) => {
    let payload = event.data ? event.data.text() : 'New Secure Message Received';
    
    if (navigator.setAppBadge) {
        navigator.setAppBadge().catch(err => console.log(err));
    }

    const options = {
        body: payload,
        icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
        vibrate: [200, 100, 200],
        data: { dateOfArrival: Date.now() }
    };

    event.waitUntil(
        self.registration.showNotification('Kausar Private Hub', options)
    );
});
  

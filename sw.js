importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAHazZpA2srlEclDKE0qWrDuj7-ULVWnLg",
  authDomain: "kausar-chat-hub.firebaseapp.com",
  projectId: "kausar-chat-hub",
  storageBucket: "kausar-chat-hub.firebasestorage.app",
  messagingSenderId: "543766591580",
  appId: "1:543766591580:web:fbbcdd538d3c403e5bce99"
});

const messaging = firebase.messaging();

// Background Message Handler when Mobile is Locked/Closed
messaging.onBackgroundMessage((payload) => {
  console.log('Background Sync Received payload: ', payload);

  const notificationTitle = payload.notification.title || 'Kausar Private Hub';
  const notificationOptions = {
    body: payload.notification.body || 'New private message received!',
    icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
    tag: 'kausar-chat-sync',
    renotify: true
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// App Badge Event Sync Tracker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SYNC_BADGE_COUNT') {
     if ('setAppBadge' in self.navigator) {
       if(event.data.count > 0) {
           self.navigator.setAppBadge(event.data.count);
       } else {
           self.navigator.clearAppBadge();
       }
     }
  }
});

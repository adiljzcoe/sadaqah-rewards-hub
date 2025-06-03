
// Service Worker for Push Notifications
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(self.clients.claim());
});

// Handle push notification received
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  let notificationData = {};
  
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData = {
        title: 'New Notification',
        body: event.data.text() || 'You have a new message',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'default'
      };
    }
  }

  const options = {
    body: notificationData.body || 'New notification',
    icon: notificationData.icon || '/favicon.ico',
    badge: notificationData.badge || '/favicon.ico',
    tag: notificationData.tag || 'default',
    data: notificationData.data || {},
    actions: notificationData.actions || [],
    requireInteraction: notificationData.requireInteraction || false,
    silent: notificationData.silent || false,
    vibrate: notificationData.vibrate || [200, 100, 200]
  };

  event.waitUntil(
    self.registration.showNotification(
      notificationData.title || 'Sadaqah Rewards Hub',
      options
    )
  );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event);
  
  event.notification.close();

  const clickAction = event.action || 'default';
  const notificationData = event.notification.data || {};
  
  let targetUrl = '/';
  
  if (notificationData.url) {
    targetUrl = notificationData.url;
  } else if (clickAction === 'view_campaign') {
    targetUrl = '/campaigns';
  } else if (clickAction === 'donate_now') {
    targetUrl = '/';
  }

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Try to focus existing tab with the target URL
        for (const client of clientList) {
          if (client.url.includes(targetUrl) && 'focus' in client) {
            return client.focus();
          }
        }
        
        // Open new tab if no existing tab found
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      })
  );
});

// Handle push subscription change
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('Push subscription changed:', event);
  
  event.waitUntil(
    // Re-subscribe user
    self.registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa40HI80Y4qC-XTAlKyNOIeOKqWe4F8E8OgGzHO-aL2JHyPUZ5CCNPAK-ux8vg')
    }).then((subscription) => {
      // Send new subscription to server
      return fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });
    })
  );
});

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = self.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

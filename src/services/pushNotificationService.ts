// Push Notification Service for Frontend
export class PushNotificationService {
  private static instance: PushNotificationService;
  private registration: ServiceWorkerRegistration | null = null;
  private subscription: PushSubscription | null = null;
  
  // VAPID public key - in production, this should be in environment variables
  private vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80Y4qC-XTAlKyNOIeOKqWe4F8E8OgGzHO-aL2JHyPUZ5CCNPAK-ux8vg';

  public static getInstance(): PushNotificationService {
    if (!PushNotificationService.instance) {
      PushNotificationService.instance = new PushNotificationService();
    }
    return PushNotificationService.instance;
  }

  async initialize(): Promise<boolean> {
    try {
      // Check if browser supports service workers and push notifications
      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        console.warn('Push notifications are not supported in this browser');
        return false;
      }

      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', this.registration);

      // Wait for service worker to be ready
      await navigator.serviceWorker.ready;

      return true;
    } catch (error) {
      console.error('Failed to initialize push notification service:', error);
      return false;
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);
      return permission === 'granted';
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  async subscribe(): Promise<PushSubscription | null> {
    try {
      if (!this.registration) {
        await this.initialize();
      }

      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      // Check if already subscribed
      this.subscription = await this.registration.pushManager.getSubscription();
      
      if (this.subscription) {
        console.log('Already subscribed to push notifications');
        return this.subscription;
      }

      // Subscribe to push notifications
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      console.log('Successfully subscribed to push notifications:', this.subscription);

      // Send subscription to server
      await this.sendSubscriptionToServer(this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      return null;
    }
  }

  async unsubscribe(): Promise<boolean> {
    try {
      if (!this.subscription) {
        this.subscription = await this.registration?.pushManager.getSubscription() || null;
      }

      if (this.subscription) {
        const result = await this.subscription.unsubscribe();
        
        if (result) {
          // Remove subscription from server
          await this.removeSubscriptionFromServer();
          this.subscription = null;
          console.log('Successfully unsubscribed from push notifications');
        }
        
        return result;
      }

      return true;
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
      return false;
    }
  }

  async isSubscribed(): Promise<boolean> {
    try {
      if (!this.registration) {
        return false;
      }

      this.subscription = await this.registration.pushManager.getSubscription();
      return !!this.subscription;
    } catch (error) {
      console.error('Failed to check subscription status:', error);
      return false;
    }
  }

  getPermissionStatus(): NotificationPermission {
    return Notification.permission;
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: subscription.toJSON(),
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }

      console.log('Subscription sent to server successfully');
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  }

  private async removeSubscriptionFromServer(): Promise<void> {
    try {
      const response = await fetch('/api/push/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription: this.subscription?.toJSON()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to remove subscription from server');
      }

      console.log('Subscription removed from server successfully');
    } catch (error) {
      console.error('Error removing subscription from server:', error);
    }
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  // Test notification for development
  async sendTestNotification(): Promise<void> {
    if (this.registration) {
      this.registration.showNotification('Test Notification', {
        body: 'This is a test notification from Sadaqah Rewards Hub',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: 'test',
        data: { url: '/' }
      });
    }
  }
}

export const pushNotificationService = PushNotificationService.getInstance();

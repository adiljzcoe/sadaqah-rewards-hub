
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
      console.log('Current permission status:', Notification.permission);
      
      // Check if we're in a secure context
      if (!window.isSecureContext) {
        console.warn('Push notifications require HTTPS or localhost');
      }
      
      // Force the permission request - this should trigger the browser popup
      if ('Notification' in window) {
        console.log('Requesting notification permission...');
        const permission = await Notification.requestPermission();
        console.log('Permission request result:', permission);
        return permission === 'granted';
      }
      
      console.error('Notification API not available');
      return false;
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }

  async subscribe(): Promise<PushSubscription | null> {
    try {
      console.log('Starting subscription process...');
      
      // Initialize if not already done
      if (!this.registration) {
        console.log('Initializing service worker...');
        const initialized = await this.initialize();
        if (!initialized) {
          throw new Error('Failed to initialize service worker');
        }
      }

      if (!this.registration) {
        throw new Error('Service worker not registered');
      }

      console.log('Current notification permission:', Notification.permission);

      // Check current permission status
      if (Notification.permission === 'denied') {
        console.error('Notification permission is denied');
        throw new Error('Notification permission denied');
      }

      // ALWAYS request permission explicitly to trigger popup
      console.log('Requesting permission explicitly...');
      const permissionGranted = await this.requestPermission();
      
      if (!permissionGranted) {
        console.error('Permission was not granted');
        throw new Error('Permission not granted');
      }

      console.log('Permission granted, checking existing subscription...');

      // Check if already subscribed
      this.subscription = await this.registration.pushManager.getSubscription();
      
      if (this.subscription) {
        console.log('Already subscribed to push notifications');
        // Still save to database in case it's not there
        await this.saveSubscriptionToDatabase(this.subscription);
        return this.subscription;
      }

      console.log('Creating new subscription...');

      // Subscribe to push notifications
      this.subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidPublicKey)
      });

      console.log('Successfully subscribed to push notifications:', this.subscription);

      // Send subscription to server
      await this.saveSubscriptionToDatabase(this.subscription);

      return this.subscription;
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
      throw error; // Re-throw so the UI can handle it
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
          await this.removeSubscriptionFromDatabase();
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

  private async saveSubscriptionToDatabase(subscription: PushSubscription): Promise<void> {
    try {
      // Import supabase client dynamically to avoid circular imports
      const { supabase } = await import('@/integrations/supabase/client');
      
      const subscriptionData = subscription.toJSON();
      
      const { error } = await supabase
        .from('push_subscriptions')
        .upsert({
          endpoint: subscriptionData.endpoint,
          p256dh_key: subscriptionData.keys?.p256dh,
          auth_key: subscriptionData.keys?.auth,
          user_agent: navigator.userAgent,
          active: true
        }, {
          onConflict: 'endpoint'
        });

      if (error) {
        console.error('Error saving subscription to database:', error);
      } else {
        console.log('Subscription saved to database successfully');
      }
    } catch (error) {
      console.error('Error saving subscription to database:', error);
    }
  }

  private async removeSubscriptionFromDatabase(): Promise<void> {
    try {
      // Import supabase client dynamically to avoid circular imports
      const { supabase } = await import('@/integrations/supabase/client');
      
      if (!this.subscription) return;
      
      const subscriptionData = this.subscription.toJSON();
      
      const { error } = await supabase
        .from('push_subscriptions')
        .update({ active: false })
        .eq('endpoint', subscriptionData.endpoint);

      if (error) {
        console.error('Error removing subscription from database:', error);
      } else {
        console.log('Subscription removed from database successfully');
      }
    } catch (error) {
      console.error('Error removing subscription from database:', error);
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

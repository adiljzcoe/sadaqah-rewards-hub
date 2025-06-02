
import { PushNotifications } from '@capacitor/push-notifications';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';

export class PushNotificationService {
  async initialize() {
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications only work on native platforms');
      return;
    }

    // Request permission to use push notifications
    const permStatus = await PushNotifications.requestPermissions();
    
    if (permStatus.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      await PushNotifications.register();
      
      // Set up listeners
      this.setupListeners();
    } else {
      console.log('Push notification permission denied');
    }

    // Initialize local notifications
    await LocalNotifications.requestPermissions();
  }

  private setupListeners() {
    // On registration
    PushNotifications.addListener('registration', (token) => {
      console.log('Push registration success, token: ' + token.value);
      // Send token to your backend to store for this user
      this.sendTokenToServer(token.value);
    });

    // On registration error
    PushNotifications.addListener('registrationError', (error) => {
      console.error('Push registration error: ', error.error);
    });

    // When a notification is received while app is in foreground
    PushNotifications.addListener('pushNotificationReceived', (notification) => {
      console.log('Push notification received: ', notification);
      // Show local notification if app is in foreground
      this.showLocalNotification(notification.title || 'New Donation Alert', notification.body || '');
    });

    // When user taps on a notification
    PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      // Navigate to relevant screen based on notification data
      this.handleNotificationTap(notification.notification.data);
    });
  }

  private async sendTokenToServer(token: string) {
    // In a real app, send this token to your backend
    // For now, store in localStorage
    localStorage.setItem('pushToken', token);
  }

  private async showLocalNotification(title: string, body: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000 * 2) }, // 2 seconds delay
          sound: 'default',
          attachments: [],
          actionTypeId: '',
          extra: null
        }
      ]
    });
  }

  private handleNotificationTap(data: any) {
    // Navigate based on notification type
    if (data?.type === 'urgent_campaign') {
      window.location.href = '/campaigns';
    } else if (data?.type === 'donation_match') {
      window.location.href = '/';
    }
  }

  // Send donation-related notifications
  async sendDonationReminder() {
    if (!Capacitor.isNativePlatform()) return;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '🤲 Time for Sadaqah',
          body: 'Your daily good deed awaits. Make a difference today!',
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000 * 5) },
          sound: 'default',
          attachments: [],
          actionTypeId: '',
          extra: { type: 'donation_reminder' }
        }
      ]
    });
  }

  async sendUrgentCampaignAlert(campaignName: string) {
    if (!Capacitor.isNativePlatform()) return;

    await LocalNotifications.schedule({
      notifications: [
        {
          title: '🚨 Urgent Campaign Alert',
          body: `${campaignName} needs immediate support!`,
          id: Date.now(),
          schedule: { at: new Date(Date.now() + 1000 * 2) },
          sound: 'default',
          attachments: [],
          actionTypeId: '',
          extra: { type: 'urgent_campaign', campaign: campaignName }
        }
      ]
    });
  }
}

export const pushNotificationService = new PushNotificationService();

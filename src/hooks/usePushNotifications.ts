import { useState, useEffect } from 'react';
import { pushNotificationService } from '@/services/pushNotificationService';

export interface PushNotificationState {
  isSupported: boolean;
  permission: NotificationPermission;
  isSubscribed: boolean;
  isLoading: boolean;
}

export const usePushNotifications = () => {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    permission: 'default',
    isSubscribed: false,
    isLoading: false
  });

  useEffect(() => {
    initializeState();
  }, []);

  const initializeState = async () => {
    const isSupported = 'serviceWorker' in navigator && 'PushManager' in window;
    
    setState(prev => ({
      ...prev,
      isSupported,
      permission: isSupported ? pushNotificationService.getPermissionStatus() : 'default'
    }));

    if (isSupported) {
      const isSubscribed = await pushNotificationService.isSubscribed();
      setState(prev => ({
        ...prev,
        isSubscribed
      }));
    }
  };

  const subscribe = async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      console.log('Starting subscription process...');
      
      // This should trigger the browser permission popup
      const subscription = await pushNotificationService.subscribe();
      const success = !!subscription;
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        permission: success ? 'granted' : pushNotificationService.getPermissionStatus(),
        isSubscribed: success
      }));
      
      return success;
    } catch (error) {
      console.error('Subscribe error:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        permission: pushNotificationService.getPermissionStatus()
      }));
      return false;
    }
  };

  const unsubscribe = async (): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await pushNotificationService.unsubscribe();
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isSubscribed: !result
      }));
      
      return result;
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
  };

  const sendTestNotification = async (): Promise<void> => {
    await pushNotificationService.sendTestNotification();
  };

  return {
    ...state,
    subscribe,
    unsubscribe,
    sendTestNotification,
    refresh: initializeState
  };
};

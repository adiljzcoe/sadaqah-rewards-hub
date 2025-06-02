
import { useState, useEffect } from 'react';

interface CommunicationPreferences {
  generalUpdates: 'never' | 'weekly' | 'biweekly' | 'monthly';
  islamicOccasions: 'all' | 'major' | 'emergency' | 'none';
  donationReminders: 'daily' | 'weekly' | 'monthly' | 'islamic_monthly' | 'never';
  impactUpdates: 'immediate' | 'weekly' | 'monthly' | 'never';
  channels: {
    email: boolean;
    sms: boolean;
    push: boolean;
    inApp: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  islamicCalendarSync: boolean;
}

const defaultPreferences: CommunicationPreferences = {
  generalUpdates: 'weekly',
  islamicOccasions: 'major',
  donationReminders: 'weekly',
  impactUpdates: 'weekly',
  channels: {
    email: true,
    sms: false,
    push: true,
    inApp: true,
  },
  quietHours: {
    enabled: false,
    start: '22:00',
    end: '08:00',
  },
  islamicCalendarSync: true,
};

export function useCommunicationPreferences() {
  const [preferences, setPreferences] = useState<CommunicationPreferences>(defaultPreferences);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load preferences from localStorage
    const saved = localStorage.getItem('communicationPreferences');
    if (saved) {
      try {
        setPreferences(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading communication preferences:', error);
      }
    }
    setLoading(false);
  }, []);

  const updatePreferences = (newPreferences: Partial<CommunicationPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    localStorage.setItem('communicationPreferences', JSON.stringify(updated));
  };

  const shouldReceiveNotification = (type: 'general' | 'islamic' | 'reminder' | 'impact') => {
    const now = new Date();
    
    // Check quiet hours
    if (preferences.quietHours.enabled) {
      const currentTime = now.getHours() * 100 + now.getMinutes();
      const startTime = parseInt(preferences.quietHours.start.replace(':', ''));
      const endTime = parseInt(preferences.quietHours.end.replace(':', ''));
      
      if (startTime > endTime) {
        // Quiet hours span midnight
        if (currentTime >= startTime || currentTime <= endTime) {
          return false;
        }
      } else {
        // Normal quiet hours
        if (currentTime >= startTime && currentTime <= endTime) {
          return false;
        }
      }
    }

    // Check specific preferences
    switch (type) {
      case 'general':
        return preferences.generalUpdates !== 'never';
      case 'islamic':
        return preferences.islamicOccasions !== 'none';
      case 'reminder':
        return preferences.donationReminders !== 'never';
      case 'impact':
        return preferences.impactUpdates !== 'never';
      default:
        return true;
    }
  };

  const getNextNotificationTime = (type: 'general' | 'reminder') => {
    const now = new Date();
    const nextNotification = new Date(now);

    if (type === 'general') {
      switch (preferences.generalUpdates) {
        case 'weekly':
          // Next Friday
          nextNotification.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
          break;
        case 'biweekly':
          nextNotification.setDate(now.getDate() + 14);
          break;
        case 'monthly':
          nextNotification.setMonth(now.getMonth() + 1, 1);
          break;
      }
    } else if (type === 'reminder') {
      switch (preferences.donationReminders) {
        case 'daily':
          nextNotification.setDate(now.getDate() + 1);
          break;
        case 'weekly':
          nextNotification.setDate(now.getDate() + (5 - now.getDay() + 7) % 7);
          break;
        case 'monthly':
          nextNotification.setMonth(now.getMonth() + 1, 1);
          break;
        case 'islamic_monthly':
          // Approximate Islamic month (29.5 days)
          nextNotification.setDate(now.getDate() + 30);
          break;
      }
    }

    return nextNotification;
  };

  return {
    preferences,
    updatePreferences,
    loading,
    shouldReceiveNotification,
    getNextNotificationTime,
  };
}

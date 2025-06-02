
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Mail, MessageSquare, Bell, Smartphone, Calendar, Star, Heart, TrendingUp } from 'lucide-react';

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

const CommunicationPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<CommunicationPreferences>({
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
  });

  const handlePreferenceChange = (key: keyof CommunicationPreferences, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleChannelChange = (channel: keyof CommunicationPreferences['channels'], checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      channels: {
        ...prev.channels,
        [channel]: checked
      }
    }));
  };

  const handleQuietHoursChange = (key: keyof CommunicationPreferences['quietHours'], value: any) => {
    setPreferences(prev => ({
      ...prev,
      quietHours: {
        ...prev.quietHours,
        [key]: value
      }
    }));
  };

  const savePreferences = () => {
    // Save to localStorage for demo - in real app, save to backend
    localStorage.setItem('communicationPreferences', JSON.stringify(preferences));
    toast({
      title: "Preferences Saved",
      description: "Your communication preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            General Updates & Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Frequency</label>
              <Select
                value={preferences.generalUpdates}
                onValueChange={(value) => handlePreferenceChange('generalUpdates', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="never">Never</SelectItem>
                  <SelectItem value="weekly">Weekly (Fridays)</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600">
              Receive updates about new campaigns, charity spotlights, and general platform news.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Islamic Occasions & Special Appeals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Occasion Types</label>
              <Select
                value={preferences.islamicOccasions}
                onValueChange={(value) => handlePreferenceChange('islamicOccasions', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Islamic Occasions</SelectItem>
                  <SelectItem value="major">Major Occasions Only</SelectItem>
                  <SelectItem value="emergency">Emergency Appeals Only</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="islamic-calendar"
                checked={preferences.islamicCalendarSync}
                onCheckedChange={(checked) => handlePreferenceChange('islamicCalendarSync', checked)}
              />
              <label htmlFor="islamic-calendar" className="text-sm">
                Sync with Islamic calendar for optimal timing
              </label>
            </div>
            <p className="text-sm text-gray-600">
              Includes Ramadan, Eid celebrations, Hajj season, and urgent humanitarian appeals.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            Donation Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Reminder Frequency</label>
              <Select
                value={preferences.donationReminders}
                onValueChange={(value) => handlePreferenceChange('donationReminders', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Gentle Reminders</SelectItem>
                  <SelectItem value="weekly">Weekly (Fridays)</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="islamic_monthly">Islamic Calendar (1st of each month)</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600">
              Gentle reminders to help you maintain consistent charitable giving.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Achievement & Impact Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Update Frequency</label>
              <Select
                value={preferences.impactUpdates}
                onValueChange={(value) => handlePreferenceChange('impactUpdates', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate Notifications</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600">
              Updates about your donation impact, achievements, and charity progress reports.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Communication Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="email"
                  checked={preferences.channels.email}
                  onCheckedChange={(checked) => handleChannelChange('email', checked as boolean)}
                />
                <Mail className="h-4 w-4" />
                <label htmlFor="email" className="text-sm">Email</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sms"
                  checked={preferences.channels.sms}
                  onCheckedChange={(checked) => handleChannelChange('sms', checked as boolean)}
                />
                <MessageSquare className="h-4 w-4" />
                <label htmlFor="sms" className="text-sm">SMS</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="push"
                  checked={preferences.channels.push}
                  onCheckedChange={(checked) => handleChannelChange('push', checked as boolean)}
                />
                <Bell className="h-4 w-4" />
                <label htmlFor="push" className="text-sm">Push Notifications</label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inApp"
                  checked={preferences.channels.inApp}
                  onCheckedChange={(checked) => handleChannelChange('inApp', checked as boolean)}
                />
                <Smartphone className="h-4 w-4" />
                <label htmlFor="inApp" className="text-sm">In-App Only</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="quiet-hours"
                checked={preferences.quietHours.enabled}
                onCheckedChange={(checked) => handleQuietHoursChange('enabled', checked)}
              />
              <label htmlFor="quiet-hours" className="text-sm">
                Enable quiet hours (no notifications during these times)
              </label>
            </div>
            {preferences.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Time</label>
                  <Select
                    value={preferences.quietHours.start}
                    onValueChange={(value) => handleQuietHoursChange('start', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Time</label>
                  <Select
                    value={preferences.quietHours.end}
                    onValueChange={(value) => handleQuietHoursChange('end', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0');
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={savePreferences} className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
          Save Communication Preferences
        </Button>
      </div>
    </div>
  );
};

export default CommunicationPreferences;

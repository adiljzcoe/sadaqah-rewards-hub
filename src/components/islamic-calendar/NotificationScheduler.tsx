
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Clock, Smartphone } from 'lucide-react';
import { pushNotificationService } from '@/services/pushNotifications';

interface NotificationSchedulerProps {
  eventId: string;
  eventTitle: string;
  eventDate: Date;
}

const NotificationScheduler: React.FC<NotificationSchedulerProps> = ({
  eventId,
  eventTitle,
  eventDate
}) => {
  const [notifications, setNotifications] = useState({
    oneDay: false,
    threeDays: false,
    oneWeek: false,
    onDay: true
  });

  const [notificationTypes, setNotificationTypes] = useState({
    push: true,
    email: false,
    sms: false
  });

  const handleScheduleNotifications = async () => {
    const schedules = [];
    
    if (notifications.oneWeek) {
      const weekBefore = new Date(eventDate);
      weekBefore.setDate(weekBefore.getDate() - 7);
      schedules.push({ date: weekBefore, type: '1 week' });
    }
    
    if (notifications.threeDays) {
      const threeDaysBefore = new Date(eventDate);
      threeDaysBefore.setDate(threeDaysBefore.getDate() - 3);
      schedules.push({ date: threeDaysBefore, type: '3 days' });
    }
    
    if (notifications.oneDay) {
      const dayBefore = new Date(eventDate);
      dayBefore.setDate(dayBefore.getDate() - 1);
      schedules.push({ date: dayBefore, type: '1 day' });
    }
    
    if (notifications.onDay) {
      schedules.push({ date: eventDate, type: 'today' });
    }

    // Store notification preferences
    const notificationData = {
      eventId,
      eventTitle,
      schedules,
      types: notificationTypes,
      createdAt: new Date().toISOString()
    };

    const existingNotifications = JSON.parse(
      localStorage.getItem('islamicEventNotifications') || '[]'
    );
    
    // Remove existing notifications for this event
    const filtered = existingNotifications.filter((n: any) => n.eventId !== eventId);
    filtered.push(notificationData);
    
    localStorage.setItem('islamicEventNotifications', JSON.stringify(filtered));

    // Schedule immediate test notification if push is enabled
    if (notificationTypes.push) {
      await pushNotificationService.sendUrgentCampaignAlert(
        `Notifications scheduled for ${eventTitle}! 🎉`
      );
    }

    console.log('Notifications scheduled:', notificationData);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Bell className="h-5 w-5" />
          Schedule Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Notification Timing */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">When to notify:</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span>1 week before</span>
              </div>
              <Switch
                checked={notifications.oneWeek}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, oneWeek: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>3 days before</span>
              </div>
              <Switch
                checked={notifications.threeDays}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, threeDays: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-600" />
                <span>1 day before</span>
              </div>
              <Switch
                checked={notifications.oneDay}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, oneDay: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-orange-600" />
                <span>On the day</span>
                <Badge variant="secondary" className="ml-2">Recommended</Badge>
              </div>
              <Switch
                checked={notifications.onDay}
                onCheckedChange={(checked) => 
                  setNotifications(prev => ({ ...prev, onDay: checked }))
                }
              />
            </div>
          </div>
        </div>

        {/* Notification Types */}
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">How to notify:</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-blue-600" />
                <span>Push notifications</span>
                <Badge variant="outline" className="ml-2">Instant</Badge>
              </div>
              <Switch
                checked={notificationTypes.push}
                onCheckedChange={(checked) => 
                  setNotificationTypes(prev => ({ ...prev, push: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📧</span>
                <span>Email reminders</span>
              </div>
              <Switch
                checked={notificationTypes.email}
                onCheckedChange={(checked) => 
                  setNotificationTypes(prev => ({ ...prev, email: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">📱</span>
                <span>SMS alerts</span>
                <Badge variant="outline" className="ml-2">Premium</Badge>
              </div>
              <Switch
                checked={notificationTypes.sms}
                onCheckedChange={(checked) => 
                  setNotificationTypes(prev => ({ ...prev, sms: checked }))
                }
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={handleScheduleNotifications}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          <Bell className="h-4 w-4 mr-2" />
          Schedule Reminders
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationScheduler;

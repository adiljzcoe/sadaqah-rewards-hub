
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, TestTube, Settings, Activity } from 'lucide-react';
import PushNotificationManager from '@/components/PushNotificationManager';
import PushNotificationWidget from '@/components/PushNotificationWidget';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const PushNotificationTest: React.FC = () => {
  const [showWidget, setShowWidget] = useState(true);
  const { sendTestNotification, isSubscribed } = usePushNotifications();

  const handleSendTest = async () => {
    await sendTestNotification();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Push Notification System Test
          </h1>
          <p className="text-gray-600">
            Test and manage push notifications for the Sadaqah Rewards Hub
          </p>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Test push notification functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleSendTest}
                disabled={!isSubscribed}
                className="flex items-center gap-2"
              >
                <TestTube className="h-4 w-4" />
                Send Test Notification
              </Button>
              <Button
                onClick={() => setShowWidget(!showWidget)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                {showWidget ? 'Hide' : 'Show'} Subscription Widget
              </Button>
            </div>
            {!isSubscribed && (
              <p className="text-sm text-amber-600 mt-2">
                Subscribe to notifications first to test functionality
              </p>
            )}
          </CardContent>
        </Card>

        {/* Subscription Widget Demo */}
        {showWidget && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Subscription Widget
            </h2>
            <PushNotificationWidget onClose={() => setShowWidget(false)} />
          </div>
        )}

        {/* Push Notification Manager */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Notification Manager
          </h2>
          <PushNotificationManager />
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-blue-800">
            <div>
              <strong>1. Subscribe to Notifications:</strong>
              <p className="text-sm">Click "Subscribe to Notifications" and allow browser permissions when prompted.</p>
            </div>
            <div>
              <strong>2. Test Local Notifications:</strong>
              <p className="text-sm">Use "Test Notification" button to send a local test notification.</p>
            </div>
            <div>
              <strong>3. Test Admin Panel:</strong>
              <p className="text-sm">Go to Admin Dashboard → Push Notifications to send notifications from backend.</p>
            </div>
            <div>
              <strong>4. Browser Support:</strong>
              <p className="text-sm">Works best in Chrome, Firefox, and Safari. Requires HTTPS in production.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PushNotificationTest;

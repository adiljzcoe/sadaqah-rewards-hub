
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, BellOff, TestTube, Check, X, AlertCircle } from 'lucide-react';
import { pushNotificationService } from '@/services/pushNotificationService';
import { useToast } from '@/hooks/use-toast';

const PushNotificationManager: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkSupport();
    checkPermissionStatus();
    checkSubscriptionStatus();
  }, []);

  const checkSupport = () => {
    const supported = 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);
    
    if (!supported) {
      toast({
        title: "Not Supported",
        description: "Push notifications are not supported in this browser",
        variant: "destructive",
      });
    }
  };

  const checkPermissionStatus = () => {
    if (isSupported) {
      setPermission(pushNotificationService.getPermissionStatus());
    }
  };

  const checkSubscriptionStatus = async () => {
    if (isSupported) {
      const subscribed = await pushNotificationService.isSubscribed();
      setIsSubscribed(subscribed);
    }
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    
    try {
      // Initialize service if not already done
      await pushNotificationService.initialize();
      
      // Request permission
      const permissionGranted = await pushNotificationService.requestPermission();
      
      if (!permissionGranted) {
        toast({
          title: "Permission Denied",
          description: "Please allow notifications to receive push notifications",
          variant: "destructive",
        });
        return;
      }

      // Subscribe to push notifications
      const subscription = await pushNotificationService.subscribe();
      
      if (subscription) {
        setIsSubscribed(true);
        setPermission('granted');
        toast({
          title: "Subscribed Successfully",
          description: "You will now receive push notifications",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "Failed to subscribe to push notifications",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast({
        title: "Error",
        description: "An error occurred while subscribing to notifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    setIsLoading(true);
    
    try {
      const result = await pushNotificationService.unsubscribe();
      
      if (result) {
        setIsSubscribed(false);
        toast({
          title: "Unsubscribed",
          description: "You will no longer receive push notifications",
        });
      } else {
        toast({
          title: "Unsubscribe Failed",
          description: "Failed to unsubscribe from push notifications",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      toast({
        title: "Error",
        description: "An error occurred while unsubscribing",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      await pushNotificationService.sendTestNotification();
      toast({
        title: "Test Sent",
        description: "Test notification sent successfully",
      });
    } catch (error) {
      console.error('Test notification error:', error);
      toast({
        title: "Test Failed",
        description: "Failed to send test notification",
        variant: "destructive",
      });
    }
  };

  const getPermissionBadge = () => {
    switch (permission) {
      case 'granted':
        return <Badge className="bg-green-500"><Check className="h-3 w-3 mr-1" />Granted</Badge>;
      case 'denied':
        return <Badge variant="destructive"><X className="h-3 w-3 mr-1" />Denied</Badge>;
      default:
        return <Badge variant="secondary"><AlertCircle className="h-3 w-3 mr-1" />Not Set</Badge>;
    }
  };

  if (!isSupported) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="h-5 w-5" />
            Push Notifications Not Supported
          </CardTitle>
          <CardDescription>
            Your browser doesn't support push notifications. Please use a modern browser like Chrome, Firefox, or Safari.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Push Notifications
        </CardTitle>
        <CardDescription>
          Manage your push notification preferences and test notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Permission Status:</span>
          {getPermissionBadge()}
        </div>
        
        <div className="flex items-center justify-between">
          <span>Subscription Status:</span>
          <Badge variant={isSubscribed ? "default" : "outline"}>
            {isSubscribed ? (
              <>
                <Check className="h-3 w-3 mr-1" />
                Subscribed
              </>
            ) : (
              <>
                <X className="h-3 w-3 mr-1" />
                Not Subscribed
              </>
            )}
          </Badge>
        </div>

        <div className="flex gap-2 flex-wrap">
          {!isSubscribed ? (
            <Button 
              onClick={handleSubscribe} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              {isLoading ? 'Subscribing...' : 'Subscribe to Notifications'}
            </Button>
          ) : (
            <Button 
              onClick={handleUnsubscribe} 
              disabled={isLoading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <BellOff className="h-4 w-4" />
              {isLoading ? 'Unsubscribing...' : 'Unsubscribe'}
            </Button>
          )}

          {isSubscribed && (
            <Button 
              onClick={handleTestNotification}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <TestTube className="h-4 w-4" />
              Test Notification
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>• You'll receive notifications about urgent campaigns</p>
          <p>• Daily reminder notifications for donations</p>
          <p>• Important community updates</p>
          <p>• You can unsubscribe at any time</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PushNotificationManager;

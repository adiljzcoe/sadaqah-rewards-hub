
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X } from 'lucide-react';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useToast } from '@/hooks/use-toast';

interface PushNotificationWidgetProps {
  onClose?: () => void;
  minimal?: boolean;
}

const PushNotificationWidget: React.FC<PushNotificationWidgetProps> = ({ 
  onClose, 
  minimal = false 
}) => {
  const { 
    isSupported, 
    permission, 
    isSubscribed, 
    isLoading, 
    subscribe, 
    unsubscribe 
  } = usePushNotifications();
  
  const { toast } = useToast();

  useEffect(() => {
    // Auto-initialize push notifications if supported and not already set
    if (isSupported && permission === 'default' && !isSubscribed) {
      // Show widget to encourage subscription
    }
  }, [isSupported, permission, isSubscribed]);

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      toast({
        title: "Notifications Enabled",
        description: "You'll now receive important updates and donation reminders",
      });
      onClose?.();
    } else {
      toast({
        title: "Subscription Failed",
        description: "Unable to enable notifications. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUnsubscribe = async () => {
    const success = await unsubscribe();
    if (success) {
      toast({
        title: "Notifications Disabled",
        description: "You will no longer receive push notifications",
      });
    }
  };

  // Don't show widget if not supported or already subscribed (unless minimal mode)
  if (!isSupported || (isSubscribed && !minimal)) {
    return null;
  }

  // Don't show if permission is denied
  if (permission === 'denied') {
    return null;
  }

  if (minimal) {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant={isSubscribed ? "outline" : "default"}
          onClick={isSubscribed ? handleUnsubscribe : handleSubscribe}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Bell className="h-4 w-4" />
          {isSubscribed ? 'Notifications On' : 'Enable Notifications'}
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-islamic-green-200 bg-islamic-green-50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-islamic-green-600" />
            <CardTitle className="text-lg text-islamic-green-900">
              Stay Connected
            </CardTitle>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 text-islamic-green-600 hover:text-islamic-green-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription className="text-islamic-green-700">
          Enable notifications to receive urgent charity appeals, daily reminders, and impact updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-islamic-green-800">
            <div className="w-2 h-2 bg-islamic-green-600 rounded-full"></div>
            Urgent campaign alerts when help is needed most
          </div>
          <div className="flex items-center gap-2 text-sm text-islamic-green-800">
            <div className="w-2 h-2 bg-islamic-green-600 rounded-full"></div>
            Daily Sadaqah reminders to earn continuous rewards
          </div>
          <div className="flex items-center gap-2 text-sm text-islamic-green-800">
            <div className="w-2 h-2 bg-islamic-green-600 rounded-full"></div>
            Impact updates showing how your donations help
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="flex-1 bg-islamic-green-600 hover:bg-islamic-green-700"
          >
            {isLoading ? 'Enabling...' : 'Enable Notifications'}
          </Button>
          {onClose && (
            <Button
              variant="outline"
              onClick={onClose}
              className="border-islamic-green-300 text-islamic-green-700 hover:bg-islamic-green-100"
            >
              Maybe Later
            </Button>
          )}
        </div>

        <p className="text-xs text-islamic-green-600">
          You can disable notifications anytime in your profile settings
        </p>
      </CardContent>
    </Card>
  );
};

export default PushNotificationWidget;

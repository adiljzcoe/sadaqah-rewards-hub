
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, X, AlertCircle } from 'lucide-react';
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
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this session
    const dismissed = sessionStorage.getItem('pushNotificationDismissed');
    if (dismissed) {
      setDismissed(true);
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      const success = await subscribe();
      if (success) {
        toast({
          title: "🔔 Notifications Enabled!",
          description: "You'll now receive important updates about urgent campaigns and donation opportunities.",
        });
        setDismissed(true);
        sessionStorage.setItem('pushNotificationDismissed', 'true');
        onClose?.();
      } else {
        toast({
          title: "Permission Required",
          description: "Please allow notifications when prompted by your browser, then try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Subscribe error:', error);
      toast({
        title: "Unable to Enable Notifications",
        description: "Your browser may be blocking notifications. Please check your browser settings and try again.",
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

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('pushNotificationDismissed', 'true');
    onClose?.();
  };

  // Don't show widget if dismissed, not supported, or already subscribed (unless minimal mode)
  if (dismissed || !isSupported || (isSubscribed && !minimal)) {
    return null;
  }

  // Don't show if permission is denied
  if (permission === 'denied') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <div>
              <p className="font-medium">Notifications Blocked</p>
              <p className="text-sm">Enable notifications in your browser settings to receive important updates.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
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
          {isLoading ? 'Processing...' : (isSubscribed ? 'Notifications On' : 'Enable Notifications')}
        </Button>
      </div>
    );
  }

  return (
    <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-blue-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-emerald-600" />
            <CardTitle className="text-lg text-emerald-900">
              🔔 Stay Notified of Urgent Appeals
            </CardTitle>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-6 w-6 p-0 text-emerald-600 hover:text-emerald-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-emerald-700">
          Get instant alerts when urgent charity appeals need your help most
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-emerald-800">
            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
            🚨 Emergency campaign alerts when lives are at stake
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-800">
            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
            🕌 Daily Sadaqah reminders to earn continuous rewards
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-800">
            <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
            📊 Impact updates showing how your donations help
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            {isLoading ? 'Enabling...' : '🔔 Enable Notifications'}
          </Button>
          <Button
            variant="outline"
            onClick={handleDismiss}
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-100"
          >
            Maybe Later
          </Button>
        </div>

        <p className="text-xs text-emerald-600 text-center">
          🔒 Secure & private - you can disable anytime in your browser settings
        </p>
      </CardContent>
    </Card>
  );
};

export default PushNotificationWidget;

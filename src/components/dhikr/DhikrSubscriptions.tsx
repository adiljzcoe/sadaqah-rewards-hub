
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Bell, Clock, Calendar } from 'lucide-react';

const DhikrSubscriptions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: subscriptions } = useQuery({
    queryKey: ['dhikr-subscriptions', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('dhikr_subscriptions')
        .select(`
          *,
          dhikr_events (*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const { data: availableEvents } = useQuery({
    queryKey: ['available-dhikr-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dhikr_events')
        .select('*')
        .eq('is_active', true)
        .gte('end_time', new Date().toISOString())
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const handleSubscribe = async (eventId: string) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to subscribe to events.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('dhikr_subscriptions')
        .insert({
          user_id: user.id,
          event_id: eventId,
          notification_enabled: true,
          reminder_minutes: 15
        });

      if (error) throw error;

      toast({
        title: "Subscribed! 🔔",
        description: "You'll receive notifications for this dhikr event."
      });

      queryClient.invalidateQueries({ queryKey: ['dhikr-subscriptions', user.id] });
    } catch (error) {
      console.error('Error subscribing:', error);
      toast({
        title: "Error",
        description: "Failed to subscribe to event.",
        variant: "destructive"
      });
    }
  };

  const handleUnsubscribe = async (subscriptionId: string) => {
    try {
      const { error } = await supabase
        .from('dhikr_subscriptions')
        .delete()
        .eq('id', subscriptionId);

      if (error) throw error;

      toast({
        title: "Unsubscribed",
        description: "You won't receive notifications for this event anymore."
      });

      queryClient.invalidateQueries({ queryKey: ['dhikr-subscriptions', user.id] });
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleToggleNotifications = async (subscriptionId: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('dhikr_subscriptions')
        .update({ notification_enabled: enabled })
        .eq('id', subscriptionId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['dhikr-subscriptions', user.id] });
    } catch (error) {
      console.error('Error updating notifications:', error);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Event Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Sign in to subscribe to dhikr events and receive notifications.</p>
        </CardContent>
      </Card>
    );
  }

  const subscribedEventIds = new Set(subscriptions?.map(sub => sub.event_id) || []);
  const unsubscribedEvents = availableEvents?.filter(event => !subscribedEventIds.has(event.id)) || [];

  return (
    <div className="space-y-6">
      {/* Current Subscriptions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Your Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptions && subscriptions.length > 0 ? (
            <div className="space-y-4">
              {subscriptions.map((subscription) => (
                <div key={subscription.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <h3 className="font-medium">{subscription.dhikr_events.title}</h3>
                    <p className="text-sm text-gray-600">{subscription.dhikr_events.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Reminder: {subscription.reminder_minutes} minutes before</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={subscription.notification_enabled}
                        onCheckedChange={(checked) => 
                          handleToggleNotifications(subscription.id, checked)
                        }
                      />
                      <span className="text-sm">Notifications</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnsubscribe(subscription.id)}
                    >
                      Unsubscribe
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No subscriptions yet. Subscribe to events below!</p>
          )}
        </CardContent>
      </Card>

      {/* Available Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Available Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {unsubscribedEvents.length > 0 ? (
            <div className="space-y-4">
              {unsubscribedEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{event.title}</h3>
                      {event.is_recurring && (
                        <Badge variant="outline" className="text-xs">
                          {event.recurrence_pattern}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{event.description}</p>
                  </div>
                  <Button
                    onClick={() => handleSubscribe(event.id)}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Subscribe
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">You're subscribed to all available events!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrSubscriptions;

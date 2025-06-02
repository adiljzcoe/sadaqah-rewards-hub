
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Heart, Users, Play, Pause, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const LiveDhikrSession = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isParticipating, setIsParticipating] = useState(false);
  const [personalCount, setPersonalCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get active dhikr events
  const { data: activeEvents } = useQuery({
    queryKey: ['active-dhikr-events'],
    queryFn: async () => {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from('dhikr_events')
        .select('*')
        .eq('is_active', true)
        .lte('start_time', now)
        .gte('end_time', now)
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    },
    refetchInterval: 30000 // Check every 30 seconds
  });

  // Get real-time participation stats for selected event
  const { data: eventStats } = useQuery({
    queryKey: ['dhikr-event-stats', selectedEvent?.id],
    queryFn: async () => {
      if (!selectedEvent) return null;

      const { data: participation } = await supabase
        .from('dhikr_participation')
        .select('dhikr_count, user_id')
        .eq('event_id', selectedEvent.id);

      const { data: counts } = await supabase
        .from('dhikr_counts')
        .select('count_increment')
        .eq('event_id', selectedEvent.id);

      const totalCount = counts?.reduce((sum, count) => sum + count.count_increment, 0) || 0;
      const participantCount = participation?.length || 0;

      return {
        totalCount,
        participantCount,
        progress: selectedEvent.target_count > 0 ? (totalCount / selectedEvent.target_count) * 100 : 0
      };
    },
    enabled: !!selectedEvent,
    refetchInterval: 2000 // Real-time updates every 2 seconds
  });

  // Auto-select first active event
  useEffect(() => {
    if (activeEvents && activeEvents.length > 0 && !selectedEvent) {
      setSelectedEvent(activeEvents[0]);
    }
  }, [activeEvents, selectedEvent]);

  // Set up real-time subscription for live updates
  useEffect(() => {
    if (!selectedEvent) return;

    const channel = supabase
      .channel(`dhikr-event-${selectedEvent.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'dhikr_counts',
        filter: `event_id=eq.${selectedEvent.id}`
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['dhikr-event-stats', selectedEvent.id] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedEvent, queryClient]);

  const handleJoinEvent = async () => {
    if (!user || !selectedEvent) {
      toast({
        title: "Sign in required",
        description: "Please sign in to participate in dhikr sessions.",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('dhikr_participation')
        .upsert({
          event_id: selectedEvent.id,
          user_id: user.id,
          dhikr_count: 0
        });

      if (error) throw error;

      setIsParticipating(true);
      toast({
        title: "Joined session! 🤲",
        description: `Welcome to ${selectedEvent.title}. Start your dhikr!`
      });
    } catch (error) {
      console.error('Error joining event:', error);
      toast({
        title: "Error",
        description: "Failed to join the session.",
        variant: "destructive"
      });
    }
  };

  const handleDhikrClick = async () => {
    if (!user || !selectedEvent || !isParticipating) return;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    const newCount = personalCount + 1;
    setPersonalCount(newCount);

    try {
      // Record the dhikr count
      const { error: countError } = await supabase
        .from('dhikr_counts')
        .insert({
          event_id: selectedEvent.id,
          user_id: user.id,
          dhikr_type: selectedEvent.dhikr_type,
          count_increment: 1
        });

      if (countError) throw countError;

      // Update participation record
      const { error: participationError } = await supabase
        .from('dhikr_participation')
        .update({
          dhikr_count: newCount,
          last_dhikr_at: new Date().toISOString()
        })
        .eq('event_id', selectedEvent.id)
        .eq('user_id', user.id);

      if (participationError) throw participationError;

      // Award Jannah points every 10 dhikr
      if (newCount % 10 === 0) {
        const points = Math.floor(selectedEvent.jannah_points_reward * selectedEvent.bonus_multiplier);
        
        // Get current profile to update points
        const { data: profile } = await supabase
          .from('profiles')
          .select('jannah_points')
          .eq('id', user.id)
          .single();

        if (profile) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({
              jannah_points: (profile.jannah_points || 0) + points
            })
            .eq('id', user.id);

          if (!profileError) {
            toast({
              title: `+${points} Jannah Points! ✨`,
              description: `${newCount} dhikr completed!`
            });
          }
        }
      }
    } catch (error) {
      console.error('Error recording dhikr:', error);
    }
  };

  const getDhikrText = (type: string) => {
    switch (type) {
      case 'allahu_akbar': return 'اللهُ أَكْبَر';
      case 'alhamdulillah': return 'الْحَمْدُ لِلَّهِ';
      case 'subhanallah': return 'سُبْحَانَ اللَّهِ';
      case 'la_ilaha_illa_allah': return 'لَا إِلَهَ إِلَّا اللَّهُ';
      default: return 'سُبْحَانَ اللَّهِ';
    }
  };

  const getDhikrTranslation = (type: string) => {
    switch (type) {
      case 'allahu_akbar': return 'Allah is the Greatest';
      case 'alhamdulillah': return 'All praise is due to Allah';
      case 'subhanallah': return 'Glory be to Allah';
      case 'la_ilaha_illa_allah': return 'There is no god but Allah';
      default: return 'Glory be to Allah';
    }
  };

  if (!activeEvents || activeEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            Live Dhikr Session
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No Active Sessions</h3>
            <p className="text-gray-500">Check back later for upcoming dhikr sessions.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Event Selection */}
      {activeEvents.length > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2 flex-wrap">
              {activeEvents.map((event) => (
                <Button
                  key={event.id}
                  variant={selectedEvent?.id === event.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedEvent(event)}
                  className="text-xs"
                >
                  {event.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Session Interface */}
      {selectedEvent && (
        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-emerald-600" />
                {selectedEvent.title}
              </CardTitle>
              <Badge className="bg-emerald-100 text-emerald-800">
                <Users className="h-3 w-3 mr-1" />
                {eventStats?.participantCount || 0} participants
              </Badge>
            </div>
            <p className="text-gray-600">{selectedEvent.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Community Progress</span>
                <span>{eventStats?.totalCount || 0} / {selectedEvent.target_count}</span>
              </div>
              <Progress 
                value={eventStats?.progress || 0} 
                className="h-3"
              />
            </div>

            {/* Dhikr Interface */}
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <div className="text-3xl font-arabic" dir="rtl">
                  {getDhikrText(selectedEvent.dhikr_type)}
                </div>
                <div className="text-gray-600 italic">
                  {getDhikrTranslation(selectedEvent.dhikr_type)}
                </div>
              </div>

              {!isParticipating ? (
                <Button
                  onClick={handleJoinEvent}
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Join Session
                </Button>
              ) : (
                <div className="space-y-4">
                  <Button
                    onClick={handleDhikrClick}
                    size="lg"
                    className={cn(
                      "bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-6 text-xl rounded-full transition-all duration-300",
                      isAnimating && "scale-110 bg-emerald-500"
                    )}
                  >
                    <Heart className="h-6 w-6 mr-2" />
                    Tap to Recite
                  </Button>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600">{personalCount}</div>
                    <div className="text-sm text-gray-600">Your count</div>
                  </div>
                </div>
              )}
            </div>

            {/* Rewards Info */}
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <Zap className="h-4 w-4 text-yellow-500" />
                Earn {selectedEvent.jannah_points_reward} Jannah points every 10 recitations
                {selectedEvent.bonus_multiplier > 1 && (
                  <Badge variant="outline" className="ml-2">
                    {selectedEvent.bonus_multiplier}x Bonus!
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LiveDhikrSession;

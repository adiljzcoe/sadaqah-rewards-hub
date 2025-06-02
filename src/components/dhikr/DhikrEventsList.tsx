
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Calendar, Clock, Users, Target, Star } from 'lucide-react';
import { format } from 'date-fns';

const DhikrEventsList = () => {
  const { data: events } = useQuery({
    queryKey: ['dhikr-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dhikr_events')
        .select('*')
        .eq('is_active', true)
        .order('start_time', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const isEventActive = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    return now >= start && now <= end;
  };

  const getEventStatus = (startTime: string, endTime: string) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return { status: 'upcoming', label: 'Upcoming' };
    if (now >= start && now <= end) return { status: 'active', label: 'Live Now' };
    return { status: 'completed', label: 'Completed' };
  };

  const getDhikrTypeDisplay = (type: string) => {
    switch (type) {
      case 'allahu_akbar': return { arabic: 'اللهُ أَكْبَر', english: 'Allahu Akbar' };
      case 'alhamdulillah': return { arabic: 'الْحَمْدُ لِلَّهِ', english: 'Alhamdulillah' };
      case 'subhanallah': return { arabic: 'سُبْحَانَ اللَّهِ', english: 'Subhanallah' };
      case 'la_ilaha_illa_allah': return { arabic: 'لَا إِلَهَ إِلَّا اللَّهُ', english: 'La ilaha illa Allah' };
      default: return { arabic: 'سُبْحَانَ اللَّهِ', english: 'Subhanallah' };
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Dhikr Events Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Join scheduled dhikr sessions with the global Muslim community. Set reminders and earn 
            collective rewards as we remember Allah together.
          </p>

          <div className="space-y-4">
            {events?.map((event) => {
              const eventStatus = getEventStatus(event.start_time, event.end_time);
              const dhikrType = getDhikrTypeDisplay(event.dhikr_type);
              
              return (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <Badge 
                            variant={eventStatus.status === 'active' ? 'default' : 'secondary'}
                            className={
                              eventStatus.status === 'active' 
                                ? 'bg-green-500 text-white animate-pulse' 
                                : ''
                            }
                          >
                            {eventStatus.label}
                          </Badge>
                          {event.is_recurring && (
                            <Badge variant="outline" className="text-xs">
                              {event.recurrence_pattern}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>
                            {format(new Date(event.start_time), 'MMM dd, HH:mm')} - 
                            {format(new Date(event.end_time), 'HH:mm')}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-gray-500" />
                          <span>Target: {event.target_count.toLocaleString()} recitations</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-center p-3 bg-emerald-50 rounded-lg">
                          <div className="text-lg font-arabic" dir="rtl">{dhikrType.arabic}</div>
                          <div className="text-sm text-gray-600">{dhikrType.english}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{event.jannah_points_reward} points</span>
                        </div>
                        {event.bonus_multiplier > 1 && (
                          <Badge variant="outline" className="text-orange-600">
                            {event.bonus_multiplier}x Bonus
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {eventStatus.status === 'active' && (
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            Join Now
                          </Button>
                        )}
                        {eventStatus.status === 'upcoming' && (
                          <Button variant="outline" size="sm">
                            Set Reminder
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!events || events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Events Scheduled</h3>
              <p className="text-gray-500">Check back later for upcoming dhikr sessions.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrEventsList;

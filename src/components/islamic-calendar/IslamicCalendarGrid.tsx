
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import IslamicCalendarEvent from './IslamicCalendarEvent';
import CountdownTimer from './CountdownTimer';
import { getUpcomingIslamicEvents, getDaysUntilEvent, getCurrentIslamicDate, formatIslamicDate } from '@/utils/islamicCalendar';

const IslamicCalendarGrid = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  
  const islamicEvents = useMemo(() => getUpcomingIslamicEvents(), []);
  const currentIslamicDate = useMemo(() => getCurrentIslamicDate(), []);
  
  // Filter events happening in the next 30 days for upcoming section
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    return islamicEvents
      .filter(event => {
        const daysUntil = getDaysUntilEvent(event.gregorianDate);
        return daysUntil >= 0 && daysUntil <= 30;
      })
      .map(event => ({
        ...event,
        countdown: getDaysUntilEvent(event.gregorianDate),
        isToday: getDaysUntilEvent(event.gregorianDate) === 0,
        isUpcoming: getDaysUntilEvent(event.gregorianDate) <= 7 && getDaysUntilEvent(event.gregorianDate) > 0
      }))
      .sort((a, b) => a.countdown - b.countdown);
  }, [islamicEvents]);

  // Filter events for the main grid
  const filteredEvents = useMemo(() => {
    const filtered = selectedType === 'all' 
      ? islamicEvents 
      : islamicEvents.filter(event => event.type === selectedType);
    
    return filtered.map(event => ({
      ...event,
      countdown: getDaysUntilEvent(event.gregorianDate),
      isToday: getDaysUntilEvent(event.gregorianDate) === 0,
      isUpcoming: getDaysUntilEvent(event.gregorianDate) <= 7 && getDaysUntilEvent(event.gregorianDate) > 0,
      date: event.gregorianDate.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      })
    }));
  }, [islamicEvents, selectedType]);

  const eventTypes = [
    { value: 'all', label: 'All Events', icon: '📅' },
    { value: 'prayer', label: 'Prayers', icon: '🤲' },
    { value: 'fasting', label: 'Fasting', icon: '🌙' },
    { value: 'celebration', label: 'Celebrations', icon: '🎉' },
    { value: 'worship', label: 'Worship', icon: '📿' },
    { value: 'pilgrimage', label: 'Pilgrimage', icon: '🕋' }
  ];

  return (
    <div className="space-y-8">
      {/* Current Islamic Date */}
      <Card className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">Today's Islamic Date</h2>
          <p className="text-xl">{formatIslamicDate(currentIslamicDate)}</p>
          <p className="text-sm opacity-90 mt-2">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </CardContent>
      </Card>

      {/* Upcoming Events Highlights */}
      {upcomingEvents.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              Upcoming Sacred Days
              <Badge className="bg-white/20 text-white ml-2">
                {upcomingEvents.length} events
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.slice(0, 6).map((event) => (
                <CountdownTimer key={event.id} event={event} />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter Tabs */}
      <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full">
        <TabsList className="grid grid-cols-6 w-full">
          {eventTypes.map((type) => (
            <TabsTrigger 
              key={type.value} 
              value={type.value}
              className="flex items-center gap-1 text-xs"
            >
              <span>{type.icon}</span>
              <span className="hidden sm:inline">{type.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedType} className="mt-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <IslamicCalendarEvent key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Monthly View Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Islamic Calendar Overview
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Badge variant="outline" className="px-3 py-1">
                {currentIslamicDate.monthName} {currentIslamicDate.year} AH
              </Badge>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-600">
            <p className="mb-4">
              Stay connected with the Islamic calendar and never miss a sacred day.
              Each event brings its own blessings and opportunities for spiritual growth.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="font-semibold text-emerald-700">Prayer Days</div>
                <div className="text-emerald-600">Fridays & Sacred Nights</div>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-semibold text-blue-700">Fasting Days</div>
                <div className="text-blue-600">Ramadan & Sunnah Fasts</div>
              </div>
              <div className="p-3 bg-pink-50 rounded-lg">
                <div className="font-semibold text-pink-700">Celebrations</div>
                <div className="text-pink-600">Eid & Islamic Festivals</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-semibold text-purple-700">Worship</div>
                <div className="text-purple-600">Special Dhikr Days</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IslamicCalendarGrid;

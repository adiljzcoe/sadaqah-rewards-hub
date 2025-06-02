
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import IslamicCalendarEvent from './IslamicCalendarEvent';
import CountdownTimer from './CountdownTimer';

const IslamicCalendarGrid = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedType, setSelectedType] = useState<string>('all');

  // Mock data - this would come from your database
  const islamicEvents = [
    {
      id: '1',
      title: 'Jumu\'ah Prayer',
      description: 'The blessed Friday congregational prayer. A time for community gathering and spiritual reflection.',
      date: 'Every Friday',
      type: 'prayer' as const,
      significance: 'high' as const,
      countdown: 2,
      isUpcoming: true,
      color: 'bg-emerald-500',
      icon: '🕌'
    },
    {
      id: '2',
      title: 'Laylat al-Qadr',
      description: 'The Night of Power - better than a thousand months. Search for it in the last 10 nights of Ramadan.',
      date: 'Last 10 nights of Ramadan',
      type: 'worship' as const,
      significance: 'high' as const,
      countdown: 45,
      color: 'bg-purple-600',
      icon: '✨'
    },
    {
      id: '3',
      title: 'Eid al-Fitr',
      description: 'The Festival of Breaking the Fast. Celebration after the holy month of Ramadan.',
      date: '1st Shawwal',
      type: 'celebration' as const,
      significance: 'high' as const,
      countdown: 47,
      color: 'bg-pink-500',
      icon: '🎉'
    },
    {
      id: '4',
      title: 'Day of Arafah',
      description: 'The most important day of Hajj. Fasting is highly recommended for those not performing Hajj.',
      date: '9th Dhul Hijjah',
      type: 'fasting' as const,
      significance: 'high' as const,
      countdown: 120,
      color: 'bg-blue-600',
      icon: '🕌'
    },
    {
      id: '5',
      title: 'Eid al-Adha',
      description: 'The Festival of Sacrifice. Commemorating Ibrahim\'s willingness to sacrifice his son.',
      date: '10th Dhul Hijjah',
      type: 'celebration' as const,
      significance: 'high' as const,
      countdown: 121,
      color: 'bg-red-500',
      icon: '🐑'
    },
    {
      id: '6',
      title: 'Ashura',
      description: 'The 10th day of Muharram. A day of fasting and reflection.',
      date: '10th Muharram',
      type: 'fasting' as const,
      significance: 'medium' as const,
      countdown: 280,
      color: 'bg-indigo-600',
      icon: '🌙'
    }
  ];

  const upcomingEvents = islamicEvents
    .filter(event => event.countdown !== undefined && event.countdown <= 7)
    .sort((a, b) => (a.countdown || 0) - (b.countdown || 0));

  const filteredEvents = selectedType === 'all' 
    ? islamicEvents 
    : islamicEvents.filter(event => event.type === selectedType);

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
      {/* Upcoming Events Highlights */}
      {upcomingEvents.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-6 w-6" />
              Upcoming Sacred Days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event) => (
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
                Dhul Hijjah 1445
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

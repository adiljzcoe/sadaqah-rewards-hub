
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Star, Gift, BookOpen } from 'lucide-react';
import RamadanCalendarGrid from '@/components/ramadan/RamadanCalendarGrid';
import RamadanStats from '@/components/ramadan/RamadanStats';
import RamadanProgress from '@/components/ramadan/RamadanProgress';
import CompletedRewards from '@/components/ramadan/CompletedRewards';
import { useAuth } from '@/hooks/useAuth';

const RamadanCalendar = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('calendar');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50/30 to-pink-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calendar className="h-10 w-10 text-purple-600" />
            Ramadan Advent Calendar
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join us on a blessed journey through the 30 days of Ramadan. Each day brings a new dua, 
            spiritual reflection, and the opportunity to earn rewards through acts of charity.
          </p>
        </div>

        {/* Stats Overview */}
        <RamadanStats />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="calendar" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="duas" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Duas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <RamadanCalendarGrid />
          </TabsContent>

          <TabsContent value="progress">
            <RamadanProgress />
          </TabsContent>

          <TabsContent value="rewards">
            <CompletedRewards />
          </TabsContent>

          <TabsContent value="duas">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Daily Duas Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access all the beautiful duas from your completed days. Each dua is a treasure 
                  for your spiritual journey during Ramadan.
                </p>
                <div className="text-center text-gray-500">
                  Complete calendar days to unlock duas here!
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RamadanCalendar;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, Star, Calendar, Bell } from 'lucide-react';
import DhikrEventsList from '@/components/dhikr/DhikrEventsList';
import LiveDhikrSession from '@/components/dhikr/LiveDhikrSession';
import DhikrStats from '@/components/dhikr/DhikrStats';
import DhikrAchievements from '@/components/dhikr/DhikrAchievements';
import DhikrSubscriptions from '@/components/dhikr/DhikrSubscriptions';
import { useAuth } from '@/hooks/useAuth';

const DhikrCommunity = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('live');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-cyan-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-emerald-600" />
            Dhikr Community
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join our global community in remembering Allah. Participate in collective dhikr sessions, 
            earn Jannah points, and strengthen your spiritual connection with believers worldwide.
          </p>
        </div>

        {/* Stats Overview */}
        <DhikrStats />

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="live" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Live Session
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Subscriptions
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live">
            <LiveDhikrSession />
          </TabsContent>

          <TabsContent value="events">
            <DhikrEventsList />
          </TabsContent>

          <TabsContent value="subscriptions">
            <DhikrSubscriptions />
          </TabsContent>

          <TabsContent value="achievements">
            <DhikrAchievements />
          </TabsContent>

          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  See how our community is collectively remembering Allah and earning rewards together.
                </p>
                <div className="text-center text-gray-500">
                  Community leaderboard coming soon!
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DhikrCommunity;


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Users, Zap, Trophy } from 'lucide-react';

const DhikrStats = () => {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['dhikr-stats', user?.id],
    queryFn: async () => {
      // Get total community dhikr count
      const { data: totalCounts } = await supabase
        .from('dhikr_counts')
        .select('count_increment');

      const totalCommunityDhikr = totalCounts?.reduce((sum, count) => sum + count.count_increment, 0) || 0;

      // Get active participants count
      const { data: activeParticipants } = await supabase
        .from('dhikr_participation')
        .select('user_id')
        .gte('last_dhikr_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      const uniqueParticipants = new Set(activeParticipants?.map(p => p.user_id) || []).size;

      let userStats = null;
      if (user) {
        // Get user's personal dhikr stats
        const { data: userCounts } = await supabase
          .from('dhikr_counts')
          .select('count_increment')
          .eq('user_id', user.id);

        const userTotalDhikr = userCounts?.reduce((sum, count) => sum + count.count_increment, 0) || 0;

        // Get user's events participated
        const { data: userParticipation } = await supabase
          .from('dhikr_participation')
          .select('event_id')
          .eq('user_id', user.id);

        userStats = {
          totalDhikr: userTotalDhikr,
          eventsParticipated: userParticipation?.length || 0
        };
      }

      return {
        totalCommunityDhikr,
        activeParticipants: uniqueParticipants,
        userStats
      };
    },
    refetchInterval: 5000 // Refresh every 5 seconds for live updates
  });

  if (!user) {
    return (
      <Card className="mb-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Join the Dhikr Community</h3>
          <p>Sign in to participate in collective dhikr sessions and earn Jannah points!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8" />
            <div>
              <p className="text-green-100">Community Dhikr</p>
              <p className="text-2xl font-bold">
                {stats?.totalCommunityDhikr?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-green-100">Total recitations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8" />
            <div>
              <p className="text-teal-100">Active Members</p>
              <p className="text-2xl font-bold">{stats?.activeParticipants || 0}</p>
              <p className="text-sm text-teal-100">Last 24 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Zap className="h-8 w-8" />
            <div>
              <p className="text-purple-100">Your Dhikr</p>
              <p className="text-2xl font-bold">{stats?.userStats?.totalDhikr || 0}</p>
              <p className="text-sm text-purple-100">Personal count</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8" />
            <div>
              <p className="text-orange-100">Events Joined</p>
              <p className="text-2xl font-bold">{stats?.userStats?.eventsParticipated || 0}</p>
              <p className="text-sm text-orange-100">Sessions attended</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrStats;

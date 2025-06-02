
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar, Star, Coins, Trophy } from 'lucide-react';

const RamadanStats = () => {
  const { user } = useAuth();

  const { data: stats } = useQuery({
    queryKey: ['ramadan-stats', user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get user progress
      const { data: progress, error: progressError } = await supabase
        .from('ramadan_calendar_progress')
        .select('*')
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Get total days
      const { data: totalDays, error: daysError } = await supabase
        .from('ramadan_calendar_days')
        .select('day_number')
        .eq('is_active', true);

      if (daysError) throw daysError;

      // Calculate stats
      const completedDays = progress?.length || 0;
      const totalCoinsSpent = progress?.reduce((sum, p) => sum + p.sadaqah_coins_spent, 0) || 0;
      const totalPointsEarned = progress?.reduce((sum, p) => sum + p.bonus_points_earned, 0) || 0;
      const completionPercentage = totalDays ? Math.round((completedDays / totalDays.length) * 100) : 0;

      return {
        completedDays,
        totalDays: totalDays?.length || 30,
        totalCoinsSpent,
        totalPointsEarned,
        completionPercentage
      };
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <Card className="mb-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">Join the Ramadan Journey</h3>
          <p>Sign in to track your progress and earn rewards!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-8 w-8" />
            <div>
              <p className="text-green-100">Days Completed</p>
              <p className="text-2xl font-bold">
                {stats?.completedDays || 0}/{stats?.totalDays || 30}
              </p>
              <p className="text-sm text-green-100">
                {stats?.completionPercentage || 0}% complete
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Star className="h-8 w-8" />
            <div>
              <p className="text-blue-100">Jannah Points</p>
              <p className="text-2xl font-bold">{stats?.totalPointsEarned || 0}</p>
              <p className="text-sm text-blue-100">Total earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Coins className="h-8 w-8" />
            <div>
              <p className="text-purple-100">Coins Donated</p>
              <p className="text-2xl font-bold">{stats?.totalCoinsSpent || 0}</p>
              <p className="text-sm text-purple-100">Sadaqah coins</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8" />
            <div>
              <p className="text-orange-100">Current Streak</p>
              <p className="text-2xl font-bold">
                {stats?.completedDays >= 7 ? '7+' : stats?.completedDays || 0}
              </p>
              <p className="text-sm text-orange-100">Days in a row</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RamadanStats;

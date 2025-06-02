
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Gift, Crown, Award } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const CompletedRewards = () => {
  const { user } = useAuth();

  const { data: completedRewards } = useQuery({
    queryKey: ['completed-rewards', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('ramadan_calendar_progress')
        .select(`
          *,
          ramadan_calendar_days (
            day_number,
            title,
            special_reward,
            icon_name,
            background_color,
            bonus_points
          )
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">Sign in to View Rewards</h3>
          <p className="text-gray-500">Complete calendar days to earn amazing rewards!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Rewards Summary */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <Crown className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-bold">Your Treasure Chest</h3>
              <p className="text-yellow-100">
                {completedRewards?.length || 0} rewards unlocked from {completedRewards?.reduce((sum, r) => sum + r.bonus_points_earned, 0) || 0} total points!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Special Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {completedRewards?.filter(r => r.ramadan_calendar_days.day_number % 7 === 0).map((reward) => {
              const IconComponent = (LucideIcons as any)[reward.ramadan_calendar_days.icon_name] || LucideIcons.Star;
              return (
                <div key={reward.id} className="p-4 border-2 border-yellow-200 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${reward.ramadan_calendar_days.background_color}`}>
                      <IconComponent className="h-4 w-4 text-white" />
                    </div>
                    <div className="font-semibold text-yellow-800">
                      Weekly Milestone!
                    </div>
                  </div>
                  <div className="text-sm text-yellow-700">
                    Day {reward.ramadan_calendar_days.day_number}: {reward.ramadan_calendar_days.title}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* All Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            All Your Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          {completedRewards?.length ? (
            <div className="space-y-4">
              {completedRewards.map((reward) => {
                const IconComponent = (LucideIcons as any)[reward.ramadan_calendar_days.icon_name] || LucideIcons.Star;
                return (
                  <div key={reward.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-3 rounded-full ${reward.ramadan_calendar_days.background_color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">
                        Day {reward.ramadan_calendar_days.day_number}: {reward.ramadan_calendar_days.title}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        {reward.ramadan_calendar_days.special_reward}
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">
                          +{reward.bonus_points_earned} points
                        </Badge>
                        <Badge variant="outline">
                          {new Date(reward.completed_at).toLocaleDateString()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No rewards yet</h3>
              <p>Complete your first calendar day to start earning rewards!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletedRewards;

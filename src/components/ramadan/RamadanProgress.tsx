
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';
import { Calendar, Star, Target } from 'lucide-react';

const RamadanProgress = () => {
  const { user } = useAuth();

  const { data: progressData } = useQuery({
    queryKey: ['ramadan-detailed-progress', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data: progress, error } = await supabase
        .from('ramadan_calendar_progress')
        .select(`
          *,
          ramadan_calendar_days (
            day_number,
            title,
            bonus_points,
            special_reward
          )
        `)
        .eq('user_id', user.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      return progress;
    },
    enabled: !!user
  });

  const completedDays = progressData?.length || 0;
  const totalPoints = progressData?.reduce((sum, p) => sum + p.bonus_points_earned, 0) || 0;
  const weeklyProgress = Math.min(completedDays, 7);

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Ramadan Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-500">{completedDays}/30 days</span>
            </div>
            <Progress value={(completedDays / 30) * 100} className="h-3" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">This Week</span>
              <span className="text-sm text-gray-500">{weeklyProgress}/7 days</span>
            </div>
            <Progress value={(weeklyProgress / 7) * 100} className="h-3" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{totalPoints}</div>
              <div className="text-sm text-purple-700">Total Jannah Points</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{completedDays}</div>
              <div className="text-sm text-green-700">Days Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Milestones & Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>First Week Warrior</span>
              <Badge variant={completedDays >= 7 ? "default" : "secondary"}>
                {completedDays >= 7 ? "Achieved! 🎉" : `${Math.max(0, 7 - completedDays)} days to go`}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Halfway Hero</span>
              <Badge variant={completedDays >= 15 ? "default" : "secondary"}>
                {completedDays >= 15 ? "Achieved! 🎉" : `${Math.max(0, 15 - completedDays)} days to go`}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Ramadan Champion</span>
              <Badge variant={completedDays >= 30 ? "default" : "secondary"}>
                {completedDays >= 30 ? "Achieved! 🎉" : `${Math.max(0, 30 - completedDays)} days to go`}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {progressData?.length ? (
            <div className="space-y-3">
              {progressData.slice(0, 5).map((progress) => (
                <div key={progress.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">
                      Day {progress.ramadan_calendar_days.day_number}: {progress.ramadan_calendar_days.title}
                    </div>
                    <div className="text-sm text-gray-500">
                      Completed {new Date(progress.completed_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge>
                    +{progress.bonus_points_earned} points
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Start completing days to see your activity here!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RamadanProgress;

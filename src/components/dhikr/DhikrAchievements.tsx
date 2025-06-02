
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Star, Trophy, Crown, Zap, Users, Heart } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const DhikrAchievements = () => {
  const { user } = useAuth();

  const { data: achievements } = useQuery({
    queryKey: ['dhikr-achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dhikr_achievements')
        .select('*')
        .order('requirement_value', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: userAchievements } = useQuery({
    queryKey: ['user-dhikr-achievements', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_dhikr_achievements')
        .select('achievement_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(ua => ua.achievement_id);
    },
    enabled: !!user
  });

  const { data: userProgress } = useQuery({
    queryKey: ['user-dhikr-progress', user?.id],
    queryFn: async () => {
      if (!user) return null;

      // Get total dhikr count
      const { data: totalCounts } = await supabase
        .from('dhikr_counts')
        .select('count_increment')
        .eq('user_id', user.id);

      const totalDhikr = totalCounts?.reduce((sum, count) => sum + count.count_increment, 0) || 0;

      // Get events participated
      const { data: participatedEvents } = await supabase
        .from('dhikr_participation')
        .select('event_id')
        .eq('user_id', user.id);

      const eventsParticipated = participatedEvents?.length || 0;

      // Calculate consecutive days (simplified)
      const { data: recentParticipation } = await supabase
        .from('dhikr_participation')
        .select('last_dhikr_at')
        .eq('user_id', user.id)
        .not('last_dhikr_at', 'is', null)
        .order('last_dhikr_at', { ascending: false })
        .limit(7);

      let consecutiveDays = 0;
      if (recentParticipation && recentParticipation.length > 0) {
        const today = new Date();
        const dates = recentParticipation.map(p => new Date(p.last_dhikr_at!).toDateString());
        const uniqueDates = [...new Set(dates)];
        
        for (let i = 0; i < uniqueDates.length; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          if (uniqueDates.includes(checkDate.toDateString())) {
            consecutiveDays++;
          } else {
            break;
          }
        }
      }

      return {
        total_dhikr: totalDhikr,
        event_participation: eventsParticipated,
        consecutive_days: consecutiveDays
      };
    },
    enabled: !!user
  });

  const getProgressValue = (achievement: any) => {
    if (!userProgress) return 0;
    
    const currentValue = userProgress[achievement.requirement_type as keyof typeof userProgress] || 0;
    return Math.min((currentValue / achievement.requirement_value) * 100, 100);
  };

  const getCurrentValue = (achievement: any) => {
    if (!userProgress) return 0;
    return userProgress[achievement.requirement_type as keyof typeof userProgress] || 0;
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || Star;
    return IconComponent;
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Dhikr Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Sign in to track your dhikr achievements and earn rewards.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Dhikr Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Earn achievements by participating in dhikr sessions and completing spiritual milestones.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {achievements?.map((achievement) => {
              const isEarned = userAchievements?.includes(achievement.id);
              const progress = getProgressValue(achievement);
              const currentValue = getCurrentValue(achievement);
              const IconComponent = getIconComponent(achievement.badge_icon);

              return (
                <Card 
                  key={achievement.id} 
                  className={`transition-all ${isEarned ? 'ring-2 ring-yellow-400 bg-yellow-50' : ''}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-full ${achievement.badge_color} ${isEarned ? 'text-white' : 'text-gray-600'}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {isEarned && (
                            <Badge className="bg-yellow-500 text-white">
                              ✓ Earned
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{currentValue} / {achievement.requirement_value}</span>
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{achievement.jannah_points_reward} Jannah Points</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {achievements && achievements.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No Achievements Available</h3>
              <p className="text-gray-500">Check back later for new achievements to unlock.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DhikrAchievements;

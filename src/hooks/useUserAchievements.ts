
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement_type: string;
  requirement_value: number;
  points_reward: number;
  rarity: string;
  icon: string;
}

interface UserAchievement {
  id: string;
  achievement_id: string;
  earned_at: string;
  points_awarded: number;
  achievements: Achievement;
}

export const useUserAchievements = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userAchievements, isLoading } = useQuery({
    queryKey: ['user-achievements', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('user_achievements')
        .select(`
          *,
          achievements (*)
        `)
        .eq('user_id', user.id)
        .order('earned_at', { ascending: false });
      
      if (error) throw error;
      
      // Map the data to match our interface
      return data.map(item => ({
        id: item.id,
        achievement_id: item.achievement_id,
        earned_at: item.earned_at,
        points_awarded: item.points_awarded || item.achievements?.points_reward || 0,
        achievements: item.achievements
      })) as UserAchievement[];
    },
    enabled: !!user?.id,
  });

  const { data: availableAchievements } = useQuery({
    queryKey: ['achievements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .order('points_reward');
      
      if (error) throw error;
      return data as Achievement[];
    },
  });

  const awardAchievement = useMutation({
    mutationFn: async ({ achievementId, pointsAwarded }: { achievementId: string; pointsAwarded: number }) => {
      if (!user?.id) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('user_achievements')
        .insert({
          user_id: user.id,
          achievement_id: achievementId,
          points_awarded: pointsAwarded
        })
        .select(`
          *,
          achievements (*)
        `)
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user-achievements', user?.id] });
      toast({
        title: "Achievement Unlocked! 🏆",
        description: `You earned "${data.achievements.name}" for ${data.points_awarded || data.achievements.points_reward} points!`,
      });
    },
  });

  return {
    userAchievements,
    availableAchievements,
    awardAchievement: awardAchievement.mutate,
    isLoading,
  };
};

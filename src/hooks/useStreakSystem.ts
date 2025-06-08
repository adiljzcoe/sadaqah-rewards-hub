
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useStreakConfig = () => {
  return useQuery({
    queryKey: ['streak-config'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('streak_config')
        .select('*')
        .order('threshold', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUserStreaks = () => {
  return useQuery({
    queryKey: ['user-streaks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_streaks')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          )
        `)
        .order('current_streak', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUpdateStreakConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('streak_config')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streak-config'] });
      toast({ title: 'Streak configuration updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating configuration', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useGrantStreakFreeze = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_streaks')
        .update({ freeze_count: supabase.raw('freeze_count + 1') })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaks'] });
      toast({ title: 'Streak freeze granted successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error granting streak freeze', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useResetUserStreak = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await supabase
        .from('user_streaks')
        .update({ 
          current_streak: 0,
          status: 'broken'
        })
        .eq('user_id', userId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaks'] });
      toast({ title: 'User streak reset successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error resetting streak', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useCreateStreakConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (configData: {
      name: string;
      reward_type: string;
      reward_value: number;
      threshold: number;
      is_active: boolean;
    }) => {
      const { error } = await supabase
        .from('streak_config')
        .insert([configData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streak-config'] });
      toast({ title: 'Streak rule created successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error creating streak rule', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

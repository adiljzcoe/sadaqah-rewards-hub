
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leagues')
        .select('*')
        .order('min_points', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUserLeagues = () => {
  return useQuery({
    queryKey: ['user-leagues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_leagues')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          ),
          leagues:league_id (
            name,
            icon,
            color
          )
        `)
        .order('current_points', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUpdateLeague = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('leagues')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      toast({ title: 'League updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating league', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useCreateLeague = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (leagueData: {
      name: string;
      min_points: number;
      max_points: number;
      icon: string;
      color: string;
      reward_multiplier: number;
      is_active: boolean;
    }) => {
      const { error } = await supabase
        .from('leagues')
        .insert([leagueData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      toast({ title: 'League created successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error creating league', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSpiritualActivitiesData = () => {
  return useQuery({
    queryKey: ['spiritual-activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spiritual_activities')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUserSpiritualActivities = () => {
  return useQuery({
    queryKey: ['user-spiritual-activities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_spiritual_activities')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          ),
          spiritual_activities:activity_id (
            name,
            emoji
          )
        `)
        .order('completed_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data;
    }
  });
};

export const useUpdateSpiritualActivity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('spiritual_activities')
        .update({ is_active })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spiritual-activities'] });
      toast({ title: 'Activity updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating activity', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useCreateSpiritualActivity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (activityData: {
      name: string;
      type: string;
      points_reward: number;
      emoji: string;
      description: string;
      is_active: boolean;
    }) => {
      const { error } = await supabase
        .from('spiritual_activities')
        .insert([activityData]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spiritual-activities'] });
      toast({ title: 'Spiritual activity created successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error creating activity', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

// Original hook for the SpiritualActivitiesMenu component
export const useSpiritualActivities = () => {
  const activities = [
    {
      id: '1',
      emoji: '🕌',
      description: 'Ahmed just completed Fajr prayer',
      tag: 'prayer',
      color: 'text-green-400',
      trending: true
    },
    {
      id: '2',
      emoji: '📖',
      description: 'Fatima read 5 verses of Quran',
      tag: 'quran',
      color: 'text-purple-400',
      trending: false
    },
    {
      id: '3',
      emoji: '🤲',
      description: 'Ali completed 100 dhikr',
      tag: 'dhikr',
      color: 'text-blue-400',
      trending: true
    },
    {
      id: '4',
      emoji: '💰',
      description: 'Sara made a charity donation',
      tag: 'charity',
      color: 'text-orange-400',
      trending: false
    },
    {
      id: '5',
      emoji: '🌙',
      description: 'Omar completed evening prayers',
      tag: 'prayer',
      color: 'text-indigo-400',
      trending: true
    },
    {
      id: '6',
      emoji: '❤️',
      description: 'Aisha made a heartfelt dua',
      tag: 'dua',
      color: 'text-pink-400',
      trending: false
    }
  ];

  const totalParticipants = 12847;

  const recordSpiritualActivity = (activityType: string, points: number) => {
    console.log(`Recording ${activityType} activity for ${points} points`);
    // This could later be connected to the database
  };

  return {
    activities,
    totalParticipants,
    recordSpiritualActivity
  };
};

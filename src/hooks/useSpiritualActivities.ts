
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// Mock data since the spiritual activities tables don't exist in Supabase yet
const mockSpiritualActivities = [
  {
    id: '1',
    name: 'Morning Prayer',
    type: 'prayer',
    points_reward: 10,
    emoji: '🤲',
    description: 'Complete your morning prayer',
    is_active: true,
    created_at: new Date().toISOString()
  },
  {
    id: '2', 
    name: 'Quran Reading',
    type: 'quran',
    points_reward: 15,
    emoji: '📖',
    description: 'Read Quran for 10 minutes',
    is_active: true,
    created_at: new Date().toISOString()
  }
];

const mockUserSpiritualActivities = [
  {
    id: '1',
    completed_at: new Date().toISOString(),
    points_earned: 10,
    streak_count: 5,
    profiles: { full_name: 'Ahmad Ali' },
    spiritual_activities: { emoji: '🤲', name: 'Morning Prayer' }
  }
];

export const useSpiritualActivitiesData = () => {
  return useQuery({
    queryKey: ['spiritual-activities'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockSpiritualActivities;
    }
  });
};

export const useUserSpiritualActivities = () => {
  return useQuery({
    queryKey: ['user-spiritual-activities'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockUserSpiritualActivities;
    }
  });
};

export const useUpdateSpiritualActivity = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Updating spiritual activity', id, is_active);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spiritual-activities'] });
      toast({ title: 'Activity updated successfully' });
    },
    onError: (error: any) => {
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
      // Mock implementation since the table doesn't exist
      console.log('Mock: Creating spiritual activity', activityData);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spiritual-activities'] });
      toast({ title: 'Spiritual activity created successfully' });
    },
    onError: (error: any) => {
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

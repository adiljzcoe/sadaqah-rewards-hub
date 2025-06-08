
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// Mock data since the streak system tables don't exist in Supabase yet
const mockStreakConfig = [
  {
    id: '1',
    name: '7 Day Streak',
    reward_type: 'points',
    reward_value: 100,
    threshold: 7,
    is_active: true
  },
  {
    id: '2',
    name: '30 Day Streak',
    reward_type: 'coins',
    reward_value: 50,
    threshold: 30,
    is_active: true
  }
];

const mockUserStreaks = [
  {
    id: '1',
    user_id: 'user1',
    current_streak: 15,
    status: 'active',
    freeze_count: 2,
    profiles: { full_name: 'Ahmad Ali', email: 'ahmad@example.com' }
  },
  {
    id: '2',
    user_id: 'user2',
    current_streak: 7,
    status: 'active',
    freeze_count: 0,
    profiles: { full_name: 'Fatima Khan', email: 'fatima@example.com' }
  }
];

export const useStreakConfig = () => {
  return useQuery({
    queryKey: ['streak-config'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockStreakConfig;
    }
  });
};

export const useUserStreaks = () => {
  return useQuery({
    queryKey: ['user-streaks'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockUserStreaks;
    }
  });
};

export const useUpdateStreakConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Updating streak config', id, is_active);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streak-config'] });
      toast({ title: 'Streak configuration updated successfully' });
    },
    onError: (error: any) => {
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
      // Mock implementation since the table doesn't exist
      console.log('Mock: Granting streak freeze to user', userId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaks'] });
      toast({ title: 'Streak freeze granted successfully' });
    },
    onError: (error: any) => {
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
      // Mock implementation since the table doesn't exist
      console.log('Mock: Resetting user streak', userId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-streaks'] });
      toast({ title: 'User streak reset successfully' });
    },
    onError: (error: any) => {
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
      // Mock implementation since the table doesn't exist
      console.log('Mock: Creating streak config', configData);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['streak-config'] });
      toast({ title: 'Streak rule created successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error creating streak rule', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

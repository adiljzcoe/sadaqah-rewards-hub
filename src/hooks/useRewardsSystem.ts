
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

// Mock data since the reward system tables don't exist in Supabase yet
const mockPointsConfig = [
  { id: '1', action_type: 'donation', points_per_pound: 10, is_active: true },
  { id: '2', action_type: 'prayer_checkin', base_points: 25, is_active: true },
  { id: '3', action_type: 'quran_reading', base_points: 30, is_active: true }
];

const mockCoinsConfig = [
  { id: '1', action_type: 'donation', coins_per_pound: 5, is_active: true },
  { id: '2', action_type: 'daily_login', base_coins: 10, is_active: true },
  { id: '3', action_type: 'charity_share', base_coins: 15, is_active: true }
];

const mockMultiplierEvents = [
  {
    id: '1',
    name: 'Ramadan Boost',
    multiplier: 2.0,
    start_date: '2024-03-10',
    end_date: '2024-04-09',
    is_active: true,
    description: 'Double points during Ramadan'
  },
  {
    id: '2',
    name: 'Friday Blessing',
    multiplier: 1.5,
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    is_active: true,
    description: '50% bonus on Fridays'
  }
];

export const usePointsConfig = () => {
  return useQuery({
    queryKey: ['points-config'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockPointsConfig;
    }
  });
};

export const useCoinsConfig = () => {
  return useQuery({
    queryKey: ['coins-config'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockCoinsConfig;
    }
  });
};

export const useMultiplierEvents = () => {
  return useQuery({
    queryKey: ['multiplier-events'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockMultiplierEvents;
    }
  });
};

export const useUpdatePointsConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Updating points config', id, data);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['points-config'] });
      toast({ title: 'Points configuration updated successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating points configuration',
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateCoinsConfig = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Updating coins config', id, data);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['coins-config'] });
      toast({ title: 'Coins configuration updated successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error updating coins configuration',
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useCreateMultiplierEvent = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (eventData: {
      name: string;
      multiplier: number;
      start_date: string;
      end_date: string;
      description?: string;
    }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Creating multiplier event', eventData);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['multiplier-events'] });
      toast({ title: 'Multiplier event created successfully' });
    },
    onError: (error: any) => {
      toast({
        title: 'Error creating multiplier event',
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

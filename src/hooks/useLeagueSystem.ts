
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { leagues, getUserLeague, getNextLeague } from '@/utils/leagueSystem';

// Mock data since the tables don't exist in Supabase yet
const mockLeagues = leagues;

const mockUserLeagues = [
  {
    id: '1',
    user_id: 'user1',
    league_id: 'gold',
    current_points: 5000,
    total_donations: 25000,
    rank_position: 1,
    season: '2024',
    last_updated: new Date().toISOString(),
    profiles: { full_name: 'Ahmad Ali', email: 'ahmad@example.com' },
    leagues: { name: 'Gold Donors', icon: '🥇', color: 'text-yellow-500' }
  },
  {
    id: '2',
    user_id: 'user2',
    league_id: 'silver',
    current_points: 2500,
    total_donations: 12500,
    rank_position: 2,
    season: '2024',
    last_updated: new Date().toISOString(),
    profiles: { full_name: 'Fatima Khan', email: 'fatima@example.com' },
    leagues: { name: 'Silver Hearts', icon: '🥈', color: 'text-gray-500' }
  }
];

export const useLeagues = () => {
  return useQuery({
    queryKey: ['leagues'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockLeagues;
    }
  });
};

export const useUserLeagues = () => {
  return useQuery({
    queryKey: ['user-leagues'],
    queryFn: async () => {
      // Return mock data since the table doesn't exist
      return mockUserLeagues;
    }
  });
};

export const useUpdateLeague = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      // Mock implementation since the table doesn't exist
      console.log('Mock: Updating league', id, is_active);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      toast({ title: 'League updated successfully' });
    },
    onError: (error: any) => {
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
      // Mock implementation since the table doesn't exist
      console.log('Mock: Creating league', leagueData);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leagues'] });
      toast({ title: 'League created successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error creating league', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

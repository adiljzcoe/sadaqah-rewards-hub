
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/useAuth';

// Mock Supabase client for now
const mockSupabase = {
  from: (table: string) => ({
    select: (fields?: string) => ({
      eq: (field: string, value: any) => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    update: (data: any) => ({
      eq: (field: string, value: any) => Promise.resolve({ data: null, error: null })
    })
  })
};

export const useMasjidManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's masjid role
  const { data: userMasjidRole } = useQuery({
    queryKey: ['user-masjid-role', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await mockSupabase
        .from('masjid_staff')
        .select(`
          *,
          masjids (
            id,
            name,
            location,
            verified
          )
        `)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.log('No masjid role found for user');
        return null;
      }

      return data;
    },
    enabled: !!user
  });

  // Create event mutation
  const createEvent = useMutation({
    mutationFn: async (eventData: any) => {
      const { data, error } = await mockSupabase
        .from('masjid_events')
        .insert(eventData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masjid-events'] });
    }
  });

  // Create masjid website mutation
  const createMasjidWebsite = useMutation({
    mutationFn: async (websiteData: any) => {
      const { data, error } = await mockSupabase
        .from('masjid_websites')
        .insert(websiteData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['masjid-websites'] });
    }
  });

  // Update prayer times mutation
  const updatePrayerTimes = useMutation({
    mutationFn: async (prayerTimesData: any) => {
      const { data, error } = await mockSupabase
        .from('prayer_times')
        .update(prayerTimesData)
        .eq('masjid_id', userMasjidRole?.masjid_id);

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prayer-times'] });
    }
  });

  return {
    userMasjidRole,
    createEvent,
    createMasjidWebsite,
    updatePrayerTimes
  };
};

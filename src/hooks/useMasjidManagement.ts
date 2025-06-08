
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export const useMasjidManagement = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Get user's masjid role
  const { data: userMasjidRole } = useQuery({
    queryKey: ['user-masjid-role', user?.id],
    queryFn: async () => {
      if (!user) return null;

      const { data, error } = await supabase
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
      const { data, error } = await supabase
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
      const { data, error } = await supabase
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

  return {
    userMasjidRole,
    createEvent,
    createMasjidWebsite
  };
};

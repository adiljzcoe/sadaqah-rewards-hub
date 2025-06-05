
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_charity?: string;
  page_url?: string;
  referrer?: string;
}

export const useUTMTracking = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const trackUTM = useMutation({
    mutationFn: async (utmData: UTMData) => {
      const sessionId = sessionStorage.getItem('session_id') || crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);

      const trackingData = {
        user_id: user?.id || null,
        session_id: sessionId,
        ...utmData,
        page_url: window.location.href,
        referrer: document.referrer
      };

      // Check if we already have tracking for this session/user
      const { data: existing } = await supabase
        .from('utm_tracking')
        .select('id')
        .eq('session_id', sessionId)
        .single();

      if (existing) {
        // Update existing record
        const { data, error } = await supabase
          .from('utm_tracking')
          .update({
            last_touch_timestamp: new Date().toISOString(),
            total_visits: 1 // Will be incremented by trigger
          })
          .eq('id', existing.id)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      } else {
        // Create new record
        const { data, error } = await supabase
          .from('utm_tracking')
          .insert(trackingData)
          .select()
          .single();
        
        if (error) throw error;
        return data;
      }
    },
  });

  const { data: userUTMHistory } = useQuery({
    queryKey: ['utm-history', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from('utm_tracking')
        .select('*')
        .eq('user_id', user.id)
        .order('first_touch_timestamp', { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Helper methods for tracking
  const trackDonation = (donationData: any) => {
    console.log('Tracking donation:', donationData);
    // This would integrate with the donation tracking system
  };

  const trackClick = (element: string, category: string) => {
    console.log('Tracking click:', element, category);
    // This would track user interactions
  };

  const getAttributionData = () => {
    const sessionId = sessionStorage.getItem('session_id');
    return {
      sessionId,
      timestamp: new Date().toISOString(),
    };
  };

  return {
    trackUTM: trackUTM.mutate,
    userUTMHistory,
    isTracking: trackUTM.isPending,
    trackDonation,
    trackClick,
    getAttributionData,
  };
};

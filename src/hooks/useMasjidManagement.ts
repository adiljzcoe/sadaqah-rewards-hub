
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface MasjidWebsite {
  id: string;
  masjid_id: string;
  subdomain_slug: string;
  custom_domain?: string;
  domain_verified: boolean;
  website_settings: any;
  theme_settings: any;
  is_active: boolean;
  masjids?: {
    name: string;
    location: string;
    verified: boolean;
  };
}

export interface PrayerTimes {
  id: string;
  masjid_id: string;
  prayer_date: string;
  fajr_time: string;
  sunrise_time?: string;
  dhuhr_time: string;
  asr_time: string;
  maghrib_time: string;
  isha_time: string;
}

export interface MasjidEvent {
  id: string;
  masjid_id: string;
  title: string;
  description?: string;
  event_type: string;
  start_date: string;
  end_date?: string;
  location?: string;
  capacity?: number;
  registration_required: boolean;
  registration_fee: number;
  image_url?: string;
  organizer_name?: string;
  organizer_contact?: string;
  is_recurring: boolean;
  recurrence_pattern?: string;
  is_published: boolean;
}

export const useMasjidManagement = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get current user's masjid staff role
  const { data: userMasjidRole } = useQuery({
    queryKey: ['user-masjid-role'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_staff')
        .select(`
          id,
          masjid_id,
          role,
          permissions,
          masjids (
            id,
            name,
            location,
            verified
          )
        `)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .eq('is_active', true)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  // Create masjid website
  const createMasjidWebsite = useMutation({
    mutationFn: async (data: {
      masjid_id: string;
      subdomain_slug: string;
      custom_domain?: string;
      website_settings?: any;
      theme_settings?: any;
    }) => {
      const { data: website, error } = await supabase
        .from('masjid_websites')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return website;
    },
    onSuccess: () => {
      toast({ title: "Website created successfully!" });
      queryClient.invalidateQueries({ queryKey: ['masjid-websites'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error creating website",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update prayer times
  const updatePrayerTimes = useMutation({
    mutationFn: async (data: Omit<PrayerTimes, 'id'>) => {
      const { data: prayerTimes, error } = await supabase
        .from('masjid_prayer_times')
        .upsert(data, {
          onConflict: 'masjid_id,prayer_date'
        })
        .select()
        .single();

      if (error) throw error;
      return prayerTimes;
    },
    onSuccess: () => {
      toast({ title: "Prayer times updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ['prayer-times'] });
    }
  });

  // Create event
  const createEvent = useMutation({
    mutationFn: async (data: Omit<MasjidEvent, 'id'>) => {
      const { data: event, error } = await supabase
        .from('masjid_events')
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return event;
    },
    onSuccess: () => {
      toast({ title: "Event created successfully!" });
      queryClient.invalidateQueries({ queryKey: ['masjid-events'] });
    }
  });

  return {
    userMasjidRole,
    createMasjidWebsite,
    updatePrayerTimes,
    createEvent
  };
};

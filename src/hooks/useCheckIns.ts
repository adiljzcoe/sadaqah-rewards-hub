import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CheckInLocation {
  id: string;
  name: string;
  location_type: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  verified: boolean;
  jannah_points_reward: number;
}

interface UserCheckIn {
  id: string;
  location_id: string;
  check_in_time: string;
  jannah_points_earned: number;
  notes?: string;
  location?: CheckInLocation;
}

interface GoodDeedOption {
  id: string;
  label: string;
  points: number;
  icon: string;
}

export const useCheckIns = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const goodDeedOptions: GoodDeedOption[] = [
    { id: 'visiting_family', label: 'Visiting Family', points: 25, icon: 'home' },
    { id: 'mosque_visit', label: 'Mosque Visit', points: 50, icon: 'building2' },
    { id: 'charity_work', label: 'Charity Work', points: 40, icon: 'heart' },
    { id: 'helping_neighbor', label: 'Helping Neighbor', points: 30, icon: 'users' },
    { id: 'community_service', label: 'Community Service', points: 35, icon: 'users' },
    { id: 'islamic_study', label: 'Islamic Study Circle', points: 45, icon: 'graduationCap' },
    { id: 'feeding_poor', label: 'Feeding the Poor', points: 60, icon: 'utensils' },
    { id: 'visiting_sick', label: 'Visiting the Sick', points: 40, icon: 'heart' }
  ];

  const logGoodDeedWithGPS = async (goodDeedId: string, notes?: string) => {
    setLoading(true);
    try {
      // Get current position
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });

      const { latitude, longitude } = position.coords;
      const goodDeed = goodDeedOptions.find(deed => deed.id === goodDeedId);
      
      if (!goodDeed) {
        throw new Error('Good deed not found');
      }

      // Log the GPS coordinates and good deed
      const { data, error } = await supabase
        .from('user_check_ins')
        .insert({
          location_id: null, // No specific location, just GPS coordinates
          jannah_points_earned: goodDeed.points,
          notes: `${goodDeed.label}${notes ? ` - ${notes}` : ''} (GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)})`
        })
        .select()
        .single();

      if (error) throw error;

      // Also log to a separate GPS tracking table for marketing analysis
      await supabase
        .from('gps_good_deeds')
        .insert({
          good_deed_type: goodDeedId,
          latitude,
          longitude,
          accuracy: position.coords.accuracy,
          notes,
          jannah_points_earned: goodDeed.points
        });

      toast({
        title: "Good Deed Logged! 🎉",
        description: `You earned ${goodDeed.points} Jannah points for ${goodDeed.label}!`,
      });

      return data;
    } catch (error: any) {
      console.error('Error logging good deed:', error);
      if (error.code === 1) { // PERMISSION_DENIED
        toast({
          title: "Location Access Required",
          description: "Please enable location access to log good deeds.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Failed to Log Good Deed",
          description: "Something went wrong. Please try again.",
          variant: "destructive"
        });
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchNearbyLocations = async (latitude: number, longitude: number, radiusKm: number = 10) => {
    try {
      const { data, error } = await supabase
        .from('check_in_locations')
        .select('*')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .order('verified', { ascending: false })
        .order('jannah_points_reward', { ascending: false });

      if (error) throw error;

      // Filter by distance (simple calculation for demo)
      const nearby = data?.filter(location => {
        if (!location.latitude || !location.longitude) return false;
        const distance = calculateDistance(
          latitude, longitude, 
          Number(location.latitude), Number(location.longitude)
        );
        return distance <= radiusKm;
      }) || [];

      return nearby;
    } catch (error) {
      console.error('Error fetching nearby locations:', error);
      return [];
    }
  };

  const checkIn = async (locationId: string, notes?: string) => {
    setLoading(true);
    try {
      const { data: location } = await supabase
        .from('check_in_locations')
        .select('jannah_points_reward')
        .eq('id', locationId)
        .single();

      const { data, error } = await supabase
        .from('user_check_ins')
        .insert({
          location_id: locationId,
          jannah_points_earned: location?.jannah_points_reward || 25,
          notes
        })
        .select('*, check_in_locations(*)')
        .single();

      if (error) {
        if (error.message.includes('already checked in')) {
          toast({
            title: "Already Checked In Today",
            description: "You've already checked in to this location today. Come back tomorrow!",
            variant: "destructive"
          });
          return null;
        }
        throw error;
      }

      toast({
        title: "Check-in Successful! 🎉",
        description: `You earned ${data.jannah_points_earned} Jannah points!`,
      });

      return data;
    } catch (error) {
      console.error('Error checking in:', error);
      toast({
        title: "Check-in Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserCheckIns = async (limit: number = 10) => {
    try {
      const { data, error } = await supabase
        .from('user_check_ins')
        .select('*, check_in_locations(*)')
        .order('check_in_time', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching user check-ins:', error);
      return [];
    }
  };

  const getTodaysCheckIns = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('user_check_ins')
        .select('*, check_in_locations(*)')
        .gte('check_in_time', today)
        .lt('check_in_time', `${today}T23:59:59.999Z`)
        .order('check_in_time', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching today\'s check-ins:', error);
      return [];
    }
  };

  return {
    loading,
    goodDeedOptions,
    logGoodDeedWithGPS,
    fetchNearbyLocations,
    checkIn,
    getUserCheckIns,
    getTodaysCheckIns
  };
};

// Helper function to calculate distance between two points
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in kilometers
  return d;
};

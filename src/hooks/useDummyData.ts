
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from './use-toast';

interface DummyDataConfig {
  id: string;
  section_name: string;
  is_active: boolean;
  data_type: string;
  config: any;
  created_at: string;
  updated_at: string;
}

interface LiveActivity {
  id: string;
  type: 'donation' | 'registration' | 'achievement' | 'milestone';
  user_name: string;
  amount?: number;
  charity_name?: string;
  achievement_name?: string;
  location?: string;
  timestamp: string;
  is_dummy: boolean;
}

const DUMMY_NAMES = [
  'Ahmad K.', 'Fatima A.', 'Mohammed S.', 'Aisha R.', 'Ali H.', 'Khadija M.',
  'Omar B.', 'Zaynab F.', 'Hassan T.', 'Maryam J.', 'Yusuf L.', 'Hafsa N.',
  'Ibrahim C.', 'Ruqayya G.', 'Khalid P.', 'Sakinah W.', 'Tariq Q.', 'Umm Kulthum',
  'Bilal Z.', 'Asma V.', 'Hamza X.', 'Safiyyah Y.', 'Usman D.', 'Sumayyah E.'
];

const CHARITY_NAMES = [
  'Water Wells Foundation', 'Hope Orphanage Network', 'Emergency Relief International',
  'Education for All', 'Medical Aid Trust', 'Food Security Initiative', 'Shelter & Housing',
  'Clean Energy Projects', 'Disaster Relief Fund', 'Community Development'
];

const ACHIEVEMENTS = [
  'First Donation Milestone', 'Weekly Donor Badge', 'Generous Heart Award',
  'Community Champion', 'Consistent Giver', 'Impact Maker', 'Compassion Star',
  'Monthly Supporter', 'Charity Champion', 'Helping Hand Hero'
];

const LOCATIONS = [
  'London, UK', 'Birmingham, UK', 'Manchester, UK', 'Leicester, UK', 'Bradford, UK',
  'Luton, UK', 'Blackburn, UK', 'Oldham, UK', 'Toronto, Canada', 'New York, USA',
  'Sydney, Australia', 'Dubai, UAE', 'Kuala Lumpur, Malaysia', 'Jakarta, Indonesia'
];

export const useDummyData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [liveActivities, setLiveActivities] = useState<LiveActivity[]>([]);

  // Get dummy data configurations
  const { data: dummyConfigs, isLoading } = useQuery({
    queryKey: ['dummy-data-configs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('*')
        .like('setting_key', 'dummy_data_%');
      
      if (error) throw error;
      return data || [];
    },
  });

  // Generate live activity feed
  const generateLiveActivity = () => {
    const type = Math.random() < 0.6 ? 'donation' : 
                 Math.random() < 0.8 ? 'registration' : 
                 Math.random() < 0.9 ? 'achievement' : 'milestone';
    
    const activity: LiveActivity = {
      id: `dummy_${Date.now()}_${Math.random()}`,
      type,
      user_name: DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)],
      timestamp: new Date().toISOString(),
      is_dummy: true,
      location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]
    };

    switch (type) {
      case 'donation':
        activity.amount = Math.floor(Math.random() * 500) + 10;
        activity.charity_name = CHARITY_NAMES[Math.floor(Math.random() * CHARITY_NAMES.length)];
        break;
      case 'achievement':
        activity.achievement_name = ACHIEVEMENTS[Math.floor(Math.random() * ACHIEVEMENTS.length)];
        break;
      case 'milestone':
        activity.amount = [1000, 5000, 10000, 25000, 50000][Math.floor(Math.random() * 5)];
        activity.charity_name = CHARITY_NAMES[Math.floor(Math.random() * CHARITY_NAMES.length)];
        break;
    }

    return activity;
  };

  // Start live activity generation
  useEffect(() => {
    const isLiveFeedActive = dummyConfigs?.find(
      config => config.setting_key === 'dummy_data_live_feed' && config.setting_value === 'true'
    );

    if (!isLiveFeedActive) return;

    const interval = setInterval(() => {
      const newActivity = generateLiveActivity();
      setLiveActivities(prev => {
        const updated = [newActivity, ...prev].slice(0, 50); // Keep last 50 activities
        return updated;
      });
    }, Math.random() * 15000 + 5000); // Random interval between 5-20 seconds

    return () => clearInterval(interval);
  }, [dummyConfigs]);

  // Toggle dummy data for a section
  const toggleDummyData = useMutation({
    mutationFn: async ({ section, enabled }: { section: string; enabled: boolean }) => {
      const settingKey = `dummy_data_${section}`;
      
      const { data, error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: settingKey,
          setting_value: enabled.toString(),
        })
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dummy-data-configs'] });
      toast({
        title: "Dummy Data Updated",
        description: "Section dummy data has been toggled successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Check if a section has dummy data enabled
  const isDummyDataEnabled = (section: string) => {
    return dummyConfigs?.find(
      config => config.setting_key === `dummy_data_${section}` && config.setting_value === 'true'
    ) !== undefined;
  };

  // Generate dummy donations data
  const generateDummyDonations = () => {
    const donations = [];
    for (let i = 0; i < 20; i++) {
      donations.push({
        id: `dummy_donation_${i}`,
        amount: Math.floor(Math.random() * 500) + 10,
        donor_name: DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)],
        charity_name: CHARITY_NAMES[Math.floor(Math.random() * CHARITY_NAMES.length)],
        message: Math.random() < 0.3 ? "May Allah accept this donation" : null,
        created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        is_dummy: true
      });
    }
    return donations;
  };

  // Generate dummy leaderboard data
  const generateDummyLeaderboard = () => {
    const leaderboard = [];
    for (let i = 0; i < 10; i++) {
      leaderboard.push({
        id: `dummy_user_${i}`,
        name: DUMMY_NAMES[Math.floor(Math.random() * DUMMY_NAMES.length)],
        total_donated: Math.floor(Math.random() * 10000) + 500,
        rank: i + 1,
        streak: Math.floor(Math.random() * 30) + 1,
        jannah_points: Math.floor(Math.random() * 5000) + 100,
        is_dummy: true
      });
    }
    return leaderboard.sort((a, b) => b.total_donated - a.total_donated);
  };

  // Generate dummy statistics
  const generateDummyStats = () => {
    return {
      total_raised: Math.floor(Math.random() * 500000) + 100000,
      total_donors: Math.floor(Math.random() * 10000) + 2500,
      active_campaigns: Math.floor(Math.random() * 50) + 15,
      beneficiaries_helped: Math.floor(Math.random() * 25000) + 5000,
      countries_reached: Math.floor(Math.random() * 40) + 20,
    };
  };

  return {
    dummyConfigs,
    isLoading,
    liveActivities,
    toggleDummyData: toggleDummyData.mutate,
    isToggling: toggleDummyData.isPending,
    isDummyDataEnabled,
    generateDummyDonations,
    generateDummyLeaderboard,
    generateDummyStats,
  };
};

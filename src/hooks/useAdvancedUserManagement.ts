
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useAdvancedUserManagement() {
  // User segments query
  const { data: userSegments, isLoading: segmentsLoading } = useQuery({
    queryKey: ['user-segments'],
    queryFn: async () => {
      const now = new Date();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Get all users count
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get active users (last_sign_in_at within 30 days)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_sign_in_at', thirtyDaysAgo.toISOString());

      // Get VIP donors (total_donated >= £1000 = 100000 pence)
      const { count: vipDonors } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('total_donated', 100000);

      // Get dormant users (last_sign_in_at > 90 days ago OR null)
      const { count: dormantUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .or(`last_sign_in_at.lt.${ninetyDaysAgo.toISOString()},last_sign_in_at.is.null`);

      // Get new users (created_at within 7 days)
      const { count: newUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo.toISOString());

      // Calculate churn risk (users who donated before but not in last 60 days)
      const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);
      const { count: churnRisk } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('total_donated', 0)
        .lt('last_donation_date', sixtyDaysAgo.toISOString());

      return [
        { 
          id: 'all', 
          name: 'All Users', 
          count: totalUsers || 0, 
          growth: '+8%' // This could be calculated by comparing with previous period
        },
        { 
          id: 'active', 
          name: 'Active Donors (30d)', 
          count: activeUsers || 0, 
          growth: '+12%' 
        },
        { 
          id: 'vip', 
          name: 'VIP Donors (£1000+)', 
          count: vipDonors || 0, 
          growth: '+25%' 
        },
        { 
          id: 'dormant', 
          name: 'Dormant (90d+)', 
          count: dormantUsers || 0, 
          growth: '-5%' 
        },
        { 
          id: 'new', 
          name: 'New Users (7d)', 
          count: newUsers || 0, 
          growth: '+18%' 
        },
        { 
          id: 'churn_risk', 
          name: 'Churn Risk', 
          count: churnRisk || 0, 
          growth: '+3%' 
        }
      ];
    },
  });

  // VIP donors detailed query
  const { data: vipDonors, isLoading: vipLoading } = useQuery({
    queryKey: ['vip-donors'],
    queryFn: async () => {
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          total_donated,
          last_donation_date,
          donation_count,
          created_at
        `)
        .gte('total_donated', 100000)
        .order('total_donated', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Calculate tiers and risk scores for each VIP donor
      return profiles?.map(profile => {
        const totalDonated = profile.total_donated || 0;
        const lastDonation = profile.last_donation_date ? new Date(profile.last_donation_date) : null;
        const daysSinceLastDonation = lastDonation ? 
          Math.floor((new Date().getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24)) : 
          999;

        // Determine tier based on total donated (in pence)
        let tier = 'Bronze';
        if (totalDonated >= 500000) tier = 'Platinum'; // £5000+
        else if (totalDonated >= 200000) tier = 'Gold'; // £2000+
        else if (totalDonated >= 100000) tier = 'Silver'; // £1000+

        // Calculate risk score
        let riskScore = 'Low';
        if (daysSinceLastDonation > 90) riskScore = 'High';
        else if (daysSinceLastDonation > 30) riskScore = 'Medium';

        // Format last donation time
        let lastDonationText = 'Never';
        if (lastDonation) {
          if (daysSinceLastDonation === 0) lastDonationText = 'Today';
          else if (daysSinceLastDonation === 1) lastDonationText = 'Yesterday';
          else if (daysSinceLastDonation < 7) lastDonationText = `${daysSinceLastDonation} days ago`;
          else if (daysSinceLastDonation < 30) lastDonationText = `${Math.floor(daysSinceLastDonation / 7)} weeks ago`;
          else lastDonationText = `${Math.floor(daysSinceLastDonation / 30)} months ago`;
        }

        return {
          id: profile.id,
          name: profile.full_name || 'Anonymous Donor',
          totalDonated: Math.floor(totalDonated / 100), // Convert pence to pounds
          lastDonation: lastDonationText,
          tier,
          riskScore
        };
      }) || [];
    },
  });

  // Donation behavior segments
  const { data: donationSegments, isLoading: segmentsDataLoading } = useQuery({
    queryKey: ['donation-segments'],
    queryFn: async () => {
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // High-value donors (£1000+)
      const { count: highValue } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('total_donated', 100000);

      // Regular monthly donors (3+ donations)
      const { count: regular } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('donation_count', 3);

      // Occasional donors (2 donations)
      const { count: occasional } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('donation_count', 2);

      // One-time donors
      const { count: oneTime } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('donation_count', 1);

      // Inactive users (0 donations)
      const { count: inactive } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('donation_count', 0);

      const total = totalUsers || 1;

      return [
        {
          name: 'High-Value Donors',
          count: highValue || 0,
          percentage: Math.round(((highValue || 0) / total) * 100 * 10) / 10
        },
        {
          name: 'Regular Monthly Donors',
          count: regular || 0,
          percentage: Math.round(((regular || 0) / total) * 100 * 10) / 10
        },
        {
          name: 'Occasional Donors',
          count: occasional || 0,
          percentage: Math.round(((occasional || 0) / total) * 100 * 10) / 10
        },
        {
          name: 'One-time Donors',
          count: oneTime || 0,
          percentage: Math.round(((oneTime || 0) / total) * 100 * 10) / 10
        },
        {
          name: 'Inactive Users',
          count: inactive || 0,
          percentage: Math.round(((inactive || 0) / total) * 100 * 10) / 10
        }
      ];
    },
  });

  return {
    userSegments,
    vipDonors,
    donationSegments,
    isLoading: segmentsLoading || vipLoading || segmentsDataLoading,
    error: null // You can add error handling as needed
  };
}

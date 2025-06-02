
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Users, Heart, Crown, TrendingUp, Gift, Star, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import MasjidSelector from './MasjidSelector';

interface UserMasjidStats {
  masjid: {
    id: string;
    name: string;
    city: string;
    logo_url: string;
    imam_name: string;
    total_referrals: number;
    total_earnings: number;
  };
  userContributions: {
    totalDonated: number;
    donationCount: number;
    pointsEarned: number;
  };
  masjidRanking: {
    rank: number;
    totalMasjids: number;
    totalRaised: number;
  };
  memberStats: {
    joinedAt: string;
    memberNumber: number;
    totalMembers: number;
  };
}

const UserMasjidDashboard = () => {
  const [stats, setStats] = useState<UserMasjidStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMasjidSelector, setShowMasjidSelector] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserMasjidStats();
    }
  }, [user]);

  const fetchUserMasjidStats = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Get user's primary masjid
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('primary_masjid_id')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      if (!profileData?.primary_masjid_id) {
        setShowMasjidSelector(true);
        setLoading(false);
        return;
      }

      // Get masjid details
      const { data: masjidData, error: masjidError } = await supabase
        .from('masjid_profiles')
        .select('*')
        .eq('id', profileData.primary_masjid_id)
        .single();

      if (masjidError) throw masjidError;

      // Get user's donations
      const { data: donationsData, error: donationsError } = await supabase
        .from('donations')
        .select('amount, jannah_points_earned')
        .eq('user_id', user.id)
        .eq('status', 'completed');

      if (donationsError) throw donationsError;

      const userContributions = {
        totalDonated: donationsData?.reduce((sum, d) => sum + Number(d.amount), 0) || 0,
        donationCount: donationsData?.length || 0,
        pointsEarned: donationsData?.reduce((sum, d) => sum + (d.jannah_points_earned || 0), 0) || 0,
      };

      // Get user's affiliation details
      const { data: affiliationData, error: affiliationError } = await supabase
        .from('user_masjid_affiliations')
        .select('affiliated_at')
        .eq('user_id', user.id)
        .eq('masjid_id', profileData.primary_masjid_id)
        .single();

      if (affiliationError) throw affiliationError;

      // Get total members for this masjid
      const { count: totalMembers } = await supabase
        .from('user_masjid_affiliations')
        .select('*', { count: 'exact', head: true })
        .eq('masjid_id', profileData.primary_masjid_id);

      // Get member number (based on join order)
      const { count: memberNumber } = await supabase
        .from('user_masjid_affiliations')
        .select('*', { count: 'exact', head: true })
        .eq('masjid_id', profileData.primary_masjid_id)
        .lte('affiliated_at', affiliationData.affiliated_at);

      // Calculate masjid ranking (simplified for demo)
      const masjidRanking = {
        rank: Math.floor(Math.random() * 50) + 1, // Placeholder
        totalMasjids: 150, // Placeholder
        totalRaised: userContributions.totalDonated * 3, // Estimate total masjid contributions
      };

      setStats({
        masjid: masjidData,
        userContributions,
        masjidRanking,
        memberStats: {
          joinedAt: affiliationData.affiliated_at,
          memberNumber: memberNumber || 1,
          totalMembers: totalMembers || 1,
        },
      });

    } catch (error) {
      console.error('Error fetching user masjid stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMasjidSelected = () => {
    setShowMasjidSelector(false);
    fetchUserMasjidStats();
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading your masjid dashboard...</div>
        </CardContent>
      </Card>
    );
  }

  if (showMasjidSelector || !stats) {
    return (
      <div className="space-y-4">
        <Card className="p-6 text-center bg-gradient-to-r from-emerald-50 to-blue-50">
          <Building className="h-12 w-12 mx-auto mb-4 text-emerald-600" />
          <h3 className="text-xl font-bold mb-2">Represent Your Masjid! 🕌</h3>
          <p className="text-gray-600 mb-4">
            Join your local masjid community and help them earn from your charitable activities.
          </p>
        </Card>
        <MasjidSelector onMasjidSelected={handleMasjidSelected} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Masjid Header Card */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            {stats.masjid.logo_url ? (
              <img
                src={stats.masjid.logo_url}
                alt={`${stats.masjid.name} logo`}
                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-white shadow-lg">
                <Building className="h-8 w-8 text-white" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-bold text-gray-900">{stats.masjid.name}</h2>
                <Badge className="bg-emerald-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Your Masjid
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {stats.masjid.city}
                </div>
                {stats.masjid.imam_name && (
                  <div>Imam: {stats.masjid.imam_name}</div>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowMasjidSelector(true)}
              className="hover:bg-emerald-50"
            >
              Change Masjid
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Heart className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  £{stats.userContributions.totalDonated}
                </div>
                <div className="text-sm text-gray-600">Your Contributions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Star className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {stats.userContributions.pointsEarned}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  #{stats.masjidRanking.rank}
                </div>
                <div className="text-sm text-gray-600">Masjid Rank</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-600">
                  #{stats.memberStats.memberNumber}
                </div>
                <div className="text-sm text-gray-600">Member Number</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Masjid Performance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Masjid Community Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                {stats.memberStats.totalMembers}
              </div>
              <div className="text-sm text-gray-600">Total Members</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                £{stats.masjidRanking.totalRaised.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900">
                £{stats.masjid.total_earnings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Masjid Earnings</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Ranking Progress</span>
              <span>#{stats.masjidRanking.rank} of {stats.masjidRanking.totalMasjids}</span>
            </div>
            <Progress 
              value={((stats.masjidRanking.totalMasjids - stats.masjidRanking.rank) / stats.masjidRanking.totalMasjids) * 100} 
              className="h-3"
            />
          </div>
        </CardContent>
      </Card>

      {/* Member Achievement */}
      <Card className="bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Gift className="h-8 w-8 text-amber-500" />
            <div>
              <h3 className="font-semibold text-amber-800">
                Community Member #{stats.memberStats.memberNumber}
              </h3>
              <p className="text-sm text-amber-700">
                Joined {new Date(stats.memberStats.joinedAt).toLocaleDateString()} • 
                Helping {stats.masjid.name} grow stronger through charitable giving
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMasjidDashboard;

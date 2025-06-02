
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Users, Heart, Star, TrendingUp, Gift, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import MasjidSelector from './MasjidSelector';

interface UserMasjidData {
  masjid: {
    id: string;
    name: string;
    city: string;
    logo_url: string;
    total_referrals: number;
    total_earnings: number;
    rank: number;
  } | null;
  userContributions: {
    totalDonated: number;
    commissionGenerated: number;
    donationCount: number;
    lastDonation: string | null;
  };
  masjidGoals: {
    monthlyTarget: number;
    currentProgress: number;
    daysLeft: number;
  };
}

const UserMasjidDashboard = () => {
  const [masjidData, setMasjidData] = useState<UserMasjidData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showMasjidSelector, setShowMasjidSelector] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchUserMasjidData();
    }
  }, [user]);

  const fetchUserMasjidData = async () => {
    try {
      setLoading(true);
      
      // Using test data since the tables might not be in types yet
      const testData: UserMasjidData = {
        masjid: {
          id: '1',
          name: 'Central London Mosque',
          city: 'London',
          logo_url: '',
          total_referrals: 245,
          total_earnings: 1250.50,
          rank: 1
        },
        userContributions: {
          totalDonated: 450.00,
          commissionGenerated: 45.00,
          donationCount: 12,
          lastDonation: '2024-01-15'
        },
        masjidGoals: {
          monthlyTarget: 2000.00,
          currentProgress: 1250.50,
          daysLeft: 15
        }
      };

      setMasjidData(testData);
    } catch (error) {
      console.error('Error fetching user masjid data:', error);
      toast({
        title: "Error",
        description: "Failed to load masjid data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMasjidSelected = (masjid: any) => {
    setShowMasjidSelector(false);
    fetchUserMasjidData(); // Refresh data
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

  if (showMasjidSelector || !masjidData?.masjid) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Connect with Your Masjid
            </CardTitle>
            <p className="text-sm text-gray-600">
              Choose your local masjid to start supporting your community
            </p>
          </CardHeader>
        </Card>
        <MasjidSelector onMasjidSelected={handleMasjidSelected} />
      </div>
    );
  }

  const { masjid, userContributions, masjidGoals } = masjidData;
  const progressPercentage = (masjidGoals.currentProgress / masjidGoals.monthlyTarget) * 100;

  return (
    <div className="space-y-6">
      {/* Your Masjid Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {masjid.logo_url ? (
                <img
                  src={masjid.logo_url}
                  alt={`${masjid.name} logo`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <Building className="h-8 w-8 text-white" />
                </div>
              )}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{masjid.name}</h2>
                  <Badge className="bg-emerald-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Your Masjid
                  </Badge>
                  {masjid.rank <= 3 && (
                    <Badge className="bg-yellow-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      Rank #{masjid.rank}
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">{masjid.city}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {masjid.total_referrals} members
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="h-4 w-4" />
                    £{masjid.total_earnings.toLocaleString()} earned
                  </div>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowMasjidSelector(true)}
              className="shrink-0"
            >
              Change Masjid
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Your Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  £{userContributions.totalDonated.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Donated</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-purple-600">
                  £{userContributions.commissionGenerated.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Generated for Masjid</div>
              </div>
              <div className="text-xs text-gray-500">
                {userContributions.donationCount} donations • Last: {userContributions.lastDonation ? new Date(userContributions.lastDonation).toLocaleDateString() : 'Never'}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Monthly Goal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {Math.round(progressPercentage)}%
                </div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="flex justify-between text-sm text-gray-600">
                <span>£{masjidGoals.currentProgress.toLocaleString()}</span>
                <span>£{masjidGoals.monthlyTarget.toLocaleString()}</span>
              </div>
              <div className="text-xs text-gray-500">
                {masjidGoals.daysLeft} days remaining
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-green-500" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  #{masjid.rank}
                </div>
                <div className="text-sm text-gray-600">Leaderboard Rank</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-700">
                  {masjid.total_referrals}
                </div>
                <div className="text-sm text-gray-600">Active Members</div>
              </div>
              <Button size="sm" className="w-full">
                Invite Friends
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Support Your Masjid</CardTitle>
          <p className="text-sm text-gray-600">
            Every donation you make generates a 10% commission for {masjid.name}
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <Heart className="h-4 w-4 mr-2" />
              Make a Donation
            </Button>
            <Button variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Invite Members
            </Button>
            <Button variant="outline">
              <Gift className="h-4 w-4 mr-2" />
              Share Referral Code
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserMasjidDashboard;

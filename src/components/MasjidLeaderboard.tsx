
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Heart, Building, Crown, Medal, Award } from 'lucide-react';

interface MasjidStats {
  id: string;
  name: string;
  city: string;
  logo_url: string;
  total_referrals: number;
  total_earnings: number;
  total_donations: number;
  member_count: number;
  rank: number;
}

const MasjidLeaderboard = () => {
  const [masjids, setMasjids] = useState<MasjidStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMasjidStats();
  }, []);

  const fetchMasjidStats = async () => {
    try {
      setLoading(true);
      
      // Using test data since the tables might not be in types yet
      const testMasjids: MasjidStats[] = [
        {
          id: '1',
          name: 'Central London Mosque',
          city: 'London',
          logo_url: '',
          total_referrals: 245,
          total_earnings: 1250.50,
          total_donations: 12505.00,
          member_count: 245,
          rank: 1
        },
        {
          id: '2',
          name: 'East London Mosque',
          city: 'London',
          logo_url: '',
          total_referrals: 189,
          total_earnings: 950.25,
          total_donations: 9502.50,
          member_count: 189,
          rank: 2
        },
        {
          id: '3',
          name: 'Birmingham Central Mosque',
          city: 'Birmingham',
          logo_url: '',
          total_referrals: 156,
          total_earnings: 780.75,
          total_donations: 7807.50,
          member_count: 156,
          rank: 3
        },
        {
          id: '4',
          name: 'Manchester Islamic Centre',
          city: 'Manchester',
          logo_url: '',
          total_referrals: 134,
          total_earnings: 670.25,
          total_donations: 6702.50,
          member_count: 134,
          rank: 4
        }
      ];

      setMasjids(testMasjids);
    } catch (error) {
      console.error('Error fetching masjid stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <Trophy className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading masjid leaderboard...</div>
        </CardContent>
      </Card>
    );
  }

  const topMasjid = masjids[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Masjid Community Leaderboard
        </CardTitle>
        <p className="text-sm text-gray-600">
          See how your masjid ranks in charitable giving
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Masjid Showcase */}
        {topMasjid && (
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-lg border-2 border-yellow-200">
            <div className="flex items-center gap-4">
              <div className="relative">
                {topMasjid.logo_url ? (
                  <img
                    src={topMasjid.logo_url}
                    alt={`${topMasjid.name} logo`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                )}
                <Crown className="absolute -top-2 -right-2 h-6 w-6 text-yellow-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900">{topMasjid.name}</h3>
                  <Badge className="bg-yellow-500 text-white">
                    🏆 Champion
                  </Badge>
                </div>
                <p className="text-gray-600 mb-2">{topMasjid.city}</p>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold text-emerald-600">
                      £{topMasjid.total_donations.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Total Raised</div>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-600">
                      {topMasjid.member_count}
                    </div>
                    <div className="text-gray-600">Members</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-600">
                      £{topMasjid.total_earnings.toLocaleString()}
                    </div>
                    <div className="text-gray-600">Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard */}
        <div className="space-y-3">
          {masjids.map((masjid) => (
            <div
              key={masjid.id}
              className={`p-4 rounded-lg border transition-all ${
                masjid.rank <= 3
                  ? 'border-yellow-200 bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <Badge className={`${getRankBadgeColor(masjid.rank)} font-bold min-w-[40px] justify-center`}>
                    #{masjid.rank}
                  </Badge>
                  {getRankIcon(masjid.rank)}
                </div>

                {masjid.logo_url ? (
                  <img
                    src={masjid.logo_url}
                    alt={`${masjid.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-emerald-500 flex items-center justify-center">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                )}

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{masjid.name}</h4>
                  <p className="text-sm text-gray-600">{masjid.city}</p>
                </div>

                <div className="text-right">
                  <div className="font-bold text-emerald-600">
                    £{masjid.total_donations.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {masjid.member_count} members
                  </div>
                </div>
              </div>

              {/* Progress bar showing relative performance */}
              {topMasjid && masjid.total_donations > 0 && (
                <div className="mt-3">
                  <Progress
                    value={(masjid.total_donations / topMasjid.total_donations) * 100}
                    className="h-2"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {masjids.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No masjid data available yet.</p>
            <p className="text-sm mt-2">
              Be the first to join and represent your masjid!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MasjidLeaderboard;

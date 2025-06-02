
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp, Users, Crown } from 'lucide-react';

interface MasjidLeaderboardEntry {
  id: string;
  name: string;
  location: string;
  totalDonations: number;
  memberCount: number;
  rank: number;
  weeklyGrowth: number;
  averagePerMember: number;
}

const mockLeaderboard: MasjidLeaderboardEntry[] = [
  {
    id: '1',
    name: 'East London Mosque',
    location: 'London',
    totalDonations: 28750,
    memberCount: 342,
    rank: 1,
    weeklyGrowth: 15.3,
    averagePerMember: 84
  },
  {
    id: '2',
    name: 'Birmingham Central Mosque',
    location: 'Birmingham',
    totalDonations: 24200,
    memberCount: 298,
    rank: 2,
    weeklyGrowth: 12.1,
    averagePerMember: 81
  },
  {
    id: '3',
    name: 'Central London Mosque',
    location: 'London',
    totalDonations: 21680,
    memberCount: 247,
    rank: 3,
    weeklyGrowth: 8.7,
    averagePerMember: 88
  },
  {
    id: '4',
    name: 'Manchester Islamic Centre',
    location: 'Manchester',
    totalDonations: 18940,
    memberCount: 201,
    rank: 4,
    weeklyGrowth: 6.2,
    averagePerMember: 94
  },
  {
    id: '5',
    name: 'Leeds Grand Mosque',
    location: 'Leeds',
    totalDonations: 16750,
    memberCount: 189,
    rank: 5,
    weeklyGrowth: 4.8,
    averagePerMember: 89
  }
];

interface MasjidLeaderboardProps {
  userMasjidId?: string;
}

const MasjidLeaderboard = ({ userMasjidId }: MasjidLeaderboardProps) => {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-600';
    if (rank === 3) return 'text-amber-600';
    return 'text-gray-500';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank <= 3) return <Trophy className="h-5 w-5 text-amber-500" />;
    return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h3 className="text-xl font-bold text-gray-900">Masjid Leaderboard</h3>
      </div>
      
      <div className="space-y-4">
        {mockLeaderboard.map((masjid) => {
          const isUserMasjid = masjid.id === userMasjidId;
          
          return (
            <div 
              key={masjid.id}
              className={`p-4 rounded-lg border transition-all duration-200 ${
                isUserMasjid 
                  ? 'border-blue-200 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getRankIcon(masjid.rank)}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{masjid.name}</h4>
                      {isUserMasjid && (
                        <Badge className="bg-blue-100 text-blue-800 text-xs">
                          Your Masjid
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{masjid.location}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-bold text-lg text-green-600">
                    £{masjid.totalDonations.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {masjid.memberCount} members
                  </div>
                </div>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-gray-600">Growth:</span>
                  <span className="font-medium text-green-600">+{masjid.weeklyGrowth}%</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-600">Avg/member:</span>
                  <span className="font-medium">£{masjid.averagePerMember}</span>
                </div>
              </div>
              
              {isUserMasjid && (
                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress to #2</span>
                    <span className="font-medium">
                      £{(mockLeaderboard[1].totalDonations - masjid.totalDonations).toLocaleString()} needed
                    </span>
                  </div>
                  <Progress 
                    value={(masjid.totalDonations / mockLeaderboard[1].totalDonations) * 100} 
                    className="mt-2 h-2"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default MasjidLeaderboard;

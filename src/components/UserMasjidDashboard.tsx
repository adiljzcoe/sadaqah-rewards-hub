
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  Trophy, 
  Target, 
  Calendar,
  Share2,
  TrendingUp,
  Award
} from 'lucide-react';

interface MasjidStats {
  name: string;
  location: string;
  rank: number;
  totalDonations: number;
  memberCount: number;
  userRankInMasjid: number;
  userContribution: number;
  weeklyGoal: number;
  weeklyProgress: number;
  upcomingEvents: Array<{
    id: string;
    name: string;
    date: string;
    target: number;
  }>;
}

const mockMasjidStats: MasjidStats = {
  name: 'Central London Mosque',
  location: 'London, UK',
  rank: 3,
  totalDonations: 21680,
  memberCount: 247,
  userRankInMasjid: 12,
  userContribution: 340,
  weeklyGoal: 2000,
  weeklyProgress: 1420,
  upcomingEvents: [
    {
      id: '1',
      name: 'Ramadan Emergency Fund',
      date: '2024-03-15',
      target: 5000
    },
    {
      id: '2',
      name: 'Local Food Bank Drive',
      date: '2024-03-22',
      target: 2500
    }
  ]
};

interface UserMasjidDashboardProps {
  masjidId?: string;
}

const UserMasjidDashboard = ({ masjidId }: UserMasjidDashboardProps) => {
  if (!masjidId) {
    return null;
  }

  const stats = mockMasjidStats;
  const progressPercentage = (stats.weeklyProgress / stats.weeklyGoal) * 100;

  return (
    <div className="space-y-6">
      {/* Masjid Header */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Building className="h-8 w-8 text-white" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{stats.name}</h2>
              <p className="text-gray-600">{stats.location}</p>
              
              <div className="flex items-center gap-3 mt-2">
                <Badge className="bg-blue-100 text-blue-800">
                  Rank #{stats.rank}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {stats.memberCount} members
                </div>
              </div>
            </div>
          </div>
          
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Share2 className="h-4 w-4 mr-2" />
            Invite Friends
          </Button>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Your Contribution */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-green-500" />
            <h3 className="text-lg font-semibold">Your Contribution</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Rank in Masjid</span>
              <Badge variant="outline">#{stats.userRankInMasjid}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Donated</span>
              <span className="font-bold text-green-600">£{stats.userContribution}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Contribution %</span>
              <span className="font-medium">
                {((stats.userContribution / stats.totalDonations) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </Card>

        {/* Weekly Goal */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-semibold">Weekly Community Goal</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Progress</span>
              <span className="font-bold">
                £{stats.weeklyProgress} / £{stats.weeklyGoal}
              </span>
            </div>
            
            <Progress value={progressPercentage} className="h-3" />
            
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-gray-600">
                £{stats.weeklyGoal - stats.weeklyProgress} needed to reach goal
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Masjid Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Community Impact
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              £{stats.totalDonations.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Raised</p>
          </div>
          
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{stats.memberCount}</div>
            <p className="text-sm text-gray-600">Active Members</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">#{stats.rank}</div>
            <p className="text-sm text-gray-600">National Ranking</p>
          </div>
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-indigo-500" />
          Upcoming Community Campaigns
        </h3>
        
        <div className="space-y-3">
          {stats.upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{event.name}</h4>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">£{event.target.toLocaleString()}</div>
                <p className="text-xs text-gray-500">Target</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserMasjidDashboard;

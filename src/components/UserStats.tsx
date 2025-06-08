
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  Heart, 
  Trophy, 
  Target, 
  TrendingUp, 
  Award,
  Star,
  Users,
  Calendar
} from 'lucide-react';

export const UserStats = () => {
  const { user } = useAuth();
  
  console.log('UserStats isMember:', !!user);

  if (!user) {
    return (
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Join Our Community</h3>
          <p className="text-gray-500">Sign up to track your donations, earn rewards, and see your impact!</p>
        </CardContent>
      </Card>
    );
  }

  const stats = {
    totalDonated: 1250,
    donationsCount: 47,
    pointsEarned: 3420,
    rank: 'Gold Contributor',
    currentStreak: 12,
    nextGoal: 1500,
    achievements: [
      { name: 'First Donation', icon: '🎯', earned: true },
      { name: 'Weekly Champion', icon: '🏆', earned: true },
      { name: 'Community Builder', icon: '👥', earned: false },
      { name: 'Generous Heart', icon: '💖', earned: true }
    ]
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Donated */}
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
          <Heart className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-700">£{stats.totalDonated}</div>
          <p className="text-xs text-emerald-600">from {stats.donationsCount} donations</p>
        </CardContent>
      </Card>

      {/* Points Earned */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jannah Points</CardTitle>
          <Star className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-700">{stats.pointsEarned}</div>
          <p className="text-xs text-blue-600">earned this month</p>
        </CardContent>
      </Card>

      {/* Current Rank */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
          <Trophy className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-purple-700">{stats.rank}</div>
          <Badge variant="outline" className="mt-1 text-purple-600 border-purple-300">
            {stats.currentStreak} day streak
          </Badge>
        </CardContent>
      </Card>

      {/* Progress to Next Goal */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-500" />
            Progress to Next Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>£{stats.totalDonated} donated</span>
              <span>£{stats.nextGoal} goal</span>
            </div>
            <Progress 
              value={(stats.totalDonated / stats.nextGoal) * 100} 
              className="h-3"
            />
            <p className="text-sm text-gray-600">
              £{stats.nextGoal - stats.totalDonated} more to unlock "Platinum Contributor" rank
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" />
            Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {stats.achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-3 rounded-lg text-center transition-all ${
                  achievement.earned 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200' 
                    : 'bg-gray-50 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1">{achievement.icon}</div>
                <div className="text-xs font-medium">{achievement.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Trophy, Star } from 'lucide-react';

export const UserStats = () => {
  const stats = {
    totalDonations: 1250,
    totalAmount: 3240,
    impact: 128,
    level: 15,
    points: 8750,
    streak: 7
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-700">Total Donations</CardTitle>
          <Heart className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-emerald-900">{stats.totalDonations}</div>
          <p className="text-xs text-emerald-600">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-700">Total Donated</CardTitle>
          <Users className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">£{stats.totalAmount.toLocaleString()}</div>
          <p className="text-xs text-blue-600">Lives impacted: {stats.impact}</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-700">Level & Points</CardTitle>
          <Trophy className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-purple-100 text-purple-800">
              Level {stats.level}
            </Badge>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-500 mr-1" />
              <span className="text-sm font-semibold">{stats.points.toLocaleString()}</span>
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-1">{stats.streak} day streak!</p>
        </CardContent>
      </Card>
    </div>
  );
};

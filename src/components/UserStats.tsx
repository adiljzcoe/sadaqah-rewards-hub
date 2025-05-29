
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award, Zap } from 'lucide-react';

const UserStats = () => {
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const sadaqahCoins = 142;
  const totalDonations = 28;

  return (
    <Card className="p-6 bg-white border border-gray-200 subtle-shadow">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userLevel}
          </div>
          <Badge className="absolute -top-1 -right-1 bg-blue-500 hover:bg-blue-600 text-white text-xs">
            <Award className="h-3 w-3 mr-1" />
            Rising Star
          </Badge>
        </div>
        <h3 className="font-bold text-xl text-gray-900">Ahmad M.</h3>
        <p className="text-gray-600">Level {userLevel} Donor</p>
      </div>

      <div className="space-y-4">
        {/* Jannah Points */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-blue-500" />
              <span className="font-semibold text-blue-700">Jannah Points</span>
            </div>
            <span className="text-xl font-bold text-blue-600">{currentPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white" />
          <p className="text-sm text-center text-gray-600 mt-2">
            {nextLevelPoints - currentPoints} points to next level
          </p>
        </div>

        {/* Sadaqah Coins */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-emerald-500" />
              <span className="font-semibold text-emerald-700">Sadaqah Coins</span>
            </div>
            <span className="text-xl font-bold text-emerald-600">{sadaqahCoins}</span>
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-purple-500" />
              <span className="font-semibold text-purple-700">Total Donations</span>
            </div>
            <span className="text-xl font-bold text-purple-600">{totalDonations}</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-gray-900">Weekly Goal</span>
            <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">3/5 donations</span>
          </div>
          <Progress value={60} className="h-2 bg-gray-100" />
        </div>

        {/* Special Multiplier */}
        <div className="bg-amber-100 rounded-lg p-4 border border-amber-200 text-center">
          <p className="font-semibold text-amber-800 mb-1">🌙 Special Time!</p>
          <p className="text-sm font-medium text-amber-700">
            <Zap className="inline h-4 w-4 mr-1" />
            Double points until Maghrib!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;

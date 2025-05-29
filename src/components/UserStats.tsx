
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award } from 'lucide-react';

const UserStats = () => {
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const sadaqahCoins = 142;
  const totalDonations = 28;

  return (
    <Card className="p-6 bg-gradient-to-br from-islamic-green-50 to-sadaqah-gold-50 border-islamic-green-200">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 bg-islamic-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {userLevel}
          </div>
          <Badge className="absolute -top-2 -right-2 bg-sadaqah-gold-500 hover:bg-sadaqah-gold-600">
            <Award className="h-3 w-3 mr-1" />
            Rising Star
          </Badge>
        </div>
        <h3 className="font-semibold text-lg text-islamic-green-800">Ahmad M.</h3>
        <p className="text-sm text-gray-600">Level {userLevel} Donor</p>
      </div>

      <div className="space-y-4">
        {/* Jannah Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-sadaqah-gold-500" />
            <span className="text-sm font-medium">Jannah Points</span>
          </div>
          <span className="font-bold text-sadaqah-gold-600">{currentPoints.toLocaleString()}</span>
        </div>

        {/* Level Progress */}
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-center text-gray-500 mt-1">
            {nextLevelPoints - currentPoints} points to next level
          </p>
        </div>

        {/* Sadaqah Coins */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gift className="h-4 w-4 text-islamic-green-500" />
            <span className="text-sm font-medium">Sadaqah Coins</span>
          </div>
          <span className="font-bold text-islamic-green-600">{sadaqahCoins}</span>
        </div>

        {/* Total Donations */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-sm font-medium">Total Donations</span>
          </div>
          <span className="font-bold text-gray-700">{totalDonations}</span>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white rounded-lg p-3 border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Weekly Goal</span>
            <span className="text-xs text-gray-500">3/5 donations</span>
          </div>
          <Progress value={60} className="h-1" />
        </div>

        {/* Special Multiplier */}
        <div className="bg-sadaqah-gold-100 rounded-lg p-3 text-center">
          <p className="text-sm font-medium text-sadaqah-gold-800 mb-1">🌙 Special Time!</p>
          <p className="text-xs text-sadaqah-gold-600">Double points until Maghrib</p>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;

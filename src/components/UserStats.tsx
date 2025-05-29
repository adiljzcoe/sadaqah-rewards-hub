
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
    <Card className="p-6 bg-white border-2 border-gray-200 shadow-lg hover-lift clean-shadow">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-purple-magic-500 rounded-full flex items-center justify-center text-white text-3xl font-black shadow-xl">
            {userLevel}
          </div>
          <Badge className="absolute -top-2 -right-2 bg-vibrant-orange-500 hover:bg-vibrant-orange-600 text-white font-bold shadow-lg">
            <Award className="h-3 w-3 mr-1" />
            Rising Star ⭐
          </Badge>
          <div className="absolute -bottom-2 -left-2 bg-electric-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            🔥 ON FIRE!
          </div>
        </div>
        <h3 className="font-black text-2xl gradient-text">Ahmad M. 👑</h3>
        <p className="text-lg text-gray-600 font-bold">Level {userLevel} Donor 🚀</p>
      </div>

      <div className="space-y-4">
        {/* Jannah Points */}
        <div className="bg-vibrant-orange-100 rounded-2xl p-4 border-2 border-vibrant-orange-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star className="h-6 w-6 text-vibrant-orange-500" />
              <span className="text-lg font-black text-vibrant-orange-800">Jannah Points ⭐</span>
            </div>
            <span className="text-2xl font-black text-vibrant-orange-600">{currentPoints.toLocaleString()}</span>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-electric-blue-100 rounded-2xl p-4 border-2 border-electric-blue-300">
          <div className="flex justify-between text-sm font-bold text-electric-blue-700 mb-2">
            <span>Level {userLevel} 🎯</span>
            <span>Level {userLevel + 1} 🚀</span>
          </div>
          <Progress value={progress} className="h-4 bg-white rounded-full" />
          <p className="text-sm text-center text-electric-blue-600 font-bold mt-2">
            {nextLevelPoints - currentPoints} points to next level! 💪
          </p>
        </div>

        {/* Sadaqah Coins */}
        <div className="bg-lime-green-100 rounded-2xl p-4 border-2 border-lime-green-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="h-6 w-6 text-lime-green-500" />
              <span className="text-lg font-black text-lime-green-800">Sadaqah Coins 🪙</span>
            </div>
            <span className="text-2xl font-black text-lime-green-600">{sadaqahCoins}</span>
          </div>
        </div>

        {/* Total Donations */}
        <div className="bg-candy-pink-100 rounded-2xl p-4 border-2 border-candy-pink-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Heart className="h-6 w-6 text-candy-pink-500" />
              <span className="text-lg font-black text-candy-pink-800">Total Donations 💝</span>
            </div>
            <span className="text-2xl font-black text-candy-pink-600">{totalDonations}</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="bg-white rounded-2xl p-4 border-2 border-purple-magic-300 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-black text-purple-magic-800">Weekly Goal 🎯</span>
            <span className="text-sm font-bold text-purple-magic-600 bg-purple-magic-100 px-3 py-1 rounded-full">3/5 donations ⚡</span>
          </div>
          <Progress value={60} className="h-3 bg-purple-magic-100 rounded-full" />
        </div>

        {/* Special Multiplier */}
        <div className="bg-yellow-400 rounded-2xl p-4 text-center">
          <p className="text-xl font-black text-black mb-2">🌙 Special Time! 🌙</p>
          <p className="text-lg font-bold text-black">
            <Zap className="inline h-5 w-5 mr-1" />
            Double points until Maghrib! ⚡
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;

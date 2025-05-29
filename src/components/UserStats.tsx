
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award, Zap, Crown, ArrowUp } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const UserStats = () => {
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const sadaqahCoins = 142;
  const totalDonations = 28;
  
  // Mock user membership status - set to false to show upgrade link
  const isMember = false;

  console.log('UserStats isMember:', isMember); // Debug log

  return (
    <Card className="p-6 game-card">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg animate-level-up rank-badge first">
            {userLevel}
          </div>
          <Badge className="absolute -top-1 -right-1 gel-button bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs shadow-md animate-bounce-in">
            <Award className="h-3 w-3 mr-1" />
            {isMember ? 'VIP Member' : 'Rising Star'}
          </Badge>
        </div>
        <h3 className="font-bold text-xl text-gray-900 flex items-center justify-center gap-2">
          Ahmad M.
          {isMember && (
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
              <Crown className="h-3 w-3 mr-1" />
              VIP
            </Badge>
          )}
        </h3>
        <p className="text-gray-600 mb-3">Level {userLevel} {isMember ? 'VIP ' : ''}Donor</p>
        
        {/* Upgrade link for non-members - made more prominent */}
        {!isMember && (
          <div className="mt-3 mb-2">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 animate-pulse border-2 border-white">
              <ArrowUp className="h-4 w-4 mr-2 inline" />
              Upgrade to VIP for 2x Points!
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Member Benefits Banner */}
        {isMember && (
          <div className="game-card p-4 bg-gradient-to-r from-purple-100 to-pink-100 text-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="font-bold text-purple-800 mb-1 text-lg flex items-center justify-center gap-2">
                <Crown className="h-5 w-5" />
                VIP Member Benefits Active!
              </p>
              <p className="text-sm font-bold text-purple-700">
                💎 Double Jannah Points & Sadaqah Coins on all donations!
              </p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/50 to-transparent animate-shimmer"></div>
          </div>
        )}

        {/* Jannah Points */}
        <div className="jannah-counter text-center relative">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="h-6 w-6 text-white animate-points-pop" />
            <span className="font-bold text-white text-lg">Jannah Points</span>
            {isMember && (
              <Badge className="bg-purple-500 text-white text-xs">
                2x Rate
              </Badge>
            )}
          </div>
          <div className="text-3xl font-black text-white animate-points-pop">
            {currentPoints.toLocaleString()}
          </div>
          <div className="text-sm text-white/80 mt-1">✨ Divine Rewards ✨</div>
        </div>

        {/* Level Progress */}
        <div className="game-card p-4">
          <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
            <span>Level {userLevel}</span>
            <span>Level {userLevel + 1}</span>
          </div>
          <Progress 
            value={progress} 
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner rounded-full overflow-hidden"
          />
          <div className="h-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full relative overflow-hidden" 
               style={{ width: `${progress}%`, marginTop: '-16px' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-sm text-center text-gray-600 mt-2 font-semibold">
            {nextLevelPoints - currentPoints} points to level up! 🚀
          </p>
        </div>

        {/* Sadaqah Coins */}
        <div className="game-card p-4 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GoldCoin3D size={48} className="animate-subtle-pulse">
                {sadaqahCoins}
              </GoldCoin3D>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-800 text-lg">Sadaqah Coins</span>
                  {isMember && (
                    <Badge className="bg-purple-500 text-white text-xs">
                      2x Rate
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-amber-600">💰 Shop Currency</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-amber-700 animate-points-pop">
                {sadaqahCoins}
              </div>
            </div>
          </div>
          <div className="absolute -right-4 -top-4 w-16 h-16 opacity-20">
            <GoldCoin3D size={64} />
          </div>
        </div>

        {/* Total Donations */}
        <div className="game-card p-4 bg-gradient-to-r from-pink-50 to-red-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-red-500 animate-subtle-pulse" />
              <span className="font-bold text-red-800 text-lg">Total Donations</span>
            </div>
            <span className="text-2xl font-black text-red-600 animate-points-pop">{totalDonations}</span>
          </div>
        </div>

        {/* Weekly Goal */}
        <div className="game-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-gray-900">Weekly Goal 🎯</span>
            <span className="text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-blue-500 px-3 py-1 rounded-full gel-button">
              3/5 donations
            </span>
          </div>
          <div className="relative">
            <Progress value={60} className="h-3 bg-gray-200 shadow-inner rounded-full" />
            <div className="h-3 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-gentle-fade" 
                 style={{ width: '60%', marginTop: '-12px' }}>
            </div>
          </div>
        </div>

        {/* Special Multiplier */}
        <div className="game-card p-4 bg-gradient-to-r from-amber-100 to-yellow-100 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-bold text-amber-800 mb-1 text-lg">🌙 Special Time!</p>
            <p className="text-sm font-bold text-amber-700">
              <Zap className="inline h-5 w-5 mr-1 animate-subtle-pulse" />
              {isMember ? 'Quadruple' : 'Double'} points until Maghrib!
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;

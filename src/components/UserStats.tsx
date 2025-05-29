
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award, Zap, Trophy, Target } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const UserStats = () => {
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const vBucks = 142;
  const totalDonations = 28;

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-4 border-cyan-400 shadow-2xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black shadow-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 border-4 border-yellow-300 animate-rainbow">
            {userLevel}
          </div>
          <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm shadow-xl border-2 border-pink-300 animate-bounce-in px-3 py-1">
            <Award className="h-4 w-4 mr-1" />
            LEGENDARY
          </Badge>
        </div>
        <h3 className="font-black text-2xl text-cyan-100">AHMAD_M</h3>
        <p className="text-cyan-300 font-bold text-lg">🏆 ELITE WARRIOR 🏆</p>
      </div>

      <div className="space-y-6">
        {/* V-Bucks of Virtue */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl p-4 text-center relative overflow-hidden border-4 border-yellow-300 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          <div className="flex items-center justify-center space-x-2 mb-2 relative z-10">
            <Star className="h-8 w-8 text-white animate-sparkle" />
            <span className="font-black text-white text-2xl">V-BUCKS OF VIRTUE</span>
          </div>
          <div className="text-5xl font-black text-white animate-number-pop relative z-10">
            {currentPoints.toLocaleString()}
          </div>
          <div className="text-lg text-yellow-100 mt-1 font-bold relative z-10">⚡ DIVINE POWER ⚡</div>
        </div>

        {/* Battle Pass Progress */}
        <div className="bg-gradient-to-br from-purple-600/40 to-blue-600/40 rounded-2xl p-6 border-4 border-purple-400 backdrop-blur-sm">
          <div className="flex justify-between text-lg font-black text-cyan-100 mb-4">
            <span>🎯 TIER {userLevel}</span>
            <span>🏆 TIER {userLevel + 1}</span>
          </div>
          <div className="relative">
            <Progress 
              value={progress} 
              className="h-6 bg-gradient-to-r from-gray-800 to-gray-900 shadow-inner rounded-full overflow-hidden border-2 border-cyan-400"
            />
            <div className="h-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full relative overflow-hidden border-2 border-white/30" 
                 style={{ width: `${progress}%`, marginTop: '-28px' }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <p className="text-lg text-center text-cyan-200 mt-4 font-black">
            {nextLevelPoints - currentPoints} XP TO LEGENDARY TIER! 🚀
          </p>
        </div>

        {/* Legendary Loot (Gold Coins) */}
        <div className="bg-gradient-to-br from-yellow-600/40 to-orange-600/40 rounded-2xl p-6 relative overflow-hidden border-4 border-yellow-400 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <GoldCoin3D size={60} className="animate-rainbow">
                {vBucks}
              </GoldCoin3D>
              <div>
                <span className="font-black text-yellow-100 text-2xl">LEGENDARY LOOT</span>
                <div className="text-lg text-yellow-300 font-bold">💰 Epic Currency</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-black text-yellow-200 animate-number-pop">
                {vBucks}
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-20 h-20 opacity-30">
            <GoldCoin3D size={80} />
          </div>
        </div>

        {/* Victory Royales */}
        <div className="bg-gradient-to-br from-pink-600/40 to-red-600/40 rounded-2xl p-6 border-4 border-pink-400 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center border-4 border-pink-300 shadow-xl">
                <Heart className="h-8 w-8 text-white animate-sparkle" />
              </div>
              <span className="font-black text-pink-100 text-2xl">VICTORY ROYALES</span>
            </div>
            <span className="text-4xl font-black text-pink-200 animate-number-pop">{totalDonations}</span>
          </div>
        </div>

        {/* Weekly Challenge */}
        <div className="bg-gradient-to-br from-green-600/40 to-emerald-600/40 rounded-2xl p-6 border-4 border-green-400 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="font-black text-green-100 text-xl">🎯 WEEKLY CHALLENGE</span>
            <span className="text-lg font-black text-white bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-xl border-2 border-green-300 shadow-xl">
              3/5 ELIMINATIONS
            </span>
          </div>
          <div className="relative">
            <Progress value={60} className="h-4 bg-gray-800 shadow-inner rounded-full border-2 border-green-400" />
            <div className="h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-glow border-2 border-white/30" 
                 style={{ width: '60%', marginTop: '-18px' }}>
            </div>
          </div>
        </div>

        {/* Storm Timer */}
        <div className="bg-gradient-to-br from-purple-800/60 to-pink-800/60 rounded-2xl p-6 text-center relative overflow-hidden border-4 border-purple-400 backdrop-blur-sm">
          <div className="relative z-10">
            <p className="font-black text-purple-200 mb-2 text-2xl">⚡ STORM WARNING! ⚡</p>
            <p className="text-lg font-black text-purple-100">
              <Zap className="inline h-6 w-6 mr-2 animate-sparkle" />
              2X POINTS UNTIL STORM CLOSES!
            </p>
            <div className="text-3xl font-black text-white mt-2 animate-number-pop">05:42</div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </Card>
  );
};

export default UserStats;

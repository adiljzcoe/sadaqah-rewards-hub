
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Zap, Crown, ArrowUp, Shield, Flame, Target } from 'lucide-react';
import { getUserRank, getNextRank, getRankProgress, getPointsToNextRank } from '@/utils/rankSystem';
import { getStreakData } from '@/utils/streakSystem';
import { useToast } from '@/hooks/use-toast';

const CompactRewardsWidget = () => {
  const { toast } = useToast();
  const [currentPoints, setCurrentPoints] = React.useState(
    parseInt(localStorage.getItem('jannahPoints') || '950') // Set to 950 to match the image
  );
  
  // Get user's current rank and next rank
  const currentRank = getUserRank(currentPoints);
  const nextRank = getNextRank(currentPoints);
  const rankProgress = getRankProgress(currentPoints);
  const pointsToNextRank = getPointsToNextRank(currentPoints);
  
  // Get streak data
  const streakData = getStreakData();
  
  // Mock user membership status
  const isMember = false;
  const userLevel = 12;
  const levelProgress = 89; // 5950/6000 * 100

  return (
    <div className="w-full">
      {/* Main Rewards Plaque */}
      <div className="relative bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 transform hover:scale-[1.02] transition-all duration-500 p-6 shadow-2xl rounded-lg"
           style={{
             border: '4px solid transparent',
             borderImage: `
               repeating-conic-gradient(
                 from 0deg at 50% 50%,
                 #b8860b 0deg 15deg,
                 #daa520 15deg 30deg,
                 #ffd700 30deg 45deg,
                 #b8860b 45deg 60deg
               ) 4`,
             background: 'linear-gradient(135deg, #f9d71c 0%, #daa520 25%, #ffd700 50%, #b8860b 75%, #daa520 100%)',
             boxShadow: 'inset 0 0 20px rgba(184, 134, 11, 0.3), 0 20px 40px rgba(0,0,0,0.3)'
           }}>
        
        {/* Islamic Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-15 rounded-lg"
             style={{
               backgroundImage: `
                 repeating-conic-gradient(from 0deg at 25% 25%, #b8860b 0deg 30deg, transparent 30deg 60deg),
                 repeating-conic-gradient(from 45deg at 75% 75%, #daa520 0deg 30deg, transparent 30deg 60deg)
               `,
               backgroundSize: '40px 40px, 40px 40px'
             }}>
        </div>
        
        {/* Ornate Corner Decorations */}
        <div className="absolute top-2 left-2 text-amber-800 text-lg font-bold">✧</div>
        <div className="absolute top-2 right-2 text-amber-800 text-lg font-bold">✧</div>
        <div className="absolute bottom-2 left-2 text-amber-800 text-lg font-bold">✧</div>
        <div className="absolute bottom-2 right-2 text-amber-800 text-lg font-bold">✧</div>
        
        <div className="relative z-10">
          {/* Header with Current Rank */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl bg-gradient-to-r ${currentRank.gradient} border-2 border-amber-800`}>
                <span>{currentRank.icon}</span>
              </div>
              <div>
                <div className="font-bold text-amber-900 text-lg">{currentRank.name}</div>
                <div className="text-sm text-amber-700">{currentPoints.toLocaleString()} Jannah Points</div>
              </div>
            </div>
          </div>

          {/* Next Rank Progress */}
          {nextRank && (
            <div className="mb-4 p-4 bg-white/20 rounded-lg backdrop-blur-sm border border-amber-800/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-amber-800">{currentRank.badge}</span>
                <span className="text-sm font-semibold text-amber-800">{nextRank.badge}</span>
              </div>
              <div className="relative mb-2">
                <Progress value={rankProgress} className="h-3 bg-amber-200/50 rounded-full" />
                <div className={`h-3 bg-gradient-to-r ${nextRank.gradient} rounded-full relative overflow-hidden`} 
                     style={{ width: `${rankProgress}%`, marginTop: '-12px' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-900 mb-1">
                  {pointsToNextRank.toLocaleString()} points to unlock!
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-amber-800">
                  <span>{nextRank.icon}</span>
                  <span className="font-semibold">{nextRank.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Level Progress */}
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm border border-amber-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-amber-800" />
                <span className="text-sm font-bold text-amber-800">Level {userLevel}</span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-amber-200/50 rounded-full mb-1" />
              <div className="text-xs text-amber-700 text-center">{levelProgress}% to Level {userLevel + 1}</div>
            </div>

            {/* Streak */}
            <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm border border-amber-800/30">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-bold text-amber-800">Streak</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">{streakData?.currentStreak || 0}</div>
                <div className="text-xs text-amber-700">days</div>
              </div>
            </div>
          </div>

          {/* Quick Rewards Info */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-lg p-2 border border-green-500/30">
              <div className="flex items-center gap-1 text-xs text-green-800">
                <Zap className="h-3 w-3" />
                <span className="font-bold">Prayers: +50pts each</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-lg p-2 border border-orange-500/30">
              <div className="flex items-center gap-1 text-xs text-orange-800">
                <Flame className="h-3 w-3" />
                <span className="font-bold">Streaks: +25-200pts</span>
              </div>
            </div>
          </div>

          {/* VIP Upgrade Call-to-Action */}
          {!isMember && (
            <div className="text-center">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white/20">
                <div className="flex items-center justify-center gap-2">
                  <Crown className="h-5 w-5" />
                  <span>Upgrade to VIP</span>
                  <ArrowUp className="h-4 w-4" />
                </div>
                <div className="text-sm opacity-90 mt-1">2x Points & Premium Certificates!</div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompactRewardsWidget;

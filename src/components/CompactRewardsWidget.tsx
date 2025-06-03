
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
      {/* Heavenly Blue Rewards Widget */}
      <div className="relative bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 transform hover:scale-[1.02] transition-all duration-500 p-6 shadow-2xl rounded-lg overflow-hidden"
           style={{
             border: '4px solid transparent',
             borderImage: `
               repeating-conic-gradient(
                 from 0deg at 50% 50%,
                 #1e40af 0deg 15deg,
                 #3b82f6 15deg 30deg,
                 #60a5fa 30deg 45deg,
                 #1e40af 45deg 60deg
               ) 4`,
             background: 'linear-gradient(135deg, #87ceeb 0%, #4682b4 25%, #6495ed 50%, #1e90ff 75%, #4169e1 100%)',
             boxShadow: 'inset 0 0 30px rgba(30, 64, 175, 0.3), 0 20px 40px rgba(0,0,0,0.3), 0 0 60px rgba(96, 165, 250, 0.4)'
           }}>
        
        {/* Heavenly Cloud Pattern Overlay */}
        <div className="absolute inset-0 opacity-20 rounded-lg"
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 20%, rgba(255,255,255,0.6) 20px, transparent 21px),
                 radial-gradient(circle at 80% 40%, rgba(255,255,255,0.4) 15px, transparent 16px),
                 radial-gradient(circle at 40% 80%, rgba(255,255,255,0.5) 25px, transparent 26px),
                 radial-gradient(circle at 70% 10%, rgba(255,255,255,0.3) 18px, transparent 19px)
               `,
               backgroundSize: '200px 200px, 150px 150px, 180px 180px, 160px 160px'
             }}>
        </div>
        
        {/* Floating Light Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-8 right-6 w-1 h-1 bg-yellow-200 rounded-full opacity-90 animate-sparkle"></div>
          <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-1 h-1 bg-blue-100 rounded-full opacity-80 animate-sparkle"></div>
        </div>
        
        {/* Celestial Corner Decorations */}
        <div className="absolute top-2 left-2 text-white text-lg font-bold opacity-80">✦</div>
        <div className="absolute top-2 right-2 text-white text-lg font-bold opacity-80">✦</div>
        <div className="absolute bottom-2 left-2 text-white text-lg font-bold opacity-80">✦</div>
        <div className="absolute bottom-2 right-2 text-white text-lg font-bold opacity-80">✦</div>
        
        <div className="relative z-10">
          {/* Header with Current Rank */}
          <div className="text-center mb-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl bg-gradient-to-r ${currentRank.gradient} border-2 border-white/30`}>
                <span>{currentRank.icon}</span>
              </div>
              <div>
                <div className="font-bold text-white text-lg drop-shadow-md">{currentRank.name}</div>
                <div className="text-sm text-blue-100 drop-shadow-sm">{currentPoints.toLocaleString()} Jannah Points</div>
              </div>
            </div>
          </div>

          {/* Next Rank Progress */}
          {nextRank && (
            <div className="mb-4 p-4 bg-white/25 rounded-lg backdrop-blur-sm border border-white/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white drop-shadow-sm">{currentRank.badge}</span>
                <span className="text-sm font-semibold text-white drop-shadow-sm">{nextRank.badge}</span>
              </div>
              <div className="relative mb-2">
                <Progress value={rankProgress} className="h-3 bg-white/30 rounded-full" />
                <div className={`h-3 bg-gradient-to-r ${nextRank.gradient} rounded-full relative overflow-hidden`} 
                     style={{ width: `${rankProgress}%`, marginTop: '-12px' }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-white mb-1 drop-shadow-md">
                  {pointsToNextRank.toLocaleString()} points to unlock!
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-blue-100">
                  <span>{nextRank.icon}</span>
                  <span className="font-semibold">{nextRank.name}</span>
                </div>
              </div>
            </div>
          )}

          {/* Compact Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Level Progress */}
            <div className="bg-white/25 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-white" />
                <span className="text-sm font-bold text-white drop-shadow-sm">Level {userLevel}</span>
              </div>
              <Progress value={levelProgress} className="h-2 bg-white/30 rounded-full mb-1" />
              <div className="text-xs text-blue-100 text-center">{levelProgress}% to Level {userLevel + 1}</div>
            </div>

            {/* Streak */}
            <div className="bg-white/25 rounded-lg p-3 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-orange-300" />
                <span className="text-sm font-bold text-white drop-shadow-sm">Streak</span>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-200 drop-shadow-sm">{streakData?.currentStreak || 0}</div>
                <div className="text-xs text-blue-100">days</div>
              </div>
            </div>
          </div>

          {/* Quick Rewards Info */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gradient-to-r from-emerald-400/30 to-teal-400/30 rounded-lg p-2 border border-emerald-300/40 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-xs text-white drop-shadow-sm">
                <Zap className="h-3 w-3" />
                <span className="font-bold">Prayers: +50pts each</span>
              </div>
            </div>
            <div className="bg-gradient-to-r from-orange-400/30 to-red-400/30 rounded-lg p-2 border border-orange-300/40 backdrop-blur-sm">
              <div className="flex items-center gap-1 text-xs text-white drop-shadow-sm">
                <Flame className="h-3 w-3" />
                <span className="font-bold">Streaks: +25-200pts</span>
              </div>
            </div>
          </div>

          {/* VIP Upgrade Call-to-Action */}
          {!isMember && (
            <div className="text-center">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white/20 backdrop-blur-sm">
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

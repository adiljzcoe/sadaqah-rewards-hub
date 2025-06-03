import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award, Zap, Crown, ArrowUp, Building2, Shield } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';
import { updateStreak, checkAchievements, getStreakData } from '@/utils/streakSystem';
import { getUserUnmatchedCoins } from '@/utils/matchingPool';
import { getUserRank, getNextRank, getRankProgress, getPointsToNextRank } from '@/utils/rankSystem';
import { useToast } from '@/hooks/use-toast';

const UserStats = () => {
  const { toast } = useToast();
  const userLevel = 12;
  const [currentPoints, setCurrentPoints] = React.useState(
    parseInt(localStorage.getItem('jannahPoints') || '12500') // Temporarily set to 12,500 to show Divine Saint
  );
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const sadaqahCoins = 142;
  const totalDonations = 28;
  const userUnmatchedCoins = getUserUnmatchedCoins('current_user');
  
  // Get user's current rank and next rank
  const currentRank = getUserRank(currentPoints);
  const nextRank = getNextRank(currentPoints);
  const rankProgress = getRankProgress(currentPoints);
  const pointsToNextRank = getPointsToNextRank(currentPoints);
  
  // Mock user membership status - set to false to show upgrade link
  const isMember = false;

  // Certificate styling based on rank
  const getCertificateStyle = (rank) => {
    switch (rank.name) {
      case "Divine Saint":
        return {
          background: "bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-100",
          border: "border-8 border-double border-yellow-400",
          shadow: "shadow-2xl shadow-yellow-400/50",
          texture: "bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]",
          glow: "ring-4 ring-yellow-300/30 ring-offset-4 ring-offset-white",
          material: "Platinum Certificate",
          ornament: "🏆"
        };
      case "Noble Champion":
        return {
          background: "bg-gradient-to-br from-purple-100 via-violet-50 to-purple-100",
          border: "border-6 border-double border-purple-400",
          shadow: "shadow-xl shadow-purple-400/40",
          texture: "bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.1),transparent_50%)]",
          glow: "ring-3 ring-purple-300/30 ring-offset-3 ring-offset-white",
          material: "Gold Certificate",
          ornament: "👑"
        };
      case "Guardian Angel":
        return {
          background: "bg-gradient-to-br from-blue-100 via-sky-50 to-blue-100",
          border: "border-4 border-double border-blue-400",
          shadow: "shadow-lg shadow-blue-400/30",
          texture: "bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]",
          glow: "ring-2 ring-blue-300/30 ring-offset-2 ring-offset-white",
          material: "Silver Certificate",
          ornament: "👼"
        };
      case "Kind Heart":
        return {
          background: "bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100",
          border: "border-4 border-orange-400",
          shadow: "shadow-md shadow-orange-400/20",
          texture: "bg-[radial-gradient(circle_at_50%_50%,rgba(251,146,60,0.1),transparent_50%)]",
          glow: "ring-1 ring-orange-300/20 ring-offset-1 ring-offset-white",
          material: "Bronze Certificate",
          ornament: "🥉"
        };
      default:
        return {
          background: "bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50",
          border: "border-2 border-dashed border-amber-400",
          shadow: "shadow-sm shadow-amber-200/30",
          texture: "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmJmNGY2IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]",
          glow: "",
          material: "Parchment Scroll",
          ornament: "📜"
        };
    }
  };

  const certificateStyle = getCertificateStyle(currentRank);

  // Listen for prayer completion events
  React.useEffect(() => {
    const handleJannahPointsUpdate = (event: CustomEvent) => {
      setCurrentPoints(event.detail.newPoints);
    };

    window.addEventListener('jannahPointsUpdated', handleJannahPointsUpdate as EventListener);
    
    return () => {
      window.removeEventListener('jannahPointsUpdated', handleJannahPointsUpdate as EventListener);
    };
  }, []);

  // Check for new achievements when component loads
  React.useEffect(() => {
    const userStats = {
      totalDonations,
      totalAmount: 1240,
      lastDonationAmount: 50
    };
    
    const newAchievements = checkAchievements(userStats);
    if (newAchievements.length > 0) {
      newAchievements.forEach(achievement => {
        toast({
          title: `🏆 Achievement Unlocked!`,
          description: `${achievement.icon} ${achievement.title}: ${achievement.description}`,
        });
      });
    }
  }, [toast]);

  const handleDonation = () => {
    // Simulate donation and update streak
    const { streakData, jannahPointsEarned, sadaqahCoinsToPool } = updateStreak();
    setCurrentPoints(prev => prev + jannahPointsEarned);
    
    let message = `Your donation streak is now ${streakData.currentStreak} days!`;
    if (jannahPointsEarned > 0) {
      message += ` You earned ${jannahPointsEarned} Jannah points!`;
    }
    if (sadaqahCoinsToPool > 0) {
      message += ` ${sadaqahCoinsToPool} Sadaqah coins added to business matching pool! 🏢`;
    }
    
    toast({
      title: "Donation Successful! 🎉",
      description: message,
    });
  };

  console.log('UserStats isMember:', isMember);

  return (
    <Card className="p-6 game-card">
      {/* Premium Certificate/Plaque Display */}
      <div className="text-center mb-8">
        <div className={`relative p-8 mx-4 rounded-2xl ${certificateStyle.background} ${certificateStyle.border} ${certificateStyle.shadow} ${certificateStyle.glow} ${certificateStyle.texture} transform hover:scale-[1.02] transition-all duration-300`}>
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-4 left-4 text-2xl opacity-30">{certificateStyle.ornament}</div>
          <div className="absolute top-4 right-4 text-2xl opacity-30">{certificateStyle.ornament}</div>
          <div className="absolute bottom-4 left-4 text-2xl opacity-30">{certificateStyle.ornament}</div>
          <div className="absolute bottom-4 right-4 text-2xl opacity-30">{certificateStyle.ornament}</div>
          
          {/* Certificate Header */}
          <div className="mb-6">
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
              {certificateStyle.material}
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-4"></div>
          </div>

          {/* Rank Badge */}
          <div className="relative inline-block mb-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-2xl bg-gradient-to-r ${currentRank.gradient} ring-6 ring-white/50 transform hover:rotate-12 transition-transform duration-300`}>
              <span className="text-3xl">{currentRank.icon}</span>
            </div>
            <Badge className={`absolute -top-2 -right-2 gel-button bg-gradient-to-r ${currentRank.gradient} text-white text-xs shadow-lg animate-pulse border-2 border-white`}>
              <Shield className="h-3 w-3 mr-1" />
              {currentRank.badge}
            </Badge>
          </div>

          {/* Certificate Title */}
          <div className="mb-4">
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">This Certifies That</div>
            <h3 className="font-bold text-2xl text-gray-900 flex items-center justify-center gap-3 mb-2">
              Ahmad M.
              {isMember && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
              )}
            </h3>
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">Has Achieved The Rank Of</div>
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              {currentRank.name}
            </div>
            <p className="text-sm text-gray-600 italic">{currentRank.description}</p>
          </div>

          {/* Points Display */}
          <div className="mb-6">
            <div className="text-4xl font-black bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent mb-2">
              {currentPoints.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 font-medium">Jannah Points Earned</div>
          </div>

          {/* Decorative Flourish */}
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-px bg-gray-400"></div>
            <Star className="h-4 w-4 mx-3 text-gray-400" />
            <div className="w-8 h-px bg-gray-400"></div>
          </div>

          {/* Benefits Preview */}
          <div className="text-xs text-gray-600 mb-4">
            <div className="font-semibold mb-1">Current Benefits:</div>
            <div className="flex flex-wrap justify-center gap-1">
              {currentRank.benefits.slice(0, 2).map((benefit, index) => (
                <span key={index} className="bg-white/50 px-2 py-1 rounded text-xs">
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          {/* Signature Line */}
          <div className="border-t border-gray-300 pt-4 mt-6">
            <div className="text-xs text-gray-500">
              Donate Feels Great Community
            </div>
          </div>
        </div>
        
        {/* Next Rank Incentive */}
        {nextRank && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-dashed border-blue-200 hover:border-blue-300 transition-colors duration-300">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-3xl animate-bounce">{nextRank.icon}</span>
              <div>
                <div className="font-bold text-gray-800 text-lg">{nextRank.name}</div>
                <div className="text-sm text-gray-600">Next Rank Achievement</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 animate-pulse mb-2">
                {pointsToNextRank.toLocaleString()} points to unlock!
              </div>
              <div className="text-sm text-gray-600 mb-3">
                Unlock: {nextRank.benefits.join(', ')}
              </div>
              <div className="text-xs text-blue-500 font-semibold bg-blue-100 px-3 py-1 rounded-full inline-block">
                🏆 Earn your {getCertificateStyle(nextRank).material}
              </div>
            </div>
          </div>
        )}
        
        {/* Upgrade link for non-members - electric glow */}
        {!isMember && (
          <div className="mt-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-white electric-glow">
              <ArrowUp className="h-5 w-5 mr-2 inline" />
              Upgrade to VIP for 2x Points & Premium Certificates!
            </button>
          </div>
        )}
      </div>

      {/* Rank Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
          <span>{currentRank.badge}</span>
          {nextRank ? <span>{nextRank.badge}</span> : <span>Max Rank</span>}
        </div>
        <div className="relative">
          <Progress 
            value={rankProgress} 
            className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 shadow-inner rounded-full overflow-hidden"
          />
          <div className={`h-4 bg-gradient-to-r ${currentRank.gradient} rounded-full relative overflow-hidden`} 
               style={{ width: `${rankProgress}%`, marginTop: '-16px' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
        {nextRank && (
          <p className="text-sm text-center text-gray-600 mt-2 font-semibold">
            {pointsToNextRank.toLocaleString()} points to {nextRank.name}! 🚀
          </p>
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
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs shadow-lg border border-white/20">
                2x Rate
              </Badge>
            )}
          </div>
          <div className="text-3xl font-black text-white animate-points-pop">
            {currentPoints.toLocaleString()}
          </div>
          <div className="text-sm text-white/80 mt-1">✨ Divine Rewards + Prayer & Streak Bonuses ✨</div>
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
               style={{ width: `${progress}%`, marginTop: '-12px' }}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
          <p className="text-sm text-center text-gray-600 mt-2 font-semibold">
            {nextLevelPoints - currentPoints} points to level up! 🚀
          </p>
        </div>

        {/* Matching Pool Info */}
        {userUnmatchedCoins > 0 && (
          <div className="game-card p-4 bg-gradient-to-r from-blue-100 to-purple-100 text-center relative overflow-hidden">
            <div className="relative z-10">
              <p className="font-bold text-blue-800 mb-1 text-lg flex items-center justify-center gap-2">
                <Building2 className="h-5 w-5" />
                Matching Pool
              </p>
              <p className="text-sm font-bold text-blue-700">
                You have {userUnmatchedCoins} coins awaiting business match!
              </p>
              <div className="text-xs text-blue-600 mt-1">
                💼 When matched, funds go directly to charity
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent animate-shimmer"></div>
          </div>
        )}

        {/* Prayer Rewards Info */}
        <div className="game-card p-4 bg-gradient-to-r from-green-100 to-teal-100 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-bold text-green-800 mb-1 text-lg">🤲 Prayer Rewards!</p>
            <p className="text-sm font-bold text-green-700">
              <Zap className="inline h-5 w-5 mr-1 animate-subtle-pulse" />
              Complete your 5 daily prayers for bonus points!
            </p>
            <div className="text-xs text-green-600 mt-2">
              Each prayer: +50 points • All 5 prayers: +100 bonus points
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-200/50 to-transparent animate-shimmer"></div>
        </div>

        {/* Streak Bonus Info */}
        <div className="game-card p-4 bg-gradient-to-r from-orange-100 to-yellow-100 text-center relative overflow-hidden">
          <div className="relative z-10">
            <p className="font-bold text-orange-800 mb-1 text-lg">🔥 Streak Rewards!</p>
            <p className="text-sm font-bold text-orange-700">
              <Zap className="inline h-5 w-5 mr-1 animate-subtle-pulse" />
              Longer streaks = More Jannah points!
            </p>
            <div className="text-xs text-orange-600 mt-2">
              3+ days: +25 points • 7+ days: +50 points • 30+ days: +200 points
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent animate-shimmer"></div>
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
                    <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xs shadow-lg border border-white/20">
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

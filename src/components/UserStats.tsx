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
    parseInt(localStorage.getItem('jannahPoints') || '25000') // Increased to 25,000 to show premium Platinum Divine Saint
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
          background: "bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300",
          borderPattern: "border-amber-800",
          textColor: "text-amber-900",
          headerColor: "text-amber-800",
          material: "🏆 PLATINUM CERTIFICATE 🏆",
          premium: true
        };
      case "Noble Champion":
        return {
          background: "bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300",
          borderPattern: "border-purple-800",
          textColor: "text-purple-900",
          headerColor: "text-purple-800",
          material: "Gold Certificate"
        };
      case "Guardian Angel":
        return {
          background: "bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300",
          borderPattern: "border-blue-800",
          textColor: "text-blue-900",
          headerColor: "text-blue-800",
          material: "Silver Certificate"
        };
      case "Kind Heart":
        return {
          background: "bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300",
          borderPattern: "border-orange-800",
          textColor: "text-orange-900",
          headerColor: "text-orange-800",
          material: "Bronze Certificate"
        };
      default:
        return {
          background: "bg-gradient-to-br from-amber-200 via-yellow-100 to-amber-300",
          borderPattern: "border-amber-800",
          textColor: "text-amber-900",
          headerColor: "text-amber-800",
          material: "Certificate"
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
    <div className="w-full -mx-6 -mt-6">
      {/* Classic Gold Certificate - Full Width */}
      <div className="text-center mb-8">
        <div className={`relative ${certificateStyle.background} ${certificateStyle.borderPattern} transform hover:scale-[1.02] transition-all duration-500`}
             style={{
               backgroundImage: `
                 repeating-linear-gradient(
                   0deg,
                   transparent,
                   transparent 20px,
                   rgba(0,0,0,0.05) 20px,
                   rgba(0,0,0,0.05) 22px
                 ),
                 repeating-linear-gradient(
                   90deg,
                   transparent,
                   transparent 20px,
                   rgba(0,0,0,0.05) 20px,
                   rgba(0,0,0,0.05) 22px
                 )
               `,
               border: '20px solid',
               borderImage: `repeating-linear-gradient(
                 45deg,
                 #8B4513 0px,
                 #8B4513 10px,
                 #D2691E 10px,
                 #D2691E 20px,
                 #CD853F 20px,
                 #CD853F 30px,
                 #DEB887 30px,
                 #DEB887 40px
               ) 20`,
               padding: '60px 80px',
               boxShadow: 'inset 0 0 100px rgba(0,0,0,0.1), 0 0 50px rgba(0,0,0,0.2)'
             }}>
          
          {/* Ornate Corner Decorations */}
          <div className="absolute top-8 left-8 text-4xl opacity-60" style={{ fontFamily: 'serif' }}>❋</div>
          <div className="absolute top-8 right-8 text-4xl opacity-60" style={{ fontFamily: 'serif' }}>❋</div>
          <div className="absolute bottom-8 left-8 text-4xl opacity-60" style={{ fontFamily: 'serif' }}>❋</div>
          <div className="absolute bottom-8 right-8 text-4xl opacity-60" style={{ fontFamily: 'serif' }}>❋</div>
          
          {/* Certificate Header */}
          <div className="mb-12">
            <div className={`text-5xl font-bold mb-6 ${certificateStyle.headerColor}`} style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
              Certificate
            </div>
            <div className={`text-lg uppercase tracking-[0.3em] mb-2 ${certificateStyle.textColor}`} style={{ fontFamily: 'serif' }}>
              OF AWARD & RECOGNITION
            </div>
            <div className={`w-32 h-px bg-current mx-auto ${certificateStyle.textColor}`}></div>
          </div>

          {/* Main Content */}
          <div className="mb-12 space-y-8">
            <div className={`text-base ${certificateStyle.textColor}`} style={{ fontFamily: 'serif' }}>
              This acknowledges
            </div>
            
            <div className={`text-6xl font-bold mb-6 ${certificateStyle.headerColor}`} style={{ fontFamily: 'serif', fontStyle: 'italic' }}>
              Ahmad M.
              {isMember && (
                <Badge className="ml-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg">
                  <Crown className="h-5 w-5 mr-2" />
                  VIP
                </Badge>
              )}
            </div>
            
            <div className={`text-lg mb-8 ${certificateStyle.textColor} max-w-2xl mx-auto leading-relaxed`} style={{ fontFamily: 'serif' }}>
              For unwavering dedication and excellence in<br />
              <span className="font-semibold">Charitable Giving and Community Service</span>
            </div>

            {/* Rank Badge - Centered */}
            <div className="relative inline-block mb-8">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-2xl bg-gradient-to-r ${currentRank.gradient} border-8 border-amber-700 transform hover:rotate-6 transition-transform duration-300`}>
                <span className="text-4xl">{currentRank.icon}</span>
              </div>
              <Badge className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${currentRank.gradient} text-white text-sm shadow-lg border-2 border-amber-700`}>
                <Shield className="h-4 w-4 mr-1" />
                {currentRank.name}
              </Badge>
            </div>

            {/* Points Display */}
            <div className="mb-8">
              <div className={`text-6xl font-black mb-4 ${certificateStyle.headerColor}`} style={{ fontFamily: 'serif' }}>
                {currentPoints.toLocaleString()}
              </div>
              <div className={`text-xl font-semibold ${certificateStyle.textColor}`} style={{ fontFamily: 'serif' }}>
                Jannah Points Earned
              </div>
            </div>
          </div>

          {/* Signature Area */}
          <div className={`border-t-2 border-current pt-12 mt-12 ${certificateStyle.textColor}`}>
            <div className="flex justify-between items-end max-w-4xl mx-auto">
              <div className="text-left">
                <div className={`border-b-2 border-current w-48 mb-3`}></div>
                <div className="text-sm uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                  Dr. William Harris<br />
                  Chief Medical Officer
                </div>
              </div>
              
              {/* Center Seal */}
              <div className="text-center">
                <div className={`w-24 h-24 rounded-full border-4 ${certificateStyle.borderPattern} flex items-center justify-center mb-4 bg-amber-300`}>
                  <div className="text-3xl">🏆</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`border-b-2 border-current w-48 mb-3`}></div>
                <div className="text-sm uppercase tracking-wider" style={{ fontFamily: 'serif' }}>
                  Linda Martinez<br />
                  Patient Care Coordinator
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <div className="text-lg font-semibold mb-2" style={{ fontFamily: 'serif' }}>
                Donate Feels Great
              </div>
              <div className="text-sm" style={{ fontFamily: 'serif' }}>
                Community Foundation
              </div>
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
      <Card className="p-6 game-card">
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
    </div>
  );
};

export default UserStats;

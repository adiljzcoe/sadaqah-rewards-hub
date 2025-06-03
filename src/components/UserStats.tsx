
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Gift, Users, Heart, Award, Zap, Crown, ArrowUp, Shield } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';
import CompactRewardsWidget from './CompactRewardsWidget';
import { updateStreak, checkAchievements, getStreakData } from '@/utils/streakSystem';
import { getUserRank, getNextRank, getRankProgress, getPointsToNextRank } from '@/utils/rankSystem';
import { useToast } from '@/hooks/use-toast';

const UserStats = () => {
  const { toast } = useToast();
  const userLevel = 12;
  const [currentPoints, setCurrentPoints] = React.useState(
    parseInt(localStorage.getItem('jannahPoints') || '950') // Match the compact widget
  );
  const nextLevelPoints = 6000;
  const progress = (currentPoints / nextLevelPoints) * 100;
  const totalDonations = 28;
  
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
          material: "🏆 PLATINUM CERTIFICATE 🏆",
          premium: true
        };
      case "Noble Champion":
        return {
          material: "Gold Certificate"
        };
      case "Guardian Angel":
        return {
          material: "Silver Certificate"
        };
      case "Kind Heart":
        return {
          material: "Bronze Certificate"
        };
      default:
        return {
          material: "Certificate"
        };
    }
  };

  const certificateStyle = getCertificateStyle(currentRank);

  // Mock earned badges - you can replace this with real data
  const earnedBadges = [
    { icon: "🕌", name: "Mosque Builder", description: "Built 5 mosques" },
    { icon: "💧", name: "Water Hero", description: "Donated 10 water wells" },
    { icon: "🔥", name: "Streak Master", description: "30-day donation streak" },
    { icon: "❤️", name: "Generous Heart", description: "Donated $1000+" },
    { icon: "🌟", name: "Community Leader", description: "Top 10 donor" }
  ];

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
    const { streakData, jannahPointsEarned } = updateStreak();
    setCurrentPoints(prev => prev + jannahPointsEarned);
    
    let message = `Your donation streak is now ${streakData.currentStreak} days!`;
    if (jannahPointsEarned > 0) {
      message += ` You earned ${jannahPointsEarned} Jannah points!`;
    }
    
    toast({
      title: "Donation Successful! 🎉",
      description: message,
    });
  };

  console.log('UserStats isMember:', isMember);

  return (
    <div className="w-full">
      {/* Classic Gold Certificate - Wider with balanced margins */}
      <div className="text-center mb-8 pt-3">
        <div className="relative bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 transform hover:scale-[1.02] transition-all duration-500 p-4 shadow-2xl"
             style={{
               border: '6px solid transparent',
               borderImage: `
                 repeating-conic-gradient(
                   from 0deg at 50% 50%,
                   #b8860b 0deg 15deg,
                   #daa520 15deg 30deg,
                   #ffd700 30deg 45deg,
                   #b8860b 45deg 60deg
                 ) 6`,
               background: 'linear-gradient(135deg, #f9d71c 0%, #daa520 25%, #ffd700 50%, #b8860b 75%, #daa520 100%)',
               boxShadow: 'inset 0 0 20px rgba(184, 134, 11, 0.3), 0 20px 40px rgba(0,0,0,0.3)'
             }}>
          
          {/* Islamic Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-15"
               style={{
                 backgroundImage: `
                   repeating-conic-gradient(from 0deg at 25% 25%, #b8860b 0deg 30deg, transparent 30deg 60deg),
                   repeating-conic-gradient(from 45deg at 75% 75%, #daa520 0deg 30deg, transparent 30deg 60deg),
                   repeating-linear-gradient(45deg, transparent 0px, transparent 10px, rgba(184, 134, 11, 0.1) 10px, rgba(184, 134, 11, 0.1) 20px)
                 `,
                 backgroundSize: '60px 60px, 60px 60px, 30px 30px'
               }}>
          </div>
          
          {/* Ornate Corner Decorations with Islamic star patterns */}
          <div className="absolute top-2 left-2 text-amber-800 text-lg font-bold">✧</div>
          <div className="absolute top-2 right-2 text-amber-800 text-lg font-bold">✧</div>
          <div className="absolute bottom-2 left-2 text-amber-800 text-lg font-bold">✧</div>
          <div className="absolute bottom-2 right-2 text-amber-800 text-lg font-bold">✧</div>
          
          {/* Inner decorative border with Islamic geometric pattern */}
          <div className="absolute inset-2 border border-amber-800 opacity-70"
               style={{
                 borderImage: `repeating-linear-gradient(
                   45deg, 
                   #b8860b 0, 
                   #b8860b 3px, 
                   transparent 3px, 
                   transparent 6px,
                   #daa520 6px,
                   #daa520 9px,
                   transparent 9px,
                   transparent 12px
                 ) 1`
               }}>
          </div>
          
          {/* Certificate Header with Swishy Calligraphy */}
          <div className="mb-3">
            <div className="text-3xl font-bold mb-1 text-amber-900 italic transform -rotate-1 font-serif" 
                 style={{ 
                   fontFamily: 'Brush Script MT, cursive, Lucida Handwriting, fantasy',
                   textShadow: '3px 3px 6px rgba(0,0,0,0.2), 1px 1px 3px rgba(184, 134, 11, 0.3)',
                   letterSpacing: '0.05em'
                 }}>
              Certificate of Excellence
            </div>
            <div className="text-xs uppercase tracking-[0.15em] mb-1 text-amber-800 font-semibold font-playfair">
              This is to certify that
            </div>
            <div className="w-10 h-px bg-amber-800 mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="mb-3 space-y-2">
            <div className="text-2xl font-bold mb-1 text-amber-900 font-cinzel" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
              Ahmad M.
              {isMember && (
                <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
              )}
            </div>
            
            <div className="text-xs mb-2 text-amber-800 max-w-xl mx-auto leading-relaxed font-medium font-playfair">
              has demonstrated outstanding commitment and excellence in<br />
              <span className="font-bold text-sm">Charitable Giving and Community Service</span>
            </div>

            {/* Rank Badge - Centered */}
            <div className="relative inline-block mb-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-xl bg-gradient-to-r ${currentRank.gradient} border-2 border-amber-800 transform hover:rotate-6 transition-transform duration-300`}>
                <span className="text-lg">{currentRank.icon}</span>
              </div>
              <Badge className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${currentRank.gradient} text-white text-xs shadow-lg border border-amber-800`}>
                <Shield className="h-3 w-3 mr-1" />
                {currentRank.name}
              </Badge>
            </div>

            {/* Points and Donations Display */}
            <div className="mb-2 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-black mb-1 text-amber-900 font-cinzel" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                  {currentPoints.toLocaleString()}
                </div>
                <div className="text-sm font-semibold text-amber-800 font-playfair">
                  Jannah Points Earned
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black mb-1 text-amber-900 font-cinzel" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
                  {totalDonations}
                </div>
                <div className="text-sm font-semibold text-amber-800 font-playfair">
                  Total Donations
                </div>
              </div>
            </div>
          </div>

          {/* Earned Badges Section */}
          <div className="border-t-2 border-amber-800 pt-2 mt-2">
            <div className="text-center mb-2">
              <div className="text-lg font-bold text-amber-900 font-cinzel">
                Badges Earned
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mb-3">
              {earnedBadges.map((badge, index) => (
                <div 
                  key={index}
                  className="group relative bg-white/20 backdrop-blur-sm rounded-lg p-2 border border-amber-800/30 hover:bg-white/30 transition-all duration-200"
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div className="text-lg">{badge.icon}</div>
                  <div className="text-xs text-amber-800 font-bold mt-1 truncate max-w-16">
                    {badge.name.split(' ')[0]}
                  </div>
                  
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-amber-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {badge.description}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-2">
              <div className="text-lg font-bold mb-1 text-amber-900 font-cinzel">
                Held tight to the rope of Allah swt
              </div>
              <div className="text-xs text-amber-800 font-medium font-playfair">
                Community Foundation
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Compact Rewards Widget */}
      <CompactRewardsWidget />

      {/* Member Benefits Banner - only show if member */}
      {isMember && (
        <Card className="p-6 game-card mt-6">
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
        </Card>
      )}
    </div>
  );
};

export default UserStats;

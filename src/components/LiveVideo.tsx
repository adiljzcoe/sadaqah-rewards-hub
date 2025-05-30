
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2, Sparkles, Zap, Star, Gift } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const LiveVideo = () => {
  const [recentDonations, setRecentDonations] = useState([]);
  const [userCoins, setUserCoins] = useState(1250);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);

  const quickDonations = [
    { emoji: '🍽️', label: 'Hot Meal', coins: 50, impact: 'Feed 1 family', color: 'from-orange-400 to-red-500' },
    { emoji: '💧', label: 'Clean Water', coins: 25, impact: 'Water for 1 day', color: 'from-blue-400 to-cyan-500' },
    { emoji: '🏠', label: 'Shelter', coins: 100, impact: 'Safe night', color: 'from-green-400 to-emerald-600' },
    { emoji: '📚', label: 'Education', coins: 30, impact: 'School supplies', color: 'from-purple-400 to-violet-600' },
    { emoji: '💊', label: 'Medicine', coins: 75, impact: 'Medical aid', color: 'from-pink-400 to-rose-500' },
    { emoji: '🧸', label: 'Comfort', coins: 20, impact: 'Child care', color: 'from-yellow-400 to-amber-500' }
  ];

  const createFloatingCoin = (donation) => {
    const coinId = Date.now() + Math.random();
    const newCoin = {
      id: coinId,
      x: Math.random() * 80 + 10, // Random position 10-90%
      y: Math.random() * 30 + 40, // Start from middle area
      emoji: donation.emoji,
      coins: donation.coins,
      multiplier: multiplier
    };
    
    setFloatingCoins(prev => [...prev, newCoin]);
    
    // Remove coin after animation
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(coin => coin.id !== coinId));
    }, 2000);
  };

  const triggerCelebration = () => {
    setCelebrationMode(true);
    // Create multiple celebration coins
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const celebCoin = {
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          emoji: '🎉',
          coins: '+' + (10 * multiplier),
          multiplier: 1
        };
        setFloatingCoins(prev => [...prev, celebCoin]);
      }, i * 100);
    }
    
    setTimeout(() => setCelebrationMode(false), 2000);
  };

  const handleQuickDonate = (donation) => {
    if (userCoins >= donation.coins) {
      const finalAmount = donation.coins * multiplier;
      setUserCoins(prev => prev - donation.coins);
      setStreakCount(prev => prev + 1);
      
      // Increase multiplier based on streak
      if (streakCount > 0 && streakCount % 3 === 0) {
        setMultiplier(prev => Math.min(prev + 0.5, 3));
        triggerCelebration();
      }
      
      // Create floating coin effect
      createFloatingCoin(donation);
      
      // Add to recent donations with enhanced animation
      const newDonation = {
        id: Date.now(),
        ...donation,
        finalAmount,
        timestamp: new Date(),
        streak: streakCount + 1
      };
      
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      // Remove after 8 seconds
      setTimeout(() => {
        setRecentDonations(prev => prev.filter(d => d.id !== newDonation.id));
      }, 8000);
    }
  };

  // Reset streak after 10 seconds of inactivity
  useEffect(() => {
    const timer = setTimeout(() => {
      setStreakCount(0);
      setMultiplier(1);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [streakCount]);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Video Container - Centered and Viewable */}
      <div className="relative aspect-video flex items-center justify-center">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-xl font-semibold mb-2">Live: Emergency Relief for Gaza</h3>
            <p className="text-gray-300">Providing urgent aid to families in need</p>
          </div>
        </div>

        {/* Floating Coins Animation */}
        {floatingCoins.map((coin) => (
          <div
            key={coin.id}
            className="absolute pointer-events-none z-30 animate-bounce"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
              animation: 'floatUp 2s ease-out forwards'
            }}
          >
            <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              <span className="text-lg">{coin.emoji}</span>
              <span>+{coin.coins * coin.multiplier}</span>
              <Sparkles className="h-3 w-3 animate-spin" />
            </div>
          </div>
        ))}

        {/* Celebration Overlay */}
        {celebrationMode && (
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 animate-pulse z-20 pointer-events-none">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl animate-bounce">🎉</div>
            </div>
          </div>
        )}

        {/* Top UI Elements */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20">
          <div className="flex justify-between items-start">
            {/* Live Badge */}
            <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </Badge>

            {/* Top Right Stats */}
            <div className="space-y-2">
              {/* Viewer Count */}
              <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
                <div className="flex items-center text-white text-sm">
                  <Users className="h-4 w-4 mr-1" />
                  1,247 viewers
                </div>
              </div>

              {/* User Coins with 3D Effect */}
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 backdrop-blur-sm rounded-lg px-3 py-2 shadow-xl border-2 border-yellow-300">
                <div className="flex items-center text-white text-sm font-bold">
                  <GoldCoin3D size={24} className="mr-2" />
                  {userCoins} Sadaqah Coins
                </div>
              </div>

              {/* Streak & Multiplier Display */}
              {streakCount > 0 && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg animate-pulse">
                  <div className="flex items-center text-white text-xs font-bold">
                    <Zap className="h-3 w-3 mr-1" />
                    {streakCount} Streak • {multiplier}x Multiplier
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Side Donation Buttons - Jackpot Style */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
          {quickDonations.slice(0, 3).map((donation, index) => (
            <button
              key={donation.label}
              onClick={() => handleQuickDonate(donation)}
              disabled={userCoins < donation.coins}
              className={`
                group relative w-20 h-20 rounded-2xl shadow-xl
                bg-gradient-to-br ${donation.color}
                hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-300 border-4 border-white/30
                ${userCoins >= donation.coins ? 'hover:shadow-2xl hover:border-white/60' : ''}
              `}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <div className="text-2xl mb-1 animate-bounce">{donation.emoji}</div>
                <div className="text-xs font-bold">{donation.coins}</div>
                <div className="text-[8px] opacity-80">coins</div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Right Side Donation Buttons */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
          {quickDonations.slice(3).map((donation, index) => (
            <button
              key={donation.label}
              onClick={() => handleQuickDonate(donation)}
              disabled={userCoins < donation.coins}
              className={`
                group relative w-20 h-20 rounded-2xl shadow-xl
                bg-gradient-to-br ${donation.color}
                hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                transition-all duration-300 border-4 border-white/30
                ${userCoins >= donation.coins ? 'hover:shadow-2xl hover:border-white/60' : ''}
              `}
              style={{
                animationDelay: `${(index + 3) * 0.1}s`
              }}
            >
              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
              
              <div className="relative h-full flex flex-col items-center justify-center text-white">
                <div className="text-2xl mb-1 animate-bounce">{donation.emoji}</div>
                <div className="text-xs font-bold">{donation.coins}</div>
                <div className="text-[8px] opacity-80">coins</div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Recent Donations Feed - Enhanced */}
        <div className="absolute left-6 bottom-20 space-y-2 z-20">
          {recentDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 rounded-2xl text-sm font-medium flex items-center space-x-3 animate-slide-in-left shadow-xl border-2 border-emerald-300"
            >
              <span className="text-2xl animate-bounce">{donation.emoji}</span>
              <div className="flex-1">
                <div className="font-bold">You helped with {donation.label}!</div>
                <div className="text-xs opacity-90">
                  {donation.finalAmount} coins • Streak {donation.streak}
                  {donation.streak % 3 === 0 && <span className="ml-1">🔥</span>}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
                <span className="text-xs">+{Math.floor(donation.finalAmount / 10)} XP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Bar - Jackpot Style */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-black/80 via-gray-900/90 to-black/80 backdrop-blur-sm p-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <Volume2 className="h-4 w-4" />
              </Button>
              <div className="text-sm text-gray-300 flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span>
                  <span className="font-bold text-emerald-400">2,850 coins</span> donated in last hour
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Top Up Coins - Call to Action */}
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-lg border-2 border-yellow-300 animate-pulse">
                <Gift className="h-4 w-4 mr-2" />
                Get More Coins
              </Button>
              
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Share2 className="h-4 w-4 mr-2" />
                Share & Earn 50 Coins
              </Button>
              
              <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white hover:bg-white/20 relative">
                <Heart className="h-4 w-4 mr-2" />
                Follow
                <Badge className="absolute -top-1 -right-1 bg-amber-500 text-white text-[8px] px-1">
                  +25
                </Badge>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8);
          }
        }
        
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LiveVideo;

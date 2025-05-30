import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2, Sparkles, Zap, Star, Gift, Trophy, Flame, Target } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const LiveVideo = () => {
  const [recentDonations, setRecentDonations] = useState([]);
  const [userCoins, setUserCoins] = useState(1250);
  const [floatingCoins, setFloatingCoins] = useState([]);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [streakCount, setStreakCount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [pulseEffect, setPulseEffect] = useState(false);

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
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 40,
      emoji: donation.emoji,
      coins: donation.coins,
      multiplier: multiplier
    };
    
    setFloatingCoins(prev => [...prev, newCoin]);
    
    setTimeout(() => {
      setFloatingCoins(prev => prev.filter(coin => coin.id !== coinId));
    }, 2000);
  };

  const triggerCelebration = () => {
    setCelebrationMode(true);
    setPulseEffect(true);
    
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const celebCoin = {
          id: Date.now() + i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          emoji: ['🎉', '🔥', '⭐', '🏆'][Math.floor(Math.random() * 4)],
          coins: '+' + (10 * multiplier),
          multiplier: 1
        };
        setFloatingCoins(prev => [...prev, celebCoin]);
      }, i * 100);
    }
    
    setTimeout(() => {
      setCelebrationMode(false);
      setPulseEffect(false);
    }, 2000);
  };

  const handleQuickDonate = (donation) => {
    if (userCoins >= donation.coins) {
      const finalAmount = donation.coins * multiplier;
      setUserCoins(prev => prev - donation.coins);
      setStreakCount(prev => prev + 1);
      
      if (streakCount > 0 && streakCount % 3 === 0) {
        setMultiplier(prev => Math.min(prev + 0.5, 3));
        triggerCelebration();
      }
      
      createFloatingCoin(donation);
      
      const newDonation = {
        id: Date.now(),
        ...donation,
        finalAmount,
        timestamp: new Date(),
        streak: streakCount + 1
      };
      
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      setTimeout(() => {
        setRecentDonations(prev => prev.filter(d => d.id !== newDonation.id));
      }, 8000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStreakCount(0);
      setMultiplier(1);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, [streakCount]);

  return (
    <div className="relative">
      {/* Video Container */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-t-xl shadow-2xl">
        {/* Background Video Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center text-white z-10">
            <Play className="h-20 w-20 mx-auto mb-6 opacity-80" />
            <h3 className="text-2xl font-bold mb-3">Live: Emergency Relief for Gaza</h3>
            <p className="text-gray-300 text-lg">Providing urgent aid to families in need</p>
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
        <div className="absolute top-0 left-0 right-0 p-6 z-20">
          <div className="flex justify-between items-start">
            {/* Live Badge */}
            <Badge className="bg-red-500 hover:bg-red-600 text-white shadow-lg px-3 py-2">
              <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
              LIVE
            </Badge>

            {/* Top Right - Single Line with Interactive Elements */}
            <div className="flex items-center space-x-3 bg-black/50 backdrop-blur-sm rounded-xl p-3 shadow-xl border border-white/20">
              {/* Viewer Count with Pulse */}
              <div className="flex items-center text-white text-sm font-medium hover:scale-110 transition-transform cursor-pointer">
                <Users className={`h-4 w-4 mr-2 ${pulseEffect ? 'animate-pulse text-green-400' : ''}`} />
                <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent font-bold">1,247</span>
              </div>

              {/* Separator */}
              <div className="w-px h-4 bg-white/30"></div>

              {/* User Coins with Glow Effect */}
              <div className="flex items-center text-amber-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer">
                <GoldCoin3D size={18} className="mr-2 animate-spin" />
                <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">{userCoins}</span>
              </div>

              {/* Streak & Multiplier with Fire Effect */}
              {streakCount > 0 && (
                <>
                  <div className="w-px h-4 bg-white/30"></div>
                  <div className="flex items-center text-purple-300 text-sm font-bold hover:scale-110 transition-transform cursor-pointer bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-2 py-1 rounded-lg border border-purple-400/30">
                    <Flame className="h-3 w-3 mr-1 text-orange-400 animate-pulse" />
                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {streakCount}x{multiplier}
                    </span>
                  </div>
                </>
              )}

              {/* Achievement Badge */}
              <div className="flex items-center bg-gradient-to-r from-yellow-500/20 to-amber-500/20 px-2 py-1 rounded-lg border border-yellow-400/30 hover:scale-110 transition-transform cursor-pointer">
                <Trophy className="h-3 w-3 mr-1 text-yellow-400" />
                <span className="text-yellow-300 text-xs font-bold">Lv.5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Donations Feed with Enhanced Animation */}
        <div className="absolute left-6 top-24 space-y-2 z-20">
          {recentDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-3 rounded-2xl text-sm font-medium flex items-center space-x-3 animate-slide-in-left shadow-xl border-2 border-emerald-300 hover:scale-105 transition-transform"
            >
              <span className="text-2xl animate-bounce">{donation.emoji}</span>
              <div className="flex-1">
                <div className="font-bold">You helped with {donation.label}!</div>
                <div className="text-xs opacity-90 flex items-center space-x-2">
                  <span>{donation.finalAmount} coins • Streak {donation.streak}</span>
                  {donation.streak % 3 === 0 && <Flame className="h-3 w-3 text-orange-300 animate-pulse" />}
                  <Target className="h-3 w-3 text-blue-300" />
                </div>
              </div>
              <div className="flex flex-col items-center bg-white/20 rounded-lg p-1">
                <Star className="h-4 w-4 text-yellow-300 animate-pulse" />
                <span className="text-xs">+{Math.floor(donation.finalAmount / 10)} XP</span>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Donation Buttons - Now overlapping the video border */}
        <div className="absolute bottom-0 left-0 right-0 z-30 transform translate-y-1/2">
          <div className="flex justify-center px-6">
            <div className="grid grid-cols-6 gap-4 bg-gray-800/80 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-gray-600/50">
              {quickDonations.map((donation, index) => (
                <button
                  key={donation.label}
                  onClick={() => handleQuickDonate(donation)}
                  disabled={userCoins < donation.coins}
                  className={`
                    group relative w-20 h-20 rounded-2xl shadow-lg
                    bg-gradient-to-br ${donation.color}
                    hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed
                    transition-all duration-300 border-4 border-white/40
                    ${userCoins >= donation.coins ? 'hover:shadow-2xl hover:border-white/80 hover:rotate-3' : ''}
                  `}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl"></div>
                  
                  <div className="relative h-full flex flex-col items-center justify-center text-white">
                    <div className="text-2xl mb-1 group-hover:scale-125 transition-transform">{donation.emoji}</div>
                    <div className="text-xs font-bold">{donation.coins}</div>
                    <div className="text-[8px] opacity-80">coins</div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Pulse Ring */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-white/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Grey Bottom Section - Enhanced Interactivity */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 py-16 px-8 rounded-b-xl border-t border-gray-600/50">
        <div className="flex items-center justify-between">
          {/* Left Side - Enhanced Stats */}
          <div className="flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2 hover:scale-110 transition-transform">
              <Volume2 className="h-5 w-5" />
            </Button>
            <div className="text-sm text-emerald-400 flex items-center space-x-4 font-medium">
              <div className="flex items-center bg-emerald-500/20 px-3 py-1 rounded-lg border border-emerald-400/30 hover:scale-105 transition-transform cursor-pointer">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">2,850</span>
                <span className="text-xs ml-1 opacity-80 text-emerald-300">coins</span>
              </div>
              <span className="text-gray-300">donated in last hour</span>
              <div className="flex items-center text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-lg border border-yellow-400/30">
                <Flame className="h-3 w-3 mr-1 animate-pulse" />
                <span className="text-xs font-bold">Hot streak!</span>
              </div>
            </div>
          </div>
          
          {/* Right Side - Enhanced Action Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="bg-gray-700/50 border-gray-500 text-white hover:bg-gray-600/80 hover:scale-105 transition-all px-4 py-2 hover:border-blue-400">
              <Share2 className="h-4 w-4 mr-2" />
              Share & Earn 50 Coins
            </Button>
            
            <Button variant="outline" size="sm" className="bg-gray-700/50 border-gray-500 text-white hover:bg-gray-600/80 hover:scale-105 transition-all relative px-4 py-2 hover:border-pink-400">
              <Heart className="h-4 w-4 mr-2" />
              Follow
              <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[8px] px-1 animate-pulse">
                +25
              </Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Get More Coins - Enhanced Design */}
      <div className="mt-4 flex justify-center">
        <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-xl border-2 border-yellow-300 px-8 py-3 text-lg font-bold rounded-xl hover:scale-105 transition-all duration-300 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <Gift className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
          Get More Coins
          <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
        </Button>
      </div>

      {/* Custom Animations */}
      <style>{`
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

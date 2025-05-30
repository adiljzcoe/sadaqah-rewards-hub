
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Users, Heart, Share2, Volume2, Sparkles, Zap } from 'lucide-react';

const LiveVideo = () => {
  const [recentDonations, setRecentDonations] = useState([]);
  const [userCoins, setUserCoins] = useState(1250); // User's sadaqah coins

  const quickDonations = [
    { emoji: '🍽️', label: 'Hot Meal', coins: 50, impact: 'Feed 1 family' },
    { emoji: '💧', label: 'Clean Water', coins: 25, impact: 'Water for 1 day' },
    { emoji: '🏠', label: 'Shelter', coins: 100, impact: 'Safe night' },
    { emoji: '📚', label: 'Education', coins: 30, impact: 'School supplies' },
    { emoji: '💊', label: 'Medicine', coins: 75, impact: 'Medical aid' },
    { emoji: '🧸', label: 'Comfort', coins: 20, impact: 'Child care' }
  ];

  const handleQuickDonate = (donation) => {
    if (userCoins >= donation.coins) {
      setUserCoins(prev => prev - donation.coins);
      
      // Add to recent donations with animation effect
      const newDonation = {
        id: Date.now(),
        ...donation,
        timestamp: new Date()
      };
      
      setRecentDonations(prev => [newDonation, ...prev.slice(0, 4)]);
      
      // Remove after 5 seconds
      setTimeout(() => {
        setRecentDonations(prev => prev.filter(d => d.id !== newDonation.id));
      }, 5000);
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Video Container */}
      <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
        {/* Placeholder for video - would be YouTube embed in real implementation */}
        <div className="text-center text-white">
          <Play className="h-16 w-16 mx-auto mb-4 opacity-80" />
          <h3 className="text-xl font-semibold mb-2">Live: Emergency Relief for Gaza</h3>
          <p className="text-gray-300">Providing urgent aid to families in need</p>
        </div>

        {/* Live Badge */}
        <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600 text-white">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          LIVE
        </Badge>

        {/* Viewer Count */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
          <div className="flex items-center text-white text-sm">
            <Users className="h-4 w-4 mr-1" />
            1,247 viewers
          </div>
        </div>

        {/* User Coins Display */}
        <div className="absolute top-16 right-4 bg-gradient-to-r from-amber-500 to-yellow-500 backdrop-blur-sm rounded-lg px-3 py-1 shadow-lg">
          <div className="flex items-center text-white text-sm font-bold">
            <Sparkles className="h-4 w-4 mr-1 animate-pulse" />
            {userCoins} Sadaqah Coins
          </div>
        </div>

        {/* Quick Donation Buttons - Interactive Grid */}
        <div className="absolute top-20 left-4 right-4 grid grid-cols-3 gap-2 max-w-sm mx-auto">
          {quickDonations.map((donation, index) => (
            <button
              key={donation.label}
              onClick={() => handleQuickDonate(donation)}
              disabled={userCoins < donation.coins}
              className={`
                bg-white/90 backdrop-blur-sm rounded-xl p-3 border-2 border-white/20
                hover:bg-white hover:scale-105 active:scale-95
                transition-all duration-200 shadow-lg
                ${userCoins < donation.coins ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}
                group relative overflow-hidden
              `}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <div className="relative">
                <div className="text-2xl mb-1">{donation.emoji}</div>
                <div className="text-xs font-bold text-gray-800">{donation.coins} coins</div>
                <div className="text-[10px] text-gray-600">{donation.impact}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Recent Donations Feed - Animated */}
        <div className="absolute left-6 bottom-32 space-y-2">
          {recentDonations.map((donation) => (
            <div
              key={donation.id}
              className="bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 animate-slide-in-left shadow-lg"
            >
              <span className="text-lg">{donation.emoji}</span>
              <span>You helped with {donation.label}!</span>
              <Zap className="h-4 w-4 text-yellow-300 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Interactive Call to Action Overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 border border-emerald-200 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="font-bold text-emerald-800">Help Families Today</h4>
                  <div className="flex space-x-1">
                    <span className="animate-bounce">🎯</span>
                    <span className="animate-bounce delay-100">⚡</span>
                    <span className="animate-bounce delay-200">💫</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">Use your Sadaqah Coins - no real money spent!</p>
                <div className="flex items-center text-xs text-emerald-700 font-medium">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Every coin creates real impact + earns Jannah points
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-lg">
                  <Heart className="h-4 w-4 mr-2 animate-pulse" />
                  Get More Coins
                </Button>
                <div className="text-xs text-center text-gray-500">
                  {userCoins < 100 && "Low on coins? Watch ads or complete tasks!"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="p-4 bg-gray-50 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <div className="text-sm text-gray-600">
              <span className="font-medium text-emerald-700">1,450 coins</span> donated in last hour
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share & Earn 50 Coins
            </Button>
            <Button variant="outline" size="sm" className="relative">
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
  );
};

export default LiveVideo;

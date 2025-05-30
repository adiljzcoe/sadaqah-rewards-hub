
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Shield, Zap, Calendar, Target } from 'lucide-react';
import { getStreakData, type StreakData } from '@/utils/streakSystem';
import { useToast } from '@/hooks/use-toast';

const StreakWidget = () => {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    setStreakData(getStreakData());
  }, []);

  const handleStreakFreeze = () => {
    if (streakData && streakData.streakFreezeCount > 0) {
      const updated = { ...streakData, streakFreeze: true };
      localStorage.setItem('donationStreak', JSON.stringify(updated));
      setStreakData(updated);
      toast({
        title: "Streak Freeze Activated! 🛡️",
        description: "Your streak is protected for today!",
      });
    }
  };

  if (!streakData) return null;

  const isStreakAtRisk = () => {
    const lastDonation = new Date(streakData.lastDonationDate);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - lastDonation.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays >= 1 && streakData.currentStreak > 0;
  };

  const getStreakEmoji = (streak: number) => {
    if (streak >= 100) return '🔥👑';
    if (streak >= 30) return '🔥💎';
    if (streak >= 7) return '🔥⚡';
    if (streak >= 3) return '🔥';
    return '🎯';
  };

  return (
    <Card className="p-6 game-card relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold mb-2 flex items-center justify-center gap-2">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Donation Streak
            </span>
          </h3>
          
          {/* Current Streak Display */}
          <div className="relative inline-block">
            <div className={`text-6xl font-black mb-2 ${
              streakData.currentStreak > 0 ? 'text-orange-500 animate-pulse' : 'text-gray-400'
            }`}>
              {streakData.currentStreak}
            </div>
            <div className="text-4xl absolute -top-2 -right-6">
              {getStreakEmoji(streakData.currentStreak)}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 font-semibold">
            {streakData.currentStreak === 0 ? 'Start your streak today!' : 
             streakData.currentStreak === 1 ? 'Day streak!' : 'Days in a row!'}
          </p>
        </div>

        {/* Streak Status */}
        {isStreakAtRisk() && (
          <div className="bg-gradient-to-r from-red-100 to-orange-100 border-2 border-red-200 rounded-lg p-3 mb-4 text-center">
            <p className="text-red-700 font-bold text-sm mb-2">
              ⚠️ Your streak is at risk! Donate today to keep it alive!
            </p>
            {streakData.streakFreezeCount > 0 && !streakData.streakFreeze && (
              <Button 
                size="sm" 
                onClick={handleStreakFreeze}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                <Shield className="h-3 w-3 mr-1" />
                Use Streak Freeze ({streakData.streakFreezeCount} left)
              </Button>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-purple-600">{streakData.longestStreak}</div>
            <div className="text-xs text-gray-600 font-semibold">Longest Streak</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{streakData.streakFreezeCount}</div>
            <div className="text-xs text-gray-600 font-semibold">Freezes Left</div>
          </div>
        </div>

        {/* Motivational Messages */}
        <div className="text-center">
          {streakData.currentStreak === 0 && (
            <p className="text-sm text-gray-600">
              💡 Start your donation journey today!
            </p>
          )}
          {streakData.currentStreak >= 1 && streakData.currentStreak < 3 && (
            <p className="text-sm text-orange-700 font-semibold">
              🔥 Keep it going! You're building momentum!
            </p>
          )}
          {streakData.currentStreak >= 3 && streakData.currentStreak < 7 && (
            <p className="text-sm text-orange-700 font-semibold">
              ⚡ Amazing! You're on fire!
            </p>
          )}
          {streakData.currentStreak >= 7 && (
            <p className="text-sm text-orange-700 font-semibold">
              👑 Incredible dedication! You're a true philanthropist!
            </p>
          )}
        </div>
      </div>

      {/* Background Animation */}
      {streakData.currentStreak > 0 && (
        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 animate-pulse"></div>
      )}
    </Card>
  );
};

export default StreakWidget;

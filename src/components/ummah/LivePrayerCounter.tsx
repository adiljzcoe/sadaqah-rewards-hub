
import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingHeart {
  id: string;
  x: number;
  startTime: number;
}

const LivePrayerCounter = () => {
  const [prayingNow, setPrayingNow] = useState(1834567890);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Update counter every few seconds to show it's "live"
    const counterInterval = setInterval(() => {
      setPrayingNow(prev => prev + Math.floor(Math.random() * 10000) - 5000);
    }, 3000);

    // Create floating hearts
    const heartInterval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * 100,
        startTime: Date.now()
      };
      
      setHearts(prev => [...prev.slice(-20), newHeart]);
    }, 500);

    return () => {
      clearInterval(counterInterval);
      clearInterval(heartInterval);
    };
  }, []);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setHearts(prev => prev.filter(heart => now - heart.startTime < 4000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <div className="relative">
      {/* Floating Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {hearts.map(heart => {
          const elapsed = Date.now() - heart.startTime;
          const progress = elapsed / 4000;
          const y = progress * 100;
          const opacity = Math.max(0, 1 - progress);

          return (
            <div
              key={heart.id}
              className="absolute"
              style={{
                left: `${heart.x}%`,
                bottom: `${y}%`,
                opacity: opacity,
                transform: 'translateX(-50%)'
              }}
            >
              <Heart className="h-4 w-4 text-green-500 animate-pulse" fill="currentColor" />
            </div>
          );
        })}
      </div>

      {/* Main Counter Card */}
      <Card className="bg-gradient-to-br from-green-600 to-emerald-700 text-white border-0 shadow-2xl">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Globe className="h-8 w-8 animate-pulse" />
              <span className="text-xl font-semibold">Praying Right Now</span>
            </div>
            
            <div className="relative">
              <div className="text-5xl font-bold tracking-wider animate-pulse">
                {formatNumber(prayingNow)}
              </div>
              <div className="text-green-200 text-sm mt-2">
                Muslims united in prayer worldwide
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-green-100">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>1.8B+ Community</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4 animate-pulse" fill="currentColor" />
                <span>Live Updates</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivePrayerCounter;

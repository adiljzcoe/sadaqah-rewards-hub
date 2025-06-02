
import React, { useState, useEffect } from 'react';
import { Heart, Users, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FloatingHeart {
  id: string;
  x: number;
  startTime: number;
}

const LivePrayerCounter = () => {
  const [prayingNow, setPrayingNow] = useState(0);
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  // Calculate realistic prayer numbers based on time zones
  const calculateRealisticPrayerCount = () => {
    const now = new Date();
    const hour = now.getUTCHours();
    const minute = now.getUTCMinutes();
    
    // Peak prayer times globally (considering 5 daily prayers across 24 time zones)
    // Each prayer lasts about 10-15 minutes, with overlap across time zones
    const prayerWindows = [
      { start: 4, end: 6, intensity: 0.8 },   // Fajr
      { start: 11, end: 14, intensity: 0.9 }, // Dhuhr  
      { start: 15, end: 17, intensity: 0.7 }, // Asr
      { start: 18, end: 20, intensity: 0.9 }, // Maghrib
      { start: 20, end: 22, intensity: 0.8 }  // Isha
    ];
    
    let currentIntensity = 0.1; // Base level of people always praying
    
    prayerWindows.forEach(window => {
      if (hour >= window.start && hour <= window.end) {
        currentIntensity = Math.max(currentIntensity, window.intensity);
      }
    });
    
    // Add some randomness for natural variation
    const variation = 0.8 + (Math.random() * 0.4); // ±20% variation
    
    // Base Muslim population: ~1.8B, but realistic simultaneous prayers: 5-25% depending on time
    const maxSimultaneous = Math.floor(1800000000 * currentIntensity * variation * 0.15); // 15% max at peak
    
    return Math.max(50000000, maxSimultaneous); // Minimum 50M, realistic range 50M-400M
  };

  useEffect(() => {
    // Set initial realistic count
    setPrayingNow(calculateRealisticPrayerCount());
    
    // Update counter more frequently for realism
    const counterInterval = setInterval(() => {
      const newCount = calculateRealisticPrayerCount();
      const variation = Math.floor((Math.random() - 0.5) * newCount * 0.02); // ±2% natural variation
      setPrayingNow(newCount + variation);
    }, 8000); // Update every 8 seconds

    // Create floating hearts
    const heartInterval = setInterval(() => {
      const newHeart: FloatingHeart = {
        id: Date.now().toString() + Math.random(),
        x: Math.random() * 100,
        startTime: Date.now()
      };
      
      setHearts(prev => [...prev.slice(-15), newHeart]);
    }, 800);

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
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(0) + 'M';
    }
    return new Intl.NumberFormat().format(num);
  };

  const getPrayerTimeMessage = () => {
    const hour = new Date().getUTCHours();
    
    if (hour >= 4 && hour <= 6) return "Fajr prayers across the globe";
    if (hour >= 11 && hour <= 14) return "Dhuhr prayers in progress";
    if (hour >= 15 && hour <= 17) return "Asr prayers beginning";
    if (hour >= 18 && hour <= 20) return "Maghrib prayers at sunset";
    if (hour >= 20 && hour <= 22) return "Isha prayers under starlight";
    
    return "Continuous prayers and dhikr worldwide";
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
                {getPrayerTimeMessage()}
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-green-100">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Global Ummah</span>
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


import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, Coins, Book, Clock, MapPin, CheckCircle, Sparkles, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const JannahTab = () => {
  const [location, setLocation] = useState<string>('');
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [prayerMarked, setPrayerMarked] = useState(false);
  const [showPrayerEffect, setShowPrayerEffect] = useState(false);
  const { user } = useAuth();

  // Mock user data - in real app, this would come from user profile API
  const userStats = {
    jannahPoints: 2847,
    sadaqahCoins: 1234,
    league: 'Gold',
    leagueIcon: '🥇',
    rank: 142
  };

  const services = [
    { 
      id: 'quran', 
      name: 'Quran Reader', 
      icon: Book, 
      link: '/quran-reader',
      gradient: 'from-green-500 to-emerald-600'
    },
    { 
      id: 'prayer', 
      name: 'Prayer Times', 
      icon: Clock, 
      link: '/namaz-times',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      id: 'dhikr', 
      name: 'Dhikr Counter', 
      icon: Star, 
      link: '/dhikr-community',
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  useEffect(() => {
    // Get user's location and prayer times
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Mock location - in real app, you'd use reverse geocoding
          setLocation('London, UK');
          
          // Mock prayer time calculation - in real app, you'd use prayer times API
          const now = new Date();
          const hour = now.getHours();
          
          if (hour < 6) {
            setCurrentPrayer('Fajr');
            setNextPrayer('Dhuhr');
          } else if (hour < 13) {
            setCurrentPrayer('Dhuhr');
            setNextPrayer('Asr');
          } else if (hour < 16) {
            setCurrentPrayer('Asr');
            setNextPrayer('Maghrib');
          } else if (hour < 19) {
            setCurrentPrayer('Maghrib');
            setNextPrayer('Isha');
          } else {
            setCurrentPrayer('Isha');
            setNextPrayer('Fajr');
          }
        },
        (error) => {
          console.log('Location access denied');
          setLocation('Location unavailable');
        }
      );
    }
  }, []);

  const handleMarkPrayer = () => {
    setPrayerMarked(true);
    setShowPrayerEffect(true);
    setTimeout(() => {
      setShowPrayerEffect(false);
      setPrayerMarked(false);
    }, 3000);
    console.log('Marking prayer as completed:', currentPrayer);
    // Here you would call the API to record the prayer and award points
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gradient-to-b from-slate-800/20 to-yellow-900/20 text-white relative overflow-hidden">
      {/* Prayer completion effect */}
      {showPrayerEffect && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 1}s`
              }}
            >
              <Star className="h-5 w-5 text-yellow-300" />
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold animate-bounce-in shadow-xl">
              <Sparkles className="inline h-5 w-5 mr-2" />
              Prayer Marked! +10 Jannah Points!
            </div>
          </div>
        </div>
      )}

      {/* User stats with enhanced design */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4 text-center mb-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-violet-600/20 rounded-xl p-4 border border-purple-400/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-violet-300 bg-clip-text text-transparent animate-number-pop">
              {userStats.jannahPoints.toLocaleString()}
            </div>
            <div className="text-purple-200/80 text-xs flex items-center justify-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Jannah Points
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl p-4 border border-yellow-400/30">
            <div className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              {userStats.sadaqahCoins.toLocaleString()}
            </div>
            <div className="text-yellow-200/80 text-xs flex items-center justify-center">
              <Coins className="h-3 w-3 mr-1" />
              Sadaqah Coins
            </div>
          </div>
        </div>
        <div className="text-center">
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-sm px-4 py-2">
            <Crown className="h-4 w-4 mr-1" />
            {userStats.leagueIcon} {userStats.league} League #{userStats.rank}
          </Badge>
        </div>
      </div>

      {/* Prayer tracking with location */}
      {location && (
        <Card className="p-4 mb-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-blue-300" />
              <span className="text-sm text-blue-200 font-medium">{location}</span>
            </div>
            <Clock className="h-4 w-4 text-blue-300" />
          </div>
          <div className="mb-3">
            <div className="text-sm font-medium text-white mb-1">Current Prayer: {currentPrayer}</div>
            <div className="text-xs text-blue-200/80">Next: {nextPrayer}</div>
          </div>
          <Button
            onClick={handleMarkPrayer}
            disabled={prayerMarked}
            className="w-full h-10 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {prayerMarked ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Marked! (+10 pts)
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Mark as Prayed
              </>
            )}
          </Button>
        </Card>
      )}

      {/* Quick access services */}
      <div className="flex-1">
        <div className="text-sm font-medium mb-4 text-white/80 flex items-center">
          <Star className="h-4 w-4 mr-2" />
          Quick Access
        </div>
        <div className="grid grid-cols-1 gap-3">
          {services.map((service) => (
            <Button
              key={service.id}
              variant="outline"
              className={`justify-start h-12 bg-gradient-to-r ${service.gradient}/20 border-white/20 text-white hover:border-white/40 hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105`}
              onClick={() => window.location.href = service.link}
            >
              <service.icon className="h-4 w-4 mr-3" />
              <span className="font-medium">{service.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JannahTab;

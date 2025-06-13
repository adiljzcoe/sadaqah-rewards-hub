
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Star, Coins, Book, Clock, MapPin, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const JannahTab = () => {
  const [location, setLocation] = useState<string>('');
  const [currentPrayer, setCurrentPrayer] = useState<string>('');
  const [nextPrayer, setNextPrayer] = useState<string>('');
  const [prayerMarked, setPrayerMarked] = useState(false);
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
    { id: 'quran', name: 'Quran Reader', icon: Book, link: '/quran-reader' },
    { id: 'prayer', name: 'Prayer Times', icon: Clock, link: '/namaz-times' },
    { id: 'dhikr', name: 'Dhikr Counter', icon: Star, link: '/dhikr-community' }
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
    console.log('Marking prayer as completed:', currentPrayer);
    // Here you would call the API to record the prayer and award points
    setTimeout(() => setPrayerMarked(false), 2000);
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-purple-600">{userStats.jannahPoints}</div>
            <div className="text-xs text-gray-500">Jannah Points</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">{userStats.sadaqahCoins}</div>
            <div className="text-xs text-gray-500">Sadaqah Coins</div>
          </div>
        </div>
        <div className="text-center mt-2">
          <Badge className="text-xs">{userStats.leagueIcon} {userStats.league} League #{userStats.rank}</Badge>
        </div>
      </div>

      {location && (
        <Card className="p-2 mb-3 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3 text-blue-600" />
              <span className="text-xs text-blue-700">{location}</span>
            </div>
          </div>
          <div className="mt-1">
            <div className="text-xs font-medium">Current: {currentPrayer}</div>
            <Button
              onClick={handleMarkPrayer}
              disabled={prayerMarked}
              size="sm"
              className="w-full mt-1 h-6 text-xs"
            >
              {prayerMarked ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Marked! (+10 pts)
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 mr-1" />
                  Mark as Prayed
                </>
              )}
            </Button>
          </div>
        </Card>
      )}

      <div className="flex-1">
        <div className="text-xs font-medium mb-2">Quick Access</div>
        <div className="grid grid-cols-1 gap-1">
          {services.map((service) => (
            <Button
              key={service.id}
              variant="outline"
              size="sm"
              className="justify-start h-8 text-xs"
              onClick={() => window.location.href = service.link}
            >
              <service.icon className="h-3 w-3 mr-2" />
              {service.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JannahTab;

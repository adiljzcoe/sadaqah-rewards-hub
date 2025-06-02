
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Volume2, VolumeX, Globe, Heart } from 'lucide-react';
import PrayerWaveAnimation from './PrayerWaveAnimation';
import LivePrayerCounter from './LivePrayerCounter';
import PrayerParticleSystem from './PrayerParticleSystem';

interface PrayerLocation {
  id: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  timezone: string;
  population: number; // Muslim population in millions
}

interface RegionalPrayer {
  region: string;
  prayer: string;
  count: number;
  cities: string[];
}

const WorldPrayerVisualization = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [regionalPrayers, setRegionalPrayers] = useState<RegionalPrayer[]>([]);
  const [activeLocations, setActiveLocations] = useState<string[]>([]);

  const prayerLocations: PrayerLocation[] = [
    { id: 'mecca', city: 'Mecca', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, timezone: 'Asia/Riyadh', population: 2 },
    { id: 'medina', city: 'Medina', country: 'Saudi Arabia', lat: 24.4683, lng: 39.6142, timezone: 'Asia/Riyadh', population: 1.5 },
    { id: 'istanbul', city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, timezone: 'Europe/Istanbul', population: 12 },
    { id: 'cairo', city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, timezone: 'Africa/Cairo', population: 18 },
    { id: 'jakarta', city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, timezone: 'Asia/Jakarta', population: 25 },
    { id: 'karachi', city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, timezone: 'Asia/Karachi', population: 20 },
    { id: 'dhaka', city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, timezone: 'Asia/Dhaka', population: 15 },
    { id: 'casablanca', city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, timezone: 'Africa/Casablanca', population: 8 },
    { id: 'london', city: 'London', country: 'UK', lat: 51.5074, lng: -0.1278, timezone: 'Europe/London', population: 1.5 },
    { id: 'newyork', city: 'New York', country: 'USA', lat: 40.7128, lng: -74.0060, timezone: 'America/New_York', population: 2 },
    { id: 'kualalumpur', city: 'Kuala Lumpur', country: 'Malaysia', lat: 3.1390, lng: 101.6869, timezone: 'Asia/Kuala_Lumpur', population: 5 },
    { id: 'lagos', city: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, timezone: 'Africa/Lagos', population: 12 },
  ];

  // Calculate which prayer is happening at each location
  const getCurrentPrayerForLocation = (timezone: string) => {
    try {
      const now = new Date();
      const localTime = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).format(now);
      
      const [hour, minute] = localTime.split(':').map(Number);
      const currentMinutes = hour * 60 + minute;

      // Simplified prayer times (in reality these would be calculated based on sun position)
      const prayerTimes = {
        fajr: { start: 5 * 60, end: 6 * 60 + 30, name: 'Fajr' },
        dhuhr: { start: 12 * 60, end: 14 * 60, name: 'Dhuhr' },
        asr: { start: 15 * 60, end: 17 * 60, name: 'Asr' },
        maghrib: { start: 18 * 60, end: 19 * 60 + 30, name: 'Maghrib' },
        isha: { start: 20 * 60, end: 21 * 60 + 30, name: 'Isha' }
      };

      for (const [key, prayer] of Object.entries(prayerTimes)) {
        if (currentMinutes >= prayer.start && currentMinutes <= prayer.end) {
          return prayer.name;
        }
      }
      return null;
    } catch (error) {
      return null;
    }
  };

  const updatePrayerData = () => {
    const activePrayers: RegionalPrayer[] = [];
    const activeLocationIds: string[] = [];
    
    // Group by prayer type
    const prayerGroups: { [key: string]: { cities: string[], totalPopulation: number } } = {};

    prayerLocations.forEach(location => {
      const currentPrayer = getCurrentPrayerForLocation(location.timezone);
      if (currentPrayer) {
        activeLocationIds.push(location.id);
        
        if (!prayerGroups[currentPrayer]) {
          prayerGroups[currentPrayer] = { cities: [], totalPopulation: 0 };
        }
        
        prayerGroups[currentPrayer].cities.push(`${location.city}, ${location.country}`);
        prayerGroups[currentPrayer].totalPopulation += location.population;
      }
    });

    // Convert to regional prayers array
    Object.entries(prayerGroups).forEach(([prayer, data]) => {
      activePrayers.push({
        region: data.cities.length > 1 ? 'Multiple Regions' : data.cities[0].split(',')[1].trim(),
        prayer,
        count: Math.floor(data.totalPopulation * 1000000), // Convert to actual population
        cities: data.cities
      });
    });

    setRegionalPrayers(activePrayers);
    setActiveLocations(activeLocationIds);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      updatePrayerData();
    }, 30000); // Update every 30 seconds

    // Initial update
    updatePrayerData();

    return () => clearInterval(timer);
  }, []);

  const playAdhanSound = () => {
    if (audioEnabled) {
      // Gentle chime sound effect
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
      
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
    }
  };

  useEffect(() => {
    if (activeLocations.length > 0) {
      playAdhanSound();
    }
  }, [activeLocations]);

  const formatPrayerCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(0) + 'K';
    }
    return count.toString();
  };

  const getPrayerEmoji = (prayer: string) => {
    switch (prayer.toLowerCase()) {
      case 'fajr': return '🌅';
      case 'dhuhr': return '☀️';
      case 'asr': return '🌤️';
      case 'maghrib': return '🌅';
      case 'isha': return '🌙';
      default: return '🕌';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-gray-900 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
          Global Prayer Network
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Experience the breathtaking unity of our Ummah as prayer ripples across the globe, 
          connecting hearts from every corner of the Earth in perfect harmony.
        </p>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="bg-blue-50 border-blue-200">
            <Clock className="h-3 w-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setAudioEnabled(!audioEnabled)}
            className={audioEnabled ? 'bg-green-50 border-green-200' : ''}
          >
            {audioEnabled ? (
              <>
                <Volume2 className="h-4 w-4 mr-2" />
                Audio On
              </>
            ) : (
              <>
                <VolumeX className="h-4 w-4 mr-2" />
                Audio Off
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Live Prayer Counter */}
      <LivePrayerCounter />

      {/* Real-time Prayer Breakdown */}
      {regionalPrayers.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 border-2 border-green-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Globe className="h-6 w-6 text-green-600 animate-pulse" />
              Live Prayer Times Around the World
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalPrayers.map((prayer, index) => (
                <div key={index} className="bg-white rounded-lg border border-green-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getPrayerEmoji(prayer.prayer)}</span>
                      <span className="font-bold text-lg text-gray-900">{prayer.prayer}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {formatPrayerCount(prayer.count)} praying
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p className="font-medium mb-1">Active in:</p>
                    <ul className="space-y-1">
                      {prayer.cities.slice(0, 3).map((city, cityIndex) => (
                        <li key={cityIndex} className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          {city}
                        </li>
                      ))}
                      {prayer.cities.length > 3 && (
                        <li className="text-green-600 font-medium">
                          +{prayer.cities.length - 3} more regions
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Visualization */}
      <Card className="overflow-hidden relative min-h-[400px] bg-gradient-to-br from-slate-900 via-blue-900 to-green-900">
        <CardContent className="p-0 relative h-[400px]">
          {/* Background World Map Effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-green-500/10 to-blue-500/10" />
          </div>

          {/* Prayer Wave Animation */}
          <PrayerWaveAnimation />
          
          {/* Particle System */}
          <PrayerParticleSystem />

          {/* Prayer Location Markers */}
          <div className="absolute inset-0">
            {prayerLocations.map((location) => {
              const x = ((location.lng + 180) / 360) * 100;
              const y = ((90 - location.lat) / 180) * 100;
              const isActive = activeLocations.includes(location.id);
              const currentPrayer = getCurrentPrayerForLocation(location.timezone);
              
              return (
                <div key={location.id} className="absolute">
                  {/* Active Prayer Glow */}
                  {isActive && (
                    <>
                      <div
                        className="absolute animate-ping rounded-full bg-green-400 opacity-75"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: '60px',
                          height: '60px',
                          transform: 'translate(-50%, -50%)',
                          animationDuration: '2s'
                        }}
                      />
                      <div
                        className="absolute animate-ping rounded-full bg-green-300 opacity-50"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: '80px',
                          height: '80px',
                          transform: 'translate(-50%, -50%)',
                          animationDuration: '2s',
                          animationDelay: '0.5s'
                        }}
                      />
                    </>
                  )}
                  
                  {/* Location Marker */}
                  <div
                    className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-1000 z-20 ${
                      isActive ? 'bg-green-400 scale-150 shadow-green-400/50' : 'bg-blue-400'
                    }`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  
                  {/* Prayer Label for Active Prayers */}
                  {isActive && currentPrayer && (
                    <div
                      className="absolute bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap animate-fade-in shadow-xl z-30"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -140%)',
                      }}
                    >
                      {getPrayerEmoji(currentPrayer)} {currentPrayer} - {location.city}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Central Unity Message */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white space-y-2 bg-black/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 text-xl font-semibold">
                <Heart className="h-6 w-6 text-green-400 animate-pulse" fill="currentColor" />
                <span>One Ummah, One Heart</span>
                <Heart className="h-6 w-6 text-green-400 animate-pulse" fill="currentColor" />
              </div>
              <p className="text-green-200 text-sm">
                United in prayer across time and space
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorldPrayerVisualization;

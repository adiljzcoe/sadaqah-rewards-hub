
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
  isActive: boolean;
}

const WorldPrayerVisualization = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [activeLocations, setActiveLocations] = useState<string[]>([]);

  const prayerLocations: PrayerLocation[] = [
    { id: 'mecca', city: 'Mecca', country: 'Saudi Arabia', lat: 21.4225, lng: 39.8262, isActive: false },
    { id: 'medina', city: 'Medina', country: 'Saudi Arabia', lat: 24.4683, lng: 39.6142, isActive: false },
    { id: 'istanbul', city: 'Istanbul', country: 'Turkey', lat: 41.0082, lng: 28.9784, isActive: false },
    { id: 'cairo', city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, isActive: false },
    { id: 'jakarta', city: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, isActive: false },
    { id: 'karachi', city: 'Karachi', country: 'Pakistan', lat: 24.8607, lng: 67.0011, isActive: false },
    { id: 'dhaka', city: 'Dhaka', country: 'Bangladesh', lat: 23.8103, lng: 90.4125, isActive: false },
    { id: 'casablanca', city: 'Casablanca', country: 'Morocco', lat: 33.5731, lng: -7.5898, isActive: false },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate active prayers
      const activeIds: string[] = [];
      prayerLocations.forEach(location => {
        if (Math.random() < 0.3) activeIds.push(location.id);
      });
      setActiveLocations(activeIds);
    }, 4000);

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
                  
                  {/* City Label for Active Prayers */}
                  {isActive && (
                    <div
                      className="absolute bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap animate-fade-in shadow-xl z-30"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -140%)',
                      }}
                    >
                      🕌 {location.city} - Adhan Now
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

      {/* Currently Active Prayers */}
      {activeLocations.length > 0 && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600 animate-pulse" />
              Prayer in Progress - Join in Spirit
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeLocations.map(locationId => {
                const location = prayerLocations.find(l => l.id === locationId);
                if (!location) return null;
                
                return (
                  <div key={locationId} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-100 shadow-sm">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <div className="font-medium text-gray-900">{location.city}</div>
                      <div className="text-sm text-gray-600">{location.country}</div>
                    </div>
                    <Heart className="h-4 w-4 text-green-500 ml-auto animate-pulse" fill="currentColor" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorldPrayerVisualization;

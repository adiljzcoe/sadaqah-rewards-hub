
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Globe } from 'lucide-react';

interface PrayerLocation {
  id: string;
  city: string;
  country: string;
  timezone: string;
  lat: number;
  lng: number;
  currentPrayer?: string;
  nextPrayer?: string;
  nextPrayerTime?: string;
  isAdhanActive?: boolean;
}

const WorldAdhanMap = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeLocations, setActiveLocations] = useState<string[]>([]);

  // Major Islamic cities around the world with their coordinates
  const prayerLocations: PrayerLocation[] = [
    { id: 'mecca', city: 'Mecca', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', lat: 21.4225, lng: 39.8262 },
    { id: 'medina', city: 'Medina', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', lat: 24.4683, lng: 39.6142 },
    { id: 'istanbul', city: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', lat: 41.0082, lng: 28.9784 },
    { id: 'cairo', city: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', lat: 30.0444, lng: 31.2357 },
    { id: 'jakarta', city: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', lat: -6.2088, lng: 106.8456 },
    { id: 'karachi', city: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', lat: 24.8607, lng: 67.0011 },
    { id: 'dhaka', city: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', lat: 23.8103, lng: 90.4125 },
    { id: 'casablanca', city: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', lat: 33.5731, lng: -7.5898 },
    { id: 'tehran', city: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran', lat: 35.6892, lng: 51.3890 },
    { id: 'kuala_lumpur', city: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', lat: 3.1390, lng: 101.6869 },
    { id: 'london', city: 'London', country: 'UK', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278 },
    { id: 'new_york', city: 'New York', country: 'USA', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060 },
    { id: 'moscow', city: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', lat: 55.7558, lng: 37.6176 },
    { id: 'lagos', city: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', lat: 6.5244, lng: 3.3792 },
    { id: 'sydney', city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093 }
  ];

  // Mock prayer times - in a real app, this would come from an Islamic prayer times API
  const getPrayerTimes = (timezone: string) => {
    const now = new Date();
    return {
      fajr: '05:30',
      dhuhr: '12:15',
      asr: '15:45',
      maghrib: '18:30',
      isha: '20:00'
    };
  };

  // Convert coordinates to map position (simplified projection)
  const getMapPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  // Check if Adhan is currently active (simulate with random timing for demo)
  const checkAdhanActive = () => {
    const activeIds: string[] = [];
    prayerLocations.forEach(location => {
      // Simulate prayer times based on current time and location
      const shouldBeActive = Math.random() < 0.15; // 15% chance any location is active
      if (shouldBeActive) {
        activeIds.push(location.id);
      }
    });
    setActiveLocations(activeIds);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      checkAdhanActive();
    }, 5000); // Update every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Global Adhan Map</h2>
        <p className="text-gray-600">Watch the call to prayer ripple across the world in real-time</p>
        <Badge variant="outline" className="mt-2">
          <Clock className="h-3 w-3 mr-1" />
          {currentTime.toLocaleTimeString()}
        </Badge>
      </div>

      {/* World Map */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-96 lg:h-[500px] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
            {/* Starry background effect */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 50 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`
                  }}
                />
              ))}
            </div>

            {/* Continents silhouettes (simplified shapes) */}
            <div className="absolute inset-0 opacity-20">
              {/* Africa */}
              <div 
                className="absolute bg-green-400 rounded-lg opacity-40"
                style={{ left: '48%', top: '35%', width: '8%', height: '25%' }}
              />
              {/* Asia */}
              <div 
                className="absolute bg-green-400 rounded-lg opacity-40"
                style={{ left: '60%', top: '20%', width: '25%', height: '30%' }}
              />
              {/* Europe */}
              <div 
                className="absolute bg-green-400 rounded-lg opacity-40"
                style={{ left: '50%', top: '20%', width: '8%', height: '12%' }}
              />
              {/* North America */}
              <div 
                className="absolute bg-green-400 rounded-lg opacity-40"
                style={{ left: '15%', top: '15%', width: '20%', height: '25%' }}
              />
              {/* Australia */}
              <div 
                className="absolute bg-green-400 rounded-lg opacity-40"
                style={{ left: '75%', top: '65%', width: '8%', height: '8%' }}
              />
            </div>

            {/* Prayer Location Markers */}
            {prayerLocations.map((location) => {
              const position = getMapPosition(location.lat, location.lng);
              const isActive = activeLocations.includes(location.id);
              
              return (
                <div key={location.id} className="absolute">
                  {/* Ripple effect for active locations */}
                  {isActive && (
                    <>
                      <div
                        className="absolute animate-ping rounded-full bg-green-400 opacity-75"
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          width: '40px',
                          height: '40px',
                          transform: 'translate(-50%, -50%)',
                          animationDuration: '3s'
                        }}
                      />
                      <div
                        className="absolute animate-ping rounded-full bg-green-300 opacity-50"
                        style={{
                          left: `${position.x}%`,
                          top: `${position.y}%`,
                          width: '60px',
                          height: '60px',
                          transform: 'translate(-50%, -50%)',
                          animationDuration: '3s',
                          animationDelay: '0.5s'
                        }}
                      />
                    </>
                  )}
                  
                  {/* Location marker */}
                  <div
                    className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all duration-1000 ${
                      isActive ? 'bg-green-500 scale-150 shadow-green-500/50' : 'bg-blue-400'
                    }`}
                    style={{
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                  
                  {/* City label for active locations */}
                  {isActive && (
                    <div
                      className="absolute bg-green-600 text-white px-2 py-1 rounded text-xs font-medium whitespace-nowrap animate-fade-in"
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: 'translate(-50%, -120%)',
                      }}
                    >
                      🕌 {location.city}
                      <div className="text-green-200 text-xs">Adhan Now</div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Day/Night overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/10 to-transparent opacity-30" />
          </div>
        </CardContent>
      </Card>

      {/* Active Prayers List */}
      {activeLocations.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              Currently Calling to Prayer
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {activeLocations.map(locationId => {
                const location = prayerLocations.find(l => l.id === locationId);
                if (!location) return null;
                
                return (
                  <div key={locationId} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <div>
                      <div className="font-medium text-gray-900">{location.city}</div>
                      <div className="text-sm text-gray-600">{location.country}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Map Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-400 rounded-full border-2 border-white" />
              <span className="text-sm text-gray-600">Prayer locations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
              <span className="text-sm text-gray-600">Adhan in progress</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-green-400 opacity-30 animate-ping" />
              <span className="text-sm text-gray-600">Prayer ripple effect</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorldAdhanMap;

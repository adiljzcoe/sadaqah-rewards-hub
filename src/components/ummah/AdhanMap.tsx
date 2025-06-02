
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Phone, Globe, ExternalLink } from 'lucide-react';

interface Mosque {
  id: string;
  name: string;
  address: string;
  distance: number;
  nextPrayer: string;
  nextPrayerTime: string;
  phone?: string;
  website?: string;
  denomination: string;
  lat: number;
  lng: number;
  facilities: string[];
}

interface AdhanMapProps {
  userLocation: { lat: number; lng: number } | null;
}

const AdhanMap = ({ userLocation }: AdhanMapProps) => {
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null);
  const [mosques, setMosques] = useState<Mosque[]>([]);

  // Mock mosque data - in a real app, this would come from an API
  useEffect(() => {
    if (userLocation) {
      const mockMosques: Mosque[] = [
        {
          id: '1',
          name: 'Central Islamic Center',
          address: '123 Main Street, Downtown',
          distance: 0.3,
          nextPrayer: 'Maghrib',
          nextPrayerTime: '18:45',
          phone: '+1 (555) 123-4567',
          website: 'www.centralislamic.org',
          denomination: 'Sunni',
          lat: userLocation.lat + 0.002,
          lng: userLocation.lng + 0.002,
          facilities: ['Parking', 'Wudu Area', 'Women Section', 'Library']
        },
        {
          id: '2',
          name: 'Masjid Al-Noor',
          address: '456 Oak Avenue, North District',
          distance: 0.7,
          nextPrayer: 'Isha',
          nextPrayerTime: '20:00',
          phone: '+1 (555) 987-6543',
          denomination: 'Sunni',
          lat: userLocation.lat - 0.005,
          lng: userLocation.lng + 0.003,
          facilities: ['Parking', 'School', 'Community Hall', 'Halal Shop']
        },
        {
          id: '3',
          name: 'Islamic Community Mosque',
          address: '789 Pine Street, East Side',
          distance: 1.2,
          nextPrayer: 'Fajr',
          nextPrayerTime: '05:30',
          denomination: 'Multi-denominational',
          lat: userLocation.lat + 0.008,
          lng: userLocation.lng - 0.004,
          facilities: ['Parking', 'Youth Center', 'Gym', 'Cafeteria']
        }
      ];
      setMosques(mockMosques);
    }
  }, [userLocation]);

  const getDirections = (mosque: Mosque) => {
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${mosque.lat},${mosque.lng}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
  };

  if (!userLocation) {
    return (
      <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Location Required</h3>
          <p className="text-gray-500">Please enable location access to view nearby mosques</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Mock Map Visualization */}
      <div className="h-96 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden border">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* User Location */}
        <div 
          className="absolute w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg transform -translate-x-2 -translate-y-2"
          style={{ 
            left: '50%', 
            top: '50%',
          }}
        >
          <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* User Location Label */}
        <div className="absolute bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium" style={{ left: '52%', top: '48%' }}>
          You are here
        </div>

        {/* Mosque Markers */}
        {mosques.map((mosque, index) => {
          const offsetX = (index - 1) * 15;
          const offsetY = (index - 1) * 20;
          return (
            <div key={mosque.id}>
              <button
                onClick={() => setSelectedMosque(mosque)}
                className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transform -translate-x-3 -translate-y-3 transition-all hover:scale-110 ${
                  selectedMosque?.id === mosque.id ? 'bg-green-600 scale-110' : 'bg-green-500'
                }`}
                style={{ 
                  left: `${50 + offsetX}%`, 
                  top: `${50 + offsetY}%`,
                }}
              >
                <MapPin className="h-4 w-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </button>
              
              {selectedMosque?.id === mosque.id && (
                <div 
                  className="absolute bg-white rounded-lg shadow-xl p-3 min-w-64 z-10"
                  style={{ 
                    left: `${50 + offsetX + 5}%`, 
                    top: `${50 + offsetY - 10}%`,
                  }}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{mosque.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{mosque.address}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {mosque.distance} mi
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mosque.denomination}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <Clock className="h-3 w-3" />
                    Next: {mosque.nextPrayer} at {mosque.nextPrayerTime}
                  </div>
                  <Button
                    size="sm"
                    onClick={() => getDirections(mosque)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Navigation className="h-3 w-3 mr-1" />
                    Get Directions
                  </Button>
                </div>
              )}
            </div>
          );
        })}

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Your Location</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Mosques</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Prayer Times
        </Button>
        <Button size="sm" variant="outline">
          <Navigation className="h-4 w-4 mr-2" />
          Qibla Direction
        </Button>
        <Button size="sm" variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in Maps
        </Button>
      </div>
    </div>
  );
};

export default AdhanMap;

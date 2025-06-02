
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, Phone, Globe, Users, Star } from 'lucide-react';

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
  facilities: string[];
  rating: number;
  congregation: number;
}

interface MosqueListProps {
  userLocation: { lat: number; lng: number } | null;
}

const MosqueList = ({ userLocation }: MosqueListProps) => {
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userLocation) {
      // Mock data - in a real app, this would be an API call
      setTimeout(() => {
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
            facilities: ['Parking', 'Wudu Area', 'Women Section', 'Library'],
            rating: 4.8,
            congregation: 250
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
            facilities: ['Parking', 'School', 'Community Hall', 'Halal Shop'],
            rating: 4.6,
            congregation: 180
          },
          {
            id: '3',
            name: 'Islamic Community Mosque',
            address: '789 Pine Street, East Side',
            distance: 1.2,
            nextPrayer: 'Fajr',
            nextPrayerTime: '05:30',
            denomination: 'Multi-denominational',
            facilities: ['Parking', 'Youth Center', 'Gym', 'Cafeteria'],
            rating: 4.7,
            congregation: 320
          },
          {
            id: '4',
            name: 'Masjid Ar-Rahman',
            address: '321 Elm Street, West End',
            distance: 1.8,
            nextPrayer: 'Maghrib',
            nextPrayerTime: '18:45',
            phone: '+1 (555) 456-7890',
            website: 'www.arrahman.org',
            denomination: 'Sunni',
            facilities: ['Parking', 'Madrasah', 'Women Section'],
            rating: 4.5,
            congregation: 140
          }
        ];
        setMosques(mockMosques);
        setLoading(false);
      }, 1000);
    }
  }, [userLocation]);

  const getDirections = (mosque: Mosque) => {
    const googleMapsUrl = `https://maps.google.com/maps/dir/?api=1&destination=${mosque.address}&travelmode=driving`;
    window.open(googleMapsUrl, '_blank');
  };

  const callMosque = (phone: string) => {
    window.open(`tel:${phone}`, '_self');
  };

  const visitWebsite = (website: string) => {
    const url = website.startsWith('http') ? website : `https://${website}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Nearby Mosques
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Nearby Mosques ({mosques.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mosques.map((mosque) => (
            <Card key={mosque.id} className="border border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Header */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{mosque.name}</h4>
                    <p className="text-sm text-gray-600">{mosque.address}</p>
                  </div>

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      {mosque.distance} mi
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {mosque.denomination}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-gray-600">{mosque.rating}</span>
                    </div>
                  </div>

                  {/* Next Prayer */}
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">
                      Next: <span className="font-medium text-green-600">{mosque.nextPrayer}</span> at {mosque.nextPrayerTime}
                    </span>
                  </div>

                  {/* Congregation Size */}
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-600">~{mosque.congregation} congregants</span>
                  </div>

                  {/* Facilities */}
                  <div className="flex flex-wrap gap-1">
                    {mosque.facilities.slice(0, 3).map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                    {mosque.facilities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{mosque.facilities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      onClick={() => getDirections(mosque)}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Navigation className="h-3 w-3 mr-1" />
                      Directions
                    </Button>
                    
                    {mosque.phone && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => callMosque(mosque.phone!)}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                    )}
                    
                    {mosque.website && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => visitWebsite(mosque.website!)}
                      >
                        <Globe className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MosqueList;

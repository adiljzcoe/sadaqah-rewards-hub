
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Calendar, Globe, Search } from 'lucide-react';
import PrayerTimesWidget from '@/components/namaz/PrayerTimesWidget';
import CitySelector from '@/components/namaz/CitySelector';
import MajorCitiesGrid from '@/components/namaz/MajorCitiesGrid';

interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

const NamazTimes = () => {
  const { city } = useParams();
  const [currentCity, setCurrentCity] = useState(city || '');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [autoDetected, setAutoDetected] = useState(false);

  // Auto-detect user location
  useEffect(() => {
    if (!city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
          try {
            // Reverse geocoding to get city name
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const detectedCity = data.city || data.locality || 'Your Location';
            setCurrentCity(detectedCity);
            setAutoDetected(true);
          } catch (error) {
            console.log('Could not detect city name');
            setCurrentCity('Your Location');
            setAutoDetected(true);
          }
        },
        (error) => {
          console.log('Location access denied');
        }
      );
    }
  }, [city]);

  const pageTitle = city 
    ? `Prayer Times in ${city.charAt(0).toUpperCase() + city.slice(1)} - Namaz Schedule Today`
    : 'Prayer Times Today - Find Namaz Times for Your City';
    
  const pageDescription = city
    ? `Accurate prayer times for ${city}. Find today's Namaz schedule including Fajr, Dhuhr, Asr, Maghrib and Isha times.`
    : 'Find accurate prayer times for your city. Get today\'s Namaz schedule with Fajr, Dhuhr, Asr, Maghrib and Isha times.';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/20">
      <Header />
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>{pageTitle}</h1>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`prayer times, namaz times, salah times, ${city || 'islamic prayer schedule'}, muslim prayer times`} />
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Clock className="h-10 w-10 text-blue-600" />
            Prayer Times
            {currentCity && (
              <span className="text-blue-600">- {currentCity}</span>
            )}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {city 
              ? `Accurate prayer times for ${city}. Never miss your daily prayers with precise Namaz schedules.`
              : 'Find accurate prayer times for your location. Never miss your daily prayers with precise Namaz schedules.'
            }
          </p>
        </div>

        {/* Auto-detection Notice */}
        {autoDetected && (
          <Card className="mb-6 bg-green-50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-green-800">
                <MapPin className="h-4 w-4" />
                <span>Location detected: {currentCity}</span>
                <Badge variant="secondary" className="bg-green-100">Auto-detected</Badge>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Prayer Times Widget */}
          <div className="lg:col-span-2">
            <PrayerTimesWidget 
              city={currentCity}
              userLocation={userLocation}
              onTimesUpdate={setPrayerTimes}
              onLoadingChange={setLoading}
            />
            
            {/* City Selector */}
            <div className="mt-6">
              <CitySelector 
                selectedCity={currentCity}
                onCityChange={setCurrentCity}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/namaz-times" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="h-4 w-4 mr-2" />
                    Auto-detect My Location
                  </Button>
                </Link>
                <Link to="/qibla-direction" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    Find Qibla Direction
                  </Button>
                </Link>
                <Link to="/islamic-calendar" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Islamic Calendar
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Prayer Info */}
            <Card>
              <CardHeader>
                <CardTitle>About Prayer Times</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>Prayer times are calculated based on:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Your exact location coordinates</li>
                  <li>Solar calculations for your timezone</li>
                  <li>Standard Islamic calculation methods</li>
                  <li>Local sunrise and sunset times</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Major Cities SEO Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Prayer Times in Major Cities
          </h2>
          <MajorCitiesGrid currentCity={currentCity} />
        </div>

        {/* SEO Content */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Accurate Prayer Times for Muslims Worldwide
          </h2>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Our prayer times calculator provides precise Namaz schedules for cities around the world. 
              The five daily prayers (Salah) are fundamental to Islamic practice, and knowing the exact 
              times helps Muslims maintain their spiritual obligations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">The Five Daily Prayers:</h3>
                <ul className="space-y-1">
                  <li><strong>Fajr:</strong> Dawn prayer before sunrise</li>
                  <li><strong>Dhuhr:</strong> Midday prayer after the sun peaks</li>
                  <li><strong>Asr:</strong> Afternoon prayer</li>
                  <li><strong>Maghrib:</strong> Sunset prayer</li>
                  <li><strong>Isha:</strong> Night prayer after twilight</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Features:</h3>
                <ul className="space-y-1">
                  <li>Automatic location detection</li>
                  <li>Precise astronomical calculations</li>
                  <li>Support for major cities worldwide</li>
                  <li>Daily prayer time updates</li>
                  <li>Islamic calendar integration</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NamazTimes;

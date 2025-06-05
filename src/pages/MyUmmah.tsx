
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Clock, Users, Globe, Heart, Map, Activity, MessageCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WorldAdhanMap from '@/components/ummah/WorldAdhanMap';
import MosqueList from '@/components/ummah/MosqueList';
import CommunityPrayerTab from '@/components/ummah/CommunityPrayerTab';
import UmmahPulse from '@/components/ummah/UmmahPulse';
import DuaFeed from '@/components/dua/DuaFeed';
import CheckInLocations from '@/components/checkin/CheckInLocations';
import RecentCheckIns from '@/components/checkin/RecentCheckIns';
import GoodDeedLogger from '@/components/checkin/GoodDeedLogger';

const MyUmmah = () => {
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLoading(false);
          toast({
            title: "Location Found! 📍",
            description: "Now showing your connection to the global Ummah.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setLoading(false);
          toast({
            title: "Location Access Denied",
            description: "You can still view the global prayer map.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLoading(false);
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
    }
  };

  // Calculate current prayer for user's timezone
  const calculateCurrentPrayer = () => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour >= 5 && hour < 7) return 'Fajr';
    if (hour >= 12 && hour < 15) return 'Dhuhr';
    if (hour >= 15 && hour < 18) return 'Asr';
    if (hour >= 18 && hour < 20) return 'Maghrib';
    if (hour >= 20 && hour < 22) return 'Isha';
    
    return null;
  };

  useEffect(() => {
    // Auto-request location on page load
    getCurrentLocation();
    
    // Set current prayer
    setCurrentPrayer(calculateCurrentPrayer());
    
    // Update current prayer every minute
    const interval = setInterval(() => {
      setCurrentPrayer(calculateCurrentPrayer());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50/30 to-purple-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Globe className="h-10 w-10 text-green-600" />
            My Ummah
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of our global Muslim community. Connect with fellow believers 
            through prayers, du'as, and spiritual activities.
          </p>
        </div>

        {/* Ummah Pulse - Featured at the top */}
        <div className="mb-8">
          <UmmahPulse />
        </div>
        
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Active Prayers</p>
                  <p className="text-3xl font-bold">1.8B+</p>
                </div>
                <Heart className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Countries</p>
                  <p className="text-3xl font-bold">195</p>
                </div>
                <Globe className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Mosques Worldwide</p>
                  <p className="text-3xl font-bold">3.6M+</p>
                </div>
                <Users className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Time Zones</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Location Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {userLocation ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Connected to global Ummah from: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                  Location not detected - viewing global map
                </Badge>
              )}
              <Button 
                onClick={getCurrentLocation} 
                disabled={loading}
                variant="outline"
                size="sm"
              >
                <Navigation className="h-4 w-4 mr-2" />
                {loading ? 'Connecting...' : 'Update Location'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs - Updated check-ins tab */}
        <Tabs defaultValue="pulse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="pulse" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Live Pulse
            </TabsTrigger>
            <TabsTrigger value="global" className="flex items-center gap-2">
              <Map className="h-4 w-4" />
              Global Map
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Prayer Groups
            </TabsTrigger>
            <TabsTrigger value="checkins" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Check-ins
            </TabsTrigger>
            <TabsTrigger value="duas" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Du'as
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pulse" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Feel the Pulse of the Ummah</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experience the spiritual energy flowing through our global community in real-time. 
                See what fellow Muslims are doing right now and join the collective worship.
              </p>
            </div>
            
            {/* Additional pulse-related content can go here */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
                <CardContent className="p-6 text-center">
                  <Heart className="h-12 w-12 text-green-600 mx-auto mb-4" fill="currentColor" />
                  <h3 className="font-bold text-lg mb-2">Join the Energy</h3>
                  <p className="text-gray-600 mb-4">
                    Add your spiritual activities to the global pulse and feel connected with Muslims worldwide.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Start Worship
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-6 text-center">
                  <Activity className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-bold text-lg mb-2">Live Updates</h3>
                  <p className="text-gray-600 mb-4">
                    Watch as the spiritual energy of our Ummah flows and grows throughout the day.
                  </p>
                  <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                    Watch Live
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="global" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* World Map Section */}
              <div className="lg:col-span-2">
                <WorldAdhanMap />
              </div>

              {/* Local Mosques */}
              <div className="lg:col-span-1">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Local Connection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      While you watch prayers across the globe, don't forget your local mosque community.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Users className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="font-medium">Find Your Mosque</div>
                          <div className="text-sm text-gray-600">Connect with local community</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Clock className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="font-medium">Local Prayer Times</div>
                          <div className="text-sm text-gray-600">Never miss a prayer</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Heart className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="font-medium">Community Events</div>
                          <div className="text-sm text-gray-600">Join local gatherings</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {userLocation && <MosqueList userLocation={userLocation} />}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <CommunityPrayerTab currentPrayer={currentPrayer} />
          </TabsContent>

          <TabsContent value="checkins" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">Islamic Check-ins & Good Deeds</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Check in to Islamic locations or log good deeds with GPS to earn Jannah points and help us understand where our community is most active.
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <GoodDeedLogger />
                <CheckInLocations userLocation={userLocation} />
              </div>
              <div className="lg:col-span-1">
                <RecentCheckIns />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="duas">
            <DuaFeed />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyUmmah;

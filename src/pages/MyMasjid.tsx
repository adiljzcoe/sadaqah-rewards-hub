
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Building, 
  Users, 
  Calendar, 
  Clock, 
  MapPin, 
  Star,
  BookOpen,
  Megaphone,
  Heart,
  TrendingUp,
  Award,
  Target,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMasjidDashboard from '@/components/UserMasjidDashboard';

const MyMasjid = () => {
  // Mock data for demonstration
  const userMasjid = {
    id: '1',
    name: 'Central London Mosque',
    location: 'London, UK',
    verified: true,
    description: 'A vibrant community mosque serving the heart of London with daily prayers, educational programs, and community services.',
    memberCount: 247,
    weeklyEvents: 12,
    monthlyKhutbahs: 4,
    activeServices: 8
  };

  const upcomingEvents = [
    {
      id: '1',
      title: 'Friday Khutbah: Patience in Islam',
      date: '2024-12-13',
      time: '13:00',
      type: 'khutbah',
      imam: 'Imam Abdullah'
    },
    {
      id: '2',
      title: 'Youth Program: Islamic History',
      date: '2024-12-14',
      time: '16:00',
      type: 'education',
      location: 'Community Hall'
    },
    {
      id: '3',
      title: 'Community Iftar Planning',
      date: '2024-12-15',
      time: '19:00',
      type: 'community',
      location: 'Main Hall'
    }
  ];

  const prayerTimes = {
    fajr: '06:15',
    sunrise: '08:02',
    dhuhr: '12:30',
    asr: '14:15',
    maghrib: '16:45',
    isha: '18:30'
  };

  const services = [
    { name: 'Islamic Education', type: 'education', active: true },
    { name: 'Wedding Services', type: 'wedding', active: true },
    { name: 'Funeral Services', type: 'funeral', active: true },
    { name: 'Youth Programs', type: 'youth', active: true },
    { name: 'Women Programs', type: 'women', active: true },
    { name: 'Counseling', type: 'counseling', active: true },
    { name: 'Charity Collection', type: 'charity', active: true },
    { name: 'Halal Food Bank', type: 'halal_food', active: true }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'khutbah': return <BookOpen className="h-4 w-4" />;
      case 'education': return <Users className="h-4 w-4" />;
      case 'community': return <Heart className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                <Building className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-4xl font-bold text-gray-900">{userMasjid.name}</h1>
                  {userMasjid.verified && (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{userMasjid.location}</span>
                </div>
                <p className="text-gray-700 mt-2 max-w-2xl">
                  {userMasjid.description}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <Button className="mb-2">
                <Share2 className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>
              <div className="text-sm text-gray-600">
                {userMasjid.memberCount} community members
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-blue-600">{userMasjid.memberCount}</div>
            <p className="text-sm text-gray-600">Members</p>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-green-600">{userMasjid.weeklyEvents}</div>
            <p className="text-sm text-gray-600">Weekly Events</p>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-purple-600">{userMasjid.monthlyKhutbahs}</div>
            <p className="text-sm text-gray-600">Monthly Khutbahs</p>
          </Card>
          
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-orange-600">{userMasjid.activeServices}</div>
            <p className="text-sm text-gray-600">Active Services</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prayer Times */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Today's Prayer Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="font-semibold text-blue-800">Fajr</div>
                    <div className="text-lg font-bold">{prayerTimes.fajr}</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-50 rounded-lg">
                    <div className="font-semibold text-yellow-800">Dhuhr</div>
                    <div className="text-lg font-bold">{prayerTimes.dhuhr}</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="font-semibold text-orange-800">Asr</div>
                    <div className="text-lg font-bold">{prayerTimes.asr}</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="font-semibold text-red-800">Maghrib</div>
                    <div className="text-lg font-bold">{prayerTimes.maghrib}</div>
                  </div>
                  <div className="text-center p-3 bg-indigo-50 rounded-lg">
                    <div className="font-semibold text-indigo-800">Isha</div>
                    <div className="text-lg font-bold">{prayerTimes.isha}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="font-semibold text-green-800">Sunrise</div>
                    <div className="text-lg font-bold">{prayerTimes.sunrise}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <h4 className="font-medium">{event.title}</h4>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                            {event.location && ` • ${event.location}`}
                            {event.imam && ` • ${event.imam}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Community Services
                </CardTitle>
                <CardDescription>
                  Services offered by our masjid community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Management Access */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Building className="h-5 w-5" />
                  Masjid Management
                </CardTitle>
                <CardDescription>
                  Access comprehensive management tools for your masjid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-blue-700">
                    Our masjid management platform provides everything you need to run your community effectively.
                  </p>
                  <div className="flex gap-2">
                    <Link to="/masjid-management">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Access Management Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User's Masjid Dashboard */}
            <UserMasjidDashboard masjidId={userMasjid.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMasjid;

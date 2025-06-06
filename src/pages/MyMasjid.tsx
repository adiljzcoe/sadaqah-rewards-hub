import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Share2,
  Code
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UserMasjidDashboard from '@/components/UserMasjidDashboard';
import { useIslamicThemes } from '@/hooks/useIslamicThemes';

const MyMasjid = () => {
  const { themes } = useIslamicThemes();
  
  // Mock data for different masjids
  const masjidExamples = {
    'central-london': {
      id: '1',
      name: 'Central London Mosque',
      location: 'London, UK',
      verified: true,
      description: 'A vibrant community mosque serving the heart of London with daily prayers, educational programs, and community services.',
      memberCount: 247,
      weeklyEvents: 12,
      monthlyKhutbahs: 4,
      activeServices: 8,
      theme: 'traditional-green'
    },
    'al-noor-birmingham': {
      id: '2',
      name: 'Al-Noor Mosque Birmingham',
      location: 'Birmingham, UK',
      verified: true,
      description: 'Established in 1985, Al-Noor serves the diverse Muslim community of Birmingham with comprehensive Islamic education and community outreach programs.',
      memberCount: 342,
      weeklyEvents: 18,
      monthlyKhutbahs: 6,
      activeServices: 12,
      theme: 'elegant-blue'
    },
    'masjid-ibrahim': {
      id: '3',
      name: 'Masjid Ibrahim',
      location: 'Manchester, UK',
      verified: false,
      description: 'A growing community mosque dedicated to serving families with children\'s programs, elderly care, and interfaith dialogue initiatives.',
      memberCount: 156,
      weeklyEvents: 8,
      monthlyKhutbahs: 4,
      activeServices: 6,
      theme: 'madinah-cream'
    },
    'green-lane-masjid': {
      id: '4',
      name: 'Green Lane Masjid',
      location: 'Leeds, UK',
      verified: true,
      description: 'Known for its beautiful Islamic architecture and strong focus on youth development, Quran memorization, and community welfare programs.',
      memberCount: 428,
      weeklyEvents: 22,
      monthlyKhutbahs: 8,
      activeServices: 15,
      theme: 'royal-purple'
    },
    'baitul-futuh': {
      id: '5',
      name: 'Baitul Futuh Mosque',
      location: 'Surrey, UK',
      verified: true,
      description: 'One of the largest mosques in Western Europe, offering extensive facilities for worship, education, sports, and community events.',
      memberCount: 892,
      weeklyEvents: 35,
      monthlyKhutbahs: 12,
      activeServices: 20,
      theme: 'desert-sand'
    },
    'east-london-mosque': {
      id: '6',
      name: 'East London Mosque',
      location: 'Tower Hamlets, London',
      verified: true,
      description: 'Historic mosque serving the East London community since 1910, providing traditional Islamic education alongside modern community services.',
      memberCount: 567,
      weeklyEvents: 28,
      monthlyKhutbahs: 10,
      activeServices: 18,
      theme: 'makkah-black'
    }
  };

  const [selectedMasjid, setSelectedMasjid] = useState('central-london');
  const userMasjid = masjidExamples[selectedMasjid];
  const currentTheme = themes[userMasjid.theme];

  // Mock data for demonstration
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
    <div className={`min-h-screen ${currentTheme.containerClasses}`}>
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Dev Selector */}
        <div className="mb-6 p-4 bg-gray-900 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Code className="h-5 w-5 text-green-400" />
            <h3 className="text-white font-semibold">Development Mode - Islamic Themes</h3>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-gray-300 text-sm">Select Masjid Theme:</label>
            <Select value={selectedMasjid} onValueChange={setSelectedMasjid}>
              <SelectTrigger className="w-64 bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(masjidExamples).map(([key, masjid]) => (
                  <SelectItem key={key} value={key}>
                    {masjid.name} ({themes[masjid.theme]?.name})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 bg-gradient-to-br ${currentTheme.gradientClasses} rounded-full flex items-center justify-center shadow-lg`}>
                <Building className="h-10 w-10 text-white" />
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className={`text-4xl font-bold ${currentTheme.textClasses}`}>{userMasjid.name}</h1>
                  {userMasjid.verified && (
                    <Badge className={`${currentTheme.accentClasses} hover:${currentTheme.accentClasses}`}>
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                <div className={`flex items-center gap-2 ${currentTheme.textClasses} opacity-80`}>
                  <MapPin className="h-4 w-4" />
                  <span>{userMasjid.location}</span>
                </div>
                <p className={`${currentTheme.textClasses} opacity-90 mt-2 max-w-2xl`}>
                  {userMasjid.description}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <Button className={`mb-2 bg-gradient-to-r ${currentTheme.gradientClasses} text-white hover:opacity-90`}>
                <Share2 className="h-4 w-4 mr-2" />
                Invite Friends
              </Button>
              <div className={`text-sm ${currentTheme.textClasses} opacity-80`}>
                {userMasjid.memberCount} community members
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`${currentTheme.cardClasses} text-center p-4 rounded-lg`}>
            <div className={`text-2xl font-bold ${currentTheme.textClasses}`}>{userMasjid.memberCount}</div>
            <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>Members</p>
          </div>
          
          <div className={`${currentTheme.cardClasses} text-center p-4 rounded-lg`}>
            <div className={`text-2xl font-bold ${currentTheme.textClasses}`}>{userMasjid.weeklyEvents}</div>
            <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>Weekly Events</p>
          </div>
          
          <div className={`${currentTheme.cardClasses} text-center p-4 rounded-lg`}>
            <div className={`text-2xl font-bold ${currentTheme.textClasses}`}>{userMasjid.monthlyKhutbahs}</div>
            <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>Monthly Khutbahs</p>
          </div>
          
          <div className={`${currentTheme.cardClasses} text-center p-4 rounded-lg`}>
            <div className={`text-2xl font-bold ${currentTheme.textClasses}`}>{userMasjid.activeServices}</div>
            <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>Active Services</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prayer Times */}
            <div className={`${currentTheme.cardClasses} rounded-lg`}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className={`text-2xl font-semibold leading-none tracking-tight ${currentTheme.textClasses} flex items-center gap-2`}>
                  <Clock className="h-5 w-5" />
                  Today's Prayer Times
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-3 gap-4">
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.fajr}`}>
                    <div className="font-semibold">Fajr</div>
                    <div className="text-lg font-bold">{prayerTimes.fajr}</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.dhuhr}`}>
                    <div className="font-semibold">Dhuhr</div>
                    <div className="text-lg font-bold">{prayerTimes.dhuhr}</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.asr}`}>
                    <div className="font-semibold">Asr</div>
                    <div className="text-lg font-bold">{prayerTimes.asr}</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.maghrib}`}>
                    <div className="font-semibold">Maghrib</div>
                    <div className="text-lg font-bold">{prayerTimes.maghrib}</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.isha}`}>
                    <div className="font-semibold">Isha</div>
                    <div className="text-lg font-bold">{prayerTimes.isha}</div>
                  </div>
                  <div className={`text-center p-3 rounded-lg ${currentTheme.prayerTimeClasses.sunrise}`}>
                    <div className="font-semibold">Sunrise</div>
                    <div className="text-lg font-bold">{prayerTimes.sunrise}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className={`${currentTheme.cardClasses} rounded-lg`}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className={`text-2xl font-semibold leading-none tracking-tight ${currentTheme.textClasses} flex items-center gap-2`}>
                  <Calendar className="h-5 w-5" />
                  Upcoming Events
                </h3>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className={`flex items-center justify-between p-3 ${currentTheme.accentClasses} rounded-lg hover:opacity-80 transition-opacity`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 ${currentTheme.accentClasses} rounded-full flex items-center justify-center`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <h4 className={`font-medium ${currentTheme.textClasses}`}>{event.title}</h4>
                          <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>
                            {event.date} at {event.time}
                            {event.location && ` • ${event.location}`}
                            {event.imam && ` • ${event.imam}`}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className={`capitalize ${currentTheme.textClasses}`}>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Services */}
            <div className={`${currentTheme.cardClasses} rounded-lg`}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className={`text-2xl font-semibold leading-none tracking-tight ${currentTheme.textClasses} flex items-center gap-2`}>
                  <Heart className="h-5 w-5" />
                  Community Services
                </h3>
                <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>
                  Services offered by our masjid community
                </p>
              </div>
              <div className="p-6 pt-0">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {services.map((service, index) => (
                    <div key={index} className={`flex items-center gap-2 p-2 ${currentTheme.accentClasses} rounded-lg`}>
                      <div className={`w-2 h-2 bg-gradient-to-r ${currentTheme.gradientClasses} rounded-full`}></div>
                      <span className={`text-sm font-medium ${currentTheme.textClasses}`}>{service.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Management Access */}
            <div className={`${currentTheme.cardClasses} rounded-lg`}>
              <div className="flex flex-col space-y-1.5 p-6">
                <h3 className={`text-2xl font-semibold leading-none tracking-tight ${currentTheme.textClasses} flex items-center gap-2`}>
                  <Building className="h-5 w-5" />
                  Masjid Management
                </h3>
                <p className={`text-sm ${currentTheme.textClasses} opacity-70`}>
                  Access comprehensive management tools for your masjid
                </p>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-3">
                  <p className={`text-sm ${currentTheme.textClasses} opacity-80`}>
                    Our masjid management platform provides everything you need to run your community effectively.
                  </p>
                  <div className="flex gap-2">
                    <Link to="/masjid-management">
                      <Button className={`bg-gradient-to-r ${currentTheme.gradientClasses} text-white hover:opacity-90`}>
                        Access Management Dashboard
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User's Masjid Dashboard */}
            <div className={currentTheme.cardClasses}>
              <UserMasjidDashboard masjidId={userMasjid.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMasjid;

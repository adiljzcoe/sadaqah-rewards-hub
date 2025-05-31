import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building2, MapPin, Utensils, Crown, Trophy, Users, Medal, Star } from 'lucide-react';

// Business data
const localBusinesses = [
  { rank: 1, name: 'Birmingham Islamic Centre', location: 'Birmingham', coins: 15420, donations: 85 },
  { rank: 2, name: 'Al-Noor Grocery', location: 'London', coins: 11600, donations: 68 },
  { rank: 3, name: 'Mosque Community Shop', location: 'Leeds', coins: 9800, donations: 54 },
  { rank: 4, name: 'Islamic Bookstore', location: 'Bradford', coins: 8500, donations: 47 },
  { rank: 5, name: 'Crescent Electronics', location: 'Manchester', coins: 7200, donations: 41 },
];

const halalRestaurants = [
  { rank: 1, name: 'Halal Corner Restaurant', location: 'Manchester', coins: 12800, donations: 72 },
  { rank: 2, name: 'Bismillah Kitchen', location: 'Birmingham', coins: 10500, donations: 59 },
  { rank: 3, name: 'Al-Medina Grill', location: 'London', coins: 9200, donations: 52 },
  { rank: 4, name: 'Pak Taste', location: 'Bradford', coins: 8100, donations: 45 },
  { rank: 5, name: 'Zam Zam Restaurant', location: 'Leeds', coins: 6800, donations: 38 },
];

const nationalBusinesses = [
  { rank: 1, name: 'Halal Food Network', coins: 45200, donations: 280 },
  { rank: 2, name: 'Islamic Finance UK', coins: 38900, donations: 245 },
  { rank: 3, name: 'Crescent Foods Ltd', coins: 32100, donations: 198 },
  { rank: 4, name: 'UK Islamic Services', coins: 28500, donations: 167 },
  { rank: 5, name: 'Muslim Business Hub', coins: 24800, donations: 145 },
];

// City data
const cityLeaderboard = [
  { rank: 1, name: 'Birmingham', points: 45680, donors: 1240, icon: '🏆' },
  { rank: 2, name: 'Manchester', points: 42150, donors: 1100, icon: '🥈' },
  { rank: 3, name: 'London', points: 38900, donors: 980, icon: '🥉' },
  { rank: 4, name: 'Leeds', points: 35200, donors: 850, icon: '4️⃣' },
  { rank: 5, name: 'Bradford', points: 32100, donors: 720, icon: '5️⃣' },
];

// Individual donors
const topDonors = [
  { rank: 1, name: 'Ahmad K.', points: 8920, donations: 45, level: 18 },
  { rank: 2, name: 'Sarah M.', points: 7650, donations: 38, level: 16 },
  { rank: 3, name: 'Omar R.', points: 6890, donations: 34, level: 15 },
  { rank: 4, name: 'Fatima S.', points: 6420, donations: 31, level: 14 },
  { rank: 5, name: 'Yusuf A.', points: 5890, donations: 28, level: 12 },
];

const LeagueTablesCarousel = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-4 w-4 text-yellow-500" />;
      case 2: return <Trophy className="h-4 w-4 text-gray-400" />;
      case 3: return <Medal className="h-4 w-4 text-amber-600" />;
      default: return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2: return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3: return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default: return 'bg-white border-gray-200';
    }
  };

  const leagueTables = [
    {
      id: 'local-business',
      title: 'Local Business Leaders',
      icon: <MapPin className="h-5 w-5 text-emerald-600" />,
      badge: 'This Month',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      data: localBusinesses,
      showLocation: true
    },
    {
      id: 'halal-restaurants',
      title: 'Halal Restaurant Leaders',
      icon: <Utensils className="h-5 w-5 text-orange-600" />,
      badge: 'This Month',
      badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
      data: halalRestaurants,
      showLocation: true
    },
    {
      id: 'national-business',
      title: 'National Business Leaders',
      icon: <Crown className="h-5 w-5 text-blue-600" />,
      badge: 'This Month',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      data: nationalBusinesses,
      showLocation: false
    },
    {
      id: 'cities',
      title: 'City Rankings',
      icon: <Building2 className="h-5 w-5 text-purple-600" />,
      badge: 'Live',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      data: cityLeaderboard,
      showLocation: false,
      isCity: true
    },
    {
      id: 'top-donors',
      title: 'Top Individual Donors',
      icon: <Star className="h-5 w-5 text-pink-600" />,
      badge: 'This Week',
      badgeColor: 'bg-pink-100 text-pink-800 border-pink-200',
      data: topDonors,
      showLocation: false,
      isIndividual: true
    }
  ];

  const renderLeagueTable = (league: any) => (
    <Card className="w-full max-w-md mx-auto p-6 professional-card hover-lift">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg font-semibold flex items-center">
          {league.icon}
          <span className="ml-2">{league.title}</span>
        </h4>
        <Badge className={league.badgeColor}>
          {league.badge}
        </Badge>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>{league.isCity ? 'City' : league.isIndividual ? 'Donor' : 'Business'}</TableHead>
            <TableHead className="text-right">{league.isCity ? 'Points' : league.isIndividual ? 'Points' : 'Coins'}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {league.data.map((item: any) => (
            <TableRow key={item.rank}>
              <TableCell>
                <div className="flex items-center justify-center w-6 h-6">
                  {getRankIcon(item.rank)}
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{item.name}</div>
                  {league.showLocation && item.location && (
                    <div className="text-xs text-gray-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {item.location} • {item.donations} donations
                    </div>
                  )}
                  {league.isCity && (
                    <div className="text-xs text-gray-600 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {item.donors} donors
                    </div>
                  )}
                  {league.isIndividual && (
                    <div className="text-xs text-gray-600">
                      Level {item.level} • {item.donations} donations
                    </div>
                  )}
                  {!league.showLocation && !league.isCity && !league.isIndividual && (
                    <div className="text-xs text-gray-600">
                      {item.donations} donations sponsored
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="font-bold text-sm vibrant-text-blue">
                  {league.isCity || league.isIndividual ? 
                    item.points?.toLocaleString() || item.coins?.toLocaleString() : 
                    item.coins?.toLocaleString()
                  }
                </div>
                <div className="text-xs text-gray-500">
                  {league.isCity || league.isIndividual ? 'points' : 'coins'}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );

  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-blue-50/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Community League Tables
          </h3>
          <p className="text-gray-600">See how different groups are making an impact</p>
        </div>

        <Tabs defaultValue="local-business" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm">
            {leagueTables.map((league) => (
              <TabsTrigger 
                key={league.id} 
                value={league.id}
                className="flex items-center gap-2 text-xs sm:text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
              >
                <span className="hidden sm:inline">{league.icon}</span>
                <span className="truncate">
                  {league.id === 'local-business' ? 'Local' :
                   league.id === 'halal-restaurants' ? 'Restaurants' :
                   league.id === 'national-business' ? 'National' :
                   league.id === 'cities' ? 'Cities' : 'Donors'}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {leagueTables.map((league) => (
            <TabsContent key={league.id} value={league.id} className="mt-0">
              {renderLeagueTable(league)}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LeagueTablesCarousel;

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Award, Crown, Users, MapPin, Building, Star } from 'lucide-react';
import Header from '@/components/Header';

const Leaderboards = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  
  const individualLeaders = [
    { rank: 1, name: "Sarah K.", points: 12450, donations: 45, city: "London", badge: "Crown" },
    { rank: 2, name: "Mohammed A.", points: 11230, donations: 38, city: "Birmingham", badge: "VIP" },
    { rank: 3, name: "David L.", points: 10890, donations: 42, city: "Manchester", badge: null },
    { rank: 4, name: "Fatima H.", points: 9650, donations: 35, city: "London", badge: "VIP" },
    { rank: 5, name: "James R.", points: 8920, donations: 29, city: "Glasgow", badge: null },
    { rank: 6, name: "Aisha M.", points: 8450, donations: 31, city: "Leeds", badge: null },
    { rank: 7, name: "Oliver S.", points: 7890, donations: 28, city: "Liverpool", badge: null },
    { rank: 8, name: "Zara P.", points: 7230, donations: 26, city: "London", badge: null },
    { rank: 9, name: "Adam W.", points: 6890, donations: 24, city: "Cardiff", badge: null },
    { rank: 10, name: "Layla N.", points: 6450, donations: 23, city: "Edinburgh", badge: null },
  ];

  const cityLeaders = [
    { rank: 1, name: "London", points: 125400, donors: 1247, avgDonation: 65 },
    { rank: 2, name: "Birmingham", points: 98200, donors: 856, avgDonation: 58 },
    { rank: 3, name: "Manchester", points: 87600, donors: 734, avgDonation: 62 },
    { rank: 4, name: "Glasgow", points: 76300, donors: 612, avgDonation: 55 },
    { rank: 5, name: "Leeds", points: 65400, donors: 523, avgDonation: 60 },
  ];

  const mosqueLeaders = [
    { rank: 1, name: "East London Mosque", points: 45600, members: 234, city: "London" },
    { rank: 2, name: "Birmingham Central Mosque", points: 38900, members: 198, city: "Birmingham" },
    { rank: 3, name: "Manchester Islamic Centre", points: 32400, members: 167, city: "Manchester" },
    { rank: 4, name: "Green Lane Mosque", points: 28700, members: 156, city: "Birmingham" },
    { rank: 5, name: "Regent's Park Mosque", points: 25300, members: 143, city: "London" },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-600">{rank}</span>;
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "rank-badge first";
      case 2:
        return "rank-badge second";
      case 3:
        return "rank-badge third";
      default:
        return "rank-badge";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Community Leaderboards
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See how you and your community rank in making a difference
          </p>
        </div>

        {/* Time Filter */}
        <div className="flex justify-center mb-8">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">This Week</SelectItem>
              <SelectItem value="monthly">This Month</SelectItem>
              <SelectItem value="yearly">This Year</SelectItem>
              <SelectItem value="alltime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="cities">Cities</TabsTrigger>
            <TabsTrigger value="mosques">Mosques</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Top Individual Donors
              </h3>
              
              {/* Top 3 Podium */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {individualLeaders.slice(0, 3).map((leader, index) => (
                  <div key={leader.rank} className={`text-center p-6 rounded-xl ${getRankBadge(leader.rank)} hover-lift`}>
                    <div className="flex justify-center mb-4">
                      {getRankIcon(leader.rank)}
                    </div>
                    <h4 className="font-bold text-lg text-white mb-2">{leader.name}</h4>
                    <div className="text-2xl font-black text-white mb-2">{leader.points.toLocaleString()}</div>
                    <p className="text-white/90 text-sm">{leader.donations} donations</p>
                    <div className="flex items-center justify-center gap-1 mt-2 text-white/80 text-xs">
                      <MapPin className="h-3 w-3" />
                      {leader.city}
                    </div>
                    {leader.badge && (
                      <Badge className="mt-2 bg-white/20 text-white">
                        {leader.badge === "Crown" ? <Crown className="h-3 w-3 mr-1" /> : <Star className="h-3 w-3 mr-1" />}
                        {leader.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Rest of the leaderboard */}
              <div className="space-y-3">
                {individualLeaders.slice(3).map((leader) => (
                  <div key={leader.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover-lift">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {leader.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{leader.name}</h4>
                          {leader.badge && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              {leader.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="h-3 w-3" />
                          {leader.city}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-emerald-600">{leader.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">{leader.donations} donations</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="cities">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building className="h-6 w-6 text-blue-500" />
                Top Cities
              </h3>
              <div className="space-y-4">
                {cityLeaders.map((city) => (
                  <div key={city.rank} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg hover-lift">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${getRankBadge(city.rank)}`}>
                        {city.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-gray-900">{city.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {city.donors} donors
                          </span>
                          <span>Avg: £{city.avgDonation}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-emerald-600">{city.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="mosques">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building className="h-6 w-6 text-green-500" />
                Top Mosques & Islamic Centres
              </h3>
              <div className="space-y-4">
                {mosqueLeaders.map((mosque) => (
                  <div key={mosque.rank} className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-green-50 rounded-lg hover-lift">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${getRankBadge(mosque.rank)}`}>
                        {mosque.rank}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{mosque.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {mosque.members} members
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {mosque.city}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-emerald-600">{mosque.points.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Leaderboards;

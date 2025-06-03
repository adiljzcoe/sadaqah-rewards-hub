
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Users, MapPin, Crown, Star, TrendingUp, Calendar } from 'lucide-react';

const Leaderboards = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [selectedCity, setSelectedCity] = useState('all');

  // Mock data for different leaderboards
  const globalLeaders = [
    { rank: 1, name: "Ahmad M.", city: "London", donations: 145, amount: 2450, points: 4900 },
    { rank: 2, name: "Fatima K.", city: "Birmingham", donations: 132, amount: 2200, points: 4400 },
    { rank: 3, name: "Omar H.", city: "Manchester", donations: 118, amount: 1980, points: 3960 },
    { rank: 4, name: "Aisha R.", city: "Leeds", donations: 95, amount: 1675, points: 3350 },
    { rank: 5, name: "Yusuf A.", city: "London", donations: 89, amount: 1520, points: 3040 }
  ];

  const cityLeaders = [
    { rank: 1, city: "London", totalDonations: 2847, totalAmount: 142350, members: 1247 },
    { rank: 2, city: "Birmingham", totalDonations: 2134, totalAmount: 98750, members: 892 },
    { rank: 3, city: "Manchester", totalDonations: 1856, totalAmount: 87400, members: 743 },
    { rank: 4, city: "Leeds", totalDonations: 1432, totalAmount: 65800, members: 567 },
    { rank: 5, city: "Glasgow", totalDonations: 1156, totalAmount: 52300, members: 434 }
  ];

  const mosqueLeaders = [
    { rank: 1, name: "East London Mosque", city: "London", donations: 547, amount: 28750, members: 234 },
    { rank: 2, name: "Birmingham Central Mosque", city: "Birmingham", donations: 423, amount: 21400, members: 198 },
    { rank: 3, name: "Manchester Islamic Centre", city: "Manchester", donations: 389, amount: 19650, members: 167 },
    { rank: 4, name: "Leeds Grand Mosque", city: "Leeds", donations: 312, amount: 15600, members: 143 },
    { rank: 5, name: "Edinburgh Mosque", city: "Edinburgh", donations: 267, amount: 13350, members: 121 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Trophy className="h-5 w-5 text-amber-600" />;
      default: return <Star className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRankClass = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-300";
      case 2: return "bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300";
      case 3: return "bg-gradient-to-r from-amber-100 to-amber-200 border-amber-300";
      default: return "bg-white border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Community Leaderboards
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            See how you and your community rank in charitable giving. Compete with friends, cities, and mosques!
          </p>
        </div>

        {/* Time Frame Selector */}
        <div className="flex justify-center mb-8">
          <Card className="p-2">
            <div className="flex gap-2">
              {['daily', 'weekly', 'monthly', 'yearly'].map((period) => (
                <Button
                  key={period}
                  variant={timeFrame === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeFrame(period)}
                  className="capitalize"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {period}
                </Button>
              ))}
            </div>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="individual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="cities">Cities</TabsTrigger>
            <TabsTrigger value="mosques">Mosques</TabsTrigger>
          </TabsList>

          {/* Individual Leaderboard */}
          <TabsContent value="individual">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Top Individual Donors ({timeFrame})
                </CardTitle>
                <div className="flex gap-4">
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Cities</SelectItem>
                      <SelectItem value="london">London</SelectItem>
                      <SelectItem value="birmingham">Birmingham</SelectItem>
                      <SelectItem value="manchester">Manchester</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {globalLeaders.map((leader, index) => (
                    <div
                      key={leader.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankClass(leader.rank)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(leader.rank)}
                          <span className="text-lg font-bold">#{leader.rank}</span>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-lg">{leader.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {leader.city}
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-bold text-lg text-emerald-600">
                          {leader.points.toLocaleString()} pts
                        </div>
                        <div className="text-sm text-gray-600">
                          £{leader.amount.toLocaleString()} • {leader.donations} donations
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cities Leaderboard */}
          <TabsContent value="cities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  Top Cities ({timeFrame})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cityLeaders.map((city) => (
                    <div
                      key={city.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankClass(city.rank)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(city.rank)}
                          <span className="text-lg font-bold">#{city.rank}</span>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-lg">{city.city}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {city.members.toLocaleString()} active members
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-bold text-lg text-blue-600">
                          £{city.totalAmount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {city.totalDonations.toLocaleString()} donations
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mosques Leaderboard */}
          <TabsContent value="mosques">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  Top Mosques ({timeFrame})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mosqueLeaders.map((mosque) => (
                    <div
                      key={mosque.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${getRankClass(mosque.rank)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getRankIcon(mosque.rank)}
                          <span className="text-lg font-bold">#{mosque.rank}</span>
                        </div>
                        
                        <div>
                          <div className="font-semibold text-lg">{mosque.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-3">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {mosque.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {mosque.members} members
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right space-y-1">
                        <div className="font-bold text-lg text-purple-600">
                          £{mosque.amount.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {mosque.donations} donations
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Competition Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 mx-auto mb-4 text-emerald-500" />
              <div className="text-2xl font-bold text-emerald-600 mb-2">15%</div>
              <div className="text-gray-600">Growth This Week</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="h-8 w-8 mx-auto mb-4 text-blue-500" />
              <div className="text-2xl font-bold text-blue-600 mb-2">1,247</div>
              <div className="text-gray-600">Active Competitors</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="h-8 w-8 mx-auto mb-4 text-yellow-500" />
              <div className="text-2xl font-bold text-yellow-600 mb-2">£89K</div>
              <div className="text-gray-600">Raised This Week</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;

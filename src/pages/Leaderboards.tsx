import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Medal, Award, Crown, Users, MapPin, Building, Star, Target, ArrowUp } from 'lucide-react';
import Header from '@/components/Header';
import { getUserLeague, getNextLeague, leagues } from '@/utils/leagueSystem';

const Leaderboards = () => {
  const [timeFilter, setTimeFilter] = useState('weekly');
  
  const userPoints = 5632;
  const userRank = 47;
  const userCity = "London";
  const userLeague = getUserLeague(userPoints);
  const nextLeague = getNextLeague(userPoints);
  
  const individualLeaders = [
    { rank: 1, name: "Sarah K.", points: 12450, donations: 45, city: "London", badge: "Crown", league: "Diamond Saints" },
    { rank: 2, name: "Mohammed A.", points: 11230, donations: 38, city: "Birmingham", badge: "VIP", league: "Diamond Saints" },
    { rank: 3, name: "David L.", points: 10890, donations: 42, city: "Manchester", badge: null },
    { rank: 4, name: "Fatima H.", points: 9650, donations: 35, city: "London", badge: "VIP" },
    { rank: 5, name: "James R.", points: 8920, donations: 29, city: "Glasgow", badge: null },
    { rank: 6, name: "Aisha M.", points: 8450, donations: 31, city: "Leeds", badge: null },
    { rank: 7, name: "Oliver S.", points: 7890, donations: 28, city: "Liverpool", badge: null },
    { rank: 8, name: "Zara P.", points: 7230, donations: 26, city: "London", badge: null },
    { rank: 9, name: "Adam W.", points: 6890, donations: 24, city: "Cardiff", badge: null },
    { rank: 10, name: "Layla N.", points: 6450, donations: 23, city: "Edinburgh", badge: null },
    { rank: 46, name: "Sarah K.", points: 5890, donations: 28, city: "London", badge: null, league: "Gold Donors" },
    { rank: 47, name: "Ahmad M. (YOU)", points: 5632, donations: 26, city: "London", badge: null, league: "Gold Donors", isUser: true },
    { rank: 48, name: "David M.", points: 5420, donations: 24, city: "Leeds", badge: null, league: "Gold Donors" },
    { rank: 49, name: "Aisha R.", points: 5380, donations: 21, city: "Manchester", badge: null, league: "Gold Donors" },
    { rank: 50, name: "James W.", points: 5200, donations: 23, city: "Glasgow", badge: null, league: "Gold Donors" },
  ];

  const cityLeaders = [
    { rank: 1, name: "London", points: 125400, donors: 1247, avgDonation: 65, isUserCity: true },
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

        {/* Personal League Status */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
              <Trophy className="h-6 w-6 mr-2 text-purple-600" />
              Your League Standing
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`p-4 rounded-xl bg-gradient-to-r ${userLeague.gradient} text-white`}>
                <div className="text-3xl mb-2">{userLeague.icon}</div>
                <div className="font-bold text-lg">{userLeague.name}</div>
                <div className="text-sm opacity-90">Current League</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-gray-400 to-gray-600 text-white">
                <div className="text-3xl mb-2">#{userRank}</div>
                <div className="font-bold text-lg">Your Rank</div>
                <div className="text-sm opacity-90">Global Position</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-400 to-blue-500 text-white">
                <div className="text-3xl mb-2">#{cityLeaders.find(c => c.name === userCity)?.rank || 'N/A'}</div>
                <div className="font-bold text-lg">{userCity}</div>
                <div className="text-sm opacity-90">City Rank</div>
              </div>
            </div>
            {nextLeague && (
              <div className="mt-6 p-4 bg-white/20 rounded-lg backdrop-blur-sm">
                <p className="text-purple-800 font-bold mb-2">
                  <ArrowUp className="inline h-4 w-4 mr-1" />
                  Next League: {nextLeague.name}
                </p>
                <p className="text-purple-700">
                  You need {nextLeague.minPoints - userPoints} more points to advance!
                </p>
              </div>
            )}
          </div>
        </Card>

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="individual">Individual</TabsTrigger>
            <TabsTrigger value="cities">Cities</TabsTrigger>
            <TabsTrigger value="mosques">Mosques</TabsTrigger>
            <TabsTrigger value="leagues">Leagues</TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Individual Donors - Around Your Rank
              </h3>
              
              {/* Focus on user's area */}
              <div className="space-y-3">
                {individualLeaders.slice(-10).map((leader) => (
                  <div key={leader.rank} className={`flex items-center justify-between p-4 rounded-lg hover-lift ${
                    leader.isUser ? 'bg-gradient-to-r from-purple-50 to-pink-50 ring-2 ring-purple-300' : 'bg-gray-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                        leader.isUser ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse' : getRankBadge(leader.rank)
                      }`}>
                        {leader.rank}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className={`font-semibold ${leader.isUser ? 'text-purple-700' : 'text-gray-900'}`}>
                            {leader.name}
                            {leader.isUser && (
                              <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                                YOU
                              </Badge>
                            )}
                          </h4>
                          {leader.badge && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                              <Crown className="h-3 w-3 mr-1" />
                              {leader.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {leader.city}
                          </span>
                          <span className="text-purple-600 font-semibold">{leader.league}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${leader.isUser ? 'text-purple-600' : 'text-emerald-600'}`}>
                        {leader.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{leader.donations} donations</div>
                      {leader.rank === 46 && (
                        <div className="text-xs text-red-600 font-bold">
                          <Target className="inline h-3 w-3 mr-1" />
                          Beat me!
                        </div>
                      )}
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
                  <div key={city.rank} className={`flex items-center justify-between p-6 rounded-lg hover-lift ${
                    city.isUserCity ? 'bg-gradient-to-r from-blue-50 to-emerald-50 ring-2 ring-emerald-300' : 'bg-gradient-to-r from-gray-50 to-blue-50'
                  }`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${getRankBadge(city.rank)} ${
                        city.isUserCity ? 'animate-pulse' : ''
                      }`}>
                        {city.rank}
                      </div>
                      <div>
                        <h4 className={`font-bold text-xl ${city.isUserCity ? 'text-emerald-700' : 'text-gray-900'}`}>
                          {city.name}
                          {city.isUserCity && (
                            <Badge className="ml-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs">
                              YOUR CITY
                            </Badge>
                          )}
                        </h4>
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
                      <div className={`font-bold text-2xl ${city.isUserCity ? 'text-emerald-600' : 'text-emerald-600'}`}>
                        {city.points.toLocaleString()}
                      </div>
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
          
          <TabsContent value="leagues">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Trophy className="h-6 w-6 text-purple-500" />
                Giving Leagues
              </h3>
              <div className="space-y-4">
                {leagues.map((league, index) => (
                  <div key={index} className={`p-6 rounded-xl border-2 transition-all ${
                    league.name === userLeague.name ? 'border-purple-300 bg-purple-50 ring-2 ring-purple-200' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${league.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                          {league.icon}
                        </div>
                        <div>
                          <h4 className={`font-bold text-xl ${league.name === userLeague.name ? 'text-purple-700' : 'text-gray-900'}`}>
                            {league.name}
                            {league.name === userLeague.name && (
                              <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                                YOUR LEAGUE
                              </Badge>
                            )}
                          </h4>
                          <p className="text-gray-600">
                            {league.minPoints.toLocaleString()} - {league.maxPoints === Infinity ? '∞' : league.maxPoints.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-700 mb-2">Benefits:</h5>
                        <ul className="space-y-1">
                          {league.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm text-gray-600 flex items-center">
                              <Star className="h-3 w-3 mr-1 text-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {league.name === userLeague.name && nextLeague && (
                        <div className="bg-white/60 p-4 rounded-lg">
                          <h5 className="font-semibold text-purple-700 mb-2">Next League Progress:</h5>
                          <p className="text-sm text-purple-600 mb-2">
                            {nextLeague.minPoints - userPoints} points to {nextLeague.name}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                              style={{ width: `${Math.min(((userPoints - league.minPoints) / (nextLeague.minPoints - league.minPoints)) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
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

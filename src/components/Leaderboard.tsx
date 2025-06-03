import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Medal, Award, MapPin, Users, ArrowUp, Target, Crown, Star, TrendingUp } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const leaderboardData = [
  { rank: 1, name: 'Birmingham', type: 'city', points: 45680, donors: 1240, icon: '🏆' },
  { rank: 2, name: 'Manchester', type: 'city', points: 42150, donors: 1100, icon: '🥈' },
  { rank: 3, name: 'London', type: 'city', points: 38900, donors: 980, icon: '🥉' },
  { rank: 4, name: 'Leeds', type: 'city', points: 35200, donors: 850, icon: '4️⃣' },
  { rank: 5, name: 'Bradford', type: 'city', points: 32100, donors: 720, icon: '5️⃣' },
];

const topDonors = [
  { name: 'Sarah K.', points: 5890, donations: 28, level: 12, rank: 46 },
  { name: 'YOU', points: 5632, donations: 26, level: 12, rank: 47, isUser: true },
  { name: 'David M.', points: 5420, donations: 24, level: 11, rank: 48 },
  { name: 'Aisha R.', points: 5380, donations: 21, level: 10, rank: 49 },
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
    case 2: return <Medal className="h-6 w-6 text-gray-400" />;
    case 3: return <Medal className="h-6 w-6 text-amber-600" />;
    default: return <Trophy className="h-5 w-5 text-gray-400" />;
  }
};

const getCityRankStyle = (rank: number, isUserCity: boolean = false) => {
  if (isUserCity) {
    return 'bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-lg hover:shadow-xl';
  }
  
  switch (rank) {
    case 1:
      return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 shadow-lg hover:shadow-xl';
    case 2:
      return 'bg-gradient-to-r from-gray-50 to-slate-50 border-2 border-gray-300 shadow-lg hover:shadow-xl';
    case 3:
      return 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-lg hover:shadow-xl';
    default:
      return 'bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-lg';
  }
};

const getPersonalRankStyle = (isUser: boolean = false) => {
  if (isUser) {
    return 'bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 shadow-lg hover:shadow-xl';
  }
  return 'bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-md hover:shadow-lg';
};

const getRankBadge = (rank: number) => {
  switch (rank) {
    case 1:
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-xl shadow-lg">
          <Crown className="h-5 w-5" />
          <span className="font-bold text-lg">#1</span>
        </div>
      );
    case 2:
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-xl shadow-lg">
          <Medal className="h-5 w-5" />
          <span className="font-bold text-lg">#2</span>
        </div>
      );
    case 3:
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow-lg">
          <Medal className="h-5 w-5" />
          <span className="font-bold text-lg">#3</span>
        </div>
      );
    default:
      return (
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-md">
          <span className="font-bold text-lg">#{rank}</span>
        </div>
      );
  }
};

const Leaderboard = () => {
  const userCity = "London";
  const userCityRank = 3;
  
  // User's personal ranking data
  const userRank = 47;
  const userPoints = 5632;
  const userAbove = { name: 'Sarah K.', points: 5890, rank: 46 };
  const userBelow = { name: 'David M.', points: 5420, rank: 48 };
  const pointsToNextRank = userAbove.points - userPoints;
  const progressPercentage = (userPoints / userAbove.points) * 100;

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-3">
            <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30 shadow-lg">
              <Trophy className="h-6 w-6 text-yellow-300" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">City Leaderboards</h3>
          <p className="text-white/90">See how your city ranks in charitable giving</p>
        </div>
      </Card>

      {/* User's City Highlight */}
      <Card className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-xl rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <Target className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-lg font-bold mb-1">Your City: {userCity}</h4>
              <div className="flex items-center space-x-3 text-emerald-100 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Rank</span>
                  <span className="font-bold">#{userCityRank}</span>
                </div>
                <div className="w-px h-3 bg-white/30"></div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span className="font-medium">980 donors</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-white">38,900</div>
            <div className="text-xs text-emerald-100 font-medium">points</div>
          </div>
        </div>
        <div className="mt-2 p-2 bg-white/10 rounded-lg backdrop-blur-sm">
          <p className="text-xs text-center font-medium text-white">
            🚀 Help {userCity} beat Manchester! 3,250 points needed
          </p>
        </div>
      </Card>

      {/* Tabbed Leaderboards */}
      <Card className="p-0 bg-white shadow-xl border-0 rounded-xl overflow-hidden">
        <Tabs defaultValue="cities" className="w-full">
          <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="cities" className="text-xs">
                <MapPin className="h-3 w-3 mr-1" />
                Cities
              </TabsTrigger>
              <TabsTrigger value="personal" className="text-xs">
                <Star className="h-3 w-3 mr-1" />
                Your League
              </TabsTrigger>
              <TabsTrigger value="around" className="text-xs">
                <Users className="h-3 w-3 mr-1" />
                Around You
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-4">
            {/* Cities Tab */}
            <TabsContent value="cities" className="mt-0 space-y-3">
              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                <Trophy className="h-5 w-5 text-yellow-500" />
                City Rankings
              </h4>
              {leaderboardData.map((item) => {
                const isUserCity = item.name === userCity;
                return (
                  <Card 
                    key={item.rank} 
                    className={`p-4 transition-all duration-300 hover:scale-[1.01] rounded-xl ${getCityRankStyle(item.rank, isUserCity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {getRankBadge(item.rank)}
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`font-bold text-lg ${isUserCity ? 'text-emerald-800' : 'text-gray-800'}`}>
                              {item.name}
                            </span>
                            {isUserCity && (
                              <Badge className="bg-emerald-500 text-white font-bold px-2 py-0.5 text-xs">
                                YOUR CITY
                              </Badge>
                            )}
                            <MapPin className="h-4 w-4 text-emerald-500" />
                          </div>
                          <div className="flex items-center text-xs text-gray-600 font-medium">
                            <Users className="h-3 w-3 mr-1" />
                            {item.donors.toLocaleString()} donors
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xl font-bold mb-1 ${isUserCity ? 'text-emerald-600' : 'text-gray-800'}`}>
                          {item.points.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">POINTS</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </TabsContent>

            {/* Personal League Tab */}
            <TabsContent value="personal" className="mt-0 space-y-3">
              <h4 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                <Star className="h-5 w-5 text-purple-500" />
                Your League Position
              </h4>
              
              <div className="relative space-y-2">
                {/* Player Above */}
                <Card className="p-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-md rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-md">
                        <span className="font-bold text-sm">#{userAbove.rank}</span>
                      </div>
                      <Avatar className="h-8 w-8 ring-2 ring-gray-300 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-bold">
                          {userAbove.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-base font-bold text-gray-800">{userAbove.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{userAbove.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 font-semibold">points</div>
                    </div>
                  </div>
                </Card>

                {/* Your Position */}
                <Card className="relative transform scale-105 z-10 p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 shadow-xl rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg">
                        <span className="font-bold text-sm">#{userRank}</span>
                      </div>
                      <Avatar className="h-10 w-10 ring-2 ring-purple-300 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-bold">
                          YOU
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-lg font-bold text-purple-800 mb-1">
                          YOU
                          <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5">
                            YOUR RANK
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-purple-600">{userPoints.toLocaleString()}</div>
                      <div className="text-xs text-purple-700 font-semibold">points</div>
                    </div>
                  </div>
                  
                  {/* Progress to next rank */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-purple-700 font-semibold flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Progress to #{userAbove.rank}
                      </span>
                      <span className="text-purple-600 font-bold">{pointsToNextRank} points needed</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2 bg-purple-100">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300" />
                    </Progress>
                    <div className="text-xs text-purple-600 font-medium text-center">
                      {Math.round(progressPercentage)}% of the way there!
                    </div>
                  </div>
                </Card>

                {/* Player Below */}
                <Card className="p-3 bg-gradient-to-r from-white to-gray-50 border border-gray-200 shadow-md rounded-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center gap-2 px-2 py-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg shadow-md">
                        <span className="font-bold text-sm">#{userBelow.rank}</span>
                      </div>
                      <Avatar className="h-8 w-8 ring-2 ring-gray-300 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs font-bold">
                          {userBelow.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-base font-bold text-gray-800">{userBelow.name}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">{userBelow.points.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 font-semibold">points</div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Around Your Rank Tab */}
            <TabsContent value="around" className="mt-0 space-y-3">
              <h4 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-purple-500" />
                Around Your Rank (#47)
              </h4>
              {topDonors.map((donor, index) => (
                <Card 
                  key={index} 
                  className={`p-4 transition-all duration-300 hover:scale-[1.01] rounded-xl ${getPersonalRankStyle(donor.isUser)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`flex items-center gap-2 px-2 py-1 rounded-lg shadow-md ${donor.isUser ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'}`}>
                        <span className="font-bold text-sm">#{donor.rank}</span>
                      </div>
                      <Avatar className={`h-10 w-10 ring-2 ${donor.isUser ? 'ring-purple-300' : 'ring-gray-300'} shadow-lg`}>
                        <AvatarFallback className={`${donor.isUser ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'} text-xs font-bold`}>
                          {donor.isUser ? 'YOU' : donor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`text-base font-bold mb-1 ${donor.isUser ? 'text-purple-800' : 'text-gray-800'}`}>
                          {donor.name}
                          {donor.isUser && (
                            <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5">
                              YOU
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 font-semibold">Level {donor.level}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className={`text-lg font-bold ${donor.isUser ? 'text-purple-600' : 'text-gray-800'}`}>
                        {donor.points.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600 font-semibold">{donor.donations} donations</div>
                      {donor.isUser && (
                        <div className="text-xs text-purple-600 font-bold flex items-center">
                          <ArrowUp className="h-3 w-3 mr-1" />
                          Beat Sarah K!
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
};

export default Leaderboard;

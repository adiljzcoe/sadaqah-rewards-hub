
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users, ArrowUp, Target, Crown, Star } from 'lucide-react';
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white border-0 shadow-2xl">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30 shadow-lg">
              <Trophy className="h-8 w-8 text-yellow-300" />
            </div>
          </div>
          <h3 className="text-3xl font-bold mb-2">City Leaderboards</h3>
          <p className="text-white/90 text-lg">See how your city ranks in charitable giving</p>
        </div>
      </Card>

      {/* Main Leaderboard Container */}
      <Card className="p-0 bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
        {/* Tabs Header */}
        <div className="p-6 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
          <div className="flex space-x-2">
            <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold px-4 py-2 text-sm shadow-lg">
              <MapPin className="h-4 w-4 mr-2" />
              Cities
            </Badge>
            <Badge className="bg-gray-200 text-gray-600 font-bold px-4 py-2 text-sm opacity-60">
              <Users className="h-4 w-4 mr-2" />
              You vs Others
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* User's City Highlight */}
          <Card className="p-6 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 border-2 border-emerald-200 shadow-lg rounded-2xl">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center">
                <div className="p-2 bg-emerald-100 rounded-xl">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-emerald-800 mb-3">Your City: {userCity}</h4>
                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-1">#{userCityRank}</div>
                    <div className="text-sm text-emerald-700 font-semibold">CITY RANK</div>
                  </div>
                  <div className="w-px h-12 bg-emerald-200"></div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">980</div>
                    <div className="text-sm text-blue-700 font-semibold">ACTIVE DONORS</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-emerald-100/50 rounded-xl">
                  <p className="text-sm text-emerald-800 font-semibold">
                    Help {userCity} beat Manchester! 3,250 points needed 🚀
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* City Leaderboard */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Trophy className="h-6 w-6 text-yellow-500" />
              City Rankings
            </h4>
            <div className="space-y-3">
              {leaderboardData.map((item) => {
                const isUserCity = item.name === userCity;
                return (
                  <Card 
                    key={item.rank} 
                    className={`p-6 transition-all duration-300 hover:scale-[1.02] rounded-2xl ${getCityRankStyle(item.rank, isUserCity)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getRankBadge(item.rank)}
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`font-bold text-xl ${isUserCity ? 'text-emerald-800' : 'text-gray-800'}`}>
                              {item.name}
                            </span>
                            {isUserCity && (
                              <Badge className="bg-emerald-500 text-white font-bold px-3 py-1">
                                YOUR CITY
                              </Badge>
                            )}
                            <MapPin className="h-5 w-5 text-emerald-500" />
                          </div>
                          <div className="flex items-center text-sm text-gray-600 font-medium">
                            <Users className="h-4 w-4 mr-2" />
                            {item.donors.toLocaleString()} donors
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold mb-1 ${isUserCity ? 'text-emerald-600' : 'text-gray-800'}`}>
                          {item.points.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 font-semibold">POINTS</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Personal Ranking Section */}
          <div className="border-t-2 border-gray-100 pt-6">
            <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-purple-500" />
              Around Your Rank (#47)
            </h4>
            <div className="space-y-3">
              {topDonors.map((donor, index) => (
                <Card 
                  key={index} 
                  className={`p-5 transition-all duration-300 hover:scale-[1.02] rounded-2xl ${getPersonalRankStyle(donor.isUser)}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl shadow-md ${donor.isUser ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white'}`}>
                        <span className="font-bold text-lg">#{donor.rank}</span>
                      </div>
                      <Avatar className={`h-12 w-12 ring-2 ${donor.isUser ? 'ring-purple-300' : 'ring-gray-300'} shadow-lg`}>
                        <AvatarFallback className={`${donor.isUser ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700'} text-sm font-bold`}>
                          {donor.isUser ? 'YOU' : donor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`text-lg font-bold mb-1 ${donor.isUser ? 'text-purple-800' : 'text-gray-800'}`}>
                          {donor.name}
                          {donor.isUser && (
                            <Badge className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1">
                              YOU
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 font-semibold">Level {donor.level}</div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className={`text-xl font-bold ${donor.isUser ? 'text-purple-600' : 'text-gray-800'}`}>
                        {donor.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600 font-semibold">{donor.donations} donations</div>
                      {donor.isUser && (
                        <div className="text-sm text-purple-600 font-bold flex items-center">
                          <ArrowUp className="h-4 w-4 mr-1" />
                          Beat Sarah K!
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer Stats */}
          <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-2xl text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-xl">
                <Trophy className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-lg font-bold text-orange-700 mb-1">
              🔥 Weekly reset in 3 days 🔥
            </p>
            <p className="text-sm text-orange-600">
              Final chance to improve your ranking!
            </p>
          </Card>
        </div>
      </Card>
    </div>
  );
};

export default Leaderboard;

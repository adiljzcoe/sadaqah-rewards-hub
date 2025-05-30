
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users, ArrowUp, Target } from 'lucide-react';
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

const getRankBadgeClass = (rank: number) => {
  if (rank === 1) return 'rank-badge first';
  if (rank === 2) return 'rank-badge second';
  if (rank === 3) return 'rank-badge third';
  return 'rank-badge';
};

const Leaderboard = () => {
  const userCity = "London";
  const userCityRank = 3;

  return (
    <Card className="p-6 game-card">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <GoldCoin3D size={32} className="mr-3">
            <Trophy className="h-4 w-4 text-amber-900" />
          </GoldCoin3D>
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Leaderboards
          </span>
        </h3>
        <div className="flex space-x-2">
          <Badge className="gel-button bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold">
            🏙️ Cities
          </Badge>
          <Badge className="gel-button bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold opacity-60">
            👥 You vs Others
          </Badge>
        </div>
      </div>

      {/* User's City Highlight */}
      <div className="game-card p-4 mb-4 bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-emerald-200">
        <div className="text-center">
          <h4 className="font-bold text-emerald-700 mb-2 flex items-center justify-center">
            <Target className="h-4 w-4 mr-1" />
            Your City: {userCity}
          </h4>
          <div className="flex items-center justify-center space-x-4">
            <div>
              <div className="text-2xl font-bold text-emerald-600">#{userCityRank}</div>
              <div className="text-xs text-gray-600 font-semibold">CITY RANK</div>
            </div>
            <div className="text-gray-400">•</div>
            <div>
              <div className="text-lg font-bold text-blue-600">980</div>
              <div className="text-xs text-gray-600 font-semibold">ACTIVE DONORS</div>
            </div>
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-2">
            Help {userCity} beat Manchester! 3,250 points needed 🚀
          </p>
        </div>
      </div>

      {/* City Leaderboard */}
      <div className="space-y-3 mb-6">
        {leaderboardData.map((item) => (
          <div key={item.rank} className={`leaderboard-item ${item.name === userCity ? 'ring-2 ring-emerald-300 bg-emerald-50' : ''}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={getRankBadgeClass(item.rank)}>
                  {item.rank}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-lg ${item.name === userCity ? 'text-emerald-700' : 'text-gray-800'}`}>
                      {item.name}
                      {item.name === userCity && <span className="text-sm ml-1">(Your City!)</span>}
                    </span>
                    <MapPin className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    {item.donors.toLocaleString()} donors
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="jannah-counter text-xl px-4 py-2">
                  {item.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-semibold">POINTS</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Ranking Section */}
      <div className="border-t-2 border-gradient-to-r from-purple-200 to-pink-200 pt-4">
        <h4 className="font-bold text-gray-700 mb-4 flex items-center">
          <div className="gold-coin w-6 h-6 flex items-center justify-center mr-2">
            <Medal className="h-3 w-3 text-amber-900" />
          </div>
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Around Your Rank (#47)
          </span>
        </h4>
        <div className="space-y-3">
          {topDonors.map((donor, index) => (
            <div key={index} className={`leaderboard-item ${donor.isUser ? 'ring-2 ring-purple-300 bg-gradient-to-r from-purple-50 to-pink-50' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${getRankBadgeClass(donor.rank)} ${donor.isUser ? 'animate-pulse' : ''}`}>
                    {donor.rank}
                  </div>
                  <Avatar className={`h-10 w-10 ring-2 ${donor.isUser ? 'ring-purple-300' : 'ring-emerald-200'}`}>
                    <AvatarFallback className={`${donor.isUser ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : 'bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700'} text-sm font-bold`}>
                      {donor.isUser ? 'YOU' : donor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className={`text-sm font-bold ${donor.isUser ? 'text-purple-700' : 'text-gray-800'}`}>
                      {donor.name}
                      {donor.isUser && (
                        <Badge className="ml-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          YOU
                        </Badge>
                      )}
                    </div>
                    <div className="text-xs text-gray-600 font-semibold">Level {donor.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-black ${donor.isUser ? 'text-purple-600' : 'text-gray-600'}`}>
                    {donor.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">{donor.donations} donations</div>
                  {donor.isUser && (
                    <div className="text-xs text-purple-600 font-bold flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      Beat Sarah K!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center game-card p-3">
        <p className="text-sm font-bold text-orange-600">
          🔥 Weekly reset in 3 days 🔥
        </p>
      </div>
    </Card>
  );
};

export default Leaderboard;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users, Zap, Target } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const leaderboardData = [
  { rank: 1, name: 'Birmingham', type: 'city', points: 45680, donors: 1240, icon: '🏆', status: 'VICTORY ROYALE' },
  { rank: 2, name: 'Manchester', type: 'city', points: 42150, donors: 1100, icon: '🥈', status: 'TOP 5' },
  { rank: 3, name: 'London', type: 'city', points: 38900, donors: 980, icon: '🥉', status: 'TOP 10' },
  { rank: 4, name: 'Leeds', type: 'city', points: 35200, donors: 850, icon: '4️⃣', status: 'ELIMINATED' },
  { rank: 5, name: 'Bradford', type: 'city', points: 32100, donors: 720, icon: '5️⃣', status: 'ELIMINATED' },
];

const topDonors = [
  { name: 'Ahmad M.', points: 5632, donations: 28, level: 12, status: 'LEGENDARY' },
  { name: 'Fatima S.', points: 4890, donations: 24, level: 11, status: 'EPIC' },
  { name: 'Mohammed K.', points: 4200, donations: 21, level: 10, status: 'RARE' },
];

const getRankBadgeClass = (rank: number) => {
  if (rank === 1) return 'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 border-4 border-yellow-300 animate-rainbow';
  if (rank === 2) return 'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl bg-gradient-to-r from-gray-400 to-gray-600 border-4 border-gray-300';
  if (rank === 3) return 'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl bg-gradient-to-r from-orange-600 to-yellow-700 border-4 border-orange-400';
  return 'w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 border-4 border-purple-400';
};

const getStatusColor = (status: string) => {
  if (status === 'VICTORY ROYALE') return 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white';
  if (status === 'TOP 5') return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white';
  if (status === 'TOP 10') return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
  if (status === 'LEGENDARY') return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
  if (status === 'EPIC') return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white';
  if (status === 'RARE') return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white';
  return 'bg-gradient-to-r from-gray-600 to-gray-700 text-white';
};

const Leaderboard = () => {
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-4 border-cyan-400 shadow-2xl backdrop-blur-sm">
      <div className="mb-6">
        <h3 className="text-2xl font-black mb-4 flex items-center">
          <GoldCoin3D size={40} className="mr-3">
            <Trophy className="h-5 w-5 text-amber-900" />
          </GoldCoin3D>
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            🏆 BATTLE LEADERBOARDS 🏆
          </span>
        </h3>
        <div className="flex space-x-2">
          <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black px-4 py-2 text-lg border-2 border-cyan-300 shadow-xl">
            🏙️ CITY SQUADS
          </Badge>
          <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-black px-4 py-2 text-lg border-2 border-purple-300 shadow-xl opacity-60">
            🕌 MOSQUE TEAMS
          </Badge>
          <Badge className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-black px-4 py-2 text-lg border-2 border-orange-300 shadow-xl opacity-60">
            👥 SOLO WARRIORS
          </Badge>
        </div>
      </div>

      {/* City Battle Royale Leaderboard */}
      <div className="space-y-4 mb-8">
        {leaderboardData.map((item) => (
          <div key={item.rank} className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-2xl p-4 border-2 border-cyan-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={getRankBadgeClass(item.rank)}>
                  {item.rank}
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-black text-cyan-100 text-xl">{item.name}</span>
                    <MapPin className="h-5 w-5 text-cyan-400 animate-bounce-in" />
                    <Badge className={`${getStatusColor(item.status)} font-black px-3 py-1 text-sm border-2 border-white/30`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-cyan-300 font-bold">
                    <Users className="h-4 w-4 mr-2" />
                    {item.donors.toLocaleString()} active warriors
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white font-black text-2xl px-6 py-3 rounded-xl border-4 border-yellow-300 shadow-xl">
                  {item.points.toLocaleString()}
                </div>
                <div className="text-sm text-cyan-300 font-black mt-1">V-BUCKS</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Elite Warriors Section */}
      <div className="border-t-4 border-gradient-to-r from-cyan-400 to-purple-400 pt-6">
        <h4 className="font-black text-cyan-100 mb-6 flex items-center text-xl">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mr-3 border-2 border-pink-300 shadow-xl">
            <Medal className="h-4 w-4 text-white" />
          </div>
          <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ⚡ ELITE WARRIORS THIS WEEK ⚡
          </span>
        </h4>
        <div className="space-y-4">
          {topDonors.map((donor, index) => (
            <div key={index} className="bg-gradient-to-r from-pink-600/30 to-purple-600/30 rounded-2xl p-4 border-2 border-pink-400 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={getRankBadgeClass(index + 1)}>
                    {index + 1}
                  </div>
                  <Avatar className="h-12 w-12 ring-4 ring-cyan-400 shadow-xl">
                    <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-black">
                      {donor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-lg font-black text-cyan-100 mb-1">{donor.name}</div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getStatusColor(donor.status)} font-black px-2 py-1 text-xs border-2 border-white/30`}>
                        {donor.status}
                      </Badge>
                      <span className="text-sm text-cyan-300 font-bold">LVL {donor.level}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-black text-purple-200">
                    {donor.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-purple-300 font-bold">{donor.donations} victories</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center bg-gradient-to-r from-orange-600/40 to-red-600/40 rounded-2xl p-4 border-4 border-orange-400 backdrop-blur-sm">
        <p className="text-xl font-black text-orange-200">
          ⚡ STORM CLOSES IN 3 DAYS ⚡
        </p>
        <p className="text-lg font-bold text-orange-300 mt-1">
          🏆 SEASON REWARDS INCOMING! 🏆
        </p>
      </div>
    </Card>
  );
};

export default Leaderboard;

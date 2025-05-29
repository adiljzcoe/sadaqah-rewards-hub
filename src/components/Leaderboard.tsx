import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

const leaderboardData = [
  { rank: 1, name: 'Birmingham', type: 'city', points: 45680, donors: 1240, icon: '🏆' },
  { rank: 2, name: 'Manchester', type: 'city', points: 42150, donors: 1100, icon: '🥈' },
  { rank: 3, name: 'London', type: 'city', points: 38900, donors: 980, icon: '🥉' },
  { rank: 4, name: 'Leeds', type: 'city', points: 35200, donors: 850, icon: '4️⃣' },
  { rank: 5, name: 'Bradford', type: 'city', points: 32100, donors: 720, icon: '5️⃣' },
];

const topDonors = [
  { name: 'Ahmad M.', points: 5632, donations: 28, level: 12 },
  { name: 'Fatima S.', points: 4890, donations: 24, level: 11 },
  { name: 'Mohammed K.', points: 4200, donations: 21, level: 10 },
];

const getRankBadgeClass = (rank: number) => {
  if (rank === 1) return 'rank-badge first';
  if (rank === 2) return 'rank-badge second';
  if (rank === 3) return 'rank-badge third';
  return 'rank-badge';
};

const Leaderboard = () => {
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
            🕌 Mosques
          </Badge>
          <Badge className="gel-button bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold opacity-60">
            👥 Donors
          </Badge>
        </div>
      </div>

      {/* City Leaderboard */}
      <div className="space-y-3 mb-6">
        {leaderboardData.map((item) => (
          <div key={item.rank} className="leaderboard-item">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={getRankBadgeClass(item.rank)}>
                  {item.rank}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-800 text-lg">{item.name}</span>
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

      {/* Top Individual Donors */}
      <div className="border-t-2 border-gradient-to-r from-emerald-200 to-blue-200 pt-4">
        <h4 className="font-bold text-gray-700 mb-4 flex items-center">
          <div className="gold-coin w-6 h-6 flex items-center justify-center mr-2">
            <Medal className="h-3 w-3 text-amber-900" />
          </div>
          <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Top Donors This Week
          </span>
        </h4>
        <div className="space-y-3">
          {topDonors.map((donor, index) => (
            <div key={index} className="leaderboard-item">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={getRankBadgeClass(index + 1)}>
                    {index + 1}
                  </div>
                  <Avatar className="h-10 w-10 ring-2 ring-emerald-200">
                    <AvatarFallback className="bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 text-sm font-bold">
                      {donor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-bold text-gray-800">{donor.name}</div>
                    <div className="text-xs text-gray-600 font-semibold">Level {donor.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-purple-600">
                    {donor.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold">{donor.donations} donations</div>
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

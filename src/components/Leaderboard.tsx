
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, MapPin, Users } from 'lucide-react';

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

const Leaderboard = () => {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Trophy className="h-5 w-5 mr-2 text-sadaqah-gold-600" />
          Leaderboards
        </h3>
        <div className="flex space-x-2">
          <Badge className="bg-islamic-green-100 text-islamic-green-800 hover:bg-islamic-green-200">
            Cities
          </Badge>
          <Badge variant="outline">
            Mosques
          </Badge>
          <Badge variant="outline">
            Donors
          </Badge>
        </div>
      </div>

      {/* City Leaderboard */}
      <div className="space-y-3 mb-6">
        {leaderboardData.map((item) => (
          <div key={item.rank} className="flex items-center justify-between p-3 bg-gradient-to-r from-islamic-green-50 to-transparent rounded-lg border border-islamic-green-100">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{item.icon}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-islamic-green-800">{item.name}</span>
                  <MapPin className="h-3 w-3 text-gray-400" />
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Users className="h-3 w-3 mr-1" />
                  {item.donors.toLocaleString()} donors
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sadaqah-gold-600">
                {item.points.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Individual Donors */}
      <div className="border-t pt-4">
        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
          <Medal className="h-4 w-4 mr-2 text-sadaqah-gold-500" />
          Top Donors This Week
        </h4>
        <div className="space-y-2">
          {topDonors.map((donor, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-islamic-green-100 text-islamic-green-700 text-xs">
                    {donor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{donor.name}</div>
                  <div className="text-xs text-gray-500">Level {donor.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-sadaqah-gold-600">
                  {donor.points.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">{donor.donations} donations</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          🔥 Weekly reset in 3 days
        </p>
      </div>
    </Card>
  );
};

export default Leaderboard;

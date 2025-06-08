
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Crown, Medal } from 'lucide-react';

export const Leaderboard = () => {
  const leaders = [
    { rank: 1, name: 'London Muslim Community', points: 15420, donations: 847 },
    { rank: 2, name: 'Birmingham Islamic Centre', points: 12890, donations: 623 },
    { rank: 3, name: 'Manchester Masjid', points: 11230, donations: 589 },
    { rank: 4, name: 'Edinburgh Muslim Society', points: 9840, donations: 456 },
    { rank: 5, name: 'Leeds Islamic Foundation', points: 8910, donations: 412 }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Trophy className="h-5 w-5 text-gray-400" />;
      case 3: return <Medal className="h-5 w-5 text-orange-500" />;
      default: return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold">{rank}</div>;
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Community Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaders.map((leader) => (
            <div key={leader.rank} className="flex items-center gap-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white">
              {getRankIcon(leader.rank)}
              <Avatar>
                <AvatarFallback>{leader.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold">{leader.name}</h4>
                <p className="text-sm text-gray-600">{leader.donations} donations</p>
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700">
                {leader.points.toLocaleString()} pts
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

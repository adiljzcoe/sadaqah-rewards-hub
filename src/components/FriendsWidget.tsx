
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserPlus, Trophy, Flame, Crown, Target } from 'lucide-react';

const FriendsWidget = () => {
  const [friends] = useState([
    { name: 'Sarah K.', level: 15, streak: 12, tier: 'gold', avatar: 'SK', status: 'donated today', rank: 46 },
    { name: 'Ahmed R.', level: 11, streak: 5, tier: 'silver', avatar: 'AR', status: '2 days ago', rank: 52 },
    { name: 'Fatima M.', level: 18, streak: 25, tier: 'platinum', avatar: 'FM', status: 'donated today', rank: 23 },
    { name: 'Omar S.', level: 8, streak: 0, tier: 'bronze', avatar: 'OS', status: '1 week ago', rank: 89 },
  ]);

  const userRank = 47;
  const friendsAhead = friends.filter(f => f.rank < userRank).length;
  const friendsBehind = friends.filter(f => f.rank > userRank).length;

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'text-purple-600 bg-purple-100';
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum': return '💎';
      case 'gold': return '🥇';
      case 'silver': return '🥈';
      case 'bronze': return '🥉';
      default: return '⭐';
    }
  };

  return (
    <Card className="p-6 game-card">
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Friends Leaderboard
          </span>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            {friends.length}
          </Badge>
        </h3>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-green-600">{friendsBehind}</div>
            <div className="text-xs text-gray-600 font-semibold">Behind You</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-red-600">{friendsAhead}</div>
            <div className="text-xs text-gray-600 font-semibold">Ahead of You</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{friends.filter(f => f.status === 'donated today').length}</div>
            <div className="text-xs text-gray-600 font-semibold">Active Today</div>
          </div>
        </div>
      </div>

      {/* Friends List */}
      <div className="space-y-3 mb-4">
        {friends.map((friend, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all hover-lift ${
            friend.rank < userRank ? 'border-red-200 bg-red-50' : 
            friend.rank > userRank ? 'border-green-200 bg-green-50' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                friend.rank < userRank ? 'bg-red-100 text-red-700' : 
                friend.rank > userRank ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                #{friend.rank}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-bold">
                  {friend.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{friend.name}</span>
                  <Badge variant="outline" className="text-xs">L{friend.level}</Badge>
                  {friend.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-bold text-orange-600">{friend.streak}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600">{friend.status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold px-2 py-1 rounded-full ${getTierColor(friend.tier)}`}>
                {getTierIcon(friend.tier)} {friend.tier}
              </div>
              {friend.rank < userRank ? (
                <div className="text-xs text-red-600 font-semibold mt-1">
                  Ahead of you
                </div>
              ) : (
                <div className="text-xs text-green-600 font-semibold mt-1">
                  Behind you
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Friends */}
      <div className="text-center space-y-3">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Friends
        </Button>
        
        <div className="game-card p-3 bg-gradient-to-r from-yellow-100 to-orange-100">
          <p className="text-sm font-bold text-orange-800 mb-2">
            🎁 Invite 3 friends and get bonus rewards!
          </p>
          <div className="text-xs text-orange-700">
            Friends who join also get welcome bonuses
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendsWidget;

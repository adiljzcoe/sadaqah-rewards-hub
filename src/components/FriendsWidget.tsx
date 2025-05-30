import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserPlus, Trophy, Flame, Crown, Target } from 'lucide-react';

const FriendsWidget = () => {
  const [leagueMembers] = useState([
    { name: 'Sarah K.', level: 15, streak: 12, tier: 'gold', avatar: 'SK', status: 'donated today', rank: 46 },
    { name: 'Ahmed R.', level: 11, streak: 5, tier: 'silver', avatar: 'AR', status: '2 days ago', rank: 52 },
    { name: 'Fatima M.', level: 18, streak: 25, tier: 'platinum', avatar: 'FM', status: 'donated today', rank: 23 },
    { name: 'Omar S.', level: 8, streak: 0, tier: 'bronze', avatar: 'OS', status: '1 week ago', rank: 89 },
  ]);

  const userRank = 47;
  const membersAhead = leagueMembers.filter(f => f.rank < userRank).length;
  const membersBehind = leagueMembers.filter(f => f.rank > userRank).length;

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
          <Trophy className="h-5 w-5 text-amber-500" />
          <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Your League
          </span>
          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            Gold League
          </Badge>
        </h3>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-green-600">{membersBehind}</div>
            <div className="text-xs text-gray-600 font-semibold">Behind You</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-red-600">{membersAhead}</div>
            <div className="text-xs text-gray-600 font-semibold">Ahead of You</div>
          </div>
          <div className="game-card p-3 text-center">
            <div className="text-lg font-bold text-blue-600">{leagueMembers.filter(f => f.status === 'donated today').length}</div>
            <div className="text-xs text-gray-600 font-semibold">Active Today</div>
          </div>
        </div>
      </div>

      {/* League Members List */}
      <div className="space-y-3 mb-4">
        {leagueMembers.map((member, index) => (
          <div key={index} className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all hover-lift ${
            member.rank < userRank ? 'border-red-200 bg-red-50' : 
            member.rank > userRank ? 'border-green-200 bg-green-50' : 'border-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                member.rank < userRank ? 'bg-red-100 text-red-700' : 
                member.rank > userRank ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                #{member.rank}
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 text-sm font-bold">
                  {member.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{member.name}</span>
                  <Badge variant="outline" className="text-xs">L{member.level}</Badge>
                  {member.streak > 0 && (
                    <div className="flex items-center gap-1">
                      <Flame className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-bold text-orange-600">{member.streak}</span>
                    </div>
                  )}
                </div>
                <div className="text-xs text-gray-600">{member.status}</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-sm font-bold px-2 py-1 rounded-full ${getTierColor(member.tier)}`}>
                {getTierIcon(member.tier)} {member.tier}
              </div>
              {member.rank < userRank ? (
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

      {/* League Promotion */}
      <div className="text-center space-y-3">
        <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
          <Target className="h-4 w-4 mr-2" />
          View Full League Rankings
        </Button>
        
        <div className="game-card p-3 bg-gradient-to-r from-amber-100 to-orange-100">
          <p className="text-sm font-bold text-orange-800 mb-2">
            🏆 Reach Platinum League for exclusive rewards!
          </p>
          <div className="text-xs text-orange-700">
            Compete with others in your tier
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendsWidget;

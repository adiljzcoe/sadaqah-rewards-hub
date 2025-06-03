
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Users, UserPlus, Trophy, Flame, Crown, Target, TrendingUp, Star, Zap, Award } from 'lucide-react';

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
      case 'platinum': return 'text-slate-700 bg-slate-50 border-slate-200';
      case 'gold': return 'text-amber-800 bg-amber-50 border-amber-200';
      case 'silver': return 'text-gray-700 bg-gray-50 border-gray-200';
      case 'bronze': return 'text-orange-700 bg-orange-50 border-orange-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case 'platinum': return 'from-slate-400 to-slate-600';
      case 'gold': return 'from-amber-400 to-amber-600';
      case 'silver': return 'from-gray-400 to-gray-600';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      {/* Premium Header */}
      <div className="relative p-6 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                <Trophy className="h-4 w-4 text-amber-400" />
              </div>
              League Rankings
            </h3>
            <Badge className="bg-white/10 text-white border-white/20 text-xs font-medium backdrop-blur-sm">
              Gold League
            </Badge>
          </div>
          
          <div className="text-xs text-gray-300 font-medium">
            Your current position in the community
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Elegant Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-gray-900 mb-1">{membersBehind}</div>
            <div className="text-xs text-gray-600 font-medium">Behind You</div>
          </div>
          <div className="text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-gray-900 mb-1">{membersAhead}</div>
            <div className="text-xs text-gray-600 font-medium">To Beat</div>
          </div>
          <div className="text-center p-4 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="text-lg font-bold text-gray-900 mb-1">{leagueMembers.filter(f => f.status === 'donated today').length}</div>
            <div className="text-xs text-gray-600 font-medium">Active Today</div>
          </div>
        </div>

        {/* Premium Member List */}
        <div className="space-y-3 mb-6">
          {leagueMembers.map((member, index) => (
            <div key={index} className="group relative p-4 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {member.rank}
              </div>

              <div className="flex items-center justify-between ml-2">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10 ring-1 ring-gray-200">
                    <AvatarFallback className={`font-semibold text-white bg-gradient-to-r ${getTierGradient(member.tier)}`}>
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">{member.name}</span>
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5 bg-gray-50 text-gray-600 border-gray-200">
                        L{member.level}
                      </Badge>
                      {member.streak > 0 && (
                        <div className="flex items-center gap-1 px-2 py-0.5 bg-orange-50 rounded-md border border-orange-200">
                          <Flame className="h-3 w-3 text-orange-500" />
                          <span className="text-xs font-medium text-orange-700">{member.streak}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{member.status}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-xs font-medium px-2.5 py-1.5 rounded-lg border ${getTierColor(member.tier)}`}>
                    {getTierIcon(member.tier)} {member.tier}
                  </div>
                  {member.rank < userRank ? (
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      Ahead of you
                    </div>
                  ) : (
                    <div className="text-xs text-gray-500 mt-1 font-medium">
                      Behind you
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Actions */}
        <div className="space-y-3">
          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-xl transition-colors duration-200">
            <Trophy className="h-4 w-4 mr-2" />
            View Full Rankings
          </Button>
          
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 border border-gray-200/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Crown className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Unlock Platinum League</div>
                <div className="text-xs text-gray-600">Exclusive rewards await</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-medium">
              Compete with elite donors • Premium benefits • VIP status
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FriendsWidget;

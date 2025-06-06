
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Users, 
  Calendar,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Crown,
  ArrowUp,
  ArrowDown,
  Heart,
  Medal,
  Star
} from 'lucide-react';
import { 
  getSportsStandingsBySport,
  getCharityStandings,
  getTeamsBySport,
  type SportsLeagueStanding,
  type MosqueCharityStanding,
  type MosqueTeam
} from '@/utils/mosqueLeagues';

const MosqueLeagueSystem = () => {
  const [activeTab, setActiveTab] = useState('football');
  
  const footballStandings = getSportsStandingsBySport('football');
  const cricketStandings = getSportsStandingsBySport('cricket');
  const charityStandings = getCharityStandings();
  const footballTeams = getTeamsBySport('football');
  const cricketTeams = getTeamsBySport('cricket');

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPositionBadge = (position: number) => {
    if (position === 1) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
          <Crown className="h-3 w-3 mr-1" />
          #{position}
        </Badge>
      );
    }
    if (position <= 3) {
      return (
        <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white">
          <Medal className="h-3 w-3 mr-1" />
          #{position}
        </Badge>
      );
    }
    return <Badge variant="outline">#{position}</Badge>;
  };

  const SportsLeagueTable = ({ standings, sport }: { standings: SportsLeagueStanding[], sport: string }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-orange-500" />
          {sport === 'football' ? '⚽ Football' : '🏏 Cricket'} League Table
        </CardTitle>
        <p className="text-sm text-gray-600">
          Free entry • Community competition • Sports performance based
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500 pb-2 border-b">
            <div className="col-span-1">Pos</div>
            <div className="col-span-4">Team</div>
            <div className="col-span-1">MP</div>
            <div className="col-span-1">W</div>
            <div className="col-span-1">D</div>
            <div className="col-span-1">L</div>
            <div className="col-span-1">GD</div>
            <div className="col-span-1">Pts</div>
            <div className="col-span-1">Form</div>
          </div>
          {standings.map((standing, index) => (
            <div key={standing.id} className="grid grid-cols-12 gap-2 items-center py-2 hover:bg-gray-50 rounded">
              <div className="col-span-1">
                {getPositionBadge(index + 1)}
              </div>
              <div className="col-span-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${standing.team?.team_type === 'mosque' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <div>
                    <div className="font-medium text-sm">{standing.team?.team_name}</div>
                    <div className="text-xs text-gray-500">{standing.team?.mosque_name}</div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 text-sm">{standing.matches_played}</div>
              <div className="col-span-1 text-sm text-green-600">{standing.wins}</div>
              <div className="col-span-1 text-sm text-yellow-600">{standing.draws}</div>
              <div className="col-span-1 text-sm text-red-600">{standing.losses}</div>
              <div className="col-span-1 text-sm font-medium">
                {standing.goal_difference > 0 ? '+' : ''}{standing.goal_difference}
              </div>
              <div className="col-span-1 text-sm font-bold">{standing.points}</div>
              <div className="col-span-1 text-xs">
                <span className="font-mono">{standing.form}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const CharityLeagueTable = ({ standings }: { standings: MosqueCharityStanding[] }) => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500" />
          💰 Charity League Table
        </CardTitle>
        <p className="text-sm text-gray-600">
          Fundraising competition • Sports bonuses apply • Making a difference
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {standings.map((standing, index) => (
            <div
              key={standing.id}
              className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
            >
              <div className="flex items-center gap-4">
                {getPositionBadge(index + 1)}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {standing.mosque_name?.charAt(0) || 'M'}
                  </div>
                  <div>
                    <h3 className="font-semibold">{standing.mosque_name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{standing.months_active} months active</span>
                      {standing.sports_bonus_multiplier > 1.0 && (
                        <Badge className="bg-orange-100 text-orange-800 text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          {((standing.sports_bonus_multiplier - 1) * 100).toFixed(0)}% Sports Bonus
                        </Badge>
                      )}
                      {getTrendIcon(standing.trend)}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">
                  £{standing.total_raised.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  £{standing.monthly_raised.toLocaleString()}/month
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{footballTeams.length + cricketTeams.length}</div>
            <div className="text-sm text-gray-600">Active Teams</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{charityStandings.length}</div>
            <div className="text-sm text-gray-600">Participating Mosques</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              £{charityStandings.reduce((sum, s) => sum + s.total_raised, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Raised</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">2024-25</div>
            <div className="text-sm text-gray-600">Current Season</div>
          </CardContent>
        </Card>
      </div>

      {/* Main League Tables */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="football" className="flex items-center gap-2">
            ⚽ Football League
          </TabsTrigger>
          <TabsTrigger value="cricket" className="flex items-center gap-2">
            🏏 Cricket League
          </TabsTrigger>
          <TabsTrigger value="charity" className="flex items-center gap-2">
            💰 Charity League
          </TabsTrigger>
        </TabsList>

        <TabsContent value="football" className="space-y-4">
          <SportsLeagueTable standings={footballStandings} sport="football" />
        </TabsContent>

        <TabsContent value="cricket" className="space-y-4">
          <SportsLeagueTable standings={cricketStandings} sport="cricket" />
        </TabsContent>

        <TabsContent value="charity" className="space-y-4">
          <CharityLeagueTable standings={charityStandings} />
        </TabsContent>
      </Tabs>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            How Mosque Leagues Work
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="font-semibold mb-2">Free Sports Leagues</h3>
              <p className="text-sm text-gray-600">
                Register your mosque/madrassah teams for football and cricket. 
                Completely free entry with traditional league tables based on match results.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="font-semibold mb-2">Charity Competition</h3>
              <p className="text-sm text-gray-600">
                Separate charity league based on fundraising. Compete to see which 
                mosque/madrassah can raise the most for good causes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="font-semibold mb-2">Sports Bonuses</h3>
              <p className="text-sm text-gray-600">
                Success in sports leagues gives bonus multipliers to charity fundraising. 
                League winners get up to 20% extra impact on donations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MosqueLeagueSystem;

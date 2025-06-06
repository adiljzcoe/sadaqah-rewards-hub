
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Crown, 
  ArrowUp, 
  ArrowDown,
  Minus,
  Building2,
  Coins,
  Users,
  Star,
  AlertTriangle
} from 'lucide-react';
import { 
  businessLeagues, 
  getLeagueStandings, 
  getAllStandingsByLeague,
  calculatePromotion,
  calculateRelegation,
  type BusinessLeague,
  type BusinessLeagueStanding
} from '@/utils/businessLeagues';

const BusinessLeagueSystem = () => {
  const [selectedLeague, setSelectedLeague] = useState('premier');
  const allStandings = getAllStandingsByLeague();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'down': return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPositionBadge = (position: number, league: BusinessLeague) => {
    if (position <= 3) {
      return (
        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
          <Trophy className="h-3 w-3 mr-1" />
          #{position}
        </Badge>
      );
    }
    if (position <= league.maxBusinesses * 0.25) {
      return <Badge className="bg-green-500 text-white">#{position}</Badge>;
    }
    if (position >= league.maxBusinesses * 0.75) {
      return <Badge className="bg-red-500 text-white">#{position}</Badge>;
    }
    return <Badge variant="outline">#{position}</Badge>;
  };

  const LeagueOverview = ({ league }: { league: BusinessLeague }) => {
    const standings = getLeagueStandings(league.id);
    const topPerformer = standings[0];
    const totalDonations = standings.reduce((sum, s) => sum + s.monthlyDonations, 0);

    return (
      <div className="space-y-6">
        {/* League Header */}
        <div className={`p-6 rounded-xl bg-gradient-to-r ${league.color} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{league.icon}</span>
                <h2 className="text-2xl font-bold">{league.name}</h2>
                <Badge className="bg-white/20 text-white">
                  Tier {league.tier}
                </Badge>
              </div>
              <p className="text-white/90 mb-3">{league.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4" />
                  £{league.monthlyFee}/month
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {standings.length}/{league.maxBusinesses} businesses
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  £{totalDonations.toLocaleString()} monthly donations
                </div>
              </div>
            </div>
            <div className="text-right">
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                Join League
              </Button>
            </div>
          </div>
        </div>

        {/* League Benefits */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              League Benefits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {league.benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${league.color}`}></div>
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Performer Spotlight */}
        {topPerformer && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" />
                League Leader
            </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                    #1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{topPerformer.businessName}</h3>
                    <p className="text-sm text-gray-600">
                      {topPerformer.monthsInLeague} months in {league.name}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600">
                    £{topPerformer.monthlyDonations.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">This month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* League Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              League Table
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {standings.map((standing) => (
                <div
                  key={standing.businessId}
                  className={`flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-gray-50 ${
                    standing.promotionEligible ? 'border-green-200 bg-green-50' :
                    standing.relegationRisk ? 'border-red-200 bg-red-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {getPositionBadge(standing.position, league)}
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">{standing.businessName}</span>
                    </div>
                    {getTrendIcon(standing.trend)}
                    {standing.promotionEligible && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        Promotion Zone
                      </Badge>
                    )}
                    {standing.relegationRisk && (
                      <Badge className="bg-red-100 text-red-800 text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Relegation Risk
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-right">
                      <div className="font-bold">£{standing.monthlyDonations.toLocaleString()}</div>
                      <div className="text-gray-500">This month</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">£{standing.totalDonations.toLocaleString()}</div>
                      <div className="text-gray-500">Total donated</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{standing.monthsInLeague}</div>
                      <div className="text-gray-500">Months</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* League System Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Business Charity Leagues
          </CardTitle>
          <p className="text-gray-600">
            Inspired by English football, businesses compete in tiered leagues based on charitable giving. 
            Monthly subscriptions grant league entry, while donation amounts determine table position.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {businessLeagues.map((league) => {
              const standings = getLeagueStandings(league.id);
              const totalDonations = standings.reduce((sum, s) => sum + s.monthlyDonations, 0);
              
              return (
                <Card 
                  key={league.id} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedLeague === league.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedLeague(league.id)}
                >
                  <CardContent className="p-4">
                    <div className={`w-full h-2 bg-gradient-to-r ${league.color} rounded-full mb-3`}></div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{league.icon}</span>
                      <h3 className="font-semibold">{league.name}</h3>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>£{league.monthlyFee}/month</div>
                      <div>{standings.length}/{league.maxBusinesses} teams</div>
                      <div className="font-medium text-green-600">
                        £{totalDonations.toLocaleString()} monthly
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* League Details */}
      <Tabs value={selectedLeague} onValueChange={setSelectedLeague}>
        <TabsList className="grid w-full grid-cols-4">
          {businessLeagues.map((league) => (
            <TabsTrigger key={league.id} value={league.id} className="flex items-center gap-2">
              <span>{league.icon}</span>
              <span className="hidden sm:inline">{league.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {businessLeagues.map((league) => (
          <TabsContent key={league.id} value={league.id}>
            <LeagueOverview league={league} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BusinessLeagueSystem;

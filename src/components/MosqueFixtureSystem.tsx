
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Trophy,
  RefreshCw,
  Play,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { 
  generateRoundRobinFixtures,
  getUpcomingFixtures,
  getCompletedFixtures,
  getTeamsBySport,
  getAllRounds,
  getFixturesByRound,
  type SportsMatch,
  type MosqueTeam
} from '@/utils/mosqueLeagues';

const MosqueFixtureSystem = () => {
  const [selectedSport, setSelectedSport] = useState<'football' | 'cricket'>('football');
  const [selectedRound, setSelectedRound] = useState<number>(1);
  const [fixturesGenerated, setFixturesGenerated] = useState(false);

  const footballTeams = getTeamsBySport('football');
  const cricketTeams = getTeamsBySport('cricket');
  const currentTeams = selectedSport === 'football' ? footballTeams : cricketTeams;
  
  const upcomingFixtures = getUpcomingFixtures(selectedSport, 8);
  const completedFixtures = getCompletedFixtures(selectedSport, 8);
  const allRounds = getAllRounds(selectedSport);
  const roundFixtures = getFixturesByRound(selectedSport, selectedRound);

  const generateFixtures = () => {
    console.log(`Generating fixtures for ${selectedSport} league with ${currentTeams.length} teams`);
    setFixturesGenerated(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="text-blue-600"><Clock className="h-3 w-3 mr-1" />Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      case 'postponed':
        return <Badge className="bg-orange-500"><RefreshCw className="h-3 w-3 mr-1" />Postponed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-UK', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short' 
      }),
      time: date.toLocaleTimeString('en-UK', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const MatchCard = ({ match }: { match: SportsMatch }) => {
    const matchTime = formatMatchDate(match.match_date);
    
    return (
      <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-600">
            Round {match.round_number} • {matchTime.date}
          </div>
          {getStatusBadge(match.match_status)}
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="text-right flex-1">
              <div className="font-semibold">{match.home_team?.team_name}</div>
              <div className="text-xs text-gray-500">{match.home_team?.mosque_name}</div>
            </div>
            <div className="flex items-center gap-2 px-3">
              {match.match_status === 'completed' && match.home_score !== undefined ? (
                <div className="text-lg font-bold">
                  {match.home_score} - {match.away_score}
                </div>
              ) : (
                <div className="text-gray-400">vs</div>
              )}
            </div>
            <div className="text-left flex-1">
              <div className="font-semibold">{match.away_team?.team_name}</div>
              <div className="text-xs text-gray-500">{match.away_team?.mosque_name}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {match.venue || 'Venue TBD'}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {matchTime.time}
          </div>
        </div>
        
        {match.charity_raised > 0 && (
          <div className="mt-2 text-sm text-green-600">
            💰 £{match.charity_raised.toLocaleString()} raised for charity
          </div>
        )}
      </div>
    );
  };

  const LeagueOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent className="p-4 text-center">
          <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{currentTeams.length}</div>
          <div className="text-sm text-gray-600">Teams Registered</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <Calendar className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{allRounds.length}</div>
          <div className="text-sm text-gray-600">Fixture Rounds</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 text-center">
          <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{currentTeams.length * (currentTeams.length - 1)}</div>
          <div className="text-sm text-gray-600">Total Matches</div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Sport Selection */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">National League Fixtures</h2>
          <p className="text-gray-600">Round-robin tournament where every team plays every other team</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Tabs value={selectedSport} onValueChange={(value) => setSelectedSport(value as 'football' | 'cricket')}>
            <TabsList>
              <TabsTrigger value="football">⚽ Football</TabsTrigger>
              <TabsTrigger value="cricket">🏏 Cricket</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button onClick={generateFixtures} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Generate Fixtures
          </Button>
        </div>
      </div>

      <LeagueOverview />

      {/* Main Fixture Tabs */}
      <Tabs defaultValue="upcoming">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
          <TabsTrigger value="completed">Recent Results</TabsTrigger>
          <TabsTrigger value="rounds">Fixture Rounds</TabsTrigger>
          <TabsTrigger value="teams">Teams</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-green-500" />
                Next {selectedSport === 'football' ? 'Football' : 'Cricket'} Fixtures
              </CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingFixtures.length > 0 ? (
                <div className="space-y-4">
                  {upcomingFixtures.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming fixtures scheduled</p>
                  <p className="text-sm">Click "Generate Fixtures" to create the league schedule</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedFixtures.length > 0 ? (
                <div className="space-y-4">
                  {completedFixtures.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No completed matches yet</p>
                  <p className="text-sm">Results will appear here once matches are played</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rounds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-500" />
                Fixture Rounds
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                {allRounds.map((round) => (
                  <Button
                    key={round}
                    variant={selectedRound === round ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedRound(round)}
                  >
                    Round {round}
                  </Button>
                ))}
              </div>
              
              {roundFixtures.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="font-semibold">Round {selectedRound} Fixtures</h3>
                  {roundFixtures.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No fixtures for Round {selectedRound}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-500" />
                Registered Teams
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentTeams.map((team) => (
                  <div key={team.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${team.team_type === 'mosque' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{team.team_name}</h3>
                        <p className="text-sm text-gray-600">{team.mosque_name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {team.team_type}
                          </Badge>
                          {team.home_ground && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {team.home_ground}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MosqueFixtureSystem;

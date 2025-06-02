import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Calendar, Trophy, BookOpen, Play, Pause, Volume2, Plus, Award, Star, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DhikrCommunity = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('live-dhikr');
  const [isPlaying, setIsPlaying] = useState(false);
  const [personalCount, setPersonalCount] = useState(0);
  const [collectiveCount, setCollectiveCount] = useState(47289);
  const [selectedDhikr, setSelectedDhikr] = useState('Subhan Allah');
  const [recentAwards, setRecentAwards] = useState([]);

  // Simulate collective count increasing
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCollectiveCount(prev => prev + Math.floor(Math.random() * 5) + 1);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const dhikrOptions = [
    'Subhan Allah',
    'Alhamdulillah',
    'Allahu Akbar',
    'La ilaha illa Allah',
    'Astaghfirullah',
    'La hawla wa la quwwata illa billah'
  ];

  const dhikrSessions = [
    {
      id: 1,
      title: "Morning Dhikr Circle",
      participants: 47,
      time: "6:00 AM",
      duration: "30 minutes",
      status: "live"
    },
    {
      id: 2,
      title: "Evening Remembrance",
      participants: 23,
      time: "7:30 PM",
      duration: "45 minutes",
      status: "upcoming"
    },
    {
      id: 3,
      title: "Weekend Tasbih",
      participants: 89,
      time: "9:00 AM",
      duration: "1 hour",
      status: "upcoming"
    }
  ];

  const personalStats = {
    totalSessions: 12,
    weeklyStreak: 5,
    favoriteAzkar: "Subhan Allah",
    totalCount: 2847
  };

  const liveParticipants = [
    { name: "Ahmed K.", count: 247, location: "London" },
    { name: "Fatima S.", count: 189, location: "Dubai" },
    { name: "Omar M.", count: 156, location: "Istanbul" },
    { name: "Aisha R.", count: 134, location: "Cairo" },
    { name: "You", count: personalCount, location: "Your Location" }
  ];

  const awards = [
    "Mashallah! Beautiful recitation! 🌟",
    "Barakallahu feek! Keep going! ✨",
    "Subhanallah! Amazing dedication! 🏆",
    "May Allah reward you! 💎",
    "Excellence in remembrance! 🎖️"
  ];

  const handleDhikrClick = () => {
    setPersonalCount(prev => prev + 1);
    
    // Show random award every 10 dhikrs
    if ((personalCount + 1) % 10 === 0) {
      const randomAward = awards[Math.floor(Math.random() * awards.length)];
      setRecentAwards(prev => [randomAward, ...prev.slice(0, 2)]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-green-600" />
            Dhikr Community
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join fellow believers in collective remembrance of Allah. Participate in group dhikr sessions, 
            track your spiritual journey, and strengthen your connection with the community.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-600 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Sessions Joined</p>
                  <p className="text-3xl font-bold">{personalStats.totalSessions}</p>
                </div>
                <Users className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-teal-600 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100">Weekly Streak</p>
                  <p className="text-3xl font-bold">{personalStats.weeklyStreak}</p>
                </div>
                <Calendar className="h-8 w-8 text-teal-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Dhikr</p>
                  <p className="text-3xl font-bold">{personalStats.totalCount}</p>
                </div>
                <Trophy className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100">Favorite</p>
                  <p className="text-lg font-bold">{personalStats.favoriteAzkar}</p>
                </div>
                <Heart className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="live-dhikr" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Live Dhikr
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
            <TabsTrigger value="sessions" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Sessions
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Tracker
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live-dhikr">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Collective Counter */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                    Global Dhikr Counter
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-8">
                    <div className="text-6xl font-bold text-green-700 mb-2 animate-pulse">
                      {collectiveCount.toLocaleString()}
                    </div>
                    <div className="text-green-600 text-lg">Total Community Dhikr Today</div>
                    <div className="text-sm text-gray-500 mt-2">
                      🌍 Live from around the world
                    </div>
                  </div>

                  {/* Dhikr Selection */}
                  <div className="space-y-4">
                    <div className="text-lg font-semibold">Choose Your Dhikr:</div>
                    <div className="grid grid-cols-2 gap-2">
                      {dhikrOptions.map((dhikr) => (
                        <Button
                          key={dhikr}
                          variant={selectedDhikr === dhikr ? "default" : "outline"}
                          onClick={() => setSelectedDhikr(dhikr)}
                          className={selectedDhikr === dhikr ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {dhikr}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Personal Counter */}
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {personalCount}
                    </div>
                    <div className="text-blue-600">Your Count Today</div>
                    
                    <Button
                      size="lg"
                      onClick={handleDhikrClick}
                      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {selectedDhikr}
                    </Button>
                  </div>

                  {/* Awards Display */}
                  {recentAwards.length > 0 && (
                    <div className="space-y-2">
                      {recentAwards.map((award, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 rounded-lg border-2 border-yellow-300 animate-bounce"
                        >
                          <div className="flex items-center gap-2">
                            <Award className="h-5 w-5 text-yellow-600" />
                            <span className="font-semibold text-yellow-800">{award}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Live Participants */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Live Participants
                    <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {liveParticipants.map((participant, index) => (
                    <div 
                      key={index} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        participant.name === 'You' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <div>
                        <div className={`font-medium ${participant.name === 'You' ? 'text-green-700' : ''}`}>
                          {participant.name}
                        </div>
                        <div className="text-xs text-gray-500">{participant.location}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{participant.count}</div>
                        <div className="text-xs text-gray-500">dhikr</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Live Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-green-600" />
                    Live Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dhikrSessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-semibold">{session.title}</h3>
                        <p className="text-sm text-gray-600">{session.time} • {session.duration}</p>
                        <p className="text-sm text-gray-500">{session.participants} participants</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={session.status === 'live' ? 'default' : 'secondary'}
                          className={session.status === 'live' ? 'bg-red-500 animate-pulse' : ''}
                        >
                          {session.status === 'live' ? '🔴 LIVE' : 'Upcoming'}
                        </Badge>
                        <Button size="sm" variant={session.status === 'live' ? 'default' : 'outline'}>
                          {session.status === 'live' ? 'Join' : 'Notify'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Community Leaderboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Weekly Leaderboard
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Ahmed K.", count: 1247, rank: 1 },
                    { name: "Fatima S.", count: 1156, rank: 2 },
                    { name: "Omar M.", count: 987, rank: 3 },
                    { name: "Aisha R.", count: 856, rank: 4 },
                    { name: "You", count: 756, rank: 5 }
                  ].map(user => (
                    <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.name === 'You' ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                        }`}>
                          {user.rank}
                        </span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{user.count} dhikr</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Dhikr Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dhikrSessions.map(session => (
                    <Card key={session.id} className="border-2 hover:border-green-300 transition-colors">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{session.title}</h3>
                        <div className="space-y-2 text-sm text-gray-600">
                          <p>🕐 {session.time}</p>
                          <p>⏱️ {session.duration}</p>
                          <p>👥 {session.participants} joined</p>
                        </div>
                        <Button className="w-full mt-4" variant={session.status === 'live' ? 'default' : 'outline'}>
                          {session.status === 'live' ? 'Join Now' : 'Set Reminder'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracker">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Personal Dhikr Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-48 h-48 mx-auto flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-700">247</div>
                      <div className="text-green-600">Today's Count</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                      {isPlaying ? 'Pause' : 'Start'} Dhikr
                    </Button>
                    <Button size="lg" variant="outline">
                      <Volume2 className="h-5 w-5 mr-2" />
                      Audio Guide
                    </Button>
                  </div>

                  <div className="text-center text-gray-600">
                    <p>Current: <span className="font-semibold text-green-600">Subhan Allah</span></p>
                    <p className="text-sm mt-2">Click the counter or use voice commands to track your dhikr</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DhikrCommunity;

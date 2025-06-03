import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Calendar, Trophy, BookOpen, Play, Pause, Volume2, Plus, Award, Star, Zap, Sparkles, Gift, Target, ArrowUp, Crown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const DhikrCommunity = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('live-dhikr');
  const [isPlaying, setIsPlaying] = useState(false);
  const [personalCount, setPersonalCount] = useState(0);
  const [collectiveCount, setCollectiveCount] = useState(47289);
  const [selectedDhikr, setSelectedDhikr] = useState('Subhan Allah');
  const [recentAwards, setRecentAwards] = useState([]);
  const [jannahPoints, setJannahPoints] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [pointMultiplier, setPointMultiplier] = useState(1);
  const [celebrationText, setCelebrationText] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);
  const [fireworks, setFireworks] = useState([]);

  // Live ranking data
  const [liveRanking, setLiveRanking] = useState([
    { name: "Ahmed K.", points: 12470, rank: 1, location: "London" },
    { name: "Fatima S.", points: 11560, rank: 2, location: "Dubai" },
    { name: "Omar M.", points: 9870, rank: 3, location: "Istanbul" },
    { name: "Aisha R.", points: 8560, rank: 4, location: "Cairo" },
    { name: "You", points: 0, rank: 5, location: "Your Location", isUser: true }
  ]);

  // Update user's ranking based on their points
  useEffect(() => {
    setLiveRanking(prev => {
      const updated = prev.map(participant => 
        participant.isUser 
          ? { ...participant, points: jannahPoints }
          : participant
      );
      
      // Sort by points descending and update ranks
      updated.sort((a, b) => b.points - a.points);
      return updated.map((participant, index) => ({
        ...participant,
        rank: index + 1
      }));
    });
  }, [jannahPoints]);

  const getUserRank = () => {
    const userEntry = liveRanking.find(p => p.isUser);
    return userEntry?.rank || 5;
  };

  const getNextPersonToBeat = () => {
    const userRank = getUserRank();
    if (userRank === 1) return null;
    
    const nextPerson = liveRanking.find(p => p.rank === userRank - 1);
    return nextPerson;
  };

  const getPointsNeededToBeat = () => {
    const nextPerson = getNextPersonToBeat();
    if (!nextPerson) return 0;
    
    return Math.max(0, nextPerson.points - jannahPoints + 1);
  };

  // Simulate collective count increasing automatically (background activity)
  useEffect(() => {
    const interval = setInterval(() => {
      // Random background increase from other users
      if (Math.random() > 0.3) { // 70% chance of background activity
        setCollectiveCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const celebrations = [
    { text: "Subhanallah! Amazing dedication! 🌟", points: 10, color: "from-yellow-500 to-amber-500" },
    { text: "Mashallah! Beautiful remembrance! ✨", points: 15, color: "from-green-500 to-emerald-500" },
    { text: "Barakallahu feek! Keep going! 🎉", points: 20, color: "from-blue-500 to-cyan-500" },
    { text: "Allahu Akbar! Blessed dhikr! 🏆", points: 25, color: "from-purple-500 to-pink-500" },
    { text: "May Allah multiply your rewards! 💎", points: 30, color: "from-indigo-500 to-purple-500" },
    { text: "Your tongue shines with dhikr! 🌙", points: 35, color: "from-teal-500 to-blue-500" },
    { text: "Angels say Ameen to your dhikr! 👼", points: 50, color: "from-rose-500 to-pink-500" }
  ];

  const createFirework = () => {
    const newFirework = {
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 50 + 25,
      color: ['text-yellow-400', 'text-blue-400', 'text-green-400', 'text-purple-400', 'text-pink-400'][Math.floor(Math.random() * 5)]
    };
    setFireworks(prev => [...prev, newFirework]);
    setTimeout(() => {
      setFireworks(prev => prev.filter(f => f.id !== newFirework.id));
    }, 2000);
  };

  const triggerCelebration = () => {
    const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
    setCelebrationText(randomCelebration.text);
    setShowCelebration(true);
    
    // Create multiple fireworks
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createFirework(), i * 200);
    }
    
    // Award bonus points
    setJannahPoints(prev => prev + randomCelebration.points);
    
    setTimeout(() => {
      setShowCelebration(false);
    }, 3000);
  };

  const calculatePointMultiplier = (streak) => {
    if (streak >= 100) return 10;
    if (streak >= 50) return 5;
    if (streak >= 25) return 3;
    if (streak >= 10) return 2;
    return 1;
  };

  const handleDhikrClick = () => {
    // Increase counts
    setPersonalCount(prev => prev + 1);
    setCollectiveCount(prev => prev + 1);
    setStreakCount(prev => prev + 1);
    
    // Calculate multiplier
    const newMultiplier = calculatePointMultiplier(streakCount + 1);
    setPointMultiplier(newMultiplier);
    
    // Base points with multiplier (10x the original)
    const basePoints = 10;
    const totalPoints = basePoints * newMultiplier;
    setJannahPoints(prev => prev + totalPoints);
    
    // Random celebration chance (30% chance)
    if (Math.random() > 0.7) {
      triggerCelebration();
    }
    
    // Special celebrations for milestones
    if ((personalCount + 1) % 50 === 0) {
      triggerCelebration();
      setRecentAwards(prev => [`🎊 ${personalCount + 1} dhikr milestone reached! Keep the blessed momentum!`, ...prev.slice(0, 2)]);
    } else if ((personalCount + 1) % 25 === 0) {
      triggerCelebration();
      setRecentAwards(prev => [`🌟 ${personalCount + 1} dhikr! Your heart shines with remembrance!`, ...prev.slice(0, 2)]);
    } else if ((personalCount + 1) % 10 === 0) {
      const awards = [
        "💫 Mashallah! Beautiful recitation!",
        "✨ Barakallahu feek! Keep going!",
        "🌙 Subhanallah! Amazing dedication!",
        "💎 May Allah reward you abundantly!",
        "🏆 Excellence in remembrance!"
      ];
      const randomAward = awards[Math.floor(Math.random() * awards.length)];
      setRecentAwards(prev => [randomAward, ...prev.slice(0, 2)]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50/30 to-teal-50/20 relative overflow-hidden">
      {/* Fireworks Animation */}
      {fireworks.map(firework => (
        <div
          key={firework.id}
          className={`absolute ${firework.color} animate-ping pointer-events-none z-50`}
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            fontSize: '24px'
          }}
        >
          ✨
        </div>
      ))}

      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white p-8 rounded-3xl shadow-2xl animate-bounce border-4 border-white/50 backdrop-blur-sm">
            <div className="text-2xl font-bold text-center animate-pulse">
              {celebrationText}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="h-10 w-10 text-green-600" />
            Dhikr Community
            {pointMultiplier > 1 && (
              <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                {pointMultiplier}x Points!
              </Badge>
            )}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join fellow believers in collective remembrance of Allah. Earn multiplied Jannah points and celebrate your spiritual journey!
          </p>
        </div>

        {/* Enhanced Stats Cards */}
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

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Streak Count</p>
                  <p className="text-3xl font-bold">{streakCount}</p>
                </div>
                <Zap className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-600 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Today's Dhikr</p>
                  <p className="text-3xl font-bold">{personalCount}</p>
                </div>
                <Trophy className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-600 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100">Jannah Points</p>
                  <p className="text-3xl font-bold">{jannahPoints}</p>
                  {pointMultiplier > 1 && (
                    <p className="text-xs text-yellow-200">{pointMultiplier}x Multiplier!</p>
                  )}
                </div>
                <Star className="h-8 w-8 text-yellow-200" />
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
              {/* Enhanced Collective Counter */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500 animate-pulse" />
                    Global Dhikr Counter
                    {pointMultiplier > 1 && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-bounce">
                        🔥 {pointMultiplier}x BOOST!
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl p-8 relative overflow-hidden">
                    <div className="text-6xl font-bold text-green-700 mb-2 animate-pulse">
                      {collectiveCount.toLocaleString()}
                    </div>
                    <div className="text-green-600 text-lg">Total Community Dhikr Today</div>
                    <div className="text-sm text-gray-500 mt-2">
                      🌍 Live from around the world
                    </div>
                  </div>

                  {/* Live Rank Display */}
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Crown className="h-6 w-6 text-yellow-600" />
                        <span className="text-xl font-bold text-blue-700">
                          Your Live Rank: #{getUserRank()}
                        </span>
                      </div>
                    </div>
                    
                    {getNextPersonToBeat() && (
                      <div className="bg-white/70 rounded-lg p-4 border border-blue-300">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-orange-600" />
                            <span className="font-semibold text-gray-700">
                              To beat {getNextPersonToBeat()?.name}:
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-600">
                              {getPointsNeededToBeat()} points
                            </div>
                            <div className="text-sm text-gray-600">needed</div>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-1 text-sm text-orange-700">
                          <ArrowUp className="h-4 w-4" />
                          <span>
                            They have {getNextPersonToBeat()?.points.toLocaleString()} points
                          </span>
                        </div>
                      </div>
                    )}
                    
                    {getUserRank() === 1 && (
                      <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg p-4 border-2 border-yellow-400">
                        <div className="flex items-center justify-center gap-2">
                          <Crown className="h-6 w-6 text-yellow-600" />
                          <span className="text-lg font-bold text-yellow-800">
                            🎉 You're #1! Keep leading! 🎉
                          </span>
                          <Crown className="h-6 w-6 text-yellow-600" />
                        </div>
                      </div>
                    )}
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

                  {/* Enhanced Personal Counter */}
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl p-6 relative">
                    <div className="text-3xl font-bold text-blue-700 mb-2">
                      {personalCount}
                    </div>
                    <div className="text-blue-600">Your Count Today</div>
                    <div className="flex items-center justify-center gap-4 text-sm mt-2">
                      <span className="text-purple-600">
                        +{jannahPoints} Jannah Points
                      </span>
                      {streakCount > 0 && (
                        <span className="text-orange-600">
                          🔥 {streakCount} streak
                        </span>
                      )}
                    </div>
                    
                    <Button
                      size="lg"
                      onClick={handleDhikrClick}
                      className={`mt-4 px-8 py-3 text-lg transition-all duration-300 ${
                        pointMultiplier > 1 
                          ? 'bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 hover:from-yellow-700 hover:via-orange-700 hover:to-red-700 animate-pulse shadow-lg' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      {selectedDhikr}
                      {pointMultiplier > 1 && (
                        <Sparkles className="h-4 w-4 ml-2" />
                      )}
                    </Button>

                    {/* Multiplier Display */}
                    {pointMultiplier > 1 && (
                      <div className="mt-3 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border border-yellow-300">
                        <div className="flex items-center justify-center gap-2 text-yellow-800">
                          <Gift className="h-5 w-5" />
                          <span className="font-bold text-lg">{pointMultiplier}x Points Multiplier Active!</span>
                        </div>
                        <p className="text-xs text-yellow-700 mt-1">
                          {streakCount >= 100 ? "Ultimate Master! 10x points!" :
                           streakCount >= 50 ? "Dhikr Champion! 5x points!" :
                           streakCount >= 25 ? "Devoted Believer! 3x points!" :
                           streakCount >= 10 ? "Consistent Worshipper! 2x points!" : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Awards Display */}
                  {recentAwards.length > 0 && (
                    <div className="space-y-2">
                      {recentAwards.map((award, index) => (
                        <div 
                          key={index}
                          className="bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 p-4 rounded-xl border-2 border-yellow-300 animate-bounce shadow-lg"
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
                          {participant.name === 'You' && pointMultiplier > 1 && (
                            <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                              {pointMultiplier}x
                            </span>
                          )}
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
                  {liveRanking.map(user => (
                    <div key={user.rank} className={`flex items-center justify-between p-3 rounded-lg ${user.isUser ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank <= 3 ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'
                        }`}>
                          {user.rank}
                        </span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{user.points} points</span>
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

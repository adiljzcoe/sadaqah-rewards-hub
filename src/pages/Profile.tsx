
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, Award, Crown, Edit, Share2, Calendar, MapPin, Mail, Phone, Trophy, Target, Gift, Settings, Sparkles, Moon, BookOpen, Users, Zap, Lock, Eye, TrendingUp, Clock, Flame } from 'lucide-react';
import GoldCoin3D from '@/components/GoldCoin3D';
import ProjectContributions from '@/components/ProjectContributions';
import CommunicationPreferences from '@/components/CommunicationPreferences';
import Header from '@/components/Header';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [epicDonationBadges, setEpicDonationBadges] = useState([]);
  const [achievementsPublic, setAchievementsPublic] = useState(false);
  const isMember = true; // VIP status

  // Load epic donation badges from localStorage
  useEffect(() => {
    const savedBadges = JSON.parse(localStorage.getItem('epicDonationBadges') || '[]');
    setEpicDonationBadges(savedBadges);
  }, []);

  const userStats = {
    level: 12,
    points: 5632,
    coins: 142,
    totalDonations: 28,
    totalAmount: 1240,
    rank: 15,
    city: "London",
    joinDate: "January 2024"
  };

  // Religious achievements and spiritual badges
  const religiousAchievements = [
    { 
      id: 1,
      name: "Salah Guardian", 
      icon: "🕌", 
      description: "Completed 5 daily prayers for 30 consecutive days",
      earned: true,
      earnedDate: "2024-01-15",
      category: "Prayer",
      rarity: "epic",
      jannahPoints: 500,
      gradient: "from-emerald-500 to-green-600"
    },
    { 
      id: 2,
      name: "Quran Companion", 
      icon: "📖", 
      description: "Read 10 pages of Quran daily for 7 days",
      earned: true,
      earnedDate: "2024-01-20",
      category: "Quran",
      rarity: "rare",
      jannahPoints: 300,
      gradient: "from-blue-500 to-indigo-600"
    },
    { 
      id: 3,
      name: "Dhikr Master", 
      icon: "✨", 
      description: "Completed 1000 Dhikr in community events",
      earned: true,
      earnedDate: "2024-01-25",
      category: "Dhikr",
      rarity: "legendary",
      jannahPoints: 750,
      gradient: "from-purple-500 to-pink-600"
    },
    { 
      id: 4,
      name: "Community Helper", 
      icon: "🤝", 
      description: "Checked in at 5 different mosques",
      earned: true,
      earnedDate: "2024-02-01",
      category: "Community",
      rarity: "rare",
      jannahPoints: 400,
      gradient: "from-orange-500 to-red-600"
    },
    { 
      id: 5,
      name: "Night Prayer Warrior", 
      icon: "🌙", 
      description: "Performed Tahajjud prayer for 7 consecutive nights",
      earned: false,
      category: "Prayer",
      rarity: "legendary",
      jannahPoints: 1000,
      gradient: "from-indigo-500 to-purple-600"
    },
    { 
      id: 6,
      name: "Ramadan Champion", 
      icon: "🌟", 
      description: "Complete all Ramadan calendar activities",
      earned: false,
      category: "Seasonal",
      rarity: "legendary",
      jannahPoints: 2000,
      gradient: "from-yellow-500 to-orange-600"
    },
    { 
      id: 7,
      name: "Dua Supporter", 
      icon: "🤲", 
      description: "Said Ameen to 100 community duas",
      earned: true,
      earnedDate: "2024-02-10",
      category: "Community",
      rarity: "common",
      jannahPoints: 150,
      gradient: "from-green-500 to-emerald-600"
    },
    { 
      id: 8,
      name: "Knowledge Seeker", 
      icon: "🎓", 
      description: "Explored 20 different duas in the library",
      earned: false,
      category: "Learning",
      rarity: "rare",
      jannahPoints: 350,
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const earnedBadges = religiousAchievements.filter(achievement => achievement.earned);
  const totalJannahPoints = earnedBadges.reduce((sum, badge) => sum + badge.jannahPoints, 0);

  const getRarityBadge = (rarity) => {
    const rarityStyles = {
      common: { bg: "bg-gray-500", text: "Common" },
      rare: { bg: "bg-blue-500", text: "Rare" },
      epic: { bg: "bg-purple-500", text: "Epic" },
      legendary: { bg: "bg-yellow-500", text: "Legendary" }
    };
    return rarityStyles[rarity] || rarityStyles.common;
  };

  const recentDonations = [
    { id: 1, charity: "Water Wells Foundation", amount: 50, date: "2 days ago", points: 100, impact: "Provided water for 25 people" },
    { id: 2, charity: "Education for All", amount: 25, date: "1 week ago", points: 50, impact: "Sponsored 1 student for a month" },
    { id: 3, charity: "Food Bank Network", amount: 75, date: "2 weeks ago", points: 150, impact: "Fed 30 families" },
    { id: 4, charity: "Medical Aid International", amount: 100, date: "3 weeks ago", points: 200, impact: "Provided medical supplies" },
  ];

  const achievements = [
    { name: "First Donation", icon: "🎯", earned: true, description: "Made your first donation", category: "milestone" },
    { name: "Weekly Warrior", icon: "⚡", earned: true, description: "Donated 5 times in one week", category: "frequency" },
    { name: "Big Heart", icon: "💝", earned: true, description: "Donated over £500 total", category: "amount" },
    { name: "Rising Star", icon: "⭐", earned: false, description: "Reach level 15", category: "progression" },
    { name: "Community Leader", icon: "👑", earned: false, description: "Reach top 10 in your city", category: "social" },
    { name: "Consistency King", icon: "🔥", earned: true, description: "30 day donation streak", category: "streak" },
  ];

  const handleShareAchievements = () => {
    setAchievementsPublic(!achievementsPublic);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Profile Header */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-white via-blue-50/30 to-purple-50/20 border-0 shadow-xl backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <span className="relative z-10 drop-shadow-lg">{userStats.level}</span>
              </div>
              {isMember && (
                <Badge className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white text-sm px-4 py-2 shadow-lg animate-bounce">
                  <Crown className="h-4 w-4 mr-2" />
                  VIP MEMBER
                </Badge>
              )}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1">
                  Level {userStats.level}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-left space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Ahmad M.
                </h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover:scale-105 transition-transform border-2"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              
              <div className="space-y-3">
                <p className="text-xl text-gray-600 font-medium">
                  {isMember ? 'VIP ' : ''}Guardian • #{userStats.rank} in {userStats.city}
                </p>
                
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-gray-600">
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{userStats.city}, UK</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Joined {userStats.joinDate}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-xl">
                    <Mail className="h-4 w-4 text-purple-500" />
                    <span className="font-medium">ahmad.m@example.com</span>
                  </div>
                </div>
              </div>
              
              {/* Progress to next level */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-gray-600">
                  <span>Progress to Level {userStats.level + 1}</span>
                  <span>{userStats.points} / {(userStats.level + 1) * 1000} points</span>
                </div>
                <Progress 
                  value={(userStats.points / ((userStats.level + 1) * 1000)) * 100} 
                  className="h-3 bg-gradient-to-r from-blue-100 to-purple-100"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all px-6 py-3">
                <Share2 className="h-5 w-5 mr-2" />
                Share Profile
              </Button>
              <Button variant="outline" className="border-2 hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </Card>

        {/* Religious Achievements & Jannah Points Section */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-white to-emerald-50/30 border-0 shadow-xl">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold flex items-center gap-4">
                <div className="relative">
                  <Sparkles className="h-10 w-10 text-yellow-500" />
                  <div className="absolute inset-0 animate-pulse">
                    <Sparkles className="h-10 w-10 text-yellow-300" />
                  </div>
                </div>
                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                  Religious Achievements & Spiritual Badges
                </span>
                <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-lg px-6 py-3 shadow-lg">
                  {earnedBadges.length} / {religiousAchievements.length} Earned
                </Badge>
              </h3>
              
              <Button
                onClick={handleShareAchievements}
                variant={achievementsPublic ? "default" : "outline"}
                className={`transition-all duration-300 shadow-lg hover:shadow-xl ${
                  achievementsPublic 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600' 
                    : 'border-2 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {achievementsPublic ? (
                  <>
                    <Eye className="h-5 w-5 mr-2" />
                    Public Achievements
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5 mr-2" />
                    Share My Achievements
                  </>
                )}
              </Button>
            </div>

            {/* Privacy Notice */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-2 border-blue-200/50 shadow-inner">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 rounded-xl">
                  <Lock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-800 mb-2 text-lg">Privacy & Sharing</h4>
                  <p className="text-blue-700 leading-relaxed">
                    Your religious achievements are private and only visible to you. 
                    {achievementsPublic 
                      ? " You've chosen to make your achievements public - other users can now see your spiritual progress."
                      : " Click 'Share My Achievements' if you'd like to make them visible to other users in the community."
                    }
                  </p>
                </div>
              </div>
            </div>
            
            {/* Jannah Points Summary */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-8 border-2 border-emerald-200/50 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-bold text-emerald-800 mb-3">Total Jannah Points from Religious Deeds</h4>
                  <p className="text-emerald-600 text-lg">Points earned through spiritual activities and good deeds</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-emerald-600 mb-2">{totalJannahPoints.toLocaleString()}</div>
                  <div className="text-emerald-500 font-medium">Spiritual Points</div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Categories */}
          <div className="space-y-8">
            {['Prayer', 'Quran', 'Dhikr', 'Community', 'Seasonal', 'Learning'].map(category => {
              const categoryAchievements = religiousAchievements.filter(achievement => achievement.category === category);
              const categoryEarned = categoryAchievements.filter(achievement => achievement.earned).length;
              
              if (categoryAchievements.length === 0) return null;
              
              return (
                <div key={category} className="bg-white rounded-2xl p-8 border-2 border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <h5 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
                      {category === 'Prayer' && <span className="text-3xl">🕌</span>}
                      {category === 'Quran' && <BookOpen className="h-7 w-7 text-blue-500" />}
                      {category === 'Dhikr' && <Zap className="h-7 w-7 text-purple-500" />}
                      {category === 'Community' && <Users className="h-7 w-7 text-orange-500" />}
                      {category === 'Seasonal' && <Moon className="h-7 w-7 text-indigo-500" />}
                      {category === 'Learning' && <span className="text-3xl">🎓</span>}
                      {category} Achievements
                    </h5>
                    <Badge variant="outline" className="text-lg px-4 py-2 border-2">
                      {categoryEarned} / {categoryAchievements.length}
                    </Badge>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryAchievements.map((achievement) => (
                      <div 
                        key={achievement.id} 
                        className={`relative p-6 rounded-2xl border-3 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                          achievement.earned 
                            ? `bg-gradient-to-br ${achievement.gradient} text-white shadow-xl border-transparent transform hover:rotate-1` 
                            : 'bg-gray-50 text-gray-600 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-4xl mb-3">{achievement.icon}</div>
                          {achievement.earned && (
                            <Badge className={`${getRarityBadge(achievement.rarity).bg} text-white shadow-lg`}>
                              {getRarityBadge(achievement.rarity).text}
                            </Badge>
                          )}
                        </div>
                        
                        <h6 className="font-bold text-lg mb-3">{achievement.name}</h6>
                        <p className={`text-sm mb-4 leading-relaxed ${achievement.earned ? 'text-white/90' : 'text-gray-500'}`}>
                          {achievement.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className={`flex items-center gap-2 ${achievement.earned ? 'text-white/80' : 'text-gray-400'}`}>
                            <Star className="h-4 w-4" />
                            <span className="font-medium">{achievement.jannahPoints} points</span>
                          </div>
                          {achievement.earned && achievement.earnedDate && (
                            <div className="text-white/70 font-medium">
                              {new Date(achievement.earnedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        
                        {achievement.earned && (
                          <div className="absolute top-3 right-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Award className="h-4 w-4 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Enhanced Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-xl">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 mb-4 shadow-lg">
              <Star className="h-10 w-10 mx-auto mb-3 text-white drop-shadow-lg" />
              <div className="text-3xl font-bold text-white drop-shadow-lg">{userStats.points.toLocaleString()}</div>
            </div>
            <p className="font-bold text-gray-900 text-lg">Jannah Points</p>
            <p className="text-sm text-gray-600 mt-1">Earned through good deeds</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-yellow-50/50 border-0 shadow-xl">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl p-6 mb-4 shadow-lg">
              <GoldCoin3D size={40} className="mx-auto mb-3 drop-shadow-lg" />
              <div className="text-3xl font-bold text-white drop-shadow-lg">{userStats.coins}</div>
            </div>
            <p className="font-bold text-gray-900 text-lg">Sadaqah Coins</p>
            <p className="text-sm text-gray-600 mt-1">Available to spend</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-red-50/50 border-0 shadow-xl">
            <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl p-6 mb-4 shadow-lg">
              <Heart className="h-10 w-10 mx-auto mb-3 text-white drop-shadow-lg" />
              <div className="text-3xl font-bold text-white drop-shadow-lg">{userStats.totalDonations}</div>
            </div>
            <p className="font-bold text-gray-900 text-lg">Total Donations</p>
            <p className="text-sm text-gray-600 mt-1">Acts of kindness</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-br from-white to-green-50/50 border-0 shadow-xl">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 mb-4 shadow-lg">
              <Trophy className="h-10 w-10 mx-auto mb-3 text-white drop-shadow-lg" />
              <div className="text-3xl font-bold text-white drop-shadow-lg">£{userStats.totalAmount}</div>
            </div>
            <p className="font-bold text-gray-900 text-lg">Amount Donated</p>
            <p className="text-sm text-gray-600 mt-1">Total contribution</p>
          </Card>
        </div>

        {/* Project Contributions Section */}
        <div className="mb-8">
          <ProjectContributions />
        </div>

        {/* Epic Donations Showcase */}
        <Card className="p-8 mb-8 bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-xl">
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
            <div className="p-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-lg">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Epic Donation Badges of Honour
            </span>
            {epicDonationBadges.length > 0 && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg px-6 py-3 shadow-lg">
                {epicDonationBadges.length} earned
              </Badge>
            )}
          </h3>
          
          {epicDonationBadges.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {epicDonationBadges.map((badge) => (
                <div key={badge.id} className={`relative p-8 rounded-2xl bg-gradient-to-br ${badge.color} text-white hover:scale-105 transition-all duration-300 shadow-2xl overflow-hidden`}>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-5xl animate-bounce">{badge.icon}</div>
                      <div className="text-right">
                        <div className="text-3xl font-bold">{badge.count}x</div>
                        <div className="text-sm opacity-80">times</div>
                      </div>
                    </div>
                    <h4 className="font-bold text-2xl mb-3">{badge.title}</h4>
                    <p className="text-base opacity-90 mb-4">{badge.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">£{badge.totalAmount} donated</span>
                      <span className="opacity-80">{badge.lastDonated}</span>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 text-8xl opacity-20">{badge.emoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse"></div>
                  
                  {badge.count >= 5 && (
                    <div className="absolute -top-3 -right-3">
                      <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-lg animate-pulse shadow-lg">
                        👑
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <div className="text-8xl mb-6">🏆</div>
              <h4 className="text-2xl font-bold mb-4 text-gray-700">No Epic Donations Yet</h4>
              <p className="text-gray-600 mb-8 text-lg">Make your first epic donation to earn exclusive badges of honour!</p>
              <div className="flex justify-center gap-6 text-base">
                <div className="flex items-center gap-3 bg-purple-100 px-6 py-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">📦</span>
                  <span className="font-medium">Guardian Angel</span>
                </div>
                <div className="flex items-center gap-3 bg-red-100 px-6 py-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">🏥</span>
                  <span className="font-medium">Life Saver</span>
                </div>
                <div className="flex items-center gap-3 bg-yellow-100 px-6 py-4 rounded-2xl shadow-lg">
                  <span className="text-2xl">🍽️</span>
                  <span className="font-medium">Community Feeder</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="donations" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-lg">
            <TabsTrigger value="donations" className="text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Donation History
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="communication" className="text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Communication
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base font-medium rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations">
            <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-xl">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                Recent Donations
              </h3>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-gray-900 mb-1">{donation.charity}</h4>
                      <p className="text-gray-600 mb-2">{donation.impact}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{donation.date}</span>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="font-bold text-2xl text-emerald-600">£{donation.amount}</div>
                      <div className="flex items-center gap-1 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">+{donation.points} points</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card className="p-8 bg-gradient-to-br from-white to-yellow-50/30 border-0 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                  <Award className="h-6 w-6 text-white" />
                </div>
                Donation Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                    achievement.earned 
                      ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`text-4xl p-3 rounded-2xl ${achievement.earned ? 'bg-white shadow-lg' : 'bg-gray-100'}`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">{achievement.name}</h4>
                        <Badge className={`mt-1 ${achievement.earned ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'}`}>
                          {achievement.earned ? 'Earned' : 'Locked'}
                        </Badge>
                      </div>
                      {achievement.earned && <Flame className="h-6 w-6 text-orange-500" />}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{achievement.description}</p>
                    <Badge variant="outline" className="mt-3 capitalize">
                      {achievement.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card className="p-8 bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                Communication Preferences
              </h3>
              <CommunicationPreferences />
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-xl">
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                Account Settings
              </h3>
              <div className="space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                  <h4 className="font-bold mb-6 text-lg text-gray-800">Privacy Settings</h4>
                  <div className="space-y-4">
                    <label className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded w-5 h-5" />
                      <span className="font-medium">Show my profile in leaderboards</span>
                    </label>
                    <label className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <input type="checkbox" className="rounded w-5 h-5" />
                      <span className="font-medium">Allow others to see my donation history</span>
                    </label>
                    <label className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded w-5 h-5" />
                      <span className="font-medium">Receive email notifications</span>
                    </label>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  <Settings className="h-5 w-5 mr-2" />
                  Save Settings
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, Award, Crown, Edit, Share2, Calendar, MapPin, Mail, Phone, Trophy, Target, Gift, Settings } from 'lucide-react';
import GoldCoin3D from '@/components/GoldCoin3D';
import ProjectContributions from '@/components/ProjectContributions';
import CommunicationPreferences from '@/components/CommunicationPreferences';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [epicDonationBadges, setEpicDonationBadges] = useState([]);
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

  const recentDonations = [
    { id: 1, charity: "Water Wells Foundation", amount: 50, date: "2 days ago", points: 100 },
    { id: 2, charity: "Education for All", amount: 25, date: "1 week ago", points: 50 },
    { id: 3, charity: "Food Bank Network", amount: 75, date: "2 weeks ago", points: 150 },
    { id: 4, charity: "Medical Aid International", amount: 100, date: "3 weeks ago", points: 200 },
  ];

  const achievements = [
    { name: "First Donation", icon: "🎯", earned: true, description: "Made your first donation" },
    { name: "Weekly Warrior", icon: "⚡", earned: true, description: "Donated 5 times in one week" },
    { name: "Big Heart", icon: "💝", earned: true, description: "Donated over £500 total" },
    { name: "Rising Star", icon: "⭐", earned: false, description: "Reach level 15" },
    { name: "Community Leader", icon: "👑", earned: false, description: "Reach top 10 in your city" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="p-8 mb-8 hover-lift">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg animate-level-up rank-badge first">
                {userStats.level}
              </div>
              {isMember && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Ahmad M.</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="hover-scale"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              
              <p className="text-lg text-gray-600 mb-4">Level {userStats.level} {isMember ? 'VIP ' : ''}Donor • #{userStats.rank} in {userStats.city}</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {userStats.city}, UK
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {userStats.joinDate}
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  ahmad.m@example.com
                </div>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Share2 className="h-4 w-4 mr-2" />
              Share Profile
            </Button>
          </div>
        </Card>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center hover-lift">
            <div className="jannah-counter rounded-lg p-4 mb-4">
              <Star className="h-8 w-8 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">{userStats.points.toLocaleString()}</div>
            </div>
            <p className="font-semibold text-gray-900">Jannah Points</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-lg p-4 mb-4">
              <GoldCoin3D size={32} className="mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{userStats.coins}</div>
            </div>
            <p className="font-semibold text-gray-900">Sadaqah Coins</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift">
            <div className="bg-gradient-to-r from-red-400 to-pink-500 rounded-lg p-4 mb-4">
              <Heart className="h-8 w-8 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">{userStats.totalDonations}</div>
            </div>
            <p className="font-semibold text-gray-900">Total Donations</p>
          </Card>
          
          <Card className="p-6 text-center hover-lift">
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg p-4 mb-4">
              <Trophy className="h-8 w-8 mx-auto mb-2 text-white" />
              <div className="text-2xl font-bold text-white">£{userStats.totalAmount}</div>
            </div>
            <p className="font-semibold text-gray-900">Amount Donated</p>
          </Card>
        </div>

        {/* Project Contributions Section */}
        <div className="mb-8">
          <ProjectContributions />
        </div>

        {/* Epic Donations Showcase */}
        <Card className="p-6 mb-8 hover-lift">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Epic Donation Badges of Honour
            {epicDonationBadges.length > 0 && (
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                {epicDonationBadges.length} earned
              </Badge>
            )}
          </h3>
          
          {epicDonationBadges.length > 0 ? (
            <div className="grid md:grid-cols-3 gap-4">
              {epicDonationBadges.map((badge) => (
                <div key={badge.id} className={`relative p-6 rounded-xl bg-gradient-to-br ${badge.color} text-white hover-lift overflow-hidden transform hover:scale-105 transition-all duration-300`}>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl animate-bounce">{badge.icon}</div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{badge.count}x</div>
                        <div className="text-xs opacity-80">times</div>
                      </div>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{badge.title}</h4>
                    <p className="text-sm opacity-90 mb-3">{badge.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span>£{badge.totalAmount} donated</span>
                      <span className="opacity-80">{badge.lastDonated}</span>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 text-6xl opacity-20">{badge.emoji}</div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-pulse"></div>
                  
                  {/* Special effects for high counts */}
                  {badge.count >= 5 && (
                    <div className="absolute -top-2 -right-2">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-xs animate-pulse">
                        👑
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏆</div>
              <h4 className="text-xl font-semibold mb-2 text-gray-700">No Epic Donations Yet</h4>
              <p className="text-gray-600 mb-6">Make your first epic donation to earn exclusive badges of honour!</p>
              <div className="flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2 bg-purple-100 px-3 py-2 rounded-lg">
                  <span>📦</span>
                  <span>Guardian Angel</span>
                </div>
                <div className="flex items-center gap-2 bg-red-100 px-3 py-2 rounded-lg">
                  <span>🏥</span>
                  <span>Life Saver</span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-100 px-3 py-2 rounded-lg">
                  <span>🍽️</span>
                  <span>Community Feeder</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="donations">Donation History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="donations">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Recent Donations
              </h3>
              <div className="space-y-4">
                {recentDonations.map((donation) => (
                  <div key={donation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover-lift">
                    <div>
                      <h4 className="font-semibold text-gray-900">{donation.charity}</h4>
                      <p className="text-sm text-gray-600">{donation.date}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg text-emerald-600">£{donation.amount}</div>
                      <div className="text-sm text-blue-600">+{donation.points} points</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.earned 
                      ? 'border-green-200 bg-green-50 hover-lift' 
                      : 'border-gray-200 bg-gray-50 opacity-60'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{achievement.icon}</span>
                      <h4 className="font-semibold text-gray-900">{achievement.name}</h4>
                      {achievement.earned && (
                        <Badge className="bg-green-500 text-white">Earned</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="communication">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Communication Preferences
              </h3>
              <CommunicationPreferences />
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Privacy Settings</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Show my profile in leaderboards</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span>Allow others to see my donation history</span>
                    </label>
                  </div>
                </div>
                
                <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
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

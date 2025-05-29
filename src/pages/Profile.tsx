
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, Award, Crown, Edit, Share2, Calendar, MapPin, Mail, Phone, Trophy, Target, Gift } from 'lucide-react';
import Header from '@/components/Header';
import GoldCoin3D from '@/components/GoldCoin3D';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const isMember = true; // VIP status

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
      <Header />
      
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

        {/* Main Content Tabs */}
        <Tabs defaultValue="donations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="donations">Donation History</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
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
          
          <TabsContent value="settings">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Notification Preferences</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Email notifications for donation confirmations</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>Weekly leaderboard updates</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" />
                      <span>Campaign updates from charities</span>
                    </label>
                  </div>
                </div>
                
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


import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, Heart, Trophy, Target, TrendingUp, Calendar, Gift, Zap, Crown, Award, TreeDeciduous, TreePalm, Trees, Waves, Home, Building, Church, Mountain, Sun, Moon, Apple, Grape, Bird, Fish, Car, Ship, Droplets, Flower } from 'lucide-react';
import JannahBuilder from '@/components/JannahBuilder';
import JannahShop from '@/components/JannahShop';
import Jannah3DBuilder from '@/components/Jannah3DBuilder';
import type { JannahItem } from '@/types/jannah';

const MyJannah = () => {
  const [totalPoints, setTotalPoints] = useState(5634);
  const [currentLevel, setCurrentLevel] = useState(12);
  const [nextLevelPoints, setNextLevelPoints] = useState(6000);
  const [todayPoints, setTodayPoints] = useState(45);
  const [userCoins, setUserCoins] = useState(1250);
  const [placedItems, setPlacedItems] = useState<Array<{ item: JannahItem; x: number; y: number }>>([]);
  const [gridSize, setGridSize] = useState(12);

  // Jannah items data
  const jannahItems: JannahItem[] = [
    {
      id: 'tree-oak',
      name: 'Divine Oak Tree',
      description: 'A majestic tree providing eternal shade and peace',
      price: 50,
      category: 'nature',
      size: '2x2',
      icon: <TreeDeciduous className="h-6 w-6" />,
      intention: 'For every tree planted, may Allah grant us shade on the Day of Judgment',
      realProject: 'Plants 5 trees in drought-affected areas'
    },
    {
      id: 'fountain-crystal',
      name: 'Crystal Fountain',
      description: 'A sparkling fountain of pure, healing water',
      price: 100,
      category: 'utilities',
      size: '2x2',
      icon: <Droplets className="h-6 w-6" />,
      intention: 'May this fountain represent the rivers of Paradise',
      realProject: 'Provides clean water access to 50 families'
    },
    {
      id: 'mosque-pearl',
      name: 'Pearl Mosque',
      description: 'A beautiful mosque made of luminous pearls',
      price: 300,
      category: 'religious',
      size: '3x3',
      icon: <Church className="h-6 w-6" />,
      intention: 'Whoever builds a mosque, Allah builds a house for them in Paradise',
      realProject: 'Contributes to building a real mosque in a underserved community'
    },
    {
      id: 'palace-gold',
      name: 'Golden Palace',
      description: 'A magnificent palace for the righteous',
      price: 500,
      category: 'structures',
      size: '4x4',
      icon: <Building className="h-6 w-6" />,
      intention: 'For the patient believers who worked for their eternal home',
      realProject: 'Builds permanent housing for refugee families'
    },
    {
      id: 'bird-paradise',
      name: 'Birds of Paradise',
      description: 'Beautiful birds that sing divine praises',
      price: 75,
      category: 'animals',
      size: '1x1',
      icon: <Bird className="h-6 w-6" />,
      intention: 'All creation glorifies Allah',
      realProject: 'Supports wildlife conservation efforts'
    },
    {
      id: 'fruit-eternal',
      name: 'Eternal Fruit Trees',
      description: 'Trees bearing the most delicious fruits',
      price: 120,
      category: 'fruits',
      size: '2x2',
      icon: <Apple className="h-6 w-6" />,
      intention: 'The fruits of Paradise never finish',
      realProject: 'Plants fruit trees in food-insecure regions'
    }
  ];

  const handlePurchase = (item: JannahItem): boolean => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      
      if (item.id.includes('grid-expansion')) {
        setGridSize(prev => prev + 2);
      }
      
      return true;
    }
    return false;
  };

  const recentActivities = [
    { action: "Donated to Water Wells", points: 50, time: "2 hours ago", charity: "Water Wells Foundation" },
    { action: "Completed daily goal", points: 20, time: "Today", charity: null },
    { action: "Shared campaign", points: 10, time: "Yesterday", charity: "Education for All" },
    { action: "Weekly streak bonus", points: 25, time: "2 days ago", charity: null }
  ];

  const achievements = [
    { name: "First Donation", unlocked: true, points: 100, icon: "🎯", rarity: "common" },
    { name: "Weekly Warrior", unlocked: true, points: 250, icon: "⚡", rarity: "rare" },
    { name: "Heart of Gold", unlocked: true, points: 500, icon: "💝", rarity: "epic" },
    { name: "Community Champion", unlocked: false, points: 1000, icon: "👑", rarity: "legendary" },
    { name: "Jannah Seeker", unlocked: false, points: 2000, icon: "🌟", rarity: "legendary" }
  ];

  const levelRewards = [
    { level: 13, reward: "Premium Badge", unlocked: false },
    { level: 15, reward: "Custom Frame", unlocked: false },
    { level: 20, reward: "VIP Status", unlocked: false }
  ];

  const progressToNext = ((totalPoints % 500) / 500) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-4">
            My Jannah Journey
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Track your spiritual progress and build your paradise through charitable giving
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2">
              💰 {userCoins} Jannah Coins
            </Badge>
          </div>
        </div>

        {/* Level Progress Card */}
        <Card className="mb-8 bg-gradient-to-r from-purple-600 via-blue-600 to-emerald-600 text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                  {currentLevel}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Level {currentLevel}</h2>
                  <p className="text-purple-100">Faithful Giver</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{totalPoints.toLocaleString()}</div>
                <div className="text-purple-100">Jannah Points</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {currentLevel + 1}</span>
                <span>{totalPoints % 500}/{500} points</span>
              </div>
              <Progress value={progressToNext} className="h-3 bg-white/20" />
              <div className="flex justify-between text-xs text-purple-100">
                <span>Keep up the great work!</span>
                <span>{500 - (totalPoints % 500)} points to go</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{todayPoints}</div>
              <div className="text-sm opacity-90">Points Today</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">7</div>
              <div className="text-sm opacity-90">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">23</div>
              <div className="text-sm opacity-90">Good Deeds</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500 to-red-600 text-white">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm opacity-90">Weekly Goal</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="builder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 max-w-3xl mx-auto">
            <TabsTrigger value="builder">Build Paradise</TabsTrigger>
            <TabsTrigger value="shop">Jannah Shop</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>

          {/* Jannah Builder */}
          <TabsContent value="builder">
            <Jannah3DBuilder
              items={jannahItems}
              userCoins={userCoins}
              onPurchase={handlePurchase}
              placedItems={placedItems}
              onItemsChange={setPlacedItems}
              gridSize={gridSize}
            />
          </TabsContent>

          {/* Jannah Shop */}
          <TabsContent value="shop">
            <JannahShop
              items={jannahItems}
              userCoins={userCoins}
              onPurchase={handlePurchase}
            />
          </TabsContent>

          {/* Recent Activity */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{activity.action}</h4>
                        <p className="text-sm text-gray-600">{activity.time}</p>
                        {activity.charity && (
                          <p className="text-xs text-blue-600">{activity.charity}</p>
                        )}
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        +{activity.points} points
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`hover-lift ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <Badge className={
                        achievement.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                        achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                        achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2">{achievement.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Reward: {achievement.points} Jannah Points
                    </p>
                    
                    {achievement.unlocked ? (
                      <Badge className="bg-green-500 text-white">Unlocked</Badge>
                    ) : (
                      <Badge variant="outline">In Progress</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Goals */}
          <TabsContent value="goals">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Weekly Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Make 3 donations</span>
                      <span className="text-sm text-gray-600">2/3</span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Earn 100 points</span>
                      <span className="text-sm text-gray-600">85/100</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Share 2 campaigns</span>
                      <span className="text-sm text-gray-600">1/2</span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Monthly Challenges
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Ramadan Special</h4>
                    <p className="text-sm text-purple-700">Double points for all donations</p>
                    <Badge className="mt-2 bg-purple-500 text-white">Active</Badge>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Community Builder</h4>
                    <p className="text-sm text-blue-700">Invite 5 friends this month</p>
                    <Badge className="mt-2" variant="outline">1/5 completed</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyJannah;

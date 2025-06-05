
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coins, ShoppingBag, Gift, Star, Crown, Zap, Heart, Trophy, Target } from 'lucide-react';
import GoldCoin3D from '@/components/GoldCoin3D';
import Header from '@/components/Header';

const SadaqahCoins = () => {
  const [userCoins, setUserCoins] = useState(142);
  const [selectedCategory, setSelectedCategory] = useState('rewards');

  const coinPackages = [
    { coins: 50, price: 4.99, bonus: 0, popular: false },
    { coins: 100, price: 8.99, bonus: 10, popular: false },
    { coins: 250, price: 19.99, bonus: 50, popular: true },
    { coins: 500, price: 34.99, bonus: 150, popular: false },
    { coins: 1000, price: 59.99, bonus: 400, popular: false }
  ];

  const rewardItems = [
    {
      id: 1,
      name: "Premium Profile Badge",
      cost: 25,
      category: "profile",
      description: "Exclusive golden badge for your profile",
      icon: "👑",
      rarity: "rare"
    },
    {
      id: 2,
      name: "2x Points Multiplier (24h)",
      cost: 50,
      category: "boost",
      description: "Double your points for 24 hours",
      icon: "⚡",
      rarity: "epic"
    },
    {
      id: 3,
      name: "Custom Profile Frame",
      cost: 75,
      category: "profile",
      description: "Beautiful animated frame for your avatar",
      icon: "🖼️",
      rarity: "epic"
    },
    {
      id: 4,
      name: "Charity Spotlight Feature",
      cost: 100,
      category: "feature",
      description: "Feature your chosen charity for 48h",
      icon: "🌟",
      rarity: "legendary"
    }
  ];

  const achievements = [
    { name: "First Purchase", coins: 10, unlocked: true, icon: "🎯" },
    { name: "Coin Collector", coins: 25, unlocked: true, icon: "💰" },
    { name: "Generous Spender", coins: 50, unlocked: false, icon: "💎" },
    { name: "Coin Master", coins: 100, unlocked: false, icon: "👑" }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rare': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'epic': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-yellow-50/30 to-orange-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <GoldCoin3D size={48} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
              Sadaqah Coins
            </h1>
          </div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Earn and spend Sadaqah Coins to unlock exclusive features, boost your giving impact, and personalize your experience!
          </p>
        </div>

        {/* User Coin Balance */}
        <Card className="mb-8 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-white">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <GoldCoin3D size={64} />
              <div>
                <div className="text-4xl font-bold">{userCoins.toLocaleString()}</div>
                <div className="text-lg opacity-90">Sadaqah Coins</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-lg font-bold">+25</div>
                <div className="text-xs opacity-80">This Week</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-lg font-bold">187</div>
                <div className="text-xs opacity-80">Total Earned</div>
              </div>
              <div className="bg-white/20 rounded-lg p-3 backdrop-blur-sm">
                <div className="text-lg font-bold">45</div>
                <div className="text-xs opacity-80">Total Spent</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="rewards">
              <Gift className="h-4 w-4 mr-2" />
              Rewards
            </TabsTrigger>
            <TabsTrigger value="packages">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Buy Coins
            </TabsTrigger>
            <TabsTrigger value="achievements">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="earning">
              <Target className="h-4 w-4 mr-2" />
              Earn More
            </TabsTrigger>
          </TabsList>

          {/* Rewards Store */}
          <TabsContent value="rewards">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rewardItems.map((item) => (
                <Card key={item.id} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <Badge className={`${getRarityColor(item.rarity)} border`}>
                        {item.rarity.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 text-center">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-4 text-center">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <GoldCoin3D size={20} />
                        <span className="font-bold text-lg">{item.cost}</span>
                      </div>
                      <Button 
                        size="sm"
                        disabled={userCoins < item.cost}
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                      >
                        {userCoins >= item.cost ? 'Buy' : 'Need More Coins'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Coin Packages */}
          <TabsContent value="packages">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coinPackages.map((pack, index) => (
                <Card key={index} className={`hover-lift ${pack.popular ? 'ring-2 ring-yellow-400 scale-105' : ''}`}>
                  {pack.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white">
                      Most Popular
                    </Badge>
                  )}
                  
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <GoldCoin3D size={48} />
                    </div>
                    
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      {pack.coins + pack.bonus}
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      {pack.coins} + {pack.bonus} bonus coins
                    </div>
                    
                    <div className="text-2xl font-bold mb-4">£{pack.price}</div>
                    
                    {pack.bonus > 0 && (
                      <Badge className="bg-green-100 text-green-800 mb-4">
                        +{pack.bonus} Bonus!
                      </Badge>
                    )}
                    
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      Purchase
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Achievements */}
          <TabsContent value="achievements">
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`hover-lift ${achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg">{achievement.name}</h3>
                          <div className="flex items-center gap-2">
                            <GoldCoin3D size={16} />
                            <span className="font-semibold">{achievement.coins} coins</span>
                          </div>
                        </div>
                      </div>
                      
                      {achievement.unlocked ? (
                        <Badge className="bg-green-500 text-white">Unlocked</Badge>
                      ) : (
                        <Badge variant="outline">Locked</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Earning Guide */}
          <TabsContent value="earning">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Donation Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Make a donation</span>
                    <Badge>+5 coins</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly donation streak</span>
                    <Badge>+10 coins</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Monthly giving goal</span>
                    <Badge>+25 coins</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Community Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Share a campaign</span>
                    <Badge>+2 coins</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Invite a friend</span>
                    <Badge>+15 coins</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Top monthly donor</span>
                    <Badge>+50 coins</Badge>
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

export default SadaqahCoins;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Coins, Star, Gift, CreditCard, ShoppingCart, Zap } from 'lucide-react';

const coinPackages = [
  { 
    coins: 100, 
    price: '£10', 
    bonus: 0, 
    popular: false,
    description: 'Perfect for getting started'
  },
  { 
    coins: 250, 
    price: '£20', 
    bonus: 25, 
    popular: false,
    description: 'Great value for regular giving'
  },
  { 
    coins: 500, 
    price: '£35', 
    bonus: 75, 
    popular: true,
    description: 'Most popular choice'
  },
  { 
    coins: 1000, 
    price: '£60', 
    bonus: 200, 
    popular: false,
    description: 'Maximum impact bundle'
  },
  { 
    coins: 2500, 
    price: '£125', 
    bonus: 625, 
    popular: false,
    description: 'Premium supporter package'
  }
];

const SadaqahCoins = () => {
  const [selectedPackage, setSelectedPackage] = useState(2);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-6">
              <Coins className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Sadaqah Coins</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Purchase Sadaqah Coins to make instant donations, support emergency campaigns, 
            and multiply your charitable impact across our trusted partner network.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Donations</h3>
              <p className="text-gray-600">Make immediate charitable contributions without payment delays</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bonus Rewards</h3>
              <p className="text-gray-600">Earn bonus coins with larger purchases and multiply your impact</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Gift className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flexible Giving</h3>
              <p className="text-gray-600">Support multiple causes and campaigns with a single balance</p>
            </CardContent>
          </Card>
        </div>

        {/* Coin Packages */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Choose Your Package</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coinPackages.map((pkg, index) => (
              <Card 
                key={index} 
                className={`relative cursor-pointer transition-all duration-200 ${
                  selectedPackage === index 
                    ? 'ring-2 ring-sadaqah-gold-500 shadow-lg scale-105' 
                    : 'hover:shadow-md'
                } ${pkg.popular ? 'border-sadaqah-gold-500' : ''}`}
                onClick={() => setSelectedPackage(index)}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-sadaqah-gold-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-4">
                      <Coins className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{pkg.coins} Coins</h3>
                  {pkg.bonus > 0 && (
                    <div className="text-green-600 font-semibold mb-2">
                      +{pkg.bonus} Bonus Coins!
                    </div>
                  )}
                  
                  <div className="text-3xl font-bold text-sadaqah-gold-600 mb-2">{pkg.price}</div>
                  <p className="text-sm text-gray-600 mb-4">{pkg.description}</p>
                  
                  {pkg.bonus > 0 && (
                    <div className="text-xs text-green-600 bg-green-50 rounded-full px-3 py-1">
                      Total: {pkg.coins + pkg.bonus} coins
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Purchase Section */}
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Complete Purchase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Package:</span>
                <span className="font-semibold">
                  {coinPackages[selectedPackage].coins} 
                  {coinPackages[selectedPackage].bonus > 0 && ` (+${coinPackages[selectedPackage].bonus})`} 
                  Coins
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Price:</span>
                <span className="font-semibold text-sadaqah-gold-600">
                  {coinPackages[selectedPackage].price}
                </span>
              </div>
            </div>
            
            <Button className="w-full bg-sadaqah-gold-600 hover:bg-sadaqah-gold-700 text-white py-3">
              <CreditCard className="h-5 w-5 mr-2" />
              Purchase Coins
            </Button>
            
            <div className="text-center text-sm text-gray-500">
              Secure payment powered by Stripe
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="mt-16 bg-white rounded-xl p-8">
          <h2 className="text-3xl font-bold text-center mb-8">How Sadaqah Coins Work</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Purchase</h3>
              <p className="text-gray-600">Buy Sadaqah Coins securely with your preferred payment method</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Coins className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Store</h3>
              <p className="text-gray-600">Coins are added to your account balance instantly</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Donate</h3>
              <p className="text-gray-600">Use coins for instant donations to any charity or campaign</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadaqahCoins;

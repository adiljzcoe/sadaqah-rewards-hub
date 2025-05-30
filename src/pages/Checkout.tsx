
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import { Heart, Plus, Minus, X, Crown, Zap, Star, Gift, TrendingUp, Users } from 'lucide-react';

const membershipTiers = [
  { 
    id: 'basic', 
    name: 'Basic Member', 
    price: 9.99, 
    multiplier: 2, 
    features: ['2x Points', '2x Coins', 'Priority Support'] 
  },
  { 
    id: 'premium', 
    name: 'Premium Member', 
    price: 19.99, 
    multiplier: 3, 
    features: ['3x Points', '3x Coins', 'VIP Access', 'Monthly Rewards'] 
  },
  { 
    id: 'elite', 
    name: 'Elite Member', 
    price: 39.99, 
    multiplier: 5, 
    features: ['5x Points', '5x Coins', 'Exclusive Events', 'Personal Manager'] 
  }
];

const fundraisingAmounts = [3, 5, 10, 20, 50];

const Checkout = () => {
  const [mainDonation, setMainDonation] = useState(200);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [fundraisingAmount, setFundraisingAmount] = useState(0);
  const [customFundraising, setCustomFundraising] = useState('');
  const [currency] = useState('GBP');

  const selectedTier = membershipTiers.find(tier => tier.id === selectedMembership);
  const membershipMultiplier = selectedTier?.multiplier || 1;
  const actualFundraisingAmount = Number(customFundraising) || fundraisingAmount;
  
  // Calculate rewards
  const basePoints = mainDonation * 10;
  const baseCoins = mainDonation * 10;
  const membershipPoints = basePoints * membershipMultiplier;
  const membershipCoins = baseCoins * membershipMultiplier;
  
  // Fundraising 7x multiplier
  const fundraisingReward = actualFundraisingAmount * 7;
  const totalFundraisingPoints = fundraisingReward * 10;
  const totalFundraisingCoins = fundraisingReward * 10;

  const grandTotal = mainDonation + (selectedTier?.price || 0) + actualFundraisingAmount;
  const totalPoints = membershipPoints + totalFundraisingPoints;
  const totalCoins = membershipCoins + totalFundraisingCoins;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Complete Your Donation</h1>
            <p className="text-gray-600">Make an impact and unlock incredible rewards</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main Donation */}
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center">
                    <Heart className="h-5 w-5 mr-2 text-red-500" />
                    Save Lives In Gaza
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src="/lovable-uploads/eb14ceb3-42ed-4808-b9eb-8aeedbc7de1c.png" 
                      alt="Gaza Emergency" 
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setMainDonation(Math.max(10, mainDonation - 10))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <div className="text-center">
                          <div className="text-2xl font-bold">£{mainDonation}</div>
                          <div className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            For the sake of Allah SWT
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setMainDonation(mainDonation + 10)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    ✓ You will donate only once
                  </div>
                </CardContent>
              </Card>

              {/* Membership Upsell */}
              <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-purple-700">
                    <Crown className="h-5 w-5 mr-2" />
                    🔥 UNLOCK MASSIVE REWARDS! Add Membership
                    <Badge className="ml-2 bg-purple-600 text-white animate-pulse">POPULAR</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {membershipTiers.map((tier) => (
                      <div 
                        key={tier.id}
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                          selectedMembership === tier.id 
                            ? 'border-purple-500 bg-purple-100 scale-105' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => setSelectedMembership(selectedMembership === tier.id ? '' : tier.id)}
                      >
                        {tier.id === 'premium' && (
                          <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white">
                            BEST VALUE
                          </Badge>
                        )}
                        <div className="text-center">
                          <div className="text-lg font-bold">{tier.name}</div>
                          <div className="text-2xl font-bold text-purple-600">£{tier.price}</div>
                          <div className="text-sm text-green-600 font-semibold">{tier.multiplier}x Multiplier!</div>
                          <div className="mt-2 space-y-1">
                            {tier.features.map((feature, idx) => (
                              <div key={idx} className="text-xs text-gray-600">{feature}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {selectedMembership && (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-4">
                      <div className="flex items-center text-green-800">
                        <Star className="h-4 w-4 mr-2" />
                        <span className="font-semibold">Amazing! Your donation will now earn {membershipMultiplier}x rewards!</span>
                      </div>
                      <div className="text-sm text-green-700 mt-1">
                        {membershipPoints.toLocaleString()} Jannah Points + {membershipCoins.toLocaleString()} Sadaqah Coins
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Fundraising Donation Upsell */}
              <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-700">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    🚀 INCREDIBLE 7X MULTIPLIER! Fundraising Donation
                    <Badge className="ml-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-bounce">
                      7X REWARDS!
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-lg p-4">
                    <div className="text-center mb-4">
                      <div className="text-lg font-bold text-orange-800">
                        Every £1 you donate = £7 worth of rewards! 🎯
                      </div>
                      <div className="text-sm text-orange-700">
                        Help us raise funds and get MASSIVE returns in Jannah Points & Sadaqah Coins!
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {fundraisingAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setFundraisingAmount(amount);
                          setCustomFundraising('');
                        }}
                        className={`py-3 px-2 rounded-lg font-semibold text-sm transition-all ${
                          fundraisingAmount === amount && !customFundraising
                            ? 'bg-orange-600 text-white scale-105 shadow-lg'
                            : 'bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50'
                        }`}
                      >
                        <div>£{amount}</div>
                        <div className="text-xs text-green-600">= £{amount * 7}</div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customFundraising}
                      onChange={(e) => {
                        setCustomFundraising(e.target.value);
                        setFundraisingAmount(0);
                      }}
                      className="flex-1 p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500"
                    />
                    <div className="text-orange-700 font-semibold">
                      = £{(Number(customFundraising) || 0) * 7} value!
                    </div>
                  </div>

                  {actualFundraisingAmount > 0 && (
                    <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-green-800">
                            🎉 INCREDIBLE! You'll get £{fundraisingReward} worth of rewards!
                          </div>
                          <div className="text-sm text-green-700">
                            {totalFundraisingPoints.toLocaleString()} Jannah Points + {totalFundraisingCoins.toLocaleString()} Sadaqah Coins
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setFundraisingAmount(0);
                            setCustomFundraising('');
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Additional Upsell */}
              <Card className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src="/lovable-uploads/eb14ceb3-42ed-4808-b9eb-8aeedbc7de1c.png" alt="Water project" className="w-12 h-10 object-cover rounded" />
                      <div>
                        <div className="font-semibold">Provide 3000 Litres of Water to Gaza</div>
                        <div className="text-sm text-gray-600">Make an even bigger impact</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-pink-600">£1,185</div>
                      <Button className="bg-pink-600 hover:bg-pink-700 text-white">Add</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Gaza Emergency</span>
                      <span>£{mainDonation}</span>
                    </div>
                    
                    {selectedTier && (
                      <div className="flex justify-between text-purple-600">
                        <span>{selectedTier.name}</span>
                        <span>£{selectedTier.price}</span>
                      </div>
                    )}
                    
                    {actualFundraisingAmount > 0 && (
                      <div className="flex justify-between text-orange-600">
                        <span>Fundraising Donation</span>
                        <span>£{actualFundraisingAmount}</span>
                      </div>
                    )}
                  </div>
                  
                  <hr />
                  
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-2">Your Total Rewards:</div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-center space-x-2">
                          <Zap className="h-4 w-4 text-blue-600" />
                          <span className="font-bold text-blue-600">{totalPoints.toLocaleString()} Jannah Points</span>
                        </div>
                        <div className="flex items-center justify-center space-x-2">
                          <Gift className="h-4 w-4 text-yellow-600" />
                          <span className="font-bold text-yellow-600">{totalCoins.toLocaleString()} Sadaqah Coins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-center py-4 border-t">
                    Grand Total: £{grandTotal.toFixed(2)}
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold">
                    Complete Donation →
                  </Button>
                  
                  <div className="text-center space-y-2">
                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" className="flex-1 text-blue-600">Back</Button>
                      <Button variant="outline" className="flex-1 text-blue-600">Share Link</Button>
                    </div>
                    <div className="text-xs text-gray-500">Secure payment • SSL encrypted</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

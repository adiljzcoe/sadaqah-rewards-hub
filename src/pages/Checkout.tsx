import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import { Heart, Plus, Minus, X, Crown, Zap, Star, Gift, TrendingUp, Users, Shield, CreditCard, Mail, Phone, User, AlertTriangle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const membershipTiers = [
  { 
    id: 'basic', 
    name: 'Basic Member', 
    price: 9.99, 
    multiplier: 2, 
    features: ['2x Points', '2x Coins', 'Priority Support', 'Monthly Newsletter'] 
  },
  { 
    id: 'premium', 
    name: 'Premium Member', 
    price: 19.99, 
    multiplier: 3, 
    features: ['3x Points', '3x Coins', 'VIP Access', 'Monthly Rewards', 'Exclusive Content'] 
  },
  { 
    id: 'elite', 
    name: 'Elite Member', 
    price: 39.99, 
    multiplier: 5, 
    features: ['5x Points', '5x Coins', 'Exclusive Events', 'Personal Manager', 'Early Access'] 
  }
];

const fundraisingAmounts = [3, 5, 10, 20, 50, 100];

const adminFeeOptions = [
  { percentage: 0, label: 'No admin fee (100% to charity)', description: 'Every penny goes directly to help' },
  { percentage: 3, label: '3% admin fee', description: 'Helps us improve our platform' },
  { percentage: 5, label: '5% admin fee', description: 'Supports platform maintenance' },
  { percentage: 10, label: '10% admin fee', description: 'Enables platform growth' }
];

const Checkout = () => {
  const { user } = useAuth();
  const [mainDonation, setMainDonation] = useState(200);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [fundraisingAmount, setFundraisingAmount] = useState(0);
  const [customFundraising, setCustomFundraising] = useState('');
  const [adminFeePercentage, setAdminFeePercentage] = useState(3);
  const [currency] = useState('GBP');
  const [isProcessing, setIsProcessing] = useState(false);

  // Guest details form
  const form = useForm({
    defaultValues: {
      email: user?.email || '',
      firstName: '',
      lastName: '',
      phone: '',
      isGuest: !user,
      newsletterOptIn: true,
      termsAccepted: false
    }
  });

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

  // Admin fee calculation
  const adminFeeAmount = (mainDonation + actualFundraisingAmount) * (adminFeePercentage / 100);
  const subtotal = mainDonation + (selectedTier?.price || 0) + actualFundraisingAmount;
  const grandTotal = subtotal + adminFeeAmount;
  const totalPoints = membershipPoints + totalFundraisingPoints;
  const totalCoins = membershipCoins + totalFundraisingCoins;

  const handleSubmit = async (data: any) => {
    setIsProcessing(true);
    
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Processing donation:', {
        ...data,
        mainDonation,
        membership: selectedTier,
        fundraising: actualFundraisingAmount,
        adminFee: adminFeeAmount,
        total: grandTotal,
        rewards: { points: totalPoints, coins: totalCoins }
      });
      
      // In a real app, this would redirect to payment processor
      alert('Donation processed successfully! 🎉');
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Complete Your Epic Donation
            </h1>
            <p className="text-xl text-gray-600">Make an incredible impact and unlock amazing rewards</p>
            <div className="flex items-center justify-center space-x-6 mt-4">
              <Badge variant="outline" className="text-green-600 border-green-300">
                <Shield className="h-4 w-4 mr-1" />
                100% Secure
              </Badge>
              <Badge variant="outline" className="text-blue-600 border-blue-300">
                <Users className="h-4 w-4 mr-1" />
                Trusted by 50K+ donors
              </Badge>
              <Badge variant="outline" className="text-purple-600 border-purple-300">
                <Star className="h-4 w-4 mr-1" />
                5-Star Rated
              </Badge>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Guest Information */}
                  {!user && (
                    <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                      <CardHeader className="bg-gradient-to-r from-orange-100 to-yellow-100">
                        <CardTitle className="flex items-center">
                          <User className="h-5 w-5 mr-2 text-orange-600" />
                          Guest Checkout - No Account Required!
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your first name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your last name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="your@email.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number (Optional)</FormLabel>
                                <FormControl>
                                  <Input type="tel" placeholder="Your phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex items-center space-x-2 mt-4">
                          <FormField
                            control={form.control}
                            name="newsletterOptIn"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-sm">
                                    Send me updates about my donation and impact stories
                                  </FormLabel>
                                </div>
                              </FormItem>
                            )}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Main Donation */}
                  <Card className="border-2 border-blue-200">
                    <CardHeader className="bg-blue-50">
                      <CardTitle className="flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Save Lives In Gaza - Emergency Appeal
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img 
                          src="/lovable-uploads/eb14ceb3-42ed-4808-b9eb-8aeedbc7de1c.png" 
                          alt="Gaza Emergency" 
                          className="w-24 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm"
                              onClick={() => setMainDonation(Math.max(10, mainDonation - 10))}
                              className="w-12 h-12"
                            >
                              <Minus className="h-5 w-5" />
                            </Button>
                            <div className="text-center">
                              <div className="text-3xl font-bold text-blue-600">£{mainDonation}</div>
                              <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                For the sake of Allah SWT
                              </div>
                            </div>
                            <Button 
                              type="button"
                              variant="outline" 
                              size="sm"
                              onClick={() => setMainDonation(mainDonation + 10)}
                              className="w-12 h-12"
                            >
                              <Plus className="h-5 w-5" />
                            </Button>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="text-sm text-green-700">
                              ✓ Emergency medical supplies for 50 families<br />
                              ✓ Clean water for 100 people for a month<br />
                              ✓ Food packages for 25 families
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Admin Fee Upsell */}
                  <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-700">
                        <AlertTriangle className="h-5 w-5 mr-2" />
                        💡 Support Our Platform (Optional)
                        <Badge className="ml-2 bg-yellow-500 text-white">HELPS US GROW</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-lg p-4">
                        <div className="text-center mb-4">
                          <div className="text-lg font-bold text-orange-800">
                            Help us serve more people like you! 💪
                          </div>
                          <div className="text-sm text-orange-700">
                            Our platform connects your donations with verified charities. Your support helps us grow!
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-3">
                        {adminFeeOptions.map((option) => (
                          <div
                            key={option.percentage}
                            onClick={() => setAdminFeePercentage(option.percentage)}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all ${
                              adminFeePercentage === option.percentage
                                ? 'border-orange-500 bg-orange-100'
                                : 'border-gray-200 hover:border-orange-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-gray-800">{option.label}</div>
                                <div className="text-sm text-gray-600">{option.description}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-orange-600">
                                  {option.percentage === 0 ? 'FREE' : `+£${((mainDonation + actualFundraisingAmount) * (option.percentage / 100)).toFixed(2)}`}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Membership Upsell */}
                  <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-purple-700">
                        <Crown className="h-5 w-5 mr-2" />
                        🔥 UNLOCK MASSIVE REWARDS! Add Membership
                        <Badge className="ml-2 bg-purple-600 text-white animate-pulse">MOST POPULAR</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-3 gap-4">
                        {membershipTiers.map((tier) => (
                          <div 
                            key={tier.id}
                            className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all ${
                              selectedMembership === tier.id 
                                ? 'border-purple-500 bg-purple-100 scale-105 shadow-lg' 
                                : 'border-gray-200 hover:border-purple-300'
                            }`}
                            onClick={() => setSelectedMembership(selectedMembership === tier.id ? '' : tier.id)}
                          >
                            {tier.id === 'premium' && (
                              <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white animate-bounce">
                                BEST VALUE
                              </Badge>
                            )}
                            <div className="text-center">
                              <div className="text-lg font-bold">{tier.name}</div>
                              <div className="text-3xl font-bold text-purple-600">£{tier.price}</div>
                              <div className="text-lg text-green-600 font-semibold">{tier.multiplier}x Multiplier!</div>
                              <div className="mt-3 space-y-1">
                                {tier.features.map((feature, idx) => (
                                  <div key={idx} className="text-sm text-gray-600 flex items-center">
                                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedMembership && (
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-lg p-4">
                          <div className="flex items-center text-green-800">
                            <Star className="h-5 w-5 mr-2" />
                            <span className="font-semibold text-lg">Amazing! Your donation will now earn {membershipMultiplier}x rewards!</span>
                          </div>
                          <div className="text-sm text-green-700 mt-1 font-medium">
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
                          <div className="text-xl font-bold text-orange-800">
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
                            className={`py-4 px-2 rounded-lg font-semibold text-sm transition-all ${
                              fundraisingAmount === amount && !customFundraising
                                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white scale-105 shadow-lg'
                                : 'bg-white border-2 border-orange-200 text-orange-700 hover:bg-orange-50'
                            }`}
                          >
                            <div className="text-lg font-bold">£{amount}</div>
                            <div className="text-xs text-green-600">= £{amount * 7} value</div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Input
                          type="number"
                          placeholder="Custom amount"
                          value={customFundraising}
                          onChange={(e) => {
                            setCustomFundraising(e.target.value);
                            setFundraisingAmount(0);
                          }}
                          className="flex-1 p-4 border-2 border-orange-200 rounded-lg focus:border-orange-500 text-lg"
                        />
                        <div className="text-orange-700 font-semibold text-lg">
                          = £{(Number(customFundraising) || 0) * 7} value!
                        </div>
                      </div>

                      {actualFundraisingAmount > 0 && (
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 border-2 border-green-300 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-bold text-green-800 text-lg">
                                🎉 INCREDIBLE! You'll get £{fundraisingReward} worth of rewards!
                              </div>
                              <div className="text-sm text-green-700 font-medium">
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

                  {/* Terms and Conditions */}
                  <Card className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="termsAccepted"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  required
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm">
                                  I agree to the <span className="text-blue-600 underline cursor-pointer">Terms & Conditions</span> and <span className="text-blue-600 underline cursor-pointer">Privacy Policy</span>
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-4 border-2 border-blue-200">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                      <CardTitle className="text-center">Epic Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Gaza Emergency Appeal</span>
                          <span className="font-semibold">£{mainDonation}</span>
                        </div>
                        
                        {selectedTier && (
                          <div className="flex justify-between text-purple-600">
                            <span>{selectedTier.name}</span>
                            <span className="font-semibold">£{selectedTier.price}</span>
                          </div>
                        )}
                        
                        {actualFundraisingAmount > 0 && (
                          <div className="flex justify-between text-orange-600">
                            <span>Fundraising Donation</span>
                            <span className="font-semibold">£{actualFundraisingAmount}</span>
                          </div>
                        )}

                        {adminFeePercentage > 0 && (
                          <div className="flex justify-between text-yellow-600">
                            <span>Platform Support ({adminFeePercentage}%)</span>
                            <span className="font-semibold">£{adminFeeAmount.toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                      
                      <hr className="border-gray-300" />
                      
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-green-200">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2">Your Epic Rewards:</div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-center space-x-2">
                              <Zap className="h-5 w-5 text-blue-600" />
                              <span className="font-bold text-blue-600 text-lg">{totalPoints.toLocaleString()} Jannah Points</span>
                            </div>
                            <div className="flex items-center justify-center space-x-2">
                              <Gift className="h-5 w-5 text-yellow-600" />
                              <span className="font-bold text-yellow-600 text-lg">{totalCoins.toLocaleString()} Sadaqah Coins</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center py-4 border-t-2 border-gray-200">
                        <div className="text-sm text-gray-600 mb-1">Grand Total</div>
                        <div className="text-3xl font-bold text-green-600">£{grandTotal.toFixed(2)}</div>
                      </div>
                      
                      <Button 
                        type="submit"
                        disabled={isProcessing || !form.watch('termsAccepted')}
                        className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-4 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                      >
                        {isProcessing ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Processing...
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <CreditCard className="h-5 w-5 mr-2" />
                            Complete Epic Donation →
                          </div>
                        )}
                      </Button>
                      
                      <div className="text-center space-y-3">
                        <div className="flex justify-center space-x-2">
                          <Button type="button" variant="outline" className="flex-1 text-blue-600">
                            <Heart className="h-4 w-4 mr-1" />
                            Save for Later
                          </Button>
                          <Button type="button" variant="outline" className="flex-1 text-blue-600">
                            <Users className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center justify-center space-x-2">
                          <Shield className="h-3 w-3" />
                          <span>SSL encrypted • 100% secure • Trusted by thousands</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { useForm } from 'react-hook-form';
import Header from '@/components/Header';
import { Heart, Plus, Minus, X, Crown, Zap, Star, Gift, TrendingUp, Users, Shield, CreditCard, Mail, Phone, User, AlertTriangle, Target, Check, Lock, Info } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const membershipTiers = [
  { 
    id: 'basic', 
    name: 'Guardian Angel', 
    price: 19.99, 
    originalPrice: 29.99,
    multiplier: 2, 
    features: ['2x Points', '2x Coins', 'Priority Support', 'Monthly Newsletter'],
    badge: 'POPULAR'
  },
  { 
    id: 'premium', 
    name: 'Heavenly Hero', 
    price: 39.99, 
    originalPrice: 59.99,
    multiplier: 3, 
    features: ['3x Points', '3x Coins', 'VIP Access', 'Monthly Rewards', 'Exclusive Content'],
    badge: 'BEST VALUE'
  },
  { 
    id: 'elite', 
    name: 'Divine Champion', 
    price: 79.99, 
    originalPrice: 119.99,
    multiplier: 5, 
    features: ['5x Points', '5x Coins', 'Exclusive Events', 'Personal Manager', 'Early Access'],
    badge: 'PREMIUM'
  }
];

const suggestedAmounts = [50, 100, 200, 500];

const fundraisingDonations = [
  { amount: 1.50, value: 10.50, label: '' },
  { amount: 5, value: 35, label: '' },
  { amount: 10, value: 70, label: '' },
  { amount: 15, value: 105, label: 'Most Beneficial' },
  { amount: 25, value: 175, label: '' },
  { amount: 50, value: 350, label: '' },
  { amount: 100, value: 700, label: '' },
  { amount: 200, value: 1400, label: '' }
];

const getAdminContributionMessage = (percentage: number) => {
  if (percentage >= 15) {
    return {
      emoji: "🌟✨🎉",
      message: "You're absolutely AMAZING! This incredible generosity will transform lives!",
      bgGradient: "from-purple-400 via-pink-400 to-red-400",
      textColor: "text-white",
      borderColor: "border-purple-300",
      celebrationEmojis: ["🎉", "🌟", "✨", "💫", "🎊"]
    };
  } else if (percentage >= 10) {
    return {
      emoji: "😍🙌💖",
      message: "WOW! You're a true hero! This makes such a huge difference!",
      bgGradient: "from-blue-400 via-purple-400 to-pink-400",
      textColor: "text-white",
      borderColor: "border-blue-300",
      celebrationEmojis: ["🙌", "😍", "💖", "🚀", "⭐"]
    };
  } else if (percentage >= 6) {
    return {
      emoji: "😊💙🌈",
      message: "Thank you so much! Your kindness is truly appreciated!",
      bgGradient: "from-green-400 via-blue-400 to-purple-400",
      textColor: "text-white",
      borderColor: "border-green-300",
      celebrationEmojis: ["😊", "💙", "🌈", "💚", "✨"]
    };
  } else if (percentage >= 3) {
    return {
      emoji: "😌💚🤝",
      message: "That's wonderful! Every bit helps our partners deliver aid!",
      bgGradient: "from-yellow-400 via-green-400 to-blue-400",
      textColor: "text-white",
      borderColor: "border-green-200",
      celebrationEmojis: ["😌", "💚", "🤝", "👍", "💫"]
    };
  } else if (percentage >= 1) {
    return {
      emoji: "🙂👍💪",
      message: "Thank you! This helps our hardworking partners!",
      bgGradient: "from-orange-300 via-yellow-400 to-green-400",
      textColor: "text-white",
      borderColor: "border-orange-200",
      celebrationEmojis: ["🙂", "👍", "💪", "🌟", "💛"]
    };
  } else {
    return {
      emoji: "😊🤲",
      message: "This helps our partners with their essential running costs!",
      bgGradient: "from-gray-300 via-blue-300 to-green-300",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
      celebrationEmojis: ["😊", "🤲", "🏠", "💼", "🤗"]
    };
  }
};

const Checkout = () => {
  const { user } = useAuth();
  const [mainDonation, setMainDonation] = useState(200);
  const [selectedMembership, setSelectedMembership] = useState('');
  const [adminFeePercentage, setAdminFeePercentage] = useState(4); // Start at 4%
  const [selectedFundraisingDonation, setSelectedFundraisingDonation] = useState(15); // Auto-select £15
  const [paymentFrequency, setPaymentFrequency] = useState('one-time');
  const [currency] = useState('GBP');
  const [isProcessing, setIsProcessing] = useState(false);
  const [celebrationEmojis, setCelebrationEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);

  const form = useForm({
    defaultValues: {
      email: user?.email || '',
      firstName: '',
      lastName: '',
      phone: '',
      isGuest: !user,
      termsAccepted: false
    }
  });

  const selectedTier = membershipTiers.find(tier => tier.id === selectedMembership);
  const membershipPrice = selectedTier?.price || 0;
  
  // Calculate fundraising donation amount
  const fundraisingAmount = selectedFundraisingDonation;
  
  const subtotal = mainDonation + membershipPrice + fundraisingAmount;
  const adminFeeAmount = (subtotal * adminFeePercentage) / 100;
  const grandTotal = subtotal + adminFeeAmount;

  const adminMessage = getAdminContributionMessage(adminFeePercentage);

  const triggerCelebration = (newPercentage: number) => {
    const message = getAdminContributionMessage(newPercentage);
    const newEmojis = message.celebrationEmojis.map((emoji, index) => ({
      id: Date.now() + index,
      emoji,
      x: Math.random() * 300 + 50,
      y: Math.random() * 100 + 50
    }));
    
    setCelebrationEmojis(prev => [...prev, ...newEmojis]);
    
    // Remove emojis after animation
    setTimeout(() => {
      setCelebrationEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)));
    }, 3000);
  };

  const handleSliderChange = (value: number[]) => {
    const newValue = value[0];
    if (newValue > adminFeePercentage) {
      triggerCelebration(newValue);
    }
    setAdminFeePercentage(newValue);
  };

  const handleFundraisingDonationClick = (amount: number) => {
    setSelectedFundraisingDonation(amount);
  };

  const handleSubmit = async (data: any) => {
    setIsProcessing(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Processing donation:', {
        ...data,
        mainDonation,
        membership: selectedTier,
        fundraisingDonation: fundraisingAmount,
        adminFeePercentage,
        adminFeeAmount,
        total: grandTotal,
        frequency: paymentFrequency
      });
      
      alert('Donation processed successfully! 🎉');
    } catch (error) {
      console.error('Error processing donation:', error);
      alert('Error processing donation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Main Donation Section */}
            <Card className="mb-6 shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <Heart className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-gray-800">Where Most Needed</CardTitle>
                      <p className="text-sm text-gray-600">MKD-MN-001</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600 text-white">£200</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-600 mb-2 block">Amount</Label>
                    <div className="flex items-center space-x-2 mb-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMainDonation(Math.max(10, mainDonation - 10))}
                        className="w-10 h-10"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={mainDonation}
                        onChange={(e) => setMainDonation(Number(e.target.value))}
                        className="text-center text-lg font-semibold flex-1"
                        min="10"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMainDonation(mainDonation + 10)}
                        className="w-10 h-10"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {suggestedAmounts.map((amount) => (
                        <Button
                          key={amount}
                          type="button"
                          variant={mainDonation === amount ? "default" : "outline"}
                          className="h-10"
                          onClick={() => setMainDonation(amount)}
                        >
                          £{amount}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600 flex items-center mb-2">
                      <Info className="h-4 w-4 mr-1" />
                      Who is this donation on behalf of?
                    </Label>
                    <Input
                      placeholder="For the sake of Allah SWT"
                      className="border-pink-300 focus:border-pink-500"
                      style={{ borderColor: '#ec4899' }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fundraising Donation Section */}
            <Card className="mb-6 shadow-sm border-gray-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800 flex items-center">
                  <Gift className="h-5 w-5 mr-2 text-green-600" />
                  Fundraising Donation
                </CardTitle>
                <p className="text-sm text-gray-600">Your donation is multiplied by 7x through our fundraising partners</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {fundraisingDonations.map((donation) => (
                    <div
                      key={donation.amount}
                      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedFundraisingDonation === donation.amount
                          ? 'border-green-500 bg-green-100'
                          : 'border-gray-200 bg-white hover:border-green-300'
                      }`}
                      onClick={() => handleFundraisingDonationClick(donation.amount)}
                    >
                      {donation.label && (
                        <div className="absolute -top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
                          {donation.label}
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">£{donation.amount}</div>
                        <div className="text-sm text-green-600 font-medium">Worth £{donation.value}</div>
                        <div className="text-xs text-gray-500">to those in need</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {fundraisingAmount > 0 && (
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-800">
                        Your £{fundraisingAmount.toFixed(2)} fundraising donation provides £{(fundraisingAmount * 7).toFixed(2)} worth of aid
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFundraisingDonation(0)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Admin Contribution Section */}
            <Card className="mb-6 shadow-lg border-2 border-gradient-to-r from-pink-200 to-purple-200 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden relative">
              {/* Celebration Emojis */}
              {celebrationEmojis.map(({ id, emoji, x, y }) => (
                <div
                  key={id}
                  className="absolute pointer-events-none text-2xl animate-float-up z-20"
                  style={{ left: `${x}px`, top: `${y}px` }}
                >
                  {emoji}
                </div>
              ))}

              <CardHeader className="pb-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform rotate-3">
                      <Heart className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                        Admin Contribution
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-md">
                          {adminFeePercentage}% (£{adminFeeAmount.toFixed(2)})
                        </Badge>
                        <div className="ml-3 text-lg">
                          {adminMessage.emoji}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Animated Message Box */}
                <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${adminMessage.bgGradient} border-2 ${adminMessage.borderColor} shadow-xl transform transition-all duration-500 hover:scale-105`}>
                  <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>
                  <div className="relative">
                    <p className={`text-lg ${adminMessage.textColor} font-semibold text-center leading-relaxed`}>
                      <span className="text-2xl mr-3">{adminMessage.emoji}</span>
                      {adminMessage.message}
                    </p>
                  </div>
                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 text-white opacity-70 animate-sparkle">✨</div>
                  <div className="absolute bottom-2 left-2 text-white opacity-70 animate-sparkle" style={{ animationDelay: '1s' }}>⭐</div>
                </div>

                {/* Enhanced Slider */}
                <div className="space-y-6">
                  <div className="relative p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border-2 border-gradient-to-r from-blue-200 to-purple-200 shadow-inner">
                    <div className="relative">
                      <Slider
                        value={[adminFeePercentage]}
                        onValueChange={handleSliderChange}
                        max={20}
                        min={0.5}
                        step={0.5}
                        className="w-full h-6 relative z-10"
                      />
                      
                      {/* Custom track styling */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="h-6 flex items-center">
                          <div className="w-full h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full shadow-inner"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm font-medium text-gray-600 mt-4 px-2">
                      <span className="bg-white px-2 py-1 rounded-full shadow-sm">0.5%</span>
                      <span className="bg-white px-2 py-1 rounded-full shadow-sm">5%</span>
                      <span className="bg-white px-2 py-1 rounded-full shadow-sm">10%</span>
                      <span className="bg-white px-2 py-1 rounded-full shadow-sm">15%</span>
                      <span className="bg-white px-2 py-1 rounded-full shadow-sm">20%</span>
                    </div>
                  </div>
                  
                  {/* Quick Selection Buttons */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[2, 4, 6, 8].map((percentage) => (
                      <Button
                        key={percentage}
                        type="button"
                        variant={adminFeePercentage === percentage ? "default" : "outline"}
                        className={`h-14 text-lg font-bold transition-all duration-300 transform hover:scale-105 shadow-md ${
                          adminFeePercentage === percentage 
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-0 shadow-lg' 
                            : 'bg-white border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                        }`}
                        onClick={() => {
                          if (percentage > adminFeePercentage) {
                            triggerCelebration(percentage);
                          }
                          setAdminFeePercentage(percentage);
                        }}
                      >
                        {percentage}%
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Info Section */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <Info className="h-4 w-4 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed font-medium">
                      We have agreed 100% donation with ALL our donation partners. Admin contribution helps us help them with their running costs - they work very hard to deliver aid and also have families to support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Guest Information */}
            {!user && (
              <Card className="mb-6 shadow-sm border-gray-200">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Your Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
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
                            <Input {...field} />
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
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
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
                          <FormLabel>Phone (Optional)</FormLabel>
                          <FormControl>
                            <Input type="tel" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Total Summary */}
            <Card className="mb-6 shadow-sm border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-gray-800 mb-2">Grand Total £{grandTotal.toFixed(2)}</div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                    This is a one-off donation, you will donate only once
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 mb-6">
                  <Button variant="outline" className="flex-1 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                    Back
                  </Button>
                  <Button variant="outline" className="flex-1 bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
                    Share Link
                  </Button>
                  <Button 
                    type="submit"
                    disabled={isProcessing || !form.watch('termsAccepted')}
                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                  >
                    {isProcessing ? 'Processing...' : 'Next →'}
                  </Button>
                </div>

                {/* Payment Methods */}
                <div className="flex justify-center space-x-4 mb-6">
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwMzA4NyIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="PayPal" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwNTFBNSIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Visa" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+" alt="Mastercard" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Apple Pay" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Google Pay" className="h-8" />
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">100% Secure Checkout</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">100% Donation Policy</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                      <Lock className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-sm font-medium text-gray-700">We Protect Your Privacy</div>
                  </div>
                </div>

                {/* Terms */}
                <div className="mt-6">
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
                            I agree to the Terms & Conditions and Privacy Policy
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Checkout;

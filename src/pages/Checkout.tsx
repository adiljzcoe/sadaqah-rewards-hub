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
import FloatingCheckoutWidget from '@/components/FloatingCheckoutWidget';
import { Heart, Plus, Minus, X, Crown, Zap, Star, Gift, TrendingUp, Users, Shield, CreditCard, Mail, Phone, User, AlertTriangle, Target, Check, Lock, Info, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocation, useToast } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';

const membershipTiers = [
  { 
    id: 'basic', 
    name: 'Guardian Angel', 
    price: 19.99, 
    originalPrice: 29.99,
    multiplier: 2, 
    sadaqahCoins: 19990, // 1000 coins per £1
    features: ['2x Points', '2x Coins', 'Priority Support', 'Monthly Newsletter', '19,990 Sadaqah Coins'],
    badge: 'POPULAR'
  },
  { 
    id: 'premium', 
    name: 'Heavenly Hero', 
    price: 39.99, 
    originalPrice: 59.99,
    multiplier: 3, 
    sadaqahCoins: 39990, // 1000 coins per £1
    features: ['3x Points', '3x Coins', 'VIP Access', 'Monthly Rewards', 'Exclusive Content', '39,990 Sadaqah Coins'],
    badge: 'BEST VALUE'
  },
  { 
    id: 'elite', 
    name: 'Divine Champion', 
    price: 79.99, 
    originalPrice: 119.99,
    multiplier: 5, 
    sadaqahCoins: 79990, // 1000 coins per £1
    features: ['5x Points', '5x Coins', 'Exclusive Events', 'Personal Manager', 'Early Access', '79,990 Sadaqah Coins'],
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

// Intention options for "Where Most Needed" product
const intentionOptions = [
  "For the sake of Allah SWT",
  "In memory of my beloved family member",
  "For my health and well-being",
  "For my family's protection",
  "For forgiveness of my sins",
  "For success in this life and the next",
  "For my parents' well-being",
  "For the Ummah worldwide"
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

const getFundraisingMessage = (amount: number) => {
  if (amount >= 100) {
    return {
      emoji: "🌟✨🎉",
      message: "You're a SUPERHERO! This will transform entire communities!",
      bgGradient: "from-purple-400 via-pink-400 to-red-400",
      textColor: "text-white",
      borderColor: "border-purple-300",
      celebrationEmojis: ["🎉", "🌟", "✨", "💫", "🎊"]
    };
  } else if (amount >= 50) {
    return {
      emoji: "😍🙌💖",
      message: "AMAZING! You're making dreams come true!",
      bgGradient: "from-blue-400 via-purple-400 to-pink-400",
      textColor: "text-white",
      borderColor: "border-blue-300",
      celebrationEmojis: ["🙌", "😍", "💖", "🚀", "⭐"]
    };
  } else if (amount >= 25) {
    return {
      emoji: "😊💙🌈",
      message: "Wonderful! Your generosity brings hope!",
      bgGradient: "from-green-400 via-blue-400 to-purple-400",
      textColor: "text-white",
      borderColor: "border-green-300",
      celebrationEmojis: ["😊", "💙", "🌈", "💚", "✨"]
    };
  } else if (amount >= 15) {
    return {
      emoji: "😌💚🤝",
      message: "Perfect! You're making a real difference!",
      bgGradient: "from-yellow-400 via-green-400 to-blue-400",
      textColor: "text-white",
      borderColor: "border-green-200",
      celebrationEmojis: ["😌", "💚", "🤝", "👍", "💫"]
    };
  } else if (amount >= 5) {
    return {
      emoji: "🙂👍💪",
      message: "Thank you! Every donation matters!",
      bgGradient: "from-orange-300 via-yellow-400 to-green-400",
      textColor: "text-white",
      borderColor: "border-orange-200",
      celebrationEmojis: ["🙂", "👍", "💪", "🌟", "💛"]
    };
  } else {
    return {
      emoji: "😊🤲",
      message: "Your kindness helps families in need!",
      bgGradient: "from-gray-300 via-blue-300 to-green-300",
      textColor: "text-gray-800",
      borderColor: "border-gray-200",
      celebrationEmojis: ["😊", "🤲", "🏠", "💼", "🤗"]
    };
  }
};

const Checkout = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [mainDonation, setMainDonation] = useState(200);
  const [donationIntention, setDonationIntention] = useState("For the sake of Allah SWT");
  const [selectedMembership, setSelectedMembership] = useState('');
  const [adminFeePercentage, setAdminFeePercentage] = useState(2.5);
  const [selectedFundraisingDonation, setSelectedFundraisingDonation] = useState(15);
  const [paymentFrequency, setPaymentFrequency] = useState('one-time');
  const [currency] = useState('GBP');
  const [isProcessing, setIsProcessing] = useState(false);
  const [celebrationEmojis, setCelebrationEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);
  const [fundraisingCelebrationEmojis, setFundraisingCelebrationEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);
  const [membershipCelebrationEmojis, setMembershipCelebrationEmojis] = useState<Array<{id: number, emoji: string, x: number, y: number}>>([]);

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

  // Auto-fill form when user logs in
  useEffect(() => {
    if (user) {
      const fullName = user.user_metadata?.full_name || '';
      const nameParts = fullName.split(' ');
      
      form.setValue('email', user.email || '');
      form.setValue('firstName', nameParts[0] || '');
      form.setValue('lastName', nameParts.slice(1).join(' ') || '');
      form.setValue('isGuest', false);
      setShowAuthForm(false);
    }
  }, [user, form]);

  const selectedTier = membershipTiers.find(tier => tier.id === selectedMembership);
  const membershipPrice = selectedTier?.price || 0;
  
  // Calculate membership fee breakdown
  const membershipAdminFee = membershipPrice * 0.05; // 5% admin
  const membershipFundraisingFee = membershipPrice * 0.05; // 5% fundraising
  const membershipNetAmount = membershipPrice - membershipAdminFee - membershipFundraisingFee; // 90% to platform
  
  // Calculate fundraising donation amount
  const fundraisingAmount = selectedFundraisingDonation;
  
  const subtotal = mainDonation + membershipPrice + fundraisingAmount;
  const adminFeeAmount = (subtotal * adminFeePercentage) / 100;
  const grandTotal = subtotal + adminFeeAmount;

  const adminMessage = getAdminContributionMessage(adminFeePercentage);

  const fundraisingMessage = getFundraisingMessage(selectedFundraisingDonation);

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

  const triggerFundraisingCelebration = (newAmount: number) => {
    const message = getFundraisingMessage(newAmount);
    const newEmojis = message.celebrationEmojis.map((emoji, index) => ({
      id: Date.now() + index,
      emoji,
      x: Math.random() * 300 + 50,
      y: Math.random() * 100 + 50
    }));
    
    setFundraisingCelebrationEmojis(prev => [...prev, ...newEmojis]);
    
    // Remove emojis after animation
    setTimeout(() => {
      setFundraisingCelebrationEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)));
    }, 3000);
  };

  const triggerMembershipCelebration = (tierName: string) => {
    const celebrationEmojis = ["👑", "✨", "🎉", "⭐", "💫"];
    const newEmojis = celebrationEmojis.map((emoji, index) => ({
      id: Date.now() + index,
      emoji,
      x: Math.random() * 300 + 50,
      y: Math.random() * 100 + 50
    }));
    
    setMembershipCelebrationEmojis(prev => [...prev, ...newEmojis]);
    
    // Remove emojis after animation
    setTimeout(() => {
      setMembershipCelebrationEmojis(prev => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)));
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
    if (amount > selectedFundraisingDonation) {
      triggerFundraisingCelebration(amount);
    }
    setSelectedFundraisingDonation(amount);
  };

  const handleMembershipSelect = (tierName: string) => {
    if (tierName !== selectedMembership) {
      triggerMembershipCelebration(tierName);
    }
    setSelectedMembership(tierName);
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

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    
    try {
      if (authMode === 'signin') {
        await signIn(authEmail, authPassword);
      } else {
        await signUp(authEmail, authPassword, authName);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setAuthLoading(false);
    }
  };

  const handlePayNowFromWidget = () => {
    if (!form.watch('termsAccepted')) {
      // Scroll to terms section
      const termsElement = document.querySelector('[name="termsAccepted"]');
      termsElement?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    form.handleSubmit(handleSubmit)();
  };

  const handleShowAuthFromWidget = () => {
    setShowAuthForm(true);
    // Scroll to auth section
    const authElement = document.querySelector('[data-auth-form]');
    authElement?.scrollIntoView({ behavior: 'smooth' });
  };

  // Calculate total impact value
  const totalImpactValue = mainDonation + (fundraisingAmount * 7) + (selectedTier ? selectedTier.price : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl pb-32">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {/* Enhanced Main Donation Section */}
            <Card className="mb-8 shadow-xl border-2 border-gradient-to-r from-blue-200 to-purple-200 bg-gradient-to-br from-white via-blue-50 to-purple-50 overflow-hidden relative">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>
              
              <CardContent className="p-8 relative z-10">
                {/* Single Row Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center mb-6">
                  {/* Product Info Section */}
                  <div className="flex items-center lg:col-span-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300 flex-shrink-0">
                      <Heart className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                        Where Most Needed
                      </h3>
                      <div className="flex items-center flex-wrap gap-2">
                        <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs border-0 font-medium">
                          MKD-MN-001
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Intention Section */}
                  <div className="lg:col-span-1">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center mb-2">
                      <Heart className="h-4 w-4 text-pink-500 mr-2" />
                      Donation Intention
                    </Label>
                    <Select value={donationIntention} onValueChange={setDonationIntention}>
                      <SelectTrigger className="h-11 border-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 hover:border-blue-300 focus:border-purple-400 transition-colors shadow-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-2 border-blue-200 shadow-xl rounded-xl max-h-60">
                        {intentionOptions.map((intention) => (
                          <SelectItem 
                            key={intention} 
                            value={intention}
                            className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer py-2"
                          >
                            {intention}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Amount Controls Section */}
                  <div className="lg:col-span-1">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center mb-2">
                      <CreditCard className="h-4 w-4 text-green-500 mr-2" />
                      Amount
                    </Label>
                    <div className="flex items-center space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMainDonation(Math.max(10, mainDonation - 10))}
                        className="w-11 h-11 border-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-105 shadow-md flex-shrink-0"
                      >
                        <Minus className="h-4 w-4 text-blue-600" />
                      </Button>
                      <Input
                        type="number"
                        value={mainDonation}
                        onChange={(e) => setMainDonation(Number(e.target.value))}
                        className="text-center font-bold text-lg h-11 border-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 focus:border-purple-400 shadow-sm flex-1 min-w-0"
                        min="10"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setMainDonation(mainDonation + 10)}
                        className="w-11 h-11 border-2 border-blue-200 bg-gradient-to-r from-white to-blue-50 hover:from-blue-100 hover:to-purple-100 hover:border-blue-300 transition-all duration-200 transform hover:scale-105 shadow-md flex-shrink-0"
                      >
                        <Plus className="h-4 w-4 text-blue-600" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Info Bar */}
                <div className="p-4 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-xl border-2 border-green-200 shadow-inner">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-semibold text-green-800">
                        100% of your donation reaches those in need
                      </span>
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md text-xs px-3 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified Impact
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Fundraising Donation Section */}
            <Card className="mb-6 shadow-lg border-2 border-gradient-to-r from-green-200 to-emerald-200 bg-gradient-to-br from-white via-green-50 to-emerald-50 overflow-hidden relative">
              {/* Celebration Emojis */}
              {fundraisingCelebrationEmojis.map(({ id, emoji, x, y }) => (
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
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform -rotate-3">
                      <Gift className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Fundraising Donation
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 shadow-md">
                          £{fundraisingAmount.toFixed(2)} → Worth £{(fundraisingAmount * 7).toFixed(2)}
                        </Badge>
                        <div className="ml-3 text-lg">
                          {fundraisingMessage.emoji}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Your donation is multiplied by 7x through our fundraising partners</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Animated Message Box */}
                <div className={`relative p-6 rounded-2xl bg-gradient-to-r ${fundraisingMessage.bgGradient} border-2 ${fundraisingMessage.borderColor} shadow-xl transform transition-all duration-500 hover:scale-105`}>
                  <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>
                  <div className="relative">
                    <p className={`text-lg ${fundraisingMessage.textColor} font-semibold text-center leading-relaxed`}>
                      <span className="text-2xl mr-3">{fundraisingMessage.emoji}</span>
                      {fundraisingMessage.message}
                    </p>
                  </div>
                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 text-white opacity-70 animate-sparkle">✨</div>
                  <div className="absolute bottom-2 left-2 text-white opacity-70 animate-sparkle" style={{ animationDelay: '1s' }}>⭐</div>
                </div>

                {/* Enhanced Donation Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {fundraisingDonations.map((donation) => (
                    <div
                      key={donation.amount}
                      className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedFundraisingDonation === donation.amount
                          ? 'border-green-500 bg-gradient-to-br from-green-100 to-emerald-100 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                      }`}
                      onClick={() => handleFundraisingDonationClick(donation.amount)}
                    >
                      {donation.label && (
                        <div className="absolute -top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                          {donation.label}
                        </div>
                      )}
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-800">£{donation.amount}</div>
                        <div className="text-sm text-green-600 font-medium">Worth £{donation.value}</div>
                        <div className="text-xs text-gray-500">to those in need</div>
                      </div>
                      {selectedFundraisingDonation === donation.amount && (
                        <div className="absolute inset-0 rounded-xl bg-green-500 opacity-10"></div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Enhanced Summary Box */}
                {fundraisingAmount > 0 && (
                  <div className="mt-4 p-6 bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 rounded-2xl border-2 border-green-200 shadow-inner">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                          <Gift className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-lg text-green-800 font-semibold">
                          Your £{fundraisingAmount.toFixed(2)} provides £{(fundraisingAmount * 7).toFixed(2)} worth of aid!
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedFundraisingDonation(0)}
                        className="text-green-600 hover:text-green-800 hover:bg-green-100 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Your Total Impact Section */}
            <Card className="mb-6 shadow-lg border-2 border-gradient-to-r from-emerald-200 to-green-200 bg-gradient-to-br from-white via-emerald-50 to-green-50 overflow-hidden relative">
              <CardHeader className="pb-4 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform -rotate-3">
                      <TrendingUp className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        Your Total Impact
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0 shadow-md">
                          Worth £{totalImpactValue.toFixed(2)} to those in need
                        </Badge>
                        <div className="ml-3 text-lg">
                          🌟💫✨
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">See the incredible value you're creating through our platform</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Impact Breakdown */}
                <div className="relative p-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 border-2 border-emerald-300 shadow-xl">
                  <div className="absolute inset-0 bg-white opacity-10 rounded-2xl"></div>
                  <div className="relative">
                    <div className="text-center mb-4">
                      <div className="text-3xl font-bold text-white mb-2">
                        £{totalImpactValue.toFixed(2)}
                      </div>
                      <div className="text-lg text-emerald-100 font-semibold">
                        Total Value to Those in Need
                      </div>
                    </div>
                    
                    <div className="space-y-3 bg-white/20 rounded-xl p-4">
                      <div className="flex justify-between items-center text-white">
                        <span className="flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          Main Donation
                        </span>
                        <span className="font-semibold">£{mainDonation.toFixed(2)}</span>
                      </div>
                      
                      {fundraisingAmount > 0 && (
                        <div className="flex justify-between items-center text-white">
                          <span className="flex items-center">
                            <Gift className="h-4 w-4 mr-2" />
                            Fundraising Impact (7x)
                          </span>
                          <span className="font-semibold">£{(fundraisingAmount * 7).toFixed(2)}</span>
                        </div>
                      )}
                      
                      {selectedTier && (
                        <div className="flex justify-between items-center text-white">
                          <span className="flex items-center">
                            <Crown className="h-4 w-4 mr-2" />
                            Membership Value
                          </span>
                          <span className="font-semibold">£{selectedTier.price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Sparkle Effects */}
                  <div className="absolute top-2 right-2 text-white opacity-70 animate-sparkle">✨</div>
                  <div className="absolute bottom-2 left-2 text-white opacity-70 animate-sparkle" style={{ animationDelay: '1s' }}>⭐</div>
                  <div className="absolute top-1/2 right-4 text-white opacity-70 animate-sparkle" style={{ animationDelay: '2s' }}>💫</div>
                </div>

                {/* Comparison Message */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <Info className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Why Choose Our Platform?</h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        Through our fundraising partnerships, your £{fundraisingAmount.toFixed(2)} donation becomes worth £{(fundraisingAmount * 7).toFixed(2)} to those in need - that's <span className="font-bold text-green-600">7x more impact</span> than donating anywhere else!
                      </p>
                    </div>
                  </div>
                </div>
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

            {/* Enhanced Membership Upsell Section */}
            <Card className="mb-6 shadow-lg border-2 border-gradient-to-r from-purple-200 to-pink-200 bg-gradient-to-br from-white via-purple-50 to-pink-50 overflow-hidden relative">
              {/* Celebration Emojis */}
              {membershipCelebrationEmojis.map(({ id, emoji, x, y }) => (
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
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg transform rotate-3">
                      <Crown className="h-8 w-8 text-white animate-pulse" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Upgrade Your Impact
                      </CardTitle>
                      <div className="flex items-center mt-2">
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-md">
                          1000 Sadaqah Coins per £1
                        </Badge>
                        <div className="ml-3 text-lg">
                          ✨👑💫
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Earn sadaqah coins for every £1 spent - use for micropayments within our system</p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Membership Tiers */}
                <div className="grid md:grid-cols-3 gap-4">
                  {membershipTiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={`relative p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedMembership === tier.id
                          ? 'border-purple-500 bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl'
                          : 'border-gray-200 bg-white hover:border-purple-300 hover:shadow-lg'
                      }`}
                      onClick={() => handleMembershipSelect(tier.id)}
                    >
                      {tier.badge && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full shadow-md font-bold">
                          {tier.badge}
                        </div>
                      )}
                      
                      <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Crown className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{tier.name}</h3>
                        
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 line-through">£{tier.originalPrice}</div>
                          <div className="text-2xl font-bold text-purple-600">£{tier.price}</div>
                          <div className="text-sm text-gray-600">per month</div>
                        </div>
                        
                        <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-300 mb-2">
                          {tier.multiplier}x Rewards
                        </Badge>
                        
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-300 mb-4 block">
                          {tier.sadaqahCoins.toLocaleString()} Coins
                        </Badge>
                        
                        <div className="space-y-2 text-left">
                          {tier.features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {tier.features.length > 4 && (
                            <div className="text-xs text-gray-500">
                              +{tier.features.length - 4} more benefits
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {selectedMembership === tier.id && (
                        <div className="absolute inset-0 rounded-xl bg-purple-500 opacity-10"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Selected Membership Summary */}
                {selectedTier && (
                  <div className="mt-6 p-6 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-2xl border-2 border-purple-200 shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4">
                          <Crown className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <span className="text-lg text-purple-800 font-semibold">
                            {selectedTier.name} Membership
                          </span>
                          <div className="text-sm text-purple-600">
                            Unlock {selectedTier.multiplier}x rewards + {selectedTier.sadaqahCoins.toLocaleString()} coins!
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-purple-800">
                          £{selectedTier.price}/month
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedMembership('')}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Fee Breakdown */}
                    <div className="bg-white p-4 rounded-xl border border-purple-200 space-y-2">
                      <h4 className="font-semibold text-gray-800 mb-2">Monthly Fee Breakdown:</h4>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Platform Access (90%)</span>
                        <span className="font-medium">£{membershipNetAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Admin Support (5%)</span>
                        <span className="font-medium">£{membershipAdminFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Fundraising Pool (5%)</span>
                        <span className="font-medium">£{membershipFundraisingFee.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold">
                        <span>Total Monthly</span>
                        <span>£{selectedTier.price}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sadaqah Coins Explanation */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 shadow-sm">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mr-4 flex-shrink-0 mt-1">
                      <Star className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">How Sadaqah Coins Work</h4>
                      <p className="text-sm text-gray-700 leading-relaxed mb-2">
                        Receive 1000 sadaqah coins for every £1 of your membership fee. Use these coins for micropayments within our system throughout the month.
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        At month's end, all coin usage is totaled and the equivalent amount is distributed to verified charities based on your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Details Section with Login Options */}
            <Card className="mb-6 shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-800 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Your Details
                  </CardTitle>
                  {!user && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowAuthForm(!showAuthForm)}
                      className="flex items-center gap-2 text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      <LogIn className="h-4 w-4" />
                      Sign In to Auto-fill
                    </Button>
                  )}
                </div>
                {user && (
                  <p className="text-sm text-green-600 font-medium">
                    ✓ Signed in as {user.email}
                  </p>
                )}
              </CardHeader>
              <CardContent data-auth-form>
                {/* Quick Login Form */}
                {!user && showAuthForm && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <form onSubmit={handleAuth} className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="flex bg-white rounded-lg p-1 border">
                          <button
                            type="button"
                            onClick={() => setAuthMode('signin')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              authMode === 'signin'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Sign In
                          </button>
                          <button
                            type="button"
                            onClick={() => setAuthMode('signup')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                              authMode === 'signup'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                          >
                            Sign Up
                          </button>
                        </div>
                      </div>

                      {authMode === 'signup' && (
                        <div>
                          <Label htmlFor="auth-name" className="text-sm font-medium">Full Name</Label>
                          <Input
                            id="auth-name"
                            type="text"
                            value={authName}
                            onChange={(e) => setAuthName(e.target.value)}
                            placeholder="Enter your full name"
                            required={authMode === 'signup'}
                            className="mt-1"
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="auth-email" className="text-sm font-medium">Email</Label>
                        <Input
                          id="auth-email"
                          type="email"
                          value={authEmail}
                          onChange={(e) => setAuthEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="auth-password" className="text-sm font-medium">Password</Label>
                        <Input
                          id="auth-password"
                          type="password"
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          minLength={6}
                          className="mt-1"
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={authLoading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          {authLoading ? 'Please wait...' : (authMode === 'signin' ? 'Sign In' : 'Sign Up')}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowAuthForm(false)}
                          className="px-6"
                        >
                          Cancel
                        </Button>
                      </div>

                      <p className="text-xs text-gray-600 text-center">
                        {authMode === 'signin' 
                          ? "Don't have an account? Click Sign Up above" 
                          : "Already have an account? Click Sign In above"
                        }
                      </p>
                    </form>
                  </div>
                )}

                {/* User Details Form */}
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

            {/* Total Summary with Detailed Breakdown */}
            <Card className="mb-6 shadow-sm border-gray-200">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg text-gray-800 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {/* Itemized Breakdown */}
                <div className="space-y-3 mb-6">
                  {/* Main Donation */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-red-500 mr-2" />
                      <div>
                        <span className="font-medium text-gray-800">Where Most Needed Donation</span>
                        <div className="text-xs text-gray-500">MKD-MN-001</div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-800">£{mainDonation.toFixed(2)}</span>
                  </div>

                  {/* Membership */}
                  {selectedTier && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <Crown className="h-4 w-4 text-purple-500 mr-2" />
                        <div>
                          <span className="font-medium text-gray-800">{selectedTier.name} Membership</span>
                          <div className="text-xs text-gray-500">Monthly subscription • {selectedTier.sadaqahCoins.toLocaleString()} coins</div>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">£{selectedTier.price.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Fundraising Donation */}
                  {fundraisingAmount > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 text-green-500 mr-2" />
                        <div>
                          <span className="font-medium text-gray-800">Fundraising Donation</span>
                          <div className="text-xs text-gray-500">Worth £{(fundraisingAmount * 7).toFixed(2)} to those in need</div>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-800">£{fundraisingAmount.toFixed(2)}</span>
                    </div>
                  )}

                  {/* Subtotal */}
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Subtotal</span>
                    <span className="font-semibold text-gray-800">£{subtotal.toFixed(2)}</span>
                  </div>

                  {/* Admin Fee */}
                  <div className="flex justify-between items-center py-2">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-pink-500 mr-2" />
                      <div>
                        <span className="font-medium text-gray-700">Admin Contribution</span>
                        <div className="text-xs text-gray-500">{adminFeePercentage}% • Supports our partners' operations</div>
                      </div>
                    </div>
                    <span className="font-semibold text-gray-800">£{adminFeeAmount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="border-t-2 border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Total</span>
                    <span className="text-2xl font-bold text-gray-800">£{grandTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600 mt-2">
                    <div className="w-4 h-4 rounded-full bg-pink-500 mr-2"></div>
                    This is a one-off payment
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
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="PayPal" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0iIzAwNTFBNSIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Visa" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0iI0VCMDAxQiIvPgo8Y2lyY2xlIGN4PSIxNSIgY3k9IjEyIiByPSI2IiBmaWxsPSIjRkY1RjAwIi8+CjxjaXJjbGUgY3g9IjI1IiBjeT0iMTIiIHI9IjYiIGZpbGw9IiNGRkY1RjAiLz4KPC9zdmc+" alt="Mastercard" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0iIzAwMDAwMCIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Apple Pay" className="h-8" />
                  <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCA0MCAyNCIgZmlsbD0iIzQyODVGNCIvPgo8cGF0aCBkPSJNMTcuNSA5LjVoLTNWMTVoM3YtNS41eiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+" alt="Google Pay" className="h-8" />
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

      {/* Floating Checkout Widget */}
      <FloatingCheckoutWidget
        total={grandTotal}
        impactTotal={totalImpactValue}
        fundraisingAmount={fundraisingAmount}
        isProcessing={isProcessing}
        onPayNow={handlePayNowFromWidget}
        onShowAuth={handleShowAuthFromWidget}
        termsAccepted={form.watch('termsAccepted')}
      />
    </div>
  );
};

export default Checkout;

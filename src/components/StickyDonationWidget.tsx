import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Heart, Sparkles, Zap } from 'lucide-react';

const quickAmounts = [10, 25, 50, 100];
const currencies = [
  { code: 'GBP', symbol: '£' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' }
];

const emergencyCauses = [
  { 
    id: 'palestine', 
    name: 'Palestine Emergency', 
    urgent: true, 
    impact: 'Save lives now',
    color: 'text-red-600',
    bgColor: 'bg-red-50 border-red-200'
  },
  { 
    id: 'pakistan', 
    name: 'Pakistan Floods', 
    urgent: true, 
    impact: 'Emergency relief',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 border-orange-200'
  },
  { 
    id: 'syria', 
    name: 'Syria Crisis', 
    urgent: false, 
    impact: 'Medical aid',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200'
  },
  { 
    id: 'yemen', 
    name: 'Yemen Hunger', 
    urgent: true, 
    impact: 'Feed families',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 border-purple-200'
  }
];

const StickyDonationWidget = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('sadaqah');
  const [selectedCause, setSelectedCause] = useState('palestine');
  const [currency, setCurrency] = useState('GBP');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsSticky(scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCurrency = currencies.find(c => c.code === currency);
  const currentCause = emergencyCauses.find(c => c.id === selectedCause);
  const donationAmount = Number(customAmount) || selectedAmount;
  const sadaqahCoins = donationAmount * 10; // 10 coins per currency unit
  const jannahPoints = donationAmount * 10; // 10 points per currency unit

  // Dynamic impact message based on donation amount
  const getImpactMessage = (amount: number) => {
    if (amount >= 100) return "= JANNAH SUPERSTAR! 🌟";
    if (amount >= 50) return "= MASSIVE IMPACT! 💫";
    if (amount >= 25) return "= HUGE IMPACT! ⚡";
    if (amount >= 10) return "= AMAZING IMPACT! ✨";
    return "= GREAT IMPACT! 🎯";
  };

  return (
    <div className={`${isSticky ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg transition-all duration-300`}>
      <div className="container mx-auto px-4 py-2">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-2 h-8">
            <TabsTrigger value="sadaqah" className="text-xs py-1">Sadaqah</TabsTrigger>
            <TabsTrigger value="zakat" className="text-xs py-1">Zakat</TabsTrigger>
            <TabsTrigger value="lillah" className="text-xs py-1">Lillah</TabsTrigger>
            <TabsTrigger value="monthly" className="text-xs py-1">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-12 gap-2 items-end">
              {/* Emergency Cause Selection */}
              <div className="col-span-4">
                <Select value={selectedCause} onValueChange={setSelectedCause}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyCauses.map((cause) => (
                      <SelectItem key={cause.id} value={cause.id}>
                        <div className="flex items-center space-x-2">
                          {cause.urgent && <AlertCircle className="h-3 w-3 text-red-500" />}
                          <span className={cause.color}>{cause.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quick amounts */}
              <div className="col-span-4 grid grid-cols-4 gap-1">
                {quickAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`py-1.5 px-1 rounded text-xs font-medium transition-all ${
                      selectedAmount === amount && !customAmount
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {currentCurrency?.symbol}{amount}
                  </button>
                ))}
              </div>

              {/* Custom amount & Currency */}
              <div className="col-span-2 flex gap-1">
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-8 w-12 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((curr) => (
                      <SelectItem key={curr.code} value={curr.code}>
                        {curr.symbol}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  placeholder="Other"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(0);
                  }}
                  className="h-8 text-xs flex-1"
                />
              </div>

              {/* Donate button */}
              <div className="col-span-2">
                <Button className="w-full h-8 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium">
                  <Heart className="h-3 w-3 mr-1" />
                  {currentCurrency?.symbol}{donationAmount}
                </Button>
              </div>
            </div>

            {/* Exciting Impact message & Payment icons */}
            <div className="flex items-center justify-between mt-2">
              {/* Exciting Total impact message */}
              <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 animate-shimmer opacity-20"></div>
                <div className="relative px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 border-2 border-gradient-to-r from-emerald-200 via-blue-200 to-purple-200 animate-subtle-pulse">
                  <div className="flex items-center space-x-1 flex-wrap">
                    <Sparkles className="h-3 w-3 text-emerald-600 animate-bounce" />
                    <span className="text-xs font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                      🚀 TOTAL IMPACT: {currentCurrency?.symbol}{donationAmount} + {sadaqahCoins} Sadaqah coins from your jannah + {jannahPoints} jannah points for you {getImpactMessage(donationAmount)}
                    </span>
                    <Zap className="h-3 w-3 text-blue-600 animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Payment icons */}
              <div className="flex items-center space-x-2 ml-2">
                <span className="text-xs text-gray-500">Pay:</span>
                <div className="flex space-x-1">
                  <div className="w-5 h-3 bg-blue-600 rounded text-white text-[7px] flex items-center justify-center font-bold hover-scale">
                    PP
                  </div>
                  <div className="w-5 h-3 bg-blue-800 rounded text-white text-[7px] flex items-center justify-center font-bold hover-scale">
                    V
                  </div>
                  <div className="w-5 h-3 bg-red-600 rounded text-white text-[7px] flex items-center justify-center font-bold hover-scale">
                    MC
                  </div>
                </div>
              </div>
            </div>

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StickyDonationWidget;

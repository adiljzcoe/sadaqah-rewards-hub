import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

const quickAmounts = [25, 50, 100];
const currencies = [
  { code: 'GBP', symbol: '£', flag: '🇬🇧' },
  { code: 'USD', symbol: '$', flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', flag: '🇪🇺' }
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

const donationTypeStyles = {
  sadaqah: {
    gradient: 'bg-blue-600 hover:bg-blue-700',
    text: 'text-white',
    icon: '💝'
  },
  zakat: {
    gradient: 'bg-emerald-600 hover:bg-emerald-700',
    text: 'text-white',
    icon: '☪️'
  },
  lillah: {
    gradient: 'bg-purple-600 hover:bg-purple-700',
    text: 'text-white',
    icon: '🤲'
  },
  islamic: {
    gradient: 'bg-teal-600 hover:bg-teal-700',
    text: 'text-white',
    icon: '🕌'
  },
  monthly: {
    gradient: 'bg-orange-600 hover:bg-orange-700',
    text: 'text-white',
    icon: '📅'
  }
};

const StickyDonationWidget = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('sadaqah');
  const [selectedCause, setSelectedCause] = useState('palestine');
  const [currency, setCurrency] = useState('GBP');

  // Mock user membership status - in real app this would come from auth/database
  const isMember = true;

  useEffect(() => {
    const handleScroll = () => {
      // Find the live feed section by looking for elements with specific classes
      const liveFeedElement = document.querySelector('[class*="LiveFeed"]') || 
                             document.querySelector('.space-y-6 .hover-lift:nth-child(3)') ||
                             document.querySelector('[class*="live-feed"]');
      
      if (liveFeedElement) {
        const liveFeedRect = liveFeedElement.getBoundingClientRect();
        const liveFeedTop = liveFeedRect.top + window.scrollY;
        const liveFeedHeight = liveFeedRect.height;
        const middleOfLiveFeed = liveFeedTop + (liveFeedHeight / 2);
        
        // Become sticky when we reach the middle of the live feed section
        setIsSticky(window.scrollY > middleOfLiveFeed);
      } else {
        // Fallback: look for any element that might be the live feed section
        // This targets the third hover-lift element which should be the LiveFeed component
        const fallbackElements = document.querySelectorAll('.hover-lift');
        if (fallbackElements.length >= 3) {
          const liveFeedElement = fallbackElements[2]; // Third element (0-indexed)
          const liveFeedRect = liveFeedElement.getBoundingClientRect();
          const liveFeedTop = liveFeedRect.top + window.scrollY;
          const liveFeedHeight = liveFeedRect.height;
          const middleOfLiveFeed = liveFeedTop + (liveFeedHeight / 2);
          
          setIsSticky(window.scrollY > middleOfLiveFeed);
        } else {
          // Final fallback to original behavior if we can't find the element
          const viewportHeight = window.innerHeight;
          const scrollThreshold = viewportHeight * 0.6; // Higher threshold as fallback
          setIsSticky(window.scrollY > scrollThreshold);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentCurrency = currencies.find(c => c.code === currency);
  const donationAmount = Number(customAmount) || selectedAmount;

  return (
    <>
      <div className={`${isSticky ? 'fixed bottom-0' : 'relative'} left-0 right-0 z-50 transition-all duration-300 bg-white border-t border-gray-200 shadow-lg`}>
        <div className={`relative z-10 container mx-auto px-4 transition-all duration-300 ${isSticky ? 'py-2' : 'py-3'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Simplified TabsList */}
            <div className={`grid grid-cols-5 gap-2 mb-3 transition-all duration-300 ${isSticky ? 'mb-2' : 'mb-3'}`}>
              {Object.entries(donationTypeStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-md font-medium text-xs transition-all duration-200 ${isSticky ? 'py-1 px-2' : 'py-1.5 px-3'} ${
                    activeTab === key 
                      ? `${style.gradient} ${style.text}` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-1">
                    <span className="text-xs">{style.icon}</span>
                    <span className="font-medium capitalize">{key}</span>
                  </div>
                </button>
              ))}
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-12 gap-2 items-end">
                {/* Emergency Cause Selection or Islamic Options */}
                <div className="col-span-2">
                  {activeTab === 'islamic' ? (
                    <Select value={selectedCause} onValueChange={setSelectedCause}>
                      <SelectTrigger className={`text-xs bg-white border border-gray-300 text-gray-700 ${isSticky ? 'h-7' : 'h-8'}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100]">
                        <SelectItem value="aqiqah" className="bg-white hover:bg-gray-50 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="text-teal-600 font-medium">Aqiqah</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="fidyah" className="bg-white hover:bg-gray-50 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="text-teal-600 font-medium">Fidyah</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="kaffarah" className="bg-white hover:bg-gray-50 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="text-teal-600 font-medium">Kaffarah</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="sadaqah-jariyah" className="bg-white hover:bg-gray-50 text-gray-700">
                          <div className="flex items-center space-x-2">
                            <span className="text-teal-600 font-medium">Sadaqah Jariyah</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Select value={selectedCause} onValueChange={setSelectedCause}>
                      <SelectTrigger className={`text-xs bg-white border border-gray-300 text-gray-700 ${isSticky ? 'h-7' : 'h-8'}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100]">
                        {emergencyCauses.map((cause) => (
                          <SelectItem 
                            key={cause.id} 
                            value={cause.id} 
                            className="bg-white hover:bg-gray-50 text-gray-700"
                          >
                            <div className="flex items-center space-x-2">
                              {cause.urgent && <AlertCircle className="h-3 w-3 text-red-500" />}
                              <span className={`${cause.color} font-medium`}>{cause.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                {/* Currency selector */}
                <div className="col-span-1">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className={`w-full text-xs bg-white border border-gray-300 text-gray-700 ${isSticky ? 'h-7' : 'h-8'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100]">
                      {currencies.map((curr) => (
                        <SelectItem 
                          key={curr.code} 
                          value={curr.code} 
                          className="bg-white hover:bg-gray-50 text-gray-700"
                        >
                          <div className="flex items-center space-x-1">
                            <span>{curr.flag}</span>
                            <span className="font-medium">{curr.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick amounts */}
                <div className="col-span-3 grid grid-cols-3 gap-1">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`rounded text-xs font-medium transition-all ${isSticky ? 'py-1.5 px-1' : 'py-2 px-1'} ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                      }`}
                    >
                      {currentCurrency?.symbol}{amount}
                    </button>
                  ))}
                </div>

                {/* Custom amount */}
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Other"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className={`text-xs w-full bg-white border border-gray-300 text-gray-700 ${isSticky ? 'h-7' : 'h-8'}`}
                  />
                </div>

                {/* Pay button with gentle glow effect */}
                <div className="col-span-4 relative">
                  <Button className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all duration-300 ${isSticky ? 'h-7' : 'h-8'} relative overflow-hidden`}
                    style={{
                      boxShadow: '0 0 8px rgba(16, 185, 129, 0.3), 0 0 16px rgba(16, 185, 129, 0.2)'
                    }}
                  >
                    <span className="relative z-10">
                      Donate {currentCurrency?.symbol}{donationAmount}
                    </span>
                    
                    {isMember && (
                      <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] px-1 py-0 z-20">
                        2x
                      </Badge>
                    )}
                  </Button>
                </div>
              </div>

              {/* 100% Donation Policy - simplified and professional */}
              {!isSticky && (
                <div className="flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-600 flex items-center space-x-4">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded px-2 py-1">
                      <span className="mr-1">💯</span>
                      <span className="font-medium text-gray-700 text-xs">100% DONATION POLICY</span>
                    </div>
                    <div className="text-gray-600">
                      <span className="font-medium">Your donation = {donationAmount * 10} Sadaqah points</span>
                    </div>
                  </div>
                  
                  {/* Payment methods image */}
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                      alt="Accepted payment methods: PayPal, Visa, Mastercard, Apple Pay, Google Pay"
                      className="h-4 object-contain opacity-70"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default StickyDonationWidget;

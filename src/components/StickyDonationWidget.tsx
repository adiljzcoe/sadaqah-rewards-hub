import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Coins } from 'lucide-react';

const quickAmounts = [25, 50, 100];
const currencies = [
  { code: 'GBP', symbol: '£', flag: '/lovable-uploads/3ed3cf1b-92db-4933-abeb-6b5d005cf4bf.png' },
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
  },
  coins: {
    gradient: 'bg-yellow-600 hover:bg-yellow-700',
    text: 'text-white',
    icon: '🪙'
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
      <style>{`
        @keyframes gentle-pulse {
          0% {
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.3), 0 0 16px rgba(16, 185, 129, 0.2);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 12px rgba(16, 185, 129, 0.4), 0 0 24px rgba(16, 185, 129, 0.3);
            transform: scale(1.02);
          }
          100% {
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.3), 0 0 16px rgba(16, 185, 129, 0.2);
            transform: scale(1);
          }
        }
        
        @keyframes green-glow-resonate {
          0% {
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.4), 0 0 10px rgba(34, 197, 94, 0.3), 0 0 15px rgba(34, 197, 94, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(34, 197, 94, 0.6), 0 0 20px rgba(34, 197, 94, 0.4), 0 0 30px rgba(34, 197, 94, 0.3), 0 0 40px rgba(34, 197, 94, 0.1);
          }
          100% {
            box-shadow: 0 0 5px rgba(34, 197, 94, 0.4), 0 0 10px rgba(34, 197, 94, 0.3), 0 0 15px rgba(34, 197, 94, 0.2);
          }
        }

        @keyframes golden-glow {
          0% {
            box-shadow: 0 0 5px rgba(234, 179, 8, 0.4), 0 0 10px rgba(234, 179, 8, 0.3), 0 0 15px rgba(234, 179, 8, 0.2);
          }
          50% {
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.6), 0 0 20px rgba(234, 179, 8, 0.4), 0 0 30px rgba(234, 179, 8, 0.3), 0 0 40px rgba(234, 179, 8, 0.1);
          }
          100% {
            box-shadow: 0 0 5px rgba(234, 179, 8, 0.4), 0 0 10px rgba(234, 179, 8, 0.3), 0 0 15px rgba(234, 179, 8, 0.2);
          }
        }
      `}</style>
      
      <div className={`${isSticky ? 'fixed bottom-0' : 'relative'} left-0 right-0 z-50 transition-all duration-300 bg-white border-t border-gray-200 shadow-lg`}>
        <div className={`relative z-10 container mx-auto px-2 sm:px-4 transition-all duration-300 ${isSticky ? 'py-2' : 'py-3'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Responsive TabsList - Stack on mobile, grid on larger screens */}
            <div className={`grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-2 mb-2 sm:mb-3 transition-all duration-300 ${isSticky ? 'mb-2' : 'mb-3'}`}>
              {Object.entries(donationTypeStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`rounded-xl font-medium text-xs transition-all duration-200 ${isSticky ? 'py-1 px-1 sm:px-2' : 'py-1.5 px-2 sm:px-3'} ${
                    activeTab === key 
                      ? `${style.gradient} ${style.text}` 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-0 sm:space-y-0 sm:space-x-1">
                    <span className="text-xs">{style.icon}</span>
                    <span className="font-medium capitalize text-[10px] sm:text-xs">{key}</span>
                  </div>
                </button>
              ))}
            </div>

            <TabsContent value={activeTab} className="mt-0">
              {/* Mobile-first responsive grid */}
              <div className="space-y-3 sm:space-y-0 sm:grid sm:grid-cols-12 sm:gap-2 items-end">
                {/* Emergency Cause Selection and Currency - Full width on mobile */}
                <div className="flex space-x-2 sm:contents">
                  {/* Cause Selection */}
                  <div className="flex-1 sm:col-span-2">
                    {activeTab === 'islamic' ? (
                      <Select value={selectedCause} onValueChange={setSelectedCause}>
                        <SelectTrigger className={`text-xs bg-white border border-gray-300 text-gray-700 w-full rounded-xl ${isSticky ? 'h-7' : 'h-8'}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100] rounded-xl">
                          <SelectItem value="aqiqah" className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-teal-600 font-medium">Aqiqah</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="fidyah" className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-teal-600 font-medium">Fidyah</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="kaffarah" className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-teal-600 font-medium">Kaffarah</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="sadaqah-jariyah" className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <span className="text-teal-600 font-medium">Sadaqah Jariyah</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    ) : activeTab === 'coins' ? (
                      <div className="text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-1.5 text-gray-700">
                        Sadaqah Coins
                      </div>
                    ) : (
                      <Select value={selectedCause} onValueChange={setSelectedCause}>
                        <SelectTrigger className={`text-xs bg-white border border-gray-300 text-gray-700 w-full rounded-xl ${isSticky ? 'h-7' : 'h-8'}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100] rounded-xl">
                          {emergencyCauses.map((cause) => (
                            <SelectItem 
                              key={cause.id} 
                              value={cause.id} 
                              className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg"
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

                  {/* Currency selector with flag on the left */}
                  <div className="w-20 sm:col-span-1">
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className={`w-full text-xs bg-white border border-gray-300 text-gray-700 rounded-xl ${isSticky ? 'h-7' : 'h-8'}`}>
                        <SelectValue>
                          <div className="flex items-center justify-center space-x-1">
                            {currency === 'GBP' ? (
                              <img 
                                src="/lovable-uploads/3ed3cf1b-92db-4933-abeb-6b5d005cf4bf.png" 
                                alt="UK Flag" 
                                className="w-4 h-3 object-cover rounded-sm"
                              />
                            ) : (
                              <span className="text-sm">🇬🇧</span>
                            )}
                            <span className="font-medium">£</span>
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-300 shadow-lg z-[100] rounded-xl">
                        {currencies.map((curr) => (
                          <SelectItem 
                            key={curr.code} 
                            value={curr.code} 
                            className="bg-white hover:bg-gray-50 text-gray-700 rounded-lg"
                          >
                            <div className="flex items-center space-x-1">
                              {curr.code === 'GBP' ? (
                                <img 
                                  src={curr.flag} 
                                  alt="UK Flag" 
                                  className="w-4 h-3 object-cover rounded-sm"
                                />
                              ) : (
                                <span>{curr.flag}</span>
                              )}
                              <span className="font-medium">{curr.symbol}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick amounts and custom amount - Better mobile layout */}
                <div className="flex space-x-2 sm:contents">
                  {/* Quick amounts - Responsive grid */}
                  <div className="flex-1 grid grid-cols-3 gap-1 sm:col-span-3 sm:gap-1">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount('');
                        }}
                        className={`rounded-xl text-xs font-medium transition-all ${isSticky ? 'py-1.5 px-1' : 'py-2 px-1'} ${
                          selectedAmount === amount && !customAmount
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        }`}
                      >
                        {currentCurrency?.symbol}{amount}
                      </button>
                    ))}
                  </div>

                  {/* Custom amount - Now on same row */}
                  <div className="w-20 sm:col-span-2">
                    <Input
                      type="number"
                      placeholder="Other"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                      }}
                      className={`text-xs w-full bg-white border border-gray-300 text-gray-700 rounded-xl ${isSticky ? 'h-7' : 'h-8'}`}
                    />
                  </div>
                </div>

                {/* Buttons - Main Donate and Sadaqah Coins */}
                <div className="sm:col-span-4 flex space-x-2">
                  {activeTab === 'coins' ? (
                    /* Coins Top-up Button */
                    <Button className={`flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold transition-all duration-300 rounded-xl ${isSticky ? 'h-7' : 'h-8'} relative overflow-hidden`}
                      style={{
                        animation: 'golden-glow 2.8s ease-in-out infinite'
                      }}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        <Coins className={`${isSticky ? 'h-3 w-3' : 'h-4 w-4'} mr-2`} />
                        Top-up {currentCurrency?.symbol}{donationAmount}
                      </span>
                    </Button>
                  ) : (
                    /* Main Donate Button with gentle pulse animation and green glow */
                    <Button className={`flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-all duration-300 rounded-xl ${isSticky ? 'h-7' : 'h-8'} relative overflow-hidden`}
                      style={{
                        animation: 'gentle-pulse 3s ease-in-out infinite, green-glow-resonate 2.5s ease-in-out infinite'
                      }}
                    >
                      <span className="relative z-10">
                        Donate {currentCurrency?.symbol}{donationAmount}
                      </span>
                      
                      {isMember && (
                        <Badge className="absolute -top-1 -right-1 bg-blue-600 text-white text-[8px] px-1 py-0 z-20 rounded-lg">
                          2x
                        </Badge>
                      )}
                    </Button>
                  )}
                </div>
              </div>

              {/* 100% Donation Policy with Payment Methods - Hide on mobile when sticky, show on desktop */}
              {!isSticky && (
                <div className="hidden sm:flex items-center justify-between mt-3">
                  <div className="text-xs text-gray-600 flex items-center space-x-4">
                    <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2 py-1">
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

              {/* Mobile-specific donation policy with payment methods - show when not sticky */}
              {!isSticky && (
                <div className="sm:hidden mt-3 flex flex-col items-center space-y-2">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="inline-flex items-center bg-gray-50 border border-gray-200 rounded-xl px-2 py-1 text-xs">
                      <span className="mr-1">💯</span>
                      <span className="font-medium text-gray-700">100% DONATION POLICY</span>
                    </div>
                    <img 
                      src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                      alt="Accepted payment methods"
                      className="h-3 object-contain opacity-70"
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

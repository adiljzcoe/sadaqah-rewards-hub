
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, Heart } from 'lucide-react';

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
    <div className={`${isSticky ? 'fixed bottom-0 -mt-2' : 'relative'} left-0 right-0 z-50 bg-white shadow-lg transition-all duration-300`}>
      <div className={`container mx-auto px-4 transition-all duration-300 ${isSticky ? 'py-1' : 'py-2'}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className={`grid grid-cols-4 mb-2 transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'}`}>
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
                  <SelectTrigger className={`text-xs transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'}`}>
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
                    className={`rounded text-xs font-medium transition-all ${isSticky ? 'py-1 px-1' : 'py-1.5 px-1'} ${
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
                  <SelectTrigger className={`w-12 text-xs transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'}`}>
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
                  className={`text-xs flex-1 transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'}`}
                />
              </div>

              {/* Donate button */}
              <div className="col-span-2">
                <Button className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium relative transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'}`}>
                  <Heart className="h-3 w-3 mr-1" />
                  {currentCurrency?.symbol}{donationAmount}
                  {isMember && (
                    <Badge className="absolute -top-1 -right-1 bg-purple-500 text-white text-[8px] px-1 py-0">
                      2x
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Total impact with Sadaqah & Jannah points & Payment icons - Hide only when sticky */}
            {!isSticky && (
              <div className="flex items-center justify-between mt-2">
                {/* Total impact section with points calculation */}
                <div className="text-xs text-gray-600 flex items-center space-x-3">
                  <div>
                    <span className="font-medium text-emerald-600">£2.4M raised today</span> • 
                    <span className="ml-1">5,234 lives impacted</span>
                  </div>
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded px-2 py-1">
                    <span className="font-medium text-amber-700">Your donation = {donationAmount * 10} Sadaqah points</span>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded px-2 py-1">
                    <span className="font-medium text-purple-700">+ {donationAmount * 5} Jannah points</span>
                  </div>
                </div>
                
                {/* Payment icons */}
                <div className="flex items-center space-x-2">
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
            )}

          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StickyDonationWidget;

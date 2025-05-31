
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

const donationTypeStyles = {
  sadaqah: {
    gradient: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/40',
    border: 'border-blue-300/60',
    text: 'text-white',
    icon: '💝',
    glow: 'shadow-blue-400/50'
  },
  zakat: {
    gradient: 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/40',
    border: 'border-emerald-300/60',
    text: 'text-white',
    icon: '☪️',
    glow: 'shadow-emerald-400/50'
  },
  lillah: {
    gradient: 'bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/40',
    border: 'border-purple-300/60',
    text: 'text-white',
    icon: '🤲',
    glow: 'shadow-purple-400/50'
  },
  monthly: {
    gradient: 'bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/40',
    border: 'border-orange-300/60',
    text: 'text-white',
    icon: '📅',
    glow: 'shadow-orange-400/50'
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
      <div className={`${isSticky ? 'fixed bottom-0 -mt-2' : 'relative'} left-0 right-0 z-50 transition-all duration-300 overflow-hidden shadow-2xl drop-shadow-2xl`}>
        {/* Header-matching background with cloud effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-blue-100 to-indigo-200 backdrop-blur-md shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-sky-100/30 to-blue-200/40"></div>
        
        {/* Cloud-like background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-10 w-20 h-8 bg-white/30 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-4 right-32 w-16 h-6 bg-white/25 rounded-full blur-sm animate-pulse delay-300"></div>
          <div className="absolute top-1 left-1/3 w-24 h-10 bg-white/20 rounded-full blur-sm animate-pulse delay-500"></div>
          <div className="absolute top-3 right-1/4 w-18 h-7 bg-white/35 rounded-full blur-sm animate-pulse delay-700"></div>
        </div>

        {/* Enhanced fluffy cloud bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden">
          {/* Multiple layers of cloud shapes for realistic fluffy effect */}
          <svg 
            className="absolute bottom-0 w-full h-8" 
            viewBox="0 0 1200 40" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Base cloud layer */}
            <path 
              d="M0,20 C20,5 40,25 60,15 C80,5 100,30 120,20 C140,10 160,25 180,15 C200,5 220,30 240,20 C260,10 280,25 300,15 C320,5 340,30 360,20 C380,10 400,25 420,15 C440,5 460,30 480,20 C500,10 520,25 540,15 C560,5 580,30 600,20 C620,10 640,25 660,15 C680,5 700,30 720,20 C740,10 760,25 780,15 C800,5 820,30 840,20 C860,10 880,25 900,15 C920,5 940,30 960,20 C980,10 1000,25 1020,15 C1040,5 1060,30 1080,20 C1100,10 1120,25 1140,15 C1160,5 1180,25 1200,20 L1200,40 L0,40 Z" 
              fill="url(#cloudGradient1)"
            />
            {/* Secondary fluffy layer */}
            <path 
              d="M0,25 C25,10 45,35 70,20 C95,5 115,35 140,25 C165,10 185,35 210,20 C235,5 255,35 280,25 C305,10 325,35 350,20 C375,5 395,35 420,25 C445,10 465,35 490,20 C515,5 535,35 560,25 C585,10 605,35 630,20 C655,5 675,35 700,25 C725,10 745,35 770,20 C795,5 815,35 840,25 C865,10 885,35 910,20 C935,5 955,35 980,25 C1005,10 1025,35 1050,20 C1075,5 1095,35 1120,25 C1145,10 1165,30 1200,25 L1200,40 L0,40 Z" 
              fill="url(#cloudGradient2)"
              opacity="0.8"
            />
            {/* Top highlight layer */}
            <path 
              d="M0,30 C30,15 50,40 80,25 C110,10 130,40 160,30 C190,15 210,40 240,25 C270,10 290,40 320,30 C350,15 370,40 400,25 C430,10 450,40 480,30 C510,15 530,40 560,25 C590,10 610,40 640,30 C670,15 690,40 720,25 C750,10 770,40 800,30 C830,15 850,40 880,25 C910,10 930,40 960,30 C990,15 1010,40 1040,25 C1070,10 1090,40 1120,30 C1150,15 1170,35 1200,30 L1200,40 L0,40 Z" 
              fill="url(#cloudGradient3)"
              opacity="0.6"
            />
            
            {/* Gradient definitions */}
            <defs>
              <linearGradient id="cloudGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(186 230 253)" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="rgb(147 197 253)" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="rgb(165 180 252)" stopOpacity="0.7"/>
              </linearGradient>
              <linearGradient id="cloudGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(219 234 254)" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="rgb(196 181 253)" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="rgb(186 230 253)" stopOpacity="0.6"/>
              </linearGradient>
              <linearGradient id="cloudGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(255 255 255)" stopOpacity="0.6"/>
                <stop offset="50%" stopColor="rgb(240 249 255)" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="rgb(219 234 254)" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`relative z-10 container mx-auto px-4 transition-all duration-300 ${isSticky ? 'py-1' : 'py-2'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced TabsList with beautiful styling matching header aesthetic */}
            <div className={`grid grid-cols-4 gap-2 mb-2 transition-all duration-300 ${isSticky ? 'mb-1' : 'mb-2'}`}>
              {Object.entries(donationTypeStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative overflow-hidden rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-105 border-2 backdrop-blur-sm ${isSticky ? 'py-1.5 px-2' : 'py-3 px-3'} ${
                    activeTab === key 
                      ? `${style.gradient} ${style.shadow} shadow-xl ${style.border} scale-105 ring-2 ring-white/50 ${style.glow}` 
                      : 'bg-gradient-to-br from-white/80 via-sky-100/80 to-blue-200/80 text-slate-700 hover:from-white/90 hover:via-sky-50/90 hover:to-blue-100/90 border-white/40 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-white/60'
                  }`}
                >
                  {/* Enhanced background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Content with better spacing */}
                  <div className="relative z-10 flex items-center justify-center space-x-1.5">
                    <span className="text-lg drop-shadow-sm">{style.icon}</span>
                    <span className={`${activeTab === key ? `${style.text} drop-shadow-sm` : 'text-slate-700'} font-bold capitalize tracking-wide`}>
                      {key}
                    </span>
                  </div>
                  
                  {/* Enhanced glow effects for active state */}
                  {activeTab === key && (
                    <>
                      <div className="absolute top-1 left-3 w-10 h-4 bg-white/40 rounded-full blur-sm"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-2xl"></div>
                    </>
                  )}
                  
                  {/* Border highlight for inactive buttons */}
                  {activeTab !== key && (
                    <div className="absolute inset-0 rounded-2xl border-2 border-white/30"></div>
                  )}
                </button>
              ))}
            </div>

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

                {/* Enhanced Donate button with glow and shake */}
                <div className="col-span-2">
                  <Button className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium relative transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'} 
                    shadow-lg shadow-emerald-500/50 
                    hover:shadow-xl hover:shadow-emerald-500/60
                    animate-[glow_2s_ease-in-out_infinite_alternate,wiggle_3s_ease-in-out_infinite]
                    ring-2 ring-emerald-400/30
                    hover:ring-emerald-400/50`}
                  >
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
                      <div className="relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 border-2 border-amber-300 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                        {/* Plaque background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-200/30 via-transparent to-amber-200/30 rounded-lg"></div>
                        
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-1 bg-gradient-to-r from-yellow-100 to-amber-50 rounded border border-amber-200/50 shadow-inner"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm"></div>
                          <span className="font-bold text-amber-800 text-xs tracking-wide">100% DONATION POLICY</span>
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-sm"></div>
                        </div>
                        
                        {/* Shine effect */}
                        <div className="absolute top-0 left-2 w-6 h-1 bg-white/40 rounded-full blur-sm"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded px-2 py-1">
                      <span className="font-medium text-amber-700">Your donation = {donationAmount * 10} Sadaqah points</span>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded px-2 py-1">
                      <span className="font-medium text-purple-700">+ {donationAmount * 5} Jannah points</span>
                    </div>
                  </div>
                  
                  {/* Payment methods image */}
                  <div className="flex items-center">
                    <img 
                      src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                      alt="Accepted payment methods: PayPal, Visa, Mastercard, Apple Pay, Google Pay"
                      className="h-5 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Enhanced ray of light effect shining on ticker below */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 pointer-events-none z-40">
        {/* Primary light beam */}
        <div className="relative">
          <div className="w-48 h-20 bg-gradient-to-b from-yellow-200/80 via-yellow-100/60 to-transparent rounded-b-full blur-sm"></div>
          {/* Side beams for wider coverage */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-72 h-28 bg-gradient-to-b from-amber-100/50 via-yellow-50/30 to-transparent rounded-b-full blur-md"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-36 bg-gradient-to-b from-yellow-50/30 via-amber-50/15 to-transparent rounded-b-full blur-lg"></div>
          
          {/* Sparkle effects */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-12 left-1/2 transform -translate-x-12 w-2 h-2 bg-amber-300 rounded-full opacity-60 animate-pulse delay-300"></div>
          <div className="absolute top-12 left-1/2 transform translate-x-8 w-2 h-2 bg-yellow-400 rounded-full opacity-60 animate-pulse delay-500"></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-6 w-1 h-1 bg-white rounded-full opacity-90 animate-pulse delay-200"></div>
          <div className="absolute top-8 left-1/2 transform translate-x-4 w-1 h-1 bg-white rounded-full opacity-90 animate-pulse delay-700"></div>
        </div>
      </div>
    </>
  );
};

export default StickyDonationWidget;

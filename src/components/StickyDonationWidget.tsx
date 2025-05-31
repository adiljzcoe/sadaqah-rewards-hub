
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
    gradient: 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/40',
    border: 'border-blue-300/60',
    text: 'text-white',
    icon: '💝',
    glow: 'shadow-blue-400/50'
  },
  zakat: {
    gradient: 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600',
    shadow: 'shadow-cyan-500/40',
    border: 'border-cyan-300/60',
    text: 'text-white',
    icon: '☪️',
    glow: 'shadow-cyan-400/50'
  },
  lillah: {
    gradient: 'bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-600',
    shadow: 'shadow-indigo-500/40',
    border: 'border-indigo-300/60',
    text: 'text-white',
    icon: '🤲',
    glow: 'shadow-indigo-400/50'
  },
  monthly: {
    gradient: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600',
    shadow: 'shadow-teal-500/40',
    border: 'border-teal-300/60',
    text: 'text-white',
    icon: '📅',
    glow: 'shadow-teal-400/50'
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
        {/* FF-inspired background with crystalline effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
        
        {/* Crystal-like background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-10 w-20 h-8 bg-cyan-300/20 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-4 right-32 w-16 h-6 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300"></div>
          <div className="absolute top-1 left-1/3 w-24 h-10 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500"></div>
          <div className="absolute top-3 right-1/4 w-18 h-7 bg-cyan-400/25 rounded-full blur-sm animate-pulse delay-700"></div>
          {/* Magical sparkles */}
          <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/80"></div>
          <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000 shadow-md shadow-blue-300/70"></div>
        </div>

        {/* Enhanced fluffy cloud bottom edge with FF colors */}
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-12" 
            viewBox="0 0 1200 50" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* FF-style crystalline cloud layers */}
            <path 
              d="M0,25 Q50,5 100,20 Q150,35 200,15 Q250,0 300,25 Q350,40 400,20 Q450,5 500,30 Q550,45 600,25 Q650,10 700,35 Q750,50 800,30 Q850,15 900,40 Q950,25 1000,20 Q1050,35 1100,25 Q1150,15 1200,30 L1200,50 L0,50 Z" 
              fill="url(#ffCloudGradient1)"
            />
            
            <path 
              d="M0,30 Q40,15 80,25 Q120,40 160,20 Q200,5 240,30 Q280,45 320,25 Q360,10 400,35 Q440,50 480,30 Q520,15 560,40 Q600,25 640,20 Q680,35 720,25 Q760,10 800,35 Q840,50 880,30 Q920,15 960,40 Q1000,25 1040,30 Q1080,15 1120,25 Q1160,40 1200,35 L1200,50 L0,50 Z" 
              fill="url(#ffCloudGradient2)"
              opacity="0.85"
            />
            
            <path 
              d="M0,35 Q60,20 120,30 Q180,45 240,25 Q300,10 360,35 Q420,50 480,30 Q540,15 600,40 Q660,25 720,20 Q780,35 840,25 Q900,10 960,35 Q1020,50 1080,30 Q1140,15 1200,35 L1200,50 L0,50 Z" 
              fill="url(#ffCloudGradient3)"
              opacity="0.7"
            />
            
            <path 
              d="M0,40 Q30,25 60,35 Q90,50 120,30 Q150,15 180,40 Q210,25 240,20 Q270,35 300,25 Q330,10 360,35 Q390,50 420,30 Q450,15 480,40 Q510,25 540,30 Q570,45 600,25 Q630,10 660,35 Q690,50 720,30 Q750,15 780,40 Q810,25 840,20 Q870,35 900,25 Q930,10 960,35 Q990,50 1020,30 Q1050,15 1080,40 Q1110,25 1140,30 Q1170,45 1200,40 L1200,50 L0,50 Z" 
              fill="url(#ffCloudGradient4)"
              opacity="0.6"
            />
            
            {/* FF-inspired gradient definitions */}
            <defs>
              <linearGradient id="ffCloudGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(30 58 138)" stopOpacity="0.95"/>
                <stop offset="30%" stopColor="rgb(59 130 246)" stopOpacity="0.9"/>
                <stop offset="70%" stopColor="rgb(34 211 238)" stopOpacity="0.85"/>
                <stop offset="100%" stopColor="rgb(6 182 212)" stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="ffCloudGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(67 56 202)" stopOpacity="0.9"/>
                <stop offset="50%" stopColor="rgb(99 102 241)" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="rgb(59 130 246)" stopOpacity="0.7"/>
              </linearGradient>
              <linearGradient id="ffCloudGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="rgb(125 211 252)" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="rgb(186 230 253)" stopOpacity="0.6"/>
              </linearGradient>
              <linearGradient id="ffCloudGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(165 243 252)" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="rgb(224 242 254)" stopOpacity="0.4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`relative z-10 container mx-auto px-4 transition-all duration-300 ${isSticky ? 'py-1' : 'py-2'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced TabsList with FF styling */}
            <div className={`grid grid-cols-4 gap-2 mb-2 transition-all duration-300 ${isSticky ? 'mb-1' : 'mb-2'}`}>
              {Object.entries(donationTypeStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative overflow-hidden rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-105 border-2 backdrop-blur-sm ${isSticky ? 'py-1.5 px-2' : 'py-3 px-3'} ${
                    activeTab === key 
                      ? `${style.gradient} ${style.shadow} shadow-xl ${style.border} scale-105 ring-2 ring-white/50 ${style.glow}` 
                      : 'bg-gradient-to-br from-slate-800/80 via-blue-800/70 to-indigo-800/80 text-cyan-100 hover:from-slate-700/90 hover:via-blue-700/80 hover:to-indigo-700/90 border-cyan-400/30 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-cyan-400/40'
                  }`}
                >
                  {/* Enhanced background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Content with better spacing */}
                  <div className="relative z-10 flex items-center justify-center space-x-1.5">
                    <span className="text-lg drop-shadow-sm">{style.icon}</span>
                    <span className={`${activeTab === key ? `${style.text} drop-shadow-sm` : 'text-cyan-100'} font-bold capitalize tracking-wide`}>
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
                    <div className="absolute inset-0 rounded-2xl border-2 border-cyan-400/20"></div>
                  )}
                </button>
              ))}
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-12 gap-2 items-end">
                {/* Emergency Cause Selection - now first and wider */}
                <div className="col-span-5">
                  <Select value={selectedCause} onValueChange={setSelectedCause}>
                    <SelectTrigger className={`text-xs transition-all duration-300 bg-slate-800/90 border-cyan-400/40 text-cyan-100 ${isSticky ? 'h-6' : 'h-8'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 border border-cyan-400/40 shadow-lg z-[100] backdrop-blur-md">
                      {emergencyCauses.map((cause) => (
                        <SelectItem key={cause.id} value={cause.id} className="bg-slate-800/95 hover:bg-slate-700/95 text-cyan-100">
                          <div className="flex items-center space-x-2">
                            {cause.urgent && <AlertCircle className="h-3 w-3 text-red-400" />}
                            <span className={cause.color}>{cause.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Currency selector - now second */}
                <div className="col-span-1">
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className={`w-full text-xs transition-all duration-300 bg-slate-800/90 border-cyan-400/40 text-cyan-100 ${isSticky ? 'h-6' : 'h-8'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800/95 border border-cyan-400/40 shadow-lg z-[100] backdrop-blur-md">
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code} className="bg-slate-800/95 hover:bg-slate-700/95 text-cyan-100">
                          <div className="flex items-center space-x-1">
                            <span>{curr.flag}</span>
                            <span>{curr.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Quick amounts - now after currency */}
                <div className="col-span-3 grid grid-cols-3 gap-1">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`rounded text-xs font-medium transition-all ${isSticky ? 'py-1 px-0.5' : 'py-1.5 px-0.5'} ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/50'
                          : 'bg-slate-700/80 text-cyan-100 hover:bg-slate-600/80 border border-cyan-400/30'
                      }`}
                    >
                      {currentCurrency?.symbol}{amount}
                    </button>
                  ))}
                </div>

                {/* Custom amount - smaller */}
                <div className="col-span-1">
                  <Input
                    type="number"
                    placeholder="Other amount"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className={`text-xs w-full transition-all duration-300 bg-slate-800/90 border-cyan-400/40 text-cyan-100 placeholder:text-cyan-200/60 ${isSticky ? 'h-6' : 'h-8'}`}
                  />
                </div>

                {/* Enhanced Pay button with FF styling and glow */}
                <div className="col-span-2">
                  <Button className={`w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-xs font-medium relative transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'} 
                    shadow-lg shadow-cyan-500/50 
                    hover:shadow-xl hover:shadow-cyan-500/60
                    animate-[glow_2s_ease-in-out_infinite_alternate,wiggle_3s_ease-in-out_infinite]
                    ring-2 ring-cyan-400/30
                    hover:ring-cyan-400/50
                    border-0`}
                  >
                    Pay {currentCurrency?.symbol}{donationAmount}
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
                  {/* Total impact section with points calculation - FF styled */}
                  <div className="text-xs text-cyan-100 flex items-center space-x-3">
                    <div>
                      <div className="relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-800/80 via-cyan-800/70 to-blue-800/80 border-2 border-cyan-400/60 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                        {/* FF-style plaque background effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-cyan-400/20 rounded-lg"></div>
                        
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-1 bg-gradient-to-r from-blue-900/60 to-cyan-900/60 rounded border border-cyan-300/30 shadow-inner"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm"></div>
                          <span className="font-bold text-cyan-100 text-xs tracking-wide drop-shadow-sm">100% DONATION POLICY</span>
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-sm"></div>
                        </div>
                        
                        {/* Shine effect */}
                        <div className="absolute top-0 left-2 w-6 h-1 bg-white/40 rounded-full blur-sm"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-800/60 to-cyan-800/60 border border-cyan-400/40 rounded px-2 py-1">
                      <span className="font-medium text-cyan-100 drop-shadow-sm">Your donation = {donationAmount * 10} Sadaqah points</span>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-800/60 to-purple-800/60 border border-indigo-400/40 rounded px-2 py-1">
                      <span className="font-medium text-indigo-100 drop-shadow-sm">+ {donationAmount * 5} Jannah points</span>
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

      {/* Enhanced ray of light effect shining on ticker below - now with FF colors */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 pointer-events-none z-40">
        {/* Main concentrated light beam with FF blue/cyan colors */}
        <div className="relative">
          {/* Central bright beam */}
          <div className="w-32 h-16 bg-gradient-to-b from-cyan-300/90 via-blue-300/70 to-cyan-200/50 rounded-b-full blur-sm"></div>
          
          {/* Medium spread beam */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-24 bg-gradient-to-b from-blue-300/70 via-cyan-200/50 to-blue-100/30 rounded-b-full blur-md"></div>
          
          {/* Wide ambient glow */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-cyan-200/50 via-blue-100/25 to-transparent rounded-b-full blur-xl"></div>
          
          {/* Brightest center core */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-12 bg-gradient-to-b from-white/80 via-cyan-300/70 to-blue-200/40 rounded-b-full"></div>
          
          {/* Divine sparkle effects with FF colors */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-300 rounded-full opacity-90 animate-pulse shadow-lg shadow-cyan-300"></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-8 w-1.5 h-1.5 bg-blue-300 rounded-full opacity-80 animate-pulse delay-200 shadow-md shadow-blue-400"></div>
          <div className="absolute top-8 left-1/2 transform translate-x-6 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-80 animate-pulse delay-400 shadow-md shadow-cyan-400"></div>
          <div className="absolute top-12 left-1/2 transform -translate-x-4 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse delay-600"></div>
          <div className="absolute top-12 left-1/2 transform translate-x-2 w-1 h-1 bg-blue-200 rounded-full opacity-70 animate-pulse delay-800"></div>
          
          {/* Additional light rays for more dramatic effect */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-cyan-100/40 via-blue-100/20 to-transparent rounded-b-full blur-2xl opacity-60"></div>
        </div>
      </div>
    </>
  );
};

export default StickyDonationWidget;

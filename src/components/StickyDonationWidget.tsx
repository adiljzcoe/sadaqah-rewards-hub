
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
        {/* FF-inspired background with lighter crystalline effects that blend upward */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-blue-800 to-indigo-800 backdrop-blur-md shadow-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-indigo-800/30 to-cyan-800/50"></div>
        
        {/* Lighter crystal-like background effects with upward blend */}
        <div className="absolute inset-0">
          <div className="absolute top-2 left-10 w-20 h-8 bg-cyan-200/25 rounded-full blur-sm animate-pulse"></div>
          <div className="absolute top-4 right-32 w-16 h-6 bg-blue-200/20 rounded-full blur-sm animate-pulse delay-300"></div>
          <div className="absolute top-1 left-1/3 w-24 h-10 bg-indigo-200/25 rounded-full blur-sm animate-pulse delay-500"></div>
          <div className="absolute top-3 right-1/4 w-18 h-7 bg-cyan-300/30 rounded-full blur-sm animate-pulse delay-700"></div>
          {/* Brighter magical sparkles */}
          <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-200 rounded-full animate-pulse shadow-lg shadow-cyan-200/80"></div>
          <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse delay-1000 shadow-md shadow-blue-200/70"></div>
        </div>

        {/* Enhanced fluffy cloud bottom edge with seamless grey blending */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <svg 
            className="absolute bottom-0 w-full h-24" 
            viewBox="0 0 1200 80" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Multiple layered clouds with perfect grey blending */}
            <path 
              d="M0,20 Q30,5 60,15 Q90,30 120,10 Q150,0 180,20 Q210,35 240,15 Q270,0 300,25 Q330,40 360,20 Q390,5 420,30 Q450,45 480,25 Q510,10 540,35 Q570,50 600,30 Q630,15 660,40 Q690,55 720,35 Q750,20 780,45 Q810,30 840,25 Q870,40 900,30 Q930,15 960,40 Q990,55 1020,35 Q1050,20 1080,45 Q1110,30 1140,30 Q1170,15 1200,25 L1200,80 L0,80 Z" 
              fill="url(#seamlessGradient1)"
            />
            
            <path 
              d="M0,25 Q40,10 80,20 Q120,35 160,15 Q200,0 240,25 Q280,40 320,20 Q360,5 400,30 Q440,45 480,25 Q520,10 560,35 Q600,50 640,30 Q680,15 720,40 Q760,25 800,20 Q840,35 880,25 Q920,10 960,35 Q1000,50 1040,30 Q1080,15 1120,35 Q1160,20 1200,30 L1200,80 L0,80 Z" 
              fill="url(#seamlessGradient2)"
              opacity="0.85"
            />
            
            <path 
              d="M0,30 Q50,15 100,25 Q150,40 200,20 Q250,5 300,30 Q350,45 400,25 Q450,10 500,35 Q550,50 600,30 Q650,15 700,40 Q750,25 800,30 Q850,15 900,25 Q950,40 1000,20 Q1050,35 1100,25 Q1150,10 1200,35 L1200,80 L0,80 Z" 
              fill="url(#seamlessGradient3)"
              opacity="0.7"
            />
            
            <path 
              d="M0,35 Q25,20 50,30 Q75,45 100,25 Q125,10 150,35 Q175,50 200,30 Q225,15 250,40 Q275,25 300,20 Q325,35 350,25 Q375,10 400,35 Q425,50 450,30 Q475,15 500,40 Q525,55 550,35 Q575,20 600,45 Q625,30 650,25 Q675,40 700,30 Q725,15 750,40 Q775,55 800,35 Q825,20 850,45 Q875,30 900,35 Q925,20 950,30 Q975,45 1000,25 Q1025,40 1050,30 Q1075,15 1100,40 Q1125,25 1150,35 Q1175,20 1200,40 L1200,80 L0,80 Z" 
              fill="url(#seamlessGradient4)"
              opacity="0.6"
            />

            {/* Perfect transition layer to grey background */}
            <path 
              d="M0,40 Q20,25 40,35 Q60,50 80,30 Q100,15 120,40 Q140,55 160,35 Q180,20 200,45 Q220,30 240,25 Q260,40 280,30 Q300,15 320,40 Q340,55 360,35 Q380,20 400,45 Q420,60 440,40 Q460,25 480,50 Q500,35 520,30 Q540,45 560,35 Q580,20 600,45 Q620,60 640,40 Q660,25 680,50 Q700,35 720,30 Q740,45 760,35 Q780,20 800,45 Q820,60 840,40 Q860,25 880,50 Q900,35 920,30 Q940,45 960,35 Q980,20 1000,45 Q1020,60 1040,40 Q1060,25 1080,50 Q1100,35 1120,40 Q1140,25 1160,35 Q1180,50 1200,45 L1200,80 L0,80 Z" 
              fill="url(#perfectGreyBlend)"
              opacity="0.9"
            />

            {/* Final seamless blend layer */}
            <path 
              d="M0,50 Q15,35 30,45 Q45,60 60,40 Q75,25 90,50 Q105,35 120,30 Q135,45 150,35 Q165,20 180,45 Q195,60 210,40 Q225,25 240,50 Q255,65 270,45 Q285,30 300,55 Q315,40 330,35 Q345,50 360,40 Q375,25 390,50 Q405,65 420,45 Q435,30 450,55 Q465,40 480,35 Q495,50 510,40 Q525,25 540,50 Q555,65 570,45 Q585,30 600,55 Q615,40 630,35 Q645,50 660,40 Q675,25 690,50 Q705,65 720,45 Q735,30 750,55 Q765,40 780,35 Q795,50 810,40 Q825,25 840,50 Q855,65 870,45 Q885,30 900,55 Q915,40 930,35 Q945,50 960,40 Q975,25 990,50 Q1005,65 1020,45 Q1035,30 1050,55 Q1065,40 1080,45 Q1095,30 1110,40 Q1125,55 1140,35 Q1155,50 1170,45 Q1185,30 1200,50 L1200,80 L0,80 Z" 
              fill="url(#finalGreyBlend)"
            />
            
            {/* Gradient definitions with perfect grey transitions */}
            <defs>
              <linearGradient id="seamlessGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59 130 246)" stopOpacity="0.9"/>
                <stop offset="20%" stopColor="rgb(96 165 250)" stopOpacity="0.85"/>
                <stop offset="50%" stopColor="rgb(125 211 252)" stopOpacity="0.7"/>
                <stop offset="75%" stopColor="rgb(165 243 252)" stopOpacity="0.5"/>
                <stop offset="90%" stopColor="rgb(148 163 184)" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="rgb(100 116 139)" stopOpacity="0.9"/>
              </linearGradient>
              
              <linearGradient id="seamlessGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.8"/>
                <stop offset="30%" stopColor="rgb(129 140 248)" stopOpacity="0.7"/>
                <stop offset="60%" stopColor="rgb(147 197 253)" stopOpacity="0.5"/>
                <stop offset="85%" stopColor="rgb(148 163 184)" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="rgb(100 116 139)" stopOpacity="0.8"/>
              </linearGradient>
              
              <linearGradient id="seamlessGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(125 211 252)" stopOpacity="0.7"/>
                <stop offset="40%" stopColor="rgb(165 243 252)" stopOpacity="0.6"/>
                <stop offset="70%" stopColor="rgb(203 213 225)" stopOpacity="0.5"/>
                <stop offset="90%" stopColor="rgb(148 163 184)" stopOpacity="0.7"/>
                <stop offset="100%" stopColor="rgb(100 116 139)" stopOpacity="0.85"/>
              </linearGradient>
              
              <linearGradient id="seamlessGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(186 230 253)" stopOpacity="0.5"/>
                <stop offset="50%" stopColor="rgb(203 213 225)" stopOpacity="0.6"/>
                <stop offset="80%" stopColor="rgb(148 163 184)" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="rgb(100 116 139)" stopOpacity="0.9"/>
              </linearGradient>
              
              <linearGradient id="perfectGreyBlend" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(203 213 225)" stopOpacity="0.4"/>
                <stop offset="30%" stopColor="rgb(148 163 184)" stopOpacity="0.7"/>
                <stop offset="60%" stopColor="rgb(100 116 139)" stopOpacity="0.9"/>
                <stop offset="100%" stopColor="rgb(71 85 105)" stopOpacity="1"/>
              </linearGradient>
              
              <linearGradient id="finalGreyBlend" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(148 163 184)" stopOpacity="0.3"/>
                <stop offset="40%" stopColor="rgb(100 116 139)" stopOpacity="0.8"/>
                <stop offset="70%" stopColor="rgb(71 85 105)" stopOpacity="0.95"/>
                <stop offset="100%" stopColor="rgb(51 65 85)" stopOpacity="1"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`relative z-10 container mx-auto px-4 transition-all duration-300 ${isSticky ? 'py-1' : 'py-2'}`}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Enhanced TabsList with lighter FF styling */}
            <div className={`grid grid-cols-4 gap-2 mb-2 transition-all duration-300 ${isSticky ? 'mb-1' : 'mb-2'}`}>
              {Object.entries(donationTypeStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`relative overflow-hidden rounded-2xl font-bold text-sm transition-all duration-500 transform hover:scale-105 border-2 backdrop-blur-sm ${isSticky ? 'py-1.5 px-2' : 'py-3 px-3'} ${
                    activeTab === key 
                      ? `${style.gradient} ${style.shadow} shadow-xl ${style.border} scale-105 ring-2 ring-white/50 ${style.glow}` 
                      : 'bg-gradient-to-br from-slate-700/80 via-blue-700/70 to-indigo-700/80 text-cyan-50 hover:from-slate-600/90 hover:via-blue-600/80 hover:to-indigo-600/90 border-cyan-300/30 shadow-lg hover:shadow-xl hover:ring-2 hover:ring-cyan-300/40'
                  }`}
                >
                  {/* Enhanced background shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Content with better spacing */}
                  <div className="relative z-10 flex items-center justify-center space-x-1.5">
                    <span className="text-lg drop-shadow-sm">{style.icon}</span>
                    <span className={`${activeTab === key ? `${style.text} drop-shadow-sm` : 'text-cyan-50'} font-bold capitalize tracking-wide`}>
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
                    <div className="absolute inset-0 rounded-2xl border-2 border-cyan-300/20"></div>
                  )}
                </button>
              ))}
            </div>

            <TabsContent value={activeTab} className="mt-0">
              <div className="grid grid-cols-12 gap-2 items-end">
                {/* Emergency Cause Selection - now first and wider */}
                <div className="col-span-5">
                  <Select value={selectedCause} onValueChange={setSelectedCause}>
                    <SelectTrigger className={`text-xs transition-all duration-300 bg-slate-700/90 border-cyan-300/40 text-cyan-50 ${isSticky ? 'h-6' : 'h-8'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700/95 border border-cyan-300/40 shadow-lg z-[100] backdrop-blur-md">
                      {emergencyCauses.map((cause) => (
                        <SelectItem key={cause.id} value={cause.id} className="bg-slate-700/95 hover:bg-slate-600/95 text-cyan-50">
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
                    <SelectTrigger className={`w-full text-xs transition-all duration-300 bg-slate-700/90 border-cyan-300/40 text-cyan-50 ${isSticky ? 'h-6' : 'h-8'}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700/95 border border-cyan-300/40 shadow-lg z-[100] backdrop-blur-md">
                      {currencies.map((curr) => (
                        <SelectItem key={curr.code} value={curr.code} className="bg-slate-700/95 hover:bg-slate-600/95 text-cyan-50">
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
                <div className="col-span-4 grid grid-cols-3 gap-1">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`rounded text-xs font-medium transition-all ${isSticky ? 'py-1 px-0.5' : 'py-1.5 px-0.5'} ${
                        selectedAmount === amount && !customAmount
                          ? 'bg-cyan-500 text-white shadow-md shadow-cyan-400/50'
                          : 'bg-slate-600/80 text-cyan-50 hover:bg-slate-500/80 border border-cyan-300/30'
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
                    placeholder="Other"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(0);
                    }}
                    className={`text-xs w-full transition-all duration-300 bg-slate-700/90 border-cyan-300/40 text-cyan-50 placeholder:text-cyan-100/60 ${isSticky ? 'h-6' : 'h-8'}`}
                  />
                </div>

                {/* Enhanced Pay button with lighter FF styling and glow */}
                <div className="col-span-1">
                  <Button className={`w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-medium relative transition-all duration-300 ${isSticky ? 'h-6' : 'h-8'} 
                    shadow-lg shadow-cyan-400/50 
                    hover:shadow-xl hover:shadow-cyan-400/60
                    animate-[glow_2s_ease-in-out_infinite_alternate,wiggle_3s_ease-in-out_infinite]
                    ring-2 ring-cyan-300/30
                    hover:ring-cyan-300/50
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
                  {/* Total impact section with points calculation - lighter FF styled */}
                  <div className="text-xs text-cyan-50 flex items-center space-x-3">
                    <div>
                      <div className="relative inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-700/80 via-cyan-700/70 to-blue-700/80 border-2 border-cyan-300/60 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300">
                        {/* FF-style plaque background effect with lighter tones */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-cyan-300/20 rounded-lg"></div>
                        
                        {/* Inner shadow for depth */}
                        <div className="absolute inset-1 bg-gradient-to-r from-blue-800/60 to-cyan-800/60 rounded border border-cyan-200/30 shadow-inner"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-sm"></div>
                          <span className="font-bold text-cyan-50 text-xs tracking-wide drop-shadow-sm">100% DONATION POLICY</span>
                          <div className="w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-sm"></div>
                        </div>
                        
                        {/* Shine effect */}
                        <div className="absolute top-0 left-2 w-6 h-1 bg-white/40 rounded-full blur-sm"></div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-700/60 to-cyan-700/60 border border-cyan-300/40 rounded px-2 py-1">
                      <span className="font-medium text-cyan-50 drop-shadow-sm">Your donation = {donationAmount * 10} Sadaqah points</span>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-700/60 to-purple-700/60 border border-indigo-300/40 rounded px-2 py-1">
                      <span className="font-medium text-indigo-50 drop-shadow-sm">+ {donationAmount * 5} Jannah points</span>
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

      {/* Enhanced ray of light effect shining on ticker below - now with better grey blending */}
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 pointer-events-none z-40">
        {/* Main concentrated light beam with smooth grey transition */}
        <div className="relative">
          {/* Central bright beam with grey fade */}
          <div className="w-32 h-20 bg-gradient-to-b from-cyan-200/90 via-blue-200/70 via-cyan-100/50 to-slate-400/30 rounded-b-full blur-sm"></div>
          
          {/* Medium spread beam with grey blending */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-32 bg-gradient-to-b from-blue-200/70 via-cyan-100/50 via-blue-50/30 to-slate-300/20 rounded-b-full blur-md"></div>
          
          {/* Wide ambient glow with seamless grey transition */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-80 h-48 bg-gradient-to-b from-cyan-100/50 via-blue-50/25 via-slate-200/15 to-transparent rounded-b-full blur-xl"></div>
          
          {/* Brightest center core */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-b from-white/80 via-cyan-200/70 via-blue-100/40 to-slate-200/20 rounded-b-full"></div>
          
          {/* Divine sparkle effects with lighter FF colors */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-200 rounded-full opacity-90 animate-pulse shadow-lg shadow-cyan-200"></div>
          <div className="absolute top-8 left-1/2 transform -translate-x-8 w-1.5 h-1.5 bg-blue-200 rounded-full opacity-80 animate-pulse delay-200 shadow-md shadow-blue-300"></div>
          <div className="absolute top-8 left-1/2 transform translate-x-6 w-1.5 h-1.5 bg-cyan-300 rounded-full opacity-80 animate-pulse delay-400 shadow-md shadow-cyan-300"></div>
          <div className="absolute top-12 left-1/2 transform -translate-x-4 w-1 h-1 bg-white rounded-full opacity-70 animate-pulse delay-600"></div>
          <div className="absolute top-12 left-1/2 transform translate-x-2 w-1 h-1 bg-blue-100 rounded-full opacity-70 animate-pulse delay-800"></div>
          
          {/* Additional light rays for more dramatic effect with grey blending */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-64 h-40 bg-gradient-to-b from-cyan-50/40 via-blue-50/20 via-slate-100/10 to-transparent rounded-b-full blur-2xl opacity-60"></div>
        </div>
      </div>
    </>
  );
};

export default StickyDonationWidget;

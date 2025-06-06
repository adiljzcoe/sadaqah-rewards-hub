import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, X, ChevronDown, ChevronRight, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, Crown, Settings, Code, UserCog, LogIn, LogOut, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';
import { ShoppingCart } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface MobileSidebarProps {
  userLevel: number;
  currentPoints: number;
  nextLevelPoints: number;
  isMember: boolean;
}

const MobileSidebar = ({ userLevel, currentPoints, nextLevelPoints, isMember }: MobileSidebarProps) => {
  const [open, setOpen] = useState(false);
  const [islamicOpen, setIslamicOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(0);

  const { user, fakeAdminLogin, fakeUserLogin, signOut } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const { t } = useTranslation();
  const progress = (currentPoints / nextLevelPoints) * 100;

  // Watch for cart changes and trigger animation
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setCartAnimating(true);
      setTimeout(() => setCartAnimating(false), 1000);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  const handleLinkClick = () => {
    setOpen(false);
  };

  // Function to close all other sections when one is opened
  const handleSectionToggle = (section: string) => {
    const closers = {
      islamic: () => {
        setToolsOpen(false);
        setDonateOpen(false);
        setCommunityOpen(false);
        setRewardsOpen(false);
        setDeveloperOpen(false);
        setUserLoginOpen(false);
      },
      tools: () => {
        setIslamicOpen(false);
        setDonateOpen(false);
        setCommunityOpen(false);
        setRewardsOpen(false);
        setDeveloperOpen(false);
        setUserLoginOpen(false);
      },
      donate: () => {
        setIslamicOpen(false);
        setToolsOpen(false);
        setCommunityOpen(false);
        setRewardsOpen(false);
        setDeveloperOpen(false);
        setUserLoginOpen(false);
      },
      community: () => {
        setIslamicOpen(false);
        setToolsOpen(false);
        setDonateOpen(false);
        setRewardsOpen(false);
        setDeveloperOpen(false);
        setUserLoginOpen(false);
      },
      rewards: () => {
        setIslamicOpen(false);
        setToolsOpen(false);
        setDonateOpen(false);
        setCommunityOpen(false);
        setDeveloperOpen(false);
        setUserLoginOpen(false);
      },
      developer: () => {
        setIslamicOpen(false);
        setToolsOpen(false);
        setDonateOpen(false);
        setCommunityOpen(false);
        setRewardsOpen(false);
        setUserLoginOpen(false);
      },
      userLogin: () => {
        setIslamicOpen(false);
        setToolsOpen(false);
        setDonateOpen(false);
        setCommunityOpen(false);
        setRewardsOpen(false);
        setDeveloperOpen(false);
      }
    };

    if (closers[section as keyof typeof closers]) {
      closers[section as keyof typeof closers]();
    }
  };

  const handleFakeLogin = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      fakeAdminLogin();
    } else {
      fakeUserLogin();
    }
    setOpen(false);
  };

  const handleSignOut = () => {
    signOut();
    setOpen(false);
  };

  const islamicPages = [
    { name: t('islamic_calendar'), path: "/islamic-calendar", icon: Calendar, description: "Sacred days & celebrations", gradient: "from-emerald-600 to-green-600" },
    { name: t('ramadan_calendar'), path: "/ramadan-calendar", icon: Moon, description: "Track your Ramadan journey", gradient: "from-purple-600 to-indigo-600" },
    { name: t('adhan_community'), path: "/adhan-community", icon: Mic, description: "Share beautiful Adhan recordings", gradient: "from-blue-600 to-cyan-600" },
    { name: t('live_tv'), path: "/live-tv", icon: Tv, description: "Islamic channels & content", gradient: "from-red-600 to-pink-600" },
    { name: t('dhikr_community'), path: "/dhikr-community", icon: Sparkles, description: "Spiritual remembrance together", gradient: "from-purple-600 to-pink-600" },
  ];

  const toolsPages = [
    { name: t('prayer_times'), path: "/namaz-times", icon: Clock, description: "Accurate prayer times worldwide", gradient: "from-indigo-600 to-blue-600" },
    { name: t('quran_reader'), path: "/quran-reader", icon: BookOpen, description: "Read & track progress", gradient: "from-emerald-600 to-green-600" },
    { name: t('zakat_calculator'), path: "/zakat-calculator", icon: Coins, description: "Calculate your Zakat", gradient: "from-yellow-600 to-orange-600" },
    { name: t('dua_wall'), path: "/dua-wall", icon: Heart, description: "Share & support prayers", gradient: "from-pink-600 to-rose-600" },
  ];

  const donatePages = [
    { name: t('active_campaigns'), path: "/campaigns", icon: Heart, description: "Support urgent causes worldwide", gradient: "from-emerald-600 to-green-600" },
    { name: t('build_mosque'), path: "/build-mosque", icon: Building, description: "Fund mosque construction", gradient: "from-blue-600 to-indigo-600" },
    { name: t('water_wells'), path: "/water-wells", icon: "💧", description: "Provide clean water access", gradient: "from-cyan-600 to-blue-600" },
    { name: t('orphanages'), path: "/orphanages", icon: "👶", description: "Support orphan care & education", gradient: "from-pink-600 to-rose-600" },
    { name: t('qurbani'), path: "/qurbani", icon: "🐄", description: "Sacrifice & share blessings", gradient: "from-orange-600 to-red-600" },
  ];

  const communityPages = [
    { name: t('masjid_community'), path: "/masjid-community", icon: Building, description: "Represent your local mosque", gradient: "from-indigo-600 to-purple-600" },
    { name: t('my_ummah'), path: "/my-ummah", icon: Users, description: "Global Muslim community", gradient: "from-emerald-600 to-green-600" },
    { name: t('leaderboards'), path: "/leaderboards", icon: Trophy, description: "Top donors & recognition", gradient: "from-amber-600 to-yellow-600" },
  ];

  const rewardsPages = [
    { name: t('sadaqah_coins'), path: "/sadaqah-coins", icon: Coins, description: "Purchase coins & unlock rewards", gradient: "from-yellow-600 to-amber-600" },
    { name: t('my_jannah'), path: "/my-jannah", icon: Building, description: "Build your paradise", gradient: "from-emerald-600 to-green-600" },
    { name: t('membership_tiers'), path: "/membership", icon: Shield, description: "Upgrade for multiplied points", gradient: "from-purple-600 to-indigo-600" },
    { name: t('gift_cards'), path: "/gift-cards", icon: Gift, description: "Give the gift of giving", gradient: "from-pink-600 to-rose-600" },
  ];

  const developerPages = [
    { name: "Admin Dashboard", path: "/admin-dashboard", icon: UserCog, description: "Admin control panel", gradient: "from-red-600 to-orange-600" },
    { name: "Profile Settings", path: "/profile", icon: User, description: "User profile management", gradient: "from-blue-600 to-indigo-600" },
    { name: "Auth Page", path: "/auth", icon: Shield, description: "Login & registration", gradient: "from-purple-600 to-pink-600" },
    { name: "Checkout", path: "/checkout", icon: "💳", description: "Payment processing", gradient: "from-green-600 to-emerald-600" },
    { name: "Why Donate", path: "/why-donate", icon: Heart, description: "About donation benefits", gradient: "from-rose-600 to-pink-600" },
    { name: "Live Feed", path: "/live-feed", icon: Tv, description: "Activity feed page", gradient: "from-cyan-600 to-blue-600" },
    { name: "Fundraising", path: "/fundraising", icon: Trophy, description: "Create fundraisers", gradient: "from-amber-600 to-yellow-600" },
    { name: "Charity Partners", path: "/charity-partners", icon: Building, description: "Partner organizations", gradient: "from-indigo-600 to-purple-600" },
    { name: "Duas Library", path: "/duas-library", icon: BookOpen, description: "Collection of duas", gradient: "from-emerald-600 to-green-600" },
    { name: "Business Profile", path: "/business-profile", icon: Building, description: "Business dashboard", gradient: "from-orange-600 to-red-600" },
    { name: "Charity Profile", path: "/charity-profile", icon: Heart, description: "Charity organization page", gradient: "from-pink-600 to-rose-600" },
  ];

  const renderPageItem = (page: any) => {
    const IconComponent = typeof page.icon === 'string' ? null : page.icon;
    
    return (
      <Link
        key={page.path}
        to={page.path}
        onClick={handleLinkClick}
        className={`flex items-center p-4 rounded-2xl mb-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r ${page.gradient} shadow-lg`}
      >
        {IconComponent ? (
          <IconComponent className="h-6 w-6 mr-4" />
        ) : (
          <span className="text-xl mr-4">{page.icon}</span>
        )}
        <div className="flex-1">
          <div className="font-semibold text-white text-base">{page.name}</div>
          <p className="text-sm text-white/80 leading-tight">{page.description}</p>
        </div>
      </Link>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="relative">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
            <Menu className="h-6 w-6" />
          </Button>
          {totalItems > 0 && (
            <div className="absolute -top-2 -right-2 z-50">
              <div className="relative bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center border-2 border-yellow-300/50 shadow-lg font-bold min-w-[24px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 w-1/3 animate-[goldShine_3s_ease-in-out_infinite] rounded-full"></div>
                <span className="relative z-10 drop-shadow-sm text-[10px]">{totalItems}</span>
              </div>
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col h-full">
        
        {/* Enhanced Close Button */}
        <div className="absolute top-4 right-4 z-50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
          >
            <X className="h-5 w-5 text-white drop-shadow-md" />
          </Button>
        </div>
        
        {/* Fully Scrollable Content Area */}
        <div className="overflow-y-auto p-4 space-y-4 h-full pt-16">
          
          {/* User Profile Section */}
          <div className="text-center">
            <Link 
              to="/profile" 
              onClick={handleLinkClick}
              className="block relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl px-4 py-3 shadow-xl border border-yellow-300/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] overflow-hidden mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/20 rounded-2xl"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-2xl"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-md bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 ring-2 ring-white/20">
                    <span className="text-lg">🛡️</span>
                  </div>
                  {isMember && (
                    <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs shadow-sm animate-bounce-in px-2 py-1">
                      <Crown className="h-3 w-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                
                <div className="flex-1 ml-4 text-left">
                  <h3 className="font-bold text-lg text-yellow-50 drop-shadow-md">
                    Ahmad M.
                  </h3>
                  <span className="text-sm text-yellow-100/90 drop-shadow-sm">Guardian</span>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-bold text-yellow-50 drop-shadow-md">Lv {userLevel}</div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-100 drop-shadow-md mr-1" />
                    <span className="text-sm font-bold text-yellow-50 drop-shadow-md">{currentPoints.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3">
                <Progress value={progress} className="h-2" />
              </div>
            </Link>
          </div>

          {/* Checkout Section */}
          <div>
            <Link 
              to="/checkout" 
              onClick={handleLinkClick}
              className={`flex items-center justify-between p-4 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg backdrop-blur-sm overflow-hidden relative ${
                cartAnimating 
                  ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 animate-pulse' 
                  : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite]"></div>
              
              <div className="relative flex items-center">
                <div className={`rounded-xl p-2 mr-3 backdrop-blur-sm transition-all duration-300 ${
                  cartAnimating ? 'bg-white/30 scale-110' : 'bg-white/20'
                }`}>
                  <ShoppingCart className={`h-5 w-5 drop-shadow-md transition-all duration-300 ${
                    cartAnimating ? 'animate-bounce' : ''
                  }`} />
                </div>
                <div>
                  <span className="drop-shadow-md text-base">
                    {cartAnimating ? 'Added!' : t('checkout')}
                  </span>
                  <div className="text-sm text-white/80 drop-shadow-sm">
                    {totalItems > 0 ? `${totalItems} item${totalItems !== 1 ? 's' : ''}` : 'Empty'}
                  </div>
                </div>
              </div>
              <div className={`relative rounded-xl px-3 py-2 shadow-md transition-all duration-300 ${
                cartAnimating 
                  ? 'bg-gradient-to-r from-yellow-300 to-orange-400 scale-110' 
                  : 'bg-gradient-to-r from-yellow-400 to-orange-500'
              }`}>
                <span className="text-sm font-bold text-white drop-shadow-md">
                  £{totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}
                </span>
              </div>
            </Link>
          </div>

          {/* Language Switcher */}
          <div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-3" />
                <span className="font-semibold">{t('language')}</span>
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Home */}
          <Link 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <span className="text-xl mr-3">🏠</span>
            <span className="text-base">{t('home')}</span>
          </Link>

          {/* User Login Section */}
          <Collapsible open={userLoginOpen} onOpenChange={(isOpen) => {
            setUserLoginOpen(isOpen);
            if (isOpen) handleSectionToggle('userLogin');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <User className="h-5 w-5 mr-3" />
                <span className="text-base">{t('user_login')}</span>
              </div>
              {userLoginOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="flex items-center p-3 rounded-2xl mb-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-red-600 to-rose-600 shadow-lg w-full"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <div className="flex-1 text-left">
                    <div className="font-semibold text-white">{t('sign_out')}</div>
                    <p className="text-sm text-white/80 leading-tight">Log out current user</p>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleFakeLogin('user')}
                    className="flex items-center p-3 rounded-2xl mb-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-blue-600 to-cyan-600 shadow-lg w-full"
                  >
                    <User className="h-5 w-5 mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{t('test_user_login')}</div>
                      <p className="text-sm text-white/80 leading-tight">Login as a test user</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleFakeLogin('admin')}
                    className="flex items-center p-3 rounded-2xl mb-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-orange-600 to-red-600 shadow-lg w-full"
                  >
                    <Shield className="h-5 w-5 mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">{t('test_admin_login')}</div>
                      <p className="text-sm text-white/80 leading-tight">Login as a test admin</p>
                    </div>
                  </button>
                  <Link
                    to="/auth"
                    onClick={handleLinkClick}
                    className="flex items-center p-3 rounded-2xl mb-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg"
                  >
                    <LogIn className="h-5 w-5 mr-3" />
                    <div className="flex-1">
                      <div className="font-semibold text-white">{t('real_login')}</div>
                      <p className="text-sm text-white/80 leading-tight">Go to authentication page</p>
                    </div>
                  </Link>
                </>
              )}
            </CollapsibleContent>
          </Collapsible>

          {/* Islamic Life Section */}
          <Collapsible open={islamicOpen} onOpenChange={(isOpen) => {
            setIslamicOpen(isOpen);
            if (isOpen) handleSectionToggle('islamic');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">🕌</span>
                <span className="text-base">{t('islamic_life')}</span>
              </div>
              {islamicOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {islamicPages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Tools Section */}
          <Collapsible open={toolsOpen} onOpenChange={(isOpen) => {
            setToolsOpen(isOpen);
            if (isOpen) handleSectionToggle('tools');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-indigo-700 to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">🛠️</span>
                <span className="text-base">{t('tools')}</span>
              </div>
              {toolsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {toolsPages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Donate Section */}
          <Collapsible open={donateOpen} onOpenChange={(isOpen) => {
            setDonateOpen(isOpen);
            if (isOpen) handleSectionToggle('donate');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-emerald-700 to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">💝</span>
                <span className="text-base">{t('donate')}</span>
              </div>
              {donateOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {donatePages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Community Section */}
          <Collapsible open={communityOpen} onOpenChange={(isOpen) => {
            setCommunityOpen(isOpen);
            if (isOpen) handleSectionToggle('community');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">👥</span>
                <span className="text-base">{t('community')}</span>
              </div>
              {communityOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {communityPages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Rewards Section */}
          <Collapsible open={rewardsOpen} onOpenChange={(isOpen) => {
            setRewardsOpen(isOpen);
            if (isOpen) handleSectionToggle('rewards');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-yellow-700 to-amber-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <span className="text-xl mr-3">🏆</span>
                <span className="text-base">{t('rewards')}</span>
              </div>
              {rewardsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {rewardsPages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Developer Section */}
          <Collapsible open={developerOpen} onOpenChange={(isOpen) => {
            setDeveloperOpen(isOpen);
            if (isOpen) handleSectionToggle('developer');
          }}>
            <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-slate-700 to-gray-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              <div className="flex items-center">
                <Code className="h-5 w-5 mr-3" />
                <span className="text-base">{t('developer')}</span>
              </div>
              {developerOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mt-3 ml-4">
              {developerPages.map(renderPageItem)}
            </CollapsibleContent>
          </Collapsible>

          {/* Become a Member - only show if not a member */}
          {!isMember && (
            <Link 
              to="/membership" 
              onClick={handleLinkClick}
              className="flex items-center p-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg border-2 border-yellow-300/60 ring-2 ring-amber-400/30"
            >
              <Shield className="h-6 w-6 mr-3" />
              <span className="text-base">{t('become_member')}</span>
            </Link>
          )}
        </div>
        
        {/* Keep existing keyframes styles */}
        <style>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(400%) skewX(-12deg); }
          }
          @keyframes goldShine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(300%) skewX(-12deg); }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, X, ChevronDown, ChevronRight, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, Crown, Settings, Code, UserCog, LogIn, LogOut } from 'lucide-react';
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
import { ShoppingCart } from 'lucide-react';

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

  const { user, fakeAdminLogin, fakeUserLogin, signOut } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const progress = (currentPoints / nextLevelPoints) * 100;

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
    { name: "Islamic Calendar", path: "/islamic-calendar", icon: Calendar, description: "Sacred days & celebrations", gradient: "from-emerald-600 to-green-600" },
    { name: "Ramadan Calendar", path: "/ramadan-calendar", icon: Moon, description: "Track your Ramadan journey", gradient: "from-purple-600 to-indigo-600" },
    { name: "Adhan Community", path: "/adhan-community", icon: Mic, description: "Share beautiful Adhan recordings", gradient: "from-blue-600 to-cyan-600" },
    { name: "Live TV", path: "/live-tv", icon: Tv, description: "Islamic channels & content", gradient: "from-red-600 to-pink-600" },
    { name: "Dhikr Community", path: "/dhikr-community", icon: Sparkles, description: "Spiritual remembrance together", gradient: "from-purple-600 to-pink-600" },
  ];

  const toolsPages = [
    { name: "Prayer Times", path: "/namaz-times", icon: Clock, description: "Accurate prayer times worldwide", gradient: "from-indigo-600 to-blue-600" },
    { name: "Quran Reader", path: "/quran-reader", icon: BookOpen, description: "Read & track progress", gradient: "from-emerald-600 to-green-600" },
    { name: "Zakat Calculator", path: "/zakat-calculator", icon: Coins, description: "Calculate your Zakat", gradient: "from-yellow-600 to-orange-600" },
    { name: "Dua Wall", path: "/dua-wall", icon: Heart, description: "Share & support prayers", gradient: "from-pink-600 to-rose-600" },
  ];

  const donatePages = [
    { name: "Active Campaigns", path: "/campaigns", icon: Heart, description: "Support urgent causes worldwide", gradient: "from-emerald-600 to-green-600" },
    { name: "Build a Mosque", path: "/build-mosque", icon: Building, description: "Fund mosque construction", gradient: "from-blue-600 to-indigo-600" },
    { name: "Water Wells", path: "/water-wells", icon: "💧", description: "Provide clean water access", gradient: "from-cyan-600 to-blue-600" },
    { name: "Orphanages", path: "/orphanages", icon: "👶", description: "Support orphan care & education", gradient: "from-pink-600 to-rose-600" },
    { name: "Qurbani", path: "/qurbani", icon: "🐄", description: "Sacrifice & share blessings", gradient: "from-orange-600 to-red-600" },
  ];

  const communityPages = [
    { name: "Masjid Community", path: "/masjid-community", icon: Building, description: "Represent your local mosque", gradient: "from-indigo-600 to-purple-600" },
    { name: "My Ummah", path: "/my-ummah", icon: Users, description: "Global Muslim community", gradient: "from-emerald-600 to-green-600" },
    { name: "Leaderboards", path: "/leaderboards", icon: Trophy, description: "Top donors & recognition", gradient: "from-amber-600 to-yellow-600" },
  ];

  const rewardsPages = [
    { name: "Sadaqah Coins", path: "/sadaqah-coins", icon: Coins, description: "Purchase coins & unlock rewards", gradient: "from-yellow-600 to-amber-600" },
    { name: "My Jannah", path: "/my-jannah", icon: Building, description: "Build your paradise", gradient: "from-emerald-600 to-green-600" },
    { name: "Membership Tiers", path: "/membership", icon: Shield, description: "Upgrade for multiplied points", gradient: "from-purple-600 to-indigo-600" },
    { name: "Gift Cards", path: "/gift-cards", icon: Gift, description: "Give the gift of giving", gradient: "from-pink-600 to-rose-600" },
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
        className={`flex items-center p-3 rounded-xl mb-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r ${page.gradient} hover:shadow-xl`}
      >
        {IconComponent ? (
          <IconComponent className="h-5 w-5 mr-3" />
        ) : (
          <span className="text-lg mr-3">{page.icon}</span>
        )}
        <div className="flex-1">
          <div className="font-semibold text-white">{page.name}</div>
          <p className="text-xs text-white/80 leading-tight">{page.description}</p>
        </div>
      </Link>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 relative">
          <Menu className="h-6 w-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        
        <div className="flex flex-col h-full">
          {/* Enhanced Golden User Plaque */}
          <div className="p-4">
            <div className="text-center">
              {/* Golden Plaque Container */}
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-3xl px-4 py-3 shadow-2xl border-2 border-yellow-300/50 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] overflow-hidden mx-auto max-w-[240px]">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/20 rounded-3xl"></div>
                
                {/* Top highlight */}
                <div className="absolute top-1 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent rounded-full"></div>
                
                {/* Glossy animation effect that moves across */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-3xl"></div>
                
                <div className="relative">
                  {/* Avatar Section */}
                  <div className="relative inline-block mb-3">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 ring-4 ring-white/20">
                      <span className="text-xl">🛡️</span>
                    </div>
                    {isMember && (
                      <Badge className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs shadow-md animate-bounce-in">
                        <Crown className="h-3 w-3 mr-1" />
                        VIP
                      </Badge>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-yellow-50 drop-shadow-md mb-1">
                      Ahmad M.
                    </h3>
                    <span className="text-sm text-yellow-100/90 drop-shadow-sm font-medium">Guardian</span>
                  </div>
                  
                  {/* Level and Progress */}
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="text-sm font-bold text-yellow-50 drop-shadow-md">Level {userLevel}</span>
                      <div className="flex-1 max-w-20">
                        <Progress value={progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-100 drop-shadow-md" />
                      <span className="text-sm font-bold text-yellow-50 drop-shadow-md">{currentPoints.toLocaleString()} points</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom highlight */}
                <div className="absolute bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            
            {/* Home */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="text-lg mr-3">🏠</span>
              Home
            </Link>

            {/* Checkout Section - Add this before User Login Section */}
            {totalItems > 0 && (
              <Link 
                to="/checkout" 
                onClick={handleLinkClick}
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  <span>Checkout</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold">£{totalAmount.toFixed(2)}</span>
                  <span className="text-xs text-white/80">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                </div>
              </Link>
            )}

            {/* User Login Section */}
            <Collapsible open={userLoginOpen} onOpenChange={(isOpen) => {
              setUserLoginOpen(isOpen);
              if (isOpen) handleSectionToggle('userLogin');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-3" />
                  <span>User Login</span>
                </div>
                {userLoginOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {user ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center p-3 rounded-xl mb-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-red-600 to-rose-600 hover:shadow-xl w-full"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-white">Sign Out</div>
                      <p className="text-xs text-white/80 leading-tight">Log out current user</p>
                    </div>
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleFakeLogin('user')}
                      className="flex items-center p-3 rounded-xl mb-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-xl w-full"
                    >
                      <User className="h-5 w-5 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-white">Test User Login</div>
                        <p className="text-xs text-white/80 leading-tight">Login as a test user</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleFakeLogin('admin')}
                      className="flex items-center p-3 rounded-xl mb-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-xl w-full"
                    >
                      <Shield className="h-5 w-5 mr-3" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-white">Test Admin Login</div>
                        <p className="text-xs text-white/80 leading-tight">Login as a test admin</p>
                      </div>
                    </button>
                    <Link
                      to="/auth"
                      onClick={handleLinkClick}
                      className="flex items-center p-3 rounded-xl mb-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-xl"
                    >
                      <LogIn className="h-5 w-5 mr-3" />
                      <div className="flex-1">
                        <div className="font-semibold text-white">Real Login</div>
                        <p className="text-xs text-white/80 leading-tight">Go to authentication page</p>
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
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🕌</span>
                  <span>Islamic Life</span>
                </div>
                {islamicOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {islamicPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Tools Section */}
            <Collapsible open={toolsOpen} onOpenChange={(isOpen) => {
              setToolsOpen(isOpen);
              if (isOpen) handleSectionToggle('tools');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-indigo-700 to-blue-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🛠️</span>
                  <span>Tools</span>
                </div>
                {toolsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {toolsPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Donate Section */}
            <Collapsible open={donateOpen} onOpenChange={(isOpen) => {
              setDonateOpen(isOpen);
              if (isOpen) handleSectionToggle('donate');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-emerald-700 to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <span className="text-lg mr-3">💝</span>
                  <span>Donate</span>
                </div>
                {donateOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {donatePages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Community Section */}
            <Collapsible open={communityOpen} onOpenChange={(isOpen) => {
              setCommunityOpen(isOpen);
              if (isOpen) handleSectionToggle('community');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <span className="text-lg mr-3">👥</span>
                  <span>Community</span>
                </div>
                {communityOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {communityPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Rewards Section */}
            <Collapsible open={rewardsOpen} onOpenChange={(isOpen) => {
              setRewardsOpen(isOpen);
              if (isOpen) handleSectionToggle('rewards');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-yellow-700 to-amber-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🏆</span>
                  <span>Rewards</span>
                </div>
                {rewardsOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {rewardsPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Developer Section */}
            <Collapsible open={developerOpen} onOpenChange={(isOpen) => {
              setDeveloperOpen(isOpen);
              if (isOpen) handleSectionToggle('developer');
            }}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 rounded-xl bg-gradient-to-r from-slate-700 to-gray-700 text-white font-semibold transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <Code className="h-5 w-5 mr-3" />
                  <span>Developer</span>
                </div>
                {developerOpen ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 mt-2 ml-4">
                {developerPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Become a Member - only show if not a member */}
            {!isMember && (
              <Link 
                to="/membership" 
                onClick={handleLinkClick}
                className="flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-yellow-300/60 ring-2 ring-amber-400/30"
              >
                <Shield className="h-6 w-6 mr-3" />
                <span>Become a Member</span>
              </Link>
            )}
          </div>
        </div>
        
        {/* Add the shine animation keyframes */}
        <style>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(400%) skewX(-12deg); }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

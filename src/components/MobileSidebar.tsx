
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, X, ChevronDown, ChevronRight, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, Crown } from 'lucide-react';
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

  const progress = (currentPoints / nextLevelPoints) * 100;

  const handleLinkClick = () => {
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
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <SheetHeader className="p-4 border-b border-white/10">
          <SheetTitle className="text-left text-white font-bold text-xl">Navigation</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {/* User Level Plaque */}
          <div className="p-4 border-b border-white/10">
            <div className="text-center">
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
              
              <h3 className="font-bold text-lg text-white flex items-center justify-center gap-2 mb-1">
                Ahmad M.
              </h3>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm font-bold text-white">Level {userLevel}</span>
                  <div className="flex-1 max-w-20">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-bold text-white">{currentPoints.toLocaleString()} points</span>
                </div>
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

            {/* Islamic Life Section */}
            <Collapsible open={islamicOpen} onOpenChange={setIslamicOpen}>
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
            <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
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
            <Collapsible open={donateOpen} onOpenChange={setDonateOpen}>
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
            <Collapsible open={communityOpen} onOpenChange={setCommunityOpen}>
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
            <Collapsible open={rewardsOpen} onOpenChange={setRewardsOpen}>
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

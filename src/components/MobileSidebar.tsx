
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, X, ChevronDown, ChevronRight, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles } from 'lucide-react';
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
    { name: "Islamic Calendar", path: "/islamic-calendar", icon: Calendar, description: "Sacred days & celebrations" },
    { name: "Ramadan Calendar", path: "/ramadan-calendar", icon: Moon, description: "Track your Ramadan journey" },
    { name: "Adhan Community", path: "/adhan-community", icon: Mic, description: "Share beautiful Adhan recordings" },
    { name: "Live TV", path: "/live-tv", icon: Tv, description: "Islamic channels & content" },
    { name: "Dhikr Community", path: "/dhikr-community", icon: Sparkles, description: "Spiritual remembrance together" },
  ];

  const toolsPages = [
    { name: "Prayer Times", path: "/namaz-times", icon: Clock, description: "Accurate prayer times worldwide" },
    { name: "Quran Reader", path: "/quran-reader", icon: BookOpen, description: "Read & track progress" },
    { name: "Zakat Calculator", path: "/zakat-calculator", icon: Coins, description: "Calculate your Zakat" },
    { name: "Dua Wall", path: "/dua-wall", icon: Heart, description: "Share & support prayers" },
  ];

  const donatePages = [
    { name: "Active Campaigns", path: "/campaigns", icon: Heart, description: "Support urgent causes worldwide" },
    { name: "Build a Mosque", path: "/build-mosque", icon: Building, description: "Fund mosque construction" },
    { name: "Water Wells", path: "/water-wells", icon: "💧", description: "Provide clean water access" },
    { name: "Orphanages", path: "/orphanages", icon: "👶", description: "Support orphan care & education" },
    { name: "Qurbani", path: "/qurbani", icon: "🐄", description: "Sacrifice & share blessings" },
  ];

  const communityPages = [
    { name: "Masjid Community", path: "/masjid-community", icon: Building, description: "Represent your local mosque" },
    { name: "My Ummah", path: "/my-ummah", icon: Users, description: "Global Muslim community" },
    { name: "Leaderboards", path: "/leaderboards", icon: Trophy, description: "Top donors & recognition" },
  ];

  const rewardsPages = [
    { name: "Sadaqah Coins", path: "/sadaqah-coins", icon: Coins, description: "Purchase coins & unlock rewards" },
    { name: "My Jannah", path: "/my-jannah", icon: Building, description: "Build your paradise" },
    { name: "Membership Tiers", path: "/membership", icon: Shield, description: "Upgrade for multiplied points" },
    { name: "Gift Cards", path: "/gift-cards", icon: Gift, description: "Give the gift of giving" },
  ];

  const renderPageItem = (page: any) => {
    const IconComponent = typeof page.icon === 'string' ? null : page.icon;
    
    return (
      <Link
        key={page.path}
        to={page.path}
        onClick={handleLinkClick}
        className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {IconComponent ? (
          <IconComponent className="h-5 w-5 mr-3 text-gray-600" />
        ) : (
          <span className="text-lg mr-3">{page.icon}</span>
        )}
        <div>
          <div className="font-medium text-gray-900">{page.name}</div>
          <p className="text-sm text-gray-500">{page.description}</p>
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
      <SheetContent side="left" className="w-80 p-0 bg-white">
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {/* Home */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-900"
            >
              Home
            </Link>

            {/* Islamic Life Section */}
            <Collapsible open={islamicOpen} onOpenChange={setIslamicOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Islamic Life</span>
                {islamicOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {islamicPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Tools Section */}
            <Collapsible open={toolsOpen} onOpenChange={setToolsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Tools</span>
                {toolsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {toolsPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Donate Section */}
            <Collapsible open={donateOpen} onOpenChange={setDonateOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Donate</span>
                {donateOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {donatePages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Community Section */}
            <Collapsible open={communityOpen} onOpenChange={setCommunityOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Community</span>
                {communityOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {communityPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Rewards Section */}
            <Collapsible open={rewardsOpen} onOpenChange={setRewardsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Rewards</span>
                {rewardsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-4">
                {rewardsPages.map(renderPageItem)}
              </CollapsibleContent>
            </Collapsible>

            {/* Become a Member - only show if not a member */}
            {!isMember && (
              <Link 
                to="/membership" 
                onClick={handleLinkClick}
                className="flex items-center p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-700 hover:to-cyan-700 transition-colors"
              >
                <Shield className="h-5 w-5 mr-3" />
                <span className="font-medium">Become a Member</span>
              </Link>
            )}
          </div>

          {/* User Stats at Bottom */}
          {isMember && (
            <div className="p-4 border-t bg-gray-50">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Level {userLevel}</span>
                  <div className="flex-1">
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{currentPoints.toLocaleString()} points</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

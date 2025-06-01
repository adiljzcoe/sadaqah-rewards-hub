
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Menu, 
  Heart, 
  Users, 
  Building, 
  Trophy, 
  Gift, 
  BookOpen, 
  Star,
  Coins,
  Shield,
  ChevronRight
} from 'lucide-react';
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
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDonateOpen, setIsDonateOpen] = React.useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = React.useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = React.useState(false);

  const progress = (currentPoints / nextLevelPoints) * 100;
  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="md:hidden relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-blue-800/80 to-indigo-800/90 backdrop-blur-sm text-cyan-300 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-2 border-2 border-cyan-400/40 hover:scale-110 hover:border-cyan-300/60 ring-2 ring-cyan-400/20 flex-shrink-0 ml-2 z-[140]">
          <Menu className="h-5 w-5 drop-shadow-sm" />
          <div className="absolute top-1 left-1 w-3 h-1.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full animate-shimmer"></div>
          <div className="absolute bottom-1 right-1 w-2 h-1 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent rounded-full animate-shimmer delay-500"></div>
        </Button>
      </SheetTrigger>
      
      <SheetContent 
        side="right" 
        className="w-[320px] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-xl border-l border-cyan-400/30 shadow-2xl text-white p-0"
      >
        <div className="flex flex-col h-full">
          <SheetHeader className="p-6 border-b border-cyan-400/20">
            <SheetTitle className="text-cyan-300 text-xl font-bold">Menu</SheetTitle>
            
            {/* User Profile Section */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">🛡️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-amber-100">Ahmad M.</span>
                    {isMember && <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">Guardian</Badge>}
                  </div>
                  <div className="text-sm text-amber-200/80">Level {userLevel}</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-amber-200/80 mb-1">
                  <span>{currentPoints} pts</span>
                  <span>{nextLevelPoints} pts</span>
                </div>
                <Progress value={progress} className="h-2 bg-amber-800/40" />
              </div>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* Home */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/') ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-lg">🏠</span>
              <span className="font-medium">Home</span>
            </Link>

            {/* Donate Section */}
            <Collapsible open={isDonateOpen} onOpenChange={setIsDonateOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="font-medium">Donate</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isDonateOpen ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-8 mt-2">
                <Link to="/campaigns" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-500/20 text-sm">
                  <Heart className="h-4 w-4 text-emerald-400" />
                  <span>Active Campaigns</span>
                </Link>
                <Link to="/build-mosque" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-500/20 text-sm">
                  <Building className="h-4 w-4 text-blue-400" />
                  <span>Build a Mosque</span>
                </Link>
                <Link to="/water-wells" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-cyan-500/20 text-sm">
                  <span className="text-sm">💧</span>
                  <span>Water Wells</span>
                </Link>
                <Link to="/orphanages" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-500/20 text-sm">
                  <span className="text-sm">👶</span>
                  <span>Orphanages</span>
                </Link>
                <Link to="/charities" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-violet-500/20 text-sm">
                  <Users className="h-4 w-4 text-violet-400" />
                  <span>Charity Partners</span>
                </Link>
                <Link to="/why-donate" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500/20 text-sm">
                  <Shield className="h-4 w-4 text-orange-400" />
                  <span>Why Donate With Us</span>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Community Section */}
            <Collapsible open={isCommunityOpen} onOpenChange={setIsCommunityOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Community</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isCommunityOpen ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-8 mt-2">
                <Link to="/leaderboards" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-500/20 text-sm">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span>Leaderboards</span>
                </Link>
                <Link to="/live" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-500/20 text-sm">
                  <span className="text-sm">🔴</span>
                  <span>Live Feed</span>
                </Link>
                <Link to="/blog" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-indigo-500/20 text-sm">
                  <BookOpen className="h-4 w-4 text-indigo-400" />
                  <span>Blog & Stories</span>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Rewards Section */}
            <Collapsible open={isRewardsOpen} onOpenChange={setIsRewardsOpen}>
              <CollapsibleTrigger className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-amber-400" />
                  <span className="font-medium">Rewards</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform ${isRewardsOpen ? 'rotate-90' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 ml-8 mt-2">
                <Link to="/coins" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-yellow-500/20 text-sm">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span>Sadaqah Coins</span>
                </Link>
                <Link to="/membership" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-500/20 text-sm">
                  <Shield className="h-4 w-4 text-purple-400" />
                  <span>Membership Tiers</span>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* About */}
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                isActive('/about') ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-slate-800/50'
              }`}
            >
              <span className="text-lg">ℹ️</span>
              <span className="font-medium">About</span>
            </Link>

            {/* Become a Member (if not member) */}
            {!isMember && (
              <div className="pt-4 border-t border-cyan-400/20">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl ring-2 ring-cyan-400/30 hover:ring-cyan-300/50">
                  <span className="text-lg mr-2">🛡️</span>
                  Become a Member
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

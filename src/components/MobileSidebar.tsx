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
  ChevronRight,
  Home,
  Info
} from 'lucide-react';

interface MobileSidebarProps {
  userLevel: number;
  currentPoints: number;
  nextLevelPoints: number;
  isMember: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ userLevel, currentPoints, nextLevelPoints, isMember, isOpen, onClose }: MobileSidebarProps) => {
  const location = useLocation();
  const [isDonateOpen, setIsDonateOpen] = React.useState(false);
  const [isCommunityOpen, setIsCommunityOpen] = React.useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = React.useState(false);

  const progress = (currentPoints / nextLevelPoints) * 100;
  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    onClose();
  };

  const toggleSection = (section: string) => {
    switch (section) {
      case 'donate':
        setIsDonateOpen(!isDonateOpen);
        break;
      case 'community':
        setIsCommunityOpen(!isCommunityOpen);
        break;
      case 'rewards':
        setIsRewardsOpen(!isRewardsOpen);
        break;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* User Profile Header */}
          <div className="p-6 border-b border-cyan-400/20">
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-600/20 to-yellow-600/20 border border-amber-400/30">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-lg">🛡️</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-amber-100">Ahmad M.</span>
                    {isMember && <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30 text-xs">Guardian</Badge>}
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
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {/* Home */}
            <Link 
              to="/" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'hover:bg-slate-800/50 text-white'
              }`}
            >
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </Link>

            {/* Donate Section */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection('donate')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-red-400" />
                  <span className="font-medium">Donate</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isDonateOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isDonateOpen && (
                <div className="ml-8 space-y-1">
                  <Link to="/campaigns" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-emerald-500/20 text-sm text-gray-300 hover:text-emerald-300 transition-colors">
                    <Heart className="h-4 w-4 text-emerald-400" />
                    <span>Active Campaigns</span>
                  </Link>
                  <Link to="/build-mosque" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-blue-500/20 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                    <Building className="h-4 w-4 text-blue-400" />
                    <span>Build a Mosque</span>
                  </Link>
                  <Link to="/water-wells" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-cyan-500/20 text-sm text-gray-300 hover:text-cyan-300 transition-colors">
                    <span className="text-sm">💧</span>
                    <span>Water Wells</span>
                  </Link>
                  <Link to="/orphanages" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-pink-500/20 text-sm text-gray-300 hover:text-pink-300 transition-colors">
                    <span className="text-sm">👶</span>
                    <span>Orphanages</span>
                  </Link>
                  <Link to="/charities" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-violet-500/20 text-sm text-gray-300 hover:text-violet-300 transition-colors">
                    <Users className="h-4 w-4 text-violet-400" />
                    <span>Charity Partners</span>
                  </Link>
                  <Link to="/why-donate" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-orange-500/20 text-sm text-gray-300 hover:text-orange-300 transition-colors">
                    <Shield className="h-4 w-4 text-orange-400" />
                    <span>Why Donate With Us</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Community Section */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection('community')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Community</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isCommunityOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isCommunityOpen && (
                <div className="ml-8 space-y-1">
                  <Link to="/leaderboards" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-amber-500/20 text-sm text-gray-300 hover:text-amber-300 transition-colors">
                    <Trophy className="h-4 w-4 text-amber-400" />
                    <span>Leaderboards</span>
                  </Link>
                  <Link to="/live" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-red-500/20 text-sm text-gray-300 hover:text-red-300 transition-colors">
                    <span className="text-sm">🔴</span>
                    <span>Live Feed</span>
                  </Link>
                  <Link to="/blog" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-indigo-500/20 text-sm text-gray-300 hover:text-indigo-300 transition-colors">
                    <BookOpen className="h-4 w-4 text-indigo-400" />
                    <span>Blog & Stories</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Rewards Section */}
            <div className="space-y-1">
              <button 
                onClick={() => toggleSection('rewards')}
                className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-slate-800/50 transition-all duration-200 text-white"
              >
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-amber-400" />
                  <span className="font-medium">Rewards</span>
                </div>
                <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isRewardsOpen ? 'rotate-90' : ''}`} />
              </button>
              
              {isRewardsOpen && (
                <div className="ml-8 space-y-1">
                  <Link to="/coins" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-yellow-500/20 text-sm text-gray-300 hover:text-yellow-300 transition-colors">
                    <Coins className="h-4 w-4 text-yellow-400" />
                    <span>Sadaqah Coins</span>
                  </Link>
                  <Link to="/membership" onClick={handleLinkClick} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-purple-500/20 text-sm text-gray-300 hover:text-purple-300 transition-colors">
                    <Shield className="h-4 w-4 text-purple-400" />
                    <span>Membership Tiers</span>
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link 
              to="/about" 
              onClick={handleLinkClick}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                isActive('/about') ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'hover:bg-slate-800/50 text-white'
              }`}
            >
              <Info className="h-5 w-5" />
              <span className="font-medium">About</span>
            </Link>

            {/* Become a Member (if not member) */}
            {!isMember && (
              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl ring-2 ring-cyan-400/30 hover:ring-cyan-300/50">
                  <span className="text-lg mr-2">🛡️</span>
                  Become a Member
                </Button>
              </div>
            )}

            {/* Masjid Community */}
            <Link
              to="/masjid-community"
              className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
              onClick={onClose}
            >
              <Building className="h-5 w-5" />
              <span>🕌 Masjid Community</span>
            </Link>
          </nav>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-cyan-400/20">
            <div className="flex items-center space-x-3">
              <span className="text-sm text-cyan-300">Version 1.0</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-cyan-300">© 2023 Masjid App</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

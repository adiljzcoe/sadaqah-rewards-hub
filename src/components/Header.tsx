import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, ArrowUp, ChevronDown, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, ShoppingCart, Crown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUserRank, getNextRank } from '@/utils/rankSystem';
import MobileSidebar from './MobileSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const location = useLocation();
  const { user, fakeAdminLogin, fakeUserLogin, signOut } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const isMember = true; // VIP status
  
  // State for controlling dropdown visibility
  const [donateOpen, setDonateOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [islamicOpen, setIslamicOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  // User level data - this would come from your user context/state management
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const pointsToNextLevel = nextLevelPoints - currentPoints;
  const progress = (currentPoints / nextLevelPoints) * 100;

  // Get user's rank
  const currentRank = getUserRank(currentPoints);
  const nextRank = getNextRank(currentPoints);

  const isActive = (path: string) => location.pathname === path;

  // Debug log to check if component renders
  React.useEffect(() => {
    console.log('🛩️ Header component rendered - mega menu should work!');
    console.log('User logged in:', !!user);
    console.log('User object:', user);
  }, [user]);

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-hidden border-b-2 border-cyan-400/30 z-50">
      {/* Final Fantasy inspired crystalline background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-20 h-8 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
        <div className="absolute top-4 right-32 w-16 h-6 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
        <div className="absolute top-1 left-1/3 w-24 h-10 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
        <div className="absolute top-3 right-1/4 w-18 h-7 bg-cyan-400/25 rounded-full blur-sm animate-pulse delay-700 shadow-cyan-300/60"></div>
        <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/80"></div>
        <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000 shadow-md shadow-blue-300/70"></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Golden Plaque */}
          <div className="flex items-center space-x-2 md:space-x-4 relative z-50">
            <Link to="/" className="transition-all duration-300 hover:scale-105 flex-shrink-0 w-[80px] md:w-[100px] relative z-30">
              <img 
                src="/lovable-uploads/b5e73df9-e9d0-49e2-ac33-283b16c6dafb.png" 
                alt="Your Jannah Logo" 
                className="w-full h-auto object-contain max-w-[80px] md:max-w-[100px]"
              />
            </Link>

            {/* Compact Golden User Plaque - Responsive Sizing with Rounded Corners */}
            {user ? (
              // Logged in user plaque with responsive sizing and rounded corners
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl md:rounded-3xl px-2 py-1 md:px-3 md:py-2 shadow-xl md:shadow-2xl border border-yellow-300/50 md:border-2 hover:shadow-2xl md:hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                {/* Inner glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/20 rounded-2xl md:rounded-3xl"></div>
                
                {/* Top highlight */}
                <div className="absolute top-0.5 md:top-1 left-1 md:left-2 right-1 md:right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent rounded-full"></div>
                
                {/* Glossy animation effect that moves across */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-2xl md:rounded-3xl"></div>
                
                <div className="relative flex items-center justify-between text-white min-w-[140px] md:min-w-[180px]">
                  {/* Left side - Crown, Name and Guardian */}
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <Crown className="h-3 w-3 md:h-4 md:w-4 text-yellow-100 drop-shadow-lg" />
                    <div className="flex flex-col">
                      <span className="font-bold text-xs md:text-sm text-yellow-50 drop-shadow-md">Ahmad M.</span>
                      <span className="text-[10px] md:text-xs text-yellow-100/90 drop-shadow-sm font-medium">Guardian</span>
                    </div>
                  </div>
                  
                  {/* Right side - Level and Points */}
                  <div className="text-right">
                    <div className="font-bold text-xs md:text-sm text-yellow-50 drop-shadow-md">LV {userLevel}</div>
                    <div className="flex items-center justify-end space-x-1">
                      <Star className="h-2 w-2 md:h-3 md:w-3 text-yellow-100 drop-shadow-md" />
                      <span className="font-bold text-[10px] md:text-xs text-yellow-50 drop-shadow-md">{currentPoints.toLocaleString()} pts</span>
                    </div>
                  </div>
                </div>
                
                {/* Bottom highlight */}
                <div className="absolute bottom-0.5 md:bottom-1 left-1 md:left-2 right-1 md:right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent rounded-full"></div>
              </div>
            ) : (
              // Non-logged in membership plaque with responsive sizing and rounded corners
              <Link to="/membership">
                <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl md:rounded-3xl px-2 py-1 md:px-3 md:py-2 shadow-xl md:shadow-2xl border border-yellow-300/50 md:border-2 hover:shadow-2xl md:hover:shadow-3xl transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/40 via-transparent to-orange-200/20 rounded-2xl md:rounded-3xl"></div>
                  
                  {/* Top highlight */}
                  <div className="absolute top-0.5 md:top-1 left-1 md:left-2 right-1 md:right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-200/70 to-transparent rounded-full"></div>
                  
                  {/* Glossy animation effect that moves across */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-2xl md:rounded-3xl"></div>
                  
                  <div className="relative flex items-center space-x-2 md:space-x-3 text-white min-w-[140px] md:min-w-[180px]">
                    <Crown className="h-3 w-3 md:h-4 md:w-4 text-yellow-100 drop-shadow-lg" />
                    <div className="flex flex-col">
                      <span className="font-bold text-xs md:text-sm text-yellow-50 drop-shadow-md">Membership</span>
                      <span className="text-[10px] md:text-xs text-yellow-100/90 drop-shadow-sm font-medium">Join Now</span>
                    </div>
                    <div className="flex items-center space-x-1 ml-2 md:ml-4 bg-white/20 rounded-xl md:rounded-2xl px-1 py-0.5 md:px-2 md:py-1 backdrop-blur-sm">
                      <Shield className="h-2 w-2 md:h-3 md:w-3 text-yellow-100 drop-shadow-md" />
                      <span className="font-bold text-[10px] md:text-xs text-yellow-50 drop-shadow-md">Unlock</span>
                    </div>
                  </div>
                  
                  {/* Bottom highlight */}
                  <div className="absolute bottom-0.5 md:bottom-1 left-1 md:left-2 right-1 md:right-2 h-0.5 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent rounded-full"></div>
                </div>
              </Link>
            )}
          </div>

          {/* Enhanced Navigation with All Pages - Hidden on all screen sizes now */}
          <nav className="hidden items-center space-x-6 flex-1 justify-center relative z-40">
            {/* ... keep existing code (dropdown menus) the same ... */}
          </nav>

          {/* Right Section - Cart, Desktop Menu, and Mobile Menu */}
          <div className="flex items-center space-x-3 relative z-40">
            {/* Checkout Button - Only show when there are items */}
            {totalItems > 0 && (
              <Link to="/checkout">
                <Button className="relative bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl ring-2 ring-green-400/30 hover:ring-green-300/50">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Checkout</span>
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-pulse">
                    {totalItems}
                  </Badge>
                </Button>
              </Link>
            )}

            {/* Desktop Menu - Visible on desktop and larger screens */}
            <div className="hidden sm:block relative z-30">
              <MobileSidebar 
                userLevel={userLevel}
                currentPoints={currentPoints}
                nextLevelPoints={nextLevelPoints}
                isMember={isMember}
              />
            </div>

            {/* Mobile Menu - Only visible on small mobile screens */}
            <div className="sm:hidden relative z-30">
              <MobileSidebar 
                userLevel={userLevel}
                currentPoints={currentPoints}
                nextLevelPoints={nextLevelPoints}
                isMember={isMember}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the shine animation keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(400%) skewX(-12deg); }
        }
      `}</style>
    </header>
  );
};

// Navigation items for the main application
export const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Why Donate", path: "/why-donate" },
  { name: "My Jannah", path: "/my-jannah" },
  { name: "My Ummah", path: "/my-ummah" },
  { name: "Live TV", path: "/live-tv" },
  { name: "Quran", path: "/quran-reader" },
  { name: "Sadaqah Coins", path: "/sadaqah-coins" },
  { name: "Namaz Times", path: "/namaz-times" },
  { name: "Charity Partners", path: "/charity-partners" },
  { name: "Admin Dashboard", path: "/admin-dashboard" },
];

export default Header;

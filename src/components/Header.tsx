
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

          {/* Enhanced Navigation with All Pages - Desktop Version */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center relative z-40">
            <Link 
              to="/" 
              className={`relative group text-white hover:text-cyan-300 transition-all duration-300 ${isActive('/') ? 'text-cyan-400 border-b-2 border-cyan-400' : ''}`}
            >
              Home
            </Link>

            {/* Islamic Life Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIslamicOpen(true)}
                onMouseLeave={() => setIslamicOpen(false)}
                className="flex items-center space-x-1 text-white hover:text-cyan-300 transition-all duration-300"
              >
                <span>Islamic Life</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {islamicOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 z-50"
                  onMouseEnter={() => setIslamicOpen(true)}
                  onMouseLeave={() => setIslamicOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/islamic-calendar" className="flex items-center p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 group">
                      <Calendar className="h-5 w-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-emerald-700">Islamic Calendar</div>
                        <p className="text-xs text-gray-600">Sacred days & celebrations</p>
                      </div>
                    </Link>
                    <Link to="/ramadan-calendar" className="flex items-center p-3 rounded-xl hover:bg-purple-50 transition-all duration-300 group">
                      <Moon className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-purple-700">Ramadan Calendar</div>
                        <p className="text-xs text-gray-600">Track your Ramadan journey</p>
                      </div>
                    </Link>
                    <Link to="/adhan-community" className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
                      <Mic className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-blue-700">Adhan Community</div>
                        <p className="text-xs text-gray-600">Share beautiful Adhan recordings</p>
                      </div>
                    </Link>
                    <Link to="/live-tv" className="flex items-center p-3 rounded-xl hover:bg-red-50 transition-all duration-300 group">
                      <Tv className="h-5 w-5 text-red-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-red-700">Live TV</div>
                        <p className="text-xs text-gray-600">Islamic channels & content</p>
                      </div>
                    </Link>
                    <Link to="/dhikr-community" className="flex items-center p-3 rounded-xl hover:bg-pink-50 transition-all duration-300 group">
                      <Sparkles className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-pink-700">Dhikr Community</div>
                        <p className="text-xs text-gray-600">Spiritual remembrance together</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
                className="flex items-center space-x-1 text-white hover:text-cyan-300 transition-all duration-300"
              >
                <span>Tools</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {toolsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 z-50"
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/namaz-times" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 group">
                      <Clock className="h-5 w-5 text-indigo-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-indigo-700">Prayer Times</div>
                        <p className="text-xs text-gray-600">Accurate prayer times worldwide</p>
                      </div>
                    </Link>
                    <Link to="/quran-reader" className="flex items-center p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 group">
                      <BookOpen className="h-5 w-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-emerald-700">Quran Reader</div>
                        <p className="text-xs text-gray-600">Read & track progress</p>
                      </div>
                    </Link>
                    <Link to="/zakat-calculator" className="flex items-center p-3 rounded-xl hover:bg-yellow-50 transition-all duration-300 group">
                      <Coins className="h-5 w-5 text-yellow-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-yellow-700">Zakat Calculator</div>
                        <p className="text-xs text-gray-600">Calculate your Zakat</p>
                      </div>
                    </Link>
                    <Link to="/dua-wall" className="flex items-center p-3 rounded-xl hover:bg-pink-50 transition-all duration-300 group">
                      <Heart className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-pink-700">Dua Wall</div>
                        <p className="text-xs text-gray-600">Share & support prayers</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Donate Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setDonateOpen(true)}
                onMouseLeave={() => setDonateOpen(false)}
                className="flex items-center space-x-1 text-white hover:text-cyan-300 transition-all duration-300"
              >
                <span>Donate</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {donateOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 z-50"
                  onMouseEnter={() => setDonateOpen(true)}
                  onMouseLeave={() => setDonateOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/campaigns" className="flex items-center p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 group">
                      <Heart className="h-5 w-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-emerald-700">Active Campaigns</div>
                        <p className="text-xs text-gray-600">Support urgent causes worldwide</p>
                      </div>
                    </Link>
                    <Link to="/build-mosque" className="flex items-center p-3 rounded-xl hover:bg-blue-50 transition-all duration-300 group">
                      <Building className="h-5 w-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-blue-700">Build a Mosque</div>
                        <p className="text-xs text-gray-600">Fund mosque construction</p>
                      </div>
                    </Link>
                    <Link to="/water-wells" className="flex items-center p-3 rounded-xl hover:bg-cyan-50 transition-all duration-300 group">
                      <span className="text-lg mr-3">💧</span>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-cyan-700">Water Wells</div>
                        <p className="text-xs text-gray-600">Provide clean water access</p>
                      </div>
                    </Link>
                    <Link to="/orphanages" className="flex items-center p-3 rounded-xl hover:bg-pink-50 transition-all duration-300 group">
                      <span className="text-lg mr-3">👶</span>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-pink-700">Orphanages</div>
                        <p className="text-xs text-gray-600">Support orphan care & education</p>
                      </div>
                    </Link>
                    <Link to="/qurbani" className="flex items-center p-3 rounded-xl hover:bg-orange-50 transition-all duration-300 group">
                      <span className="text-lg mr-3">🐄</span>
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-orange-700">Qurbani</div>
                        <p className="text-xs text-gray-600">Sacrifice & share blessings</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Community Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
                className="flex items-center space-x-1 text-white hover:text-cyan-300 transition-all duration-300"
              >
                <span>Community</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {communityOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 z-50"
                  onMouseEnter={() => setCommunityOpen(true)}
                  onMouseLeave={() => setCommunityOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/masjid-community" className="flex items-center p-3 rounded-xl hover:bg-indigo-50 transition-all duration-300 group">
                      <Building className="h-5 w-5 text-indigo-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-indigo-700">Masjid Community</div>
                        <p className="text-xs text-gray-600">Represent your local mosque</p>
                      </div>
                    </Link>
                    <Link to="/my-ummah" className="flex items-center p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 group">
                      <Users className="h-5 w-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-emerald-700">My Ummah</div>
                        <p className="text-xs text-gray-600">Global Muslim community</p>
                      </div>
                    </Link>
                    <Link to="/leaderboards" className="flex items-center p-3 rounded-xl hover:bg-amber-50 transition-all duration-300 group">
                      <Trophy className="h-5 w-5 text-amber-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-amber-700">Leaderboards</div>
                        <p className="text-xs text-gray-600">Top donors & recognition</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Rewards Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setRewardsOpen(true)}
                onMouseLeave={() => setRewardsOpen(false)}
                className="flex items-center space-x-1 text-white hover:text-cyan-300 transition-all duration-300"
              >
                <span>Rewards</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {rewardsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-80 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 z-50"
                  onMouseEnter={() => setRewardsOpen(true)}
                  onMouseLeave={() => setRewardsOpen(false)}
                >
                  <div className="grid grid-cols-1 gap-3">
                    <Link to="/sadaqah-coins" className="flex items-center p-3 rounded-xl hover:bg-yellow-50 transition-all duration-300 group">
                      <Coins className="h-5 w-5 text-yellow-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-yellow-700">Sadaqah Coins</div>
                        <p className="text-xs text-gray-600">Purchase coins & unlock rewards</p>
                      </div>
                    </Link>
                    <Link to="/my-jannah" className="flex items-center p-3 rounded-xl hover:bg-emerald-50 transition-all duration-300 group">
                      <Building className="h-5 w-5 text-emerald-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-emerald-700">My Jannah</div>
                        <p className="text-xs text-gray-600">Build your paradise</p>
                      </div>
                    </Link>
                    <Link to="/membership" className="flex items-center p-3 rounded-xl hover:bg-purple-50 transition-all duration-300 group">
                      <Shield className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-purple-700">Membership Tiers</div>
                        <p className="text-xs text-gray-600">Upgrade for multiplied points</p>
                      </div>
                    </Link>
                    <Link to="/gift-cards" className="flex items-center p-3 rounded-xl hover:bg-pink-50 transition-all duration-300 group">
                      <Gift className="h-5 w-5 text-pink-600 mr-3" />
                      <div>
                        <div className="font-semibold text-gray-800 group-hover:text-pink-700">Gift Cards</div>
                        <p className="text-xs text-gray-600">Give the gift of giving</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
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

            {/* User Login Dropdown - Desktop Only */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                    <User className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white/95 backdrop-blur-lg">
                  {user ? (
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                      Sign Out
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem onClick={fakeUserLogin} className="cursor-pointer">
                        Test User Login
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={fakeAdminLogin} className="cursor-pointer">
                        Test Admin Login
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/auth" className="cursor-pointer">Real Login</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu - Only visible on mobile and tablet screens */}
            <div className="lg:hidden relative z-30">
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

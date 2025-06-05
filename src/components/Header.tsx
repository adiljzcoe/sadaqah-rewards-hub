import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, ArrowUp, ChevronDown, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, ShoppingCart, Crown, Code, UserCog, LogIn, LogOut } from 'lucide-react';
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
  const [userLoginOpen, setUserLoginOpen] = useState(false);
  const [developerOpen, setDeveloperOpen] = useState(false);

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

  const handleFakeLogin = (type: 'admin' | 'user') => {
    if (type === 'admin') {
      fakeAdminLogin();
    } else {
      fakeUserLogin();
    }
  };

  const handleSignOut = () => {
    signOut();
  };

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
              // Logged in user plaque with responsive sizing and rounded corners - now clickable
              <Link to="/profile" className="transition-all duration-300 hover:scale-[1.02]">
                <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl md:rounded-3xl px-2 py-1 md:px-3 md:py-2 shadow-xl md:shadow-2xl border border-yellow-300/50 md:border-2 hover:shadow-2xl md:hover:shadow-3xl transition-all duration-300 overflow-hidden cursor-pointer">
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
              </Link>
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

          {/* Enhanced Navigation with All Pages */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center relative z-40">
            <Link 
              to="/" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group drop-shadow-sm ${
                isActive('/') ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 shadow-sm shadow-cyan-400/50 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>

            {/* Islamic Life Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={islamicOpen} onOpenChange={setIslamicOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setIslamicOpen(true)}
                onMouseLeave={() => setIslamicOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <span>Islamic Life</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[480px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setIslamicOpen(true)}
                onMouseLeave={() => setIslamicOpen(false)}
              >
                {/* Crystalline mega menu background with FF style */}
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  {/* Background crystal effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-10 w-16 h-6 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute top-4 right-8 w-12 h-4 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                    <div className="absolute bottom-3 left-1/3 w-20 h-8 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
                    <div className="absolute top-6 right-1/4 w-14 h-5 bg-cyan-400/25 rounded-full blur-sm animate-pulse delay-700 shadow-cyan-300/60"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Islamic Calendar & Worship</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DropdownMenuItem asChild>
                        <Link to="/islamic-calendar" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500 hover:to-green-500 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-400/20 transition-all duration-300 hover:scale-105">
                          <Calendar className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Islamic Calendar</div>
                            <p className="text-sm text-emerald-200">Sacred days & celebrations</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/ramadan-calendar" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-indigo-600/80 hover:from-purple-500 hover:to-indigo-500 text-white backdrop-blur-sm border border-purple-400/30 shadow-lg shadow-purple-400/20 transition-all duration-300 hover:scale-105">
                          <Moon className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Ramadan Calendar</div>
                            <p className="text-sm text-purple-200">Track your journey</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/adhan-community" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 text-white backdrop-blur-sm border border-blue-400/30 shadow-lg shadow-blue-400/20 transition-all duration-300 hover:scale-105">
                          <Mic className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Adhan Community</div>
                            <p className="text-sm text-blue-200">Beautiful recordings</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/live-tv" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-red-600/80 to-pink-600/80 hover:from-red-500 hover:to-pink-500 text-white backdrop-blur-sm border border-red-400/30 shadow-lg shadow-red-400/20 transition-all duration-300 hover:scale-105">
                          <Tv className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Live TV</div>
                            <p className="text-sm text-red-200">Islamic channels</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/dhikr-community" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-500 hover:to-pink-500 text-white backdrop-blur-sm border border-purple-400/30 shadow-lg shadow-purple-400/20 transition-all duration-300 hover:scale-105 w-full">
                        <Sparkles className="h-6 w-6 mr-3 drop-shadow-lg" />
                        <div>
                          <div className="font-semibold drop-shadow-md">Dhikr Community</div>
                          <p className="text-sm text-purple-200">Spiritual remembrance together</p>
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools & Services Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={toolsOpen} onOpenChange={setToolsOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <span>Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[400px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-8 w-14 h-5 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-4 right-6 w-12 h-4 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                    <div className="absolute top-1/2 left-1/3 w-16 h-6 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Islamic Tools</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DropdownMenuItem asChild>
                        <Link to="/namaz-times" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-600/80 to-blue-600/80 hover:from-indigo-500 hover:to-blue-500 text-white backdrop-blur-sm border border-indigo-400/30 shadow-lg shadow-indigo-400/20 transition-all duration-300 hover:scale-105">
                          <Clock className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Prayer Times</div>
                            <p className="text-sm text-indigo-200">Accurate worldwide</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/quran-reader" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500 hover:to-green-500 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-400/20 transition-all duration-300 hover:scale-105">
                          <BookOpen className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Quran Reader</div>
                            <p className="text-sm text-emerald-200">Read & track</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/zakat-calculator" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-yellow-600/80 to-orange-600/80 hover:from-yellow-500 hover:to-orange-500 text-white backdrop-blur-sm border border-yellow-400/30 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:scale-105">
                          <Coins className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Zakat Calculator</div>
                            <p className="text-sm text-yellow-200">Calculate Zakat</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/dua-wall" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-pink-600/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-500 text-white backdrop-blur-sm border border-pink-400/30 shadow-lg shadow-pink-400/20 transition-all duration-300 hover:scale-105">
                          <Heart className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Dua Wall</div>
                            <p className="text-sm text-pink-200">Share prayers</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Donate Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={donateOpen} onOpenChange={setDonateOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setDonateOpen(true)}
                onMouseLeave={() => setDonateOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <span>Donate</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[450px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setDonateOpen(true)}
                onMouseLeave={() => setDonateOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-3 left-12 w-18 h-7 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-2 right-10 w-14 h-5 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                    <div className="absolute top-1/3 left-1/3 w-16 h-6 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Make an Impact</h3>
                    <div className="space-y-3">
                      <DropdownMenuItem asChild>
                        <Link to="/campaigns" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500 hover:to-green-500 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-400/20 transition-all duration-300 hover:scale-105 w-full">
                          <Heart className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Active Campaigns</div>
                            <p className="text-sm text-emerald-200">Support urgent causes worldwide</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <div className="grid grid-cols-2 gap-3">
                        <DropdownMenuItem asChild>
                          <Link to="/build-mosque" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500 hover:to-indigo-500 text-white backdrop-blur-sm border border-blue-400/30 shadow-lg shadow-blue-400/20 transition-all duration-300 hover:scale-105">
                            <Building className="h-6 w-6 mr-3 drop-shadow-lg" />
                            <div>
                              <div className="font-semibold drop-shadow-md">Build Mosque</div>
                              <p className="text-sm text-blue-200">Fund construction</p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/water-wells" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-cyan-600/80 to-blue-600/80 hover:from-cyan-500 hover:to-blue-500 text-white backdrop-blur-sm border border-cyan-400/30 shadow-lg shadow-cyan-400/20 transition-all duration-300 hover:scale-105">
                            <span className="text-xl mr-3 drop-shadow-lg">💧</span>
                            <div>
                              <div className="font-semibold drop-shadow-md">Water Wells</div>
                              <p className="text-sm text-cyan-200">Clean water</p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/orphanages" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-pink-600/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-500 text-white backdrop-blur-sm border border-pink-400/30 shadow-lg shadow-pink-400/20 transition-all duration-300 hover:scale-105">
                            <span className="text-xl mr-3 drop-shadow-lg">👶</span>
                            <div>
                              <div className="font-semibold drop-shadow-md">Orphanages</div>
                              <p className="text-sm text-pink-200">Support care</p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/qurbani" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-orange-600/80 to-red-600/80 hover:from-orange-500 hover:to-red-500 text-white backdrop-blur-sm border border-orange-400/30 shadow-lg shadow-orange-400/20 transition-all duration-300 hover:scale-105">
                            <span className="text-xl mr-3 drop-shadow-lg">🐄</span>
                            <div>
                              <div className="font-semibold drop-shadow-md">Qurbani</div>
                              <p className="text-sm text-orange-200">Share blessings</p>
                            </div>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={communityOpen} onOpenChange={setCommunityOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <span>Community</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[400px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-6 w-16 h-6 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-3 right-8 w-12 h-4 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                    <div className="absolute top-1/2 right-1/4 w-14 h-5 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Connect & Compete</h3>
                    <div className="space-y-3">
                      <DropdownMenuItem asChild>
                        <Link to="/masjid-community" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white backdrop-blur-sm border border-indigo-400/30 shadow-lg shadow-indigo-400/20 transition-all duration-300 hover:scale-105 w-full">
                          <Building className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Masjid Community</div>
                            <p className="text-sm text-indigo-200">Represent your local mosque</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-ummah" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500 hover:to-green-500 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-400/20 transition-all duration-300 hover:scale-105 w-full">
                          <Users className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">My Ummah</div>
                            <p className="text-sm text-emerald-200">Global Muslim community</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/leaderboards" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-600/80 to-yellow-600/80 hover:from-amber-500 hover:to-yellow-500 text-white backdrop-blur-sm border border-amber-400/30 shadow-lg shadow-amber-400/20 transition-all duration-300 hover:scale-105 w-full">
                          <Trophy className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Leaderboards</div>
                            <p className="text-sm text-amber-200">Top donors & recognition</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rewards Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={rewardsOpen} onOpenChange={setRewardsOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setRewardsOpen(true)}
                onMouseLeave={() => setRewardsOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <span>Rewards</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[420px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setRewardsOpen(true)}
                onMouseLeave={() => setRewardsOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-3 left-10 w-18 h-7 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-2 right-12 w-16 h-6 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                    <div className="absolute top-1/3 left-1/4 w-14 h-5 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Rewards & Benefits</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DropdownMenuItem asChild>
                        <Link to="/sadaqah-coins" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-yellow-600/80 to-amber-600/80 hover:from-yellow-500 hover:to-amber-500 text-white backdrop-blur-sm border border-yellow-400/30 shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:scale-105">
                          <Coins className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Sadaqah Coins</div>
                            <p className="text-sm text-yellow-200">Purchase & unlock</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/my-jannah" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600/80 to-green-600/80 hover:from-emerald-500 hover:to-green-500 text-white backdrop-blur-sm border border-emerald-400/30 shadow-lg shadow-emerald-400/20 transition-all duration-300 hover:scale-105">
                          <Building className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">My Jannah</div>
                            <p className="text-sm text-emerald-200">Build paradise</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/membership" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-indigo-600/80 hover:from-purple-500 hover:to-indigo-500 text-white backdrop-blur-sm border border-purple-400/30 shadow-lg shadow-purple-400/20 transition-all duration-300 hover:scale-105">
                          <Shield className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Membership</div>
                            <p className="text-sm text-purple-200">Upgrade tiers</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/gift-cards" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-pink-600/80 to-rose-600/80 hover:from-pink-500 hover:to-rose-500 text-white backdrop-blur-sm border border-pink-400/30 shadow-lg shadow-pink-400/20 transition-all duration-300 hover:scale-105">
                          <Gift className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Gift Cards</div>
                            <p className="text-sm text-pink-200">Gift giving</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Login Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={userLoginOpen} onOpenChange={setUserLoginOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setUserLoginOpen(true)}
                onMouseLeave={() => setUserLoginOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span>Account</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[380px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setUserLoginOpen(true)}
                onMouseLeave={() => setUserLoginOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-8 w-14 h-5 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-4 right-6 w-12 h-4 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">User Account</h3>
                    <div className="space-y-3">
                      {user ? (
                        <DropdownMenuItem asChild>
                          <button
                            onClick={handleSignOut}
                            className="flex items-center p-4 rounded-xl bg-gradient-to-r from-red-600/80 to-rose-600/80 hover:from-red-500 hover:to-rose-500 text-white backdrop-blur-sm border border-red-400/30 shadow-lg shadow-red-400/20 transition-all duration-300 hover:scale-105 w-full"
                          >
                            <LogOut className="h-6 w-6 mr-3 drop-shadow-lg" />
                            <div>
                              <div className="font-semibold drop-shadow-md">Sign Out</div>
                              <p className="text-sm text-red-200">Log out current user</p>
                            </div>
                          </button>
                        </DropdownMenuItem>
                      ) : (
                        <>
                          <DropdownMenuItem asChild>
                            <button
                              onClick={() => handleFakeLogin('user')}
                              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-cyan-600/80 hover:from-blue-500 hover:to-cyan-500 text-white backdrop-blur-sm border border-blue-400/30 shadow-lg shadow-blue-400/20 transition-all duration-300 hover:scale-105 w-full"
                            >
                              <User className="h-6 w-6 mr-3 drop-shadow-lg" />
                              <div>
                                <div className="font-semibold drop-shadow-md">Test User Login</div>
                                <p className="text-sm text-blue-200">Login as a test user</p>
                              </div>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <button
                              onClick={() => handleFakeLogin('admin')}
                              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-orange-600/80 to-red-600/80 hover:from-orange-500 hover:to-red-500 text-white backdrop-blur-sm border border-orange-400/30 shadow-lg shadow-orange-400/20 transition-all duration-300 hover:scale-105 w-full"
                            >
                              <Shield className="h-6 w-6 mr-3 drop-shadow-lg" />
                              <div>
                                <div className="font-semibold drop-shadow-md">Test Admin Login</div>
                                <p className="text-sm text-orange-200">Login as a test admin</p>
                              </div>
                            </button>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              to="/auth"
                              className="flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600/80 to-indigo-600/80 hover:from-purple-500 hover:to-indigo-500 text-white backdrop-blur-sm border border-purple-400/30 shadow-lg shadow-purple-400/20 transition-all duration-300 hover:scale-105"
                            >
                              <LogIn className="h-6 w-6 mr-3 drop-shadow-lg" />
                              <div>
                                <div className="font-semibold drop-shadow-md">Real Login</div>
                                <p className="text-sm text-purple-200">Go to authentication page</p>
                              </div>
                            </Link>
                          </DropdownMenuItem>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Developer Dropdown - Enhanced Mega Menu */}
            <DropdownMenu open={developerOpen} onOpenChange={setDeveloperOpen}>
              <DropdownMenuTrigger 
                asChild
                onMouseEnter={() => setDeveloperOpen(true)}
                onMouseLeave={() => setDeveloperOpen(false)}
              >
                <button className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 flex items-center space-x-1 cursor-pointer">
                  <Code className="h-4 w-4" />
                  <span>Dev</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className="w-[400px] border-0 shadow-2xl rounded-2xl z-[9999] p-0 overflow-hidden"
                onMouseEnter={() => setDeveloperOpen(true)}
                onMouseLeave={() => setDeveloperOpen(false)}
              >
                <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
                  <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-2 left-6 w-16 h-6 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
                    <div className="absolute bottom-3 right-8 w-12 h-4 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
                  </div>
                  
                  <div className="relative z-10 p-6 space-y-4">
                    <h3 className="text-xl font-bold text-cyan-300 mb-4 drop-shadow-lg">Developer Tools</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <DropdownMenuItem asChild>
                        <Link to="/admin-dashboard" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-red-600/80 to-orange-600/80 hover:from-red-500 hover:to-orange-500 text-white backdrop-blur-sm border border-red-400/30 shadow-lg shadow-red-400/20 transition-all duration-300 hover:scale-105">
                          <UserCog className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Admin Dashboard</div>
                            <p className="text-sm text-red-200">Control panel</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500 hover:to-indigo-500 text-white backdrop-blur-sm border border-blue-400/30 shadow-lg shadow-blue-400/20 transition-all duration-300 hover:scale-105">
                          <User className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Profile Settings</div>
                            <p className="text-sm text-blue-200">User management</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/checkout" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500 hover:to-emerald-500 text-white backdrop-blur-sm border border-green-400/30 shadow-lg shadow-green-400/20 transition-all duration-300 hover:scale-105">
                          <span className="text-xl mr-3 drop-shadow-lg">💳</span>
                          <div>
                            <div className="font-semibold drop-shadow-md">Checkout</div>
                            <p className="text-sm text-green-200">Payment processing</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/charity-partners" className="flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-600/80 to-purple-600/80 hover:from-indigo-500 hover:to-purple-500 text-white backdrop-blur-sm border border-indigo-400/30 shadow-lg shadow-indigo-400/20 transition-all duration-300 hover:scale-105">
                          <Building className="h-6 w-6 mr-3 drop-shadow-lg" />
                          <div>
                            <div className="font-semibold drop-shadow-md">Charity Partners</div>
                            <p className="text-sm text-indigo-200">Partner orgs</p>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Become a Member - FF style */}
            {!isMember && (
              <Button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl ring-2 ring-cyan-400/30 hover:ring-cyan-300/50">
                <span className="text-lg mr-2">🛡️</span>
                Become a Member
              </Button>
            )}
          </nav>

          {/* Right Section - Desktop Checkout and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Checkout Button */}
            <Link to="/checkout" className="hidden lg:block">
              <Button className="relative bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl ring-2 ring-pink-400/30 hover:ring-pink-300/50 backdrop-blur-sm">
                <ShoppingCart className="h-4 w-4 mr-2 drop-shadow-md" />
                <span className="drop-shadow-md">Checkout</span>
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full animate-bounce shadow-lg border border-yellow-300/50">
                    {totalItems}
                  </Badge>
                )}
                {totalAmount > 0 && (
                  <span className="ml-2 text-xs bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm">
                    £{totalAmount.toFixed(0)}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Desktop Menu - Hidden on mobile, visible on desktop */}
            <div className="hidden md:block lg:hidden relative z-30">
              <MobileSidebar 
                userLevel={userLevel}
                currentPoints={currentPoints}
                nextLevelPoints={nextLevelPoints}
                isMember={isMember}
              />
            </div>

            {/* Mobile Menu - Only visible on mobile */}
            <div className="md:hidden relative z-30">
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

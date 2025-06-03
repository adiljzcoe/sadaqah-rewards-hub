
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
          {/* Left Section - Logo and User with FIXED z-index */}
          <div className="flex items-center space-x-6 relative z-50">
            <Link to="/" className="transition-all duration-300 hover:scale-105 flex-shrink-0 w-[100px] relative z-30">
              <img 
                src="/lovable-uploads/b5e73df9-e9d0-49e2-ac33-283b16c6dafb.png" 
                alt="Your Jannah Logo" 
                className="w-full h-auto object-contain max-w-[100px]"
              />
            </Link>

            {/* Golden User Plaque - Horizontal Pills Like Reference Image */}
            {user && (
              <div className="flex items-center space-x-2 relative z-50">
                {/* Jannah Points Pill */}
                <Link to="/profile" className="block">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Star className="h-4 w-4 text-white" />
                    <span className="text-white font-bold text-sm">{currentPoints.toLocaleString()}</span>
                  </div>
                </Link>

                {/* Sadaqah Coins Pill */}
                <Link to="/sadaqah-coins" className="block">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Coins className="h-4 w-4 text-white" />
                    <span className="text-white font-bold text-sm">1,250</span>
                  </div>
                </Link>

                {/* Level Pill */}
                <Link to="/profile" className="block">
                  <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Crown className="h-4 w-4 text-white" />
                    <span className="text-white font-bold text-sm">Lv.{userLevel}</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Enhanced Navigation with All Pages */}
          <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center relative z-40">
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

            {/* Islamic Life Dropdown */}
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
                className="w-96 bg-white border border-gray-200 shadow-2xl rounded-xl z-[9999]"
                onMouseEnter={() => setIslamicOpen(true)}
                onMouseLeave={() => setIslamicOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Islamic Calendar & Worship</h3>
                  <DropdownMenuItem asChild>
                    <Link to="/islamic-calendar" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                      <Calendar className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Islamic Calendar</div>
                        <p className="text-sm text-emerald-200">Sacred days & celebrations</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/ramadan-calendar" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                      <Moon className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Ramadan Calendar</div>
                        <p className="text-sm text-purple-200">Track your Ramadan journey</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/adhan-community" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white">
                      <Mic className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Adhan Community</div>
                        <p className="text-sm text-blue-200">Share beautiful Adhan recordings</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/live-tv" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white">
                      <Tv className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Live TV</div>
                        <p className="text-sm text-red-200">Islamic channels & content</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dhikr-community" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white">
                      <Sparkles className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Dhikr Community</div>
                        <p className="text-sm text-purple-200">Spiritual remembrance together</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Tools & Services Dropdown */}
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
                className="w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-[9999]"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Islamic Tools</h3>
                  <DropdownMenuItem asChild>
                    <Link to="/namaz-times" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white">
                      <Clock className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Prayer Times</div>
                        <p className="text-sm text-indigo-200">Accurate prayer times worldwide</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/quran-reader" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                      <BookOpen className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Quran Reader</div>
                        <p className="text-sm text-emerald-200">Read & track progress</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/zakat-calculator" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white">
                      <Coins className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Zakat Calculator</div>
                        <p className="text-sm text-yellow-200">Calculate your Zakat</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dua-wall" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white">
                      <Heart className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Dua Wall</div>
                        <p className="text-sm text-pink-200">Share & support prayers</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Donate Dropdown with Enhanced Options */}
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
                className="w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-[9999]"
                onMouseEnter={() => setDonateOpen(true)}
                onMouseLeave={() => setDonateOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Make an Impact</h3>
                  <DropdownMenuItem asChild>
                    <Link to="/campaigns" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                      <Heart className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Active Campaigns</div>
                        <p className="text-sm text-emerald-200">Support urgent causes worldwide</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/build-mosque" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white">
                      <Building className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Build a Mosque</div>
                        <p className="text-sm text-blue-200">Fund mosque construction</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/water-wells" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
                      <span className="text-lg mr-3">💧</span>
                      <div>
                        <div className="font-semibold">Water Wells</div>
                        <p className="text-sm text-cyan-200">Provide clean water access</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orphanages" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white">
                      <span className="text-lg mr-3">👶</span>
                      <div>
                        <div className="font-semibold">Orphanages</div>
                        <p className="text-sm text-pink-200">Support orphan care & education</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/qurbani" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white">
                      <span className="text-lg mr-3">🐄</span>
                      <div>
                        <div className="font-semibold">Qurbani</div>
                        <p className="text-sm text-orange-200">Sacrifice & share blessings</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community Dropdown */}
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
                className="w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-[9999]"
                onMouseEnter={() => setCommunityOpen(true)}
                onMouseLeave={() => setCommunityOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Connect & Compete</h3>
                  <DropdownMenuItem asChild>
                    <Link to="/masjid-community" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white">
                      <Building className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Masjid Community</div>
                        <p className="text-sm text-indigo-200">Represent your local mosque</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-ummah" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                      <Users className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">My Ummah</div>
                        <p className="text-sm text-emerald-200">Global Muslim community</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/leaderboards" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white">
                      <Trophy className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Leaderboards</div>
                        <p className="text-sm text-amber-200">Top donors & recognition</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rewards Dropdown */}
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
                className="w-80 bg-white border border-gray-200 shadow-2xl rounded-xl z-[9999]"
                onMouseEnter={() => setRewardsOpen(true)}
                onMouseLeave={() => setRewardsOpen(false)}
              >
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Rewards & Benefits</h3>
                  <DropdownMenuItem asChild>
                    <Link to="/sadaqah-coins" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white">
                      <Coins className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Sadaqah Coins</div>
                        <p className="text-sm text-yellow-200">Purchase coins & unlock rewards</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/my-jannah" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white">
                      <Building className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">My Jannah</div>
                        <p className="text-sm text-emerald-200">Build your paradise</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/membership" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white">
                      <Shield className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Membership Tiers</div>
                        <p className="text-sm text-purple-200">Upgrade for multiplied points</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/gift-cards" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white">
                      <Gift className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Gift Cards</div>
                        <p className="text-sm text-pink-200">Give the gift of giving</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
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

          {/* Right Section - Cart and Mobile Menu */}
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

            {/* Mobile Menu */}
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

      {/* User Level Plaque - Desktop Bottom Bar - Progress Bar Like Reference */}
      {user && (
        <div className="hidden md:block absolute bottom-0 left-0 right-0 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-indigo-900/90 backdrop-blur-sm border-t border-cyan-400/30 z-40">
          <div className="container mx-auto px-6 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white text-sm">
                <span className="font-medium">Level {userLevel}</span>
              </div>
              
              <div className="flex-1 mx-8">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-white text-sm">
                  <span className="font-medium text-cyan-300">{currentPoints}/{nextLevelPoints} XP</span>
                </div>
                
                {/* Top Up Button */}
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold text-xs px-4 py-1 rounded-full">
                  <Gift className="h-3 w-3 mr-1" />
                  Top Up
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
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

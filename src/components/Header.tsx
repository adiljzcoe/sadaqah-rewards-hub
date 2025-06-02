
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, ArrowUp, ChevronDown, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield } from 'lucide-react';
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

const Header = () => {
  const location = useLocation();
  const { user, fakeAdminLogin, fakeUserLogin, signOut } = useAuth();
  const isMember = true; // VIP status
  
  // State for controlling dropdown visibility
  const [donateOpen, setDonateOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);

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
  }, []);

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
      
      <div className="relative z-10 container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and User with proper z-index layering */}
          <div className="flex items-center space-x-3 relative">
            <Link to="/" className="transition-all duration-300 hover:scale-105 flex-shrink-0 w-[100px] relative z-20">
              <img 
                src="/lovable-uploads/b5e73df9-e9d0-49e2-ac33-283b16c6dafb.png" 
                alt="Your Jannah Logo" 
                className="w-full h-auto object-contain max-w-[100px]"
              />
            </Link>

            <div className="flex items-center flex-shrink-0 relative z-10">
              <div className="flex items-center">
                {user ? (
                  <Link to="/profile">
                    {isMember ? (
                      <Button className="relative overflow-hidden rounded-xl px-2 py-1.5 font-bold text-amber-100 border-0 shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 border-2 border-yellow-300/60 hover:shadow-2xl hover:scale-105 ring-2 ring-amber-400/30 hover:ring-amber-300/50">
                        <div className="flex items-center space-x-1.5">
                          <div className="flex items-center">
                            <span className="text-xs mr-1 drop-shadow-sm">🛡️</span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-amber-100 drop-shadow-sm leading-tight">Ahmad M.</span>
                              <span className="text-xs text-amber-200/90 drop-shadow-sm leading-tight">Guardian</span>
                            </div>
                          </div>
                          
                          <div className="w-px h-5 bg-amber-300/40"></div>
                          
                          <div className="flex flex-col space-y-0.5">
                            <div className="flex items-center space-x-1">
                              <span className="text-xs font-bold text-amber-100 drop-shadow-sm">LV {userLevel}</span>
                              <div className="relative w-8 h-1 bg-amber-800/60 rounded-full overflow-hidden border border-amber-400/30">
                                <div 
                                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-300 to-amber-200 rounded-full transition-all duration-300 shadow-sm shadow-yellow-300/50"
                                  style={{ width: `${progress}%` }}
                                ></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full"></div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Star className="h-2 w-2 text-yellow-200 mr-0.5 drop-shadow-sm" />
                              <span className="text-xs font-medium text-amber-100 drop-shadow-sm">5,632 pts</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="absolute top-1 left-2 w-8 h-3 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-shimmer"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-xl"></div>
                      </Button>
                    ) : (
                      <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white border-0 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-2xl ring-2 ring-cyan-400/30">
                        <User className="h-5 w-5 mr-2" />
                        <span className="hidden sm:inline">Ahmad M.</span>
                      </Button>
                    )}
                  </Link>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={fakeUserLogin}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                    >
                      Fake User Login
                    </Button>
                    <Button 
                      onClick={fakeAdminLogin}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1"
                    >
                      Fake Admin Login
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Sign Out Button for logged in users */}
            {user && (
              <Button 
                onClick={signOut}
                variant="outline"
                className="text-white border-white/30 hover:bg-white/10 text-xs px-3 py-1"
              >
                Sign Out
              </Button>
            )}
          </div>

          {/* Navigation with Hover Dropdown Menus */}
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

            {/* Donate Dropdown with Hover */}
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
                  <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Actions</h3>
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
                        <p className="text-sm text-blue-200">Fund mosque construction projects</p>
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
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community Dropdown with Hover - Updated to include Masjid */}
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
                    <Link to="/leaderboards" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white">
                      <Trophy className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Leaderboards</div>
                        <p className="text-sm text-amber-200">Top donors & recognition</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/live" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white">
                      <span className="text-lg mr-3">🔴</span>
                      <div>
                        <div className="font-semibold">Live Feed</div>
                        <p className="text-sm text-red-200">Real-time updates & stories</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blog" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white">
                      <BookOpen className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Blog & Stories</div>
                        <p className="text-sm text-indigo-200">Impact stories & insights</p>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Rewards Dropdown with Hover */}
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
                    <Link to="/coins" className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white">
                      <Coins className="h-5 w-5 mr-3" />
                      <div>
                        <div className="font-semibold">Sadaqah Coins</div>
                        <p className="text-sm text-yellow-200">Purchase coins & unlock rewards</p>
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
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link 
              to="/about" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group drop-shadow-sm ${
                isActive('/about') ? 'text-cyan-300' : 'text-slate-300 hover:text-cyan-400'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 shadow-sm shadow-cyan-400/50 ${
                isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Become a Member - FF style */}
            {!isMember && (
              <Button className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl ring-2 ring-cyan-400/30 hover:ring-cyan-300/50">
                <span className="text-lg mr-2">🛡️</span>
                Become a Member
              </Button>
            )}
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden relative z-20">
            <MobileSidebar 
              userLevel={userLevel}
              currentPoints={currentPoints}
              nextLevelPoints={nextLevelPoints}
              isMember={isMember}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

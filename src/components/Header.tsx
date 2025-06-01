import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, ArrowUp, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { getUserRank, getNextRank } from '@/utils/rankSystem';

const Header = () => {
  const location = useLocation();
  const isMember = true; // VIP status

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

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-visible border-b-2 border-cyan-400/30 z-[100]">
      {/* Final Fantasy inspired crystalline background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Crystal-like light effects */}
        <div className="absolute top-2 left-10 w-20 h-8 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
        <div className="absolute top-4 right-32 w-16 h-6 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
        <div className="absolute top-1 left-1/3 w-24 h-10 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
        <div className="absolute top-3 right-1/4 w-18 h-7 bg-cyan-400/25 rounded-full blur-sm animate-pulse delay-700 shadow-cyan-300/60"></div>
        {/* Additional magical sparkles */}
        <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/80"></div>
        <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000 shadow-md shadow-blue-300/70"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-3 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and User */}
          <div className="flex items-center space-x-3">
            {/* Logo without gloss effect */}
            <Link to="/" className="transition-all duration-300 hover:scale-105 flex-shrink-0 w-[100px]">
              <img 
                src="/lovable-uploads/b5e73df9-e9d0-49e2-ac33-283b16c6dafb.png" 
                alt="Your Jannah Logo" 
                className="w-full h-auto object-contain max-w-[100px]"
              />
            </Link>

            {/* User Section with FF styling */}
            <div className="flex items-center flex-shrink-0">
              {/* Unified Guardian User Button */}
              <div className="flex items-center">
                <Link to="/profile">
                  {isMember ? (
                    <Button className="relative overflow-hidden rounded-xl px-2 py-1.5 font-bold text-amber-100 border-0 shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 border-2 border-yellow-300/60 hover:shadow-2xl hover:scale-105 ring-2 ring-amber-400/30 hover:ring-amber-300/50">
                      <div className="flex items-center space-x-1.5">
                        {/* Left side - Guardian + User */}
                        <div className="flex items-center">
                          <span className="text-xs mr-1 drop-shadow-sm">🛡️</span>
                          <div className="flex flex-col">
                            <span className="text-xs font-bold text-amber-100 drop-shadow-sm leading-tight">Ahmad M.</span>
                            <span className="text-xs text-amber-200/90 drop-shadow-sm leading-tight">Guardian</span>
                          </div>
                        </div>
                        
                        {/* Divider */}
                        <div className="w-px h-5 bg-amber-300/40"></div>
                        
                        {/* Right side - Level + Points */}
                        <div className="flex flex-col space-y-0.5">
                          {/* Level bar */}
                          <div className="flex items-center space-x-1">
                            <span className="text-xs font-bold text-amber-100 drop-shadow-sm">LV {userLevel}</span>
                            <div className="relative w-8 h-1 bg-amber-800/60 rounded-full overflow-hidden border border-amber-400/30">
                              <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-300 to-amber-200 rounded-full transition-all duration-300 shadow-sm shadow-yellow-300/50"
                                style={{ width: `${progress}%` }}
                              ></div>
                              {/* Gold XP bar inner glow */}
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-amber-200/20 rounded-full"></div>
                            </div>
                          </div>
                          {/* Points */}
                          <div className="flex items-center">
                            <Star className="h-2 w-2 text-yellow-200 mr-0.5 drop-shadow-sm" />
                            <span className="text-xs font-medium text-amber-100 drop-shadow-sm">5,632 pts</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced magical shine effect */}
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
              </div>
            </div>
          </div>

          {/* Navigation with FF styling and increased z-index */}
          <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center relative z-[200]">
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

            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent">
                    Donate
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[400]">
                    <div className="grid w-[500px] gap-4 p-6 bg-slate-800/98 backdrop-blur-md border border-cyan-400/40 shadow-2xl rounded-xl ring-1 ring-cyan-300/30 z-[500]">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-cyan-300 mb-3">Donation Options</h3>
                          <div className="space-y-3">
                            <Link to="/campaigns" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Active Campaigns</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Support urgent causes and make a direct impact
                              </p>
                            </Link>
                            <Link to="/build-mosque" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Build a Mosque</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Fund mosque construction projects worldwide
                              </p>
                            </Link>
                            <Link to="/water-wells" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Water Wells</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Provide clean water access to communities in need
                              </p>
                            </Link>
                            <Link to="/orphanages" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Orphanages</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Support orphan care and education programs
                              </p>
                            </Link>
                            <Link to="/charities" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Charity Partners</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Browse our trusted charity partners and their projects
                              </p>
                            </Link>
                            <Link to="/why-donate" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                              <div className="text-sm font-medium leading-none text-white">Why Donate With Us</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                                Learn about our transparent fund distribution
                              </p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[400]">
                    <div className="grid w-[400px] gap-4 p-6 bg-slate-800/98 backdrop-blur-md border border-cyan-400/40 shadow-2xl rounded-xl ring-1 ring-cyan-300/30 z-[500]">
                      <div className="grid grid-cols-1 gap-3">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-2">Community Hub</h3>
                        <Link to="/leaderboards" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                          <div className="text-sm font-medium leading-none text-white">Leaderboards</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                            See top donors and earn recognition for your contributions
                          </p>
                        </Link>
                        <Link to="/live" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                          <div className="text-sm font-medium leading-none text-white">Live Feed</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                            Real-time updates from charity partners and projects
                          </p>
                        </Link>
                        <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                          <div className="text-sm font-medium leading-none text-white">Blog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                            Stories, updates, and insights from our community
                          </p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent">
                    Rewards
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[400]">
                    <div className="grid w-[400px] gap-4 p-6 bg-slate-800/98 backdrop-blur-md border border-cyan-400/40 shadow-2xl rounded-xl ring-1 ring-cyan-300/30 z-[500]">
                      <div className="grid grid-cols-1 gap-3">
                        <h3 className="text-lg font-semibold text-cyan-300 mb-2">Rewards & Benefits</h3>
                        <Link to="/coins" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                          <div className="text-sm font-medium leading-none text-white">Sadaqah Coins</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                            Purchase coins and unlock exclusive rewards
                          </p>
                        </Link>
                        <Link to="/membership" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-700/50 hover:text-cyan-300 focus:bg-slate-700/50 focus:text-cyan-300">
                          <div className="text-sm font-medium leading-none text-white">Membership Tiers</div>
                          <p className="line-clamp-2 text-sm leading-snug text-slate-300">
                            Upgrade for multiplied points and exclusive benefits
                          </p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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

          {/* Mobile Menu - FF crystal style with better spacing */}
          <Button className="md:hidden relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-blue-800/80 to-indigo-800/90 backdrop-blur-sm text-cyan-300 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-2 border-2 border-cyan-400/40 hover:scale-110 hover:border-cyan-300/60 ring-2 ring-cyan-400/20 flex-shrink-0 ml-2">
            <Menu className="h-5 w-5 drop-shadow-sm" />
            {/* Crystal sparkle effects */}
            <div className="absolute top-1 left-1 w-3 h-1.5 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full animate-shimmer"></div>
            <div className="absolute bottom-1 right-1 w-2 h-1 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent rounded-full animate-shimmer delay-500"></div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

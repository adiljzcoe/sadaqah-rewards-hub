
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Cloud, Crown, ArrowUp, ChevronDown } from 'lucide-react';
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
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-hidden border-b-2 border-cyan-400/30">
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
      
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and User */}
          <div className="flex items-center space-x-6">
            {/* Logo with FF crystal aesthetic */}
            <Link to="/" className="relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-blue-800/80 to-indigo-800/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-3 border-2 border-cyan-400/40 hover:scale-110 hover:border-cyan-300/60 cursor-pointer ring-2 ring-cyan-400/20 hover:ring-cyan-300/40">
              <img 
                src="/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png" 
                alt="Your Jannah Logo" 
                className="h-10 w-auto object-contain filter drop-shadow-md relative z-10"
              />
              {/* Crystal shine effects */}
              <div className="absolute top-1 left-2 w-8 h-4 bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent rounded-full animate-shimmer"></div>
              <div className="absolute bottom-1 right-2 w-6 h-3 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent rounded-full animate-shimmer delay-500"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-300/20 rounded-full"></div>
            </Link>

            {/* User Section with FF styling */}
            <div className="flex items-center space-x-4">
              {/* User Menu with VIP Crown + Guardian Rank - FF style */}
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  {isMember ? (
                    <Button className="relative overflow-hidden rounded-2xl px-4 py-2 font-bold text-amber-100 border-0 shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 border-2 border-yellow-300/60 hover:shadow-2xl hover:scale-105 ring-2 ring-amber-400/30 hover:ring-amber-300/50">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          <Crown className="h-4 w-4 mr-2 text-amber-100 drop-shadow-sm" />
                          <span className="hidden sm:inline text-amber-100 drop-shadow-sm mr-3">VIP Ahmad M.</span>
                          <div className="flex items-center bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-sm rounded-lg px-2 py-1 border border-cyan-400/40 shadow-inner">
                            <span className="text-xs drop-shadow-sm mr-1">{currentRank.icon}</span>
                            <span className="text-xs font-bold text-cyan-100 drop-shadow-sm">{currentRank.badge}</span>
                          </div>
                        </div>
                        <div className="flex items-center ml-6 mt-1">
                          <Star className="h-3 w-3 text-yellow-200 mr-1 drop-shadow-sm" />
                          <span className="text-xs font-medium text-amber-100 drop-shadow-sm">5,632 pts</span>
                        </div>
                      </div>
                      {/* Enhanced magical shine effect */}
                      <div className="absolute top-1 left-2 w-8 h-4 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-shimmer"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-2xl"></div>
                    </Button>
                  ) : (
                    <Button className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white border-0 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-2xl ring-2 ring-cyan-400/30">
                      <User className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Ahmad M.</span>
                    </Button>
                  )}
                </Link>
                
                {/* Level Display - FF style XP bar */}
                {isMember && (
                  <div className="bg-gradient-to-r from-slate-700/90 to-slate-800/90 backdrop-blur-sm rounded-xl px-3 py-2 border border-cyan-400/40 shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-cyan-300/30">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-cyan-100 drop-shadow-sm">LV {userLevel}</span>
                      <div className="relative w-12 h-1.5 bg-slate-600/60 rounded-full overflow-hidden border border-cyan-400/30">
                        <div 
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-300 shadow-sm shadow-cyan-400/50"
                          style={{ width: `${progress}%` }}
                        ></div>
                        {/* FF-style XP bar inner glow */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 to-blue-300/20 rounded-full"></div>
                      </div>
                      <span className="text-xs text-cyan-200 font-medium drop-shadow-sm">{pointsToNextLevel}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation with FF styling */}
          <nav className="hidden md:flex items-center space-x-8">
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

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm">
                    Donate
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-slate-800/95 backdrop-blur-md border border-cyan-400/40 shadow-xl rounded-xl ring-1 ring-cyan-300/30">
                      <div className="grid w-[400px] gap-3 p-4">
                        <Link to="/campaigns" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Campaigns</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Support urgent causes and make a direct impact
                          </p>
                        </Link>
                        <Link to="/charities" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Charity Partners</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Browse our trusted charity partners and their projects
                          </p>
                        </Link>
                        <Link to="/why-donate" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Why Donate With Us</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Learn about our transparent fund distribution
                          </p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-slate-800/95 backdrop-blur-md border border-cyan-400/40 shadow-xl rounded-xl ring-1 ring-cyan-300/30">
                      <div className="grid w-[400px] gap-3 p-4">
                        <Link to="/leaderboards" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Leaderboards</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            See top donors and earn recognition for your contributions
                          </p>
                        </Link>
                        <Link to="/live" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Live Feed</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Real-time updates from charity partners and projects
                          </p>
                        </Link>
                        <Link to="/blog" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Blog</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Stories, updates, and insights from our community
                          </p>
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm">
                    Rewards
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-slate-800/95 backdrop-blur-md border border-cyan-400/40 shadow-xl rounded-xl ring-1 ring-cyan-300/30">
                      <div className="grid w-[400px] gap-3 p-4">
                        <Link to="/coins" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Sadaqah Coins</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Purchase coins and unlock exclusive rewards
                          </p>
                        </Link>
                        <Link to="/membership" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Membership Tiers</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
                <Crown className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </nav>

          {/* Mobile Menu - FF crystal style */}
          <Button className="md:hidden relative overflow-hidden bg-gradient-to-br from-slate-800/90 via-blue-800/80 to-indigo-800/90 backdrop-blur-sm text-cyan-300 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-3 border-2 border-cyan-400/40 hover:scale-110 hover:border-cyan-300/60 ring-2 ring-cyan-400/20">
            <Cloud className="h-6 w-6 drop-shadow-sm" />
            {/* Crystal sparkle effects */}
            <div className="absolute top-1 left-2 w-4 h-2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent rounded-full animate-shimmer"></div>
            <div className="absolute bottom-1 right-2 w-3 h-1.5 bg-gradient-to-r from-transparent via-blue-300/40 to-transparent rounded-full animate-shimmer delay-500"></div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

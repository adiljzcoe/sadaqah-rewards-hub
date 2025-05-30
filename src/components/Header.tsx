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
    <header className="relative bg-gradient-to-r from-sky-200 via-blue-100 to-indigo-200 backdrop-blur-md shadow-2xl overflow-hidden">
      {/* Cloud-like background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-sky-100/30 to-blue-200/40"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-20 h-8 bg-white/30 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-4 right-32 w-16 h-6 bg-white/25 rounded-full blur-sm animate-pulse delay-300"></div>
        <div className="absolute top-1 left-1/3 w-24 h-10 bg-white/20 rounded-full blur-sm animate-pulse delay-500"></div>
        <div className="absolute top-3 right-1/4 w-18 h-7 bg-white/35 rounded-full blur-sm animate-pulse delay-700"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and User */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover-scale cursor-pointer drop-shadow-lg">
              <img 
                src="/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png" 
                alt="Your Jannah Logo" 
                className="h-10 w-auto object-contain filter drop-shadow-md"
              />
            </Link>

            {/* User Section */}
            <div className="flex items-center space-x-4">
              {/* User Menu with VIP Crown */}
              <div className="flex items-center space-x-3">
                <Link to="/profile">
                  {isMember ? (
                    <Button className="relative overflow-hidden rounded-2xl px-4 py-2 font-bold text-amber-900 border-0 shadow-xl transition-all duration-300 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 border-2 border-yellow-200/60 hover:shadow-2xl hover:scale-105">
                      <div className="flex flex-col items-start">
                        <div className="flex items-center">
                          <Crown className="h-4 w-4 mr-2 text-amber-800 drop-shadow-sm" />
                          <span className="hidden sm:inline text-amber-900 drop-shadow-sm">VIP Ahmad M.</span>
                        </div>
                        <div className="flex items-center ml-6">
                          <Star className="h-3 w-3 text-yellow-600 mr-1 drop-shadow-sm" />
                          <span className="text-xs font-medium text-amber-800 drop-shadow-sm">5,632 pts</span>
                        </div>
                      </div>
                      {/* Enhanced heavenly shine effect */}
                      <div className="absolute top-1 left-2 w-8 h-4 bg-gradient-to-r from-transparent via-white/70 to-transparent rounded-full animate-shimmer"></div>
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-2xl"></div>
                    </Button>
                  ) : (
                    <Button className="professional-button vibrant-gradient text-white border-0 font-bold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 rounded-2xl">
                      <User className="h-5 w-5 mr-2" />
                      <span className="hidden sm:inline">Ahmad M.</span>
                    </Button>
                  )}
                </Link>
                
                {/* Compact member badges with heavenly styling */}
                {isMember && (
                  <div className="flex items-center space-x-2">
                    {/* Guardian Angel badge */}
                    <div className="bg-gradient-to-r from-indigo-400/80 to-purple-500/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-1">
                        <span className="text-sm drop-shadow-sm">{currentRank.icon}</span>
                        <span className="text-xs font-bold text-white drop-shadow-sm">{currentRank.badge}</span>
                      </div>
                    </div>
                    
                    {/* X2 Points badge */}
                    <div className="bg-gradient-to-r from-emerald-400/80 to-teal-500/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <span className="text-xs font-bold text-white drop-shadow-sm">x2 ✨</span>
                    </div>
                    
                    {/* Level Display */}
                    <div className="bg-gradient-to-r from-rose-400/80 to-pink-500/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-white drop-shadow-sm">LV {userLevel}</span>
                        <div className="relative w-12 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full transition-all duration-300 shadow-sm"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white/90 font-medium drop-shadow-sm">{pointsToNextLevel}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation with heavenly styling */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group drop-shadow-sm ${
                isActive('/') ? 'text-indigo-700' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-700 hover:text-indigo-600 drop-shadow-sm">
                    Donate
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-white/95 backdrop-blur-md border border-white/40 shadow-xl rounded-xl">
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
                  <NavigationMenuTrigger className="font-bold text-slate-700 hover:text-indigo-600 drop-shadow-sm">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-white/95 backdrop-blur-md border border-white/40 shadow-xl rounded-xl">
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
                  <NavigationMenuTrigger className="font-bold text-slate-700 hover:text-indigo-600 drop-shadow-sm">
                    Rewards
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 bg-white/95 backdrop-blur-md border border-white/40 shadow-xl rounded-xl">
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
                isActive('/about') ? 'text-indigo-700' : 'text-slate-700 hover:text-indigo-600'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-500 transition-all duration-300 ${
                isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Become a Member - only show if not already a member */}
            {!isMember && (
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-2xl">
                <Crown className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </nav>

          {/* Mobile Menu - Cloud shaped */}
          <Button className="md:hidden relative overflow-hidden bg-gradient-to-br from-white/80 via-sky-100/80 to-blue-200/80 backdrop-blur-sm text-sky-700 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-full p-3 border-2 border-white/40 hover:scale-110 hover:from-white/90 hover:via-sky-50/90 hover:to-blue-100/90">
            <Cloud className="h-6 w-6 drop-shadow-sm" />
            {/* Cloud sparkle effects */}
            <div className="absolute top-1 left-2 w-4 h-2 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full animate-shimmer"></div>
            <div className="absolute bottom-1 right-2 w-3 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full animate-shimmer delay-500"></div>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

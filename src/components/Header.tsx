import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, Crown, ArrowUp, ChevronDown } from 'lucide-react';
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
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-scale cursor-pointer">
            <img 
              src="/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png" 
              alt="Your Jannah Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group ${
                isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ${
                isActive('/') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-gray-700 hover:text-emerald-600">
                    Donate
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
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
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-gray-700 hover:text-emerald-600">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
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
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-gray-700 hover:text-emerald-600">
                    Rewards
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
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
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link 
              to="/about" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group ${
                isActive('/about') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ${
                isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            
            {/* Become a Member - only show if not already a member */}
            {!isMember && (
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105">
                <Crown className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </nav>

          {/* Right Side - Points, User, and Controls */}
          <div className="flex items-center space-x-3">
            {/* Points Display with Rank - Better organized layout */}
            <div className="hidden md:flex items-center">
              <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-500 rounded-2xl px-4 py-2.5 shadow-lg border border-white/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  {/* Points Section */}
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-white animate-subtle-pulse" />
                    <div className="text-white">
                      <div className="text-lg font-bold leading-tight">{currentPoints.toLocaleString()}</div>
                      <div className="text-xs opacity-90 leading-tight">pts</div>
                    </div>
                  </div>

                  {/* Rank Badge */}
                  <Badge className={`bg-gradient-to-r ${currentRank.gradient} text-white px-2.5 py-1 text-xs font-bold shadow-md border border-white/30`}>
                    <span className="mr-1 text-sm">{currentRank.icon}</span>
                    {currentRank.badge}
                  </Badge>

                  {/* VIP Multiplier */}
                  {isMember && (
                    <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-2.5 py-1 text-xs font-bold shadow-md border border-white/30 animate-pulse">
                      <Crown className="h-3 w-3 mr-1" />
                      2x
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Combined VIP User Section and Level Bar - Unified Gold Plaque */}
            <div className="flex items-center space-x-3">
              {isMember ? (
                <Link to="/profile">
                  <div className="relative overflow-hidden rounded-xl px-4 py-3 font-bold text-amber-900 border-0 shadow-xl transition-all duration-300 bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 border-2 border-yellow-300/50 hover:scale-105 cursor-pointer">
                    <div className="flex items-center space-x-4">
                      {/* User Info Section */}
                      <div className="flex items-center space-x-2">
                        <Crown className="h-4 w-4 text-amber-800" />
                        <User className="h-4 w-4 text-amber-800" />
                        <span className="hidden sm:inline text-amber-900 font-bold text-sm">VIP Ahmad M.</span>
                      </div>
                      
                      {/* Level Section */}
                      <div className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg px-3 py-1.5 border border-amber-300/50">
                        <div className="text-yellow-200 font-bold text-xs">LV {userLevel}</div>
                        <div className="relative w-16 h-2.5 bg-amber-900 rounded-full border border-amber-600 overflow-hidden">
                          {/* Filled XP portion with glow */}
                          <div 
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                            style={{ width: `${progress}%` }}
                          ></div>
                          {/* Missing XP portion with enhanced red flash */}
                          <div 
                            className="absolute right-0 top-0 h-full bg-gradient-to-r from-red-600 to-red-700 rounded-r-full animate-pulse opacity-70"
                            style={{ width: `${100 - progress}%` }}
                          ></div>
                          {/* Enhanced shine effect */}
                          <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"></div>
                        </div>
                        <div className="text-red-300 font-bold text-xs animate-pulse min-w-[2.5rem] text-right">
                          {pointsToNextLevel}
                        </div>
                      </div>
                    </div>
                    
                    {/* Enhanced plaque shine effect */}
                    <div className="absolute top-2 left-3 w-8 h-4 bg-gradient-to-r from-transparent via-yellow-200/80 to-transparent rounded-full animate-shimmer"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-yellow-300/20 rounded-xl"></div>
                  </div>
                </Link>
              ) : (
                <Button className="professional-button vibrant-gradient text-white border-0 font-bold shadow-xl transition-all duration-300 hover:scale-105">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">Ahmad M.</span>
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button className="md:hidden lg:hidden gel-button bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 border-0 shadow-lg">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

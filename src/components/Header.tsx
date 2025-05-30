
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

const Header = () => {
  const location = useLocation();
  const isMember = true; // VIP status

  // User level data - this would come from your user context/state management
  const userLevel = 12;
  const currentPoints = 5632;
  const nextLevelPoints = 6000;
  const pointsToNextLevel = nextLevelPoints - currentPoints;
  const progress = (currentPoints / nextLevelPoints) * 100;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover-scale cursor-pointer">
            <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-full px-6 py-3 shadow-lg">
              <span className="text-white font-bold text-xl">Your Jannah</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105">
                <Crown className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {/* Level Display with Progress - Made visible on medium screens and up */}
            <div className="hidden md:flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-xl border border-blue-200/50 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                  {userLevel}
                </div>
                <div className="flex flex-col">
                  <div className="text-xs font-semibold text-gray-700">Level {userLevel}</div>
                  <div className="w-20 bg-gray-200 rounded-full h-2 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300 shadow-sm"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 font-medium">{pointsToNextLevel} to go</div>
                </div>
              </div>
            </div>

            {/* Mobile Level Display - Compact version for smaller screens */}
            <div className="md:hidden flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 px-2 py-1 rounded-lg border border-blue-200/50">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {userLevel}
              </div>
              <div className="flex flex-col">
                <div className="text-xs font-semibold text-gray-700">Lv {userLevel}</div>
                <div className="w-12 bg-gray-200 rounded-full h-1">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 jannah-counter px-4 py-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-lg font-bold">5,632 pts</span>
              {isMember && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs ml-2 animate-pulse">
                  <Crown className="h-3 w-3 mr-1" />
                  2x Points
                </Badge>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <Link to="/profile">
                  <Button className="professional-button vibrant-gradient text-white border-0 font-bold shadow-xl transition-all duration-300">
                    <User className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Ahmad M.</span>
                  </Button>
                </Link>
                
                {/* Subtle upgrade link under name */}
                <div className="mt-1">
                  <Link to="/membership" className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    Upgrade to 3x
                  </Link>
                </div>
              </div>
              
              {/* Member Badge */}
              {isMember && (
                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs animate-bounce">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP
                </Badge>
              )}
            </div>

            {/* Mobile Menu */}
            <Button className="md:hidden gel-button bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 border-0 shadow-lg">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

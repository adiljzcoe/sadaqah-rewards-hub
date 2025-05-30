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
            <img 
              src="/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png" 
              alt="Your Jannah Logo" 
              className="h-12 w-auto object-contain"
            />
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
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold shadow-lg transition-all duration-300 hover:scale-105">
                <Crown className="h-4 w-4 mr-2" />
                Become a Member
              </Button>
            )}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-3">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 jannah-counter px-4 py-2">
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="text-lg font-bold">5,632 pts</span>
              {isMember && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs ml-2 animate-pulse shadow-lg border border-white/20">
                  <Crown className="h-3 w-3 mr-1" />
                  2x Points
                </Badge>
              )}
            </div>

            {/* User Menu with Level and VIP combined */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <Link to="/profile">
                  <Button className="professional-button vibrant-gradient text-white border-0 font-bold shadow-xl transition-all duration-300">
                    <User className="h-5 w-5 mr-2" />
                    <span className="hidden sm:inline">Ahmad M.</span>
                  </Button>
                </Link>
                
                {/* Combined VIP Badge with Level and XP in one line */}
                {isMember && (
                  <div className="mt-1">
                    <Badge className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 text-amber-900 text-xs animate-bounce shadow-lg border-2 border-yellow-300/50 font-bold flex items-center space-x-2 px-3 py-1">
                      <Crown className="h-3 w-3" />
                      <span>VIP Level {userLevel}</span>
                      <div className="w-8 bg-yellow-200 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-yellow-600 to-amber-700 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{pointsToNextLevel}</span>
                    </Badge>
                  </div>
                )}
              </div>
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

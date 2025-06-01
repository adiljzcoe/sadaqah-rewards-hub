import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, Menu, ArrowUp, ChevronDown, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield } from 'lucide-react';
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

  // Charity logos for the flying plane
  const charityLogos = [
    { name: 'One Nation', logo: '/lovable-uploads/06a0c139-e89f-4071-98fb-da09f757e1eb.png' },
    { name: 'Human Appeal', logo: '/lovable-uploads/fe60c231-8422-4bf0-83e7-47b219d91e70.png' },
    { name: 'Muslim Global Relief', logo: '/lovable-uploads/051509ed-1b47-49b2-8b42-123906f123c6.png' },
    { name: 'Islamic Help', logo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png' },
    { name: 'Muslim Aid', logo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png' }
  ];

  return (
    <header className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-hidden border-b-2 border-cyan-400/30 z-[100]">
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

      {/* Flying Biplane with Charity Partners Banner - Above Everything */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[9999]">
        {charityLogos.map((charity, index) => (
          <div
            key={index}
            className="absolute top-4 -left-80 opacity-0 animate-[flyAcross_20s_infinite] flex items-center"
            style={{ 
              animationDelay: `${index * 5}s`
            }}
          >
            {/* Biplane */}
            <div className="relative">
              <span className="text-2xl">🛩️</span>
              
              {/* String connecting plane to banner */}
              <div className="absolute left-8 top-1/2 w-6 h-px bg-gray-600 -translate-y-1/2"></div>
              
              {/* White Banner with string attachment */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-white rounded-lg border border-gray-300 shadow-lg px-3 py-2 flex flex-col items-center min-w-max">
                {/* Small "Charity Partner" text on top */}
                <span className="text-xs font-medium text-gray-600 mb-1 whitespace-nowrap">Charity Partner</span>
                {/* Logo */}
                <img 
                  src={charity.logo} 
                  alt={charity.name}
                  className="w-16 h-6 object-contain"
                />
              </div>
            </div>
          </div>
        ))}
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

          {/* Navigation with Premium Mega Menu */}
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

            {/* Premium Donate Mega Menu */}
            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 data-[state=open]:bg-transparent data-[state=open]:text-cyan-300">
                    Donate
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[500]">
                    <div className="w-[800px] p-8 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-xl border border-cyan-400/30 shadow-2xl rounded-2xl ring-1 ring-cyan-300/20">
                      <div className="grid grid-cols-3 gap-8">
                        {/* Quick Actions */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center">
                            <Heart className="h-5 w-5 mr-2 text-red-400" />
                            Quick Actions
                          </h3>
                          <div className="space-y-3">
                            <Link to="/campaigns" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 transition-all duration-300 border border-emerald-400 hover:border-emerald-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center mr-3">
                                <Heart className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-emerald-200">Active Campaigns</div>
                                <p className="text-sm text-slate-300 group-hover:text-emerald-300">Support urgent causes worldwide</p>
                              </div>
                            </Link>
                            
                            <Link to="/build-mosque" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 border border-blue-400 hover:border-blue-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                                <Building className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-blue-200">Build a Mosque</div>
                                <p className="text-sm text-slate-300 group-hover:text-blue-300">Fund mosque construction projects</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Essential Causes */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                            <Users className="h-5 w-5 mr-2 text-purple-400" />
                            Essential Causes
                          </h3>
                          <div className="space-y-3">
                            <Link to="/water-wells" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 border border-cyan-400 hover:border-cyan-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white text-lg">💧</span>
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-cyan-200">Water Wells</div>
                                <p className="text-sm text-slate-300 group-hover:text-cyan-300">Provide clean water access</p>
                              </div>
                            </Link>
                            
                            <Link to="/orphanages" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 transition-all duration-300 border border-pink-400 hover:border-pink-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white text-lg">👶</span>
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-pink-200">Orphanages</div>
                                <p className="text-sm text-slate-300 group-hover:text-pink-300">Support orphan care & education</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        {/* Trust & Transparency */}
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center">
                            <Shield className="h-5 w-5 mr-2 text-amber-400" />
                            Trust & Partners
                          </h3>
                          <div className="space-y-3">
                            <Link to="/charities" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-300 border border-violet-400 hover:border-violet-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center mr-3">
                                <Users className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-violet-200">Charity Partners</div>
                                <p className="text-sm text-slate-300 group-hover:text-violet-300">Browse trusted organizations</p>
                              </div>
                            </Link>
                            
                            <Link to="/why-donate" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 transition-all duration-300 border border-orange-400 hover:border-orange-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
                                <Shield className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-orange-200">Why Donate With Us</div>
                                <p className="text-sm text-slate-300 group-hover:text-orange-300">100% transparent distribution</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom CTA */}
                      <div className="mt-8 pt-6 border-t border-cyan-400/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-white">Start Making an Impact Today</h4>
                            <p className="text-sm text-slate-300">Join thousands of donors changing lives worldwide</p>
                          </div>
                          <Button className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            Donate Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Premium Community Mega Menu */}
            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 data-[state=open]:bg-transparent data-[state=open]:text-cyan-300">
                    Community
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[500]">
                    <div className="w-[600px] p-8 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-xl border border-purple-400/30 shadow-2xl rounded-2xl ring-1 ring-purple-300/20">
                      <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-purple-300 mb-4 flex items-center">
                            <Trophy className="h-5 w-5 mr-2 text-purple-400" />
                            Compete & Connect
                          </h3>
                          <div className="space-y-3">
                            <Link to="/leaderboards" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 transition-all duration-300 border border-amber-400 hover:border-amber-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center mr-3">
                                <Trophy className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-amber-200">Leaderboards</div>
                                <p className="text-sm text-slate-300 group-hover:text-amber-300">Top donors & recognition</p>
                              </div>
                            </Link>
                            
                            <Link to="/live" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 transition-all duration-300 border border-red-400 hover:border-red-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white text-lg">🔴</span>
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-red-200">Live Feed</div>
                                <p className="text-sm text-slate-300 group-hover:text-red-300">Real-time updates & stories</p>
                              </div>
                            </Link>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xl font-bold text-cyan-300 mb-4 flex items-center">
                            <BookOpen className="h-5 w-5 mr-2 text-cyan-400" />
                            Stories & Insights
                          </h3>
                          <div className="space-y-3">
                            <Link to="/blog" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 transition-all duration-300 border border-indigo-400 hover:border-indigo-300">
                              <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center mr-3">
                                <BookOpen className="h-5 w-5 text-white" />
                              </div>
                              <div>
                                <div className="font-semibold text-white group-hover:text-indigo-200">Blog & Stories</div>
                                <p className="text-sm text-slate-300 group-hover:text-indigo-300">Impact stories & insights</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Premium Rewards Mega Menu */}
            <NavigationMenu className="relative z-[300]">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-bold text-slate-300 hover:text-cyan-400 drop-shadow-sm bg-transparent border-0 data-[state=open]:bg-transparent data-[state=open]:text-cyan-300">
                    Rewards
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="z-[500]">
                    <div className="w-[500px] p-8 bg-gradient-to-br from-slate-900 via-amber-900 to-orange-900 backdrop-blur-xl border border-amber-400/30 shadow-2xl rounded-2xl ring-1 ring-amber-300/20">
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center">
                          <Gift className="h-5 w-5 mr-2 text-amber-400" />
                          Rewards & Benefits
                        </h3>
                        
                        <div className="space-y-4">
                          <Link to="/coins" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 transition-all duration-300 border border-yellow-400 hover:border-yellow-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                              <Coins className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-yellow-200">Sadaqah Coins</div>
                              <p className="text-sm text-slate-300 group-hover:text-yellow-300">Purchase coins & unlock exclusive rewards</p>
                            </div>
                          </Link>
                          
                          <Link to="/membership" className="group flex items-center p-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 border border-purple-400 hover:border-purple-300">
                            <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                              <Shield className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <div className="font-semibold text-white group-hover:text-purple-200">Membership Tiers</div>
                              <p className="text-sm text-slate-300 group-hover:text-purple-300">Upgrade for multiplied points & exclusive benefits</p>
                            </div>
                          </Link>
                        </div>
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

      {/* Custom CSS for flying plane animation with 5-second gaps */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flyAcross {
            0% { 
              transform: translateX(0); 
              opacity: 0; 
            }
            5% { 
              opacity: 1; 
            }
            20% { 
              opacity: 1; 
            }
            25% { 
              transform: translateX(calc(100vw + 200px)); 
              opacity: 0; 
            }
            100% { 
              transform: translateX(calc(100vw + 200px)); 
              opacity: 0; 
            }
          }
        `
      }} />
    </header>
  );
};

export default Header;

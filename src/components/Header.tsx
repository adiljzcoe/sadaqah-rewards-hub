
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight, Building, Heart, Users, Gift, Trophy, BookOpen, Coins, Shield, Calendar, Mic, Tv, Clock, Moon, Sparkles, Crown, Settings, Code, UserCog, LogIn, LogOut } from 'lucide-react';
import MobileSidebar from '@/components/MobileSidebar';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useTranslation } from '@/contexts/TranslationContext';

const Header = () => {
  const { user, fakeAdminLogin, fakeUserLogin, signOut } = useAuth();
  const { totalItems, totalAmount } = useCart();
  const { t } = useTranslation();
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(0);

  // Watch for cart changes and trigger animation
  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setCartAnimating(true);
      setTimeout(() => setCartAnimating(false), 1000);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  // Mock user data for UI display
  const userLevel = 7;
  const currentPoints = 2500;
  const nextLevelPoints = 3000;
  const isMember = true;
  const progress = (currentPoints / nextLevelPoints) * 100;

  return (
    <header className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white shadow-xl border-b-4 border-white/20 relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 animate-gradient-x"></div>
      
      <div className="container mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
              <span className="text-2xl">🌟</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                {t('home')} {/* This will show "Donate Feels Great" in English or equivalent */}
              </h1>
              <p className="text-sm text-white/90 drop-shadow-sm hidden sm:block">
                {t('tagline') || 'Make a difference today'}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/campaigns" className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:scale-105">
              {t('active_campaigns')}
            </Link>
            <Link to="/my-ummah" className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:scale-105">
              {t('community')}
            </Link>
            <Link to="/leaderboards" className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:scale-105">
              {t('leaderboards')}
            </Link>
            <Link to="/membership" className="text-white/90 hover:text-white font-medium transition-colors duration-200 hover:scale-105">
              {t('membership_tiers')}
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Golden User Plaque - Desktop Only */}
            <div className="hidden lg:block">
              <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-2xl px-4 py-2 shadow-2xl border-2 border-yellow-300/50 hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                {/* Glossy animation effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite] rounded-2xl"></div>
                
                <div className="relative flex items-center space-x-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 ring-2 ring-white/20">
                    <span>🛡️</span>
                  </div>
                  
                  {/* User Info */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-yellow-50 drop-shadow-md text-sm">Ahmad M.</span>
                      {isMember && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          VIP
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-bold text-yellow-50 drop-shadow-md">{t('level')} {userLevel}</span>
                      <div className="w-16">
                        <Progress value={progress} className="h-1.5" />
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-100 drop-shadow-md" />
                        <span className="text-xs font-bold text-yellow-50 drop-shadow-md">{currentPoints.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Checkout Button */}
            <Link 
              to="/checkout" 
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg border backdrop-blur-sm overflow-hidden relative ${
                cartAnimating 
                  ? 'bg-gradient-to-r from-green-500 via-emerald-600 to-green-500 border-green-400/50 animate-pulse' 
                  : 'bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 border-pink-400/30'
              }`}
            >
              {/* Glossy effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 w-1/3 animate-[shine_3s_ease-in-out_infinite]"></div>
              
              <div className="relative flex items-center space-x-2">
                <div className={`rounded-lg p-1.5 backdrop-blur-sm transition-all duration-300 ${
                  cartAnimating ? 'bg-white/30 scale-110' : 'bg-white/20'
                }`}>
                  <ShoppingCart className={`h-4 w-4 drop-shadow-md transition-all duration-300 ${
                    cartAnimating ? 'animate-bounce' : ''
                  }`} />
                </div>
                <span className="drop-shadow-md text-sm hidden sm:inline">
                  {cartAnimating ? t('item_added') || 'Added!' : t('checkout')}
                </span>
                <div className={`rounded-lg px-2 py-1 shadow-lg border transition-all duration-300 ${
                  cartAnimating 
                    ? 'bg-gradient-to-r from-yellow-300 to-orange-400 border-yellow-200/60 scale-110' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 border-yellow-300/50'
                }`}>
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    £{totalAmount > 0 ? totalAmount.toFixed(2) : '0.00'}
                  </span>
                </div>
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2">
                    <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center border border-yellow-300/50 shadow-lg font-bold">
                      <span className="text-[10px]">{totalItems}</span>
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Mobile Sidebar */}
            <MobileSidebar 
              userLevel={userLevel}
              currentPoints={currentPoints}
              nextLevelPoints={nextLevelPoints}
              isMember={isMember}
            />
          </div>
        </div>
      </div>

      {/* Add the shine animation keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(400%) skewX(-12deg); }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </header>
  );
};

export default Header;

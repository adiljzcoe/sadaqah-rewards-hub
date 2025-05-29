
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, User, Menu, Crown, ArrowUp } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isMember = true; // VIP status

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
            <Link 
              to="/campaigns" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group ${
                isActive('/campaigns') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Campaigns
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ${
                isActive('/campaigns') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
            <Link 
              to="/leaderboards" 
              className={`font-bold transition-all duration-300 hover:scale-105 relative group ${
                isActive('/leaderboards') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Leaderboards
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 ${
                isActive('/leaderboards') ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
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
          <div className="flex items-center space-x-4">
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
                  <button className="text-xs text-gray-500 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1">
                    <ArrowUp className="h-3 w-3" />
                    Upgrade to 3x
                  </button>
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

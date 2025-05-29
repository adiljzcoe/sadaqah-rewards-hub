
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-white via-candy-pink-50 to-electric-blue-50 shadow-lg border-b-4 border-gradient-to-r from-candy-pink-300 to-electric-blue-300 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 animate-bounce-in">
            <div className="w-12 h-12 bg-gradient-to-br from-candy-pink-500 to-purple-magic-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 animate-float">
              <Gift className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black gradient-text">Donate Feels Great! 🎉</h1>
              <p className="text-sm text-gray-600 font-semibold">Making giving feel AMAZING ✨</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-candy-pink-600 font-bold text-lg transition-all duration-300 hover:scale-110 transform relative group">
              Home 🏠
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-candy-pink-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-electric-blue-600 font-bold text-lg transition-all duration-300 hover:scale-110 transform relative group">
              Campaigns 🚀
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-lime-green-600 font-bold text-lg transition-all duration-300 hover:scale-110 transform relative group">
              Partners 🤝
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lime-green-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-vibrant-orange-600 font-bold text-lg transition-all duration-300 hover:scale-110 transform relative group">
              About ℹ️
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vibrant-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-vibrant-orange-400 to-lime-green-400 px-4 py-2 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300 animate-glow">
              <Star className="h-5 w-5 text-white animate-sparkle" />
              <span className="text-lg font-black text-white">5,632 pts ⭐</span>
            </div>

            {/* User Menu */}
            <Button className="candy-button border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline font-bold">Ahmad M. 👤</span>
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden bg-gradient-to-r from-purple-magic-500 to-candy-pink-500 text-white border-0 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 hover-scale cursor-pointer">
            <div className="w-12 h-12 vibrant-gradient rounded-xl flex items-center justify-center text-white shadow-xl animate-subtle-pulse">
              <Gift className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Donate Feels Great
              </h1>
              <p className="text-sm font-medium bg-gradient-to-r from-gray-600 to-emerald-600 bg-clip-text text-transparent">Making giving rewarding</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-bold transition-all duration-300 hover:scale-105 relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-bold transition-all duration-300 hover:scale-105 relative group">
              Campaigns
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-bold transition-all duration-300 hover:scale-105 relative group">
              Partners
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-bold transition-all duration-300 hover:scale-105 relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 jannah-counter">
              <Star className="h-5 w-5 text-yellow-300 animate-subtle-pulse" />
              <span className="text-lg font-bold">5,632 pts</span>
            </div>

            {/* User Menu */}
            <Button className="professional-button vibrant-gradient text-white border-0 font-bold shadow-xl transition-all duration-300">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Ahmad M.</span>
            </Button>

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

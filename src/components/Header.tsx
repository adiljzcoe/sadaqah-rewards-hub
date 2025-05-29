
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-lime-green-500 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-candy-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              <Gift className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white">Donate Feels Great! 🎉</h1>
              <p className="text-sm text-white/90 font-semibold">Making giving feel AMAZING ✨</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-white hover:text-yellow-200 font-bold text-lg transition-colors duration-300">
              Home 🏠
            </a>
            <a href="#" className="text-white hover:text-yellow-200 font-bold text-lg transition-colors duration-300">
              Campaigns 🚀
            </a>
            <a href="#" className="text-white hover:text-yellow-200 font-bold text-lg transition-colors duration-300">
              Partners 🤝
            </a>
            <a href="#" className="text-white hover:text-yellow-200 font-bold text-lg transition-colors duration-300">
              About ℹ️
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-vibrant-orange-500 px-4 py-2 rounded-2xl shadow-lg">
              <Star className="h-5 w-5 text-white" />
              <span className="text-lg font-black text-white">5,632 pts ⭐</span>
            </div>

            {/* User Menu */}
            <Button className="bg-electric-blue-500 hover:bg-electric-blue-600 text-white border-0 shadow-lg font-bold">
              <User className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline font-bold">Ahmad M. 👤</span>
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden bg-purple-magic-500 hover:bg-purple-magic-600 text-white border-0 shadow-lg">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

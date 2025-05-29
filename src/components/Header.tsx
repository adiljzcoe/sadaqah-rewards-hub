
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-sm">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Donate Feels Great</h1>
              <p className="text-sm text-gray-600">Making giving rewarding</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Campaigns
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              Partners
            </a>
            <a href="#" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
              About
            </a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Star className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">5,632 pts</span>
            </div>

            {/* User Menu */}
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 font-medium">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ahmad M.</span>
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden bg-gray-100 hover:bg-gray-200 text-gray-700 border-0">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

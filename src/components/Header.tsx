
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-islamic-green-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-islamic-green-600 rounded-lg flex items-center justify-center">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-islamic-green-800">Donate Feels Great</h1>
              <p className="text-xs text-gray-500">Making giving feel amazing</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-islamic-green-600 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-islamic-green-600 font-medium">Campaigns</a>
            <a href="#" className="text-gray-600 hover:text-islamic-green-600 font-medium">Partners</a>
            <a href="#" className="text-gray-600 hover:text-islamic-green-600 font-medium">About</a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-sadaqah-gold-50 px-3 py-2 rounded-lg">
              <Star className="h-4 w-4 text-sadaqah-gold-600" />
              <span className="text-sm font-medium text-sadaqah-gold-800">5,632 pts</span>
            </div>

            {/* User Menu */}
            <Button variant="outline" size="sm" className="border-islamic-green-200">
              <User className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Ahmad M.</span>
            </Button>

            {/* Mobile Menu */}
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

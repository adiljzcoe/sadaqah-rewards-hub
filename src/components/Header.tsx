
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, User, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 hover-scale cursor-pointer">
            <div className="relative">
              {/* Cloud background */}
              <div className="w-24 h-16 bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-full shadow-lg border-2 border-blue-200 relative overflow-hidden">
                {/* Cloud decorative elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-white/80 rounded-full"></div>
                <div className="absolute -top-1 right-2 w-6 h-6 bg-white/60 rounded-full"></div>
                <div className="absolute -bottom-1 left-4 w-5 h-5 bg-white/70 rounded-full"></div>
                
                {/* "Jannah" text inside cloud */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs font-bold text-emerald-700 flex items-center">
                    {/* J as crescent and star */}
                    <div className="relative mr-1">
                      <div className="text-yellow-500 text-lg leading-none">☪</div>
                    </div>
                    
                    {/* a */}
                    <span className="text-emerald-700">a</span>
                    
                    {/* n */}
                    <span className="text-emerald-700">n</span>
                    
                    {/* n */}
                    <span className="text-emerald-700">n</span>
                    
                    {/* a as triangle with minaret */}
                    <div className="relative ml-1">
                      <div className="text-emerald-700 text-xs">▲</div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-2 bg-emerald-600"></div>
                    </div>
                    
                    {/* h */}
                    <span className="text-emerald-700 ml-1">h</span>
                  </div>
                </div>
              </div>
              
              {/* "Your" text outside cloud */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-sm font-bold text-gray-700">
                Your
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Jannah
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

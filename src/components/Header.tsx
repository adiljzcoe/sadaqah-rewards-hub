
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Gift, User, Menu, Zap, Trophy } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-cyan-800/95 backdrop-blur-md border-b-4 border-cyan-400 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Epic Logo */}
          <div className="flex items-center space-x-3 transform hover:scale-110 transition-all duration-300 cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-2xl animate-rainbow border-2 border-white/30">
              <Gift className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                CHARITY ROYALE
              </h1>
              <p className="text-sm font-bold bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">Battle for Good</p>
            </div>
          </div>

          {/* Battle Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-cyan-100 hover:text-pink-400 font-black text-lg transition-all duration-300 hover:scale-110 relative group">
              🏠 LOBBY
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-cyan-100 hover:text-pink-400 font-black text-lg transition-all duration-300 hover:scale-110 relative group">
              ⚔️ BATTLES
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-cyan-100 hover:text-pink-400 font-black text-lg transition-all duration-300 hover:scale-110 relative group">
              🤝 SQUADS
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="text-cyan-100 hover:text-pink-400 font-black text-lg transition-all duration-300 hover:scale-110 relative group">
              ℹ️ INTEL
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>

          {/* Player HUD */}
          <div className="flex items-center space-x-4">
            {/* V-Bucks Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-xl border-2 border-yellow-300 shadow-xl">
              <Star className="h-6 w-6 text-white animate-sparkle" />
              <span className="text-xl font-black text-white">5,632</span>
              <span className="text-sm font-bold text-yellow-100">V-BUCKS</span>
            </div>

            {/* Battle Pass Level */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-xl border-2 border-purple-300 shadow-xl">
              <Trophy className="h-6 w-6 text-white animate-bounce-in" />
              <span className="text-xl font-black text-white">12</span>
              <span className="text-sm font-bold text-purple-100">LVL</span>
            </div>

            {/* Player Profile */}
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white border-2 border-cyan-300 font-black shadow-xl transition-all duration-300 hover:scale-110 px-6 py-3 text-lg">
              <User className="h-6 w-6 mr-2" />
              <span className="hidden sm:inline">AHMAD_M</span>
            </Button>

            {/* Mobile Menu */}
            <Button className="md:hidden bg-gradient-to-r from-pink-500 to-purple-600 text-white border-2 border-pink-300 shadow-xl hover:scale-110 transition-all duration-300">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        {/* Battle Pass Progress Bar */}
        <div className="mt-4 bg-black/30 rounded-full h-3 overflow-hidden border-2 border-cyan-400">
          <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 w-3/4 animate-shimmer"></div>
        </div>
        <div className="flex justify-between text-sm font-bold text-cyan-100 mt-1">
          <span>BATTLE PASS LVL 12</span>
          <span>368/500 XP TO NEXT TIER</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

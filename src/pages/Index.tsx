
import React from 'react';
import Header from '@/components/Header';
import LiveVideo from '@/components/LiveVideo';
import Leaderboard from '@/components/Leaderboard';
import DonationWidget from '@/components/DonationWidget';
import FloatingDonationButton from '@/components/FloatingDonationButton';
import CharityPartners from '@/components/CharityPartners';
import LiveFeed from '@/components/LiveFeed';
import UserStats from '@/components/UserStats';
import FloatingDonationWidget from '@/components/FloatingDonationWidget';
import BusinessSection from '@/components/BusinessSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-800 relative overflow-hidden">
      {/* Fortnite-style animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce-in"></div>
        <div className="absolute top-1/4 right-20 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg rotate-45 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-wiggle"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg animate-rainbow"></div>
        
        {/* Additional battle royale elements */}
        <div className="absolute top-20 right-1/3 w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 transform rotate-12 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-8 h-8 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-gradient-to-r from-green-300 to-blue-400 animate-spin"></div>
      </div>
      
      <Header />
      
      {/* Battle Royale Main Interface - More Game-Like Layout */}
      <section className="container mx-auto px-4 py-4 relative z-10">
        {/* Storm Warning Banner */}
        <div className="mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-2xl p-4 text-center shadow-2xl border-4 border-red-400 animate-pulse">
          <div className="flex items-center justify-center space-x-4 text-white">
            <div className="text-2xl animate-bounce">⚠️</div>
            <div>
              <div className="text-xl font-black">STORM CLOSING IN!</div>
              <div className="text-lg font-bold">Double XP Active - Donate Now for Maximum Points!</div>
            </div>
            <div className="text-3xl font-black bg-black/30 px-4 py-2 rounded-xl">05:42</div>
          </div>
        </div>

        {/* Main Battle Interface Grid */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Battle Arena - Takes up more space like game lobby */}
          <div className="lg:col-span-2 space-y-4">
            {/* Battle Stats Overlay */}
            <div className="bg-black/60 rounded-2xl p-4 border-2 border-cyan-400 backdrop-blur-sm">
              <div className="grid grid-cols-4 gap-4 text-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 border-2 border-green-300">
                  <div className="text-2xl font-black text-white">147</div>
                  <div className="text-sm font-bold text-green-100">PLAYERS ALIVE</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-3 border-2 border-blue-300">
                  <div className="text-2xl font-black text-white">28</div>
                  <div className="text-sm font-bold text-blue-100">SQUADS LEFT</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 border-2 border-purple-300">
                  <div className="text-2xl font-black text-white">£52K</div>
                  <div className="text-sm font-bold text-purple-100">LOOT POOL</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-3 border-2 border-orange-300">
                  <div className="text-2xl font-black text-white">ZONE 3</div>
                  <div className="text-sm font-bold text-orange-100">CLOSING</div>
                </div>
              </div>
            </div>
            
            <div className="transform hover:scale-105 transition-all duration-300">
              <LiveVideo />
            </div>
            
            {/* Mini Map Style Live Feed */}
            <div className="bg-black/80 rounded-2xl p-4 border-2 border-yellow-400">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-black text-yellow-300">🗺️ BATTLE MAP</h3>
                <div className="text-lg font-bold text-white bg-red-600 px-3 py-1 rounded-lg animate-pulse">
                  STORM MOVING
                </div>
              </div>
              <LiveFeed />
            </div>
          </div>

          {/* Right Sidebar - Game HUD Style */}
          <div className="lg:col-span-2 space-y-4">
            {/* Player Profile Card - Top Right like Fortnite */}
            <div className="transform hover:scale-105 transition-all duration-300">
              <UserStats />
            </div>
            
            {/* Quick Actions - Fortnite Style Button Layout */}
            <div className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 border-4 border-cyan-400 rounded-2xl p-6 shadow-2xl backdrop-blur-sm">
              <h3 className="text-2xl font-black text-cyan-100 mb-4 text-center">⚡ QUICK ACTIONS ⚡</h3>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-black py-4 px-6 rounded-xl text-lg shadow-xl border-4 border-green-300 hover:scale-110 transition-all duration-300 transform">
                  💚 DONATE £10
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-black py-4 px-6 rounded-xl text-lg shadow-xl border-4 border-blue-300 hover:scale-110 transition-all duration-300 transform">
                  💧 WATER £25
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black py-4 px-6 rounded-xl text-lg shadow-xl border-4 border-purple-300 hover:scale-110 transition-all duration-300 transform">
                  📚 EDUCATION £50
                </button>
                <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-black py-4 px-6 rounded-xl text-lg shadow-xl border-4 border-orange-300 hover:scale-110 transition-all duration-300 transform">
                  🏥 MEDICAL £100
                </button>
              </div>
            </div>
            
            {/* Leaderboard as Battle Royale Rankings */}
            <div className="transform hover:scale-105 transition-all duration-300">
              <Leaderboard />
            </div>
          </div>
        </div>

        {/* Battle Pass Progress - Bottom like Fortnite */}
        <div className="bg-gradient-to-r from-purple-900/95 to-blue-900/95 rounded-2xl p-6 border-4 border-cyan-400 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-black border-4 border-yellow-300 shadow-xl">
                12
              </div>
              <div>
                <h3 className="text-2xl font-black text-cyan-100">CHARITY BATTLE PASS</h3>
                <p className="text-lg font-bold text-cyan-300">Season 1: Hearts of Hope</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-black text-yellow-300">368/500 XP</div>
              <div className="text-lg font-bold text-yellow-100">TO NEXT TIER</div>
            </div>
          </div>
          
          {/* Battle Pass Tiers Preview */}
          <div className="grid grid-cols-5 gap-4">
            {[10, 11, 12, 13, 14].map((tier, index) => (
              <div key={tier} className={`relative ${index === 2 ? 'scale-110' : ''}`}>
                <div className={`w-full h-24 rounded-xl border-4 ${
                  index < 2 ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300' :
                  index === 2 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-300 animate-glow' :
                  'bg-gradient-to-r from-gray-600 to-gray-700 border-gray-400'
                } flex items-center justify-center text-white font-black text-lg shadow-xl`}>
                  {index < 2 ? '✓' : index === 2 ? tier : '🔒'}
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-bold text-cyan-200">TIER {tier}</div>
                  {index === 2 && (
                    <div className="text-xs font-black text-yellow-300 animate-pulse">CURRENT</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Partners Section */}
      <BusinessSection />

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-purple-900/90 to-blue-900/90 py-16 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <CharityPartners />
        </div>
      </section>

      <FloatingDonationButton />
      <FloatingDonationWidget />
    </div>
  );
};

export default Index;

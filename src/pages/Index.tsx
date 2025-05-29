
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
      </div>
      
      <Header />
      
      {/* Hero Section with Battle Royale Style */}
      <section className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-glow">
            🏆 CHARITY BATTLE ROYALE 🏆
          </h2>
          <p className="text-xl text-cyan-100 mb-6 max-w-3xl mx-auto font-bold">
            Drop in, donate, and claim your 
            <span className="text-pink-400 font-black animate-sparkle"> VICTORY ROYALE</span> in giving! 
            Earn <span className="text-yellow-400 font-black">V-Bucks of Virtue</span> and 
            <span className="text-purple-400 font-black"> Legendary Loot</span>
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl text-lg font-black shadow-2xl border-2 border-pink-300 animate-glow">
              🔥 STORM CLOSING: 2X POINTS
            </div>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-xl text-lg font-black shadow-2xl border-2 border-cyan-300 animate-bounce-in">
              ⚡ LEGENDARY DROP ACTIVE
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-xl text-lg font-black shadow-2xl border-2 border-yellow-300 animate-rainbow">
              🎯 BATTLE PASS SEASON 1
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Battle Arena */}
          <div className="lg:col-span-2 space-y-6">
            <div className="transform hover:scale-105 transition-all duration-300">
              <LiveVideo />
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <LiveFeed />
            </div>
          </div>

          {/* Player Stats & Leaderboard */}
          <div className="space-y-6">
            <div className="transform hover:scale-105 transition-all duration-300">
              <UserStats />
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <DonationWidget />
            </div>
            <div className="transform hover:scale-105 transition-all duration-300">
              <Leaderboard />
            </div>
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

      {/* Gaming Features Section */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
            🎮 EPIC GAMING FEATURES 🎮
          </h3>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto font-bold">
            Level up your charity game with these 
            <span className="text-pink-400 font-black"> LEGENDARY </span>
            features that make giving feel like victory!
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-2xl border-2 border-pink-400 backdrop-blur-sm transform hover:scale-110 transition-all duration-300 hover:rotate-2">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl animate-bounce-in border-2 border-pink-300">
              🏆
            </div>
            <h4 className="font-black text-2xl mb-4 text-cyan-100">BATTLE ROYALE GIVING</h4>
            <p className="text-pink-200 font-bold">Compete in charity battles, earn Victory Royales, and unlock legendary rewards!</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl border-2 border-cyan-400 backdrop-blur-sm transform hover:scale-110 transition-all duration-300 hover:-rotate-2">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl animate-float border-2 border-cyan-300">
              🎯
            </div>
            <h4 className="font-black text-2xl mb-4 text-cyan-100">SQUAD LEADERBOARDS</h4>
            <p className="text-cyan-200 font-bold">Team up with your city and mosque squads to dominate the charity arena!</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-2xl border-2 border-yellow-400 backdrop-blur-sm transform hover:scale-110 transition-all duration-300 hover:rotate-2">
            <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-2xl animate-wiggle border-2 border-yellow-300">
              🎪
            </div>
            <h4 className="font-black text-2xl mb-4 text-cyan-100">LIVE CHARITY SHOWS</h4>
            <p className="text-yellow-200 font-bold">Watch epic charity events unfold in real-time and drop your donations!</p>
          </div>
        </div>

        {/* Epic Stats Battle Card */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-2xl p-8 text-center shadow-2xl border-4 border-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <h4 className="text-3xl font-black text-white mb-6 relative z-10">⚡ GLOBAL BATTLE STATS ⚡</h4>
          <div className="grid md:grid-cols-4 gap-6 relative z-10">
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border-2 border-pink-400 transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-pink-300 animate-number-pop">1,247</div>
              <div className="text-pink-100 font-bold text-lg">ACTIVE WARRIORS</div>
            </div>
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border-2 border-cyan-400 transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-cyan-300 animate-number-pop">£50K</div>
              <div className="text-cyan-100 font-bold text-lg">LOOT COLLECTED</div>
            </div>
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border-2 border-yellow-400 transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-yellow-300 animate-number-pop">28</div>
              <div className="text-yellow-100 font-bold text-lg">BATTLE ZONES</div>
            </div>
            <div className="bg-black/30 rounded-xl p-6 backdrop-blur-sm border-2 border-green-400 transform hover:scale-105 transition-all">
              <div className="text-4xl font-black text-green-300 animate-number-pop">95%</div>
              <div className="text-green-100 font-bold text-lg">VICTORY RATE</div>
            </div>
          </div>
        </div>
      </section>

      <FloatingDonationButton />
      <FloatingDonationWidget />
    </div>
  );
};

export default Index;

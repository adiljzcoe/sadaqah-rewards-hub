
import React from 'react';
import Header from '@/components/Header';
import LiveVideo from '@/components/LiveVideo';
import Leaderboard from '@/components/Leaderboard';
import DonationWidget from '@/components/DonationWidget';
import FloatingDonationButton from '@/components/FloatingDonationButton';
import CharityPartners from '@/components/CharityPartners';
import LiveFeed from '@/components/LiveFeed';
import UserStats from '@/components/UserStats';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-candy-pink-100 via-electric-blue-50 via-lime-green-50 to-purple-magic-100">
      <Header />
      
      {/* Hero Section with Live Stream */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-slide-in">
          <h2 className="text-5xl font-black gradient-text mb-4">
            Make a Difference, Earn Rewards! 🎯
          </h2>
          <p className="text-xl text-gray-700 mb-6 font-semibold">
            Join thousands of donors making an impact while earning 
            <span className="text-candy-pink-600 font-bold"> Jannah Points ⭐</span> and 
            <span className="text-vibrant-orange-600 font-bold"> Sadaqah Coins 🪙</span>
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-gradient-to-r from-candy-pink-500 to-purple-magic-500 text-white px-6 py-2 rounded-full text-sm font-bold animate-gentle-pulse">
              🔥 2x Points Active!
            </div>
            <div className="bg-gradient-to-r from-lime-green-500 to-electric-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
              ⚡ Live Rewards
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Stream - Main Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="hover-lift">
              <LiveVideo />
            </div>
            <div className="hover-lift">
              <LiveFeed />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="animate-slide-in hover-lift">
              <UserStats />
            </div>
            <div className="animate-slide-in hover-lift" style={{animationDelay: '0.1s'}}>
              <DonationWidget />
            </div>
            <div className="animate-slide-in hover-lift" style={{animationDelay: '0.2s'}}>
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-white via-candy-pink-50 to-electric-blue-50 py-16">
        <div className="container mx-auto px-4">
          <CharityPartners />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-slide-in">
          <h3 className="text-4xl font-black gradient-text mb-4">Why Choose Donate Feels Great? 🚀</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Our platform combines the spiritual reward of giving with engaging features that make charity feel 
            <span className="text-candy-pink-600 font-bold"> AMAZING! ✨</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-candy-pink-100 to-purple-magic-100 rounded-3xl border-4 border-candy-pink-300 hover:border-candy-pink-500 transition-all duration-300 hover-lift subtle-shadow">
            <div className="bg-gradient-to-br from-candy-pink-500 to-purple-magic-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🎯
            </div>
            <h4 className="font-black text-xl mb-4 text-candy-pink-800">Gamified Giving 🎮</h4>
            <p className="text-gray-700 font-medium">Earn points, badges, and compete with your community while doing good!</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-vibrant-orange-100 to-lime-green-100 rounded-3xl border-4 border-vibrant-orange-300 hover:border-vibrant-orange-500 transition-all duration-300 hover-lift subtle-shadow">
            <div className="bg-gradient-to-br from-vibrant-orange-500 to-lime-green-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🏆
            </div>
            <h4 className="font-black text-xl mb-4 text-vibrant-orange-800">League Tables 📊</h4>
            <p className="text-gray-700 font-medium">See how your city, mosque, and community rank in giving!</p>
          </div>
          
          <div className="text-center p-8 bg-gradient-to-br from-electric-blue-100 to-purple-magic-100 rounded-3xl border-4 border-electric-blue-300 hover:border-electric-blue-500 transition-all duration-300 hover-lift subtle-shadow">
            <div className="bg-gradient-to-br from-electric-blue-500 to-purple-magic-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              📺
            </div>
            <h4 className="font-black text-xl mb-4 text-electric-blue-800">Live Impact 🎬</h4>
            <p className="text-gray-700 font-medium">Watch your donations make a real difference in real-time!</p>
          </div>
        </div>

        {/* Fun stats section */}
        <div className="mt-16 bg-gradient-to-r from-lime-green-400 via-electric-blue-400 to-purple-magic-400 rounded-3xl p-8 text-center relative overflow-hidden hover-glow">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <h4 className="text-3xl font-black text-white mb-6">🎉 Amazing Community Stats 🎉</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/30 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">1,247</div>
                <div className="text-white font-bold">Active Donors 👥</div>
              </div>
              <div className="bg-white/30 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">£50K</div>
                <div className="text-white font-bold">Raised Today 💰</div>
              </div>
              <div className="bg-white/30 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">28</div>
                <div className="text-white font-bold">Cities Competing 🏙️</div>
              </div>
              <div className="bg-white/30 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">95%</div>
                <div className="text-white font-bold">Happiness Rate 😊</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingDonationButton />
    </div>
  );
};

export default Index;

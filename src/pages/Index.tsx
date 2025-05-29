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

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      {/* Hero Section with Live Stream */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-black gradient-text mb-4">
            Make a Difference, Earn Rewards! 🎯
          </h2>
          <p className="text-xl text-gray-700 mb-6 font-semibold">
            Join thousands of donors making an impact while earning 
            <span className="text-candy-pink-600 font-bold"> Jannah Points ⭐</span> and 
            <span className="text-vibrant-orange-600 font-bold"> Sadaqah Coins 🪙</span>
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-candy-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold">
              🔥 2x Points Active!
            </div>
            <div className="bg-electric-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold">
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
            <div className="hover-lift">
              <UserStats />
            </div>
            <div className="hover-lift">
              <DonationWidget />
            </div>
            <div className="hover-lift">
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Charity Partners Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <CharityPartners />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-black gradient-text mb-4">Why Choose Donate Feels Great? 🚀</h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Our platform combines the spiritual reward of giving with engaging features that make charity feel 
            <span className="text-candy-pink-600 font-bold"> AMAZING! ✨</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-candy-pink-100 rounded-3xl border-2 border-candy-pink-400 hover-lift clean-shadow">
            <div className="bg-candy-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🎯
            </div>
            <h4 className="font-black text-xl mb-4 text-candy-pink-800">Gamified Giving 🎮</h4>
            <p className="text-gray-700 font-medium">Earn points, badges, and compete with your community while doing good!</p>
          </div>
          
          <div className="text-center p-8 bg-vibrant-orange-100 rounded-3xl border-2 border-vibrant-orange-400 hover-lift clean-shadow">
            <div className="bg-vibrant-orange-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              🏆
            </div>
            <h4 className="font-black text-xl mb-4 text-vibrant-orange-800">League Tables 📊</h4>
            <p className="text-gray-700 font-medium">See how your city, mosque, and community rank in giving!</p>
          </div>
          
          <div className="text-center p-8 bg-electric-blue-100 rounded-3xl border-2 border-electric-blue-400 hover-lift clean-shadow">
            <div className="bg-electric-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
              📺
            </div>
            <h4 className="font-black text-xl mb-4 text-electric-blue-800">Live Impact 🎬</h4>
            <p className="text-gray-700 font-medium">Watch your donations make a real difference in real-time!</p>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 bg-lime-green-500 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-3xl font-black text-white mb-6">🎉 Amazing Community Stats 🎉</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">1,247</div>
                <div className="text-white font-bold">Active Donors 👥</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">£50K</div>
                <div className="text-white font-bold">Raised Today 💰</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">28</div>
                <div className="text-white font-bold">Cities Competing 🏙️</div>
              </div>
              <div className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm hover-scale">
                <div className="text-3xl font-black text-white">95%</div>
                <div className="text-white font-bold">Happiness Rate 😊</div>
              </div>
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

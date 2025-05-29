
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Live Stream */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Make a Difference, Earn Rewards
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of donors making an impact while earning 
            <span className="text-emerald-600 font-semibold"> Jannah Points</span> and 
            <span className="text-blue-600 font-semibold"> Sadaqah Coins</span>
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium">
              🔥 2x Points Active
            </div>
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
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
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Donate Feels Great?</h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform combines the spiritual reward of giving with engaging features that make charity 
            <span className="text-emerald-600 font-semibold"> meaningful and rewarding</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200 hover-lift subtle-shadow">
            <div className="bg-emerald-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl">
              🎯
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">Gamified Giving</h4>
            <p className="text-gray-600">Earn points, badges, and compete with your community while doing good!</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200 hover-lift subtle-shadow">
            <div className="bg-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl">
              🏆
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">League Tables</h4>
            <p className="text-gray-600">See how your city, mosque, and community rank in giving!</p>
          </div>
          
          <div className="text-center p-8 bg-white rounded-xl border border-gray-200 hover-lift subtle-shadow">
            <div className="bg-purple-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl">
              📺
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">Live Impact</h4>
            <p className="text-gray-600">Watch your donations make a real difference in real-time!</p>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 bg-emerald-500 rounded-xl p-8 text-center">
          <h4 className="text-2xl font-bold text-white mb-6">Community Impact</h4>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-white/90 font-medium">Active Donors</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">£50K</div>
              <div className="text-white/90 font-medium">Raised Today</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-white/90 font-medium">Cities Competing</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-white/90 font-medium">Satisfaction Rate</div>
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

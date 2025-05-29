
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
import StickyDonationWidget from '@/components/StickyDonationWidget';
import CharityFeedSection from '@/components/CharityFeedSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />
      <StickyDonationWidget />
      
      {/* Hero Section with Live Stream */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Make a Difference, Earn Rewards
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Join thousands of donors making an impact while earning 
            <span className="vibrant-text-emerald font-semibold"> Jannah Points</span> and 
            <span className="vibrant-text-blue font-semibold"> Sadaqah Coins</span>
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <div className="vibrant-gradient text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
              🔥 2x Points Active
            </div>
            <div className="accent-gradient text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
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
            
            {/* Charity Feed Section - Right below video */}
            <div className="hover-lift">
              <CharityFeedSection />
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

      {/* Business Partners Section */}
      <BusinessSection />

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-white to-blue-50/50 py-16">
        <div className="container mx-auto px-4">
          <CharityPartners />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Why Choose Donate Feels Great?
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Our platform combines the spiritual reward of giving with engaging features that make charity 
            <span className="vibrant-text-emerald font-semibold"> meaningful and rewarding</span>
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="vibrant-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              🎯
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">Gamified Giving</h4>
            <p className="text-gray-600">Earn points, badges, and compete with your community while doing good!</p>
          </div>
          
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="accent-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              🏆
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">League Tables</h4>
            <p className="text-gray-600">See how your city, mosque, and community rank in giving!</p>
          </div>
          
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="purple-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              📺
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">Live Impact</h4>
            <p className="text-gray-600">Watch your donations make a real difference in real-time!</p>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 vibrant-gradient rounded-xl p-8 text-center shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">Community Impact</h4>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-white/90 font-medium">Active Donors</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">£50K</div>
              <div className="text-white/90 font-medium">Raised Today</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-white/90 font-medium">Cities Competing</div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
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

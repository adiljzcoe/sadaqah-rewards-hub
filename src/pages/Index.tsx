
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
    <div className="min-h-screen bg-gradient-to-br from-islamic-green-50 via-white to-sadaqah-gold-50">
      <Header />
      
      {/* Hero Section with Live Stream */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold gradient-text mb-4">
            Make a Difference, Earn Rewards
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Join thousands of donors making an impact while earning Jannah Points and Sadaqah Coins
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Live Stream - Main Column */}
          <div className="lg:col-span-2">
            <LiveVideo />
            <div className="mt-6">
              <LiveFeed />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <UserStats />
            <DonationWidget />
            <Leaderboard />
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
          <h3 className="text-3xl font-bold mb-4">Why Choose Donate Feels Great?</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform combines the spiritual reward of giving with engaging features that make charity feel great
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-islamic-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">Gamified Giving</h4>
            <p className="text-gray-600">Earn points, badges, and compete with your community while doing good</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-sadaqah-gold-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">League Tables</h4>
            <p className="text-gray-600">See how your city, mosque, and community rank in giving</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📺</span>
            </div>
            <h4 className="font-semibold text-lg mb-2">Live Impact</h4>
            <p className="text-gray-600">Watch your donations make a real difference in real-time</p>
          </div>
        </div>
      </section>

      <FloatingDonationButton />
    </div>
  );
};

export default Index;

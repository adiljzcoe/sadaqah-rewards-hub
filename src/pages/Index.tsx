import React from 'react';
import LiveVideo from '@/components/LiveVideo';
import Leaderboard from '@/components/Leaderboard';
import FloatingDonationButton from '@/components/FloatingDonationButton';
import CharityPartners from '@/components/CharityPartners';
import UnifiedLiveFeed from '@/components/UnifiedLiveFeed';
import UserStats from '@/components/UserStats';
import BusinessSection from '@/components/BusinessSection';
import StickyDonationWidget from '@/components/StickyDonationWidget';
import CampaignsCarousel from '@/components/CampaignsCarousel';
import FundraisersCarousel from '@/components/FundraisersCarousel';
import InMemoryOfWidget from '@/components/InMemoryOfWidget';
import FriendsWidget from '@/components/FriendsWidget';
import CharityTicker from '@/components/CharityTicker';
import BusinessAdvert from '@/components/BusinessAdvert';
import DonationProducts from '@/components/DonationProducts';
import BusinessLeaderboard from '@/components/BusinessLeaderboard';
import MasjidLeaderboard from '@/components/MasjidLeaderboard';
import PushNotificationWidget from '@/components/PushNotificationWidget';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 overflow-x-hidden">
      <StickyDonationWidget />
      
      {/* Push Notification Widget - Add at the top */}
      <div className="container mx-auto px-4 py-4">
        <PushNotificationWidget />
      </div>
      
      {/* Main Content - Video Section */}
      <section className="w-full max-w-full overflow-x-hidden">
        <div className="grid lg:grid-cols-3 gap-0 max-w-full overflow-x-hidden">
          {/* Live Stream - Main Column - Remove padding for edge-to-edge */}
          <div className="lg:col-span-2 max-w-full overflow-x-hidden">
            <div className="hover-lift max-w-full overflow-x-hidden">
              <LiveVideo />
            </div>
            
            {/* CharityTicker moved here - directly below the video */}
            <div className="max-w-full overflow-x-hidden mt-6 px-4">
              <CharityTicker />
            </div>
            
            {/* Live Impact Feed moved here - below the charity ticker */}
            <div className="hover-lift mt-6 max-w-full overflow-x-hidden px-4">
              <UnifiedLiveFeed />
            </div>

            {/* Donation Products Section - moved here below the main feed */}
            <div className="mt-8 px-4">
              <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-lg shadow-lg">
                <DonationProducts />
              </div>
            </div>

            {/* Business Advertisement between feed sections */}
            <div className="hover-lift mt-6 max-w-full overflow-x-hidden px-4">
              <BusinessAdvert />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 max-w-full overflow-x-hidden pl-4 pr-2">
            <div className="hover-lift">
              <UserStats />
            </div>
            <div className="hover-lift">
              <FriendsWidget />
            </div>
            <div className="hover-lift">
              <MasjidLeaderboard />
            </div>
            <div className="hover-lift">
              <BusinessLeaderboard />
            </div>
            <div className="hover-lift">
              <InMemoryOfWidget />
            </div>
            <div className="hover-lift">
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Business Partners Section */}
      <div className="max-w-full overflow-x-hidden">
        <BusinessSection />
      </div>

      {/* Campaigns Section */}
      <section className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        <CampaignsCarousel title="Active Campaigns" />
      </section>

      {/* Fundraisers Section */}
      <section className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        <FundraisersCarousel title="Long-term Fundraisers" />
      </section>

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-white to-blue-50/50 py-16 max-w-full overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full overflow-x-hidden">
          <CharityPartners />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 max-w-full overflow-x-hidden">
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
    </div>
  );
};

export default Index;

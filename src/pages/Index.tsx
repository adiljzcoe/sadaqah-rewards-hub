import React from 'react';
import Header from '@/components/Header';
import LiveVideo from '@/components/LiveVideo';
import Leaderboard from '@/components/Leaderboard';
import DonationWidget from '@/components/DonationWidget';
import FloatingDonationButton from '@/components/FloatingDonationButton';
import CharityPartners from '@/components/CharityPartners';
import LiveFeed from '@/components/LiveFeed';
import UserStats from '@/components/UserStats';
import PersonalLeagueWidget from '@/components/PersonalLeagueWidget';
import FloatingDonationWidget from '@/components/FloatingDonationWidget';
import BusinessSection from '@/components/BusinessSection';
import StickyDonationWidget from '@/components/StickyDonationWidget';
import CharityFeedSection from '@/components/CharityFeedSection';
import CampaignsCarousel from '@/components/CampaignsCarousel';
import FundraisersCarousel from '@/components/FundraisersCarousel';
import InMemoryOfWidget from '@/components/InMemoryOfWidget';
import StreakWidget from '@/components/StreakWidget';
import AchievementSystem from '@/components/AchievementSystem';
import FriendsWidget from '@/components/FriendsWidget';
import SeasonalEvents from '@/components/SeasonalEvents';
import MatchingPoolWidget from '@/components/MatchingPoolWidget';
import CharityTicker from '@/components/CharityTicker';

const Index = () => {
  // Mock data for campaigns
  const campaigns = [
    {
      id: '1',
      title: 'Orphans of Gaza Emergency Support',
      charity: 'Islamic Relief',
      description: 'Providing immediate support to orphaned children in Gaza',
      raised: 45000,
      target: 60000,
      donors: 234,
      daysLeft: 12,
      image: 'Emergency orphan care',
      category: 'Emergency Aid'
    },
    {
      id: '2',
      title: 'Winter Clothing for Syrian Refugees',
      charity: 'Human Appeal',
      description: 'Warm clothing for families facing winter hardships',
      raised: 28000,
      target: 40000,
      donors: 156,
      daysLeft: 8,
      image: 'Winter clothing drive',
      category: 'Emergency Aid'
    },
    {
      id: '3',
      title: 'Yemen Children Nutrition Program',
      charity: 'Muslim Aid',
      description: 'Nutritional support for malnourished children',
      raised: 15000,
      target: 25000,
      donors: 89,
      daysLeft: 15,
      image: 'Child nutrition',
      category: 'Healthcare'
    }
  ];

  // Mock data for fundraisers
  const fundraisers = [
    {
      id: '1',
      title: 'Build 10 Water Wells in Somalia',
      charity: 'Water Wells Foundation',
      description: 'Providing clean water access to rural communities',
      raised: 75000,
      target: 100000,
      supporters: 340,
      deadline: 'Dec 2024',
      image: 'Water well construction',
      category: 'Infrastructure'
    },
    {
      id: '2',
      title: 'Mobile Medical Clinic Fleet',
      charity: 'Medical Aid International',
      description: 'Healthcare delivery to remote areas',
      raised: 120000,
      target: 200000,
      supporters: 567,
      deadline: 'Jan 2025',
      image: 'Mobile medical unit',
      category: 'Healthcare'
    },
    {
      id: '3',
      title: 'School Building Project Bangladesh',
      charity: 'Education for All',
      description: 'Building schools in underserved communities',
      raised: 85000,
      target: 150000,
      supporters: 423,
      deadline: 'Mar 2025',
      image: 'School construction',
      category: 'Education'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 overflow-x-hidden">
      <Header />
      <StickyDonationWidget />
      
      {/* Main Content - Video Section */}
      <section className="w-full max-w-full overflow-x-hidden">
        <div className="max-w-full overflow-x-hidden">
          <CharityTicker />
        </div>
        <div className="grid lg:grid-cols-3 gap-8 max-w-full overflow-x-hidden px-4">
          {/* Live Stream - Main Column */}
          <div className="lg:col-span-2 max-w-full overflow-x-hidden">
            <div className="hover-lift max-w-full overflow-x-hidden">
              <LiveVideo />
            </div>
            
            {/* Charity Feed Section - Right below video */}
            <div className="hover-lift mt-6 max-w-full overflow-x-hidden">
              <CharityFeedSection />
            </div>
            
            <div className="hover-lift mt-6 max-w-full overflow-x-hidden">
              <LiveFeed />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 max-w-full overflow-x-hidden">
            <div className="hover-lift">
              <UserStats />
            </div>
            <div className="hover-lift">
              <MatchingPoolWidget />
            </div>
            <div className="hover-lift">
              <StreakWidget />
            </div>
            <div className="hover-lift">
              <PersonalLeagueWidget />
            </div>
            <div className="hover-lift">
              <AchievementSystem />
            </div>
            <div className="hover-lift">
              <FriendsWidget />
            </div>
            <div className="hover-lift">
              <SeasonalEvents />
            </div>
            <div className="hover-lift">
              <DonationWidget />
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

      {/* Campaigns Section */}
      <section className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        <CampaignsCarousel campaigns={campaigns} title="Active Campaigns" />
      </section>

      {/* Fundraisers Section */}
      <section className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        <FundraisersCarousel fundraisers={fundraisers} title="Long-term Fundraisers" />
      </section>

      {/* Business Partners Section */}
      <div className="max-w-full overflow-x-hidden">
        <BusinessSection />
      </div>

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
      <FloatingDonationWidget />
    </div>
  );
};

export default Index;

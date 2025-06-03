
import React from 'react';
import LiveVideo from '@/components/LiveVideo';
import Leaderboard from '@/components/Leaderboard';
import DonationWidget from '@/components/DonationWidget';
import FloatingDonationButton from '@/components/FloatingDonationButton';
import CharityPartners from '@/components/CharityPartners';
import LiveFeed from '@/components/LiveFeed';
import UserStats from '@/components/UserStats';
import PersonalLeagueWidget from '@/components/PersonalLeagueWidget';
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
import BusinessAdvert from '@/components/BusinessAdvert';
import LeagueTablesCarousel from '@/components/LeagueTablesCarousel';
import DonationProducts from '@/components/DonationProducts';

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
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <StickyDonationWidget />
      
      {/* Main Content - Video Section */}
      <section className="w-full max-w-full overflow-x-hidden">
        <div className="grid lg:grid-cols-3 gap-6 max-w-full overflow-x-hidden p-4">
          {/* Live Stream - Main Column */}
          <div className="lg:col-span-2 max-w-full overflow-x-hidden space-y-6">
            {/* Video Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover-lift max-w-full overflow-x-hidden">
              <LiveVideo />
            </div>
            
            {/* Charity Ticker Block */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-xl shadow-lg p-6 max-w-full overflow-x-hidden">
              <CharityTicker />
            </div>
            
            {/* League Tables Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-full overflow-x-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Rankings</h3>
              <LeagueTablesCarousel />
            </div>
            
            {/* Charity Feed Block */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 hover-lift max-w-full overflow-x-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Latest Updates</h3>
              <CharityFeedSection />
            </div>

            {/* Business Advertisement Block */}
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl shadow-lg p-6 hover-lift max-w-full overflow-x-hidden">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Featured Partner</h3>
              <BusinessAdvert />
            </div>
            
            {/* Live Feed Block */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover-lift max-w-full overflow-x-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Activity</h3>
              <LiveFeed />
            </div>
          </div>

          {/* Sidebar - Better organized blocks */}
          <div className="space-y-4 max-w-full overflow-x-hidden">
            {/* User Stats Block */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <UserStats />
            </div>
            
            {/* Quick Actions Block */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl shadow-lg p-4 space-y-4">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Quick Actions</h4>
              <MatchingPoolWidget />
              <StreakWidget />
            </div>
            
            {/* Community Block */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-xl shadow-lg p-4 space-y-4">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Your Community</h4>
              <PersonalLeagueWidget />
              <FriendsWidget />
            </div>
            
            {/* Achievements Block */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl shadow-lg p-4 space-y-4">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Progress & Rewards</h4>
              <AchievementSystem />
              <SeasonalEvents />
            </div>
            
            {/* Donation Options Block */}
            <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl shadow-lg p-4 space-y-4">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Donation Options</h4>
              <DonationWidget />
              <InMemoryOfWidget />
            </div>
            
            {/* Leaderboard Block */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl shadow-lg p-4">
              <h4 className="font-bold text-gray-900 text-lg mb-3">Top Donors</h4>
              <Leaderboard />
            </div>
          </div>
        </div>
      </section>

      {/* Donation Products Section */}
      <section className="bg-white py-12 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop for Good</h2>
            <p className="text-gray-600 text-lg">Purchase items that make a difference</p>
          </div>
          <DonationProducts />
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Urgent Campaigns</h2>
              <p className="text-gray-600 text-lg">Help those in immediate need</p>
            </div>
            <CampaignsCarousel campaigns={campaigns} title="" />
          </div>
        </div>
      </section>

      {/* Fundraisers Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Long-term Projects</h2>
              <p className="text-gray-600 text-lg">Support sustainable development</p>
            </div>
            <FundraisersCarousel fundraisers={fundraisers} title="" />
          </div>
        </div>
      </section>

      {/* Business Partners Section */}
      <section className="bg-gradient-to-r from-gray-100 to-blue-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Partners</h2>
              <p className="text-gray-600 text-lg">Companies making a difference</p>
            </div>
            <BusinessSection />
          </div>
        </div>
      </section>

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-emerald-100 to-green-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <CharityPartners />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-6">
              Why Choose Donate Feels Great?
            </h3>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto leading-relaxed">
              Our platform combines the spiritual reward of giving with engaging features that make charity 
              <span className="text-yellow-300 font-semibold"> meaningful and rewarding</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl">
                🎯
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white">Gamified Giving</h4>
              <p className="text-indigo-100 text-lg leading-relaxed">Earn points, badges, and compete with your community while doing good!</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl">
                🏆
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white">League Tables</h4>
              <p className="text-indigo-100 text-lg leading-relaxed">See how your city, mosque, and community rank in giving!</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl shadow-xl">
                📺
              </div>
              <h4 className="font-bold text-2xl mb-4 text-white">Live Impact</h4>
              <p className="text-indigo-100 text-lg leading-relaxed">Watch your donations make a real difference in real-time!</p>
            </div>
          </div>

          {/* Stats section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center shadow-2xl border border-white/20">
            <h4 className="text-3xl font-bold text-white mb-8">Community Impact</h4>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">1,247</div>
                <div className="text-white/90 font-medium text-lg">Active Donors</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">£50K</div>
                <div className="text-white/90 font-medium text-lg">Raised Today</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">28</div>
                <div className="text-white/90 font-medium text-lg">Cities Competing</div>
              </div>
              <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-white/90 font-medium text-lg">Satisfaction Rate</div>
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

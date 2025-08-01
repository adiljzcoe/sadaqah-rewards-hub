
import React from 'react';
import Header from '@/components/Header';
import SpiritualActivitiesMenu from '@/components/SpiritualActivitiesMenu';
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
import FloatingTabWidget from '@/components/FloatingTabWidget';
import { useTranslation } from '@/contexts/TranslationContext';
import { useContent, ContentItem } from '@/hooks/useAppConfig';
import { getContent } from '@/utils/configHelpers';

const Index = () => {
  const { t, language } = useTranslation();
  const { data: content = [] } = useContent();

  console.log('Index page rendered with language:', language);
  console.log('Translation test for "why_choose_title":', t('why_choose_title'));

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 overflow-x-hidden">
      <Header />
      <SpiritualActivitiesMenu />
      <StickyDonationWidget />
      
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
        <CampaignsCarousel 
          campaigns={campaigns} 
          title={getContent(content as ContentItem[], 'active_campaigns', t('active_campaigns'))} 
        />
      </section>

      {/* Fundraisers Section */}
      <section className="container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        <FundraisersCarousel 
          fundraisers={fundraisers} 
          title={getContent(content as ContentItem[], 'long_term_fundraisers', t('long_term_fundraisers'))} 
        />
      </section>

      {/* Charity Partners Section */}
      <section className="bg-gradient-to-r from-white to-blue-50/50 py-16 max-w-full overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full overflow-x-hidden">
          <CharityPartners />
        </div>
      </section>

      {/* Features Section - Updated to use dynamic content */}
      <section className="container mx-auto px-4 py-16 max-w-full overflow-x-hidden">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {getContent(content as ContentItem[], 'why_choose_title', t('why_choose_title'))}
          </h3>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {getContent(content as ContentItem[], 'why_choose_subtitle', t('why_choose_subtitle'))}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="vibrant-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              🎯
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">
              {getContent(content as ContentItem[], 'gamified_giving', t('gamified_giving'))}
            </h4>
            <p className="text-gray-600">
              {getContent(content as ContentItem[], 'gamified_giving_desc', t('gamified_giving_desc'))}
            </p>
          </div>
          
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="accent-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              🏆
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">
              {getContent(content as ContentItem[], 'league_tables', t('league_tables'))}
            </h4>
            <p className="text-gray-600">
              {getContent(content as ContentItem[], 'league_tables_desc', t('league_tables_desc'))}
            </p>
          </div>
          
          <div className="text-center p-8 professional-card rounded-xl hover-lift">
            <div className="purple-gradient w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-lg">
              📺
            </div>
            <h4 className="font-semibold text-xl mb-4 text-gray-900">
              {getContent(content as ContentItem[], 'live_impact', t('live_impact'))}
            </h4>
            <p className="text-gray-600">
              {getContent(content as ContentItem[], 'live_impact_desc', t('live_impact_desc'))}
            </p>
          </div>
        </div>

        {/* Stats section - Updated to use dynamic content */}
        <div className="mt-16 vibrant-gradient rounded-xl p-8 text-center shadow-xl">
          <h4 className="text-2xl font-bold text-white mb-6">
            {getContent(content as ContentItem[], 'community_impact', t('community_impact'))}
          </h4>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">1,247</div>
              <div className="text-white/90 font-medium">
                {getContent(content as ContentItem[], 'active_donors', t('active_donors'))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">£50K</div>
              <div className="text-white/90 font-medium">
                {getContent(content as ContentItem[], 'raised_today', t('raised_today'))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">28</div>
              <div className="text-white/90 font-medium">
                {getContent(content as ContentItem[], 'cities_competing', t('cities_competing'))}
              </div>
            </div>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm border border-white/10">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-white/90 font-medium">
                {getContent(content as ContentItem[], 'satisfaction_rate', t('satisfaction_rate'))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingDonationButton />
      <FloatingTabWidget />
    </div>
  );
};

export default Index;

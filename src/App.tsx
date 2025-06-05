import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { CurrencyProvider } from '@/hooks/useCurrency';
import { Toaster } from '@/components/ui/toaster';
import Home from '@/pages/Home';
import AuthPage from '@/pages/AuthPage';
import ProfilePage from '@/pages/ProfilePage';
import AdminDashboard from '@/pages/AdminDashboard';
import CheckoutPage from '@/pages/CheckoutPage';
import WhyDonatePage from '@/pages/WhyDonatePage';
import LiveFeedPage from '@/pages/LiveFeedPage';
import FundraisingPage from '@/pages/FundraisingPage';
import CharityPartnersPage from '@/pages/CharityPartnersPage';
import DuasLibraryPage from '@/pages/DuasLibraryPage';
import BusinessProfilePage from '@/pages/BusinessProfilePage';
import CharityProfilePage from '@/pages/CharityProfilePage';
import MembershipPage from '@/pages/MembershipPage';
import SadaqahCoinsPage from '@/pages/SadaqahCoinsPage';
import MasjidCommunityPage from '@/pages/MasjidCommunityPage';
import MyUmmahPage from '@/pages/MyUmmahPage';
import LeaderboardsPage from '@/pages/LeaderboardsPage';
import IslamicCalendarPage from '@/pages/IslamicCalendarPage';
import RamadanCalendarPage from '@/pages/RamadanCalendarPage';
import AdhanCommunityPage from '@/pages/AdhanCommunityPage';
import LiveTVPage from '@/pages/LiveTVPage';
import DhikrCommunityPage from '@/pages/DhikrCommunityPage';
import PrayerTimesPage from '@/pages/PrayerTimesPage';
import QuranReaderPage from '@/pages/QuranReaderPage';
import ZakatCalculatorPage from '@/pages/ZakatCalculatorPage';
import DuaWallPage from '@/pages/DuaWallPage';
import CampaignsPage from '@/pages/CampaignsPage';
import BuildMosquePage from '@/pages/BuildMosquePage';
import WaterWellsPage from '@/pages/WaterWellsPage';
import OrphanagesPage from '@/pages/OrphanagesPage';
import QurbaniPage from '@/pages/QurbaniPage';
import NotFoundPage from '@/pages/NotFoundPage';
import CharityPartnerPage from '@/pages/CharityPartnerPage';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrencyProvider>
          <Toaster />
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/why-donate" element={<WhyDonatePage />} />
                <Route path="/live-feed" element={<LiveFeedPage />} />
                <Route path="/fundraising" element={<FundraisingPage />} />
                <Route path="/charity-partners" element={<CharityPartnersPage />} />
                <Route path="/duas-library" element={<DuasLibraryPage />} />
                <Route path="/business-profile" element={<BusinessProfilePage />} />
                <Route path="/charity-profile" element={<CharityProfilePage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/sadaqah-coins" element={<SadaqahCoinsPage />} />
                <Route path="/masjid-community" element={<MasjidCommunityPage />} />
                <Route path="/my-ummah" element={<MyUmmahPage />} />
                <Route path="/leaderboards" element={<LeaderboardsPage />} />
                <Route path="/islamic-calendar" element={<IslamicCalendarPage />} />
                <Route path="/ramadan-calendar" element={<RamadanCalendarPage />} />
                <Route path="/adhan-community" element={<AdhanCommunityPage />} />
                <Route path="/live-tv" element={<LiveTVPage />} />
                <Route path="/dhikr-community" element={<DhikrCommunityPage />} />
                <Route path="/namaz-times" element={<PrayerTimesPage />} />
                <Route path="/quran-reader" element={<QuranReaderPage />} />
                <Route path="/zakat-calculator" element={<ZakatCalculatorPage />} />
                <Route path="/dua-wall" element={<DuaWallPage />} />
                <Route path="/campaigns" element={<CampaignsPage />} />
                <Route path="/build-mosque" element={<BuildMosquePage />} />
                <Route path="/water-wells" element={<WaterWellsPage />} />
                <Route path="/orphanages" element={<OrphanagesPage />} />
                <Route path="/qurbani" element={<QurbaniPage />} />
                <Route path="*" element={<NotFoundPage />} />
                
                {/* Add charity partner route */}
                <Route path="/charity/:slug" element={<CharityPartnerPage />} />
                
              </Routes>
            </div>
          </Router>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

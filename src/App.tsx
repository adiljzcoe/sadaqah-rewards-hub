
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/hooks/useAuth';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { CartProvider } from '@/hooks/useCart';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Auth from '@/pages/Auth';
import Profile from '@/pages/Profile';
import AdminDashboard from '@/pages/AdminDashboard';
import Checkout from '@/pages/Checkout';
import WhyDonate from '@/pages/WhyDonate';
import LiveFeed from '@/pages/LiveFeed';
import Fundraising from '@/pages/Fundraising';
import CharityPartnersPublic from '@/pages/CharityPartnersPublic';
import DuasLibrary from '@/pages/DuasLibrary';
import BusinessProfile from '@/pages/BusinessProfile';
import CharityProfile from '@/pages/CharityProfile';
import Membership from '@/pages/Membership';
import SadaqahCoins from '@/pages/SadaqahCoins';
import MasjidCommunity from '@/pages/MasjidCommunity';
import MyUmmah from '@/pages/MyUmmah';
import Leaderboards from '@/pages/Leaderboards';
import IslamicCalendar from '@/pages/IslamicCalendar';
import RamadanCalendar from '@/pages/RamadanCalendar';
import AdhanCommunity from '@/pages/AdhanCommunity';
import LiveTV from '@/pages/LiveTV';
import DhikrCommunity from '@/pages/DhikrCommunity';
import NamazTimes from '@/pages/NamazTimes';
import QuranReader from '@/pages/QuranReader';
import ZakatCalculator from '@/pages/ZakatCalculator';
import DuaWall from '@/pages/DuaWall';
import Campaigns from '@/pages/Campaigns';
import BuildMosque from '@/pages/BuildMosque';
import WaterWells from '@/pages/WaterWells';
import Orphanages from '@/pages/Orphanages';
import Qurbani from '@/pages/Qurbani';
import NotFound from '@/pages/NotFound';
import CharityPartnerPage from '@/pages/CharityPartnerPage';
import CharityPartnerProgram from '@/pages/CharityPartnerProgram';

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
          <CartProvider>
            <Toaster />
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/why-donate" element={<WhyDonate />} />
                  <Route path="/live-feed" element={<LiveFeed />} />
                  <Route path="/fundraising" element={<Fundraising />} />
                  <Route path="/charity-partners" element={<CharityPartnersPublic />} />
                  <Route path="/charity-partner-program" element={<CharityPartnerProgram />} />
                  <Route path="/duas-library" element={<DuasLibrary />} />
                  <Route path="/business-profile" element={<BusinessProfile />} />
                  <Route path="/charity-profile" element={<CharityProfile />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
                  <Route path="/masjid-community" element={<MasjidCommunity />} />
                  <Route path="/my-ummah" element={<MyUmmah />} />
                  <Route path="/leaderboards" element={<Leaderboards />} />
                  <Route path="/islamic-calendar" element={<IslamicCalendar />} />
                  <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
                  <Route path="/adhan-community" element={<AdhanCommunity />} />
                  <Route path="/live-tv" element={<LiveTV />} />
                  <Route path="/dhikr-community" element={<DhikrCommunity />} />
                  <Route path="/namaz-times" element={<NamazTimes />} />
                  <Route path="/quran-reader" element={<QuranReader />} />
                  <Route path="/zakat-calculator" element={<ZakatCalculator />} />
                  <Route path="/dua-wall" element={<DuaWall />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/build-mosque" element={<BuildMosque />} />
                  <Route path="/water-wells" element={<WaterWells />} />
                  <Route path="/orphanages" element={<Orphanages />} />
                  <Route path="/qurbani" element={<Qurbani />} />
                  <Route path="*" element={<NotFound />} />
                  
                  {/* Add charity partner route */}
                  <Route path="/charity/:slug" element={<CharityPartnerPage />} />
                  
                </Routes>
              </div>
            </Router>
          </CartProvider>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

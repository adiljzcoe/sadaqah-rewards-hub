
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Header from './components/Header';
import Index from './pages/Index';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import LiveTV from './pages/LiveTV';
import RamadanCalendar from './pages/RamadanCalendar';
import IslamicCalendar from './pages/IslamicCalendar';
import IslamicEventPage from './components/islamic-calendar/IslamicEventPage';
import AdhanCommunity from './pages/AdhanCommunity';
import NamazTimes from './pages/NamazTimes';
import QuranReader from './pages/QuranReader';
import ZakatCalculator from './pages/ZakatCalculator';
import DuaWall from './pages/DuaWall';
import Campaigns from './pages/Campaigns';
import BuildMosque from './pages/BuildMosque';
import WaterWells from './pages/WaterWells';
import Orphanages from './pages/Orphanages';
import Qurbani from './pages/Qurbani';
import MasjidCommunity from './pages/MasjidCommunity';
import MyUmmah from './pages/MyUmmah';
import Leaderboards from './pages/Leaderboards';
import DhikrCommunity from './pages/DhikrCommunity';
import SadaqahCoins from './pages/SadaqahCoins';
import MyJannah from './pages/MyJannah';
import Membership from './pages/Membership';
import GiftCards from './pages/GiftCards';
import PrayForPalestine from './pages/PrayForPalestine';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Islamic Life Routes */}
            <Route path="/live-tv" element={<LiveTV />} />
            <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
            <Route path="/islamic-calendar" element={<IslamicCalendar />} />
            <Route path="/islamic-calendar/:slug" element={<IslamicEventPage />} />
            <Route path="/adhan-community" element={<AdhanCommunity />} />
            
            {/* Tools Routes */}
            <Route path="/namaz-times" element={<NamazTimes />} />
            <Route path="/quran-reader" element={<QuranReader />} />
            <Route path="/zakat-calculator" element={<ZakatCalculator />} />
            <Route path="/dua-wall" element={<DuaWall />} />
            <Route path="/pray-for-palestine" element={<PrayForPalestine />} />
            
            {/* Donation Routes */}
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/build-mosque" element={<BuildMosque />} />
            <Route path="/water-wells" element={<WaterWells />} />
            <Route path="/orphanages" element={<Orphanages />} />
            <Route path="/qurbani" element={<Qurbani />} />
            
            {/* Community Routes */}
            <Route path="/masjid-community" element={<MasjidCommunity />} />
            <Route path="/my-ummah" element={<MyUmmah />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/dhikr-community" element={<DhikrCommunity />} />
            
            {/* Rewards Routes */}
            <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
            <Route path="/my-jannah" element={<MyJannah />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            
            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

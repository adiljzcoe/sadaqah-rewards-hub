import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Index from './pages/Index';
import About from './pages/About';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Blog from './pages/Blog';
import Leaderboards from './pages/Leaderboards';
import Campaigns from './pages/Campaigns';
import CharityProfile from './pages/CharityProfile';
import CharityPartnersPublic from './pages/CharityPartnersPublic';
import BusinessProfile from './pages/BusinessProfile';
import WhyDonate from './pages/WhyDonate';
import Checkout from './pages/Checkout';
import MyJannah from './pages/MyJannah';
import MyUmmah from './pages/MyUmmah';
import QuranReader from './pages/QuranReader';
import Membership from './pages/Membership';
import AdminDashboard from './pages/AdminDashboard';
import SadaqahCoins from './pages/SadaqahCoins';
import DuaWall from './pages/DuaWall';
import DhikrCommunity from './pages/DhikrCommunity';
import MasjidCommunity from './pages/MasjidCommunity';
import WaterWells from './pages/WaterWells';
import Orphanages from './pages/Orphanages';
import Qurbani from './pages/Qurbani';
import ZakatCalculator from './pages/ZakatCalculator';
import LiveFeed from './pages/LiveFeed';
import RamadanCalendar from './pages/RamadanCalendar';
import NamazTimes from './pages/NamazTimes';
import BuildMosque from './pages/BuildMosque';
import GiftCards from './pages/GiftCards';
import Live from './pages/LiveTV';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/my-jannah" element={<MyJannah />} />
            <Route path="/my-ummah" element={<MyUmmah />} />
            <Route path="/quran-reader" element={<QuranReader />} />
            <Route path="/live-tv" element={<Live />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
            <Route path="/dua-wall" element={<DuaWall />} />
            <Route path="/dhikr-community" element={<DhikrCommunity />} />
            <Route path="/masjid-community" element={<MasjidCommunity />} />
            <Route path="/water-wells" element={<WaterWells />} />
            <Route path="/orphanages" element={<Orphanages />} />
            <Route path="/qurbani" element={<Qurbani />} />
            <Route path="/zakat-calculator" element={<ZakatCalculator />} />
            <Route path="/live-feed" element={<LiveFeed />} />
            <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
            <Route path="/namaz-times" element={<NamazTimes />} />
            <Route path="/build-mosque" element={<BuildMosque />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/leaderboards" element={<Leaderboards />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/charity-profile" element={<CharityProfile />} />
            <Route path="/charity-partners" element={<CharityPartnersPublic />} />
            <Route path="/business-profile" element={<BusinessProfile />} />
            <Route path="/why-donate" element={<WhyDonate />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer>
          {/* You can add a common footer here if needed */}
        </footer>
      </div>
    </Router>
  );
}

export default App;

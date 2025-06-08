
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import AdminDashboard from '@/pages/AdminDashboard';
import QuranReader from '@/pages/QuranReader';
import NamazTimes from '@/pages/NamazTimes';
import ZakatCalculator from '@/pages/ZakatCalculator';
import DuasLibrary from '@/pages/DuasLibrary';
import IslamicCalendar from '@/pages/IslamicCalendar';
import MasjidManagement from '@/pages/MasjidManagement';
import Profile from '@/pages/Profile';
import Auth from '@/pages/Auth';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const SiteWrapper: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/quran" element={<QuranReader />} />
            <Route path="/namaz" element={<NamazTimes />} />
            <Route path="/zakat" element={<ZakatCalculator />} />
            <Route path="/duas" element={<DuasLibrary />} />
            <Route path="/calendar" element={<IslamicCalendar />} />
            <Route path="/masjid" element={<MasjidManagement />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import MyJannah from "./pages/MyJannah";
import MyUmmah from "./pages/MyUmmah";
import Leaderboards from "./pages/Leaderboards";
import QuranReader from "./pages/QuranReader";
import NamazTimes from "./pages/NamazTimes";
import ZakatCalculator from "./pages/ZakatCalculator";
import DhikrCommunity from "./pages/DhikrCommunity";
import DuaWall from "./pages/DuaWall";
import DuasLibrary from "./pages/DuasLibrary";
import LiveFeed from "./pages/LiveFeed";
import RamadanCalendar from "./pages/RamadanCalendar";
import IslamicCalendar from "./pages/IslamicCalendar";
import SadaqahCoins from "./pages/SadaqahCoins";
import WaterWells from "./pages/WaterWells";
import Orphanages from "./pages/Orphanages";
import DonateToPalestine from "./pages/DonateToPalestine";
import PrayForPalestine from "./pages/PrayForPalestine";
import WhyDonate from "./pages/WhyDonate";
import Campaigns from "./pages/Campaigns";
import Fundraising from "./pages/Fundraising";
import GiftCards from "./pages/GiftCards";
import CharityPartnersPublic from "./pages/CharityPartnersPublic";
import CharityPartnerProgram from "./pages/CharityPartnerProgram";
import CharityPartnerPage from "./pages/CharityPartnerPage";
import CharitySubdomainPage from "./pages/CharitySubdomainPage";
import CharityProfile from "./pages/CharityProfile";
import BusinessProfile from "./pages/BusinessProfile";
import Checkout from "./pages/Checkout";
import MasjidCommunity from "./pages/MasjidCommunity";
import AdhanCommunity from "./pages/AdhanCommunity";
import Membership from "./pages/Membership";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Qurbani from "./pages/Qurbani";
import LiveTV from "./pages/LiveTV";
import BuildMosque from "./pages/BuildMosque";
import PushNotificationTest from "./pages/PushNotificationTest";
import AdminDashboard from "./pages/AdminDashboard";
import MasjidManagement from "./pages/MasjidManagement";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/my-jannah" element={<ProtectedRoute><MyJannah /></ProtectedRoute>} />
                <Route path="/my-ummah" element={<ProtectedRoute><MyUmmah /></ProtectedRoute>} />
                <Route path="/leaderboards" element={<Leaderboards />} />
                <Route path="/quran-reader" element={<QuranReader />} />
                <Route path="/namaz-times" element={<NamazTimes />} />
                <Route path="/zakat-calculator" element={<ZakatCalculator />} />
                <Route path="/dhikr-community" element={<DhikrCommunity />} />
                <Route path="/dua-wall" element={<DuaWall />} />
                <Route path="/duas-library" element={<DuasLibrary />} />
                <Route path="/live-feed" element={<LiveFeed />} />
                <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
                <Route path="/islamic-calendar" element={<IslamicCalendar />} />
                <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
                <Route path="/water-wells" element={<WaterWells />} />
                <Route path="/orphanages" element={<Orphanages />} />
                <Route path="/donate-to-palestine" element={<DonateToPalestine />} />
                <Route path="/pray-for-palestine" element={<PrayForPalestine />} />
                <Route path="/why-donate" element={<WhyDonate />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/fundraising" element={<Fundraising />} />
                <Route path="/gift-cards" element={<GiftCards />} />
                <Route path="/charity-partners" element={<CharityPartnersPublic />} />
                <Route path="/charity-partner-program" element={<CharityPartnerProgram />} />
                <Route path="/charity/:slug" element={<CharityPartnerPage />} />
                <Route path="/charity-subdomain/:slug" element={<CharitySubdomainPage />} />
                <Route path="/charity-profile" element={<ProtectedRoute><CharityProfile /></ProtectedRoute>} />
                <Route path="/business-profile" element={<ProtectedRoute><BusinessProfile /></ProtectedRoute>} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/masjid-community" element={<MasjidCommunity />} />
                <Route path="/adhan-community" element={<AdhanCommunity />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/qurbani" element={<Qurbani />} />
                <Route path="/live-tv" element={<LiveTV />} />
                <Route path="/build-mosque" element={<BuildMosque />} />
                <Route path="/push-test" element={<PushNotificationTest />} />
                <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/masjid-management" element={<ProtectedRoute><MasjidManagement /></ProtectedRoute>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { CartProvider } from "@/hooks/useCart";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import Header from "./components/Header";
import Index from "./pages/Index";
import About from "./pages/About";
import ZakatCalculator from "./pages/ZakatCalculator";
import QuranReader from "./pages/QuranReader";
import DuasLibrary from "./pages/DuasLibrary";
import IslamicCalendar from "./pages/IslamicCalendar";
import IslamicEventPage from "./components/islamic-calendar/IslamicEventPage";
import RamadanCalendar from "./pages/RamadanCalendar";
import NamazTimes from "./pages/NamazTimes";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import MyJannah from "./pages/MyJannah";
import SadaqahCoins from "./pages/SadaqahCoins";
import Leaderboards from "./pages/Leaderboards";
import Fundraising from "./pages/Fundraising";
import Campaigns from "./pages/Campaigns";
import Orphanages from "./pages/Orphanages";
import WaterWells from "./pages/WaterWells";
import BuildMosque from "./pages/BuildMosque";
import DonateToPalestine from "./pages/DonateToPalestine";
import PrayForPalestine from "./pages/PrayForPalestine";
import Qurbani from "./pages/Qurbani";
import WhyDonate from "./pages/WhyDonate";
import CharityProfile from "./pages/CharityProfile";
import BusinessProfile from "./pages/BusinessProfile";
import CharityPartnersPublic from "./pages/CharityPartnersPublic";
import Blog from "./pages/Blog";
import LiveFeed from "./pages/LiveFeed";
import LiveTV from "./pages/LiveTV";
import Checkout from "./pages/Checkout";
import GiftCards from "./pages/GiftCards";
import Membership from "./pages/Membership";
import MasjidCommunity from "./pages/MasjidCommunity";
import DuaWall from "./pages/DuaWall";
import AdhanCommunity from "./pages/AdhanCommunity";
import MyUmmah from "./pages/MyUmmah";
import DhikrCommunity from "./pages/DhikrCommunity";
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
            <CurrencyProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <div className="min-h-screen bg-background flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/zakat-calculator" element={<ZakatCalculator />} />
                      <Route path="/quran-reader" element={<QuranReader />} />
                      <Route path="/duas-library" element={<DuasLibrary />} />
                      <Route path="/islamic-calendar" element={<IslamicCalendar />} />
                      <Route path="/islamic-calendar/:eventSlug" element={<IslamicEventPage />} />
                      <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
                      <Route path="/namaz-times" element={<NamazTimes />} />
                      <Route path="/fundraising" element={<Fundraising />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/orphanages" element={<Orphanages />} />
                      <Route path="/water-wells" element={<WaterWells />} />
                      <Route path="/build-mosque" element={<BuildMosque />} />
                      <Route path="/donate-to-palestine" element={<DonateToPalestine />} />
                      <Route path="/pray-for-palestine" element={<PrayForPalestine />} />
                      <Route path="/qurbani" element={<Qurbani />} />
                      <Route path="/why-donate" element={<WhyDonate />} />
                      <Route path="/charity/:id" element={<CharityProfile />} />
                      <Route path="/business/:id" element={<BusinessProfile />} />
                      <Route path="/charity-partners" element={<CharityPartnersPublic />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<Blog />} />
                      <Route path="/live-feed" element={<LiveFeed />} />
                      <Route path="/live-tv" element={<LiveTV />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/gift-cards" element={<GiftCards />} />
                      <Route path="/membership" element={<Membership />} />
                      <Route path="/masjid-community" element={<MasjidCommunity />} />
                      <Route path="/dua-wall" element={<DuaWall />} />
                      <Route path="/adhan-community" element={<AdhanCommunity />} />
                      <Route path="/my-ummah" element={<MyUmmah />} />
                      <Route path="/dhikr-community" element={<DhikrCommunity />} />
                      
                      {/* Protected Routes */}
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/admin-dashboard" element={
                        <ProtectedRoute>
                          <AdminDashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/my-jannah" element={
                        <ProtectedRoute>
                          <MyJannah />
                        </ProtectedRoute>
                      } />
                      <Route path="/sadaqah-coins" element={
                        <ProtectedRoute>
                          <SadaqahCoins />
                        </ProtectedRoute>
                      } />
                      <Route path="/leaderboards" element={
                        <ProtectedRoute>
                          <Leaderboards />
                        </ProtectedRoute>
                      } />
                      
                      {/* 404 Route */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </div>
              </BrowserRouter>
            </CurrencyProvider>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

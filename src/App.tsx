import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Profile = lazy(() => import("./pages/Profile"));
const BuildMosque = lazy(() => import("./pages/BuildMosque"));
const WaterWells = lazy(() => import("./pages/WaterWells"));
const Orphanages = lazy(() => import("./pages/Orphanages"));
const MyJannah = lazy(() => import("./pages/MyJannah"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const Leaderboards = lazy(() => import("./pages/Leaderboards"));
const About = lazy(() => import("./pages/About"));
const SadaqahCoins = lazy(() => import("./pages/SadaqahCoins"));
const Membership = lazy(() => import("./pages/Membership"));
const LiveFeed = lazy(() => import("./pages/LiveFeed"));
const CharityPartnersPublic = lazy(() => import("./pages/CharityPartnersPublic"));
const Blog = lazy(() => import("./pages/Blog"));
const WhyDonate = lazy(() => import("./pages/WhyDonate"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CharityProfile = lazy(() => import("./pages/CharityProfile"));
const BusinessProfile = lazy(() => import("./pages/BusinessProfile"));
const Auth = lazy(() => import("./pages/Auth"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const MasjidCommunity = lazy(() => import("./pages/MasjidCommunity"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));
const Qurbani = lazy(() => import("./pages/Qurbani"));
const RamadanCalendar = lazy(() => import("./pages/RamadanCalendar"));
const DhikrCommunity = lazy(() => import("./pages/DhikrCommunity"));
const QuranReader = lazy(() => import("./pages/QuranReader"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <Suspense fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                </div>
              }>
                <Routes>
                  <Route path="/auth" element={<Auth />} />
                  <Route path="*" element={
                    <>
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<Index />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/blog" element={<Blog />} />
                          <Route path="/why-donate" element={<WhyDonate />} />
                          <Route path="/charities" element={<CharityPartnersPublic />} />
                          <Route path="/charity/:id" element={<CharityProfile />} />
                          <Route path="/business/:id" element={<BusinessProfile />} />
                          <Route path="/campaigns" element={<Campaigns />} />
                          <Route path="/leaderboards" element={<Leaderboards />} />
                          <Route path="/live" element={<LiveFeed />} />
                          <Route path="/gift-cards" element={<GiftCards />} />
                          <Route path="/zakat-calculator" element={<ZakatCalculator />} />
                          <Route path="/qurbani" element={<Qurbani />} />
                          <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
                          <Route path="/dhikr-community" element={<DhikrCommunity />} />
                          <Route path="/quran-reader" element={<QuranReader />} />
                          
                          {/* Protected Routes */}
                          <Route path="/profile" element={
                            <ProtectedRoute>
                              <Profile />
                            </ProtectedRoute>
                          } />
                          <Route path="/masjid-community" element={
                            <ProtectedRoute>
                              <MasjidCommunity />
                            </ProtectedRoute>
                          } />
                          <Route path="/build-mosque" element={
                            <ProtectedRoute>
                              <BuildMosque />
                            </ProtectedRoute>
                          } />
                          <Route path="/water-wells" element={
                            <ProtectedRoute>
                              <WaterWells />
                            </ProtectedRoute>
                          } />
                          <Route path="/orphanages" element={
                            <ProtectedRoute>
                              <Orphanages />
                            </ProtectedRoute>
                          } />
                          <Route path="/my-jannah" element={
                            <ProtectedRoute>
                              <MyJannah />
                            </ProtectedRoute>
                          } />
                          <Route path="/coins" element={
                            <ProtectedRoute>
                              <SadaqahCoins />
                            </ProtectedRoute>
                          } />
                          <Route path="/membership" element={
                            <ProtectedRoute>
                              <Membership />
                            </ProtectedRoute>
                          } />
                          <Route path="/checkout" element={
                            <ProtectedRoute>
                              <Checkout />
                            </ProtectedRoute>
                          } />
                          
                          {/* Admin Routes */}
                          <Route path="/admin" element={<AdminDashboard />} />
                          
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </main>
                    </>
                  } />
                </Routes>
              </Suspense>
            </div>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

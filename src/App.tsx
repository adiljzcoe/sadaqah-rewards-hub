
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/use-theme";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import MasjidCommunity from '@/pages/MasjidCommunity';

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
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <Suspense fallback={
                  <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
                  </div>
                }>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/why-donate" element={<WhyDonate />} />
                    <Route path="/water-wells" element={<WaterWells />} />
                    <Route path="/orphanages" element={<Orphanages />} />
                    <Route path="/build-mosque" element={<BuildMosque />} />
                    <Route path="/campaigns" element={<Campaigns />} />
                    <Route path="/leaderboards" element={<Leaderboards />} />
                    <Route path="/live-feed" element={<LiveFeed />} />
                    <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
                    <Route path="/my-jannah" element={<MyJannah />} />
                    <Route path="/charity-partners" element={<CharityPartnersPublic />} />
                    <Route path="/charity/:id" element={<CharityProfile />} />
                    <Route path="/business/:id" element={<BusinessProfile />} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/gift-cards" element={<GiftCards />} />
                    <Route path="/membership" element={<Membership />} />
                    <Route path="/masjid-community" element={<ProtectedRoute><MasjidCommunity /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </div>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

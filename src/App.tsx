
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { TranslationProvider } from "@/contexts/TranslationContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/hooks/useCart";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import LoadingBoundary from "@/components/common/LoadingBoundary";
import MaintenanceMode from "@/components/ui/maintenance-mode";
import ProtectedRoute from "@/components/ui/protected-route";
import { appConfig } from "@/config/app.config";
import logger from "@/utils/logger";

// Lazy load pages for better performance
import { lazy, Suspense } from "react";

const Index = lazy(() => import("./pages/Index"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const BusinessLeagues = lazy(() => import("./pages/BusinessLeagues"));
const About = lazy(() => import("./pages/About"));
const AdhanCommunity = lazy(() => import("./pages/AdhanCommunity"));
const Auth = lazy(() => import("./pages/Auth"));
const Blog = lazy(() => import("./pages/Blog"));
const BuildMosque = lazy(() => import("./pages/BuildMosque"));
const BusinessProfile = lazy(() => import("./pages/BusinessProfile"));
const Campaigns = lazy(() => import("./pages/Campaigns"));
const CharityPartnerPage = lazy(() => import("./pages/CharityPartnerPage"));
const CharityPartnerProgram = lazy(() => import("./pages/CharityPartnerProgram"));
const CharityPartnersPublic = lazy(() => import("./pages/CharityPartnersPublic"));
const CharityProfile = lazy(() => import("./pages/CharityProfile"));
const CharitySubdomainPage = lazy(() => import("./pages/CharitySubdomainPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const DhikrCommunity = lazy(() => import("./pages/DhikrCommunity"));
const DonateToPalestine = lazy(() => import("./pages/DonateToPalestine"));
const DuaWall = lazy(() => import("./pages/DuaWall"));
const DuasLibrary = lazy(() => import("./pages/DuasLibrary"));
const Fundraising = lazy(() => import("./pages/Fundraising"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const IslamicCalendar = lazy(() => import("./pages/IslamicCalendar"));
const IslamicHistory = lazy(() => import("./pages/IslamicHistory"));
const Leaderboards = lazy(() => import("./pages/Leaderboards"));
const LiveFeed = lazy(() => import("./pages/LiveFeed"));
const LiveTV = lazy(() => import("./pages/LiveTV"));
const MasjidCommunity = lazy(() => import("./pages/MasjidCommunity"));
const MasjidManagement = lazy(() => import("./pages/MasjidManagement"));
const Membership = lazy(() => import("./pages/Membership"));
const MosqueLeagues = lazy(() => import("./pages/MosqueLeagues"));
const MyJannah = lazy(() => import("./pages/MyJannah"));
const MyMasjid = lazy(() => import("./pages/MyMasjid"));
const MyUmmah = lazy(() => import("./pages/MyUmmah"));
const NamazTimes = lazy(() => import("./pages/NamazTimes"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Orphanages = lazy(() => import("./pages/Orphanages"));
const PrayForPalestine = lazy(() => import("./pages/PrayForPalestine"));
const Profile = lazy(() => import("./pages/Profile"));
const PushNotificationTest = lazy(() => import("./pages/PushNotificationTest"));
const QuranReader = lazy(() => import("./pages/QuranReader"));
const Qurbani = lazy(() => import("./pages/Qurbani"));
const RamadanCalendar = lazy(() => import("./pages/RamadanCalendar"));
const SadaqahCoins = lazy(() => import("./pages/SadaqahCoins"));
const WaterWells = lazy(() => import("./pages/WaterWells"));
const WhyDonate = lazy(() => import("./pages/WhyDonate"));
const ZakatCalculator = lazy(() => import("./pages/ZakatCalculator"));

// Configure React Query with enterprise settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors
        if (error?.status >= 400 && error?.status < 500) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  logger.error('Unhandled promise rejection', event.reason);
});

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  logger.error('Uncaught error', event.error);
});

function App() {
  // Log app initialization
  logger.info('Application initialized', {
    version: appConfig.app.version,
    environment: appConfig.app.environment,
  });

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <TranslationProvider>
              <CurrencyProvider>
                <CartProvider>
                  <BrowserRouter>
                    <MaintenanceMode />
                    <Suspense fallback={<LoadingBoundary skeleton="dashboard"><div /></LoadingBoundary>}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/adhan-community" element={<AdhanCommunity />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/build-mosque" element={<BuildMosque />} />
                        <Route path="/business-leagues" element={<BusinessLeagues />} />
                        <Route path="/business/:id" element={<BusinessProfile />} />
                        <Route path="/campaigns" element={<Campaigns />} />
                        <Route path="/charity-partner" element={<CharityPartnerPage />} />
                        <Route path="/charity-partner-program" element={<CharityPartnerProgram />} />
                        <Route path="/charity-partners" element={<CharityPartnersPublic />} />
                        <Route path="/charity/:id" element={<CharityProfile />} />
                        <Route path="/charity-subdomain" element={<CharitySubdomainPage />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/dhikr-community" element={<DhikrCommunity />} />
                        <Route path="/donate-to-palestine" element={<DonateToPalestine />} />
                        <Route path="/dua-wall" element={<DuaWall />} />
                        <Route path="/duas-library" element={<DuasLibrary />} />
                        <Route path="/fundraising" element={<Fundraising />} />
                        <Route path="/gift-cards" element={<GiftCards />} />
                        <Route path="/islamic-calendar" element={<IslamicCalendar />} />
                        <Route path="/islamic-history" element={<IslamicHistory />} />
                        <Route path="/leaderboards" element={<Leaderboards />} />
                        <Route path="/live-feed" element={<LiveFeed />} />
                        <Route path="/live-tv" element={<LiveTV />} />
                        <Route path="/masjid-community" element={<MasjidCommunity />} />
                        <Route path="/masjid-management" element={<MasjidManagement />} />
                        <Route path="/membership" element={<Membership />} />
                        <Route path="/mosque-leagues" element={<MosqueLeagues />} />
                        <Route path="/my-jannah" element={<MyJannah />} />
                        <Route path="/my-masjid" element={<MyMasjid />} />
                        <Route path="/my-ummah" element={<MyUmmah />} />
                        <Route path="/namaz-times" element={<NamazTimes />} />
                        <Route path="/orphanages" element={<Orphanages />} />
                        <Route path="/pray-for-palestine" element={<PrayForPalestine />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/push-notification-test" element={<PushNotificationTest />} />
                        <Route path="/quran-reader" element={<QuranReader />} />
                        <Route path="/qurbani" element={<Qurbani />} />
                        <Route path="/ramadan-calendar" element={<RamadanCalendar />} />
                        <Route path="/sadaqah-coins" element={<SadaqahCoins />} />
                        <Route path="/water-wells" element={<WaterWells />} />
                        <Route path="/why-donate" element={<WhyDonate />} />
                        <Route path="/zakat-calculator" element={<ZakatCalculator />} />
                        <Route 
                          path="/admin/*" 
                          element={
                            <ProtectedRoute requiredPermissions={['admin.full_access']}>
                              <AdminDashboard />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="/404" element={<NotFound />} />
                        <Route path="*" element={<Navigate to="/404" replace />} />
                      </Routes>
                    </Suspense>
                    <Toaster />
                    <Sonner />
                  </BrowserRouter>
                </CartProvider>
              </CurrencyProvider>
            </TranslationProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;

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
                        <Route path="/business-leagues" element={<BusinessLeagues />} />
                        <Route 
                          path="/admin/*" 
                          element={
                            <ProtectedRoute requiredPermissions={['admin.full_access']}>
                              <AdminDashboard />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
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

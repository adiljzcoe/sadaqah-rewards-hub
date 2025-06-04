
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import Index from "./pages/Index"
import Auth from "./pages/Auth"
import Profile from "./pages/Profile"
import AdminDashboard from "./pages/AdminDashboard"
import CharityProfile from "./pages/CharityProfile"
import BusinessProfile from "./pages/BusinessProfile"
import Checkout from "./pages/Checkout"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import { CurrencyProvider } from "./contexts/CurrencyContext"
import { CartProvider } from "./hooks/useCart"
import ShoppingCartWidget from "./components/ShoppingCartWidget"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <CurrencyProvider>
            <CartProvider>
              <BrowserRouter>
                <div className="min-h-screen bg-background font-sans antialiased">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/auth" element={<Auth />} />
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
                    <Route path="/charity/:id" element={<CharityProfile />} />
                    <Route path="/business/:id" element={<BusinessProfile />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  
                  {/* Shopping Cart Widget - Available on all pages */}
                  <ShoppingCartWidget />
                </div>
                <Toaster />
              </BrowserRouter>
            </CartProvider>
          </CurrencyProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App

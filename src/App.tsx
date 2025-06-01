
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Campaigns from "./pages/Campaigns";
import Leaderboards from "./pages/Leaderboards";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CharityProfile from "./pages/CharityProfile";
import BusinessProfile from "./pages/BusinessProfile";
import SadaqahCoins from "./pages/SadaqahCoins";
import Membership from "./pages/Membership";
import LiveFeed from "./pages/LiveFeed";
import CharityPartnersPublic from "./pages/CharityPartnersPublic";
import Blog from "./pages/Blog";
import WhyDonate from "./pages/WhyDonate";
import Checkout from "./pages/Checkout";
import BuildMosque from "./pages/BuildMosque";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/leaderboards" element={<Leaderboards />} />
          <Route path="/about" element={<About />} />
          <Route path="/charity/:id" element={<CharityProfile />} />
          <Route path="/business/:id" element={<BusinessProfile />} />
          <Route path="/coins" element={<SadaqahCoins />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/live" element={<LiveFeed />} />
          <Route path="/charities" element={<CharityPartnersPublic />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/why-donate" element={<WhyDonate />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/build-mosque" element={<BuildMosque />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

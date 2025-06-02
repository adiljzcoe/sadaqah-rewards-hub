
import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Menu, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-gray-50 py-2 text-center text-sm text-gray-600">
        🎉 Ramadan Mubarak! Give Sadaqah and earn Jannah points. <Link to="/campaigns" className="underline font-medium hover:text-emerald-600">Donate Now</Link>
      </div>
      
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <Link to="/" className="flex items-center font-bold text-xl text-gray-900">
              <img src="/logo.svg" alt="Jannah Platform Logo" className="h-8 mr-2" />
              Jannah Platform
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link to="/campaigns" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Campaigns
              </Link>
              <Link to="/charity-partners" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Charities
              </Link>
              <Link to="/leaderboards" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Leaderboards
              </Link>
              <Link to="/masjid-community" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                🕌 Masjid Community
              </Link>
              <Link to="/sadaqah-coins" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">
                About
              </Link>
            </nav>

            {/* User Menu Section */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              >
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={profile?.avatar_url} />
                        <AvatarFallback>{profile?.full_name?.charAt(0).toUpperCase() || '?'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{profile?.full_name || user?.email}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-jannah">My Jannah</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="outline">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={toggleMobileSidebar}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        isOpen={isMobileSidebarOpen} 
        onClose={toggleMobileSidebar}
        userLevel={profile?.jannah_points ? Math.floor(profile.jannah_points / 1000) + 1 : 1}
        currentPoints={profile?.jannah_points || 0}
        nextLevelPoints={1000}
        isMember={false}
      />
    </>
  );
};

export default Header;

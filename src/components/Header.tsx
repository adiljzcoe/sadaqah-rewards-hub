
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Heart, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Building2, 
  Users, 
  Gift,
  Coins,
  Crown
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sadaqah Hub
            </span>
          </Link>

          {/* Desktop Navigation - Simple Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/campaigns" className="text-gray-700 hover:text-green-600 transition-colors">
              Donate
            </Link>
            <Link to="/leaderboards" className="text-gray-700 hover:text-green-600 transition-colors">
              Community
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-green-600 transition-colors">
              About
            </Link>
          </nav>

          {/* Right side - User menu or Auth buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Sadaqah Coins - Desktop */}
                <Link to="/coins" className="hidden md:flex">
                  <Button variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                    <Coins className="h-4 w-4 mr-1" />
                    <span className="font-semibold">250</span>
                  </Button>
                </Link>

                {/* Membership Badge - Desktop */}
                <Link to="/membership" className="hidden md:flex">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                </Link>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.full_name || 'User'} />
                        <AvatarFallback>
                          {user.user_metadata?.full_name?.split(' ').map((n: string) => n[0]).join('') || user.email?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user.user_metadata?.full_name || 'User'}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-jannah" className="cursor-pointer">
                        <Building2 className="mr-2 h-4 w-4" />
                        My Jannah
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/coins" className="cursor-pointer md:hidden">
                        <Coins className="mr-2 h-4 w-4" />
                        Sadaqah Coins
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/membership" className="cursor-pointer md:hidden">
                        <Crown className="mr-2 h-4 w-4" />
                        Membership
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <MobileSidebar 
          userLevel={5}
          currentPoints={250}
          nextLevelPoints={500}
          isMember={true}
        />
      )}
    </header>
  );
};

export default Header;

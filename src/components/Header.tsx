
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
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Building2, 
  Coins,
  Crown,
  ChevronDown
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
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-900 font-bold text-sm">JANNAH</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"></div>
            </div>
          </Link>

          {/* User Level Badge */}
          {user && (
            <div className="hidden md:flex">
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1">
                <span className="text-sm font-bold">Ahmad M. LV 12</span>
                <span className="ml-1 text-xs">Guardian</span>
                <span className="ml-2 text-sm">🪙 5,632 pts</span>
              </Badge>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-cyan-300 transition-colors font-medium">
              Home
            </Link>
            
            <div className="relative group">
              <button className="flex items-center text-white hover:text-cyan-300 transition-colors font-medium">
                Donate
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white hover:text-cyan-300 transition-colors font-medium">
                Community
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <div className="relative group">
              <button className="flex items-center text-white hover:text-cyan-300 transition-colors font-medium">
                Rewards
                <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            
            <Link to="/about" className="text-white hover:text-cyan-300 transition-colors font-medium">
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

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.user_metadata?.avatar_url || ''} alt={user.user_metadata?.full_name || 'User'} />
                        <AvatarFallback className="bg-cyan-500 text-white">
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
                  <Button variant="ghost" size="sm" className="text-white hover:text-cyan-300 hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white hover:bg-white/10"
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '@/contexts/TranslationContext';

const Header = () => {
  const { translate } = useTranslation();
  const { user, signOut } = useAuth();
  const { items } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.svg" alt="Your Brand" className="h-8" />
            <span className="font-bold text-lg">Your Brand</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/campaigns" className="text-gray-700 hover:text-blue-600">Campaigns</Link>
            <Link to="/duas" className="text-gray-700 hover:text-blue-600">Duas</Link>
            <Link to="/live" className="text-gray-700 hover:text-blue-600">Live TV</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            <Link to="/cart" className="relative hover:text-blue-600">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-1 text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            <Button variant="ghost" size="icon" className="hover:text-blue-600">
              <Bell className="h-5 w-5" />
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.user_metadata?.avatar_url || `https://avatar.vercel.sh/${user.email}`} alt={user.email || "User Avatar"} />
                      <AvatarFallback>{user.email?.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Explore the app and manage your account.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link to="/campaigns" className="text-gray-700 hover:text-blue-600 block py-2">Campaigns</Link>
                <Link to="/duas" className="text-gray-700 hover:text-blue-600 block py-2">Duas</Link>
                <Link to="/live" className="text-gray-700 hover:text-blue-600 block py-2">Live TV</Link>
                <Link to="/blog" className="text-gray-700 hover:text-blue-600 block py-2">Blog</Link>
                <Link to="/cart" className="text-gray-700 hover:text-blue-600 block py-2">Cart</Link>
                {user ? (
                  <>
                    <Button variant="ghost" className="w-full justify-start" onClick={signOut}>Logout</Button>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button className="w-full">Sign In</Button>
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="bg-gray-50 border-b border-gray-200 lg:hidden">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link to="/campaigns" className="text-gray-700 hover:text-blue-600">Campaigns</Link>
            <Link to="/duas" className="text-gray-700 hover:text-blue-600">Duas</Link>
            <Link to="/live" className="text-gray-700 hover:text-blue-600">Live TV</Link>
            <Link to="/blog" className="text-gray-700 hover:text-blue-600">Blog</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { Link } from 'react-router-dom';

interface CharitySubdomainHeaderProps {
  charity: {
    name: string;
    logo_url?: string;
  };
}

const CharitySubdomainHeader = ({ charity }: CharitySubdomainHeaderProps) => {
  const { user } = useAuth();
  const { items } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left: Charity Branding */}
          <div className="flex items-center space-x-3">
            {charity.logo_url ? (
              <img 
                src={charity.logo_url} 
                alt={charity.name}
                className="h-10 w-10 rounded-lg object-cover"
              />
            ) : (
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-900">{charity.name}</h1>
              <p className="text-xs text-gray-500">Powered by Your Jannah</p>
            </div>
          </div>

          {/* Center: Simple Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#donate" className="text-gray-700 hover:text-blue-600 transition-colors">
              Donate
            </a>
            <a href="#fundraise" className="text-gray-700 hover:text-blue-600 transition-colors">
              Fundraise
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Cart */}
            <Link to="/checkout">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-blue-600">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User/Login */}
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 mr-2" />
                  <span className="hidden sm:inline">{user.email}</span>
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              <a href="#donate" className="py-2 text-gray-700 hover:text-blue-600">
                Donate
              </a>
              <a href="#fundraise" className="py-2 text-gray-700 hover:text-blue-600">
                Fundraise
              </a>
              <a href="#about" className="py-2 text-gray-700 hover:text-blue-600">
                About
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default CharitySubdomainHeader;

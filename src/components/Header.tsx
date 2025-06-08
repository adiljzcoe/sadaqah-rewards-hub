
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-emerald-600">
            Donate Feels Great
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/quran" className="text-gray-600 hover:text-emerald-600">Quran</Link>
            <Link to="/namaz" className="text-gray-600 hover:text-emerald-600">Prayer Times</Link>
            <Link to="/zakat" className="text-gray-600 hover:text-emerald-600">Zakat</Link>
            <Link to="/duas" className="text-gray-600 hover:text-emerald-600">Duas</Link>
            <Link to="/calendar" className="text-gray-600 hover:text-emerald-600">Calendar</Link>
            <Link to="/masjid" className="text-gray-600 hover:text-emerald-600">Masjid</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost">Profile</Button>
                </Link>
                <Link to="/admin">
                  <Button variant="ghost">Admin</Button>
                </Link>
                <Button variant="outline" onClick={logout}>Logout</Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

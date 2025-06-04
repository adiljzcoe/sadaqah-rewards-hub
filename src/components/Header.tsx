
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';

const Header = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-white text-slate-800 px-3 py-1 rounded-full font-bold text-lg">
              JANNAH
            </div>
          </Link>

          {/* Membership Button */}
          <div className="flex items-center ml-4">
            <Link to="/membership">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 text-sm font-medium">
                ⭐ Membership - Join Now 🔓 Unlock
              </Button>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-8 flex-1">
            <Link to="/" className="text-white hover:text-orange-300 transition-colors font-medium">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Islamic Life <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/quran-reader" className="w-full">Quran Reader</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/duas-library" className="w-full">Duas Library</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/islamic-calendar" className="w-full">Islamic Calendar</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/namaz-times" className="w-full">Prayer Times</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Tools <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/zakat-calculator" className="w-full">Zakat Calculator</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/qurbani" className="w-full">Qurbani</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Donate <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/campaigns" className="w-full">Campaigns</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/orphanages" className="w-full">Orphanages</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/water-wells" className="w-full">Water Wells</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/build-mosque" className="w-full">Build Mosque</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Community <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/masjid-community" className="w-full">Masjid Community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/my-ummah" className="w-full">My Ummah</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/dua-wall" className="w-full">Dua Wall</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Rewards <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/my-jannah" className="w-full">My Jannah</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/sadaqah-coins" className="w-full">Sadaqah Coins</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/leaderboards" className="w-full">Leaderboards</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                  Account <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg rounded-md" align="end" forceMount>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full h-full block">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/family" className="w-full h-full block">
                      Family Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/admin" className="w-full h-full block">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                  Account <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                  <DropdownMenuItem>
                    <Link to="/auth" className="w-full">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/auth" className="w-full">Sign Up</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-white hover:text-orange-300 transition-colors font-medium">
                Dev <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md">
                <DropdownMenuItem>
                  <Link to="/admin-dashboard" className="w-full">Admin Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/push-test" className="w-full">Push Test</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:text-orange-300 hover:bg-slate-700"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

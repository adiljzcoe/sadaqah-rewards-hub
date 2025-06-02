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
  NavigationMenu, 
  NavigationMenuContent, 
  NavigationMenuItem, 
  NavigationMenuLink, 
  NavigationMenuList, 
  NavigationMenuTrigger 
} from '@/components/ui/navigation-menu';
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
  Crown,
  Radio,
  Info,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import MobileSidebar from './MobileSidebar';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate('/');
  };

  const donationLinks = [
    { title: "Water Wells", href: "/water-wells", description: "Provide clean water access" },
    { title: "Build Mosques", href: "/build-mosque", description: "Support mosque construction" },
    { title: "Support Orphans", href: "/orphanages", description: "Help children in need" },
    { title: "Emergency Campaigns", href: "/campaigns", description: "Urgent relief efforts" },
    { title: "Gift Donations", href: "/gift-donations", description: "Send Islamic gift cards" },
  ];

  const communityLinks = [
    { title: "Live Feed", href: "/live", description: "See real-time donations" },
    { title: "Leaderboards", href: "/leaderboards", description: "Community rankings" },
    { title: "Charity Partners", href: "/charities", description: "Our verified partners" },
  ];

  const aboutLinks = [
    { title: "About Us", href: "/about", description: "Our mission and values" },
    { title: "Why Donate?", href: "/why-donate", description: "Impact of your donations" },
    { title: "Blog", href: "/blog", description: "News and updates" },
  ];

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

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Donations Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-green-600">
                  <Gift className="h-4 w-4 mr-2" />
                  Donate
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {donationLinks.map((link) => (
                      <NavigationMenuLink key={link.href} asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{link.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Community Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-green-600">
                  <Users className="h-4 w-4 mr-2" />
                  Community
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    {communityLinks.map((link) => (
                      <NavigationMenuLink key={link.href} asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{link.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* About Dropdown */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-gray-700 hover:text-green-600">
                  <Info className="h-4 w-4 mr-2" />
                  About
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[400px] gap-3 p-4">
                    {aboutLinks.map((link) => (
                      <NavigationMenuLink key={link.href} asChild>
                        <Link
                          to={link.href}
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">{link.title}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {link.description}
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
          onClose={() => setIsMobileMenuOpen(false)} 
        />
      )}
    </header>
  );
};

export default Header;

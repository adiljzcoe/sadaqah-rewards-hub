
import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Calendar, Users, Mic, Tv, Heart, Clock, BookOpen, Calculator, MessageSquare,
  Target, Building, Droplets, Baby, Users2, Trophy, Coins, Crown, Gift,
  Home, Star, Settings, LogOut, User, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from '@/contexts/TranslationContext';
import LanguageSwitcher from './LanguageSwitcher';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const handleSignOut = async () => {
    await signOut();
    onClose();
  };

  const menuSections = [
    {
      title: t('islamic_life'),
      items: [
        { icon: Calendar, label: t('islamic_calendar'), href: '/islamic-calendar' },
        { icon: Calendar, label: t('ramadan_calendar'), href: '/ramadan-calendar' },
        { icon: Mic, label: t('adhan_community'), href: '/adhan-community' },
        { icon: Tv, label: t('live_tv'), href: '/live-tv' },
        { icon: Heart, label: t('dhikr_community'), href: '/dhikr-community' },
      ]
    },
    {
      title: t('tools'),
      items: [
        { icon: Clock, label: t('prayer_times'), href: '/namaz-times' },
        { icon: BookOpen, label: t('quran_reader'), href: '/quran-reader' },
        { icon: Calculator, label: t('zakat_calculator'), href: '/zakat-calculator' },
        { icon: MessageSquare, label: t('dua_wall'), href: '/dua-wall' },
      ]
    },
    {
      title: t('donate'),
      items: [
        { icon: Target, label: t('active_campaigns'), href: '/campaigns' },
        { icon: Building, label: t('build_mosque'), href: '/build-mosque' },
        { icon: Droplets, label: t('water_wells'), href: '/water-wells' },
        { icon: Baby, label: t('orphanages'), href: '/orphanages' },
        { icon: Users2, label: t('qurbani'), href: '/qurbani' },
      ]
    },
    {
      title: t('community'),
      items: [
        { icon: Building, label: t('masjid_community'), href: '/masjid-community' },
        { icon: Users, label: t('my_ummah'), href: '/my-ummah' },
        { icon: Trophy, label: t('leaderboards'), href: '/leaderboards' },
      ]
    },
    {
      title: t('rewards'),
      items: [
        { icon: Coins, label: t('sadaqah_coins'), href: '/sadaqah-coins' },
        { icon: Star, label: t('my_jannah'), href: '/my-jannah' },
        { icon: Crown, label: t('membership_tiers'), href: '/membership' },
        { icon: Gift, label: t('gift_cards'), href: '/gift-cards' },
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-6 border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                YourJannah
              </SheetTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* User Profile */}
          {user && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
              
              {/* User Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 p-2 rounded text-center">
                  <Coins className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
                  <div className="font-semibold">2,450</div>
                  <div className="text-emerald-600">{t('sadaqah_coins')}</div>
                </div>
                <div className="bg-purple-50 p-2 rounded text-center">
                  <Trophy className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                  <div className="font-semibold">#47</div>
                  <div className="text-purple-600">Rank</div>
                </div>
              </div>
            </div>
          )}

          {/* Language Switcher */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('language')}</span>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-6">
              {/* Home */}
              <div>
                <Link 
                  to="/" 
                  onClick={onClose}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="h-5 w-5 text-gray-600" />
                  <span className="font-medium">{t('home')}</span>
                </Link>
              </div>

              {/* Menu Sections */}
              {menuSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={onClose}
                        className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <item.icon className="h-5 w-5 text-gray-600" />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* Footer */}
          <div className="p-4 border-t mt-auto">
            {user ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">{t('profile')}</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">{t('settings')}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-left"
                >
                  <LogOut className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">{t('sign_out')}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full" onClick={onClose}>
                  <Link to="/auth">{t('login')}</Link>
                </Button>
                <Button asChild className="w-full bg-gradient-to-r from-emerald-500 to-blue-500" onClick={onClose}>
                  <Link to="/auth">{t('become_member')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;

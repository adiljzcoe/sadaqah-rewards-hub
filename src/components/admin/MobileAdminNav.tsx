
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Package, 
  Building2, 
  Mail, 
  Trophy, 
  Calendar,
  X
} from 'lucide-react';

interface MobileAdminNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isAdmin: boolean;
  isFakeAdmin?: boolean;
}

const MobileAdminNav = ({ activeTab, onTabChange, isAdmin, isFakeAdmin }: MobileAdminNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'charities', label: 'Charities', icon: Building2 },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'affiliates', label: 'Affiliates', icon: Trophy },
    { id: 'seasonal', label: 'Seasonal', icon: Calendar },
  ];

  const handleTabSelect = (tabId: string) => {
    onTabChange(tabId);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 bg-white shadow-lg">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Admin Dashboard
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  Administrator
                </Badge>
                {isFakeAdmin && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                    Test Mode
                  </Badge>
                )}
              </div>
            </SheetTitle>
            <SheetDescription>
              Navigate through admin features
            </SheetDescription>
          </SheetHeader>
          
          <div className="grid gap-2 mt-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className="justify-start h-12"
                  onClick={() => handleTabSelect(item.id)}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileAdminNav;

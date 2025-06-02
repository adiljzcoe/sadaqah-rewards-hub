
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, UserCheck, Trophy } from 'lucide-react';
import { useMobileFeatures } from '@/hooks/use-mobile-features';

interface AdminStats {
  users?: number;
  totalRaised?: number;
  memberships?: number;
  affiliates?: number;
}

interface MobileAdminHeaderProps {
  stats?: AdminStats;
  activeTab: string;
  isFakeAdmin?: boolean;
}

const MobileAdminHeader = ({ stats, activeTab, isFakeAdmin }: MobileAdminHeaderProps) => {
  const { isMobile, orientation } = useMobileFeatures();

  const getTabTitle = (tab: string) => {
    const titles: Record<string, string> = {
      overview: 'Dashboard Overview',
      analytics: 'Analytics & Charts',
      users: 'User Management',
      products: 'Product Management',
      charities: 'Charity Partners',
      email: 'Email Marketing',
      affiliates: 'Affiliate System',
      seasonal: 'Seasonal Campaigns'
    };
    return titles[tab] || 'Admin Dashboard';
  };

  const quickStats = [
    { icon: Users, value: stats?.users || 0, label: 'Users', color: 'text-blue-600' },
    { icon: DollarSign, value: `£${stats?.totalRaised?.toLocaleString() || 0}`, label: 'Raised', color: 'text-green-600' },
    { icon: UserCheck, value: stats?.memberships || 0, label: 'Members', color: 'text-purple-600' },
    { icon: Trophy, value: stats?.affiliates || 0, label: 'Affiliates', color: 'text-orange-600' },
  ];

  if (!isMobile) return null;

  return (
    <div className="mb-6 space-y-4">
      {/* Header Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{getTabTitle(activeTab)}</h1>
          {isFakeAdmin && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 mt-1">
              Test Mode
            </Badge>
          )}
        </div>
      </div>

      {/* Quick Stats - Only show on overview */}
      {activeTab === 'overview' && (
        <div className={`grid gap-3 ${orientation === 'portrait' ? 'grid-cols-2' : 'grid-cols-4'}`}>
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-white/50 backdrop-blur-sm">
                <CardContent className="p-3">
                  <div className="flex items-center space-x-2">
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                    <div>
                      <div className="text-lg font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MobileAdminHeader;

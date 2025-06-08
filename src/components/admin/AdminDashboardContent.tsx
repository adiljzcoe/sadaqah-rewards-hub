
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, DollarSign, TrendingUp, Activity, Settings, Database, Shield, Bell, Youtube, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { usePermissions } from '@/hooks/usePermissions';
import DashboardCharts from './DashboardCharts';
import AdvancedUserManagement from './AdvancedUserManagement';
import FinancialManagement from './FinancialManagement';
import CharityVerification from './CharityVerification';
import DataSeeder from './DataSeeder';
import DuaDataSeeder from './DuaDataSeeder';
import DuasLibrarySeeder from './DuasLibrarySeeder';
import SimpleDataSeeder from './SimpleDataSeeder';
import ComplianceAndSecurity from './ComplianceAndSecurity';
import PushNotifications from './PushNotifications';
import SMSNotifications from './SMSNotifications';
import EmailMarketing from './EmailMarketing';
import MarketingCampaigns from './MarketingCampaigns';
import UTMAnalytics from './UTMAnalytics';
import GrowthOpportunities from './GrowthOpportunities';
import ScalabilityMonitoring from './ScalabilityMonitoring';
import RealTimeMonitoring from './RealTimeMonitoring';
import ProductManagement from './ProductManagement';
import GiftCardManagement from './GiftCardManagement';
import AffiliateSystem from './AffiliateSystem';
import DisbursementManagement from './DisbursementManagement';
import CharityPartnerManagement from './CharityPartnerManagement';
import YouTubeChannelManager from './YouTubeChannelManager';
import PlatformSettings from './PlatformSettings';
import CMSContentEditor from '../cms/CMSContentEditor';

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { hasPermission, userRole } = usePermissions();

  // Query to check sandbox mode status
  const { data: sandboxMode } = useQuery({
    queryKey: ['admin-sandbox-mode'],
    queryFn: async () => {
      const { data } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'sandbox_mode')
        .single();
      
      if (data) {
        return JSON.parse(data.setting_value);
      }
      return false;
    },
  });

  const navigationItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: Users,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users,
      permission: 'admin.user_management' as const
    },
    { 
      id: 'financial', 
      label: 'Financial', 
      icon: DollarSign,
      permission: 'admin.financial_management' as const
    },
    { 
      id: 'charity-partners', 
      label: 'Partners', 
      icon: Settings,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'data', 
      label: 'Data', 
      icon: Database,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: Shield,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'marketing', 
      label: 'Marketing', 
      icon: Bell,
      permission: 'admin.content_management' as const
    },
    { 
      id: 'products', 
      label: 'Products', 
      icon: Database,
      permission: 'admin.content_management' as const
    },
    { 
      id: 'monitoring', 
      label: 'Monitoring', 
      icon: Activity,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'youtube', 
      label: 'YouTube', 
      icon: Youtube,
      permission: 'admin.content_management' as const
    },
    { 
      id: 'platform-settings', 
      label: 'Settings', 
      icon: Settings,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'cms', 
      label: 'Content', 
      icon: Settings,
      permission: 'admin.content_management' as const
    },
  ];

  // Filter navigation items based on permissions
  const allowedNavItems = navigationItems.filter(item => 
    hasPermission(item.permission)
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,847</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">£247,891</div>
                  <p className="text-xs text-muted-foreground">+18% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.9%</div>
                  <p className="text-xs text-muted-foreground">Uptime this month</p>
                </CardContent>
              </Card>
            </div>
            <DashboardCharts />
          </>
        );
      case 'charity-partners':
        return hasPermission('admin.full_access') ? <CharityPartnerManagement /> : <AccessDenied />;
      case 'users':
        return hasPermission('admin.user_management') ? <AdvancedUserManagement /> : <AccessDenied />;
      case 'financial':
        return hasPermission('admin.financial_management') ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <FinancialManagement />
              <DisbursementManagement />
            </div>
            <CharityVerification />
          </>
        ) : <AccessDenied />;
      case 'data':
        return hasPermission('admin.full_access') ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SimpleDataSeeder />
              <DuaDataSeeder />
              <DuasLibrarySeeder />
            </div>
            <DataSeeder />
          </>
        ) : <AccessDenied />;
      case 'security':
        return hasPermission('admin.full_access') ? <ComplianceAndSecurity /> : <AccessDenied />;
      case 'marketing':
        return hasPermission('admin.content_management') ? (
          <>
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-3">
                <PushNotifications />
                <SMSNotifications />
                <EmailMarketing />
              </div>
              <MarketingCampaigns />
              <UTMAnalytics />
              <GrowthOpportunities />
            </div>
          </>
        ) : <AccessDenied />;
      case 'products':
        return hasPermission('admin.content_management') ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <ProductManagement />
              <GiftCardManagement />
            </div>
            <AffiliateSystem />
          </>
        ) : <AccessDenied />;
      case 'monitoring':
        return hasPermission('admin.full_access') ? (
          <div className="grid gap-6 md:grid-cols-2">
            <ScalabilityMonitoring />
            <RealTimeMonitoring />
          </div>
        ) : <AccessDenied />;
      case 'youtube':
        return hasPermission('admin.content_management') ? <YouTubeChannelManager /> : <AccessDenied />;
      case 'platform-settings':
        return hasPermission('admin.full_access') ? <PlatformSettings /> : <AccessDenied />;
      case 'cms':
        return hasPermission('admin.content_management') ? (
          <div className="grid gap-6">
            <CMSContentEditor 
              contentKey="hero_title" 
              title="Hero Section Title"
              description="Main heading displayed on the homepage"
            />
            <CMSContentEditor 
              contentKey="hero_subtitle" 
              title="Hero Section Subtitle"
              description="Subtitle text displayed below the main heading"
            />
            <CMSContentEditor 
              contentKey="footer_text" 
              title="Footer Text"
              description="Text displayed in the website footer"
              contentType="html"
            />
          </div>
        ) : <AccessDenied />;
      default:
        return null;
    }
  };

  const AccessDenied = () => (
    <Card>
      <CardContent className="p-8 text-center">
        <Shield className="h-16 w-16 mx-auto mb-4 text-gray-400" />
        <h3 className="text-xl font-semibold mb-2">Access Denied</h3>
        <p className="text-gray-600">
          You don't have permission to access this section. Current role: {userRole}
        </p>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-4 space-y-2">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Role: {userRole}</p>
            <p className="text-gray-400 text-sm">Manage your platform with role-based access</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
              {allowedNavItems.map((item) => (
                <TabsTrigger key={item.id} value={item.id}>
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        {/* Sandbox Mode Banner */}
        {sandboxMode && (
          <Alert className="m-6 mb-0 border-orange-500 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 font-medium">
              <strong>SANDBOX MODE ACTIVE</strong> - All payments and transactions are in test mode. No real money will be processed.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="p-6">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardContent;

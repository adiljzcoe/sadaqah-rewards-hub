import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Users, DollarSign, TrendingUp, Activity, Settings, Database, Shield, Bell, Youtube, AlertTriangle } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
        return <CharityPartnerManagement />;
      case 'users':
        return <AdvancedUserManagement />;
      case 'financial':
        return (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <FinancialManagement />
              <DisbursementManagement />
            </div>
            <CharityVerification />
          </>
        );
      case 'data':
        return (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SimpleDataSeeder />
              <DuaDataSeeder />
              <DuasLibrarySeeder />
            </div>
            <DataSeeder />
          </>
        );
      case 'security':
        return <ComplianceAndSecurity />;
      case 'marketing':
        return (
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
        );
      case 'products':
        return (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <ProductManagement />
              <GiftCardManagement />
            </div>
            <AffiliateSystem />
          </>
        );
      case 'monitoring':
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <ScalabilityMonitoring />
            <RealTimeMonitoring />
          </div>
        );
      case 'youtube':
        return <YouTubeChannelManager />;
      case 'platform-settings':
        return <PlatformSettings />;
      default:
        return null;
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'charity-partners', label: 'Partners', icon: Settings },
    { id: 'data', label: 'Data', icon: Database },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'marketing', label: 'Marketing', icon: Bell },
    { id: 'products', label: 'Products', icon: Database },
    { id: 'monitoring', label: 'Monitoring', icon: Activity },
    { id: 'youtube', label: 'YouTube Scheduler', icon: Youtube },
    { id: 'platform-settings', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 bg-gray-800">
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-4 space-y-2">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-gray-400 mt-2">Manage your platform with comprehensive administrative tools</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
              {navigationItems.map((item) => (
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


import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, DollarSign, TrendingUp, Settings, Bell, Globe, Database, Shield } from 'lucide-react';
import FeatureConfigManager from '@/components/admin/FeatureConfigManager';
import SystemSettings from '@/components/admin/SystemSettings';
import PlatformSettings from '@/components/admin/PlatformSettings';
import AdvancedUserManagement from '@/components/admin/AdvancedUserManagement';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingBoundary from '@/components/common/LoadingBoundary';
import { useAppSettings, useContent, AppSetting, ContentItem } from '@/hooks/useAppConfig';
import { getSettingValue, getContent } from '@/utils/configHelpers';
import { formatCurrency } from '@/utils/formatting';
import logger from '@/utils/logger';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: settings = [], isLoading: settingsLoading } = useAppSettings();
  const { data: content = [], isLoading: contentLoading } = useContent();

  const appName = getSettingValue(settings as AppSetting[], 'app_name', 'Your Jannah');
  const dashboardTitle = getContent(content as ContentItem[], 'admin_dashboard_title', 'Admin Dashboard');
  const currencySymbol = getSettingValue(settings as AppSetting[], 'currency_symbol', '£');

  // Log admin access
  React.useEffect(() => {
    logger.userAction('Admin Dashboard Accessed', undefined, { component: 'AdminDashboard' });
  }, []);

  if (settingsLoading || contentLoading) {
    return <LoadingBoundary skeleton="dashboard"><div /></LoadingBoundary>;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{dashboardTitle}</h1>
            <p className="text-lg text-gray-600">
              Manage your {appName} platform settings, monitor performance, and configure features.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="features" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Features
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                System
              </TabsTrigger>
              <TabsTrigger value="platform" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Platform
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <ErrorBoundary>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12,847</div>
                      <p className="text-xs text-muted-foreground">+180 from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {formatCurrency(2100000)}
                      </div>
                      <p className="text-xs text-muted-foreground">+15% from last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">67</div>
                      <p className="text-xs text-muted-foreground">+5 new this week</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">System Health</CardTitle>
                      <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">99.9%</div>
                      <p className="text-xs text-muted-foreground">Uptime this month</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <span className="text-sm">New donation: {formatCurrency(250)} to Gaza Relief</span>
                          <span className="text-xs text-gray-500">2 min ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                          <span className="text-sm">User registered: ahmad.malik@email.com</span>
                          <span className="text-xs text-gray-500">5 min ago</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                          <span className="text-sm">Campaign reached 80% funding</span>
                          <span className="text-xs text-gray-500">12 min ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Database</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Payment Gateway</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Online</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Email Service</span>
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Push Notifications</span>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Limited</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="features">
              <ErrorBoundary>
                <FeatureConfigManager />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="system">
              <ErrorBoundary>
                <SystemSettings />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="platform">
              <ErrorBoundary>
                <PlatformSettings />
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="users">
              <ErrorBoundary>
                <LoadingBoundary skeleton="dashboard">
                  <AdvancedUserManagement />
                </LoadingBoundary>
              </ErrorBoundary>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default AdminDashboard;

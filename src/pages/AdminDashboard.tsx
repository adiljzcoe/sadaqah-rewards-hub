
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
import ProtectedRoute from '@/components/ui/protected-route';
import { useAppSettings, useContent, AppSetting, ContentItem } from '@/hooks/useAppConfig';
import { getSettingValue, getContent } from '@/utils/configHelpers';
import { formatCurrency } from '@/utils/formatting';
import { usePermissions } from '@/hooks/usePermissions';
import logger from '@/utils/logger';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { data: settings = [], isLoading: settingsLoading } = useAppSettings();
  const { data: content = [], isLoading: contentLoading } = useContent();
  const { hasPermission, userRole } = usePermissions();

  const appName = getSettingValue(settings as AppSetting[], 'app_name', 'Your Jannah');
  const dashboardTitle = getContent(content as ContentItem[], 'admin_dashboard_title', 'Admin Dashboard');
  const currencySymbol = getSettingValue(settings as AppSetting[], 'currency_symbol', '£');

  // Log admin access
  React.useEffect(() => {
    logger.userAction('Admin Dashboard Accessed', undefined, { component: 'AdminDashboard', role: userRole });
  }, [userRole]);

  if (settingsLoading || contentLoading) {
    return <LoadingBoundary skeleton="dashboard"><div /></LoadingBoundary>;
  }

  const tabItems = [
    { 
      id: 'overview', 
      label: 'Overview', 
      icon: TrendingUp,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'features', 
      label: 'Features', 
      icon: Settings,
      permission: 'admin.content_management' as const
    },
    { 
      id: 'system', 
      label: 'System', 
      icon: Globe,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'platform', 
      label: 'Platform', 
      icon: Settings,
      permission: 'admin.full_access' as const
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users,
      permission: 'admin.user_management' as const
    },
  ];

  const allowedTabs = tabItems.filter(tab => hasPermission(tab.permission));

  return (
    <ProtectedRoute 
      requireAuth={true} 
      requiredPermissions={['admin.full_access', 'admin.user_management', 'admin.content_management']}
    >
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
          <Header />
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{dashboardTitle}</h1>
              <div className="flex items-center gap-4">
                <p className="text-lg text-gray-600">
                  Manage your {appName} platform settings, monitor performance, and configure features.
                </p>
                <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  Role: {userRole}
                </div>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                {allowedTabs.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </TabsTrigger>
                ))}
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

              {hasPermission('admin.content_management') && (
                <TabsContent value="features">
                  <ErrorBoundary>
                    <FeatureConfigManager />
                  </ErrorBoundary>
                </TabsContent>
              )}

              {hasPermission('admin.full_access') && (
                <TabsContent value="system">
                  <ErrorBoundary>
                    <SystemSettings />
                  </ErrorBoundary>
                </TabsContent>
              )}

              {hasPermission('admin.full_access') && (
                <TabsContent value="platform">
                  <ErrorBoundary>
                    <PlatformSettings />
                  </ErrorBoundary>
                </TabsContent>
              )}

              {hasPermission('admin.user_management') && (
                <TabsContent value="users">
                  <ErrorBoundary>
                    <LoadingBoundary skeleton="dashboard">
                      <AdvancedUserManagement />
                    </LoadingBoundary>
                  </ErrorBoundary>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

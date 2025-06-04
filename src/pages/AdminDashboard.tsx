
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  Shield, 
  BarChart3, 
  Database, 
  Users, 
  DollarSign, 
  Settings, 
  Activity, 
  TrendingUp, 
  Globe, 
  MousePointer, 
  Target,
  Mail,
  Bell,
  UserPlus
} from 'lucide-react';

// Import all the admin components
import SimpleDataSeeder from '@/components/admin/SimpleDataSeeder';
import DashboardCharts from '@/components/admin/DashboardCharts';
import ProductManagement from '@/components/admin/ProductManagement';
import GiftCardManagement from '@/components/admin/GiftCardManagement';
import DisbursementManagement from '@/components/admin/DisbursementManagement';
import EmailMarketing from '@/components/admin/EmailMarketing';
import AffiliateSystem from '@/components/admin/AffiliateSystem';
import PushNotifications from '@/components/admin/PushNotifications';
import MarketingCampaigns from '@/components/admin/MarketingCampaigns';

// Import new enterprise components
import RealTimeMonitoring from '@/components/admin/RealTimeMonitoring';
import FinancialManagement from '@/components/admin/FinancialManagement';
import UTMAnalytics from '@/components/admin/UTMAnalytics';
import ScalabilityMonitoring from '@/components/admin/ScalabilityMonitoring';
import ComplianceAndSecurity from '@/components/admin/ComplianceAndSecurity';
import GrowthOpportunities from '@/components/admin/GrowthOpportunities';
import AdvancedUserManagement from '@/components/admin/AdvancedUserManagement';
import CharityVerification from '@/components/admin/CharityVerification';
import SMSNotifications from '@/components/admin/SMSNotifications';
import DemoModeControl from '@/components/admin/DemoModeControl';
import UserManagement from '@/components/admin/UserManagement';

const AdminDashboard = () => {
  const { user, fakeAdminLogin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // For demo purposes - in real app, check actual admin role
  const isAdmin = user?.email === 'admin@test.com' || user?.id === '00000000-0000-0000-0000-000000000001';

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>Admin Access Required</CardTitle>
            <CardDescription>
              Please log in with admin credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={fakeAdminLogin} className="w-full">
              <Shield className="h-4 w-4 mr-2" />
              Demo Admin Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto mb-4 text-red-600" />
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              You don't have permission to access the admin dashboard
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Enterprise Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-14 gap-2 h-auto p-2">
            <TabsTrigger value="overview" className="flex flex-col items-center gap-1 p-3">
              <BarChart3 className="h-4 w-4" />
              <span className="text-xs">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="demo-control" className="flex flex-col items-center gap-1 p-3">
              <Database className="h-4 w-4" />
              <span className="text-xs">Demo Control</span>
            </TabsTrigger>
            <TabsTrigger value="user-mgmt" className="flex flex-col items-center gap-1 p-3">
              <UserPlus className="h-4 w-4" />
              <span className="text-xs">User Mgmt</span>
            </TabsTrigger>
            <TabsTrigger value="realtime" className="flex flex-col items-center gap-1 p-3">
              <Activity className="h-4 w-4" />
              <span className="text-xs">Real-time</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex flex-col items-center gap-1 p-3">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="utm" className="flex flex-col items-center gap-1 p-3">
              <MousePointer className="h-4 w-4" />
              <span className="text-xs">UTM Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="scalability" className="flex flex-col items-center gap-1 p-3">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs">Scalability</span>
            </TabsTrigger>
            <TabsTrigger value="compliance" className="flex flex-col items-center gap-1 p-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Compliance</span>
            </TabsTrigger>
            <TabsTrigger value="growth" className="flex flex-col items-center gap-1 p-3">
              <Target className="h-4 w-4" />
              <span className="text-xs">Growth</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex flex-col items-center gap-1 p-3">
              <Users className="h-4 w-4" />
              <span className="text-xs">Users</span>
            </TabsTrigger>
            <TabsTrigger value="charity" className="flex flex-col items-center gap-1 p-3">
              <Shield className="h-4 w-4" />
              <span className="text-xs">Charity</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex flex-col items-center gap-1 p-3">
              <Mail className="h-4 w-4" />
              <span className="text-xs">Email</span>
            </TabsTrigger>
            <TabsTrigger value="sms" className="flex flex-col items-center gap-1 p-3">
              <Bell className="h-4 w-4" />
              <span className="text-xs">SMS</span>
            </TabsTrigger>
            <TabsTrigger value="management" className="flex flex-col items-center gap-1 p-3">
              <Settings className="h-4 w-4" />
              <span className="text-xs">Management</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">System Status</p>
                      <p className="text-2xl font-bold text-green-600">Operational</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Daily Donations</p>
                      <p className="text-2xl font-bold">125,420</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold">2.4M</p>
                    </div>
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Global Reach</p>
                      <p className="text-2xl font-bold">68 Countries</p>
                    </div>
                    <Globe className="h-8 w-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>
            <DashboardCharts />
          </TabsContent>

          <TabsContent value="demo-control">
            <DemoModeControl />
          </TabsContent>

          <TabsContent value="user-mgmt">
            <UserManagement />
          </TabsContent>

          <TabsContent value="realtime">
            <RealTimeMonitoring />
          </TabsContent>

          <TabsContent value="financial">
            <FinancialManagement />
          </TabsContent>

          <TabsContent value="utm">
            <UTMAnalytics />
          </TabsContent>

          <TabsContent value="scalability">
            <ScalabilityMonitoring />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceAndSecurity />
          </TabsContent>

          <TabsContent value="growth">
            <GrowthOpportunities />
          </TabsContent>

          <TabsContent value="users">
            <AdvancedUserManagement />
          </TabsContent>

          <TabsContent value="charity">
            <CharityVerification />
          </TabsContent>

          <TabsContent value="email">
            <EmailMarketing />
          </TabsContent>

          <TabsContent value="sms">
            <SMSNotifications />
          </TabsContent>

          <TabsContent value="management" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ProductManagement />
              <GiftCardManagement />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DisbursementManagement />
              <PushNotifications />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <AffiliateSystem />
              <MarketingCampaigns />
            </div>
            <SimpleDataSeeder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

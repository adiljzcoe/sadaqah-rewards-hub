
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, TrendingUp, Activity, Settings, Database, Shield, Bell } from 'lucide-react';
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

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your platform with comprehensive administrative tools</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <AdvancedUserManagement />
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FinancialManagement />
            <DisbursementManagement />
          </div>
          <CharityVerification />
        </TabsContent>

        <TabsContent value="data" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SimpleDataSeeder />
            <DuaDataSeeder />
            <DuasLibrarySeeder />
          </div>
          <DataSeeder />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <ComplianceAndSecurity />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
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
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ProductManagement />
            <GiftCardManagement />
          </div>
          <AffiliateSystem />
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <ScalabilityMonitoring />
            <RealTimeMonitoring />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardContent;

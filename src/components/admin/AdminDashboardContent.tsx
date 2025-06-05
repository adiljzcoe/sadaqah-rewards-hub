
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
import CharityPartnerManagement from './CharityPartnerManagement';

const AdminDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="charity-partners">Partners</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeTab === 'overview' && (
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
          )}
          
          {activeTab === 'charity-partners' && <CharityPartnerManagement />}
          
          {activeTab === 'users' && <AdvancedUserManagement />}
          
          {activeTab === 'financial' && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <FinancialManagement />
                <DisbursementManagement />
              </div>
              <CharityVerification />
            </>
          )}
          
          {activeTab === 'data' && (
            <>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SimpleDataSeeder />
                <DuaDataSeeder />
                <DuasLibrarySeeder />
              </div>
              <DataSeeder />
            </>
          )}
          
          {activeTab === 'security' && <ComplianceAndSecurity />}
          
          {activeTab === 'marketing' && (
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
          )}
          
          {activeTab === 'products' && (
            <>
              <div className="grid gap-6 md:grid-cols-2">
                <ProductManagement />
                <GiftCardManagement />
              </div>
              <AffiliateSystem />
            </>
          )}
          
          {activeTab === 'monitoring' && (
            <div className="grid gap-6 md:grid-cols-2">
              <ScalabilityMonitoring />
              <RealTimeMonitoring />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardContent;


import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SimpleDataSeeder from './SimpleDataSeeder';
import DataSeeder from './DataSeeder';
import LiveStreamDataSeeder from '../livestream/LiveStreamDataSeeder';
import DashboardCharts from './DashboardCharts';
import FinancialManagement from './FinancialManagement';
import DisbursementManagement from './DisbursementManagement';
import CharityVerification from './CharityVerification';
import UTMAnalytics from './UTMAnalytics';
import GiftCardManagement from './GiftCardManagement';
import ProductManagement from './ProductManagement';
import MarketingCampaigns from './MarketingCampaigns';
import EmailMarketing from './EmailMarketing';
import AffiliateSystem from './AffiliateSystem';
import GrowthOpportunities from './GrowthOpportunities';
import PushNotifications from './PushNotifications';
import SMSNotifications from './SMSNotifications';
import ComplianceAndSecurity from './ComplianceAndSecurity';
import AdvancedUserManagement from './AdvancedUserManagement';
import ScalabilityMonitoring from './ScalabilityMonitoring';
import RealTimeMonitoring from './RealTimeMonitoring';

const AdminDashboardContent = () => {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList className="grid grid-cols-4 md:grid-cols-8 gap-1">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="finance">Finance</TabsTrigger>
        <TabsTrigger value="charities">Charities</TabsTrigger>
        <TabsTrigger value="marketing">Marketing</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="tech">Tech</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <DashboardCharts />
      </TabsContent>

      <TabsContent value="finance" className="space-y-4">
        <FinancialManagement />
        <DisbursementManagement />
      </TabsContent>

      <TabsContent value="charities" className="space-y-4">
        <CharityVerification />
        <UTMAnalytics />
      </TabsContent>

      <TabsContent value="marketing" className="space-y-4">
        <MarketingCampaigns />
        <EmailMarketing />
        <AffiliateSystem />
        <GrowthOpportunities />
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        <GiftCardManagement />
        <ProductManagement />
      </TabsContent>

      <TabsContent value="users" className="space-y-4">
        <PushNotifications />
        <SMSNotifications />
        <ComplianceAndSecurity />
        <AdvancedUserManagement />
      </TabsContent>

      <TabsContent value="tech" className="space-y-4">
        <ScalabilityMonitoring />
        <RealTimeMonitoring />
      </TabsContent>

      <TabsContent value="data" className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Test Data Generation</h2>
        <div className="grid grid-cols-1 gap-6">
          <SimpleDataSeeder />
          <LiveStreamDataSeeder />
          <DataSeeder />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AdminDashboardContent;

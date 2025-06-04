import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Bell,
  Settings,
  BarChart3,
  FileText,
  Smartphone,
  Mail,
  CreditCard,
  Shield,
  Zap,
  Globe,
  Layout
} from 'lucide-react';

import DataSeeder from '@/components/admin/DataSeeder';
import FamilyDataSeeder from '@/components/admin/FamilyDataSeeder';
import DashboardCharts from '@/components/admin/DashboardCharts';
import UserManagement from '@/components/admin/UserManagement';
import DisbursementManagement from '@/components/admin/DisbursementManagement';
import PushNotifications from '@/components/admin/PushNotifications';
import SiteSettings from '@/components/admin/SiteSettings';
import RealTimeMonitoring from '@/components/admin/RealTimeMonitoring';
import CMSManagement from '@/components/cms/CMSManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your charity platform and monitor performance</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 gap-2 h-auto p-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Data
            </TabsTrigger>
            <TabsTrigger value="disbursements" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Disbursements
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Push
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Monitor
            </TabsTrigger>
            <TabsTrigger value="cms" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              CMS
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardCharts />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="data" className="space-y-6">
            <div className="grid gap-6">
              <DataSeeder />
              <FamilyDataSeeder />
            </div>
          </TabsContent>

          <TabsContent value="disbursements">
            <DisbursementManagement />
          </TabsContent>

          <TabsContent value="notifications">
            <PushNotifications />
          </TabsContent>

          <TabsContent value="monitoring">
            <RealTimeMonitoring />
          </TabsContent>

          <TabsContent value="cms">
            <CMSManagement />
          </TabsContent>

          <TabsContent value="settings">
            <SiteSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

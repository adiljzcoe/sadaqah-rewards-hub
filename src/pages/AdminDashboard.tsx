
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  TrendingUp, 
  Gift,
  DollarSign,
  BarChart3,
  Settings,
  Mail,
  UserCheck,
  Sparkles,
  ShoppingBag,
  Database
} from "lucide-react";
import DashboardCharts from "@/components/admin/DashboardCharts";
import ProductManagement from "@/components/admin/ProductManagement";
import GiftCardManagement from "@/components/admin/GiftCardManagement";
import AffiliateSystem from "@/components/admin/AffiliateSystem";
import EmailMarketing from "@/components/admin/EmailMarketing";
import MobileAdminHeader from "@/components/admin/MobileAdminHeader";
import MobileAdminNav from "@/components/admin/MobileAdminNav";
import { useIsMobile } from "@/hooks/use-mobile";
import DisbursementManagement from "@/components/admin/DisbursementManagement";
import DataSeeder from "@/components/admin/DataSeeder";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const isMobile = useIsMobile();

  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12.3%",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Donations",
      value: "£156,789",
      change: "+18.2%",
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Active Campaigns",
      value: "23",
      change: "+5",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Gift Cards Sold",
      value: "342",
      change: "+23.1%",
      icon: Gift,
      color: "text-purple-600",
    },
  ];

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileAdminHeader activeTab={activeTab} />
        <div className="px-4 py-6 space-y-6">
          {/* Mobile Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <Card key={stat.title}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">{stat.title}</p>
                        <p className="text-lg font-bold">{stat.value}</p>
                        <Badge variant="secondary" className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                      <IconComponent className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Mobile Content */}
          <Card>
            <CardContent className="p-4">
              {activeTab === "overview" && <DashboardCharts />}
              {activeTab === "products" && <ProductManagement />}
              {activeTab === "gift-cards" && <GiftCardManagement />}
              {activeTab === "disbursements" && <DisbursementManagement />}
              {activeTab === "affiliates" && <AffiliateSystem />}
              {activeTab === "marketing" && <EmailMarketing />}
              {activeTab === "test-data" && <DataSeeder />}
            </CardContent>
          </Card>
        </div>
        
        <MobileAdminNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your charity platform</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge variant="secondary" className="mt-1">
                        {stat.change}
                      </Badge>
                    </div>
                    <IconComponent className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="gift-cards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Gift Cards
            </TabsTrigger>
            <TabsTrigger value="disbursements" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Disbursements
            </TabsTrigger>
            <TabsTrigger value="affiliates" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Affiliates
            </TabsTrigger>
            <TabsTrigger value="marketing" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Marketing
            </TabsTrigger>
            <TabsTrigger value="test-data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Test Data
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <DashboardCharts />
          </TabsContent>

          <TabsContent value="products">
            <ProductManagement />
          </TabsContent>

          <TabsContent value="gift-cards">
            <GiftCardManagement />
          </TabsContent>

          <TabsContent value="disbursements">
            <DisbursementManagement />
          </TabsContent>

          <TabsContent value="affiliates">
            <AffiliateSystem />
          </TabsContent>

          <TabsContent value="marketing">
            <EmailMarketing />
          </TabsContent>

          <TabsContent value="test-data">
            <DataSeeder />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

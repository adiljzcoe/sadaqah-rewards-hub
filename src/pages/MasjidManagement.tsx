
import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Settings, BarChart } from 'lucide-react';
import MasjidWebsiteCreator from '@/components/masjid/MasjidWebsiteCreator';
import MasjidDashboard from '@/components/masjid/MasjidDashboard';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';

const MasjidManagement = () => {
  const { userMasjidRole } = useMasjidManagement();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Masjid Management</h1>
          <p className="text-lg text-gray-600">
            Comprehensive platform for managing your masjid's digital presence and community services
          </p>
        </div>

        {!userMasjidRole ? (
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Masjid Management</h2>
              <p className="text-gray-600 mb-6">
                To get started, you need to be assigned as staff to a masjid. Contact your masjid administrator to get access.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <Globe className="h-12 w-12 mx-auto mb-4 text-blue-500" />
                  <h3 className="font-semibold mb-2">Create Websites</h3>
                  <p className="text-sm text-gray-600">
                    Build beautiful websites with custom domains and subdomains
                  </p>
                </div>
                <div className="text-center">
                  <Settings className="h-12 w-12 mx-auto mb-4 text-green-500" />
                  <h3 className="font-semibold mb-2">Manage Services</h3>
                  <p className="text-sm text-gray-600">
                    Prayer times, events, khutbahs, and community services
                  </p>
                </div>
                <div className="text-center">
                  <BarChart className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                  <h3 className="font-semibold mb-2">Track Engagement</h3>
                  <p className="text-sm text-gray-600">
                    Monitor community engagement and website analytics
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="website" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Website Creator
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <MasjidDashboard />
            </TabsContent>

            <TabsContent value="website">
              <MasjidWebsiteCreator />
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardContent className="p-8 text-center">
                  <BarChart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-xl font-semibold mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-600">
                    Detailed analytics and insights for your masjid's digital presence
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default MasjidManagement;

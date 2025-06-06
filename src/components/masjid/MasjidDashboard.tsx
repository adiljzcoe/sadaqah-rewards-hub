
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Settings,
  Megaphone,
  BookOpen,
  Heart
} from 'lucide-react';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';
import PrayerTimesManager from './PrayerTimesManager';
import EventsManager from './EventsManager';
import KhutbahManager from './KhutbahManager';
import ServicesManager from './ServicesManager';
import AnnouncementsManager from './AnnouncementsManager';

const MasjidDashboard = () => {
  const { userMasjidRole } = useMasjidManagement();

  if (!userMasjidRole) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Access Required</h2>
            <p className="text-gray-600">
              You need to be assigned as staff to a masjid to access this dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {userMasjidRole.masjids?.name} Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              {userMasjidRole.masjids?.location} • 
              <Badge variant="outline" className="ml-2">
                {userMasjidRole.role}
              </Badge>
              {userMasjidRole.masjids?.verified && (
                <Badge variant="default" className="ml-2 bg-green-500">
                  Verified
                </Badge>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prayer Times</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Updated</div>
            <p className="text-xs text-muted-foreground">For this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Community</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">Active members</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khutbahs</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="prayer-times" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Prayer Times
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Events
          </TabsTrigger>
          <TabsTrigger value="khutbahs" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Khutbahs
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="announcements" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Announcements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Prayer times updated for this week</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New event: Youth Program</p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Khutbah uploaded: "Patience in Islam"</p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-medium">Update Prayer Times</h3>
                    </div>
                  </Card>
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Calendar className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-medium">Create Event</h3>
                    </div>
                  </Card>
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="text-center">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-medium">Upload Khutbah</h3>
                    </div>
                  </Card>
                  <Card className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="text-center">
                      <Megaphone className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                      <h3 className="font-medium">New Announcement</h3>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prayer-times">
          <PrayerTimesManager masjidId={userMasjidRole.masjid_id} />
        </TabsContent>

        <TabsContent value="events">
          <EventsManager masjidId={userMasjidRole.masjid_id} />
        </TabsContent>

        <TabsContent value="khutbahs">
          <KhutbahManager masjidId={userMasjidRole.masjid_id} />
        </TabsContent>

        <TabsContent value="services">
          <ServicesManager masjidId={userMasjidRole.masjid_id} />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementsManager masjidId={userMasjidRole.masjid_id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MasjidDashboard;

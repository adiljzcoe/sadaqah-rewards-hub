
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import UserMasjidDashboard from '@/components/UserMasjidDashboard';
import MasjidLeaderboard from '@/components/MasjidLeaderboard';
import MasjidSelector from '@/components/MasjidSelector';

const MasjidCommunity = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-blue-50/20">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🕌 Masjid Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with your local masjid, contribute to your community, and see how your masjid ranks in charitable giving across the platform.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">My Masjid</TabsTrigger>
            <TabsTrigger value="leaderboard">Community Rankings</TabsTrigger>
            <TabsTrigger value="discover">Discover Masjids</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <UserMasjidDashboard />
          </TabsContent>
          
          <TabsContent value="leaderboard">
            <MasjidLeaderboard />
          </TabsContent>
          
          <TabsContent value="discover">
            <MasjidSelector />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MasjidCommunity;

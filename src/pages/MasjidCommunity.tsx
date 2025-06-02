
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MasjidSelector from '@/components/MasjidSelector';
import MasjidLeaderboard from '@/components/MasjidLeaderboard';
import UserMasjidDashboard from '@/components/UserMasjidDashboard';
import MasjidMembersSection from '@/components/MasjidMembersSection';
import { useMasjidAffiliation } from '@/hooks/useMasjidAffiliation';
import { Building, Users, Trophy } from 'lucide-react';

const MasjidCommunity = () => {
  const { selectedMasjid, isLoading, selectMasjid, leaveMasjid } = useMasjidAffiliation();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Masjid Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Connect with your local mosque community and compete in charitable giving. 
            See how your masjid ranks nationally and work together towards common goals.
          </p>
        </div>

        {!selectedMasjid ? (
          <div className="space-y-8">
            {/* Welcome Card */}
            <Card className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-10 w-10 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Join Your Masjid Community
              </h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Connect with your local mosque to see community impact, participate in campaigns, 
                and represent your masjid in friendly competition.
              </p>
              
              <div className="max-w-md mx-auto">
                <MasjidSelector onSelect={selectMasjid} selectedMasjid={selectedMasjid} />
              </div>
            </Card>

            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Community Competition</h3>
                <p className="text-sm text-gray-600">
                  See how your masjid ranks against others nationally and work together to climb the leaderboard.
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Collective Impact</h3>
                <p className="text-sm text-gray-600">
                  Track your community's total charitable impact and see the difference you're making together.
                </p>
              </Card>
              
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Community Goals</h3>
                <p className="text-sm text-gray-600">
                  Participate in masjid-specific campaigns and work towards shared charitable objectives.
                </p>
              </Card>
            </div>

            {/* National Leaderboard Preview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">National Masjid Leaderboard</h2>
              <MasjidLeaderboard />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* User's Masjid Dashboard */}
            <UserMasjidDashboard masjidId={selectedMasjid.id} />
            
            {/* YourJannah Members Section */}
            <MasjidMembersSection masjidName={selectedMasjid.name} />
            
            {/* Change Masjid Option */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Change Masjid</h3>
                  <p className="text-sm text-gray-600">
                    Switch to a different mosque or leave your current community
                  </p>
                </div>
                <div className="flex gap-2">
                  <MasjidSelector onSelect={selectMasjid} selectedMasjid={selectedMasjid} />
                  <Button variant="outline" onClick={leaveMasjid}>
                    Leave Community
                  </Button>
                </div>
              </div>
            </Card>

            {/* Full Leaderboard */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">National Masjid Rankings</h2>
              <MasjidLeaderboard userMasjidId={selectedMasjid.id} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MasjidCommunity;

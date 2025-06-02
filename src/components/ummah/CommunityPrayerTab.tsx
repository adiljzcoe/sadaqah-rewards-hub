
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Heart, Clock } from 'lucide-react';
import VirtualPrayerCommunity from './VirtualPrayerCommunity';

interface CommunityPrayerTabProps {
  currentPrayer: string | null;
}

const CommunityPrayerTab = ({ currentPrayer }: CommunityPrayerTabProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Heart className="h-6 w-6" fill="currentColor" />
            Prayer Community
          </CardTitle>
          <p className="text-purple-100">
            Connect with fellow Muslims in prayer, even when you can't be at the masjid. 
            Join virtual prayer groups and feel the unity of our Ummah.
          </p>
        </CardHeader>
      </Card>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Community Connection</h3>
            <p className="text-sm text-gray-600 mt-1">
              Pray with Muslims worldwide
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-green-600 mx-auto mb-2" fill="currentColor" />
            <h3 className="font-semibold text-gray-900">Bonus Rewards</h3>
            <p className="text-sm text-gray-600 mt-1">
              Extra Jannah points for group prayer
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <h3 className="font-semibold text-gray-900">Perfect Timing</h3>
            <p className="text-sm text-gray-600 mt-1">
              Join groups at optimal prayer times
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Virtual Prayer Community */}
      <VirtualPrayerCommunity currentPrayer={currentPrayer} />
    </div>
  );
};

export default CommunityPrayerTab;

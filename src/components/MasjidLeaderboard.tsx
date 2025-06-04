
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, MapPin, Users, Crown, Loader2 } from 'lucide-react';

interface MasjidWithStats {
  id: string;
  name: string;
  location?: string;
  address?: string;
  verified: boolean;
  total_donations?: number;
  member_count?: number;
  total_raised?: number;
}

const MasjidLeaderboard = () => {
  const { data: masjids, isLoading } = useQuery({
    queryKey: ['masjid-leaderboard'],
    queryFn: async () => {
      console.log('Fetching masjid leaderboard...');
      
      // Get masjids with their fundraising stats
      const { data: masjidsData, error: masjidsError } = await supabase
        .from('masjids')
        .select(`
          id,
          name,
          location,
          address,
          verified
        `)
        .eq('verified', true)
        .limit(5);

      if (masjidsError) {
        console.error('Error fetching masjids:', masjidsError);
        throw masjidsError;
      }

      // Get fundraising stats for each masjid
      const masjidsWithStats = await Promise.all(
        (masjidsData || []).map(async (masjid) => {
          const { data: campaignsData } = await supabase
            .from('fundraising_campaigns')
            .select('raised_amount')
            .eq('masjid_id', masjid.id);

          const totalRaised = campaignsData?.reduce((sum, campaign) => 
            sum + (campaign.raised_amount || 0), 0) || 0;

          return {
            ...masjid,
            total_raised: totalRaised,
            member_count: Math.floor(Math.random() * 500) + 50, // Mock data for now
          };
        })
      );

      // Sort by total raised
      const sortedMasjids = masjidsWithStats.sort((a, b) => 
        (b.total_raised || 0) - (a.total_raised || 0)
      );

      console.log('Fetched masjid stats:', sortedMasjids);
      return sortedMasjids as MasjidWithStats[];
    },
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md text-xs font-bold">
          <Crown className="h-3 w-3" />
          No.1
        </div>
      );
    }
    return (
      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">
        {rank}
      </div>
    );
  };

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-green-600 to-emerald-600">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Building className="h-4 w-4" />
          Masjid Leaders
        </h3>
      </div>

      {/* Masjid List */}
      <div className="p-3">
        {isLoading ? (
          <div className="text-center py-6">
            <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-green-600" />
            <p className="text-xs text-gray-600">Loading masjids...</p>
          </div>
        ) : masjids && masjids.length > 0 ? (
          <div className="space-y-2">
            {masjids.map((masjid, index) => (
              <div key={masjid.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getRankBadge(index + 1)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-xs truncate flex items-center gap-1">
                      {masjid.name}
                      {masjid.verified && (
                        <Crown className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      {masjid.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-2 w-2" />
                          {masjid.location}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Users className="h-2 w-2" />
                        {masjid.member_count || 0} members
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-green-600 text-xs">
                    £{masjid.total_raised?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs text-gray-500">raised</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Building className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-700 mb-1">No Masjids Yet</h3>
            <p className="text-xs text-gray-500">Masjids will appear here when they join!</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MasjidLeaderboard;

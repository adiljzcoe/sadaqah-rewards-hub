
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Utensils, Crown, Loader2 } from 'lucide-react';

interface BusinessPartner {
  id: string;
  company_name: string;
  total_matched: number;
  location?: string;
  verified: boolean;
}

const BusinessLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'verified' | 'local'>('all');

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['business-partners', activeTab],
    queryFn: async () => {
      console.log('Fetching business partners...');
      let query = supabase
        .from('business_partners')
        .select('*')
        .order('total_matched', { ascending: false })
        .limit(10);

      if (activeTab === 'verified') {
        query = query.eq('verified', true);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching business partners:', error);
        throw error;
      }

      console.log('Fetched business partners:', data);
      return data as BusinessPartner[];
    },
  });

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'all': return <Building2 className="h-3 w-3" />;
      case 'verified': return <Crown className="h-3 w-3" />;
      case 'local': return <MapPin className="h-3 w-3" />;
      default: return <Building2 className="h-3 w-3" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-md text-xs font-bold">
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
      <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Business Leaders
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'all', label: 'All' },
          { key: 'verified', label: 'Verified' },
          { key: 'local', label: 'Local' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'all' | 'verified' | 'local')}
            className={`flex-1 px-2 py-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {getTabIcon(tab.key)}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Business List */}
      <div className="p-3">
        {isLoading ? (
          <div className="text-center py-6">
            <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2 text-blue-600" />
            <p className="text-xs text-gray-600">Loading businesses...</p>
          </div>
        ) : businesses && businesses.length > 0 ? (
          <div className="space-y-2">
            {businesses.map((business, index) => (
              <div key={business.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getRankBadge(index + 1)}
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-gray-900 text-xs truncate flex items-center gap-1">
                      {business.company_name}
                      {business.verified && (
                        <Crown className="h-3 w-3 text-yellow-500" />
                      )}
                    </div>
                    {business.location && (
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-2 w-2" />
                        {business.location}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-blue-600 text-xs">
                    £{business.total_matched?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs text-gray-500">matched</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Building2 className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-700 mb-1">No Business Partners</h3>
            <p className="text-xs text-gray-500">Business partners will appear here!</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BusinessLeaderboard;

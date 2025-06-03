
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Utensils, Crown } from 'lucide-react';

interface Business {
  rank: number;
  name: string;
  location?: string;
  coins: number;
}

const BusinessLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'restaurants' | 'national'>('local');

  const localBusinesses: Business[] = [
    { rank: 1, name: 'Birmingham Islamic Centre', location: 'Birmingham', coins: 15420 },
    { rank: 2, name: 'Al-Noor Grocery', location: 'London', coins: 11600 },
    { rank: 3, name: 'Mosque Community Shop', location: 'Leeds', coins: 9800 },
  ];

  const halalRestaurants: Business[] = [
    { rank: 1, name: 'Halal Corner Restaurant', location: 'Manchester', coins: 12800 },
    { rank: 2, name: 'Bismillah Kitchen', location: 'Birmingham', coins: 10500 },
    { rank: 3, name: 'Al-Medina Grill', location: 'London', coins: 9200 },
  ];

  const nationalBusinesses: Business[] = [
    { rank: 1, name: 'Halal Food Network', coins: 45200 },
    { rank: 2, name: 'Islamic Finance UK', coins: 38900 },
    { rank: 3, name: 'Crescent Foods Ltd', coins: 32100 },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'local': return localBusinesses;
      case 'restaurants': return halalRestaurants;
      case 'national': return nationalBusinesses;
      default: return localBusinesses;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'local': return <Building2 className="h-3 w-3" />;
      case 'restaurants': return <Utensils className="h-3 w-3" />;
      case 'national': return <Crown className="h-3 w-3" />;
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
          { key: 'local', label: 'Local' },
          { key: 'restaurants', label: 'Halal' },
          { key: 'national', label: 'National' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'local' | 'restaurants' | 'national')}
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
        <div className="space-y-2">
          {getCurrentData().map((business) => (
            <div key={business.rank} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {getRankBadge(business.rank)}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 text-xs truncate">{business.name}</div>
                  {activeTab !== 'national' && business.location && (
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <MapPin className="h-2 w-2" />
                      {business.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-blue-600 text-xs">{business.coins.toLocaleString()}</div>
                <div className="text-xs text-gray-500">coins</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default BusinessLeaderboard;

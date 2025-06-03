
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Crown, Users } from 'lucide-react';

interface MasjidEntry {
  rank: number;
  name: string;
  location?: string;
  points: number;
  isUser: boolean;
}

interface CityEntry {
  rank: number;
  name: string;
  points: number;
  isUser: boolean;
}

interface CountryEntry {
  rank: number;
  name: string;
  points: number;
  isUser: boolean;
}

const MasjidLeaderboard = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'cities' | 'countries'>('local');

  const localMasjids: MasjidEntry[] = [
    { rank: 1, name: 'East London Mosque', location: 'London', points: 28750, isUser: false },
    { rank: 2, name: 'Birmingham Central Mosque', location: 'Birmingham', points: 24200, isUser: false },
    { rank: 3, name: 'Central London Mosque', location: 'London', points: 21680, isUser: true },
    { rank: 4, name: 'Manchester Islamic Centre', location: 'Manchester', points: 18940, isUser: false },
  ];

  const cities: CityEntry[] = [
    { rank: 1, name: 'London', points: 156420, isUser: true },
    { rank: 2, name: 'Birmingham', points: 142300, isUser: false },
    { rank: 3, name: 'Manchester', points: 128900, isUser: false },
    { rank: 4, name: 'Leeds', points: 98700, isUser: false },
  ];

  const countries: CountryEntry[] = [
    { rank: 1, name: 'United Kingdom', points: 1245600, isUser: true },
    { rank: 2, name: 'United States', points: 1189400, isUser: false },
    { rank: 3, name: 'Canada', points: 987200, isUser: false },
    { rank: 4, name: 'Australia', points: 756300, isUser: false },
  ];

  const getCurrentData = () => {
    switch (activeTab) {
      case 'local': return localMasjids;
      case 'cities': return cities;
      case 'countries': return countries;
      default: return localMasjids;
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'local': return <Building2 className="h-3 w-3" />;
      case 'cities': return <MapPin className="h-3 w-3" />;
      case 'countries': return <Users className="h-3 w-3" />;
      default: return <Building2 className="h-3 w-3" />;
    }
  };

  const getRankBadge = (rank: number, isUser: boolean) => {
    if (rank === 1) {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-md text-xs font-bold">
          <Crown className="h-3 w-3" />
          No.1
        </div>
      );
    }
    return (
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
      }`}>
        {rank}
      </div>
    );
  };

  const getPointsToNext = (currentRank: number, currentPoints: number) => {
    const data = getCurrentData();
    const nextRankData = data.find(item => item.rank === currentRank - 1);
    if (!nextRankData) return null;
    return nextRankData.points - currentPoints;
  };

  return (
    <Card className="p-0 overflow-hidden bg-white border border-gray-200/60 shadow-sm">
      {/* Header */}
      <div className="p-3 bg-gradient-to-r from-emerald-600 to-green-600">
        <h3 className="text-sm font-medium text-white flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Rankings
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'local', label: 'Masjid' },
          { key: 'cities', label: 'Cities' },
          { key: 'countries', label: 'Countries' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as 'local' | 'cities' | 'countries')}
            className={`flex-1 px-2 py-2 text-xs font-medium flex items-center justify-center gap-1 transition-colors ${
              activeTab === tab.key
                ? 'bg-emerald-50 text-emerald-700 border-b-2 border-emerald-500'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {getTabIcon(tab.key)}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Rankings List */}
      <div className="p-3">
        <div className="space-y-2">
          {getCurrentData().map((item) => {
            const pointsToNext = item.isUser ? getPointsToNext(item.rank, item.points) : null;
            
            return (
              <div key={item.rank} className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                item.isUser ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  {getRankBadge(item.rank, item.isUser)}
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs truncate font-semibold ${item.isUser ? 'text-blue-900' : 'text-gray-900'}`}>
                      {item.name}
                      {item.isUser && <span className="ml-1 text-blue-600">(You)</span>}
                    </div>
                    {activeTab === 'local' && 'location' in item && item.location && (
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin className="h-2 w-2" />
                        {item.location}
                      </div>
                    )}
                    {item.isUser && pointsToNext && (
                      <div className="text-xs text-orange-600 font-medium">
                        {pointsToNext.toLocaleString()} points to rank {item.rank - 1}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-xs ${item.isUser ? 'text-blue-600' : 'text-emerald-600'}`}>
                    {item.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default MasjidLeaderboard;

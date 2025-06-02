
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Globe, MapPin, Trophy, Users, Crown, Medal } from 'lucide-react';

interface LocationStats {
  location: string;
  completions: number;
  rank: number;
}

const KhatmsLeaderboard = () => {
  const [viewType, setViewType] = useState<'countries' | 'cities'>('countries');

  // Get total Quran verses count for completion calculation
  const { data: totalVerses } = useQuery({
    queryKey: ['total-quran-verses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quran_verses')
        .select('id', { count: 'exact' });
      
      if (error) throw error;
      return data?.length || 0;
    }
  });

  // Mock data for demonstration - in a real app, you'd need location data in profiles
  const mockLocationData = {
    countries: [
      { location: 'Saudi Arabia', completions: 1247, rank: 1 },
      { location: 'Egypt', completions: 892, rank: 2 },
      { location: 'Pakistan', completions: 743, rank: 3 },
      { location: 'Indonesia', completions: 621, rank: 4 },
      { location: 'Turkey', completions: 567, rank: 5 },
      { location: 'Malaysia', completions: 445, rank: 6 },
      { location: 'United Kingdom', completions: 332, rank: 7 },
      { location: 'United States', completions: 298, rank: 8 },
      { location: 'Germany', completions: 187, rank: 9 },
      { location: 'France', completions: 156, rank: 10 }
    ],
    cities: [
      { location: 'Makkah, Saudi Arabia', completions: 456, rank: 1 },
      { location: 'Madinah, Saudi Arabia', completions: 389, rank: 2 },
      { location: 'Cairo, Egypt', completions: 334, rank: 3 },
      { location: 'Istanbul, Turkey', completions: 278, rank: 4 },
      { location: 'Lahore, Pakistan', completions: 245, rank: 5 },
      { location: 'Jakarta, Indonesia', completions: 223, rank: 6 },
      { location: 'Kuala Lumpur, Malaysia', completions: 198, rank: 7 },
      { location: 'London, United Kingdom', completions: 167, rank: 8 },
      { location: 'New York, United States', completions: 134, rank: 9 },
      { location: 'Berlin, Germany', completions: 112, rank: 10 }
    ]
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <Trophy className="h-4 w-4 text-gray-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-white hover:bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardHeader>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold flex items-center justify-center gap-3">
              <Globe className="h-8 w-8" />
              Khatm Al-Quran Leaderboard
            </div>
            <div className="text-emerald-200">
              See how many people have completed the Holy Quran around the world
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* View Toggle */}
      <div className="flex justify-center">
        <Tabs value={viewType} onValueChange={(value) => setViewType(value as 'countries' | 'cities')} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="countries" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Countries
            </TabsTrigger>
            <TabsTrigger value="cities" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Cities
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {mockLocationData.countries.reduce((sum, country) => sum + country.completions, 0).toLocaleString()}
            </div>
            <div className="text-gray-600">Total Completions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {viewType === 'countries' ? mockLocationData.countries.length : mockLocationData.cities.length}
            </div>
            <div className="text-gray-600">Active {viewType === 'countries' ? 'Countries' : 'Cities'}</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-6">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Math.round(mockLocationData.countries.reduce((sum, country) => sum + country.completions, 0) / mockLocationData.countries.length)}
            </div>
            <div className="text-gray-600">Average per Location</div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            {viewType === 'countries' ? 'Countries' : 'Cities'} Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockLocationData[viewType].map((item, index) => (
              <div
                key={item.location}
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${getRankColor(item.rank)}`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(item.rank)}
                    <span className="text-lg font-bold">#{item.rank}</span>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-lg">{item.location}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {item.completions.toLocaleString()} completions
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <Badge 
                    variant={item.rank <= 3 ? "default" : "secondary"}
                    className={item.rank === 1 ? "bg-yellow-500" : item.rank === 2 ? "bg-gray-400" : item.rank === 3 ? "bg-amber-600" : ""}
                  >
                    {item.completions.toLocaleString()} Khatms
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievement Note */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6 text-center">
          <div className="text-blue-800 mb-2">
            <strong>What is Khatm Al-Quran?</strong>
          </div>
          <p className="text-blue-700 text-sm">
            Khatm Al-Quran means completing the entire Quran. It's a blessed achievement that brings immense spiritual rewards. 
            Join the global community of believers who have completed this sacred journey!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KhatmsLeaderboard;

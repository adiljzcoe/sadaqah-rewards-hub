
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { MapPin, Search, Users, Star, ArrowRight } from 'lucide-react';

interface QurbaniLocationSelectorProps {
  selectedLocation: any;
  onLocationSelect: (location: any) => void;
  onNext: () => void;
}

const QurbaniLocationSelector = ({ 
  selectedLocation, 
  onLocationSelect, 
  onNext 
}: QurbaniLocationSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch locations with animal counts
  const { data: locations, isLoading } = useQuery({
    queryKey: ['qurbani-locations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('qurbani_locations')
        .select(`
          *,
          charity:charities(name, logo_url, verified),
          animal_count:qurbani_animals(count)
        `)
        .eq('is_active', true);
      
      if (error) throw error;
      return data || [];
    }
  });

  const filteredLocations = locations?.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.region?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Bangladesh': '🇧🇩',
      'Pakistan': '🇵🇰',
      'Turkey': '🇹🇷',
      'Palestine': '🇵🇸',
      'Bosnia': '🇧🇦',
      'Somalia': '🇸🇴',
      'Syria': '🇸🇾',
      'Yemen': '🇾🇪',
      'Afghanistan': '🇦🇫',
      'Lebanon': '🇱🇧',
      'Jordan': '🇯🇴',
      'Iraq': '🇮🇶',
      'Indonesia': '🇮🇩',
      'Malaysia': '🇲🇾',
      'Nigeria': '🇳🇬',
      'Kenya': '🇰🇪'
    };
    return flags[country] || '🌍';
  };

  const getLocationPriority = (location: any) => {
    // Locations with urgent needs get priority
    const urgentLocations = ['Gaza', 'Syria', 'Yemen', 'Afghanistan', 'Somalia'];
    return urgentLocations.some(urgent => 
      location.name.includes(urgent) || location.country.includes(urgent)
    );
  };

  const handleLocationSelect = (location: any) => {
    onLocationSelect(location);
    // Auto-advance to animal selection
    setTimeout(() => onNext(), 500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Choose Location</h2>
              <p className="text-blue-100">
                Select where you'd like your Qurbani to be performed
              </p>
            </div>
            <MapPin className="h-12 w-12 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search by country, city, or region..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Locations Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-32 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location) => {
            const isUrgent = getLocationPriority(location);
            const isSelected = selectedLocation?.id === location.id;
            
            return (
              <Card 
                key={location.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  isSelected ? 'ring-2 ring-blue-500 shadow-lg' : ''
                } ${isUrgent ? 'border-red-200 bg-red-50' : ''}`}
                onClick={() => handleLocationSelect(location)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="text-4xl">{getCountryFlag(location.country)}</div>
                    <div className="flex gap-1">
                      {isUrgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent Need
                        </Badge>
                      )}
                      {location.charity?.verified && (
                        <Badge variant="default" className="text-xs">
                          <Star className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <p className="text-sm text-gray-600">
                    {location.region && `${location.region}, `}{location.country}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* Partner Charity */}
                    {location.charity && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{location.charity.name}</span>
                      </div>
                    )}

                    {/* Available Animals Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Animals Available</span>
                      <span className="font-medium">
                        {location.animal_count?.[0]?.count || 0}
                      </span>
                    </div>

                    {/* Currency */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Local Currency</span>
                      <span className="font-medium">{location.local_currency}</span>
                    </div>

                    {/* Urgent messaging for priority locations */}
                    {isUrgent && (
                      <div className="bg-red-100 border border-red-200 rounded-lg p-3 mt-3">
                        <p className="text-xs text-red-700 font-medium">
                          🚨 This location has urgent humanitarian needs. Your Qurbani will have maximum impact here.
                        </p>
                      </div>
                    )}

                    {/* Selection button */}
                    <Button 
                      className="w-full mt-4"
                      variant={isSelected ? "default" : "outline"}
                    >
                      {isSelected ? (
                        <>
                          Selected
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </>
                      ) : (
                        'Select Location'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {filteredLocations.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Locations Found</h3>
            <p className="text-gray-500">
              No locations match your search. Try a different search term.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Continue button if location is selected */}
      {selectedLocation && (
        <div className="fixed bottom-6 right-6">
          <Button size="lg" onClick={onNext} className="shadow-lg">
            Continue to Animal Selection
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default QurbaniLocationSelector;

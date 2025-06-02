
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Star, Zap, Award, Users, Weight, Calendar } from 'lucide-react';

interface QurbaniAnimalSelectorProps {
  selectedLocation: any;
  selectedAnimal: any;
  onAnimalSelect: (animal: any) => void;
  isPreorderMode: boolean;
}

const QurbaniAnimalSelector = ({ 
  selectedLocation, 
  selectedAnimal, 
  onAnimalSelect, 
  isPreorderMode 
}: QurbaniAnimalSelectorProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showGeneralOption, setShowGeneralOption] = useState(false);

  // Fetch animals based on location
  const { data: animals, isLoading } = useQuery({
    queryKey: ['qurbani-animals', selectedLocation?.id],
    queryFn: async () => {
      let query = supabase
        .from('qurbani_animals')
        .select(`
          *,
          charity:charities(name, logo_url, verified),
          location:qurbani_locations(name, country, region)
        `)
        .eq('is_active', true);

      if (selectedLocation) {
        query = query.eq('location_id', selectedLocation.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data || [];
    },
    enabled: !!selectedLocation
  });

  // Fetch general option pricing
  const { data: generalPricing } = useQuery({
    queryKey: ['general-pricing'],
    queryFn: async () => {
      const { data: settings } = await supabase
        .from('qurbani_settings')
        .select('general_markup_percentage')
        .eq('is_active', true)
        .single();

      if (!animals || !settings) return null;

      // Calculate average price with markup
      const avgPrice = animals.reduce((sum, animal) => sum + animal.price_per_share, 0) / animals.length;
      const generalPrice = Math.round(avgPrice * (1 + settings.general_markup_percentage / 100));

      return {
        price_per_share: generalPrice,
        markup_percentage: settings.general_markup_percentage
      };
    },
    enabled: !!animals && animals.length > 0
  });

  const animalCategories = [
    { id: 'all', name: 'All Animals', icon: Star },
    { id: 'sheep', name: 'Sheep', icon: Star },
    { id: 'goat', name: 'Goat', icon: Award },
    { id: 'cow', name: 'Cow', icon: Users },
    { id: 'buffalo', name: 'Buffalo', icon: Weight },
    { id: 'camel', name: 'Camel', icon: Zap },
  ];

  const filteredAnimals = animals?.filter(animal => 
    selectedCategory === 'all' || animal.animal_type === selectedCategory
  ) || [];

  const getAnimalIcon = (type: string) => {
    const icons = {
      sheep: '🐑',
      goat: '🐐', 
      cow: '🐄',
      buffalo: '🐃',
      camel: '🐪'
    };
    return icons[type as keyof typeof icons] || '🐑';
  };

  const getSharesText = (totalShares: number) => {
    return totalShares === 1 ? 'Full Animal' : `${totalShares} Shares Available`;
  };

  if (!selectedLocation) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Location First</h3>
            <p className="text-gray-500">Please choose a location to see available animals for Qurbani.</p>
          </div>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back to Locations
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with location info */}
      <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Select Your Animal</h2>
              <p className="text-emerald-100">
                📍 {selectedLocation.name}, {selectedLocation.country}
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl mb-2">{getAnimalIcon('sheep')}</div>
              <Badge variant="secondary">
                {isPreorderMode ? 'Preorder' : 'Qurbani Season'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {animalCategories.map(category => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* General Option Toggle */}
      <div className="flex items-center justify-between">
        <Label htmlFor="general-option" className="text-base font-medium">
          Show General Option (+30% markup for flexibility)
        </Label>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowGeneralOption(!showGeneralOption)}
        >
          {showGeneralOption ? 'Hide' : 'Show'} General Option
        </Button>
      </div>

      {/* General Option Card */}
      {showGeneralOption && generalPricing && (
        <Card className="border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="text-4xl">⚡</div>
              <div>
                <h3 className="text-xl">General Qurbani Option</h3>
                <p className="text-sm text-gray-600 font-normal">
                  Easy option - We'll select the best available animal for you
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium">Premium Service</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Automatic best animal selection</li>
                  <li>• Priority processing</li>
                  <li>• Surplus goes to other charity projects</li>
                  <li>• Hassle-free experience</li>
                </ul>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-700 mb-1">
                  £{(generalPricing.price_per_share / 100).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  +{generalPricing.markup_percentage}% markup
                </div>
                <Button 
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  onClick={() => onAnimalSelect({
                    id: 'general',
                    animal_name: 'General Qurbani',
                    animal_type: 'general',
                    price_per_share: generalPricing.price_per_share,
                    total_shares: 1,
                    description: 'Premium service - we select the best available animal',
                    charity: { name: 'Mixed Providers', verified: true }
                  })}
                >
                  Select General Option
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Animals Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-40 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnimals.map((animal) => (
            <Card 
              key={animal.id} 
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                selectedAnimal?.id === animal.id ? 'ring-2 ring-emerald-500 shadow-lg' : ''
              }`}
              onClick={() => onAnimalSelect(animal)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{getAnimalIcon(animal.animal_type)}</div>
                  <Badge variant={animal.charity.verified ? "default" : "secondary"}>
                    {animal.charity.verified ? 'Verified' : 'Partner'}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{animal.animal_name}</CardTitle>
                <p className="text-sm text-gray-600">{animal.charity.name}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-emerald-600">
                      £{(animal.price_per_share / 100).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">per share</span>
                  </div>

                  {/* Shares */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{getSharesText(animal.total_shares)}</span>
                  </div>

                  {/* Weight & Age */}
                  {(animal.weight_range || animal.age_range) && (
                    <div className="text-sm text-gray-600 space-y-1">
                      {animal.weight_range && (
                        <div className="flex items-center gap-2">
                          <Weight className="h-3 w-3" />
                          <span>{animal.weight_range}</span>
                        </div>
                      )}
                      {animal.age_range && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-3 w-3" />
                          <span>{animal.age_range}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Description */}
                  {animal.description && (
                    <p className="text-sm text-gray-600">{animal.description}</p>
                  )}

                  {/* Availability */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Available</span>
                      <span className="font-medium">{animal.availability_count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full" 
                        style={{ width: `${Math.min(animal.availability_count, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredAnimals.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Animals Found</h3>
            <p className="text-gray-500">No animals available for the selected category and location.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QurbaniAnimalSelector;

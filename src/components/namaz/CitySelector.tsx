
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CitySelectorProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
}

const CitySelector = ({ selectedCity, onCityChange }: CitySelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const popularCities = [
    'Makkah', 'Madinah', 'Riyadh', 'Dubai', 'Istanbul', 'Cairo',
    'Karachi', 'Lahore', 'Jakarta', 'Kuala Lumpur', 'London', 'New York'
  ];

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/namaz-times/${citySlug}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleCitySelect(searchQuery.trim());
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Select Your City
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            placeholder="Enter city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" size="sm">
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {/* Popular Cities */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Popular Cities</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {popularCities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                size="sm"
                onClick={() => handleCitySelect(city)}
                className="justify-start"
              >
                <MapPin className="h-3 w-3 mr-1" />
                {city}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CitySelector;

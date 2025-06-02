
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Clock } from 'lucide-react';

interface MajorCitiesGridProps {
  currentCity: string;
}

const MajorCitiesGrid = ({ currentCity }: MajorCitiesGridProps) => {
  const majorCities = [
    { name: 'Makkah', country: 'Saudi Arabia', timezone: 'AST', nextPrayer: 'Dhuhr 12:15' },
    { name: 'Madinah', country: 'Saudi Arabia', timezone: 'AST', nextPrayer: 'Dhuhr 12:18' },
    { name: 'Istanbul', country: 'Turkey', timezone: 'TRT', nextPrayer: 'Dhuhr 12:45' },
    { name: 'Cairo', country: 'Egypt', timezone: 'EET', nextPrayer: 'Dhuhr 12:30' },
    { name: 'Dubai', country: 'UAE', timezone: 'GST', nextPrayer: 'Dhuhr 12:20' },
    { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'AST', nextPrayer: 'Dhuhr 12:15' },
    { name: 'Karachi', country: 'Pakistan', timezone: 'PKT', nextPrayer: 'Dhuhr 12:25' },
    { name: 'Lahore', country: 'Pakistan', timezone: 'PKT', nextPrayer: 'Dhuhr 12:22' },
    { name: 'Jakarta', country: 'Indonesia', timezone: 'WIB', nextPrayer: 'Dhuhr 12:10' },
    { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'MYT', nextPrayer: 'Dhuhr 12:35' },
    { name: 'London', country: 'United Kingdom', timezone: 'GMT', nextPrayer: 'Dhuhr 12:50' },
    { name: 'New York', country: 'United States', timezone: 'EST', nextPrayer: 'Dhuhr 12:40' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {majorCities.map((city) => {
        const citySlug = city.name.toLowerCase().replace(/\s+/g, '-');
        const isCurrentCity = currentCity.toLowerCase() === city.name.toLowerCase();
        
        return (
          <Link 
            key={city.name} 
            to={`/namaz-times/${citySlug}`}
            className="block"
          >
            <Card className={`h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] ${
              isCurrentCity ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:border-blue-300'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      {city.name}
                    </h3>
                    <p className="text-sm text-gray-600">{city.country}</p>
                  </div>
                  {isCurrentCity && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Current
                    </span>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="h-3 w-3" />
                    {city.timezone}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    Next: {city.nextPrayer}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default MajorCitiesGrid;

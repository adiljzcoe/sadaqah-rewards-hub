
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Users, MapPin, ExternalLink, Loader2 } from 'lucide-react';

interface Charity {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  website_url: string;
  country: string;
  category: string;
  trust_rating: number;
  total_raised: number;
  verified: boolean;
}

const CharityPartners = () => {
  const { data: charities, isLoading, error } = useQuery({
    queryKey: ['charities'],
    queryFn: async () => {
      console.log('Fetching charities from database...');
      const { data, error } = await supabase
        .from('charities')
        .select('*')
        .eq('verified', true)
        .order('total_raised', { ascending: false })
        .limit(8);

      if (error) {
        console.error('Error fetching charities:', error);
        throw error;
      }

      console.log('Fetched charities:', data);
      return data as Charity[];
    },
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">Failed to load charity partners</div>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Our Verified Charity Partners
        </h3>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Every charity partner is thoroughly vetted and verified. Your donations go directly to trusted organizations making real impact.
        </p>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-gray-600">Loading charity partners...</p>
        </div>
      ) : charities && charities.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {charities.map((charity) => (
            <Card key={charity.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="mb-4 relative">
                  {charity.logo_url ? (
                    <img 
                      src={charity.logo_url} 
                      alt={charity.name}
                      className="w-16 h-16 mx-auto rounded-full object-cover border-2 border-gray-100"
                    />
                  ) : (
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl">
                      {charity.name.charAt(0)}
                    </div>
                  )}
                  {charity.verified && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  )}
                </div>
                
                <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {charity.name}
                </h4>
                
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {charity.description || 'Verified charity partner making real impact in communities worldwide.'}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <MapPin className="h-3 w-3" />
                    {charity.country || 'Global'}
                  </div>
                  
                  {charity.category && (
                    <Badge variant="outline" className="text-xs">
                      {charity.category}
                    </Badge>
                  )}
                  
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">
                      {charity.trust_rating ? charity.trust_rating.toFixed(1) : '5.0'}
                    </span>
                  </div>
                  
                  {charity.total_raised > 0 && (
                    <div className="text-xs text-emerald-600 font-medium">
                      £{charity.total_raised.toLocaleString()} raised
                    </div>
                  )}
                </div>
                
                {charity.website_url && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-emerald-50 group-hover:border-emerald-300"
                    onClick={() => window.open(charity.website_url, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit Website
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Charities Yet</h3>
          <p className="text-gray-500 mb-4">
            We're currently adding verified charity partners to our platform.
          </p>
          <Button variant="outline">
            Learn More
          </Button>
        </div>
      )}
      
      <div className="text-center">
        <Button 
          variant="outline" 
          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
        >
          View All Partners
        </Button>
      </div>
    </div>
  );
};

export default CharityPartners;

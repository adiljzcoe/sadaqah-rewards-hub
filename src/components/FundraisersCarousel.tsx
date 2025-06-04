
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Target, Calendar, Loader2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Fundraiser {
  id: string;
  title: string;
  description?: string;
  target_amount: number;
  raised_amount: number;
  cause_category: string;
  end_date?: string;
  image_url?: string;
  status: string;
  created_by?: string;
}

interface FundraisersCarouselProps {
  title: string;
}

const FundraisersCarousel = ({ title }: FundraisersCarouselProps) => {
  const { data: fundraisers, isLoading } = useQuery({
    queryKey: ['fundraising-campaigns'],
    queryFn: async () => {
      console.log('Fetching fundraising campaigns from database...');
      const { data, error } = await supabase
        .from('fundraising_campaigns')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching fundraising campaigns:', error);
        throw error;
      }

      console.log('Fetched fundraising campaigns:', data);
      return data as Fundraiser[];
    },
  });

  const getTimeLeft = (endDate?: string) => {
    if (!endDate) return 'Ongoing';
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    
    if (diffTime <= 0) return 'Ended';
    
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 30) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} left`;
    }
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (!fundraisers || fundraisers.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Fundraisers</h3>
          <p className="text-gray-500">Check back soon for new fundraising campaigns!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {fundraisers.map((fundraiser) => {
            const progressPercentage = fundraiser.target_amount > 0 
              ? (fundraiser.raised_amount / fundraiser.target_amount) * 100 
              : 0;

            return (
              <CarouselItem key={fundraiser.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                    {fundraiser.image_url ? (
                      <img 
                        src={fundraiser.image_url} 
                        alt={fundraiser.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <Target className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-medium">Fundraiser Image</p>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {fundraiser.cause_category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {getTimeLeft(fundraiser.end_date)}
                      </Badge>
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1 line-clamp-2">{fundraiser.title}</h4>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {fundraiser.description || 'Help support this important cause'}
                    </p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>£{fundraiser.raised_amount?.toLocaleString() || '0'}</span>
                        <span>£{fundraiser.target_amount?.toLocaleString() || '0'}</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          Supporters
                        </span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Support
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FundraisersCarousel;

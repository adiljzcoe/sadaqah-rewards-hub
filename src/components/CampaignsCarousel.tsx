
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Calendar, Users, Target, Loader2 } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Campaign {
  id: string;
  title: string;
  description: string;
  goal_amount: number;
  raised_amount: number;
  charity_id: string;
  image_url?: string;
  start_date?: string;
  end_date?: string;
  status: string;
  charities?: {
    name: string;
    category?: string;
  };
}

interface CampaignsCarouselProps {
  title: string;
}

const CampaignsCarousel = ({ title }: CampaignsCarouselProps) => {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      console.log('Fetching campaigns from database...');
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          charities(name, category)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
      }

      console.log('Fetched campaigns:', data);
      return data as Campaign[];
    },
  });

  const getDaysLeft = (endDate?: string) => {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
        </div>
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Active Campaigns</h3>
          <p className="text-gray-500">Check back soon for new campaigns to support!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {campaigns.map((campaign) => {
            const progressPercentage = campaign.goal_amount > 0 
              ? (campaign.raised_amount / campaign.goal_amount) * 100 
              : 0;
            const daysLeft = getDaysLeft(campaign.end_date);

            return (
              <CarouselItem key={campaign.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-br from-emerald-400 to-blue-600 flex items-center justify-center">
                    {campaign.image_url ? (
                      <img 
                        src={campaign.image_url} 
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-white text-center">
                        <Heart className="h-12 w-12 mx-auto mb-2" />
                        <p className="font-medium">Campaign Image</p>
                      </div>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs">
                        {campaign.charities?.category || 'General'}
                      </Badge>
                      {daysLeft !== null && (
                        <Badge variant="outline" className="text-xs">
                          {daysLeft > 0 ? `${daysLeft} days left` : 'Ending soon'}
                        </Badge>
                      )}
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-1 line-clamp-2">{campaign.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      by {campaign.charities?.name || 'Unknown Charity'}
                    </p>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>£{campaign.raised_amount?.toLocaleString() || '0'}</span>
                        <span>£{campaign.goal_amount?.toLocaleString() || '0'}</span>
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
                    
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate
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

export default CampaignsCarousel;

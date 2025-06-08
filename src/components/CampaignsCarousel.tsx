
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Calendar, Users, Target } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Campaign {
  id: string;
  title: string;
  charity: string;
  description: string;
  raised: number;
  target: number;
  donors: number;
  daysLeft: number;
  image: string;
  category: string;
}

interface CampaignsCarouselProps {
  campaigns: Campaign[];
  title: string;
}

const CampaignsCarousel = ({ campaigns, title }: CampaignsCarouselProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {campaigns.map((campaign) => (
            <CarouselItem key={campaign.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-islamic-green-400 to-islamic-green-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Heart className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">{campaign.image}</p>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs">{campaign.category}</Badge>
                    <Badge variant="outline" className="text-xs">{campaign.daysLeft} days left</Badge>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-1 line-clamp-2">{campaign.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">by {campaign.charity}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>£{campaign.raised.toLocaleString()}</span>
                      <span>£{campaign.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {campaign.donors}
                      </span>
                      <span>{Math.round((campaign.raised / campaign.target) * 100)}%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-islamic-green-600 hover:bg-islamic-green-700">
                    <Heart className="h-4 w-4 mr-2" />
                    Donate
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CampaignsCarousel;

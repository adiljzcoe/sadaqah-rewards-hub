
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Calendar, Users, TrendingUp } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

interface Fundraiser {
  id: string;
  title: string;
  charity: string;
  description: string;
  raised: number;
  target: number;
  supporters: number;
  deadline: string;
  image: string;
  category: string;
}

interface FundraisersCarouselProps {
  fundraisers: Fundraiser[];
  title: string;
}

const FundraisersCarousel = ({ fundraisers, title }: FundraisersCarouselProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {fundraisers.map((fundraiser) => (
            <CarouselItem key={fundraiser.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-center">
                    <Target className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-medium">{fundraiser.image}</p>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700">{fundraiser.category}</Badge>
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      {fundraiser.deadline}
                    </Badge>
                  </div>
                  
                  <h4 className="font-semibold text-lg mb-1 line-clamp-2">{fundraiser.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">by {fundraiser.charity}</p>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>£{fundraiser.raised.toLocaleString()}</span>
                      <span className="font-semibold">£{fundraiser.target.toLocaleString()}</span>
                    </div>
                    <Progress value={(fundraiser.raised / fundraiser.target) * 100} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {fundraiser.supporters}
                      </span>
                      <span>{Math.round((fundraiser.raised / fundraiser.target) * 100)}%</span>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Support
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

export default FundraisersCarousel;

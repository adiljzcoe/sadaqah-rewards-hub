
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Users, Clock } from 'lucide-react';

export const CampaignsCarousel = () => {
  const campaigns = [
    {
      id: 1,
      title: 'Emergency Relief for Gaza',
      description: 'Providing essential aid to families in need',
      raised: 85000,
      target: 100000,
      donors: 1247,
      timeLeft: '3 days',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      title: 'Clean Water for Communities',
      description: 'Building wells in rural villages',
      raised: 45000,
      target: 75000,
      donors: 892,
      timeLeft: '12 days',
      image: '/placeholder.svg'
    },
    {
      id: 3,
      title: 'Education for All',
      description: 'Supporting schools and students',
      raised: 32000,
      target: 50000,
      donors: 567,
      timeLeft: '8 days',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <Card key={campaign.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="h-48 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-t-lg"></div>
          <CardHeader>
            <CardTitle className="text-lg">{campaign.title}</CardTitle>
            <p className="text-gray-600 text-sm">{campaign.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>£{campaign.raised.toLocaleString()} raised</span>
                  <span>£{campaign.target.toLocaleString()} goal</span>
                </div>
                <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {campaign.donors} donors
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {campaign.timeLeft} left
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-600">
                <Heart className="mr-2 h-4 w-4" />
                Donate Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CampaignsCarousel;

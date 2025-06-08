
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, Users } from 'lucide-react';

export const FundraisersCarousel = () => {
  const fundraisers = [
    {
      id: 1,
      title: 'Sarah\'s Marathon for Orphans',
      organizer: 'Sarah Ahmed',
      description: 'Running 26.2 miles to support orphaned children',
      raised: 3400,
      target: 5000,
      supporters: 89
    },
    {
      id: 2,
      title: 'Community Iftar Project',
      organizer: 'Masjid Al-Noor',
      description: 'Providing free iftar meals during Ramadan',
      raised: 12000,
      target: 20000,
      supporters: 234
    },
    {
      id: 3,
      title: 'Student Scholarship Fund',
      organizer: 'Ahmad Khan',
      description: 'Supporting students in need of education funding',
      raised: 8500,
      target: 15000,
      supporters: 156
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {fundraisers.map((fundraiser) => (
        <Card key={fundraiser.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-3 mb-3">
              <Avatar>
                <AvatarFallback>{fundraiser.organizer.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{fundraiser.title}</CardTitle>
                <p className="text-sm text-gray-600">by {fundraiser.organizer}</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm">{fundraiser.description}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>£{fundraiser.raised.toLocaleString()} raised</span>
                  <span>£{fundraiser.target.toLocaleString()} goal</span>
                </div>
                <Progress value={(fundraiser.raised / fundraiser.target) * 100} className="h-2" />
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="h-4 w-4" />
                {fundraiser.supporters} supporters
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Heart className="mr-2 h-4 w-4" />
                Support This Cause
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FundraisersCarousel;

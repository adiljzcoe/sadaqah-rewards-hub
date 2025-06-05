
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Trophy, Target, Plus, ArrowRight } from 'lucide-react';

interface CharityFundraisingSectionProps {
  charity: {
    name: string;
  };
}

const CharityFundraisingSection = ({ charity }: CharityFundraisingSectionProps) => {
  // Mock fundraising campaigns
  const campaigns = [
    {
      title: "London Marathon for Water Wells",
      organizer: "Sarah Ahmed",
      raised: 2450,
      target: 5000,
      supporters: 45,
      daysLeft: 12,
      image: "/lovable-uploads/fe248050-12b2-4476-8078-10cbcce78d02.png"
    },
    {
      title: "Birthday Fundraiser - Emergency Aid",
      organizer: "Ahmad Hassan",
      raised: 890,
      target: 1500,
      supporters: 23,
      daysLeft: 8,
      image: "/lovable-uploads/51509ed-1b47-49b2-8b42-123906f123c6.png"
    },
    {
      title: "Team Challenge - School Building",
      organizer: "Community Group",
      raised: 3200,
      target: 8000,
      supporters: 67,
      daysLeft: 25,
      image: "/lovable-uploads/3ed3cf1b-92db-4933-abeb-6b5d005cf4bf.png"
    }
  ];

  return (
    <section id="fundraise" className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Fundraise for {charity.name}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Create your own fundraising campaign and invite friends and family to support this cause
          </p>
          
          <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4">
            <Plus className="mr-2 h-5 w-5" />
            Start Your Fundraiser
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        
        {/* Active Campaigns */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Active Fundraisers
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {campaigns.map((campaign, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative">
                  <img 
                    src={campaign.image} 
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-600 text-white">
                    {campaign.daysLeft} days left
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {campaign.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    by {campaign.organizer}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-900">
                        £{campaign.raised.toLocaleString()}
                      </span>
                      <span className="text-gray-600">
                        £{campaign.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${(campaign.raised / campaign.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {campaign.supporters} supporters
                    </div>
                    <div className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {Math.round((campaign.raised / campaign.target) * 100)}%
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Support This Campaign
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Fundraising Benefits */}
        <div className="bg-white rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Fundraise with Us?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Easy Setup</h4>
              <p className="text-gray-600 text-sm">
                Create your campaign in minutes with our simple tools
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Easily</h4>
              <p className="text-gray-600 text-sm">
                Share with friends and family through social media and email
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Track Progress</h4>
              <p className="text-gray-600 text-sm">
                Monitor your campaign's progress with real-time updates
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharityFundraisingSection;

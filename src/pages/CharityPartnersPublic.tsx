
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import CharityPartners from '@/components/CharityPartners';
import CampaignsCarousel from '@/components/CampaignsCarousel';
import FundraisersCarousel from '@/components/FundraisersCarousel';
import { Heart, TrendingUp, Users, Globe, Shield } from 'lucide-react';

const CharityPartnersPublic = () => {
  // Mock data for featured campaigns across all charities
  const featuredCampaigns = [
    {
      id: '1',
      title: 'Gaza Emergency Relief Fund',
      charity: 'Islamic Relief',
      description: 'Immediate aid for families in crisis',
      raised: 450000,
      target: 500000,
      donors: 2340,
      daysLeft: 5,
      image: 'Emergency aid supplies',
      category: 'Emergency Aid'
    },
    {
      id: '2',
      title: 'Syria Education Initiative',
      charity: 'Human Appeal',
      description: 'Education for displaced children',
      raised: 320000,
      target: 400000,
      donors: 1560,
      daysLeft: 12,
      image: 'Children in classroom',
      category: 'Education'
    },
    {
      id: '3',
      title: 'Yemen Water Crisis Response',
      charity: 'Muslim Aid',
      description: 'Clean water for communities in need',
      raised: 180000,
      target: 250000,
      donors: 890,
      daysLeft: 8,
      image: 'Water well construction',
      category: 'Water & Sanitation'
    }
  ];

  // Mock data for featured fundraisers
  const featuredFundraisers = [
    {
      id: '1',
      title: 'Build 50 Schools in Bangladesh',
      charity: 'Education for All',
      description: 'Long-term educational infrastructure development',
      raised: 750000,
      target: 1000000,
      supporters: 3400,
      deadline: 'Jun 2025',
      image: 'School construction project',
      category: 'Education'
    },
    {
      id: '2',
      title: 'Mobile Hospital Fleet',
      charity: 'Medical Aid International',
      description: 'Healthcare delivery to remote areas',
      raised: 420000,
      target: 600000,
      supporters: 1890,
      deadline: 'Apr 2025',
      image: 'Mobile medical units',
      category: 'Healthcare'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Charity Partners</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover trusted charity organizations making a real difference worldwide. 
            Browse current campaigns, view live progress, and contribute to causes that matter.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">40+</div>
              <div className="text-gray-600">Countries Served</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-green-100 rounded-full p-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-2">2.5M+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-purple-100 rounded-full p-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-purple-600 mb-2">£15M+</div>
              <div className="text-gray-600">Funds Distributed</div>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="flex justify-center mb-4">
                <div className="bg-islamic-green-100 rounded-full p-4">
                  <Shield className="h-8 w-8 text-islamic-green-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-islamic-green-600 mb-2">100%</div>
              <div className="text-gray-600">Verified Partners</div>
            </CardContent>
          </Card>
        </div>

        {/* Featured Campaigns */}
        <div className="mb-12">
          <CampaignsCarousel campaigns={featuredCampaigns} title="Featured Campaigns" />
        </div>

        {/* Featured Fundraisers */}
        <div className="mb-12">
          <FundraisersCarousel fundraisers={featuredFundraisers} title="Long-term Fundraisers" />
        </div>

        {/* Charity Partners Component */}
        <CharityPartners />

        {/* Call to Action */}
        <div className="mt-16 bg-islamic-green-600 text-white rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of donors supporting verified charities worldwide
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-white text-islamic-green-600 hover:bg-gray-100">
              <Heart className="h-5 w-5 mr-2" />
              Start Donating
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-islamic-green-600">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityPartnersPublic;


import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import CampaignsCarousel from '@/components/CampaignsCarousel';
import FundraisersCarousel from '@/components/FundraisersCarousel';
import AddCampaignForm from '@/components/AddCampaignForm';
import { MapPin, Users, Heart, Shield, Star, TrendingUp, Calendar, Globe, Phone, Mail, Plus } from 'lucide-react';

const CharityProfile = () => {
  const { id } = useParams();
  
  // Mock data - would come from API in real implementation
  const charity = {
    name: 'Islamic Relief',
    location: 'Gaza, Palestine',
    verified: true,
    rating: 4.9,
    totalRaised: '£2,450,000',
    beneficiaries: '150,000+',
    projects: 24,
    founded: '1984',
    website: 'www.islamic-relief.org',
    phone: '+44 121 605 5555',
    email: 'info@islamic-relief.org',
    description: 'Islamic Relief is a leading international charity working to alleviate poverty and suffering across the globe. We provide emergency relief and long-term development programs in over 40 countries.',
    focus: ['Emergency Aid', 'Education', 'Water & Sanitation', 'Orphan Care'],
    recentProjects: [
      { name: 'Gaza Emergency Relief', raised: '£450,000', target: '£500,000', beneficiaries: 5000 },
      { name: 'Syria Education Fund', raised: '£320,000', target: '£400,000', beneficiaries: 2500 },
      { name: 'Yemen Water Wells', raised: '£180,000', target: '£200,000', beneficiaries: 3000 }
    ]
  };

  // Mock campaigns for this charity
  const charityCampaigns = [
    {
      id: '1',
      title: 'Orphans of Gaza Emergency Support',
      charity: 'Islamic Relief',
      description: 'Providing immediate support to orphaned children in Gaza',
      raised: 45000,
      target: 60000,
      donors: 234,
      daysLeft: 12,
      image: 'Emergency orphan care',
      category: 'Emergency Aid'
    },
    {
      id: '2',
      title: 'Winter Clothing for Syrian Refugees',
      charity: 'Islamic Relief',
      description: 'Warm clothing for families facing winter hardships',
      raised: 28000,
      target: 40000,
      donors: 156,
      daysLeft: 8,
      image: 'Winter clothing drive',
      category: 'Emergency Aid'
    }
  ];

  // Mock fundraisers for this charity
  const charityFundraisers = [
    {
      id: '1',
      title: 'Build Educational Center in Palestine',
      charity: 'Islamic Relief',
      description: 'Creating educational opportunities for children',
      raised: 75000,
      target: 120000,
      supporters: 340,
      deadline: 'Dec 2024',
      image: 'Educational center',
      category: 'Education'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <h1 className="text-3xl font-bold text-islamic-green-800 mr-4">{charity.name}</h1>
                {charity.verified && (
                  <Badge className="bg-islamic-green-100 text-islamic-green-800">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified Partner
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {charity.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                  {charity.rating} Rating
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Est. {charity.founded}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{charity.description}</p>
            </div>
            
            <div className="ml-8">
              <Button className="bg-islamic-green-600 hover:bg-islamic-green-700 text-white px-8 py-3">
                <Heart className="h-5 w-5 mr-2" />
                Donate Now
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-islamic-green-700">{charity.totalRaised}</div>
              <div className="text-sm text-gray-600">Total Raised</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-islamic-green-700">{charity.beneficiaries}</div>
              <div className="text-sm text-gray-600">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-islamic-green-700">{charity.projects}</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-islamic-green-700">100%</div>
              <div className="text-sm text-gray-600">Donation Policy</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="campaigns" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="manage">
              <Plus className="h-4 w-4 mr-1" />
              Manage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaigns" className="space-y-6">
            <CampaignsCarousel campaigns={charityCampaigns} title="Current Campaigns" />
          </TabsContent>

          <TabsContent value="fundraisers" className="space-y-6">
            <FundraisersCarousel fundraisers={charityFundraisers} title="Active Fundraisers" />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid gap-6">
              {charity.recentProjects.map((project, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                        <p className="text-gray-600">{project.beneficiaries} people will benefit</p>
                      </div>
                      <Button className="bg-islamic-green-600 hover:bg-islamic-green-700">
                        Support This Project
                      </Button>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.raised} of {project.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-islamic-green-600 h-2 rounded-full" 
                          style={{ width: `${(parseInt(project.raised.replace(/[£,]/g, '')) / parseInt(project.target.replace(/[£,]/g, ''))) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>2024 Impact Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Emergency Response</h4>
                    <p className="text-gray-600">Provided immediate aid to 45,000 families across 12 crisis zones</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <Users className="h-8 w-8 text-green-600 mb-4" />
                    <h4 className="font-semibold text-lg mb-2">Education Programs</h4>
                    <p className="text-gray-600">Built 15 schools and educated 8,500 children</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
                    <p className="text-gray-700">To alleviate poverty and suffering through emergency relief, sustainable development, and advocacy for human dignity.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Focus Areas</h3>
                    <div className="flex flex-wrap gap-2">
                      {charity.focus.map((area, index) => (
                        <Badge key={index} variant="secondary">{area}</Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{charity.website}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{charity.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-gray-500" />
                        <span>{charity.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <AddCampaignForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CharityProfile;

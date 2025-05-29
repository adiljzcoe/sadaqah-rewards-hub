
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Building, MapPin, Star, Globe, Phone, Mail, Users, Award, TrendingUp } from 'lucide-react';

const BusinessProfile = () => {
  const { id } = useParams();
  
  const business = {
    name: 'Green Tech Solutions',
    industry: 'Renewable Energy',
    location: 'London, UK',
    rating: 4.8,
    employees: '500-1000',
    founded: '2015',
    website: 'www.greentechsolutions.com',
    phone: '+44 20 7123 4567',
    email: 'partnership@greentechsolutions.com',
    description: 'Leading renewable energy company committed to sustainable development and social responsibility. We partner with Your Jannah to multiply our charitable impact.',
    sadaqahContribution: '£125,000',
    pointsGenerated: '2.5M',
    employeesParticipating: '450',
    partnershipLevel: 'Platinum',
    sustainabilityGoals: ['Carbon Neutral by 2025', 'Clean Energy Access', 'Education Support']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center mb-4">
                <Building className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900 mr-4">{business.name}</h1>
                <Badge className="bg-purple-100 text-purple-800">
                  <Award className="h-3 w-3 mr-1" />
                  {business.partnershipLevel} Partner
                </Badge>
              </div>
              
              <div className="flex items-center space-x-6 text-gray-600 mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {business.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-current" />
                  {business.rating} Rating
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {business.employees} employees
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{business.description}</p>
            </div>
            
            <div className="ml-8">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Building className="h-5 w-5 mr-2" />
                Partner With Us
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{business.sadaqahContribution}</div>
              <div className="text-sm text-gray-600">Total Contributions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{business.pointsGenerated}</div>
              <div className="text-sm text-gray-600">Points Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{business.employeesParticipating}</div>
              <div className="text-sm text-gray-600">Active Employees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">3x</div>
              <div className="text-sm text-gray-600">Point Multiplier</div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="partnership" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partnership">Partnership Details</TabsTrigger>
            <TabsTrigger value="impact">Social Impact</TabsTrigger>
            <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="partnership">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Partnership Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Employees</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• 3x point multiplier on all donations</li>
                        <li>• Exclusive charity matching program</li>
                        <li>• Monthly impact reports</li>
                        <li>• Team building through giving</li>
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold">For Business</h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>• Enhanced CSR reporting</li>
                        <li>• Employee engagement boost</li>
                        <li>• Brand reputation enhancement</li>
                        <li>• Tax-efficient giving</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="impact">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-green-50 p-6 rounded-lg text-center">
                      <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-2">15,000</h4>
                      <p className="text-gray-600">Meals Provided</p>
                    </div>
                    <div className="bg-blue-50 p-6 rounded-lg text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-2">2,500</h4>
                      <p className="text-gray-600">Children Educated</p>
                    </div>
                    <div className="bg-purple-50 p-6 rounded-lg text-center">
                      <Award className="h-8 w-8 text-purple-600 mx-auto mb-4" />
                      <h4 className="font-semibold text-lg mb-2">50</h4>
                      <p className="text-gray-600">Wells Built</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold mb-3">Sustainability Goals</h3>
                  <div className="space-y-4">
                    {business.sustainabilityGoals.map((goal, index) => (
                      <div key={index} className="flex items-center p-4 bg-green-50 rounded-lg">
                        <Award className="h-5 w-5 text-green-600 mr-3" />
                        <span className="font-medium">{goal}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-gray-500" />
                    <span>{business.website}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-3 text-gray-500" />
                    <span>{business.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 mr-3 text-gray-500" />
                    <span>{business.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BusinessProfile;

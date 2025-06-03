import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import DonationWidget from '@/components/DonationWidget';
import CharityProductCard from '@/components/CharityProductCard';
import { ArrowLeft, MapPin, Users, Shield, Star, Globe, Phone, Mail, ExternalLink, Package } from 'lucide-react';
import { useCharityProducts } from '@/hooks/useCharityProducts';

// Mock charity data - in a real app this would come from an API
const charityData = {
  'islamic-relief': {
    id: 'islamic-relief',
    name: 'Islamic Relief',
    description: 'Islamic Relief is a faith-inspired humanitarian and development agency working to support and empower the world\'s most vulnerable communities.',
    fullDescription: 'For over 35 years, Islamic Relief has been working to alleviate poverty and suffering across the world. We provide emergency relief, sustainable development programmes, and support to orphans and vulnerable communities in over 40 countries.',
    logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop',
    location: 'Gaza, Palestine',
    website: 'https://islamicrelief.org',
    email: 'info@islamicrelief.org',
    phone: '+44 121 605 5555',
    beneficiaries: '50,000+',
    focus: 'Emergency Aid',
    verified: true,
    raised: '£250,000',
    rating: 4.9,
    projects: 12,
    countries: 15,
    yearEstablished: 1984,
    registrationNumber: 'CHY 6998',
    categories: ['Emergency Relief', 'Water & Sanitation', 'Education', 'Healthcare'],
    recentProjects: [
      {
        title: 'Gaza Emergency Food Parcels',
        description: 'Providing emergency food supplies to 1,000 families in Gaza',
        raised: 45000,
        target: 60000,
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=300&h=200&fit=crop'
      },
      {
        title: 'Syria Winter Relief',
        description: 'Winter clothing and heating for displaced families in Syria',
        raised: 32000,
        target: 40000,
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
      }
    ],
    impactStats: [
      { label: 'People Helped', value: '2.5M+', icon: Users },
      { label: 'Countries', value: '40+', icon: Globe },
      { label: 'Active Projects', value: '150+', icon: Star },
      { label: 'Volunteers', value: '1000+', icon: Users }
    ]
  },
  'muslim-aid': {
    id: 'muslim-aid',
    name: 'Muslim Aid',
    description: 'Muslim Aid works to tackle poverty, illiteracy, malnutrition, disease, injustice and natural disasters.',
    fullDescription: 'Since 1985, Muslim Aid has been working to tackle poverty and suffering around the world. We provide emergency relief and implement sustainable development programmes to help communities become self-sufficient.',
    logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&h=400&fit=crop',
    location: 'Syria',
    website: 'https://muslimaid.org',
    email: 'info@muslimaid.org',
    phone: '+44 20 7377 4200',
    beneficiaries: '25,000+',
    focus: 'Education',
    verified: true,
    raised: '£180,000',
    rating: 4.8,
    projects: 8,
    countries: 12,
    yearEstablished: 1985,
    registrationNumber: 'CHY 5555',
    categories: ['Education', 'Emergency Relief', 'Healthcare', 'Water'],
    recentProjects: [
      {
        title: 'Syrian School Reconstruction',
        description: 'Rebuilding schools destroyed by conflict in rural Syria',
        raised: 75000,
        target: 100000,
        image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop'
      }
    ],
    impactStats: [
      { label: 'Children Educated', value: '45K+', icon: Users },
      { label: 'Schools Built', value: '25+', icon: Star },
      { label: 'Countries', value: '12+', icon: Globe },
      { label: 'Teachers Trained', value: '500+', icon: Users }
    ]
  },
  'human-appeal': {
    id: 'human-appeal',
    name: 'Human Appeal',
    description: 'Human Appeal is a faith-based British international development and relief charity.',
    fullDescription: 'Human Appeal has been providing aid and tackling the root causes of poverty for over 25 years. We work in over 25 countries worldwide, providing emergency relief and long-term development programmes.',
    logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1594736797933-d0f1dd3d96d0?w=800&h=400&fit=crop',
    location: 'Yemen',
    website: 'https://humanappeal.org.uk',
    email: 'info@humanappeal.org.uk',
    phone: '+44 161 225 0225',
    beneficiaries: '30,000+',
    focus: 'Water Wells',
    verified: true,
    raised: '£320,000',
    rating: 4.9,
    projects: 15,
    countries: 25,
    yearEstablished: 1991,
    registrationNumber: 'CHY 1050005',
    categories: ['Water & Sanitation', 'Emergency Relief', 'Orphan Care', 'Healthcare'],
    recentProjects: [
      {
        title: 'Yemen Water Crisis Response',
        description: 'Building water wells and sanitation facilities in rural Yemen',
        raised: 180000,
        target: 250000,
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop'
      }
    ],
    impactStats: [
      { label: 'Wells Built', value: '500+', icon: Star },
      { label: 'People Reached', value: '1.2M+', icon: Users },
      { label: 'Countries', value: '25+', icon: Globe },
      { label: 'Orphans Supported', value: '8K+', icon: Users }
    ]
  },
  'matw-project': {
    id: 'matw-project',
    name: 'MATW Project',
    description: 'MATW Project is dedicated to providing aid and support to vulnerable communities worldwide.',
    fullDescription: 'The MATW Project focuses on sustainable development and emergency relief, with a particular emphasis on orphan care and community development programmes in Bangladesh and other developing nations.',
    logo: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=200&fit=crop&crop=center',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop',
    location: 'Bangladesh',
    website: 'https://matwproject.org',
    email: 'info@matwproject.org',
    phone: '+44 161 408 4400',
    beneficiaries: '15,000+',
    focus: 'Orphan Care',
    verified: true,
    raised: '£95,000',
    rating: 4.7,
    projects: 6,
    countries: 8,
    yearEstablished: 2000,
    registrationNumber: 'CHY 1097307',
    categories: ['Orphan Care', 'Education', 'Community Development', 'Healthcare'],
    recentProjects: [
      {
        title: 'Bangladesh Orphan Support',
        description: 'Educational and nutritional support for orphaned children',
        raised: 35000,
        target: 50000,
        image: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=300&h=200&fit=crop'
      }
    ],
    impactStats: [
      { label: 'Orphans Supported', value: '2.5K+', icon: Users },
      { label: 'Schools', value: '15+', icon: Star },
      { label: 'Countries', value: '8+', icon: Globe },
      { label: 'Communities', value: '50+', icon: Users }
    ]
  }
};

const CharityProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number | null>(null);
  
  const charity = id ? charityData[id as keyof typeof charityData] : null;
  const { data: products, isLoading: productsLoading } = useCharityProducts(charity?.id || '');

  if (!charity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Charity Not Found</h1>
            <Button onClick={() => navigate('/charity-partners')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Charity Partners
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleProductDonate = (productId: string, amount?: number) => {
    setSelectedProductId(productId);
    setCustomAmount(amount || null);
    // In a real app, this would open a donation modal or navigate to checkout
    console.log('Donating to product:', productId, 'Amount:', amount);
  };

  const groupedProducts = products?.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof products>) || {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="outline" 
          onClick={() => navigate('/charity-partners')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Charity Partners
        </Button>

        {/* Hero Section */}
        <div className="relative mb-8">
          <div className="h-64 bg-gradient-to-r from-islamic-green-600 to-blue-600 rounded-xl overflow-hidden">
            <img 
              src={charity.coverImage} 
              alt={charity.name}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="absolute -bottom-16 left-8">
            <div className="bg-white rounded-xl p-4 shadow-lg border">
              <img 
                src={charity.logo} 
                alt={`${charity.name} logo`}
                className="w-24 h-24 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">
                  <Package className="h-4 w-4 mr-2" />
                  Products
                </TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-3xl text-islamic-green-800 mb-2">
                          {charity.name}
                          {charity.verified && (
                            <Badge className="ml-3 bg-islamic-green-100 text-islamic-green-800">
                              <Shield className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {charity.location}
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                            {charity.rating}
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {charity.beneficiaries}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-6">{charity.fullDescription}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-islamic-green-600">{charity.raised}</div>
                        <div className="text-sm text-gray-600">Total Raised</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{charity.projects}</div>
                        <div className="text-sm text-gray-600">Active Projects</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{charity.countries}+</div>
                        <div className="text-sm text-gray-600">Countries</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {charity.categories.map((category, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-sm text-gray-600">Website</div>
                          <a href={charity.website} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline flex items-center">
                            {charity.website.replace('https://', '')}
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Mail className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="text-sm text-gray-600">Email</div>
                          <a href={`mailto:${charity.email}`} className="text-green-600 hover:underline">
                            {charity.email}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-sm text-gray-600">Phone</div>
                          <a href={`tel:${charity.phone}`} className="text-purple-600 hover:underline">
                            {charity.phone}
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-orange-600" />
                        <div>
                          <div className="text-sm text-gray-600">Registration</div>
                          <div className="font-medium">{charity.registrationNumber}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {charity.recentProjects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Progress</span>
                              <span className="text-sm font-medium">
                                £{project.raised.toLocaleString()} / £{project.target.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-islamic-green-600 h-2 rounded-full" 
                                style={{ width: `${(project.raised / project.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                {productsLoading ? (
                  <div className="text-center py-8">
                    <div className="text-gray-600">Loading products...</div>
                  </div>
                ) : products && products.length > 0 ? (
                  <div className="space-y-8">
                    {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                      <div key={category}>
                        <h3 className="text-xl font-bold mb-4 text-islamic-green-800">{category}</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {categoryProducts.map((product) => (
                            <CharityProductCard
                              key={product.id}
                              product={product}
                              onDonate={handleProductDonate}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Products Available</h3>
                      <p className="text-gray-600">This charity hasn't added any products yet.</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="projects" className="space-y-6">
                {/* Recent Projects - keep existing code */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      {charity.recentProjects.map((project, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                            <p className="text-gray-600 mb-4">{project.description}</p>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-600">Progress</span>
                              <span className="text-sm font-medium">
                                £{project.raised.toLocaleString()} / £{project.target.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-islamic-green-600 h-2 rounded-full" 
                                style={{ width: `${(project.raised / project.target) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Widget */}
            <DonationWidget
              charityId={charity.id}
              title={`Support ${charity.name}`}
              description="Your donation goes directly to this charity"
              defaultAmount={50}
            />

            {/* Impact Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Impact Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {charity.impactStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-5 w-5 text-islamic-green-600" />
                          <span className="text-gray-700">{stat.label}</span>
                        </div>
                        <span className="font-bold text-islamic-green-700">{stat.value}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Facts */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Established</span>
                  <span className="font-medium">{charity.yearEstablished}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Area</span>
                  <span className="font-medium">{charity.focus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                    <span className="font-medium">{charity.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Verification</span>
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityProfile;

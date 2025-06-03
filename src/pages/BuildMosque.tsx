
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, MapPin, Users, Calendar, Heart, Star, Trophy, Target } from 'lucide-react';

const BuildMosque = () => {
  const mosqueProjects = [
    {
      id: 1,
      name: "Central Community Mosque",
      location: "Birmingham, UK",
      description: "A modern mosque serving 2,000+ families with community center, school, and sports facilities.",
      targetAmount: 500000,
      raisedAmount: 287500,
      donorsCount: 1250,
      daysLeft: 45,
      capacity: 2000,
      features: ["Prayer Hall", "Community Center", "Islamic School", "Sports Complex", "Car Park"],
      urgency: "high",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Riverside Family Mosque",
      location: "Manchester, UK",
      description: "Family-focused mosque with dedicated women's section, children's area, and elderly care facilities.",
      targetAmount: 300000,
      raisedAmount: 195000,
      donorsCount: 890,
      daysLeft: 60,
      capacity: 1200,
      features: ["Family Prayer Areas", "Women's Section", "Children's Area", "Elderly Care", "Library"],
      urgency: "medium",
      image: "/placeholder.svg"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Build a Mosque
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Support the construction of beautiful mosques that will serve communities for generations. 
            Every donation helps create a sacred space for worship, community gathering, and spiritual growth.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Building className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Sacred Spaces</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Community Centers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Lasting Legacy</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Mosques Built</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm opacity-90">People Served</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">£2.3M</div>
              <div className="text-sm opacity-90">Total Raised</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm opacity-90">Average Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Active Mosque Projects</h2>
          
          {mosqueProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover-lift">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getUrgencyColor(project.urgency)} border`}>
                      {project.urgency.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.name}</h3>
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">Capacity</div>
                      <div className="text-lg font-bold">{project.capacity.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{project.description}</p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Project Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold">
                        £{project.raisedAmount.toLocaleString()} of £{project.targetAmount.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(project.raisedAmount / project.targetAmount) * 100} 
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {project.donorsCount.toLocaleString()} donors
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.daysLeft} days left
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="px-6">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
              </h3>
              <p className="text-lg opacity-90">- Prophet Muhammad (ﷺ) - Sahih Bukhari</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildMosque;

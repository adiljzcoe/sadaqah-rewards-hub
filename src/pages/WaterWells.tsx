import React from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Droplets, MapPin, Users, Calendar, Heart, Star, Trophy, Target } from 'lucide-react';

const WaterWells = () => {
  const waterProjects = [
    {
      id: 1,
      name: "Somalia Emergency Wells",
      location: "Drought-affected regions",
      description: "Urgent water well construction to provide clean water access to communities facing severe drought.",
      targetAmount: 75000,
      raisedAmount: 48750,
      donorsCount: 892,
      daysLeft: 12,
      beneficiaries: 5000,
      wellsNeeded: 15,
      urgency: "critical",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Yemen Community Wells",
      location: "Rural Yemen villages",
      description: "Building sustainable water wells with hand pumps for villages without access to clean water.",
      targetAmount: 50000,
      raisedAmount: 32500,
      donorsCount: 567,
      daysLeft: 25,
      beneficiaries: 3200,
      wellsNeeded: 10,
      urgency: "high",
      image: "/placeholder.svg"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Water Wells
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Provide the gift of clean water to communities in need. Every well you help build serves hundreds of families 
            and transforms entire communities with this life-giving resource.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Clean Water Access</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Community Impact</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Life-Saving</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">347</div>
              <div className="text-sm opacity-90">Wells Built</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">180K+</div>
              <div className="text-sm opacity-90">People Served</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">£1.8M</div>
              <div className="text-sm opacity-90">Total Raised</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-teal-500 to-blue-500 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">25</div>
              <div className="text-sm opacity-90">Countries</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Urgent Water Projects</h2>
          
          {waterProjects.map((project) => (
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
                      {project.urgency.toUpperCase()}
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
                      <div className="text-sm text-gray-500">Beneficiaries</div>
                      <div className="text-lg font-bold">{project.beneficiaries.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{project.description}</p>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{project.wellsNeeded}</div>
                      <div className="text-sm text-blue-800">Wells Needed</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-emerald-600">£{(project.targetAmount / project.wellsNeeded).toLocaleString()}</div>
                      <div className="text-sm text-emerald-800">Per Well</div>
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
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
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

        {/* Impact Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "Whoever digs a well will be rewarded by Allah for every animal that drinks from it until the Day of Judgment."
              </h3>
              <p className="text-lg opacity-90">- Prophet Muhammad (ﷺ)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterWells;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, MapPin, Users, Calendar, Baby, BookOpen, Home, Utensils } from 'lucide-react';

const Orphanages = () => {
  const orphanageProjects = [
    {
      id: 1,
      name: "Gaza Children's Home",
      location: "Gaza, Palestine",
      description: "Emergency support for orphaned children affected by conflict, providing shelter, food, education, and psychological care.",
      targetAmount: 120000,
      raisedAmount: 78000,
      donorsCount: 1456,
      daysLeft: 18,
      childrenServed: 150,
      monthlySupport: 800,
      urgency: "critical",
      image: "/placeholder.svg",
      needs: ["Emergency Shelter", "Food & Nutrition", "Education", "Medical Care", "Psychological Support"]
    },
    {
      id: 2,
      name: "Syria Hope Orphanage",
      location: "Aleppo, Syria",
      description: "Comprehensive care for refugee orphans including education, healthcare, and vocational training programs.",
      targetAmount: 85000,
      raisedAmount: 52750,
      donorsCount: 923,
      daysLeft: 35,
      childrenServed: 95,
      monthlySupport: 650,
      urgency: "high",
      image: "/placeholder.svg",
      needs: ["Educational Materials", "Healthcare", "Clothing", "Nutrition", "Skills Training"]
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-purple-50/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full">
              <Baby className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Support Orphanages
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Provide love, care, and hope to orphaned children around the world. Your support helps create safe homes 
            where children can grow, learn, and build bright futures despite their difficult circumstances.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Baby className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Child Care</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Education</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Home className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Safe Homes</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <Baby className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm opacity-90">Children Supported</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Home className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">34</div>
              <div className="text-sm opacity-90">Orphanages</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">89%</div>
              <div className="text-sm opacity-90">In Education</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">£890K</div>
              <div className="text-sm opacity-90">Total Raised</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Urgent Orphanage Support</h2>
          
          {orphanageProjects.map((project) => (
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
                      <div className="text-sm text-gray-500">Children Served</div>
                      <div className="text-lg font-bold">{project.childrenServed}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{project.description}</p>

                  {/* Needs */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Current Needs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.needs.map((need, index) => (
                        <Badge key={index} variant="outline" className="bg-pink-50 text-pink-700 border-pink-200">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Support Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">£{project.monthlySupport}</div>
                      <div className="text-sm text-purple-800">Monthly Support</div>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-pink-600">£{Math.round(project.monthlySupport / project.childrenServed)}</div>
                      <div className="text-sm text-pink-800">Per Child/Month</div>
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
                    <Button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                    <Button variant="outline" className="px-6">
                      Sponsor a Child
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Hadith Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "I and the one who sponsors an orphan will be in Paradise like these two fingers."
              </h3>
              <p className="text-lg opacity-90">- Prophet Muhammad (ﷺ) - Sahih Bukhari</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orphanages;

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Search, Filter, MapPin, Calendar, Target, Users, Star } from 'lucide-react';

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const campaigns = [
    {
      id: 1,
      title: "Emergency Water Wells in Somalia",
      charity: "Water Wells Foundation",
      category: "Water",
      description: "Providing clean water access to rural communities affected by drought.",
      raised: 45000,
      target: 60000,
      donors: 234,
      daysLeft: 12,
      image: "/placeholder.svg",
      featured: true,
      multiplier: "2x Points"
    },
    {
      id: 2,
      title: "School Building in Bangladesh",
      charity: "Education for All",
      category: "Education",
      description: "Building a new school for 300 children in remote village.",
      raised: 28000,
      target: 35000,
      donors: 156,
      daysLeft: 25,
      image: "/placeholder.svg",
      featured: false,
      multiplier: null
    },
    {
      id: 3,
      title: "Mobile Medical Clinic",
      charity: "Medical Aid International",
      category: "Healthcare",
      description: "Bringing healthcare to underserved communities.",
      raised: 15000,
      target: 40000,
      donors: 89,
      daysLeft: 45,
      image: "/placeholder.svg",
      featured: true,
      multiplier: "3x Points"
    },
    {
      id: 4,
      title: "Food Security Program",
      charity: "Food Bank Network",
      category: "Food",
      description: "Providing nutritious meals to families in need.",
      raised: 32000,
      target: 50000,
      donors: 278,
      daysLeft: 8,
      image: "/placeholder.svg",
      featured: false,
      multiplier: null
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.charity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || campaign.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Active Campaigns
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Support meaningful causes and earn <span className="vibrant-text-emerald font-semibold">Jannah Points</span> while making a difference
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
                <SelectItem value="food">Food</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Featured Campaign */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500" />
            Featured Campaign
          </h2>
          {campaigns.filter(c => c.featured)[0] && (
            <Card className="p-8 hover-lift bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      Featured
                    </Badge>
                    {campaigns[0].multiplier && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        {campaigns[0].multiplier}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{campaigns[0].title}</h3>
                  <p className="text-gray-700 mb-4">{campaigns[0].description}</p>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-semibold">£{campaigns[0].raised.toLocaleString()} of £{campaigns[0].target.toLocaleString()}</span>
                    </div>
                    <Progress value={(campaigns[0].raised / campaigns[0].target) * 100} className="h-3" />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{campaigns[0].donors} donors</span>
                      <span>{campaigns[0].daysLeft} days left</span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white">
                    <Heart className="h-4 w-4 mr-2" />
                    Donate Now
                  </Button>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <img src={campaigns[0].image} alt={campaigns[0].title} className="w-full h-64 object-cover rounded-lg" />
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="overflow-hidden hover-lift">
              <div className="relative">
                <img src={campaign.image} alt={campaign.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-white/90 text-gray-800">{campaign.category}</Badge>
                  {campaign.multiplier && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                      {campaign.multiplier}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-lg text-gray-900 mb-2">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{campaign.charity}</p>
                <p className="text-gray-700 mb-4 text-sm">{campaign.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>£{campaign.raised.toLocaleString()}</span>
                    <span className="font-semibold">£{campaign.target.toLocaleString()}</span>
                  </div>
                  <Progress value={(campaign.raised / campaign.target) * 100} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {campaign.donors} donors
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {campaign.daysLeft} days left
                    </span>
                  </div>
                </div>
                
                <Button className="w-full professional-button vibrant-gradient text-white">
                  <Heart className="h-4 w-4 mr-2" />
                  Donate
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;

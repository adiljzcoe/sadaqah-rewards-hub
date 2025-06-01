import React, { useState } from 'react';
import Header from '@/components/Header';
import ProjectDonationWidget from '@/components/ProjectDonationWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer, Star, Trophy, Zap, Gift, Crown, Droplets } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 250, description: 'Single Water Point', color: 'from-cyan-400 to-blue-600', badge: '💧' },
  { pieces: 2, price: 500, description: 'Double Impact', color: 'from-blue-400 to-cyan-600', badge: '⚡' },
  { pieces: 4, price: 1000, description: 'Community Builder', color: 'from-teal-400 to-cyan-600', badge: '🏗️' },
  { pieces: 6, price: 1500, description: 'Water Champion', color: 'from-cyan-400 to-teal-600', badge: '🏆' },
  { pieces: 10, price: 2500, description: 'Well Sponsor', color: 'from-blue-500 to-teal-500', badge: '🌟' },
  { pieces: 20, price: 5000, description: 'Village Patron', color: 'from-cyan-500 to-blue-500', badge: '👑' }
];

const wellProjects = [
  {
    id: 1,
    title: 'Village Well - Somalia',
    status: 'completed',
    location: 'Rural Somalia',
    raised: 15000,
    goal: 15000,
    pricePerSpace: 250,
    image: '🌊',
    completedDate: '2023-12-15',
    achievement: 'Water Hero',
    supporters: 60,
    description: 'Deep borehole well serving 800+ villagers daily'
  },
  {
    id: 2,
    title: 'Solar Well - Yemen',
    status: 'building',
    location: 'Northern Yemen',
    raised: 18000,
    goal: 18000,
    pricePerSpace: 300,
    image: '🌊',
    estimatedCompletion: '2024-07-15',
    supporters: 60,
    description: 'Solar-powered well with water storage tank'
  },
  {
    id: 3,
    title: 'Community Well - Chad',
    status: 'funding',
    location: 'Rural Chad',
    raised: 8750,
    goal: 12500,
    pricePerSpace: 250,
    image: '🌊',
    supporters: 35,
    description: 'Hand-pump well for remote village'
  },
  {
    id: 4,
    title: 'School Well - Mali',
    status: 'funding',
    location: 'Central Mali',
    raised: 4200,
    goal: 10000,
    pricePerSpace: 200,
    image: '🌊',
    supporters: 21,
    description: 'Well serving school and surrounding community'
  }
];

const WaterWells = () => {
  const [selectedPieces, setSelectedPieces] = useState(1);
  const [customPieces, setCustomPieces] = useState('');
  const [selectedProject, setSelectedProject] = useState(wellProjects.find(p => p.status === 'funding') || wellProjects[2]);
  
  const progressPercentage = (selectedProject.raised / selectedProject.goal) * 100;
  
  const selectedTier = donationTiers.find(tier => tier.pieces === selectedPieces);
  const customAmount = customPieces ? parseInt(customPieces) * selectedProject.pricePerSpace : 0;
  const finalAmount = customPieces ? customAmount : selectedTier ? selectedTier.pieces * selectedProject.pricePerSpace : 0;
  const finalPieces = customPieces ? parseInt(customPieces) : selectedPieces;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white animate-bounce-in border-0 shadow-lg"><CheckCircle className="h-3 w-3 mr-1" />Built & Flowing</Badge>;
      case 'building':
        return <Badge className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white animate-float border-0 shadow-lg"><Hammer className="h-3 w-3 mr-1" />Under Construction</Badge>;
      case 'funding':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white animate-glow border-0 shadow-lg"><Clock className="h-3 w-3 mr-1" />Needs Funding</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleProjectSelect = (project: typeof wellProjects[0]) => {
    setSelectedProject(project);
    setSelectedPieces(1);
    setCustomPieces('');
  };

  const fundingProjects = wellProjects.filter(p => p.status === 'funding');
  const buildingProjects = wellProjects.filter(p => p.status === 'building');
  const completedProjects = wellProjects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Header />
      <ProjectDonationWidget projectType="waterwell" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300 rounded-3xl blur-3xl opacity-30 animate-rainbow"></div>
            <div className="relative">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-lg blur-lg opacity-60 animate-glow"></div>
                <div className="relative w-full h-48 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-2xl border-4 border-white mx-auto max-w-2xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="text-8xl animate-float">🌊</div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-in">
                  <Droplets className="h-4 w-4 inline mr-1 animate-sparkle" />
                  CLEAN WATER FOR ALL
                </div>
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 bg-clip-text text-transparent animate-slide-in-bounce">
                🌊 Build Water Wells Worldwide 🌊
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                Bring life-giving water to communities in need! Every water point you fund saves lives! 💧
              </p>
            </div>
          </div>

          {/* Project Selection Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-number-pop">
              🎯 Choose Your Water Project 🎯
            </h2>
            
            {/* Funding Needed Section */}
            {fundingProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2 animate-wiggle">
                  <Zap className="h-6 w-6 animate-sparkle" />
                  🚨 Urgent: Needs Water
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundingProjects.map((project) => (
                    <Card 
                      key={project.id} 
                      className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:rotate-1 border-3 professional-card ${
                        selectedProject.id === project.id 
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-2xl scale-105 animate-glow' 
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-blue-50'
                      }`}
                      onClick={() => handleProjectSelect(project)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{project.image}</div>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardTitle className="text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{project.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-blue-500" />
                          {project.location}
                        </p>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                              <span className="text-cyan-600">£{project.raised.toLocaleString()}</span>
                              <span className="text-blue-600">£{project.goal.toLocaleString()}</span>
                            </div>
                            <Progress value={(project.raised / project.goal) * 100} className="h-3 bg-gray-200" />
                            <div className="text-xs text-center mt-1 font-bold text-blue-600 animate-number-pop">
                              {Math.round((project.raised / project.goal) * 100)}% Funded
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center text-teal-600">
                              <Users className="h-3 w-3 mr-1" />
                              {project.supporters} supporters
                            </span>
                            <span className="font-bold text-blue-600">
                              £{project.pricePerSpace}/point
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Other sections for building and completed projects... */}
            {/* Building Section */}
            {buildingProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-teal-600 flex items-center gap-2">
                  <Hammer className="h-6 w-6 animate-wiggle" />
                  🏗️ Under Construction
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buildingProjects.map((project) => (
                    <Card key={project.id} className="border-teal-200 bg-gradient-to-br from-teal-50 to-cyan-50 professional-card hover:scale-105 transition-transform duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{project.image}</div>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </p>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Progress value={100} className="h-3" />
                            <div className="text-xs text-center mt-1 font-bold text-teal-600">
                              Fully Funded - Drilling In Progress
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {project.supporters} supporters
                            </span>
                            <span className="text-teal-600 font-bold">
                              Est: {project.estimatedCompletion}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Section */}
            {completedProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-cyan-600 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 animate-sparkle" />
                  ✅ Flowing & Complete
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedProjects.map((project) => (
                    <Card key={project.id} className="border-cyan-200 bg-gradient-to-br from-cyan-50 to-blue-50 professional-card hover:scale-105 transition-transform duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{project.image}</div>
                          {getStatusBadge(project.status)}
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </p>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Progress value={100} className="h-3" />
                            <div className="text-xs text-center mt-1 font-bold text-cyan-600">
                              100% Complete - Providing Clean Water!
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {project.supporters} supporters
                            </span>
                            <span className="text-cyan-600 font-bold">
                              Completed: {project.completedDate}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Selected Project Progress */}
            <div className="lg:col-span-2">
              <Card className="mb-6 border-4 border-gradient-to-r from-cyan-300 to-blue-300 shadow-2xl bg-gradient-to-br from-white to-cyan-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 animate-bounce-in" />
                    Selected: {selectedProject.title}
                    <Droplets className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-cyan-100 font-semibold">{selectedProject.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedProject.raised.toLocaleString()} 
                      </div>
                      <span className="text-xl text-gray-600 font-bold">raised of</span> 
                      <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedProject.goal.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="relative mb-6">
                      <Progress value={progressPercentage} className="h-8 bg-gray-200 shadow-inner" />
                      <div className="absolute inset-0 h-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 rounded-full overflow-hidden animate-rainbow" 
                           style={{ width: `${progressPercentage}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                        {Math.round(progressPercentage)}% FUNDED! 💧
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-8 text-lg font-bold">
                      <div className="flex items-center bg-gradient-to-r from-blue-100 to-cyan-100 px-4 py-2 rounded-full shadow-lg animate-float">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-blue-800">{selectedProject.supporters} Heroes</span>
                      </div>
                      <div className="flex items-center bg-gradient-to-r from-cyan-100 to-teal-100 px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                        <span className="text-cyan-800">£{selectedProject.pricePerSpace}/point</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Section */}
              <Card className="border-4 border-gradient-to-r from-blue-300 to-teal-300 shadow-2xl bg-gradient-to-br from-white to-blue-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 animate-bounce-in" />
                    Fund {selectedProject.title}
                    <Droplets className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-blue-100 font-semibold">Each water point costs £{selectedProject.pricePerSpace} 💧</p>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Water Point Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {donationTiers.map((tier) => (
                      <div
                        key={tier.pieces}
                        onClick={() => {
                          setSelectedPieces(tier.pieces);
                          setCustomPieces('');
                        }}
                        className={`cursor-pointer p-5 rounded-xl border-3 transition-all duration-500 text-center transform hover:scale-110 hover:rotate-2 shadow-lg professional-card ${
                          selectedPieces === tier.pieces && !customPieces
                            ? `border-blue-500 bg-gradient-to-br ${tier.color} text-white scale-110 shadow-2xl animate-glow`
                            : 'border-gray-300 hover:border-blue-400 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl'
                        }`}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="text-3xl animate-float">{tier.badge}</div>
                        </div>
                        
                        <div className={`font-bold text-lg ${selectedPieces === tier.pieces && !customPieces ? 'text-white' : 'text-gray-900'}`}>
                          {tier.pieces} Point{tier.pieces > 1 ? 's' : ''}
                        </div>
                        <div className={`text-2xl font-black ${selectedPieces === tier.pieces && !customPieces ? 'text-yellow-200' : 'text-blue-600'}`}>
                          £{tier.pieces * selectedProject.pricePerSpace}
                        </div>
                        <div className={`text-sm font-bold ${selectedPieces === tier.pieces && !customPieces ? 'text-blue-100' : 'text-gray-600'}`}>
                          {tier.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-300 shadow-lg professional-card">
                    <label className="block text-lg font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <Droplets className="h-5 w-5 animate-sparkle" />
                      Custom Amount (£{selectedProject.pricePerSpace} per water point)
                      <Crown className="h-5 w-5 text-cyan-600" />
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Enter number of water points"
                        value={customPieces}
                        onChange={(e) => {
                          setCustomPieces(e.target.value);
                          setSelectedPieces(0);
                        }}
                        className="flex-1 p-4 border-2 border-blue-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 text-lg font-bold bg-white shadow-inner transition-all duration-300"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setCustomPieces('')}
                        disabled={!customPieces}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0 hover:from-cyan-600 hover:to-blue-600 shadow-lg transition-all duration-300"
                      >
                        Clear
                      </Button>
                    </div>
                    {customPieces && (
                      <div className="mt-3 text-center">
                        <div className="text-2xl font-black text-blue-600 animate-number-pop">
                          💧 {customPieces} water points = £{customAmount} 💧
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Impact Visualization */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 border-3 border-cyan-300 rounded-xl shadow-lg professional-card animate-rainbow">
                    <h4 className="font-black text-xl text-white mb-3 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-300 animate-sparkle" />
                      Your Life-Giving Impact:
                      <Trophy className="h-6 w-6 text-yellow-300 animate-bounce-in" />
                    </h4>
                    <div className="text-3xl font-black text-white animate-number-pop">
                      💧 {finalPieces} water point{finalPieces > 1 ? 's' : ''} = £{finalAmount} 💧
                    </div>
                    <div className="text-lg font-bold text-yellow-100 mt-2">
                      You're bringing clean water to {selectedProject.title}! 🌊✨
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 hover:from-cyan-600 hover:via-blue-600 hover:to-teal-600 text-white py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white animate-glow"
                    disabled={!finalAmount || selectedProject.status !== 'funding'}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Droplets className="h-6 w-6 animate-sparkle" />
                      {selectedProject.status === 'funding' 
                        ? `FUND ${selectedProject.title} - £${finalAmount}`
                        : selectedProject.status === 'building' 
                        ? 'WELL UNDER CONSTRUCTION'
                        : 'WELL COMPLETED'
                      }
                      <Crown className="h-6 w-6 animate-bounce-in" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-3 border-gradient-to-r from-cyan-300 to-blue-300 shadow-xl bg-gradient-to-br from-white to-cyan-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 animate-bounce-in" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center text-sm font-bold">
                    <MapPin className="h-4 w-4 mr-2 text-cyan-600" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{selectedProject.supporters} supporters</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <span className="text-teal-600">£{selectedProject.pricePerSpace} per water point</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-gradient-to-r from-blue-300 to-teal-300 shadow-xl bg-gradient-to-br from-white to-blue-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-sparkle" />
                    Global Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>Total Projects:</span>
                      <span className="text-blue-600">{wellProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="text-cyan-600">{completedProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building:</span>
                      <span className="text-teal-600">{buildingProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Need Funding:</span>
                      <span className="text-blue-600">{fundingProjects.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-r from-cyan-500 via-blue-500 to-teal-500 text-white p-10 rounded-2xl shadow-2xl animate-rainbow">
            <h3 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Star className="h-8 w-8 animate-sparkle" />
              Bring Clean Water Worldwide
              <Crown className="h-8 w-8 animate-bounce-in" />
            </h3>
            <p className="text-xl mb-6 font-bold">
              Join thousands of water heroes in our mission to provide clean water across the globe. 
              Each water point brings life to communities in desperate need! 🚀✨
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-yellow-100 font-black text-xl px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-500 border-4 border-cyan-400"
            >
              <Trophy className="h-6 w-6 mr-2" />
              START FUNDING NOW
              <Droplets className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterWells;

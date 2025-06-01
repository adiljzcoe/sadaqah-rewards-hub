import React, { useState } from 'react';
import Header from '@/components/Header';
import ProjectDonationWidget from '@/components/ProjectDonationWidget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer, Star, Trophy, Zap, Gift, Crown, Heart } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 150, description: 'Single Child Support', color: 'from-pink-400 to-rose-600', badge: '💝' },
  { pieces: 2, price: 300, description: 'Double Care', color: 'from-rose-400 to-pink-600', badge: '⚡' },
  { pieces: 4, price: 600, description: 'Family Builder', color: 'from-purple-400 to-pink-600', badge: '🏗️' },
  { pieces: 6, price: 900, description: 'Care Champion', color: 'from-pink-400 to-purple-600', badge: '🏆' },
  { pieces: 10, price: 1500, description: 'Home Sponsor', color: 'from-rose-500 to-purple-500', badge: '🌟' },
  { pieces: 20, price: 3000, description: 'Guardian Angel', color: 'from-pink-500 to-rose-500', badge: '👑' }
];

const orphanageProjects = [
  {
    id: 1,
    title: 'Safe Haven - Syria',
    status: 'completed',
    location: 'Aleppo, Syria',
    raised: 45000,
    goal: 45000,
    pricePerSpace: 150,
    image: '🏠',
    completedDate: '2023-11-10',
    achievement: 'Guardian Angel',
    supporters: 300,
    description: 'Complete orphanage home for 50 children with education facilities'
  },
  {
    id: 2,
    title: 'Hope House - Gaza',
    status: 'building',
    location: 'Gaza Strip',
    raised: 30000,
    goal: 30000,
    pricePerSpace: 200,
    image: '🏠',
    estimatedCompletion: '2024-09-15',
    supporters: 150,
    description: 'Modern orphanage with medical clinic and school'
  },
  {
    id: 3,
    title: 'New Beginnings - Somalia',
    status: 'funding',
    location: 'Mogadishu, Somalia',
    raised: 18750,
    goal: 37500,
    pricePerSpace: 125,
    image: '🏠',
    supporters: 150,
    description: 'Orphanage and vocational training center'
  },
  {
    id: 4,
    title: 'Future Stars - Yemen',
    status: 'funding',
    location: 'Sanaa, Yemen',
    raised: 12000,
    goal: 30000,
    pricePerSpace: 100,
    image: '🏠',
    supporters: 120,
    description: 'Safe home for war orphans with psychological support'
  },
  {
    id: 5,
    title: 'Little Angels - Myanmar',
    status: 'funding',
    location: 'Rakhine State',
    raised: 8500,
    goal: 25000,
    pricePerSpace: 125,
    image: '🏠',
    supporters: 68,
    description: 'Refuge for displaced children with education'
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-gradient-to-r from-pink-500 to-rose-600 text-white animate-bounce-in border-0 shadow-lg"><CheckCircle className="h-3 w-3 mr-1" />Home & Complete</Badge>;
    case 'building':
      return <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white animate-float border-0 shadow-lg"><Hammer className="h-3 w-3 mr-1" />Under Construction</Badge>;
    case 'funding':
      return <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white animate-glow border-0 shadow-lg"><Clock className="h-3 w-3 mr-1" />Needs Funding</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

const Orphanages = () => {
  const [selectedPieces, setSelectedPieces] = useState(1);
  const [customPieces, setCustomPieces] = useState('');
  const [selectedProject, setSelectedProject] = useState(orphanageProjects.find(p => p.status === 'funding') || orphanageProjects[2]);
  
  const progressPercentage = (selectedProject.raised / selectedProject.goal) * 100;
  
  const selectedTier = donationTiers.find(tier => tier.pieces === selectedPieces);
  const customAmount = customPieces ? parseInt(customPieces) * selectedProject.pricePerSpace : 0;
  const finalAmount = customPieces ? customAmount : selectedTier ? selectedTier.pieces * selectedProject.pricePerSpace : 0;
  const finalPieces = customPieces ? parseInt(customPieces) : selectedPieces;

  const handleProjectSelect = (project: typeof orphanageProjects[0]) => {
    setSelectedProject(project);
    setSelectedPieces(1);
    setCustomPieces('');
  };

  const fundingProjects = orphanageProjects.filter(p => p.status === 'funding');
  const buildingProjects = orphanageProjects.filter(p => p.status === 'building');
  const completedProjects = orphanageProjects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <Header />
      <ProjectDonationWidget projectType="orphanage" sticky={false} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 rounded-3xl blur-3xl opacity-30 animate-rainbow"></div>
            <div className="relative">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-300 to-pink-300 rounded-lg blur-lg opacity-60 animate-glow"></div>
                <div className="relative w-full h-48 bg-gradient-to-r from-rose-400 to-pink-500 rounded-lg shadow-2xl border-4 border-white mx-auto max-w-2xl transform hover:scale-105 transition-transform duration-300 flex items-center justify-center">
                  <div className="text-8xl animate-float">🏠</div>
                </div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-in">
                  <Heart className="h-4 w-4 inline mr-1 animate-sparkle" />
                  SAFE HOMES FOR ALL
                </div>
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 bg-clip-text text-transparent animate-slide-in-bounce">
                🏠 Build Orphanages Worldwide 🏠
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                Create safe havens for vulnerable children! Every space you fund transforms a life and builds your house in Paradise! 💝
              </p>
            </div>
          </div>

          {/* Project Selection Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent animate-number-pop">
              🎯 Choose Your Orphanage Project 🎯
            </h2>
            
            {/* Funding Needed Section */}
            {fundingProjects.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-rose-600 flex items-center gap-2 animate-wiggle">
                  <Zap className="h-6 w-6 animate-sparkle" />
                  🚨 Urgent: Children Need Homes
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundingProjects.map((project) => (
                    <Card 
                      key={project.id} 
                      className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:rotate-1 border-3 professional-card ${
                        selectedProject.id === project.id 
                          ? 'border-rose-500 bg-gradient-to-br from-rose-50 to-pink-50 shadow-2xl scale-105 animate-glow' 
                          : 'border-gray-200 hover:border-rose-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-rose-50'
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
                          <MapPin className="h-3 w-3 mr-1 text-rose-500" />
                          {project.location}
                        </p>
                        <p className="text-xs text-gray-500">{project.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                              <span className="text-pink-600">£{project.raised.toLocaleString()}</span>
                              <span className="text-rose-600">£{project.goal.toLocaleString()}</span>
                            </div>
                            <Progress value={(project.raised / project.goal) * 100} className="h-3 bg-gray-200" />
                            <div className="text-xs text-center mt-1 font-bold text-rose-600 animate-number-pop">
                              {Math.round((project.raised / project.goal) * 100)}% Funded
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center text-purple-600">
                              <Users className="h-3 w-3 mr-1" />
                              {project.supporters} supporters
                            </span>
                            <span className="font-bold text-rose-600">
                              £{project.pricePerSpace}/space
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Building and Completed sections... */}
            {/* ... keep existing code (building and completed sections) ... */}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Selected Project Progress */}
            <div className="lg:col-span-2">
              <Card className="mb-6 border-4 border-gradient-to-r from-pink-300 to-rose-300 shadow-2xl bg-gradient-to-br from-white to-pink-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 animate-bounce-in" />
                    Selected: {selectedProject.title}
                    <Heart className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-pink-100 font-semibold">{selectedProject.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl font-black bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedProject.raised.toLocaleString()} 
                      </div>
                      <span className="text-xl text-gray-600 font-bold">raised of</span> 
                      <div className="text-4xl font-black bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedProject.goal.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="relative mb-6">
                      <Progress value={progressPercentage} className="h-8 bg-gray-200 shadow-inner" />
                      <div className="absolute inset-0 h-8 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 rounded-full overflow-hidden animate-rainbow" 
                           style={{ width: `${progressPercentage}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                        {Math.round(progressPercentage)}% FUNDED! 💝
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-8 text-lg font-bold">
                      <div className="flex items-center bg-gradient-to-r from-rose-100 to-pink-100 px-4 py-2 rounded-full shadow-lg animate-float">
                        <Users className="h-5 w-5 mr-2 text-rose-600" />
                        <span className="text-rose-800">{selectedProject.supporters} Heroes</span>
                      </div>
                      <div className="flex items-center bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                        <span className="text-pink-800">£{selectedProject.pricePerSpace}/space</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Section */}
              <Card className="border-4 border-gradient-to-r from-rose-300 to-purple-300 shadow-2xl bg-gradient-to-br from-white to-rose-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 animate-bounce-in" />
                    Fund {selectedProject.title}
                    <Heart className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-rose-100 font-semibold">Each child space costs £{selectedProject.pricePerSpace} 💝</p>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Child Space Options */}
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
                            ? `border-rose-500 bg-gradient-to-br ${tier.color} text-white scale-110 shadow-2xl animate-glow`
                            : 'border-gray-300 hover:border-rose-400 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl'
                        }`}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="text-3xl animate-float">{tier.badge}</div>
                        </div>
                        
                        <div className={`font-bold text-lg ${selectedPieces === tier.pieces && !customPieces ? 'text-white' : 'text-gray-900'}`}>
                          {tier.pieces} Space{tier.pieces > 1 ? 's' : ''}
                        </div>
                        <div className={`text-2xl font-black ${selectedPieces === tier.pieces && !customPieces ? 'text-yellow-200' : 'text-rose-600'}`}>
                          £{tier.pieces * selectedProject.pricePerSpace}
                        </div>
                        <div className={`text-sm font-bold ${selectedPieces === tier.pieces && !customPieces ? 'text-rose-100' : 'text-gray-600'}`}>
                          {tier.description}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-2 border-pink-300 shadow-lg professional-card">
                    <label className="block text-lg font-bold text-rose-800 mb-3 flex items-center gap-2">
                      <Heart className="h-5 w-5 animate-sparkle" />
                      Custom Amount (£{selectedProject.pricePerSpace} per child space)
                      <Crown className="h-5 w-5 text-pink-600" />
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Enter number of child spaces"
                        value={customPieces}
                        onChange={(e) => {
                          setCustomPieces(e.target.value);
                          setSelectedPieces(0);
                        }}
                        className="flex-1 p-4 border-2 border-rose-300 rounded-xl focus:ring-4 focus:ring-rose-500 focus:border-rose-500 text-lg font-bold bg-white shadow-inner transition-all duration-300"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setCustomPieces('')}
                        disabled={!customPieces}
                        className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 hover:from-pink-600 hover:to-rose-600 shadow-lg transition-all duration-300"
                      >
                        Clear
                      </Button>
                    </div>
                    {customPieces && (
                      <div className="mt-3 text-center">
                        <div className="text-2xl font-black text-rose-600 animate-number-pop">
                          💝 {customPieces} child spaces = £{customAmount} 💝
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Impact Visualization */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-pink-400 via-rose-500 to-purple-500 border-3 border-pink-300 rounded-xl shadow-lg professional-card animate-rainbow">
                    <h4 className="font-black text-xl text-white mb-3 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-300 animate-sparkle" />
                      Your Life-Changing Impact:
                      <Trophy className="h-6 w-6 text-yellow-300 animate-bounce-in" />
                    </h4>
                    <div className="text-3xl font-black text-white animate-number-pop">
                      💝 {finalPieces} child space{finalPieces > 1 ? 's' : ''} = £{finalAmount} 💝
                    </div>
                    <div className="text-lg font-bold text-yellow-100 mt-2">
                      You're creating safe homes at {selectedProject.title}! 🏠✨
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 hover:from-pink-600 hover:via-rose-600 hover:to-purple-600 text-white py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white animate-glow"
                    disabled={!finalAmount || selectedProject.status !== 'funding'}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Heart className="h-6 w-6 animate-sparkle" />
                      {selectedProject.status === 'funding' 
                        ? `FUND ${selectedProject.title} - £${finalAmount}`
                        : selectedProject.status === 'building' 
                        ? 'ORPHANAGE UNDER CONSTRUCTION'
                        : 'ORPHANAGE COMPLETED'
                      }
                      <Crown className="h-6 w-6 animate-bounce-in" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-3 border-gradient-to-r from-pink-300 to-rose-300 shadow-xl bg-gradient-to-br from-white to-pink-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 animate-bounce-in" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center text-sm font-bold">
                    <MapPin className="h-4 w-4 mr-2 text-pink-600" />
                    <span>{selectedProject.location}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Users className="h-4 w-4 mr-2 text-rose-600" />
                    <span>{selectedProject.supporters} supporters</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <span className="text-purple-600">£{selectedProject.pricePerSpace} per child space</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-gradient-to-r from-rose-300 to-purple-300 shadow-xl bg-gradient-to-br from-white to-rose-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-rose-500 to-purple-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-sparkle" />
                    Global Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>Total Projects:</span>
                      <span className="text-rose-600">{orphanageProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="text-pink-600">{completedProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building:</span>
                      <span className="text-purple-600">{buildingProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Need Funding:</span>
                      <span className="text-rose-600">{fundingProjects.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 text-white p-10 rounded-2xl shadow-2xl animate-rainbow">
            <h3 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Star className="h-8 w-8 animate-sparkle" />
              Create Safe Homes & Build Your Paradise
              <Crown className="h-8 w-8 animate-bounce-in" />
            </h3>
            <p className="text-xl mb-6 font-bold">
              Join thousands of caring hearts in our mission to provide safe homes for vulnerable children. 
              Each space you fund gives a child hope AND builds your house in Paradise! 🚀✨
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-rose-600 hover:bg-yellow-100 font-black text-xl px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-500 border-4 border-pink-400"
            >
              <Trophy className="h-6 w-6 mr-2" />
              START FUNDING NOW
              <Heart className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orphanages;

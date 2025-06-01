
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer, Star, Trophy, Zap, Gift, Crown } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 40, description: 'Single Brick', color: 'from-red-400 to-red-600', badge: '🧱' },
  { pieces: 2, price: 80, description: 'Double Impact', color: 'from-orange-400 to-orange-600', badge: '⚡' },
  { pieces: 4, price: 160, description: 'Foundation Builder', color: 'from-yellow-400 to-yellow-600', badge: '🏗️' },
  { pieces: 6, price: 240, description: 'Pillar Supporter', color: 'from-green-400 to-green-600', badge: '🏛️' },
  { pieces: 10, price: 400, description: 'Wall Sponsor', color: 'from-blue-400 to-blue-600', badge: '🏠' },
  { pieces: 20, price: 800, description: 'Room Patron', color: 'from-purple-400 to-purple-600', badge: '👑' }
];

const mosqueProjects = [
  {
    id: 1,
    title: 'Mosque in Pakistan',
    status: 'completed',
    location: 'Lahore, Pakistan',
    funded: 100,
    totalCost: 15000,
    image: '🕌',
    completedDate: '2023-12-15',
    achievement: 'Master Builder'
  },
  {
    id: 2,
    title: 'Mosque in Pakistan',
    status: 'completed',
    location: 'Karachi, Pakistan',
    funded: 100,
    totalCost: 18000,
    image: '🕌',
    completedDate: '2023-11-20',
    achievement: 'Community Champion'
  },
  {
    id: 3,
    title: 'Mosque in Africa',
    status: 'completed',
    location: 'Lagos, Nigeria',
    funded: 100,
    totalCost: 12000,
    image: '🕌',
    completedDate: '2023-10-30',
    achievement: 'Global Builder'
  },
  {
    id: 4,
    title: 'Community Mosque',
    status: 'building',
    location: 'Birmingham, UK',
    funded: 75,
    totalCost: 25000,
    image: '🕌',
    estimatedCompletion: '2024-06-30'
  },
  {
    id: 5,
    title: 'Village Mosque',
    status: 'funded',
    location: 'Rural Bangladesh',
    funded: 100,
    totalCost: 8000,
    image: '🕌',
    constructionStart: '2024-02-01'
  }
];

const BuildMosque = () => {
  const [selectedPieces, setSelectedPieces] = useState(1);
  const [customPieces, setCustomPieces] = useState('');
  
  const currentCampaign = {
    raised: 5000,
    goal: 10000,
    supporters: 3256,
    daysLeft: 21
  };

  const progressPercentage = (currentCampaign.raised / currentCampaign.goal) * 100;
  
  const selectedTier = donationTiers.find(tier => tier.pieces === selectedPieces);
  const customAmount = customPieces ? parseInt(customPieces) * 40 : 0;
  const finalAmount = customPieces ? customAmount : selectedTier?.price || 0;
  const finalPieces = customPieces ? parseInt(customPieces) : selectedPieces;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse"><CheckCircle className="h-3 w-3 mr-1" />Built & Complete</Badge>;
      case 'building':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white animate-bounce"><Hammer className="h-3 w-3 mr-1" />In Process/Building</Badge>;
      case 'funded':
        return <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white"><Clock className="h-3 w-3 mr-1" />Funded</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Gamified Elements */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg blur-lg opacity-50 animate-pulse"></div>
                <img 
                  src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                  alt="Mosque" 
                  className="relative w-full h-48 object-cover rounded-lg shadow-2xl border-4 border-white"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                  <Star className="h-4 w-4 inline mr-1" />
                  LIVE CAMPAIGN
                </div>
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                🕌 Build a Mosque Together 🕌
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto font-semibold">
                Join our epic quest: "Build a Mosque, Together, One Piece at a Time." 
                Every brick counts in this divine mission! 🚀
              </p>
            </div>
          </div>

          {/* Gamified Progress Section */}
          <Card className="mb-8 border-4 border-gradient-to-r from-emerald-300 to-blue-300 shadow-2xl bg-gradient-to-br from-white to-emerald-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 animate-pulse"></div>
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <Trophy className="h-8 w-8 text-yellow-500 animate-bounce" />
                  <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    £{currentCampaign.raised.toLocaleString()} 
                  </div>
                  <span className="text-xl text-gray-600 font-bold">raised of</span> 
                  <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    £{currentCampaign.goal.toLocaleString()}
                  </div>
                  <Crown className="h-8 w-8 text-yellow-500 animate-spin" />
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="relative mb-6">
                  <Progress value={progressPercentage} className="h-8 bg-gray-200 shadow-inner" />
                  <div className="absolute inset-0 h-8 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full overflow-hidden animate-pulse" 
                       style={{ width: `${progressPercentage}%` }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {Math.round(progressPercentage)}% COMPLETE! 🎯
                  </div>
                </div>
                
                <div className="flex justify-center space-x-8 text-lg font-bold">
                  <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full shadow-lg">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    <span className="text-blue-800">{currentCampaign.supporters.toLocaleString()} Heroes</span>
                  </div>
                  <div className="flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full shadow-lg animate-pulse">
                    <Calendar className="h-5 w-5 mr-2 text-orange-600" />
                    <span className="text-orange-800">{currentCampaign.daysLeft} days left</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Gamified Donation Section */}
            <div className="lg:col-span-2">
              <Card className="border-4 border-gradient-to-r from-blue-300 to-purple-300 shadow-2xl bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 to-purple-200/20 animate-pulse"></div>
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white relative z-10">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 animate-bounce" />
                    Choose Your Divine Contribution
                    <Zap className="h-6 w-6 animate-pulse" />
                  </CardTitle>
                  <p className="text-blue-100 font-semibold">Select your brick package and join the builder's league! 🏗️</p>
                </CardHeader>
                <CardContent className="p-6 relative z-10">
                  {/* Enhanced Brick Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {donationTiers.map((tier) => (
                      <div
                        key={tier.pieces}
                        onClick={() => {
                          setSelectedPieces(tier.pieces);
                          setCustomPieces('');
                        }}
                        className={`cursor-pointer p-5 rounded-xl border-3 transition-all duration-300 text-center transform hover:scale-105 shadow-lg ${
                          selectedPieces === tier.pieces && !customPieces
                            ? `border-blue-500 bg-gradient-to-br ${tier.color} text-white scale-110 shadow-2xl animate-pulse`
                            : 'border-gray-300 hover:border-blue-400 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl'
                        }`}
                      >
                        {/* Enhanced Brick Visual */}
                        <div className="mb-3 flex justify-center">
                          <div className="text-3xl animate-bounce">{tier.badge}</div>
                        </div>
                        
                        <div className={`font-bold text-lg ${selectedPieces === tier.pieces && !customPieces ? 'text-white' : 'text-gray-900'}`}>
                          {tier.pieces} Piece{tier.pieces > 1 ? 's' : ''}
                        </div>
                        <div className={`text-2xl font-black ${selectedPieces === tier.pieces && !customPieces ? 'text-yellow-200' : 'text-blue-600'}`}>
                          £{tier.price}
                        </div>
                        <div className={`text-sm font-bold ${selectedPieces === tier.pieces && !customPieces ? 'text-blue-100' : 'text-gray-600'}`}>
                          {tier.description}
                        </div>
                        {selectedPieces === tier.pieces && !customPieces && (
                          <div className="mt-2">
                            <Badge className="bg-yellow-400 text-yellow-900 animate-bounce">
                              <Star className="h-3 w-3 mr-1" />
                              SELECTED
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Custom Amount */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 shadow-lg">
                    <label className="block text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 animate-pulse" />
                      Custom Mega Donation (£40 per brick)
                      <Crown className="h-5 w-5 text-yellow-600" />
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Enter number of bricks"
                        value={customPieces}
                        onChange={(e) => {
                          setCustomPieces(e.target.value);
                          setSelectedPieces(0);
                        }}
                        className="flex-1 p-4 border-2 border-orange-300 rounded-xl focus:ring-4 focus:ring-orange-500 focus:border-orange-500 text-lg font-bold bg-white shadow-inner"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setCustomPieces('')}
                        disabled={!customPieces}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 hover:from-red-600 hover:to-pink-600 shadow-lg"
                      >
                        Clear
                      </Button>
                    </div>
                    {customPieces && (
                      <div className="mt-3 text-center">
                        <div className="text-2xl font-black text-orange-600 animate-pulse">
                          🧱 {customPieces} bricks = £{customAmount} 🧱
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce mt-2">
                          <Trophy className="h-3 w-3 mr-1" />
                          CUSTOM HERO TIER!
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Enhanced Impact Visualization */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 border-3 border-emerald-300 rounded-xl shadow-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-purple-200/30 animate-pulse"></div>
                    <div className="relative z-10">
                      <h4 className="font-black text-xl text-emerald-800 mb-3 flex items-center gap-2">
                        <Star className="h-6 w-6 text-yellow-500 animate-spin" />
                        Your Divine Impact:
                        <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
                      </h4>
                      <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                        🧱 {finalPieces} brick{finalPieces > 1 ? 's' : ''} = £{finalAmount} 🧱
                      </div>
                      <div className="text-lg font-bold text-emerald-700 mt-2">
                        You're building the foundation of faith! 🕌✨
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Donate Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white relative overflow-hidden"
                    disabled={!finalAmount}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <Star className="h-6 w-6 animate-spin" />
                      CONTRIBUTE YOUR DIVINE PIECE - £{finalAmount}
                      <Crown className="h-6 w-6 animate-bounce" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-3 border-gradient-to-r from-green-300 to-blue-300 shadow-xl bg-gradient-to-br from-white to-green-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 animate-bounce" />
                    Campaign Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center text-sm font-bold">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span>Global Divine Mission 🌍</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Calendar className="h-4 w-4 mr-2 text-orange-600 animate-pulse" />
                    <span>{currentCampaign.daysLeft} days of destiny!</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{currentCampaign.supporters.toLocaleString()} building heroes</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-gradient-to-r from-purple-300 to-pink-300 shadow-xl bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-pulse" />
                    Mission Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 animate-pulse">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-gray-600 font-bold mb-3">
                      of our divine goal achieved! 🎯
                    </div>
                    <Progress value={progressPercentage} className="h-4 bg-gray-200" />
                    <div className="mt-2 text-xs font-bold text-purple-600">
                      We're making history together! 🏗️✨
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Enhanced Project Status Table */}
          <Card className="mt-8 border-4 border-gradient-to-r from-yellow-300 to-orange-300 shadow-2xl bg-gradient-to-br from-white to-yellow-50">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Trophy className="h-6 w-6 animate-bounce" />
                Hall of Mosque Fame - Building Legacy
                <Crown className="h-6 w-6 animate-spin" />
              </CardTitle>
              <p className="text-yellow-100 font-bold">Witness the power of collective faith across communities! 🌟</p>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {mosqueProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-5 border-2 border-gray-200 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl animate-pulse">{project.image}</div>
                      <div>
                        <h4 className="font-black text-lg text-gray-900">{project.title}</h4>
                        <p className="text-sm text-gray-600 flex items-center font-bold">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </p>
                        {project.status === 'completed' && project.completedDate && (
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-green-600 font-bold">Completed: {new Date(project.completedDate).toLocaleDateString()}</p>
                            {project.achievement && (
                              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                                <Star className="h-3 w-3 mr-1" />
                                {project.achievement}
                              </Badge>
                            )}
                          </div>
                        )}
                        {project.status === 'building' && project.estimatedCompletion && (
                          <p className="text-xs text-blue-600 font-bold">Est. completion: {new Date(project.estimatedCompletion).toLocaleDateString()}</p>
                        )}
                        {project.status === 'funded' && project.constructionStart && (
                          <p className="text-xs text-orange-600 font-bold">Construction starts: {new Date(project.constructionStart).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(project.status)}
                      <div className="text-lg font-black text-gray-800 mt-1">
                        £{project.totalCost.toLocaleString()}
                      </div>
                      <div className="text-sm font-bold text-green-600">
                        {project.funded}% FUNDED 🎯
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white p-10 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-blue-400/30 to-purple-400/30 animate-pulse"></div>
            <div className="relative z-10">
              <h3 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
                <Star className="h-8 w-8 animate-spin" />
                Join Our Divine Mission
                <Crown className="h-8 w-8 animate-bounce" />
              </h3>
              <p className="text-xl mb-6 font-bold">
                This epic, visual, and transparent adventure highlights the divine impact of each contribution, 
                builds unshakeable trust, and inspires eternal participation! 🚀✨
              </p>
              <Button 
                variant="secondary" 
                size="lg"
                className="bg-white text-purple-600 hover:bg-yellow-100 font-black text-xl px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-400"
              >
                <Trophy className="h-6 w-6 mr-2" />
                BUILD NOW - BECOME A LEGEND
                <Zap className="h-6 w-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildMosque;

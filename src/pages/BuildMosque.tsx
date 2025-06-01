
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer, Star, Trophy, Zap, Gift, Crown } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 40, description: 'Single Prayer Space', color: 'from-red-400 to-red-600', badge: '🤲' },
  { pieces: 2, price: 80, description: 'Double Impact', color: 'from-orange-400 to-orange-600', badge: '⚡' },
  { pieces: 4, price: 160, description: 'Foundation Builder', color: 'from-yellow-400 to-yellow-600', badge: '🏗️' },
  { pieces: 6, price: 240, description: 'Pillar Supporter', color: 'from-green-400 to-green-600', badge: '🏛️' },
  { pieces: 10, price: 400, description: 'Wall Sponsor', color: 'from-blue-400 to-blue-600', badge: '🏠' },
  { pieces: 20, price: 800, description: 'Room Patron', color: 'from-purple-400 to-purple-600', badge: '👑' }
];

const mosqueProjects = [
  {
    id: 1,
    title: 'Village Mosque - Bangladesh',
    status: 'completed',
    location: 'Rural Bangladesh',
    raised: 8000,
    goal: 8000,
    pricePerSpace: 40,
    image: '🕌',
    completedDate: '2023-12-15',
    achievement: 'Master Builder',
    supporters: 200,
    description: 'A beautiful mosque serving 500+ villagers daily'
  },
  {
    id: 2,
    title: 'Community Mosque - Pakistan',
    status: 'completed',
    location: 'Lahore, Pakistan',
    raised: 18000,
    goal: 18000,
    pricePerSpace: 45,
    image: '🕌',
    completedDate: '2023-11-20',
    achievement: 'Community Champion',
    supporters: 400,
    description: 'Serving urban community with modern facilities'
  },
  {
    id: 3,
    title: 'Educational Mosque - Nigeria',
    status: 'building',
    location: 'Lagos, Nigeria',
    raised: 9000,
    goal: 12000,
    pricePerSpace: 30,
    image: '🕌',
    estimatedCompletion: '2024-08-30',
    supporters: 300,
    description: 'Mosque with attached Islamic school'
  },
  {
    id: 4,
    title: 'City Center Mosque - UK',
    status: 'funding',
    location: 'Birmingham, UK',
    raised: 18750,
    goal: 25000,
    pricePerSpace: 50,
    image: '🕌',
    supporters: 375,
    description: 'Modern mosque in the heart of Birmingham'
  },
  {
    id: 5,
    title: 'Mountain Mosque - Kashmir',
    status: 'funding',
    location: 'Kashmir Valley',
    raised: 4200,
    goal: 15000,
    pricePerSpace: 35,
    image: '🕌',
    supporters: 120,
    description: 'Serving remote mountain communities'
  },
  {
    id: 6,
    title: 'Riverside Mosque - Indonesia',
    status: 'funding',
    location: 'Java, Indonesia',
    raised: 2800,
    goal: 10000,
    pricePerSpace: 25,
    image: '🕌',
    supporters: 112,
    description: 'Beautiful mosque overlooking sacred river'
  }
];

const BuildMosque = () => {
  const [selectedPieces, setSelectedPieces] = useState(1);
  const [customPieces, setCustomPieces] = useState('');
  const [selectedMosque, setSelectedMosque] = useState(mosqueProjects.find(m => m.status === 'funding') || mosqueProjects[3]);
  
  const progressPercentage = (selectedMosque.raised / selectedMosque.goal) * 100;
  
  const selectedTier = donationTiers.find(tier => tier.pieces === selectedPieces);
  const customAmount = customPieces ? parseInt(customPieces) * selectedMosque.pricePerSpace : 0;
  const finalAmount = customPieces ? customAmount : selectedTier ? selectedTier.pieces * selectedMosque.pricePerSpace : 0;
  const finalPieces = customPieces ? parseInt(customPieces) : selectedPieces;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white animate-pulse"><CheckCircle className="h-3 w-3 mr-1" />Built & Complete</Badge>;
      case 'building':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white animate-bounce"><Hammer className="h-3 w-3 mr-1" />Under Construction</Badge>;
      case 'funding':
        return <Badge className="bg-gradient-to-r from-orange-500 to-amber-600 text-white"><Clock className="h-3 w-3 mr-1" />Needs Funding</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const handleMosqueSelect = (mosque: typeof mosqueProjects[0]) => {
    setSelectedMosque(mosque);
    setSelectedPieces(1);
    setCustomPieces('');
  };

  const fundingMosques = mosqueProjects.filter(m => m.status === 'funding');
  const buildingMosques = mosqueProjects.filter(m => m.status === 'building');
  const completedMosques = mosqueProjects.filter(m => m.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-lg blur-lg opacity-50 animate-pulse"></div>
                <img 
                  src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                  alt="Mosque" 
                  className="relative w-full h-48 object-cover rounded-lg shadow-2xl border-4 border-white mx-auto max-w-2xl"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                  <Star className="h-4 w-4 inline mr-1" />
                  MULTIPLE PROJECTS LIVE
                </div>
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                🕌 Build Mosques Worldwide 🕌
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold">
                Join our epic global mission: Choose a mosque project and help build sacred spaces one prayer space at a time! 🚀
              </p>
            </div>
          </div>

          {/* Mosque Selection Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              🎯 Choose Your Mosque Project 🎯
            </h2>
            
            {/* Funding Needed Section */}
            {fundingMosques.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-orange-600 flex items-center gap-2">
                  <Zap className="h-6 w-6 animate-pulse" />
                  🚨 Urgent: Needs Funding
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundingMosques.map((mosque) => (
                    <Card 
                      key={mosque.id} 
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border-3 ${
                        selectedMosque.id === mosque.id 
                          ? 'border-orange-500 bg-gradient-to-br from-orange-50 to-amber-50 shadow-2xl scale-105' 
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-xl'
                      }`}
                      onClick={() => handleMosqueSelect(mosque)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-pulse">{mosque.image}</div>
                          {getStatusBadge(mosque.status)}
                        </div>
                        <CardTitle className="text-lg">{mosque.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mosque.location}
                        </p>
                        <p className="text-xs text-gray-500">{mosque.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                              <span>£{mosque.raised.toLocaleString()}</span>
                              <span>£{mosque.goal.toLocaleString()}</span>
                            </div>
                            <Progress value={(mosque.raised / mosque.goal) * 100} className="h-3" />
                            <div className="text-xs text-center mt-1 font-bold text-orange-600">
                              {Math.round((mosque.raised / mosque.goal) * 100)}% Funded
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="font-bold text-orange-600">
                              £{mosque.pricePerSpace}/space
                            </span>
                          </div>
                          {selectedMosque.id === mosque.id && (
                            <Badge className="w-full justify-center bg-gradient-to-r from-orange-500 to-amber-500 text-white animate-bounce">
                              <Star className="h-3 w-3 mr-1" />
                              SELECTED PROJECT
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Building Section */}
            {buildingMosques.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-blue-600 flex items-center gap-2">
                  <Hammer className="h-6 w-6 animate-bounce" />
                  🏗️ Under Construction
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buildingMosques.map((mosque) => (
                    <Card key={mosque.id} className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-pulse">{mosque.image}</div>
                          {getStatusBadge(mosque.status)}
                        </div>
                        <CardTitle className="text-lg">{mosque.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mosque.location}
                        </p>
                        <p className="text-xs text-gray-500">{mosque.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Progress value={(mosque.raised / mosque.goal) * 100} className="h-3" />
                            <div className="text-xs text-center mt-1 font-bold text-blue-600">
                              Fully Funded - Construction In Progress
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="text-blue-600 font-bold">
                              Est: {mosque.estimatedCompletion}
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
            {completedMosques.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-green-600 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 animate-pulse" />
                  ✅ Successfully Built
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedMosques.map((mosque) => (
                    <Card key={mosque.id} className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-pulse">{mosque.image}</div>
                          {getStatusBadge(mosque.status)}
                        </div>
                        <CardTitle className="text-lg">{mosque.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {mosque.location}
                        </p>
                        <p className="text-xs text-gray-500">{mosque.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <Progress value={100} className="h-3" />
                            <div className="text-xs text-center mt-1 font-bold text-green-600">
                              100% Complete - Serving Community!
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="text-green-600 font-bold">
                              Completed: {mosque.completedDate}
                            </span>
                          </div>
                          {mosque.achievement && (
                            <Badge className="w-full justify-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              <Trophy className="h-3 w-3 mr-1" />
                              {mosque.achievement}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Selected Mosque Progress */}
            <div className="lg:col-span-2">
              <Card className="mb-6 border-4 border-gradient-to-r from-emerald-300 to-blue-300 shadow-2xl bg-gradient-to-br from-white to-emerald-50">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 animate-bounce" />
                    Selected: {selectedMosque.title}
                    <Star className="h-6 w-6 animate-spin" />
                  </CardTitle>
                  <p className="text-emerald-100 font-semibold">{selectedMosque.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                        £{selectedMosque.raised.toLocaleString()} 
                      </div>
                      <span className="text-xl text-gray-600 font-bold">raised of</span> 
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        £{selectedMosque.goal.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="relative mb-6">
                      <Progress value={progressPercentage} className="h-8 bg-gray-200 shadow-inner" />
                      <div className="absolute inset-0 h-8 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 rounded-full overflow-hidden animate-pulse" 
                           style={{ width: `${progressPercentage}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                        {Math.round(progressPercentage)}% FUNDED! 🎯
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-8 text-lg font-bold">
                      <div className="flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full shadow-lg">
                        <Users className="h-5 w-5 mr-2 text-blue-600" />
                        <span className="text-blue-800">{selectedMosque.supporters} Heroes</span>
                      </div>
                      <div className="flex items-center bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 rounded-full shadow-lg">
                        <span className="text-orange-800">£{selectedMosque.pricePerSpace}/space</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Section */}
              <Card className="border-4 border-gradient-to-r from-blue-300 to-purple-300 shadow-2xl bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 animate-bounce" />
                    Fund {selectedMosque.title}
                    <Zap className="h-6 w-6 animate-pulse" />
                  </CardTitle>
                  <p className="text-blue-100 font-semibold">Each prayer space costs £{selectedMosque.pricePerSpace} 🤲</p>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Prayer Space Options */}
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
                        <div className="mb-3 flex justify-center">
                          <div className="text-3xl animate-bounce">{tier.badge}</div>
                        </div>
                        
                        <div className={`font-bold text-lg ${selectedPieces === tier.pieces && !customPieces ? 'text-white' : 'text-gray-900'}`}>
                          {tier.pieces} Space{tier.pieces > 1 ? 's' : ''}
                        </div>
                        <div className={`text-2xl font-black ${selectedPieces === tier.pieces && !customPieces ? 'text-yellow-200' : 'text-blue-600'}`}>
                          £{tier.pieces * selectedMosque.pricePerSpace}
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

                  {/* Custom Amount */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-300 shadow-lg">
                    <label className="block text-lg font-bold text-orange-800 mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 animate-pulse" />
                      Custom Amount (£{selectedMosque.pricePerSpace} per prayer space)
                      <Crown className="h-5 w-5 text-yellow-600" />
                    </label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="number"
                        placeholder="Enter number of prayer spaces"
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
                          🤲 {customPieces} prayer spaces = £{customAmount} 🤲
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-bounce mt-2">
                          <Trophy className="h-3 w-3 mr-1" />
                          CUSTOM HERO TIER!
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Impact Visualization */}
                  <div className="mb-6 p-6 bg-gradient-to-r from-emerald-100 via-blue-100 to-purple-100 border-3 border-emerald-300 rounded-xl shadow-lg">
                    <h4 className="font-black text-xl text-emerald-800 mb-3 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-500 animate-spin" />
                      Your Divine Impact:
                      <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
                    </h4>
                    <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                      🤲 {finalPieces} prayer space{finalPieces > 1 ? 's' : ''} = £{finalAmount} 🤲
                    </div>
                    <div className="text-lg font-bold text-emerald-700 mt-2">
                      You're creating sacred spaces at {selectedMosque.title}! 🕌✨
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 hover:from-emerald-600 hover:via-blue-600 hover:to-purple-700 text-white py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-300 border-4 border-white"
                    disabled={!finalAmount || selectedMosque.status !== 'funding'}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Star className="h-6 w-6 animate-spin" />
                      {selectedMosque.status === 'funding' 
                        ? `FUND ${selectedMosque.title} - £${finalAmount}`
                        : selectedMosque.status === 'building' 
                        ? 'MOSQUE UNDER CONSTRUCTION'
                        : 'MOSQUE COMPLETED'
                      }
                      <Crown className="h-6 w-6 animate-bounce" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-3 border-gradient-to-r from-green-300 to-blue-300 shadow-xl bg-gradient-to-br from-white to-green-50">
                <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 animate-bounce" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center text-sm font-bold">
                    <MapPin className="h-4 w-4 mr-2 text-green-600" />
                    <span>{selectedMosque.location}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    <span>{selectedMosque.supporters} supporters</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <span className="text-purple-600">£{selectedMosque.pricePerSpace} per prayer space</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-gradient-to-r from-purple-300 to-pink-300 shadow-xl bg-gradient-to-br from-white to-purple-50">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-pulse" />
                    Global Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>Total Projects:</span>
                      <span className="text-purple-600">{mosqueProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="text-green-600">{completedMosques.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building:</span>
                      <span className="text-blue-600">{buildingMosques.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Need Funding:</span>
                      <span className="text-orange-600">{fundingMosques.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-600 text-white p-10 rounded-2xl shadow-2xl">
            <h3 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Star className="h-8 w-8 animate-spin" />
              Build Sacred Spaces Worldwide
              <Crown className="h-8 w-8 animate-bounce" />
            </h3>
            <p className="text-xl mb-6 font-bold">
              Join thousands of believers in our mission to build mosques across the globe. 
              Each prayer space brings us closer to serving communities in need! 🚀✨
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-purple-600 hover:bg-yellow-100 font-black text-xl px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-300 border-4 border-yellow-400"
            >
              <Trophy className="h-6 w-6 mr-2" />
              START BUILDING NOW
              <Zap className="h-6 w-6 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildMosque;

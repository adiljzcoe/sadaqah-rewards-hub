import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer, Star, Trophy, Zap, Gift, Crown } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 40, description: 'Single Prayer Space', color: 'from-candy-pink-400 to-candy-pink-600', badge: '🤲' },
  { pieces: 2, price: 80, description: 'Double Impact', color: 'from-vibrant-orange-400 to-vibrant-orange-600', badge: '⚡' },
  { pieces: 4, price: 160, description: 'Foundation Builder', color: 'from-lime-green-400 to-lime-green-600', badge: '🏗️' },
  { pieces: 6, price: 240, description: 'Pillar Supporter', color: 'from-electric-blue-400 to-electric-blue-600', badge: '🏛️' },
  { pieces: 10, price: 400, description: 'Wall Sponsor', color: 'from-purple-magic-400 to-purple-magic-600', badge: '🏠' },
  { pieces: 20, price: 800, description: 'Room Patron', color: 'from-candy-pink-500 to-vibrant-orange-500', badge: '👑' }
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
        return <Badge className="bg-gradient-to-r from-lime-green-500 to-lime-green-600 text-white animate-bounce-in border-0 shadow-lg"><CheckCircle className="h-3 w-3 mr-1" />Built & Complete</Badge>;
      case 'building':
        return <Badge className="bg-gradient-to-r from-electric-blue-500 to-electric-blue-600 text-white animate-float border-0 shadow-lg"><Hammer className="h-3 w-3 mr-1" />Under Construction</Badge>;
      case 'funding':
        return <Badge className="bg-gradient-to-r from-vibrant-orange-500 to-vibrant-orange-600 text-white animate-glow border-0 shadow-lg"><Clock className="h-3 w-3 mr-1" />Needs Funding</Badge>;
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
    <div className="min-h-screen bg-gradient-to-br from-candy-pink-50 via-electric-blue-50 to-purple-magic-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-candy-pink-300 to-vibrant-orange-300 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-electric-blue-300 to-purple-magic-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-lime-green-300 to-electric-blue-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <Header />
      
      <div className="container mx-auto px-4 py-8 relative">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 bg-gradient-rainbow rounded-3xl blur-3xl opacity-30 animate-rainbow"></div>
            <div className="relative">
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-candy-pink-300 to-vibrant-orange-300 rounded-lg blur-lg opacity-60 animate-glow"></div>
                <img 
                  src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                  alt="Mosque" 
                  className="relative w-full h-48 object-cover rounded-lg shadow-2xl border-4 border-white mx-auto max-w-2xl transform hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-candy-pink-400 to-vibrant-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-bounce-in">
                  <Star className="h-4 w-4 inline mr-1 animate-sparkle" />
                  MULTIPLE PROJECTS LIVE
                </div>
              </div>
              <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-candy-pink-600 via-electric-blue-600 to-purple-magic-600 bg-clip-text text-transparent animate-slide-in-bounce">
                🕌 Build Mosques Worldwide 🕌
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-semibold animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                Join our epic global mission: Choose a mosque project and help build sacred spaces one prayer space at a time! 🚀
              </p>
            </div>
          </div>

          {/* Mosque Selection Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-black text-center mb-6 bg-gradient-to-r from-candy-pink-600 to-electric-blue-600 bg-clip-text text-transparent animate-number-pop">
              🎯 Choose Your Mosque Project 🎯
            </h2>
            
            {/* Funding Needed Section */}
            {fundingMosques.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 text-vibrant-orange-600 flex items-center gap-2 animate-wiggle">
                  <Zap className="h-6 w-6 animate-sparkle" />
                  🚨 Urgent: Needs Funding
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fundingMosques.map((mosque) => (
                    <Card 
                      key={mosque.id} 
                      className={`cursor-pointer transition-all duration-500 transform hover:scale-105 hover:rotate-1 border-3 professional-card ${
                        selectedMosque.id === mosque.id 
                          ? 'border-vibrant-orange-500 bg-gradient-to-br from-vibrant-orange-50 to-candy-pink-50 shadow-2xl scale-105 animate-glow' 
                          : 'border-gray-200 hover:border-vibrant-orange-300 hover:shadow-xl hover:bg-gradient-to-br hover:from-white hover:to-vibrant-orange-50'
                      }`}
                      onClick={() => handleMosqueSelect(mosque)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{mosque.image}</div>
                          {getStatusBadge(mosque.status)}
                        </div>
                        <CardTitle className="text-lg bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{mosque.title}</CardTitle>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-electric-blue-500" />
                          {mosque.location}
                        </p>
                        <p className="text-xs text-gray-500">{mosque.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm font-bold mb-1">
                              <span className="text-lime-green-600">£{mosque.raised.toLocaleString()}</span>
                              <span className="text-purple-magic-600">£{mosque.goal.toLocaleString()}</span>
                            </div>
                            <Progress value={(mosque.raised / mosque.goal) * 100} className="h-3 bg-gray-200" />
                            <div className="text-xs text-center mt-1 font-bold text-vibrant-orange-600 animate-number-pop">
                              {Math.round((mosque.raised / mosque.goal) * 100)}% Funded
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center text-electric-blue-600">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="font-bold text-vibrant-orange-600">
                              £{mosque.pricePerSpace}/space
                            </span>
                          </div>
                          {selectedMosque.id === mosque.id && (
                            <Badge className="w-full justify-center bg-gradient-to-r from-vibrant-orange-500 to-candy-pink-500 text-white animate-bounce-in border-0">
                              <Star className="h-3 w-3 mr-1 animate-sparkle" />
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
                <h3 className="text-2xl font-bold mb-4 text-electric-blue-600 flex items-center gap-2">
                  <Hammer className="h-6 w-6 animate-wiggle" />
                  🏗️ Under Construction
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {buildingMosques.map((mosque) => (
                    <Card key={mosque.id} className="border-electric-blue-200 bg-gradient-to-br from-electric-blue-50 to-lime-green-50 professional-card hover:scale-105 transition-transform duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{mosque.image}</div>
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
                            <div className="text-xs text-center mt-1 font-bold text-electric-blue-600">
                              Fully Funded - Construction In Progress
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="text-electric-blue-600 font-bold">
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
                <h3 className="text-2xl font-bold mb-4 text-lime-green-600 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 animate-sparkle" />
                  ✅ Successfully Built
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedMosques.map((mosque) => (
                    <Card key={mosque.id} className="border-lime-green-200 bg-gradient-to-br from-lime-green-50 to-electric-blue-50 professional-card hover:scale-105 transition-transform duration-300">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="text-3xl animate-float">{mosque.image}</div>
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
                            <div className="text-xs text-center mt-1 font-bold text-lime-green-600">
                              100% Complete - Serving Community!
                            </div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {mosque.supporters} supporters
                            </span>
                            <span className="text-lime-green-600 font-bold">
                              Completed: {mosque.completedDate}
                            </span>
                          </div>
                          {mosque.achievement && (
                            <Badge className="w-full justify-center bg-gradient-to-r from-sadaqah-gold-400 to-vibrant-orange-500 text-white border-0">
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
              <Card className="mb-6 border-4 border-gradient-to-r from-candy-pink-300 to-electric-blue-300 shadow-2xl bg-gradient-to-br from-white to-candy-pink-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-candy-pink-500 to-electric-blue-500 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Trophy className="h-6 w-6 animate-bounce-in" />
                    Selected: {selectedMosque.title}
                    <Star className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-candy-pink-100 font-semibold">{selectedMosque.description}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="text-4xl font-black bg-gradient-to-r from-candy-pink-600 to-electric-blue-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedMosque.raised.toLocaleString()} 
                      </div>
                      <span className="text-xl text-gray-600 font-bold">raised of</span> 
                      <div className="text-4xl font-black bg-gradient-to-r from-purple-magic-600 to-candy-pink-600 bg-clip-text text-transparent animate-number-pop">
                        £{selectedMosque.goal.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="relative mb-6">
                      <Progress value={progressPercentage} className="h-8 bg-gray-200 shadow-inner" />
                      <div className="absolute inset-0 h-8 bg-gradient-rainbow rounded-full overflow-hidden animate-rainbow" 
                           style={{ width: `${progressPercentage}%` }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                        {Math.round(progressPercentage)}% FUNDED! 🎯
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-8 text-lg font-bold">
                      <div className="flex items-center bg-gradient-to-r from-electric-blue-100 to-purple-magic-100 px-4 py-2 rounded-full shadow-lg animate-float">
                        <Users className="h-5 w-5 mr-2 text-electric-blue-600" />
                        <span className="text-electric-blue-800">{selectedMosque.supporters} Heroes</span>
                      </div>
                      <div className="flex items-center bg-gradient-to-r from-vibrant-orange-100 to-candy-pink-100 px-4 py-2 rounded-full shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
                        <span className="text-vibrant-orange-800">£{selectedMosque.pricePerSpace}/space</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Donation Section */}
              <Card className="border-4 border-gradient-to-r from-electric-blue-300 to-purple-magic-300 shadow-2xl bg-gradient-to-br from-white to-electric-blue-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-electric-blue-500 to-purple-magic-600 text-white">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Gift className="h-6 w-6 animate-bounce-in" />
                    Fund {selectedMosque.title}
                    <Zap className="h-6 w-6 animate-sparkle" />
                  </CardTitle>
                  <p className="text-electric-blue-100 font-semibold">Each prayer space costs £{selectedMosque.pricePerSpace} 🤲</p>
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
                        className={`cursor-pointer p-5 rounded-xl border-3 transition-all duration-500 text-center transform hover:scale-110 hover:rotate-2 shadow-lg professional-card ${
                          selectedPieces === tier.pieces && !customPieces
                            ? `border-electric-blue-500 bg-gradient-to-br ${tier.color} text-white scale-110 shadow-2xl animate-glow`
                            : 'border-gray-300 hover:border-electric-blue-400 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl'
                        }`}
                      >
                        <div className="mb-3 flex justify-center">
                          <div className="text-3xl animate-float">{tier.badge}</div>
                        </div>
                        
                        <div className={`font-bold text-lg ${selectedPieces === tier.pieces && !customPieces ? 'text-white' : 'text-gray-900'}`}>
                          {tier.pieces} Space{tier.pieces > 1 ? 's' : ''}
                        </div>
                        <div className={`text-2xl font-black ${selectedPieces === tier.pieces && !customPieces ? 'text-yellow-200' : 'text-electric-blue-600'}`}>
                          £{tier.pieces * selectedMosque.pricePerSpace}
                        </div>
                        <div className={`text-sm font-bold ${selectedPieces === tier.pieces && !customPieces ? 'text-blue-100' : 'text-gray-600'}`}>
                          {tier.description}
                        </div>
                        {selectedPieces === tier.pieces && !customPieces && (
                          <div className="mt-2">
                            <Badge className="bg-sadaqah-gold-400 text-sadaqah-gold-900 animate-bounce-in border-0">
                              <Star className="h-3 w-3 mr-1 animate-sparkle" />
                              SELECTED
                            </Badge>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-sadaqah-gold-50 to-vibrant-orange-50 rounded-xl border-2 border-sadaqah-gold-300 shadow-lg professional-card">
                    <label className="block text-lg font-bold text-vibrant-orange-800 mb-3 flex items-center gap-2">
                      <Zap className="h-5 w-5 animate-sparkle" />
                      Custom Amount (£{selectedMosque.pricePerSpace} per prayer space)
                      <Crown className="h-5 w-5 text-sadaqah-gold-600" />
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
                        className="flex-1 p-4 border-2 border-vibrant-orange-300 rounded-xl focus:ring-4 focus:ring-vibrant-orange-500 focus:border-vibrant-orange-500 text-lg font-bold bg-white shadow-inner transition-all duration-300"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setCustomPieces('')}
                        disabled={!customPieces}
                        className="bg-gradient-to-r from-candy-pink-500 to-vibrant-orange-500 text-white border-0 hover:from-candy-pink-600 hover:to-vibrant-orange-600 shadow-lg transition-all duration-300"
                      >
                        Clear
                      </Button>
                    </div>
                    {customPieces && (
                      <div className="mt-3 text-center">
                        <div className="text-2xl font-black text-vibrant-orange-600 animate-number-pop">
                          🤲 {customPieces} prayer spaces = £{customAmount} 🤲
                        </div>
                        <Badge className="bg-gradient-to-r from-purple-magic-500 to-candy-pink-500 text-white animate-bounce-in mt-2 border-0">
                          <Trophy className="h-3 w-3 mr-1" />
                          CUSTOM HERO TIER!
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Impact Visualization */}
                  <div className="mb-6 p-6 bg-gradient-rainbow border-3 border-candy-pink-300 rounded-xl shadow-lg professional-card animate-rainbow">
                    <h4 className="font-black text-xl text-white mb-3 flex items-center gap-2">
                      <Star className="h-6 w-6 text-yellow-300 animate-sparkle" />
                      Your Divine Impact:
                      <Trophy className="h-6 w-6 text-yellow-300 animate-bounce-in" />
                    </h4>
                    <div className="text-3xl font-black text-white animate-number-pop">
                      🤲 {finalPieces} prayer space{finalPieces > 1 ? 's' : ''} = £{finalAmount} 🤲
                    </div>
                    <div className="text-lg font-bold text-yellow-100 mt-2">
                      You're creating sacred spaces at {selectedMosque.title}! 🕌✨
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full bg-gradient-rainbow hover:from-candy-pink-600 hover:via-electric-blue-600 hover:to-purple-magic-700 text-white py-6 text-xl font-black shadow-2xl transform hover:scale-105 transition-all duration-500 border-4 border-white animate-glow"
                    disabled={!finalAmount || selectedMosque.status !== 'funding'}
                  >
                    <div className="flex items-center justify-center gap-3">
                      <Star className="h-6 w-6 animate-sparkle" />
                      {selectedMosque.status === 'funding' 
                        ? `FUND ${selectedMosque.title} - £${finalAmount}`
                        : selectedMosque.status === 'building' 
                        ? 'MOSQUE UNDER CONSTRUCTION'
                        : 'MOSQUE COMPLETED'
                      }
                      <Crown className="h-6 w-6 animate-bounce-in" />
                    </div>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-3 border-gradient-to-r from-lime-green-300 to-electric-blue-300 shadow-xl bg-gradient-to-br from-white to-lime-green-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-lime-green-500 to-electric-blue-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Trophy className="h-5 w-5 animate-bounce-in" />
                    Project Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-4">
                  <div className="flex items-center text-sm font-bold">
                    <MapPin className="h-4 w-4 mr-2 text-lime-green-600" />
                    <span>{selectedMosque.location}</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <Users className="h-4 w-4 mr-2 text-electric-blue-600" />
                    <span>{selectedMosque.supporters} supporters</span>
                  </div>
                  <div className="flex items-center text-sm font-bold">
                    <span className="text-purple-magic-600">£{selectedMosque.pricePerSpace} per prayer space</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-3 border-gradient-to-r from-purple-magic-300 to-candy-pink-300 shadow-xl bg-gradient-to-br from-white to-purple-magic-50 professional-card">
                <CardHeader className="bg-gradient-to-r from-purple-magic-500 to-candy-pink-500 text-white">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="h-5 w-5 animate-sparkle" />
                    Global Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm font-bold">
                    <div className="flex justify-between">
                      <span>Total Projects:</span>
                      <span className="text-purple-magic-600">{mosqueProjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completed:</span>
                      <span className="text-lime-green-600">{completedMosques.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Building:</span>
                      <span className="text-electric-blue-600">{buildingMosques.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Need Funding:</span>
                      <span className="text-vibrant-orange-600">{fundingMosques.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-rainbow text-white p-10 rounded-2xl shadow-2xl animate-rainbow">
            <h3 className="text-4xl font-black mb-4 flex items-center justify-center gap-3">
              <Star className="h-8 w-8 animate-sparkle" />
              Build Sacred Spaces Worldwide
              <Crown className="h-8 w-8 animate-bounce-in" />
            </h3>
            <p className="text-xl mb-6 font-bold">
              Join thousands of believers in our mission to build mosques across the globe. 
              Each prayer space brings us closer to serving communities in need! 🚀✨
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-purple-magic-600 hover:bg-yellow-100 font-black text-xl px-8 py-4 shadow-2xl transform hover:scale-110 transition-all duration-500 border-4 border-sadaqah-gold-400"
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

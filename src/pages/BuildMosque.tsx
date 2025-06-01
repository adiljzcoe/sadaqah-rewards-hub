
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Plus, Users, Calendar, MapPin, CheckCircle, Clock, Hammer } from 'lucide-react';

const donationTiers = [
  { pieces: 1, price: 40, description: 'Single Brick' },
  { pieces: 2, price: 80, description: 'Double Impact' },
  { pieces: 4, price: 160, description: 'Foundation Builder' },
  { pieces: 6, price: 240, description: 'Pillar Supporter' },
  { pieces: 10, price: 400, description: 'Wall Sponsor' },
  { pieces: 20, price: 800, description: 'Room Patron' }
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
    completedDate: '2023-12-15'
  },
  {
    id: 2,
    title: 'Mosque in Pakistan',
    status: 'completed',
    location: 'Karachi, Pakistan',
    funded: 100,
    totalCost: 18000,
    image: '🕌',
    completedDate: '2023-11-20'
  },
  {
    id: 3,
    title: 'Mosque in Africa',
    status: 'completed',
    location: 'Lagos, Nigeria',
    funded: 100,
    totalCost: 12000,
    image: '🕌',
    completedDate: '2023-10-30'
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
        return <Badge className="bg-green-600 text-white"><CheckCircle className="h-3 w-3 mr-1" />Built & Complete</Badge>;
      case 'building':
        return <Badge className="bg-blue-600 text-white"><Hammer className="h-3 w-3 mr-1" />In Process/Building</Badge>;
      case 'funded':
        return <Badge className="bg-orange-600 text-white"><Clock className="h-3 w-3 mr-1" />Funded</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <img 
                src="/lovable-uploads/fa941c0a-2492-4fde-8299-aa6d80b65abf.png" 
                alt="Mosque" 
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Build a Mosque Together</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join our compassionate campaign: "Build a Mosque, Together, One Piece at a Time." 
              Each contribution, no matter the size, is a vital step toward establishing a spiritual and communal space.
            </p>
          </div>

          {/* Progress Section */}
          <Card className="mb-8 border-2 border-emerald-200">
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  £{currentCampaign.raised.toLocaleString()} <span className="text-lg text-gray-600">raised of</span> £{currentCampaign.goal.toLocaleString()} <span className="text-lg text-gray-600">goal</span>
                </div>
                <Progress value={progressPercentage} className="h-4 mb-4" />
                <div className="flex justify-center space-x-8 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {currentCampaign.supporters.toLocaleString()} Supporters
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {currentCampaign.daysLeft} days left
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Donation Section */}
            <div className="lg:col-span-2">
              <Card className="border-2 border-blue-200">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="text-xl text-blue-900">Choose Your Contribution</CardTitle>
                  <p className="text-sm text-blue-700">Select how many pieces you'd like to contribute</p>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Visual Brick Options */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {donationTiers.map((tier) => (
                      <div
                        key={tier.pieces}
                        onClick={() => {
                          setSelectedPieces(tier.pieces);
                          setCustomPieces('');
                        }}
                        className={`cursor-pointer p-4 rounded-lg border-2 transition-all text-center ${
                          selectedPieces === tier.pieces && !customPieces
                            ? 'border-blue-500 bg-blue-50 scale-105'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        {/* Brick Visual */}
                        <div className="mb-3 flex justify-center">
                          {tier.pieces === 1 && (
                            <div className="w-8 h-6 bg-red-500 border border-red-600 rounded-sm"></div>
                          )}
                          {tier.pieces === 2 && (
                            <div className="flex space-x-1">
                              <div className="w-6 h-6 bg-red-500 border border-red-600 rounded-sm"></div>
                              <div className="w-6 h-6 bg-red-500 border border-red-600 rounded-sm"></div>
                            </div>
                          )}
                          {tier.pieces === 4 && (
                            <div className="grid grid-cols-2 gap-1">
                              <div className="w-4 h-4 bg-red-500 border border-red-600 rounded-sm"></div>
                              <div className="w-4 h-4 bg-red-500 border border-red-600 rounded-sm"></div>
                              <div className="w-4 h-4 bg-red-500 border border-red-600 rounded-sm"></div>
                              <div className="w-4 h-4 bg-red-500 border border-red-600 rounded-sm"></div>
                            </div>
                          )}
                          {tier.pieces >= 6 && (
                            <div className="grid grid-cols-3 gap-1">
                              {Array.from({ length: Math.min(tier.pieces, 9) }).map((_, i) => (
                                <div key={i} className="w-3 h-3 bg-red-500 border border-red-600 rounded-sm"></div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="font-semibold text-gray-900">Buy {tier.pieces} Piece{tier.pieces > 1 ? 's' : ''}</div>
                        <div className="text-lg font-bold text-blue-600">£{tier.price} GBP</div>
                        <div className="text-xs text-gray-600">{tier.description}</div>
                      </div>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Custom Amount (£40 per piece)
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Enter number of pieces"
                        value={customPieces}
                        onChange={(e) => {
                          setCustomPieces(e.target.value);
                          setSelectedPieces(0);
                        }}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setCustomPieces('')}
                        disabled={!customPieces}
                      >
                        Clear
                      </Button>
                    </div>
                    {customPieces && (
                      <div className="mt-2 text-sm text-blue-600 font-semibold">
                        {customPieces} pieces = £{customAmount}
                      </div>
                    )}
                  </div>

                  {/* Impact Visualization */}
                  <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">Your Impact:</h4>
                    <div className="text-lg font-bold text-emerald-700">
                      {finalPieces} piece{finalPieces > 1 ? 's' : ''} = £{finalAmount}
                    </div>
                    <div className="text-sm text-emerald-600">
                      You're contributing {finalPieces} brick{finalPieces > 1 ? 's' : ''} to the mosque foundation
                    </div>
                  </div>

                  {/* Donate Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-4 text-lg font-semibold"
                    disabled={!finalAmount}
                  >
                    Contribute Your Piece - £{finalAmount}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Info Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Campaign Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Global Initiative</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{currentCampaign.daysLeft} days remaining</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-gray-500" />
                    <span>{currentCampaign.supporters.toLocaleString()} supporters</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Funding Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {Math.round(progressPercentage)}%
                    </div>
                    <div className="text-sm text-gray-600">
                      of the mosque's total cost has been funded
                    </div>
                    <Progress value={progressPercentage} className="mt-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Project Status Table */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl">Mosque Projects at Various Stages</CardTitle>
              <p className="text-gray-600">See the impact of our collective efforts across different communities</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mosqueProjects.map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{project.image}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.title}</h4>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {project.location}
                        </p>
                        {project.status === 'completed' && project.completedDate && (
                          <p className="text-xs text-green-600">Completed: {new Date(project.completedDate).toLocaleDateString()}</p>
                        )}
                        {project.status === 'building' && project.estimatedCompletion && (
                          <p className="text-xs text-blue-600">Est. completion: {new Date(project.estimatedCompletion).toLocaleDateString()}</p>
                        )}
                        {project.status === 'funded' && project.constructionStart && (
                          <p className="text-xs text-orange-600">Construction starts: {new Date(project.constructionStart).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(project.status)}
                      <div className="text-sm text-gray-600 mt-1">
                        £{project.totalCost.toLocaleString()} total cost
                      </div>
                      <div className="text-xs text-gray-500">
                        {project.funded}% funded
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="mt-8 text-center bg-gradient-to-r from-emerald-600 to-blue-600 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Join Our Mission</h3>
            <p className="text-lg mb-6">
              This structured, visual, and transparent approach highlights the tangible impact of each gift, 
              builds trust, and encourages ongoing participation.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Build Now - Contribute Your Piece
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildMosque;

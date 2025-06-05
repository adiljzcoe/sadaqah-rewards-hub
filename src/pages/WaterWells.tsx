
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Droplets, MapPin, Users, Calendar, Heart, Star, Trophy, Target, Coins, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface WellShare {
  id: string;
  shareNumber: number;
  price: number;
  isPurchased: boolean;
  purchasedBy?: string;
  purchaseDate?: string;
  wellId: string;
}

interface WaterProject {
  id: number;
  name: string;
  location: string;
  description: string;
  wellsNeeded: number;
  completedWells: number;
  sharesPerWell: number;
  totalShares: number;
  purchasedShares: number;
  targetAmount: number;
  raisedAmount: number;
  beneficiaries: number;
  urgency: string;
  image: string;
  shares: WellShare[];
  wellProgress: { wellId: string; sharesPurchased: number; isCompleted: boolean }[];
}

const WaterWells = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<WaterProject | null>(null);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);

  // Generate shares for each project
  const generateShares = (projectId: number, wellsNeeded: number, sharesPerWell: number): WellShare[] => {
    const shares: WellShare[] = [];
    const sharePrice = 50; // £50 per share

    for (let wellIndex = 0; wellIndex < wellsNeeded; wellIndex++) {
      const wellId = `well-${projectId}-${wellIndex + 1}`;
      
      for (let shareIndex = 0; shareIndex < sharesPerWell; shareIndex++) {
        const shareId = `${wellId}-share-${shareIndex + 1}`;
        
        shares.push({
          id: shareId,
          shareNumber: shareIndex + 1,
          price: sharePrice,
          isPurchased: Math.random() > 0.65, // 35% already purchased
          purchasedBy: Math.random() > 0.5 ? 'Anonymous Donor' : 'Verified Donor',
          purchaseDate: Math.random() > 0.5 ? '3 days ago' : '1 week ago',
          wellId
        });
      }
    }

    return shares;
  };

  const [waterProjects, setWaterProjects] = useState<WaterProject[]>([
    {
      id: 1,
      name: "Somalia Emergency Wells",
      location: "Drought-affected regions",
      description: "Urgent water well construction to provide clean water access to communities facing severe drought.",
      wellsNeeded: 15,
      completedWells: 5,
      sharesPerWell: 100,
      totalShares: 1500,
      purchasedShares: 975,
      targetAmount: 75000,
      raisedAmount: 48750,
      beneficiaries: 5000,
      urgency: "critical",
      image: "/placeholder.svg",
      shares: [],
      wellProgress: []
    },
    {
      id: 2,
      name: "Yemen Community Wells",
      location: "Rural Yemen villages",
      description: "Building sustainable water wells with hand pumps for villages without access to clean water.",
      wellsNeeded: 10,
      completedWells: 3,
      sharesPerWell: 100,
      totalShares: 1000,
      purchasedShares: 650,
      targetAmount: 50000,
      raisedAmount: 32500,
      beneficiaries: 3200,
      urgency: "high",
      image: "/placeholder.svg",
      shares: [],
      wellProgress: []
    }
  ]);

  // Initialize shares and well progress for projects
  useEffect(() => {
    setWaterProjects(prev => prev.map(project => {
      const shares = generateShares(project.id, project.wellsNeeded, project.sharesPerWell);
      const wellProgress = [];
      
      for (let i = 0; i < project.wellsNeeded; i++) {
        const wellId = `well-${project.id}-${i + 1}`;
        const wellShares = shares.filter(s => s.wellId === wellId);
        const sharesPurchased = wellShares.filter(s => s.isPurchased).length;
        
        wellProgress.push({
          wellId,
          sharesPurchased,
          isCompleted: sharesPurchased >= project.sharesPerWell
        });
      }

      return {
        ...project,
        shares,
        wellProgress,
        purchasedShares: shares.filter(s => s.isPurchased).length,
        raisedAmount: shares.filter(s => s.isPurchased).length * 50,
        completedWells: wellProgress.filter(w => w.isCompleted).length
      };
    }));
  }, []);

  const handleSharePurchase = (projectId: number, shareId: string) => {
    setWaterProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedShares = project.shares.map(share => 
          share.id === shareId 
            ? { ...share, isPurchased: true, purchasedBy: user?.email || 'You', purchaseDate: 'Just now' }
            : share
        );

        // Update well progress
        const updatedWellProgress = project.wellProgress.map(well => {
          const wellShares = updatedShares.filter(s => s.wellId === well.wellId);
          const sharesPurchased = wellShares.filter(s => s.isPurchased).length;
          
          return {
            ...well,
            sharesPurchased,
            isCompleted: sharesPurchased >= project.sharesPerWell
          };
        });

        const newPurchasedShares = updatedShares.filter(s => s.isPurchased).length;
        const newRaisedAmount = newPurchasedShares * 50;
        const newCompletedWells = updatedWellProgress.filter(w => w.isCompleted).length;
        
        return {
          ...project,
          shares: updatedShares,
          wellProgress: updatedWellProgress,
          purchasedShares: newPurchasedShares,
          raisedAmount: newRaisedAmount,
          completedWells: newCompletedWells
        };
      }
      return project;
    }));

    setUserPurchases(prev => [...prev, shareId]);
    setShowPurchaseAnimation(true);
    setTimeout(() => setShowPurchaseAnimation(false), 3000);
  };

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

      {/* Purchase Success Animation */}
      {showPurchaseAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-8 rounded-3xl shadow-2xl animate-bounce border-4 border-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">💧✨</div>
              <div className="text-2xl font-bold mb-2">Mashallah!</div>
              <div className="text-lg">Your well share secured!</div>
              <div className="text-sm opacity-90 mt-2">Every drop counts for those in need</div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-full">
              <Droplets className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Water Wells - Share by Share
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Provide the gift of clean water through collective funding. Buy individual shares in water well projects 
            and watch as communities come together to complete life-saving water sources.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">£50 per Share</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">100 Shares per Well</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Life-Changing Impact</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Droplets className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">347</div>
              <div className="text-sm opacity-90">Wells Completed</div>
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
              <Coins className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">34.7K</div>
              <div className="text-sm opacity-90">Shares Purchased</div>
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
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
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
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {project.completedWells}/{project.wellsNeeded} Wells
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
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{project.wellsNeeded}</div>
                      <div className="text-sm text-blue-800">Wells Needed</div>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-emerald-600">{project.completedWells}</div>
                      <div className="text-sm text-emerald-800">Completed</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">{project.purchasedShares}</div>
                      <div className="text-sm text-purple-800">Shares Bought</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Overall Progress</span>
                      <span className="text-sm font-semibold">
                        {project.purchasedShares}/{project.totalShares} shares (£{project.raisedAmount.toLocaleString()})
                      </span>
                    </div>
                    <Progress 
                      value={(project.purchasedShares / project.totalShares) * 100} 
                      className="h-3"
                    />
                    <div className="text-xs text-gray-600">
                      Next well needs {project.sharesPerWell - (project.purchasedShares % project.sharesPerWell)} more shares
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Droplets className="h-4 w-4 mr-2" />
                          Buy Shares
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Droplets className="h-5 w-5" />
                            {project.name} - Well Shares
                          </DialogTitle>
                        </DialogHeader>
                        
                        {selectedProject && (
                          <div className="space-y-6">
                            {/* Project Overview */}
                            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                              <div className="grid md:grid-cols-4 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-blue-600">{selectedProject.completedWells}</div>
                                  <div className="text-sm text-gray-600">Wells Completed</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-emerald-600">{selectedProject.purchasedShares}</div>
                                  <div className="text-sm text-gray-600">Shares Purchased</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-purple-600">{selectedProject.totalShares - selectedProject.purchasedShares}</div>
                                  <div className="text-sm text-gray-600">Shares Remaining</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-orange-600">£50</div>
                                  <div className="text-sm text-gray-600">Per Share</div>
                                </div>
                              </div>
                            </div>

                            {/* Wells Progress Grid */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold">Individual Wells Progress</h4>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {selectedProject.wellProgress.map((well, index) => (
                                  <Card 
                                    key={well.wellId} 
                                    className={`${well.isCompleted ? 'bg-emerald-50 border-emerald-300' : 'bg-blue-50 border-blue-300'}`}
                                  >
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <div className="text-3xl mb-2">
                                          {well.isCompleted ? '💧' : '🚧'}
                                        </div>
                                        <h5 className="font-bold mb-2">Well {index + 1}</h5>
                                        <div className="text-2xl font-bold mb-2">
                                          {well.sharesPurchased}/{selectedProject.sharesPerWell}
                                        </div>
                                        <Progress 
                                          value={(well.sharesPurchased / selectedProject.sharesPerWell) * 100} 
                                          className="h-2 mb-3"
                                        />
                                        <div className="text-sm">
                                          {well.isCompleted ? (
                                            <Badge className="bg-emerald-500 text-white">Completed ✓</Badge>
                                          ) : (
                                            <Badge variant="outline">
                                              {selectedProject.sharesPerWell - well.sharesPurchased} shares needed
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>

                            {/* Available Shares */}
                            <div className="space-y-4">
                              <h4 className="text-lg font-bold">Available Shares - Choose Your Impact</h4>
                              
                              <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-2">
                                {selectedProject.shares.filter(s => !s.isPurchased).slice(0, 50).map((share) => (
                                  <Card 
                                    key={share.id} 
                                    className={`cursor-pointer transition-all duration-300 ${
                                      userPurchases.includes(share.id)
                                        ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg'
                                        : 'hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-blue-300'
                                    }`}
                                    onClick={() => handleSharePurchase(selectedProject.id, share.id)}
                                  >
                                    <CardContent className="p-3 text-center">
                                      <div className="w-6 h-6 mx-auto mb-1 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                                        {share.shareNumber}
                                      </div>
                                      <div className="text-xs font-bold text-blue-600">£{share.price}</div>
                                      {userPurchases.includes(share.id) ? (
                                        <div className="text-xs text-green-600 font-medium">
                                          ✓ Bought!
                                        </div>
                                      ) : (
                                        <div className="text-xs text-blue-600">
                                          Buy Share
                                        </div>
                                      )}
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                              
                              {selectedProject.shares.filter(s => !s.isPurchased).length > 50 && (
                                <div className="text-center text-gray-600">
                                  ...and {selectedProject.shares.filter(s => !s.isPurchased).length - 50} more shares available
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
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

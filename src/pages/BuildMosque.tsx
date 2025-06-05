import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BlockTypesLegend from '@/components/BlockTypesLegend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Building, MapPin, Users, Calendar, Heart, Star, Trophy, Target, Coins, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface MosqueBlock {
  id: string;
  name: string;
  description: string;
  pricePerBlock: number;
  bricksPerBlock: number;
  isPurchased: boolean;
  purchasedBy?: string;
  purchaseDate?: string;
  category: 'foundation' | 'walls' | 'roof' | 'interior' | 'minaret' | 'dome';
  jannahPointsReward: number;
}

interface MosqueProject {
  id: number;
  name: string;
  location: string;
  description: string;
  totalBlocks: number;
  purchasedBlocks: number;
  totalCost: number;
  raisedAmount: number;
  capacity: number;
  features: string[];
  urgency: string;
  image: string;
  blocks: MosqueBlock[];
  baseBlockPrice: number;
  totalBricks: number;
  costPerBrick: number;
}

const BuildMosque = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<MosqueProject | null>(null);
  const [userPurchases, setUserPurchases] = useState<string[]>([]);
  const [showPurchaseAnimation, setShowPurchaseAnimation] = useState(false);

  // Generate blocks for each project with limited quantities for premium blocks
  const generateBlocks = (projectId: number, totalCost: number): MosqueBlock[] => {
    const categories: MosqueBlock['category'][] = ['foundation', 'walls', 'roof', 'interior', 'minaret', 'dome'];
    
    // Base pricing calculation: £1 per brick, 50 bricks per block = £50 base price
    const costPerBrick = 1; // £1 per brick
    const bricksPerBlock = 50;
    const baseBlockPrice = 50; // £50 target price
    const totalBlocks = Math.floor(totalCost / baseBlockPrice);
    const blocksPerCategory = Math.floor(totalBlocks / categories.length);
    
    const blocks: MosqueBlock[] = [];

    // Category-specific pricing multipliers and Jannah point bonuses
    const categoryMultipliers = {
      foundation: { price: 0.8, jannahBonus: 1.5 }, // £40 per block
      walls: { price: 1.0, jannahBonus: 1.2 },      // £50 per block (target)
      roof: { price: 1.2, jannahBonus: 1.3 },       // £60 per block
      interior: { price: 0.9, jannahBonus: 1.1 },   // £45 per block
      minaret: { price: 1.5, jannahBonus: 2.0 },    // £75 per block
      dome: { price: 1.8, jannahBonus: 2.5 }        // £90 per block
    };

    // Base Jannah points calculation (extra rewards for mosque building)
    const baseJannahPoints = 50; // Base points per block

    // Limited quantities for premium blocks
    const categoryLimits = {
      foundation: 0, // unlimited
      walls: 0,      // unlimited  
      roof: 0,       // unlimited
      interior: 0,   // unlimited
      minaret: 4,    // only 4 minaret blocks per mosque
      dome: 1        // only 1 dome block per mosque
    };

    categories.forEach((category, categoryIndex) => {
      let categoryBlockCount;
      
      // Apply limits for premium categories
      if (categoryLimits[category] > 0) {
        categoryBlockCount = categoryLimits[category];
      } else {
        categoryBlockCount = categoryIndex === categories.length - 1 
          ? totalBlocks - (blocksPerCategory * (categories.length - 1)) - 5 // Reserve 5 blocks for premium categories
          : blocksPerCategory;
      }

      for (let i = 0; i < categoryBlockCount; i++) {
        const blockId = `${projectId}-${category}-block-${i + 1}`;
        const multiplier = categoryMultipliers[category];
        const blockPrice = Math.round(baseBlockPrice * multiplier.price);
        const jannahPoints = Math.round(baseJannahPoints * multiplier.jannahBonus * 1.5); // 1.5x mosque bonus

        blocks.push({
          id: blockId,
          name: `${category.charAt(0).toUpperCase() + category.slice(1)} Block ${i + 1}`,
          description: `50 bricks for the ${category} section (£${blockPrice} = ${bricksPerBlock} bricks at £${costPerBrick} each)`,
          pricePerBlock: blockPrice,
          bricksPerBlock: bricksPerBlock,
          isPurchased: Math.random() > 0.7, // 30% already purchased
          category,
          purchasedBy: Math.random() > 0.5 ? 'Anonymous Donor' : 'Verified Donor',
          purchaseDate: Math.random() > 0.5 ? '2 days ago' : '1 week ago',
          jannahPointsReward: jannahPoints
        });
      }
    });

    return blocks;
  };

  const [mosqueProjects, setMosqueProjects] = useState<MosqueProject[]>([
    {
      id: 1,
      name: "Central Community Mosque",
      location: "Birmingham, UK",
      description: "A modern mosque serving 2,000+ families with community center, school, and sports facilities.",
      totalBlocks: 0,
      purchasedBlocks: 0,
      totalCost: 500000,
      raisedAmount: 0,
      capacity: 2000,
      features: ["Prayer Hall", "Community Center", "Islamic School", "Sports Complex", "Car Park"],
      urgency: "high",
      image: "/placeholder.svg",
      blocks: [],
      baseBlockPrice: 50,
      totalBricks: 0,
      costPerBrick: 1
    },
    {
      id: 2,
      name: "Riverside Family Mosque",
      location: "Manchester, UK", 
      description: "Family-focused mosque with dedicated women's section, children's area, and elderly care facilities.",
      totalBlocks: 0,
      purchasedBlocks: 0,
      totalCost: 1500000,
      raisedAmount: 0,
      capacity: 1200,
      features: ["Family Prayer Areas", "Women's Section", "Children's Area", "Elderly Care", "Library"],
      urgency: "medium",
      image: "/placeholder.svg",
      blocks: [],
      baseBlockPrice: 50,
      totalBricks: 0,
      costPerBrick: 1
    }
  ]);

  // Initialize blocks for projects with new pricing system
  useEffect(() => {
    setMosqueProjects(prev => prev.map(project => {
      const blocks = generateBlocks(project.id, project.totalCost);
      const totalBlocks = blocks.length;
      const totalBricks = totalBlocks * 50; // 50 bricks per block
      const purchasedBlocks = blocks.filter(b => b.isPurchased).length;
      const raisedAmount = blocks.filter(b => b.isPurchased).reduce((sum, b) => sum + b.pricePerBlock, 0);
      
      return {
        ...project,
        blocks,
        totalBlocks,
        totalBricks,
        purchasedBlocks,
        raisedAmount
      };
    }));
  }, []);

  const handleBlockPurchase = (projectId: number, blockId: string) => {
    setMosqueProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedBlocks = project.blocks.map(block => 
          block.id === blockId 
            ? { ...block, isPurchased: true, purchasedBy: user?.email || 'You', purchaseDate: 'Just now' }
            : block
        );
        const newPurchasedCount = updatedBlocks.filter(b => b.isPurchased).length;
        const newRaisedAmount = updatedBlocks.filter(b => b.isPurchased).reduce((sum, b) => sum + b.pricePerBlock, 0);
        
        return {
          ...project,
          blocks: updatedBlocks,
          purchasedBlocks: newPurchasedCount,
          raisedAmount: newRaisedAmount
        };
      }
      return project;
    }));

    setUserPurchases(prev => [...prev, blockId]);
    setShowPurchaseAnimation(true);
    setTimeout(() => setShowPurchaseAnimation(false), 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: MosqueBlock['category']) => {
    const colors = {
      foundation: 'bg-stone-500',
      walls: 'bg-amber-500', 
      roof: 'bg-slate-500',
      interior: 'bg-emerald-500',
      minaret: 'bg-blue-500',
      dome: 'bg-purple-500'
    };
    return colors[category];
  };

  const getCategoryIcon = (category: MosqueBlock['category']) => {
    switch (category) {
      case 'foundation': return '🏗️';
      case 'walls': return '🧱';
      case 'roof': return '🏠';
      case 'interior': return '🏛️';
      case 'minaret': return '🗼';
      case 'dome': return '🕌';
      default: return '🏗️';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      <Header />

      {/* Purchase Success Animation */}
      {showPurchaseAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl animate-bounce border-4 border-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">🕌✨</div>
              <div className="text-2xl font-bold mb-2">Barakallahu Feek!</div>
              <div className="text-lg">Your block has been secured!</div>
              <div className="text-sm opacity-90 mt-2">May Allah reward you abundantly</div>
              <div className="text-sm opacity-90 mt-1">Extra Jannah points for mosque building!</div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-3 rounded-full">
              <Building className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Build a Mosque - Block by Block
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Join thousands of believers in building beautiful mosques. Purchase individual blocks (50 bricks each) and watch as the community 
            collectively funds entire mosque projects, brick by brick. <span className="font-semibold text-emerald-600">Each block = 50 bricks at £1 per brick. Extra Jannah points for mosque building!</span>
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Building className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-medium">Block-Based Pricing</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">£1 per Brick</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-100 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
              <Star className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">1.5x Bonus Jannah Points</span>
            </div>
          </div>
        </div>

        {/* Block Types Legend */}
        <BlockTypesLegend />

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6 text-center">
              <Building className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-90">Mosques Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">25K+</div>
              <div className="text-sm opacity-90">People Served</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">47K</div>
              <div className="text-sm opacity-90">Blocks Purchased</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">£2.3M</div>
              <div className="text-sm opacity-90">Total Raised</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Active Mosque Projects</h2>
          
          {mosqueProjects.map((project) => (
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
                      {project.urgency.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-gray-800">
                      {project.purchasedBlocks}/{project.totalBlocks} Blocks
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-emerald-500/90 text-white">
                      £{project.baseBlockPrice} per block (50 bricks)
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
                      <div className="text-sm text-gray-500">Capacity</div>
                      <div className="text-lg font-bold">{project.capacity.toLocaleString()}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{project.description}</p>

                  {/* Cost Breakdown */}
                  <div className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold mb-2 text-emerald-800">Project Breakdown:</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Total Cost:</span>
                        <span className="font-bold ml-2">£{project.totalCost.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Blocks:</span>
                        <span className="font-bold ml-2">{project.totalBlocks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Bricks:</span>
                        <span className="font-bold ml-2">{project.totalBricks.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Cost per Brick:</span>
                        <span className="font-bold ml-2 text-emerald-600">£{project.costPerBrick}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Project Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Block Progress</span>
                      <span className="text-sm font-semibold">
                        {project.purchasedBlocks} of {project.totalBlocks} blocks purchased
                      </span>
                    </div>
                    <Progress 
                      value={(project.purchasedBlocks / project.totalBlocks) * 100} 
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>£{project.raisedAmount.toLocaleString()} raised</span>
                      <span>{((project.purchasedBlocks / project.totalBlocks) * 100).toFixed(1)}% complete</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Building className="h-4 w-4 mr-2" />
                          Buy Blocks
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Building className="h-5 w-5" />
                            {project.name} - Available Blocks (50 bricks each)
                          </DialogTitle>
                        </DialogHeader>
                        
                        {selectedProject && (
                          <div className="space-y-6">
                            {/* Project Overview */}
                            <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-lg">
                              <div className="grid md:grid-cols-4 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-emerald-600">{selectedProject.purchasedBlocks}</div>
                                  <div className="text-sm text-gray-600">Blocks Purchased</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-blue-600">{selectedProject.totalBlocks - selectedProject.purchasedBlocks}</div>
                                  <div className="text-sm text-gray-600">Blocks Remaining</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-purple-600">£{selectedProject.costPerBrick}</div>
                                  <div className="text-sm text-gray-600">Per Brick</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-orange-600">1.5x</div>
                                  <div className="text-sm text-gray-600">Jannah Points Bonus</div>
                                </div>
                              </div>
                            </div>

                            {/* Blocks Grid by Category */}
                            {['foundation', 'walls', 'roof', 'interior', 'minaret', 'dome'].map(category => {
                              const categoryBlocks = selectedProject.blocks.filter(b => b.category === category);
                              if (categoryBlocks.length === 0) return null;

                              return (
                                <div key={category} className="space-y-4">
                                  <h4 className="text-lg font-bold flex items-center gap-2">
                                    <span className="text-2xl">{getCategoryIcon(category as MosqueBlock['category'])}</span>
                                    {category.charAt(0).toUpperCase() + category.slice(1)} Blocks
                                    <Badge className={`${getCategoryColor(category as MosqueBlock['category'])} text-white`}>
                                      {categoryBlocks.filter(b => !b.isPurchased).length} available
                                    </Badge>
                                  </h4>
                                  
                                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {categoryBlocks.map((block) => (
                                      <Card 
                                        key={block.id} 
                                        className={`cursor-pointer transition-all duration-300 ${
                                          block.isPurchased 
                                            ? 'bg-gray-100 border-gray-300' 
                                            : userPurchases.includes(block.id)
                                            ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg'
                                            : 'hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-emerald-300'
                                        }`}
                                        onClick={() => !block.isPurchased && handleBlockPurchase(project.id, block.id)}
                                      >
                                        <CardContent className="p-4 text-center">
                                          <div className={`w-8 h-8 mx-auto mb-2 rounded-full ${getCategoryColor(block.category)} flex items-center justify-center text-white text-xs font-bold`}>
                                            {block.id.split('-').pop()}
                                          </div>
                                          <div className="text-xs font-medium mb-1">{block.name}</div>
                                          <div className="text-lg font-bold text-emerald-600">£{block.pricePerBlock}</div>
                                          <div className="text-xs text-gray-500">{block.bricksPerBlock} bricks</div>
                                          <div className="text-xs text-purple-600 font-medium">
                                            +{block.jannahPointsReward} Jannah pts
                                          </div>
                                          {block.isPurchased ? (
                                            <div className="text-xs text-gray-500 mt-1">
                                              <div>✓ Purchased</div>
                                              <div>{block.purchaseDate}</div>
                                            </div>
                                          ) : userPurchases.includes(block.id) ? (
                                            <div className="text-xs text-green-600 mt-1 font-medium">
                                              ✓ Just Purchased!
                                            </div>
                                          ) : (
                                            <div className="text-xs text-blue-600 mt-1">
                                              Click to Purchase
                                            </div>
                                          )}
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
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

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise."
              </h3>
              <p className="text-lg opacity-90 mb-2">- Prophet Muhammad (ﷺ) - Sahih Bukhari</p>
              <p className="text-sm opacity-75">Building mosques earns extra Jannah points - invest in your eternal home!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildMosque;

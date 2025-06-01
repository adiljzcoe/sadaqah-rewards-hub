import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building2, Droplets, Heart, MapPin, Users, Target, Plus, Minus, Crown, Star, Sparkles } from 'lucide-react';

interface ProjectConfig {
  type: 'mosque' | 'waterwell' | 'orphanage';
  portionName: string;
  portionPrice: number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  locations: Array<{
    id: string;
    name: string;
    country: string;
    urgency?: 'high' | 'medium' | 'low';
  }>;
  sizes: Array<{
    id: string;
    name: string;
    totalPortions: number;
    description: string;
    capacity?: number;
    totalCost?: number;
  }>;
}

const projectConfigs: Record<string, ProjectConfig> = {
  mosque: {
    type: 'mosque',
    portionName: 'Prayer Space',
    portionPrice: 100,
    icon: <Building2 className="h-5 w-5" />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50 border-emerald-200',
    locations: [
      { id: 'general', name: 'General Pool', country: 'Western Locations', urgency: 'medium' },
      { id: 'gaza', name: 'Gaza', country: 'Palestine', urgency: 'high' },
      { id: 'syria', name: 'Aleppo', country: 'Syria', urgency: 'high' },
      { id: 'pakistan', name: 'Karachi', country: 'Pakistan', urgency: 'medium' },
      { id: 'bangladesh', name: 'Dhaka', country: 'Bangladesh', urgency: 'medium' },
      { id: 'somalia', name: 'Mogadishu', country: 'Somalia', urgency: 'high' },
      { id: 'yemen', name: 'Sana\'a', country: 'Yemen', urgency: 'high' }
    ],
    sizes: [
      { 
        id: 'small', 
        name: 'Small Mosque', 
        totalPortions: 50, 
        description: 'Community mosque for 200 people',
        capacity: 200,
        totalCost: 45000
      },
      { 
        id: 'medium', 
        name: 'Medium Mosque', 
        totalPortions: 75, 
        description: 'District mosque for 500 people',
        capacity: 500,
        totalCost: 75000
      },
      { 
        id: 'large', 
        name: 'Large Mosque', 
        totalPortions: 100, 
        description: 'Central mosque for 1000+ people',
        capacity: 1000,
        totalCost: 120000
      }
    ]
  },
  waterwell: {
    type: 'waterwell',
    portionName: 'Well Share',
    portionPrice: 50,
    icon: <Droplets className="h-5 w-5" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 border-blue-200',
    locations: [
      { id: 'somalia', name: 'Gedo Region', country: 'Somalia', urgency: 'high' },
      { id: 'yemen', name: 'Taiz', country: 'Yemen', urgency: 'high' },
      { id: 'pakistan', name: 'Tharparkar', country: 'Pakistan', urgency: 'medium' },
      { id: 'bangladesh', name: 'Cox\'s Bazar', country: 'Bangladesh', urgency: 'high' },
      { id: 'mali', name: 'Gao Region', country: 'Mali', urgency: 'medium' },
      { id: 'niger', name: 'Diffa', country: 'Niger', urgency: 'high' }
    ],
    sizes: [
      { id: 'hand-pump', name: 'Hand Pump Well', totalPortions: 30, description: 'Serves 150 people daily' },
      { id: 'solar', name: 'Solar Well', totalPortions: 60, description: 'Serves 500 people daily' },
      { id: 'deep', name: 'Deep Bore Well', totalPortions: 100, description: 'Serves 1000+ people daily' }
    ]
  },
  orphanage: {
    type: 'orphanage',
    portionName: 'Child Space',
    portionPrice: 150,
    icon: <Heart className="h-5 w-5" />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50 border-rose-200',
    locations: [
      { id: 'gaza', name: 'Gaza Strip', country: 'Palestine', urgency: 'high' },
      { id: 'syria', name: 'Damascus', country: 'Syria', urgency: 'high' },
      { id: 'lebanon', name: 'Bekaa Valley', country: 'Lebanon', urgency: 'high' },
      { id: 'bangladesh', name: 'Rohingya Camps', country: 'Bangladesh', urgency: 'high' },
      { id: 'afghanistan', name: 'Kabul', country: 'Afghanistan', urgency: 'high' },
      { id: 'somalia', name: 'Mogadishu', country: 'Somalia', urgency: 'medium' }
    ],
    sizes: [
      { id: 'small', name: 'Small Care Home', totalPortions: 20, description: 'Care for 30 orphaned children' },
      { id: 'medium', name: 'Medium Orphanage', totalPortions: 40, description: 'Care for 80 orphaned children' },
      { id: 'large', name: 'Large Complex', totalPortions: 67, description: 'Care for 150+ orphaned children' }
    ]
  }
};

const intentionOptions = [
  'For myself',
  'For my mother',
  'For my father',
  'For my grandmother',
  'For my grandfather',
  'For my family',
  'For my friend',
  'For my spouse',
  'For my children',
  'For all Muslims',
  'Other (specify)'
];

interface ProjectDonationWidgetProps {
  projectType: 'mosque' | 'waterwell' | 'orphanage';
}

const ProjectDonationWidget: React.FC<ProjectDonationWidgetProps> = ({ projectType }) => {
  const config = projectConfigs[projectType];
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedIntention, setSelectedIntention] = useState('');
  const [customIntention, setCustomIntention] = useState('');
  const [portionCount, setPortionCount] = useState(1);
  const [showOnlyExisting, setShowOnlyExisting] = useState(false);
  const [fundingMode, setFundingMode] = useState<'portions' | 'full' | 'new'>('portions');
  const [newProjectName, setNewProjectName] = useState('');
  const [dedicatedToSomeoneElse, setDedicatedToSomeoneElse] = useState(false);
  const [dedicatedPersonName, setDedicatedPersonName] = useState('');

  // Auto-select defaults for mosque
  useEffect(() => {
    if (projectType === 'mosque') {
      setSelectedLocation('general');
      setSelectedSize('medium');
      setSelectedIntention('For myself');
    }
  }, [projectType]);
  
  // Mock existing project data - would come from API
  const [existingProjects] = useState([
    {
      id: 'gaza-small-1',
      location: 'gaza',
      size: 'small',
      currentPortions: 32,
      totalPortions: 50,
      contributors: 127
    },
    {
      id: 'syria-medium-1',
      location: 'syria',
      size: 'medium',
      currentPortions: 45,
      totalPortions: 75,
      contributors: 89
    },
    {
      id: 'somalia-hand-pump-1',
      location: 'somalia',
      size: 'hand-pump',
      currentPortions: 18,
      totalPortions: 30,
      contributors: 45
    },
    {
      id: 'gaza-small-orphan-1',
      location: 'gaza',
      size: 'small',
      currentPortions: 12,
      totalPortions: 20,
      contributors: 35
    }
  ]);

  const selectedLocationData = config.locations.find(loc => loc.id === selectedLocation);
  const selectedSizeData = config.sizes.find(size => size.id === selectedSize);
  
  // Calculate prayer space cost based on capacity and total cost
  const calculatePrayerSpaceCost = () => {
    if (projectType === 'mosque') {
      // General pool has fixed price
      if (selectedLocation === 'general') {
        return 80;
      }
      
      // Calculate based on capacity and total cost
      if (selectedSizeData?.capacity && selectedSizeData?.totalCost) {
        return Math.round(selectedSizeData.totalCost / selectedSizeData.capacity);
      }
    }
    return config.portionPrice;
  };

  const prayerSpaceCost = calculatePrayerSpaceCost();
  
  // Find existing project that matches selection
  const matchingProject = existingProjects.find(
    project => project.location === selectedLocation && project.size === selectedSize
  );

  // Auto-switch funding mode if no matching project exists
  useEffect(() => {
    if (fundingMode === 'full' && !matchingProject) {
      setFundingMode('portions');
    }
  }, [matchingProject, fundingMode]);

  // Calculate costs based on funding mode
  const getProjectCost = () => {
    if (fundingMode === 'portions') {
      return portionCount * prayerSpaceCost;
    } else if (fundingMode === 'full' && matchingProject) {
      const remainingPortions = matchingProject.totalPortions - matchingProject.currentPortions;
      return remainingPortions * prayerSpaceCost;
    } else if (fundingMode === 'new' && selectedSizeData) {
      const baseCost = selectedSizeData.totalCost || selectedSizeData.totalPortions * prayerSpaceCost;
      const premiumCost = dedicatedToSomeoneElse ? baseCost * 1.2 : baseCost * 1.5; // 20% premium for others, 50% for self
      return premiumCost;
    }
    return 0;
  };

  // Filter locations and sizes based on existing projects when filter is active
  const getFilteredLocations = () => {
    if (!showOnlyExisting) return config.locations;
    const existingLocationIds = [...new Set(existingProjects.map(p => p.location))];
    return config.locations.filter(loc => existingLocationIds.includes(loc.id));
  };

  const getFilteredSizes = () => {
    if (!showOnlyExisting) return config.sizes;
    if (!selectedLocation) return config.sizes;
    const existingSizeIds = existingProjects
      .filter(p => p.location === selectedLocation)
      .map(p => p.size);
    return config.sizes.filter(size => existingSizeIds.includes(size.id));
  };

  const totalCost = getProjectCost();
  const finalIntention = selectedIntention === 'Other (specify)' ? customIntention : selectedIntention;

  const getUrgencyBadge = (urgency?: string) => {
    switch (urgency) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 text-xs">Urgent</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-700 text-xs">Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-700 text-xs">Ongoing</Badge>;
      default:
        return null;
    }
  };

  const handleDonation = () => {
    let badge = '';
    let jannahMultiplier = 10;
    
    if (fundingMode === 'full') {
      badge = '🏆 Full Mosque Funder';
      jannahMultiplier = 25; // 2.5x jannah points for full funding
    } else if (fundingMode === 'new') {
      badge = dedicatedToSomeoneElse ? '👑 Mosque Founder (Dedicated)' : '⭐ Premium Mosque Founder';
      jannahMultiplier = 50; // 5x jannah points for starting new mosque
    }

    console.log('Processing donation:', {
      projectType,
      fundingMode,
      location: selectedLocationData?.name,
      size: selectedSizeData?.name,
      intention: finalIntention,
      portionCount: fundingMode === 'portions' ? portionCount : undefined,
      prayerSpaceCost,
      totalCost,
      jannahPoints: totalCost * jannahMultiplier,
      badge,
      newProjectName: fundingMode === 'new' ? newProjectName : undefined,
      dedicatedTo: fundingMode === 'new' && dedicatedToSomeoneElse ? dedicatedPersonName : undefined
    });

    let successMessage = `Donation successful! £${totalCost} donated`;
    
    if (fundingMode === 'full') {
      successMessage += ` to fully fund the remaining ${config.portionName.toLowerCase()}s. You earned the "${badge}" badge and ${totalCost * jannahMultiplier} Jannah Points!`;
    } else if (fundingMode === 'new') {
      successMessage += ` to start a new ${selectedSizeData?.name}${newProjectName ? ` called "${newProjectName}"` : ''}${dedicatedToSomeoneElse && dedicatedPersonName ? ` dedicated to ${dedicatedPersonName}` : ''}. You earned the "${badge}" badge and ${totalCost * jannahMultiplier} Jannah Points!`;
    } else {
      successMessage += ` for ${portionCount} ${config.portionName.toLowerCase()}${portionCount > 1 ? 's' : ''}. You earned ${totalCost * jannahMultiplier} Jannah Points!`;
    }

    alert(successMessage);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <Card className={`p-6 ${config.bgColor} border-2`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-100 text-purple-700">Pooled Funding</Badge>
            </div>
          </div>

          {/* Funding Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose Funding Method
            </label>
            <div className={`grid grid-cols-1 ${matchingProject ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-3`}>
              <button
                onClick={() => setFundingMode('portions')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  fundingMode === 'portions' 
                    ? 'border-emerald-500 bg-emerald-100' 
                    : 'border-emerald-300 bg-emerald-50 hover:bg-emerald-100'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-emerald-600" />
                  <span className="font-semibold text-emerald-800">Fund Portions</span>
                </div>
                <p className="text-sm text-emerald-700">Fund individual prayer spaces</p>
              </button>

              {matchingProject && (
                <button
                  onClick={() => setFundingMode('full')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    fundingMode === 'full' 
                      ? 'border-amber-500 bg-amber-100' 
                      : 'border-amber-300 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Star className="h-5 w-5 text-amber-600" />
                    <span className="font-semibold text-amber-800">Finish Funding a Mosque</span>
                    <Badge className="bg-amber-200 text-amber-700 text-xs">🏆 Special Badge</Badge>
                  </div>
                  <p className="text-sm text-amber-700">Complete the entire project</p>
                </button>
              )}

              <button
                onClick={() => setFundingMode('new')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  fundingMode === 'new' 
                    ? 'border-purple-500 bg-purple-100' 
                    : 'border-purple-300 bg-purple-50 hover:bg-purple-100'
                }`}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Start a New Mosque and Name It</span>
                  <Badge className="bg-purple-200 text-purple-700 text-xs">👑 Premium</Badge>
                </div>
                <p className="text-sm text-purple-700">Start your own project</p>
              </button>
            </div>
          </div>

          {/* New Project Options */}
          {fundingMode === 'new' && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2" />
                Premium Project Setup
              </h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700 mb-2">
                    Project Name (Optional)
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g., Al-Rahman Mosque, Community Center..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="bg-white border-purple-300"
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="dedicateToOther"
                    checked={dedicatedToSomeoneElse}
                    onChange={(e) => setDedicatedToSomeoneElse(e.target.checked)}
                    className="rounded border-purple-300"
                  />
                  <label htmlFor="dedicateToOther" className="text-sm font-medium text-purple-700">
                    Dedicate this project to someone else (Reduces premium to +20%)
                  </label>
                </div>

                {dedicatedToSomeoneElse && (
                  <div>
                    <label className="block text-sm font-medium text-purple-700 mb-2">
                      Dedicated To
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter name of person this is dedicated to..."
                      value={dedicatedPersonName}
                      onChange={(e) => setDedicatedPersonName(e.target.value)}
                      className="bg-white border-purple-300"
                    />
                  </div>
                )}

                <div className="bg-white p-3 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-800">
                    <strong>Premium Cost:</strong> {dedicatedToSomeoneElse ? '+20%' : '+50%'} of base project cost
                    <br />
                    <strong>Special Rewards:</strong> {dedicatedToSomeoneElse ? '👑 Dedicated Founder Badge' : '⭐ Premium Founder Badge'} + 5x Jannah Points
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-4 mb-6">
            {/* Location Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="h-4 w-4 inline mr-1" />
                Select Location
              </label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {getFilteredLocations().map((location) => (
                    <SelectItem key={location.id} value={location.id} className="bg-white hover:bg-gray-50">
                      <div className="flex items-center justify-between w-full">
                        <span>
                          {location.name}, {location.country}
                          {location.id === 'general' && (
                            <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">Default</Badge>
                          )}
                        </span>
                        {getUrgencyBadge(location.urgency)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Target className="h-4 w-4 inline mr-1" />
                Project Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose size" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {getFilteredSizes().map((size) => (
                    <SelectItem key={size.id} value={size.id} className="bg-white hover:bg-gray-50">
                      <div>
                        <div className="font-medium">{size.name}</div>
                        <div className="text-xs text-gray-500">
                          {size.description}
                          {projectType === 'mosque' && size.capacity && (
                            <span> • {size.capacity} capacity</span>
                          )}
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Intention Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Heart className="h-4 w-4 inline mr-1" />
                Intention
              </label>
              <Select value={selectedIntention} onValueChange={setSelectedIntention}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Choose intention" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                  {intentionOptions.map((intention) => (
                    <SelectItem key={intention} value={intention} className="bg-white hover:bg-gray-50">
                      {intention}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Portion Count - Only show for portions mode */}
            {fundingMode === 'portions' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="h-4 w-4 inline mr-1" />
                  {config.portionName}s
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPortionCount(Math.max(1, portionCount - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    value={portionCount}
                    onChange={(e) => setPortionCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="text-center bg-white w-16 h-8"
                    min="1"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPortionCount(portionCount + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Custom Intention Input */}
          {selectedIntention === 'Other (specify)' && (
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Please specify your intention..."
                value={customIntention}
                onChange={(e) => setCustomIntention(e.target.value)}
                className="bg-white"
              />
            </div>
          )}

          {/* General Pool Information */}
          {selectedLocation === 'general' && fundingMode !== 'new' && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                General Mosque Pool Fund
              </h4>
              <p className="text-sm text-blue-700">
                Your donation goes into a shared fund available to Muslim communities in Western locations who wish to build mosques. 
                Fixed rate of £80 per prayer space regardless of mosque size. Earn {totalCost * 10} Jannah Points!
              </p>
            </div>
          )}

          {/* Existing Project Match */}
          {matchingProject && selectedLocationData && selectedSizeData && selectedLocation !== 'general' && fundingMode !== 'new' && (
            <div className="mb-6 p-4 bg-white rounded-lg border-2 border-green-200 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Existing Project: {selectedSizeData.name} in {selectedLocationData.name}
                </h4>
                <Badge className="bg-blue-100 text-blue-700">
                  {matchingProject.contributors} Contributors
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress: {matchingProject.currentPortions}/{matchingProject.totalPortions} {config.portionName}s</span>
                  <span className="font-medium">
                    {Math.round((matchingProject.currentPortions / matchingProject.totalPortions) * 100)}% Complete
                  </span>
                </div>
                <Progress 
                  value={(matchingProject.currentPortions / matchingProject.totalPortions) * 100} 
                  className="h-3"
                />
                {fundingMode === 'full' && (
                  <p className="text-sm font-medium text-yellow-700 bg-yellow-50 p-2 rounded">
                    🏆 Complete this project to earn the "Full Mosque Funder" badge and 2.5x Jannah Points!
                  </p>
                )}
                <p className="text-xs text-gray-600">
                  {fundingMode === 'portions' 
                    ? `Your contribution will help complete this ${config.type}! Only ${matchingProject.totalPortions - matchingProject.currentPortions} ${config.portionName.toLowerCase()}s remaining.`
                    : `Fund the remaining ${matchingProject.totalPortions - matchingProject.currentPortions} ${config.portionName.toLowerCase()}s to complete this project!`
                  }
                </p>
              </div>
            </div>
          )}

          {/* Show message when filtering but no existing projects */}
          {showOnlyExisting && !matchingProject && selectedLocation && selectedSize && selectedLocation !== 'general' && fundingMode !== 'new' && (
            <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                No existing projects found for this combination. Your donation would start a new project fund!
              </p>
            </div>
          )}

          {/* Donation Summary & Action */}
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200">
            <div>
              <div className="font-semibold text-lg text-gray-800">
                Total: £{totalCost.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                {fundingMode === 'portions' && `${portionCount} ${config.portionName}${portionCount > 1 ? 's' : ''} × £${prayerSpaceCost}`}
                {fundingMode === 'full' && matchingProject && `Complete ${matchingProject.totalPortions - matchingProject.currentPortions} remaining ${config.portionName.toLowerCase()}s`}
                {fundingMode === 'new' && selectedSizeData && `New ${selectedSizeData.name} (Premium ${dedicatedToSomeoneElse ? '+20%' : '+50%'})`}
                {finalIntention && ` • ${finalIntention}`}
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                +{totalCost * (fundingMode === 'full' ? 25 : fundingMode === 'new' ? 50 : 10)} Jannah Points
                {(fundingMode === 'full' || fundingMode === 'new') && (
                  <span className="ml-2 text-purple-600">
                    + Special Badge {fundingMode === 'full' ? '🏆' : fundingMode === 'new' ? (dedicatedToSomeoneElse ? '👑' : '⭐') : ''}
                  </span>
                )}
              </div>
            </div>
            <Button
              className={`${config.color.replace('text-', 'bg-').replace('-600', '-600')} hover:${config.color.replace('text-', 'bg-').replace('-600', '-700')} text-white px-8 py-2 text-lg font-semibold`}
              disabled={!selectedLocation || !selectedSize || !selectedIntention || (selectedIntention === 'Other (specify)' && !customIntention) || (fundingMode === 'new' && dedicatedToSomeoneElse && !dedicatedPersonName)}
              onClick={handleDonation}
            >
              {fundingMode === 'full' ? 'Finish Funding' : fundingMode === 'new' ? 'Start New Mosque' : 'Fund Now'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDonationWidget;

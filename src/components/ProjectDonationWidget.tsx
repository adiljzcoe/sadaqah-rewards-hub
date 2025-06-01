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
  const fundingMode = 'portions'; // Always use portions mode
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

  // Calculate costs based on funding mode
  const getProjectCost = () => {
    return portionCount * prayerSpaceCost;
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
    
    console.log('Processing donation:', {
      projectType,
      fundingMode,
      location: selectedLocationData?.name,
      size: selectedSizeData?.name,
      intention: finalIntention,
      portionCount: portionCount,
      prayerSpaceCost,
      totalCost,
      jannahPoints: totalCost * jannahMultiplier,
      badge
    });

    let successMessage = `Donation successful! £${totalCost} donated for ${portionCount} ${config.portionName.toLowerCase()}${portionCount > 1 ? 's' : ''}. You earned ${totalCost * jannahMultiplier} Jannah Points!`;

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

            {/* Portion Count */}
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
          {selectedLocation === 'general' && (
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
          {matchingProject && selectedLocationData && selectedSizeData && selectedLocation !== 'general' && (
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
                <p className="text-xs text-gray-600">
                  Your contribution will help complete this {config.type}! Only {matchingProject.totalPortions - matchingProject.currentPortions} {config.portionName.toLowerCase()}s remaining.
                </p>
              </div>
            </div>
          )}

          {/* Show message when filtering but no existing projects */}
          {showOnlyExisting && !matchingProject && selectedLocation && selectedSize && selectedLocation !== 'general' && (
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
                {`${portionCount} ${config.portionName}${portionCount > 1 ? 's' : ''} × £${prayerSpaceCost}`}
                {finalIntention && ` • ${finalIntention}`}
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                +{totalCost * 10} Jannah Points
              </div>
            </div>
            <Button
              className={`${config.color.replace('text-', 'bg-').replace('-600', '-600')} hover:${config.color.replace('text-', 'bg-').replace('-600', '-700')} text-white px-8 py-2 text-lg font-semibold`}
              disabled={!selectedLocation || !selectedSize || !selectedIntention || (selectedIntention === 'Other (specify)' && !customIntention)}
              onClick={handleDonation}
            >
              Fund Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDonationWidget;

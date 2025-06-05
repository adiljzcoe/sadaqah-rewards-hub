
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, MapPin, Users, Calendar, Baby, BookOpen, Home, Utensils, Coins, Crown, Zap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface SponsorshipSlot {
  id: string;
  childName: string;
  age: number;
  monthlyAmount: number;
  isSponsored: boolean;
  sponsoredBy?: string;
  sponsorshipDate?: string;
  category: 'basic_needs' | 'education' | 'healthcare' | 'clothing' | 'recreation';
  description: string;
}

interface OrphanageProject {
  id: number;
  name: string;
  location: string;
  description: string;
  childrenServed: number;
  totalSlots: number;
  sponsoredSlots: number;
  targetAmount: number;
  raisedAmount: number;
  monthlySupport: number;
  urgency: string;
  image: string;
  needs: string[];
  sponsorshipSlots: SponsorshipSlot[];
}

const Orphanages = () => {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<OrphanageProject | null>(null);
  const [userSponsorships, setUserSponsorships] = useState<string[]>([]);
  const [showSponsorshipAnimation, setShowSponsorshipAnimation] = useState(false);

  // Generate sponsorship slots for each project
  const generateSponsorshipSlots = (projectId: number, childrenServed: number): SponsorshipSlot[] => {
    const categories: SponsorshipSlot['category'][] = ['basic_needs', 'education', 'healthcare', 'clothing', 'recreation'];
    const slots: SponsorshipSlot[] = [];
    const slotsPerChild = 5; // Each child has 5 different sponsorship needs

    const childNames = [
      'Ahmed', 'Fatima', 'Omar', 'Aisha', 'Hassan', 'Zainab', 'Ali', 'Khadija', 
      'Ibrahim', 'Maryam', 'Yusuf', 'Safiya', 'Khalil', 'Amina', 'Tariq', 'Layla'
    ];

    for (let childIndex = 0; childIndex < childrenServed; childIndex++) {
      const childName = childNames[childIndex % childNames.length];
      const age = 5 + Math.floor(Math.random() * 13); // Ages 5-17

      categories.forEach((category, categoryIndex) => {
        const slotId = `${projectId}-${childIndex}-${category}`;
        const baseAmount = category === 'basic_needs' ? 25 :
                          category === 'education' ? 20 :
                          category === 'healthcare' ? 30 :
                          category === 'clothing' ? 15 :
                          10; // recreation

        slots.push({
          id: slotId,
          childName: `${childName} ${String.fromCharCode(65 + childIndex)}`, // Add letter to make unique
          age,
          monthlyAmount: baseAmount + Math.floor(Math.random() * 10),
          isSponsored: Math.random() > 0.6, // 40% already sponsored
          sponsoredBy: Math.random() > 0.5 ? 'Anonymous Sponsor' : 'Verified Sponsor',
          sponsorshipDate: Math.random() > 0.5 ? '2 weeks ago' : '1 month ago',
          category,
          description: category === 'basic_needs' ? 'Food, shelter, and daily essentials' :
                      category === 'education' ? 'School fees, books, and educational materials' :
                      category === 'healthcare' ? 'Medical care, check-ups, and medications' :
                      category === 'clothing' ? 'Clothing, shoes, and seasonal wear' :
                      'Sports, activities, and recreational programs'
        });
      });
    }

    return slots;
  };

  const [orphanageProjects, setOrphanageProjects] = useState<OrphanageProject[]>([
    {
      id: 1,
      name: "Gaza Children's Home",
      location: "Gaza, Palestine",
      description: "Emergency support for orphaned children affected by conflict, providing shelter, food, education, and psychological care.",
      childrenServed: 150,
      totalSlots: 750, // 5 slots per child
      sponsoredSlots: 390,
      targetAmount: 120000,
      raisedAmount: 78000,
      monthlySupport: 800,
      urgency: "critical",
      image: "/placeholder.svg",
      needs: ["Emergency Shelter", "Food & Nutrition", "Education", "Medical Care", "Psychological Support"],
      sponsorshipSlots: []
    },
    {
      id: 2,
      name: "Syria Hope Orphanage",
      location: "Aleppo, Syria",
      description: "Comprehensive care for refugee orphans including education, healthcare, and vocational training programs.",
      childrenServed: 120,
      totalSlots: 600, // 5 slots per child
      sponsoredSlots: 280,
      targetAmount: 85000,
      raisedAmount: 56000,
      monthlySupport: 650,
      urgency: "high",
      image: "/placeholder.svg",
      needs: ["Education", "Healthcare", "Vocational Training", "Food Security", "Safe Housing"],
      sponsorshipSlots: []
    }
  ]);

  // Initialize sponsorship slots for projects
  useEffect(() => {
    setOrphanageProjects(prev => prev.map(project => {
      const sponsorshipSlots = generateSponsorshipSlots(project.id, project.childrenServed);
      const sponsoredSlots = sponsorshipSlots.filter(slot => slot.isSponsored).length;
      const raisedAmount = sponsorshipSlots.filter(slot => slot.isSponsored).reduce((sum, slot) => sum + slot.monthlyAmount, 0) * 12; // Annual amount

      return {
        ...project,
        sponsorshipSlots,
        sponsoredSlots,
        raisedAmount
      };
    }));
  }, []);

  const handleSponsorshipPurchase = (projectId: number, slotId: string) => {
    setOrphanageProjects(prev => prev.map(project => {
      if (project.id === projectId) {
        const updatedSlots = project.sponsorshipSlots.map(slot => 
          slot.id === slotId 
            ? { ...slot, isSponsored: true, sponsoredBy: user?.email || 'You', sponsorshipDate: 'Just now' }
            : slot
        );

        const newSponsoredCount = updatedSlots.filter(s => s.isSponsored).length;
        const newRaisedAmount = updatedSlots.filter(s => s.isSponsored).reduce((sum, s) => sum + s.monthlyAmount, 0) * 12;
        
        return {
          ...project,
          sponsorshipSlots: updatedSlots,
          sponsoredSlots: newSponsoredCount,
          raisedAmount: newRaisedAmount
        };
      }
      return project;
    }));

    setUserSponsorships(prev => [...prev, slotId]);
    setShowSponsorshipAnimation(true);
    setTimeout(() => setShowSponsorshipAnimation(false), 3000);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryColor = (category: SponsorshipSlot['category']) => {
    const colors = {
      basic_needs: 'bg-red-500',
      education: 'bg-blue-500',
      healthcare: 'bg-green-500',
      clothing: 'bg-purple-500',
      recreation: 'bg-orange-500'
    };
    return colors[category];
  };

  const getCategoryIcon = (category: SponsorshipSlot['category']) => {
    switch (category) {
      case 'basic_needs': return '🏠';
      case 'education': return '📚';
      case 'healthcare': return '🏥';
      case 'clothing': return '👕';
      case 'recreation': return '⚽';
      default: return '❤️';
    }
  };

  const getCategoryName = (category: SponsorshipSlot['category']) => {
    return category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-pink-50/30 to-orange-50/20">
      <Header />

      {/* Sponsorship Success Animation */}
      {showSponsorshipAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-8 rounded-3xl shadow-2xl animate-bounce border-4 border-white/50 backdrop-blur-sm">
            <div className="text-center">
              <div className="text-4xl mb-2">👶✨</div>
              <div className="text-2xl font-bold mb-2">Jazakallahu Khairan!</div>
              <div className="text-lg">Sponsorship activated!</div>
              <div className="text-sm opacity-90 mt-2">You're changing a child's life</div>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-3 rounded-full">
              <Baby className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
              Support Orphanages - Sponsor a Child
            </h1>
          </div>
          
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
            Provide hope, care, and a brighter future for orphaned children through individual sponsorships. 
            Choose specific needs to sponsor and directly impact a child's life.
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Home className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium">Monthly Sponsorships</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Specific Needs</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Direct Impact</span>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardContent className="p-6 text-center">
              <Baby className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm opacity-90">Children Supported</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6 text-center">
              <Home className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">47</div>
              <div className="text-sm opacity-90">Orphanages</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">14.2K</div>
              <div className="text-sm opacity-90">Active Sponsorships</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">£3.2M</div>
              <div className="text-sm opacity-90">Annual Support</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Projects */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Urgent Orphanage Support</h2>
          
          {orphanageProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover-lift">
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
                      {project.sponsoredSlots}/{project.totalSlots} Sponsored
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
                      <div className="text-sm text-gray-500">Children Served</div>
                      <div className="text-lg font-bold">{project.childrenServed}</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-6">{project.description}</p>

                  {/* Needs */}
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Current Needs:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.needs.map((need, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {need}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-pink-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-pink-600">{project.childrenServed}</div>
                      <div className="text-sm text-pink-800">Children</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">{project.sponsoredSlots}</div>
                      <div className="text-sm text-blue-800">Sponsorships</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">{project.totalSlots - project.sponsoredSlots}</div>
                      <div className="text-sm text-orange-800">Needed</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Sponsorship Progress</span>
                      <span className="text-sm font-semibold">
                        {project.sponsoredSlots}/{project.totalSlots} sponsorships
                      </span>
                    </div>
                    <Progress 
                      value={(project.sponsoredSlots / project.totalSlots) * 100} 
                      className="h-3"
                    />
                    <div className="text-xs text-gray-600">
                      £{(project.raisedAmount / 12).toLocaleString()} monthly support provided
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="flex-1 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white"
                          onClick={() => setSelectedProject(project)}
                        >
                          <Heart className="h-4 w-4 mr-2" />
                          Sponsor Now
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Baby className="h-5 w-5" />
                            {project.name} - Sponsorship Opportunities
                          </DialogTitle>
                        </DialogHeader>
                        
                        {selectedProject && (
                          <div className="space-y-6">
                            {/* Project Overview */}
                            <div className="bg-gradient-to-r from-pink-50 to-orange-50 p-6 rounded-lg">
                              <div className="grid md:grid-cols-4 gap-4 text-center">
                                <div>
                                  <div className="text-2xl font-bold text-pink-600">{selectedProject.childrenServed}</div>
                                  <div className="text-sm text-gray-600">Children Served</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-blue-600">{selectedProject.sponsoredSlots}</div>
                                  <div className="text-sm text-gray-600">Active Sponsorships</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-orange-600">{selectedProject.totalSlots - selectedProject.sponsoredSlots}</div>
                                  <div className="text-sm text-gray-600">Needed Sponsorships</div>
                                </div>
                                <div>
                                  <div className="text-2xl font-bold text-purple-600">£{Math.floor(selectedProject.raisedAmount / selectedProject.sponsoredSlots / 12)}</div>
                                  <div className="text-sm text-gray-600">Avg Monthly</div>
                                </div>
                              </div>
                            </div>

                            {/* Sponsorship Categories */}
                            {['basic_needs', 'education', 'healthcare', 'clothing', 'recreation'].map(category => {
                              const categorySlots = selectedProject.sponsorshipSlots.filter(s => s.category === category && !s.isSponsored);
                              if (categorySlots.length === 0) return null;

                              return (
                                <div key={category} className="space-y-4">
                                  <h4 className="text-lg font-bold flex items-center gap-2">
                                    <span className="text-2xl">{getCategoryIcon(category as SponsorshipSlot['category'])}</span>
                                    {getCategoryName(category as SponsorshipSlot['category'])} Sponsorships
                                    <Badge className={`${getCategoryColor(category as SponsorshipSlot['category'])} text-white`}>
                                      {categorySlots.length} available
                                    </Badge>
                                  </h4>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {categorySlots.slice(0, 6).map((slot) => (
                                      <Card 
                                        key={slot.id} 
                                        className={`cursor-pointer transition-all duration-300 ${
                                          userSponsorships.includes(slot.id)
                                            ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300 shadow-lg'
                                            : 'hover:shadow-lg hover:scale-105 border-2 border-transparent hover:border-pink-300'
                                        }`}
                                        onClick={() => handleSponsorshipPurchase(selectedProject.id, slot.id)}
                                      >
                                        <CardContent className="p-4">
                                          <div className="text-center">
                                            <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${getCategoryColor(slot.category)} flex items-center justify-center text-white text-lg`}>
                                              {getCategoryIcon(slot.category)}
                                            </div>
                                            <h5 className="font-bold mb-1">{slot.childName}</h5>
                                            <div className="text-sm text-gray-600 mb-2">Age {slot.age}</div>
                                            <div className="text-lg font-bold text-pink-600 mb-2">£{slot.monthlyAmount}/month</div>
                                            <div className="text-xs text-gray-600 mb-3">{slot.description}</div>
                                            {userSponsorships.includes(slot.id) ? (
                                              <div className="text-xs text-green-600 font-medium">
                                                ✓ Sponsored by You!
                                              </div>
                                            ) : (
                                              <div className="text-xs text-pink-600">
                                                Click to Sponsor
                                              </div>
                                            )}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                  </div>
                                  
                                  {categorySlots.length > 6 && (
                                    <div className="text-center text-gray-600">
                                      ...and {categorySlots.length - 6} more {getCategoryName(category as SponsorshipSlot['category']).toLowerCase()} sponsorships available
                                    </div>
                                  )}
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

        {/* Impact Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-pink-600 via-orange-600 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">
                "Whoever cares for an orphan and I will be together in Paradise like this."
              </h3>
              <p className="text-lg opacity-90">- Prophet Muhammad (ﷺ)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orphanages;

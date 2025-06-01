
import React from 'react';
import Header from '@/components/Header';
import ProjectDonationWidget from '@/components/ProjectDonationWidget';
import { Building2, MapPin, Users, Calendar, CheckCircle, Clock, Target, Star, Award, ShoppingCart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

const BuildMosque = () => {
  // Mock user track record data - would come from API/localStorage
  const userTrackRecord = {
    prayerSpacesFunded: 0, // Change this to test different states
    mosquesCompleted: 0,
    totalContributed: 0,
    activeContributions: 0
  };

  // Mock data for mosque projects with prayer space details
  const mosqueProjects = [
    {
      id: 1,
      name: 'Al-Noor Mosque',
      location: 'Gaza, Palestine',
      status: 'completed',
      capacity: 500,
      completedDate: '2024-03-15',
      totalCost: 75000,
      contributors: 245,
      progress: 100,
      size: 'medium',
      totalPrayerSpaces: 75,
      fundedPrayerSpaces: 75,
      prayerSpaceCost: 100
    },
    {
      id: 2,
      name: 'Masjid Al-Rahman',
      location: 'Aleppo, Syria',
      status: 'under-construction',
      capacity: 800,
      startDate: '2024-01-10',
      expectedCompletion: '2024-07-30',
      totalCost: 120000,
      raisedAmount: 95000,
      contributors: 387,
      progress: 79,
      size: 'large',
      totalPrayerSpaces: 100,
      fundedPrayerSpaces: 79,
      prayerSpaceCost: 120
    },
    {
      id: 3,
      name: 'Community Mosque',
      location: 'Karachi, Pakistan',
      status: 'funded',
      capacity: 300,
      fundedDate: '2024-05-20',
      totalCost: 45000,
      contributors: 156,
      progress: 100,
      size: 'small',
      totalPrayerSpaces: 50,
      fundedPrayerSpaces: 50,
      prayerSpaceCost: 90
    },
    {
      id: 4,
      name: 'Baitul Hidayah',
      location: 'Dhaka, Bangladesh',
      status: 'under-construction',
      capacity: 600,
      startDate: '2024-02-01',
      expectedCompletion: '2024-08-15',
      totalCost: 85000,
      raisedAmount: 72000,
      contributors: 298,
      progress: 85,
      size: 'medium',
      totalPrayerSpaces: 75,
      fundedPrayerSpaces: 64,
      prayerSpaceCost: 110
    },
    {
      id: 5,
      name: 'Masjid As-Salam',
      location: 'Mogadishu, Somalia',
      status: 'completed',
      capacity: 400,
      completedDate: '2024-04-12',
      totalCost: 55000,
      contributors: 189,
      progress: 100,
      size: 'medium',
      totalPrayerSpaces: 60,
      fundedPrayerSpaces: 60,
      prayerSpaceCost: 92
    },
    {
      id: 6,
      name: 'Al-Furqan Mosque',
      location: 'Sana\'a, Yemen',
      status: 'funded',
      capacity: 700,
      fundedDate: '2024-05-28',
      totalCost: 95000,
      contributors: 234,
      progress: 100,
      size: 'large',
      totalPrayerSpaces: 80,
      fundedPrayerSpaces: 80,
      prayerSpaceCost: 119
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      case 'under-construction':
        return <Badge className="bg-blue-100 text-blue-700"><Clock className="h-3 w-3 mr-1" />Under Construction</Badge>;
      case 'funded':
        return <Badge className="bg-emerald-100 text-emerald-700"><Target className="h-3 w-3 mr-1" />Funded</Badge>;
      default:
        return null;
    }
  };

  const handleBuyPrayerSpace = (project: any) => {
    console.log(`Buying prayer space for ${project.name} - £${project.prayerSpaceCost}`);
    // This would integrate with the donation widget/payment system
  };

  const completedCount = mosqueProjects.filter(p => p.status === 'completed').length;
  const underConstructionCount = mosqueProjects.filter(p => p.status === 'under-construction').length;
  const fundedCount = mosqueProjects.filter(p => p.status === 'funded').length;
  const totalContributors = mosqueProjects.reduce((sum, p) => sum + p.contributors, 0);
  const totalPrayerSpacesNeeded = mosqueProjects
    .filter(p => p.status === 'under-construction')
    .reduce((sum, p) => sum + (p.totalPrayerSpaces - p.fundedPrayerSpaces), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <Header />
      <ProjectDonationWidget projectType="mosque" />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="text-left">
            <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Build a Mosque
            </h2>
            <p className="mt-6 text-xl">
              Empower communities by providing a sacred space for prayer and reflection.
            </p>
            {totalPrayerSpacesNeeded > 0 && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-lg font-semibold">
                  🙏 {totalPrayerSpacesNeeded} Prayer Spaces Needed Urgently
                </p>
                <p className="text-sm opacity-90">
                  Help complete our mosques under construction
                </p>
              </div>
            )}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#track-record"
                className="bg-white text-emerald-700 hover:bg-emerald-50 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                Your Progress
              </a>
              <a
                href="#impact"
                className="bg-teal-500 text-white hover:bg-teal-700 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                See the Impact
              </a>
              <a
                href="#projects"
                className="bg-teal-500 text-white hover:bg-teal-700 font-semibold py-3 px-6 rounded-full transition-colors duration-300"
              >
                View Projects
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <Building2 className="h-48 w-auto text-emerald-200 opacity-50" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Your Track Record Section */}
        <section id="track-record" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Award className="h-8 w-8 text-emerald-600" />
            Your Mosque Building Track Record
          </h3>
          
          {userTrackRecord.prayerSpacesFunded === 0 && userTrackRecord.mosquesCompleted === 0 ? (
            <Card className="p-8 bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-emerald-200">
              <div className="text-center">
                <div className="text-6xl mb-4">🕌</div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">Start Your Mosque Building Journey</h4>
                <p className="text-lg text-gray-600 mb-6">
                  You haven't funded any prayer spaces yet. Every mosque starts with a single prayer space contribution!
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Target className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Set Your Goal</h5>
                    <p className="text-sm text-gray-600">Start with funding just 1 prayer space for £100</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Join Others</h5>
                    <p className="text-sm text-gray-600">Pool with other donors to complete mosques faster</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Building2 className="h-8 w-8 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-800 mb-2">Build Legacy</h5>
                    <p className="text-sm text-gray-600">Watch your mosque get built and serve the community</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg border border-emerald-200">
                  <h5 className="font-semibold text-gray-800 mb-3">💡 Did you know?</h5>
                  <p className="text-gray-600">
                    The Prophet Muhammad ﷺ said: "Whoever builds a mosque for Allah, Allah will build for him a house in Paradise." 
                    Start your journey today and earn this incredible reward!
                  </p>
                </div>
              </div>
            </Card>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-600 text-sm font-medium">Prayer Spaces Funded</p>
                    <p className="text-3xl font-bold text-emerald-800">{userTrackRecord.prayerSpacesFunded}</p>
                  </div>
                  <Target className="h-8 w-8 text-emerald-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-600 text-sm font-medium">Mosques Completed</p>
                    <p className="text-3xl font-bold text-green-800">{userTrackRecord.mosquesCompleted}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-600 text-sm font-medium">Total Contributed</p>
                    <p className="text-3xl font-bold text-blue-800">£{userTrackRecord.totalContributed}</p>
                  </div>
                  <Star className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-600 text-sm font-medium">Active Projects</p>
                    <p className="text-3xl font-bold text-purple-800">{userTrackRecord.activeContributions}</p>
                  </div>
                  <Clock className="h-8 w-8 text-purple-600" />
                </div>
              </Card>
            </div>
          )}
        </section>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Completed Mosques</p>
                <p className="text-3xl font-bold text-green-800">{completedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Under Construction</p>
                <p className="text-3xl font-bold text-blue-800">{underConstructionCount}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-600 text-sm font-medium">Fully Funded</p>
                <p className="text-3xl font-bold text-emerald-800">{fundedCount}</p>
              </div>
              <Target className="h-8 w-8 text-emerald-600" />
            </div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Contributors</p>
                <p className="text-3xl font-bold text-purple-800">{totalContributors}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Mosque Projects Table */}
        <section id="projects" className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-800">
              Our Mosque Projects
            </h3>
            <div className="text-sm text-gray-600">
              Showing impact across {mosqueProjects.length} projects
            </div>
          </div>
          
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Mosque Name</TableHead>
                  <TableHead className="font-semibold">Location</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Prayer Spaces</TableHead>
                  <TableHead className="font-semibold">Progress</TableHead>
                  <TableHead className="font-semibold">Contributors</TableHead>
                  <TableHead className="font-semibold">Timeline</TableHead>
                  <TableHead className="font-semibold">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mosqueProjects.map((project) => (
                  <TableRow key={project.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{project.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        {project.location}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(project.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{project.fundedPrayerSpaces}/{project.totalPrayerSpaces} Spaces</span>
                          <span className="text-xs text-gray-500">£{project.prayerSpaceCost} each</span>
                        </div>
                        <Progress 
                          value={(project.fundedPrayerSpaces / project.totalPrayerSpaces) * 100} 
                          className="h-2"
                        />
                        {project.status === 'under-construction' && (
                          <p className="text-xs text-orange-600 font-medium">
                            {project.totalPrayerSpaces - project.fundedPrayerSpaces} spaces needed
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{project.progress}%</span>
                          {project.status === 'under-construction' && project.raisedAmount && (
                            <span>£{project.raisedAmount?.toLocaleString()} / £{project.totalCost.toLocaleString()}</span>
                          )}
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{project.contributors}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        {project.status === 'completed' && project.completedDate && (
                          <span>Completed {new Date(project.completedDate).toLocaleDateString()}</span>
                        )}
                        {project.status === 'funded' && project.fundedDate && (
                          <span>Funded {new Date(project.fundedDate).toLocaleDateString()}</span>
                        )}
                        {project.status === 'under-construction' && project.expectedCompletion && (
                          <span>Est. {new Date(project.expectedCompletion).toLocaleDateString()}</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {project.status === 'under-construction' && project.fundedPrayerSpaces < project.totalPrayerSpaces ? (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          onClick={() => handleBuyPrayerSpace(project)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          £{project.prayerSpaceCost} for 1 space
                        </Button>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {project.status === 'completed' ? 'Complete' : 'Fully Funded'}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>

        {/* Impact Section */}
        <section id="impact" className="mb-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            The Impact of Building a Mosque
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                Building a mosque provides a community with a central place for worship,
                education, and social gatherings. It fosters unity, strengthens faith, and
                serves as a beacon of hope.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Provides a space for daily prayers and religious education</li>
                <li>Strengthens community bonds and promotes social cohesion</li>
                <li>Offers refuge and support for those in need</li>
                <li>Serves as a symbol of Islamic identity and culture</li>
                <li>Creates lasting impact for generations to come</li>
              </ul>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x400/22c55e/fff?text=Mosque+Impact"
                alt="Mosque Impact"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* How to Contribute Section */}
        <section id="contribute">
          <h3 className="text-3xl font-bold text-gray-800 mb-8">
            How to Contribute
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg text-gray-700 mb-4">
                You can contribute to building a mosque by funding prayer spaces through
                our innovative pooled funding system. Your donation will help provide
                essential resources and support for the construction process.
              </p>
              <ul className="list-disc pl-5 text-gray-600 space-y-2">
                <li>Choose a project location that resonates with you</li>
                <li>Select the mosque size and number of prayer spaces</li>
                <li>Set your intention for maximum spiritual reward</li>
                <li>Join existing project pools or start new ones</li>
                <li>Receive updates on your project's progress</li>
                <li>See your impact through our transparent tracking</li>
              </ul>
            </div>
            <div>
              <img
                src="https://via.placeholder.com/600x400/22c55e/fff?text=Contribute+Now"
                alt="Contribute Now"
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BuildMosque;

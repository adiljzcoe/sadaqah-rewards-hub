
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Globe, 
  Users, 
  DollarSign, 
  Target, 
  BarChart3,
  MapPin,
  Zap,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, PieChart, Pie, Cell } from 'recharts';

// Mock data for growth opportunities
const countryOpportunities = [
  {
    country: 'Nigeria',
    region: 'Africa',
    population: 218000000,
    internetPenetration: 55,
    mobilePenetration: 87,
    gdpPerCapita: 2100,
    currentDonors: 12500,
    marketPenetration: 0.01,
    potentialDonors: 2800000,
    opportunityScore: 95,
    growthPotential: 'Very High',
    avgDonationSize: 15,
    religiousAffiliation: 52, // % Muslim
    challenges: ['Payment Infrastructure', 'Trust Building'],
    opportunities: ['Large Muslim Population', 'Growing Middle Class', 'High Mobile Usage'],
    recommendedActions: ['Partner with Local Payment Providers', 'Establish Local Office', 'Mobile-First Strategy']
  },
  {
    country: 'Indonesia',
    region: 'Asia',
    population: 275000000,
    internetPenetration: 68,
    mobilePenetration: 89,
    gdpPerCapita: 4300,
    currentDonors: 45000,
    marketPenetration: 0.02,
    potentialDonors: 8500000,
    opportunityScore: 92,
    growthPotential: 'Very High',
    avgDonationSize: 25,
    religiousAffiliation: 87,
    challenges: ['Regulatory Compliance', 'Local Competition'],
    opportunities: ['World\'s Largest Muslim Population', 'Tech-Savvy Youth', 'Government Support for Fintech'],
    recommendedActions: ['Regulatory Partnership', 'Local Influencer Campaigns', 'Zakat Integration']
  },
  {
    country: 'Bangladesh',
    region: 'Asia',
    population: 167000000,
    internetPenetration: 28,
    mobilePenetration: 95,
    gdpPerCapita: 2500,
    currentDonors: 8200,
    marketPenetration: 0.005,
    potentialDonors: 3200000,
    opportunityScore: 88,
    growthPotential: 'High',
    avgDonationSize: 12,
    religiousAffiliation: 91,
    challenges: ['Low Internet Penetration', 'Payment Methods'],
    opportunities: ['High Mobile Penetration', 'Strong Charity Culture', 'Growing Economy'],
    recommendedActions: ['SMS-Based Donations', 'Mobile Money Integration', 'Community Partnerships']
  },
  {
    country: 'Turkey',
    region: 'Europe/Asia',
    population: 85000000,
    internetPenetration: 78,
    mobilePenetration: 98,
    gdpPerCapita: 9100,
    currentDonors: 85000,
    marketPenetration: 0.1,
    potentialDonors: 2500000,
    opportunityScore: 85,
    growthPotential: 'High',
    avgDonationSize: 45,
    religiousAffiliation: 99,
    challenges: ['Economic Volatility', 'Regulatory Changes'],
    opportunities: ['High Digital Adoption', 'Strong Charity Tradition', 'Strategic Location'],
    recommendedActions: ['Local Currency Support', 'Partnership with Banks', 'Social Media Marketing']
  },
  {
    country: 'Malaysia',
    region: 'Asia',
    population: 33000000,
    internetPenetration: 90,
    mobilePenetration: 98,
    gdpPerCapita: 11200,
    currentDonors: 125000,
    marketPenetration: 0.4,
    potentialDonors: 800000,
    opportunityScore: 82,
    growthPotential: 'Medium',
    avgDonationSize: 75,
    religiousAffiliation: 63,
    challenges: ['Market Saturation', 'Competition'],
    opportunities: ['High Income', 'Tech Infrastructure', 'Government Support'],
    recommendedActions: ['Premium Services', 'Corporate Partnerships', 'Innovation Focus']
  },
  {
    country: 'Egypt',
    region: 'Africa',
    population: 106000000,
    internetPenetration: 57,
    mobilePenetration: 95,
    gdpPerCapita: 3500,
    currentDonors: 28000,
    marketPenetration: 0.03,
    potentialDonors: 4200000,
    opportunityScore: 80,
    growthPotential: 'High',
    avgDonationSize: 20,
    religiousAffiliation: 90,
    challenges: ['Economic Challenges', 'Currency Stability'],
    opportunities: ['Large Population', 'Cultural Fit', 'Government Digitization'],
    recommendedActions: ['Microdonation Focus', 'Educational Campaigns', 'Local Partnerships']
  }
];

const regionData = [
  { region: 'Asia', countries: 3, totalOpportunity: 265, avgScore: 86 },
  { region: 'Africa', countries: 2, totalOpportunity: 175, avgScore: 87 },
  { region: 'Europe/Asia', countries: 1, totalOpportunity: 85, avgScore: 85 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const GrowthOpportunities = () => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('opportunityScore');
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = selectedRegion === 'all' 
    ? countryOpportunities 
    : countryOpportunities.filter(c => c.region === selectedRegion);

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPotentialColor = (potential) => {
    switch (potential) {
      case 'Very High': return 'bg-green-500';
      case 'High': return 'bg-yellow-500';
      case 'Medium': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Growth Opportunities
          </h2>
          <p className="text-gray-600">Identify markets with high potential for expansion</p>
        </div>
        
        <div className="flex gap-2">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              <SelectItem value="Asia">Asia</SelectItem>
              <SelectItem value="Africa">Africa</SelectItem>
              <SelectItem value="Europe/Asia">Europe/Asia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
          <TabsTrigger value="market-sizing">Market Sizing</TabsTrigger>
          <TabsTrigger value="action-plan">Action Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Opportunity</p>
                    <p className="text-2xl font-bold">11.8M</p>
                    <p className="text-xs text-gray-500">Potential donors</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Market Value</p>
                    <p className="text-2xl font-bold">£285M</p>
                    <p className="text-xs text-gray-500">Annual potential</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">High Priority</p>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-gray-500">Countries (90+ score)</p>
                  </div>
                  <Target className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Growth Rate</p>
                    <p className="text-2xl font-bold">45%</p>
                    <p className="text-xs text-gray-500">Projected annually</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Opportunity Score Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Scores by Country</CardTitle>
              <CardDescription>Higher scores indicate better growth potential</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredCountries}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="country" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="opportunityScore" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Regional Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      dataKey="totalOpportunity"
                      nameKey="region"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Penetration vs Potential</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart data={filteredCountries}>
                    <CartesianGrid />
                    <XAxis dataKey="marketPenetration" name="Current Penetration %" />
                    <YAxis dataKey="potentialDonors" name="Potential Donors" />
                    <Tooltip />
                    <Scatter dataKey="opportunityScore" fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-4">
          <div className="grid gap-4">
            {filteredCountries.map((country) => (
              <Card key={country.country} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-600" />
                      <div>
                        <CardTitle className="text-lg">{country.country}</CardTitle>
                        <CardDescription>{country.region} • {(country.population / 1000000).toFixed(0)}M population</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getScoreColor(country.opportunityScore)}>
                        Score: {country.opportunityScore}
                      </Badge>
                      <Badge className={`text-white ${getPotentialColor(country.growthPotential)}`}>
                        {country.growthPotential}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Current Donors</p>
                      <p className="font-semibold">{country.currentDonors.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Potential Donors</p>
                      <p className="font-semibold text-green-600">{(country.potentialDonors / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Donation</p>
                      <p className="font-semibold">£{country.avgDonationSize}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Market Penetration</p>
                      <p className="font-semibold">{(country.marketPenetration * 100).toFixed(2)}%</p>
                    </div>
                  </div>

                  {/* Progress Indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Internet Penetration</span>
                        <span>{country.internetPenetration}%</span>
                      </div>
                      <Progress value={country.internetPenetration} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mobile Penetration</span>
                        <span>{country.mobilePenetration}%</span>
                      </div>
                      <Progress value={country.mobilePenetration} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Religious Affiliation</span>
                        <span>{country.religiousAffiliation}%</span>
                      </div>
                      <Progress value={country.religiousAffiliation} className="h-2" />
                    </div>
                  </div>

                  {/* Opportunities and Challenges */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" />
                        Opportunities
                      </h4>
                      <ul className="text-sm space-y-1">
                        {country.opportunities.map((opp, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Zap className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            {opp}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                        <AlertTriangle className="h-4 w-4" />
                        Challenges
                      </h4>
                      <ul className="text-sm space-y-1">
                        {country.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="market-sizing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Sizing Analysis</CardTitle>
              <CardDescription>Total addressable market and revenue potential</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {filteredCountries.map((country) => {
                  const totalPotentialRevenue = country.potentialDonors * country.avgDonationSize * 12; // Annual
                  const currentRevenue = country.currentDonors * country.avgDonationSize * 12;
                  const untappedRevenue = totalPotentialRevenue - currentRevenue;
                  
                  return (
                    <div key={country.country} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-lg">{country.country}</h3>
                        <Badge variant="outline">TAM: £{(totalPotentialRevenue / 1000000).toFixed(0)}M</Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-blue-50 p-3 rounded">
                          <p className="text-blue-700 font-medium">Current Revenue</p>
                          <p className="text-xl font-bold text-blue-800">£{(currentRevenue / 1000000).toFixed(1)}M</p>
                          <p className="text-blue-600">Annual</p>
                        </div>
                        
                        <div className="bg-green-50 p-3 rounded">
                          <p className="text-green-700 font-medium">Untapped Market</p>
                          <p className="text-xl font-bold text-green-800">£{(untappedRevenue / 1000000).toFixed(0)}M</p>
                          <p className="text-green-600">Opportunity</p>
                        </div>
                        
                        <div className="bg-purple-50 p-3 rounded">
                          <p className="text-purple-700 font-medium">Growth Multiple</p>
                          <p className="text-xl font-bold text-purple-800">{(totalPotentialRevenue / currentRevenue).toFixed(0)}x</p>
                          <p className="text-purple-600">Potential</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="action-plan" className="space-y-4">
          <div className="grid gap-4">
            {filteredCountries.map((country) => (
              <Card key={country.country}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    {country.country} Action Plan
                  </CardTitle>
                  <CardDescription>Recommended strategies for market entry and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <Badge className={getScoreColor(country.opportunityScore)}>
                          Priority: {country.opportunityScore >= 90 ? 'High' : country.opportunityScore >= 80 ? 'Medium' : 'Low'}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Investment Required: </span>
                        <span className="font-medium">
                          £{country.opportunityScore >= 90 ? '500K' : country.opportunityScore >= 80 ? '250K' : '100K'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Timeline: </span>
                        <span className="font-medium">
                          {country.opportunityScore >= 90 ? '6-12 months' : country.opportunityScore >= 80 ? '12-18 months' : '18-24 months'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Recommended Actions</h4>
                      <div className="space-y-2">
                        {country.recommendedActions.map((action, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-gray-50 rounded">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <BarChart3 className="h-4 w-4 mr-1" />
                        Detailed Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Users className="h-4 w-4 mr-1" />
                        Market Research
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrowthOpportunities;

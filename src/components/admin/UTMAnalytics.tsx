
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, MousePointer, Users, DollarSign, ExternalLink, Filter, Download, Eye } from 'lucide-react';

const UTMAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedSource, setSelectedSource] = useState('all');

  const utmSummary = {
    totalClicks: 156420,
    totalConversions: 5847,
    conversionRate: 3.74,
    totalRevenue: 485000,
    costPerClick: 0.35,
    returnOnAdSpend: 4.2
  };

  const campaignPerformance = [
    { date: '2024-01-01', clicks: 2850, conversions: 98, revenue: 8400 },
    { date: '2024-01-02', clicks: 3100, conversions: 125, revenue: 10500 },
    { date: '2024-01-03', clicks: 2750, conversions: 89, revenue: 7800 },
    { date: '2024-01-04', clicks: 3400, conversions: 142, revenue: 12200 },
    { date: '2024-01-05', clicks: 3800, conversions: 168, revenue: 14500 },
    { date: '2024-01-06', clicks: 3200, conversions: 134, revenue: 11600 },
    { date: '2024-01-07', clicks: 2900, conversions: 105, revenue: 9200 }
  ];

  const topCampaigns = [
    {
      id: 'utm_001',
      source: 'google',
      medium: 'cpc',
      campaign: 'ramadan_2024',
      clicks: 18450,
      conversions: 892,
      conversionRate: 4.84,
      revenue: 76400,
      cost: 6458,
      roas: 11.84
    },
    {
      id: 'utm_002',
      source: 'facebook',
      medium: 'social',
      campaign: 'orphan_support',
      clicks: 12680,
      conversions: 456,
      conversionRate: 3.60,
      revenue: 42800,
      cost: 4234,
      roas: 10.11
    },
    {
      id: 'utm_003',
      source: 'instagram',
      medium: 'social',
      campaign: 'water_wells_video',
      clicks: 9875,
      conversions: 325,
      conversionRate: 3.29,
      revenue: 28900,
      cost: 2963,
      roas: 9.76
    },
    {
      id: 'utm_004',
      source: 'youtube',
      medium: 'video',
      campaign: 'charity_testimonials',
      clicks: 7540,
      conversions: 289,
      conversionRate: 3.83,
      revenue: 24600,
      cost: 2262,
      roas: 10.87
    },
    {
      id: 'utm_005',
      source: 'email',
      medium: 'newsletter',
      campaign: 'monthly_update',
      clicks: 6320,
      conversions: 412,
      conversionRate: 6.52,
      revenue: 35200,
      cost: 158,
      roas: 222.78
    }
  ];

  const sourceBreakdown = [
    { name: 'Google Ads', value: 35, color: '#4285F4' },
    { name: 'Facebook', value: 28, color: '#1877F2' },
    { name: 'Instagram', value: 18, color: '#E4405F' },
    { name: 'YouTube', value: 12, color: '#FF0000' },
    { name: 'Email', value: 7, color: '#34A853' }
  ];

  const generateUTMLink = (source: string, medium: string, campaign: string) => {
    const baseUrl = 'https://myapp.com/donate';
    return `${baseUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">UTM Analytics & Campaign Tracking</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key UTM Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <MousePointer className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Total Clicks</p>
              <p className="text-xl font-bold">{utmSummary.totalClicks.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Conversions</p>
              <p className="text-xl font-bold">{utmSummary.totalConversions.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">Conv. Rate</p>
              <p className="text-xl font-bold">{utmSummary.conversionRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-xl font-bold">£{utmSummary.totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <MousePointer className="h-6 w-6 mx-auto mb-2 text-orange-600" />
              <p className="text-sm text-gray-600">Cost/Click</p>
              <p className="text-xl font-bold">£{utmSummary.costPerClick}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">ROAS</p>
              <p className="text-xl font-bold">{utmSummary.returnOnAdSpend}x</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Campaign Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
          <TabsTrigger value="generator">UTM Generator</TabsTrigger>
          <TabsTrigger value="attribution">Attribution Model</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clicks" stroke="#8884d8" name="Clicks" />
                    <Line type="monotone" dataKey="conversions" stroke="#82ca9d" name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {sourceBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Medium</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Conv. Rate</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>ROAS</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.campaign}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.source}</Badge>
                      </TableCell>
                      <TableCell>{campaign.medium}</TableCell>
                      <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                      <TableCell>{campaign.conversions.toLocaleString()}</TableCell>
                      <TableCell>{campaign.conversionRate}%</TableCell>
                      <TableCell>£{campaign.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={campaign.roas > 10 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {campaign.roas}x
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>UTM Link Generator</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Source</label>
                  <Input placeholder="e.g., google, facebook, newsletter" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Medium</label>
                  <Input placeholder="e.g., cpc, social, email" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Name</label>
                  <Input placeholder="e.g., spring_campaign_2024" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Term (Optional)</label>
                  <Input placeholder="e.g., charity+donation" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Campaign Content (Optional)</label>
                  <Input placeholder="e.g., banner_ad, text_link" />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg mb-4">
                <label className="block text-sm font-medium mb-2">Generated UTM Link:</label>
                <div className="flex items-center gap-2">
                  <Input 
                    value="https://myapp.com/donate?utm_source=example&utm_medium=example&utm_campaign=example"
                    readOnly
                    className="font-mono text-sm"
                  />
                  <Button size="sm">Copy</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Generate Link
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Save Template
                </Button>
                <Button variant="outline" className="w-full">
                  <Filter className="h-4 w-4 mr-2" />
                  Bulk Generator
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attribution">
          <Card>
            <CardHeader>
              <CardTitle>Multi-Touch Attribution Model</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Attribution Models</h4>
                    <div className="space-y-3">
                      {[
                        { model: 'First Touch', percentage: 25, description: 'Credits first interaction' },
                        { model: 'Last Touch', percentage: 30, description: 'Credits final interaction' },
                        { model: 'Linear', percentage: 20, description: 'Equal credit to all touches' },
                        { model: 'Time Decay', percentage: 15, description: 'More credit to recent touches' },
                        { model: 'Position Based', percentage: 10, description: '40% first, 40% last, 20% middle' }
                      ].map((model, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{model.model}</p>
                            <p className="text-sm text-gray-600">{model.description}</p>
                          </div>
                          <Badge>{model.percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">Customer Journey Analysis</h4>
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium">Typical Donor Journey</h5>
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-sm">Google Search → Landing Page</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-sm">Social Media → Content View</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm">Email → Donation Page</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span className="text-sm">Direct → Conversion</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded">
                          <p className="text-sm text-blue-600">Avg. Touchpoints</p>
                          <p className="text-xl font-bold text-blue-800">3.4</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded">
                          <p className="text-sm text-green-600">Conversion Time</p>
                          <p className="text-xl font-bold text-green-800">5.2 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UTMAnalytics;

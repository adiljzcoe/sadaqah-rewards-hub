
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Megaphone,
  Target,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  MousePointer,
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Globe,
  Smartphone,
  Mail,
  Bell,
  Share2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const MarketingCampaigns = () => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    objective: '',
    channels: [],
    budget: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    description: ''
  });

  // Mock data for marketing campaigns
  const campaigns = [
    {
      id: '1',
      name: 'Ramadan 2024 Global Campaign',
      objective: 'Brand Awareness',
      status: 'active',
      budget: 150000,
      spent: 89000,
      startDate: '2024-03-10',
      endDate: '2024-04-09',
      channels: ['Social Media', 'Email', 'Push', 'Display Ads'],
      metrics: {
        impressions: 2500000,
        clicks: 125000,
        conversions: 8900,
        donations: 285000,
        newUsers: 15600
      }
    },
    {
      id: '2',
      name: 'Emergency Gaza Relief',
      objective: 'Donations',
      status: 'completed',
      budget: 75000,
      spent: 72000,
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      channels: ['Social Media', 'Email', 'Influencers'],
      metrics: {
        impressions: 1800000,
        clicks: 156000,
        conversions: 12400,
        donations: 465000,
        newUsers: 8900
      }
    },
    {
      id: '3',
      name: 'Summer Outreach',
      objective: 'User Acquisition',
      status: 'scheduled',
      budget: 100000,
      spent: 0,
      startDate: '2024-06-15',
      endDate: '2024-08-15',
      channels: ['Social Media', 'Google Ads', 'Email'],
      metrics: {
        impressions: 0,
        clicks: 0,
        conversions: 0,
        donations: 0,
        newUsers: 0
      }
    }
  ];

  const channelPerformance = [
    { channel: 'Social Media', spend: 45000, conversions: 3200, cpa: 14.06, donations: 125000 },
    { channel: 'Email Marketing', spend: 8000, conversions: 2800, cpa: 2.86, donations: 98000 },
    { channel: 'Google Ads', spend: 32000, conversions: 1900, cpa: 16.84, donations: 78000 },
    { channel: 'Display Ads', spend: 18000, conversions: 850, cpa: 21.18, donations: 45000 },
    { channel: 'Influencer', spend: 25000, conversions: 1100, cpa: 22.73, donations: 67000 }
  ];

  const weeklyPerformance = [
    { week: 'W1', impressions: 450000, clicks: 18000, conversions: 1200, spend: 12000 },
    { week: 'W2', impressions: 520000, clicks: 22000, conversions: 1450, spend: 14500 },
    { week: 'W3', impressions: 480000, clicks: 19500, conversions: 1350, spend: 13200 },
    { week: 'W4', impressions: 610000, clicks: 28000, conversions: 1800, spend: 16800 }
  ];

  const audienceBreakdown = [
    { segment: 'Age 18-24', users: 28000, color: '#0088FE' },
    { segment: 'Age 25-34', users: 45000, color: '#00C49F' },
    { segment: 'Age 35-44', users: 38000, color: '#FFBB28' },
    { segment: 'Age 45-54', users: 22000, color: '#FF8042' },
    { segment: 'Age 55+', users: 15000, color: '#8884D8' }
  ];

  const marketingObjectives = [
    { id: 'awareness', name: 'Brand Awareness' },
    { id: 'acquisition', name: 'User Acquisition' },
    { id: 'donations', name: 'Increase Donations' },
    { id: 'retention', name: 'User Retention' },
    { id: 'engagement', name: 'Engagement' }
  ];

  const marketingChannels = [
    { id: 'social', name: 'Social Media', icon: Share2 },
    { id: 'email', name: 'Email Marketing', icon: Mail },
    { id: 'push', name: 'Push Notifications', icon: Bell },
    { id: 'google', name: 'Google Ads', icon: Globe },
    { id: 'display', name: 'Display Ads', icon: Eye },
    { id: 'influencer', name: 'Influencer Marketing', icon: Users },
    { id: 'mobile', name: 'Mobile Ads', icon: Smartphone }
  ];

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setIsCreatingCampaign(false);
    setNewCampaign({
      name: '',
      objective: '',
      channels: [],
      budget: '',
      startDate: '',
      endDate: '',
      targetAudience: '',
      description: ''
    });
  };

  const handleChannelToggle = (channelId) => {
    const updatedChannels = newCampaign.channels.includes(channelId)
      ? newCampaign.channels.filter(id => id !== channelId)
      : [...newCampaign.channels, channelId];
    setNewCampaign({ ...newCampaign, channels: updatedChannels });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-blue-600" />
            Marketing Campaigns
          </h2>
          <p className="text-gray-600">Create and manage multi-channel marketing campaigns</p>
        </div>
        <Button onClick={() => setIsCreatingCampaign(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-gray-500">Running now</p>
              </div>
              <Target className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reach</p>
                <p className="text-2xl font-bold">4.3M</p>
                <p className="text-xs text-green-600">+18% this month</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conv. Rate</p>
                <p className="text-2xl font-bold">5.8%</p>
                <p className="text-xs text-green-600">+0.9% vs avg</p>
              </div>
              <MousePointer className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Campaign ROI</p>
                <p className="text-2xl font-bold">4.2x</p>
                <p className="text-xs text-green-600">£4.20 per £1 spent</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold">£425K</p>
                <p className="text-xs text-gray-500">This quarter</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance Overview</CardTitle>
                <CardDescription>Weekly performance across all active campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="conversions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="clicks" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Channel Performance</CardTitle>
                <CardDescription>Cost per acquisition by marketing channel</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {channelPerformance.slice(0, 4).map((channel) => (
                    <div key={channel.channel} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{channel.channel}</p>
                        <p className="text-sm text-gray-500">{channel.conversions} conversions</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">£{channel.cpa.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">CPA</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns Summary</CardTitle>
              <CardDescription>Overview of currently running campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {campaigns.filter(c => c.status === 'active').map((campaign) => (
                  <div key={campaign.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{campaign.name}</h3>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Budget Used:</span>
                        <span>£{campaign.spent.toLocaleString()} / £{campaign.budget.toLocaleString()}</span>
                      </div>
                      <Progress value={(campaign.spent / campaign.budget) * 100} className="h-2" />
                      <div className="flex justify-between">
                        <span>Conversions:</span>
                        <span>{campaign.metrics.conversions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Donations:</span>
                        <span>£{campaign.metrics.donations.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          {isCreatingCampaign && (
            <Card>
              <CardHeader>
                <CardTitle>Create Marketing Campaign</CardTitle>
                <CardDescription>Set up a new multi-channel marketing campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Ramadan 2024 Global Campaign"
                    />
                  </div>
                  <div>
                    <Label htmlFor="objective">Campaign Objective</Label>
                    <Select value={newCampaign.objective} onValueChange={(value) => setNewCampaign({ ...newCampaign, objective: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select objective" />
                      </SelectTrigger>
                      <SelectContent>
                        {marketingObjectives.map(objective => (
                          <SelectItem key={objective.id} value={objective.id}>{objective.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Marketing Channels</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {marketingChannels.map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <div
                          key={channel.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            newCampaign.channels.includes(channel.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleChannelToggle(channel.id)}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span className="text-sm font-medium">{channel.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Campaign Description</Label>
                  <Textarea
                    id="description"
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    placeholder="Describe your campaign goals and strategy..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="budget">Total Budget (£)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign({ ...newCampaign, budget: e.target.value })}
                      placeholder="50000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newCampaign.startDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newCampaign.endDate}
                      onChange={(e) => setNewCampaign({ ...newCampaign, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateCampaign}>Create Campaign</Button>
                  <Button variant="outline" onClick={() => setIsCreatingCampaign(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>All Campaigns</CardTitle>
              <CardDescription>Manage your marketing campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Channels</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.objective}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          campaign.status === 'active' ? 'default' :
                          campaign.status === 'completed' ? 'secondary' : 'outline'
                        }>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>£{campaign.spent.toLocaleString()} / £{campaign.budget.toLocaleString()}</div>
                          <Progress value={(campaign.spent / campaign.budget) * 100} className="h-1 mt-1" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm space-y-1">
                          <div>Conversions: {campaign.metrics.conversions.toLocaleString()}</div>
                          <div>Donations: £{campaign.metrics.donations.toLocaleString()}</div>
                          <div>New Users: {campaign.metrics.newUsers.toLocaleString()}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {campaign.channels.slice(0, 2).map((channel, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {channel}
                            </Badge>
                          ))}
                          {campaign.channels.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{campaign.channels.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Performance Comparison</CardTitle>
              <CardDescription>Compare performance across different marketing channels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Channel</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>CPA</TableHead>
                    <TableHead>Donations</TableHead>
                    <TableHead>ROI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channelPerformance.map((channel) => (
                    <TableRow key={channel.channel}>
                      <TableCell className="font-medium">{channel.channel}</TableCell>
                      <TableCell>£{channel.spend.toLocaleString()}</TableCell>
                      <TableCell>{channel.conversions.toLocaleString()}</TableCell>
                      <TableCell>£{channel.cpa.toFixed(2)}</TableCell>
                      <TableCell>£{channel.donations.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={
                          (channel.donations / channel.spend) > 3 ? 'default' : 
                          (channel.donations / channel.spend) > 2 ? 'secondary' : 'destructive'
                        }>
                          {(channel.donations / channel.spend).toFixed(1)}x
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>Weekly campaign performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="conversions" stroke="#8884d8" name="Conversions" />
                    <Line type="monotone" dataKey="spend" stroke="#82ca9d" name="Spend (£)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Audience Breakdown</CardTitle>
                <CardDescription>User demographics across campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={audienceBreakdown}
                      dataKey="users"
                      nameKey="segment"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                    >
                      {audienceBreakdown.map((entry, index) => (
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

        <TabsContent value="audiences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Target Audiences</CardTitle>
              <CardDescription>Manage your marketing audience segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {audienceBreakdown.map((segment) => (
                  <div key={segment.segment} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{segment.segment}</h3>
                      <Badge variant="outline">{segment.users.toLocaleString()} users</Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-3">
                      Active in marketing campaigns
                    </div>
                    <Button size="sm" variant="outline" className="w-full">
                      Create Targeted Campaign
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketingCampaigns;

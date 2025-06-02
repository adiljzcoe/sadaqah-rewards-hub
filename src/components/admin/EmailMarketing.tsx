
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
  Mail, 
  Send, 
  Clock, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  TrendingUp,
  Eye,
  MousePointer,
  UserPlus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const EmailMarketing = () => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [selectedTab, setSelectedTab] = useState('campaigns');
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    subject: '',
    content: '',
    audience: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: '',
    template: 'general'
  });

  // Mock data for email campaigns
  const campaigns = [
    {
      id: '1',
      name: 'Ramadan Campaign 2024',
      subject: 'Double Your Rewards This Ramadan',
      audience: 'All Active Users',
      status: 'sent',
      sentAt: '2024-03-15 10:00',
      opens: 12470,
      clicks: 3420,
      recipients: 50000,
      bounces: 250,
      unsubscribes: 45
    },
    {
      id: '2',
      name: 'Monthly Newsletter',
      subject: 'Your Impact This Month',
      audience: 'Premium Members',
      status: 'scheduled',
      sentAt: '2024-06-01 09:00',
      opens: 0,
      clicks: 0,
      recipients: 8560,
      bounces: 0,
      unsubscribes: 0
    },
    {
      id: '3',
      name: 'Emergency Gaza Appeal',
      subject: 'Urgent: Gaza Families Need Your Help',
      audience: 'Previous Emergency Donors',
      status: 'sent',
      sentAt: '2024-05-20 14:30',
      opens: 25600,
      clicks: 8900,
      recipients: 35000,
      bounces: 180,
      unsubscribes: 78
    }
  ];

  const performanceData = [
    { month: 'Jan', opens: 22.5, clicks: 6.8, conversions: 2.1 },
    { month: 'Feb', opens: 24.1, clicks: 7.2, conversions: 2.4 },
    { month: 'Mar', opens: 26.8, clicks: 8.1, conversions: 2.8 },
    { month: 'Apr', opens: 25.2, clicks: 7.5, conversions: 2.6 },
    { month: 'May', opens: 28.4, clicks: 9.2, conversions: 3.2 }
  ];

  const audienceSegments = [
    { id: 'all', name: 'All Subscribers', count: 125000, growth: '+12%' },
    { id: 'active', name: 'Active Donors (30d)', count: 45000, growth: '+8%' },
    { id: 'premium', name: 'Premium Members', count: 8560, growth: '+15%' },
    { id: 'inactive', name: 'Inactive (90d+)', count: 28000, growth: '-5%' },
    { id: 'new', name: 'New Signups (7d)', count: 3200, growth: '+25%' },
    { id: 'vip', name: 'VIP Donors (£1000+)', count: 1250, growth: '+18%' },
    { id: 'lapsed', name: 'Lapsed Donors (1y+)', count: 15600, growth: '-2%' }
  ];

  const templates = [
    { id: 'welcome', name: 'Welcome Series', usage: 156 },
    { id: 'ramadan', name: 'Ramadan Special', usage: 89 },
    { id: 'emergency', name: 'Emergency Appeal', usage: 234 },
    { id: 'newsletter', name: 'Monthly Newsletter', usage: 67 },
    { id: 'thankyou', name: 'Thank You Message', usage: 445 },
    { id: 'reactivation', name: 'Win Back Campaign', usage: 123 }
  ];

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setIsCreatingCampaign(false);
    setNewCampaign({
      name: '',
      subject: '',
      content: '',
      audience: '',
      scheduled: false,
      scheduleDate: '',
      scheduleTime: '',
      template: 'general'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-600" />
            Email Marketing
          </h2>
          <p className="text-gray-600">Manage email campaigns and audience engagement</p>
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
                <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
                <p className="text-2xl font-bold">125,847</p>
                <p className="text-xs text-green-600">+12% this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold">26.8%</p>
                <p className="text-xs text-green-600">+2.3% vs industry</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">9.2%</p>
                <p className="text-xs text-green-600">+1.8% vs industry</p>
              </div>
              <MousePointer className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-2xl font-bold">3.2%</p>
                <p className="text-xs text-green-600">+0.6% vs last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue Generated</p>
                <p className="text-2xl font-bold">£285K</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <UserPlus className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {isCreatingCampaign && (
            <Card>
              <CardHeader>
                <CardTitle>Create Email Campaign</CardTitle>
                <CardDescription>Design and schedule your email campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Ramadan Appeal 2024"
                    />
                  </div>
                  <div>
                    <Label htmlFor="template">Email Template</Label>
                    <Select value={newCampaign.template} onValueChange={(value) => setNewCampaign({ ...newCampaign, template: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map(template => (
                          <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="subject">Email Subject</Label>
                  <Input
                    id="subject"
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign({ ...newCampaign, subject: e.target.value })}
                    placeholder="e.g., Double Your Rewards This Ramadan"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Email Content</Label>
                  <Textarea
                    id="content"
                    value={newCampaign.content}
                    onChange={(e) => setNewCampaign({ ...newCampaign, content: e.target.value })}
                    placeholder="Write your email content here..."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceSegments.map(audience => (
                        <SelectItem key={audience.id} value={audience.id}>
                          {audience.name} ({audience.count.toLocaleString()} recipients)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newCampaign.scheduled}
                    onCheckedChange={(checked) => setNewCampaign({ ...newCampaign, scheduled: checked })}
                  />
                  <Label>Schedule for later</Label>
                </div>

                {newCampaign.scheduled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleDate">Schedule Date</Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={newCampaign.scheduleDate}
                        onChange={(e) => setNewCampaign({ ...newCampaign, scheduleDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleTime">Schedule Time</Label>
                      <Input
                        id="scheduleTime"
                        type="time"
                        value={newCampaign.scheduleTime}
                        onChange={(e) => setNewCampaign({ ...newCampaign, scheduleTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateCampaign}>
                    {newCampaign.scheduled ? 'Schedule Campaign' : 'Send Now'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreatingCampaign(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Campaigns</CardTitle>
              <CardDescription>Manage your email campaigns and view performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-sm text-gray-500">{campaign.subject}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {campaign.recipients.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          campaign.status === 'sent' ? 'default' :
                          campaign.status === 'scheduled' ? 'secondary' : 'outline'
                        }>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {campaign.status === 'sent' && (
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Opens:</span>
                              <span>{campaign.opens.toLocaleString()} ({((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Clicks:</span>
                              <span>{campaign.clicks.toLocaleString()} ({((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Bounces:</span>
                              <span>{campaign.bounces} ({((campaign.bounces / campaign.recipients) * 100).toFixed(2)}%)</span>
                            </div>
                          </div>
                        )}
                        {campaign.status === 'scheduled' && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            Scheduled
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{campaign.sentAt || '-'}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="audience" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage and analyze your subscriber segments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {audienceSegments.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{segment.name}</h3>
                      <p className="text-sm text-gray-500">{segment.count.toLocaleString()} subscribers</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={segment.growth.startsWith('+') ? 'default' : 'destructive'}>
                        {segment.growth}
                      </Badge>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Performance Trends</CardTitle>
              <CardDescription>Track your email marketing performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="opens" stroke="#8884d8" name="Open Rate %" />
                  <Line type="monotone" dataKey="clicks" stroke="#82ca9d" name="Click Rate %" />
                  <Line type="monotone" dataKey="conversions" stroke="#ffc658" name="Conversion Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Automation</CardTitle>
              <CardDescription>Set up automated email sequences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Welcome Series</h3>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">5-email series for new subscribers</p>
                    <div className="text-sm">
                      <div>Subscribers: 3,240</div>
                      <div>Completion Rate: 78%</div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Win Back Campaign</h3>
                      <Badge variant="secondary">Paused</Badge>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Re-engage inactive donors</p>
                    <div className="text-sm">
                      <div>Target: 15,600 users</div>
                      <div>Response Rate: 12%</div>
                    </div>
                  </div>
                </div>
                
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Automation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailMarketing;

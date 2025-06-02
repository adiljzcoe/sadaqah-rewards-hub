
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { MessageSquare, Send, Clock, Users, TrendingUp, Globe, Smartphone, AlertCircle, CheckCircle, Plus } from 'lucide-react';

const SMSNotifications = () => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message: '',
    audience: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: '',
    type: 'promotional'
  });

  const smsMetrics = {
    totalSent: 2850000,
    deliveryRate: 98.5,
    openRate: 85.2,
    clickRate: 12.8,
    unsubscribeRate: 0.3,
    costPerMessage: 0.045,
    activeNumbers: 1247000,
    blockedNumbers: 8500
  };

  const campaignData = [
    {
      id: '1',
      name: 'Ramadan Emergency Appeal',
      type: 'Emergency',
      sent: 125000,
      delivered: 123250,
      clicked: 15900,
      unsubscribed: 45,
      cost: 5625,
      sentAt: '2024-05-28 14:30',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Monthly Donation Reminder',
      type: 'Reminder',
      sent: 85000,
      delivered: 83650,
      clicked: 8500,
      unsubscribed: 28,
      cost: 3825,
      sentAt: '2024-05-25 09:00',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Eid Mubarak Wishes',
      type: 'Seasonal',
      sent: 0,
      delivered: 0,
      clicked: 0,
      unsubscribed: 0,
      cost: 0,
      sentAt: '2024-06-01 08:00',
      status: 'scheduled'
    }
  ];

  const performanceData = [
    { month: 'Jan', sent: 180000, delivered: 177300, clicked: 22680 },
    { month: 'Feb', sent: 165000, delivered: 162525, clicked: 20800 },
    { month: 'Mar', sent: 220000, delivered: 216700, clicked: 28160 },
    { month: 'Apr', sent: 195000, delivered: 192075, clicked: 24960 },
    { month: 'May', sent: 280000, delivered: 275800, clicked: 35344 }
  ];

  const audienceSegments = [
    { name: 'All Subscribers', count: 1247000, optInRate: 85.2 },
    { name: 'Active Donors', count: 456000, optInRate: 92.1 },
    { name: 'VIP Members', count: 15600, optInRate: 98.5 },
    { name: 'Inactive Users', count: 234000, optInRate: 65.8 },
    { name: 'Emergency Alerts Only', count: 89000, optInRate: 95.3 }
  ];

  const messageTypes = [
    { name: 'Donation Reminders', value: 45, color: '#8884d8' },
    { name: 'Emergency Alerts', value: 25, color: '#82ca9d' },
    { name: 'Thank You Messages', value: 15, color: '#ffc658' },
    { name: 'Event Notifications', value: 10, color: '#ff7300' },
    { name: 'Other', value: 5, color: '#8dd1e1' }
  ];

  const handleCreateCampaign = () => {
    console.log('Creating SMS campaign:', newCampaign);
    setIsCreatingCampaign(false);
    setNewCampaign({
      name: '',
      message: '',
      audience: '',
      scheduled: false,
      scheduleDate: '',
      scheduleTime: '',
      type: 'promotional'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'sending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-600" />
            SMS Notifications
          </h2>
          <p className="text-gray-600">Manage SMS campaigns and messaging automation</p>
        </div>
        <Button onClick={() => setIsCreatingCampaign(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create SMS Campaign
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Sent</p>
                <p className="text-2xl font-bold">{smsMetrics.totalSent.toLocaleString()}</p>
                <p className="text-xs text-green-600">This month</p>
              </div>
              <Send className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-bold">{smsMetrics.deliveryRate}%</p>
                <p className="text-xs text-green-600">+0.3% vs last month</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">{smsMetrics.clickRate}%</p>
                <p className="text-xs text-green-600">+1.2% vs industry</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Numbers</p>
                <p className="text-2xl font-bold">{smsMetrics.activeNumbers.toLocaleString()}</p>
                <p className="text-xs text-green-600">+5.8% growth</p>
              </div>
              <Smartphone className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost per Message</p>
                <p className="text-2xl font-bold">£{smsMetrics.costPerMessage}</p>
                <p className="text-xs text-green-600">-£0.002 vs last month</p>
              </div>
              <Globe className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {isCreatingCampaign && (
            <Card>
              <CardHeader>
                <CardTitle>Create SMS Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="campaignName">Campaign Name</Label>
                    <Input
                      id="campaignName"
                      value={newCampaign.name}
                      onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                      placeholder="e.g., Emergency Gaza Appeal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="messageType">Message Type</Label>
                    <Select value={newCampaign.type} onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency Alert</SelectItem>
                        <SelectItem value="promotional">Promotional</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                        <SelectItem value="seasonal">Seasonal</SelectItem>
                        <SelectItem value="thankyou">Thank You</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message Content</Label>
                  <Textarea
                    id="message"
                    value={newCampaign.message}
                    onChange={(e) => setNewCampaign({ ...newCampaign, message: e.target.value })}
                    placeholder="Your SMS message (max 160 characters)..."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-sm text-gray-500 mt-1">{newCampaign.message.length}/160 characters</p>
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={newCampaign.audience} onValueChange={(value) => setNewCampaign({ ...newCampaign, audience: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      {audienceSegments.map(audience => (
                        <SelectItem key={audience.name} value={audience.name}>
                          {audience.name} ({audience.count.toLocaleString()} subscribers)
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
              <CardTitle>Recent SMS Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaignData.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </TableCell>
                      <TableCell>{campaign.sent.toLocaleString()}</TableCell>
                      <TableCell>
                        {campaign.status === 'completed' && (
                          <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                              <span>Delivered:</span>
                              <span>{((campaign.delivered / campaign.sent) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Clicked:</span>
                              <span>{((campaign.clicked / campaign.sent) * 100).toFixed(1)}%</span>
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
                      <TableCell>£{campaign.cost.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(campaign.status)}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{campaign.sentAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audiences">
          <Card>
            <CardHeader>
              <CardTitle>SMS Audience Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audienceSegments.map((segment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">{segment.name}</h3>
                      <p className="text-sm text-gray-500">{segment.count.toLocaleString()} subscribers</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Opt-in Rate</p>
                        <p className="text-lg font-bold text-green-600">{segment.optInRate}%</p>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SMS Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sent" stroke="#8884d8" name="Sent" />
                    <Line type="monotone" dataKey="delivered" stroke="#82ca9d" name="Delivered" />
                    <Line type="monotone" dataKey="clicked" stroke="#ffc658" name="Clicked" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Message Type Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={messageTypes}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {messageTypes.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-green-600">Delivered</p>
                        <p className="text-2xl font-bold text-green-800">98.5%</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-red-600">Failed</p>
                        <p className="text-2xl font-bold text-red-800">1.5%</p>
                      </div>
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-600">Pending</p>
                        <p className="text-2xl font-bold text-blue-800">0.0%</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Blocked</p>
                        <p className="text-2xl font-bold text-gray-800">0.7%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>SMS Settings & Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Sending Configuration</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>Enable SMS sending</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Rate limiting (msgs/min)</Label>
                        <Input type="number" defaultValue="1000" className="w-24" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Delivery optimization</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Compliance Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label>GDPR compliance mode</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Auto opt-out handling</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Message content filtering</Label>
                        <Switch defaultChecked />
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

export default SMSNotifications;

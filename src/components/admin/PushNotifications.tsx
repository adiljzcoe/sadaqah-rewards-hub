
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
  Bell, 
  Send, 
  Clock, 
  Smartphone, 
  Plus, 
  Edit, 
  Trash2, 
  Target,
  Zap,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Globe
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PushNotifications = () => {
  const [isCreatingNotification, setIsCreatingNotification] = useState(false);
  const [selectedTab, setSelectedTab] = useState('notifications');
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    audience: '',
    scheduled: false,
    scheduleDate: '',
    scheduleTime: '',
    actionUrl: '',
    priority: 'normal'
  });

  // Mock data for push notifications
  const notifications = [
    {
      id: '1',
      title: 'Emergency Gaza Appeal',
      message: 'Urgent help needed for Gaza families. Donate now.',
      audience: 'All Users',
      status: 'sent',
      sentAt: '2024-05-28 14:30',
      delivered: 45000,
      opened: 12500,
      clicked: 3400,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Ramadan Reminder',
      message: 'Don\'t forget your daily Sadaqah this Ramadan',
      audience: 'Active Users',
      status: 'scheduled',
      sentAt: '2024-06-01 19:00',
      delivered: 0,
      opened: 0,
      clicked: 0,
      priority: 'normal'
    },
    {
      id: '3',
      title: 'Weekly Impact Update',
      message: 'See how your donations helped 1,245 families this week',
      audience: 'Recent Donors',
      status: 'sent',
      sentAt: '2024-05-25 10:00',
      delivered: 18000,
      opened: 7200,
      clicked: 2100,
      priority: 'normal'
    }
  ];

  const deviceStats = [
    { platform: 'iOS', users: 68000, enabled: 45000, rate: 66.2 },
    { platform: 'Android', users: 92000, enabled: 72000, rate: 78.3 },
    { platform: 'Web', users: 15000, enabled: 8500, rate: 56.7 }
  ];

  const performanceData = [
    { day: 'Mon', delivered: 45000, opened: 12500, clicked: 3400 },
    { day: 'Tue', delivered: 38000, opened: 10200, clicked: 2800 },
    { day: 'Wed', delivered: 42000, opened: 11800, clicked: 3200 },
    { day: 'Thu', delivered: 39000, enabled: 10500, clicked: 2900 },
    { day: 'Fri', delivered: 52000, opened: 16000, clicked: 4200 },
    { day: 'Sat', delivered: 48000, opened: 14500, clicked: 3800 },
    { day: 'Sun', delivered: 35000, opened: 9800, clicked: 2600 }
  ];

  const timeZoneData = [
    { zone: 'GMT+0 (UK)', users: 45000, color: '#0088FE' },
    { zone: 'GMT+5 (Pakistan)', users: 32000, color: '#00C49F' },
    { zone: 'GMT-5 (US East)', users: 28000, color: '#FFBB28' },
    { zone: 'GMT+1 (Europe)', users: 25000, color: '#FF8042' },
    { zone: 'Other', users: 45000, color: '#8884D8' }
  ];

  const segmentedAudiences = [
    { id: 'all', name: 'All Users', count: 175000, enabledRate: 72 },
    { id: 'active', name: 'Active Donors (30d)', count: 45000, enabledRate: 85 },
    { id: 'premium', name: 'Premium Members', count: 8500, enabledRate: 92 },
    { id: 'new', name: 'New Users (7d)', count: 3200, enabledRate: 68 },
    { id: 'location_uk', name: 'UK Users', count: 65000, enabledRate: 76 },
    { id: 'location_us', name: 'US Users', count: 32000, enabledRate: 74 },
    { id: 'high_value', name: 'High Value Donors', count: 5400, enabledRate: 88 }
  ];

  const automationRules = [
    {
      id: '1',
      name: 'Daily Reminder',
      trigger: 'Time-based',
      condition: '7 PM local time',
      message: 'Your daily good deed awaits',
      status: 'active',
      sends: 1250
    },
    {
      id: '2',
      name: 'Donation Thank You',
      trigger: 'Event-based',
      condition: 'After donation',
      message: 'Thank you for your donation!',
      status: 'active',
      sends: 450
    },
    {
      id: '3',
      name: 'Inactivity Re-engagement',
      trigger: 'Behavioral',
      condition: 'No activity for 14 days',
      message: 'We miss you! Come back and make a difference',
      status: 'paused',
      sends: 89
    }
  ];

  const handleCreateNotification = () => {
    console.log('Creating notification:', newNotification);
    setIsCreatingNotification(false);
    setNewNotification({
      title: '',
      message: '',
      audience: '',
      scheduled: false,
      scheduleDate: '',
      scheduleTime: '',
      actionUrl: '',
      priority: 'normal'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-600" />
            Push Notifications
          </h2>
          <p className="text-gray-600">Engage users with timely push notifications</p>
        </div>
        <Button onClick={() => setIsCreatingNotification(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Send Notification
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Devices</p>
                <p className="text-2xl font-bold">175K</p>
                <p className="text-xs text-gray-500">Registered</p>
              </div>
              <Smartphone className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Opt-in Rate</p>
                <p className="text-2xl font-bold">72%</p>
                <p className="text-xs text-green-600">+5% this month</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Delivery Rate</p>
                <p className="text-2xl font-bold">94%</p>
                <p className="text-xs text-green-600">Industry leading</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Rate</p>
                <p className="text-2xl font-bold">28%</p>
                <p className="text-xs text-green-600">+3% vs avg</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Click Rate</p>
                <p className="text-2xl font-bold">7.8%</p>
                <p className="text-xs text-green-600">Above average</p>
              </div>
              <Zap className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="audiences">Audiences</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          {isCreatingNotification && (
            <Card>
              <CardHeader>
                <CardTitle>Send Push Notification</CardTitle>
                <CardDescription>Create and send a push notification to your users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="notificationTitle">Notification Title</Label>
                    <Input
                      id="notificationTitle"
                      value={newNotification.title}
                      onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                      placeholder="e.g., Emergency Gaza Appeal"
                      maxLength={50}
                    />
                    <p className="text-xs text-gray-500 mt-1">{newNotification.title.length}/50 characters</p>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select value={newNotification.priority} onValueChange={(value) => setNewNotification({ ...newNotification, priority: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={newNotification.message}
                    onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                    placeholder="e.g., Urgent help needed for Gaza families. Donate now."
                    maxLength={160}
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">{newNotification.message.length}/160 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="audience">Target Audience</Label>
                    <Select value={newNotification.audience} onValueChange={(value) => setNewNotification({ ...newNotification, audience: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {segmentedAudiences.map(audience => (
                          <SelectItem key={audience.id} value={audience.id}>
                            {audience.name} ({audience.count.toLocaleString()} users)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="actionUrl">Action URL (Optional)</Label>
                    <Input
                      id="actionUrl"
                      value={newNotification.actionUrl}
                      onChange={(e) => setNewNotification({ ...newNotification, actionUrl: e.target.value })}
                      placeholder="https://example.com/emergency-appeal"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newNotification.scheduled}
                    onCheckedChange={(checked) => setNewNotification({ ...newNotification, scheduled: checked })}
                  />
                  <Label>Schedule for later</Label>
                </div>

                {newNotification.scheduled && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scheduleDate">Schedule Date</Label>
                      <Input
                        id="scheduleDate"
                        type="date"
                        value={newNotification.scheduleDate}
                        onChange={(e) => setNewNotification({ ...newNotification, scheduleDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="scheduleTime">Schedule Time</Label>
                      <Input
                        id="scheduleTime"
                        type="time"
                        value={newNotification.scheduleTime}
                        onChange={(e) => setNewNotification({ ...newNotification, scheduleTime: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button onClick={handleCreateNotification}>
                    {newNotification.scheduled ? 'Schedule Notification' : 'Send Now'}
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreatingNotification(false)}>Cancel</Button>
                  <Button variant="outline">Preview</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>Manage your push notifications and view performance</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Notification</TableHead>
                    <TableHead>Audience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Sent Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {notification.title}
                            <Badge variant={
                              notification.priority === 'urgent' ? 'destructive' :
                              notification.priority === 'high' ? 'default' : 'secondary'
                            } className="text-xs">
                              {notification.priority}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-500">{notification.message}</div>
                        </div>
                      </TableCell>
                      <TableCell>{notification.audience}</TableCell>
                      <TableCell>
                        <Badge variant={
                          notification.status === 'sent' ? 'default' :
                          notification.status === 'scheduled' ? 'secondary' : 'outline'
                        }>
                          {notification.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {notification.status === 'sent' && (
                          <div className="text-sm space-y-1">
                            <div>Delivered: {notification.delivered.toLocaleString()}</div>
                            <div>Opened: {notification.opened.toLocaleString()} ({((notification.opened / notification.delivered) * 100).toFixed(1)}%)</div>
                            <div>Clicked: {notification.clicked.toLocaleString()} ({((notification.clicked / notification.delivered) * 100).toFixed(1)}%)</div>
                          </div>
                        )}
                        {notification.status === 'scheduled' && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            Scheduled
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{notification.sentAt || '-'}</TableCell>
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

        <TabsContent value="audiences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Segments</CardTitle>
              <CardDescription>Manage your notification audiences and their opt-in rates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {segmentedAudiences.map((segment) => (
                  <div key={segment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{segment.name}</h3>
                      <p className="text-sm text-gray-500">{segment.count.toLocaleString()} users</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{segment.enabledRate}% opted in</p>
                        <div className="w-24">
                          <Progress value={segment.enabledRate} className="h-2" />
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Device Platforms</CardTitle>
                <CardDescription>Breakdown of registered devices by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceStats.map((platform) => (
                    <div key={platform.platform} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          platform.platform === 'iOS' ? 'bg-blue-500' :
                          platform.platform === 'Android' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                        <span className="font-medium">{platform.platform}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{platform.enabled.toLocaleString()} / {platform.users.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">{platform.rate}% enabled</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Users by time zone</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={timeZoneData}
                      dataKey="users"
                      nameKey="zone"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      fill="#8884d8"
                    >
                      {timeZoneData.map((entry, index) => (
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

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Notifications</CardTitle>
              <CardDescription>Set up automated push notifications based on triggers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{rule.name}</h3>
                        <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                          {rule.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{rule.trigger}: {rule.condition}</p>
                      <p className="text-sm text-gray-600">"{rule.message}"</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{rule.sends} sends this month</p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">
                          {rule.status === 'active' ? 'Pause' : 'Activate'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Automation Rule
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Performance</CardTitle>
              <CardDescription>Track delivery, open, and click rates over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="delivered" stroke="#8884d8" name="Delivered" />
                  <Line type="monotone" dataKey="opened" stroke="#82ca9d" name="Opened" />
                  <Line type="monotone" dataKey="clicked" stroke="#ffc658" name="Clicked" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PushNotifications;

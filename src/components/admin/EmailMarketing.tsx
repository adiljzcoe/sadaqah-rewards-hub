
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
import { Calendar, Send, Clock, Users, Plus, Edit, Trash2 } from 'lucide-react';

const EmailMarketing = () => {
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);
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

  const campaigns = [
    {
      id: '1',
      name: 'Ramadan Campaign 2024',
      subject: 'Double Your Rewards This Ramadan',
      audience: 'All Active Users',
      status: 'sent',
      sentAt: '2024-03-15 10:00',
      opens: 1247,
      clicks: 342,
      recipients: 2000
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
      recipients: 856
    },
    {
      id: '3',
      name: 'Qurbani Appeal',
      subject: 'Share the Blessing of Qurbani',
      audience: 'Previous Donors',
      status: 'draft',
      sentAt: null,
      opens: 0,
      clicks: 0,
      recipients: 1523
    }
  ];

  const templates = [
    { id: 'general', name: 'General Newsletter' },
    { id: 'ramadan', name: 'Ramadan Special' },
    { id: 'qurbani', name: 'Qurbani Appeal' },
    { id: 'emergency', name: 'Emergency Appeal' },
    { id: 'membership', name: 'Membership Promotion' },
    { id: 'thankyou', name: 'Thank You Message' }
  ];

  const audiences = [
    { id: 'all', name: 'All Users', count: 2000 },
    { id: 'active', name: 'Active Donors', count: 1247 },
    { id: 'premium', name: 'Premium Members', count: 856 },
    { id: 'inactive', name: 'Inactive Users', count: 423 },
    { id: 'new', name: 'New Signups (Last 30 days)', count: 189 }
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
          <h2 className="text-2xl font-bold">Email Marketing</h2>
          <p className="text-muted-foreground">Create and manage email campaigns</p>
        </div>
        <Button onClick={() => setIsCreatingCampaign(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.3%</div>
            <p className="text-xs text-muted-foreground">+1.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Campaigns Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

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
                  {audiences.map(audience => (
                    <SelectItem key={audience.id} value={audience.id}>
                      {audience.name} ({audience.count} recipients)
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
          <CardTitle>Email Campaigns</CardTitle>
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
                      <div className="text-sm text-muted-foreground">{campaign.subject}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.recipients}
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
                      <div className="text-sm">
                        <div>Opens: {campaign.opens} ({((campaign.opens / campaign.recipients) * 100).toFixed(1)}%)</div>
                        <div>Clicks: {campaign.clicks} ({((campaign.clicks / campaign.recipients) * 100).toFixed(1)}%)</div>
                      </div>
                    )}
                    {campaign.status === 'scheduled' && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
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
    </div>
  );
};

export default EmailMarketing;

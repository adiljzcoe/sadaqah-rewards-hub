
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, DollarSign, TrendingUp, Link as LinkIcon, Plus, Copy, Eye } from 'lucide-react';

const AffiliateSystem = () => {
  const [isCreatingAffiliate, setIsCreatingAffiliate] = useState(false);
  const [newAffiliate, setNewAffiliate] = useState({
    name: '',
    email: '',
    commission: '10',
    code: '',
    category: 'influencer'
  });

  const affiliates = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@influencer.com',
      code: 'SARAH10',
      category: 'influencer',
      commission: 10,
      clicks: 342,
      conversions: 28,
      revenue: 2800,
      earnings: 280,
      status: 'active',
      joinDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Ahmad Khan',
      email: 'ahmad@content.com',
      code: 'AHMAD15',
      category: 'content_creator',
      commission: 15,
      clicks: 156,
      conversions: 12,
      revenue: 1200,
      earnings: 180,
      status: 'active',
      joinDate: '2024-02-01'
    },
    {
      id: '3',
      name: 'Islamic Center UK',
      email: 'admin@islamicuk.org',
      code: 'ICUK20',
      category: 'organization',
      commission: 20,
      clicks: 89,
      conversions: 8,
      revenue: 800,
      earnings: 160,
      status: 'pending',
      joinDate: '2024-02-15'
    }
  ];

  const generateCode = () => {
    const code = newAffiliate.name.toUpperCase().replace(/\s/g, '').slice(0, 8) + Math.floor(Math.random() * 100);
    setNewAffiliate({ ...newAffiliate, code });
  };

  const handleCreateAffiliate = () => {
    console.log('Creating affiliate:', newAffiliate);
    setIsCreatingAffiliate(false);
    setNewAffiliate({
      name: '',
      email: '',
      commission: '10',
      code: '',
      category: 'influencer'
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Affiliate System</h2>
          <p className="text-muted-foreground">Manage your affiliate program and track performance</p>
        </div>
        <Button onClick={() => setIsCreatingAffiliate(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Affiliate
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Affiliates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,847</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">2.7% conversion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Commissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£4,280</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {isCreatingAffiliate && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Affiliate</CardTitle>
            <CardDescription>Create a new affiliate partner</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAffiliate.name}
                  onChange={(e) => setNewAffiliate({ ...newAffiliate, name: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAffiliate.email}
                  onChange={(e) => setNewAffiliate({ ...newAffiliate, email: e.target.value })}
                  placeholder="sarah@example.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newAffiliate.category} onValueChange={(value) => setNewAffiliate({ ...newAffiliate, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="influencer">Influencer</SelectItem>
                    <SelectItem value="content_creator">Content Creator</SelectItem>
                    <SelectItem value="organization">Organization</SelectItem>
                    <SelectItem value="blogger">Blogger</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="commission">Commission (%)</Label>
                <Input
                  id="commission"
                  type="number"
                  value={newAffiliate.commission}
                  onChange={(e) => setNewAffiliate({ ...newAffiliate, commission: e.target.value })}
                  placeholder="10"
                  min="1"
                  max="50"
                />
              </div>
              <div>
                <Label htmlFor="code">Affiliate Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="code"
                    value={newAffiliate.code}
                    onChange={(e) => setNewAffiliate({ ...newAffiliate, code: e.target.value.toUpperCase() })}
                    placeholder="SARAH10"
                  />
                  <Button type="button" variant="outline" onClick={generateCode}>
                    Generate
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateAffiliate}>Create Affiliate</Button>
              <Button variant="outline" onClick={() => setIsCreatingAffiliate(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Affiliate Partners</CardTitle>
          <CardDescription>Manage your affiliate partners and track their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Affiliate</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Earnings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {affiliates.map((affiliate) => (
                <TableRow key={affiliate.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{affiliate.name}</div>
                      <div className="text-sm text-muted-foreground">{affiliate.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-sm">{affiliate.code}</code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(affiliate.code)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{affiliate.category.replace('_', ' ')}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          {affiliate.clicks} clicks
                        </span>
                      </div>
                      <div className="text-sm">
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {affiliate.conversions} conversions ({((affiliate.conversions / affiliate.clicks) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">£{affiliate.earnings}</div>
                      <div className="text-sm text-muted-foreground">{affiliate.commission}% commission</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={affiliate.status === 'active' ? 'default' : 'secondary'}>
                      {affiliate.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <DollarSign className="h-3 w-3" />
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

export default AffiliateSystem;

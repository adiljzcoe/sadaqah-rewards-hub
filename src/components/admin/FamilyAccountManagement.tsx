
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Users, CreditCard, Coins, Heart, DollarSign, Star } from 'lucide-react';

const FamilyAccountManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    family_name: '',
    parent_email: '',
    is_active: true
  });

  const mockFamilies = [
    {
      id: '1',
      family_name: 'The Johnson Family',
      parent_user_id: 'user123',
      parent_name: 'Sarah Johnson',
      parent_email: 'sarah@example.com',
      total_kids: 3,
      total_balance: 2500, // sadaqah coins
      total_donations: 15400, // in pence
      is_active: true,
      created_at: '2024-01-15',
      kids_accounts: [
        { id: '1', child_name: 'Ahmed', age: 8, sadaqah_coins: 850, jannah_points: 120 },
        { id: '2', child_name: 'Fatima', age: 12, sadaqah_coins: 920, jannah_points: 180 },
        { id: '3', child_name: 'Omar', age: 6, sadaqah_coins: 730, jannah_points: 95 }
      ]
    },
    {
      id: '2',
      family_name: 'The Ahmad Family',
      parent_user_id: 'user456',
      parent_name: 'Mohammed Ahmad',
      parent_email: 'mohammed@example.com',
      total_kids: 2,
      total_balance: 1800,
      total_donations: 8900,
      is_active: true,
      created_at: '2024-01-20',
      kids_accounts: [
        { id: '4', child_name: 'Aisha', age: 10, sadaqah_coins: 950, jannah_points: 145 },
        { id: '5', child_name: 'Yusuf', age: 7, sadaqah_coins: 850, jannah_points: 110 }
      ]
    }
  ];

  const mockTopups = [
    {
      id: '1',
      family_name: 'The Johnson Family',
      child_name: 'Ahmed',
      amount_paid: 2000, // pence
      sadaqah_coins_added: 200,
      jannah_points_added: 50,
      topup_reason: 'Weekly allowance',
      created_at: '2024-01-25'
    },
    {
      id: '2',
      family_name: 'The Ahmad Family',
      child_name: 'Aisha',
      amount_paid: 1500,
      sadaqah_coins_added: 150,
      jannah_points_added: 30,
      topup_reason: 'Good behavior reward',
      created_at: '2024-01-24'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating family account:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      family_name: '',
      parent_email: '',
      is_active: true
    });
  };

  const toggleFamilyStatus = (familyId: string) => {
    console.log('Toggling family status:', familyId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Family Account Management</h2>
          <p className="text-muted-foreground">Manage family accounts, kids profiles, and parental controls</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Family
        </Button>
      </div>

      <Tabs defaultValue="families" className="space-y-4">
        <TabsList>
          <TabsTrigger value="families">Family Accounts</TabsTrigger>
          <TabsTrigger value="kids">Kids Profiles</TabsTrigger>
          <TabsTrigger value="topups">Top-ups & Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="families">
          <Card>
            <CardHeader>
              <CardTitle>Family Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Family</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Kids</TableHead>
                    <TableHead>Total Balance</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockFamilies.map((family) => (
                    <TableRow key={family.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{family.family_name}</div>
                          <div className="text-sm text-muted-foreground">
                            Created {new Date(family.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{family.parent_name}</div>
                          <div className="text-sm text-muted-foreground">{family.parent_email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {family.total_kids} children
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-600" />
                            {family.total_balance} coins
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Across all children
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-600" />
                          £{(family.total_donations / 100).toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={family.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                            {family.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={family.is_active}
                            onCheckedChange={() => toggleFamilyStatus(family.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedFamily(family.id)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kids">
          <Card>
            <CardHeader>
              <CardTitle>Kids Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockFamilies.map((family) => (
                  <div key={family.id} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-3">{family.family_name}</h4>
                    <div className="grid gap-3 md:grid-cols-3">
                      {family.kids_accounts.map((kid) => (
                        <Card key={kid.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="font-medium">{kid.child_name}</div>
                                <div className="text-sm text-muted-foreground">Age {kid.age}</div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1">
                                  <Coins className="h-3 w-3 text-yellow-600" />
                                  Sadaqah Coins
                                </span>
                                <span className="font-medium">{kid.sadaqah_coins}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-purple-600" />
                                  Jannah Points
                                </span>
                                <span className="font-medium">{kid.jannah_points}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="topups">
          <Card>
            <CardHeader>
              <CardTitle>Recent Top-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Family</TableHead>
                    <TableHead>Child</TableHead>
                    <TableHead>Amount Paid</TableHead>
                    <TableHead>Coins Added</TableHead>
                    <TableHead>Points Added</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTopups.map((topup) => (
                    <TableRow key={topup.id}>
                      <TableCell className="font-medium">{topup.family_name}</TableCell>
                      <TableCell>{topup.child_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          £{(topup.amount_paid / 100).toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-600" />
                          {topup.sadaqah_coins_added}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-purple-600" />
                          {topup.jannah_points_added}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{topup.topup_reason}</Badge>
                      </TableCell>
                      <TableCell>{new Date(topup.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Families</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <p className="text-sm text-muted-foreground">+12 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Kids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">345</div>
                <p className="text-sm text-muted-foreground">Average 2.7 per family</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coins in Circulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">285K</div>
                <p className="text-sm text-muted-foreground">Sadaqah coins</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Family Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">£24,680</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Family Account</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="family_name">Family Name</Label>
                <Input
                  id="family_name"
                  value={formData.family_name}
                  onChange={(e) => setFormData({ ...formData, family_name: e.target.value })}
                  placeholder="e.g., The Johnson Family"
                  required
                />
              </div>
              <div>
                <Label htmlFor="parent_email">Parent Email</Label>
                <Input
                  id="parent_email"
                  type="email"
                  value={formData.parent_email}
                  onChange={(e) => setFormData({ ...formData, parent_email: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active Account</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Family</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FamilyAccountManagement;

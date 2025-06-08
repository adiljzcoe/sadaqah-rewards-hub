
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
import { Plus, Edit, Star, Coins, TrendingUp, Settings, Zap, Target } from 'lucide-react';
import { 
  usePointsConfig, 
  useCoinsConfig, 
  useMultiplierEvents,
  useUpdatePointsConfig,
  useUpdateCoinsConfig,
  useUpdateMultiplierEvent
} from '@/hooks/useRewardsSystem';

const RewardsSystemManagement = () => {
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    value: '',
    is_active: true,
    description: ''
  });

  // Fetch data from database
  const { data: pointsConfig = [], isLoading: pointsLoading } = usePointsConfig();
  const { data: coinsConfig = [], isLoading: coinsLoading } = useCoinsConfig();
  const { data: multiplierEvents = [], isLoading: multipliersLoading } = useMultiplierEvents();

  // Mutations
  const updatePointsConfig = useUpdatePointsConfig();
  const updateCoinsConfig = useUpdateCoinsConfig();
  const updateMultiplierEvent = useUpdateMultiplierEvent();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating rewards config:', formData);
    setShowConfigForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      value: '',
      is_active: true,
      description: ''
    });
  };

  const togglePointsConfig = (configId: string, currentState: boolean) => {
    updatePointsConfig.mutate({ id: configId, is_active: !currentState });
  };

  const toggleCoinsConfig = (configId: string, currentState: boolean) => {
    updateCoinsConfig.mutate({ id: configId, is_active: !currentState });
  };

  const toggleMultiplierEvent = (eventId: string, currentState: boolean) => {
    updateMultiplierEvent.mutate({ id: eventId, is_active: !currentState });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Rewards System Management</h2>
          <p className="text-muted-foreground">Configure Jannah Points, Sadaqah Coins, multipliers, and reward mechanics</p>
        </div>
        <Button onClick={() => setShowConfigForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Configuration
        </Button>
      </div>

      <Tabs defaultValue="points" className="space-y-4">
        <TabsList>
          <TabsTrigger value="points">Jannah Points</TabsTrigger>
          <TabsTrigger value="coins">Sadaqah Coins</TabsTrigger>
          <TabsTrigger value="multipliers">Multipliers</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="points">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-purple-600" />
                Jannah Points Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pointsLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Points per £</TableHead>
                      <TableHead>Multiplier</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pointsConfig.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-medium">{config.action}</TableCell>
                        <TableCell>{config.points_per_pound}</TableCell>
                        <TableCell>
                          <Badge variant={config.multiplier > 1 ? 'default' : 'secondary'}>
                            {config.multiplier}x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={config.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                              {config.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch
                              checked={config.is_active}
                              onCheckedChange={() => togglePointsConfig(config.id, config.is_active)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {config.description}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coins">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Coins className="h-5 w-5 mr-2 text-yellow-600" />
                Sadaqah Coins Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {coinsLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Coins per £</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coinsConfig.map((config) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-medium">{config.action}</TableCell>
                        <TableCell>{config.coins_per_pound}</TableCell>
                        <TableCell>{config.conversion_rate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={config.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                              {config.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch
                              checked={config.is_active}
                              onCheckedChange={() => toggleCoinsConfig(config.id, config.is_active)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {config.description}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="multipliers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-orange-600" />
                Special Multipliers & Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {multipliersLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Name</TableHead>
                      <TableHead>Multiplier</TableHead>
                      <TableHead>Date Range</TableHead>
                      <TableHead>Applies To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {multiplierEvents.map((multiplier) => (
                      <TableRow key={multiplier.id}>
                        <TableCell className="font-medium">{multiplier.name}</TableCell>
                        <TableCell>
                          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                            {multiplier.multiplier}x
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{new Date(multiplier.start_date).toLocaleDateString()}</div>
                            <div className="text-muted-foreground">to {new Date(multiplier.end_date).toLocaleDateString()}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{multiplier.applies_to}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={multiplier.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                              {multiplier.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch
                              checked={multiplier.is_active}
                              onCheckedChange={() => toggleMultiplierEvent(multiplier.id, multiplier.is_active)}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Points Awarded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2.4M</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coins in Circulation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">845K</div>
                <p className="text-sm text-muted-foreground">Active coins</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Multiplier</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.8x</div>
                <p className="text-sm text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">34%</div>
                <p className="text-sm text-muted-foreground">Points to donations</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showConfigForm && (
        <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Rewards Configuration</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Configuration Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  type="number"
                  step="0.1"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowConfigForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default RewardsSystemManagement;

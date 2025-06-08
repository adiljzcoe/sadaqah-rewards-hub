
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
import { Plus, Edit, Flame, Shield, Calendar, Users, TrendingUp, Target, Settings } from 'lucide-react';
import { 
  useStreakConfig, 
  useUserStreaks,
  useUpdateStreakConfig,
  useGrantStreakFreeze,
  useResetUserStreak,
  useCreateStreakConfig
} from '@/hooks/useStreakSystem';

const StreakSystemManagement = () => {
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    reward_type: 'points',
    reward_value: '',
    threshold: '',
    is_active: true
  });

  // Fetch data from database
  const { data: streakConfig = [], isLoading: configLoading } = useStreakConfig();
  const { data: userStreaks = [], isLoading: streaksLoading } = useUserStreaks();

  // Mutations
  const updateStreakConfig = useUpdateStreakConfig();
  const grantFreeze = useGrantStreakFreeze();
  const resetStreak = useResetUserStreak();
  const createConfig = useCreateStreakConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createConfig.mutate({
      name: formData.name,
      reward_type: formData.reward_type,
      reward_value: parseFloat(formData.reward_value),
      threshold: parseInt(formData.threshold),
      is_active: formData.is_active
    });
    setShowConfigForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      reward_type: 'points',
      reward_value: '',
      threshold: '',
      is_active: true
    });
  };

  const toggleConfig = (configId: string, currentState: boolean) => {
    updateStreakConfig.mutate({ id: configId, is_active: !currentState });
  };

  const grantStreakFreeze = (userId: string) => {
    grantFreeze.mutate(userId);
  };

  const resetUserStreak = (userId: string) => {
    resetStreak.mutate(userId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Streak System Management</h2>
          <p className="text-muted-foreground">Configure streak rewards, freezes, and user streak management</p>
        </div>
        <Button onClick={() => setShowConfigForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Streak Rule
        </Button>
      </div>

      <Tabs defaultValue="configuration" className="space-y-4">
        <TabsList>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
          <TabsTrigger value="user-streaks">User Streaks</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="configuration">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Flame className="h-5 w-5 mr-2 text-orange-600" />
                Streak Reward Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              {configLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : streakConfig.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No streak configuration found</h3>
                  <p className="text-gray-500 mb-4">The streak configuration tables haven't been created yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Rule Name</TableHead>
                      <TableHead>Reward Type</TableHead>
                      <TableHead>Reward Value</TableHead>
                      <TableHead>Threshold</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {streakConfig.map((config: any) => (
                      <TableRow key={config.id}>
                        <TableCell className="font-medium">{config.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{config.reward_type}</Badge>
                        </TableCell>
                        <TableCell>
                          {config.reward_type === 'multiplier' ? `${config.reward_value}x` : config.reward_value}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {config.threshold} days
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={config.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                              {config.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch
                              checked={config.is_active}
                              onCheckedChange={() => toggleConfig(config.id, config.is_active)}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground max-w-xs">
                          {config.description}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" onClick={() => setSelectedConfig(config.id)}>
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

        <TabsContent value="user-streaks">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                User Streak Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              {streaksLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : userStreaks.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No user streaks found</h3>
                  <p className="text-gray-500 mb-4">The user streaks tables haven't been created yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Current Streak</TableHead>
                      <TableHead>Longest Streak</TableHead>
                      <TableHead>Freezes Left</TableHead>
                      <TableHead>Last Donation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userStreaks.map((streak: any) => (
                      <TableRow key={streak.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{streak.profiles?.full_name || 'Unknown User'}</div>
                            <div className="text-sm text-muted-foreground">{streak.profiles?.email || 'No email'}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Flame className={`h-4 w-4 ${streak.current_streak > 0 ? 'text-orange-500' : 'text-gray-400'}`} />
                            <span className="font-bold text-lg">{streak.current_streak}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Target className="h-4 w-4 text-purple-600" />
                            {streak.longest_streak}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Shield className="h-4 w-4 text-blue-600" />
                            {streak.freeze_count}
                          </div>
                        </TableCell>
                        <TableCell>
                          {streak.last_donation ? new Date(streak.last_donation).toLocaleDateString() : 'Never'}
                        </TableCell>
                        <TableCell>
                          <Badge className={streak.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                            {streak.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => grantStreakFreeze(streak.user_id)}>
                              <Shield className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => resetUserStreak(streak.user_id)}>
                              <Edit className="h-3 w-3" />
                            </Button>
                          </div>
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
                <CardTitle>Active Streaks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userStreaks.filter((s: any) => s.status === 'active').length}</div>
                <p className="text-sm text-muted-foreground">Users with active streaks</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Streak</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userStreaks.length > 0 
                    ? Math.round(userStreaks.reduce((acc: number, s: any) => acc + (s.current_streak || 0), 0) / userStreaks.length * 10) / 10
                    : 0}
                </div>
                <p className="text-sm text-muted-foreground">Days per active streak</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Longest Current</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userStreaks.length > 0 ? Math.max(...userStreaks.map((s: any) => s.current_streak || 0)) : 0}
                </div>
                <p className="text-sm text-muted-foreground">Days streak record</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Freezes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userStreaks.reduce((acc: number, s: any) => acc + (s.freeze_count || 0), 0)}
                </div>
                <p className="text-sm text-muted-foreground">Available freezes</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showConfigForm && (
        <Dialog open={showConfigForm} onOpenChange={setShowConfigForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Streak Rule</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Rule Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reward_type">Reward Type</Label>
                  <select
                    id="reward_type"
                    value={formData.reward_type}
                    onChange={(e) => setFormData({ ...formData, reward_type: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="points">Points</option>
                    <option value="multiplier">Multiplier</option>
                    <option value="freeze">Streak Freeze</option>
                    <option value="coins">Sadaqah Coins</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="reward_value">Reward Value</Label>
                  <Input
                    id="reward_value"
                    type="number"
                    step="0.1"
                    value={formData.reward_value}
                    onChange={(e) => setFormData({ ...formData, reward_value: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="threshold">Streak Threshold (Days)</Label>
                <Input
                  id="threshold"
                  type="number"
                  value={formData.threshold}
                  onChange={(e) => setFormData({ ...formData, threshold: e.target.value })}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active Rule</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowConfigForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Rule</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default StreakSystemManagement;

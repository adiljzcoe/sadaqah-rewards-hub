
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trophy, Target, Users, Medal, Award, Crown } from 'lucide-react';

const AchievementsManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    requirement_type: 'donation_count',
    requirement_value: '',
    points_reward: '',
    rarity: 'common',
    icon: '🏆',
    is_active: true
  });

  const mockAchievements = [
    {
      id: '1',
      name: 'First Steps',
      description: 'Make your first donation',
      requirement_type: 'donation_count',
      requirement_value: 1,
      points_reward: 100,
      rarity: 'common',
      icon: '🎯',
      is_active: true,
      earned_count: 2847,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'Generous Heart',
      description: 'Donate £100 in total',
      requirement_type: 'total_donated',
      requirement_value: 10000,
      points_reward: 500,
      rarity: 'rare',
      icon: '💎',
      is_active: true,
      earned_count: 456,
      created_at: '2024-01-15'
    },
    {
      id: '3',
      name: 'Weekend Warrior',
      description: 'Donate on 10 consecutive weekends',
      requirement_type: 'weekend_streak',
      requirement_value: 10,
      points_reward: 1000,
      rarity: 'epic',
      icon: '👑',
      is_active: true,
      earned_count: 89,
      created_at: '2024-01-15'
    },
    {
      id: '4',
      name: 'Big Spender',
      description: 'Make a single donation of £500',
      requirement_type: 'single_donation',
      requirement_value: 50000,
      points_reward: 2000,
      rarity: 'legendary',
      icon: '🌟',
      is_active: false,
      earned_count: 12,
      created_at: '2024-01-15'
    }
  ];

  const mockUserAchievements = [
    {
      id: '1',
      user_name: 'Sarah Johnson',
      user_email: 'sarah@example.com',
      achievement_name: 'Generous Heart',
      earned_at: '2024-01-25',
      points_awarded: 500
    },
    {
      id: '2',
      user_name: 'Ahmed Ali',
      user_email: 'ahmed@example.com',
      achievement_name: 'First Steps',
      earned_at: '2024-01-24',
      points_awarded: 100
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating achievement:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      requirement_type: 'donation_count',
      requirement_value: '',
      points_reward: '',
      rarity: 'common',
      icon: '🏆',
      is_active: true
    });
  };

  const toggleAchievement = (achievementId: string) => {
    console.log('Toggling achievement:', achievementId);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Achievements Management</h2>
          <p className="text-muted-foreground">Create and manage user achievements, rewards, and progression systems</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Achievement
        </Button>
      </div>

      <Tabs defaultValue="achievements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="user-progress">User Progress</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Library</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Requirements</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Rarity</TableHead>
                    <TableHead>Earned</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAchievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <div className="font-medium">{achievement.name}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="font-medium">{achievement.requirement_type.replace('_', ' ')}</div>
                          <div className="text-muted-foreground">
                            Value: {achievement.requirement_value}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          {achievement.points_reward} points
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRarityColor(achievement.rarity)}>
                          {achievement.rarity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {achievement.earned_count}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={achievement.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                            {achievement.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={achievement.is_active}
                            onCheckedChange={() => toggleAchievement(achievement.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedAchievement(achievement.id)}>
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

        <TabsContent value="user-progress">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievement Unlocks</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Achievement</TableHead>
                    <TableHead>Points Awarded</TableHead>
                    <TableHead>Date Earned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUserAchievements.map((userAchievement) => (
                    <TableRow key={userAchievement.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{userAchievement.user_name}</div>
                          <div className="text-sm text-muted-foreground">{userAchievement.user_email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{userAchievement.achievement_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          {userAchievement.points_awarded}
                        </div>
                      </TableCell>
                      <TableCell>{new Date(userAchievement.earned_at).toLocaleDateString()}</TableCell>
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
                <CardTitle>Total Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-sm text-muted-foreground">Active achievements</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Unlocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,404</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Points Distributed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1.2M</div>
                <p className="text-sm text-muted-foreground">Achievement points</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">68%</div>
                <p className="text-sm text-muted-foreground">Average user progress</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Achievement</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Achievement Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon (Emoji)</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="🏆"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="requirement_type">Requirement Type</Label>
                  <Select value={formData.requirement_type} onValueChange={(value) => setFormData({ ...formData, requirement_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="donation_count">Donation Count</SelectItem>
                      <SelectItem value="total_donated">Total Donated</SelectItem>
                      <SelectItem value="single_donation">Single Donation</SelectItem>
                      <SelectItem value="streak_days">Streak Days</SelectItem>
                      <SelectItem value="weekend_streak">Weekend Streak</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="requirement_value">Requirement Value</Label>
                  <Input
                    id="requirement_value"
                    type="number"
                    value={formData.requirement_value}
                    onChange={(e) => setFormData({ ...formData, requirement_value: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="points_reward">Points Reward</Label>
                  <Input
                    id="points_reward"
                    type="number"
                    value={formData.points_reward}
                    onChange={(e) => setFormData({ ...formData, points_reward: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rarity">Rarity</Label>
                  <Select value={formData.rarity} onValueChange={(value) => setFormData({ ...formData, rarity: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="common">Common</SelectItem>
                      <SelectItem value="rare">Rare</SelectItem>
                      <SelectItem value="epic">Epic</SelectItem>
                      <SelectItem value="legendary">Legendary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active Achievement</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Achievement</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AchievementsManagement;

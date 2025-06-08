
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
import { Plus, Edit, Heart, Users, TrendingUp, BookOpen, Calendar, Target } from 'lucide-react';

const SpiritualActivitiesManagement = () => {
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    type: 'prayer',
    points_reward: '',
    emoji: '🤲',
    description: '',
    is_active: true
  });

  const mockActivities = [
    {
      id: '1',
      name: 'Fajr Prayer',
      type: 'prayer',
      points_reward: 50,
      emoji: '🌅',
      daily_participants: 1250,
      weekly_participants: 6847,
      is_active: true,
      trending: true
    },
    {
      id: '2',
      name: 'Quran Recitation',
      type: 'quran',
      points_reward: 30,
      emoji: '📖',
      daily_participants: 890,
      weekly_participants: 4523,
      is_active: true,
      trending: false
    },
    {
      id: '3',
      name: 'Dhikr Session',
      type: 'dhikr',
      points_reward: 25,
      emoji: '🌙',
      daily_participants: 456,
      weekly_participants: 2890,
      is_active: true,
      trending: true
    },
    {
      id: '4',
      name: 'Charity Donation',
      type: 'charity',
      points_reward: 75,
      emoji: '💰',
      daily_participants: 234,
      weekly_participants: 1567,
      is_active: true,
      trending: false
    }
  ];

  const mockUserActivities = [
    {
      id: '1',
      user_name: 'Sarah Johnson',
      activity_name: 'Fajr Prayer',
      completed_at: '2024-01-26 05:30:00',
      points_earned: 50,
      streak_count: 15
    },
    {
      id: '2',
      user_name: 'Ahmed Ali',
      activity_name: 'Quran Recitation',
      completed_at: '2024-01-26 20:15:00',
      points_earned: 30,
      streak_count: 8
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating spiritual activity:', formData);
    setShowActivityForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'prayer',
      points_reward: '',
      emoji: '🤲',
      description: '',
      is_active: true
    });
  };

  const toggleActivity = (activityId: string) => {
    console.log('Toggling activity:', activityId);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prayer': return 'bg-green-500';
      case 'quran': return 'bg-purple-500';
      case 'dhikr': return 'bg-blue-500';
      case 'charity': return 'bg-orange-500';
      case 'dua': return 'bg-indigo-500';
      case 'fasting': return 'bg-yellow-500';
      case 'learning': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Spiritual Activities Management</h2>
          <p className="text-muted-foreground">Manage spiritual activities, tracking, and community engagement</p>
        </div>
        <Button onClick={() => setShowActivityForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Activity
        </Button>
      </div>

      <Tabs defaultValue="activities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="user-tracking">User Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Spiritual Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Points Reward</TableHead>
                    <TableHead>Daily Participants</TableHead>
                    <TableHead>Weekly Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{activity.emoji}</div>
                          <div>
                            <div className="font-medium">{activity.name}</div>
                            {activity.trending && (
                              <Badge className="bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Trending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(activity.type)}>
                          {activity.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-purple-600" />
                          {activity.points_reward}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          {activity.daily_participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-green-600" />
                          {activity.weekly_participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={activity.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                            {activity.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={activity.is_active}
                            onCheckedChange={() => toggleActivity(activity.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedActivity(activity.id)}>
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

        <TabsContent value="user-tracking">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                Recent User Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Completed At</TableHead>
                    <TableHead>Points Earned</TableHead>
                    <TableHead>Streak Count</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUserActivities.map((userActivity) => (
                    <TableRow key={userActivity.id}>
                      <TableCell className="font-medium">{userActivity.user_name}</TableCell>
                      <TableCell>{userActivity.activity_name}</TableCell>
                      <TableCell>{new Date(userActivity.completed_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4 text-purple-600" />
                          {userActivity.points_earned}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{userActivity.streak_count} days</Badge>
                      </TableCell>
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
                <CardTitle>Total Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <p className="text-sm text-muted-foreground">Available activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Daily Participation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,830</div>
                <p className="text-sm text-muted-foreground">Activities completed today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Points Distributed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">142,500</div>
                <p className="text-sm text-muted-foreground">Through activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Most Popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">🌅</div>
                <p className="text-sm text-muted-foreground">Fajr Prayer</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showActivityForm && (
        <Dialog open={showActivityForm} onOpenChange={setShowActivityForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Spiritual Activity</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Activity Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emoji">Icon (Emoji)</Label>
                  <Input
                    id="emoji"
                    value={formData.emoji}
                    onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                    placeholder="🤲"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Activity Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="prayer">Prayer</option>
                    <option value="quran">Quran</option>
                    <option value="dhikr">Dhikr</option>
                    <option value="charity">Charity</option>
                    <option value="dua">Dua</option>
                    <option value="fasting">Fasting</option>
                    <option value="learning">Learning</option>
                  </select>
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
                <Label htmlFor="is_active">Active Activity</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowActivityForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Activity</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SpiritualActivitiesManagement;

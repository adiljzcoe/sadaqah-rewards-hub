
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
import { Plus, Edit, Heart, Users, TrendingUp, BookOpen, Calendar, Target, Settings } from 'lucide-react';

// Mock data for now since the tables don't exist in the schema
const mockActivities = [
  {
    id: '1',
    name: 'Morning Prayer',
    type: 'prayer',
    points_reward: 10,
    emoji: '🤲',
    description: 'Complete your morning prayer',
    is_active: true
  },
  {
    id: '2', 
    name: 'Quran Reading',
    type: 'quran',
    points_reward: 15,
    emoji: '📖',
    description: 'Read Quran for 10 minutes',
    is_active: true
  }
];

const mockUserActivities = [
  {
    id: '1',
    completed_at: new Date().toISOString(),
    points_earned: 10,
    streak_count: 5,
    profiles: { full_name: 'Ahmad Ali' },
    spiritual_activities: { emoji: '🤲', name: 'Morning Prayer' }
  }
];

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

  // Using mock data since tables don't exist
  const activities = mockActivities;
  const userActivities = mockUserActivities;
  const activitiesLoading = false;
  const userActivitiesLoading = false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating activity:', formData);
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

  const toggleActivity = (activityId: string, currentState: boolean) => {
    console.log('Toggling activity:', activityId, !currentState);
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
              {activitiesLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : activities.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No spiritual activities found</h3>
                  <p className="text-gray-500 mb-4">The spiritual activities tables haven't been created yet.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Activity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Points Reward</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{activity.emoji}</div>
                            <div>
                              <div className="font-medium">{activity.name}</div>
                              <div className="text-sm text-muted-foreground">{activity.description}</div>
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
                          <div className="flex items-center gap-2">
                            <Badge className={activity.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                              {activity.is_active ? 'Active' : 'Inactive'}
                            </Badge>
                            <Switch
                              checked={activity.is_active}
                              onCheckedChange={() => toggleActivity(activity.id, activity.is_active)}
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
              )}
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
              {userActivitiesLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : userActivities.length === 0 ? (
                <div className="text-center py-8">
                  <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No user activities found</h3>
                  <p className="text-gray-500 mb-4">The user spiritual activities tables haven't been created yet.</p>
                </div>
              ) : (
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
                    {userActivities.map((userActivity) => (
                      <TableRow key={userActivity.id}>
                        <TableCell className="font-medium">
                          {userActivity.profiles?.full_name || 'Unknown User'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{userActivity.spiritual_activities?.emoji}</span>
                            {userActivity.spiritual_activities?.name}
                          </div>
                        </TableCell>
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
              )}
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
                <div className="text-3xl font-bold">{activities.length}</div>
                <p className="text-sm text-muted-foreground">Available activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Participations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userActivities.length}</div>
                <p className="text-sm text-muted-foreground">Activities completed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Points Distributed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {userActivities.reduce((acc, ua) => acc + (ua.points_earned || 0), 0)}
                </div>
                <p className="text-sm text-muted-foreground">Through activities</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Most Popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {activities.length > 0 ? activities[0].emoji : '🤲'}
                </div>
                <p className="text-sm text-muted-foreground">
                  {activities.length > 0 ? activities[0].name : 'No activities'}
                </p>
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

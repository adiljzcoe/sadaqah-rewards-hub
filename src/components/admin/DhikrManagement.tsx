
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
import { Plus, Edit, Trash2, Users, Clock, Target, Play, Trophy, Calendar } from 'lucide-react';

const DhikrManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('events');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dhikr_type: 'SubhanAllah',
    target_count: 1000,
    start_time: '',
    end_time: '',
    jannah_points_reward: 10,
    bonus_multiplier: 1.0,
    is_recurring: false,
    recurrence_pattern: ''
  });

  const mockEvents = [
    {
      id: '1',
      title: 'Morning Dhikr Session',
      dhikr_type: 'SubhanAllah',
      target_count: 1000,
      current_count: 750,
      participants: 45,
      start_time: '2024-01-26 07:00:00',
      end_time: '2024-01-26 08:00:00',
      is_active: true,
      is_recurring: true,
      jannah_points_reward: 25
    },
    {
      id: '2',
      title: 'Evening Istighfar',
      dhikr_type: 'Astaghfirullah',
      target_count: 500,
      current_count: 320,
      participants: 28,
      start_time: '2024-01-26 20:00:00',
      end_time: '2024-01-26 21:00:00',
      is_active: true,
      is_recurring: false,
      jannah_points_reward: 15
    }
  ];

  const mockAchievements = [
    {
      id: '1',
      title: 'Dhikr Master',
      description: 'Complete 10,000 dhikr in a month',
      requirement_type: 'monthly_count',
      requirement_value: 10000,
      badge_icon: 'star',
      badge_color: 'bg-yellow-500',
      jannah_points_reward: 100,
      users_achieved: 23
    },
    {
      id: '2',
      title: 'Consistent Worshipper',
      description: 'Participate in dhikr for 30 consecutive days',
      requirement_type: 'consecutive_days',
      requirement_value: 30,
      badge_icon: 'calendar',
      badge_color: 'bg-green-500',
      jannah_points_reward: 75,
      users_achieved: 45
    }
  ];

  const dhikrTypes = [
    'SubhanAllah',
    'Alhamdulillah',
    'Allahu Akbar',
    'La ilaha illa Allah',
    'Astaghfirullah',
    'Subhan Allah wa bihamdihi',
    'La hawla wa la quwwata illa billah'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating dhikr event:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      dhikr_type: 'SubhanAllah',
      target_count: 1000,
      start_time: '',
      end_time: '',
      jannah_points_reward: 10,
      bonus_multiplier: 1.0,
      is_recurring: false,
      recurrence_pattern: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dhikr Management</h2>
          <p className="text-muted-foreground">Manage dhikr events, community sessions, and achievements</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="events">Dhikr Events</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Dhikr Events Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Dhikr Type</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {event.jannah_points_reward} Jannah Points
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.dhikr_type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            <span className="text-sm">
                              {event.current_count} / {event.target_count}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(event.current_count / event.target_count) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {event.participants}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="h-3 w-3" />
                            {new Date(event.start_time).toLocaleTimeString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            to {new Date(event.end_time).toLocaleTimeString()}
                          </div>
                          {event.is_recurring && (
                            <Badge variant="secondary" className="text-xs">Recurring</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={event.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                          {event.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
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

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Dhikr Achievements</CardTitle>
              <Button onClick={() => setShowCreateForm(true)} className="w-fit">
                <Plus className="h-4 w-4 mr-2" />
                Create Achievement
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {mockAchievements.map((achievement) => (
                  <Card key={achievement.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full ${achievement.badge_color} flex items-center justify-center`}>
                            <Trophy className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{achievement.title}</div>
                            <div className="text-sm text-muted-foreground">{achievement.description}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {achievement.jannah_points_reward} Jannah Points • {achievement.users_achieved} users achieved
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboards">
          <Card>
            <CardHeader>
              <CardTitle>Dhikr Leaderboards</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Community dhikr leaderboards</p>
                <p className="text-sm">Track top performers and community engagement</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12</div>
                <p className="text-sm text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dhikr Count</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">485K</div>
                <p className="text-sm text-muted-foreground">Total recitations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Achievements Earned</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">298</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Dhikr Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dhikr_type">Dhikr Type</Label>
                  <Select value={formData.dhikr_type} onValueChange={(value) => setFormData({ ...formData, dhikr_type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dhikrTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="target_count">Target Count</Label>
                  <Input
                    id="target_count"
                    type="number"
                    value={formData.target_count}
                    onChange={(e) => setFormData({ ...formData, target_count: parseInt(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="datetime-local"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    type="datetime-local"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jannah_points_reward">Jannah Points Reward</Label>
                  <Input
                    id="jannah_points_reward"
                    type="number"
                    value={formData.jannah_points_reward}
                    onChange={(e) => setFormData({ ...formData, jannah_points_reward: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
                <div>
                  <Label htmlFor="bonus_multiplier">Bonus Multiplier</Label>
                  <Input
                    id="bonus_multiplier"
                    type="number"
                    step="0.1"
                    value={formData.bonus_multiplier}
                    onChange={(e) => setFormData({ ...formData, bonus_multiplier: parseFloat(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_recurring"
                  checked={formData.is_recurring}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_recurring: checked })}
                />
                <Label htmlFor="is_recurring">Recurring Event</Label>
              </div>

              {formData.is_recurring && (
                <div>
                  <Label htmlFor="recurrence_pattern">Recurrence Pattern</Label>
                  <Select value={formData.recurrence_pattern} onValueChange={(value) => setFormData({ ...formData, recurrence_pattern: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pattern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Event</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DhikrManagement;

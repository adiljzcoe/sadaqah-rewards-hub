
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
import { Plus, Edit, Trophy, Crown, Users, TrendingUp, Medal, Award } from 'lucide-react';

const LeagueSystemManagement = () => {
  const [showLeagueForm, setShowLeagueForm] = useState(false);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    min_points: '',
    max_points: '',
    icon: '🏆',
    color: '#3B82F6',
    reward_multiplier: '',
    is_active: true
  });

  const mockLeagues = [
    {
      id: '1',
      name: 'Bronze Believer',
      min_points: 0,
      max_points: 999,
      icon: '🥉',
      color: '#CD7F32',
      reward_multiplier: 1.0,
      user_count: 1245,
      is_active: true
    },
    {
      id: '2',
      name: 'Silver Supporter',
      min_points: 1000,
      max_points: 4999,
      icon: '🥈',
      color: '#C0C0C0',
      reward_multiplier: 1.2,
      user_count: 847,
      is_active: true
    },
    {
      id: '3',
      name: 'Gold Guardian',
      min_points: 5000,
      max_points: 14999,
      icon: '🥇',
      color: '#FFD700',
      reward_multiplier: 1.5,
      user_count: 356,
      is_active: true
    },
    {
      id: '4',
      name: 'Diamond Defender',
      min_points: 15000,
      max_points: 49999,
      icon: '💎',
      color: '#B9F2FF',
      reward_multiplier: 2.0,
      user_count: 89,
      is_active: true
    },
    {
      id: '5',
      name: 'Champion of Charity',
      min_points: 50000,
      max_points: 999999,
      icon: '👑',
      color: '#8B5CF6',
      reward_multiplier: 3.0,
      user_count: 12,
      is_active: true
    }
  ];

  const mockLeaderboard = [
    {
      id: '1',
      user_name: 'Sarah Johnson',
      league: 'Champion of Charity',
      points: 87450,
      rank: 1,
      city: 'London',
      donations_this_month: 15
    },
    {
      id: '2',
      user_name: 'Ahmed Al-Rashid',
      league: 'Diamond Defender',
      points: 45670,
      rank: 2,
      city: 'Birmingham',
      donations_this_month: 12
    },
    {
      id: '3',
      user_name: 'Fatima Hassan',
      league: 'Diamond Defender',
      points: 32180,
      rank: 3,
      city: 'Manchester',
      donations_this_month: 18
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating league:', formData);
    setShowLeagueForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      min_points: '',
      max_points: '',
      icon: '🏆',
      color: '#3B82F6',
      reward_multiplier: '',
      is_active: true
    });
  };

  const toggleLeague = (leagueId: string) => {
    console.log('Toggling league:', leagueId);
  };

  const recalculateRankings = () => {
    console.log('Recalculating league rankings...');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">League System Management</h2>
          <p className="text-muted-foreground">Manage user leagues, rankings, and competitive elements</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={recalculateRankings}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Recalculate Rankings
          </Button>
          <Button onClick={() => setShowLeagueForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create League
          </Button>
        </div>
      </div>

      <Tabs defaultValue="leagues" className="space-y-4">
        <TabsList>
          <TabsTrigger value="leagues">League Tiers</TabsTrigger>
          <TabsTrigger value="leaderboard">Global Leaderboard</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="leagues">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                League Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>League</TableHead>
                    <TableHead>Point Range</TableHead>
                    <TableHead>Multiplier</TableHead>
                    <TableHead>Users</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeagues.map((league) => (
                    <TableRow key={league.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{league.icon}</div>
                          <div>
                            <div className="font-medium" style={{ color: league.color }}>
                              {league.name}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{league.min_points.toLocaleString()} - {league.max_points.toLocaleString()}</div>
                          <div className="text-muted-foreground">points</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                          {league.reward_multiplier}x
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {league.user_count}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={league.is_active ? 'bg-green-500' : 'bg-gray-500'}>
                            {league.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                          <Switch
                            checked={league.is_active}
                            onCheckedChange={() => toggleLeague(league.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => setSelectedLeague(league.id)}>
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

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Crown className="h-5 w-5 mr-2 text-purple-600" />
                Global Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>League</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>This Month</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockLeaderboard.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user.rank <= 3 && (
                            <div className="text-xl">
                              {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : '🥉'}
                            </div>
                          )}
                          <span className="font-bold">#{user.rank}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{user.user_name}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.league}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          {user.points.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>{user.city}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Medal className="h-4 w-4 text-blue-600" />
                          {user.donations_this_month} donations
                        </div>
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
                <CardTitle>Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2,549</div>
                <p className="text-sm text-muted-foreground">Across all leagues</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Most Popular League</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">Bronze</div>
                <p className="text-sm text-muted-foreground">1,245 users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3,247</div>
                <p className="text-sm text-muted-foreground">Per active user</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>League Promotions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">89</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showLeagueForm && (
        <Dialog open={showLeagueForm} onOpenChange={setShowLeagueForm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New League</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">League Name</Label>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="min_points">Minimum Points</Label>
                  <Input
                    id="min_points"
                    type="number"
                    value={formData.min_points}
                    onChange={(e) => setFormData({ ...formData, min_points: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="max_points">Maximum Points</Label>
                  <Input
                    id="max_points"
                    type="number"
                    value={formData.max_points}
                    onChange={(e) => setFormData({ ...formData, max_points: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">League Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="reward_multiplier">Reward Multiplier</Label>
                  <Input
                    id="reward_multiplier"
                    type="number"
                    step="0.1"
                    value={formData.reward_multiplier}
                    onChange={(e) => setFormData({ ...formData, reward_multiplier: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active League</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowLeagueForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create League</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LeagueSystemManagement;

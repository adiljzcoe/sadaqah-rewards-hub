import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, DollarSign, Trophy, Building2, Activity, TrendingUp, BarChart3, Mail, Package, UserCheck, Calendar } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import DashboardCharts from '@/components/admin/DashboardCharts';
import ProductManagement from '@/components/admin/ProductManagement';
import EmailMarketing from '@/components/admin/EmailMarketing';
import AffiliateSystem from '@/components/admin/AffiliateSystem';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is admin or fake admin
  const isFakeAdmin = user?.id === 'fake-admin-id';
  
  const { data: userProfile, isLoading: profileLoading } = useQuery({
    queryKey: ['user-profile', user?.id],
    queryFn: async () => {
      if (!user?.id || isFakeAdmin) {
        return { role: 'admin', full_name: 'Test Admin', email: 'admin@test.com' };
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  // Get dashboard stats
  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      if (isFakeAdmin) {
        return {
          users: 1247,
          donations: 3456,
          charities: 89,
          totalRaised: 125000,
          memberships: 856,
          affiliates: 127,
          conversionRate: 2.7
        };
      }
      
      const [usersRes, donationsRes, charitiesRes, totalRaisedRes] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('donations').select('*', { count: 'exact', head: true }),
        supabase.from('charities').select('*', { count: 'exact', head: true }),
        supabase.from('donations').select('amount').eq('status', 'completed')
      ]);

      const totalRaised = totalRaisedRes.data?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0;

      return {
        users: usersRes.count || 0,
        donations: donationsRes.count || 0,
        charities: charitiesRes.count || 0,
        totalRaised: totalRaised,
        memberships: 856, // Mock data for now
        affiliates: 127, // Mock data for now
        conversionRate: 2.7 // Mock data for now
      };
    },
    enabled: userProfile?.role === 'admin',
  });

  // Get recent donations
  const { data: recentDonations } = useQuery({
    queryKey: ['recent-donations'],
    queryFn: async () => {
      if (isFakeAdmin) {
        return [
          {
            id: '1',
            amount: 100,
            status: 'completed',
            created_at: new Date().toISOString(),
            profiles: { full_name: 'John Doe', email: 'john@example.com' },
            charities: { name: 'Children\'s Hospital' }
          },
          {
            id: '2',
            amount: 250,
            status: 'completed',
            created_at: new Date().toISOString(),
            profiles: { full_name: 'Jane Smith', email: 'jane@example.com' },
            charities: { name: 'Water Wells Foundation' }
          },
          {
            id: '3',
            amount: 75,
            status: 'pending',
            created_at: new Date().toISOString(),
            profiles: { full_name: 'Ahmad M.', email: 'ahmad@example.com' },
            charities: { name: 'Orphanage Support' }
          }
        ];
      }
      
      const { data, error } = await supabase
        .from('donations')
        .select(`
          *,
          profiles(full_name, email),
          charities(name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      if (error) throw error;
      return data;
    },
    enabled: userProfile?.role === 'admin',
  });

  // Get all users
  const { data: users } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      if (isFakeAdmin) {
        return [
          {
            id: '1',
            full_name: 'Ahmad M.',
            email: 'ahmad@example.com',
            role: 'user',
            jannah_points: 5632,
            total_donated: 1200,
            created_at: '2024-01-15T00:00:00Z'
          },
          {
            id: '2',
            full_name: 'Sarah Johnson',
            email: 'sarah@example.com',
            role: 'user',
            jannah_points: 3401,
            total_donated: 850,
            created_at: '2024-02-20T00:00:00Z'
          },
          {
            id: '3',
            full_name: 'Test Admin',
            email: 'admin@test.com',
            role: 'admin',
            jannah_points: 0,
            total_donated: 0,
            created_at: '2024-01-01T00:00:00Z'
          }
        ];
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: userProfile?.role === 'admin' && activeTab === 'users',
  });

  // Get all charities
  const { data: charities } = useQuery({
    queryKey: ['all-charities'],
    queryFn: async () => {
      if (isFakeAdmin) {
        return [
          {
            id: '1',
            name: 'Children\'s Hospital Foundation',
            category: 'healthcare',
            country: 'United Kingdom',
            verified: true,
            total_raised: 45000,
            created_at: '2024-01-10T00:00:00Z'
          },
          {
            id: '2',
            name: 'Water Wells International',
            category: 'water',
            country: 'Kenya',
            verified: true,
            total_raised: 32000,
            created_at: '2024-01-15T00:00:00Z'
          },
          {
            id: '3',
            name: 'Orphanage Support Network',
            category: 'children',
            country: 'Bangladesh',
            verified: false,
            total_raised: 18500,
            created_at: '2024-02-01T00:00:00Z'
          }
        ];
      }
      
      const { data, error } = await supabase
        .from('charities')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: userProfile?.role === 'admin' && activeTab === 'charities',
  });

  if (profileLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user || userProfile?.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Administrator
          </Badge>
          {isFakeAdmin && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              Test Mode
            </Badge>
          )}
        </div>
      </div>

      {/* Enhanced Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.users || 0}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{stats?.totalRaised?.toLocaleString() || 0}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.memberships || 0}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affiliate Partners</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.affiliates || 0}</div>
            <p className="text-xs text-muted-foreground">+8 new this month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="charities" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Charities
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="affiliates" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Affiliates
          </TabsTrigger>
          <TabsTrigger value="seasonal" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Seasonal
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
              <CardDescription>Latest charitable contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Charity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentDonations?.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>{donation.profiles?.full_name || 'Anonymous'}</TableCell>
                      <TableCell>{donation.charities?.name}</TableCell>
                      <TableCell>£{Number(donation.amount).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={donation.status === 'completed' ? 'default' : 'secondary'}>
                          {donation.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <DashboardCharts />
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage platform users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Jannah Points</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users?.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'destructive' : 'default'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.jannah_points}</TableCell>
                      <TableCell>£{Number(user.total_donated || 0).toFixed(2)}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <ProductManagement />
        </TabsContent>
        
        <TabsContent value="charities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Charity Management</CardTitle>
              <CardDescription>Manage partner charities and verification status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Verified</TableHead>
                    <TableHead>Total Raised</TableHead>
                    <TableHead>Added</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charities?.map((charity) => (
                    <TableRow key={charity.id}>
                      <TableCell className="font-medium">{charity.name}</TableCell>
                      <TableCell>{charity.category}</TableCell>
                      <TableCell>{charity.country}</TableCell>
                      <TableCell>
                        <Badge variant={charity.verified ? 'default' : 'secondary'}>
                          {charity.verified ? 'Verified' : 'Pending'}
                        </Badge>
                      </TableCell>
                      <TableCell>£{Number(charity.total_raised || 0).toLocaleString()}</TableCell>
                      <TableCell>{new Date(charity.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4">
          <EmailMarketing />
        </TabsContent>
        
        <TabsContent value="affiliates" className="space-y-4">
          <AffiliateSystem />
        </TabsContent>
        
        <TabsContent value="seasonal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Campaigns</CardTitle>
              <CardDescription>Manage Ramadan and Qurbani special campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Seasonal Campaign Management</h3>
                <p className="text-muted-foreground mb-4">
                  Set up and manage special campaigns for Ramadan, Qurbani, and other Islamic occasions
                </p>
                <Button>Create Seasonal Campaign</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;

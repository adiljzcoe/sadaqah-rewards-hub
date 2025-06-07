import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, UserPlus, TrendingDown, Crown, Search, Filter, Download, Mail, MessageSquare } from 'lucide-react';
import { useAdvancedUserManagement } from '@/hooks/useAdvancedUserManagement';

const AdvancedUserManagement = () => {
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { userSegments, vipDonors, donationSegments, isLoading, error } = useAdvancedUserManagement();

  // Keep existing static data for charts and other visualizations
  const donorJourneyData = [
    { stage: 'Awareness', users: 100, conversion: 35 },
    { stage: 'Interest', users: 35, conversion: 60 },
    { stage: 'First Donation', users: 21, conversion: 45 },
    { stage: 'Regular Donor', users: 9.5, conversion: 80 },
    { stage: 'VIP Donor', users: 7.6, conversion: 95 }
  ];

  const retentionData = [
    { month: 'Month 1', cohort1: 100, cohort2: 100, cohort3: 100 },
    { month: 'Month 2', cohort1: 85, cohort2: 88, cohort3: 92 },
    { month: 'Month 3', cohort1: 72, cohort2: 76, cohort3: 84 },
    { month: 'Month 6', cohort1: 45, cohort2: 52, cohort3: 68 },
    { month: 'Month 12', cohort1: 28, cohort2: 35, cohort3: 48 }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'High': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Advanced User Management</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center py-8">
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Advanced User Management</h2>
        </div>
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-600">Error loading user data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Advanced User Management</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Bulk Operations
          </Button>
        </div>
      </div>

      {/* User Segments Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {userSegments?.map((segment) => (
          <Card key={segment.id} className={`cursor-pointer transition-colors ${selectedSegment === segment.id ? 'ring-2 ring-blue-500' : ''}`} onClick={() => setSelectedSegment(segment.id)}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">{segment.name}</p>
                <p className="text-2xl font-bold">{segment.count.toLocaleString()}</p>
                <Badge variant={segment.growth.startsWith('+') ? 'default' : 'destructive'} className="text-xs">
                  {segment.growth}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="segmentation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="segmentation">User Segmentation</TabsTrigger>
          <TabsTrigger value="journey">Donor Journey</TabsTrigger>
          <TabsTrigger value="retention">Retention & Churn</TabsTrigger>
          <TabsTrigger value="vip">VIP Management</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="segmentation">
          <Card>
            <CardHeader>
              <CardTitle>User Segmentation & Advanced Filtering</CardTitle>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donation_amount">Donation Amount</SelectItem>
                    <SelectItem value="last_activity">Last Activity</SelectItem>
                    <SelectItem value="location">Location</SelectItem>
                    <SelectItem value="join_date">Join Date</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Donation Behavior Segments</h4>
                    <div className="space-y-3">
                      {donationSegments?.map((segment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{segment.name}</p>
                            <p className="text-sm text-gray-600">{segment.count.toLocaleString()} users</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{segment.percentage}%</p>
                            <Progress value={segment.percentage} className="h-2 w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-4">Geographic Distribution</h4>
                    <div className="space-y-3">
                      {[
                        { country: 'United Kingdom', users: 1225000, percentage: 50 },
                        { country: 'United States', users: 490000, percentage: 20 },
                        { country: 'Canada', users: 245000, percentage: 10 },
                        { country: 'Australia', users: 147000, percentage: 6 },
                        { country: 'Germany', users: 98000, percentage: 4 },
                        { country: 'Others', users: 245000, percentage: 10 }
                      ].map((country, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{country.country}</p>
                            <p className="text-sm text-gray-600">{country.users.toLocaleString()} users</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{country.percentage}%</p>
                            <Progress value={country.percentage} className="h-2 w-20" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey">
          <Card>
            <CardHeader>
              <CardTitle>Donor Journey Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={donorJourneyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" name="Users %" />
                  <Line type="monotone" dataKey="conversion" stroke="#82ca9d" name="Conversion Rate %" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention">
          <Card>
            <CardHeader>
              <CardTitle>Retention & Churn Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={retentionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cohort1" stroke="#8884d8" name="Q1 2024" />
                    <Line type="monotone" dataKey="cohort2" stroke="#82ca9d" name="Q2 2024" />
                    <Line type="monotone" dataKey="cohort3" stroke="#ffc658" name="Q3 2024" />
                  </LineChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-medium text-red-800">High Churn Risk</h4>
                    <p className="text-2xl font-bold text-red-600">
                      {userSegments?.find(s => s.id === 'churn_risk')?.count?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-red-600">Users at risk of churning</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Declining Engagement</h4>
                    <p className="text-2xl font-bold text-yellow-600">
                      {userSegments?.find(s => s.id === 'dormant')?.count?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-yellow-600">Reduced activity detected</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Loyal Supporters</h4>
                    <p className="text-2xl font-bold text-green-600">
                      {userSegments?.find(s => s.id === 'active')?.count?.toLocaleString() || '0'}
                    </p>
                    <p className="text-sm text-green-600">High retention rate</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vip">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-yellow-600" />
                VIP Donor Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Donor</TableHead>
                    <TableHead>Total Donated</TableHead>
                    <TableHead>Last Donation</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vipDonors?.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">{donor.name}</TableCell>
                      <TableCell>£{donor.totalDonated.toLocaleString()}</TableCell>
                      <TableCell>{donor.lastDonation}</TableCell>
                      <TableCell>
                        <Badge className={getTierColor(donor.tier)}>
                          {donor.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getRiskColor(donor.riskScore)}>
                          {donor.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3" />
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

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk User Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Bulk Actions</h4>
                    <div className="space-y-3">
                      <Button className="w-full justify-start">
                        <Mail className="h-4 w-4 mr-2" />
                        Send Bulk Email Campaign
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Update User Segments
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <TrendingDown className="h-4 w-4 mr-2" />
                        Export User Data
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Crown className="h-4 w-4 mr-2" />
                        Upgrade VIP Status
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Bulk Operations</h4>
                    <div className="space-y-3">
                      {[
                        { operation: 'Email Campaign: Ramadan Appeal', status: 'Completed', count: 125000, time: '2 hours ago' },
                        { operation: 'Segment Update: High-Value Donors', status: 'Running', count: 8500, time: '30 min ago' },
                        { operation: 'Data Export: Q1 Analytics', status: 'Completed', count: 2450000, time: '1 day ago' }
                      ].map((op, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{op.operation}</p>
                              <p className="text-sm text-gray-600">{op.count.toLocaleString()} users affected</p>
                            </div>
                            <div className="text-right">
                              <Badge variant={op.status === 'Completed' ? 'default' : 'secondary'}>
                                {op.status}
                              </Badge>
                              <p className="text-xs text-gray-500 mt-1">{op.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedUserManagement;

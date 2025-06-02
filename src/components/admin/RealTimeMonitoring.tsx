
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, Globe, Server, Zap, DollarSign, Users, Clock } from 'lucide-react';

const RealTimeMonitoring = () => {
  const [metrics, setMetrics] = useState({
    donationsPerSecond: 45.2,
    totalDonationsToday: 125420,
    systemHealth: 98.5,
    apiResponseTime: 142,
    activeUsers: 15420,
    errorRate: 0.02,
    conversionRate: 3.8,
    averageDonation: 85.50
  });

  const [alerts] = useState([
    { type: 'warning', message: 'API response time above 150ms', time: '2 min ago' },
    { type: 'info', message: 'Peak donation period started', time: '5 min ago' },
    { type: 'success', message: 'Database performance optimized', time: '12 min ago' }
  ]);

  const donationVelocity = [
    { time: '00:00', donations: 120, amount: 8500 },
    { time: '04:00', donations: 85, amount: 6200 },
    { time: '08:00', donations: 240, amount: 18500 },
    { time: '12:00', donations: 380, amount: 28200 },
    { time: '16:00', donations: 420, amount: 32100 },
    { time: '20:00', donations: 350, amount: 26800 },
    { time: '24:00', donations: 280, amount: 21500 }
  ];

  const systemMetrics = [
    { metric: 'CPU Usage', value: 68, status: 'good' },
    { metric: 'Memory Usage', value: 72, status: 'good' },
    { metric: 'Database Load', value: 45, status: 'excellent' },
    { metric: 'API Throughput', value: 89, status: 'warning' },
    { metric: 'Payment Gateway', value: 99, status: 'excellent' },
    { metric: 'CDN Performance', value: 94, status: 'good' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Real-Time Monitoring</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600 font-medium">Live</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Donations/Second</p>
                <p className="text-2xl font-bold text-green-600">{metrics.donationsPerSecond}</p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Donations</p>
                <p className="text-2xl font-bold">{metrics.totalDonationsToday.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Users</p>
                <p className="text-2xl font-bold">{metrics.activeUsers.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-green-600">{metrics.systemHealth}%</p>
              </div>
              <Server className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            System Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(alert.type)}>
                    {alert.type}
                  </Badge>
                  <span>{alert.message}</span>
                </div>
                <span className="text-sm text-gray-500">{alert.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="velocity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="velocity">Donation Velocity</TabsTrigger>
          <TabsTrigger value="system">System Performance</TabsTrigger>
          <TabsTrigger value="geography">Geographic Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="velocity">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Donation Velocity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={donationVelocity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="donations" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{metric.metric}</span>
                      <Badge className={getStatusColor(metric.status)}>
                        {metric.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={metric.value} className="h-2" />
                      <span className="text-sm text-gray-600">{metric.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geography">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Top Regions by Donations</h4>
                  {[
                    { region: 'United Kingdom', donations: 45280, percentage: 35 },
                    { region: 'United States', donations: 32150, percentage: 25 },
                    { region: 'Canada', donations: 18920, percentage: 15 },
                    { region: 'Australia', donations: 12640, percentage: 10 },
                    { region: 'Germany', donations: 9480, percentage: 8 }
                  ].map((region, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-gray-600">{region.donations.toLocaleString()} donations</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{region.percentage}%</p>
                        <Progress value={region.percentage} className="h-2 w-20" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-100 rounded-lg flex items-center justify-center h-64">
                  <p className="text-gray-500">Interactive World Map</p>
                  <Globe className="h-8 w-8 ml-2 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RealTimeMonitoring;

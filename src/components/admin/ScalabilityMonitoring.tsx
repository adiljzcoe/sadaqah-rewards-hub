
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Server, Database, Zap, Globe, AlertTriangle, TrendingUp, Activity, Clock } from 'lucide-react';

const ScalabilityMonitoring = () => {
  const [autoScalingEnabled, setAutoScalingEnabled] = useState(true);

  const systemMetrics = {
    currentLoad: 68,
    peakLoad: 95,
    averageResponseTime: 142,
    errorRate: 0.02,
    activeConnections: 15420,
    queueLength: 23,
    cdnHitRate: 94.5,
    databaseConnections: 450
  };

  const performanceData = [
    { time: '00:00', cpu: 45, memory: 62, network: 30, database: 40 },
    { time: '04:00', cpu: 35, memory: 58, network: 25, database: 35 },
    { time: '08:00', cpu: 75, memory: 70, network: 60, database: 65 },
    { time: '12:00', cpu: 85, memory: 78, network: 75, database: 80 },
    { time: '16:00', cpu: 90, memory: 82, network: 80, database: 85 },
    { time: '20:00', cpu: 70, memory: 68, network: 55, database: 60 },
    { time: '24:00', cpu: 50, memory: 60, network: 35, database: 45 }
  ];

  const scalingEvents = [
    { time: '14:32', type: 'scale_up', instances: 8, trigger: 'CPU > 80%', duration: '00:02:15' },
    { time: '12:15', type: 'scale_up', instances: 6, trigger: 'Queue > 100', duration: '00:01:45' },
    { time: '10:48', type: 'scale_down', instances: 4, trigger: 'Load < 50%', duration: '00:03:20' },
    { time: '09:22', type: 'scale_up', instances: 5, trigger: 'Response time > 200ms', duration: '00:01:55' }
  ];

  const infrastructureComponents = [
    { name: 'Load Balancer', status: 'healthy', load: 68, instances: 3 },
    { name: 'API Servers', status: 'healthy', load: 72, instances: 8 },
    { name: 'Database Cluster', status: 'healthy', load: 45, instances: 3 },
    { name: 'Cache Layer', status: 'healthy', load: 35, instances: 4 },
    { name: 'Background Workers', status: 'warning', load: 89, instances: 6 },
    { name: 'CDN Nodes', status: 'healthy', load: 28, instances: 12 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLoadColor = (load: number) => {
    if (load < 50) return 'text-green-600';
    if (load < 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Scalability & Performance Monitoring</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Auto-scaling:</span>
            <Badge className={autoScalingEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
              {autoScalingEnabled ? 'Enabled' : 'Disabled'}
            </Badge>
          </div>
          <Button
            variant={autoScalingEnabled ? "destructive" : "default"}
            size="sm"
            onClick={() => setAutoScalingEnabled(!autoScalingEnabled)}
          >
            {autoScalingEnabled ? 'Disable' : 'Enable'} Auto-scaling
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Load</p>
                <p className={`text-2xl font-bold ${getLoadColor(systemMetrics.currentLoad)}`}>
                  {systemMetrics.currentLoad}%
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-green-600">{systemMetrics.averageResponseTime}ms</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-purple-600">{systemMetrics.activeConnections.toLocaleString()}</p>
              </div>
              <Server className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CDN Hit Rate</p>
                <p className="text-2xl font-bold text-orange-600">{systemMetrics.cdnHitRate}%</p>
              </div>
              <Globe className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="scaling">Auto-scaling Events</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Performance Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="cpu" stackId="1" stroke="#8884d8" fill="#8884d8" name="CPU" />
                    <Area type="monotone" dataKey="memory" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Memory" />
                    <Area type="monotone" dataKey="network" stackId="1" stroke="#ffc658" fill="#ffc658" name="Network" />
                    <Area type="monotone" dataKey="database" stackId="1" stroke="#ff7300" fill="#ff7300" name="Database" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Load Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { service: 'API Gateway', load: 68 },
                      { service: 'Payment Service', load: 45 },
                      { service: 'Notification Service', load: 82 },
                      { service: 'Analytics Service', load: 34 },
                      { service: 'Database Read Replicas', load: 56 }
                    ].map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{service.service}</span>
                          <span className={`text-sm font-bold ${getLoadColor(service.load)}`}>
                            {service.load}%
                          </span>
                        </div>
                        <Progress value={service.load} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Queue Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600">Active Jobs</p>
                      <p className="text-2xl font-bold text-blue-800">23</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Completed/min</p>
                      <p className="text-2xl font-bold text-green-800">145</p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-sm text-yellow-600">Avg Wait Time</p>
                      <p className="text-2xl font-bold text-yellow-800">1.2s</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600">Failed Jobs</p>
                      <p className="text-2xl font-bold text-purple-800">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="scaling">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Recent Auto-scaling Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scalingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge className={
                        event.type === 'scale_up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }>
                        {event.type === 'scale_up' ? 'Scale Up' : 'Scale Down'}
                      </Badge>
                      <div>
                        <p className="font-medium">Scaled to {event.instances} instances</p>
                        <p className="text-sm text-gray-600">Trigger: {event.trigger}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{event.time}</p>
                      <p className="text-sm text-gray-600">Duration: {event.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                Infrastructure Components
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {infrastructureComponents.map((component, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{component.name}</h4>
                      <Badge className={getStatusColor(component.status)}>
                        {component.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Load:</span>
                        <span className={`font-medium ${getLoadColor(component.load)}`}>
                          {component.load}%
                        </span>
                      </div>
                      <Progress value={component.load} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Instances:</span>
                        <span className="font-medium">{component.instances}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity">
          <Card>
            <CardHeader>
              <CardTitle>Capacity Planning & Forecasting</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Current Capacity</h4>
                    <p className="text-2xl font-bold text-blue-600">500M</p>
                    <p className="text-sm text-blue-600">donations/year</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Projected Growth</h4>
                    <p className="text-2xl font-bold text-green-600">+25%</p>
                    <p className="text-sm text-green-600">next 6 months</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-medium text-orange-800">Infrastructure Cost</h4>
                    <p className="text-2xl font-bold text-orange-600">£12.5k</p>
                    <p className="text-sm text-orange-600">per month</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Scaling Recommendations</h4>
                  <div className="space-y-3">
                    {[
                      { recommendation: 'Increase database read replicas', priority: 'high', impact: 'Reduce query latency by 30%' },
                      { recommendation: 'Add CDN edge locations in Asia', priority: 'medium', impact: 'Improve global performance' },
                      { recommendation: 'Optimize background job processing', priority: 'high', impact: 'Handle 2x more queue volume' },
                      { recommendation: 'Implement database sharding', priority: 'low', impact: 'Support 10x growth' }
                    ].map((rec, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{rec.recommendation}</p>
                          <p className="text-sm text-gray-600">{rec.impact}</p>
                        </div>
                        <Badge className={
                          rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                          rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }>
                          {rec.priority}
                        </Badge>
                      </div>
                    ))}
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

export default ScalabilityMonitoring;

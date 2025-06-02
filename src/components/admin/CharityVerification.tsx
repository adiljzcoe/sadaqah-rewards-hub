
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, FileText, AlertTriangle, CheckCircle, Clock, Star, TrendingUp, Download, Search, Filter } from 'lucide-react';

const CharityVerification = () => {
  const [selectedTab, setSelectedTab] = useState('verification');

  const verificationQueue = [
    {
      id: '1',
      name: 'Hope Foundation International',
      country: 'United Kingdom',
      registrationNumber: 'UK-CHR-123456',
      submittedDate: '2024-05-28',
      status: 'pending_review',
      riskScore: 85,
      documents: 4,
      completeness: 85
    },
    {
      id: '2',
      name: 'Clean Water Initiative',
      country: 'Canada',
      registrationNumber: 'CA-REG-789012',
      submittedDate: '2024-05-25',
      status: 'documents_required',
      riskScore: 92,
      documents: 2,
      completeness: 45
    },
    {
      id: '3',
      name: 'Education for All Foundation',
      country: 'Australia',
      registrationNumber: 'AU-ABN-345678',
      submittedDate: '2024-05-20',
      status: 'approved',
      riskScore: 98,
      documents: 6,
      completeness: 100
    }
  ];

  const verifiedCharities = [
    {
      id: '1',
      name: 'Islamic Relief Worldwide',
      performanceScore: 98,
      impactRating: 'Excellent',
      lastAudit: '2024-03-15',
      totalDonations: 2850000,
      projectsActive: 45,
      complianceStatus: 'Full Compliance'
    },
    {
      id: '2',
      name: 'Human Appeal',
      performanceScore: 95,
      impactRating: 'Excellent',
      lastAudit: '2024-02-20',
      totalDonations: 1920000,
      projectsActive: 32,
      complianceStatus: 'Full Compliance'
    },
    {
      id: '3',
      name: 'Penny Appeal',
      performanceScore: 88,
      impactRating: 'Good',
      lastAudit: '2024-04-10',
      totalDonations: 1450000,
      projectsActive: 28,
      complianceStatus: 'Minor Issues'
    }
  ];

  const performanceMetrics = [
    { metric: 'Financial Transparency', score: 95 },
    { metric: 'Impact Reporting', score: 88 },
    { metric: 'Operational Efficiency', score: 92 },
    { metric: 'Governance', score: 90 },
    { metric: 'Regulatory Compliance', score: 96 },
    { metric: 'Public Trust', score: 85 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending_review': return 'bg-yellow-100 text-yellow-800';
      case 'documents_required': return 'bg-orange-100 text-orange-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (rating: string) => {
    switch (rating) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Good': return 'bg-blue-100 text-blue-800';
      case 'Fair': return 'bg-yellow-100 text-yellow-800';
      case 'Poor': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Charity Verification & Due Diligence</h2>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            New Verification
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Reviews</p>
                <p className="text-2xl font-bold text-yellow-600">23</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Verified Charities</p>
                <p className="text-2xl font-bold text-green-600">1,247</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg. Risk Score</p>
                <p className="text-2xl font-bold text-blue-600">91.5</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Risk Alerts</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="verification">Verification Queue</TabsTrigger>
          <TabsTrigger value="performance">Performance Monitoring</TabsTrigger>
          <TabsTrigger value="documents">Document Management</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="benchmarking">Benchmarking</TabsTrigger>
        </TabsList>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>Charity Verification Queue</CardTitle>
              <div className="flex gap-4">
                <Input placeholder="Search charities..." className="max-w-sm" />
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending_review">Pending Review</SelectItem>
                    <SelectItem value="documents_required">Documents Required</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Completeness</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationQueue.map((charity) => (
                    <TableRow key={charity.id}>
                      <TableCell className="font-medium">{charity.name}</TableCell>
                      <TableCell>{charity.country}</TableCell>
                      <TableCell className="font-mono text-sm">{charity.registrationNumber}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(charity.status)}>
                          {charity.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${getRiskColor(charity.riskScore)}`}>
                          {charity.riskScore}/100
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={charity.completeness} className="h-2 w-16" />
                          <span className="text-sm">{charity.completeness}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm" variant="outline">
                            <FileText className="h-3 w-3" />
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

        <TabsContent value="performance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Charity Performance Benchmarking</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Charity</TableHead>
                      <TableHead>Performance Score</TableHead>
                      <TableHead>Impact Rating</TableHead>
                      <TableHead>Total Donations</TableHead>
                      <TableHead>Active Projects</TableHead>
                      <TableHead>Compliance</TableHead>
                      <TableHead>Last Audit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiedCharities.map((charity) => (
                      <TableRow key={charity.id}>
                        <TableCell className="font-medium">{charity.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={charity.performanceScore} className="h-2 w-16" />
                            <span className="font-bold">{charity.performanceScore}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getImpactColor(charity.impactRating)}>
                            {charity.impactRating}
                          </Badge>
                        </TableCell>
                        <TableCell>£{charity.totalDonations.toLocaleString()}</TableCell>
                        <TableCell>{charity.projectsActive}</TableCell>
                        <TableCell>
                          <Badge className={charity.complianceStatus === 'Full Compliance' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {charity.complianceStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>{charity.lastAudit}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics Radar</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadarChart data={performanceMetrics}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Industry Average" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Management System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Required Documents</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Charity Registration Certificate
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Annual Financial Reports (3 years)
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        Governing Document
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        Insurance Documentation
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        Board of Directors List
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Document Status</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Received</span>
                        <span className="font-bold text-green-600">1,842</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Under Review</span>
                        <span className="font-bold text-yellow-600">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Rejected</span>
                        <span className="font-bold text-red-600">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Expired</span>
                        <span className="font-bold text-orange-600">12</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Automated Checks</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span>Digital Signature Verification</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Document Authenticity</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Cross-reference Check</span>
                        <Clock className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Regulatory Compliance</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Risk Factors Analysis</h4>
                    <div className="space-y-3">
                      {[
                        { factor: 'Financial Stability', score: 92, trend: 'stable' },
                        { factor: 'Operational History', score: 88, trend: 'improving' },
                        { factor: 'Regulatory Standing', score: 95, trend: 'stable' },
                        { factor: 'Management Quality', score: 87, trend: 'stable' },
                        { factor: 'Geographic Risk', score: 74, trend: 'declining' },
                        { factor: 'Sector Risk', score: 89, trend: 'improving' }
                      ].map((factor, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded">
                          <div>
                            <p className="font-medium">{factor.factor}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Progress value={factor.score} className="h-2 w-24" />
                              <span className="text-sm font-bold">{factor.score}</span>
                            </div>
                          </div>
                          <Badge variant={
                            factor.trend === 'improving' ? 'default' :
                            factor.trend === 'declining' ? 'destructive' : 'secondary'
                          }>
                            {factor.trend}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">High-Risk Alerts</h4>
                    <div className="space-y-3">
                      {[
                        { alert: 'Unusual donation pattern detected', charity: 'Water Wells Foundation', severity: 'Medium', time: '2 hours ago' },
                        { alert: 'Missing annual report', charity: 'Education First', severity: 'Low', time: '1 day ago' },
                        { alert: 'Geographic risk escalation', charity: 'Emergency Relief Org', severity: 'High', time: '3 hours ago' }
                      ].map((alert, index) => (
                        <div key={index} className="p-3 border rounded">
                          <div className="flex justify-between items-start mb-2">
                            <p className="font-medium">{alert.alert}</p>
                            <Badge variant={
                              alert.severity === 'High' ? 'destructive' :
                              alert.severity === 'Medium' ? 'secondary' : 'outline'
                            }>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{alert.charity}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benchmarking">
          <Card>
            <CardHeader>
              <CardTitle>Industry Benchmarking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Top Performers</h4>
                    <p className="text-2xl font-bold text-blue-600">15%</p>
                    <p className="text-sm text-blue-600">Score 95+ charities</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Industry Average</h4>
                    <p className="text-2xl font-bold text-green-600">78.5</p>
                    <p className="text-sm text-green-600">Performance score</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Below Average</h4>
                    <p className="text-2xl font-bold text-yellow-600">12%</p>
                    <p className="text-sm text-yellow-600">Need improvement</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Sector Performance Comparison</h4>
                  <div className="space-y-3">
                    {[
                      { sector: 'Education', average: 85, charities: 245, trend: '+2.3%' },
                      { sector: 'Healthcare', average: 82, charities: 189, trend: '+1.8%' },
                      { sector: 'Emergency Relief', average: 78, charities: 156, trend: '+0.5%' },
                      { sector: 'Water & Sanitation', average: 88, charities: 98, trend: '+3.1%' },
                      { sector: 'Orphan Care', average: 91, charities: 234, trend: '+2.7%' }
                    ].map((sector, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="font-medium">{sector.sector}</p>
                            <p className="text-sm text-gray-600">{sector.charities} charities</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={sector.average} className="h-2 w-24" />
                            <span className="font-bold">{sector.average}</span>
                          </div>
                        </div>
                        <Badge variant="default">{sector.trend}</Badge>
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

export default CharityVerification;

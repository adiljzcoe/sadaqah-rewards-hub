
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, AlertTriangle, Lock, FileText, Eye, Download, RefreshCw, UserCheck } from 'lucide-react';

const ComplianceAndSecurity = () => {
  const [selectedRegion, setSelectedRegion] = useState('EU');

  const securityMetrics = {
    threatsPrevented: 1247,
    suspiciousTransactions: 23,
    complianceScore: 98.5,
    dataBreaches: 0,
    fraudRate: 0.02,
    kycApprovalRate: 96.8
  };

  const complianceChecks = [
    { 
      regulation: 'GDPR', 
      status: 'compliant', 
      score: 100, 
      lastAudit: '2024-01-15',
      nextAudit: '2024-07-15',
      requirements: 12,
      completed: 12
    },
    { 
      regulation: 'CCPA', 
      status: 'compliant', 
      score: 98, 
      lastAudit: '2024-01-10',
      nextAudit: '2024-07-10',
      requirements: 8,
      completed: 8
    },
    { 
      regulation: 'PCI DSS', 
      status: 'compliant', 
      score: 99, 
      lastAudit: '2024-01-20',
      nextAudit: '2024-04-20',
      requirements: 15,
      completed: 15
    },
    { 
      regulation: 'SOX', 
      status: 'review', 
      score: 94, 
      lastAudit: '2024-01-05',
      nextAudit: '2024-04-05',
      requirements: 10,
      completed: 9
    },
    { 
      regulation: 'ISO 27001', 
      status: 'compliant', 
      score: 97, 
      lastAudit: '2024-01-12',
      nextAudit: '2024-07-12',
      requirements: 114,
      completed: 111
    }
  ];

  const securityIncidents = [
    {
      id: 'SEC-001',
      type: 'Suspicious Login',
      severity: 'medium',
      status: 'resolved',
      timestamp: '2024-01-20 14:32',
      description: 'Multiple failed login attempts from unusual location',
      action: 'Account temporarily locked, user notified'
    },
    {
      id: 'SEC-002',
      type: 'Fraudulent Transaction',
      severity: 'high',
      status: 'investigating',
      timestamp: '2024-01-20 12:15',
      description: 'Large donation from flagged payment method',
      action: 'Transaction blocked, AML team reviewing'
    },
    {
      id: 'SEC-003',
      type: 'Data Access Anomaly',
      severity: 'low',
      status: 'resolved',
      timestamp: '2024-01-19 16:45',
      description: 'Unusual database query pattern detected',
      action: 'Query traced to legitimate analytics job'
    }
  ];

  const kycQueue = [
    {
      id: 'KYC-001',
      userName: 'Abdul Rahman',
      submittedAt: '2024-01-20 10:30',
      documentsProvided: ['Passport', 'Utility Bill'],
      status: 'pending_review',
      riskScore: 'low',
      autoChecks: 'passed'
    },
    {
      id: 'KYC-002',
      userName: 'Sarah Johnson',
      submittedAt: '2024-01-20 09:15',
      documentsProvided: ['Driving License', 'Bank Statement'],
      status: 'additional_docs_required',
      riskScore: 'medium',
      autoChecks: 'partial'
    },
    {
      id: 'KYC-003',
      userName: 'Ahmed Hassan',
      submittedAt: '2024-01-20 08:45',
      documentsProvided: ['National ID', 'Proof of Address'],
      status: 'approved',
      riskScore: 'low',
      autoChecks: 'passed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
      case 'approved':
      case 'resolved':
      case 'passed': return 'bg-green-100 text-green-800';
      case 'review':
      case 'pending_review':
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      case 'non_compliant':
      case 'failed':
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Compliance & Security Dashboard</h2>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-100 text-green-800">
            <Shield className="h-3 w-3 mr-1" />
            Security Score: {securityMetrics.complianceScore}%
          </Badge>
          <Button size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
        </div>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-green-600" />
              <p className="text-sm text-gray-600">Threats Prevented</p>
              <p className="text-xl font-bold text-green-600">{securityMetrics.threatsPrevented}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
              <p className="text-sm text-gray-600">Suspicious Transactions</p>
              <p className="text-xl font-bold text-yellow-600">{securityMetrics.suspiciousTransactions}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Lock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Data Breaches</p>
              <p className="text-xl font-bold text-green-600">{securityMetrics.dataBreaches}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <UserCheck className="h-6 w-6 mx-auto mb-2 text-purple-600" />
              <p className="text-sm text-gray-600">KYC Approval Rate</p>
              <p className="text-xl font-bold text-purple-600">{securityMetrics.kycApprovalRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
              <p className="text-sm text-gray-600">Fraud Rate</p>
              <p className="text-xl font-bold text-green-600">{securityMetrics.fraudRate}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Compliance Score</p>
              <p className="text-xl font-bold text-blue-600">{securityMetrics.complianceScore}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compliance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
          <TabsTrigger value="security">Security Incidents</TabsTrigger>
          <TabsTrigger value="kyc">KYC Management</TabsTrigger>
          <TabsTrigger value="data_retention">Data Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <h4 className="font-medium text-lg">{check.regulation}</h4>
                        <Badge className={getStatusColor(check.status)}>
                          {check.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Score</p>
                        <p className="text-xl font-bold text-green-600">{check.score}%</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm text-gray-600">Requirements</p>
                        <p className="font-medium">{check.completed}/{check.requirements}</p>
                        <Progress value={(check.completed / check.requirements) * 100} className="h-2 mt-1" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Last Audit</p>
                        <p className="font-medium">{check.lastAudit}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Audit</p>
                        <p className="font-medium">{check.nextAudit}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Incidents & Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {securityIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.id}</TableCell>
                      <TableCell>{incident.type}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(incident.severity)}>
                          {incident.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(incident.status)}>
                          {incident.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{incident.timestamp}</TableCell>
                      <TableCell className="max-w-xs truncate">{incident.description}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kyc">
          <Card>
            <CardHeader>
              <CardTitle>KYC Verification Queue</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Auto Checks</TableHead>
                    <TableHead>Risk Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kycQueue.map((kyc) => (
                    <TableRow key={kyc.id}>
                      <TableCell className="font-medium">{kyc.id}</TableCell>
                      <TableCell>{kyc.userName}</TableCell>
                      <TableCell>{kyc.submittedAt}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {kyc.documentsProvided.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(kyc.autoChecks)}>
                          {kyc.autoChecks}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          kyc.riskScore === 'low' ? 'bg-green-100 text-green-800' :
                          kyc.riskScore === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {kyc.riskScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(kyc.status)}>
                          {kyc.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {kyc.status === 'pending_review' && (
                            <>
                              <Button size="sm" className="bg-green-600">✓</Button>
                              <Button size="sm" variant="destructive">✗</Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data_retention">
          <Card>
            <CardHeader>
              <CardTitle>Data Retention & Privacy Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800">Active Records</h4>
                    <p className="text-2xl font-bold text-blue-600">2.4M</p>
                    <p className="text-sm text-blue-600">user records</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-800">Scheduled for Deletion</h4>
                    <p className="text-2xl font-bold text-green-600">15.2k</p>
                    <p className="text-sm text-green-600">next 30 days</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-medium text-yellow-800">Deletion Requests</h4>
                    <p className="text-2xl font-bold text-yellow-600">47</p>
                    <p className="text-sm text-yellow-600">pending review</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Data Retention Policies</h4>
                  <div className="space-y-3">
                    {[
                      { dataType: 'User Profile Data', retentionPeriod: '7 years', compliance: 'GDPR, CCPA', status: 'active' },
                      { dataType: 'Transaction Records', retentionPeriod: '10 years', compliance: 'SOX, PCI DSS', status: 'active' },
                      { dataType: 'Marketing Data', retentionPeriod: '3 years', compliance: 'GDPR', status: 'active' },
                      { dataType: 'Audit Logs', retentionPeriod: '7 years', compliance: 'SOX', status: 'active' },
                      { dataType: 'Temporary Session Data', retentionPeriod: '24 hours', compliance: 'GDPR', status: 'active' }
                    ].map((policy, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded">
                        <div>
                          <p className="font-medium">{policy.dataType}</p>
                          <p className="text-sm text-gray-600">Retention: {policy.retentionPeriod} | {policy.compliance}</p>
                        </div>
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status}
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

export default ComplianceAndSecurity;

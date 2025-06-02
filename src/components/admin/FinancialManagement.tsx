
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { DollarSign, TrendingUp, AlertCircle, Shield, FileText, Globe, CreditCard, Download } from 'lucide-react';

const FinancialManagement = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('GBP');
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  const currencyRates = {
    GBP: 1.00,
    USD: 1.27,
    EUR: 1.16,
    CAD: 1.72,
    AUD: 1.89
  };

  const financialMetrics = {
    totalRevenue: 2850000,
    processingFees: 85500,
    netRevenue: 2764500,
    charityDisbursements: 2650000,
    platformFee: 114500,
    fraudPrevented: 45000,
    averageTransactionSize: 85.50
  };

  const transactionData = [
    { date: '2024-01-01', volume: 125000, fees: 3750, fraudBlocked: 2100 },
    { date: '2024-01-02', volume: 142000, fees: 4260, fraudBlocked: 1800 },
    { date: '2024-01-03', volume: 138000, fees: 4140, fraudBlocked: 2400 },
    { date: '2024-01-04', volume: 156000, fees: 4680, fraudBlocked: 1950 },
    { date: '2024-01-05', volume: 189000, fees: 5670, fraudBlocked: 3200 },
    { date: '2024-01-06', volume: 167000, fees: 5010, fraudBlocked: 2650 },
    { date: '2024-01-07', volume: 178000, fees: 5340, fraudBlocked: 2100 }
  ];

  const paymentMethods = [
    { name: 'Credit Card', value: 65, color: '#8884d8' },
    { name: 'Debit Card', value: 20, color: '#82ca9d' },
    { name: 'PayPal', value: 8, color: '#ffc658' },
    { name: 'Bank Transfer', value: 4, color: '#ff7300' },
    { name: 'Apple/Google Pay', value: 3, color: '#8dd1e1' }
  ];

  const complianceChecks = [
    { check: 'AML Screening', status: 'passed', lastRun: '2 hours ago', coverage: 100 },
    { check: 'KYC Verification', status: 'passed', lastRun: '30 min ago', coverage: 98.5 },
    { check: 'GDPR Compliance', status: 'passed', lastRun: '1 hour ago', coverage: 100 },
    { check: 'Tax Reporting', status: 'warning', lastRun: '6 hours ago', coverage: 94.2 },
    { check: 'Charity Verification', status: 'passed', lastRun: '15 min ago', coverage: 99.8 }
  ];

  const formatCurrency = (amount: number) => {
    const converted = amount * currencyRates[selectedCurrency as keyof typeof currencyRates];
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: selectedCurrency
    }).format(converted);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Financial Management</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GBP">GBP £</SelectItem>
              <SelectItem value="USD">USD $</SelectItem>
              <SelectItem value="EUR">EUR €</SelectItem>
              <SelectItem value="CAD">CAD $</SelectItem>
              <SelectItem value="AUD">AUD $</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(financialMetrics.totalRevenue)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Processing Fees</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(financialMetrics.processingFees)}
                </p>
              </div>
              <CreditCard className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Charity Disbursements</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(financialMetrics.charityDisbursements)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Fraud Prevented</p>
                <p className="text-2xl font-bold text-red-600">
                  {formatCurrency(financialMetrics.fraudPrevented)}
                </p>
              </div>
              <Shield className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transaction Analysis</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
          <TabsTrigger value="reporting">Financial Reporting</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Transaction Volume & Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={transactionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="volume" stroke="#8884d8" name="Volume" />
                    <Line type="monotone" dataKey="fees" stroke="#82ca9d" name="Fees" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethods}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {paymentMethods.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Compliance Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge className={getStatusColor(check.status)}>
                        {check.status}
                      </Badge>
                      <div>
                        <p className="font-medium">{check.check}</p>
                        <p className="text-sm text-gray-600">Last run: {check.lastRun}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{check.coverage}%</p>
                      <p className="text-sm text-gray-600">Coverage</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reconciliation">
          <Card>
            <CardHeader>
              <CardTitle>Automated Reconciliation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800">Matched Transactions</h4>
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                  <p className="text-sm text-green-600">124,850 / 125,100</p>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-800">Pending Review</h4>
                  <p className="text-2xl font-bold text-yellow-600">0.2%</p>
                  <p className="text-sm text-yellow-600">250 transactions</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800">Discrepancies</h4>
                  <p className="text-2xl font-bold text-red-600">0.0%</p>
                  <p className="text-sm text-red-600">0 transactions</p>
                </div>
              </div>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download Reconciliation Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reporting">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Financial Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Daily Transaction Report', lastGenerated: '2 hours ago', format: 'PDF' },
                  { name: 'Monthly Financial Statement', lastGenerated: '1 day ago', format: 'Excel' },
                  { name: 'Charity Disbursement Report', lastGenerated: '6 hours ago', format: 'CSV' },
                  { name: 'Tax Compliance Report', lastGenerated: '1 week ago', format: 'PDF' },
                  { name: 'Audit Trail Export', lastGenerated: '3 days ago', format: 'JSON' },
                  { name: 'Fraud Detection Summary', lastGenerated: '4 hours ago', format: 'PDF' }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-gray-600">Last: {report.lastGenerated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{report.format}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialManagement;

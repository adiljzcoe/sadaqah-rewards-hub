
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardCharts = () => {
  // Mock data - this would come from your API
  const dailyDonations = [
    { date: '2024-01-01', amount: 1200, count: 15 },
    { date: '2024-01-02', amount: 1850, count: 22 },
    { date: '2024-01-03', amount: 2100, count: 28 },
    { date: '2024-01-04', amount: 1650, count: 19 },
    { date: '2024-01-05', amount: 2350, count: 31 },
    { date: '2024-01-06', amount: 1900, count: 24 },
    { date: '2024-01-07', amount: 2800, count: 35 },
  ];

  const monthlyTotals = [
    { month: 'Jan', amount: 45000, memberships: 120 },
    { month: 'Feb', amount: 52000, memberships: 145 },
    { month: 'Mar', amount: 48000, memberships: 135 },
    { month: 'Apr', amount: 61000, memberships: 165 },
    { month: 'May', amount: 58000, memberships: 155 },
    { month: 'Jun', amount: 67000, memberships: 180 },
  ];

  const donationsByProduct = [
    { name: 'Water Wells', value: 35000, count: 45 },
    { name: 'Orphan Support', value: 28000, count: 120 },
    { name: 'Food Packages', value: 22000, count: 200 },
    { name: 'Medical Aid', value: 18000, count: 85 },
    { name: 'Education', value: 15000, count: 95 },
    { name: 'Emergency Relief', value: 12000, count: 60 },
  ];

  const membershipGrowth = [
    { date: '2024-01-01', new: 12, total: 1200 },
    { date: '2024-01-02', new: 8, total: 1208 },
    { date: '2024-01-03', new: 15, total: 1223 },
    { date: '2024-01-04', new: 6, total: 1229 },
    { date: '2024-01-05', new: 18, total: 1247 },
    { date: '2024-01-06', new: 11, total: 1258 },
    { date: '2024-01-07', new: 22, total: 1280 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {/* Daily Donations Trend */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Daily Donations Trend</CardTitle>
          <CardDescription>Amount and count of donations over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={dailyDonations}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} name="Amount (£)" />
              <Line yAxisId="right" type="monotone" dataKey="count" stroke="#82ca9d" name="Count" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
          <CardDescription>Donations and memberships by month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTotals}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Donations (£)" />
              <Bar dataKey="memberships" fill="#82ca9d" name="New Memberships" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Donations by Product */}
      <Card>
        <CardHeader>
          <CardTitle>Donations by Product</CardTitle>
          <CardDescription>Distribution of donations across different products</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donationsByProduct}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {donationsByProduct.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Membership Growth */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Membership Growth</CardTitle>
          <CardDescription>New memberships and total membership count</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={membershipGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="new" fill="#82ca9d" name="New Members" />
              <Line yAxisId="right" type="monotone" dataKey="total" stroke="#8884d8" name="Total Members" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;


import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFamilyAccounts } from '@/hooks/useFamilyAccounts';
import { Users, Plus, Coins, Star, Gift, TrendingUp } from 'lucide-react';
import KidsAccountCard from './KidsAccountCard';
import CreateKidsAccountDialog from './CreateKidsAccountDialog';
import TopupAccountDialog from './TopupAccountDialog';

const FamilyDashboard = () => {
  const { familyAccount, kidsAccounts, isLoading, createFamily, isCreatingFamily } = useFamilyAccounts();
  const [familyName, setFamilyName] = useState('');
  const [showCreateKids, setShowCreateKids] = useState(false);
  const [showTopup, setShowTopup] = useState(false);
  const [selectedKidsAccount, setSelectedKidsAccount] = useState<string>('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading family dashboard...</p>
        </div>
      </div>
    );
  }

  // If no family account exists, show setup
  if (!familyAccount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>Create Family Account</CardTitle>
            <CardDescription>
              Set up a family account to manage your children's charity giving
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="familyName">Family Name</Label>
              <Input
                id="familyName"
                placeholder="The Smith Family"
                value={familyName}
                onChange={(e) => setFamilyName(e.target.value)}
              />
            </div>
            <Button 
              onClick={() => createFamily(familyName)} 
              className="w-full"
              disabled={!familyName.trim() || isCreatingFamily}
            >
              {isCreatingFamily ? 'Creating...' : 'Create Family Account'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalCoins = kidsAccounts?.reduce((sum, account) => sum + account.sadaqah_coins, 0) || 0;
  const totalPoints = kidsAccounts?.reduce((sum, account) => sum + account.jannah_points, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {familyAccount.family_name} Dashboard
          </h1>
          <p className="text-gray-600">
            Manage your children's charity giving and teach them about generosity
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Kids</p>
                  <p className="text-2xl font-bold">{kidsAccounts?.length || 0}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sadaqah Coins</p>
                  <p className="text-2xl font-bold">{totalCoins}</p>
                </div>
                <Coins className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Jannah Points</p>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                </div>
                <Star className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList>
            <TabsTrigger value="accounts">Kids Accounts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Kids Accounts</h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setShowTopup(true)}
                  disabled={!kidsAccounts?.length}
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Top Up Account
                </Button>
                <Button onClick={() => setShowCreateKids(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Child
                </Button>
              </div>
            </div>

            {kidsAccounts?.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No kids accounts yet</h3>
                  <p className="text-gray-500 mb-4">
                    Create your first child's account to start teaching them about charity
                  </p>
                  <Button onClick={() => setShowCreateKids(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Child
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kidsAccounts?.map((account) => (
                  <KidsAccountCard 
                    key={account.id} 
                    account={account}
                    onTopup={() => {
                      setSelectedKidsAccount(account.id);
                      setShowTopup(true);
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Family Giving Analytics
                </CardTitle>
                <CardDescription>
                  Track your family's charitable giving progress and impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-500">
                    We're working on detailed analytics to help you track your family's charitable impact
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <CreateKidsAccountDialog 
          open={showCreateKids} 
          onOpenChange={setShowCreateKids}
        />
        
        <TopupAccountDialog 
          open={showTopup} 
          onOpenChange={setShowTopup}
          kidsAccountId={selectedKidsAccount}
          kidsAccounts={kidsAccounts || []}
        />
      </div>
    </div>
  );
};

export default FamilyDashboard;

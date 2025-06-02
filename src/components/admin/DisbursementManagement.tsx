
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Send, Eye, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Charity {
  id: string;
  name: string;
  category: string;
  verified: boolean;
}

interface Donation {
  id: string;
  amount: number;
  disbursed_amount: number;
  disbursement_status: string;
  created_at: string;
  charity_id?: string;
  charities?: { name: string };
}

interface Disbursement {
  id: string;
  charity_id: string;
  amount: number;
  disbursement_date: string;
  reference_number: string;
  notes: string;
  status: string;
  charities: { name: string };
}

interface CharityAllocation {
  id: string;
  charity_id: string;
  allocation_percentage: number;
  is_active: boolean;
  charities: { name: string };
}

const DisbursementManagement = () => {
  const { toast } = useToast();
  const [charities, setCharities] = useState<Charity[]>([]);
  const [pendingDonations, setPendingDonations] = useState<Donation[]>([]);
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [allocations, setAllocations] = useState<CharityAllocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingDisbursement, setIsCreatingDisbursement] = useState(false);
  const [newDisbursement, setNewDisbursement] = useState({
    charity_id: '',
    amount: '',
    reference_number: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch charities
      const { data: charitiesData, error: charitiesError } = await supabase
        .from('charities')
        .select('*')
        .eq('verified', true);

      if (charitiesError) throw charitiesError;
      setCharities(charitiesData || []);

      // Fetch pending donations
      const { data: donationsData, error: donationsError } = await supabase
        .from('donations')
        .select(`
          *,
          charities (name)
        `)
        .in('disbursement_status', ['pending', 'partial'])
        .eq('status', 'completed');

      if (donationsError) throw donationsError;
      setPendingDonations(donationsData || []);

      // Fetch recent disbursements
      const { data: disbursementsData, error: disbursementsError } = await supabase
        .from('disbursements')
        .select(`
          *,
          charities (name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (disbursementsError) throw disbursementsError;
      setDisbursements(disbursementsData || []);

      // Fetch charity allocations
      const { data: allocationsData, error: allocationsError } = await supabase
        .from('charity_allocations')
        .select(`
          *,
          charities (name)
        `)
        .eq('is_active', true);

      if (allocationsError) throw allocationsError;
      setAllocations(allocationsData || []);

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load disbursement data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDisbursement = async () => {
    try {
      const { error } = await supabase
        .from('disbursements')
        .insert([{
          ...newDisbursement,
          amount: parseFloat(newDisbursement.amount)
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Disbursement created successfully.",
      });

      setIsCreatingDisbursement(false);
      setNewDisbursement({
        charity_id: '',
        amount: '',
        reference_number: '',
        notes: ''
      });
      fetchData();
    } catch (error) {
      console.error('Error creating disbursement:', error);
      toast({
        title: "Error",
        description: "Failed to create disbursement.",
        variant: "destructive",
      });
    }
  };

  const updateAllocationPercentage = async (id: string, percentage: number) => {
    try {
      const { error } = await supabase
        .from('charity_allocations')
        .update({ allocation_percentage: percentage })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Allocation percentage updated.",
      });

      fetchData();
    } catch (error) {
      console.error('Error updating allocation:', error);
      toast({
        title: "Error",
        description: "Failed to update allocation.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  const totalPendingAmount = pendingDonations.reduce((sum, donation) => 
    sum + (donation.amount - (donation.disbursed_amount || 0)), 0
  );

  const totalAllocations = allocations.reduce((sum, allocation) => 
    sum + allocation.allocation_percentage, 0
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Disbursement Management</h2>
          <p className="text-muted-foreground">Manage charity disbursements and allocations</p>
        </div>
        <Button onClick={() => setIsCreatingDisbursement(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Disbursement
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold">£{(totalPendingAmount / 100).toFixed(2)}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Donations</p>
                <p className="text-2xl font-bold">{pendingDonations.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Allocations</p>
                <p className="text-2xl font-bold">{totalAllocations}%</p>
                {totalAllocations !== 100 && (
                  <p className="text-sm text-red-600">Should equal 100%</p>
                )}
              </div>
              <CheckCircle className={`h-8 w-8 ${totalAllocations === 100 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Donations</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="allocations">Charity Allocations</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Donations</CardTitle>
              <CardDescription>Donations awaiting disbursement</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Amount</TableHead>
                    <TableHead>Disbursed</TableHead>
                    <TableHead>Remaining</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Charity</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell>£{(donation.amount / 100).toFixed(2)}</TableCell>
                      <TableCell>£{((donation.disbursed_amount || 0) / 100).toFixed(2)}</TableCell>
                      <TableCell>£{((donation.amount - (donation.disbursed_amount || 0)) / 100).toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={donation.disbursement_status === 'pending' ? 'secondary' : 'outline'}>
                          {donation.disbursement_status}
                        </Badge>
                      </TableCell>
                      <TableCell>{donation.charities?.name || 'Shared Pool'}</TableCell>
                      <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disbursements">
          <Card>
            <CardHeader>
              <CardTitle>Recent Disbursements</CardTitle>
              <CardDescription>History of charity disbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reference</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {disbursements.map((disbursement) => (
                    <TableRow key={disbursement.id}>
                      <TableCell>{disbursement.charities.name}</TableCell>
                      <TableCell>£{(disbursement.amount / 100).toFixed(2)}</TableCell>
                      <TableCell>{disbursement.reference_number}</TableCell>
                      <TableCell>
                        <Badge variant={disbursement.status === 'completed' ? 'default' : 'secondary'}>
                          {disbursement.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(disbursement.disbursement_date).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocations">
          <Card>
            <CardHeader>
              <CardTitle>Charity Allocation Rules</CardTitle>
              <CardDescription>Configure how shared donations are split between charities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Allocation %</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell>{allocation.charities.name}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={allocation.allocation_percentage}
                          onChange={(e) => updateAllocationPercentage(allocation.id, parseFloat(e.target.value) || 0)}
                          className="w-20"
                          min="0"
                          max="100"
                          step="0.1"
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={allocation.is_active ? 'default' : 'secondary'}>
                          {allocation.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Disbursement Modal */}
      {isCreatingDisbursement && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Disbursement</CardTitle>
            <CardDescription>Disburse funds to a charity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="charity">Charity</Label>
              <Select value={newDisbursement.charity_id} onValueChange={(value) => setNewDisbursement({ ...newDisbursement, charity_id: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select charity" />
                </SelectTrigger>
                <SelectContent>
                  {charities.map((charity) => (
                    <SelectItem key={charity.id} value={charity.id}>
                      {charity.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="amount">Amount (£)</Label>
              <Input
                id="amount"
                type="number"
                value={newDisbursement.amount}
                onChange={(e) => setNewDisbursement({ ...newDisbursement, amount: e.target.value })}
                placeholder="0.00"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="reference">Reference Number</Label>
              <Input
                id="reference"
                value={newDisbursement.reference_number}
                onChange={(e) => setNewDisbursement({ ...newDisbursement, reference_number: e.target.value })}
                placeholder="TXN-2024-001"
              />
            </div>
            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newDisbursement.notes}
                onChange={(e) => setNewDisbursement({ ...newDisbursement, notes: e.target.value })}
                placeholder="Additional notes..."
                rows={3}
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleCreateDisbursement}>
                <Send className="h-4 w-4 mr-2" />
                Create Disbursement
              </Button>
              <Button variant="outline" onClick={() => setIsCreatingDisbursement(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DisbursementManagement;


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
import { Plus, Send, Eye, CheckCircle, AlertCircle, Star, TrendingUp, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Charity {
  id: string;
  name: string;
  category: string;
  verified: boolean;
  trust_rating: number;
  activity_score: number;
  last_activity_date: string;
  total_posts: number;
  verified_posts: number;
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
  calculated_percentage: number;
  trust_weight: number;
  activity_weight: number;
  manual_override: boolean;
  is_active: boolean;
  charities: { 
    name: string;
    trust_rating: number;
    activity_score: number;
  };
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
      // Fetch charities with trust ratings
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

      // Fetch charity allocations with trust data
      const { data: allocationsData, error: allocationsError } = await supabase
        .from('charity_allocations')
        .select(`
          *,
          charities (
            name,
            trust_rating,
            activity_score
          )
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
          amount: parseFloat(newDisbursement.amount) * 100 // Convert to pence
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

  const recalculateAllocations = async () => {
    try {
      const { error } = await supabase.rpc('calculate_charity_allocations');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Charity allocations recalculated based on trust ratings.",
      });

      fetchData();
    } catch (error) {
      console.error('Error recalculating allocations:', error);
      toast({
        title: "Error",
        description: "Failed to recalculate allocations.",
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
    sum + (allocation.calculated_percentage || allocation.allocation_percentage), 0
  );

  const getTrustBadgeColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Trust-Based Disbursement Management</h2>
          <p className="text-muted-foreground">Manage charity disbursements based on trust ratings and activity</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={recalculateAllocations} variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Recalculate Trust Allocations
          </Button>
          <Button onClick={() => setIsCreatingDisbursement(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create Disbursement
          </Button>
        </div>
      </div>

      {/* Summary Cards with Trust Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
                <p className="text-sm text-muted-foreground">Active Charities</p>
                <p className="text-2xl font-bold">{charities.length}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Trust Rating</p>
                <p className="text-2xl font-bold">
                  {charities.length > 0 
                    ? (charities.reduce((sum, c) => sum + (c.trust_rating || 5), 0) / charities.length).toFixed(1)
                    : '0.0'
                  }
                </p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Allocations</p>
                <p className="text-2xl font-bold">{totalAllocations.toFixed(1)}%</p>
                {Math.abs(totalAllocations - 100) > 1 && (
                  <p className="text-sm text-red-600">Should equal 100%</p>
                )}
              </div>
              <CheckCircle className={`h-8 w-8 ${Math.abs(totalAllocations - 100) <= 1 ? 'text-green-600' : 'text-red-600'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="allocations" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="allocations">Trust-Based Allocations</TabsTrigger>
          <TabsTrigger value="pending">Pending Donations</TabsTrigger>
          <TabsTrigger value="disbursements">Disbursements</TabsTrigger>
          <TabsTrigger value="ratings">Charity Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="allocations">
          <Card>
            <CardHeader>
              <CardTitle>Trust-Based Charity Allocations</CardTitle>
              <CardDescription>
                Allocation percentages calculated based on trust ratings and activity scores. 
                Higher trust and activity = larger share of donations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Trust Rating</TableHead>
                    <TableHead>Activity Score</TableHead>
                    <TableHead>Calculated %</TableHead>
                    <TableHead>Manual %</TableHead>
                    <TableHead>Override</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allocations.map((allocation) => (
                    <TableRow key={allocation.id}>
                      <TableCell className="font-medium">{allocation.charities.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getTrustBadgeColor(allocation.charities.trust_rating)}`}></div>
                          <span>{allocation.charities.trust_rating?.toFixed(1) || '5.0'}</span>
                        </div>
                      </TableCell>
                      <TableCell>{allocation.charities.activity_score?.toFixed(0) || '0'}%</TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {allocation.calculated_percentage?.toFixed(1) || '0.0'}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={allocation.allocation_percentage}
                          className="w-20"
                          min="0"
                          max="100"
                          step="0.1"
                          disabled={!allocation.manual_override}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant={allocation.manual_override ? 'default' : 'secondary'}>
                          {allocation.manual_override ? 'Manual' : 'Auto'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings">
          <Card>
            <CardHeader>
              <CardTitle>Charity Trust Ratings & Activity</CardTitle>
              <CardDescription>Monitor charity performance and activity levels</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Trust Rating</TableHead>
                    <TableHead>Activity Score</TableHead>
                    <TableHead>Total Posts</TableHead>
                    <TableHead>Verified Posts</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charities.map((charity) => (
                    <TableRow key={charity.id}>
                      <TableCell className="font-medium">{charity.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getTrustBadgeColor(charity.trust_rating || 5)}`}></div>
                          <span className="font-mono">{(charity.trust_rating || 5).toFixed(1)}/10</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{charity.activity_score || 0}%</Badge>
                      </TableCell>
                      <TableCell>{charity.total_posts || 0}</TableCell>
                      <TableCell>{charity.verified_posts || 0}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {charity.last_activity_date 
                            ? new Date(charity.last_activity_date).toLocaleDateString()
                            : 'Never'
                          }
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

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
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getTrustBadgeColor(charity.trust_rating || 5)}`}></div>
                        {charity.name} (Trust: {(charity.trust_rating || 5).toFixed(1)})
                      </div>
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

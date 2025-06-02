import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Send, Eye, CheckCircle, AlertCircle, Star, TrendingUp, Clock, Calculator, DollarSign } from 'lucide-react';
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

interface DisbursementBatch {
  id: string;
  batch_date: string;
  total_amount: number;
  charity_count: number;
  calculation_snapshot: any;
  status: string;
  created_at: string;
  created_by: string;
  notes: string;
  profiles?: { full_name: string };
}

interface BatchDisbursement {
  id: string;
  batch_id: string;
  charity_id: string;
  amount: number;
  allocation_percentage: number;
  trust_rating_at_time: number;
  activity_score_at_time: number;
  project_type: string;
  created_at: string;
  charities: { name: string };
}

const DisbursementManagement = () => {
  const { toast } = useToast();
  const [charities, setCharities] = useState<Charity[]>([]);
  const [pendingDonations, setPendingDonations] = useState<Donation[]>([]);
  const [disbursementBatches, setDisbursementBatches] = useState<DisbursementBatch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<DisbursementBatch | null>(null);
  const [batchDetails, setBatchDetails] = useState<BatchDisbursement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      console.log('🔄 Fetching disbursement data...');
      
      // Fetch charities with trust ratings
      const { data: charitiesData, error: charitiesError } = await supabase
        .from('charities')
        .select('*')
        .eq('verified', true);

      if (charitiesError) {
        console.error('❌ Error fetching charities:', charitiesError);
        throw charitiesError;
      }
      
      console.log('✅ Charities fetched:', charitiesData?.length || 0);
      setCharities(charitiesData || []);

      // Fetch pending donations - updated query to be more explicit
      const { data: donationsData, error: donationsError } = await supabase
        .from('donations')
        .select(`
          *,
          charities (name)
        `)
        .eq('status', 'completed')
        .in('disbursement_status', ['pending', 'partial']);

      if (donationsError) {
        console.error('❌ Error fetching donations:', donationsError);
        throw donationsError;
      }
      
      console.log('✅ Pending donations fetched:', donationsData?.length || 0);
      console.log('💰 Donation amounts:', donationsData?.map(d => ({
        id: d.id.substring(0, 8),
        amount: d.amount,
        disbursed: d.disbursed_amount || 0,
        status: d.disbursement_status
      })));
      
      setPendingDonations(donationsData || []);

      // Fetch disbursement batches
      const { data: batchesData, error: batchesError } = await supabase
        .from('disbursement_batches')
        .select(`
          *,
          profiles (full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (batchesError) {
        console.error('❌ Error fetching batches:', batchesError);
        throw batchesError;
      }
      
      console.log('✅ Disbursement batches fetched:', batchesData?.length || 0);
      setDisbursementBatches(batchesData || []);

    } catch (error) {
      console.error('❌ Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load disbursement data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDisbursement = async () => {
    console.log('🚀 Starting bulk disbursement process...');
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.rpc('create_bulk_disbursement');
      
      if (error) {
        console.error('❌ RPC Error:', error);
        throw error;
      }

      console.log('✅ Bulk disbursement result:', data);

      if (!data) {
        toast({
          title: "No Disbursements Created",
          description: "There are no pending donations to disburse.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Bulk Disbursement Successful! 🎉",
        description: `Created disbursement batch ${data.substring(0, 8)}... for all active charities.`,
      });

      fetchData();
    } catch (error) {
      console.error('❌ Error creating bulk disbursement:', error);
      toast({
        title: "Error",
        description: "Failed to create bulk disbursement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchBatchDetails = async (batch: DisbursementBatch) => {
    try {
      const { data, error } = await supabase
        .from('batch_disbursements')
        .select(`
          *,
          charities (name)
        `)
        .eq('batch_id', batch.id)
        .order('amount', { ascending: false });

      if (error) throw error;
      setBatchDetails(data || []);
      setSelectedBatch(batch);
    } catch (error) {
      console.error('Error fetching batch details:', error);
      toast({
        title: "Error",
        description: "Failed to load batch details.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  const totalPendingAmount = pendingDonations.reduce((sum, donation) => {
    const remaining = donation.amount - (donation.disbursed_amount || 0);
    console.log(`💰 Donation ${donation.id.substring(0, 8)}: £${donation.amount/100} - £${(donation.disbursed_amount || 0)/100} = £${remaining/100}`);
    return sum + remaining;
  }, 0);

  console.log('💰 Total pending amount:', totalPendingAmount, 'pence (£' + (totalPendingAmount / 100).toFixed(2) + ')');

  const getTrustBadgeColor = (rating: number) => {
    if (rating >= 8) return 'bg-green-500';
    if (rating >= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bulk Disbursement Management</h2>
          <p className="text-muted-foreground">Automated charity disbursements based on trust ratings</p>
        </div>
        <Button 
          onClick={handleBulkDisbursement} 
          disabled={isProcessing}
          className="flex items-center gap-2"
          size="lg"
        >
          <Calculator className="h-5 w-5" />
          {isProcessing ? 'Processing...' : 'Calculate Disbursements'}
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
                <p className="text-2xl font-bold">£{(totalPendingAmount / 100).toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-1">{pendingDonations.length} donations</p>
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
                <p className="text-sm text-muted-foreground">Total Batches</p>
                <p className="text-2xl font-bold">{disbursementBatches.length}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="batches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="batches">Disbursement Batches</TabsTrigger>
          <TabsTrigger value="pending">Pending Donations</TabsTrigger>
          <TabsTrigger value="charities">Charity Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="batches">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Batch List */}
            <Card>
              <CardHeader>
                <CardTitle>Disbursement History</CardTitle>
                <CardDescription>Click on a batch to view detailed breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {disbursementBatches.map((batch) => (
                    <div 
                      key={batch.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedBatch?.id === batch.id ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => fetchBatchDetails(batch)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">£{(batch.total_amount / 100).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">{batch.charity_count} charities</p>
                          <p className="text-xs text-gray-500">
                            {new Date(batch.batch_date).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant={batch.status === 'completed' ? 'default' : 'secondary'}>
                          {batch.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Batch Details */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedBatch ? 'Batch Details' : 'Select a Batch'}
                </CardTitle>
                {selectedBatch && (
                  <CardDescription>
                    Batch from {new Date(selectedBatch.batch_date).toLocaleDateString()}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {selectedBatch ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Amount</p>
                          <p className="font-medium">£{(selectedBatch.total_amount / 100).toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Charities</p>
                          <p className="font-medium">{selectedBatch.charity_count}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {batchDetails.map((detail) => (
                        <div key={detail.id} className="flex justify-between items-center p-2 border-b">
                          <div>
                            <p className="font-medium text-sm">{detail.charities.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <div className={`w-2 h-2 rounded-full ${getTrustBadgeColor(detail.trust_rating_at_time)}`}></div>
                              <span>Trust: {detail.trust_rating_at_time.toFixed(1)}</span>
                              <span>Activity: {detail.activity_score_at_time.toFixed(0)}%</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">£{(detail.amount / 100).toFixed(2)}</p>
                            <p className="text-xs text-gray-500">{detail.allocation_percentage.toFixed(1)}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Select a disbursement batch to view details
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
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
                      <TableCell>{new Date(donation.created_at).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charities">
          <Card>
            <CardHeader>
              <CardTitle>Charity Trust Ratings & Activity</CardTitle>
              <CardDescription>Current ratings used for disbursement calculations</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Trust Rating</TableHead>
                    <TableHead>Activity Score</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Last Activity</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {charities.map((charity) => {
                    const weight = (charity.trust_rating || 5) * (1 + (charity.activity_score || 0) / 100);
                    return (
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
                        <TableCell>
                          <span className="font-mono">{weight.toFixed(2)}</span>
                        </TableCell>
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
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DisbursementManagement;

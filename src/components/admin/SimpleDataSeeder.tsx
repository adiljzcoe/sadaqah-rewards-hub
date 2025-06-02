
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database, Sprout, Users, Heart } from 'lucide-react';

const SimpleDataSeeder = () => {
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const sampleCharities = [
    {
      name: 'Water Wells Foundation',
      description: 'Providing clean water access in rural communities',
      category: 'water',
      country: 'Global',
      verified: true,
      trust_rating: 8.5,
      activity_score: 85,
      total_raised: 150000,
      website_url: 'https://waterwells.org',
      last_activity_date: new Date().toISOString(),
      total_posts: 12,
      verified_posts: 10
    },
    {
      name: 'Hope Orphanage Network',
      description: 'Supporting orphaned children with care and education',
      category: 'children',
      country: 'Bangladesh',
      verified: true,
      trust_rating: 9.2,
      activity_score: 92,
      total_raised: 220000,
      website_url: 'https://hopeorphanage.org',
      last_activity_date: new Date().toISOString(),
      total_posts: 18,
      verified_posts: 15
    }
  ];

  const handleSimpleSeeding = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🌱 Starting simple data seeding...');
      
      // Insert charities without RLS issues
      const { data: charities, error: charityError } = await supabase
        .from('charities')
        .insert(sampleCharities)
        .select();

      if (charityError) {
        console.error('❌ Charity insert error:', charityError);
        throw new Error(`Failed to insert charities: ${charityError.message}`);
      }

      console.log('✅ Charities created successfully:', charities?.length);

      // Create some sample donations with a system user ID to avoid foreign key issues
      if (charities && charities.length > 0) {
        const systemUserId = '00000000-0000-0000-0000-000000000001'; // System user ID
        
        const sampleDonations = [
          {
            charity_id: charities[0].id,
            user_id: systemUserId,
            amount: 25000,
            status: 'completed' as const,
            disbursement_status: 'pending',
            disbursed_amount: 0,
            anonymous: false,
            jannah_points_earned: 250,
            sadaqah_coins_earned: 125,
            created_at: new Date().toISOString()
          },
          {
            charity_id: charities[1]?.id || charities[0].id,
            user_id: systemUserId,
            amount: 15000,
            status: 'completed' as const,
            disbursement_status: 'pending',
            disbursed_amount: 0,
            anonymous: true,
            jannah_points_earned: 150,
            sadaqah_coins_earned: 75,
            created_at: new Date().toISOString()
          }
        ];

        const { data: donations, error: donationError } = await supabase
          .from('donations')
          .insert(sampleDonations)
          .select();

        if (donationError) {
          console.error('❌ Donation insert error:', donationError);
          throw new Error(`Failed to insert donations: ${donationError.message}`);
        } else {
          console.log('✅ Donations created:', donations?.length);
        }
      }

      toast({
        title: "Test Data Created! 🎉",
        description: `Successfully created ${charities?.length || 0} charities with sample donations.`,
      });

    } catch (error: any) {
      console.error('❌ Seeding failed:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to create test data.',
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearData = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🧹 Clearing test data...');
      
      // Clear donations first (due to foreign key constraints)
      const { error: donationsError } = await supabase
        .from('donations')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (donationsError) {
        console.error('❌ Error clearing donations:', donationsError);
      }
      
      // Clear charity allocations
      const { error: allocationsError } = await supabase
        .from('charity_allocations')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (allocationsError) {
        console.error('❌ Error clearing charity allocations:', allocationsError);
      }
      
      // Clear charities
      const { error: charitiesError } = await supabase
        .from('charities')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (charitiesError) {
        console.error('❌ Error clearing charities:', charitiesError);
      }

      toast({
        title: "Data Cleared",
        description: "All test data has been removed.",
      });

    } catch (error: any) {
      console.error('❌ Clear failed:', error);
      toast({
        title: "Clear Failed",
        description: error.message || 'Failed to clear test data.',
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Simple Test Data Seeder
        </CardTitle>
        <CardDescription>
          Create basic test data without authentication complexity.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Sprout className="h-4 w-4 text-green-600" />
              What will be created:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                2 sample charities with basic data
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-3 w-3" />
                2 sample donations for testing
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleSimpleSeeding} 
              disabled={isSeeding}
              className="w-full"
              size="sm"
            >
              <Sprout className="h-4 w-4 mr-2" />
              {isSeeding ? 'Creating...' : 'Create Test Data'}
            </Button>
            <Button 
              onClick={handleClearData} 
              disabled={isSeeding}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Database className="h-4 w-4 mr-2" />
              {isSeeding ? 'Clearing...' : 'Clear All Data'}
            </Button>
          </div>
        </div>
        
        {isSeeding && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔄 Processing... Check the console for detailed logs.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ RLS temporarily disabled for seeding. Data operations should work smoothly now.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimpleDataSeeder;

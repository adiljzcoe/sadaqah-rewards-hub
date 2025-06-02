
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Database, Seedling, Users, Heart } from 'lucide-react';

const DataSeeder = () => {
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const seedCharities = async () => {
    console.log('🌱 Seeding charities...');
    
    const charities = [
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
        last_activity_date: new Date().toISOString()
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
        last_activity_date: new Date().toISOString()
      },
      {
        name: 'Emergency Relief International',
        description: 'Rapid response humanitarian aid',
        category: 'emergency',
        country: 'Global',
        verified: true,
        trust_rating: 7.8,
        activity_score: 78,
        total_raised: 180000,
        website_url: 'https://emergencyrelief.org',
        last_activity_date: new Date().toISOString()
      },
      {
        name: 'Education for All',
        description: 'Building schools and supporting education initiatives',
        category: 'education',
        country: 'Pakistan',
        verified: true,
        trust_rating: 8.9,
        activity_score: 89,
        total_raised: 195000,
        website_url: 'https://educationforall.org',
        last_activity_date: new Date().toISOString()
      }
    ];

    const { data: insertedCharities, error } = await supabase
      .from('charities')
      .insert(charities)
      .select();

    if (error) {
      console.error('Error seeding charities:', error);
      throw error;
    }

    console.log('✅ Charities seeded:', insertedCharities?.length);
    return insertedCharities;
  };

  const seedCharityAllocations = async (charities: any[]) => {
    console.log('🌱 Seeding charity allocations...');
    
    const allocations = charities.map(charity => ({
      charity_id: charity.id,
      allocation_percentage: 25, // Equal allocation for demo
      is_active: true,
      manual_override: false,
      trust_weight: charity.trust_rating,
      activity_weight: charity.activity_score / 100
    }));

    const { data, error } = await supabase
      .from('charity_allocations')
      .insert(allocations)
      .select();

    if (error) {
      console.error('Error seeding allocations:', error);
      throw error;
    }

    console.log('✅ Charity allocations seeded:', data?.length);
    return data;
  };

  const seedDonations = async (charities: any[]) => {
    console.log('🌱 Seeding donations...');
    
    const donations = [];
    
    // Create multiple donations to different charities
    for (let i = 0; i < 10; i++) {
      const charity = charities[i % charities.length];
      donations.push({
        charity_id: charity.id,
        amount: Math.floor(Math.random() * 50000) + 10000, // £100-£500 in pence
        status: 'completed',
        disbursement_status: 'pending',
        disbursed_amount: 0,
        anonymous: Math.random() > 0.7,
        jannah_points_earned: Math.floor(Math.random() * 500) + 100,
        sadaqah_coins_earned: Math.floor(Math.random() * 250) + 50,
        message: i % 3 === 0 ? 'May Allah accept this donation' : null
      });
    }

    const { data, error } = await supabase
      .from('donations')
      .insert(donations)
      .select();

    if (error) {
      console.error('Error seeding donations:', error);
      throw error;
    }

    console.log('✅ Donations seeded:', data?.length);
    return data;
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      console.log('🚀 Starting data seeding process...');
      
      // First, check if data already exists
      const { data: existingCharities } = await supabase
        .from('charities')
        .select('id')
        .limit(1);

      if (existingCharities && existingCharities.length > 0) {
        toast({
          title: "Data Already Exists",
          description: "Test data has already been seeded. Clear the database first if you want to reseed.",
          variant: "destructive"
        });
        return;
      }

      // Seed charities first
      const charities = await seedCharities();
      
      // Then seed allocations
      await seedCharityAllocations(charities);
      
      // Finally seed donations
      await seedDonations(charities);

      toast({
        title: "Data Seeding Complete! 🎉",
        description: "Test charities, allocations, and donations have been created. You can now test the disbursement system.",
      });

    } catch (error) {
      console.error('❌ Error seeding data:', error);
      toast({
        title: "Seeding Failed",
        description: "Failed to seed test data. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const clearData = async () => {
    setIsSeeding(true);
    try {
      console.log('🧹 Clearing test data...');
      
      // Delete in reverse order due to foreign key constraints
      await supabase.from('batch_disbursements').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('disbursement_batches').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('project_funds').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('donations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('charity_allocations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('charities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      toast({
        title: "Data Cleared",
        description: "All test data has been removed from the database.",
      });

    } catch (error) {
      console.error('❌ Error clearing data:', error);
      toast({
        title: "Clear Failed",
        description: "Failed to clear test data. Check console for details.",
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
          Test Data Management
        </CardTitle>
        <CardDescription>
          Seed the database with test data to try the disbursement system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Seedling className="h-4 w-4 text-green-600" />
              What will be created:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                4 verified charities with trust ratings
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-3 w-3" />
                10 completed donations (pending disbursement)
              </li>
              <li className="flex items-center gap-2">
                <Database className="h-3 w-3" />
                Charity allocation records
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={handleSeedData} 
              disabled={isSeeding}
              className="w-full"
              size="sm"
            >
              <Seedling className="h-4 w-4 mr-2" />
              {isSeeding ? 'Seeding...' : 'Seed Test Data'}
            </Button>
            <Button 
              onClick={clearData} 
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
      </CardContent>
    </Card>
  );
};

export default DataSeeder;

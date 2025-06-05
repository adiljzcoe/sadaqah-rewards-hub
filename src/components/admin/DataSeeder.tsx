import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Database, Sprout, Users, Heart } from 'lucide-react';

const DataSeeder = () => {
  const { toast } = useToast();
  const { fakeAdminLogin, user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  const seedCharities = async () => {
    console.log('🌱 Seeding charities...');
    console.log('👤 Current user:', user);
    
    const charities = [
      {
        name: 'Islamic Relief Worldwide',
        description: 'Providing humanitarian aid and emergency relief across the globe',
        category: 'emergency',
        country: 'Global',
        verified: true,
        trust_rating: 9.5,
        activity_score: 95,
        total_raised: 450000,
        website_url: 'https://islamic-relief.org',
        logo_url: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop&crop=center',
        last_activity_date: new Date().toISOString(),
        total_posts: 25,
        verified_posts: 23
      },
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
        logo_url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=400&fit=crop&crop=center',
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
        logo_url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=center',
        last_activity_date: new Date().toISOString(),
        total_posts: 18,
        verified_posts: 15
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
        logo_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&crop=center',
        last_activity_date: new Date().toISOString(),
        total_posts: 14,
        verified_posts: 12
      }
    ];

    try {
      console.log('🔄 Attempting to insert charities...');
      
      // Test auth session first
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('🔐 Current session:', session ? 'Active' : 'None', sessionError);
      
      const { data: insertedCharities, error } = await supabase
        .from('charities')
        .insert(charities)
        .select();

      if (error) {
        console.error('❌ Insert failed:', error);
        console.error('❌ Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ Charities seeded successfully:', insertedCharities?.length);
      console.log('📊 Inserted charity IDs:', insertedCharities?.map(c => c.id));
      return insertedCharities || [];

    } catch (error) {
      console.error('❌ Failed to seed charities:', error);
      throw error;
    }
  };

  const seedCharityPartners = async (charities: any[]) => {
    console.log('🌱 Seeding charity partners with subdomains...');
    
    const charityPartners = [
      {
        charity_id: charities[0].id, // Islamic Relief
        partner_slug: 'islamicrelief',
        commission_rate: 0.05,
        is_active: true,
        monthly_spend_limit: 10000,
        ad_spend_budget: 5000
      },
      {
        charity_id: charities[1].id, // Water Wells
        partner_slug: 'waterwells',
        commission_rate: 0.05,
        is_active: true,
        monthly_spend_limit: 8000,
        ad_spend_budget: 3000
      },
      {
        charity_id: charities[2].id, // Hope Orphanage
        partner_slug: 'hopeorphanage',
        commission_rate: 0.05,
        is_active: true,
        monthly_spend_limit: 6000,
        ad_spend_budget: 2000
      }
    ];

    try {
      console.log('🔄 Inserting charity partners...');
      const { data, error } = await supabase
        .from('charity_partners')
        .insert(charityPartners)
        .select();

      if (error) {
        console.error('❌ Error seeding charity partners:', error);
        throw error;
      }

      console.log('✅ Charity partners seeded:', data?.length);
      return data;
    } catch (error) {
      console.error('❌ Failed to seed charity partners:', error);
      throw error;
    }
  };

  const seedCharityAllocations = async (charities: any[]) => {
    console.log('🌱 Seeding charity allocations...');
    console.log('🎯 Creating allocations for', charities.length, 'charities');
    
    const allocations = charities.map(charity => ({
      charity_id: charity.id,
      allocation_percentage: 25,
      is_active: true,
      manual_override: false,
      trust_weight: charity.trust_rating,
      activity_weight: charity.activity_score / 100
    }));

    try {
      console.log('🔄 Inserting charity allocations...');
      const { data, error } = await supabase
        .from('charity_allocations')
        .insert(allocations)
        .select();

      if (error) {
        console.error('❌ Error seeding allocations:', error);
        throw error;
      }

      console.log('✅ Charity allocations seeded:', data?.length);
      return data;
    } catch (error) {
      console.error('❌ Failed to seed allocations:', error);
      throw error;
    }
  };

  const seedDonations = async (charities: any[]) => {
    console.log('🌱 Seeding donations...');
    
    const userId = user?.id || 'fake-admin-id';
    console.log('👤 Using user ID for donations:', userId);
    
    const donations = [];
    
    for (let i = 0; i < 15; i++) {
      const charity = charities[i % charities.length];
      const amount = Math.floor(Math.random() * 50000) + 10000;
      
      donations.push({
        user_id: userId,
        charity_id: charity.id,
        amount: amount,
        status: 'completed',
        disbursement_status: 'pending',
        disbursed_amount: 0,
        anonymous: Math.random() > 0.7,
        jannah_points_earned: Math.floor(amount / 100) * 10,
        sadaqah_coins_earned: Math.floor(amount / 100) * 5,
        message: i % 3 === 0 ? 'May Allah accept this donation' : null,
        created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      });
    }

    try {
      console.log('🔄 Inserting donations...');
      const { data, error } = await supabase
        .from('donations')
        .insert(donations)
        .select();

      if (error) {
        console.error('❌ Error seeding donations:', error);
        throw error;
      }

      console.log('✅ Donations seeded successfully:', data?.length);
      return data;
    } catch (error) {
      console.error('❌ Failed to seed donations:', error);
      throw error;
    }
  };

  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
      console.log('🚀 Starting data seeding process...');
      
      // Use fake admin login
      console.log('🔐 Setting up fake admin authentication...');
      fakeAdminLogin();
      
      // Wait for auth state to update
      console.log('⏳ Waiting for auth state to update...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('👤 Auth state after fake login:', { user });
      
      toast({
        title: "Starting Data Seeding",
        description: "Creating test data...",
      });

      const charities = await seedCharities();
      
      if (!charities || charities.length === 0) {
        throw new Error('No charities were created');
      }
      
      await seedCharityPartners(charities);
      await seedCharityAllocations(charities);
      const donations = await seedDonations(charities);

      toast({
        title: "Data Seeding Complete! 🎉",
        description: `Created ${charities.length} charities with subdomains and ${donations?.length || 0} donations.`,
      });

      console.log('✅ Subdomain examples created:');
      console.log('🌐 islamicrelief.yourjannah.com - /subdomain/islamicrelief');
      console.log('🌐 waterwells.yourjannah.com - /subdomain/waterwells');
      console.log('🌐 hopeorphanage.yourjannah.com - /subdomain/hopeorphanage');

    } catch (error: any) {
      console.error('❌ Error during seeding:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to seed test data. Check console for details.',
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
      
      fakeAdminLogin();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🗑️ Clearing donations...');
      await supabase.from('donations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing charity partners...');
      await supabase.from('charity_partners').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing charity allocations...');
      await supabase.from('charity_allocations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing charities...');
      await supabase.from('charities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      toast({
        title: "Data Cleared Successfully",
        description: "All test data has been removed from the database.",
      });

    } catch (error: any) {
      console.error('❌ Error clearing data:', error);
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
          Test Data Management
        </CardTitle>
        <CardDescription>
          Seed the database with test data including charity subdomains to try the system.
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
                4 verified charities with realistic trust ratings
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-3 w-3" />
                3 charity partners with subdomain slugs (islamicrelief, waterwells, hopeorphanage)
              </li>
              <li className="flex items-center gap-2">
                <Database className="h-3 w-3" />
                15 completed donations and charity allocation records
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
              <Sprout className="h-4 w-4 mr-2" />
              {isSeeding ? 'Seeding Data...' : 'Seed Test Data'}
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
        
        {isSeeding && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔄 Processing... Check the console for detailed progress logs.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ After seeding, test subdomains at: /subdomain/islamicrelief, /subdomain/waterwells, /subdomain/hopeorphanage
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSeeder;

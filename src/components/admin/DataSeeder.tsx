
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

  const createAdminProfile = async (userId: string) => {
    console.log('🔧 Creating admin profile for user:', userId);
    
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single();

      if (existingProfile) {
        console.log('✅ Admin profile already exists');
        return;
      }

      // Create the admin profile
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: 'admin@test.com',
          full_name: 'Test Admin',
          role: 'admin'
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating admin profile:', error);
        throw error;
      }

      console.log('✅ Admin profile created successfully:', data);
    } catch (error) {
      console.error('❌ Failed to create admin profile:', error);
      throw error;
    }
  };

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
        last_activity_date: new Date().toISOString(),
        total_posts: 8,
        verified_posts: 6
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
        last_activity_date: new Date().toISOString(),
        total_posts: 14,
        verified_posts: 12
      }
    ];

    try {
      const { data: insertedCharities, error } = await supabase
        .from('charities')
        .insert(charities)
        .select();

      if (error) {
        console.error('❌ Insert failed:', error);
        throw error;
      }

      console.log('✅ Charities seeded successfully:', insertedCharities?.length);
      return insertedCharities || [];

    } catch (error) {
      console.error('❌ Failed to seed charities:', error);
      throw error;
    }
  };

  const seedCharityAllocations = async (charities: any[]) => {
    console.log('🌱 Seeding charity allocations...');
    
    const allocations = charities.map(charity => ({
      charity_id: charity.id,
      allocation_percentage: 25,
      is_active: true,
      manual_override: false,
      trust_weight: charity.trust_rating,
      activity_weight: charity.activity_score / 100
    }));

    try {
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
    
    // First, try to get a real user from the profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(5);

    if (profilesError) {
      console.error('❌ Error fetching profiles:', profilesError);
    }

    const availableUserIds = profiles?.map(p => p.id) || [];
    console.log('👥 Available user IDs:', availableUserIds.length);

    const donations = [];
    
    for (let i = 0; i < 15; i++) {
      const charity = charities[i % charities.length];
      const amount = Math.floor(Math.random() * 50000) + 10000;
      
      // Use a real user ID if available, otherwise set to null
      const userId = availableUserIds.length > 0 
        ? availableUserIds[i % availableUserIds.length] 
        : null;
      
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
      
      const currentUser = user || { id: '00000000-0000-0000-0000-000000000001' };
      console.log('👤 Current user after setup:', currentUser);
      
      // Create admin profile first
      await createAdminProfile(currentUser.id);
      
      toast({
        title: "Starting Data Seeding",
        description: "Creating test data...",
      });

      const charities = await seedCharities();
      
      if (!charities || charities.length === 0) {
        throw new Error('No charities were created');
      }
      
      await seedCharityAllocations(charities);
      const donations = await seedDonations(charities);

      toast({
        title: "Data Seeding Complete! 🎉",
        description: `Created ${charities.length} charities and ${donations?.length || 0} donations.`,
      });

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
          Seed the database with test data to try the disbursement system.
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
                15 completed donations (£100-£500 each, pending disbursement)
              </li>
              <li className="flex items-center gap-2">
                <Database className="h-3 w-3" />
                Charity allocation records for weighted distribution
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

        <div className="mt-4 p-3 bg-amber-50 rounded-lg">
          <p className="text-sm text-amber-700">
            ⚠️ Create some users first using the "User Mgmt" tab for better donation seeding with real user IDs.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSeeder;

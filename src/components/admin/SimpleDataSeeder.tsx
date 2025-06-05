
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Sprout, Heart } from 'lucide-react';

const SimpleDataSeeder = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSimpleSeeding = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🌱 Starting simple data seeding...');
      
      // Step 1: Create a test profile if user doesn't exist
      let userId = user?.id;
      if (!userId) {
        console.log('👤 No authenticated user, creating test profile...');
        
        // Create a test profile first
        const testUserId = '00000000-0000-0000-0000-000000000001';
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: testUserId,
            email: 'test@example.com',
            full_name: 'Test User',
            jannah_points: 0,
            sadaqah_coins: 0,
            total_donated: 0,
            donation_count: 0
          });

        if (profileError) {
          console.log('📝 Profile creation note:', profileError.message);
          // Continue anyway - profile might already exist
        }
        
        userId = testUserId;
      }
      
      console.log('👤 Using user ID:', userId);

      // Step 2: Create sample charities
      const charities = [
        {
          name: 'Help Children Foundation',
          description: 'Supporting underprivileged children with education and healthcare',
          category: 'children',
          country: 'Global',
          verified: true,
          trust_rating: 8.5,
          activity_score: 85,
          total_raised: 25000,
          logo_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=400&fit=crop&crop=center'
        },
        {
          name: 'Water for All',
          description: 'Providing clean water access to communities in need',
          category: 'water',
          country: 'Global', 
          verified: true,
          trust_rating: 9.0,
          activity_score: 90,
          total_raised: 18500,
          logo_url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=400&h=400&fit=crop&crop=center'
        }
      ];

      console.log('🏛️ Creating charities...');
      const { data: createdCharities, error: charityError } = await supabase
        .from('charities')
        .insert(charities)
        .select();

      if (charityError) {
        console.error('❌ Charity creation error:', charityError);
        throw new Error(`Failed to create charities: ${charityError.message}`);
      }

      console.log('✅ Charities created successfully:', createdCharities?.length);

      // Step 3: Create sample donations with proper typing
      if (createdCharities && createdCharities.length > 0) {
        const donations = [
          {
            user_id: userId,
            charity_id: createdCharities[0].id,
            amount: 50,
            status: 'completed' as const,
            jannah_points_earned: 500,
            sadaqah_coins_earned: 250,
            message: 'May Allah accept this donation',
            anonymous: false
          },
          {
            user_id: userId,
            charity_id: createdCharities[1].id,
            amount: 25,
            status: 'completed' as const,
            jannah_points_earned: 250,
            sadaqah_coins_earned: 125,
            anonymous: true
          }
        ];

        console.log('💰 Creating donations...');
        const { data: createdDonations, error: donationError } = await supabase
          .from('donations')
          .insert(donations)
          .select();

        if (donationError) {
          console.error('❌ Donation insert error:', donationError);
          throw new Error(`Failed to insert donations: ${donationError.message}`);
        }

        console.log('✅ Donations created successfully:', createdDonations?.length);
      }

      toast({
        title: "Test Data Created! 🎉",
        description: `Successfully created ${createdCharities?.length || 0} charities and sample donations.`,
      });

    } catch (error: any) {
      console.error('❌ Seeding failed:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to create test data. Check console for details.',
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
          <Sprout className="h-5 w-5 text-green-600" />
          Simple Test Data Seeder
        </CardTitle>
        <CardDescription>
          Create basic test data including charities and donations for testing purposes.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="font-medium flex items-center gap-2">
            <Heart className="h-4 w-4 text-red-500" />
            What will be created:
          </h4>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
            <li>• 2 verified charities with realistic data</li>
            <li>• 2 sample donations for testing</li>
            <li>• Test user profile (if needed)</li>
          </ul>
        </div>
        
        <Button 
          onClick={handleSimpleSeeding} 
          disabled={isSeeding}
          className="w-full"
        >
          {isSeeding ? 'Creating Test Data...' : 'Create Test Data'}
        </Button>
        
        {isSeeding && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔄 Creating test data... Check the console for detailed progress.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SimpleDataSeeder;

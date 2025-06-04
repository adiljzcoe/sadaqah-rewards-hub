
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Users, Baby, Coins, Heart, Gift } from 'lucide-react';

const FamilyDataSeeder = () => {
  const { toast } = useToast();
  const { fakeUserLogin, user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);

  const seedFamilyData = async () => {
    setIsSeeding(true);
    try {
      console.log('🚀 Starting family data seeding...');
      
      // Use fake user login for seeding
      fakeUserLogin();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentUser = user || { id: '00000000-0000-0000-0000-000000000001' };
      
      // Create sample family accounts
      const families = [
        {
          family_name: 'The Ahmed Family',
          parent_user_id: currentUser.id,
        },
        {
          family_name: 'The Khan Family', 
          parent_user_id: '00000000-0000-0000-0000-000000000002',
        },
        {
          family_name: 'The Hassan Family',
          parent_user_id: '00000000-0000-0000-0000-000000000003',
        }
      ];

      console.log('👨‍👩‍👧‍👦 Creating family accounts...');
      const { data: familyAccounts, error: familyError } = await supabase
        .from('family_accounts')
        .insert(families)
        .select();

      if (familyError) throw familyError;
      console.log('✅ Family accounts created:', familyAccounts?.length);

      // Create kids accounts for each family
      const kidsAccounts = [];
      familyAccounts?.forEach((family, familyIndex) => {
        const kids = [
          {
            family_id: family.id,
            child_name: `Sara ${['Ahmed', 'Khan', 'Hassan'][familyIndex]}`,
            age: 8,
            sadaqah_coins: Math.floor(Math.random() * 200) + 50,
            jannah_points: Math.floor(Math.random() * 500) + 100,
            spending_limit_daily: 50,
          },
          {
            family_id: family.id,
            child_name: `Ali ${['Ahmed', 'Khan', 'Hassan'][familyIndex]}`,
            age: 12,
            sadaqah_coins: Math.floor(Math.random() * 300) + 100,
            jannah_points: Math.floor(Math.random() * 800) + 200,
            spending_limit_daily: 100,
          },
          {
            family_id: family.id,
            child_name: `Zara ${['Ahmed', 'Khan', 'Hassan'][familyIndex]}`,
            age: 6,
            sadaqah_coins: Math.floor(Math.random() * 150) + 30,
            jannah_points: Math.floor(Math.random() * 300) + 50,
            spending_limit_daily: 30,
          }
        ];
        kidsAccounts.push(...kids);
      });

      console.log('🧒 Creating kids accounts...');
      const { data: createdKids, error: kidsError } = await supabase
        .from('kids_accounts')
        .insert(kidsAccounts)
        .select();

      if (kidsError) throw kidsError;
      console.log('✅ Kids accounts created:', createdKids?.length);

      // Get some charities to use for donations
      const { data: charities } = await supabase
        .from('charities')
        .select('id, name')
        .limit(5);

      if (charities && charities.length > 0 && createdKids) {
        // Create sample kids donations
        const kidsDonations = [];
        createdKids.forEach(kid => {
          // Create 2-5 random donations per kid
          const donationCount = Math.floor(Math.random() * 4) + 2;
          for (let i = 0; i < donationCount; i++) {
            const charity = charities[Math.floor(Math.random() * charities.length)];
            const amount = Math.floor(Math.random() * 20) + 5; // 5-25 coins
            kidsDonations.push({
              kids_account_id: kid.id,
              charity_id: charity.id,
              amount_coins: amount,
              jannah_points_earned: Math.floor(amount / 10) * 10,
              message: Math.random() > 0.5 ? 'For the children in need' : null,
              donation_date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            });
          }
        });

        console.log('💝 Creating kids donations...');
        const { data: donations, error: donationsError } = await supabase
          .from('kids_donations')
          .insert(kidsDonations)
          .select();

        if (donationsError) throw donationsError;
        console.log('✅ Kids donations created:', donations?.length);
      }

      // Create sample family topups
      if (familyAccounts && createdKids) {
        const topups = [];
        familyAccounts.forEach(family => {
          const familyKids = createdKids.filter(kid => kid.family_id === family.id);
          familyKids.forEach(kid => {
            // Create 1-3 topups per kid
            const topupCount = Math.floor(Math.random() * 3) + 1;
            for (let i = 0; i < topupCount; i++) {
              const coinsAdded = Math.floor(Math.random() * 100) + 50;
              const pointsAdded = Math.floor(Math.random() * 50) + 25;
              topups.push({
                family_id: family.id,
                kids_account_id: kid.id,
                parent_user_id: family.parent_user_id,
                sadaqah_coins_added: coinsAdded,
                jannah_points_added: pointsAdded,
                amount_paid: (coinsAdded * 0.1) + (Math.random() * 5), // ~10p per coin plus variation
                topup_reason: Math.random() > 0.5 ? 'Weekly allowance' : 'Good behavior reward',
              });
            }
          });
        });

        console.log('💰 Creating family topups...');
        const { data: topupData, error: topupError } = await supabase
          .from('family_topups')
          .insert(topups)
          .select();

        if (topupError) throw topupError;
        console.log('✅ Family topups created:', topupData?.length);
      }

      toast({
        title: "Family Data Seeded Successfully! 👨‍👩‍👧‍👦",
        description: `Created ${familyAccounts?.length} families with kids accounts, donations, and topups.`,
      });

    } catch (error: any) {
      console.error('❌ Error seeding family data:', error);
      toast({
        title: "Family Seeding Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const clearFamilyData = async () => {
    setIsSeeding(true);
    try {
      console.log('🧹 Clearing family data...');
      
      fakeUserLogin();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('🗑️ Clearing kids donations...');
      await supabase.from('kids_donations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing family topups...');
      await supabase.from('family_topups').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing kids accounts...');
      await supabase.from('kids_accounts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      
      console.log('🗑️ Clearing family accounts...');
      await supabase.from('family_accounts').delete().neq('id', '00000000-0000-0000-0000-000000000000');

      toast({
        title: "Family Data Cleared",
        description: "All family-related test data has been removed.",
      });

    } catch (error: any) {
      console.error('❌ Error clearing family data:', error);
      toast({
        title: "Clear Failed",
        description: error.message,
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
          <Users className="h-5 w-5" />
          Family Account Data Seeder
        </CardTitle>
        <CardDescription>
          Populate the database with realistic family accounts, kids profiles, and donation history.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Baby className="h-4 w-4 text-blue-600" />
              What will be created:
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Users className="h-3 w-3" />
                3 family accounts (Ahmed, Khan, Hassan families)
              </li>
              <li className="flex items-center gap-2">
                <Baby className="h-3 w-3" />
                9 kids accounts with realistic names and ages
              </li>
              <li className="flex items-center gap-2">
                <Coins className="h-3 w-3" />
                Random sadaqah coins (30-300) and jannah points per kid
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-3 w-3" />
                20+ micro donations from kids to charities
              </li>
              <li className="flex items-center gap-2">
                <Gift className="h-3 w-3" />
                Parent topup history with realistic amounts
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={seedFamilyData} 
              disabled={isSeeding}
              className="w-full"
              size="sm"
            >
              <Users className="h-4 w-4 mr-2" />
              {isSeeding ? 'Seeding Family Data...' : 'Seed Family Data'}
            </Button>
            <Button 
              onClick={clearFamilyData} 
              disabled={isSeeding}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Users className="h-4 w-4 mr-2" />
              {isSeeding ? 'Clearing...' : 'Clear Family Data'}
            </Button>
          </div>
        </div>
        
        {isSeeding && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔄 Creating family accounts and kids profiles... Check console for detailed progress.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            💡 This creates realistic family data so the Family Account page looks active and trustworthy.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FamilyDataSeeder;

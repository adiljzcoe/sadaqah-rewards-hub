
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BookOpen, Loader2 } from 'lucide-react';

const DuasLibrarySeeder = () => {
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const additionalDuas = [
    {
      category: 'Protection',
      title: 'Dua for Protection from Evil Eye',
      arabic_text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      transliteration: 'A\'udhu bi kalimat Allah at-tammat min sharri ma khalaq',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created',
      reference: 'Sahih Muslim',
      benefits: 'Protection from evil eye, black magic, and harmful creatures',
      when_to_recite: 'Morning, evening, and before sleep',
      recommended_donation_amount: 200
    },
    {
      category: 'Health & Healing',
      title: 'Dua for Sick Person',
      arabic_text: 'اللَّهُمَّ اشْفِ عَبْدَكَ يَنْكَأُ لَكَ عَدُوًّا أَوْ يَمْشِي لَكَ إِلَى صَلَاةٍ',
      transliteration: 'Allahumma ishfi \'abdaka yanka\'u laka \'aduwwan aw yamshi laka ila salah',
      translation: 'O Allah, heal Your servant who fights Your enemy or walks to prayer for You',
      reference: 'Sunan Abu Dawud',
      benefits: 'Healing from illness and diseases',
      when_to_recite: 'When visiting the sick or when oneself is ill',
      recommended_donation_amount: 300
    },
    {
      category: 'Forgiveness',
      title: 'Dua for Seeking Forgiveness',
      arabic_text: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
      transliteration: 'Rabbi ghfir li dhanbi wa khata\'i wa jahli',
      translation: 'My Lord, forgive my sins, my mistakes, and my ignorance',
      reference: 'Sahih al-Bukhari',
      benefits: 'Forgiveness of sins and spiritual purification',
      when_to_recite: 'After prayers and during times of repentance',
      recommended_donation_amount: 250
    },
    {
      category: 'Guidance',
      title: 'Dua for Guidance (Istikhara)',
      arabic_text: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
      transliteration: 'Allahumma inni astakhiruka bi \'ilmika wa astaqdiruka bi qudratik',
      translation: 'O Allah, I seek Your guidance by Your knowledge and Your power',
      reference: 'Sahih al-Bukhari',
      benefits: 'Divine guidance in making important decisions',
      when_to_recite: 'When facing important decisions',
      recommended_donation_amount: 400
    },
    {
      category: 'Family',
      title: 'Dua for Parents',
      arabic_text: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ',
      transliteration: 'Rabbi ghfir li wa li walidayy',
      translation: 'My Lord, forgive me and my parents',
      reference: 'Quran 17:24',
      benefits: 'Blessings and forgiveness for parents',
      when_to_recite: 'Daily, especially after prayers',
      recommended_donation_amount: 300
    },
    {
      category: 'Deceased',
      title: 'Dua for the Deceased',
      arabic_text: 'اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ وَعَافِهِ وَاعْفُ عَنْهُ',
      transliteration: 'Allahumma ghfir lahu warhamhu wa \'afihi wa\'fu \'anhu',
      translation: 'O Allah, forgive him and have mercy on him and give him strength and pardon him',
      reference: 'Sahih Muslim',
      benefits: 'Mercy and forgiveness for the deceased',
      when_to_recite: 'At funerals and when remembering the deceased',
      recommended_donation_amount: 500
    },
    {
      category: 'Prosperity',
      title: 'Dua for Increase in Sustenance',
      arabic_text: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
      transliteration: 'Allahumma barik lana fima razaqtana',
      translation: 'O Allah, bless us in what You have provided for us',
      reference: 'Sunan at-Tirmidhi',
      benefits: 'Increase in halal sustenance and blessings',
      when_to_recite: 'Before meals and when grateful for provisions',
      recommended_donation_amount: 350
    },
    {
      category: 'Travel',
      title: 'Dua for Travel',
      arabic_text: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
      transliteration: 'Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin',
      translation: 'Glory to Him who has subjected this to us, and we could never have it by our efforts',
      reference: 'Quran 43:13-14',
      benefits: 'Safe travel and protection during journeys',
      when_to_recite: 'When beginning any journey',
      recommended_donation_amount: 200
    }
  ];

  const handleSeeding = async () => {
    setIsSeeding(true);
    
    try {
      console.log('📚 Creating additional duas library entries...');
      
      // Get categories
      const { data: categories } = await supabase
        .from('dua_categories')
        .select('id, name');

      if (!categories) {
        throw new Error('No categories found');
      }

      // Prepare duas data
      const duasToInsert = additionalDuas.map(dua => {
        const category = categories.find(cat => cat.name === dua.category);
        if (!category) {
          console.warn(`Category ${dua.category} not found`);
          return null;
        }

        return {
          category_id: category.id,
          title: dua.title,
          arabic_text: dua.arabic_text,
          transliteration: dua.transliteration,
          translation: dua.translation,
          reference: dua.reference,
          benefits: dua.benefits,
          when_to_recite: dua.when_to_recite,
          recommended_donation_amount: dua.recommended_donation_amount,
          is_featured: false,
          created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
      }).filter(Boolean);

      const { data: createdDuas, error: duaError } = await supabase
        .from('duas_library')
        .insert(duasToInsert)
        .select();

      if (duaError) {
        console.error('❌ Duas library insert error:', duaError);
        throw new Error(`Failed to insert duas: ${duaError.message}`);
      }

      console.log('✅ Duas library entries created successfully:', createdDuas?.length);

      toast({
        title: "Duas Library Populated! 📚",
        description: `Successfully created ${createdDuas?.length || 0} additional duas in the library.`,
      });

    } catch (error: any) {
      console.error('❌ Duas library seeding failed:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to create duas library entries.',
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearDuas = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🧹 Clearing duas library...');
      
      // Clear dua donations first
      const { error: donationsError } = await supabase
        .from('dua_donations')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (donationsError) {
        console.error('❌ Error clearing dua donations:', donationsError);
      }
      
      // Clear duas library
      const { error: duasError } = await supabase
        .from('duas_library')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (duasError) {
        console.error('❌ Error clearing duas library:', duasError);
      }

      toast({
        title: "Duas Library Cleared",
        description: "All duas and donations have been removed.",
      });

    } catch (error: any) {
      console.error('❌ Clear failed:', error);
      toast({
        title: "Clear Failed",
        description: error.message || 'Failed to clear duas library.',
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
          <BookOpen className="h-5 w-5" />
          Duas Library Data Seeder
        </CardTitle>
        <CardDescription>
          Populate the duas library with authentic Islamic duas and manage library data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button 
            onClick={handleSeeding} 
            disabled={isSeeding}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <BookOpen className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Creating...' : 'Populate Duas Library'}
          </Button>
          
          <Button 
            onClick={handleClearDuas} 
            disabled={isSeeding}
            variant="outline"
            className="w-full"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <BookOpen className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Clearing...' : 'Clear All Duas'}
          </Button>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            ℹ️ This will add {additionalDuas.length} authentic duas to the library with donation functionality.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DuasLibrarySeeder;

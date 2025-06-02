
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Loader2 } from 'lucide-react';

const DuaDataSeeder = () => {
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const sampleDuas = [
    {
      title: "Du'a for the Ummah",
      description: "A prayer for unity and peace among all Muslims worldwide",
      audio_url: "https://example.com/audio1.mp3", // Placeholder URL
      audio_duration: 45,
      is_anonymous: false,
      ameen_count: 127
    },
    {
      title: "Prayer for Palestine",
      description: "Seeking Allah's protection and justice for our brothers and sisters",
      audio_url: "https://example.com/audio2.mp3", // Placeholder URL
      audio_duration: 38,
      is_anonymous: true,
      ameen_count: 89
    },
    {
      title: "Du'a for Guidance",
      description: "Asking Allah to guide us on the straight path",
      audio_url: "https://example.com/audio3.mp3", // Placeholder URL
      audio_duration: 52,
      is_anonymous: false,
      ameen_count: 234
    },
    {
      title: "Protection from Harm",
      description: "Seeking Allah's protection from all forms of evil",
      audio_url: "https://example.com/audio4.mp3", // Placeholder URL
      audio_duration: 41,
      is_anonymous: true,
      ameen_count: 156
    },
    {
      title: "Du'a for Forgiveness",
      description: "Asking Allah for His mercy and forgiveness",
      audio_url: "https://example.com/audio5.mp3", // Placeholder URL
      audio_duration: 33,
      is_anonymous: false,
      ameen_count: 178
    }
  ];

  const handleSeeding = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🤲 Creating sample du\'as...');
      
      // Use a system user ID for the sample du'as
      const systemUserId = '00000000-0000-0000-0000-000000000001';
      
      const duasToInsert = sampleDuas.map(dua => ({
        ...dua,
        user_id: systemUserId,
        created_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() // Random time in last 7 days
      }));

      const { data: createdDuas, error: duaError } = await supabase
        .from('duas')
        .insert(duasToInsert)
        .select();

      if (duaError) {
        console.error('❌ Du\'a insert error:', duaError);
        throw new Error(`Failed to insert du'as: ${duaError.message}`);
      }

      console.log('✅ Du\'as created successfully:', createdDuas?.length);

      // Create some sample ameen records to make it more realistic
      if (createdDuas && createdDuas.length > 0) {
        const ameenRecords = [];
        
        createdDuas.forEach(dua => {
          // Add random ameen counts
          for (let i = 0; i < Math.min(dua.ameen_count, 50); i++) {
            ameenRecords.push({
              dua_id: dua.id,
              user_id: systemUserId,
              ip_address: '127.0.0.1',
              created_at: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
            });
          }
        });

        if (ameenRecords.length > 0) {
          const { error: ameenError } = await supabase
            .from('dua_ameens')
            .insert(ameenRecords);

          if (ameenError) {
            console.error('❌ Ameen insert error:', ameenError);
          } else {
            console.log('✅ Ameen records created:', ameenRecords.length);
          }
        }
      }

      toast({
        title: "Sample Du'as Created! 🤲",
        description: `Successfully created ${createdDuas?.length || 0} sample du'as with ameen counts.`,
      });

    } catch (error: any) {
      console.error('❌ Du\'a seeding failed:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to create sample du\'as.',
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearDuas = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🧹 Clearing sample du\'as...');
      
      // Clear ameen records first
      const { error: ameenError } = await supabase
        .from('dua_ameens')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (ameenError) {
        console.error('❌ Error clearing ameen records:', ameenError);
      }
      
      // Clear du'as
      const { error: duasError } = await supabase
        .from('duas')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (duasError) {
        console.error('❌ Error clearing du\'as:', duasError);
      }

      toast({
        title: "Sample Data Cleared",
        description: "All sample du'as have been removed.",
      });

    } catch (error: any) {
      console.error('❌ Clear failed:', error);
      toast({
        title: "Clear Failed",
        description: error.message || 'Failed to clear sample data.',
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
          <MessageCircle className="h-5 w-5" />
          Du'a Sample Data Seeder
        </CardTitle>
        <CardDescription>
          Create sample du'as to see how the du'a feed looks and works.
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
              <MessageCircle className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Creating...' : 'Create Sample Du\'as'}
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
              <MessageCircle className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Clearing...' : 'Clear All Du\'as'}
          </Button>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            ℹ️ This will create 5 sample du'as with realistic ameen counts so you can see how the feature works.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DuaDataSeeder;

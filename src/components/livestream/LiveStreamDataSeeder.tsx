
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Tv } from 'lucide-react';

const LiveStreamDataSeeder = () => {
  const { toast } = useToast();
  const [isSeeding, setIsSeeding] = useState(false);

  const sampleStreams = [
    {
      title: "Ramadan Live Prayers",
      description: "Join us for live Tarawih prayers from Masjid Al-Haram",
      stream_url: "https://www.youtube.com/embed/live_stream?channel=UC_anzFQIRNJ7vZAyxB37uZw",
      thumbnail_url: "https://i.ytimg.com/vi/m0XfqAnjx4k/maxresdefault.jpg",
      is_live: true,
      viewer_count: 1250,
      category: "prayers",
      scheduled_start: new Date().toISOString(),
      scheduled_end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "Weekly Qur'an Tafsir",
      description: "In-depth explanation of Surah Al-Baqarah by Sheikh Abdullah",
      stream_url: "https://www.youtube.com/embed/live_stream?channel=UCXeIYCN6dTbpUqJvie53D0g",
      thumbnail_url: "https://i.ytimg.com/vi/no1jXpj0nv8/maxresdefault.jpg",
      is_live: false,
      viewer_count: 468,
      category: "education",
      scheduled_start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      scheduled_end: new Date(Date.now() + 26 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "Live Charity Drive",
      description: "Fundraising event for building wells in Africa",
      stream_url: "https://www.youtube.com/embed/live_stream?channel=UC5m5CoJJMS4-5bOdQjQuiVQ",
      thumbnail_url: "https://i.ytimg.com/vi/8qTs0GjO2kU/maxresdefault.jpg",
      is_live: true,
      viewer_count: 891,
      category: "charity",
      scheduled_start: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      scheduled_end: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString()
    },
    {
      title: "Jumu'ah Khutbah",
      description: "Friday sermon on patience and perseverance",
      stream_url: "https://www.youtube.com/embed/live_stream?channel=UCLQVl5os_tZ8ihWS7ViNlOA",
      thumbnail_url: "https://i.ytimg.com/vi/T1OZ8mv9kUg/maxresdefault.jpg",
      is_live: false,
      viewer_count: 0,
      category: "sermon",
      scheduled_start: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      scheduled_end: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString()
    }
  ];

  const handleSeeding = async () => {
    setIsSeeding(true);
    
    try {
      console.log('📺 Creating sample live streams...');
      
      // Use a system user ID for the sample streams
      const systemUserId = '00000000-0000-0000-0000-000000000001';
      
      const streamsToInsert = sampleStreams.map(stream => ({
        ...stream,
        created_by: systemUserId
      }));

      const { data: createdStreams, error: streamError } = await supabase
        .from('live_streams')
        .insert(streamsToInsert)
        .select();

      if (streamError) {
        console.error('❌ Stream insert error:', streamError);
        throw new Error(`Failed to insert streams: ${streamError.message}`);
      }

      console.log('✅ Live streams created successfully:', createdStreams?.length);

      // Create some sample chat messages
      if (createdStreams && createdStreams.length > 0) {
        const chatMessages = [
          {
            stream_id: createdStreams[0].id,
            user_id: systemUserId,
            message: "Salaam everyone! The stream is starting shortly.",
            message_type: "text"
          },
          {
            stream_id: createdStreams[0].id,
            user_id: systemUserId,
            message: "MashaAllah, beautiful recitation!",
            message_type: "text"
          },
          {
            stream_id: createdStreams[0].id,
            user_id: null,
            message: "Someone joined the stream",
            message_type: "join"
          },
          {
            stream_id: createdStreams[2].id,
            user_id: systemUserId,
            message: "Welcome everyone to our charity drive!",
            message_type: "text"
          },
          {
            stream_id: createdStreams[2].id,
            user_id: systemUserId,
            message: "Our goal is to raise funds for 10 water wells.",
            message_type: "text"
          }
        ];

        const { error: messagesError } = await supabase
          .from('stream_chat_messages')
          .insert(chatMessages);

        if (messagesError) {
          console.error('❌ Chat messages insert error:', messagesError);
        } else {
          console.log('✅ Sample chat messages created');
        }

        // Create some reactions
        const reactionTypes = ['heart', 'like', 'clap', 'pray'];
        const reactions = [];
        
        for (let i = 0; i < 20; i++) {
          reactions.push({
            stream_id: createdStreams[Math.floor(Math.random() * createdStreams.length)].id,
            user_id: systemUserId,
            reaction_type: reactionTypes[Math.floor(Math.random() * reactionTypes.length)]
          });
        }

        const { error: reactionsError } = await supabase
          .from('stream_reactions')
          .insert(reactions);

        if (reactionsError) {
          console.error('❌ Reactions insert error:', reactionsError);
        } else {
          console.log('✅ Sample reactions created');
        }
      }

      toast({
        title: "Sample Streams Created! 📺",
        description: `Successfully created ${createdStreams?.length || 0} sample streams with chat messages and reactions.`,
      });

    } catch (error: any) {
      console.error('❌ Stream seeding failed:', error);
      toast({
        title: "Seeding Failed",
        description: error.message || 'Failed to create sample streams.',
        variant: "destructive",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleClearData = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🧹 Clearing sample data...');
      
      // Clear reactions first (due to foreign key constraints)
      const { error: reactionsError } = await supabase
        .from('stream_reactions')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (reactionsError) {
        console.error('❌ Error clearing reactions:', reactionsError);
      }
      
      // Clear chat messages
      const { error: messagesError } = await supabase
        .from('stream_chat_messages')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (messagesError) {
        console.error('❌ Error clearing chat messages:', messagesError);
      }
      
      // Clear streams
      const { error: streamsError } = await supabase
        .from('live_streams')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (streamsError) {
        console.error('❌ Error clearing streams:', streamsError);
      }

      toast({
        title: "Data Cleared",
        description: "All sample stream data has been removed.",
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
          <Tv className="h-5 w-5" />
          Live TV Data Seeder
        </CardTitle>
        <CardDescription>
          Create sample live streams and chat messages to see how the live TV feature works.
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
              <Tv className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Creating...' : 'Create Sample Streams'}
          </Button>
          
          <Button 
            onClick={handleClearData} 
            disabled={isSeeding}
            variant="outline"
            className="w-full"
          >
            {isSeeding ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Tv className="h-4 w-4 mr-2" />
            )}
            {isSeeding ? 'Clearing...' : 'Clear All Stream Data'}
          </Button>
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            ℹ️ This will create 4 sample live streams with realistic chat messages and reactions so you can see how the feature works.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStreamDataSeeder;

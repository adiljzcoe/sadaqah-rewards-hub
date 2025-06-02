
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { supabase } from '@/integrations/supabase/client';
import { 
  Tv, 
  RefreshCw, 
  AlertCircle, 
  Loader2, 
  Clock, 
  ActivitySquare 
} from 'lucide-react';
import LiveStreamPlayer from './LiveStreamPlayer';
import LiveChat from './LiveChat';

interface LiveStream {
  id: string;
  title: string;
  description: string | null;
  stream_url: string;
  thumbnail_url: string | null;
  is_live: boolean;
  viewer_count: number;
  category: string;
  created_at: string;
  scheduled_start: string | null;
  scheduled_end: string | null;
}

const LiveStreams = () => {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [upcomingStreams, setUpcomingStreams] = useState<LiveStream[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStreamId, setSelectedStreamId] = useState<string | null>(null);
  const [selectedStream, setSelectedStream] = useState<LiveStream | null>(null);

  const fetchStreams = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch all streams
      const { data, error } = await supabase
        .from('live_streams')
        .select('*')
        .order('is_live', { ascending: false })
        .order('viewer_count', { ascending: false });
        
      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        setLiveStreams([]);
        setUpcomingStreams([]);
        return;
      }

      // Split streams into live and upcoming
      const now = new Date();
      const live: LiveStream[] = [];
      const upcoming: LiveStream[] = [];

      data.forEach(stream => {
        if (stream.is_live) {
          live.push(stream);
        } else {
          if (stream.scheduled_start && new Date(stream.scheduled_start) > now) {
            upcoming.push(stream);
          } else {
            // Past streams or unscheduled can also go to upcoming for now
            upcoming.push(stream);
          }
        }
      });

      // Sort live by viewer count
      live.sort((a, b) => b.viewer_count - a.viewer_count);
      
      // Sort upcoming by scheduled_start
      upcoming.sort((a, b) => {
        const dateA = a.scheduled_start ? new Date(a.scheduled_start) : new Date(8640000000000000);
        const dateB = b.scheduled_start ? new Date(b.scheduled_start) : new Date(8640000000000000);
        return dateA.getTime() - dateB.getTime();
      });

      setLiveStreams(live);
      setUpcomingStreams(upcoming);
      
      // Select first live stream by default if none selected
      if (!selectedStreamId && live.length > 0) {
        setSelectedStreamId(live[0].id);
        setSelectedStream(live[0]);
      }
    } catch (err: any) {
      console.error('Error fetching streams:', err);
      setError(err.message || 'Failed to load live streams');
    } finally {
      setLoading(false);
    }
  };

  const handleStreamSelect = (streamId: string) => {
    setSelectedStreamId(streamId);
    
    // Find the selected stream in either live or upcoming
    const stream = [...liveStreams, ...upcomingStreams].find(s => s.id === streamId) || null;
    setSelectedStream(stream);
  };

  useEffect(() => {
    fetchStreams();
    
    // Subscribe to real-time updates for live streams
    const channel = supabase
      .channel('live_streams_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'live_streams'
        },
        () => {
          fetchStreams();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Find the currently selected stream
  useEffect(() => {
    if (selectedStreamId) {
      const stream = [...liveStreams, ...upcomingStreams].find(
        s => s.id === selectedStreamId
      ) || null;
      setSelectedStream(stream);
    }
  }, [selectedStreamId, liveStreams, upcomingStreams]);

  const renderStreamEmbed = (streamUrl: string) => {
    // Handle YouTube URLs
    if (streamUrl.includes('youtube.com') || streamUrl.includes('youtu.be')) {
      return (
        <iframe
          className="w-full aspect-video rounded-lg"
          src={streamUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }
    
    // Handle other video types
    return (
      <video
        controls
        className="w-full aspect-video rounded-lg bg-black"
        src={streamUrl}
      >
        Your browser does not support the video tag.
      </video>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tv className="h-6 w-6 text-green-600" />
            Live TV
          </h2>
          <p className="text-gray-600">
            Watch live streams and join the conversation
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchStreams}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
      
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stream Player Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player */}
          <Card className="bg-gradient-to-br from-white to-green-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">
                {selectedStream ? selectedStream.title : "No stream selected"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStream ? (
                <>
                  {renderStreamEmbed(selectedStream.stream_url)}
                  
                  {/* Stream Info */}
                  <div className="mt-4">
                    {selectedStream.description && (
                      <p className="text-gray-600 mb-2">{selectedStream.description}</p>
                    )}
                    <div className="flex items-center flex-wrap gap-2 text-sm text-gray-500 mt-2">
                      {selectedStream.is_live ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                          <span>LIVE NOW</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>
                            {selectedStream.scheduled_start 
                              ? new Date(selectedStream.scheduled_start).toLocaleString() 
                              : "Not scheduled"}
                          </span>
                        </div>
                      )}
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <ActivitySquare className="h-4 w-4" />
                        <span>{selectedStream.viewer_count} viewers</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center p-8">
                    <Tv className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Select a stream to watch</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Chat */}
          {selectedStream && (
            <LiveChat 
              streamId={selectedStream.id} 
              streamTitle={selectedStream.title}
            />
          )}
          
          {/* Stream List */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Available Streams</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                </div>
              ) : (
                <Tabs defaultValue="live" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="live" className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Live ({liveStreams.length})
                    </TabsTrigger>
                    <TabsTrigger value="upcoming" className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      Upcoming ({upcomingStreams.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="live" className="space-y-4">
                    {liveStreams.length === 0 ? (
                      <div className="text-center py-8">
                        <ActivitySquare className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-600">No live streams at the moment</p>
                      </div>
                    ) : (
                      liveStreams.map(stream => (
                        <LiveStreamPlayer
                          key={stream.id}
                          stream={stream}
                          onStreamSelect={handleStreamSelect}
                          isSelected={selectedStreamId === stream.id}
                        />
                      ))
                    )}
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="space-y-4">
                    {upcomingStreams.length === 0 ? (
                      <div className="text-center py-8">
                        <Clock className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-600">No upcoming streams scheduled</p>
                      </div>
                    ) : (
                      upcomingStreams.map(stream => (
                        <LiveStreamPlayer
                          key={stream.id}
                          stream={stream}
                          onStreamSelect={handleStreamSelect}
                          isSelected={selectedStreamId === stream.id}
                        />
                      ))
                    )}
                  </TabsContent>
                </Tabs>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LiveStreams;

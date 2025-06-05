
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Volume2, VolumeX, Clock, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface YouTubeChannel {
  id: string;
  channel_name: string;
  channel_id: string;
  channel_url: string;
  is_active: boolean;
  priority: number;
}

interface QueuedVideo {
  video_id: string;
  video_url: string;
  video_title: string;
  channel_name: string;
}

interface AthanTime {
  prayer_name: string;
  audio_url: string | null;
  duration_seconds: number;
}

const YouTubeScheduler = () => {
  const [currentVideo, setCurrentVideo] = useState<QueuedVideo | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isAthanTime, setIsAthanTime] = useState(false);
  const [currentAhan, setCurrentAhan] = useState<AthanTime | null>(null);
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const athanAudioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Mock data for demonstration - replace with actual Supabase queries
  const mockChannels: YouTubeChannel[] = [
    {
      id: '1',
      channel_name: 'Islamic Lectures',
      channel_id: 'UC1234567890',
      channel_url: 'https://www.youtube.com/@islamiclectures',
      is_active: true,
      priority: 1
    },
    {
      id: '2',
      channel_name: 'Quran Recitation',
      channel_id: 'UC0987654321',
      channel_url: 'https://www.youtube.com/@quranrecitation',
      is_active: true,
      priority: 2
    }
  ];

  const mockVideos: QueuedVideo[] = [
    {
      video_id: 'dQw4w9WgXcQ',
      video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      video_title: 'Beautiful Quran Recitation',
      channel_name: 'Quran Recitation'
    },
    {
      video_id: 'jNQXAC9IVRw',
      video_url: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      video_title: 'Islamic Lecture on Faith',
      channel_name: 'Islamic Lectures'
    }
  ];

  // Check for Athan time every minute
  useEffect(() => {
    const checkAthanTime = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);
      
      // Mock athan times - replace with actual Supabase query
      const athanTimes = [
        { prayer_name: 'Fajr', time: '05:30', duration_seconds: 300 },
        { prayer_name: 'Dhuhr', time: '12:15', duration_seconds: 300 },
        { prayer_name: 'Asr', time: '15:30', duration_seconds: 300 },
        { prayer_name: 'Maghrib', time: '18:45', duration_seconds: 300 },
        { prayer_name: 'Isha', time: '20:00', duration_seconds: 300 }
      ];

      const currentAthan = athanTimes.find(athan => athan.time === currentTime);
      
      if (currentAthan && !isAthanTime) {
        setIsAthanTime(true);
        setCurrentAhan({
          prayer_name: currentAthan.prayer_name,
          audio_url: null, // Add actual athan audio URL
          duration_seconds: currentAthan.duration_seconds
        });
        
        // Pause current video
        if (isPlaying) {
          setIsPlaying(false);
        }
        
        toast({
          title: `${currentAthan.prayer_name} Time`,
          description: "Athan is now playing. Video will resume after.",
        });

        // Resume video after athan duration
        setTimeout(() => {
          setIsAthanTime(false);
          setCurrentAhan(null);
          setIsPlaying(true);
        }, currentAthan.duration_seconds * 1000);
      }
    };

    checkAthanTime();
    const interval = setInterval(checkAthanTime, 60000);
    return () => clearInterval(interval);
  }, [isAthanTime, isPlaying, toast]);

  // Load initial video
  useEffect(() => {
    if (!currentVideo && mockVideos.length > 0) {
      setCurrentVideo(mockVideos[0]);
    }
    setChannels(mockChannels);
  }, []);

  const playNextVideo = () => {
    const currentIndex = mockVideos.findIndex(v => v.video_id === currentVideo?.video_id);
    const nextIndex = (currentIndex + 1) % mockVideos.length;
    setCurrentVideo(mockVideos[nextIndex]);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isAthanTime) {
      toast({
        title: "Athan in Progress",
        description: "Please wait for Athan to complete.",
        variant: "destructive"
      });
      return;
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getEmbedUrl = (videoUrl: string) => {
    const baseUrl = videoUrl.replace('watch?v=', 'embed/');
    const autoplay = isPlaying && !isAthanTime ? '1' : '0';
    const mute = isMuted ? '1' : '0';
    return `${baseUrl}?autoplay=${autoplay}&mute=${mute}&controls=1&rel=0`;
  };

  return (
    <div className="space-y-6">
      {/* Current Video Player */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Live Islamic Content</span>
            <div className="flex items-center gap-2">
              {isAthanTime && (
                <Badge className="bg-green-600 animate-pulse">
                  <Star className="h-3 w-3 mr-1" />
                  {currentAhan?.prayer_name} Time
                </Badge>
              )}
              <Badge variant={isPlaying ? "default" : "secondary"}>
                {isPlaying ? "Live" : "Paused"}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* YouTube Video */}
            {currentVideo && !isAthanTime && (
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                <iframe
                  ref={iframeRef}
                  src={getEmbedUrl(currentVideo.video_url)}
                  title={currentVideo.video_title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}

            {/* Athan Overlay */}
            {isAthanTime && (
              <div className="aspect-video bg-gradient-to-br from-green-800 to-emerald-900 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Star className="h-24 w-24 mx-auto mb-4 animate-pulse" />
                  <h2 className="text-3xl font-bold mb-2">{currentAhan?.prayer_name}</h2>
                  <p className="text-lg opacity-90">Adhan is now playing</p>
                  <div className="mt-4 animate-pulse">
                    <Clock className="h-6 w-6 inline mr-2" />
                    Video will resume shortly...
                  </div>
                </div>
                {currentAhan?.audio_url && (
                  <audio
                    ref={athanAudioRef}
                    src={currentAhan.audio_url}
                    autoPlay
                    className="hidden"
                  />
                )}
              </div>
            )}

            {/* Video Info */}
            {currentVideo && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{currentVideo.video_title}</h3>
                <p className="text-gray-600">by {currentVideo.channel_name}</p>
              </div>
            )}

            {/* Controls */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Button onClick={togglePlay} disabled={isAthanTime}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button variant="outline" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button variant="outline" onClick={playNextVideo} disabled={isAthanTime}>
                  Next Video
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Channel Management */}
      <Card>
        <CardHeader>
          <CardTitle>Active Channels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {channels.map((channel) => (
              <div key={channel.id} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{channel.channel_name}</h4>
                <p className="text-sm text-gray-600 mb-2">Priority: {channel.priority}</p>
                <Badge variant={channel.is_active ? "default" : "secondary"}>
                  {channel.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YouTubeScheduler;

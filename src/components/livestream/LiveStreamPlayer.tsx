
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Users, Clock, Play, Pause } from 'lucide-react';

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

interface LiveStreamPlayerProps {
  stream: LiveStream;
  onStreamSelect: (streamId: string) => void;
  isSelected: boolean;
}

const LiveStreamPlayer: React.FC<LiveStreamPlayerProps> = ({ 
  stream, 
  onStreamSelect, 
  isSelected 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const formatViewerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return 'No schedule';
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
        isSelected ? 'ring-2 ring-green-500 bg-green-50' : ''
      }`}
      onClick={() => onStreamSelect(stream.id)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {stream.title}
            </CardTitle>
            {stream.description && (
              <p className="text-sm text-gray-600 mb-2">{stream.description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {stream.is_live ? (
              <Badge className="bg-red-500 text-white animate-pulse">
                🔴 LIVE
              </Badge>
            ) : (
              <Badge variant="secondary">
                📺 Scheduled
              </Badge>
            )}
            <Badge variant="outline" className="capitalize">
              {stream.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Video Placeholder */}
        <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
          {stream.thumbnail_url ? (
            <img 
              src={stream.thumbnail_url} 
              alt={stream.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Play className="h-16 w-16 text-white opacity-70" />
            </div>
          )}
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 rounded-full w-16 h-16 p-0"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Live Indicator */}
          {stream.is_live && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-red-500 text-white">
                🔴 LIVE
              </Badge>
            </div>
          )}
        </div>

        {/* Stream Info */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{formatViewerCount(stream.viewer_count)} watching</span>
            </div>
            {stream.scheduled_start && (
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{formatTime(stream.scheduled_start)}</span>
              </div>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onStreamSelect(stream.id);
            }}
          >
            {isSelected ? 'Watching' : 'Join Chat'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveStreamPlayer;

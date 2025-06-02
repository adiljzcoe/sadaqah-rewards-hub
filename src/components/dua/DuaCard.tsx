
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Pause, Clock, User, Volume2 } from 'lucide-react';
import AmeenButton from './AmeenButton';
import { useAuth } from '@/hooks/useAuth';

interface DuaCardProps {
  dua: {
    id: string;
    title: string;
    description: string | null;
    audio_url: string;
    audio_duration: number | null;
    is_anonymous: boolean;
    ameen_count: number;
    created_at: string;
    user_id: string;
    profiles?: {
      full_name: string;
    } | null;
    user_has_said_ameen?: boolean;
  };
  onAmeenUpdate: (duaId: string, newCount: number, userHasAmeen: boolean) => void;
}

const DuaCard: React.FC<DuaCardProps> = ({ dua, onAmeenUpdate }) => {
  const { user } = useAuth();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(dua.audio_duration || 0);
  const [hasUserSaidAmeen, setHasUserSaidAmeen] = useState(dua.user_has_said_ameen || false);
  const [ameenCount, setAmeenCount] = useState(dua.ameen_count);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAmeenUpdate = (newCount: number, userHasAmeen: boolean) => {
    setAmeenCount(newCount);
    setHasUserSaidAmeen(userHasAmeen);
    onAmeenUpdate(dua.id, newCount, userHasAmeen);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
      };

      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-green-50/30 border-green-100">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{dua.title}</h3>
            {dua.description && (
              <p className="text-sm text-gray-600 mb-2">{dua.description}</p>
            )}
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>
                  {dua.is_anonymous ? 'Anonymous' : dua.profiles?.full_name || 'Community Member'}
                </span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{formatTimeAgo(dua.created_at)}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Du'a
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Audio Player */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center justify-between mb-3">
            <Button
              onClick={togglePlayPause}
              size="sm"
              className="bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 p-0"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </Button>
            
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Volume2 className="h-4 w-4" />
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-green-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            ></div>
          </div>
          
          <audio
            ref={audioRef}
            src={dua.audio_url}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            preload="metadata"
          />
        </div>

        {/* Ameen Button */}
        <div className="flex justify-center">
          <AmeenButton
            duaId={dua.id}
            initialAmeenCount={ameenCount}
            hasUserSaidAmeen={hasUserSaidAmeen}
            onAmeenUpdate={handleAmeenUpdate}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DuaCard;

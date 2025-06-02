
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, Mic, Play, Pause, Heart, Star, Trophy } from 'lucide-react';

interface AdhanRecording {
  id: string;
  title: string;
  reciterName: string;
  audioUrl: string;
  uploadDate: Date;
  votes: number;
  playCount: number;
  duration: number;
  isPlaying?: boolean;
}

const AdhanUploader: React.FC = () => {
  const [recordings, setRecordings] = useState<AdhanRecording[]>([
    {
      id: '1',
      title: 'Beautiful Fajr Adhan',
      reciterName: 'Imam Abdullah',
      audioUrl: '/api/placeholder-audio',
      uploadDate: new Date('2024-01-15'),
      votes: 245,
      playCount: 1850,
      duration: 180
    },
    {
      id: '2',
      title: 'Melodious Maghrib Call',
      reciterName: 'Sheikh Muhammad',
      audioUrl: '/api/placeholder-audio',
      uploadDate: new Date('2024-01-10'),
      votes: 198,
      playCount: 1420,
      duration: 165
    },
    {
      id: '3',
      title: 'Peaceful Isha Adhan',
      reciterName: 'Hafiz Omar',
      audioUrl: '/api/placeholder-audio',
      uploadDate: new Date('2024-01-08'),
      votes: 176,
      playCount: 980,
      duration: 195
    }
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newRecording, setNewRecording] = useState({
    title: '',
    reciterName: ''
  });
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [userVotes, setUserVotes] = useState<Set<string>>(new Set());

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add new recording
          const newId = (recordings.length + 1).toString();
          setRecordings(prev => [...prev, {
            id: newId,
            title: newRecording.title || 'Untitled Adhan',
            reciterName: newRecording.reciterName || 'Anonymous',
            audioUrl: URL.createObjectURL(file),
            uploadDate: new Date(),
            votes: 0,
            playCount: 0,
            duration: 180
          }]);
          setNewRecording({ title: '', reciterName: '' });
          return 0;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleVote = (recordingId: string) => {
    if (userVotes.has(recordingId)) return;

    setRecordings(prev => prev.map(recording => 
      recording.id === recordingId 
        ? { ...recording, votes: recording.votes + 1 }
        : recording
    ));
    setUserVotes(prev => new Set([...prev, recordingId]));
  };

  const handlePlay = (recordingId: string) => {
    if (playingId === recordingId) {
      setPlayingId(null);
    } else {
      setPlayingId(recordingId);
      // Increment play count
      setRecordings(prev => prev.map(recording => 
        recording.id === recordingId 
          ? { ...recording, playCount: recording.playCount + 1 }
          : recording
      ));
    }
  };

  const topRecordings = [...recordings]
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <Mic className="h-6 w-6" />
            Upload Your Adhan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              placeholder="Adhan title (e.g., 'Beautiful Fajr Call')"
              value={newRecording.title}
              onChange={(e) => setNewRecording(prev => ({ ...prev, title: e.target.value }))}
            />
            <Input
              placeholder="Your name"
              value={newRecording.reciterName}
              onChange={(e) => setNewRecording(prev => ({ ...prev, reciterName: e.target.value }))}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Choose Audio File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-sm text-gray-600">
              Max 5MB • MP3, WAV, M4A
            </span>
          </div>

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top 5 This Month */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Top 5 Adhan This Month
            <Badge variant="outline" className="ml-2">Live Voting</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topRecordings.map((recording, index) => (
              <div key={recording.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    index === 0 ? 'bg-yellow-500' : 
                    index === 1 ? 'bg-gray-400' :
                    index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <Trophy className={`h-5 w-5 ${
                      index === 0 ? 'text-yellow-500' : 
                      index === 1 ? 'text-gray-400' :
                      'text-orange-500'
                    }`} />
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePlay(recording.id)}
                  className="shrink-0"
                >
                  {playingId === recording.id ? 
                    <Pause className="h-4 w-4" /> : 
                    <Play className="h-4 w-4" />
                  }
                </Button>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold truncate">{recording.title}</h4>
                  <p className="text-sm text-gray-600">by {recording.reciterName}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                    <span>{formatDuration(recording.duration)}</span>
                    <span>🎧 {recording.playCount} plays</span>
                    <span>📅 {recording.uploadDate.toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleVote(recording.id)}
                    disabled={userVotes.has(recording.id)}
                    className={userVotes.has(recording.id) ? 'bg-pink-50' : 'hover:bg-pink-50'}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${userVotes.has(recording.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
                    {recording.votes}
                  </Button>
                  {index < 5 && (
                    <Badge variant="secondary" className="mt-1 block">
                      Playing This Month
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Fair Play Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Star className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Fair Play System</h4>
              <p className="text-sm text-blue-700">
                Every month, the top 5 voted Adhan recordings are selected for community prayers. 
                To ensure fairness, each contributor can have maximum 1 Adhan in the monthly rotation, 
                giving everyone a chance to have their voice heard. Voting resets monthly!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdhanUploader;

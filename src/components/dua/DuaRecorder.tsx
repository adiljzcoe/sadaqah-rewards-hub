
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Mic, Square, Play, Pause, Upload, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DuaRecorderProps {
  onDuaCreated: () => void;
}

const DuaRecorder: React.FC<DuaRecorderProps> = ({ onDuaCreated }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [duration, setDuration] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startTimeRef = useRef<number>(0);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(track => track.stop());
      };
      
      startTimeRef.current = Date.now();
      mediaRecorder.start();
      setIsRecording(true);
      
      toast({
        title: "Recording Started 🎙️",
        description: "Speak your du'a clearly. Press stop when finished.",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      toast({
        title: "Recording Error",
        description: "Could not start recording. Please check microphone permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      const recordingDuration = Math.round((Date.now() - startTimeRef.current) / 1000);
      setDuration(recordingDuration);
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      toast({
        title: "Recording Complete ✅",
        description: `Du'a recorded (${recordingDuration}s). You can now review and upload.`,
      });
    }
  };

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const uploadDua = async () => {
    if (!audioBlob || !title.trim() || !user) {
      toast({
        title: "Missing Information",
        description: "Please add a title and record your du'a.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Create unique filename
      const timestamp = Date.now();
      const fileName = `dua_${user.id}_${timestamp}.webm`;
      
      // Upload audio file to Supabase storage (we'll create the bucket)
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('dua-recordings')
        .upload(fileName, audioBlob, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('dua-recordings')
        .getPublicUrl(fileName);

      // Save du'a to database
      const { error: dbError } = await supabase
        .from('duas')
        .insert({
          user_id: user.id,
          title: title.trim(),
          description: description.trim() || null,
          audio_url: publicUrl,
          audio_duration: duration,
          is_anonymous: isAnonymous
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      toast({
        title: "Du'a Shared! 🤲",
        description: "Your du'a has been shared with the Ummah.",
      });

      // Reset form
      setTitle('');
      setDescription('');
      setIsAnonymous(false);
      setAudioBlob(null);
      setAudioUrl(null);
      setDuration(0);
      
      onDuaCreated();
    } catch (error) {
      console.error('Error uploading du\'a:', error);
      toast({
        title: "Upload Failed",
        description: "Could not share your du'a. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, [audioUrl]);

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Mic className="h-5 w-5" />
          Record Your Du'a
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Du'a Title *</Label>
          <Input
            id="title"
            placeholder="e.g., Du'a for the Ummah, Prayer for Palestine..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Brief context about your du'a..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            rows={3}
          />
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="anonymous">Share anonymously</Label>
        </div>

        <div className="flex flex-col space-y-4">
          <div className="flex justify-center">
            {!isRecording && !audioBlob && (
              <Button
                onClick={startRecording}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-full text-lg"
                size="lg"
              >
                <Mic className="h-6 w-6 mr-2" />
                Start Recording
              </Button>
            )}

            {isRecording && (
              <Button
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 rounded-full text-lg animate-pulse"
                size="lg"
              >
                <Square className="h-6 w-6 mr-2" />
                Stop Recording
              </Button>
            )}

            {audioBlob && !isRecording && (
              <div className="flex gap-4">
                <Button
                  onClick={playAudio}
                  variant="outline"
                  className="border-green-200"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {isPlaying ? 'Pause' : 'Play'} ({duration}s)
                </Button>
                
                <Button
                  onClick={startRecording}
                  variant="outline"
                  className="border-orange-200 text-orange-600"
                >
                  <Mic className="h-4 w-4 mr-2" />
                  Re-record
                </Button>
              </div>
            )}
          </div>

          {audioBlob && (
            <Button
              onClick={uploadDua}
              disabled={isUploading || !title.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isUploading ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              {isUploading ? 'Sharing...' : 'Share Du\'a'}
            </Button>
          )}
        </div>

        {audioUrl && (
          <audio ref={audioRef} src={audioUrl} className="hidden" />
        )}
      </CardContent>
    </Card>
  );
};

export default DuaRecorder;

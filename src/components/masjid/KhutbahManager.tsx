
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BookOpen, Upload, Play, Eye, Heart } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface KhutbahManagerProps {
  masjidId: string;
}

const KhutbahManager = ({ masjidId }: KhutbahManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imam_name: '',
    khutbah_date: '',
    audio_url: '',
    video_url: '',
    transcript: '',
    language: 'English',
    tags: ''
  });

  // Fetch khutbahs for this masjid
  const { data: khutbahs, isLoading } = useQuery({
    queryKey: ['masjid-khutbahs', masjidId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_khutbahs')
        .select('*')
        .eq('masjid_id', masjidId)
        .order('khutbah_date', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Create khutbah mutation
  const createKhutbah = useMutation({
    mutationFn: async (data: any) => {
      const { data: khutbah, error } = await supabase
        .from('masjid_khutbahs')
        .insert({
          masjid_id: masjidId,
          ...data,
          tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : []
        })
        .select()
        .single();

      if (error) throw error;
      return khutbah;
    },
    onSuccess: () => {
      toast({ title: "Khutbah uploaded successfully!" });
      queryClient.invalidateQueries({ queryKey: ['masjid-khutbahs'] });
      setShowUploadForm(false);
      setFormData({
        title: '',
        description: '',
        imam_name: '',
        khutbah_date: '',
        audio_url: '',
        video_url: '',
        transcript: '',
        language: 'English',
        tags: ''
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error uploading khutbah",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createKhutbah.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Khutbah Library</h2>
        <Button onClick={() => setShowUploadForm(!showUploadForm)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload Khutbah
        </Button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle>Upload New Khutbah</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Khutbah Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="The Importance of Prayer"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="imam_name">Imam/Speaker Name *</Label>
                  <Input
                    id="imam_name"
                    value={formData.imam_name}
                    onChange={(e) => setFormData({ ...formData, imam_name: e.target.value })}
                    placeholder="Imam Abdullah"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of the khutbah topics..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="khutbah_date">Khutbah Date *</Label>
                  <Input
                    id="khutbah_date"
                    type="date"
                    value={formData.khutbah_date}
                    onChange={(e) => setFormData({ ...formData, khutbah_date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                      <SelectItem value="Urdu">Urdu</SelectItem>
                      <SelectItem value="Bengali">Bengali</SelectItem>
                      <SelectItem value="Turkish">Turkish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="audio_url">Audio URL</Label>
                  <Input
                    id="audio_url"
                    type="url"
                    value={formData.audio_url}
                    onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                    placeholder="https://example.com/audio.mp3"
                  />
                </div>

                <div>
                  <Label htmlFor="video_url">Video URL</Label>
                  <Input
                    id="video_url"
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="prayer, community, youth, ramadan"
                />
              </div>

              <div>
                <Label htmlFor="transcript">Transcript</Label>
                <Textarea
                  id="transcript"
                  value={formData.transcript}
                  onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
                  placeholder="Full transcript of the khutbah..."
                  rows={6}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createKhutbah.isPending}>
                  {createKhutbah.isPending ? 'Uploading...' : 'Upload Khutbah'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Khutbahs List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading khutbahs...</div>
        ) : khutbahs?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No khutbahs uploaded yet. Upload your first khutbah!
          </div>
        ) : (
          khutbahs?.map((khutbah) => (
            <Card key={khutbah.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{khutbah.title}</CardTitle>
                <p className="text-sm text-gray-600">By {khutbah.imam_name}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{new Date(khutbah.khutbah_date).toLocaleDateString()}</span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {khutbah.language}
                    </span>
                  </div>
                  
                  {khutbah.description && (
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {khutbah.description}
                    </p>
                  )}

                  {khutbah.tags && khutbah.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {khutbah.tags.slice(0, 3).map((tag: string, index: number) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                      {khutbah.tags.length > 3 && (
                        <span className="text-xs text-gray-500">+{khutbah.tags.length - 3} more</span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {khutbah.views_count}
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {khutbah.likes_count}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {khutbah.audio_url && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Audio
                      </Button>
                    )}
                    {khutbah.video_url && (
                      <Button variant="outline" size="sm" className="flex-1">
                        <Play className="h-4 w-4 mr-1" />
                        Video
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default KhutbahManager;

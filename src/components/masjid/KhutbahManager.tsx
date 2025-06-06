
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { BookOpen, Upload } from 'lucide-react';

interface KhutbahManagerProps {
  masjidId: string;
}

const KhutbahManager = ({ masjidId }: KhutbahManagerProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imam_name: '',
    khutbah_date: '',
    audio_url: '',
    video_url: '',
    transcript: '',
    language: 'English',
    tags: '',
    is_featured: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Khutbah submission:', { masjidId, ...formData });
    // TODO: Implement khutbah creation
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          Khutbah Management
        </CardTitle>
        <CardDescription>
          Upload and manage Friday khutbahs for your community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Khutbah Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="imam_name">Imam Name</Label>
              <Input
                id="imam_name"
                value={formData.imam_name}
                onChange={(e) => handleInputChange('imam_name', e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="khutbah_date">Khutbah Date</Label>
              <Input
                id="khutbah_date"
                type="date"
                value={formData.khutbah_date}
                onChange={(e) => handleInputChange('khutbah_date', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => handleInputChange('language', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                  <SelectItem value="Urdu">Urdu</SelectItem>
                  <SelectItem value="Turkish">Turkish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="audio_url">Audio URL</Label>
              <Input
                id="audio_url"
                type="url"
                placeholder="https://example.com/audio.mp3"
                value={formData.audio_url}
                onChange={(e) => handleInputChange('audio_url', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="video_url">Video URL</Label>
              <Input
                id="video_url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.video_url}
                onChange={(e) => handleInputChange('video_url', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="ramadan, charity, prayer"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="transcript">Transcript</Label>
            <Textarea
              id="transcript"
              value={formData.transcript}
              onChange={(e) => handleInputChange('transcript', e.target.value)}
              rows={5}
              placeholder="Enter the khutbah transcript here..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
            />
            <Label htmlFor="is_featured">Feature this khutbah</Label>
          </div>

          <Button type="submit" className="w-full">
            <Upload className="h-4 w-4 mr-2" />
            Upload Khutbah
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default KhutbahManager;

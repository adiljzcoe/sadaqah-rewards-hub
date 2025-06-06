
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Megaphone, Send } from 'lucide-react';

interface AnnouncementsManagerProps {
  masjidId: string;
}

const AnnouncementsManager = ({ masjidId }: AnnouncementsManagerProps) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    announcement_type: 'general',
    priority: 1,
    is_published: true,
    publish_date: new Date().toISOString().slice(0, 16),
    expire_date: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Announcement submission:', { masjidId, ...formData });
    // TODO: Implement announcement creation
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const announcementTypes = [
    { value: 'general', label: 'General' },
    { value: 'urgent', label: 'Urgent' },
    { value: 'event', label: 'Event' },
    { value: 'service', label: 'Service' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="h-5 w-5" />
          Announcements Management
        </CardTitle>
        <CardDescription>
          Create and manage community announcements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Announcement Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange('content', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="announcement_type">Type</Label>
              <Select value={formData.announcement_type} onValueChange={(value) => handleInputChange('announcement_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {announcementTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="priority">Priority (1-5)</Label>
              <Select value={formData.priority.toString()} onValueChange={(value) => handleInputChange('priority', parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Low</SelectItem>
                  <SelectItem value="2">2 - Normal</SelectItem>
                  <SelectItem value="3">3 - Medium</SelectItem>
                  <SelectItem value="4">4 - High</SelectItem>
                  <SelectItem value="5">5 - Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="publish_date">Publish Date & Time</Label>
              <Input
                id="publish_date"
                type="datetime-local"
                value={formData.publish_date}
                onChange={(e) => handleInputChange('publish_date', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="expire_date">Expiry Date & Time (Optional)</Label>
              <Input
                id="expire_date"
                type="datetime-local"
                value={formData.expire_date}
                onChange={(e) => handleInputChange('expire_date', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => handleInputChange('is_published', checked)}
            />
            <Label htmlFor="is_published">Publish immediately</Label>
          </div>

          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Create Announcement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AnnouncementsManager;

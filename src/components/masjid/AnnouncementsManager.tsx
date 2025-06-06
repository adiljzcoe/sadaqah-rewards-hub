
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Megaphone, Plus, AlertTriangle, Info, Calendar, Star } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AnnouncementsManagerProps {
  masjidId: string;
}

const AnnouncementsManager = ({ masjidId }: AnnouncementsManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    announcement_type: 'general',
    priority: '1',
    expire_date: ''
  });

  // Fetch announcements for this masjid
  const { data: announcements, isLoading } = useQuery({
    queryKey: ['masjid-announcements', masjidId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_announcements')
        .select('*')
        .eq('masjid_id', masjidId)
        .order('priority', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  // Create announcement mutation
  const createAnnouncement = useMutation({
    mutationFn: async (data: any) => {
      const { data: announcement, error } = await supabase
        .from('masjid_announcements')
        .insert({
          masjid_id: masjidId,
          ...data,
          priority: parseInt(data.priority),
          expire_date: data.expire_date || null
        })
        .select()
        .single();

      if (error) throw error;
      return announcement;
    },
    onSuccess: () => {
      toast({ title: "Announcement created successfully!" });
      queryClient.invalidateQueries({ queryKey: ['masjid-announcements'] });
      setShowCreateForm(false);
      setFormData({
        title: '',
        content: '',
        announcement_type: 'general',
        priority: '1',
        expire_date: ''
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createAnnouncement.mutate(formData);
  };

  const announcementTypes = [
    { value: 'urgent', label: 'Urgent', icon: AlertTriangle, color: 'text-red-600' },
    { value: 'general', label: 'General', icon: Info, color: 'text-blue-600' },
    { value: 'event', label: 'Event', icon: Calendar, color: 'text-green-600' },
    { value: 'service', label: 'Service', icon: Star, color: 'text-purple-600' }
  ];

  const getAnnouncementIcon = (type: string) => {
    const announcementType = announcementTypes.find(t => t.value === type);
    return announcementType ? announcementType.icon : Info;
  };

  const getAnnouncementColor = (type: string) => {
    const announcementType = announcementTypes.find(t => t.value === type);
    return announcementType ? announcementType.color : 'text-blue-600';
  };

  const getPriorityBadge = (priority: number) => {
    switch (priority) {
      case 5:
        return 'bg-red-100 text-red-800';
      case 4:
        return 'bg-orange-100 text-orange-800';
      case 3:
        return 'bg-yellow-100 text-yellow-800';
      case 2:
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Announcements</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Announcement
        </Button>
      </div>

      {/* Create Announcement Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Announcement Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Important: Ramadan Schedule Changes"
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Dear community members, we would like to inform you..."
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="announcement_type">Type</Label>
                  <Select
                    value={formData.announcement_type}
                    onValueChange={(value) => setFormData({ ...formData, announcement_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {announcementTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center">
                              <Icon className={`h-4 w-4 mr-2 ${type.color}`} />
                              {type.label}
                            </div>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - Critical</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="3">3 - Medium</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="1">1 - Informational</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="expire_date">Expiration Date (Optional)</Label>
                <Input
                  id="expire_date"
                  type="datetime-local"
                  value={formData.expire_date}
                  onChange={(e) => setFormData({ ...formData, expire_date: e.target.value })}
                />
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty for permanent announcement
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createAnnouncement.isPending}>
                  {createAnnouncement.isPending ? 'Creating...' : 'Create Announcement'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-8">Loading announcements...</div>
        ) : announcements?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No announcements created yet. Create your first announcement!
          </div>
        ) : (
          announcements?.map((announcement) => {
            const Icon = getAnnouncementIcon(announcement.announcement_type);
            const colorClass = getAnnouncementColor(announcement.announcement_type);
            
            return (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Icon className={`h-5 w-5 mt-1 ${colorClass}`} />
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${getPriorityBadge(announcement.priority)}`}>
                            Priority {announcement.priority}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(announcement.created_at).toLocaleDateString()}
                          </span>
                          {announcement.expire_date && (
                            <span className="text-xs text-orange-600">
                              Expires: {new Date(announcement.expire_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
                  <div className="mt-4 flex justify-between">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Preview
                      </Button>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AnnouncementsManager;

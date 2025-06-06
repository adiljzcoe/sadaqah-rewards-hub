
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';
import { useAuth } from '@/hooks/useAuth';

const EventsManager = () => {
  const { createEvent, userMasjidRole } = useMasjidManagement();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'lecture',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    registration_required: false,
    registration_fee: '',
    organizer_name: '',
    organizer_contact: '',
    is_recurring: false,
    recurrence_pattern: '',
    is_published: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userMasjidRole?.masjid_id) {
      alert('No masjid access found');
      return;
    }

    const eventData = {
      masjid_id: userMasjidRole.masjid_id,
      title: formData.title,
      description: formData.description,
      event_type: formData.event_type,
      start_date: formData.start_date,
      end_date: formData.end_date || undefined,
      location: formData.location || undefined,
      capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
      registration_required: formData.registration_required,
      registration_fee: formData.registration_fee ? parseFloat(formData.registration_fee) : 0,
      organizer_name: formData.organizer_name || undefined,
      organizer_contact: formData.organizer_contact || undefined,
      is_recurring: formData.is_recurring,
      recurrence_pattern: formData.recurrence_pattern || undefined,
      is_published: formData.is_published,
      created_by: user?.id
    };

    createEvent.mutate(eventData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!userMasjidRole) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">You don't have permission to manage events.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Events Management
        </CardTitle>
        <CardDescription>
          Create and manage community events for {userMasjidRole.masjids?.name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="event_type">Event Type</Label>
              <Select value={formData.event_type} onValueChange={(value) => handleInputChange('event_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lecture">Lecture</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="youth">Youth</SelectItem>
                  <SelectItem value="women">Women</SelectItem>
                  <SelectItem value="charity">Charity</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="start_date">Start Date & Time</Label>
              <Input
                id="start_date"
                type="datetime-local"
                value={formData.start_date}
                onChange={(e) => handleInputChange('start_date', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="end_date">End Date & Time (Optional)</Label>
              <Input
                id="end_date"
                type="datetime-local"
                value={formData.end_date}
                onChange={(e) => handleInputChange('end_date', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Main Hall, Conference Room, etc."
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="capacity">Capacity (Optional)</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organizer_name">Organizer Name</Label>
              <Input
                id="organizer_name"
                value={formData.organizer_name}
                onChange={(e) => handleInputChange('organizer_name', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="organizer_contact">Organizer Contact</Label>
              <Input
                id="organizer_contact"
                placeholder="Email or Phone"
                value={formData.organizer_contact}
                onChange={(e) => handleInputChange('organizer_contact', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="registration_required"
              checked={formData.registration_required}
              onCheckedChange={(checked) => handleInputChange('registration_required', checked)}
            />
            <Label htmlFor="registration_required">Registration Required</Label>
          </div>

          {formData.registration_required && (
            <div>
              <Label htmlFor="registration_fee">Registration Fee (£)</Label>
              <Input
                id="registration_fee"
                type="number"
                min="0"
                step="0.01"
                value={formData.registration_fee}
                onChange={(e) => handleInputChange('registration_fee', e.target.value)}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_recurring"
              checked={formData.is_recurring}
              onCheckedChange={(checked) => handleInputChange('is_recurring', checked)}
            />
            <Label htmlFor="is_recurring">Recurring Event</Label>
          </div>

          {formData.is_recurring && (
            <div>
              <Label htmlFor="recurrence_pattern">Recurrence Pattern</Label>
              <Select value={formData.recurrence_pattern} onValueChange={(value) => handleInputChange('recurrence_pattern', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select pattern" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_published"
              checked={formData.is_published}
              onCheckedChange={(checked) => handleInputChange('is_published', checked)}
            />
            <Label htmlFor="is_published">Publish Event</Label>
          </div>

          <Button type="submit" className="w-full" disabled={createEvent.isPending}>
            {createEvent.isPending ? 'Creating...' : 'Create Event'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventsManager;

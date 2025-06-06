
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Users, MapPin, Clock } from 'lucide-react';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface EventsManagerProps {
  masjidId: string;
}

const EventsManager = ({ masjidId }: EventsManagerProps) => {
  const { createEvent } = useMasjidManagement();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'community',
    start_date: '',
    end_date: '',
    location: '',
    capacity: '',
    registration_required: false,
    registration_fee: '0',
    organizer_name: '',
    organizer_contact: '',
    is_recurring: false,
    recurrence_pattern: '',
    is_published: true
  });

  // Fetch events for this masjid
  const { data: events, isLoading } = useQuery({
    queryKey: ['masjid-events', masjidId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_events')
        .select('*')
        .eq('masjid_id', masjidId)
        .order('start_date', { ascending: true });

      if (error) throw error;
      return data;
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createEvent.mutate({
      masjid_id: masjidId,
      ...formData,
      capacity: formData.capacity ? parseInt(formData.capacity) : undefined,
      registration_fee: parseFloat(formData.registration_fee),
      created_by: undefined // Will be set by auth
    });
    setShowCreateForm(false);
    setFormData({
      title: '',
      description: '',
      event_type: 'community',
      start_date: '',
      end_date: '',
      location: '',
      capacity: '',
      registration_required: false,
      registration_fee: '0',
      organizer_name: '',
      organizer_contact: '',
      is_recurring: false,
      recurrence_pattern: '',
      is_published: true
    });
  };

  const eventTypes = [
    { value: 'lecture', label: 'Islamic Lecture' },
    { value: 'community', label: 'Community Event' },
    { value: 'youth', label: 'Youth Program' },
    { value: 'women', label: 'Sisters Event' },
    { value: 'charity', label: 'Charity Drive' },
    { value: 'education', label: 'Educational Program' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Events Management</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Create Event Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Youth Islamic Program"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="event_type">Event Type *</Label>
                  <Select
                    value={formData.event_type}
                    onValueChange={(value) => setFormData({ ...formData, event_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event description and details..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="start_date">Start Date & Time *</Label>
                  <Input
                    id="start_date"
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="end_date">End Date & Time</Label>
                  <Input
                    id="end_date"
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Main prayer hall"
                  />
                </div>

                <div>
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizer_name">Organizer Name</Label>
                  <Input
                    id="organizer_name"
                    value={formData.organizer_name}
                    onChange={(e) => setFormData({ ...formData, organizer_name: e.target.value })}
                    placeholder="Brother Ahmed"
                  />
                </div>

                <div>
                  <Label htmlFor="organizer_contact">Organizer Contact</Label>
                  <Input
                    id="organizer_contact"
                    value={formData.organizer_contact}
                    onChange={(e) => setFormData({ ...formData, organizer_contact: e.target.value })}
                    placeholder="ahmed@masjid.org"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createEvent.isPending}>
                  {createEvent.isPending ? 'Creating...' : 'Create Event'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading events...</div>
        ) : events?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No events created yet. Create your first event!
          </div>
        ) : (
          events?.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {event.event_type}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {new Date(event.start_date).toLocaleTimeString()}
                  </div>
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      Capacity: {event.capacity}
                    </div>
                  )}
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    View Registrations
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default EventsManager;

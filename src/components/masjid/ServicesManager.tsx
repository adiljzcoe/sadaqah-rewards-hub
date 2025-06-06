
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, Plus, Phone, Mail, Clock } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ServicesManagerProps {
  masjidId: string;
}

const ServicesManager = ({ masjidId }: ServicesManagerProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    service_name: '',
    service_type: 'education',
    description: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    location: '',
    operating_hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    }
  });

  // Fetch services for this masjid
  const { data: services, isLoading } = useQuery({
    queryKey: ['masjid-services', masjidId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_services')
        .select('*')
        .eq('masjid_id', masjidId)
        .eq('is_active', true)
        .order('service_name');

      if (error) throw error;
      return data;
    }
  });

  // Create service mutation
  const createService = useMutation({
    mutationFn: async (data: any) => {
      const { data: service, error } = await supabase
        .from('masjid_services')
        .insert({
          masjid_id: masjidId,
          ...data
        })
        .select()
        .single();

      if (error) throw error;
      return service;
    },
    onSuccess: () => {
      toast({ title: "Service created successfully!" });
      queryClient.invalidateQueries({ queryKey: ['masjid-services'] });
      setShowCreateForm(false);
      setFormData({
        service_name: '',
        service_type: 'education',
        description: '',
        contact_person: '',
        contact_email: '',
        contact_phone: '',
        location: '',
        operating_hours: {
          monday: '',
          tuesday: '',
          wednesday: '',
          thursday: '',
          friday: '',
          saturday: '',
          sunday: ''
        }
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createService.mutate(formData);
  };

  const serviceTypes = [
    { value: 'education', label: 'Islamic Education', icon: '📚' },
    { value: 'charity', label: 'Charity & Welfare', icon: '🤲' },
    { value: 'counseling', label: 'Marriage Counseling', icon: '💑' },
    { value: 'wedding', label: 'Wedding Services', icon: '💒' },
    { value: 'funeral', label: 'Funeral Services', icon: '🕊️' },
    { value: 'halal_food', label: 'Halal Food', icon: '🍽️' }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Community Services</h2>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Create Service Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Service</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service_name">Service Name *</Label>
                  <Input
                    id="service_name"
                    value={formData.service_name}
                    onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                    placeholder="Quran Classes for Children"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="service_type">Service Type *</Label>
                  <Select
                    value={formData.service_type}
                    onValueChange={(value) => setFormData({ ...formData, service_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.icon} {type.label}
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
                  placeholder="Describe the service, requirements, and benefits..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="contact_person">Contact Person</Label>
                  <Input
                    id="contact_person"
                    value={formData.contact_person}
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                    placeholder="Brother Ahmed"
                  />
                </div>

                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={(e) => setFormData({ ...formData, contact_email: e.target.value })}
                    placeholder="education@masjid.org"
                  />
                </div>

                <div>
                  <Label htmlFor="contact_phone">Contact Phone</Label>
                  <Input
                    id="contact_phone"
                    value={formData.contact_phone}
                    onChange={(e) => setFormData({ ...formData, contact_phone: e.target.value })}
                    placeholder="+44 20 1234 5678"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Classroom 2, Ground Floor"
                />
              </div>

              {/* Operating Hours */}
              <div>
                <Label>Operating Hours</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
                  {days.map((day) => (
                    <div key={day}>
                      <Label htmlFor={day} className="text-sm capitalize">
                        {day}
                      </Label>
                      <Input
                        id={day}
                        value={formData.operating_hours[day as keyof typeof formData.operating_hours]}
                        onChange={(e) => setFormData({
                          ...formData,
                          operating_hours: {
                            ...formData.operating_hours,
                            [day]: e.target.value
                          }
                        })}
                        placeholder="9am-5pm"
                        className="text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createService.isPending}>
                  {createService.isPending ? 'Creating...' : 'Create Service'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-8">Loading services...</div>
        ) : services?.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No services added yet. Create your first service!
          </div>
        ) : (
          services?.map((service) => {
            const serviceType = serviceTypes.find(t => t.value === service.service_type);
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{service.service_name}</CardTitle>
                    <span className="text-2xl">{serviceType?.icon}</span>
                  </div>
                  <p className="text-sm text-gray-600">{serviceType?.label}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {service.description && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {service.description}
                      </p>
                    )}

                    {service.contact_person && (
                      <div className="text-sm">
                        <strong>Contact:</strong> {service.contact_person}
                      </div>
                    )}

                    <div className="space-y-1">
                      {service.contact_email && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <a href={`mailto:${service.contact_email}`} className="hover:underline">
                            {service.contact_email}
                          </a>
                        </div>
                      )}
                      {service.contact_phone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <a href={`tel:${service.contact_phone}`} className="hover:underline">
                            {service.contact_phone}
                          </a>
                        </div>
                      )}
                    </div>

                    {service.location && (
                      <div className="text-sm text-gray-600">
                        <strong>Location:</strong> {service.location}
                      </div>
                    )}

                    {service.operating_hours && Object.values(service.operating_hours).some(Boolean) && (
                      <div className="text-sm">
                        <div className="flex items-center text-gray-600 mb-1">
                          <Clock className="h-4 w-4 mr-2" />
                          <strong>Hours:</strong>
                        </div>
                        <div className="space-y-1 text-xs">
                          {Object.entries(service.operating_hours).map(([day, hours]) => (
                            hours && (
                              <div key={day} className="flex justify-between">
                                <span className="capitalize">{day}:</span>
                                <span>{hours}</span>
                              </div>
                            )
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-3 border-t">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Service
                      </Button>
                    </div>
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

export default ServicesManager;

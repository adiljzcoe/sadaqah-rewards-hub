
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Heart, Plus } from 'lucide-react';

interface ServicesManagerProps {
  masjidId: string;
}

const ServicesManager = ({ masjidId }: ServicesManagerProps) => {
  const [formData, setFormData] = useState({
    service_name: '',
    service_type: 'education',
    description: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    location: '',
    is_active: true,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service submission:', { masjidId, ...formData });
    // TODO: Implement service creation
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleHoursChange = (day: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      operating_hours: {
        ...prev.operating_hours,
        [day]: value
      }
    }));
  };

  const serviceTypes = [
    { value: 'education', label: 'Education' },
    { value: 'charity', label: 'Charity' },
    { value: 'counseling', label: 'Counseling' },
    { value: 'wedding', label: 'Wedding Services' },
    { value: 'funeral', label: 'Funeral Services' },
    { value: 'halal_food', label: 'Halal Food' },
    { value: 'youth', label: 'Youth Programs' },
    { value: 'women', label: 'Women Programs' }
  ];

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5" />
          Community Services Management
        </CardTitle>
        <CardDescription>
          Manage community services offered by your masjid
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_name">Service Name</Label>
              <Input
                id="service_name"
                value={formData.service_name}
                onChange={(e) => handleInputChange('service_name', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="service_type">Service Type</Label>
              <Select value={formData.service_type} onValueChange={(value) => handleInputChange('service_type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceTypes.map((type) => (
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
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="contact_person">Contact Person</Label>
              <Input
                id="contact_person"
                value={formData.contact_person}
                onChange={(e) => handleInputChange('contact_person', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="contact_email">Contact Email</Label>
              <Input
                id="contact_email"
                type="email"
                value={formData.contact_email}
                onChange={(e) => handleInputChange('contact_email', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="contact_phone">Contact Phone</Label>
              <Input
                id="contact_phone"
                value={formData.contact_phone}
                onChange={(e) => handleInputChange('contact_phone', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Room/Building location within masjid"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
          </div>

          <div>
            <Label>Operating Hours</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-2">
                  <Label className="w-20 capitalize" htmlFor={day}>
                    {day}:
                  </Label>
                  <Input
                    id={day}
                    placeholder="9am-5pm or Closed"
                    value={formData.operating_hours[day as keyof typeof formData.operating_hours]}
                    onChange={(e) => handleHoursChange(day, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={formData.is_active}
              onCheckedChange={(checked) => handleInputChange('is_active', checked)}
            />
            <Label htmlFor="is_active">Service is active</Label>
          </div>

          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServicesManager;

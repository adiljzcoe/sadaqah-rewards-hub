
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, MapPin, Clock, Users, Calendar, CheckCircle, XCircle } from 'lucide-react';

const MasjidManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedMasjid, setSelectedMasjid] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    location: '',
    contact_info: {
      phone: '',
      email: '',
      website: ''
    },
    verified: false
  });

  const mockMasjids = [
    {
      id: '1',
      name: 'Central Islamic Center',
      address: '123 Main Street, London, UK',
      location: 'London',
      contact_info: {
        phone: '+44 20 1234 5678',
        email: 'info@centralic.org',
        website: 'https://centralic.org'
      },
      verified: true,
      total_events: 15,
      upcoming_events: 3,
      total_attendees: 1250,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      name: 'North London Mosque',
      address: '456 High Road, North London, UK',
      location: 'North London',
      contact_info: {
        phone: '+44 20 9876 5432',
        email: 'contact@nlmosque.org',
        website: 'https://nlmosque.org'
      },
      verified: false,
      total_events: 8,
      upcoming_events: 1,
      total_attendees: 680,
      created_at: '2024-01-18'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating masjid:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      location: '',
      contact_info: {
        phone: '',
        email: '',
        website: ''
      },
      verified: false
    });
  };

  const toggleVerification = (masjidId: string) => {
    console.log('Toggling verification for masjid:', masjidId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Masjid Management</h2>
          <p className="text-muted-foreground">Manage mosque registrations, verification, and details</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Masjid
        </Button>
      </div>

      <Tabs defaultValue="masjids" className="space-y-4">
        <TabsList>
          <TabsTrigger value="masjids">Masjids</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="prayer-times">Prayer Times</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="masjids">
          <Card>
            <CardHeader>
              <CardTitle>Registered Masjids</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Masjid</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Statistics</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockMasjids.map((masjid) => (
                    <TableRow key={masjid.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{masjid.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {masjid.address}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{masjid.location}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{masjid.contact_info.email}</div>
                          <div className="text-sm text-muted-foreground">{masjid.contact_info.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge className={masjid.verified ? 'bg-green-500' : 'bg-yellow-500'}>
                            {masjid.verified ? (
                              <>
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </>
                            ) : (
                              <>
                                <XCircle className="h-3 w-3 mr-1" />
                                Pending
                              </>
                            )}
                          </Badge>
                          <Switch
                            checked={masjid.verified}
                            onCheckedChange={() => toggleVerification(masjid.id)}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {masjid.total_events} events
                          </div>
                          <div className="text-sm flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {masjid.total_attendees} attendees
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSelectedMasjid(masjid.id)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Masjid Events Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Event management interface</p>
                <p className="text-sm">Manage events, registrations, and schedules for all masjids</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prayer-times">
          <Card>
            <CardHeader>
              <CardTitle>Prayer Times Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Prayer times configuration</p>
                <p className="text-sm">Set and manage prayer times for all registered masjids</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Masjids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">47</div>
                <p className="text-sm text-muted-foreground">+5 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verified Masjids</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">42</div>
                <p className="text-sm text-muted-foreground">89% verification rate</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">284</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Attendees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">12,450</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Masjid</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Masjid Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">City/Area</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.contact_info.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contact_info: { ...formData.contact_info, phone: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.contact_info.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contact_info: { ...formData.contact_info, email: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.contact_info.website}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      contact_info: { ...formData.contact_info, website: e.target.value }
                    })}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="verified"
                  checked={formData.verified}
                  onCheckedChange={(checked) => setFormData({ ...formData, verified: checked })}
                />
                <Label htmlFor="verified">Mark as verified</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Masjid</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MasjidManagement;

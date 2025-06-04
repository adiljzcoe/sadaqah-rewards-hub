
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Clock, Star, Building2, Home, ShoppingBag, GraduationCap, Users, Heart } from 'lucide-react';
import { useCheckIns } from '@/hooks/useCheckIns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface CheckInLocation {
  id: string;
  name: string;
  location_type: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  verified: boolean;
  jannah_points_reward: number;
}

interface CheckInLocationsProps {
  userLocation?: { lat: number; lng: number } | null;
}

const CheckInLocations: React.FC<CheckInLocationsProps> = ({ userLocation }) => {
  const [locations, setLocations] = useState<CheckInLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<CheckInLocation | null>(null);
  const [notes, setNotes] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const { loading, fetchNearbyLocations, checkIn } = useCheckIns();

  useEffect(() => {
    if (userLocation) {
      loadNearbyLocations();
    }
  }, [userLocation]);

  const loadNearbyLocations = async () => {
    if (!userLocation) return;
    
    const nearby = await fetchNearbyLocations(userLocation.lat, userLocation.lng, 25);
    setLocations(nearby);
  };

  const handleCheckIn = async () => {
    if (!selectedLocation) return;

    const result = await checkIn(selectedLocation.id, notes);
    if (result) {
      setDialogOpen(false);
      setNotes('');
      setSelectedLocation(null);
    }
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'masjid': return <Building2 className="h-4 w-4" />;
      case 'family_home': return <Home className="h-4 w-4" />;
      case 'muslim_business': return <ShoppingBag className="h-4 w-4" />;
      case 'islamic_center': return <Building2 className="h-4 w-4" />;
      case 'halal_restaurant': return <ShoppingBag className="h-4 w-4" />;
      case 'islamic_school': return <GraduationCap className="h-4 w-4" />;
      case 'community_center': return <Users className="h-4 w-4" />;
      case 'charity_office': return <Heart className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getLocationTypeLabel = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!userLocation) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Enable Location Access</h3>
          <p className="text-gray-600">
            Allow location access to see nearby Islamic locations where you can check in and earn Jannah points.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">Nearby Check-in Locations</h3>
        <Badge variant="outline" className="bg-green-50 text-green-700">
          {locations.length} locations found
        </Badge>
      </div>

      {locations.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Locations Found</h3>
            <p className="text-gray-600">
              No Islamic locations found in your area. Check back later or suggest a location to be added.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((location) => (
            <Card key={location.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getLocationIcon(location.location_type)}
                    <CardTitle className="text-base">{location.name}</CardTitle>
                    {location.verified && (
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {getLocationTypeLabel(location.location_type)}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                {location.address && (
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {location.address}
                  </p>
                )}
                
                {location.description && (
                  <p className="text-sm text-gray-600 mb-3">
                    {location.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm font-medium text-emerald-600">
                    <Star className="h-4 w-4" />
                    {location.jannah_points_reward} Jannah Points
                  </div>
                  
                  <Dialog open={dialogOpen && selectedLocation?.id === location.id} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (open) {
                      setSelectedLocation(location);
                    } else {
                      setSelectedLocation(null);
                      setNotes('');
                    }
                  }}>
                    <DialogTrigger asChild>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Clock className="h-3 w-3 mr-1" />
                        Check In
                      </Button>
                    </DialogTrigger>
                    
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Check in to {location.name}</DialogTitle>
                        <DialogDescription>
                          You'll earn {location.jannah_points_reward} Jannah points for this check-in.
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="notes">Notes (Optional)</Label>
                          <Textarea
                            id="notes"
                            placeholder="Share what you're doing here or how you feel..."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={handleCheckIn}
                            disabled={loading}
                            className="flex-1"
                          >
                            {loading ? 'Checking In...' : 'Confirm Check-In'}
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setDialogOpen(false)}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckInLocations;

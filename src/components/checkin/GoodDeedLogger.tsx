
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, Home, Building2, Heart, Users, GraduationCap, Utensils } from 'lucide-react';
import { useCheckIns } from '@/hooks/useCheckIns';

const GoodDeedLogger: React.FC = () => {
  const [selectedDeed, setSelectedDeed] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const { goodDeedOptions, logGoodDeedWithGPS, loading } = useCheckIns();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home': return <Home className="h-4 w-4" />;
      case 'building2': return <Building2 className="h-4 w-4" />;
      case 'heart': return <Heart className="h-4 w-4" />;
      case 'users': return <Users className="h-4 w-4" />;
      case 'graduationCap': return <GraduationCap className="h-4 w-4" />;
      case 'utensils': return <Utensils className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  const handleLogDeed = async () => {
    if (!selectedDeed) return;
    
    const result = await logGoodDeedWithGPS(selectedDeed, notes);
    if (result) {
      setSelectedDeed(null);
      setNotes('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-green-600" />
          Log Good Deed with GPS
        </CardTitle>
        <CardDescription>
          Select what good deed you're doing and we'll log your location for Jannah points
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Select Good Deed</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goodDeedOptions.map((deed) => (
              <div
                key={deed.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedDeed === deed.id
                    ? 'border-green-500 bg-green-50 ring-2 ring-green-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedDeed(deed.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getIcon(deed.icon)}
                    <span className="font-medium text-sm">{deed.label}</span>
                  </div>
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-xs">
                    +{deed.points}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="deed-notes">Notes (Optional)</Label>
          <Textarea
            id="deed-notes"
            placeholder="Add details about your good deed..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <Button 
          onClick={handleLogDeed}
          disabled={!selectedDeed || loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            'Logging GPS Location...'
          ) : (
            <>
              <MapPin className="h-4 w-4 mr-2" />
              Log Good Deed with GPS
            </>
          )}
        </Button>

        {selectedDeed && (
          <div className="p-3 bg-blue-50 rounded-lg text-sm text-blue-800">
            <strong>Note:</strong> This will use your current GPS location for marketing analytics to help us understand where good deeds happen most frequently.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GoodDeedLogger;

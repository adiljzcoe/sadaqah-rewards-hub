
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Calendar } from 'lucide-react';
import { useCheckIns } from '@/hooks/useCheckIns';
import { format } from 'date-fns';

interface UserCheckIn {
  id: string;
  location_id: string;
  check_in_time: string;
  jannah_points_earned: number;
  notes?: string;
  check_in_locations?: {
    name: string;
    location_type: string;
    address?: string;
  };
}

const RecentCheckIns: React.FC = () => {
  const [checkIns, setCheckIns] = useState<UserCheckIn[]>([]);
  const [todaysCheckIns, setTodaysCheckIns] = useState<UserCheckIn[]>([]);
  const { getUserCheckIns, getTodaysCheckIns } = useCheckIns();

  useEffect(() => {
    loadCheckIns();
  }, []);

  const loadCheckIns = async () => {
    const [recent, today] = await Promise.all([
      getUserCheckIns(5),
      getTodaysCheckIns()
    ]);
    setCheckIns(recent);
    setTodaysCheckIns(today);
  };

  const getTotalPointsToday = () => {
    return todaysCheckIns.reduce((total, checkIn) => total + checkIn.jannah_points_earned, 0);
  };

  if (checkIns.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No Check-ins Yet</h3>
          <p className="text-gray-600">
            Start checking in to Islamic locations to earn Jannah points and track your spiritual journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Today's Summary */}
      <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-emerald-800 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Check-ins
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-emerald-700">
                {todaysCheckIns.length}
              </p>
              <p className="text-sm text-emerald-600">Locations visited</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-emerald-700 flex items-center gap-1">
                <Star className="h-5 w-5" />
                {getTotalPointsToday()}
              </p>
              <p className="text-sm text-emerald-600">Jannah points earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Check-ins */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Check-ins</CardTitle>
          <CardDescription>Your latest spiritual activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {checkIns.map((checkIn) => (
              <div key={checkIn.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">
                      {checkIn.check_in_locations?.name || 'Unknown Location'}
                    </h4>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 text-xs">
                      +{checkIn.jannah_points_earned} points
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">
                    {checkIn.check_in_locations?.location_type?.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </p>
                  
                  {checkIn.notes && (
                    <p className="text-sm text-gray-700 italic mb-1">
                      "{checkIn.notes}"
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {format(new Date(checkIn.check_in_time), 'MMM d, yyyy h:mm a')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentCheckIns;

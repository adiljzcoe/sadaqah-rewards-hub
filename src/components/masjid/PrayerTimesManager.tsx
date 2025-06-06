
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Clock, Calendar as CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface PrayerTimesManagerProps {
  masjidId: string;
}

const PrayerTimesManager = ({ masjidId }: PrayerTimesManagerProps) => {
  const { updatePrayerTimes } = useMasjidManagement();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [prayerTimes, setPrayerTimes] = useState({
    fajr_time: '05:30',
    sunrise_time: '07:15',
    dhuhr_time: '13:00',
    asr_time: '16:30',
    maghrib_time: '18:45',
    isha_time: '20:30'
  });

  // Fetch existing prayer times for selected date
  const { data: existingPrayerTimes } = useQuery({
    queryKey: ['prayer-times', masjidId, format(selectedDate, 'yyyy-MM-dd')],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('masjid_prayer_times')
        .select('*')
        .eq('masjid_id', masjidId)
        .eq('prayer_date', format(selectedDate, 'yyyy-MM-dd'))
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    }
  });

  // Update form when existing data is loaded
  React.useEffect(() => {
    if (existingPrayerTimes) {
      setPrayerTimes({
        fajr_time: existingPrayerTimes.fajr_time,
        sunrise_time: existingPrayerTimes.sunrise_time || '',
        dhuhr_time: existingPrayerTimes.dhuhr_time,
        asr_time: existingPrayerTimes.asr_time,
        maghrib_time: existingPrayerTimes.maghrib_time,
        isha_time: existingPrayerTimes.isha_time
      });
    }
  }, [existingPrayerTimes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePrayerTimes.mutate({
      masjid_id: masjidId,
      prayer_date: format(selectedDate, 'yyyy-MM-dd'),
      ...prayerTimes
    });
  };

  const handleTimeChange = (prayer: string, value: string) => {
    setPrayerTimes(prev => ({
      ...prev,
      [prayer]: value
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Prayer Times Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date Selector */}
            <div>
              <Label>Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Prayer Times Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="fajr">Fajr *</Label>
                <Input
                  id="fajr"
                  type="time"
                  value={prayerTimes.fajr_time}
                  onChange={(e) => handleTimeChange('fajr_time', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="sunrise">Sunrise</Label>
                <Input
                  id="sunrise"
                  type="time"
                  value={prayerTimes.sunrise_time}
                  onChange={(e) => handleTimeChange('sunrise_time', e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dhuhr">Dhuhr *</Label>
                <Input
                  id="dhuhr"
                  type="time"
                  value={prayerTimes.dhuhr_time}
                  onChange={(e) => handleTimeChange('dhuhr_time', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="asr">Asr *</Label>
                <Input
                  id="asr"
                  type="time"
                  value={prayerTimes.asr_time}
                  onChange={(e) => handleTimeChange('asr_time', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maghrib">Maghrib *</Label>
                <Input
                  id="maghrib"
                  type="time"
                  value={prayerTimes.maghrib_time}
                  onChange={(e) => handleTimeChange('maghrib_time', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="isha">Isha *</Label>
                <Input
                  id="isha"
                  type="time"
                  value={prayerTimes.isha_time}
                  onChange={(e) => handleTimeChange('isha_time', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={updatePrayerTimes.isPending}>
                <Save className="h-4 w-4 mr-2" />
                {updatePrayerTimes.isPending ? 'Saving...' : 'Save Prayer Times'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h3 className="font-medium mb-2">Copy from Yesterday</h3>
          <p className="text-sm text-gray-600 mb-3">
            Copy prayer times from the previous day
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Copy Yesterday's Times
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-2">Auto Calculate</h3>
          <p className="text-sm text-gray-600 mb-3">
            Calculate times based on location
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Auto Calculate
          </Button>
        </Card>

        <Card className="p-4">
          <h3 className="font-medium mb-2">Bulk Update</h3>
          <p className="text-sm text-gray-600 mb-3">
            Update times for the entire week
          </p>
          <Button variant="outline" size="sm" className="w-full">
            Bulk Update Week
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default PrayerTimesManager;

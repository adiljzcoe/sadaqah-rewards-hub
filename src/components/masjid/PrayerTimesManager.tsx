
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Calendar } from 'lucide-react';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';

interface PrayerTimesManagerProps {
  masjidId: string;
}

const PrayerTimesManager = ({ masjidId }: PrayerTimesManagerProps) => {
  const { updatePrayerTimes } = useMasjidManagement();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [prayerTimes, setPrayerTimes] = useState({
    fajr_time: '',
    sunrise_time: '',
    dhuhr_time: '',
    asr_time: '',
    maghrib_time: '',
    isha_time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prayerData = {
      masjid_id: masjidId,
      prayer_date: selectedDate,
      fajr_time: prayerTimes.fajr_time,
      sunrise_time: prayerTimes.sunrise_time || undefined,
      dhuhr_time: prayerTimes.dhuhr_time,
      asr_time: prayerTimes.asr_time,
      maghrib_time: prayerTimes.maghrib_time,
      isha_time: prayerTimes.isha_time
    };

    updatePrayerTimes.mutate(prayerData);
  };

  const handleTimeChange = (prayer: string, value: string) => {
    setPrayerTimes(prev => ({ ...prev, [prayer]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Prayer Times Management
        </CardTitle>
        <CardDescription>
          Update daily prayer times for your community
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="prayer_date">Date</Label>
            <Input
              id="prayer_date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fajr_time">Fajr</Label>
              <Input
                id="fajr_time"
                type="time"
                value={prayerTimes.fajr_time}
                onChange={(e) => handleTimeChange('fajr_time', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="sunrise_time">Sunrise</Label>
              <Input
                id="sunrise_time"
                type="time"
                value={prayerTimes.sunrise_time}
                onChange={(e) => handleTimeChange('sunrise_time', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="dhuhr_time">Dhuhr</Label>
              <Input
                id="dhuhr_time"
                type="time"
                value={prayerTimes.dhuhr_time}
                onChange={(e) => handleTimeChange('dhuhr_time', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="asr_time">Asr</Label>
              <Input
                id="asr_time"
                type="time"
                value={prayerTimes.asr_time}
                onChange={(e) => handleTimeChange('asr_time', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="maghrib_time">Maghrib</Label>
              <Input
                id="maghrib_time"
                type="time"
                value={prayerTimes.maghrib_time}
                onChange={(e) => handleTimeChange('maghrib_time', e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="isha_time">Isha</Label>
              <Input
                id="isha_time"
                type="time"
                value={prayerTimes.isha_time}
                onChange={(e) => handleTimeChange('isha_time', e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={updatePrayerTimes.isPending}>
            {updatePrayerTimes.isPending ? 'Updating...' : 'Update Prayer Times'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PrayerTimesManager;

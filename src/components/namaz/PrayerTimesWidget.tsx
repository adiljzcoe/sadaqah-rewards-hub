
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Sun, Moon, Sunrise, Sunset, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PrayerTimes {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  date: string;
}

interface PrayerTimesWidgetProps {
  city: string;
  userLocation: { lat: number; lng: number } | null;
  onTimesUpdate: (times: PrayerTimes | null) => void;
  onLoadingChange: (loading: boolean) => void;
}

const PrayerTimesWidget = ({ city, userLocation, onTimesUpdate, onLoadingChange }: PrayerTimesWidgetProps) => {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState<{ name: string; time: string; remaining: string } | null>(null);
  const [prayedPrayers, setPrayedPrayers] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  // Mock prayer times calculation - in a real app, you'd use an API like Aladhan API
  const calculatePrayerTimes = async (lat: number, lng: number) => {
    setLoading(true);
    onLoadingChange(true);

    try {
      // Using a mock calculation - replace with actual API call
      const today = new Date();
      const times: PrayerTimes = {
        fajr: "05:30",
        sunrise: "06:45",
        dhuhr: "12:15",
        asr: "15:30",
        maghrib: "18:45",
        isha: "20:00",
        date: today.toDateString()
      };

      setPrayerTimes(times);
      onTimesUpdate(times);
      calculateNextPrayer(times);
    } catch (error) {
      console.error('Error fetching prayer times:', error);
    } finally {
      setLoading(false);
      onLoadingChange(false);
    }
  };

  const calculateNextPrayer = (times: PrayerTimes) => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const prayers = [
      { name: 'Fajr', time: times.fajr },
      { name: 'Sunrise', time: times.sunrise },
      { name: 'Dhuhr', time: times.dhuhr },
      { name: 'Asr', time: times.asr },
      { name: 'Maghrib', time: times.maghrib },
      { name: 'Isha', time: times.isha }
    ];

    for (const prayer of prayers) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerTime = hours * 60 + minutes;
      
      if (prayerTime > currentTime) {
        const remaining = prayerTime - currentTime;
        const hoursRemaining = Math.floor(remaining / 60);
        const minutesRemaining = remaining % 60;
        
        setNextPrayer({
          name: prayer.name,
          time: prayer.time,
          remaining: `${hoursRemaining}h ${minutesRemaining}m`
        });
        return;
      }
    }
    
    // If no prayer found for today, next is Fajr tomorrow
    const fajrTime = prayers[0].time;
    const [hours, minutes] = fajrTime.split(':').map(Number);
    const fajrMinutes = hours * 60 + minutes;
    const remaining = (24 * 60) - currentTime + fajrMinutes;
    const hoursRemaining = Math.floor(remaining / 60);
    const minutesRemaining = remaining % 60;
    
    setNextPrayer({
      name: 'Fajr (Tomorrow)',
      time: fajrTime,
      remaining: `${hoursRemaining}h ${minutesRemaining}m`
    });
  };

  const handlePrayerCompleted = (prayerName: string) => {
    if (prayedPrayers.has(prayerName)) {
      toast({
        title: "Already Completed!",
        description: `You've already marked ${prayerName} as completed today.`,
        variant: "destructive",
      });
      return;
    }

    // Add to prayed prayers
    const newPrayedPrayers = new Set(prayedPrayers);
    newPrayedPrayers.add(prayerName);
    setPrayedPrayers(newPrayedPrayers);

    // Save to localStorage (in a real app, this would be saved to the database)
    const today = new Date().toDateString();
    const savedPrayers = JSON.parse(localStorage.getItem(`prayers_${today}`) || '[]');
    savedPrayers.push(prayerName);
    localStorage.setItem(`prayers_${today}`, JSON.stringify(savedPrayers));

    // Award Jannah points
    const basePoints = 50;
    const currentPoints = parseInt(localStorage.getItem('jannahPoints') || '0');
    const newPoints = currentPoints + basePoints;
    localStorage.setItem('jannahPoints', newPoints.toString());

    toast({
      title: "Prayer Completed! 🤲",
      description: `Alhamdulillah! You earned ${basePoints} Jannah points for completing ${prayerName}.`,
    });

    // Trigger a custom event to update UserStats component
    window.dispatchEvent(new CustomEvent('jannahPointsUpdated', { detail: { newPoints } }));
  };

  // Load today's completed prayers from localStorage
  useEffect(() => {
    const today = new Date().toDateString();
    const savedPrayers = JSON.parse(localStorage.getItem(`prayers_${today}`) || '[]');
    setPrayedPrayers(new Set(savedPrayers));
  }, []);

  useEffect(() => {
    if (userLocation) {
      calculatePrayerTimes(userLocation.lat, userLocation.lng);
    } else if (city) {
      // For demo purposes, using mock coordinates for any city
      calculatePrayerTimes(40.7128, -74.0060); // NYC coordinates as fallback
    }
  }, [city, userLocation]);

  const getPrayerIcon = (prayerName: string) => {
    switch (prayerName.toLowerCase()) {
      case 'fajr':
        return <Moon className="h-5 w-5 text-indigo-600" />;
      case 'sunrise':
        return <Sunrise className="h-5 w-5 text-orange-500" />;
      case 'dhuhr':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'asr':
        return <Sun className="h-5 w-5 text-amber-500" />;
      case 'maghrib':
        return <Sunset className="h-5 w-5 text-red-500" />;
      case 'isha':
        return <Moon className="h-5 w-5 text-purple-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading prayer times...</p>
        </CardContent>
      </Card>
    );
  }

  if (!prayerTimes) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Prayer Times Available</h3>
          <p className="text-gray-500">Please allow location access or select a city</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Next Prayer Countdown */}
      {nextPrayer && (
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Next Prayer</h3>
            <div className="text-3xl font-bold mb-1">{nextPrayer.name}</div>
            <div className="text-xl mb-2">{nextPrayer.time}</div>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {nextPrayer.remaining} remaining
            </Badge>
          </CardContent>
        </Card>
      )}

      {/* Prayer Times Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Today's Prayer Times
            {city && <span className="text-blue-600">- {city}</span>}
          </CardTitle>
          <p className="text-sm text-gray-600">{prayerTimes.date}</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Fajr', time: prayerTimes.fajr, arabic: 'الفجر' },
              { name: 'Dhuhr', time: prayerTimes.dhuhr, arabic: 'الظهر' },
              { name: 'Asr', time: prayerTimes.asr, arabic: 'العصر' },
              { name: 'Maghrib', time: prayerTimes.maghrib, arabic: 'المغرب' },
              { name: 'Isha', time: prayerTimes.isha, arabic: 'العشاء' }
            ].map((prayer) => {
              const isPrayed = prayedPrayers.has(prayer.name);
              return (
                <div
                  key={prayer.name}
                  className={`rounded-lg p-4 text-center transition-colors ${
                    isPrayed 
                      ? 'bg-green-50 border-2 border-green-200' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-center mb-2">
                    {getPrayerIcon(prayer.name)}
                  </div>
                  <div className="font-semibold text-gray-900">{prayer.name}</div>
                  <div className="text-sm text-gray-600 mb-1">{prayer.arabic}</div>
                  <div className="text-lg font-bold text-blue-600 mb-3">{prayer.time}</div>
                  
                  <Button
                    size="sm"
                    variant={isPrayed ? "outline" : "default"}
                    onClick={() => handlePrayerCompleted(prayer.name)}
                    disabled={isPrayed}
                    className={`w-full ${
                      isPrayed 
                        ? 'bg-green-100 text-green-800 border-green-300 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {isPrayed ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      'Mark as Prayed'
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrayerTimesWidget;

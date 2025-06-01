
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';

interface DonationActivity {
  id: string;
  userName: string;
  mosqueName: string;
  location: string;
  prayerSpaces: number;
  amount: number;
  jannahPoints: number;
  timestamp: string;
  avatarColor: string;
}

const LiveDonationFeed: React.FC = () => {
  const [activities, setActivities] = useState<DonationActivity[]>([]);

  // Mock live donation data - would come from real-time API
  const mockActivities: DonationActivity[] = [
    {
      id: '1',
      userName: 'Ahmed K.',
      mosqueName: 'Al-Noor Mosque',
      location: 'Gaza, Palestine',
      prayerSpaces: 2,
      amount: 300,
      jannahPoints: 3000,
      timestamp: new Date(Date.now() - 30000).toISOString(),
      avatarColor: 'bg-emerald-500'
    },
    {
      id: '2',
      userName: 'Sarah M.',
      mosqueName: 'Masjid Al-Rahman',
      location: 'Aleppo, Syria',
      prayerSpaces: 1,
      amount: 150,
      jannahPoints: 1500,
      timestamp: new Date(Date.now() - 120000).toISOString(),
      avatarColor: 'bg-blue-500'
    },
    {
      id: '3',
      userName: 'Omar R.',
      mosqueName: 'General Mosque Pool',
      location: 'Western Locations',
      prayerSpaces: 3,
      amount: 240,
      jannahPoints: 2400,
      timestamp: new Date(Date.now() - 180000).toISOString(),
      avatarColor: 'bg-purple-500'
    },
    {
      id: '4',
      userName: 'Fatima A.',
      mosqueName: 'Community Mosque',
      location: 'Karachi, Pakistan',
      prayerSpaces: 1,
      amount: 150,
      jannahPoints: 1500,
      timestamp: new Date(Date.now() - 240000).toISOString(),
      avatarColor: 'bg-rose-500'
    },
    {
      id: '5',
      userName: 'Ali H.',
      mosqueName: 'Baitul Hidayah',
      location: 'Dhaka, Bangladesh',
      prayerSpaces: 2,
      amount: 284,
      jannahPoints: 2840,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      avatarColor: 'bg-orange-500'
    }
  ];

  useEffect(() => {
    // Initialize with mock data
    setActivities(mockActivities);

    // Simulate new donations every 8-15 seconds
    const interval = setInterval(() => {
      const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      const newActivity = {
        ...randomActivity,
        id: `${Date.now()}_${Math.random()}`,
        timestamp: new Date().toISOString(),
        userName: generateRandomName(),
        avatarColor: getRandomColor()
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 4)]); // Keep only 5 recent
    }, Math.random() * 7000 + 8000); // 8-15 seconds

    return () => clearInterval(interval);
  }, []);

  const generateRandomName = () => {
    const names = ['Ahmed K.', 'Sarah M.', 'Omar R.', 'Fatima A.', 'Ali H.', 'Zara B.', 'Hassan S.', 'Aisha T.', 'Yusuf M.', 'Khadija L.'];
    return names[Math.floor(Math.random() * names.length)];
  };

  const getRandomColor = () => {
    const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-rose-500', 'bg-orange-500', 'bg-teal-500', 'bg-indigo-500'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          Live Donation Activity
        </h3>
        <Badge className="bg-green-100 text-green-700 animate-pulse">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Live
        </Badge>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <Card 
            key={activity.id} 
            className={`p-4 border-l-4 border-emerald-400 bg-gradient-to-r from-emerald-50 to-green-50 transform transition-all duration-500 ${
              index === 0 ? 'animate-fade-in scale-105' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${activity.avatarColor} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {activity.userName.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-gray-800">{activity.userName}</span>
                    <span className="text-gray-600">just funded</span>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                      {activity.prayerSpaces} prayer space{activity.prayerSpaces > 1 ? 's' : ''}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium">{activity.mosqueName}</span>
                    <span>in {activity.location}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-emerald-600">£{activity.amount}</span>
                  <span className="text-xs text-gray-500">{getTimeAgo(activity.timestamp)}</span>
                </div>
                <div className="flex items-center justify-end space-x-1">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-semibold text-yellow-600">
                    +{activity.jannahPoints.toLocaleString()} Jannah Points
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="bg-gradient-to-r from-emerald-100 to-green-100 p-4 rounded-lg border border-emerald-200">
          <p className="text-sm text-emerald-700">
            <Users className="h-4 w-4 inline mr-1" />
            Join {activities.length * 47} other donors who have funded prayer spaces today!
          </p>
          <p className="text-xs text-emerald-600 mt-1">
            Every prayer space you fund earns you Jannah Points and brings communities closer to Allah.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveDonationFeed;

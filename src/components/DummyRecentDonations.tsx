
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useDummyData } from '@/hooks/useDummyData';
import { Heart, Clock } from 'lucide-react';

const DummyRecentDonations = () => {
  const { isDummyDataEnabled, generateDummyDonations } = useDummyData();

  if (!isDummyDataEnabled('recent_donations')) {
    return null;
  }

  const donations = generateDummyDonations();

  const getTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor(diff / 60000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'just now';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Heart className="h-5 w-5 text-red-500" />
          Recent Donations
          <Badge variant="secondary" className="ml-auto">
            {donations.length} today
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {donations.slice(0, 10).map((donation, index) => (
            <div key={donation.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {getInitials(donation.donor_name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{donation.donor_name}</span>
                  <span className="font-bold text-green-600">£{donation.amount}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  to {donation.charity_name}
                </p>
                {donation.message && (
                  <p className="text-xs text-gray-600 italic mt-1">
                    "{donation.message}"
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {getTimeAgo(donation.created_at)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DummyRecentDonations;

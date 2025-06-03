
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, TrendingUp, Users } from 'lucide-react';

const recentDonations = [
  { name: 'Ahmed K.', amount: 250, time: '2 mins ago', location: 'London' },
  { name: 'Fatima S.', amount: 100, time: '5 mins ago', location: 'Birmingham' },
  { name: 'Anonymous', amount: 500, time: '8 mins ago', location: 'Manchester' },
  { name: 'Omar M.', amount: 75, time: '12 mins ago', location: 'Leeds' },
  { name: 'Aisha R.', amount: 300, time: '15 mins ago', location: 'Glasgow' },
  { name: 'Yusuf A.', amount: 150, time: '18 mins ago', location: 'Cardiff' },
];

const LiveDonationFeedCheckout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % recentDonations.length);
        setFadeIn(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentDonation = recentDonations[currentIndex];
  const totalDonors = 2847;
  const totalRaised = 847632;

  return (
    <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-4">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-800">Live Donations</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-50'}`}>
            <div className="text-lg font-bold text-green-700">
              {currentDonation.name} just donated £{currentDonation.amount}
            </div>
            <div className="text-xs text-green-600">
              {currentDonation.time} • {currentDonation.location}
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 text-center">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <div className="text-lg font-bold text-blue-700">{totalDonors.toLocaleString()}</div>
              <div className="text-xs text-blue-600">Generous Donors</div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <div className="text-lg font-bold text-green-700">£{totalRaised.toLocaleString()}</div>
              <div className="text-xs text-green-600">Total Raised</div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <Badge className="bg-yellow-500 text-white animate-bounce">
            Join {totalDonors.toLocaleString()}+ people making a difference!
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveDonationFeedCheckout;

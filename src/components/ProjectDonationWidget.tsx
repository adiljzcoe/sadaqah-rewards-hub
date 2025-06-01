
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { X, Heart, Building, Droplets, Users, Gift, Star, Coins } from 'lucide-react';

interface ProjectDonationWidgetProps {
  projectType: 'mosque' | 'well' | 'orphanage';
  sticky?: boolean;
}

const ProjectDonationWidget = ({ projectType, sticky = true }: ProjectDonationWidgetProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');

  if (!isVisible) return null;

  const getProjectIcon = () => {
    switch (projectType) {
      case 'mosque': return <Building className="h-5 w-5" />;
      case 'well': return <Droplets className="h-5 w-5" />;
      case 'orphanage': return <Users className="h-5 w-5" />;
    }
  };

  const getProjectColor = () => {
    switch (projectType) {
      case 'mosque': return 'from-emerald-500 to-green-600';
      case 'well': return 'from-blue-500 to-cyan-600';
      case 'orphanage': return 'from-pink-500 to-rose-600';
    }
  };

  const getProjectTitle = () => {
    switch (projectType) {
      case 'mosque': return 'Build a Mosque';
      case 'well': return 'Dig a Water Well';
      case 'orphanage': return 'Support an Orphanage';
    }
  };

  const amounts = [25, 50, 100, 250];

  return (
    <div className={`${sticky ? 'fixed top-4 right-4 z-50' : 'relative mb-6'} w-80 max-w-sm`}>
      <Card className={`bg-gradient-to-br ${getProjectColor()} text-white border-0 shadow-2xl`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              {getProjectIcon()}
              {getProjectTitle()}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-white/80 hover:text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-white/90 text-sm">
            Make a quick donation and earn Jannah Points
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {amounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "secondary" : "outline"}
                size="sm"
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
                className={`${
                  selectedAmount === amount
                    ? 'bg-white text-gray-900 hover:bg-white/90'
                    : 'border-white/30 text-white hover:bg-white/20'
                }`}
              >
                £{amount}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div>
            <Input
              type="number"
              placeholder="Custom amount"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(0);
              }}
              className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:bg-white/30"
            />
          </div>

          {/* Donate Button */}
          <Button className="w-full bg-white text-gray-900 hover:bg-white/90 font-semibold">
            <Heart className="h-4 w-4 mr-2" />
            Donate £{customAmount || selectedAmount}
          </Button>

          {/* Rewards Info */}
          <div className="flex items-center justify-between text-sm text-white/90">
            <div className="flex items-center gap-1">
              <Coins className="h-4 w-4" />
              <span>+{(customAmount ? parseInt(customAmount) : selectedAmount) * 10} points</span>
            </div>
            <Badge variant="secondary" className="bg-white/20 text-white border-0">
              <Star className="h-3 w-3 mr-1" />
              Instant Reward
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDonationWidget;

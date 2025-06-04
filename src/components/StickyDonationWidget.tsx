
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, DollarSign, Zap, Gift, TrendingUp } from 'lucide-react';

const StickyDonationWidget = () => {
  const [selectedCause, setSelectedCause] = useState('sadaqah');
  const [amount, setAmount] = useState('25');

  const causes = [
    { id: 'sadaqah', name: 'Sadaqah', icon: Heart, color: 'bg-pink-500', description: 'General charity' },
    { id: 'zakat', name: 'Zakat', icon: DollarSign, color: 'bg-green-500', description: 'Obligatory charity' },
    { id: 'lillah', name: 'Lillah', icon: Gift, color: 'bg-purple-500', description: 'For Allah\'s sake' },
    { id: 'fundraising', name: 'Fundraising', icon: TrendingUp, color: 'bg-orange-500', description: 'Help us grow & reach more donors', glow: true }
  ];

  const selectedCauseData = causes.find(cause => cause.id === selectedCause);
  const getFundraisingValue = () => parseInt(amount) * 7;

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
          <div className="p-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* Cause Selection */}
              <div className="flex flex-wrap gap-2">
                {causes.map((cause) => {
                  const Icon = cause.icon;
                  const isSelected = selectedCause === cause.id;
                  return (
                    <Button
                      key={cause.id}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCause(cause.id)}
                      className={`relative transition-all duration-300 ${
                        isSelected 
                          ? `${cause.color} text-white hover:opacity-90` 
                          : 'hover:bg-gray-50'
                      } ${
                        cause.glow 
                          ? 'animate-pulse shadow-lg ring-2 ring-orange-300 ring-opacity-75' 
                          : ''
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-1" />
                      {cause.name}
                      {cause.glow && (
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-lg blur-sm opacity-30 -z-10"></div>
                      )}
                    </Button>
                  );
                })}
              </div>

              {/* Amount Input */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">£</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-20 text-center"
                  min="1"
                />
              </div>

              {/* Fundraising Value Display */}
              {selectedCause === 'fundraising' && parseInt(amount) > 0 && (
                <div className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-lg px-3 py-2">
                  <div className="text-xs text-orange-800 font-medium">
                    ✨ £{amount} = £{getFundraisingValue()} fundraising value!
                  </div>
                </div>
              )}

              {/* Description */}
              {selectedCauseData && (
                <div className="text-sm text-gray-600 flex-1">
                  {selectedCauseData.description}
                </div>
              )}

              {/* Donate Button */}
              <Button 
                className={`${selectedCauseData?.color || 'bg-emerald-500'} text-white font-semibold px-6 transition-all duration-300 hover:scale-105`}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate £{amount}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StickyDonationWidget;

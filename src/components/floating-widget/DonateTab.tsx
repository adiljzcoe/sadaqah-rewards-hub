
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap } from 'lucide-react';

const DonateTab = () => {
  const [amount, setAmount] = useState('');
  const [selectedCharity, setSelectedCharity] = useState('');

  const quickAmounts = [5, 10, 25, 50];
  
  const featuredCharities = [
    { id: 'relief', name: 'Emergency Relief', urgent: true },
    { id: 'orphans', name: 'Orphan Care', urgent: false },
    { id: 'water', name: 'Clean Water', urgent: false }
  ];

  const handleDonate = () => {
    if (amount && selectedCharity) {
      console.log('Processing donation:', { amount, charity: selectedCharity });
      // Here you would call the donation API
    }
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="mb-3">
        <div className="text-center mb-2">
          <div className="text-lg font-bold text-green-600">£42,847</div>
          <div className="text-xs text-gray-500">Raised Today</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="text-xs font-medium mb-2">Quick Donate</div>
        <div className="grid grid-cols-4 gap-1">
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              variant={amount === amt.toString() ? "default" : "outline"}
              size="sm"
              className="text-xs h-8"
            >
              £{amt}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 text-xs"
          type="number"
        />
      </div>

      <div className="mb-3 flex-1">
        <div className="text-xs font-medium mb-2">Choose Charity</div>
        <div className="space-y-1">
          {featuredCharities.map((charity) => (
            <button
              key={charity.id}
              onClick={() => setSelectedCharity(charity.id)}
              className={`w-full text-left p-2 rounded-lg border transition-colors text-xs ${
                selectedCharity === charity.id 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{charity.name}</span>
                {charity.urgent && <Badge variant="destructive" className="text-xs">Urgent</Badge>}
              </div>
            </button>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleDonate}
        disabled={!amount || !selectedCharity}
        className="w-full"
        size="sm"
      >
        <Heart className="h-3 w-3 mr-1" />
        Donate £{amount || '0'}
      </Button>
    </div>
  );
};

export default DonateTab;

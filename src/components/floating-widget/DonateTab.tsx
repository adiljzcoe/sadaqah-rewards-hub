
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Crown, Sparkles } from 'lucide-react';

const DonateTab = () => {
  const [amount, setAmount] = useState('');
  const [selectedCharity, setSelectedCharity] = useState('');
  const [showDonateEffect, setShowDonateEffect] = useState(false);

  const quickAmounts = [5, 10, 25, 50];
  
  const featuredCharities = [
    { 
      id: 'relief', 
      name: 'Emergency Relief', 
      urgent: true, 
      gradient: 'from-red-500/20 to-orange-500/20',
      borderColor: 'border-red-400/30'
    },
    { 
      id: 'orphans', 
      name: 'Orphan Care', 
      urgent: false, 
      gradient: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'border-blue-400/30'
    },
    { 
      id: 'water', 
      name: 'Clean Water', 
      urgent: false, 
      gradient: 'from-green-500/20 to-emerald-500/20',
      borderColor: 'border-green-400/30'
    }
  ];

  const handleDonate = () => {
    if (amount && selectedCharity) {
      setShowDonateEffect(true);
      setTimeout(() => setShowDonateEffect(false), 2000);
      console.log('Processing donation:', { amount, charity: selectedCharity });
      // Here you would call the donation API
    }
  };

  return (
    <div className="p-6 h-full flex flex-col bg-gradient-to-b from-slate-800/20 to-pink-900/20 text-white relative overflow-hidden">
      {/* Donation effect */}
      {showDonateEffect && (
        <div className="absolute inset-0 pointer-events-none z-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${30 + Math.random() * 40}%`,
                animationDelay: `${Math.random() * 1}s`
              }}
            >
              <Heart className="h-6 w-6 text-pink-300" />
            </div>
          ))}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full font-bold animate-bounce-in shadow-xl">
              <Crown className="inline h-5 w-5 mr-2" />
              Donation Sent! Allah Bless You!
            </div>
          </div>
        </div>
      )}

      {/* Today's impact */}
      <div className="mb-6">
        <div className="text-center bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-green-400/30">
          <div className="text-3xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent animate-number-pop">
            £42,847
          </div>
          <div className="text-green-200/80 text-sm flex items-center justify-center">
            <Sparkles className="h-4 w-4 mr-1" />
            Raised Today
          </div>
        </div>
      </div>

      {/* Quick amounts */}
      <div className="mb-6">
        <div className="text-sm font-medium mb-3 text-white/80">Quick Donate</div>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {quickAmounts.map((amt) => (
            <Button
              key={amt}
              onClick={() => setAmount(amt.toString())}
              variant={amount === amt.toString() ? "default" : "outline"}
              className={`h-12 text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105 ${
                amount === amt.toString() 
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg' 
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              £{amt}
            </Button>
          ))}
        </div>
        <Input
          placeholder="Custom amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-pink-400 focus:ring-pink-400/20"
          type="number"
        />
      </div>

      {/* Charity selection */}
      <div className="mb-6 flex-1">
        <div className="text-sm font-medium mb-3 text-white/80">Choose Charity</div>
        <div className="space-y-3">
          {featuredCharities.map((charity) => (
            <button
              key={charity.id}
              onClick={() => setSelectedCharity(charity.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-300 hover:scale-105 bg-gradient-to-r ${charity.gradient} ${charity.borderColor} ${
                selectedCharity === charity.id 
                  ? 'shadow-lg border-white/40' 
                  : 'hover:border-white/30'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">{charity.name}</span>
                {charity.urgent && (
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500 text-white border-0 animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    Urgent
                  </Badge>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Donate button */}
      <Button 
        onClick={handleDonate}
        disabled={!amount || !selectedCharity}
        className="w-full h-14 bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 text-white font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
      >
        <Heart className="h-5 w-5 mr-2" />
        Donate £{amount || '0'}
      </Button>
    </div>
  );
};

export default DonateTab;

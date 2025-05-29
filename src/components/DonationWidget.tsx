
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Gift, Calendar, ArrowRight } from 'lucide-react';

const donationTypes = [
  { id: 'zakat', name: 'Zakat', icon: '☪️', color: 'vibrant-gradient', description: 'Obligatory charity' },
  { id: 'sadaqah', name: 'Sadaqah', icon: '💝', color: 'orange-gradient', description: 'Voluntary charity' },
  { id: 'lillah', name: 'Lillah', icon: '🤲', color: 'accent-gradient', description: 'For Allah\'s sake' },
  { id: 'monthly', name: 'Monthly', icon: '📅', color: 'purple-gradient', description: 'Regular giving' }
];

const quickAmounts = [10, 25, 50, 100];

const DonationWidget = () => {
  const [selectedType, setSelectedType] = useState('sadaqah');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(25);

  return (
    <Card className="p-6 game-card">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
          <Heart className="h-5 w-5 mr-2 text-red-500 animate-subtle-pulse" />
          Quick Donation
        </h3>
        <p className="text-sm text-gray-600 font-medium">Choose your intention and amount</p>
      </div>

      {/* Donation Type Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-4 rounded-xl transition-all duration-300 transform-gpu border-2 ${
              selectedType === type.id 
                ? 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-blue-50 scale-105 shadow-lg' 
                : 'border-gray-200 hover:border-emerald-300 bg-white hover:scale-102 hover:shadow-md'
            }`}
          >
            <div className="text-2xl mb-2 animate-subtle-pulse">{type.icon}</div>
            <div className="text-sm font-bold text-gray-800">{type.name}</div>
            <div className="text-xs text-gray-600 font-medium">{type.description}</div>
          </button>
        ))}
      </div>

      {/* Special Multiplier Alert */}
      <div className="game-card p-4 mb-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 animate-colorful-glow">
        <div className="flex items-center">
          <div className="gold-coin w-8 h-8 flex items-center justify-center mr-3">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🌙 Special Time: 2x Points until Maghrib!
          </span>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="text-sm font-bold text-gray-700 mb-3 block">Amount (£)</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`professional-button text-white font-bold py-4 transition-all duration-300 ${
                selectedAmount === amount && !customAmount
                  ? 'vibrant-gradient scale-105 shadow-lg'
                  : 'accent-gradient hover:scale-102'
              }`}
            >
              £{amount}
            </button>
          ))}
        </div>
        
        <input
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(0);
          }}
          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 font-medium transition-all duration-300"
        />
      </div>

      {/* Impact Preview */}
      <div className="game-card p-4 mb-6 bg-gradient-to-r from-white to-emerald-50 border-2 border-emerald-200">
        <div className="text-sm font-medium text-gray-600 mb-2">Your impact:</div>
        <div className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
          {customAmount ? `£${customAmount}` : `£${selectedAmount}`} = 5 Hot Meals for Orphans 🍽️
        </div>
        <div className="jannah-counter text-sm px-3 py-1 inline-block">
          Points earned: {(customAmount ? parseInt(customAmount) || 0 : selectedAmount) * 2} ⭐ (2x multiplier)
        </div>
      </div>

      {/* Donate Button */}
      <Button className="w-full professional-button vibrant-gradient text-white font-bold py-4 text-lg shadow-xl">
        <Gift className="h-5 w-5 mr-2" />
        Donate {customAmount ? `£${customAmount}` : `£${selectedAmount}`}
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>

      {/* Monthly Subscription Option */}
      {selectedType === 'monthly' && (
        <div className="mt-6 game-card p-4 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300 animate-gentle-fade">
          <div className="flex items-center mb-3">
            <div className="purple-gradient w-8 h-8 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Monthly Subscription</span>
          </div>
          <p className="text-xs font-medium text-purple-700">
            Set up automatic monthly donations and never miss an opportunity to give.
          </p>
        </div>
      )}
    </Card>
  );
};

export default DonationWidget;

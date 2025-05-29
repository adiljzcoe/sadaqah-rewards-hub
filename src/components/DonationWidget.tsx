
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Gift, Calendar, ArrowRight } from 'lucide-react';

const donationTypes = [
  { id: 'zakat', name: 'Zakat', icon: '☪️', color: 'bg-islamic-green-500', description: 'Obligatory charity' },
  { id: 'sadaqah', name: 'Sadaqah', icon: '💝', color: 'bg-sadaqah-gold-500', description: 'Voluntary charity' },
  { id: 'lillah', name: 'Lillah', icon: '🤲', color: 'bg-blue-500', description: 'For Allah\'s sake' },
  { id: 'monthly', name: 'Monthly', icon: '📅', color: 'bg-purple-500', description: 'Regular giving' }
];

const quickAmounts = [10, 25, 50, 100];

const DonationWidget = () => {
  const [selectedType, setSelectedType] = useState('sadaqah');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(25);

  return (
    <Card className="p-6 bg-gradient-to-br from-white to-islamic-green-50 border-islamic-green-200">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 flex items-center text-islamic-green-800">
          <Heart className="h-5 w-5 mr-2 text-red-500" />
          Quick Donation
        </h3>
        <p className="text-sm text-gray-600">Choose your intention and amount</p>
      </div>

      {/* Donation Type Selection */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedType === type.id 
                ? 'border-islamic-green-500 bg-islamic-green-50' 
                : 'border-gray-200 hover:border-islamic-green-300'
            }`}
          >
            <div className="text-lg mb-1">{type.icon}</div>
            <div className="text-sm font-medium">{type.name}</div>
            <div className="text-xs text-gray-500">{type.description}</div>
          </button>
        ))}
      </div>

      {/* Special Multiplier Alert */}
      <div className="bg-sadaqah-gold-100 border border-sadaqah-gold-300 rounded-lg p-3 mb-4">
        <div className="flex items-center">
          <Zap className="h-4 w-4 text-sadaqah-gold-600 mr-2" />
          <span className="text-sm font-medium text-sadaqah-gold-800">
            🌙 Special Time: 2x Points until Maghrib!
          </span>
        </div>
      </div>

      {/* Amount Selection */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">Amount (£)</label>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`p-3 rounded-lg border-2 font-medium transition-all ${
                selectedAmount === amount && !customAmount
                  ? 'border-islamic-green-500 bg-islamic-green-50 text-islamic-green-700'
                  : 'border-gray-200 hover:border-islamic-green-300'
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-islamic-green-500 focus:border-islamic-green-500"
        />
      </div>

      {/* Impact Preview */}
      <div className="bg-white rounded-lg p-3 mb-4 border">
        <div className="text-sm text-gray-600 mb-1">Your impact:</div>
        <div className="text-sm font-medium text-islamic-green-700">
          {customAmount ? `£${customAmount}` : `£${selectedAmount}`} = 5 Hot Meals for Orphans 🍽️
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Points earned: {(customAmount ? parseInt(customAmount) || 0 : selectedAmount) * 2} ⭐ (2x multiplier)
        </div>
      </div>

      {/* Donate Button */}
      <Button className="w-full bg-islamic-green-600 hover:bg-islamic-green-700 text-white font-medium py-3">
        <Gift className="h-4 w-4 mr-2" />
        Donate {customAmount ? `£${customAmount}` : `£${selectedAmount}`}
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      {/* Monthly Subscription Option */}
      {selectedType === 'monthly' && (
        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-4 w-4 mr-2 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Monthly Subscription</span>
          </div>
          <p className="text-xs text-purple-600">
            Set up automatic monthly donations and never miss an opportunity to give.
          </p>
        </div>
      )}
    </Card>
  );
};

export default DonationWidget;

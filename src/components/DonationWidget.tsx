import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Gift, Calendar, ArrowRight, CheckCircle, Users, MessageCircle } from 'lucide-react';

const donationTypes = [
  { id: 'zakat', name: 'Zakat', icon: '☪️', color: 'vibrant-gradient', description: 'Obligatory charity' },
  { id: 'sadaqah', name: 'Sadaqah', icon: '💝', color: 'accent-gradient', description: 'Voluntary charity' },
  { id: 'lillah', name: 'Lillah', icon: '🤲', color: 'purple-gradient', description: 'For Allah\'s sake' },
  { id: 'monthly', name: 'Monthly', icon: '📅', color: 'orange-gradient', description: 'Regular giving' }
];

const quickAmounts = [10, 25, 50, 100];

const dedicationSuggestions = [
  'Father', 'Mother', 'Prophet Muhammad (PBUH)', 'Grandmother', 'Grandfather', 
  'Sister', 'Brother', 'Friend', 'All Muslims', 'Deceased loved one'
];

const DonationWidget = () => {
  const [selectedType, setSelectedType] = useState('sadaqah');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [onBehalfOf, setOnBehalfOf] = useState('');
  const [dedicationNote, setDedicationNote] = useState('');
  const [showDedication, setShowDedication] = useState(false);

  return (
    <Card className="p-6 bg-white border border-gray-200 shadow-lg">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2 flex items-center text-gray-900">
          <Heart className="h-5 w-5 mr-2 text-emerald-600" />
          Make a Donation
        </h3>
        <p className="text-sm text-gray-600">Choose your intention and amount</p>
      </div>

      {/* Trust indicators */}
      <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <div className="flex items-center text-emerald-800">
          <Shield className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">100% Donation Policy - All funds go directly to those in need</span>
        </div>
      </div>

      {/* Donation Type Selection - Enhanced */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`gel-button p-5 rounded-2xl transition-all duration-500 border-0 relative overflow-hidden group ${type.color} ${
              selectedType === type.id 
                ? 'transform scale-105 shadow-2xl ring-4 ring-white/30' 
                : 'transform scale-100 hover:scale-102 shadow-lg'
            }`}
            style={{
              background: selectedType === type.id 
                ? `linear-gradient(145deg, var(--tw-gradient-stops))`
                : undefined
            }}
          >
            <div className="relative z-20">
              <div className="text-2xl mb-3 drop-shadow-sm">{type.icon}</div>
              <div className="text-base font-bold text-white drop-shadow-md mb-1">{type.name}</div>
              <div className="text-xs text-white/95 font-medium">{type.description}</div>
            </div>
            
            {/* Shimmer effect for selected */}
            {selectedType === type.id && (
              <div className="absolute inset-0 z-10 animate-shimmer bg-gradient-to-r from-transparent via-white/25 to-transparent"></div>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-r from-white/20 via-white/40 to-white/20"></div>
            
            {/* Inner highlight */}
            <div className="absolute top-2 left-3 w-8 h-4 bg-white/30 rounded-full blur-sm z-10"></div>
            
            {/* Selection indicator */}
            {selectedType === type.id && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-white/90 rounded-full flex items-center justify-center z-20">
                <CheckCircle className="h-3 w-3 text-emerald-600" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Amount Selection - Enhanced */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-4 block">Choose Amount (£)</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 relative overflow-hidden group ${
                selectedAmount === amount && !customAmount
                  ? 'bg-emerald-600 text-white shadow-lg transform scale-105 ring-2 ring-emerald-300'
                  : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 hover:from-emerald-50 hover:to-emerald-100 hover:text-emerald-700 border-2 border-gray-200 hover:border-emerald-300 shadow-sm hover:shadow-md transform hover:scale-102'
              }`}
            >
              <span className="relative z-10">£{amount}</span>
              {selectedAmount === amount && !customAmount && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-300/20 to-emerald-400/20 animate-shimmer"></div>
              )}
            </button>
          ))}
        </div>
        
        <div className="relative">
          <input
            type="number"
            placeholder="Enter custom amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(0);
            }}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 text-gray-900 text-lg font-semibold transition-all duration-200 bg-gradient-to-br from-white to-gray-50"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
            £
          </div>
        </div>
      </div>

      {/* Dedication Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-700">Donate on behalf of (Optional)</label>
          <button
            onClick={() => setShowDedication(!showDedication)}
            className="text-emerald-600 text-sm hover:text-emerald-700 flex items-center"
          >
            <Users className="h-4 w-4 mr-1" />
            {showDedication ? 'Hide' : 'Add dedication'}
          </button>
        </div>

        {showDedication && (
          <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div>
              <input
                type="text"
                placeholder="e.g., Father, Mother, Prophet Muhammad (PBUH)"
                value={onBehalfOf}
                onChange={(e) => setOnBehalfOf(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
              
              <div className="flex flex-wrap gap-2 mt-2">
                {dedicationSuggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setOnBehalfOf(suggestion)}
                    className="text-xs px-3 py-1 bg-white border border-gray-300 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                placeholder="Add a personal note (will be shared in live feed)"
                value={dedicationNote}
                onChange={(e) => setDedicationNote(e.target.value)}
                maxLength={150}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 resize-none"
              />
              <div className="text-xs text-gray-500 text-right mt-1">
                {dedicationNote.length}/150 characters
              </div>
            </div>

            <div className="flex items-center text-sm text-blue-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>Your dedication will appear in the live feed for the community to see</span>
            </div>
          </div>
        )}
      </div>

      {/* Impact Preview - Enhanced */}
      <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl">
        <div className="text-sm font-bold text-blue-900 mb-2 flex items-center">
          <Gift className="h-4 w-4 mr-2" />
          Your impact:
        </div>
        <div className="text-xl font-bold text-blue-900 mb-3">
          {customAmount ? `£${customAmount}` : `£${selectedAmount}`} can provide 5 hot meals for families in need
        </div>
        <div className="flex items-center text-sm text-blue-800 bg-white/50 p-2 rounded-lg">
          <CheckCircle className="h-4 w-4 mr-2 text-emerald-600" />
          <span className="font-medium">Verified impact with our charity partners</span>
        </div>
      </div>

      {/* Donate Button - Enhanced */}
      <Button className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-xl border-0 relative overflow-hidden group">
        <div className="relative z-10 flex items-center justify-center">
          <Gift className="h-5 w-5 mr-3" />
          Donate {customAmount ? `£${customAmount}` : `£${selectedAmount}`}
          {onBehalfOf && ` on behalf of ${onBehalfOf}`}
          <ArrowRight className="h-5 w-5 ml-3" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>

      {/* Monthly Subscription Option */}
      {selectedType === 'monthly' && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center mb-3">
            <div className="bg-gray-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3">
              <Calendar className="h-4 w-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-800">Monthly Subscription</span>
          </div>
          <p className="text-xs text-gray-600">
            Set up automatic monthly donations for consistent support.
          </p>
        </div>
      )}

      {/* Security notice */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Secured by SSL encryption • Charity Commission registered
        </p>
      </div>
    </Card>
  );
};

export default DonationWidget;


import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Gift, Calendar, ArrowRight, CheckCircle, Users, MessageCircle } from 'lucide-react';

const donationTypes = [
  { id: 'zakat', name: 'Zakat', icon: '☪️', color: 'bg-emerald-600', description: 'Obligatory charity' },
  { id: 'sadaqah', name: 'Sadaqah', icon: '💝', color: 'bg-blue-600', description: 'Voluntary charity' },
  { id: 'lillah', name: 'Lillah', icon: '🤲', color: 'bg-purple-600', description: 'For Allah\'s sake' },
  { id: 'monthly', name: 'Monthly', icon: '📅', color: 'bg-gray-600', description: 'Regular giving' }
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

      {/* Donation Type Selection */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {donationTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-4 rounded-lg transition-all duration-200 border-2 ${
              selectedType === type.id 
                ? 'border-emerald-500 bg-emerald-50' 
                : 'border-gray-200 hover:border-emerald-300 bg-white'
            }`}
          >
            <div className="text-lg mb-2">{type.icon}</div>
            <div className="text-sm font-semibold text-gray-800">{type.name}</div>
            <div className="text-xs text-gray-600">{type.description}</div>
          </button>
        ))}
      </div>

      {/* Amount Selection */}
      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-3 block">Amount (£)</label>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickAmounts.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount('');
              }}
              className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                selectedAmount === amount && !customAmount
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
              }`}
            >
              £{amount}
            </button>
          ))}
        </div>
        
        <input
          type="number"
          placeholder="Enter custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value);
            setSelectedAmount(0);
          }}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
        />
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

      {/* Impact Preview */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="text-sm font-medium text-blue-900 mb-2">Your impact:</div>
        <div className="text-lg font-semibold text-blue-900 mb-2">
          {customAmount ? `£${customAmount}` : `£${selectedAmount}`} can provide 5 hot meals for families in need
        </div>
        <div className="flex items-center text-sm text-blue-800">
          <CheckCircle className="h-4 w-4 mr-1" />
          <span>Verified impact with our charity partners</span>
        </div>
      </div>

      {/* Donate Button */}
      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 text-base shadow-md transition-colors duration-200">
        <Gift className="h-5 w-5 mr-2" />
        Donate {customAmount ? `£${customAmount}` : `£${selectedAmount}`}
        {onBehalfOf && ` on behalf of ${onBehalfOf}`}
        <ArrowRight className="h-5 w-5 ml-2" />
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

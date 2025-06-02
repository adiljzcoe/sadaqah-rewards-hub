import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Gift, Calendar, ArrowRight, CheckCircle, Users, MessageCircle, Flower } from 'lucide-react';
import MobileNativeDonationButton from './MobileNativeDonationButton';
import { useMobileFeatures } from '@/hooks/useMobileFeatures';

const donationTypes = [
  { 
    id: 'zakat', 
    name: 'Zakat', 
    icon: '☪️', 
    description: 'Obligatory charity',
    gradient: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-emerald-600',
    shadow: 'shadow-emerald-500/50',
    ring: 'ring-emerald-300'
  },
  { 
    id: 'sadaqah', 
    name: 'Sadaqah', 
    icon: '💝', 
    description: 'Voluntary charity',
    gradient: 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/50',
    ring: 'ring-blue-300'
  },
  { 
    id: 'lillah', 
    name: 'Lillah', 
    icon: '🤲', 
    description: 'For Allah\'s sake',
    gradient: 'bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/50',
    ring: 'ring-purple-300'
  },
  { 
    id: 'honoring', 
    name: 'Honoring', 
    icon: '🌹', 
    description: 'Honor loved ones',
    gradient: 'bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600',
    shadow: 'shadow-rose-500/50',
    ring: 'ring-rose-300'
  }
];

const quickAmounts = [10, 25, 50, 100];

const memoryDedicationSuggestions = [
  'My Father', 'My Mother', 'My Grandmother', 'My Grandfather', 
  'My Sister', 'My Brother', 'My Friend', 'My Uncle', 'My Aunt', 'My Spouse'
];

const memoryCauses = [
  { id: 'clean-water', name: 'Clean Water Wells', description: 'Provide clean water access' },
  { id: 'orphan-care', name: 'Orphan Care', description: 'Support orphaned children' },
  { id: 'emergency-aid', name: 'Emergency Aid', description: 'Disaster relief support' },
  { id: 'education', name: 'Education', description: 'Build schools and libraries' },
  { id: 'healthcare', name: 'Healthcare', description: 'Medical aid and clinics' },
  { id: 'food-aid', name: 'Food Aid', description: 'Feed hungry families' }
];

const DonationWidget = () => {
  const [selectedType, setSelectedType] = useState('sadaqah');
  const [customAmount, setCustomAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(25);
  const [onBehalfOf, setOnBehalfOf] = useState('');
  const [dedicationNote, setDedicationNote] = useState('');
  const [showDedication, setShowDedication] = useState(false);
  
  // Honoring specific states
  const [memoryPerson, setMemoryPerson] = useState('');
  const [memoryNote, setMemoryNote] = useState('');
  const [selectedCause, setSelectedCause] = useState('clean-water');

  console.log('DonationWidget rendered, selectedType:', selectedType);
  console.log('Available donation types:', donationTypes);

  const { isNative } = useMobileFeatures();

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

      {/* Donation Type Selection - Dramatically Enhanced */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {donationTypes.map((type) => {
          console.log('Rendering donation type:', type.name, type.id);
          return (
            <button
              key={type.id}
              onClick={() => {
                console.log('Selected donation type:', type.id);
                setSelectedType(type.id);
              }}
              className={`relative p-6 rounded-2xl transition-all duration-500 border-0 overflow-hidden group transform hover:scale-105 ${type.gradient} ${
                selectedType === type.id 
                  ? `scale-110 shadow-2xl ${type.shadow} ring-4 ${type.ring}` 
                  : `shadow-xl ${type.shadow} hover:shadow-2xl`
              }`}
            >
              {/* Animated background shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"></div>
              
              {/* Content */}
              <div className="relative z-20">
                <div className="text-3xl mb-4 drop-shadow-lg filter">{type.icon}</div>
                <div className="text-lg font-bold text-white drop-shadow-lg mb-2">{type.name}</div>
                <div className="text-sm text-white/95 font-medium drop-shadow-md">{type.description}</div>
              </div>
              
              {/* Selection indicator with animation */}
              {selectedType === type.id && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center z-30 animate-pulse">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              )}
              
              {/* Inner glow effect */}
              <div className="absolute top-3 left-4 w-12 h-6 bg-white/40 rounded-full blur-md z-10"></div>
              
              {/* Border highlight */}
              <div className="absolute inset-0 rounded-2xl border-2 border-white/20 z-10"></div>
            </button>
          );
        })}
      </div>

      {/* Honoring Section */}
      {selectedType === 'honoring' && (
        <div className="mb-6 p-5 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 rounded-xl">
          <div className="flex items-center mb-4">
            <Flower className="h-5 w-5 mr-2 text-rose-600" />
            <h4 className="text-lg font-semibold text-rose-900">Honoring Donation</h4>
          </div>
          
          {/* Cause Selection */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-rose-800 mb-3 block">Select a cause</label>
            <div className="grid grid-cols-1 gap-2">
              {memoryCauses.map((cause) => (
                <button
                  key={cause.id}
                  onClick={() => setSelectedCause(cause.id)}
                  className={`p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedCause === cause.id
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'bg-white border border-rose-300 text-rose-800 hover:bg-rose-100'
                  }`}
                >
                  <div className="font-medium">{cause.name}</div>
                  <div className={`text-sm ${selectedCause === cause.id ? 'text-rose-100' : 'text-rose-600'}`}>
                    {cause.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Honoring */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-rose-800 mb-2 block">Honoring</label>
            <input
              type="text"
              placeholder="e.g., My Father, My Mother"
              value={memoryPerson}
              onChange={(e) => setMemoryPerson(e.target.value)}
              className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 mb-2"
            />
            
            <div className="flex flex-wrap gap-2">
              {memoryDedicationSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setMemoryPerson(suggestion)}
                  className="text-xs px-3 py-1 bg-white border border-rose-300 rounded-full hover:bg-rose-100 hover:border-rose-400 transition-colors text-rose-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Honoring Note */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-rose-800 mb-2 block">Personal note</label>
            <textarea
              placeholder="e.g., Love you dad, Always in our hearts..."
              value={memoryNote}
              onChange={(e) => setMemoryNote(e.target.value)}
              maxLength={100}
              rows={3}
              className="w-full p-3 border border-rose-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-gray-900 resize-none"
            />
            <div className="text-xs text-rose-600 text-right mt-1">
              {memoryNote.length}/100 characters
            </div>
          </div>

          <div className="flex items-center text-sm text-rose-700 bg-white/50 p-2 rounded-lg">
            <MessageCircle className="h-4 w-4 mr-2" />
            <span>Your honoring dedication will be shared with respect and honor</span>
          </div>
        </div>
      )}

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
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-emerald-300/20 to-emerald-400/20"></div>
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

      {/* Dedication Section for non-honoring donations */}
      {selectedType !== 'honoring' && (
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
                  {['Father', 'Mother', 'Prophet Muhammad (PBUH)', 'Grandmother', 'Grandfather', 'Sister', 'Brother', 'Friend', 'All Muslims', 'Deceased loved one'].map((suggestion) => (
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
      )}

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
          {selectedType === 'honoring' && memoryPerson && ` honoring ${memoryPerson}`}
          {selectedType !== 'honoring' && onBehalfOf && ` on behalf of ${onBehalfOf}`}
          <ArrowRight className="h-5 w-5 ml-3" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Button>

      {/* Mobile Native Features - Show only on mobile app */}
      {isNative && (
        <div className="mb-6">
          <MobileNativeDonationButton
            amount={customAmount ? Number(customAmount) : selectedAmount}
            campaignName={selectedType === 'honoring' && memoryPerson ? `Honoring ${memoryPerson}` : 'Emergency Relief'}
            onSuccess={(paymentToken) => {
              console.log('Native payment successful:', paymentToken);
              // Handle successful payment here
            }}
          />
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

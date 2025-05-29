
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded && (
        <div className="mb-4 bg-white rounded-lg shadow-xl border border-islamic-green-200 p-4 w-64">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-islamic-green-800">Quick Donate</h4>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-2">
            <Button className="w-full justify-start bg-islamic-green-600 hover:bg-islamic-green-700">
              <Heart className="h-4 w-4 mr-2" />
              £10 - Hot Meals 🍽️
            </Button>
            <Button className="w-full justify-start bg-sadaqah-gold-600 hover:bg-sadaqah-gold-700">
              <Heart className="h-4 w-4 mr-2" />
              £25 - Water Wells 💧
            </Button>
            <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
              <Heart className="h-4 w-4 mr-2" />
              £50 - Education 📚
            </Button>
          </div>
          
          <div className="mt-3 p-2 bg-sadaqah-gold-50 rounded text-center">
            <div className="flex items-center justify-center text-xs text-sadaqah-gold-700">
              <Zap className="h-3 w-3 mr-1" />
              Double points active!
            </div>
          </div>
        </div>
      )}

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-islamic-green-600 hover:bg-islamic-green-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white"
        size="lg"
      >
        <Heart className="h-6 w-6 animate-pulse" />
      </Button>
    </div>
  );
};

export default FloatingDonationButton;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, X, Star } from 'lucide-react';

const FloatingDonationWidget = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80">
      <Card className="bg-white border border-gray-200 shadow-lg animate-gentle-fade">
        {/* Header */}
        <div className="bg-emerald-500 p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Heart className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <h4 className="font-bold text-white">Quick Donate</h4>
                <p className="text-white/90 text-sm">3x Points Active!</p>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Donation Amounts */}
        <div className="p-4 space-y-3">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm py-2 rounded-lg">
              £5
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg">
              £10
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white font-semibold text-sm py-2 rounded-lg">
              £20
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-lg">
              £50
            </Button>
          </div>

          {/* Custom Amount */}
          <div className="mb-4">
            <input
              type="number"
              placeholder="£ Amount"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Donation Categories */}
          <div className="space-y-2">
            <h5 className="font-semibold text-gray-700 text-sm">ZAKAT</h5>
            <div className="grid grid-cols-4 gap-2">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2">
                £30
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2">
                £50
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2">
                £100
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white font-semibold text-xs py-2">
                £200
              </Button>
            </div>
          </div>

          {/* Give Now Button */}
          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-lg rounded-lg mt-4">
            GIVE NOW
          </Button>

          {/* Bonus Points */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <div className="flex items-center justify-center space-x-2">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-semibold text-amber-800">
                Bonus Points: Donate In 5m
              </span>
            </div>
          </div>

          {/* Policy Note */}
          <p className="text-xs text-gray-500 text-center">
            100% DONATION POLICY
          </p>
        </div>
      </Card>
    </div>
  );
};

export default FloatingDonationWidget;

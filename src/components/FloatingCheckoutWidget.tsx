
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, LogIn, Heart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface FloatingCheckoutWidgetProps {
  total: number;
  isProcessing: boolean;
  onPayNow: () => void;
  onShowAuth: () => void;
  termsAccepted: boolean;
}

const FloatingCheckoutWidget = ({ 
  total, 
  isProcessing, 
  onPayNow, 
  onShowAuth, 
  termsAccepted 
}: FloatingCheckoutWidgetProps) => {
  const { user } = useAuth();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-50 to-purple-50 border-t-2 border-blue-200 shadow-2xl">
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Total Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-sm text-gray-600">Total:</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              £{total.toFixed(2)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {!user ? (
              <>
                <Button
                  variant="outline"
                  onClick={onShowAuth}
                  className="flex items-center gap-2 border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
                <Button
                  onClick={onPayNow}
                  disabled={isProcessing || !termsAccepted}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </Button>
              </>
            ) : (
              <Button
                onClick={onPayNow}
                disabled={isProcessing || !termsAccepted}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                {isProcessing ? 'Processing...' : 'Pay Now'}
              </Button>
            )}
          </div>
        </div>

        {/* Payment Methods Row */}
        <div className="mt-3 flex items-center justify-center space-x-4">
          <span className="text-xs text-gray-500">Secure payments via:</span>
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/78afdaac-a12f-42b2-a9a1-06d4a13e8fb4.png" alt="Payment methods" className="h-6 opacity-80" />
          </div>
        </div>

        {/* Terms Warning */}
        {!termsAccepted && (
          <div className="mt-2 text-center">
            <span className="text-xs text-red-500">
              Please accept the terms and conditions to continue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCheckoutWidget;

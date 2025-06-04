
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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-purple-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-hidden border-t border-white/10">
      {/* Crystalline background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-indigo-900/40 to-slate-900/60"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-2 left-10 w-20 h-8 bg-white/10 rounded-full blur-sm animate-pulse"></div>
        <div className="absolute top-4 right-32 w-16 h-6 bg-white/5 rounded-full blur-sm animate-pulse delay-300"></div>
        <div className="absolute top-1 left-1/3 w-24 h-10 bg-white/10 rounded-full blur-sm animate-pulse delay-500"></div>
        <div className="absolute top-3 right-1/4 w-18 h-7 bg-white/15 rounded-full blur-sm animate-pulse delay-700"></div>
        <div className="absolute top-6 left-20 w-2 h-2 bg-white/50 rounded-full animate-pulse shadow-lg shadow-white/30"></div>
        <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-1000 shadow-md shadow-white/20"></div>
      </div>
      
      <div className="relative z-20 container mx-auto px-4 py-4 max-w-4xl">
        <div className="flex items-center justify-between">
          {/* Total Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Heart className="h-5 w-5 text-pink-500 mr-2 drop-shadow-lg" />
              <span className="text-sm text-white/70 drop-shadow-md">Total:</span>
            </div>
            <div className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
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
                  className="flex items-center gap-2 border-white/30 text-white/90 hover:bg-white/10 backdrop-blur-sm"
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
          <span className="text-xs text-white/60 drop-shadow-md">Secure payments via:</span>
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/78afdaac-a12f-42b2-a9a1-06d4a13e8fb4.png" 
              alt="Payment methods" 
              className="h-6 opacity-90 drop-shadow-[0_0_15px_rgba(255,255,255,0.9)] filter brightness-125" 
            />
          </div>
        </div>

        {/* Terms Warning */}
        {!termsAccepted && (
          <div className="mt-2 text-center">
            <span className="text-xs text-red-300 drop-shadow-md">
              Please accept the terms and conditions to continue
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingCheckoutWidget;

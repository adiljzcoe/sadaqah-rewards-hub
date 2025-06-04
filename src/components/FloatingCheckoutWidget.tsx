
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, LogIn, Heart, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuth } from '@/hooks/useAuth';

interface FloatingCheckoutWidgetProps {
  total: number;
  impactTotal: number;
  fundraisingAmount: number;
  isProcessing: boolean;
  onPayNow: () => void;
  onShowAuth: () => void;
  termsAccepted: boolean;
}

const FloatingCheckoutWidget = ({ 
  total, 
  impactTotal,
  fundraisingAmount,
  isProcessing, 
  onPayNow, 
  onShowAuth, 
  termsAccepted 
}: FloatingCheckoutWidgetProps) => {
  const { user } = useAuth();

  return (
    <TooltipProvider>
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 backdrop-blur-md shadow-2xl overflow-hidden border-t-2 border-cyan-400/30">
        {/* Final Fantasy inspired crystalline background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-indigo-900/40 to-cyan-900/60"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-2 left-10 w-20 h-8 bg-cyan-300/20 rounded-full blur-sm animate-pulse shadow-cyan-400/50"></div>
          <div className="absolute top-4 right-32 w-16 h-6 bg-blue-300/15 rounded-full blur-sm animate-pulse delay-300 shadow-blue-400/50"></div>
          <div className="absolute top-1 left-1/3 w-24 h-10 bg-indigo-300/20 rounded-full blur-sm animate-pulse delay-500 shadow-indigo-400/50"></div>
          <div className="absolute top-3 right-1/4 w-18 h-7 bg-cyan-400/25 rounded-full blur-sm animate-pulse delay-700 shadow-cyan-300/60"></div>
          <div className="absolute top-6 left-20 w-2 h-2 bg-cyan-300 rounded-full animate-pulse shadow-lg shadow-cyan-300/80"></div>
          <div className="absolute top-8 right-40 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-1000 shadow-md shadow-blue-300/70"></div>
        </div>
        
        <div className="relative z-20 container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex items-center justify-between">
            {/* Payment Amount Section */}
            <div className="flex flex-col space-y-1">
              {/* Total to Pay */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-cyan-400 mr-2 drop-shadow-lg" />
                  <span className="text-sm text-cyan-200 drop-shadow-md">Total to Pay:</span>
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                  £{total.toFixed(2)}
                </div>
              </div>

              {/* Your Total Impact - only show when fundraising donation selected */}
              {fundraisingAmount > 0 && (
                <div className="flex items-center space-x-2 mt-1">
                  <CreditCard className="h-5 w-5 text-transparent mr-2" />
                  <span className="text-xs text-cyan-300/90">The true value of your donation is:</span>
                  <div className="text-base font-semibold text-pink-300 drop-shadow-md">
                    £{impactTotal.toFixed(2)}
                  </div>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-cyan-400/80 hover:text-cyan-300 cursor-help ml-1" />
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      align="end"
                      className="max-w-xs bg-white text-slate-800 border border-slate-200 shadow-lg z-[60]"
                    >
                      <p className="text-sm font-medium">Your donation creates multiplied impact through our fundraising platform. The true value includes the additional funds raised by your contribution to the campaign.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              {!user ? (
                <>
                  <Button
                    variant="outline"
                    onClick={onShowAuth}
                    className="flex items-center gap-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-900/50 backdrop-blur-sm"
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
            <span className="text-xs text-cyan-200/80 drop-shadow-md">Secure payments via:</span>
            <div className="flex items-center space-x-3 relative">
              <div className="relative">
                {/* Enhanced white glow background */}
                <div className="absolute inset-0 bg-white/90 rounded-lg blur-md scale-110 opacity-80"></div>
                <div className="absolute inset-0 bg-white/60 rounded-lg blur-sm scale-105 opacity-90"></div>
                <div className="absolute inset-0 bg-white/40 rounded-lg blur-xs scale-102 opacity-95"></div>
                <img 
                  src="/lovable-uploads/78afdaac-a12f-42b2-a9a1-06d4a13e8fb4.png" 
                  alt="Payment methods" 
                  className="relative h-6 opacity-100 filter brightness-110 contrast-110 saturate-110 z-10" 
                />
              </div>
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
    </TooltipProvider>
  );
};

export default FloatingCheckoutWidget;

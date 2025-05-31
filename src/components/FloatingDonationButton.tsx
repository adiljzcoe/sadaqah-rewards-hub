
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, HandHeart, TrendingUp } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import HeavenlyBirdMascot from './HeavenlyBirdMascot';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isStickyWidgetActive, setIsStickyWidgetActive] = useState(false);

  useEffect(() => {
    // Simulate a call to action after 5 seconds
    const timer = setTimeout(() => {
      setShowCallToAction(true);
      setCurrentMessage('Support Gaza Relief!');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFundraisingDonate = (amount: number) => {
    const valueReceived = amount * 7;
    console.log(`Fundraising Donation: £${amount} = £${valueReceived} value!`);
    setIsExpanded(false);
    // Here you would typically integrate with your donation processing system
  };

  const toggleStickyWidget = () => {
    setIsStickyWidgetActive(!isStickyWidgetActive);
  };

  return (
    <>
      <style>{`
        @keyframes message-appear {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.05);
          }
        }
        
        @keyframes rotate-heart {
          0% { 
            transform: rotate(0deg);
          }
          25% { 
            transform: rotate(-5deg);
          }
          75% { 
            transform: rotate(5deg);
          }
          100% { 
            transform: rotate(0deg);
          }
        }
      `}</style>
      
      <div className={`fixed ${
        isStickyWidgetActive 
          ? 'top-28 right-4 md:bottom-32 md:right-8' 
          : 'bottom-32 right-8'
      } z-50 transition-all duration-300`}>
        {showCallToAction && (
          <div className={`absolute z-60 animate-[message-appear_0.4s_ease-out] ${
            isStickyWidgetActive 
              ? 'top-16 -left-32 md:-top-16 md:-left-32' 
              : '-top-16 -left-32'
          }`}>
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl px-4 py-3">
              <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                {currentMessage}
              </p>
              {/* Message pointer */}
              <div className={`absolute transform rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200 ${
                isStickyWidgetActive 
                  ? '-bottom-1.5 right-8 md:bottom-0 md:right-8 md:translate-y-1/2' 
                  : 'bottom-0 right-8 translate-y-1/2'
              }`}></div>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className={`bg-white/98 backdrop-blur-lg rounded-2xl p-6 w-80 shadow-2xl border border-gray-100 animate-[message-appear_0.3s_ease-out] ${
            isStickyWidgetActive 
              ? 'mt-6 md:mb-6 md:mt-0' 
              : 'mb-6'
          }`}>
            {/* Header with special fundraising badge */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Fundraising Donation</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    🚀 7X VALUE!
                  </div>
                  <span className="text-xs text-gray-600">Help us raise more funds</span>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4 text-gray-600" />
              </Button>
            </div>

            {/* Explanation */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-3 mb-4">
              <p className="text-sm text-orange-800 font-medium">
                ✨ Special Fundraising Donation: Every £1 you donate = £7 worth of value!
              </p>
              <p className="text-xs text-orange-700 mt-1">
                This helps us raise more funds and gives you incredible rewards.
              </p>
            </div>

            {/* Donation amounts with value display */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Button 
                variant="outline" 
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 p-4 h-auto flex-col"
                onClick={() => handleFundraisingDonate(5)}
              >
                <div className="flex items-center mb-1">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  <span className="font-bold">£5</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">= £35 value!</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-green-50 hover:bg-green-100 text-green-700 border-2 border-green-200 p-4 h-auto flex-col"
                onClick={() => handleFundraisingDonate(10)}
              >
                <div className="flex items-center mb-1">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  <span className="font-bold">£10</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">= £70 value!</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-2 border-purple-200 p-4 h-auto flex-col"
                onClick={() => handleFundraisingDonate(25)}
              >
                <div className="flex items-center mb-1">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  <span className="font-bold">£25</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">= £175 value!</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-2 border-amber-200 p-4 h-auto flex-col"
                onClick={() => handleFundraisingDonate(50)}
              >
                <div className="flex items-center mb-1">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  <span className="font-bold">£50</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">= £350 value!</div>
              </Button>
            </div>

            {/* Featured donation button */}
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 py-3 text-lg shadow-lg" onClick={() => handleFundraisingDonate(100)}>
              <div className="flex items-center justify-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Donate £100 = £700 Value! 🎯
              </div>
            </Button>

            {/* Bottom info */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Fundraising donations help us reach our goals faster
              </p>
            </div>
          </div>
        )}

        {/* Main donation button with donation tin mascot - made smaller */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-20 h-20 cursor-pointer transition-all duration-300 group overflow-visible"
          style={{
            animation: showCallToAction ? 'gentle-pulse 2s ease-in-out infinite' : 'none'
          }}
        >
          <HeavenlyBirdMascot 
            isActive={showCallToAction} 
            className="w-full h-full overflow-visible"
          />
        </div>
      </div>
    </>
  );
};

export default FloatingDonationButton;

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import HeavenlyBirdMascot from './HeavenlyBirdMascot';
import CoinAnimation from './CoinAnimation';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isStickyWidgetActive, setIsStickyWidgetActive] = useState(false);
  const [coinAnimationTrigger, setCoinAnimationTrigger] = useState(false);

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
    console.log('About to trigger coin animation...');
    
    // Trigger coin animation
    setCoinAnimationTrigger(true);
    
    // Reset the trigger after a short delay
    setTimeout(() => {
      setCoinAnimationTrigger(false);
      console.log('Coin animation trigger reset');
    }, 100);
    
    setIsExpanded(false);
    // Here you would typically integrate with your donation processing system
  };

  const toggleStickyWidget = () => {
    setIsStickyWidgetActive(!isStickyWidgetActive);
  };

  return (
    <>
      {/* ... keep existing code (style definitions) */}
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
          ? 'top-28 right-4 md:bottom-6 md:right-8' 
          : 'bottom-6 right-8'
      } z-50 transition-all duration-300`}>
        {/* ... keep existing code (showCallToAction section) */}
        {showCallToAction && (
          <div className={`absolute z-60 animate-[message-appear_0.4s_ease-out] ${
            isStickyWidgetActive 
              ? 'top-20 -left-32 md:-top-20 md:-left-32' 
              : '-top-20 -left-32'
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

        {/* ... keep existing code (isExpanded section start) */}
        {isExpanded && (
          <div className={`bg-white/98 backdrop-blur-lg rounded-2xl p-3 w-56 shadow-2xl border border-gray-100 animate-[message-appear_0.3s_ease-out] ${
            isStickyWidgetActive 
              ? 'mt-6 md:mb-6 md:mt-0' 
              : 'mb-6'
          }`}>

            {/* 100% Fundraising Donation Policy Plaque */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-2 mb-3">
              <div className="text-center">
                <p className="text-xs font-bold text-emerald-800 mb-1">
                  🎯 100% FUNDRAISING DONATION
                </p>
                <p className="text-xs text-emerald-700 leading-tight">
                  Every penny goes directly to help us raise more funds for causes we care about
                </p>
              </div>
            </div>

            {/* Compact explanation */}
            <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-2 mb-2">
              <p className="text-xs text-orange-800 font-medium">
                ✨ Every £1 = £7 worth of value!
              </p>
            </div>

            {/* Compact donation amounts grid */}
            <div className="grid grid-cols-2 gap-1.5 mb-2">
              <Button 
                variant="outline" 
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 p-2 h-auto flex-col text-xs"
                onClick={() => handleFundraisingDonate(5)}
              >
                <div className="flex items-center">
                  <SimpleGoldCoin size={10} className="mr-1" />
                  <span className="font-bold">£5</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">£35 value</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 p-2 h-auto flex-col text-xs"
                onClick={() => handleFundraisingDonate(10)}
              >
                <div className="flex items-center">
                  <SimpleGoldCoin size={10} className="mr-1" />
                  <span className="font-bold">£10</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">£70 value</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 p-2 h-auto flex-col text-xs"
                onClick={() => handleFundraisingDonate(25)}
              >
                <div className="flex items-center">
                  <SimpleGoldCoin size={10} className="mr-1" />
                  <span className="font-bold">£25</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">£175 value</div>
              </Button>
              
              <Button 
                variant="outline" 
                className="bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 p-2 h-auto flex-col text-xs"
                onClick={() => handleFundraisingDonate(50)}
              >
                <div className="flex items-center">
                  <SimpleGoldCoin size={10} className="mr-1" />
                  <span className="font-bold">£50</span>
                </div>
                <div className="text-xs text-green-600 font-semibold">£350 value</div>
              </Button>
            </div>

            {/* Featured donation button - more compact */}
            <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:from-orange-600 hover:to-red-600 py-1.5 text-xs shadow-lg" onClick={() => handleFundraisingDonate(100)}>
              <div className="flex items-center justify-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                £100 = £700 Value! 🎯
              </div>
            </Button>

            {/* Bottom info with better contrast */}
            <div className="text-center mt-2">
              <p className="text-xs text-gray-800 font-medium">
                Help us reach our goals faster
              </p>
            </div>
          </div>
        )}

        {/* Main donation button with mascot - Fixed positioning */}
        <div
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-40 h-40 cursor-pointer transition-all duration-300 group"
          style={{
            animation: showCallToAction ? 'gentle-pulse 2s ease-in-out infinite' : 'none'
          }}
        >
          {/* Mascot - Base layer */}
          <div className="absolute inset-0 z-10">
            <HeavenlyBirdMascot 
              isActive={showCallToAction} 
              className="w-full h-full"
            />
          </div>
          
          {/* Coin Animation - Overlay layer */}
          <div className="absolute inset-0 z-20">
            <CoinAnimation 
              trigger={coinAnimationTrigger}
              onComplete={() => console.log('Coin animation completed!')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingDonationButton;

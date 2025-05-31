
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, HandHeart } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';

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

  const handleQuickDonate = (amount: number) => {
    // Simulate donation logic here
    console.log(`Donated ${amount}!`);
    setIsExpanded(false);
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
          ? 'top-28 right-4 md:bottom-20 md:right-8' 
          : 'bottom-8 right-8'
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
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Support Gaza Relief</h3>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
            <p className="text-sm text-gray-700 mb-4">Your donation provides critical aid to families in need.</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Button variant="outline" className="bg-blue-50 hover:bg-blue-100 text-blue-700" onClick={() => handleQuickDonate(5)}>
                <div className="flex items-center">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  5
                </div>
              </Button>
              <Button variant="outline" className="bg-green-50 hover:bg-green-100 text-green-700" onClick={() => handleQuickDonate(10)}>
                <div className="flex items-center">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  10
                </div>
              </Button>
              <Button variant="outline" className="bg-amber-50 hover:bg-amber-100 text-amber-700" onClick={() => handleQuickDonate(25)}>
                <div className="flex items-center">
                  <SimpleGoldCoin size={14} className="mr-1" />
                  25
                </div>
              </Button>
            </div>
            <Button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold hover:from-emerald-600 hover:to-blue-600" onClick={() => handleQuickDonate(50)}>
              <div className="flex items-center justify-center">
                <HandHeart className="h-4 w-4 mr-2" />
                Donate 50
              </div>
            </Button>
          </div>
        )}

        {/* Main donation button with simple heart icon */}
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 shadow-2xl border-4 border-white/80 hover:border-white transition-all duration-300 group overflow-hidden"
          style={{
            animation: showCallToAction ? 'gentle-pulse 2s ease-in-out infinite' : 'none'
          }}
        >
          <HandHeart 
            className="h-8 w-8 text-white" 
            style={{
              animation: showCallToAction ? 'rotate-heart 2s ease-in-out infinite' : 'none'
            }}
          />
        </Button>
      </div>
    </>
  );
};

export default FloatingDonationButton;

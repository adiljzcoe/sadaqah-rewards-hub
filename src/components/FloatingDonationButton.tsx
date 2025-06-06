import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, X } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import PixarHeartMascot from './PixarHeartMascot';
import CoinAnimation from './CoinAnimation';
import HeartDonationEffect from './HeartDonationEffect';
import { useCart } from '@/hooks/useCart';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isStickyWidgetActive, setIsStickyWidgetActive] = useState(false);
  const [coinAnimationTrigger, setCoinAnimationTrigger] = useState(false);
  const [heartAnimationTrigger, setHeartAnimationTrigger] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragCurrentRef = useRef({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();

  // Priority 7x fundraising messages come first, then other encouraging messages
  const encouragingMessages = [
    '🎯 Every £1 = £7 value! 7x Impact!',
    '🚀 7x Fundraising Power - Tap to help!',
    '💰 Your £10 = £70 worth of impact!',
    '⭐ 7x multiplier - Maximum impact!',
    '🎪 7x Value Boost - Limited time!',
    'Support Gaza Relief! 🇵🇸',
    'Be someone\'s hope today! ✨',
    'Your kindness saves lives! 💝',
    'Together we can help! 🤝',
    'Every penny counts! 💰',
    'Spread love, not hate! ❤️',
    'Make a difference now! 🌟',
    'Gaza needs your help! 🙏',
    'Children are counting on you! 👶',
    'Be their guardian angel! 😇'
  ];

  // Slower message rotation - every 4 seconds instead of 3
  useEffect(() => {
    if (showCallToAction) {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % encouragingMessages.length);
      }, 4000); // Slower rotation

      return () => clearInterval(interval);
    }
  }, [showCallToAction, encouragingMessages.length]);

  // Update current message when index changes
  useEffect(() => {
    setCurrentMessage(encouragingMessages[messageIndex]);
  }, [messageIndex, encouragingMessages]);

  useEffect(() => {
    // Simulate a call to action after 3 seconds (faster to show 7x message)
    const timer = setTimeout(() => {
      setShowCallToAction(true);
      setCurrentMessage(encouragingMessages[0]); // Start with first 7x message
    }, 3000); // Reduced from 5 seconds

    return () => clearTimeout(timer);
  }, [encouragingMessages]);

  // Reset heart animation trigger
  useEffect(() => {
    if (heartAnimationTrigger) {
      const timer = setTimeout(() => {
        setHeartAnimationTrigger(false);
        console.log('FloatingDonationButton: Heart animation trigger reset');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [heartAnimationTrigger]);

  // Reduced touch interaction for mobile - simpler touch handling
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    dragCurrentRef.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    dragCurrentRef.current = { x: touch.clientX, y: touch.clientY };
    
    // Reduced sensitivity for mobile
    const deltaX = (touch.clientX - dragStartRef.current.x) * 0.8;
    const deltaY = (touch.clientY - dragStartRef.current.y) * 0.8;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaX = (dragCurrentRef.current.x - dragStartRef.current.x) * 0.8;
    const deltaY = (dragCurrentRef.current.y - dragStartRef.current.y) * 0.8;
    
    setPosition({ x: deltaX, y: deltaY });
    setIsDragging(false);
  };

  // Updated mouse handlers - now just move instead of swipe away
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    dragCurrentRef.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    dragCurrentRef.current = { x: e.clientX, y: e.clientY };
    
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const deltaX = dragCurrentRef.current.x - dragStartRef.current.x;
    const deltaY = dragCurrentRef.current.y - dragStartRef.current.y;
    
    // Keep the mascot at its new position
    setPosition({ x: deltaX, y: deltaY });
    setIsDragging(false);
    
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Cleanup mouse listeners on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleFundraisingDonate = (amount: number) => {
    const valueReceived = amount * 7;
    console.log(`FloatingDonationButton: Fundraising Donation: £${amount} = £${valueReceived} value!`);
    console.log('FloatingDonationButton: Triggering both coin and heart animations...');
    
    // Add to cart
    addItem({
      id: `fundraising-${Date.now()}`,
      name: `Fundraising Donation - £${amount}`,
      price: amount,
      type: 'donation'
    });
    
    // Trigger both animations
    setCoinAnimationTrigger(true);
    setHeartAnimationTrigger(true);
    
    setTimeout(() => {
      setCoinAnimationTrigger(false);
      console.log('FloatingDonationButton: Coin animation trigger reset');
    }, 100);
    
    setIsExpanded(false);
  };

  const toggleStickyWidget = () => {
    setIsStickyWidgetActive(!isStickyWidgetActive);
  };

  if (!isVisible) return null;

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
        
        @keyframes gentle-pulse-mobile {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.02); /* Much smaller pulse on mobile */
          }
        }
        
        @keyframes gentle-pulse-desktop {
          0%, 100% { 
            transform: scale(1);
          }
          50% { 
            transform: scale(1.05);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .shimmer-bg {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .mascot-mobile {
            animation: gentle-pulse-mobile 3s ease-in-out infinite !important;
          }
        }

        @media (min-width: 769px) {
          .mascot-desktop {
            animation: gentle-pulse-desktop 2s ease-in-out infinite !important;
          }
        }
      `}</style>
      
      <div 
        ref={mascotRef}
        className={`fixed ${
          isStickyWidgetActive 
            ? 'top-28 right-4 md:bottom-6 md:right-8' 
            : 'bottom-6 right-4 md:right-8'
        } z-50 transition-all duration-300 select-none`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Heart Animation Effect */}
        <div className="absolute inset-0 pointer-events-none z-60 overflow-visible">
          <HeartDonationEffect 
            trigger={heartAnimationTrigger}
            amount="0"
            currency="£"
            onComplete={() => console.log('FloatingDonationButton: Heart animation completed!')}
          />
        </div>

        {/* Message positioned closer - smaller on mobile */}
        {showCallToAction && (
          <div className={`absolute z-60 ${
            isStickyWidgetActive 
              ? 'top-12 -left-12 md:-top-8 md:-left-20' 
              : '-top-6 -left-12 md:-top-8 md:-left-20'
          }`}>
            <div className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white border-2 border-white rounded-xl md:rounded-2xl shadow-2xl px-3 py-1.5 md:px-4 md:py-2 animate-[slide-in-left_0.5s_ease-out] max-w-[200px] md:max-w-none">
              <p className="text-xs md:text-sm font-bold whitespace-nowrap leading-tight">
                {currentMessage}
              </p>
              {/* Message pointer */}
              <div className={`absolute transform rotate-45 w-2 h-2 md:w-3 md:h-3 bg-orange-500 border-r-2 border-b-2 border-white ${
                isStickyWidgetActive 
                  ? '-right-1 top-1/2 -translate-y-1/2 md:bottom-0 md:right-4 md:translate-y-1/2 md:top-auto' 
                  : 'bottom-0 right-4 translate-y-1/2'
              }`}></div>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className={`relative overflow-hidden rounded-xl md:rounded-2xl p-0 w-48 md:w-56 shadow-2xl border border-gray-100 animate-[message-appear_0.3s_ease-out] ${
            isStickyWidgetActive 
              ? 'mt-4 md:mt-6 md:mb-6 md:mt-0' 
              : 'mb-4 md:mb-6'
          }`}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            backgroundSize: '300% 300%',
            animation: 'shimmer 4s ease-in-out infinite'
          }}>
            
            {/* Close button - smaller size */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 z-20 w-6 h-6 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            >
              <X className="h-2.5 w-2.5 text-white" />
            </Button>
            
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-white/20 backdrop-blur-lg"></div>
            
            {/* Content container */}
            <div className="relative z-10 p-2.5 md:p-3">

              {/* 7x Fundraising Donation Policy Plaque - Enhanced */}
              <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 border-2 border-orange-300 rounded-lg p-2 mb-3 shadow-lg">
                {/* Subtle animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent shimmer-bg"></div>
                <div className="relative z-10 text-center">
                  <p className="text-xs font-bold text-orange-800 mb-1 drop-shadow-sm">
                    🎯 7x FUNDRAISING IMPACT
                  </p>
                  <p className="text-xs text-orange-700 leading-tight font-medium drop-shadow-sm">
                    Every £1 you give = £7 worth of fundraising power!
                  </p>
                </div>
              </div>

              {/* Compact donation amounts grid */}
              <div className="grid grid-cols-2 gap-1 md:gap-1.5 mb-2">
                <Button 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-blue-700 border border-white/50 p-1.5 md:p-2 h-auto flex-col text-xs backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleFundraisingDonate(5)}
                >
                  <div className="flex items-center">
                    <SimpleGoldCoin size={8} className="mr-1" />
                    <span className="font-bold">£5</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">£35 value</div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-green-700 border border-white/50 p-1.5 md:p-2 h-auto flex-col text-xs backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleFundraisingDonate(10)}
                >
                  <div className="flex items-center">
                    <SimpleGoldCoin size={8} className="mr-1" />
                    <span className="font-bold">£10</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">£70 value</div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-purple-700 border border-white/50 p-1.5 md:p-2 h-auto flex-col text-xs backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleFundraisingDonate(25)}
                >
                  <div className="flex items-center">
                    <SimpleGoldCoin size={8} className="mr-1" />
                    <span className="font-bold">£25</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">£175 value</div>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="bg-white/90 hover:bg-white text-amber-700 border border-white/50 p-1.5 md:p-2 h-auto flex-col text-xs backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200"
                  onClick={() => handleFundraisingDonate(50)}
                >
                  <div className="flex items-center">
                    <SimpleGoldCoin size={8} className="mr-1" />
                    <span className="font-bold">£50</span>
                  </div>
                  <div className="text-xs text-green-600 font-semibold">£350 value</div>
                </Button>
              </div>

              {/* Featured donation button - Enhanced */}
              <Button className="w-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white font-bold hover:from-orange-600 hover:via-red-600 hover:to-pink-600 py-1.5 text-xs shadow-xl hover:shadow-2xl transition-all duration-200 border border-white/20" onClick={() => handleFundraisingDonate(100)}>
                <div className="flex items-center justify-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  £100 = £700 Value! 🎯
                </div>
              </Button>

              {/* Bottom info - Enhanced */}
              <div className="text-center mt-2">
                <p className="text-xs text-white font-medium drop-shadow-lg">
                  7x impact fundraising boost!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main donation button with heart mascot - smaller on mobile, reduced animation */}
        <div
          onClick={() => !isDragging && setIsExpanded(!isExpanded)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`relative w-28 h-28 md:w-40 md:h-40 cursor-pointer transition-all duration-300 group touch-none ${
            showCallToAction && !isDragging 
              ? 'mascot-mobile md:mascot-desktop' 
              : ''
          }`}
        >
          {/* Heart Mascot - Base layer */}
          <div className="absolute inset-0 z-10">
            <PixarHeartMascot 
              isActive={false} // Reduced activity to make it less annoying
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

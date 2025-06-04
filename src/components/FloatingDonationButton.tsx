import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, Pause, Play } from 'lucide-react';
import SimpleGoldCoin from './SimpleGoldCoin';
import PixarHeartMascot from './PixarHeartMascot';
import CoinAnimation from './CoinAnimation';
import { useCart } from '@/hooks/useCart';

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isStickyWidgetActive, setIsStickyWidgetActive] = useState(false);
  const [coinAnimationTrigger, setCoinAnimationTrigger] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragCurrentRef = useRef({ x: 0, y: 0 });
  const mascotRef = useRef<HTMLDivElement>(null);

  const { addItem } = useCart();

  // 50+ encouraging donation messages
  const encouragingMessages = [
    'Support Gaza Relief! 🇵🇸',
    'Be someone\'s hope today! ✨',
    'Your kindness saves lives! 💝',
    'Together we can help! 🤝',
    'Every penny counts! 💰',
    'Spread love, not hate! ❤️',
    'Make a difference now! 🌟',
    'Gaza needs your help! 🙏',
    'Children are counting on you! 👶',
    'Be their guardian angel! 😇',
    'Your donation = their hope! 🌈',
    'Feed a hungry family! 🍽️',
    'Provide clean water! 💧',
    'Give them shelter! 🏠',
    'Education for all! 📚',
    'Medical aid saves lives! 🏥',
    'Emergency relief needed! 🚨',
    'Winter is coming, help now! ❄️',
    'Rebuild their dreams! 🔨',
    'Support orphaned children! 👨‍👩‍👧‍👦',
    'Your charity = their dignity! 👑',
    'Be the change you wish to see! 🌍',
    'Small acts, big impact! 💪',
    'Compassion in action! 🤲',
    'Help heal their wounds! 🩹',
    'Restore their faith! ☪️',
    'Your zakat can save lives! 🕌',
    'Sadaqah brings blessings! ✨',
    'Allah loves the generous! 🤲',
    'Share your rizq today! 🍞',
    'Be a source of mercy! 💝',
    'Your dua + donation = miracle! 🤲',
    'Break their fast! 🌙',
    'Warm their hearts! 💖',
    'Light up their darkness! 💡',
    'Give them reason to smile! 😊',
    'Your help = their prayers! 🤲',
    'Stand with Gaza! 🇵🇸',
    'Humanity needs you! 🌎',
    'Be their lifeline! 🛟',
    'Rush to do good! 🏃‍♂️',
    'Time is precious, act now! ⏰',
    'Your wealth can heal! 💎',
    'Invest in the hereafter! 🌅',
    'Every child deserves safety! 🛡️',
    'Mothers need your support! 👩‍👧‍👦',
    'Fathers working to rebuild! 👨‍🔧',
    'Elderly need care! 👴👵',
    'Disabled need assistance! ♿',
    'Refugees need homes! 🏕️',
    'Students need books! 📖',
    'Patients need medicine! 💊',
    'Babies need milk! 🍼',
    'Trauma healing needed! 🩺',
    'Hope must not die! 🕊️'
  ];

  // Rotate through messages every 3 seconds, but only if not paused
  useEffect(() => {
    if (showCallToAction && !isPaused) {
      const interval = setInterval(() => {
        setMessageIndex((prevIndex) => (prevIndex + 1) % encouragingMessages.length);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [showCallToAction, isPaused, encouragingMessages.length]);

  // Update current message when index changes
  useEffect(() => {
    setCurrentMessage(encouragingMessages[messageIndex]);
  }, [messageIndex, encouragingMessages]);

  useEffect(() => {
    // Simulate a call to action after 5 seconds, but only if not paused
    const timer = setTimeout(() => {
      if (!isPaused) {
        setShowCallToAction(true);
        setCurrentMessage(encouragingMessages[0]);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [encouragingMessages, isPaused]);

  // Updated touch handlers - now just move instead of swipe away
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
    
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const deltaX = dragCurrentRef.current.x - dragStartRef.current.x;
    const deltaY = dragCurrentRef.current.y - dragStartRef.current.y;
    
    // Keep the mascot at its new position instead of snapping back or disappearing
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
    console.log(`Fundraising Donation: £${amount} = £${valueReceived} value!`);
    console.log('About to trigger coin animation...');
    
    // Add to cart
    addItem({
      id: `fundraising-${Date.now()}`,
      name: `Fundraising Donation - £${amount}`,
      price: amount,
      type: 'donation'
    });
    
    setCoinAnimationTrigger(true);
    
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

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      // Resume - show call to action if it was supposed to be shown
      setShowCallToAction(true);
    }
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
      `}</style>
      
      <div 
        ref={mascotRef}
        className={`fixed ${
          isStickyWidgetActive 
            ? 'top-28 right-4 md:bottom-6 md:right-8' 
            : 'bottom-6 right-8'
        } z-50 transition-all duration-300 select-none`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {/* Pause button - positioned at top right of mascot */}
        <div className="absolute -top-2 -right-2 z-30">
          <Button
            variant="outline"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white border-2 border-gray-300 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              togglePause();
            }}
          >
            {isPaused ? (
              <Play className="h-3 w-3 text-green-600" />
            ) : (
              <Pause className="h-3 w-3 text-orange-600" />
            )}
          </Button>
        </div>

        {/* Message positioned much closer to mascot - only show if not paused */}
        {showCallToAction && !isPaused && (
          <div className={`absolute z-60 ${
            isStickyWidgetActive 
              ? 'top-12 -left-16 md:-top-8 md:-left-20' 
              : '-top-8 -left-20'
          }`}>
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white border-2 border-white rounded-2xl shadow-2xl px-4 py-2 animate-[slide-in-left_0.5s_ease-out]">
              <p className="text-sm font-bold whitespace-nowrap">
                {currentMessage}
              </p>
              {/* Message pointer - positioned to point to mascot */}
              <div className={`absolute transform rotate-45 w-3 h-3 bg-green-500 border-r-2 border-b-2 border-white ${
                isStickyWidgetActive 
                  ? '-right-1.5 top-1/2 -translate-y-1/2 md:bottom-0 md:right-4 md:translate-y-1/2 md:top-auto' 
                  : 'bottom-0 right-4 translate-y-1/2'
              }`}></div>
            </div>
          </div>
        )}

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

        {/* Main donation button with heart mascot - Updated to use position instead of swipeOffset */}
        <div
          onClick={() => !isDragging && setIsExpanded(!isExpanded)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          className="relative w-40 h-40 cursor-pointer transition-all duration-300 group touch-none"
          style={{
            animation: showCallToAction && !isDragging && !isPaused ? 'gentle-pulse 2s ease-in-out infinite' : 'none'
          }}
        >
          {/* Heart Mascot - Base layer */}
          <div className="absolute inset-0 z-10">
            <PixarHeartMascot 
              isActive={showCallToAction && !isPaused} 
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

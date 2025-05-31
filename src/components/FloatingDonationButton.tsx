
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X, HandHeart } from 'lucide-react';
import Custom3DCharacter from './Custom3DCharacter';

interface FallingCoin {
  id: number;
  startTime: number;
  delay: number;
}

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [fallingCoins, setFallingCoins] = useState<FallingCoin[]>([]);
  const [showCallToAction, setShowCallToAction] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const impactMessages = [
    "Make a difference today",
    "Your donation changes lives",
    "Help those in need",
    "Be part of the solution",
    "Transform lives with your gift",
    "Create lasting impact",
    "Support urgent causes",
    "Join our mission"
  ];

  const handleDonateClick = () => {
    setIsActive(true);
    
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
    
    setTimeout(() => setIsActive(false), 1000);
  };

  // Show impact messages every 45 seconds
  useEffect(() => {
    const messageInterval = setInterval(() => {
      const randomMessage = impactMessages[Math.floor(Math.random() * impactMessages.length)];
      setCurrentMessage(randomMessage);
      setShowCallToAction(true);
      setIsActive(true);
      
      setTimeout(() => setShowCallToAction(false), 5000);
      setTimeout(() => setIsActive(false), 1000);
    }, 45000);

    return () => clearInterval(messageInterval);
  }, []);

  // Generate falling coins periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        const newCoin: FallingCoin = {
          id: Date.now() + Math.random(),
          startTime: Date.now(),
          delay: Math.random() * 800
        };
        
        setFallingCoins(prev => [...prev, newCoin]);
        
        setTimeout(() => {
          setFallingCoins(prev => prev.filter(coin => coin.id !== newCoin.id));
        }, 3500 + newCoin.delay);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes professional-float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        @keyframes coin-drop {
          0% {
            transform: translateX(-50%) translateY(-10px) rotateZ(0deg);
            opacity: 1;
          }
          85% {
            transform: translateX(-50%) translateY(50px) rotateZ(360deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(55px) rotateZ(360deg);
            opacity: 0;
          }
        }
        
        @keyframes elegant-glow {
          0% {
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
          }
          50% {
            box-shadow: 0 8px 30px rgba(16, 185, 129, 0.4);
          }
          100% {
            box-shadow: 0 4px 20px rgba(16, 185, 129, 0.2);
          }
        }
        
        @keyframes message-appear {
          0% {
            opacity: 0;
            transform: translateY(8px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
      
      <div className="fixed bottom-8 right-8 z-50">
        {/* Call to action message */}
        {showCallToAction && (
          <div className="absolute -top-16 -left-32 z-60 animate-[message-appear_0.4s_ease-out]">
            <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl px-4 py-3">
              <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                {currentMessage}
              </p>
              {/* Message pointer */}
              <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="mb-6 bg-white/98 backdrop-blur-lg rounded-2xl p-6 w-80 shadow-2xl border border-gray-100 animate-[message-appear_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-5">
              <h4 className="font-semibold text-lg text-gray-900 flex items-center">
                <HandHeart className="h-5 w-5 mr-2 text-emerald-600" />
                Quick Donate
              </h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full justify-between bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-medium py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <span className="text-lg mr-3">🍲</span>
                  <span>Feed a Family</span>
                </div>
                <span className="font-semibold">£10</span>
              </Button>
              
              <Button className="w-full justify-between bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <span className="text-lg mr-3">💧</span>
                  <span>Clean Water Access</span>
                </div>
                <span className="font-semibold">£25</span>
              </Button>
              
              <Button className="w-full justify-between bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center">
                  <span className="text-lg mr-3">📚</span>
                  <span>Education Support</span>
                </div>
                <span className="font-semibold">£50</span>
              </Button>
            </div>
            
            <div className="mt-5 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 text-center border border-amber-100">
              <div className="flex items-center justify-center text-sm font-medium text-amber-800">
                <Zap className="h-4 w-4 mr-2" />
                2x Impact Points Active
              </div>
            </div>
          </div>
        )}

        <div
          onClick={handleDonateClick}
          className="relative w-20 h-24 cursor-pointer group"
        >
          {/* Falling coins animation */}
          {fallingCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute w-2.5 h-2.5 pointer-events-none"
              style={{
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                animationDelay: `${coin.delay}ms`,
                zIndex: 5
              }}
            >
              <div 
                className="w-full h-full rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 border border-yellow-300"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.2)',
                  animation: 'coin-drop 3s ease-in forwards'
                }}
              />
            </div>
          ))}

          {/* Custom 3D Charity Character */}
          <Custom3DCharacter 
            isActive={isActive}
            className="relative z-10 w-full h-full transition-all duration-300 group-hover:scale-110"
          />

          {/* Donation amount indicator */}
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg border-2 border-white">
            £5+
          </div>

          {/* Subtle glow effect on hover */}
          <div className={`absolute inset-0 rounded-lg transition-opacity duration-300 ${
            isActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'
          }`} style={{
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)',
            filter: 'blur(8px)'
          }}></div>
        </div>
      </div>
    </>
  );
};

export default FloatingDonationButton;

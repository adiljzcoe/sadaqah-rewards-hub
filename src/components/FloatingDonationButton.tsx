import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Zap, X } from 'lucide-react';

interface FallingCoin {
  id: number;
  startTime: number;
  delay: number;
}

const FloatingDonationButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isWiggling, setIsWiggling] = useState(false);
  const [fallingCoins, setFallingCoins] = useState<FallingCoin[]>([]);
  const [showSpeechBubble, setShowSpeechBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const prayerMessages = [
    "JazakAllahu Khair! 🤲",
    "May Allah bless you abundantly! ✨",
    "Barakallahu feeki! 💝",
    "Your kindness is a blessing! 🌟",
    "May this sadaqah bring you barakah! 💚",
    "Allah sees your generous heart! 👁️",
    "May Allah multiply your reward! 📈",
    "Your donation is a light in darkness! 💡",
    "SubhanAllah, such generosity! 🙏",
    "May Allah grant you Jannah! 🏞️"
  ];

  const handleTinClick = () => {
    setIsExpanded(!isExpanded);
    setIsWiggling(true);
    
    // Show speech bubble with random prayer message
    const randomMessage = prayerMessages[Math.floor(Math.random() * prayerMessages.length)];
    setCurrentMessage(randomMessage);
    setShowSpeechBubble(true);
    
    // Hide speech bubble after 3 seconds
    setTimeout(() => setShowSpeechBubble(false), 3000);
    setTimeout(() => setIsWiggling(false), 600);
  };

  // Generate falling coins periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Random chance to show a coin (about every 3-8 seconds)
      if (Math.random() < 0.3) {
        const newCoin: FallingCoin = {
          id: Date.now() + Math.random(),
          startTime: Date.now(),
          delay: Math.random() * 1000 // Random delay up to 1 second
        };
        
        setFallingCoins(prev => [...prev, newCoin]);
        
        // Remove coin after animation completes
        setTimeout(() => {
          setFallingCoins(prev => prev.filter(coin => coin.id !== newCoin.id));
        }, 3000 + newCoin.delay);
      }
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes fall-into-slot {
          0% {
            transform: translateX(-50%) translateY(0px) rotateZ(0deg);
            opacity: 1;
          }
          70% {
            transform: translateX(-50%) translateY(60px) rotateZ(720deg);
            opacity: 1;
          }
          100% {
            transform: translateX(-50%) translateY(65px) rotateZ(720deg);
            opacity: 0;
          }
        }
        
        @keyframes magical-background {
          0% {
            opacity: 0;
            transform: scale(0.8);
            background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.2) 0%, rgba(59, 130, 246, 0.15) 30%, rgba(16, 185, 129, 0.1) 60%, transparent 80%);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
            background: radial-gradient(circle at 50% 50%, rgba(236, 72, 153, 0.25) 0%, rgba(16, 185, 129, 0.2) 30%, rgba(251, 191, 36, 0.15) 60%, rgba(168, 85, 247, 0.1) 80%);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
            background: radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.3) 0%, rgba(236, 72, 153, 0.2) 30%, rgba(59, 130, 246, 0.15) 60%, transparent 80%);
          }
        }
        
        @keyframes speech-bubble-appear {
          0% {
            opacity: 0;
            transform: translateY(10px) scale(0.8);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes gentle-fade {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      
      <div className="fixed bottom-8 right-8 z-50">
        {/* Enhanced Magical Background Effect */}
        {isWiggling && (
          <div 
            className="absolute -inset-24 pointer-events-none rounded-full"
            style={{
              animation: 'magical-background 1.5s ease-out forwards'
            }}
          />
        )}

        {/* Speech Bubble */}
        {showSpeechBubble && (
          <div className="absolute -top-20 -left-32 z-60 animate-[speech-bubble-appear_0.3s_ease-out]">
            <div className="relative bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-0.5 rounded-2xl shadow-2xl">
              <div className="bg-white rounded-2xl px-4 py-3 relative">
                <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                  {currentMessage}
                </p>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[9px] border-r-[9px] border-t-[9px] border-transparent border-t-purple-400"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isExpanded && (
          <div className="mb-6 bg-white/95 backdrop-blur-lg rounded-2xl p-6 w-80 shadow-2xl border border-white/30 animate-[gentle-fade_0.3s_ease-out]">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg text-gray-900">Quick Donate ⚡</h4>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full justify-start bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="h-5 w-5 mr-3" />
                <span>£10 - Hot Meals 🍲</span>
              </Button>
              
              <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="h-5 w-5 mr-3" />
                <span>£25 - Water Wells 💧</span>
              </Button>
              
              <Button className="w-full justify-start bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="h-5 w-5 mr-3" />
                <span>£50 - Education 📚</span>
              </Button>
            </div>
            
            <div className="mt-4 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl p-4 text-center border border-amber-200">
              <div className="flex items-center justify-center text-sm font-bold text-amber-800">
                <Zap className="h-5 w-5 mr-2" />
                Double points active! 🔥
              </div>
            </div>
          </div>
        )}

        <div
          onClick={handleTinClick}
          className="relative w-20 h-20 cursor-pointer overflow-visible group"
        >
          {/* Falling coins animation */}
          {fallingCoins.map((coin) => (
            <div
              key={coin.id}
              className="absolute w-3 h-3 pointer-events-none"
              style={{
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                animationDelay: `${coin.delay}ms`,
                zIndex: 5
              }}
            >
              <div 
                className="w-full h-full rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 border border-yellow-200 shadow-sm"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.2)',
                  animation: 'fall-into-slot 2.5s ease-in forwards'
                }}
              />
            </div>
          ))}

          {/* Adorable charity collection tin with cat-like features */}
          <div className={`relative z-10 w-full h-full flex items-center justify-center transition-transform duration-300 ${
            isWiggling ? 'animate-charity-shake' : ''
          } group-hover:scale-110`}>
            {/* Enhanced soft shadow for depth */}
            <div className="absolute top-1 left-1 w-9 h-14 bg-gradient-to-br from-pink-300/50 to-purple-400/50 rounded-2xl transform rotate-1 blur-md"></div>
            
            {/* Main collection tin body - enhanced with better gradients */}
            <div className="relative w-9 h-14 bg-gradient-to-br from-pink-300 via-pink-400 to-rose-400 rounded-2xl border-2 border-pink-200 shadow-2xl transform transition-all duration-300">
              {/* Soft top lid - more rounded */}
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full border border-pink-300"></div>
              
              {/* Coin slot - smaller and cuter */}
              <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-5 h-0.5 bg-gray-800 rounded-full shadow-inner"></div>
              
              {/* Big adorable eyes - much larger and more expressive */}
              <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {/* Left eye */}
                <div className="relative w-2 h-2 bg-white rounded-full border border-pink-300 shadow-sm">
                  {/* Pupil */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
                    {/* Light reflection */}
                    <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
                  </div>
                  {/* Cute eyelash */}
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-600 rounded-full"></div>
                </div>
                
                {/* Right eye */}
                <div className="relative w-2 h-2 bg-white rounded-full border border-pink-300 shadow-sm">
                  {/* Pupil */}
                  <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
                    {/* Light reflection */}
                    <div className="absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full opacity-90"></div>
                  </div>
                  {/* Cute eyelash */}
                  <div className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-0.5 h-0.5 bg-pink-600 rounded-full"></div>
                </div>
              </div>
              
              {/* Tiny pink nose */}
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-0.5 bg-rose-600 rounded-full"></div>
              
              {/* Sweet smile - wider and more cheerful */}
              <div className="absolute top-4.5 left-1/2 transform -translate-x-1/2 w-4 h-1.5 border-b-2 border-white rounded-full opacity-90"></div>
              
              {/* Rosy cheeks for extra cuteness */}
              <div className="absolute top-3.5 left-0.5 w-1.5 h-1 bg-rose-300 rounded-full opacity-60"></div>
              <div className="absolute top-3.5 right-0.5 w-1.5 h-1 bg-rose-300 rounded-full opacity-60"></div>
              
              {/* Soft white belly area */}
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-white/80 rounded-lg border border-pink-200">
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 text-pink-600 text-[4px] font-bold">
                  DONATE
                </div>
                {/* Cute heart */}
                <div className="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 text-pink-500 text-[6px]">
                  💝
                </div>
              </div>
              
              {/* Thin handle area - softer and more proportional */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-7 h-2 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg border border-pink-400 shadow-inner"></div>
              
              {/* Soft bottom rim */}
              <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-9 h-1 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full"></div>
              
              {/* Soft highlight for 3D effect */}
              <div className="absolute top-0 left-1 w-1.5 h-12 bg-gradient-to-r from-white/50 to-transparent rounded-l-2xl"></div>
              
              {/* Cute ear-like decorations */}
              <div className="absolute -top-0.5 left-1 w-1 h-1 bg-pink-500 rounded-full border border-pink-300"></div>
              <div className="absolute -top-0.5 right-1 w-1 h-1 bg-pink-500 rounded-full border border-pink-300"></div>
              
              {/* Magical sparkles on hover */}
              <div className="absolute -top-2 -left-2 text-yellow-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs">
                ✨
              </div>
              <div className="absolute -top-1 -right-2 text-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs" style={{ animationDelay: '0.2s' }}>
                💫
              </div>
              <div className="absolute -bottom-1 -left-1 text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping text-xs" style={{ animationDelay: '0.4s' }}>
                ⭐
              </div>
            </div>
            
            {/* Cute handle strap - more organic */}
            <div className="absolute top-4 -right-2 w-3 h-5">
              <div className="w-0.5 h-5 bg-gradient-to-b from-pink-600 to-rose-700 rounded-full transform rotate-12"></div>
              <div className="absolute bottom-0 -right-1 w-2 h-1 bg-rose-700 rounded-full"></div>
            </div>
            
            {/* Adorable floating hearts and expressions when clicked */}
            {isWiggling && (
              <>
                <div className="absolute -top-4 left-0 text-pink-400 animate-bounce opacity-90 text-sm">
                  💕
                </div>
                <div className="absolute -top-3 right-0 text-rose-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.2s' }}>
                  🥰
                </div>
                <div className="absolute top-0 -right-4 text-yellow-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.4s' }}>
                  ✨
                </div>
                <div className="absolute -bottom-2 -left-3 text-purple-400 animate-bounce opacity-90 text-sm" style={{ animationDelay: '0.6s' }}>
                  💖
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingDonationButton;

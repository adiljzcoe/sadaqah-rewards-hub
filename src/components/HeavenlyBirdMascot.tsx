
import React, { useState, useEffect } from 'react';

interface HeavenlyBirdMascotProps {
  isActive?: boolean;
  className?: string;
}

const HeavenlyBirdMascot: React.FC<HeavenlyBirdMascotProps> = ({ 
  isActive = false, 
  className = "w-40 h-40" 
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  const messages = [
    "Support Gaza Relief! 🇵🇸",
    "Every donation counts! 💝",
    "Help families in need! 🏠",
    "Together we can help! 🤝",
    "Your kindness matters! ✨",
    "Make a difference today! 🌟",
    "Spread love and hope! ❤️",
    "Be someone's blessing! 🙏"
  ];

  useEffect(() => {
    if (isActive) {
      setShowMessage(true);
      
      // Rotate messages every 3 seconds
      const messageInterval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
      }, 3000);

      return () => clearInterval(messageInterval);
    } else {
      setShowMessage(false);
    }
  }, [isActive, messages.length]);

  return (
    <div className={`relative ${className}`}>
      {/* Message bubble */}
      {showMessage && (
        <div className="absolute -top-16 -left-20 z-50 animate-[message-appear_0.4s_ease-out]">
          <div className="relative bg-white border border-gray-200 rounded-xl shadow-xl px-4 py-3 max-w-48">
            <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
              {messages[currentMessageIndex]}
            </p>
            {/* Message pointer */}
            <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
          </div>
        </div>
      )}

      {/* Mascot Bird */}
      <div 
        className={`w-full h-full rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isActive ? 'animate-[gentle-pulse_2s_ease-in-out_infinite] scale-110' : 'hover:scale-105'
        }`}
      >
        {/* Inner bird design */}
        <div className="relative w-24 h-24 text-white">
          {/* Bird body */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl transform -rotate-12">
              🕊️
            </div>
          </div>
          
          {/* Wings animation when active */}
          {isActive && (
            <>
              <div className="absolute top-4 left-2 text-2xl animate-bounce">✨</div>
              <div className="absolute top-6 right-2 text-2xl animate-bounce animation-delay-300">✨</div>
              <div className="absolute bottom-4 left-4 text-xl animate-bounce animation-delay-600">💫</div>
            </>
          )}
        </div>
        
        {/* Halo effect when active */}
        {isActive && (
          <div className="absolute inset-0 rounded-full border-4 border-yellow-300/50 animate-ping"></div>
        )}
      </div>

      {/* Additional sparkles around the mascot when active */}
      {isActive && (
        <>
          <div className="absolute -top-2 -left-2 text-2xl animate-pulse">⭐</div>
          <div className="absolute -top-2 -right-2 text-2xl animate-pulse animation-delay-500">🌟</div>
          <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse animation-delay-1000">✨</div>
          <div className="absolute -bottom-2 -right-2 text-2xl animate-pulse animation-delay-1500">💫</div>
        </>
      )}
    </div>
  );
};

export default HeavenlyBirdMascot;

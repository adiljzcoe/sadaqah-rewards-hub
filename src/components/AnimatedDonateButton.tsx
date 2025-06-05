
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard, Check, Heart, Sparkles } from 'lucide-react';

interface AnimatedDonateButtonProps {
  amount: string;
  currency: string;
  isAdding: boolean;
  justAdded: boolean;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const AnimatedDonateButton: React.FC<AnimatedDonateButtonProps> = ({
  amount,
  currency,
  isAdding,
  justAdded,
  onClick,
  disabled = false,
  className = ""
}) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('AnimatedDonateButton: Click detected!', { disabled });
    
    if (!buttonRef.current || disabled) {
      console.log('AnimatedDonateButton: Click blocked - button ref or disabled');
      return;
    }

    // Get button position and click position
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log('AnimatedDonateButton: Creating ripple at', { x, y });

    // Create ripple effect
    const rippleId = Date.now();
    setRipples(prev => {
      const newRipples = [...prev, { id: rippleId, x, y }];
      console.log('AnimatedDonateButton: Updated ripples:', newRipples);
      return newRipples;
    });

    // Remove ripple after animation
    setTimeout(() => {
      console.log('AnimatedDonateButton: Removing ripple', rippleId);
      setRipples(prev => prev.filter(ripple => ripple.id !== rippleId));
    }, 1000);

    // Call the original onClick
    console.log('AnimatedDonateButton: Calling original onClick');
    onClick();
  };

  return (
    <>
      {/* Enhanced CSS animation styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatUpHeart {
            0% {
              opacity: 1;
              transform: translateY(0) scale(1) rotate(0deg);
            }
            50% {
              opacity: 1;
              transform: translateY(-30px) scale(1.2) rotate(180deg);
            }
            100% {
              opacity: 0;
              transform: translateY(-60px) scale(0.8) rotate(360deg);
            }
          }
          .float-up-heart {
            animation: floatUpHeart 2s ease-out forwards;
          }
          
          @keyframes rippleEffect {
            0% {
              transform: scale(0);
              opacity: 1;
            }
            100% {
              transform: scale(4);
              opacity: 0;
            }
          }
          .ripple-animation {
            animation: rippleEffect 1s linear;
          }
        `
      }} />
      
      <Button 
        ref={buttonRef}
        type="button"
        className={`w-full transition-all duration-300 relative overflow-hidden ${
          justAdded 
            ? 'bg-green-600 hover:bg-green-700 scale-105 shadow-lg shadow-green-200' 
            : isAdding 
              ? 'bg-blue-500 hover:bg-blue-600' 
              : 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 hover:scale-[1.02] shadow-lg hover:shadow-xl'
        } ${className}`}
        size="lg"
        disabled={disabled}
        onClick={handleClick}
      >
        {/* Enhanced Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full bg-white/40 ripple-animation"
            style={{
              left: ripple.x - 10,
              top: ripple.y - 10,
              width: 20,
              height: 20,
              transformOrigin: 'center',
            }}
          />
        ))}
        
        {/* Floating hearts animation on click */}
        {ripples.map((ripple) => (
          <div
            key={`heart-${ripple.id}`}
            className="absolute pointer-events-none float-up-heart"
            style={{
              left: ripple.x - 8,
              top: ripple.y - 8,
            }}
          >
            <Heart className="h-4 w-4 text-pink-300 fill-pink-300" />
          </div>
        ))}

        {/* Sparkle effects for success state */}
        {justAdded && (
          <>
            <Sparkles className="absolute top-2 left-4 h-4 w-4 text-white animate-pulse" />
            <Sparkles className="absolute bottom-2 right-4 h-4 w-4 text-white animate-pulse delay-300" />
            <Sparkles className="absolute top-2 right-8 h-3 w-3 text-white animate-pulse delay-500" />
          </>
        )}

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center">
          {isAdding ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding to Cart...
            </>
          ) : justAdded ? (
            <>
              <Check className="h-4 w-4 mr-2 animate-bounce" />
              Added to Cart!
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
              Donate {currency}{amount}
            </>
          )}
        </div>

        {/* Background shine effect */}
        {!disabled && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
        )}
      </Button>
    </>
  );
};

export default AnimatedDonateButton;

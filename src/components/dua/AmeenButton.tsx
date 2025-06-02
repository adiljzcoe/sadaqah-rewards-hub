
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AmeenButtonProps {
  duaId: string;
  initialAmeenCount: number;
  hasUserSaidAmeen: boolean;
  onAmeenUpdate: (newCount: number, userHasAmeen: boolean) => void;
}

const AmeenButton: React.FC<AmeenButtonProps> = ({
  duaId,
  initialAmeenCount,
  hasUserSaidAmeen,
  onAmeenUpdate
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatingHearts, setShowFloatingHearts] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create "Ameen" audio using Web Speech API
  const playAmeenSound = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Ameen');
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.volume = 0.7;
      
      // Try to use Arabic voice if available
      const voices = speechSynthesis.getVoices();
      const arabicVoice = voices.find(voice => 
        voice.lang.includes('ar') || voice.name.toLowerCase().includes('arabic')
      );
      
      if (arabicVoice) {
        utterance.voice = arabicVoice;
      }
      
      speechSynthesis.speak(utterance);
    }
  };

  const createFloatingHearts = () => {
    setShowFloatingHearts(true);
    
    // Create multiple heart elements
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        if (buttonRef.current) {
          const heart = document.createElement('div');
          heart.innerHTML = '🤲';
          heart.style.position = 'fixed';
          heart.style.fontSize = '24px';
          heart.style.pointerEvents = 'none';
          heart.style.zIndex = '9999';
          
          const rect = buttonRef.current.getBoundingClientRect();
          heart.style.left = `${rect.left + Math.random() * rect.width}px`;
          heart.style.top = `${rect.top}px`;
          
          heart.style.animation = `floatUp 2s ease-out forwards`;
          
          document.body.appendChild(heart);
          
          setTimeout(() => {
            document.body.removeChild(heart);
          }, 2000);
        }
      }, i * 100);
    }
    
    setTimeout(() => setShowFloatingHearts(false), 1000);
  };

  const handleAmeen = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (hasUserSaidAmeen) {
        // Remove ameen
        const { error } = await supabase
          .from('dua_ameens')
          .delete()
          .eq('dua_id', duaId)
          .eq('user_id', user?.id || null);

        if (error) throw error;
        
        onAmeenUpdate(initialAmeenCount - 1, false);
        
        toast({
          title: "Ameen Removed",
          description: "Your ameen has been removed.",
        });
      } else {
        // Add ameen
        const insertData: any = {
          dua_id: duaId,
        };
        
        if (user) {
          insertData.user_id = user.id;
        } else {
          // For anonymous users, use IP address (simplified for demo)
          insertData.ip_address = '127.0.0.1'; // In production, get real IP
        }
        
        const { error } = await supabase
          .from('dua_ameens')
          .insert(insertData);

        if (error) throw error;
        
        onAmeenUpdate(initialAmeenCount + 1, true);
        
        // Play sound and show visual effects
        playAmeenSound();
        createFloatingHearts();
        
        toast({
          title: "Ameen! 🤲",
          description: "Your ameen has been added to this du'a.",
        });
      }
    } catch (error) {
      console.error('Error handling ameen:', error);
      toast({
        title: "Error",
        description: "Could not process your ameen. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add CSS for floating animation
    if (!document.getElementById('floating-hearts-style')) {
      const style = document.createElement('style');
      style.id = 'floating-hearts-style';
      style.textContent = `
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateY(-30px) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.8);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <Button
      ref={buttonRef}
      onClick={handleAmeen}
      disabled={isLoading}
      variant={hasUserSaidAmeen ? "default" : "outline"}
      className={`
        relative transition-all duration-300 transform hover:scale-105
        ${hasUserSaidAmeen 
          ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg' 
          : 'border-green-200 text-green-700 hover:bg-green-50'
        }
        ${showFloatingHearts ? 'scale-110' : ''}
      `}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <span className="text-lg mr-2">🤲</span>
      )}
      <span className="font-medium">
        {hasUserSaidAmeen ? 'Ameen Said' : 'Say Ameen'}
      </span>
      <span className="ml-2 bg-white/20 px-2 py-1 rounded-full text-xs">
        {initialAmeenCount}
      </span>
    </Button>
  );
};

export default AmeenButton;

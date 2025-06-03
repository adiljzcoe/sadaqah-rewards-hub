
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Sparkles } from 'lucide-react';

interface CelebrationToggleProps {
  isActive: boolean;
  isPaused: boolean;
  onToggle: () => void;
  onPause: () => void;
}

const CelebrationToggle = ({ isActive, isPaused, onToggle, onPause }: CelebrationToggleProps) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-3">
      {/* Toggle Celebration Button */}
      <Button
        onClick={onToggle}
        size="lg"
        className={`
          ${isActive 
            ? 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
          }
          text-white font-bold px-6 py-3 shadow-xl 
          hover:shadow-2xl transform hover:scale-105 transition-all duration-300
          border-2 border-white/30 rounded-xl backdrop-blur-sm
        `}
      >
        <Sparkles className="h-5 w-5 mr-2" />
        {isActive ? 'Stop Celebration' : 'Start Celebration'}
        <Sparkles className="h-5 w-5 ml-2" />
      </Button>

      {/* Pause/Resume Button - only shown when celebration is active */}
      {isActive && (
        <Button
          onClick={onPause}
          size="lg"
          variant="outline"
          className="
            bg-white/90 hover:bg-white text-gray-800 font-bold px-6 py-3 shadow-xl 
            hover:shadow-2xl transform hover:scale-105 transition-all duration-300
            border-2 border-gray-300 rounded-xl backdrop-blur-sm
          "
        >
          {isPaused ? (
            <>
              <Play className="h-5 w-5 mr-2" />
              Resume
            </>
          ) : (
            <>
              <Pause className="h-5 w-5 mr-2" />
              Pause
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default CelebrationToggle;

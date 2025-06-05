
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Loader2, CheckCircle } from 'lucide-react';

interface AnimatedDonateButtonProps {
  amount: string;
  currency: string;
  isAdding: boolean;
  justAdded: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const AnimatedDonateButton = ({
  amount,
  currency,
  isAdding,
  justAdded,
  onClick,
  disabled = false
}: AnimatedDonateButtonProps) => {
  if (justAdded) {
    return (
      <Button 
        className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300"
        disabled
      >
        <CheckCircle className="h-4 w-4 mr-2" />
        Added to Cart!
      </Button>
    );
  }

  if (isAdding) {
    return (
      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300"
        disabled
      >
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        Adding...
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <Heart className="h-4 w-4 mr-2" />
      Donate {currency}{amount}
    </Button>
  );
};

export default AnimatedDonateButton;


import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';
import RamadanDayModal from './RamadanDayModal';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface RamadanDayCardProps {
  day: any;
  isCompleted: boolean;
}

const RamadanDayCard = ({ day, isCompleted }: RamadanDayCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get the icon component dynamically
  const IconComponent = (LucideIcons as any)[day.icon_name] || LucideIcons.Star;

  const handleComplete = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to participate in the Ramadan calendar.",
        variant: "destructive"
      });
      return;
    }

    // Check if user has enough Sadaqah coins
    const { data: profile } = await supabase
      .from('profiles')
      .select('sadaqah_coins')
      .eq('id', user.id)
      .single();

    if (!profile || profile.sadaqah_coins < day.sadaqah_coin_cost) {
      toast({
        title: "Insufficient coins",
        description: `You need ${day.sadaqah_coin_cost} Sadaqah coins to complete this day.`,
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Record the completion
      const { error: progressError } = await supabase
        .from('ramadan_calendar_progress')
        .insert({
          user_id: user.id,
          calendar_day_id: day.id,
          sadaqah_coins_spent: day.sadaqah_coin_cost,
          bonus_points_earned: day.bonus_points
        });

      if (progressError) throw progressError;

      // Update user profile - deduct coins and add points
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          sadaqah_coins: profile.sadaqah_coins - day.sadaqah_coin_cost,
          jannah_points: (profile.jannah_points || 0) + day.bonus_points
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast({
        title: "Day completed! 🎉",
        description: `You earned ${day.bonus_points} Jannah points! ${day.special_reward}`,
      });

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['ramadan-progress'] });
      queryClient.invalidateQueries({ queryKey: ['ramadan-stats'] });
      setShowModal(true);
    } catch (error) {
      console.error('Error completing day:', error);
      toast({
        title: "Error",
        description: "Failed to complete the day. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const today = new Date();
  const ramadanStart = new Date('2024-03-11'); // This should be dynamic based on settings
  const daysDifference = Math.floor((today.getTime() - ramadanStart.getTime()) / (1000 * 60 * 60 * 24));
  const isUnlocked = day.day_number <= daysDifference + 1;

  return (
    <>
      <Card className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 cursor-pointer",
        day.background_color,
        isCompleted && "ring-2 ring-yellow-400 ring-offset-2",
        !isUnlocked && "opacity-50 grayscale"
      )}>
        <CardContent className="p-4 text-white relative">
          {isCompleted && (
            <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
              ✓ Complete
            </Badge>
          )}
          
          <div className="text-center space-y-3">
            <div className="text-2xl font-bold">
              Day {day.day_number}
            </div>
            
            <div className="flex justify-center">
              <IconComponent className="h-8 w-8" />
            </div>
            
            <div className="text-sm font-medium">
              {day.title}
            </div>
            
            <div className="text-xs opacity-90">
              {day.sadaqah_coin_cost} coins
            </div>
            
            {!isCompleted && isUnlocked && (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleComplete}
                disabled={isProcessing}
                className="w-full text-xs"
              >
                {isProcessing ? 'Processing...' : 'Complete Day'}
              </Button>
            )}

            {isCompleted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModal(true)}
                className="w-full text-xs bg-white/20 border-white/30 text-white hover:bg-white/30"
              >
                View Details
              </Button>
            )}

            {!isUnlocked && (
              <div className="text-xs opacity-70">
                Unlocks soon...
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <RamadanDayModal
        day={day}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isCompleted={isCompleted}
      />
    </>
  );
};

export default RamadanDayCard;

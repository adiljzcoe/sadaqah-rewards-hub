
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useVerseProgress = (surahId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [autoMarkingVerse, setAutoMarkingVerse] = useState<string | null>(null);

  const { data: completedVerses } = useQuery({
    queryKey: ['user-verse-progress', surahId],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_verse_progress')
        .select('verse_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data.map(item => item.verse_id);
    },
    enabled: !!user
  });

  const markVerseAsRead = async (verseId: string, jannahPoints: number) => {
    if (!user || completedVerses?.includes(verseId)) return;

    setAutoMarkingVerse(verseId);

    try {
      // Record verse completion
      const { error: progressError } = await supabase
        .from('user_verse_progress')
        .insert({
          user_id: user.id,
          verse_id: verseId,
          jannah_points_earned: jannahPoints
        });

      if (progressError) throw progressError;

      // Update user's Jannah points
      const { data: profile } = await supabase
        .from('profiles')
        .select('jannah_points')
        .eq('id', user.id)
        .single();

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          jannah_points: (profile?.jannah_points || 0) + jannahPoints
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['user-verse-progress'] });
    } catch (error) {
      console.error('Error marking verse as read:', error);
    } finally {
      setAutoMarkingVerse(null);
    }
  };

  const markSurahAsComplete = async (verses: any[]) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to mark surah as complete.",
        variant: "destructive"
      });
      return;
    }

    const uncompletedVerses = verses.filter(v => !completedVerses?.includes(v.id));
    
    if (uncompletedVerses.length === 0) {
      toast({
        title: "Surah already completed!",
        description: "You have already completed all verses in this surah.",
      });
      return;
    }

    try {
      // Mark all remaining verses as completed
      const progressInserts = uncompletedVerses.map(verse => ({
        user_id: user.id,
        verse_id: verse.id,
        jannah_points_earned: verse.jannah_points_reward
      }));

      const { error: progressError } = await supabase
        .from('user_verse_progress')
        .insert(progressInserts);

      if (progressError) throw progressError;

      // Calculate total points earned
      const totalPoints = uncompletedVerses.reduce((sum, v) => sum + v.jannah_points_reward, 0);

      // Update user's Jannah points
      const { data: profile } = await supabase
        .from('profiles')
        .select('jannah_points')
        .eq('id', user.id)
        .single();

      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          jannah_points: (profile?.jannah_points || 0) + totalPoints
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast({
        title: "Surah completed! 🎉",
        description: `You earned ${totalPoints} Jannah points for completing this surah! May Allah reward you.`,
      });

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['user-verse-progress'] });
    } catch (error) {
      console.error('Error completing surah:', error);
      toast({
        title: "Error",
        description: "Failed to complete surah. Please try again.",
        variant: "destructive"
      });
    }
  };

  return {
    completedVerses: completedVerses || [],
    markVerseAsRead,
    markSurahAsComplete,
    autoMarkingVerse
  };
};

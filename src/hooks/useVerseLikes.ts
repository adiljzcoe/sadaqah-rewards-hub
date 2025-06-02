
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

export const useVerseLikes = (verseId: string) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLiking, setIsLiking] = useState(false);

  // Check if user has liked this verse
  const { data: userLike } = useQuery({
    queryKey: ['user-verse-like', verseId],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('verse_likes')
        .select('id')
        .eq('user_id', user.id)
        .eq('verse_id', verseId)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  const handleToggleLike = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to like verses.",
        variant: "destructive"
      });
      return;
    }

    setIsLiking(true);

    try {
      if (userLike) {
        // Unlike the verse
        const { error } = await supabase
          .from('verse_likes')
          .delete()
          .eq('id', userLike.id);

        if (error) throw error;

        toast({
          title: "Verse unliked",
          description: "You have removed your like from this verse.",
        });
      } else {
        // Like the verse
        const { error } = await supabase
          .from('verse_likes')
          .insert({
            user_id: user.id,
            verse_id: verseId
          });

        if (error) throw error;

        toast({
          title: "Verse liked! ❤️",
          description: "You have liked this beautiful verse.",
        });
      }

      // Refresh the user like status
      queryClient.invalidateQueries({ queryKey: ['user-verse-like', verseId] });
    } catch (error) {
      console.error('Error toggling verse like:', error);
      toast({
        title: "Error",
        description: "Failed to update like. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLiking(false);
    }
  };

  return {
    isLiked: !!userLike,
    isLiking,
    handleToggleLike
  };
};


import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Check, Star, Volume2 } from 'lucide-react';

interface Verse {
  id: string;
  verse_number: number;
  text_arabic: string;
  text_transliteration: string;
  text_translation: string;
  jannah_points_reward: number;
}

interface Surah {
  id: string;
  surah_number: number;
  name_arabic: string;
  name_english: string;
  name_transliteration: string;
  revelation_place: string;
  total_verses: number;
}

interface SurahReaderProps {
  surah: Surah;
  onBack: () => void;
}

const SurahReader = ({ surah, onBack }: SurahReaderProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [completingVerse, setCompletingVerse] = useState<string | null>(null);

  const { data: verses, isLoading } = useQuery({
    queryKey: ['quran-verses', surah.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quran_verses')
        .select('*')
        .eq('surah_id', surah.id)
        .order('verse_number');
      
      if (error) throw error;
      return data as Verse[];
    }
  });

  const { data: completedVerses } = useQuery({
    queryKey: ['user-verse-progress', surah.id],
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

  const handleCompleteVerse = async (verse: Verse) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to track your progress and earn Jannah points.",
        variant: "destructive"
      });
      return;
    }

    if (completedVerses?.includes(verse.id)) {
      toast({
        title: "Already completed",
        description: "You have already completed this verse!",
        variant: "destructive"
      });
      return;
    }

    setCompletingVerse(verse.id);

    try {
      // Record verse completion
      const { error: progressError } = await supabase
        .from('user_verse_progress')
        .insert({
          user_id: user.id,
          verse_id: verse.id,
          jannah_points_earned: verse.jannah_points_reward
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
          jannah_points: (profile?.jannah_points || 0) + verse.jannah_points_reward
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast({
        title: "Verse completed! 🎉",
        description: `You earned ${verse.jannah_points_reward} Jannah points! May Allah reward you.`,
      });

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['user-verse-progress'] });
    } catch (error) {
      console.error('Error completing verse:', error);
      toast({
        title: "Error",
        description: "Failed to complete verse. Please try again.",
        variant: "destructive"
      });
    } finally {
      setCompletingVerse(null);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="animate-pulse space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Surah Header */}
      <Card className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Surahs
            </Button>
            <Badge variant="secondary" className="bg-white/20 text-white">
              {surah.revelation_place}
            </Badge>
          </div>
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold" dir="rtl">
              {surah.name_arabic}
            </div>
            <div className="text-xl">
              {surah.name_transliteration} - {surah.name_english}
            </div>
            <div className="text-emerald-200">
              Surah {surah.surah_number} • {surah.total_verses} verses
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Verses */}
      <div className="space-y-6">
        {verses?.map((verse) => {
          const isCompleted = completedVerses?.includes(verse.id);
          return (
            <Card key={verse.id} className={`transition-all duration-200 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge variant="outline" className="text-sm">
                    Verse {verse.verse_number}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      +{verse.jannah_points_reward} points
                    </Badge>
                    {isCompleted && (
                      <Badge className="bg-green-500 text-xs">
                        <Check className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Arabic Text */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg text-right" dir="rtl">
                  <div className="text-2xl font-bold text-gray-800 leading-relaxed arabic-font">
                    {verse.text_arabic}
                  </div>
                </div>

                {/* Transliteration */}
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium mb-1">Transliteration:</div>
                  <div className="text-lg text-blue-800 italic">
                    {verse.text_transliteration}
                  </div>
                </div>

                {/* Translation */}
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                  <div className="text-sm text-emerald-600 font-medium mb-1">Translation:</div>
                  <div className="text-lg text-emerald-800">
                    {verse.text_translation}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="outline" size="sm">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Listen
                  </Button>
                  
                  {user && !isCompleted && (
                    <Button
                      onClick={() => handleCompleteVerse(verse)}
                      disabled={completingVerse === verse.id}
                      className="bg-emerald-600 hover:bg-emerald-700"
                    >
                      {completingVerse === verse.id ? 'Completing...' : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Mark Complete
                        </>
                      )}
                    </Button>
                  )}

                  {!user && (
                    <Button variant="outline" size="sm" disabled>
                      Sign in to track progress
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SurahReader;

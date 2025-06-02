import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useVerseProgress } from '@/hooks/useVerseProgress';
import { ArrowLeft, CheckCircle, Trophy } from 'lucide-react';
import VerseCard from './VerseCard';

interface Verse {
  id: string;
  verse_number: number;
  text_arabic: string;
  text_transliteration: string;
  text_translation: string;
  jannah_points_reward: number;
  likes_count: number;
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
  const [completingVerse, setCompletingVerse] = useState<string | null>(null);
  const { 
    completedVerses, 
    markVerseAsRead, 
    markSurahAsComplete, 
    autoMarkingVerse 
  } = useVerseProgress(surah.id);

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

  const handleCompleteVerse = async (verse: Verse) => {
    if (!user || completedVerses.includes(verse.id)) return;

    setCompletingVerse(verse.id);
    await markVerseAsRead(verse.id, verse.jannah_points_reward);
    setCompletingVerse(null);
  };

  const completedCount = verses?.filter(v => completedVerses.includes(v.id)).length || 0;
  const totalVerses = verses?.length || 0;
  const isFullyCompleted = completedCount === totalVerses && totalVerses > 0;

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
            {user && (
              <div className="text-emerald-100">
                Progress: {completedCount}/{totalVerses} verses completed
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Progress Indicator */}
      {user && totalVerses > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Reading Progress</span>
              <span className="text-sm text-gray-600">
                {Math.round((completedCount / totalVerses) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / totalVerses) * 100}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verses */}
      <div className="space-y-6">
        {verses?.map((verse) => {
          const isCompleted = completedVerses.includes(verse.id);
          return (
            <VerseCard
              key={verse.id}
              verse={verse}
              isCompleted={isCompleted}
              completingVerse={completingVerse}
              onCompleteVerse={handleCompleteVerse}
              onMarkAsRead={markVerseAsRead}
              user={user}
              autoMarkingVerse={autoMarkingVerse}
            />
          );
        })}
      </div>

      {/* Surah Completion Button */}
      {user && verses && verses.length > 0 && (
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-6 text-center">
            {isFullyCompleted ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-amber-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-amber-800 mb-2">
                    Surah Completed! 🎉
                  </h3>
                  <p className="text-amber-700">
                    Congratulations! You have completed all verses in this surah.
                    May Allah reward you for your dedication.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Complete This Surah
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Mark all remaining verses as read and earn bonus Jannah points
                  </p>
                  <Button
                    onClick={() => markSurahAsComplete(verses)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg"
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Complete Surah ({totalVerses - completedCount} verses remaining)
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SurahReader;

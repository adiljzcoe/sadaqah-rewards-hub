
import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useVerseLikes } from '@/hooks/useVerseLikes';
import { Check, Volume2, Heart } from 'lucide-react';

interface Verse {
  id: string;
  verse_number: number;
  text_arabic: string;
  text_transliteration: string;
  text_translation: string;
  jannah_points_reward: number;
  likes_count: number;
}

interface VerseCardProps {
  verse: Verse;
  isCompleted: boolean;
  completingVerse: string | null;
  onCompleteVerse: (verse: Verse) => void;
  onMarkAsRead: (verseId: string, points: number) => void;
  user: any;
  autoMarkingVerse: string | null;
}

const VerseCard = ({ 
  verse, 
  isCompleted, 
  completingVerse, 
  onCompleteVerse, 
  onMarkAsRead,
  user,
  autoMarkingVerse
}: VerseCardProps) => {
  const { isLiked, isLiking, handleToggleLike } = useVerseLikes(verse.id);
  const verseRef = useRef<HTMLDivElement>(null);

  console.log('VerseCard render:', {
    verseId: verse.id,
    verseNumber: verse.verse_number,
    isCompleted,
    user: !!user,
    autoMarkingVerse
  });

  useEffect(() => {
    if (!user || isCompleted) {
      console.log('Skipping intersection observer - no user or already completed');
      return;
    }

    console.log('Setting up intersection observer for verse:', verse.verse_number);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection observer triggered:', {
            verseNumber: verse.verse_number,
            isIntersecting: entry.isIntersecting,
            intersectionRatio: entry.intersectionRatio,
            isCompleted
          });
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
            console.log('Verse is 80% visible, starting auto-mark timer');
            // Mark as read when 80% of the verse is visible
            const timer = setTimeout(() => {
              if (!isCompleted) {
                console.log('Auto-marking verse as read:', verse.verse_number);
                onMarkAsRead(verse.id, verse.jannah_points_reward);
              }
            }, 2000); // Wait 2 seconds before auto-marking

            // Clean up timer if component unmounts or conditions change
            return () => clearTimeout(timer);
          }
        });
      },
      { threshold: 0.8 }
    );

    if (verseRef.current) {
      observer.observe(verseRef.current);
      console.log('Observer attached to verse:', verse.verse_number);
    }

    return () => {
      if (verseRef.current) {
        observer.unobserve(verseRef.current);
      }
      observer.disconnect();
    };
  }, [verse.id, isCompleted, user, onMarkAsRead, verse.jannah_points_reward, verse.verse_number]);

  return (
    <Card 
      ref={verseRef}
      className={`transition-all duration-200 ${isCompleted ? 'bg-green-50 border-green-200' : 'hover:shadow-md'} ${
        autoMarkingVerse === verse.id ? 'ring-2 ring-green-300' : ''
      }`}
    >
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
                Read
              </Badge>
            )}
            {autoMarkingVerse === verse.id && (
              <Badge variant="outline" className="text-xs animate-pulse">
                Reading...
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
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleLike}
              disabled={isLiking}
              className={`${isLiked ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
            >
              <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              {verse.likes_count || 0}
            </Button>
          </div>
          
          {user && !isCompleted && (
            <Button
              onClick={() => onCompleteVerse(verse)}
              disabled={completingVerse === verse.id}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              {completingVerse === verse.id ? 'Marking...' : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Mark as Read
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
};

export default VerseCard;

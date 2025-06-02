
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Star, BookOpen, Award, TrendingUp } from 'lucide-react';

const QuranProgress = () => {
  const { user } = useAuth();

  const { data: progressStats, isLoading } = useQuery({
    queryKey: ['quran-progress-stats'],
    queryFn: async () => {
      if (!user) return null;

      // Get total verses completed by user
      const { data: completedVerses, error: completedError } = await supabase
        .from('user_verse_progress')
        .select('jannah_points_earned')
        .eq('user_id', user.id);

      if (completedError) throw completedError;

      // Get total verses in database
      const { data: totalVersesData, error: totalError } = await supabase
        .from('quran_verses')
        .select('id', { count: 'exact' });

      if (totalError) throw totalError;

      // Get surah progress
      const { data: surahProgress, error: surahError } = await supabase
        .from('user_verse_progress')
        .select(`
          verse_id,
          quran_verses!inner(surah_id, quran_surahs!inner(name_english, name_transliteration, total_verses))
        `)
        .eq('user_id', user.id);

      if (surahError) throw surahError;

      const totalVerses = totalVersesData?.length || 0;
      const completedCount = completedVerses?.length || 0;
      const totalPoints = completedVerses?.reduce((sum, v) => sum + (v.jannah_points_earned || 0), 0) || 0;
      
      // Calculate surah completion rates
      const surahStats = {};
      surahProgress?.forEach(item => {
        const surah = item.quran_verses.quran_surahs;
        const surahKey = surah.name_english;
        if (!surahStats[surahKey]) {
          surahStats[surahKey] = {
            name: surah.name_english,
            transliteration: surah.name_transliteration,
            totalVerses: surah.total_verses,
            completedVerses: 0
          };
        }
        surahStats[surahKey].completedVerses++;
      });

      return {
        totalVerses,
        completedCount,
        totalPoints,
        completionPercentage: totalVerses > 0 ? (completedCount / totalVerses) * 100 : 0,
        surahProgress: Object.values(surahStats)
      };
    },
    enabled: !!user
  });

  if (!user) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Sign in to Track Progress</h3>
          <p className="text-gray-500">Create an account to track your Quran reading progress and earn Jannah points</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-600 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100">Verses Completed</p>
                <p className="text-3xl font-bold">{progressStats?.completedCount || 0}</p>
                <p className="text-sm text-emerald-200">of {progressStats?.totalVerses || 0} total</p>
              </div>
              <BookOpen className="h-8 w-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Completion Rate</p>
                <p className="text-3xl font-bold">{Math.round(progressStats?.completionPercentage || 0)}%</p>
                <p className="text-sm text-blue-200">overall progress</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Jannah Points</p>
                <p className="text-3xl font-bold">{progressStats?.totalPoints || 0}</p>
                <p className="text-sm text-purple-200">earned from reading</p>
              </div>
              <Star className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Surahs Started</p>
                <p className="text-3xl font-bold">{progressStats?.surahProgress?.length || 0}</p>
                <p className="text-sm text-orange-200">chapters begun</p>
              </div>
              <Award className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress Bar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Overall Quran Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress: {progressStats?.completedCount || 0} / {progressStats?.totalVerses || 0} verses</span>
              <span>{Math.round(progressStats?.completionPercentage || 0)}%</span>
            </div>
            <Progress value={progressStats?.completionPercentage || 0} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Surah Progress */}
      {progressStats?.surahProgress && progressStats.surahProgress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Surah Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {progressStats.surahProgress.map((surah: any, index: number) => {
                const completionRate = (surah.completedVerses / surah.totalVerses) * 100;
                return (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{surah.transliteration}</h4>
                        <p className="text-sm text-gray-600">{surah.name}</p>
                      </div>
                      <Badge variant={completionRate === 100 ? "default" : "secondary"}>
                        {Math.round(completionRate)}%
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{surah.completedVerses} / {surah.totalVerses} verses</span>
                      </div>
                      <Progress value={completionRate} className="h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {progressStats?.completedCount === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Start Your Quran Journey</h3>
            <p className="text-gray-500 mb-4">
              Begin reading verses to track your progress and earn Jannah points.
            </p>
            <p className="text-sm text-emerald-600">
              Start with Al-Fatiha or any surah of your choice from the Surahs tab.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuranProgress;

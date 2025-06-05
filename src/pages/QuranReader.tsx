
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Star, Trophy, List, Globe } from 'lucide-react';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import SurahList from '@/components/quran/SurahList';
import SurahReader from '@/components/quran/SurahReader';
import QuranProgress from '@/components/quran/QuranProgress';
import KhatmsLeaderboard from '@/components/quran/KhatmsLeaderboard';

const QuranReader = () => {
  const { user } = useAuth();
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [activeTab, setActiveTab] = useState('surahs');

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-green-50/20">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Book className="h-10 w-10 text-emerald-600" />
            Quran Reader
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Read the Holy Quran with transliteration and translation. Complete verses to earn Jannah points
            and track your spiritual journey through the divine words.
          </p>
        </div>

        {!user && (
          <Card className="mb-8 bg-yellow-50 border-yellow-200">
            <CardContent className="p-6 text-center">
              <p className="text-yellow-800 mb-4">
                Sign in to track your progress and earn Jannah points for reading verses!
              </p>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="surahs" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Surahs
            </TabsTrigger>
            <TabsTrigger value="reader" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Reader
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="khatms" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Khatms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="surahs">
            <SurahList onSurahSelect={(surah) => {
              setSelectedSurah(surah);
              setActiveTab('reader');
            }} />
          </TabsContent>

          <TabsContent value="reader">
            {selectedSurah ? (
              <SurahReader surah={selectedSurah} onBack={() => setActiveTab('surahs')} />
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Select a Surah to Begin</h3>
                  <p className="text-gray-500">Choose a surah from the Surahs tab to start reading</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="progress">
            <QuranProgress />
          </TabsContent>

          <TabsContent value="khatms">
            <KhatmsLeaderboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuranReader;

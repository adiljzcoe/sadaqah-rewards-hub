
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Surah {
  id: string;
  surah_number: number;
  name_arabic: string;
  name_english: string;
  name_transliteration: string;
  revelation_place: string;
  total_verses: number;
}

interface SurahListProps {
  onSurahSelect: (surah: Surah) => void;
}

const SurahList = ({ onSurahSelect }: SurahListProps) => {
  const { data: surahs, isLoading } = useQuery({
    queryKey: ['quran-surahs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quran_surahs')
        .select('*')
        .order('surah_number');
      
      if (error) throw error;
      return data as Surah[];
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs?.map((surah) => (
        <Card 
          key={surah.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-emerald-300"
          onClick={() => onSurahSelect(surah)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-2xl font-bold text-emerald-600">
                {surah.surah_number}
              </div>
              <Badge variant={surah.revelation_place === 'Makkah' ? 'default' : 'secondary'}>
                <MapPin className="h-3 w-3 mr-1" />
                {surah.revelation_place}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-xl font-bold text-gray-900 text-right" dir="rtl">
                {surah.name_arabic}
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {surah.name_transliteration}
              </div>
              <div className="text-sm text-gray-600">
                {surah.name_english}
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Book className="h-4 w-4" />
                {surah.total_verses} verses
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                Click to read →
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SurahList;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Users, Trophy } from 'lucide-react';

const DhikrTab = () => {
  const [selectedDhikr, setSelectedDhikr] = useState('');
  const [count, setCount] = useState(0);

  // Mock dhikr data - in real app, this would come from API
  const dhikrOptions = [
    { id: 'subhanallah', text: 'سُبْحَانَ ٱللَّٰهِ', translation: 'SubhanAllah', points: 1 },
    { id: 'alhamdulillah', text: 'ٱلْحَمْدُ لِلَّٰهِ', translation: 'Alhamdulillah', points: 1 },
    { id: 'allahuakbar', text: 'ٱللَّٰهُ أَكْبَرُ', translation: 'Allahu Akbar', points: 1 },
    { id: 'laahawla', text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ', translation: 'La hawla wa la quwwata illa billah', points: 2 }
  ];

  const globalStats = {
    totalCount: 2847293,
    todayCount: 12847,
    myRank: 142
  };

  const handleDhikrClick = () => {
    if (selectedDhikr) {
      setCount(prev => prev + 1);
      console.log('Recording dhikr:', selectedDhikr, count + 1);
      // Here you would call the dhikr API to record the action
    }
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="mb-3">
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="text-center">
            <div className="font-bold text-green-600">{globalStats.totalCount.toLocaleString()}</div>
            <div className="text-gray-500">Global</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600">#{globalStats.myRank}</div>
            <div className="text-gray-500">My Rank</div>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 mb-3">
        <div className="space-y-2">
          {dhikrOptions.map((dhikr) => (
            <button
              key={dhikr.id}
              onClick={() => setSelectedDhikr(dhikr.id)}
              className={`w-full text-left p-2 rounded-lg border transition-colors ${
                selectedDhikr === dhikr.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="text-xs font-medium">{dhikr.translation}</div>
              <div className="text-xs text-gray-500 truncate">{dhikr.text}</div>
              <Badge variant="secondary" className="text-xs">+{dhikr.points} pts</Badge>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="space-y-2">
        {selectedDhikr && (
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{count}</div>
            <div className="text-xs text-gray-500">Today's Count</div>
          </div>
        )}
        <Button 
          onClick={handleDhikrClick}
          disabled={!selectedDhikr}
          className="w-full"
          size="sm"
        >
          <Star className="h-3 w-3 mr-1" />
          Record Dhikr
        </Button>
      </div>
    </div>
  );
};

export default DhikrTab;

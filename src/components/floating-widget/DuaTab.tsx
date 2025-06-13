
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Heart, Send } from 'lucide-react';

const DuaTab = () => {
  const [newDua, setNewDua] = useState('');

  // Mock dua data - in real app, this would come from API
  const globalDuas = [
    { id: '1', text: 'May Allah grant ease to all those struggling', author: 'Anonymous', ameens: 234, timeAgo: '2m ago' },
    { id: '2', text: 'Grant us strength in our faith and good health', author: 'Believer123', ameens: 156, timeAgo: '5m ago' },
    { id: '3', text: 'Protect our families and guide us on the right path', author: 'ServantOfAllah', ameens: 89, timeAgo: '8m ago' }
  ];

  const handleSubmitDua = () => {
    if (newDua.trim()) {
      console.log('Submitting dua:', newDua);
      // Here you would call the dua API to submit the dua
      setNewDua('');
    }
  };

  const handleAmeen = (duaId: string) => {
    console.log('Saying Ameen to dua:', duaId);
    // Here you would call the API to record the Ameen and award points
  };

  return (
    <div className="p-3 h-full flex flex-col">
      <div className="mb-3">
        <div className="text-center mb-2">
          <div className="text-lg font-bold text-purple-600">1,247</div>
          <div className="text-xs text-gray-500">Global Duas Today</div>
        </div>
        
        <div className="space-y-2">
          <Input
            placeholder="Write your dua..."
            value={newDua}
            onChange={(e) => setNewDua(e.target.value)}
            className="text-xs"
          />
          <Button 
            onClick={handleSubmitDua}
            disabled={!newDua.trim()}
            size="sm"
            className="w-full"
          >
            <Send className="h-3 w-3 mr-1" />
            Submit Dua (+5 points)
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {globalDuas.map((dua) => (
            <div key={dua.id} className="p-2 border rounded-lg bg-gray-50">
              <div className="text-xs mb-1">{dua.text}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{dua.author}</span>
                  <span className="text-xs text-gray-400">{dua.timeAgo}</span>
                </div>
                <Button
                  onClick={() => handleAmeen(dua.id)}
                  variant="outline"
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  <Heart className="h-2 w-2 mr-1" />
                  Ameen ({dua.ameens})
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DuaTab;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gift, Heart, BookOpen } from 'lucide-react';

interface DuaCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface DuaCardProps {
  dua: {
    id: string;
    title: string;
    arabic_text: string;
    transliteration: string;
    translation: string;
    reference: string;
    benefits: string;
    when_to_recite: string;
    recommended_donation_amount: number;
    is_featured: boolean;
    dua_categories?: DuaCategory;
  };
  onDonate: () => void;
}

const DuaCard = ({ dua, onDonate }: DuaCardProps) => {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{dua.title}</CardTitle>
          {dua.dua_categories && (
            <Badge className={`${dua.dua_categories.color} text-white`}>
              {dua.dua_categories.name}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-right text-lg leading-relaxed mb-3" dir="rtl">
            {dua.arabic_text.length > 150 
              ? `${dua.arabic_text.substring(0, 150)}...` 
              : dua.arabic_text
            }
          </p>
          {dua.transliteration && (
            <p className="text-sm text-gray-600 italic mb-2">
              {dua.transliteration.length > 100 
                ? `${dua.transliteration.substring(0, 100)}...` 
                : dua.transliteration
              }
            </p>
          )}
          <p className="text-gray-800">
            {dua.translation.length > 120 
              ? `${dua.translation.substring(0, 120)}...` 
              : dua.translation
            }
          </p>
        </div>
        
        {dua.reference && (
          <div className="text-sm text-gray-600 flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {dua.reference}
          </div>
        )}
        
        {dua.benefits && (
          <div className="text-sm text-green-700 bg-green-50 p-3 rounded">
            <strong>Benefits:</strong> {dua.benefits.length > 100 
              ? `${dua.benefits.substring(0, 100)}...` 
              : dua.benefits
            }
          </div>
        )}
        
        {dua.when_to_recite && (
          <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded">
            <strong>When to recite:</strong> {dua.when_to_recite}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            Suggested: £{(dua.recommended_donation_amount / 100).toFixed(2)}
          </div>
          <Button onClick={onDonate} className="bg-green-600 hover:bg-green-700">
            <Gift className="h-4 w-4 mr-2" />
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DuaCard;

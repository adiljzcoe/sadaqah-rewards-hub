
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';

interface RamadanDayModalProps {
  day: any;
  isOpen: boolean;
  onClose: () => void;
  isCompleted: boolean;
}

const RamadanDayModal = ({ day, isOpen, onClose, isCompleted }: RamadanDayModalProps) => {
  const IconComponent = (LucideIcons as any)[day.icon_name] || LucideIcons.Star;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg text-white mb-4",
            day.background_color
          )}>
            <IconComponent className="h-8 w-8" />
            <div>
              <DialogTitle className="text-xl text-white">
                Day {day.day_number}: {day.title}
              </DialogTitle>
              {isCompleted && (
                <Badge className="bg-yellow-400 text-yellow-900 mt-1">
                  ✓ Completed
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">Today's Reflection</h3>
            <p className="text-gray-600">{day.description}</p>
          </div>

          <Separator />

          {/* Dua Section */}
          <div className="space-y-4">
            <h3 className="font-semibold">Today's Dua</h3>
            
            {/* Arabic Text */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-right text-xl leading-relaxed font-arabic" dir="rtl">
                  {day.dua_text}
                </div>
              </CardContent>
            </Card>

            {/* Translation */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-gray-700 italic">
                  {day.dua_translation}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Rewards */}
          <div className="space-y-3">
            <h3 className="font-semibold">Rewards & Benefits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {day.bonus_points}
                  </div>
                  <div className="text-sm text-purple-700">
                    Jannah Points
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {day.sadaqah_coin_cost}
                  </div>
                  <div className="text-sm text-orange-700">
                    Sadaqah Coins
                  </div>
                </CardContent>
              </Card>
            </div>

            {day.special_reward && (
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="font-medium text-yellow-800 mb-1">
                    🎁 Special Reward
                  </div>
                  <div className="text-yellow-700">
                    {day.special_reward}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RamadanDayModal;

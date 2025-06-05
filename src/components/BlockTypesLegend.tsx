
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Zap, Shield } from 'lucide-react';

interface BlockType {
  category: string;
  icon: string;
  price: number;
  multiplier: string;
  jannahBonus: string;
  description: string;
  badge: {
    name: string;
    icon: React.ReactElement;
    color: string;
  };
  limitedQuantity: number;
}

const BlockTypesLegend = () => {
  const blockTypes: BlockType[] = [
    {
      category: 'Foundation',
      icon: '🏗️',
      price: 40,
      multiplier: '0.8x',
      jannahBonus: '75 pts',
      description: 'Essential base blocks (symbolic foundation support)',
      badge: {
        name: 'Foundation Builder',
        icon: <Shield className="h-3 w-3" />,
        color: 'bg-stone-500'
      },
      limitedQuantity: 0 // Unlimited
    },
    {
      category: 'Walls',
      icon: '🧱',
      price: 50,
      multiplier: '1.0x',
      jannahBonus: '90 pts',
      description: 'Standard building blocks (symbolic wall construction)',
      badge: {
        name: 'Wall Builder',
        icon: <Star className="h-3 w-3" />,
        color: 'bg-amber-500'
      },
      limitedQuantity: 0 // Unlimited
    },
    {
      category: 'Roof',
      icon: '🏠',
      price: 60,
      multiplier: '1.2x',
      jannahBonus: '98 pts',
      description: 'Premium coverage blocks (symbolic roof completion)',
      badge: {
        name: 'Roof Completer',
        icon: <Star className="h-3 w-3" />,
        color: 'bg-slate-500'
      },
      limitedQuantity: 0 // Unlimited
    },
    {
      category: 'Interior',
      icon: '🏛️',
      price: 45,
      multiplier: '0.9x',
      jannahBonus: '83 pts',
      description: 'Sacred space blocks (symbolic interior beautification)',
      badge: {
        name: 'Interior Designer',
        icon: <Star className="h-3 w-3" />,
        color: 'bg-emerald-500'
      },
      limitedQuantity: 0 // Unlimited
    },
    {
      category: 'Minaret',
      icon: '🗼',
      price: 75,
      multiplier: '1.5x',
      jannahBonus: '150 pts',
      description: 'LIMITED: Symbolic minaret contribution (not actual minaret)',
      badge: {
        name: 'Minaret Sponsor',
        icon: <Crown className="h-3 w-3" />,
        color: 'bg-blue-500'
      },
      limitedQuantity: 4 // Only 4 minaret blocks per mosque
    },
    {
      category: 'Dome',
      icon: '🕌',
      price: 90,
      multiplier: '1.8x',
      jannahBonus: '188 pts',
      description: 'ULTRA RARE: Symbolic dome contribution (not actual dome)',
      badge: {
        name: 'Dome Patron',
        icon: <Crown className="h-3 w-3" />,
        color: 'bg-purple-500'
      },
      limitedQuantity: 1 // Only 1 dome block per mosque
    }
  ];

  return (
    <Card className="mb-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Zap className="h-5 w-5 text-blue-600" />
          Block Types & Jannah Point Badges
        </CardTitle>
        <p className="text-sm text-gray-600">
          Purchase different block types to earn special badges! Premium blocks are symbolic contributions with limited quantities.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blockTypes.map((block) => (
            <div
              key={block.category}
              className={`p-4 rounded-lg border-2 ${
                block.limitedQuantity > 0 
                  ? 'border-purple-300 bg-gradient-to-br from-purple-50 to-pink-50' 
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{block.icon}</span>
                  <div>
                    <div className="font-bold text-gray-900">{block.category}</div>
                    <div className="text-sm text-gray-600">£{block.price} per block</div>
                  </div>
                </div>
                <Badge 
                  className={`${block.badge.color} text-white text-xs`}
                  variant="secondary"
                >
                  {block.multiplier}
                </Badge>
              </div>

              {/* Limited Quantity Alert */}
              {block.limitedQuantity > 0 && (
                <div className="mb-3 p-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg border border-purple-200">
                  <div className="text-xs font-bold text-purple-800 flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    LIMITED: Only {block.limitedQuantity} available per mosque
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-600 mb-3">{block.description}</p>

              {/* Badge Preview */}
              <div className="bg-gradient-to-r from-emerald-100 to-blue-100 p-3 rounded-lg border border-emerald-200">
                <div className="text-xs font-semibold text-gray-700 mb-1">Unlocks Badge:</div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-6 h-6 rounded-full ${block.badge.color} flex items-center justify-center text-white`}>
                    {block.badge.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-800">{block.badge.name}</span>
                </div>
                <div className="text-xs text-emerald-700 font-bold">
                  +{block.jannahBonus} Jannah Points
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg border border-emerald-200">
          <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <Star className="h-4 w-4" />
            Important: Symbolic Contributions
          </h4>
          <p className="text-sm text-gray-700 mb-2">
            • <strong>Foundation, Walls, Roof, Interior blocks:</strong> Unlimited quantity - represent your general contribution to the mosque
          </p>
          <p className="text-sm text-gray-700 mb-2">
            • <strong>Minaret blocks (4 max):</strong> Symbolic contribution to the call to prayer - not an actual minaret
          </p>
          <p className="text-sm text-gray-700">
            • <strong>Dome block (1 max):</strong> Symbolic contribution to the mosque's crown - not an actual dome
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockTypesLegend;

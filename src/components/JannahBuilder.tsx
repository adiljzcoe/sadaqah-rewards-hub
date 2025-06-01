
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TreeDeciduous, TreePalm, Trees, Waterfall, Palace } from 'lucide-react';
import type { JannahItem } from '@/pages/MyJannah';

interface JannahBuilderProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
  placedItems: Array<{ item: JannahItem; x: number; y: number }>;
  onItemsChange: (items: Array<{ item: JannahItem; x: number; y: number }>) => void;
}

const GRID_SIZE = 12;

const JannahBuilder: React.FC<JannahBuilderProps> = ({
  items,
  userCoins,
  onPurchase,
  placedItems,
  onItemsChange
}) => {
  const [selectedItem, setSelectedItem] = useState<JannahItem | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

  const quickBuyItems = items.slice(0, 4); // Show first 4 items for quick buying

  const handleCellClick = (x: number, y: number) => {
    if (selectedItem && canPlaceItem(x, y, selectedItem)) {
      if (onPurchase(selectedItem)) {
        const newItems = [...placedItems, { item: selectedItem, x, y }];
        onItemsChange(newItems);
        setSelectedItem(null);
      }
    }
  };

  const canPlaceItem = (x: number, y: number, item: JannahItem): boolean => {
    const size = item.size === '1x1' ? 1 : item.size === '2x2' ? 2 : 3;
    
    // Check bounds
    if (x + size > GRID_SIZE || y + size > GRID_SIZE) return false;
    
    // Check for overlaps
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (placedItems.some(placed => {
          const placedSize = placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : 3;
          return (
            x + i >= placed.x && x + i < placed.x + placedSize &&
            y + j >= placed.y && y + j < placed.y + placedSize
          );
        })) {
          return false;
        }
      }
    }
    
    return true;
  };

  const renderCell = (x: number, y: number) => {
    const placedItem = placedItems.find(placed => 
      x >= placed.x && x < placed.x + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : 3) &&
      y >= placed.y && y < placed.y + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : 3)
    );

    const isMainCell = placedItem && placedItem.x === x && placedItem.y === y;
    const canPlace = selectedItem ? canPlaceItem(x, y, selectedItem) : false;
    const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`
          aspect-square border transition-all duration-200 cursor-pointer relative
          ${placedItem 
            ? isMainCell 
              ? 'bg-gradient-to-br from-green-200 to-emerald-300 border-green-400' 
              : 'bg-green-100 border-green-200'
            : selectedItem && canPlace
              ? 'bg-blue-100 border-blue-300 hover:bg-blue-200'
              : selectedItem
                ? 'bg-red-50 border-red-200'
                : 'bg-white/50 border-gray-200 hover:bg-white/80'
          }
          ${isHovered && selectedItem && canPlace ? 'ring-2 ring-blue-400' : ''}
        `}
        onClick={() => handleCellClick(x, y)}
        onMouseEnter={() => setHoveredCell({ x, y })}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {isMainCell && placedItem && (
          <div className="absolute inset-0 flex items-center justify-center text-green-700">
            {placedItem.item.icon}
          </div>
        )}
        {selectedItem && canPlace && isHovered && (
          <div className="absolute inset-0 flex items-center justify-center text-blue-600 opacity-70">
            {selectedItem.icon}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Quick Buy Section */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-4 text-center">Quick Purchase</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickBuyItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedItem?.id === item.id ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center space-y-2 ${
                  userCoins < item.price ? 'opacity-50' : ''
                }`}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                disabled={userCoins < item.price}
              >
                {item.icon}
                <div className="text-xs text-center">
                  <div>{item.name}</div>
                  <Badge variant="secondary" className="text-xs">
                    {item.price} coins
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
          {selectedItem && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <div className="text-center">
                <p className="font-medium text-blue-800">Selected: {selectedItem.name}</p>
                <p className="text-sm text-blue-600">{selectedItem.description}</p>
                <p className="text-xs text-blue-500 mt-1">Click on the grid to place</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Building Grid */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold">Your Jannah Space</h3>
            <p className="text-gray-600">Click on empty spaces to build</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div 
              className="grid gap-1 bg-gradient-to-br from-sky-200 to-blue-300 p-4 rounded-xl shadow-inner"
              style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                return renderCell(x, y);
              })}
            </div>
          </div>

          {placedItems.length === 0 && (
            <div className="text-center mt-4 text-gray-500">
              <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Start building your paradise by selecting an item above and clicking on the grid</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Placed Items Summary */}
      {placedItems.length > 0 && (
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4">Your Jannah Features</h3>
            <div className="space-y-2">
              {placedItems.map((placedItem, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {placedItem.item.icon}
                    <div>
                      <div className="font-medium">{placedItem.item.name}</div>
                      <div className="text-sm text-gray-600">{placedItem.item.intention}</div>
                    </div>
                  </div>
                  <Badge variant="secondary">{placedItem.item.price} coins</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JannahBuilder;

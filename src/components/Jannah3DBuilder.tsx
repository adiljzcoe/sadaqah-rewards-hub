
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TreeDeciduous, TreePalm, Trees, Waves, Home, Sparkles, RotateCcw, Eye } from 'lucide-react';
import type { JannahItem } from '@/pages/MyJannah';

interface Jannah3DBuilderProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
  placedItems: Array<{ item: JannahItem; x: number; y: number }>;
  onItemsChange: (items: Array<{ item: JannahItem; x: number; y: number }>) => void;
}

const GRID_SIZE = 10;

const Jannah3DBuilder: React.FC<Jannah3DBuilderProps> = ({
  items,
  userCoins,
  onPurchase,
  placedItems,
  onItemsChange
}) => {
  const [selectedItem, setSelectedItem] = useState<JannahItem | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [viewMode, setViewMode] = useState<'isometric' | 'top'>('isometric');
  const [rotationAngle, setRotationAngle] = useState(0);

  const quickBuyItems = items.slice(0, 6);

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
    
    if (x + size > GRID_SIZE || y + size > GRID_SIZE) return false;
    
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

  const getItemHeight = (item: JannahItem) => {
    switch (item.category) {
      case 'structures': return 'h-16';
      case 'nature': return item.name.includes('Tree') ? 'h-12' : 'h-8';
      default: return 'h-10';
    }
  };

  const getItemColor = (item: JannahItem) => {
    switch (item.category) {
      case 'nature': return 'from-green-400 to-emerald-600';
      case 'structures': return 'from-amber-400 to-orange-600';
      default: return 'from-purple-400 to-pink-600';
    }
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
          relative transition-all duration-300 cursor-pointer transform-gpu
          ${viewMode === 'isometric' ? 'aspect-[1.2/1]' : 'aspect-square'}
          ${placedItem 
            ? 'bg-gradient-to-br from-emerald-200 via-green-300 to-emerald-400 shadow-lg scale-105' 
            : selectedItem && canPlace
              ? 'bg-gradient-to-br from-blue-200 via-cyan-200 to-blue-300 shadow-md hover:scale-105'
              : selectedItem
                ? 'bg-gradient-to-br from-red-100 to-red-200 opacity-50'
                : 'bg-gradient-to-br from-sky-100 via-white to-blue-100 hover:from-sky-200 hover:to-blue-200 hover:scale-102'
          }
          ${isHovered && selectedItem && canPlace ? 'ring-4 ring-cyan-400 ring-opacity-60 animate-pulse' : ''}
          border-2 border-white/50 rounded-lg shadow-sm
          ${viewMode === 'isometric' ? 'skew-x-12 -skew-y-12' : ''}
        `}
        style={{
          transform: viewMode === 'isometric' 
            ? `rotateX(60deg) rotateY(${rotationAngle}deg) scale(0.9)` 
            : `rotateY(${rotationAngle}deg)`
        }}
        onClick={() => handleCellClick(x, y)}
        onMouseEnter={() => setHoveredCell({ x, y })}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {/* Grid cell base with 3D effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-white/20 to-transparent"></div>
        
        {/* Placed item */}
        {isMainCell && placedItem && (
          <div className={`
            absolute inset-0 flex items-center justify-center transform-gpu
            ${getItemHeight(placedItem.item)}
            ${viewMode === 'isometric' ? '-skew-x-12 skew-y-12' : ''}
            animate-fade-in
          `}>
            <div className={`
              p-3 rounded-xl shadow-xl backdrop-blur-sm
              bg-gradient-to-br ${getItemColor(placedItem.item)}
              text-white transform transition-transform duration-300 hover:scale-110
              border-2 border-white/30
            `}>
              {React.cloneElement(placedItem.item.icon as React.ReactElement, {
                className: "h-8 w-8 drop-shadow-lg"
              })}
            </div>
          </div>
        )}
        
        {/* Preview for selected item */}
        {selectedItem && canPlace && isHovered && (
          <div className={`
            absolute inset-0 flex items-center justify-center transform-gpu
            ${getItemHeight(selectedItem)}
            ${viewMode === 'isometric' ? '-skew-x-12 skew-y-12' : ''}
            animate-scale-in
          `}>
            <div className={`
              p-3 rounded-xl shadow-xl backdrop-blur-sm opacity-80
              bg-gradient-to-br ${getItemColor(selectedItem)}
              text-white border-2 border-white/50 animate-pulse
            `}>
              {React.cloneElement(selectedItem.icon as React.ReactElement, {
                className: "h-8 w-8 drop-shadow-lg"
              })}
            </div>
          </div>
        )}
        
        {/* Grid coordinates for debugging */}
        <div className="absolute top-1 left-1 text-xs text-gray-400 font-mono">
          {x},{y}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-gradient-to-br from-blue-50 via-white to-purple-50 backdrop-blur-sm border-2 border-white/50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ✨ Build Your Paradise ✨
            </h3>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'isometric' ? 'default' : 'outline'}
                onClick={() => setViewMode('isometric')}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
              >
                <Eye className="h-4 w-4 mr-2" />
                3D View
              </Button>
              <Button
                variant={viewMode === 'top' ? 'default' : 'outline'}
                onClick={() => setViewMode('top')}
                className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0"
              >
                <Eye className="h-4 w-4 mr-2" />
                Top View
              </Button>
              <Button
                variant="outline"
                onClick={() => setRotationAngle(prev => prev + 90)}
                className="border-2 border-purple-300 hover:bg-purple-100"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Rotate
              </Button>
            </div>
          </div>
          
          {/* Item Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickBuyItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedItem?.id === item.id ? "default" : "outline"}
                className={`h-20 flex flex-col items-center justify-center space-y-2 transition-all duration-300 hover:scale-105 ${
                  selectedItem?.id === item.id 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-lg ring-4 ring-purple-300 ring-opacity-50' 
                    : userCoins < item.price 
                      ? 'opacity-50 bg-gray-100' 
                      : 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 border-2 border-purple-200'
                }`}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                disabled={userCoins < item.price}
              >
                <div className={`p-2 rounded-full ${selectedItem?.id === item.id ? 'bg-white/20' : 'bg-gradient-to-br ' + getItemColor(item)}`}>
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: `h-6 w-6 ${selectedItem?.id === item.id ? 'text-white' : 'text-white'}`
                  })}
                </div>
                <div className="text-xs text-center">
                  <div className="font-medium">{item.name}</div>
                  <Badge variant="secondary" className="text-xs bg-yellow-500 text-white">
                    {item.price} ✨
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
          
          {selectedItem && (
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl border-2 border-purple-200">
              <div className="text-center">
                <p className="font-bold text-purple-800 text-lg">✨ {selectedItem.name} Selected ✨</p>
                <p className="text-purple-600 mt-1">{selectedItem.description}</p>
                <p className="text-purple-500 text-sm mt-2 font-medium">🎯 Click on the grid to place your item!</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 3D Building Grid */}
      <Card className="bg-gradient-to-br from-sky-200 via-blue-300 to-indigo-400 backdrop-blur-sm border-2 border-white/30 shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">🌟 Your Heavenly Space 🌟</h3>
            <p className="text-blue-100 mt-2">Build your paradise one piece at a time</p>
          </div>
          
          <div className="max-w-6xl mx-auto perspective-1000">
            <div 
              className={`
                grid gap-2 p-8 rounded-2xl shadow-inner bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500
                ${viewMode === 'isometric' ? 'transform-style-preserve-3d' : ''}
              `}
              style={{ 
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                transform: viewMode === 'isometric' ? 'rotateX(15deg)' : 'none'
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                return renderCell(x, y);
              })}
            </div>
          </div>

          {placedItems.length === 0 && (
            <div className="text-center mt-8 text-white">
              <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-70 animate-pulse" />
              <p className="text-xl font-medium">Your paradise awaits! 🏗️</p>
              <p className="text-blue-100 mt-2">Select an item above and start building your dream Jannah</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Placed Items Summary */}
      {placedItems.length > 0 && (
        <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-emerald-800 flex items-center">
              <Sparkles className="h-6 w-6 mr-2" />
              Your Paradise Features
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {placedItems.map((placedItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-xl border-2 border-emerald-200 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full bg-gradient-to-br ${getItemColor(placedItem.item)} shadow-lg`}>
                      {React.cloneElement(placedItem.item.icon as React.ReactElement, {
                        className: "h-6 w-6 text-white"
                      })}
                    </div>
                    <div>
                      <div className="font-bold text-emerald-800">{placedItem.item.name}</div>
                      <div className="text-sm text-emerald-600">{placedItem.item.intention}</div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold">
                    {placedItem.item.price} ✨
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      )}
    </div>
  );
};

export default Jannah3DBuilder;

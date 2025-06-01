import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TreeDeciduous, TreePalm, Trees, Waves, Home, Sparkles, RotateCcw, Eye, Grid3X3, Zap } from 'lucide-react';
import type { JannahItem } from '@/pages/MyJannah';

interface Jannah3DBuilderProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
  placedItems: Array<{ item: JannahItem; x: number; y: number }>;
  onItemsChange: (items: Array<{ item: JannahItem; x: number; y: number }>) => void;
}

const GRID_SIZE = 12;

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
  const [rotationAngle, setRotationAngle] = useState(45);
  const [showGrid, setShowGrid] = useState(true);

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
      case 'structures': return 'h-20';
      case 'nature': return item.name.includes('Tree') ? 'h-16' : 'h-12';
      default: return 'h-14';
    }
  };

  const getItemColor = (item: JannahItem) => {
    switch (item.category) {
      case 'nature': return 'from-green-500 to-emerald-700';
      case 'structures': return 'from-amber-500 to-orange-700';
      default: return 'from-purple-500 to-pink-700';
    }
  };

  const renderTreeBlock = (item: JannahItem) => {
    const isTreeItem = item.name.toLowerCase().includes('tree') || item.category === 'nature';
    
    if (!isTreeItem) {
      return (
        <div className={`
          relative p-2 rounded-lg shadow-2xl
          bg-gradient-to-b ${getItemColor(item)}
          text-white transform transition-all duration-300 hover:scale-110
          border-2 border-white/40
          before:content-[''] before:absolute before:inset-0 before:bg-white/20 before:rounded-lg
        `}>
          {React.cloneElement(item.icon as React.ReactElement, {
            className: "h-6 w-6 drop-shadow-lg relative z-10"
          })}
          <div className="absolute -bottom-1 -right-1 w-full h-full bg-black/20 rounded-lg -z-10"></div>
        </div>
      );
    }

    // Enhanced tree block with multiple trees and foliage
    return (
      <div className="relative w-full h-full">
        {/* Forest ground with grass texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 rounded-lg border-2 border-green-700 shadow-xl">
          {/* Animated grass pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-300/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-t from-green-800/40 to-transparent"></div>
          </div>
          
          {/* Multiple trees arranged naturally */}
          <div className="absolute inset-1 flex items-end justify-center">
            {/* Background trees (smaller, darker) */}
            <div className="absolute inset-0 flex items-end justify-around">
              <TreeDeciduous className="h-4 w-4 text-green-800/60 transform -translate-y-1 animate-float" style={{ animationDelay: '0s' }} />
              <Trees className="h-5 w-5 text-green-700/70 transform translate-x-1 animate-float" style={{ animationDelay: '0.5s' }} />
              <TreePalm className="h-4 w-4 text-green-800/60 transform -translate-x-1 animate-float" style={{ animationDelay: '1s' }} />
            </div>
            
            {/* Foreground main tree */}
            <div className="relative z-10 transform -translate-y-1">
              {React.cloneElement(item.icon as React.ReactElement, {
                className: "h-8 w-8 text-green-100 drop-shadow-xl animate-float"
              })}
            </div>
            
            {/* Animated foliage particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1 left-2 w-1 h-1 bg-green-300 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute top-3 right-1 w-1 h-1 bg-emerald-200 rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-green-200 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.8s' }}></div>
            </div>
            
            {/* Subtle wind effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-200/10 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Tree shadows */}
          <div className="absolute bottom-0 right-1 w-6 h-2 bg-black/20 rounded-full blur-sm"></div>
        </div>
      </div>
    );
  };

  const renderCell = (x: number, y: number) => {
    const placedItem = placedItems.find(placed => 
      x >= placed.x && x < placed.x + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : 3) &&
      y >= placed.y && y < placed.y + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : 3)
    );

    const isMainCell = placedItem && placedItem.x === x && placedItem.y === y;
    const canPlace = selectedItem ? canPlaceItem(x, y, selectedItem) : false;
    const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;

    // SimCity-style isometric calculations
    const cellStyle = viewMode === 'isometric' ? {
      transform: `rotateX(60deg) rotateZ(${rotationAngle}deg)`,
      transformStyle: 'preserve-3d' as const,
    } : {
      transform: `rotateZ(${rotationAngle}deg)`,
    };

    return (
      <div
        key={`${x}-${y}`}
        className={`
          relative transition-all duration-200 cursor-pointer
          ${viewMode === 'isometric' ? 'aspect-[0.866/1]' : 'aspect-square'}
          ${placedItem 
            ? 'bg-gradient-to-br from-green-400 via-emerald-500 to-green-600 shadow-lg border-green-700' 
            : selectedItem && canPlace
              ? 'bg-gradient-to-br from-cyan-300 via-blue-400 to-cyan-500 shadow-md border-cyan-600 animate-pulse'
              : selectedItem
                ? 'bg-gradient-to-br from-red-200 to-red-300 opacity-60 border-red-400'
                : 'bg-gradient-to-br from-gray-200 via-gray-100 to-white border-gray-400 hover:from-blue-100 hover:to-cyan-100'
          }
          ${isHovered && selectedItem && canPlace ? 'ring-2 ring-yellow-400 ring-opacity-80' : ''}
          border-2 ${showGrid ? 'border-opacity-60' : 'border-opacity-20'}
        `}
        style={cellStyle}
        onClick={() => handleCellClick(x, y)}
        onMouseEnter={() => setHoveredCell({ x, y })}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {/* SimCity-style ground texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-30"></div>
        
        {/* Grid lines for SimCity feel */}
        {showGrid && !placedItem && (
          <div className="absolute inset-0 border border-gray-300 border-opacity-40"></div>
        )}
        
        {/* Placed item with enhanced 3D effect */}
        {isMainCell && placedItem && (
          <div 
            className={`
              absolute inset-0 flex items-end justify-center pb-1
              ${getItemHeight(placedItem.item)}
              transform-gpu perspective-1000
            `}
            style={{
              transform: viewMode === 'isometric' 
                ? `rotateX(-60deg) rotateZ(-${rotationAngle}deg) translateZ(10px)` 
                : `rotateZ(-${rotationAngle}deg)`
            }}
          >
            {renderTreeBlock(placedItem.item)}
          </div>
        )}
        
        {/* Preview for selected item */}
        {selectedItem && canPlace && isHovered && (
          <div 
            className={`
              absolute inset-0 flex items-end justify-center pb-1
              ${getItemHeight(selectedItem)}
              transform-gpu perspective-1000
            `}
            style={{
              transform: viewMode === 'isometric' 
                ? `rotateX(-60deg) rotateZ(-${rotationAngle}deg) translateZ(10px)` 
                : `rotateZ(-${rotationAngle}deg)`
            }}
          >
            <div className="opacity-70">
              {renderTreeBlock(selectedItem)}
            </div>
          </div>
        )}
        
        {/* SimCity-style coordinate display */}
        {showGrid && (
          <div className="absolute top-0 left-0 text-xs text-gray-500 font-mono bg-white/60 px-1 rounded-br">
            {x},{y}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* SimCity-style Control Panel */}
      <Card className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 text-white border-2 border-gray-600 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-green-400 flex items-center">
              <Zap className="h-6 w-6 mr-2" />
              🏗️ Paradise City Builder
            </h3>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'isometric' ? 'default' : 'outline'}
                onClick={() => setViewMode('isometric')}
                className="bg-green-600 hover:bg-green-700 text-white border-0"
              >
                <Eye className="h-4 w-4 mr-2" />
                Isometric
              </Button>
              <Button
                variant={viewMode === 'top' ? 'default' : 'outline'}
                onClick={() => setViewMode('top')}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0"
              >
                <Eye className="h-4 w-4 mr-2" />
                Top Down
              </Button>
              <Button
                variant="outline"
                onClick={() => setRotationAngle(prev => (prev + 45) % 360)}
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Rotate
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowGrid(!showGrid)}
                className="border-gray-500 text-gray-300 hover:bg-gray-700"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </Button>
            </div>
          </div>
          
          {/* SimCity-style Item Selection */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickBuyItems.map((item) => (
              <Button
                key={item.id}
                variant={selectedItem?.id === item.id ? "default" : "outline"}
                className={`h-24 flex flex-col items-center justify-center space-y-2 transition-all duration-200 ${
                  selectedItem?.id === item.id 
                    ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg ring-2 ring-green-400' 
                    : userCoins < item.price 
                      ? 'opacity-50 bg-gray-700 border-gray-600 text-gray-400' 
                      : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500'
                }`}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                disabled={userCoins < item.price}
              >
                <div className={`p-2 rounded ${selectedItem?.id === item.id ? 'bg-white/20' : 'bg-gray-700'}`}>
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: `h-5 w-5 ${selectedItem?.id === item.id ? 'text-white' : 'text-gray-300'}`
                  })}
                </div>
                <div className="text-xs text-center">
                  <div className="font-medium">{item.name}</div>
                  <Badge variant="secondary" className="text-xs bg-yellow-600 text-yellow-100">
                    ${item.price}
                  </Badge>
                </div>
              </Button>
            ))}
          </div>
          
          {selectedItem && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600">
              <div className="text-center">
                <p className="font-bold text-green-400 text-lg">🎯 {selectedItem.name} Selected</p>
                <p className="text-gray-300 mt-1">{selectedItem.description}</p>
                <p className="text-gray-400 text-sm mt-2">Click on the grid to place your building</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SimCity-style Building Grid */}
      <Card className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 border-2 border-green-600 shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white drop-shadow-lg">🌍 Your Paradise City</h3>
            <p className="text-green-200 mt-2">Build wisely, Paradise Mayor!</p>
          </div>
          
          <div className="max-w-6xl mx-auto" style={{ perspective: '1200px' }}>
            <div 
              className={`
                grid gap-1 p-6 rounded-xl shadow-inner
                bg-gradient-to-br from-green-600 via-emerald-600 to-green-700
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
              <Home className="h-16 w-16 mx-auto mb-4 opacity-70" />
              <p className="text-xl font-medium">Welcome, Paradise Mayor!</p>
              <p className="text-green-200 mt-2">Select a building and start developing your holy city</p>
            </div>
          )}
          
          {/* SimCity-style city stats */}
          {placedItems.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-green-400">{placedItems.length}</div>
                <div className="text-sm text-green-200">Buildings</div>
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-blue-400">{placedItems.filter(i => i.item.category === 'nature').length}</div>
                <div className="text-sm text-blue-200">Nature</div>
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-yellow-400">{placedItems.reduce((sum, { item }) => sum + item.price, 0)}</div>
                <div className="text-sm text-yellow-200">Total Value</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SimCity-style Building List */}
      {placedItems.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border-2 border-gray-600 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
              <Sparkles className="h-6 w-6 mr-2" />
              City Development Report
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {placedItems.map((placedItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg border border-gray-600 hover:border-gray-500 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${getItemColor(placedItem.item)} shadow-lg border border-white/20`}>
                      {React.cloneElement(placedItem.item.icon as React.ReactElement, {
                        className: "h-5 w-5 text-white"
                      })}
                    </div>
                    <div>
                      <div className="font-bold text-white">{placedItem.item.name}</div>
                      <div className="text-sm text-gray-400">{placedItem.item.intention}</div>
                    </div>
                  </div>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold">
                    ${placedItem.item.price}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Jannah3DBuilder;

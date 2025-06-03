import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, TreeDeciduous, TreePalm, Trees, Waves, Home, Sparkles, RotateCcw, Eye, Grid3X3, Zap } from 'lucide-react';
import type { JannahItem } from '@/types/jannah';

interface Jannah3DBuilderProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
  placedItems: Array<{ item: JannahItem; x: number; y: number }>;
  onItemsChange: (items: Array<{ item: JannahItem; x: number; y: number }>) => void;
  gridSize: number;
}

const Jannah3DBuilder: React.FC<Jannah3DBuilderProps> = ({
  items,
  userCoins,
  onPurchase,
  placedItems,
  onItemsChange,
  gridSize
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
        if (!selectedItem.id.includes('grid-expansion')) {
          const newItems = [...placedItems, { item: selectedItem, x, y }];
          onItemsChange(newItems);
        }
        setSelectedItem(null);
      }
    }
  };

  const canPlaceItem = (x: number, y: number, item: JannahItem): boolean => {
    if (item.id.includes('grid-expansion')) {
      return true;
    }

    const size = item.size === '1x1' ? 1 : item.size === '2x2' ? 2 : item.size === '3x3' ? 3 : 4;
    
    if (x + size > gridSize || y + size > gridSize) return false;
    
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (placedItems.some(placed => {
          const placedSize = placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : placed.item.size === '3x3' ? 3 : 4;
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

  const getBuildingHeight = (item: JannahItem) => {
    switch (item.category) {
      case 'structures': 
        if (item.name.includes('Palace') || item.name.includes('Castle')) return 80;
        if (item.name.includes('Mosque') || item.name.includes('Library')) return 60;
        return 40;
      case 'nature': 
        if (item.name.includes('Mountain')) return 100;
        if (item.name.includes('Tree') || item.name.includes('Grove')) return 35;
        return 20;
      case 'terrain':
        if (item.name.includes('Mountain')) return 120;
        if (item.name.includes('Hill')) return 50;
        return 25;
      case 'special':
        if (item.name.includes('Sun') || item.name.includes('Rainbow')) return 150;
        if (item.name.includes('Moon') || item.name.includes('Throne')) return 90;
        return 30;
      default: return 25;
    }
  };

  const getItemColor = (item: JannahItem) => {
    switch (item.category) {
      case 'nature': return 'from-emerald-400 via-green-500 to-emerald-600';
      case 'structures': return 'from-amber-400 via-orange-500 to-amber-600';
      case 'terrain': return 'from-orange-400 via-red-500 to-orange-600';
      case 'religious': return 'from-purple-400 via-indigo-500 to-purple-600';
      case 'animals': return 'from-pink-400 via-rose-500 to-pink-600';
      case 'fruits': return 'from-yellow-400 via-orange-500 to-yellow-600';
      case 'decorations': return 'from-indigo-400 via-purple-500 to-indigo-600';
      case 'transport': return 'from-cyan-400 via-blue-500 to-cyan-600';
      case 'utilities': return 'from-gray-400 via-slate-500 to-gray-600';
      default: return 'from-purple-400 via-pink-500 to-purple-600';
    }
  };

  const render3DBuilding = (item: JannahItem) => {
    const height = getBuildingHeight(item);
    const isStructure = item.category === 'structures' || item.category === 'terrain';
    
    return (
      <div className="relative w-full h-full flex items-end justify-center" style={{ height: `${height}px` }}>
        {/* Building shadow */}
        <div 
          className="absolute bottom-0 bg-black/30 rounded-full blur-sm"
          style={{ 
            width: isStructure ? '90%' : '70%', 
            height: '8px',
            transform: 'translateX(4px) translateY(2px)'
          }}
        />
        
        {/* Main building structure */}
        <div 
          className={`
            relative transform-gpu
            bg-gradient-to-b ${getItemColor(item)}
            border-2 border-white/40
            shadow-2xl
          `}
          style={{
            width: isStructure ? '80%' : '60%',
            height: `${height * 0.8}px`,
            transform: viewMode === 'isometric' 
              ? 'rotateX(60deg) rotateY(-30deg) translateZ(10px)' 
              : 'translateZ(10px)',
            borderRadius: isStructure ? '4px' : '8px',
            boxShadow: `
              0 ${height * 0.1}px ${height * 0.2}px rgba(0,0,0,0.3),
              inset 0 0 20px rgba(255,255,255,0.2),
              0 0 30px rgba(59, 130, 246, 0.3)
            `
          }}
        >
          {/* Building top highlight */}
          <div 
            className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-white/50 to-transparent rounded-t"
          />
          
          {/* Building side panels for 3D effect */}
          <div 
            className="absolute top-0 right-0 bg-black/20"
            style={{
              width: '6px',
              height: '100%',
              transform: 'rotateY(90deg) translateZ(3px)',
              transformOrigin: 'left center'
            }}
          />
          
          {/* Building icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            {React.cloneElement(item.icon as React.ReactElement, {
              className: `h-8 w-8 text-white drop-shadow-2xl ${
                isStructure ? 'animate-pulse' : 'animate-float'
              }`,
              style: { 
                filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                transform: viewMode === 'isometric' 
                  ? 'rotateX(-60deg) rotateY(30deg)' 
                  : 'none'
              }
            })}
          </div>
          
          {/* Animated particles for special items */}
          {(item.category === 'special' || item.category === 'religious') && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded">
              <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-80"></div>
              <div className="absolute top-4 right-3 w-1 h-1 bg-white rounded-full animate-pulse opacity-60" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-3 left-4 w-0.5 h-0.5 bg-yellow-200 rounded-full animate-pulse opacity-70" style={{ animationDelay: '1s' }}></div>
            </div>
          )}
          
          {/* Divine glow effect */}
          <div 
            className="absolute inset-0 rounded bg-gradient-to-t from-transparent via-transparent to-white/10 animate-shimmer"
            style={{ animationDuration: '4s' }}
          />
        </div>
        
        {/* Special effects for nature items */}
        {item.category === 'nature' && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Grass base */}
            <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-t from-green-600 to-green-400 rounded-b opacity-80" />
            
            {/* Floating leaves */}
            <div className="absolute top-0 w-1 h-1 bg-green-300 rounded-full animate-float opacity-60" style={{ left: '20%' }}></div>
            <div className="absolute top-2 w-0.5 h-0.5 bg-emerald-200 rounded-full animate-float opacity-50" style={{ right: '30%', animationDelay: '1s' }}></div>
          </div>
        )}
      </div>
    );
  };

  const renderCell = (x: number, y: number) => {
    const placedItem = placedItems.find(placed => 
      x >= placed.x && x < placed.x + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : placed.item.size === '3x3' ? 3 : 4) &&
      y >= placed.y && y < placed.y + (placed.item.size === '1x1' ? 1 : placed.item.size === '2x2' ? 2 : placed.item.size === '3x3' ? 3 : 4)
    );

    const isMainCell = placedItem && placedItem.x === x && placedItem.y === y;
    const canPlace = selectedItem ? canPlaceItem(x, y, selectedItem) : false;
    const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;

    return (
      <div
        key={`${x}-${y}`}
        className={`
          relative transition-all duration-200 cursor-pointer aspect-square
          ${placedItem 
            ? 'bg-gradient-to-br from-emerald-100 via-green-50 to-emerald-100' 
            : selectedItem && canPlace
              ? 'bg-gradient-to-br from-cyan-200 via-blue-100 to-cyan-200 animate-pulse'
              : selectedItem
                ? 'bg-gradient-to-br from-red-100 to-red-200 opacity-60'
                : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 hover:from-blue-50 hover:to-cyan-50'
          }
          ${isHovered && selectedItem && canPlace ? 'ring-4 ring-yellow-400 ring-opacity-60' : ''}
          border-2 ${showGrid ? 'border-gray-300' : 'border-gray-200'} border-opacity-40
          overflow-visible
        `}
        style={{
          height: '60px',
          perspective: viewMode === 'isometric' ? '800px' : 'none',
          transform: viewMode === 'isometric' 
            ? `rotateX(30deg) rotateY(${rotationAngle}deg)` 
            : `rotateZ(${rotationAngle}deg)`
        }}
        onClick={() => handleCellClick(x, y)}
        onMouseEnter={() => setHoveredCell({ x, y })}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {/* Enhanced ground texture */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 via-emerald-50/30 to-green-100/50"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
        </div>
        
        {/* Grid coordinates */}
        {showGrid && (
          <div className="absolute top-1 left-1 text-xs text-gray-400 font-mono bg-white/80 px-1 rounded">
            {x},{y}
          </div>
        )}
        
        {/* 3D Building rendering - only on main cell */}
        {placedItem && isMainCell && (
          <div className="absolute inset-0 flex items-end justify-center pb-1">
            {render3DBuilding(placedItem.item)}
          </div>
        )}
        
        {/* Preview for selected item */}
        {selectedItem && canPlace && isHovered && !selectedItem.id.includes('grid-expansion') && (
          <div className="absolute inset-0 flex items-end justify-center pb-1 opacity-70">
            {render3DBuilding(selectedItem)}
          </div>
        )}
        
        {/* Heavenly ground sparkles */}
        {!placedItem && Math.random() > 0.95 && (
          <div className="absolute bottom-1 right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse opacity-60"></div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Control Panel */}
      <Card className="bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white border-2 border-purple-500 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-yellow-300 flex items-center">
              <Zap className="h-6 w-6 mr-2 animate-pulse" />
              🏗️ Paradise Builder ({gridSize}x{gridSize})
            </h3>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'isometric' ? 'default' : 'outline'}
                onClick={() => setViewMode('isometric')}
                className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                3D View
              </Button>
              <Button
                variant={viewMode === 'top' ? 'default' : 'outline'}
                onClick={() => setViewMode('top')}
                className="bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg"
              >
                <Eye className="h-4 w-4 mr-2" />
                Top View
              </Button>
              <Button
                variant="outline"
                onClick={() => setRotationAngle(prev => (prev + 45) % 360)}
                className="border-purple-400 text-purple-200 hover:bg-purple-700 shadow-lg"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Rotate
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowGrid(!showGrid)}
                className="border-purple-400 text-purple-200 hover:bg-purple-700 shadow-lg"
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
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg ring-2 ring-emerald-400' 
                    : userCoins < item.price 
                      ? 'opacity-50 bg-gray-700 border-gray-600 text-gray-400' 
                      : 'bg-purple-800 border-purple-600 text-purple-200 hover:bg-purple-700 hover:border-purple-500'
                }`}
                onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                disabled={userCoins < item.price}
              >
                <div className={`p-2 rounded ${selectedItem?.id === item.id ? 'bg-white/20' : 'bg-purple-700'}`}>
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: `h-5 w-5 ${selectedItem?.id === item.id ? 'text-white' : 'text-purple-200'}`
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
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg border border-purple-500">
              <div className="text-center">
                <p className="font-bold text-yellow-300 text-lg">🎯 {selectedItem.name} Selected</p>
                <p className="text-purple-200 mt-1">{selectedItem.description}</p>
                <p className="text-purple-300 text-sm mt-2">
                  {selectedItem.id.includes('grid-expansion') 
                    ? 'Click anywhere to purchase this expansion' 
                    : 'Click on the grid to place your building'
                  }
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced 3D Building Grid */}
      <Card className="bg-gradient-to-br from-emerald-800 via-green-700 to-emerald-900 border-2 border-emerald-500 shadow-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h3 className="text-3xl font-bold text-white drop-shadow-lg">🌍 Your Divine Paradise</h3>
            <p className="text-emerald-200 mt-2">Build your heavenly realm! Grid Size: {gridSize}x{gridSize}</p>
          </div>
          
          <div className="max-w-6xl mx-auto" style={{ perspective: '1500px' }}>
            <div 
              className={`
                grid gap-1 p-6 rounded-xl
                bg-gradient-to-br from-emerald-600 via-green-600 to-emerald-700
                shadow-inner border border-emerald-400/30
                ${viewMode === 'isometric' ? 'transform-style-preserve-3d' : ''}
              `}
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                transform: viewMode === 'isometric' ? 'rotateX(10deg)' : 'none',
                boxShadow: 'inset 0 0 50px rgba(0,0,0,0.3), 0 20px 40px rgba(0,0,0,0.2)'
              }}
            >
              {Array.from({ length: gridSize * gridSize }, (_, index) => {
                const x = index % gridSize;
                const y = Math.floor(index / gridSize);
                return renderCell(x, y);
              })}
            </div>
          </div>

          {/* SimCity-style city stats */}
          {placedItems.length > 0 && (
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-md mx-auto">
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-yellow-400">{placedItems.length}</div>
                <div className="text-sm text-yellow-200">Buildings</div>
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-emerald-400">{placedItems.filter(i => i.item.category === 'nature').length}</div>
                <div className="text-sm text-emerald-200">Nature</div>
              </div>
              <div className="text-center text-white">
                <div className="text-2xl font-bold text-purple-400">{placedItems.reduce((sum, { item }) => sum + item.price, 0)}</div>
                <div className="text-sm text-purple-200">Total Value</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Building List */}
      {placedItems.length > 0 && (
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-2 border-slate-600 shadow-xl">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4 text-yellow-400 flex items-center">
              <Sparkles className="h-6 w-6 mr-2" />
              Paradise Development Report
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {placedItems.map((placedItem, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors duration-200">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${getItemColor(placedItem.item)} shadow-lg border border-white/20`}>
                      {React.cloneElement(placedItem.item.icon as React.ReactElement, {
                        className: "h-5 w-5 text-white"
                      })}
                    </div>
                    <div>
                      <div className="font-bold text-white">{placedItem.item.name}</div>
                      <div className="text-sm text-slate-400">{placedItem.item.intention}</div>
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


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { TreeDeciduous, TreePalm, Trees, Waves, Home, Star, Coins, ShoppingCart, Sparkles } from 'lucide-react';
import Jannah3DBuilder from '@/components/Jannah3DBuilder';
import JannahShop from '@/components/JannahShop';

export interface JannahItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  realProject: string;
  description: string;
  intention: string;
  category: 'nature' | 'structures' | 'special';
  size: '1x1' | '2x2' | '3x3';
}

const jannahItems: JannahItem[] = [
  {
    id: 'palm-tree',
    name: 'Palm Tree',
    icon: <TreePalm className="h-6 w-6" />,
    price: 25,
    realProject: 'Plant fruit trees for communities',
    description: 'A beautiful palm tree for shade and dates',
    intention: 'For sustenance and comfort in Jannah',
    category: 'nature',
    size: '1x1'
  },
  {
    id: 'oak-tree',
    name: 'Oak Tree',
    icon: <TreeDeciduous className="h-6 w-6" />,
    price: 30,
    realProject: 'Reforestation projects',
    description: 'A mighty oak tree symbolizing strength',
    intention: 'For strength and wisdom in the afterlife',
    category: 'nature',
    size: '1x1'
  },
  {
    id: 'forest-grove',
    name: 'Forest Grove',
    icon: <Trees className="h-6 w-6" />,
    price: 100,
    realProject: 'Forest conservation initiatives',
    description: 'A peaceful grove of mixed trees',
    intention: 'For tranquility and natural beauty',
    category: 'nature',
    size: '2x2'
  },
  {
    id: 'waterfall',
    name: 'Heavenly Waterfall',
    icon: <Waves className="h-6 w-6" />,
    price: 200,
    realProject: 'Clean water well projects',
    description: 'A cascading waterfall of pure water',
    intention: 'For endless flowing rivers of paradise',
    category: 'nature',
    size: '2x2'
  },
  {
    id: 'small-palace',
    name: 'Beautiful Dwelling',
    icon: <Home className="h-6 w-6" />,
    price: 500,
    realProject: 'Build homes for families in need',
    description: 'A modest but beautiful dwelling',
    intention: 'For a blessed home in Jannah',
    category: 'structures',
    size: '3x3'
  },
  {
    id: 'grand-palace',
    name: 'Grand Palace',
    icon: <Home className="h-6 w-6" />,
    price: 1000,
    realProject: 'Community center construction',
    description: 'A magnificent palace with gardens',
    intention: 'For the highest levels of paradise',
    category: 'structures',
    size: '3x3'
  }
];

const MyJannah = () => {
  const [userCoins, setUserCoins] = useState(142);
  const [activeTab, setActiveTab] = useState<'build' | 'shop'>('build');
  const [placedItems, setPlacedItems] = useState<Array<{
    item: JannahItem;
    x: number;
    y: number;
  }>>([]);

  const handlePurchaseItem = (item: JannahItem) => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      return true;
    }
    return false;
  };

  const totalSpent = placedItems.reduce((sum, { item }) => sum + item.price, 0);
  const realProjectsFunded = [...new Set(placedItems.map(({ item }) => item.realProject))].length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 rounded-full p-8 shadow-2xl animate-pulse">
              <Sparkles className="h-20 w-20 text-white drop-shadow-lg" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-lg">
            ✨ My Jannah ✨
          </h1>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
            🏗️ Build your dream paradise while supporting real charitable projects! 
            Each item represents your beautiful intentions and helps fund actual causes around the world. 🌍
          </p>
          
          {/* Enhanced Stats */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 backdrop-blur-sm border-2 border-yellow-300 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <Coins className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-yellow-700 mb-1">{userCoins}</div>
                <div className="text-sm text-yellow-600 font-medium">✨ Sadaqah Coins</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 backdrop-blur-sm border-2 border-green-300 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <Star className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">{totalSpent}</div>
                <div className="text-sm text-green-600 font-medium">💝 Coins Donated</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-100 via-violet-100 to-indigo-100 backdrop-blur-sm border-2 border-purple-300 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <ShoppingCart className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">{realProjectsFunded}</div>
                <div className="text-sm text-purple-600 font-medium">🌍 Projects Funded</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border-2 border-white/50">
            <Button
              variant={activeTab === 'build' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('build')}
              className={`rounded-xl px-8 py-3 text-lg font-medium transition-all duration-300 ${
                activeTab === 'build' 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105' 
                  : 'text-blue-600 hover:bg-blue-100'
              }`}
            >
              🏗️ Build My Paradise
            </Button>
            <Button
              variant={activeTab === 'shop' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('shop')}
              className={`rounded-xl px-8 py-3 text-lg font-medium transition-all duration-300 ${
                activeTab === 'shop' 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105' 
                  : 'text-purple-600 hover:bg-purple-100'
              }`}
            >
              🛍️ Heavenly Shop
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'build' ? (
          <Jannah3DBuilder
            items={jannahItems}
            userCoins={userCoins}
            onPurchase={handlePurchaseItem}
            placedItems={placedItems}
            onItemsChange={setPlacedItems}
          />
        ) : (
          <JannahShop
            items={jannahItems}
            userCoins={userCoins}
            onPurchase={handlePurchaseItem}
          />
        )}
      </div>
    </div>
  );
};

export default MyJannah;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { TreeDeciduous, TreePalm, Trees, Waterfall, Palace, Star, Coins, ShoppingCart, Sparkles } from 'lucide-react';
import JannahBuilder from '@/components/JannahBuilder';
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
    icon: <Waterfall className="h-6 w-6" />,
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
    icon: <Palace className="h-6 w-6" />,
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
    icon: <Palace className="h-6 w-6" />,
    price: 1000,
    realProject: 'Community center construction',
    description: 'A magnificent palace with gardens',
    intention: 'For the highest levels of paradise',
    category: 'structures',
    size: '3x3'
  }
];

const MyJannah = () => {
  const [userCoins, setUserCoins] = useState(142); // Get from user stats
  const [activeTab, setActiveTab] = useState<'build' | 'shop'>('build');
  const [placedItems, setPlacedItems] = useState<Array<{
    item: JannahItem;
    x: number;
    y: number;
  }>>([]);

  const handlePurchaseItem = (item: JannahItem) => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      // Item will be placed by the builder component
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
            <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full p-6 shadow-xl">
              <Sparkles className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Jannah
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-6">
            Build your dream space in paradise while supporting real charitable projects. 
            Each item you place represents your intentions and helps fund actual causes.
          </p>
          
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Card className="bg-white/60 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-4 text-center">
                <Coins className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-700">{userCoins}</div>
                <div className="text-sm text-gray-600">Sadaqah Coins</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-green-200">
              <CardContent className="p-4 text-center">
                <Star className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-700">{totalSpent}</div>
                <div className="text-sm text-gray-600">Coins Donated</div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/60 backdrop-blur-sm border-purple-200">
              <CardContent className="p-4 text-center">
                <ShoppingCart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-700">{realProjectsFunded}</div>
                <div className="text-sm text-gray-600">Projects Funded</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-full p-1 shadow-lg">
            <Button
              variant={activeTab === 'build' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('build')}
              className={`rounded-full px-8 py-2 ${activeTab === 'build' ? 'bg-blue-500 text-white' : 'text-blue-600'}`}
            >
              Build My Jannah
            </Button>
            <Button
              variant={activeTab === 'shop' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('shop')}
              className={`rounded-full px-8 py-2 ${activeTab === 'shop' ? 'bg-blue-500 text-white' : 'text-blue-600'}`}
            >
              Heavenly Shop
            </Button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'build' ? (
          <JannahBuilder
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

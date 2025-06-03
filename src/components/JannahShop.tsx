import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Info, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import type { JannahItem } from '@/types/jannah';

interface JannahShopProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
}

const JannahShop: React.FC<JannahShopProps> = ({ items, userCoins, onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nature' | 'structures' | 'special' | 'terrain' | 'decorations' | 'animals' | 'fruits' | 'religious' | 'transport' | 'utilities'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'affordable' | 'expensive'>('all');

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceFilter === 'all' || 
                        (priceFilter === 'affordable' && item.price <= userCoins) ||
                        (priceFilter === 'expensive' && item.price > userCoins);
    
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const categories = [
    { id: 'all', name: 'All Items', count: items.length },
    { id: 'nature', name: 'Nature', count: items.filter(i => i.category === 'nature').length },
    { id: 'structures', name: 'Structures', count: items.filter(i => i.category === 'structures').length },
    { id: 'terrain', name: 'Terrain', count: items.filter(i => i.category === 'terrain').length },
    { id: 'religious', name: 'Religious', count: items.filter(i => i.category === 'religious').length },
    { id: 'animals', name: 'Animals', count: items.filter(i => i.category === 'animals').length },
    { id: 'fruits', name: 'Fruits', count: items.filter(i => i.category === 'fruits').length },
    { id: 'decorations', name: 'Decorations', count: items.filter(i => i.category === 'decorations').length },
    { id: 'transport', name: 'Transport', count: items.filter(i => i.category === 'transport').length },
    { id: 'utilities', name: 'Utilities', count: items.filter(i => i.category === 'utilities').length },
    { id: 'special', name: 'Special', count: items.filter(i => i.category === 'special').length },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      nature: 'border-green-300 text-green-700 bg-green-50',
      structures: 'border-blue-300 text-blue-700 bg-blue-50',
      terrain: 'border-amber-300 text-amber-700 bg-amber-50',
      religious: 'border-purple-300 text-purple-700 bg-purple-50',
      animals: 'border-pink-300 text-pink-700 bg-pink-50',
      fruits: 'border-orange-300 text-orange-700 bg-orange-50',
      decorations: 'border-indigo-300 text-indigo-700 bg-indigo-50',
      transport: 'border-cyan-300 text-cyan-700 bg-cyan-50',
      utilities: 'border-gray-300 text-gray-700 bg-gray-50',
      special: 'border-yellow-300 text-yellow-700 bg-yellow-50',
    };
    return colors[category] || 'border-gray-300 text-gray-700 bg-gray-50';
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="bg-white/70 backdrop-blur-sm border-2 border-white/50 shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for paradise items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 border-2 border-blue-200 focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={priceFilter === 'all' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('all')}
                className="bg-gradient-to-r from-blue-500 to-purple-500"
              >
                All Prices
              </Button>
              <Button
                variant={priceFilter === 'affordable' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('affordable')}
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                Affordable
              </Button>
              <Button
                variant={priceFilter === 'expensive' ? 'default' : 'outline'}
                onClick={() => setPriceFilter('expensive')}
                className="bg-gradient-to-r from-red-500 to-pink-500"
              >
                Premium
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 bg-blue-100 h-auto p-2 gap-1">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white p-3 rounded-lg text-xs"
                >
                  <div className="text-center">
                    <div className="font-medium">{category.name}</div>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {category.count}
                    </Badge>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-white/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full shadow-lg ${getCategoryColor(item.category)}`}>
                    {item.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(item.category)}`}
                    >
                      {item.size} • {item.category}
                    </Badge>
                  </div>
                </div>
                <Badge className={`font-bold ${userCoins >= item.price ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                  {item.price} coins
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">{item.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Heart className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800 text-sm">Spiritual Intention</span>
                  </div>
                  <p className="text-xs text-blue-700">{item.intention}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Info className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800 text-sm">Real World Impact</span>
                  </div>
                  <p className="text-xs text-green-700">{item.realProject}</p>
                </div>
              </div>

              <Button
                className={`w-full text-sm ${
                  userCoins >= item.price
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gray-300'
                } text-white transition-all duration-300`}
                disabled={userCoins < item.price}
                onClick={() => onPurchase(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {userCoins >= item.price ? 
                  (item.id.includes('grid-expansion') ? 'Purchase Expansion' : 'Purchase & Place') 
                  : 'Insufficient Coins'
                }
              </Button>

              {userCoins < item.price && (
                <p className="text-xs text-center text-gray-500">
                  Need {item.price - userCoins} more coins
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Results Summary */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardContent className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">
            {filteredItems.length} Paradise Items Available
          </h3>
          <p className="text-blue-100">
            {selectedCategory === 'all' ? 'Showing all categories' : `Showing ${selectedCategory} category`}
            {searchTerm && ` matching "${searchTerm}"`}
            {priceFilter !== 'all' && ` (${priceFilter} items only)`}
          </p>
        </CardContent>
      </Card>

      {filteredItems.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No items found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JannahShop;

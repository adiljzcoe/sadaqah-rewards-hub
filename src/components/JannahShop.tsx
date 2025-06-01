
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Heart, Info } from 'lucide-react';
import type { JannahItem } from '@/pages/MyJannah';

interface JannahShopProps {
  items: JannahItem[];
  userCoins: number;
  onPurchase: (item: JannahItem) => boolean;
}

const JannahShop: React.FC<JannahShopProps> = ({ items, userCoins, onPurchase }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'nature' | 'structures' | 'special'>('all');

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const categories = [
    { id: 'all', name: 'All Items', count: items.length },
    { id: 'nature', name: 'Nature', count: items.filter(i => i.category === 'nature').length },
    { id: 'structures', name: 'Structures', count: items.filter(i => i.category === 'structures').length },
    { id: 'special', name: 'Special', count: items.filter(i => i.category === 'special').length },
  ];

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <Card className="bg-white/70 backdrop-blur-sm">
        <CardContent className="p-6">
          <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
            <TabsList className="grid w-full grid-cols-4 bg-blue-100">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <div className="text-center">
                    <div>{category.name}</div>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full">
                    {item.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        item.category === 'nature' ? 'border-green-300 text-green-700' :
                        item.category === 'structures' ? 'border-blue-300 text-blue-700' :
                        'border-purple-300 text-purple-700'
                      }`}
                    >
                      {item.size} • {item.category}
                    </Badge>
                  </div>
                </div>
                <Badge className="bg-yellow-500 text-white font-bold">
                  {item.price} coins
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-gray-600">{item.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Heart className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Spiritual Intention</span>
                  </div>
                  <p className="text-sm text-blue-700">{item.intention}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Info className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">Real World Impact</span>
                  </div>
                  <p className="text-sm text-green-700">{item.realProject}</p>
                </div>
              </div>

              <Button
                className={`w-full ${
                  userCoins >= item.price
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                    : 'bg-gray-300'
                } text-white`}
                disabled={userCoins < item.price}
                onClick={() => onPurchase(item)}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {userCoins >= item.price ? 'Purchase & Place' : 'Insufficient Coins'}
              </Button>

              {userCoins < item.price && (
                <p className="text-sm text-center text-gray-500">
                  Need {item.price - userCoins} more coins
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="bg-white/70 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No items in this category</h3>
            <p className="text-gray-500">Try selecting a different category above</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JannahShop;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { TreeDeciduous, TreePalm, Trees, Waves, Home, Star, Coins, ShoppingCart, Sparkles, Mountain, Church, Castle, Tent, Flower, Sun, Moon, Cloud, Fish, Bird, Rabbit, Deer, Apple, Grape, Crown, Diamond, Heart, Gift, Bell, Key, Scroll, Book, Candle, Gem, Shield, Sword, Wand, Music, Camera, Palette, Compass, Anchor, Ship, Plane, Car, Train, Rocket, Building, Factory, Warehouse, School, Hospital, Library, Store, Cafe, Theater } from 'lucide-react';
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
  category: 'nature' | 'structures' | 'special' | 'terrain' | 'decorations' | 'animals' | 'fruits' | 'religious' | 'transport' | 'utilities';
  size: '1x1' | '2x2' | '3x3' | '4x4';
}

const jannahItems: JannahItem[] = [
  // NATURE CATEGORY
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
    id: 'flower-garden',
    name: 'Flower Garden',
    icon: <Flower className="h-6 w-6" />,
    price: 50,
    realProject: 'Community garden projects',
    description: 'Beautiful flowers in eternal bloom',
    intention: 'For beauty and pleasant fragrance',
    category: 'nature',
    size: '1x1'
  },
  {
    id: 'rose-garden',
    name: 'Rose Garden',
    icon: <Flower className="h-6 w-6" />,
    price: 150,
    realProject: 'Botanical garden funding',
    description: 'Magnificent roses that never fade',
    intention: 'For eternal beauty and love',
    category: 'nature',
    size: '2x2'
  },

  // TERRAIN CATEGORY
  {
    id: 'mountain',
    name: 'Sacred Mountain',
    icon: <Mountain className="h-6 w-6" />,
    price: 500,
    realProject: 'Environmental protection initiatives',
    description: 'A majestic mountain peak',
    intention: 'For strength and divine connection',
    category: 'terrain',
    size: '3x3'
  },
  {
    id: 'mountain-range',
    name: 'Mountain Range',
    icon: <Mountain className="h-6 w-6" />,
    price: 1200,
    realProject: 'Mountain conservation projects',
    description: 'A vast range of snow-capped peaks',
    intention: 'For grandeur and majesty',
    category: 'terrain',
    size: '4x4'
  },
  {
    id: 'hill',
    name: 'Rolling Hill',
    icon: <Mountain className="h-6 w-6" />,
    price: 80,
    realProject: 'Land conservation efforts',
    description: 'Gentle rolling hills with green grass',
    intention: 'For peaceful contemplation',
    category: 'terrain',
    size: '2x2'
  },
  {
    id: 'valley',
    name: 'Peaceful Valley',
    icon: <Mountain className="h-6 w-6" />,
    price: 300,
    realProject: 'Valley ecosystem protection',
    description: 'A serene valley with flowing streams',
    intention: 'For tranquility and reflection',
    category: 'terrain',
    size: '3x3'
  },

  // STRUCTURES CATEGORY
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
  },
  {
    id: 'mosque',
    name: 'Beautiful Mosque',
    icon: <Church className="h-6 w-6" />,
    price: 800,
    realProject: 'Mosque construction and maintenance',
    description: 'A stunning mosque with minarets',
    intention: 'For worship and spiritual connection',
    category: 'structures',
    size: '3x3'
  },
  {
    id: 'castle',
    name: 'Heavenly Castle',
    icon: <Castle className="h-6 w-6" />,
    price: 1500,
    realProject: 'Historical preservation projects',
    description: 'A magnificent castle fortress',
    intention: 'For protection and nobility',
    category: 'structures',
    size: '4x4'
  },
  {
    id: 'tent',
    name: 'Nomad Tent',
    icon: <Tent className="h-6 w-6" />,
    price: 150,
    realProject: 'Refugee shelter programs',
    description: 'A comfortable traditional tent',
    intention: 'For simplicity and humility',
    category: 'structures',
    size: '2x2'
  },
  {
    id: 'library',
    name: 'Knowledge Library',
    icon: <Library className="h-6 w-6" />,
    price: 600,
    realProject: 'Library construction in underserved areas',
    description: 'A library filled with eternal wisdom',
    intention: 'For knowledge and learning',
    category: 'structures',
    size: '3x3'
  },
  {
    id: 'school',
    name: 'Learning Academy',
    icon: <School className="h-6 w-6" />,
    price: 700,
    realProject: 'School building projects',
    description: 'An academy for divine knowledge',
    intention: 'For education and enlightenment',
    category: 'structures',
    size: '3x3'
  },
  {
    id: 'hospital',
    name: 'Healing Center',
    icon: <Hospital className="h-6 w-6" />,
    price: 900,
    realProject: 'Medical facility construction',
    description: 'A center of healing and care',
    intention: 'For health and compassion',
    category: 'structures',
    size: '3x3'
  },

  // RELIGIOUS CATEGORY
  {
    id: 'prayer-mat',
    name: 'Prayer Mat',
    icon: <Scroll className="h-6 w-6" />,
    price: 25,
    realProject: 'Provide prayer mats to communities',
    description: 'A blessed mat for prayer',
    intention: 'For devotion and connection to Allah',
    category: 'religious',
    size: '1x1'
  },
  {
    id: 'holy-book',
    name: 'Holy Quran',
    icon: <Book className="h-6 w-6" />,
    price: 100,
    realProject: 'Distribute Qurans to communities',
    description: 'The noble Quran in beautiful binding',
    intention: 'For guidance and divine wisdom',
    category: 'religious',
    size: '1x1'
  },
  {
    id: 'minaret',
    name: 'Minaret Tower',
    icon: <Church className="h-6 w-6" />,
    price: 400,
    realProject: 'Mosque minaret construction',
    description: 'A tall minaret calling to prayer',
    intention: 'For calling believers to worship',
    category: 'religious',
    size: '1x1'
  },
  {
    id: 'mihrab',
    name: 'Prayer Niche',
    icon: <Church className="h-6 w-6" />,
    price: 300,
    realProject: 'Mosque interior improvements',
    description: 'A beautiful mihrab for prayer direction',
    intention: 'For proper worship orientation',
    category: 'religious',
    size: '1x1'
  },
  {
    id: 'fountain',
    name: 'Ablution Fountain',
    icon: <Waves className="h-6 w-6" />,
    price: 250,
    realProject: 'Water facility improvements',
    description: 'A fountain for purification',
    intention: 'For cleanliness and purity',
    category: 'religious',
    size: '2x2'
  },

  // ANIMALS CATEGORY
  {
    id: 'peacock',
    name: 'Paradise Peacock',
    icon: <Bird className="h-6 w-6" />,
    price: 200,
    realProject: 'Wildlife conservation programs',
    description: 'A magnificent peacock with golden feathers',
    intention: 'For beauty and divine creation',
    category: 'animals',
    size: '1x1'
  },
  {
    id: 'dove',
    name: 'Peace Dove',
    icon: <Bird className="h-6 w-6" />,
    price: 75,
    realProject: 'Bird sanctuary funding',
    description: 'A white dove symbolizing peace',
    intention: 'For peace and tranquility',
    category: 'animals',
    size: '1x1'
  },
  {
    id: 'deer',
    name: 'Gentle Deer',
    icon: <Deer className="h-6 w-6" />,
    price: 150,
    realProject: 'Wildlife habitat protection',
    description: 'A graceful deer in eternal youth',
    intention: 'For gentleness and grace',
    category: 'animals',
    size: '1x1'
  },
  {
    id: 'rabbit',
    name: 'Paradise Rabbit',
    icon: <Rabbit className="h-6 w-6" />,
    price: 50,
    realProject: 'Animal welfare programs',
    description: 'A soft rabbit that brings joy',
    intention: 'For innocence and joy',
    category: 'animals',
    size: '1x1'
  },
  {
    id: 'fish',
    name: 'Golden Fish',
    icon: <Fish className="h-6 w-6" />,
    price: 100,
    realProject: 'Aquatic ecosystem restoration',
    description: 'Golden fish in crystal clear waters',
    intention: 'For abundance and prosperity',
    category: 'animals',
    size: '1x1'
  },

  // FRUITS CATEGORY
  {
    id: 'apple-tree',
    name: 'Apple Tree',
    icon: <Apple className="h-6 w-6" />,
    price: 80,
    realProject: 'Fruit tree planting programs',
    description: 'A tree bearing eternal apples',
    intention: 'For sustenance and sweetness',
    category: 'fruits',
    size: '1x1'
  },
  {
    id: 'grape-vine',
    name: 'Grape Vine',
    icon: <Grape className="h-6 w-6" />,
    price: 120,
    realProject: 'Agricultural development projects',
    description: 'Vines heavy with perfect grapes',
    intention: 'For abundance and divine blessing',
    category: 'fruits',
    size: '2x2'
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate Tree',
    icon: <Apple className="h-6 w-6" />,
    price: 150,
    realProject: 'Orchard establishment programs',
    description: 'A tree with ruby pomegranates',
    intention: 'For abundance and health',
    category: 'fruits',
    size: '1x1'
  },
  {
    id: 'date-palm',
    name: 'Date Palm Grove',
    icon: <TreePalm className="h-6 w-6" />,
    price: 300,
    realProject: 'Date palm cultivation projects',
    description: 'A grove of date palms',
    intention: 'For blessed sustenance',
    category: 'fruits',
    size: '2x2'
  },

  // DECORATIONS CATEGORY
  {
    id: 'golden-crown',
    name: 'Crown of Honor',
    icon: <Crown className="h-6 w-6" />,
    price: 1000,
    realProject: 'Leadership development programs',
    description: 'A crown of pure gold and jewels',
    intention: 'For honor and righteousness',
    category: 'decorations',
    size: '1x1'
  },
  {
    id: 'diamond',
    name: 'Eternal Diamond',
    icon: <Diamond className="h-6 w-6" />,
    price: 800,
    realProject: 'Precious resource conservation',
    description: 'A diamond of perfect clarity',
    intention: 'For purity and eternal value',
    category: 'decorations',
    size: '1x1'
  },
  {
    id: 'golden-bell',
    name: 'Heavenly Bell',
    icon: <Bell className="h-6 w-6" />,
    price: 250,
    realProject: 'Community gathering space creation',
    description: 'A bell with the sweetest sound',
    intention: 'For calling to prayer and celebration',
    category: 'decorations',
    size: '1x1'
  },
  {
    id: 'candle',
    name: 'Eternal Candle',
    icon: <Candle className="h-6 w-6" />,
    price: 75,
    realProject: 'Lighting for communities',
    description: 'A candle that never burns out',
    intention: 'For guidance and divine light',
    category: 'decorations',
    size: '1x1'
  },
  {
    id: 'gem',
    name: 'Precious Gem',
    icon: <Gem className="h-6 w-6" />,
    price: 500,
    realProject: 'Jewelry for brides in need',
    description: 'A gem of incredible beauty',
    intention: 'For beauty and divine favor',
    category: 'decorations',
    size: '1x1'
  },

  // UTILITIES CATEGORY
  {
    id: 'well',
    name: 'Water Well',
    icon: <Waves className="h-6 w-6" />,
    price: 400,
    realProject: 'Clean water well construction',
    description: 'A well of pure, sweet water',
    intention: 'For life and purification',
    category: 'utilities',
    size: '1x1'
  },
  {
    id: 'bridge',
    name: 'Golden Bridge',
    icon: <Waves className="h-6 w-6" />,
    price: 600,
    realProject: 'Bridge construction projects',
    description: 'A beautiful bridge over paradise rivers',
    intention: 'For connection and passage',
    category: 'utilities',
    size: '3x3'
  },
  {
    id: 'lamp-post',
    name: 'Divine Lamp',
    icon: <Candle className="h-6 w-6" />,
    price: 100,
    realProject: 'Street lighting for communities',
    description: 'A lamp that illuminates the path',
    intention: 'For guidance and safety',
    category: 'utilities',
    size: '1x1'
  },

  // TRANSPORT CATEGORY
  {
    id: 'ship',
    name: 'Paradise Ship',
    icon: <Ship className="h-6 w-6" />,
    price: 800,
    realProject: 'Maritime rescue operations',
    description: 'A beautiful ship for heavenly seas',
    intention: 'For journey and exploration',
    category: 'transport',
    size: '3x3'
  },
  {
    id: 'flying-carpet',
    name: 'Flying Carpet',
    icon: <Plane className="h-6 w-6" />,
    price: 1200,
    realProject: 'Transportation for remote communities',
    description: 'A magical carpet for flying',
    intention: 'For swift travel through paradise',
    category: 'transport',
    size: '2x2'
  },
  {
    id: 'chariot',
    name: 'Golden Chariot',
    icon: <Car className="h-6 w-6" />,
    price: 600,
    realProject: 'Vehicle provision for families',
    description: 'A chariot of pure gold',
    intention: 'For royal travel',
    category: 'transport',
    size: '2x2'
  },

  // SPECIAL CATEGORY  
  {
    id: 'throne',
    name: 'Throne of Glory',
    icon: <Crown className="h-6 w-6" />,
    price: 2000,
    realProject: 'Leadership center construction',
    description: 'A magnificent throne of honor',
    intention: 'For divine authority and justice',
    category: 'special',
    size: '3x3'
  },
  {
    id: 'rainbow',
    name: 'Eternal Rainbow',
    icon: <Sun className="h-6 w-6" />,
    price: 1500,
    realProject: 'Environmental restoration projects',
    description: 'A rainbow that never fades',
    intention: 'For divine promise and beauty',
    category: 'special',
    size: '4x4'
  },
  {
    id: 'star',
    name: 'Guiding Star',
    icon: <Star className="h-6 w-6" />,
    price: 300,
    realProject: 'Navigation aid for communities',
    description: 'A bright star for guidance',
    intention: 'For divine guidance and hope',
    category: 'special',
    size: '1x1'
  },
  {
    id: 'sun',
    name: 'Divine Sun',
    icon: <Sun className="h-6 w-6" />,
    price: 2500,
    realProject: 'Solar energy projects',
    description: 'A sun that brings eternal warmth',
    intention: 'For light and divine energy',
    category: 'special',
    size: '4x4'
  },
  {
    id: 'moon',
    name: 'Sacred Moon',
    icon: <Moon className="h-6 w-6" />,
    price: 2000,
    realProject: 'Night lighting for communities',
    description: 'A moon of perfect silver light',
    intention: 'For peaceful nights and reflection',
    category: 'special',
    size: '3x3'
  },
  {
    id: 'cloud',
    name: 'Blessed Cloud',
    icon: <Cloud className="h-6 w-6" />,
    price: 800,
    realProject: 'Weather protection systems',
    description: 'A cloud that brings gentle shade',
    intention: 'For comfort and divine mercy',
    category: 'special',
    size: '2x2'
  },

  // GRID EXPANSION ITEMS
  {
    id: 'grid-expansion-small',
    name: 'Small Land Plot',
    icon: <Building className="h-6 w-6" />,
    price: 1000,
    realProject: 'Land acquisition for communities',
    description: 'Expand your paradise by 4x4 squares',
    intention: 'For growth and expansion',
    category: 'special',
    size: '1x1'
  },
  {
    id: 'grid-expansion-medium',
    name: 'Medium Territory',
    icon: <Building className="h-6 w-6" />,
    price: 2500,
    realProject: 'Community land development',
    description: 'Expand your paradise by 6x6 squares',
    intention: 'For prosperity and development',
    category: 'special',
    size: '1x1'
  },
  {
    id: 'grid-expansion-large',
    name: 'Grand Estate',
    icon: <Building className="h-6 w-6" />,
    price: 5000,
    realProject: 'Large-scale community development',
    description: 'Expand your paradise by 8x8 squares',
    intention: 'For magnificent expansion',
    category: 'special',
    size: '1x1'
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
  const [gridSize, setGridSize] = useState(12);

  const handlePurchaseItem = (item: JannahItem) => {
    if (userCoins >= item.price) {
      setUserCoins(prev => prev - item.price);
      
      // Handle grid expansion items
      if (item.id.includes('grid-expansion')) {
        if (item.id === 'grid-expansion-small') {
          setGridSize(prev => prev + 4);
        } else if (item.id === 'grid-expansion-medium') {
          setGridSize(prev => prev + 6);
        } else if (item.id === 'grid-expansion-large') {
          setGridSize(prev => prev + 8);
        }
        return true; // Don't place on grid, just expand
      }
      
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
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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

            <Card className="bg-gradient-to-br from-blue-100 via-cyan-100 to-sky-100 backdrop-blur-sm border-2 border-blue-300 shadow-xl hover:scale-105 transition-transform duration-300">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full p-4 w-fit mx-auto mb-4 shadow-lg">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{gridSize}x{gridSize}</div>
                <div className="text-sm text-blue-600 font-medium">🏞️ Paradise Size</div>
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
              🛍️ Heavenly Shop ({jannahItems.length} items)
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
            gridSize={gridSize}
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

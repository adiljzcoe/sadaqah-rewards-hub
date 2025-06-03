
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';

const donationProducts = [
  {
    id: '1',
    title: 'Qurbani - 1 Sheep Share',
    charity: 'Islamic Relief',
    description: 'Complete Qurbani sacrifice of one sheep share, meat distributed to needy families',
    price: 50,
    currency: '£',
    beneficiaries: 8,
    timeframe: 'Immediate',
    category: 'Qurbani',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    isFixedPrice: true,
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Orphan Care Package - Gaza',
    charity: 'Islamic Relief',
    description: 'Provide essential care, education, and support for orphaned children in Gaza',
    currency: '£',
    beneficiaries: 1,
    timeframe: '3 Months',
    category: 'Orphan Care',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    priceOptions: [
      { amount: 30, description: 'Basic care package' },
      { amount: 50, description: 'Standard care package' },
      { amount: 75, description: 'Premium care package' },
      { amount: 100, description: 'Full support package' }
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Clean Water Well Construction',
    charity: 'Muslim Aid',
    description: 'Build a sustainable water well providing clean water access to rural communities',
    currency: '£',
    beneficiaries: 200,
    timeframe: 'Permanent',
    category: 'Water',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png',
    isAnyAmount: true,
    suggestedAmounts: [50, 100, 250, 500, 1000],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '4',
    title: 'Emergency Food Parcel',
    charity: 'Human Appeal',
    description: 'Nutritious food supplies for families facing crisis and hunger',
    currency: '£',
    beneficiaries: 5,
    timeframe: '1 Month',
    category: 'Emergency Aid',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png',
    priceOptions: [
      { amount: 25, description: '1 family for 1 week' },
      { amount: 50, description: '1 family for 2 weeks' },
      { amount: 75, description: '1 family for 3 weeks' },
      { amount: 100, description: '1 family for 1 month' }
    ],
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop'
  },
  {
    id: '5',
    title: 'Qurbani - Cow Share (1/7)',
    charity: 'Penny Appeal',
    description: 'One share of a cow sacrifice, feeding approximately 14 families',
    price: 85,
    currency: '£',
    beneficiaries: 14,
    timeframe: 'Immediate',
    category: 'Qurbani',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/c0de76a9-1b20-40f0-9742-4f2f011193af.png',
    isFixedPrice: true,
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=500&h=300&fit=crop'
  },
  {
    id: '6',
    title: 'School Building Project',
    charity: 'Penny Appeal',
    description: 'Construct classrooms and provide educational resources for children',
    currency: '£',
    beneficiaries: 100,
    timeframe: 'Permanent',
    category: 'Education',
    isPopular: false,
    isNew: false,
    charityLogo: '/lovable-uploads/c0de76a9-1b20-40f0-9742-4f2f011193af.png',
    isAnyAmount: true,
    suggestedAmounts: [25, 50, 100, 200, 500],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop'
  },
  {
    id: '7',
    title: 'Medical Aid Package',
    charity: 'Islamic Relief',
    description: 'Essential medical supplies and treatment for those in need',
    currency: '£',
    beneficiaries: 10,
    timeframe: '3 Months',
    category: 'Healthcare',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    priceOptions: [
      { amount: 35, description: 'Basic medical kit' },
      { amount: 75, description: 'Advanced medical kit' },
      { amount: 150, description: 'Complete treatment package' }
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop'
  },
  {
    id: '8',
    title: 'Iftar Meal for 50 People',
    charity: 'Muslim Hands',
    description: 'Provide complete iftar meals for 50 fasting individuals during Ramadan',
    price: 35,
    currency: '£',
    beneficiaries: 50,
    timeframe: 'Immediate',
    category: 'Seasonal',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png',
    isFixedPrice: true,
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=500&h=300&fit=crop'
  },
  {
    id: '9',
    title: 'Widow Support Program',
    charity: 'Muslim Hands',
    description: 'Comprehensive support including food, healthcare, and skills training',
    currency: '£',
    beneficiaries: 1,
    timeframe: '6 Months',
    category: 'Social Support',
    isPopular: false,
    isNew: false,
    charityLogo: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png',
    isAnyAmount: true,
    suggestedAmounts: [20, 40, 60, 80, 120],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=300&fit=crop'
  },
  {
    id: '10',
    title: 'Zakat ul-Fitr per Person',
    charity: 'Human Appeal',
    description: 'Obligatory charity paid at the end of Ramadan, feeds one person',
    price: 5,
    currency: '£',
    beneficiaries: 1,
    timeframe: 'Immediate',
    category: 'Zakat',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png',
    isFixedPrice: true,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&h=300&fit=crop'
  },
  {
    id: '11',
    title: 'Palestine Emergency Relief',
    charity: 'Islamic Relief',
    description: 'Urgent humanitarian aid for families affected by the crisis in Palestine',
    currency: '£',
    beneficiaries: 5,
    timeframe: 'Immediate',
    category: 'Emergency Aid',
    isPopular: true,
    isNew: true,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    isAnyAmount: true,
    suggestedAmounts: [10, 25, 50, 100, 250],
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: '12',
    title: 'Educational Sponsorship',
    charity: 'Penny Appeal',
    description: 'Sponsor a child\'s education including books, uniform, and school fees',
    currency: '£',
    beneficiaries: 1,
    timeframe: '1 Year',
    category: 'Education',
    isPopular: false,
    isNew: false,
    charityLogo: '/lovable-uploads/c0de76a9-1b20-40f0-9742-4f2f011193af.png',
    priceOptions: [
      { amount: 120, description: 'Primary education (per year)' },
      { amount: 180, description: 'Secondary education (per year)' },
      { amount: 240, description: 'Higher education (per year)' }
    ],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop'
  }
];

const categories = ['All', 'Qurbani', 'Orphan Care', 'Water', 'Emergency Aid', 'Education', 'Healthcare', 'Social Support', 'Seasonal', 'Zakat'];

const DonationProducts: React.FC = () => {
  const [sortBy, setSortBy] = useState('popular');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = donationProducts
    .filter(product => selectedCategory === 'All' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'new':
          return Number(b.isNew) - Number(a.isNew);
        case 'popular':
          return Number(b.isPopular) - Number(a.isPopular);
        case 'price-low':
          const aPrice = a.price || (a.priceOptions?.[0]?.amount) || (a.suggestedAmounts?.[0]) || 0;
          const bPrice = b.price || (b.priceOptions?.[0]?.amount) || (b.suggestedAmounts?.[0]) || 0;
          return aPrice - bPrice;
        case 'price-high':
          const aPriceHigh = a.price || (a.priceOptions?.[0]?.amount) || (a.suggestedAmounts?.[0]) || 0;
          const bPriceHigh = b.price || (b.priceOptions?.[0]?.amount) || (b.suggestedAmounts?.[0]) || 0;
          return bPriceHigh - aPriceHigh;
        default:
          return 0;
      }
    });

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Donation Products
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Choose from our curated donation products - one-off purchases dedicated to specific charities and causes
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 space-y-4 sm:space-y-0">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm ${
                selectedCategory === category 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'hover:bg-gray-100'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Sort and View Controls */}
        <div className="flex items-center space-x-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="new">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </p>
      </div>

      {/* Products Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more products.</p>
        </div>
      )}
    </section>
  );
};

export default DonationProducts;

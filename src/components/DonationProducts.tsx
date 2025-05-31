
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';

const donationProducts = [
  {
    id: '1',
    title: 'Orphan Care Package - Gaza',
    charity: 'Islamic Relief',
    description: 'Provide essential care, education, and support for orphaned children in Gaza',
    price: 50,
    currency: '£',
    beneficiaries: 1,
    timeframe: 'Monthly',
    category: 'Orphan Care',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png'
  },
  {
    id: '2',
    title: 'Clean Water Well Construction',
    charity: 'Muslim Aid',
    description: 'Build a sustainable water well providing clean water access to rural communities',
    price: 300,
    currency: '£',
    beneficiaries: 200,
    timeframe: 'Permanent',
    category: 'Water',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png'
  },
  {
    id: '3',
    title: 'Emergency Food Parcel',
    charity: 'Human Appeal',
    description: 'Nutritious food supplies for families facing crisis and hunger',
    price: 25,
    currency: '£',
    beneficiaries: 5,
    timeframe: '1 Month',
    category: 'Emergency Aid',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png'
  },
  {
    id: '4',
    title: 'School Building Project',
    charity: 'Penny Appeal',
    description: 'Construct classrooms and provide educational resources for children',
    price: 150,
    currency: '£',
    beneficiaries: 100,
    timeframe: 'Permanent',
    category: 'Education',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/c0de76a9-1b20-40f0-9742-4f2f011193af.png'
  },
  {
    id: '5',
    title: 'Medical Aid Package',
    charity: 'Islamic Relief',
    description: 'Essential medical supplies and treatment for those in need',
    price: 75,
    currency: '£',
    beneficiaries: 10,
    timeframe: '3 Months',
    category: 'Healthcare',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png'
  },
  {
    id: '6',
    title: 'Widow Support Program',
    charity: 'Muslim Hands',
    description: 'Comprehensive support including food, healthcare, and skills training',
    price: 40,
    currency: '£',
    beneficiaries: 1,
    timeframe: 'Monthly',
    category: 'Social Support',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png'
  }
];

const categories = ['All', 'Orphan Care', 'Water', 'Emergency Aid', 'Education', 'Healthcare', 'Social Support'];

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
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
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
          Choose from our curated donation products, each dedicated to specific charities and causes
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
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
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

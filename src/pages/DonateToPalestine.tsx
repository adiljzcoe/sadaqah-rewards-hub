import React, { useState } from 'react';
import { Heart, Users, Home, Droplets, GraduationCap, Cross, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';

const palestineProducts = [
  {
    id: 'palestine-emergency-1',
    title: 'Palestine Emergency Food Parcel',
    charity: 'Islamic Relief',
    description: 'Urgent food supplies for Palestinian families facing severe hunger and displacement',
    currency: '£',
    beneficiaries: 8,
    timeframe: 'Immediate',
    category: 'Emergency Aid',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    priceOptions: [
      { amount: 25, description: 'Emergency food for 1 week' },
      { amount: 50, description: 'Sustenance for 2 weeks' },
      { amount: 100, description: 'Monthly food support' },
      { amount: 200, description: 'Extended family support' }
    ],
    image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'palestine-orphan-1',
    title: 'Palestinian Orphan Sponsorship',
    charity: 'Human Appeal',
    description: 'Provide comprehensive care, education, and hope for Palestinian orphaned children',
    currency: '£',
    beneficiaries: 1,
    timeframe: '12 Months',
    category: 'Orphan Care',
    isPopular: true,
    isNew: true,
    charityLogo: '/lovable-uploads/b32b5f9f-a787-4187-a2ca-4df4318d3a47.png',
    priceOptions: [
      { amount: 35, description: 'Monthly basic care' },
      { amount: 70, description: 'Monthly care + education' },
      { amount: 105, description: 'Monthly comprehensive support' },
      { amount: 420, description: '4 months full sponsorship' }
    ],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'palestine-medical-1',
    title: 'Palestine Medical Emergency Kit',
    charity: 'Muslim Aid',
    description: 'Life-saving medical supplies and treatment for injured Palestinians',
    currency: '£',
    beneficiaries: 15,
    timeframe: 'Immediate',
    category: 'Healthcare',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/58535c26-0f91-49b5-8e89-2efe9af55d06.png',
    priceOptions: [
      { amount: 40, description: 'Basic medical kit' },
      { amount: 80, description: 'Advanced trauma kit' },
      { amount: 160, description: 'Complete emergency supplies' },
      { amount: 320, description: 'Mobile clinic support' }
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop'
  },
  {
    id: 'palestine-water-1',
    title: 'Clean Water for Gaza',
    charity: 'Penny Appeal',
    description: 'Provide clean, safe drinking water to Palestinian families in desperate need',
    currency: '£',
    beneficiaries: 50,
    timeframe: '6 Months',
    category: 'Water & Sanitation',
    isPopular: true,
    isNew: false,
    charityLogo: '/lovable-uploads/c0de76a9-1b20-40f0-9742-4f2f011193af.png',
    isAnyAmount: true,
    suggestedAmounts: [20, 50, 100, 250, 500],
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&h=300&fit=crop',
    video: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 'palestine-shelter-1',
    title: 'Emergency Shelter for Displaced Families',
    charity: 'Muslim Hands',
    description: 'Temporary housing and shelter materials for Palestinian families who have lost their homes',
    currency: '£',
    beneficiaries: 6,
    timeframe: '3 Months',
    category: 'Shelter & Housing',
    isPopular: false,
    isNew: true,
    charityLogo: '/lovable-uploads/7632d030-2eb4-430d-9c4c-8061492eceec.png',
    priceOptions: [
      { amount: 75, description: 'Temporary shelter kit' },
      { amount: 150, description: 'Family shelter package' },
      { amount: 300, description: 'Extended family housing' },
      { amount: 600, description: 'Community shelter support' }
    ],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=500&h=300&fit=crop'
  },
  {
    id: 'palestine-education-1',
    title: 'Education for Palestinian Children',
    charity: 'Islamic Relief',
    description: 'School supplies, books, and educational support for Palestinian children',
    currency: '£',
    beneficiaries: 25,
    timeframe: '1 Year',
    category: 'Education',
    isPopular: false,
    isNew: false,
    charityLogo: '/lovable-uploads/49be05e7-6fbc-418e-a4a2-d602629d4036.png',
    isAnyAmount: true,
    suggestedAmounts: [15, 30, 60, 120, 240],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500&h=300&fit=crop'
  }
];

const categories = [
  { value: 'all', label: 'All Categories', icon: Heart },
  { value: 'Emergency Aid', label: 'Emergency Aid', icon: Heart },
  { value: 'Orphan Care', label: 'Orphan Care', icon: Users },
  { value: 'Healthcare', label: 'Healthcare', icon: Cross },
  { value: 'Water & Sanitation', label: 'Water & Sanitation', icon: Droplets },
  { value: 'Shelter & Housing', label: 'Shelter & Housing', icon: Home },
  { value: 'Education', label: 'Education', icon: GraduationCap }
];

const DonateToPalestine = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const filteredProducts = palestineProducts
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return Number(b.isPopular) - Number(a.isPopular);
        case 'new':
          return Number(b.isNew) - Number(a.isNew);
        case 'urgent':
          return a.timeframe === 'Immediate' ? -1 : 1;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-r from-red-600 to-green-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Donate to Palestine 🇵🇸
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Stand with Palestine. Every donation saves lives and brings hope to families in crisis.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <Badge className="bg-red-500 text-white px-6 py-2 text-lg">
                🚨 URGENT: Lives depend on your help
              </Badge>
              <Badge className="bg-green-500 text-white px-6 py-2 text-lg">
                💚 100% of donations reach Palestine
              </Badge>
            </div>
            
            {/* Video Section */}
            <div className="max-w-3xl mx-auto mb-8">
              <div className="relative rounded-xl overflow-hidden shadow-2xl bg-black/50 p-4">
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-white mb-4 mx-auto" />
                    <p className="text-white text-lg">Watch: The Reality in Palestine</p>
                    <p className="text-gray-300 text-sm">See how your donation makes a difference</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-red-200 mb-2">2.3M+</div>
                <div className="text-white">Palestinians in Need</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-green-200 mb-2">85%</div>
                <div className="text-white">Children Under 18</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl font-bold text-yellow-200 mb-2">24/7</div>
                <div className="text-white">Emergency Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Appeal Section */}
      <section className="py-12 bg-red-50 border-t-4 border-red-500">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-red-800 mb-6">
              🚨 URGENT: Palestine Emergency Appeal
            </h2>
            <p className="text-lg text-red-700 mb-8">
              Families in Gaza and the West Bank are facing an unprecedented humanitarian crisis. 
              Children are going without food, clean water, or medical care. Your donation today 
              can be the difference between life and death for a Palestinian family.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-red-500">
                <h3 className="text-xl font-bold text-red-800 mb-3">Immediate Needs</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• Emergency food parcels for displaced families</li>
                  <li>• Clean water and sanitation facilities</li>
                  <li>• Medical supplies and trauma care</li>
                  <li>• Temporary shelter for the homeless</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 mb-3">Your Impact</h3>
                <ul className="text-left space-y-2 text-gray-700">
                  <li>• £25 feeds a family for one week</li>
                  <li>• £50 provides clean water for 50 people</li>
                  <li>• £100 sponsors an orphan for a month</li>
                  <li>• £200 funds emergency medical care</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Why Donate to Palestine Through Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Trusted Charities</h3>
                <p className="text-sm text-gray-600">Only verified organizations working directly in Palestine</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Direct Impact</h3>
                <p className="text-sm text-gray-600">100% of donations reach Palestinian families in need</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Droplets className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Transparent</h3>
                <p className="text-sm text-gray-600">Track your donation and see real updates from the field</p>
              </div>
              <div className="text-center">
                <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">Emergency Response</h3>
                <p className="text-sm text-gray-600">Immediate deployment of aid to the most urgent areas</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-red-50 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Every Donation Counts for Palestine
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When you donate to Palestine through our platform, you're not just sending money – 
                you're sending hope, dignity, and life-saving support to families who have lost everything. 
                Our partner charities have been working in Palestine for decades, ensuring your donation 
                reaches those who need it most, when they need it most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Palestine Donation Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose how you want to help Palestinian families. Each donation product is designed 
              to address specific urgent needs on the ground.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`text-sm ${
                      selectedCategory === category.value 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {category.label}
                  </Button>
                );
              })}
            </div>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="urgent">Most Urgent</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} Palestine donation option{filteredProducts.length !== 1 ? 's' : ''}
              {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="text-gray-400 text-6xl mb-4">🇵🇸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No donation options found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more ways to help Palestine.</p>
            </div>
          )}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Palestine Needs You Today
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait. Every moment counts when lives are at stake. 
            Your donation today can bring immediate relief to a Palestinian family in crisis.
          </p>
          <div className="space-y-4">
            <div className="text-lg font-semibold">
              🤲 "Whoever saves a life, it is as if he has saved all of mankind" - Quran 5:32
            </div>
            <Button 
              size="lg" 
              className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Donate to Palestine Now 🇵🇸
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonateToPalestine;

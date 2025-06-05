import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Search, Filter, Star, Gift } from 'lucide-react';
import DuaCard from '@/components/duas-library/DuaCard';
import DuaDonationDialog from '@/components/duas-library/DuaDonationDialog';

interface DuaCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  sort_order: number;
}

interface DuaLibraryItem {
  id: string;
  title: string;
  arabic_text: string;
  transliteration: string;
  translation: string;
  reference: string;
  benefits: string;
  when_to_recite: string;
  recommended_donation_amount: number;
  is_featured: boolean;
  category_id: string;
  dua_categories?: DuaCategory;
}

const DuasLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDua, setSelectedDua] = useState<DuaLibraryItem | null>(null);
  const [showDonationDialog, setShowDonationDialog] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['dua-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dua_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');
      if (error) throw error;
      return data as DuaCategory[];
    }
  });

  // Fetch duas
  const { data: duas, isLoading } = useQuery({
    queryKey: ['duas-library', selectedCategory, searchTerm],
    queryFn: async () => {
      let query = supabase
        .from('duas_library')
        .select(`
          *,
          dua_categories(*)
        `)
        .eq('is_active', true);

      if (selectedCategory !== 'all') {
        query = query.eq('category_id', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,translation.ilike.%${searchTerm}%,benefits.ilike.%${searchTerm}%`);
      }

      query = query.order('is_featured', { ascending: false })
                   .order('title');

      const { data, error } = await query;
      if (error) throw error;
      return data as DuaLibraryItem[];
    }
  });

  const featuredDuas = duas?.filter(dua => dua.is_featured) || [];
  const regularDuas = duas?.filter(dua => !dua.is_featured) || [];

  const handleDonate = (dua: DuaLibraryItem) => {
    setSelectedDua(dua);
    setShowDonationDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <Header />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Duas Library & Donations
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover beautiful duas, make donations in their honor, and support those in need
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="browse" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="browse">Browse Duas</TabsTrigger>
              <TabsTrigger value="featured">Featured Duas</TabsTrigger>
            </TabsList>

            <TabsContent value="browse">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search duas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {categories?.map((category) => (
                  <Card 
                    key={category.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedCategory === category.id ? 'ring-2 ring-green-500' : ''
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">{category.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Duas Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-20 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularDuas.map((dua) => (
                    <DuaCard
                      key={dua.id}
                      dua={dua}
                      onDonate={() => handleDonate(dua)}
                    />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="featured">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Duas</h2>
                <p className="text-gray-600">Most powerful and recommended duas from authentic sources</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredDuas.map((dua) => (
                  <Card key={dua.id} className="border-2 border-yellow-200 bg-yellow-50/50">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <Badge className="bg-yellow-500 text-white">Featured</Badge>
                      </div>
                      <CardTitle className="text-xl">{dua.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-white p-4 rounded-lg border">
                        <p className="text-right text-xl leading-relaxed mb-3" dir="rtl">
                          {dua.arabic_text}
                        </p>
                        <p className="text-sm text-gray-600 italic mb-2">
                          {dua.transliteration}
                        </p>
                        <p className="text-gray-800">
                          {dua.translation}
                        </p>
                      </div>
                      
                      {dua.reference && (
                        <div className="text-sm text-gray-600">
                          <strong>Reference:</strong> {dua.reference}
                        </div>
                      )}
                      
                      {dua.benefits && (
                        <div className="text-sm text-green-700 bg-green-50 p-3 rounded">
                          <strong>Benefits:</strong> {dua.benefits}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4">
                        <div className="text-sm text-gray-600">
                          Recommended: £{(dua.recommended_donation_amount / 100).toFixed(2)}
                        </div>
                        <Button onClick={() => handleDonate(dua)} className="bg-green-600 hover:bg-green-700">
                          <Gift className="h-4 w-4 mr-2" />
                          Donate
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <DuaDonationDialog
        dua={selectedDua}
        open={showDonationDialog}
        onOpenChange={setShowDonationDialog}
      />
    </div>
  );
};

export default DuasLibrary;

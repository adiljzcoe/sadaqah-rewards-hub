
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Building2, MapPin, Star, Crown, Coins, Utensils } from 'lucide-react';

const localBusinesses = [
  { rank: 1, name: 'Birmingham Islamic Centre', location: 'Birmingham', coins: 15420, donations: 85 },
  { rank: 2, name: 'Al-Noor Grocery', location: 'London', coins: 11600, donations: 68 },
  { rank: 3, name: 'Mosque Community Shop', location: 'Leeds', coins: 9800, donations: 54 },
  { rank: 4, name: 'Islamic Bookstore', location: 'Bradford', coins: 8500, donations: 47 },
  { rank: 5, name: 'Crescent Electronics', location: 'Manchester', coins: 7200, donations: 41 },
];

const halalRestaurants = [
  { rank: 1, name: 'Halal Corner Restaurant', location: 'Manchester', coins: 12800, donations: 72 },
  { rank: 2, name: 'Bismillah Kitchen', location: 'Birmingham', coins: 10500, donations: 59 },
  { rank: 3, name: 'Al-Medina Grill', location: 'London', coins: 9200, donations: 52 },
  { rank: 4, name: 'Pak Taste', location: 'Bradford', coins: 8100, donations: 45 },
  { rank: 5, name: 'Zam Zam Restaurant', location: 'Leeds', coins: 6800, donations: 38 },
];

const nationalBusinesses = [
  { rank: 1, name: 'Halal Food Network', coins: 45200, donations: 280 },
  { rank: 2, name: 'Islamic Finance UK', coins: 38900, donations: 245 },
  { rank: 3, name: 'Crescent Foods Ltd', coins: 32100, donations: 198 },
];

const BusinessSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Business Partners</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Local businesses, halal restaurants, and national companies supporting our community by purchasing{' '}
            <span className="text-blue-600 font-semibold">Sadaqah Coins</span> to sponsor charitable giving
          </p>
        </div>

        {/* Sponsored Banners */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Local Business Banner */}
          <Card className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  <Badge className="bg-white/20 text-white border-0">Featured Local</Badge>
                </div>
                <h4 className="text-xl font-bold mb-1">Birmingham Islamic Centre</h4>
                <p className="text-emerald-100">Supporting local families with hot meals</p>
                <div className="flex items-center mt-3">
                  <Coins className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">15,420 Sadaqah Coins invested</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                  🕌
                </div>
              </div>
            </div>
          </Card>

          {/* Halal Restaurant Banner */}
          <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Utensils className="h-5 w-5 mr-2" />
                  <Badge className="bg-white/20 text-white border-0">Featured Restaurant</Badge>
                </div>
                <h4 className="text-xl font-bold mb-1">Halal Corner Restaurant</h4>
                <p className="text-orange-100">Authentic halal cuisine for the community</p>
                <div className="flex items-center mt-3">
                  <Coins className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">12,800 Sadaqah Coins invested</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                  🍽️
                </div>
              </div>
            </div>
          </Card>

          {/* National Business Banner */}
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Crown className="h-5 w-5 mr-2" />
                  <Badge className="bg-white/20 text-white border-0">Featured National</Badge>
                </div>
                <h4 className="text-xl font-bold mb-1">Halal Food Network</h4>
                <p className="text-blue-100">Nationwide halal food distribution</p>
                <div className="flex items-center mt-3">
                  <Coins className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">45,200 Sadaqah Coins invested</span>
                </div>
              </div>
              <div className="text-right">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center text-2xl">
                  🏢
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Business Leaderboards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Local Business Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                Local Business Leaders
              </h4>
              <Badge className="bg-emerald-100 text-emerald-800">
                This Month
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead className="text-right">Coins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {localBusinesses.map((business) => (
                  <TableRow key={business.rank}>
                    <TableCell>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-sm">
                        {business.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {business.location} • {business.donations} donations sponsored
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-blue-600">{business.coins.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">coins</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Halal Restaurants Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold flex items-center">
                <Utensils className="h-5 w-5 mr-2 text-orange-600" />
                Halal Restaurant Leaders
              </h4>
              <Badge className="bg-orange-100 text-orange-800">
                This Month
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Restaurant</TableHead>
                  <TableHead className="text-right">Coins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {halalRestaurants.map((restaurant) => (
                  <TableRow key={restaurant.rank}>
                    <TableCell>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 font-bold text-sm">
                        {restaurant.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{restaurant.name}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {restaurant.location} • {restaurant.donations} donations sponsored
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-blue-600">{restaurant.coins.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">coins</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* National Business Leaderboard */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-semibold flex items-center">
                <Crown className="h-5 w-5 mr-2 text-blue-600" />
                National Business Leaders
              </h4>
              <Badge className="bg-blue-100 text-blue-800">
                This Month
              </Badge>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Rank</TableHead>
                  <TableHead>Business</TableHead>
                  <TableHead className="text-right">Coins</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nationalBusinesses.map((business) => (
                  <TableRow key={business.rank}>
                    <TableCell>
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold text-sm">
                        {business.rank}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{business.name}</div>
                        <div className="text-sm text-gray-500">
                          {business.donations} donations sponsored nationwide
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="font-bold text-blue-600">{business.coins.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">coins</div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Call to Action for Businesses */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0">
            <h4 className="text-2xl font-bold mb-4">Partner with Us</h4>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Purchase Sadaqah Coins to sponsor charitable giving and showcase your business to our community of active donors
            </p>
            <div className="flex justify-center space-x-4">
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-300">Starting from</div>
                <div className="text-xl font-bold">£500/month</div>
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <div className="text-sm text-gray-300">Reach</div>
                <div className="text-xl font-bold">10K+ donors</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BusinessSection;


import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, Clock, Users, Zap, TrendingUp } from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

interface DonationActivity {
  id: string;
  donor: string;
  amount: number;
  currency: string;
  cause: string;
  location: string;
  timestamp: Date;
  emoji: string;
  impact: string;
}

const LiveFeed = () => {
  const [activities, setActivities] = useState<DonationActivity[]>([
    {
      id: '1',
      donor: 'Ahmad M.',
      amount: 50,
      currency: '£',
      cause: 'Hot Meals for Orphans',
      location: 'Gaza',
      timestamp: new Date(Date.now() - 30000),
      emoji: '🍽️',
      impact: '10 meals provided'
    },
    {
      id: '2',
      donor: 'Anonymous',
      amount: 100,
      currency: '£',
      cause: 'Water Well Project',
      location: 'Bangladesh',
      timestamp: new Date(Date.now() - 60000),
      emoji: '💧',
      impact: 'Clean water for 50 families'
    },
    {
      id: '3',
      donor: 'Fatima S.',
      amount: 25,
      currency: '£',
      cause: 'Emergency Relief',
      location: 'Syria',
      timestamp: new Date(Date.now() - 90000),
      emoji: '🏥',
      impact: 'Medical aid for 5 children'
    },
    {
      id: '4',
      donor: 'Mohammed K.',
      amount: 200,
      currency: '£',
      cause: 'Orphan Education',
      location: 'Palestine',
      timestamp: new Date(Date.now() - 120000),
      emoji: '📚',
      impact: 'School supplies for 40 students'
    }
  ]);

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-2 border-white/50 shadow-2xl backdrop-blur-sm">
      {/* Premium Header */}
      <div className="relative p-6 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg border border-white/30">
              <Heart className="h-6 w-6 text-white animate-subtle-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Live Donation Feed</h3>
              <p className="text-white/90 text-sm font-medium">Real-time impact happening now</p>
            </div>
          </div>
          <Badge className="bg-white/20 backdrop-blur-sm text-white font-bold px-4 py-2 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300">
            <Users className="h-4 w-4 mr-2" />
            1,247 active
          </Badge>
        </div>
      </div>

      <div className="block lg:flex">
        {/* Activities Feed */}
        <div className="w-full lg:w-2/3 p-6">
          {/* Desktop: Vertical layout */}
          <div className="hidden lg:block space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="relative p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-white border-2 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                
                <div className="relative z-10 flex items-center space-x-4">
                  {/* Premium emoji container */}
                  <div className="relative">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                      {activity.emoji}
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      <GoldCoin3D size={20}>
                        <Zap className="h-2 w-2" />
                      </GoldCoin3D>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Donor and amount */}
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="font-bold text-gray-800 text-lg">{activity.donor}</span>
                      <span className="text-sm text-gray-600 font-medium">donated</span>
                      <div className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        <span className="relative z-10">{activity.currency}{activity.amount}</span>
                      </div>
                    </div>

                    {/* Cause */}
                    <div className="text-base font-semibold text-gray-700 mb-1">
                      {activity.cause}
                    </div>

                    {/* Impact */}
                    <div className="flex items-center text-sm font-medium text-emerald-600 mb-2">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {activity.impact}
                    </div>

                    {/* Location */}
                    <div className="flex items-center text-xs font-semibold text-gray-500">
                      <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                      {activity.location}
                    </div>
                  </div>

                  {/* Time and premium badge */}
                  <div className="text-center">
                    <div className="text-xs text-gray-400 flex items-center mb-2 justify-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Horizontal scrolling layout with custom scrollbar */}
          <div className="lg:hidden">
            <style>{`
              .donation-custom-scroll-container {
                position: relative;
              }
              
              .donation-custom-scroll-container::-webkit-scrollbar {
                height: 12px;
                background: transparent;
              }
              
              .donation-custom-scroll-container::-webkit-scrollbar-track {
                background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
                border-radius: 10px;
                margin: 0 20px;
                border: 1px solid #e2e8f0;
              }
              
              .donation-custom-scroll-container::-webkit-scrollbar-thumb {
                background: linear-gradient(90deg, #ef4444, #ec4899, #8b5cf6);
                border-radius: 10px;
                border: 2px solid #f8fafc;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
              }
              
              .donation-custom-scroll-container::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(90deg, #dc2626, #db2777, #7c3aed);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                transform: scale(1.1);
              }
              
              .donation-custom-scroll-container::-webkit-scrollbar-thumb:active {
                background: linear-gradient(90deg, #b91c1c, #be185d, #6d28d9);
              }
              
              /* For Firefox */
              .donation-custom-scroll-container {
                scrollbar-width: thick;
                scrollbar-color: #ef4444 #f1f5f9;
              }
            `}</style>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Swipe to see more donations</p>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <div className="w-6 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full"></div>
                  <span>Scroll</span>
                </div>
              </div>
            </div>
            
            <div className="donation-custom-scroll-container overflow-x-auto pb-4">
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {activities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className="flex-shrink-0 w-80 relative p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-white border-2 border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative z-10 flex items-center space-x-4">
                      {/* Premium emoji container */}
                      <div className="relative">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 via-yellow-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform duration-300">
                          {activity.emoji}
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          <GoldCoin3D size={20}>
                            <Zap className="h-2 w-2" />
                          </GoldCoin3D>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Donor and amount */}
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-bold text-gray-800 text-lg truncate">{activity.donor}</span>
                          <span className="text-sm text-gray-600 font-medium">donated</span>
                        </div>
                        <div className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg mb-2">
                          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                          <span className="relative z-10">{activity.currency}{activity.amount}</span>
                        </div>

                        {/* Cause */}
                        <div className="text-base font-semibold text-gray-700 mb-1 line-clamp-2">
                          {activity.cause}
                        </div>

                        {/* Impact */}
                        <div className="flex items-center text-sm font-medium text-emerald-600 mb-2">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          <span className="truncate">{activity.impact}</span>
                        </div>

                        {/* Location and time */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center font-semibold text-gray-500">
                            <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                            <span className="truncate">{activity.location}</span>
                          </div>
                          <div className="text-gray-400 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatTimeAgo(activity.timestamp)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Summary Card */}
          <div className="mt-6 relative p-6 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-center overflow-hidden shadow-xl">
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-white mr-2 animate-subtle-pulse" />
                <span className="text-xl font-bold text-white">Community Impact Today</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                <p className="text-lg font-bold text-white">
                  Together we've raised{' '}
                  <span className="inline-block px-4 py-2 bg-white/30 backdrop-blur-sm rounded-lg text-2xl font-extrabold mx-2 border border-white/20 shadow-lg">
                    £50,000
                  </span>
                  and helped{' '}
                  <span className="inline-block px-3 py-1 bg-yellow-400/80 text-yellow-900 rounded-lg font-extrabold mx-1">
                    2,450 people
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Ad Space */}
        <div className="hidden lg:block w-1/3 p-6 border-l border-gray-200">
          <div className="space-y-4">
            {/* Banner Ad Placeholder */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-dashed border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 mb-2">🚀</div>
              <h4 className="font-semibold text-gray-800 mb-2">Boost Your Impact</h4>
              <p className="text-sm text-gray-600 mb-3">Join our premium giving circle</p>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                Upgrade
              </button>
            </div>

            {/* Live Stats */}
            <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
              <h5 className="font-semibold text-gray-800 mb-3">Live Statistics</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Donors</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Today's Total</span>
                  <span className="font-semibold">£28,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lives Impacted</span>
                  <span className="font-semibold">15,680</span>
                </div>
              </div>
            </div>

            {/* Another Ad Space */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-dashed border-purple-200 rounded-lg p-6 text-center">
              <div className="text-purple-600 mb-2">⭐</div>
              <h4 className="font-semibold text-gray-800 mb-2">Featured Campaign</h4>
              <p className="text-sm text-gray-600 mb-3">Emergency winter relief fund</p>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors">
                Support Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LiveFeed;

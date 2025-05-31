import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Heart, MapPin, Clock, Camera, MessageSquare, Users, Eye } from 'lucide-react';

interface FeedPost {
  id: string;
  type: 'charity_update' | 'community_message';
  title: string;
  content: string;
  author: string;
  location?: string;
  timestamp: Date;
  image?: string;
  likes: number;
  comments: number;
  views: number;
  category: string;
}

const CharityFeedSection = () => {
  const [feedPosts] = useState<FeedPost[]>([
    {
      id: '1',
      type: 'charity_update',
      title: 'Clean Water Delivered to Remote Village',
      content: 'Thanks to your generous donations, we successfully installed a new water well system providing clean drinking water to 200 families in rural Bangladesh.',
      author: 'Water for Life Foundation',
      location: 'Bangladesh',
      timestamp: new Date(Date.now() - 3600000),
      image: 'photo-1581090464777-f3220bbe1b8b',
      likes: 342,
      comments: 28,
      views: 1205,
      category: 'Water Relief'
    },
    {
      id: '2',
      type: 'community_message',
      title: 'Birmingham Mosque Community Goal Reached!',
      content: 'Alhamdulillah! Our community has reached the £10,000 goal for the orphan education program. Together we are making a real difference.',
      author: 'Birmingham Central Mosque',
      location: 'Birmingham, UK',
      timestamp: new Date(Date.now() - 7200000),
      likes: 156,
      comments: 12,
      views: 890,
      category: 'Community Update'
    },
    {
      id: '3',
      type: 'charity_update',
      title: 'Hot Meals Program Expansion',
      content: 'Your donations have enabled us to expand our hot meals program, now serving 500 orphaned children daily in Gaza.',
      author: 'Children of Palestine Relief',
      location: 'Gaza',
      timestamp: new Date(Date.now() - 10800000),
      image: 'photo-1649972904349-6e44c42644a7',
      likes: 289,
      comments: 45,
      views: 1850,
      category: 'Food Relief'
    },
    {
      id: '4',
      type: 'charity_update',
      title: 'Medical Supplies Delivered Successfully',
      content: 'Emergency medical supplies worth £15,000 have been delivered to hospitals in Syria, helping treat over 300 patients this month.',
      author: 'Syria Medical Aid',
      location: 'Syria',
      timestamp: new Date(Date.now() - 14400000),
      image: 'photo-1518770660439-4636190af475',
      likes: 198,
      comments: 22,
      views: 1120,
      category: 'Medical Aid'
    }
  ]);

  function formatTimeAgo(timestamp: Date) {
    const hours = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'Water Relief': return 'bg-blue-500';
      case 'Food Relief': return 'bg-orange-500';
      case 'Medical Aid': return 'bg-red-500';
      case 'Community Update': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  }

  return (
    <Card className="professional-card">
      <div className="p-6 pb-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Live Impact Feed
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Real-time updates from charity partners worldwide
        </p>
      </div>

      {/* Mobile and Desktop Layout */}
      <div className="block lg:flex">
        {/* Feed Content */}
        <div className="w-full lg:w-2/3 p-6">
          {/* Desktop: Vertical layout */}
          <div className="hidden lg:block space-y-4">
            {feedPosts.map((post, index) => (
              <Card 
                key={post.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Post Header */}
                <div className="p-4 pb-3">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.category)}`}></div>
                      <Badge 
                        variant="secondary" 
                        className={`${getCategoryColor(post.category)} text-white border-0 text-xs`}
                      >
                        {post.category}
                      </Badge>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatTimeAgo(post.timestamp)}
                    </div>
                  </div>

                  <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h4>

                  <div className="flex items-center text-xs text-gray-600 mb-3">
                    <span className="font-medium">{post.author}</span>
                    {post.location && (
                      <>
                        <span className="mx-2">•</span>
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{post.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Image (if available) */}
                {post.image && (
                  <div className="relative mx-4 mb-3 rounded-lg overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=400&q=80`}
                        alt={post.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                        <Camera className="h-3 w-3 text-white" />
                      </div>
                    </AspectRatio>
                  </div>
                )}

                {/* Content */}
                <div className="px-4 pb-4">
                  <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                    {post.content}
                  </p>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="h-3 w-3" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{post.views}</span>
                      </div>
                    </div>

                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        post.type === 'charity_update' 
                          ? 'border-emerald-200 text-emerald-700 bg-emerald-50' 
                          : 'border-blue-200 text-blue-700 bg-blue-50'
                      }`}
                    >
                      {post.type === 'charity_update' ? 'Field Update' : 'Community'}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}

            {/* Load More Button */}
            <div className="pt-4">
              <button className="w-full gel-button vibrant-gradient px-4 py-2 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-300 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Load More Updates
              </button>
            </div>
          </div>

          {/* Mobile: Horizontal scrolling layout with custom scrollbar */}
          <div className="lg:hidden">
            <style>{`
              .custom-scroll-container {
                position: relative;
              }
              
              .custom-scroll-container::-webkit-scrollbar {
                height: 12px;
                background: transparent;
              }
              
              .custom-scroll-container::-webkit-scrollbar-track {
                background: linear-gradient(90deg, #f1f5f9, #e2e8f0);
                border-radius: 10px;
                margin: 0 20px;
                border: 1px solid #e2e8f0;
              }
              
              .custom-scroll-container::-webkit-scrollbar-thumb {
                background: linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6);
                border-radius: 10px;
                border: 2px solid #f8fafc;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                transition: all 0.3s ease;
              }
              
              .custom-scroll-container::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(90deg, #059669, #2563eb, #7c3aed);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                transform: scale(1.1);
              }
              
              .custom-scroll-container::-webkit-scrollbar-thumb:active {
                background: linear-gradient(90deg, #047857, #1d4ed8, #6d28d9);
              }
              
              /* For Firefox */
              .custom-scroll-container {
                scrollbar-width: thick;
                scrollbar-color: #10b981 #f1f5f9;
              }
            `}</style>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-600">Swipe to see more updates</p>
                <div className="flex items-center space-x-1 text-xs text-gray-400">
                  <div className="w-6 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"></div>
                  <span>Scroll</span>
                </div>
              </div>
            </div>
            
            <div className="custom-scroll-container overflow-x-auto pb-4">
              <div className="flex space-x-4" style={{ width: 'max-content' }}>
                {feedPosts.map((post, index) => (
                  <Card 
                    key={post.id}
                    className="flex-shrink-0 w-80 overflow-hidden hover:shadow-lg transition-all duration-300 group border border-gray-100"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Post Header */}
                    <div className="p-4 pb-3">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.category)}`}></div>
                          <Badge 
                            variant="secondary" 
                            className={`${getCategoryColor(post.category)} text-white border-0 text-xs`}
                          >
                            {post.category}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTimeAgo(post.timestamp)}
                        </div>
                      </div>

                      <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {post.title}
                      </h4>

                      <div className="flex items-center text-xs text-gray-600 mb-3">
                        <span className="font-medium truncate">{post.author}</span>
                        {post.location && (
                          <>
                            <span className="mx-2">•</span>
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{post.location}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Image (if available) */}
                    {post.image && (
                      <div className="relative mx-4 mb-3 rounded-lg overflow-hidden">
                        <AspectRatio ratio={16 / 9}>
                          <img
                            src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=400&q=80`}
                            alt={post.title}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                            <Camera className="h-3 w-3 text-white" />
                          </div>
                        </AspectRatio>
                      </div>
                    )}

                    {/* Content */}
                    <div className="px-4 pb-4">
                      <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                        {post.content}
                      </p>

                      {/* Engagement Stats */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                            <Heart className="h-3 w-3" />
                            <span>{post.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                            <MessageSquare className="h-3 w-3" />
                            <span>{post.comments}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{post.views}</span>
                          </div>
                        </div>

                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            post.type === 'charity_update' 
                              ? 'border-emerald-200 text-emerald-700 bg-emerald-50' 
                              : 'border-blue-200 text-blue-700 bg-blue-50'
                          }`}
                        >
                          {post.type === 'charity_update' ? 'Field Update' : 'Community'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Mobile Load More Button */}
            <div className="pt-4">
              <button className="w-full gel-button vibrant-gradient px-4 py-2 rounded-lg font-medium text-white hover:scale-105 transition-transform duration-300 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Load More Updates
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Only on Desktop */}
        <div className="hidden lg:block w-1/3 p-6 border-l border-gray-100">
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
              <div className="text-blue-600 mb-2">📢</div>
              <h4 className="font-semibold text-gray-800 mb-2">Featured Charity</h4>
              <p className="text-sm text-gray-600 mb-3">Help us reach our winter appeal goal</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-green-50 border-2 border-dashed border-emerald-200 rounded-lg p-6 text-center">
              <div className="text-emerald-600 mb-2">🌟</div>
              <h4 className="font-semibold text-gray-800 mb-2">Quick Impact</h4>
              <p className="text-sm text-gray-600 mb-3">Small donations, big difference</p>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors">
                Donate £10
              </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h5 className="font-semibold text-gray-800 mb-3">Today's Impact</h5>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Updates Posted</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Communities Helped</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lives Touched</span>
                  <span className="font-semibold">2,450</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CharityFeedSection;

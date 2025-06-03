
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Heart, MapPin, Clock, Camera, MessageSquare, Users, Eye, Star, Shield, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FeedPost {
  id: string;
  title: string;
  content: string;
  charity_id: string;
  location?: string;
  post_type: string;
  verification_status: string;
  verified_at: string;
  likes_count: number;
  views_count: number;
  created_at: string;
  media_urls?: string[];
  charities: {
    name: string;
    trust_rating: number;
    activity_score: number;
  };
}

const CharityFeedSection = () => {
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('charity_feed_posts')
        .select(`
          *,
          charities (
            name,
            trust_rating,
            activity_score
          )
        `)
        .eq('verification_status', 'verified')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setFeedPosts(data || []);
    } catch (error) {
      console.error('Error fetching feed posts:', error);
    } finally {
      setLoading(false);
    }
  };

  function formatTimeAgo(timestamp: string) {
    const hours = Math.floor((Date.now() - new Date(timestamp).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  function getCategoryColor(category: string) {
    switch (category) {
      case 'field_update': return 'bg-blue-500';
      case 'project_completion': return 'bg-green-500';
      case 'emergency_response': return 'bg-red-500';
      case 'community_message': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  }

  function getTrustBadgeColor(rating: number) {
    if (rating >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (rating >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  }

  if (loading) {
    return (
      <Card className="professional-card">
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-500">Loading live impact feed...</p>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="professional-card">
      <div className="p-6 pb-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Live Impact Feed
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
            Live
          </div>
        </div>

        <p className="text-sm text-gray-600">
          Real-time verified updates from charity partners worldwide
        </p>
      </div>

      {/* Feed Content - Full Width */}
      <div className="p-6">
        {feedPosts.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No verified updates yet</h3>
            <p className="text-sm text-gray-500">Charity partners will start posting verified field updates soon.</p>
          </div>
        ) : (
          <>
            {/* Desktop: Vertical layout */}
            <div className="hidden lg:block space-y-4">
              {feedPosts.map((post, index) => (
                <Card 
                  key={post.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group border border-gray-100"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Post Header with Trust Rating */}
                  <div className="p-4 pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.post_type)}`}></div>
                        <Badge 
                          variant="secondary" 
                          className={`${getCategoryColor(post.post_type)} text-white border-0 text-xs`}
                        >
                          {post.post_type.replace('_', ' ')}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getTrustBadgeColor(post.charities.trust_rating)}`}
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Trust: {post.charities.trust_rating.toFixed(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                        <span className="mr-2">Verified</span>
                        <Clock className="h-3 w-3 mr-1" />
                        {formatTimeAgo(post.created_at)}
                      </div>
                    </div>

                    <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <span className="font-medium">{post.charities.name}</span>
                      {post.location && (
                        <>
                          <span className="mx-2">•</span>
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{post.location}</span>
                        </>
                      )}
                      <span className="mx-2">•</span>
                      <span className="text-emerald-600">Activity: {post.charities.activity_score}%</span>
                    </div>
                  </div>

                  {/* Image placeholder (since we don't have actual media URLs yet) */}
                  {post.media_urls && post.media_urls.length > 0 && (
                    <div className="relative mx-4 mb-3 rounded-lg overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <div className="bg-gradient-to-br from-blue-100 to-emerald-100 w-full h-full flex items-center justify-center">
                          <Camera className="h-8 w-8 text-gray-500" />
                          <span className="ml-2 text-sm text-gray-600">Verified Field Photo</span>
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
                          <span>{post.likes_count}</span>
                        </div>
                        <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                          <MessageSquare className="h-3 w-3" />
                          <span>0</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{post.views_count}</span>
                        </div>
                      </div>

                      <Badge 
                        variant="outline" 
                        className="text-xs border-green-200 text-green-700 bg-green-50"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified Update
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

            {/* Mobile: Horizontal scrolling layout */}
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
                  <p className="text-sm font-medium text-gray-600">Swipe to see verified updates</p>
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
                      {/* Mobile Post Content - similar structure but mobile optimized */}
                      <div className="p-4 pb-3">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${getCategoryColor(post.post_type)}`}></div>
                            <Badge 
                              variant="secondary" 
                              className={`${getCategoryColor(post.post_type)} text-white border-0 text-xs`}
                            >
                              {post.post_type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getTrustBadgeColor(post.charities.trust_rating)}`}
                          >
                            <Star className="h-3 w-3 mr-1" />
                            {post.charities.trust_rating.toFixed(1)}
                          </Badge>
                        </div>

                        <h4 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                          {post.title}
                        </h4>

                        <div className="flex items-center text-xs text-gray-600 mb-3">
                          <span className="font-medium truncate">{post.charities.name}</span>
                          {post.location && (
                            <>
                              <span className="mx-2">•</span>
                              <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                              <span className="truncate">{post.location}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="px-4 pb-4">
                        <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                          {post.content}
                        </p>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                              <span>{post.likes_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{post.views_count}</span>
                            </div>
                          </div>

                          <Badge 
                            variant="outline" 
                            className="text-xs border-green-200 text-green-700 bg-green-50"
                          >
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Verified
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
          </>
        )}
      </div>
    </Card>
  );
};

export default CharityFeedSection;

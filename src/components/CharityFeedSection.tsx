
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
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

  const formatTimeAgo = (timestamp: Date) => {
    const hours = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Water Relief': return 'bg-blue-500';
      case 'Food Relief': return 'bg-orange-500';
      case 'Medical Aid': return 'bg-red-500';
      case 'Community Update': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4">
          Live Impact Feed
        </h3>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          See the real-time impact of your donations and connect with our charity partners around the world
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {feedPosts.map((post, index) => (
          <Card 
            key={post.id}
            className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group professional-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getCategoryColor(post.category)}`}></div>
                  <Badge 
                    variant="secondary" 
                    className={`${getCategoryColor(post.category)} text-white border-0`}
                  >
                    {post.category}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTimeAgo(post.timestamp)}
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h4>

              <div className="flex items-center text-sm text-gray-600 mb-3">
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
              <div className="relative mx-6 mb-4 rounded-xl overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=800&q=80`}
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <Camera className="h-4 w-4 text-white" />
                  </div>
                </AspectRatio>
              </div>
            )}

            {/* Content */}
            <div className="px-6 pb-4">
              <p className="text-gray-700 leading-relaxed mb-4">
                {post.content}
              </p>

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-1 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-1 hover:text-blue-500 transition-colors cursor-pointer">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                </div>

                <Badge 
                  variant="outline" 
                  className={`${
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

      {/* Load More Button */}
      <div className="text-center mt-12">
        <button className="gel-button vibrant-gradient px-8 py-4 rounded-xl font-bold text-white hover:scale-105 transition-transform duration-300">
          <Users className="h-5 w-5 mr-2" />
          Load More Updates
        </button>
      </div>
    </section>
  );
};

export default CharityFeedSection;

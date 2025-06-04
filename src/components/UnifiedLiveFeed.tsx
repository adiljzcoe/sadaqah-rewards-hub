
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Clock, Users, RefreshCw, Loader2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface LiveDonation {
  id: string;
  amount: number;
  anonymous: boolean;
  message: string;
  created_at: string;
  charities: {
    name: string;
    logo_url: string;
  } | null;
  profiles: {
    full_name: string;
  } | null;
}

interface CharityPost {
  id: string;
  title: string;
  content: string;
  location: string;
  post_type: string;
  verification_status: string;
  likes_count: number;
  created_at: string;
  charities: {
    name: string;
    logo_url: string;
  } | null;
}

const UnifiedLiveFeed = () => {
  const [activeTab, setActiveTab] = useState<'donations' | 'updates'>('donations');

  const { data: donations, isLoading: donationsLoading, refetch: refetchDonations } = useQuery({
    queryKey: ['live-donations'],
    queryFn: async () => {
      console.log('Fetching live donations...');
      const { data, error } = await supabase
        .from('donations')
        .select(`
          id,
          amount,
          anonymous,
          message,
          created_at,
          charities(name, logo_url),
          profiles(full_name)
        `)
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching donations:', error);
        throw error;
      }

      console.log('Fetched donations:', data);
      return data as LiveDonation[];
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const { data: charityPosts, isLoading: postsLoading, refetch: refetchPosts } = useQuery({
    queryKey: ['charity-posts'],
    queryFn: async () => {
      console.log('Fetching charity posts...');
      const { data, error } = await supabase
        .from('charity_feed_posts')
        .select(`
          id,
          title,
          content,
          location,
          post_type,
          verification_status,
          likes_count,
          created_at,
          charities(name, logo_url)
        `)
        .eq('verification_status', 'verified')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) {
        console.error('Error fetching charity posts:', error);
        throw error;
      }

      console.log('Fetched charity posts:', data);
      return data as CharityPost[];
    },
    refetchInterval: 60000, // Refetch every minute
  });

  const handleRefresh = () => {
    if (activeTab === 'donations') {
      refetchDonations();
    } else {
      refetchPosts();
    }
  };

  const isLoading = activeTab === 'donations' ? donationsLoading : postsLoading;
  const currentData = activeTab === 'donations' ? donations : charityPosts;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            Live Impact Feed
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        
        <div className="flex gap-2 mt-3">
          <Button
            variant={activeTab === 'donations' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('donations')}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Live Donations
          </Button>
          <Button
            variant={activeTab === 'updates' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('updates')}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Field Updates
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="max-h-96 overflow-y-auto">
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-emerald-600" />
            <p className="text-sm text-gray-600">Loading live updates...</p>
          </div>
        ) : currentData && currentData.length > 0 ? (
          <div className="space-y-3">
            {activeTab === 'donations' ? (
              (donations || []).map((donation) => (
                <div key={donation.id} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {donation.anonymous ? 'Anonymous' : (donation.profiles?.full_name || 'Someone')}
                      </span>
                      <span className="text-emerald-600 font-bold">
                        £{donation.amount.toLocaleString()}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {donation.charities?.name || 'General Fund'}
                      </Badge>
                    </div>
                    {donation.message && (
                      <p className="text-sm text-gray-600 mb-1">"{donation.message}"</p>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(donation.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              (charityPosts || []).map((post) => (
                <div key={post.id} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    {post.charities?.logo_url ? (
                      <img 
                        src={post.charities.logo_url} 
                        alt={post.charities.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <Users className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {post.charities?.name || 'Charity Update'}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {post.post_type}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{post.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        {post.location && (
                          <>
                            <MapPin className="h-3 w-3" />
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Heart className="h-3 w-3" />
                        {post.likes_count}
                        <Clock className="h-3 w-3 ml-2" />
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
              {activeTab === 'donations' ? (
                <Heart className="h-8 w-8 text-gray-400" />
              ) : (
                <Users className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">
              {activeTab === 'donations' ? 'No donations yet' : 'No updates yet'}
            </h3>
            <p className="text-sm text-gray-500">
              {activeTab === 'donations' 
                ? 'Be the first to make a donation and see it appear here!'
                : 'Charity updates will appear here as they happen.'
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnifiedLiveFeed;

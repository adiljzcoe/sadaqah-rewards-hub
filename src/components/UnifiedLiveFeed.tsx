
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { 
  Heart, 
  MapPin, 
  Clock, 
  Users, 
  Zap, 
  TrendingUp, 
  Star,
  Coins,
  MessageSquare,
  Camera,
  Building2,
  Trophy,
  Gift,
  Target,
  Activity,
  CheckCircle
} from 'lucide-react';
import GoldCoin3D from './GoldCoin3D';

interface FeedActivity {
  id: string;
  type: 'donation' | 'jannah' | 'message' | 'media' | 'achievement' | 'charity_update' | 'leaderboard' | 'honoring';
  user: string;
  action: string;
  details: string;
  amount?: number;
  currency?: string;
  location?: string;
  timestamp: Date;
  emoji: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  verified?: boolean;
  honoringOf?: string;
}

const UnifiedLiveFeed = () => {
  const [activities, setActivities] = useState<FeedActivity[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'donations' | 'jannah' | 'achievements' | 'charity' | 'community' | 'honoring'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Generate honoring activities
  const generateHonoringActivity = () => {
    const memorialMessages = [
      { person: 'Father', messages: ['I love you baba', 'Miss you every day', 'Your teachings guide me', 'Forever in my heart'] },
      { person: 'Mother', messages: ['I love you mama', 'Thank you for everything', 'Your love lives on', 'Missing your hugs'] },
      { person: 'Prophet Muhammad (PBUH)', messages: ['Following your example', 'Peace be upon you', 'Your mercy inspires us', 'Grateful for your guidance'] },
      { person: 'Grandmother', messages: ['Love you nani', 'Your prayers protect us', 'Missing your stories', 'Your wisdom lives on'] },
      { person: 'Grandfather', messages: ['Love you nana', 'Your strength inspires me', 'Missing your advice', 'Thank you for everything'] },
      { person: 'All Muslims', messages: ['May Allah unite us', 'For the ummah', 'Together in faith', 'One community'] },
      { person: 'Deceased loved one', messages: ['Until we meet again', 'Your memory lives on', 'In loving memory', 'Forever remembered'] },
      { person: 'Sister', messages: ['Miss you so much', 'You were my best friend', 'Love you forever', 'Your smile lives on'] },
      { person: 'Brother', messages: ['My hero always', 'Miss our talks', 'You taught me strength', 'Love you bro'] }
    ];

    const fakeUsers = [
      'Ahmad M.', 'Sarah K.', 'Omar R.', 'Fatima S.', 'Yusuf A.', 'Aisha B.', 'Hassan M.', 'Khadija L.',
      'Ali T.', 'Zainab H.', 'Ibrahim K.', 'Maryam N.', 'Abdullah R.', 'Hafsa M.', 'Layla A.', 'Amara J.'
    ];

    const donationAmounts = [25, 50, 75, 100, 150, 200, 250, 300];

    const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
    const randomMemorial = memorialMessages[Math.floor(Math.random() * memorialMessages.length)];
    const randomMessage = randomMemorial.messages[Math.floor(Math.random() * randomMemorial.messages.length)];
    const randomAmount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)];

    return {
      id: `honoring-${Date.now()}-${Math.random()}`,
      type: 'honoring' as const,
      user: randomUser,
      action: 'honored',
      details: `"${randomMessage}" - donated £${randomAmount} to charity`,
      amount: randomAmount,
      currency: '£',
      timestamp: new Date(),
      emoji: '💖',
      priority: 'high' as const,
      verified: true,
      honoringOf: randomMemorial.person
    };
  };

  // Mock data - this would come from various sources in real implementation
  useEffect(() => {
    const mockActivities: FeedActivity[] = [
      {
        id: '1',
        type: 'donation',
        user: 'Ahmad M.',
        action: 'donated',
        details: 'Emergency Relief for Gaza',
        amount: 50,
        currency: '£',
        location: 'Gaza',
        timestamp: new Date(Date.now() - 30000),
        emoji: '💖',
        priority: 'high',
        verified: true
      },
      {
        id: '2',
        type: 'jannah',
        user: 'Fatima S.',
        action: 'planted',
        details: 'Golden Palm Tree in Jannah Garden',
        timestamp: new Date(Date.now() - 45000),
        emoji: '🌴',
        priority: 'medium',
        category: 'Jannah Points'
      },
      {
        id: '3',
        type: 'achievement',
        user: 'Mohammed K.',
        action: 'unlocked',
        details: 'Weekly Warrior Badge - 7 consecutive donations',
        timestamp: new Date(Date.now() - 60000),
        emoji: '🏆',
        priority: 'medium',
        category: 'Achievement'
      },
      {
        id: '4',
        type: 'charity_update',
        user: 'Islamic Relief',
        action: 'shared',
        details: 'New field photos from water well construction in Somalia',
        location: 'Somalia',
        timestamp: new Date(Date.now() - 75000),
        emoji: '📸',
        priority: 'high',
        verified: true
      },
      {
        id: '5',
        type: 'leaderboard',
        user: 'Birmingham',
        action: 'moved to',
        details: '#1 position in UK Cities Leaderboard',
        timestamp: new Date(Date.now() - 90000),
        emoji: '👑',
        priority: 'medium',
        category: 'Rankings'
      },
      {
        id: '6',
        type: 'message',
        user: 'Sarah K.',
        action: 'posted',
        details: 'May Allah accept all our donations and multiply the reward',
        timestamp: new Date(Date.now() - 105000),
        emoji: '🤲',
        priority: 'low',
        category: 'Community'
      },
      {
        id: '7',
        type: 'donation',
        user: 'Anonymous',
        action: 'donated',
        details: 'Orphan Sponsorship Program',
        amount: 100,
        currency: '£',
        location: 'Syria',
        timestamp: new Date(Date.now() - 120000),
        emoji: '👶',
        priority: 'high',
        verified: true
      },
      {
        id: '8',
        type: 'jannah',
        user: 'Omar R.',
        action: 'built',
        details: 'Beautiful Mosque with Silver Domes',
        timestamp: new Date(Date.now() - 135000),
        emoji: '🕌',
        priority: 'medium',
        category: 'Jannah Points'
      }
    ];

    setActivities(mockActivities);

    // Generate initial honoring activity
    const initialHonoring = generateHonoringActivity();
    setActivities(prev => [initialHonoring, ...prev]);

    // Generate honoring activities periodically
    const interval = setInterval(() => {
      const newHonoring = generateHonoringActivity();
      setActivities(prev => [newHonoring, ...prev.slice(0, 15)]); // Keep only latest 16 activities
    }, 12000); // Every 12 seconds

    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const getFilteredActivities = () => {
    switch (activeTab) {
      case 'donations':
        return activities.filter(a => a.type === 'donation');
      case 'jannah':
        return activities.filter(a => a.type === 'jannah');
      case 'achievements':
        return activities.filter(a => a.type === 'achievement' || a.type === 'leaderboard');
      case 'charity':
        return activities.filter(a => a.type === 'charity_update' || a.type === 'media');
      case 'community':
        return activities.filter(a => a.type === 'message');
      case 'honoring':
        return activities.filter(a => a.type === 'honoring');
      default:
        return activities;
    }
  };

  const getPaginatedActivities = () => {
    const filtered = getFilteredActivities();
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = () => {
    return Math.ceil(getFilteredActivities().length / itemsPerPage);
  };

  // Reset to page 1 when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value as any);
    setCurrentPage(1);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'donation': return Heart;
      case 'jannah': return Star;
      case 'achievement': return Trophy;
      case 'charity_update': return Camera;
      case 'leaderboard': return TrendingUp;
      case 'message': return MessageSquare;
      case 'honoring': return Heart;
      default: return Activity;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'donation': return 'from-red-500 to-pink-500';
      case 'jannah': return 'from-yellow-500 to-amber-500';
      case 'achievement': return 'from-purple-500 to-indigo-500';
      case 'charity_update': return 'from-blue-500 to-cyan-500';
      case 'leaderboard': return 'from-green-500 to-emerald-500';
      case 'message': return 'from-gray-500 to-slate-500';
      case 'honoring': return 'from-pink-500 to-rose-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getPriorityBorder = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const totalPages = getTotalPages();
  const paginatedActivities = getPaginatedActivities();

  return (
    <Card className="p-0 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 border-2 border-white/50 shadow-2xl backdrop-blur-sm">
      {/* Header */}
      <div className="relative p-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 shadow-lg border border-white/30">
              <Activity className="h-6 w-6 text-white animate-subtle-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold">Live Impact Feed</h3>
              <p className="text-white/90 text-sm font-medium">Real-time activity across the platform</p>
            </div>
          </div>
          <Badge className="bg-white/20 backdrop-blur-sm text-white font-bold px-4 py-2 border border-white/30 shadow-lg">
            <Users className="h-4 w-4 mr-2" />
            Live Now
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange} className="w-full">
        <div className="px-6 pt-4 pb-2 bg-gray-50/50 border-b">
          <TabsList className="grid w-full grid-cols-7 bg-white/80 backdrop-blur-sm">
            <TabsTrigger value="all" className="text-xs">
              <Activity className="h-3 w-3 mr-1" />
              All
            </TabsTrigger>
            <TabsTrigger value="donations" className="text-xs">
              <Heart className="h-3 w-3 mr-1" />
              Donations
            </TabsTrigger>
            <TabsTrigger value="honoring" className="text-xs">
              <Heart className="h-3 w-3 mr-1" />
              Honoring
            </TabsTrigger>
            <TabsTrigger value="jannah" className="text-xs">
              <Star className="h-3 w-3 mr-1" />
              Jannah
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-xs">
              <Trophy className="h-3 w-3 mr-1" />
              Awards
            </TabsTrigger>
            <TabsTrigger value="charity" className="text-xs">
              <Camera className="h-3 w-3 mr-1" />
              Updates
            </TabsTrigger>
            <TabsTrigger value="community" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Messages
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="p-0 m-0">
          <div className="p-6">
            {/* Activities Feed */}
            <div className="space-y-4">
              {paginatedActivities.map((activity, index) => {
                const IconComponent = getActivityIcon(activity.type);
                
                return (
                  <div 
                    key={activity.id} 
                    className={`relative p-4 rounded-xl bg-gradient-to-r from-white via-slate-50/80 to-white border-l-4 ${getPriorityBorder(activity.priority)} shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group overflow-hidden`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    
                    <div className="relative z-10 flex items-start space-x-4">
                      {/* Activity Icon */}
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(activity.type)} flex items-center justify-center text-white shadow-lg border-2 border-white/50 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        {activity.verified && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Main Activity Content */}
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-gray-800">{activity.user}</span>
                          <span className="text-sm text-gray-600 font-medium">{activity.action}</span>
                          {activity.honoringOf && (
                            <Badge variant="outline" className="text-xs bg-pink-50 text-pink-700 border-pink-200">
                              {activity.honoringOf}
                            </Badge>
                          )}
                          {activity.amount && (
                            <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getTypeColor(activity.type)} text-white font-bold text-sm shadow-lg`}>
                              {activity.currency}{activity.amount}
                            </div>
                          )}
                        </div>

                        {/* Details */}
                        <div className="text-sm font-semibold text-gray-700 mb-2 line-clamp-2">
                          {activity.emoji} {activity.details}
                        </div>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center space-x-3 text-gray-500">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatTimeAgo(activity.timestamp)}
                            </div>
                            {activity.location && (
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1 text-emerald-500" />
                                <span>{activity.location}</span>
                              </div>
                            )}
                            {activity.category && (
                              <Badge variant="outline" className="text-xs">
                                {activity.category}
                              </Badge>
                            )}
                          </div>

                          {/* Priority Indicator */}
                          <div className={`w-2 h-2 rounded-full ${
                            activity.priority === 'high' ? 'bg-red-500' :
                            activity.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {paginatedActivities.length === 0 && (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No activities yet</h3>
                  <p className="text-sm text-gray-500">Activity in this category will appear here as it happens.</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => setCurrentPage(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default UnifiedLiveFeed;

import React, { useState } from 'react';
import { Plus, Filter, Search, Trophy, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import FundraisingCampaignCard from '@/components/fundraising/FundraisingCampaignCard';
import CreateCampaignDialog from '@/components/fundraising/CreateCampaignDialog';
import FundraisingLeaderboard from '@/components/fundraising/FundraisingLeaderboard';

interface ExtendedCampaign {
  id: string;
  title: string;
  description: string;
  cause_category: string;
  target_amount: number;
  raised_amount: number;
  currency: string;
  dedication_message?: string;
  video_url?: string;
  image_url?: string;
  end_date?: string;
  is_team_fundraiser: boolean;
  share_code: string;
  created_by: string;
  masjid_id?: string;
  profiles: {
    full_name: string;
    avatar_url?: string;
  };
  masjids?: {
    name: string;
    location: string;
  };
  fundraising_teams?: Array<{
    id: string;
    team_name: string;
    team_raised: number;
    team_members: Array<{
      profiles: {
        full_name: string;
        avatar_url?: string;
      };
    }>;
  }>;
}

const Fundraising = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ['fundraising-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fundraising_categories')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (error) throw error;
      return data;
    }
  });

  // Fetch active campaigns
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['fundraising-campaigns', selectedCategory, sortBy, searchTerm],
    queryFn: async (): Promise<ExtendedCampaign[]> => {
      let query = supabase
        .from('fundraising_campaigns')
        .select(`*`)
        .eq('status', 'active');

      if (selectedCategory !== 'all') {
        query = query.eq('cause_category', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      switch (sortBy) {
        case 'progress':
          query = query.order('raised_amount', { ascending: false });
          break;
        case 'ending':
          query = query.order('end_date', { ascending: true });
          break;
        default:
          query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      if (!data) return [];

      // Get additional data separately for each campaign
      const extendedCampaigns: ExtendedCampaign[] = [];

      for (const campaign of data) {
        // Get creator profile
        let profiles = null;
        if (campaign.created_by) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id', campaign.created_by)
            .single();
          profiles = profile;
        }

        // Get masjid info
        let masjids = undefined;
        if (campaign.masjid_id) {
          const { data: masjid } = await supabase
            .from('masjids')
            .select('name, location')
            .eq('id', campaign.masjid_id)
            .single();
          masjids = masjid || undefined;
        }

        // Get teams if it's a team fundraiser
        let fundraising_teams = undefined;
        if (campaign.is_team_fundraiser) {
          const { data: teams } = await supabase
            .from('fundraising_teams')
            .select(`
              id,
              team_name,
              team_raised
            `)
            .eq('campaign_id', campaign.id);

          if (teams && teams.length > 0) {
            // Get team members for each team
            const teamsWithMembers = [];
            for (const team of teams) {
              const { data: members } = await supabase
                .from('team_members')
                .select('id, user_id')
                .eq('team_id', team.id);

              let teamMembers: Array<{ profiles: { full_name: string; avatar_url?: string; } }> = [];
              if (members && members.length > 0) {
                const userIds = members.map(m => m.user_id).filter(Boolean);
                const { data: teamProfiles } = await supabase
                  .from('profiles')
                  .select('id, full_name, avatar_url')
                  .in('id', userIds);

                teamMembers = members.map(member => ({
                  profiles: teamProfiles?.find(p => p.id === member.user_id) || { full_name: 'Unknown', avatar_url: undefined }
                }));
              }

              teamsWithMembers.push({
                ...team,
                team_members: teamMembers
              });
            }
            fundraising_teams = teamsWithMembers;
          }
        }

        extendedCampaigns.push({
          ...campaign,
          profiles: profiles || { full_name: 'Anonymous', avatar_url: undefined },
          masjids,
          fundraising_teams
        });
      }

      return extendedCampaigns;
    }
  });

  const filteredCampaigns = campaigns || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Start Your Fundraising Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Create campaigns, build teams, and compete to make the biggest impact for causes you care about
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4"
                onClick={() => setShowCreateDialog(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Start a Campaign
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Users className="h-5 w-5 mr-2" />
                Join a Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6">
              <div className="text-3xl font-bold text-green-600 mb-2">£2.4M+</div>
              <div className="text-gray-600">Total Raised</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,250+</div>
              <div className="text-gray-600">Active Campaigns</div>
            </div>
            <div className="p-6">
              <div className="text-3xl font-bold text-purple-600 mb-2">3,800+</div>
              <div className="text-gray-600">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="campaigns" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="teams">Top Teams</TabsTrigger>
            </TabsList>

            <TabsContent value="campaigns">
              {/* Filters */}
              <div className="flex flex-col lg:flex-row items-center justify-between mb-8 space-y-4 lg:space-y-0 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search campaigns..."
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
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="progress">Highest Raised</SelectItem>
                      <SelectItem value="ending">Ending Soon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results */}
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
                  {selectedCategory !== 'all' && ` in ${selectedCategory}`}
                </p>
              </div>

              {/* Campaigns Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                      <CardContent className="p-6">
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : filteredCampaigns.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map((campaign) => (
                    <FundraisingCampaignCard
                      key={campaign.id}
                      campaign={campaign}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No campaigns found</h3>
                  <p className="text-gray-600 mb-6">Be the first to create a campaign for this cause!</p>
                  <Button onClick={() => setShowCreateDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="leaderboard">
              <FundraisingLeaderboard />
            </TabsContent>

            <TabsContent value="teams">
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Team Rankings</h3>
                <p className="text-gray-600">Coming soon - compete with teams!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <CreateCampaignDialog 
        open={showCreateDialog} 
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
};

export default Fundraising;

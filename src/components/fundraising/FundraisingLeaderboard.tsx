
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const FundraisingLeaderboard = () => {
  // Top fundraisers
  const { data: topFundraisers } = useQuery({
    queryKey: ['top-fundraisers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fundraising_campaigns')
        .select(`
          id,
          title,
          raised_amount,
          target_amount,
          created_at,
          created_by
        `)
        .eq('status', 'active')
        .order('raised_amount', { ascending: false })
        .limit(10);
      
      if (error) throw error;

      // Get profiles separately
      const userIds = data?.map(campaign => campaign.created_by).filter(Boolean) || [];
      if (userIds.length === 0) return data;

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      // Merge the data
      return data?.map(campaign => ({
        ...campaign,
        profiles: profiles?.find(p => p.id === campaign.created_by) || null
      }));
    }
  });

  // Top teams
  const { data: topTeams } = useQuery({
    queryKey: ['top-teams'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fundraising_teams')
        .select(`
          id,
          team_name,
          team_raised,
          team_target,
          campaign_id
        `)
        .order('team_raised', { ascending: false })
        .limit(10);
      
      if (error) throw error;

      // Get campaign titles and team members separately
      for (const team of data || []) {
        // Get campaign title
        const { data: campaign } = await supabase
          .from('fundraising_campaigns')
          .select('title')
          .eq('id', team.campaign_id)
          .single();
        
        team.fundraising_campaigns = campaign;

        // Get team members
        const { data: members } = await supabase
          .from('team_members')
          .select('id, user_id')
          .eq('team_id', team.id);

        if (members && members.length > 0) {
          const userIds = members.map(m => m.user_id).filter(Boolean);
          const { data: profiles } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .in('id', userIds);

          team.team_members = members.map(member => ({
            ...member,
            profiles: profiles?.find(p => p.id === member.user_id) || null
          }));
        } else {
          team.team_members = [];
        }
      }
      
      return data;
    }
  });

  // Most active campaigners
  const { data: activeCampaigners } = useQuery({
    queryKey: ['active-campaigners'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('fundraising_campaigns')
        .select(`
          created_by,
          raised_amount
        `)
        .eq('status', 'active');
      
      if (error) throw error;
      
      // Group by user and sum amounts
      const grouped = data.reduce((acc: any, campaign) => {
        const userId = campaign.created_by;
        if (!acc[userId]) {
          acc[userId] = {
            user_id: userId,
            total_raised: 0,
            campaign_count: 0
          };
        }
        acc[userId].total_raised += Number(campaign.raised_amount);
        acc[userId].campaign_count += 1;
        return acc;
      }, {});
      
      const groupedArray = Object.values(grouped)
        .sort((a: any, b: any) => b.total_raised - a.total_raised)
        .slice(0, 10);

      // Get user profiles
      const userIds = groupedArray.map((item: any) => item.user_id).filter(Boolean);
      if (userIds.length === 0) return groupedArray;

      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      return groupedArray.map((item: any) => ({
        ...item,
        user: profiles?.find(p => p.id === item.user_id) || null
      }));
    }
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 1:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 2:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-yellow-500 text-white">🥇 1st</Badge>;
      case 1:
        return <Badge className="bg-gray-400 text-white">🥈 2nd</Badge>;
      case 2:
        return <Badge className="bg-amber-600 text-white">🥉 3rd</Badge>;
      default:
        return <Badge variant="outline">#{index + 1}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Fundraising Champions</h2>
        <p className="text-gray-600">Celebrating our top fundraisers and teams making the biggest impact</p>
      </div>

      <Tabs defaultValue="campaigns" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="campaigns">Top Campaigns</TabsTrigger>
          <TabsTrigger value="teams">Top Teams</TabsTrigger>
          <TabsTrigger value="individuals">Top Individuals</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {topFundraisers?.map((campaign, index) => (
            <Card key={campaign.id} className={`transition-all ${index < 3 ? 'border-2 border-yellow-200 bg-yellow-50/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{campaign.title}</h3>
                      {getRankBadge(index)}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={campaign.profiles?.avatar_url} />
                        <AvatarFallback>
                          {campaign.profiles?.full_name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{campaign.profiles?.full_name}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-2xl font-bold text-green-600">
                          £{Number(campaign.raised_amount).toLocaleString()}
                        </span>
                        <span className="text-gray-600 ml-2">
                          of £{Number(campaign.target_amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {Math.round((Number(campaign.raised_amount) / Number(campaign.target_amount)) * 100)}% complete
                      </div>
                    </div>
                  </div>
                  
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="teams" className="space-y-4">
          {topTeams?.map((team, index) => (
            <Card key={team.id} className={`transition-all ${index < 3 ? 'border-2 border-blue-200 bg-blue-50/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{team.team_name}</h3>
                      {getRankBadge(index)}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {team.fundraising_campaigns?.title}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3">
                      <div>
                        <span className="text-2xl font-bold text-blue-600">
                          £{Number(team.team_raised).toLocaleString()}
                        </span>
                        {team.team_target && (
                          <span className="text-gray-600 ml-2">
                            of £{Number(team.team_target).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Team members:</span>
                      <div className="flex -space-x-1">
                        {team.team_members?.slice(0, 5).map((member, idx) => (
                          <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={member.profiles?.avatar_url} />
                            <AvatarFallback className="text-xs">
                              {member.profiles?.full_name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {team.team_members && team.team_members.length > 5 && (
                          <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                            <span className="text-xs">+{team.team_members.length - 5}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="individuals" className="space-y-4">
          {activeCampaigners?.map((campaigner: any, index) => (
            <Card key={index} className={`transition-all ${index < 3 ? 'border-2 border-purple-200 bg-purple-50/50' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2">
                    {getRankIcon(index)}
                  </div>
                  
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={campaigner.user?.avatar_url} />
                    <AvatarFallback className="text-lg">
                      {campaigner.user?.full_name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{campaigner.user?.full_name}</h3>
                      {getRankBadge(index)}
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <span className="text-2xl font-bold text-purple-600">
                          £{campaigner.total_raised.toLocaleString()}
                        </span>
                        <span className="text-gray-600 ml-2">raised</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {campaigner.campaign_count} campaign{campaigner.campaign_count !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FundraisingLeaderboard;


import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, TrendingUp, Heart, Crown, Star } from 'lucide-react';

interface MasjidMember {
  id: string;
  name: string;
  avatar?: string;
  joinedDate: string;
  isTopContributor: boolean;
  streakDays: number;
  contributionLevel: 'bronze' | 'silver' | 'gold' | 'platinum';
}

const mockMasjidMembers: MasjidMember[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    joinedDate: '2024-01-15',
    isTopContributor: true,
    streakDays: 45,
    contributionLevel: 'platinum'
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    joinedDate: '2024-02-03',
    isTopContributor: true,
    streakDays: 32,
    contributionLevel: 'gold'
  },
  {
    id: '3',
    name: 'Omar Ibrahim',
    joinedDate: '2024-01-28',
    isTopContributor: false,
    streakDays: 28,
    contributionLevel: 'gold'
  },
  {
    id: '4',
    name: 'Aisha Mohamed',
    joinedDate: '2024-03-01',
    isTopContributor: false,
    streakDays: 15,
    contributionLevel: 'silver'
  },
  {
    id: '5',
    name: 'Yusuf Ali',
    joinedDate: '2024-02-20',
    isTopContributor: false,
    streakDays: 12,
    contributionLevel: 'silver'
  },
  {
    id: '6',
    name: 'Maryam Said',
    joinedDate: '2024-03-10',
    isTopContributor: false,
    streakDays: 8,
    contributionLevel: 'bronze'
  }
];

interface MasjidMembersSectionProps {
  masjidName: string;
}

const MasjidMembersSection = ({ masjidName }: MasjidMembersSectionProps) => {
  const affiliateEarnings = 340; // Amount earned from YourJannah affiliate program
  const memberCount = mockMasjidMembers.length;
  const monthlyPerMember = 8; // Monthly affiliate commission per active member

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  const getContributionBadge = (level: string) => {
    const badges = {
      bronze: { color: 'bg-amber-100 text-amber-800', label: 'Bronze' },
      silver: { color: 'bg-gray-100 text-gray-800', label: 'Silver' },
      gold: { color: 'bg-yellow-100 text-yellow-800', label: 'Gold' },
      platinum: { color: 'bg-purple-100 text-purple-800', label: 'Platinum' }
    };
    return badges[level] || badges.bronze;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">YourJannah Affiliate Program</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Earned</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            £{affiliateEarnings.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 mt-1">From YourJannah membership</p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Active Members</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{memberCount}</div>
          <p className="text-xs text-blue-600 mt-1">From {masjidName}</p>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-800">Monthly Earning</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            £{memberCount * monthlyPerMember}
          </div>
          <p className="text-xs text-purple-600 mt-1">Per month from members</p>
        </div>
      </div>

      {/* Members List */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          YourJannah Members ({memberCount})
        </h4>
        
        <div className="space-y-3">
          {mockMasjidMembers.map((member, index) => {
            const badge = getContributionBadge(member.contributionLevel);
            return (
              <div 
                key={member.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm">
                        {getInitials(member.name)}
                      </AvatarFallback>
                    </Avatar>
                    {member.isTopContributor && (
                      <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                    )}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{member.name}</span>
                      <Badge className={`${badge.color} text-xs`}>
                        {badge.label} Member
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{member.streakDays} day streak</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-1 text-green-600">
                    <Star className="h-3 w-3" />
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <div className="text-xs text-gray-500">Earning £{monthlyPerMember}/mo</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-800 text-center">
          <Heart className="inline h-4 w-4 mr-1" />
          {masjidName} earns <span className="font-bold">£{memberCount * monthlyPerMember} per month</span> through the YourJannah affiliate program. Every active member from your community contributes £{monthlyPerMember} monthly to your masjid's funds.
        </p>
      </div>
    </Card>
  );
};

export default MasjidMembersSection;

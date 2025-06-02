import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Heart, Crown, Star, Building, Gift } from 'lucide-react';
import DonationWidget from './DonationWidget';

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
  const membershipDonationPercentage = 15; // Percentage of membership donated to masjid
  const memberCount = mockMasjidMembers.length;
  const totalPointsEarned = 3420; // Points earned for the masjid
  const monthlyPoints = 480; // Monthly points contribution

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
    <div className="space-y-6">
      {/* Membership Impact Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Heart className="h-6 w-6 text-red-500" />
          <h3 className="text-xl font-bold text-gray-900">Help Your Masjid Through YourJannah Membership</h3>
        </div>

        {/* How it Works */}
        <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
          <h4 className="font-semibold text-blue-900 mb-2">How YourJannah Helps Your Masjid</h4>
          <p className="text-sm text-blue-800">
            When community members join YourJannah, we donate <span className="font-bold">{membershipDonationPercentage}% of each membership</span> to {masjidName}. 
            The more members from your community who join, the more your masjid receives!
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Total Points Earned</span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {totalPointsEarned.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 mt-1">From membership donations</p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Community Members</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{memberCount}</div>
            <p className="text-xs text-blue-600 mt-1">YourJannah members from {masjidName}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Monthly Points</span>
            </div>
            <div className="text-2xl font-bold text-purple-700">
              {monthlyPoints.toLocaleString()}
            </div>
            <p className="text-xs text-purple-600 mt-1">Per month to your masjid</p>
          </div>
        </div>

        {/* Members List */}
        <div>
          <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-gray-600" />
            YourJannah Members from {masjidName} ({memberCount})
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
                      <span className="text-sm font-medium">Supporting</span>
                    </div>
                    <div className="text-xs text-gray-500">{membershipDonationPercentage}% of membership to masjid</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800 text-center">
            <Heart className="inline h-4 w-4 mr-1" />
            Encourage more community members to join YourJannah! Each new member means an additional <span className="font-bold">{membershipDonationPercentage}% of their membership</span> donated to {masjidName}. 
            Together, we can increase your masjid's monthly support.
          </p>
        </div>
      </Card>

      {/* Direct Donation Section */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Building className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-bold text-gray-900">Direct Donation to {masjidName}</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-4 border border-blue-200">
              <div className="flex items-start gap-2">
                <Gift className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Masjid Partner Programme</h4>
                  <p className="text-sm text-blue-800">
                    Make a direct donation to {masjidName} through our Masjid Partner Programme. 
                    <span className="font-bold"> 100% of your donation</span> goes directly to your masjid to support their community programs and facilities.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>100% of donations go directly to the masjid</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Verified partner in our charity network</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Tax-deductible donations (where applicable)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Instant donation confirmation</span>
              </div>
            </div>
          </div>

          <div>
            <DonationWidget
              charityId={`masjid-${masjidName.toLowerCase().replace(/\s+/g, '-')}`}
              title={`Support ${masjidName}`}
              description="Your donation goes directly to your masjid"
              defaultAmount={50}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MasjidMembersSection;

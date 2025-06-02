
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, TrendingUp, Heart, Crown } from 'lucide-react';

interface MasjidMember {
  id: string;
  name: string;
  avatar?: string;
  totalDonated: number;
  joinedDate: string;
  isTopDonor: boolean;
  streakDays: number;
}

const mockMasjidMembers: MasjidMember[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    totalDonated: 340,
    joinedDate: '2024-01-15',
    isTopDonor: true,
    streakDays: 45
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    totalDonated: 280,
    joinedDate: '2024-02-03',
    isTopDonor: true,
    streakDays: 32
  },
  {
    id: '3',
    name: 'Omar Ibrahim',
    totalDonated: 195,
    joinedDate: '2024-01-28',
    isTopDonor: false,
    streakDays: 28
  },
  {
    id: '4',
    name: 'Aisha Mohamed',
    totalDonated: 150,
    joinedDate: '2024-03-01',
    isTopDonor: false,
    streakDays: 15
  },
  {
    id: '5',
    name: 'Yusuf Ali',
    totalDonated: 125,
    joinedDate: '2024-02-20',
    isTopDonor: false,
    streakDays: 12
  },
  {
    id: '6',
    name: 'Maryam Said',
    totalDonated: 98,
    joinedDate: '2024-03-10',
    isTopDonor: false,
    streakDays: 8
  }
];

interface MasjidMembersSectionProps {
  masjidName: string;
}

const MasjidMembersSection = ({ masjidName }: MasjidMembersSectionProps) => {
  const totalCollected = mockMasjidMembers.reduce((sum, member) => sum + member.totalDonated, 0);
  const memberCount = mockMasjidMembers.length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="h-6 w-6 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">YourJannah Community Impact</h3>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-green-800">Total Collected</span>
          </div>
          <div className="text-2xl font-bold text-green-700">
            £{totalCollected.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 mt-1">Through YourJannah platform</p>
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
            <span className="text-sm font-medium text-purple-800">Average per Member</span>
          </div>
          <div className="text-2xl font-bold text-purple-700">
            £{Math.round(totalCollected / memberCount)}
          </div>
          <p className="text-xs text-purple-600 mt-1">Community contribution</p>
        </div>
      </div>

      {/* Members List */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-600" />
          Community Members ({memberCount})
        </h4>
        
        <div className="space-y-3">
          {mockMasjidMembers.map((member, index) => (
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
                  {member.isTopDonor && (
                    <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{member.name}</span>
                    {index === 0 && (
                      <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                        Top Donor
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <span>Joined {new Date(member.joinedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{member.streakDays} day streak</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-green-600">
                  £{member.totalDonated}
                </div>
                <div className="text-xs text-gray-500">contributed</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800 text-center">
          <Heart className="inline h-4 w-4 mr-1" />
          Together, our {masjidName} community has raised <span className="font-bold">£{totalCollected.toLocaleString()}</span> through the YourJannah platform, making a real difference in the world.
        </p>
      </div>
    </Card>
  );
};

export default MasjidMembersSection;

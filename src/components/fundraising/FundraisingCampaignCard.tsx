
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Users, MapPin, Calendar, Share2, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Campaign {
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

interface FundraisingCampaignCardProps {
  campaign: Campaign;
}

const FundraisingCampaignCard: React.FC<FundraisingCampaignCardProps> = ({ campaign }) => {
  const progress = (campaign.raised_amount / campaign.target_amount) * 100;
  const daysLeft = campaign.end_date 
    ? formatDistanceToNow(new Date(campaign.end_date), { addSuffix: true })
    : null;

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/fundraising/${campaign.share_code}`;
    if (navigator.share) {
      navigator.share({
        title: campaign.title,
        text: campaign.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        {campaign.image_url ? (
          <img 
            src={campaign.image_url} 
            alt={campaign.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <Heart className="h-16 w-16 text-white opacity-50" />
          </div>
        )}
        
        {campaign.video_url && (
          <div className="absolute top-4 right-4">
            <div className="bg-black/50 rounded-full p-2">
              <Play className="h-4 w-4 text-white" />
            </div>
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className="bg-white/90 text-gray-800">
            {campaign.cause_category}
          </Badge>
          {campaign.is_team_fundraiser && (
            <Badge variant="secondary" className="bg-blue-500 text-white">
              <Users className="h-3 w-3 mr-1" />
              Team
            </Badge>
          )}
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-lg line-clamp-2 flex-1">
            {campaign.title}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 ml-2"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Avatar className="h-6 w-6">
            <AvatarImage src={campaign.profiles.avatar_url} />
            <AvatarFallback>
              {campaign.profiles.full_name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>{campaign.profiles.full_name}</span>
        </div>

        {campaign.masjids && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{campaign.masjids.name}, {campaign.masjids.location}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {campaign.description}
        </p>

        {campaign.dedication_message && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm italic text-gray-700">
              "{campaign.dedication_message}"
            </p>
          </div>
        )}

        {/* Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="font-semibold">
              {campaign.currency}{campaign.raised_amount.toLocaleString()}
            </span>
            <span className="text-gray-600">
              of {campaign.currency}{campaign.target_amount.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-gray-600">
            <span>{Math.round(progress)}% raised</span>
            {daysLeft && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{daysLeft}</span>
              </div>
            )}
          </div>
        </div>

        {/* Team Members Preview */}
        {campaign.is_team_fundraiser && campaign.fundraising_teams?.[0] && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                {campaign.fundraising_teams[0].team_name}
              </span>
            </div>
            <div className="flex -space-x-1">
              {campaign.fundraising_teams[0].team_members.slice(0, 4).map((member, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={member.profiles.avatar_url} />
                  <AvatarFallback className="text-xs">
                    {member.profiles.full_name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
              {campaign.fundraising_teams[0].team_members.length > 4 && (
                <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600">
                    +{campaign.fundraising_teams[0].team_members.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button className="flex-1" size="sm">
            <Heart className="h-4 w-4 mr-2" />
            Donate Now
          </Button>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundraisingCampaignCard;

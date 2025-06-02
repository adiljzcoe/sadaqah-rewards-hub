
import React from 'react';
import { Shield, CheckCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TrustSystemBadgeProps {
  variant?: 'compact' | 'detailed' | 'minimal';
  trustRating?: number;
  activityScore?: number;
  showExplanation?: boolean;
}

const TrustSystemBadge = ({ 
  variant = 'compact', 
  trustRating, 
  activityScore,
  showExplanation = false 
}: TrustSystemBadgeProps) => {
  const getTrustColor = (rating?: number) => {
    if (!rating) return 'text-gray-500';
    if (rating >= 8) return 'text-green-600';
    if (rating >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrustBgColor = (rating?: number) => {
    if (!rating) return 'bg-gray-50 border-gray-200';
    if (rating >= 8) return 'bg-green-50 border-green-200';
    if (rating >= 6) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-1 text-xs text-green-600">
        <Shield className="h-3 w-3" />
        <span>Trust Verified</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Badge 
        variant="outline" 
        className="flex items-center gap-1 text-xs bg-green-50 border-green-200 text-green-700"
      >
        <Shield className="h-3 w-3" />
        Trust System Active
      </Badge>
    );
  }

  return (
    <div className={`rounded-lg border p-3 ${getTrustBgColor(trustRating)}`}>
      <div className="flex items-center gap-2 mb-2">
        <Shield className={`h-4 w-4 ${getTrustColor(trustRating)}`} />
        <span className="font-medium text-gray-800 text-sm">Trust-Based Distribution</span>
      </div>
      
      {trustRating !== undefined && activityScore !== undefined && (
        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 text-yellow-500" />
            <span className="text-xs text-gray-600">Trust: {trustRating.toFixed(1)}/10</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            <span className="text-xs text-gray-600">Activity: {activityScore}%</span>
          </div>
        </div>
      )}
      
      {showExplanation && (
        <p className="text-xs text-gray-600 leading-relaxed">
          Charities with higher trust ratings and more verified field updates receive larger shares of your donation.
        </p>
      )}
    </div>
  );
};

export default TrustSystemBadge;

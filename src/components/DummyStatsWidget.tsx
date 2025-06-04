
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useDummyData } from '@/hooks/useDummyData';
import { Heart, Users, Globe, TrendingUp } from 'lucide-react';

const DummyStatsWidget = () => {
  const { isDummyDataEnabled, generateDummyStats } = useDummyData();

  if (!isDummyDataEnabled('statistics')) {
    return null;
  }

  const stats = generateDummyStats();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const statItems = [
    {
      icon: Heart,
      label: 'Total Raised',
      value: `£${formatNumber(stats.total_raised)}`,
      color: 'text-red-500'
    },
    {
      icon: Users,
      label: 'Donors',
      value: formatNumber(stats.total_donors),
      color: 'text-blue-500'
    },
    {
      icon: TrendingUp,
      label: 'Active Campaigns',
      value: stats.active_campaigns.toString(),
      color: 'text-green-500'
    },
    {
      icon: Globe,
      label: 'Countries Reached',
      value: stats.countries_reached.toString(),
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DummyStatsWidget;


import React from 'react';
import { Card } from '@/components/ui/card';
import { TrendingUp, Users, Globe, Heart } from 'lucide-react';

interface CharityStatsSectionProps {
  charity: {
    name: string;
    total_raised?: number;
  };
}

const CharityStatsSection = ({ charity }: CharityStatsSectionProps) => {
  const stats = [
    {
      icon: Heart,
      label: "Total Donations",
      value: `£${charity.total_raised?.toLocaleString() || '0'}`,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      icon: Users,
      label: "Active Supporters",
      value: "2,547",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: TrendingUp,
      label: "This Month",
      value: "£12,450",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: Globe,
      label: "Countries Reached",
      value: "23",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <section className="py-12 px-4 bg-white border-b border-gray-100">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharityStatsSection;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Heart, Home, Utensils, Droplets } from 'lucide-react';

interface ImpactVisualizationProps {
  donationAmount: number;
}

const ImpactVisualization = ({ donationAmount }: ImpactVisualizationProps) => {
  const impacts = [
    {
      icon: Utensils,
      title: 'Meals Provided',
      amount: Math.floor(donationAmount / 5),
      description: 'Hot, nutritious meals for families',
      color: 'text-orange-600'
    },
    {
      icon: Droplets,
      title: 'Days of Clean Water',
      amount: Math.floor(donationAmount / 2),
      description: 'Safe drinking water access',
      color: 'text-blue-600'
    },
    {
      icon: Home,
      title: 'Shelter Days',
      amount: Math.floor(donationAmount / 10),
      description: 'Emergency housing support',
      color: 'text-green-600'
    },
    {
      icon: Heart,
      title: 'Medical Treatments',
      amount: Math.floor(donationAmount / 25),
      description: 'Life-saving medical care',
      color: 'text-red-600'
    }
  ];

  const campaignGoal = 100000;
  const currentRaised = 67432;
  const progressPercentage = (currentRaised / campaignGoal) * 100;

  return (
    <div className="space-y-4">
      {/* Campaign Progress */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-blue-700">
            🎯 Campaign Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-blue-600">£{currentRaised.toLocaleString()} raised</span>
              <span className="text-blue-600">£{campaignGoal.toLocaleString()} goal</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">{progressPercentage.toFixed(1)}%</div>
              <div className="text-sm text-blue-600">
                Only £{(campaignGoal - currentRaised).toLocaleString()} needed to reach our goal!
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Impact */}
      <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-green-700">
            💫 Your £{donationAmount} Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {impacts.map((impact, index) => (
              <div key={index} className="text-center p-3 bg-white rounded-lg border border-green-200">
                <impact.icon className={`h-6 w-6 mx-auto mb-2 ${impact.color}`} />
                <div className="text-2xl font-bold text-gray-800">{impact.amount}</div>
                <div className="text-sm font-semibold text-gray-700">{impact.title}</div>
                <div className="text-xs text-gray-600 mt-1">{impact.description}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded-lg p-3 text-center">
            <div className="text-sm font-bold text-orange-800">
              ✨ That's {impacts.reduce((sum, impact) => sum + impact.amount, 0)} lives directly impacted!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactVisualization;

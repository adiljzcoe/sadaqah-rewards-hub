
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Crown, Star, Zap, Gift, Check, X } from 'lucide-react';

const membershipTiers = [
  {
    name: 'Basic',
    price: 'Free',
    pointMultiplier: '1x',
    color: 'gray',
    icon: Star,
    features: [
      'Basic donation tracking',
      'Monthly impact reports',
      'Community access',
      'Standard support'
    ],
    limitations: [
      'No point multipliers',
      'Limited charity options',
      'Basic analytics'
    ]
  },
  {
    name: 'VIP',
    price: '£9.99/month',
    pointMultiplier: '2x',
    color: 'purple',
    icon: Crown,
    popular: true,
    features: [
      'Everything in Basic',
      '2x point multiplier',
      'Priority customer support',
      'Exclusive charity partnerships',
      'Advanced impact analytics',
      'Monthly bonus coins',
      'VIP community access'
    ],
    limitations: []
  },
  {
    name: 'Elite',
    price: '£19.99/month',
    pointMultiplier: '3x',
    color: 'gold',
    icon: Zap,
    features: [
      'Everything in VIP',
      '3x point multiplier',
      'Personal charity advisor',
      'Early access to campaigns',
      'Custom impact reports',
      'Exclusive events access',
      'Family account sharing',
      'Tax optimization advice'
    ],
    limitations: []
  }
];

const Membership = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Membership Plans</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect membership tier to maximize your charitable impact. 
            Earn more points, access exclusive features, and make a bigger difference.
          </p>
        </div>

        {/* Membership Comparison */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {membershipTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <Card 
                key={index} 
                className={`relative ${tier.popular ? 'ring-2 ring-purple-500 scale-105' : ''} 
                  ${tier.color === 'purple' ? 'border-purple-200' : ''} 
                  ${tier.color === 'gold' ? 'border-yellow-200' : ''}`}
              >
                {tier.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`rounded-full p-4 ${
                      tier.color === 'purple' ? 'bg-purple-100' : 
                      tier.color === 'gold' ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${
                        tier.color === 'purple' ? 'text-purple-600' : 
                        tier.color === 'gold' ? 'text-yellow-600' : 'text-gray-600'
                      }`} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                  <div className="text-3xl font-bold mb-2">
                    <span className={
                      tier.color === 'purple' ? 'text-purple-600' : 
                      tier.color === 'gold' ? 'text-yellow-600' : 'text-gray-600'
                    }>
                      {tier.price}
                    </span>
                  </div>
                  
                  <Badge className={`text-lg px-4 py-1 ${
                    tier.color === 'purple' ? 'bg-purple-100 text-purple-800' : 
                    tier.color === 'gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tier.pointMultiplier} Points
                  </Badge>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {tier.limitations.map((limitation, limitIndex) => (
                      <div key={limitIndex} className="flex items-center">
                        <X className="h-4 w-4 text-red-400 mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full mt-6 ${
                      tier.color === 'purple' ? 'bg-purple-600 hover:bg-purple-700' : 
                      tier.color === 'gold' ? 'bg-yellow-600 hover:bg-yellow-700' : 
                      'bg-gray-600 hover:bg-gray-700'
                    } text-white`}
                  >
                    {tier.price === 'Free' ? 'Current Plan' : `Upgrade to ${tier.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Benefits Comparison Table */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Feature Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4">Feature</th>
                    <th className="text-center py-4 px-4">Basic</th>
                    <th className="text-center py-4 px-4">VIP</th>
                    <th className="text-center py-4 px-4">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="py-4 px-4 font-medium">Point Multiplier</td>
                    <td className="text-center py-4 px-4">1x</td>
                    <td className="text-center py-4 px-4">2x</td>
                    <td className="text-center py-4 px-4">3x</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Monthly Bonus Coins</td>
                    <td className="text-center py-4 px-4"><X className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="text-center py-4 px-4">50 coins</td>
                    <td className="text-center py-4 px-4">150 coins</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Priority Support</td>
                    <td className="text-center py-4 px-4"><X className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-medium">Personal Advisor</td>
                    <td className="text-center py-4 px-4"><X className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><X className="h-4 w-4 text-red-400 mx-auto" /></td>
                    <td className="text-center py-4 px-4"><Check className="h-4 w-4 text-green-600 mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">How do point multipliers work?</h4>
              <p className="text-gray-600">Every donation you make earns you points. With VIP membership, you earn 2x points, and with Elite membership, you earn 3x points on every donation.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Can I cancel my membership anytime?</h4>
              <p className="text-gray-600">Yes, you can cancel your membership at any time. Your benefits will continue until the end of your current billing period.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">What happens to my points if I downgrade?</h4>
              <p className="text-gray-600">Your existing points remain in your account. However, future donations will earn points at the rate of your new membership tier.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Membership;

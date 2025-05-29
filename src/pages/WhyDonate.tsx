
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import { Shield, TrendingUp, Heart, Users, Award, CheckCircle, Star, Globe } from 'lucide-react';

const trustFactors = [
  {
    icon: Shield,
    title: '100% Donation Policy',
    description: 'Every penny of your donation reaches those in need. We cover operational costs separately.',
    color: 'blue'
  },
  {
    icon: Award,
    title: 'Verified Partners Only',
    description: 'All our charity partners are thoroughly vetted and regularly audited for transparency.',
    color: 'green'
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Tracking',
    description: 'See exactly where your money goes with live updates and impact reports.',
    color: 'purple'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Support causes in 40+ countries with our extensive partner network.',
    color: 'orange'
  }
];

const partnerRatings = [
  { name: 'Islamic Relief', rating: 4.9, projects: 24, impact: '150K+ lives' },
  { name: 'Human Appeal', rating: 4.8, projects: 18, impact: '95K+ lives' },
  { name: 'Muslim Aid', rating: 4.9, projects: 32, impact: '200K+ lives' },
  { name: 'MATW Project', rating: 4.7, projects: 12, impact: '45K+ lives' }
];

const distributionCriteria = [
  {
    title: 'Delivery Efficiency',
    weight: '40%',
    description: 'How quickly and effectively funds reach beneficiaries'
  },
  {
    title: 'Transparency Score',
    weight: '30%',
    description: 'Financial transparency and reporting standards'
  },
  {
    title: 'Impact Measurement',
    weight: '20%',
    description: 'Ability to demonstrate measurable outcomes'
  },
  {
    title: 'Community Trust',
    weight: '10%',
    description: 'Local community feedback and trust ratings'
  }
];

const WhyDonate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">Why Donate With Your Jannah?</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We've built the most transparent and efficient charitable giving platform, 
            ensuring your donations create maximum impact through our verified partner network 
            and intelligent fund distribution system.
          </p>
        </div>

        {/* Trust Factors */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Built on Trust & Transparency</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFactors.map((factor, index) => {
              const IconComponent = factor.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-4 rounded-full mb-4 ${
                      factor.color === 'blue' ? 'bg-blue-100' :
                      factor.color === 'green' ? 'bg-green-100' :
                      factor.color === 'purple' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      <IconComponent className={`h-8 w-8 ${
                        factor.color === 'blue' ? 'text-blue-600' :
                        factor.color === 'green' ? 'text-green-600' :
                        factor.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{factor.title}</h3>
                    <p className="text-gray-600">{factor.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partner Credibility */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Trusted Partners</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerRatings.map((partner, index) => (
              <Card key={index} className="border-l-4 border-l-islamic-green-500">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">{partner.name}</h3>
                    <Badge className="bg-islamic-green-100 text-islamic-green-800">
                      <Shield className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-current mr-1" />
                        <span className="font-semibold">{partner.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Projects</span>
                      <span className="font-semibold">{partner.projects}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Impact</span>
                      <span className="font-semibold text-islamic-green-700">{partner.impact}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fund Distribution Algorithm */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <CardHeader className="bg-islamic-green-600 text-white">
              <CardTitle className="text-center text-2xl">Intelligent Fund Distribution</CardTitle>
              <p className="text-center text-islamic-green-100">
                Our algorithm ensures funds go to the most effective charities based on proven metrics
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6">Distribution Criteria</h3>
                  <div className="space-y-4">
                    {distributionCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-islamic-green-100 rounded-full p-2 mr-4 mt-1">
                          <CheckCircle className="h-4 w-4 text-islamic-green-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center mb-1">
                            <h4 className="font-semibold mr-2">{criteria.title}</h4>
                            <Badge variant="outline">{criteria.weight}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm">{criteria.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Real-Time Monitoring</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Funds Delivered Today</span>
                      <span className="font-bold text-green-600">98.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Delivery Time</span>
                      <span className="font-bold">2.3 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Partner Compliance</span>
                      <span className="font-bold text-green-600">100%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Impact Verification</span>
                      <span className="font-bold">Real-time</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Impact Guarantee */}
        <div className="mb-16 bg-white rounded-xl p-8 border-2 border-islamic-green-200">
          <div className="text-center">
            <div className="inline-flex p-6 bg-islamic-green-100 rounded-full mb-6">
              <Heart className="h-16 w-16 text-islamic-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-islamic-green-800">Our Impact Guarantee</h2>
            <p className="text-xl text-gray-700 mb-6 max-w-3xl mx-auto">
              We guarantee that 100% of your donation reaches verified charities. 
              If you're not satisfied with the impact, we'll provide a full refund within 30 days.
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-islamic-green-600 hover:bg-islamic-green-700 px-8">
                <Heart className="h-5 w-5 mr-2" />
                Start Donating
              </Button>
              <Button variant="outline" className="border-islamic-green-600 text-islamic-green-700 hover:bg-islamic-green-50">
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Security & Compliance */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Security & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600 text-sm">256-bit SSL encryption protects all transactions</p>
              </div>
              <div>
                <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Charity Commission</h3>
                <p className="text-gray-600 text-sm">Registered and regulated by UK Charity Commission</p>
              </div>
              <div>
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Independent Audits</h3>
                <p className="text-gray-600 text-sm">Annual third-party audits ensure transparency</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-islamic-green-600 to-blue-600 text-white rounded-xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Impact?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of donors who trust Your Jannah for transparent, effective charitable giving
          </p>
          <Button className="bg-white text-islamic-green-600 hover:bg-gray-100 px-8 py-3">
            <Heart className="h-5 w-5 mr-2" />
            Make Your First Donation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WhyDonate;

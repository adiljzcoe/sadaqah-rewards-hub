
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ArrowRight, Users, Target, Globe } from 'lucide-react';

interface CharityHeroSectionProps {
  charity: {
    name: string;
    description?: string;
    logo_url?: string;
    total_raised?: number;
  };
}

const CharityHeroSection = ({ charity }: CharityHeroSectionProps) => {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-6">
            ✨ Official Charity Page
          </Badge>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Support <span className="text-blue-600">{charity.name}</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {charity.description || `Join thousands of supporters making a difference through ${charity.name}. Every donation counts towards building a better world.`}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Start Fundraising
            </Button>
          </div>
          
          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                £{charity.total_raised?.toLocaleString() || '0'}
              </div>
              <div className="text-gray-600">Total Raised</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2,500+</div>
              <div className="text-gray-600">Supporters</div>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">Global</div>
              <div className="text-gray-600">Impact</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CharityHeroSection;

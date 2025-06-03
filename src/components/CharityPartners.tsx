
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Heart, Shield, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const partners = [
  {
    id: 'islamic-relief',
    name: 'Islamic Relief',
    location: 'Gaza, Palestine',
    beneficiaries: '50,000+',
    focus: 'Emergency Aid',
    verified: true,
    raised: '£250,000',
    rating: 4.9,
    projects: 12
  },
  {
    id: 'muslim-aid',
    name: 'Muslim Aid',
    location: 'Syria',
    beneficiaries: '25,000+',
    focus: 'Education',
    verified: true,
    raised: '£180,000',
    rating: 4.8,
    projects: 8
  },
  {
    id: 'human-appeal',
    name: 'Human Appeal',
    location: 'Yemen',
    beneficiaries: '30,000+',
    focus: 'Water Wells',
    verified: true,
    raised: '£320,000',
    rating: 4.9,
    projects: 15
  },
  {
    id: 'matw-project',
    name: 'MATW Project',
    location: 'Bangladesh',
    beneficiaries: '15,000+',
    focus: 'Orphan Care',
    verified: true,
    raised: '£95,000',
    rating: 4.7,
    projects: 6
  }
];

const CharityPartners = () => {
  const navigate = useNavigate();

  const handleCharityClick = (charityId: string) => {
    navigate(`/charity/${charityId}`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Trusted Charity Partners</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          All partners are verified and 100% of donations reach those in need. 
          Our transparent system ensures your Sadaqah makes maximum impact.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {partners.map((partner, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-l-islamic-green-500">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <button
                  onClick={() => handleCharityClick(partner.id)}
                  className="text-left w-full group"
                >
                  <h3 className="font-bold text-lg text-islamic-green-800 mb-1 group-hover:text-islamic-green-600 group-hover:underline transition-colors">
                    {partner.name}
                  </h3>
                </button>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="h-3 w-3 mr-1" />
                  {partner.location}
                </div>
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{partner.rating}</span>
                  <span className="text-xs text-gray-500">({partner.projects} projects)</span>
                </div>
              </div>
              {partner.verified && (
                <Badge className="bg-islamic-green-100 text-islamic-green-800 hover:bg-islamic-green-200">
                  <Shield className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="bg-islamic-green-50 rounded-lg p-3">
                <div className="text-sm text-gray-600 mb-1">Total Raised</div>
                <div className="text-xl font-bold text-islamic-green-700">{partner.raised}</div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  Beneficiaries
                </span>
                <span className="font-medium">{partner.beneficiaries}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Focus Area</span>
                <Badge variant="secondary" className="text-xs">
                  {partner.focus}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-islamic-green-600 hover:bg-islamic-green-700 text-white"
                onClick={() => handleCharityClick(partner.id)}
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button 
                variant="outline" 
                className="w-full text-xs"
                onClick={() => handleCharityClick(partner.id)}
              >
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="text-center bg-islamic-green-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-islamic-green-800 mb-2">Become a Partner</h3>
        <p className="text-gray-600 mb-4">
          Join our network of trusted charities and reach more donors worldwide
        </p>
        <Button variant="outline" className="border-islamic-green-600 text-islamic-green-700 hover:bg-islamic-green-50">
          Apply as Partner
        </Button>
      </div>
    </div>
  );
};

export default CharityPartners;


import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Globe, MapPin, Star, Verified } from 'lucide-react';
import { useCharityPartners } from '@/hooks/useCharityPartners';
import { useEnhancedUTMTracking } from '@/hooks/useEnhancedUTMTracking';
import DonationWidget from '@/components/DonationWidget';
import CharityProductCard from '@/components/CharityProductCard';

const CharityPartnerPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { useCharityPartnerBySlug } = useCharityPartners();
  const { data: charityPartner, isLoading, error } = useCharityPartnerBySlug(slug || '');
  const { trackPageView, isCharityAttributed } = useEnhancedUTMTracking();

  useEffect(() => {
    if (charityPartner) {
      trackPageView({
        charity_partner_id: charityPartner.id,
        charity_id: charityPartner.charity_id,
        page_type: 'charity_partner_landing'
      });
    }
  }, [charityPartner, trackPageView]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading charity...</p>
        </div>
      </div>
    );
  }

  if (error || !charityPartner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Charity Not Found</h1>
          <p className="text-gray-600 mb-6">The charity you're looking for doesn't exist or is no longer active.</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  const charity = charityPartner.charities;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Attribution Banner */}
      {isCharityAttributed && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4 text-center text-sm">
          <span className="font-medium">✓ Your donations on this page will be attributed to {charity.name}</span>
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Charity Logo */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shadow-lg bg-gray-100 flex items-center justify-center">
                {charity.logo_url ? (
                  <img 
                    src={charity.logo_url} 
                    alt={charity.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl">🤲</span>
                )}
              </div>
            </div>

            {/* Charity Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{charity.name}</h1>
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  <Verified className="h-3 w-3 mr-1" />
                  Verified Partner
                </Badge>
              </div>
              
              <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                {charity.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
                {charity.website_url && (
                  <a 
                    href={charity.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-blue-600 transition-colors"
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">5.0</div>
                  <div className="text-xs text-gray-600">Trust Rating</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">98%</div>
                  <div className="text-xs text-gray-600">Funds Direct</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">24/7</div>
                  <div className="text-xs text-gray-600">Transparency</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">Global</div>
                  <div className="text-xs text-gray-600">Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donation Products */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Support Our Causes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our verified projects and see exactly how your donation makes a difference
          </p>
        </div>

        {charity.charity_products && charity.charity_products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {charity.charity_products.map((product: any) => (
              <CharityProductCard 
                key={product.id} 
                product={product}
                charityName={charity.name}
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">General Donation</h3>
            <p className="text-gray-600 mb-6">
              Support {charity.name}'s mission with a flexible donation amount
            </p>
            <DonationWidget charityId={charity.id} />
          </Card>
        )}
      </div>

      {/* Trust & Transparency */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Donate Through Our Platform?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Verified className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verified Impact</h3>
              <p className="text-gray-600 text-sm">
                Every project is verified and tracked for maximum transparency
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Earn Rewards</h3>
              <p className="text-gray-600 text-sm">
                Get Jannah Points and Sadaqah Coins for every donation made
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Global Reach</h3>
              <p className="text-gray-600 text-sm">
                Support causes worldwide with secure, instant transfers
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharityPartnerPage;

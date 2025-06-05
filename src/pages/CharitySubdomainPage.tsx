
import React from 'react';
import { useParams } from 'react-router-dom';
import { useCharityPartners } from '@/hooks/useCharityPartners';
import CharitySubdomainHeader from '@/components/charity-subdomain/CharitySubdomainHeader';
import CharityHeroSection from '@/components/charity-subdomain/CharityHeroSection';
import CharityDonationTools from '@/components/charity-subdomain/CharityDonationTools';
import CharityFundraisingSection from '@/components/charity-subdomain/CharityFundraisingSection';
import CharityStatsSection from '@/components/charity-subdomain/CharityStatsSection';
import Footer from '@/components/Footer';

const CharitySubdomainPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { useCharityPartnerBySlug } = useCharityPartners();
  const { data: charityPartner, isLoading } = useCharityPartnerBySlug(slug || '');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading charity page...</p>
        </div>
      </div>
    );
  }

  if (!charityPartner) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Charity Not Found</h1>
          <p className="text-gray-600">The charity subdomain you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CharitySubdomainHeader charity={charityPartner.charities} />
      
      <main>
        <CharityHeroSection charity={charityPartner.charities} />
        <CharityStatsSection charity={charityPartner.charities} />
        <CharityDonationTools charity={charityPartner.charities} />
        <CharityFundraisingSection charity={charityPartner.charities} />
      </main>
      
      <Footer />
    </div>
  );
};

export default CharitySubdomainPage;

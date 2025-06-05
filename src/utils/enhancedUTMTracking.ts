
export interface UTMParameters {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  utm_charity?: string;
}

export interface AttributionData {
  sessionId: string;
  userId?: string;
  utmParams: UTMParameters;
  referrer: string;
  landingPage: string;
  timestamp: string;
  deviceFingerprint: any;
  subdomain?: string;
}

// Generate charity partner subdomain URL with UTM parameters
export const generateCharityPartnerSubdomainURL = (
  charitySlug: string,
  utmParams: UTMParameters,
  path: string = '/'
): string => {
  const url = new URL(`https://${charitySlug}.yourjannah.com${path}`);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
};

// Extract charity attribution from subdomain or URL parameters
export const getCharityAttribution = (
  searchParams: URLSearchParams,
  currentDomain: string,
  storedAttribution?: AttributionData
): string | null => {
  // First check if we're on a charity subdomain
  if (currentDomain.includes('.yourjannah.com') && !currentDomain.startsWith('www.')) {
    const charitySlug = currentDomain.split('.')[0];
    return charitySlug;
  }
  
  // Then check URL parameters
  const utmCharity = searchParams.get('utm_charity');
  if (utmCharity) return utmCharity;
  
  // Check stored attribution (within 30 days)
  if (storedAttribution && storedAttribution.utmParams.utm_charity) {
    const attributionAge = Date.now() - new Date(storedAttribution.timestamp).getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    
    if (attributionAge < thirtyDaysMs) {
      return storedAttribution.utmParams.utm_charity;
    }
  }
  
  return null;
};

// Create UTM parameters for charity campaigns
export const createCharityCampaignUTM = (
  charitySlug: string,
  campaignName: string,
  platform: string,
  adSet?: string
): UTMParameters => {
  return {
    utm_source: platform,
    utm_medium: 'cpc',
    utm_campaign: campaignName,
    utm_content: adSet,
    utm_charity: charitySlug,
  };
};

// Revenue attribution logic for subdomain-based tracking
export const calculateRevenueAttribution = (
  donationAmount: number,
  isCharityAttributed: boolean,
  isFundraisingDonation: boolean,
  charityCommissionRate: number = 0.05,
  isSubdomainDonation: boolean = false
) => {
  if (isFundraisingDonation) {
    // Fundraising donations: 100% to platform, 0% to charity partner
    return {
      platformRevenue: donationAmount,
      charityPartnerRevenue: 0,
      platformFee: 0,
    };
  }
  
  if (isCharityAttributed || isSubdomainDonation) {
    // Charity attributed donation (via subdomain or UTM): charity gets most, platform gets commission
    const platformFee = donationAmount * charityCommissionRate;
    return {
      platformRevenue: platformFee,
      charityPartnerRevenue: donationAmount - platformFee,
      platformFee: platformFee,
    };
  }
  
  // Organic/direct donation: 100% to platform
  return {
    platformRevenue: donationAmount,
    charityPartnerRevenue: 0,
    platformFee: 0,
  };
};

// Generate campaign URLs for different platforms with subdomain support
export const generateSubdomainCampaignURLs = (
  charitySlug: string,
  campaignName: string,
  landingPath: string = '/'
) => {
  const campaigns = {
    facebook: createCharityCampaignUTM(charitySlug, campaignName, 'facebook'),
    instagram: createCharityCampaignUTM(charitySlug, campaignName, 'instagram'),
    google: createCharityCampaignUTM(charitySlug, campaignName, 'google'),
    tiktok: createCharityCampaignUTM(charitySlug, campaignName, 'tiktok'),
    email: createCharityCampaignUTM(charitySlug, campaignName, 'email'),
  };
  
  return Object.entries(campaigns).reduce((urls, [platform, utm]) => {
    urls[platform] = generateCharityPartnerSubdomainURL(charitySlug, utm, landingPath);
    return urls;
  }, {} as Record<string, string>);
};

// Check if current domain is a charity subdomain
export const isCharitySubdomain = (domain: string): boolean => {
  return domain.includes('.yourjannah.com') && 
         !domain.startsWith('www.') && 
         !domain.startsWith('app.') &&
         !domain.startsWith('admin.');
};

// Extract charity slug from subdomain
export const getCharitySlugFromSubdomain = (domain: string): string | null => {
  if (isCharitySubdomain(domain)) {
    return domain.split('.')[0];
  }
  return null;
};

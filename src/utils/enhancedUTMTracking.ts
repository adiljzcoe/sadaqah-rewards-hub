
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
}

// Generate charity partner URL with UTM parameters
export const generateCharityPartnerURL = (
  baseUrl: string,
  charitySlug: string,
  utmParams: UTMParameters
): string => {
  const url = new URL(`${baseUrl}/charity/${charitySlug}`);
  
  Object.entries(utmParams).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    }
  });
  
  return url.toString();
};

// Extract charity attribution from URL or stored data
export const getCharityAttribution = (
  searchParams: URLSearchParams,
  storedAttribution?: AttributionData
): string | null => {
  // First check URL parameters
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

// Revenue attribution logic
export const calculateRevenueAttribution = (
  donationAmount: number,
  isCharityAttributed: boolean,
  isFundraisingDonation: boolean,
  charityCommissionRate: number = 0.05
) => {
  if (isFundraisingDonation) {
    // Fundraising donations: 100% to platform, 0% to charity partner
    return {
      platformRevenue: donationAmount,
      charityPartnerRevenue: 0,
      platformFee: 0,
    };
  }
  
  if (isCharityAttributed) {
    // Charity attributed donation: charity gets most, platform gets commission
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

// Generate campaign URLs for different platforms
export const generateCampaignURLs = (
  baseUrl: string,
  charitySlug: string,
  campaignName: string
) => {
  const campaigns = {
    facebook: createCharityCampaignUTM(charitySlug, campaignName, 'facebook'),
    instagram: createCharityCampaignUTM(charitySlug, campaignName, 'instagram'),
    google: createCharityCampaignUTM(charitySlug, campaignName, 'google'),
    tiktok: createCharityCampaignUTM(charitySlug, campaignName, 'tiktok'),
    email: createCharityCampaignUTM(charitySlug, campaignName, 'email'),
  };
  
  return Object.entries(campaigns).reduce((urls, [platform, utm]) => {
    urls[platform] = generateCharityPartnerURL(baseUrl, charitySlug, utm);
    return urls;
  }, {} as Record<string, string>);
};

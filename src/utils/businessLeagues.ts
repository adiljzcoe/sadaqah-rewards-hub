
export interface BusinessLeague {
  id: string;
  name: string;
  tier: number;
  monthlyFee: number;
  currency: string;
  maxBusinesses: number;
  benefits: string[];
  promotionThreshold: number; // charity donation amount needed for promotion
  relegationThreshold: number; // minimum to avoid relegation
  color: string;
  icon: string;
  description: string;
}

export interface BusinessLeagueStanding {
  businessId: string;
  businessName: string;
  league: string;
  position: number;
  monthlyDonations: number;
  totalDonations: number;
  monthsInLeague: number;
  trend: 'up' | 'down' | 'stable';
  promotionEligible: boolean;
  relegationRisk: boolean;
}

export const businessLeagues: BusinessLeague[] = [
  {
    id: 'premier',
    name: 'Premier League',
    tier: 1,
    monthlyFee: 999,
    currency: 'GBP',
    maxBusinesses: 20,
    benefits: [
      'Premium branding opportunities',
      'Exclusive networking events',
      'Priority charity matching',
      'Custom impact reports',
      'Media coverage',
      'Board advisory access'
    ],
    promotionThreshold: 0, // Already top tier
    relegationThreshold: 5000,
    color: 'from-purple-600 to-indigo-700',
    icon: '👑',
    description: 'Elite tier for major corporate philanthropists'
  },
  {
    id: 'championship',
    name: 'Championship League',
    tier: 2,
    monthlyFee: 499,
    currency: 'GBP',
    maxBusinesses: 24,
    benefits: [
      'Enhanced visibility',
      'Quarterly networking events',
      'Advanced analytics',
      'Co-marketing opportunities',
      'Impact certificates'
    ],
    promotionThreshold: 15000,
    relegationThreshold: 2000,
    color: 'from-blue-500 to-blue-700',
    icon: '🥈',
    description: 'High-performing businesses driving significant impact'
  },
  {
    id: 'league-one',
    name: 'League One',
    tier: 3,
    monthlyFee: 249,
    currency: 'GBP',
    maxBusinesses: 24,
    benefits: [
      'Monthly networking meetups',
      'Standard analytics',
      'Charity matching program',
      'Recognition certificates'
    ],
    promotionThreshold: 8000,
    relegationThreshold: 1000,
    color: 'from-green-500 to-green-700',
    icon: '🥉',
    description: 'Growing businesses making meaningful contributions'
  },
  {
    id: 'league-two',
    name: 'League Two',
    tier: 4,
    monthlyFee: 99,
    currency: 'GBP',
    maxBusinesses: 24,
    benefits: [
      'Basic analytics',
      'Community recognition',
      'Entry-level networking',
      'Digital certificates'
    ],
    promotionThreshold: 3000,
    relegationThreshold: 0, // Bottom tier, no relegation
    color: 'from-orange-500 to-red-500',
    icon: '🔰',
    description: 'Entry-level league for new business philanthropists'
  }
];

export const getBusinessLeague = (leagueId: string): BusinessLeague | undefined => {
  return businessLeagues.find(league => league.id === leagueId);
};

export const getLeagueByTier = (tier: number): BusinessLeague | undefined => {
  return businessLeagues.find(league => league.tier === tier);
};

export const calculatePromotion = (currentLeague: string, monthlyDonation: number): BusinessLeague | null => {
  const league = getBusinessLeague(currentLeague);
  if (!league || league.tier === 1) return null;
  
  if (monthlyDonation >= league.promotionThreshold) {
    return getLeagueByTier(league.tier - 1) || null;
  }
  return null;
};

export const calculateRelegation = (currentLeague: string, monthlyDonation: number): BusinessLeague | null => {
  const league = getBusinessLeague(currentLeague);
  if (!league || league.tier === 4) return null;
  
  if (monthlyDonation < league.relegationThreshold) {
    return getLeagueByTier(league.tier + 1) || null;
  }
  return null;
};

// Mock data for demonstration
export const mockBusinessStandings: BusinessLeagueStanding[] = [
  // Premier League
  { businessId: '1', businessName: 'Global Tech Solutions', league: 'premier', position: 1, monthlyDonations: 25000, totalDonations: 300000, monthsInLeague: 12, trend: 'up', promotionEligible: false, relegationRisk: false },
  { businessId: '2', businessName: 'London Financial Group', league: 'premier', position: 2, monthlyDonations: 22000, totalDonations: 264000, monthsInLeague: 8, trend: 'stable', promotionEligible: false, relegationRisk: false },
  { businessId: '3', businessName: 'Metro Construction Ltd', league: 'premier', position: 3, monthlyDonations: 18000, totalDonations: 216000, monthsInLeague: 15, trend: 'down', promotionEligible: false, relegationRisk: false },
  { businessId: '4', businessName: 'Innovation Labs', league: 'premier', position: 20, monthlyDonations: 6000, totalDonations: 72000, monthsInLeague: 6, trend: 'down', promotionEligible: false, relegationRisk: true },
  
  // Championship League
  { businessId: '5', businessName: 'Digital Marketing Pro', league: 'championship', position: 1, monthlyDonations: 16000, totalDonations: 192000, monthsInLeague: 10, trend: 'up', promotionEligible: true, relegationRisk: false },
  { businessId: '6', businessName: 'Green Energy Co', league: 'championship', position: 2, monthlyDonations: 14500, totalDonations: 174000, monthsInLeague: 7, trend: 'up', promotionEligible: false, relegationRisk: false },
  { businessId: '7', businessName: 'Healthcare Solutions', league: 'championship', position: 24, monthlyDonations: 2200, totalDonations: 26400, monthsInLeague: 4, trend: 'down', promotionEligible: false, relegationRisk: true },
  
  // League One
  { businessId: '8', businessName: 'Local Restaurant Chain', league: 'league-one', position: 1, monthlyDonations: 9000, totalDonations: 108000, monthsInLeague: 9, trend: 'up', promotionEligible: true, relegationRisk: false },
  { businessId: '9', businessName: 'Fitness First', league: 'league-one', position: 2, monthlyDonations: 7500, totalDonations: 90000, monthsInLeague: 6, trend: 'stable', promotionEligible: false, relegationRisk: false },
  { businessId: '10', businessName: 'Small Tech Startup', league: 'league-one', position: 24, monthlyDonations: 1200, totalDonations: 14400, monthsInLeague: 3, trend: 'down', promotionEligible: false, relegationRisk: true },
  
  // League Two
  { businessId: '11', businessName: 'Corner Coffee Shop', league: 'league-two', position: 1, monthlyDonations: 3200, totalDonations: 38400, monthsInLeague: 12, trend: 'up', promotionEligible: true, relegationRisk: false },
  { businessId: '12', businessName: 'Local Bakery', league: 'league-two', position: 2, monthlyDonations: 2800, totalDonations: 33600, monthsInLeague: 8, trend: 'stable', promotionEligible: false, relegationRisk: false },
  { businessId: '13', businessName: 'Startup Inc', league: 'league-two', position: 24, monthlyDonations: 250, totalDonations: 3000, monthsInLeague: 2, trend: 'stable', promotionEligible: false, relegationRisk: false }
];

export const getLeagueStandings = (leagueId: string): BusinessLeagueStanding[] => {
  return mockBusinessStandings
    .filter(standing => standing.league === leagueId)
    .sort((a, b) => a.position - b.position);
};

export const getAllStandingsByLeague = (): Record<string, BusinessLeagueStanding[]> => {
  const standings: Record<string, BusinessLeagueStanding[]> = {};
  businessLeagues.forEach(league => {
    standings[league.id] = getLeagueStandings(league.id);
  });
  return standings;
};

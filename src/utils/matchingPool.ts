
export interface MatchingPoolEntry {
  id: string;
  userId: string;
  userName: string;
  donationId: string;
  sadaqahCoinsAmount: number;
  jannahPointsSource: number;
  timestamp: string;
  matched: boolean;
  matchedBy?: string;
  matchedBusinessName?: string;
  matchedTimestamp?: string;
  campaignId?: string;
  campaignName?: string;
}

export interface BusinessMatch {
  businessId: string;
  businessName: string;
  poolEntryId: string;
  matchAmount: number;
  advertisingValue: number;
  timestamp: string;
}

export const getMatchingPool = (): MatchingPoolEntry[] => {
  const saved = localStorage.getItem('matchingPool');
  return saved ? JSON.parse(saved) : [];
};

export const addToMatchingPool = (entry: Omit<MatchingPoolEntry, 'id' | 'timestamp' | 'matched'>): MatchingPoolEntry => {
  const newEntry: MatchingPoolEntry = {
    ...entry,
    id: `mp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    matched: false
  };
  
  const pool = getMatchingPool();
  pool.push(newEntry);
  localStorage.setItem('matchingPool', JSON.stringify(pool));
  
  console.log('Added to matching pool:', newEntry);
  return newEntry;
};

export const getUnmatchedPoolTotal = (): number => {
  const pool = getMatchingPool();
  return pool
    .filter(entry => !entry.matched)
    .reduce((total, entry) => total + entry.sadaqahCoinsAmount, 0);
};

export const getMatchedPoolTotal = (): number => {
  const pool = getMatchingPool();
  return pool
    .filter(entry => entry.matched)
    .reduce((total, entry) => total + entry.sadaqahCoinsAmount, 0);
};

export const getUserUnmatchedCoins = (userId: string): number => {
  const pool = getMatchingPool();
  return pool
    .filter(entry => entry.userId === userId && !entry.matched)
    .reduce((total, entry) => total + entry.sadaqahCoinsAmount, 0);
};

export const matchPoolEntry = (poolEntryId: string, businessId: string, businessName: string): boolean => {
  const pool = getMatchingPool();
  const entryIndex = pool.findIndex(entry => entry.id === poolEntryId && !entry.matched);
  
  if (entryIndex === -1) {
    return false;
  }
  
  pool[entryIndex].matched = true;
  pool[entryIndex].matchedBy = businessId;
  pool[entryIndex].matchedBusinessName = businessName;
  pool[entryIndex].matchedTimestamp = new Date().toISOString();
  
  localStorage.setItem('matchingPool', JSON.stringify(pool));
  console.log('Pool entry matched:', pool[entryIndex]);
  
  return true;
};

export const getRecentMatches = (limit: number = 10): MatchingPoolEntry[] => {
  const pool = getMatchingPool();
  return pool
    .filter(entry => entry.matched)
    .sort((a, b) => new Date(b.matchedTimestamp!).getTime() - new Date(a.matchedTimestamp!).getTime())
    .slice(0, limit);
};

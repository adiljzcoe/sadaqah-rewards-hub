
export interface League {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  minPoints: number;
  maxPoints: number;
  benefits: string[];
}

export const leagues: League[] = [
  {
    name: "Bronze Givers",
    icon: "🥉",
    color: "text-amber-600",
    gradient: "from-amber-400 to-orange-500",
    minPoints: 0,
    maxPoints: 999,
    benefits: ["Basic recognition", "Community access"]
  },
  {
    name: "Silver Hearts",
    icon: "🥈", 
    color: "text-gray-500",
    gradient: "from-gray-400 to-gray-600",
    minPoints: 1000,
    maxPoints: 2999,
    benefits: ["Silver badge", "Monthly newsletter", "Priority support"]
  },
  {
    name: "Gold Donors",
    icon: "🥇",
    color: "text-yellow-500", 
    gradient: "from-yellow-400 to-yellow-600",
    minPoints: 3000,
    maxPoints: 7999,
    benefits: ["Gold badge", "Exclusive events", "Tax reports"]
  },
  {
    name: "Platinum Philanthropists",
    icon: "💎",
    color: "text-blue-400",
    gradient: "from-blue-400 to-purple-500", 
    minPoints: 8000,
    maxPoints: 14999,
    benefits: ["Platinum status", "VIP access", "Personal advisor"]
  },
  {
    name: "Diamond Saints",
    icon: "👑",
    color: "text-purple-500",
    gradient: "from-purple-500 to-pink-500",
    minPoints: 15000,
    maxPoints: Infinity,
    benefits: ["Ultimate status", "All benefits", "Legacy program"]
  }
];

export const getUserLeague = (points: number): League => {
  return leagues.find(league => points >= league.minPoints && points <= league.maxPoints) || leagues[0];
};

export const getNextLeague = (currentPoints: number): League | null => {
  const currentLeague = getUserLeague(currentPoints);
  const currentIndex = leagues.findIndex(league => league.name === currentLeague.name);
  return currentIndex < leagues.length - 1 ? leagues[currentIndex + 1] : null;
};

export const getLeagueProgress = (points: number): number => {
  const currentLeague = getUserLeague(points);
  const progress = ((points - currentLeague.minPoints) / (currentLeague.maxPoints - currentLeague.minPoints)) * 100;
  return Math.min(progress, 100);
};

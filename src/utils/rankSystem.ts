
export interface Rank {
  name: string;
  icon: string;
  color: string;
  gradient: string;
  minPoints: number;
  maxPoints: number;
  badge: string;
  description: string;
  benefits: string[];
}

export const ranks: Rank[] = [
  {
    name: "Novice Helper",
    icon: "🌱",
    color: "text-green-600",
    gradient: "from-green-400 to-green-600",
    minPoints: 0,
    maxPoints: 999,
    badge: "Beginner",
    description: "Starting your charity journey",
    benefits: ["Basic recognition", "Community access"]
  },
  {
    name: "Kind Heart",
    icon: "💚",
    color: "text-emerald-600", 
    gradient: "from-emerald-400 to-emerald-600",
    minPoints: 1000,
    maxPoints: 2999,
    badge: "Helper",
    description: "Showing consistent kindness",
    benefits: ["Green badge", "Monthly updates", "Priority support"]
  },
  {
    name: "Guardian Angel",
    icon: "👼",
    color: "text-blue-600",
    gradient: "from-blue-400 to-blue-600", 
    minPoints: 3000,
    maxPoints: 5999,
    badge: "Guardian",
    description: "Protecting those in need",
    benefits: ["Blue badge", "Exclusive events", "Impact reports"]
  },
  {
    name: "Noble Champion",
    icon: "⚔️",
    color: "text-purple-600",
    gradient: "from-purple-400 to-purple-600",
    minPoints: 6000,
    maxPoints: 9999,
    badge: "Champion",
    description: "Fighting for justice",
    benefits: ["Purple badge", "VIP access", "Personal advisor"]
  },
  {
    name: "Divine Saint",
    icon: "👑",
    color: "text-yellow-600",
    gradient: "from-yellow-400 to-amber-600",
    minPoints: 10000,
    maxPoints: Infinity,
    badge: "Saint",
    description: "Blessed with divine purpose",
    benefits: ["Golden crown", "All benefits", "Legacy status"]
  }
];

export const getUserRank = (points: number): Rank => {
  return ranks.find(rank => points >= rank.minPoints && points <= rank.maxPoints) || ranks[0];
};

export const getNextRank = (currentPoints: number): Rank | null => {
  const currentRank = getUserRank(currentPoints);
  const currentIndex = ranks.findIndex(rank => rank.name === currentRank.name);
  return currentIndex < ranks.length - 1 ? ranks[currentIndex + 1] : null;
};

export const getRankProgress = (points: number): number => {
  const currentRank = getUserRank(points);
  if (currentRank.maxPoints === Infinity) return 100;
  const progress = ((points - currentRank.minPoints) / (currentRank.maxPoints - currentRank.minPoints)) * 100;
  return Math.min(progress, 100);
};

export const getPointsToNextRank = (points: number): number => {
  const nextRank = getNextRank(points);
  return nextRank ? nextRank.minPoints - points : 0;
};

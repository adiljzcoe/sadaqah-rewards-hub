
export interface MosqueTeam {
  id: string;
  team_name: string;
  team_type: 'mosque' | 'madrassah';
  sport: 'football' | 'cricket';
  masjid_id: string;
  contact_person?: string;
  contact_email?: string;
  contact_phone?: string;
  home_ground?: string;
  team_logo_url?: string;
  established_year?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  mosque_name?: string;
}

export interface SportsMatch {
  id: string;
  home_team_id: string;
  away_team_id: string;
  sport: 'football' | 'cricket';
  match_date: string;
  venue?: string;
  home_score?: number;
  away_score?: number;
  match_status: 'scheduled' | 'completed' | 'cancelled' | 'postponed';
  season: string;
  league_division: string;
  match_notes?: string;
  charity_raised: number;
  home_team?: MosqueTeam;
  away_team?: MosqueTeam;
}

export interface SportsLeagueStanding {
  id: string;
  team_id: string;
  season: string;
  division: string;
  sport: 'football' | 'cricket';
  matches_played: number;
  wins: number;
  draws: number;
  losses: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
  position?: number;
  form?: string;
  team?: MosqueTeam;
}

export interface MosqueCharityStanding {
  id: string;
  masjid_id: string;
  season: string;
  total_raised: number;
  monthly_raised: number;
  position?: number;
  months_active: number;
  sports_bonus_multiplier: number;
  trend: 'up' | 'down' | 'stable';
  last_donation_date?: string;
  mosque_name?: string;
}

// Mock data for demonstration
export const mockMosqueTeams: MosqueTeam[] = [
  {
    id: '1',
    team_name: 'Al-Noor FC',
    team_type: 'mosque',
    sport: 'football',
    masjid_id: 'mosque1',
    contact_person: 'Ahmed Ali',
    contact_email: 'ahmed@alnoor.org',
    home_ground: 'Community Park',
    established_year: 2020,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Al-Noor Mosque'
  },
  {
    id: '2',
    team_name: 'Baitul Aman Cricket Club',
    team_type: 'mosque',
    sport: 'cricket',
    masjid_id: 'mosque2',
    contact_person: 'Omar Hassan',
    contact_email: 'omar@baitulaman.org',
    home_ground: 'Local Cricket Ground',
    established_year: 2019,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Baitul Aman Mosque'
  },
  {
    id: '3',
    team_name: 'Green Lane Madrassa FC',
    team_type: 'madrassah',
    sport: 'football',
    masjid_id: 'mosque3',
    contact_person: 'Yusuf Ahmed',
    contact_email: 'yusuf@greenlane.edu',
    home_ground: 'School Field',
    established_year: 2021,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Green Lane Madrassa'
  }
];

export const mockSportsStandings: SportsLeagueStanding[] = [
  {
    id: '1',
    team_id: '1',
    season: '2024-25',
    division: 'Division 1',
    sport: 'football',
    matches_played: 10,
    wins: 7,
    draws: 2,
    losses: 1,
    goals_for: 22,
    goals_against: 8,
    goal_difference: 14,
    points: 23,
    position: 1,
    form: 'WWDWW',
    team: mockMosqueTeams[0]
  },
  {
    id: '2',
    team_id: '3',
    season: '2024-25',
    division: 'Division 1',
    sport: 'football',
    matches_played: 10,
    wins: 5,
    draws: 3,
    losses: 2,
    goals_for: 18,
    goals_against: 12,
    goal_difference: 6,
    points: 18,
    position: 2,
    form: 'WDWDL',
    team: mockMosqueTeams[2]
  }
];

export const mockCharityStandings: MosqueCharityStanding[] = [
  {
    id: '1',
    masjid_id: 'mosque1',
    season: '2024-25',
    total_raised: 15000,
    monthly_raised: 2500,
    position: 1,
    months_active: 6,
    sports_bonus_multiplier: 1.2, // 20% bonus for sports success
    trend: 'up',
    last_donation_date: '2024-01-15',
    mosque_name: 'Al-Noor Mosque'
  },
  {
    id: '2',
    masjid_id: 'mosque2',
    season: '2024-25',
    total_raised: 12000,
    monthly_raised: 2000,
    position: 2,
    months_active: 6,
    sports_bonus_multiplier: 1.0,
    trend: 'stable',
    last_donation_date: '2024-01-10',
    mosque_name: 'Baitul Aman Mosque'
  },
  {
    id: '3',
    masjid_id: 'mosque3',
    season: '2024-25',
    total_raised: 8500,
    monthly_raised: 1800,
    position: 3,
    months_active: 5,
    sports_bonus_multiplier: 1.1, // 10% bonus for decent sports performance
    trend: 'up',
    last_donation_date: '2024-01-12',
    mosque_name: 'Green Lane Madrassa'
  }
];

export const getSportsStandingsBySport = (sport: 'football' | 'cricket'): SportsLeagueStanding[] => {
  return mockSportsStandings
    .filter(standing => standing.sport === sport)
    .sort((a, b) => (b.points - a.points) || (b.goal_difference - a.goal_difference));
};

export const getCharityStandings = (): MosqueCharityStanding[] => {
  return mockCharityStandings.sort((a, b) => b.total_raised - a.total_raised);
};

export const getTeamsBySport = (sport: 'football' | 'cricket'): MosqueTeam[] => {
  return mockMosqueTeams.filter(team => team.sport === sport && team.is_active);
};

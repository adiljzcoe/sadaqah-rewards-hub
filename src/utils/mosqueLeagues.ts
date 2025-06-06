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
  round_number?: number;
  match_week?: number;
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

export interface LeagueFixture {
  round: number;
  matches: SportsMatch[];
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
  },
  {
    id: '4',
    team_name: 'Islamic Centre United',
    team_type: 'mosque',
    sport: 'football',
    masjid_id: 'mosque4',
    contact_person: 'Hassan Khan',
    contact_email: 'hassan@islamiccentre.org',
    home_ground: 'Central Sports Ground',
    established_year: 2018,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Islamic Centre'
  },
  {
    id: '5',
    team_name: 'Masjid Al-Furqan FC',
    team_type: 'mosque',
    sport: 'football',
    masjid_id: 'mosque5',
    contact_person: 'Ibrahim Ahmed',
    contact_email: 'ibrahim@alfurqan.org',
    home_ground: 'Furqan Sports Complex',
    established_year: 2019,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Masjid Al-Furqan'
  },
  {
    id: '6',
    team_name: 'Dar Al-Huda Athletic',
    team_type: 'madrassah',
    sport: 'football',
    masjid_id: 'mosque6',
    contact_person: 'Abdul Rahman',
    contact_email: 'abdul@daralhuda.edu',
    home_ground: 'Academy Grounds',
    established_year: 2020,
    is_active: true,
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    mosque_name: 'Dar Al-Huda Academy'
  }
];

export const mockSportsStandings: SportsLeagueStanding[] = [
  {
    id: '1',
    team_id: '1',
    season: '2024-25',
    division: 'National League',
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
    division: 'National League',
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
  },
  {
    id: '3',
    team_id: '4',
    season: '2024-25',
    division: 'National League',
    sport: 'football',
    matches_played: 9,
    wins: 4,
    draws: 3,
    losses: 2,
    goals_for: 15,
    goals_against: 11,
    goal_difference: 4,
    points: 15,
    position: 3,
    form: 'DWWLD',
    team: mockMosqueTeams[3]
  },
  {
    id: '4',
    team_id: '5',
    season: '2024-25',
    division: 'National League',
    sport: 'football',
    matches_played: 9,
    wins: 3,
    draws: 4,
    losses: 2,
    goals_for: 12,
    goals_against: 10,
    goal_difference: 2,
    points: 13,
    position: 4,
    form: 'DDWDL',
    team: mockMosqueTeams[4]
  },
  {
    id: '5',
    team_id: '6',
    season: '2024-25',
    division: 'National League',
    sport: 'football',
    matches_played: 8,
    wins: 2,
    draws: 2,
    losses: 4,
    goals_for: 8,
    goals_against: 14,
    goal_difference: -6,
    points: 8,
    position: 5,
    form: 'LLDWD',
    team: mockMosqueTeams[5]
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

// Fixture generation system
export const generateRoundRobinFixtures = (teams: MosqueTeam[], sport: 'football' | 'cricket', season: string = '2024-25'): LeagueFixture[] => {
  if (teams.length < 2) return [];
  
  const fixtures: LeagueFixture[] = [];
  const teamIds = teams.map(team => team.id);
  const numTeams = teamIds.length;
  const isEven = numTeams % 2 === 0;
  
  // Add a dummy team if odd number of teams
  if (!isEven) {
    teamIds.push('BYE');
  }
  
  const totalRounds = isEven ? numTeams - 1 : numTeams;
  
  for (let round = 0; round < totalRounds; round++) {
    const roundMatches: SportsMatch[] = [];
    
    for (let match = 0; match < teamIds.length / 2; match++) {
      const home = teamIds[match];
      const away = teamIds[teamIds.length - 1 - match];
      
      // Skip if one team is 'BYE'
      if (home === 'BYE' || away === 'BYE') continue;
      
      const homeTeam = teams.find(t => t.id === home);
      const awayTeam = teams.find(t => t.id === away);
      
      if (homeTeam && awayTeam) {
        // Calculate match date (spread over season)
        const seasonStartDate = new Date('2024-09-01');
        const matchDate = new Date(seasonStartDate);
        matchDate.setDate(matchDate.getDate() + (round * 7) + (match * 2)); // Weekly rounds, matches spread over days
        
        roundMatches.push({
          id: `match-${round}-${match}-${home}-${away}`,
          home_team_id: home,
          away_team_id: away,
          sport,
          match_date: matchDate.toISOString(),
          venue: homeTeam.home_ground || 'TBD',
          match_status: 'scheduled',
          season,
          league_division: 'National League',
          charity_raised: 0,
          round_number: round + 1,
          match_week: round + 1,
          home_team: homeTeam,
          away_team: awayTeam
        });
      }
    }
    
    if (roundMatches.length > 0) {
      fixtures.push({
        round: round + 1,
        matches: roundMatches
      });
    }
    
    // Rotate teams (keep first team fixed, rotate others)
    if (teamIds.length > 2) {
      const lastTeam = teamIds.pop()!;
      teamIds.splice(1, 0, lastTeam);
    }
  }
  
  return fixtures;
};

// Generate return fixtures (away games become home games)
export const generateFullSeasonFixtures = (teams: MosqueTeam[], sport: 'football' | 'cricket', season: string = '2024-25'): LeagueFixture[] => {
  const firstHalf = generateRoundRobinFixtures(teams, sport, season);
  const secondHalf: LeagueFixture[] = [];
  
  firstHalf.forEach((fixture, fixtureIndex) => {
    const returnMatches: SportsMatch[] = fixture.matches.map((match, matchIndex) => {
      const returnDate = new Date(match.match_date);
      returnDate.setMonth(returnDate.getMonth() + 3); // Second half of season
      
      return {
        ...match,
        id: `return-${fixture.round}-${matchIndex}-${match.away_team_id}-${match.home_team_id}`,
        home_team_id: match.away_team_id,
        away_team_id: match.home_team_id,
        home_team: match.away_team,
        away_team: match.home_team,
        match_date: returnDate.toISOString(),
        venue: match.away_team?.home_ground || 'TBD',
        round_number: fixture.round + firstHalf.length,
        match_week: fixture.round + firstHalf.length
      };
    });
    
    secondHalf.push({
      round: fixture.round + firstHalf.length,
      matches: returnMatches
    });
  });
  
  return [...firstHalf, ...secondHalf];
};

// Get upcoming fixtures
export const getUpcomingFixtures = (sport: 'football' | 'cricket', limit: number = 10): SportsMatch[] => {
  const teams = getTeamsBySport(sport);
  const fixtures = generateRoundRobinFixtures(teams, sport);
  
  return fixtures
    .flatMap(fixture => fixture.matches)
    .filter(match => new Date(match.match_date) > new Date())
    .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime())
    .slice(0, limit);
};

// Get completed fixtures
export const getCompletedFixtures = (sport: 'football' | 'cricket', limit: number = 10): SportsMatch[] => {
  const teams = getTeamsBySport(sport);
  const fixtures = generateRoundRobinFixtures(teams, sport);
  
  return fixtures
    .flatMap(fixture => fixture.matches)
    .filter(match => new Date(match.match_date) < new Date())
    .map(match => ({
      ...match,
      match_status: 'completed' as const,
      home_score: Math.floor(Math.random() * 4),
      away_score: Math.floor(Math.random() * 4)
    }))
    .sort((a, b) => new Date(b.match_date).getTime() - new Date(a.match_date).getTime())
    .slice(0, limit);
};

// Calculate league table from matches
export const calculateLeagueTable = (matches: SportsMatch[], teams: MosqueTeam[]): SportsLeagueStanding[] => {
  const standings: { [teamId: string]: SportsLeagueStanding } = {};
  
  // Initialize standings for all teams
  teams.forEach(team => {
    standings[team.id] = {
      id: `standing-${team.id}`,
      team_id: team.id,
      season: '2024-25',
      division: 'National League',
      sport: team.sport,
      matches_played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goals_for: 0,
      goals_against: 0,
      goal_difference: 0,
      points: 0,
      form: '',
      team
    };
  });
  
  // Process completed matches
  matches
    .filter(match => match.match_status === 'completed' && match.home_score !== undefined && match.away_score !== undefined)
    .forEach(match => {
      const homeStanding = standings[match.home_team_id];
      const awayStanding = standings[match.away_team_id];
      
      if (homeStanding && awayStanding) {
        homeStanding.matches_played++;
        awayStanding.matches_played++;
        
        homeStanding.goals_for += match.home_score!;
        homeStanding.goals_against += match.away_score!;
        awayStanding.goals_for += match.away_score!;
        awayStanding.goals_against += match.home_score!;
        
        if (match.home_score! > match.away_score!) {
          // Home win
          homeStanding.wins++;
          homeStanding.points += 3;
          awayStanding.losses++;
        } else if (match.home_score! < match.away_score!) {
          // Away win
          awayStanding.wins++;
          awayStanding.points += 3;
          homeStanding.losses++;
        } else {
          // Draw
          homeStanding.draws++;
          awayStanding.draws++;
          homeStanding.points++;
          awayStanding.points++;
        }
        
        homeStanding.goal_difference = homeStanding.goals_for - homeStanding.goals_against;
        awayStanding.goal_difference = awayStanding.goals_for - awayStanding.goals_against;
      }
    });
  
  // Sort by points, then goal difference, then goals for
  const sortedStandings = Object.values(standings).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goal_difference !== a.goal_difference) return b.goal_difference - a.goal_difference;
    return b.goals_for - a.goals_for;
  });
  
  // Add positions
  sortedStandings.forEach((standing, index) => {
    standing.position = index + 1;
  });
  
  return sortedStandings;
};

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

// Get fixtures for a specific round
export const getFixturesByRound = (sport: 'football' | 'cricket', round: number): SportsMatch[] => {
  const teams = getTeamsBySport(sport);
  const fixtures = generateRoundRobinFixtures(teams, sport);
  const roundFixture = fixtures.find(f => f.round === round);
  return roundFixture ? roundFixture.matches : [];
};

// Get all rounds for a sport
export const getAllRounds = (sport: 'football' | 'cricket'): number[] => {
  const teams = getTeamsBySport(sport);
  const fixtures = generateRoundRobinFixtures(teams, sport);
  return fixtures.map(f => f.round);
};

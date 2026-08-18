import type { MatchData } from '../logic/streaks';

const API_KEY = 'c3e40bbc2c34eb562bd85e21c0dc68af';

const BASE_URL = 'https://v3.football.api-sports.io';

const headers = {
    'x-apisports-key': API_KEY
};

// Use mock data for testing if no key is provided.
const USE_MOCK = true;

export async function fetchLiveMatches(leagueIds: number[]): Promise<MatchData[]> {
    if (USE_MOCK) return getMockLiveMatches(leagueIds);

    const idsStr = leagueIds.join('-');
    try {
        const response = await fetch(`${BASE_URL}/fixtures?live=all&league=${idsStr}`, {
            method: 'GET',
            headers
        });
        const result = await response.json();
        return result.response.map(mapResponseToMatchData);
    } catch (error) {
        console.error('API Error fetching live matches:', error);
        return [];
    }
}

export async function fetchRecentMatches(leagueId: number, count: number = 20): Promise<MatchData[]> {
    if (USE_MOCK) return getMockRecentMatches(leagueId);

    try {
        // Free API constraint: Cannot use 'last', and fetching whole season is too heavy.
        // We'll fetch just the last 30 days of matches for the given league
        const today = new Date();
        const to = today.toISOString().split('T')[0];

        const pastDate = new Date();
        pastDate.setDate(today.getDate() - 30);
        const from = pastDate.toISOString().split('T')[0];

        const currentYear = today.getFullYear();
        let season = currentYear;
        if (today.getMonth() < 7 && leagueId !== 265 && leagueId !== 239) {
            season = currentYear - 1;
        }

        const response = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&season=${season}&from=${from}&to=${to}&status=FT-AET-PEN`, {
            method: 'GET',
            headers
        });
        const result = await response.json();

        let matches = result.response || [];

        // Sort by date descending to get the most recent ones first
        matches.sort((a: any, b: any) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime());

        // Take the latest ones, but reverse them back so oldest is processed first
        const recentMatches = matches.slice(0, count).reverse();

        return recentMatches.map(mapResponseToMatchData);
    } catch (error) {
        console.error('API Error fetching recent matches:', error);
        return [];
    }
}

export async function fetchUpcomingMatches(leagueId: number, count: number = 10): Promise<any[]> {
    if (USE_MOCK) return getMockUpcomingMatches(leagueId);

    try {
        const response = await fetch(`${BASE_URL}/fixtures?league=${leagueId}&next=${count}`, {
            method: 'GET',
            headers
        });
        const result = await response.json();
        
        let matches = result.response || [];
        return matches.map((fixtureItem: any) => ({
            id: fixtureItem.fixture.id,
            date: fixtureItem.fixture.date, // Important for grouping
            homeTeam: fixtureItem.teams.home.name,
            awayTeam: fixtureItem.teams.away.name,
            homeLogo: fixtureItem.teams.home.logo,
            awayLogo: fixtureItem.teams.away.logo,
            leagueId: fixtureItem.league.id,
            leagueName: fixtureItem.league.name,
            status: fixtureItem.fixture.status.short,
        }));
    } catch (error) {
        console.error('API Error fetching upcoming matches:', error);
        return [];
    }
}

function mapResponseToMatchData(fixtureItem: any): MatchData {
    return {
        id: fixtureItem.fixture.id,
        homeTeam: fixtureItem.teams.home.name,
        awayTeam: fixtureItem.teams.away.name,
        homeLogo: fixtureItem.teams.home.logo,
        awayLogo: fixtureItem.teams.away.logo,
        leagueId: fixtureItem.league.id,
        leagueName: fixtureItem.league.name,
        status: fixtureItem.fixture.status.short, // '1H', 'HT', '2H', 'FT'
        elapsed: fixtureItem.fixture.status.elapsed,
        goalsHome: fixtureItem.goals.home || 0,
        goalsAway: fixtureItem.goals.away || 0,
        halftimeHome: fixtureItem.score.halftime.home || 0,
        halftimeAway: fixtureItem.score.halftime.away || 0,
    };
}

// ==========================================
// MOCK DATA FOR TESTING WITHOUT AN API KEY
// ==========================================

function getMockLiveMatches(leagueIds: number[]): MatchData[] {
    console.log("Using Mock Live Matches");
    return [
        {
            id: 10001,
            homeTeam: "Mock Real Madrid", awayTeam: "Mock Barcelona",
            homeLogo: "https://media.api-sports.io/football/teams/541.png",
            awayLogo: "https://media.api-sports.io/football/teams/529.png",
            leagueId: 140, leagueName: "La Liga",
            status: "2H", elapsed: 75,
            goalsHome: 2, goalsAway: 2, halftimeHome: 1, halftimeAway: 1
        }
    ].filter(m => leagueIds.includes(m.leagueId));
}

function getMockRecentMatches(leagueId: number): MatchData[] {
    // Array determinístico para asegurar que todas las rachas superen 0 y luego se corten
    // gh = goalsHome, ga = goalsAway, hth = htHome, hta = htAway
    const mockResults = [
        { gh: 0, ga: 0, hth: 0, hta: 0 }, // Empate FT, Empate HT, under 3.5
        { gh: 1, ga: 0, hth: 1, hta: 0 }, // Gana local, Gana local HT
        { gh: 0, ga: 2, hth: 0, hta: 1 }, // Gana visita, Gana visita HT
        { gh: 3, ga: 0, hth: 2, hta: 0 }, // Gana local, Gana local HT
        { gh: 1, ga: 1, hth: 1, hta: 1 }, // Empate FT, Empate HT (Corta racha de Sin Empate, y de Ambos marcan 1H)
        { gh: 0, ga: 1, hth: 0, hta: 0 }, // Gana visita, Empate HT
        { gh: 2, ga: 0, hth: 1, hta: 0 }, // Gana local
        { gh: 3, ga: 2, hth: 2, hta: 1 }, // Local gana, > 3.5 goles, Ambos Marcan (Corta racha de Menos 3.5, y Sin BTTS+>2.5)
        { gh: 1, ga: 0, hth: 1, hta: 0 }, // Gana local
        { gh: 0, ga: 1, hth: 0, hta: 1 }, // Gana visita
    ];

    return mockResults.map((res, i) => ({
        id: leagueId * 1000 + i,
        homeTeam: "Equipo Local " + i, awayTeam: "Equipo Visita " + i,
        homeLogo: "", awayLogo: "",
        leagueId: leagueId, leagueName: "Mock League",
        status: "FT", elapsed: 90,
        goalsHome: res.gh,
        goalsAway: res.ga,
        halftimeHome: res.hth,
        halftimeAway: res.hta
    }));
}

function getMockUpcomingMatches(leagueId: number): any[] {
    // Generate dates for tomorrow and the day after tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(15, 0, 0, 0); // 15:00
    
    // We create 2 matches for "tomorrow", and 1 for the day after.
    // The UI should group and only show the 2 matches happening "tomorrow", 
    // because that's the closest day.
    return [
        {
            id: leagueId * 2000 + 1,
            date: tomorrow.toISOString(),
            homeTeam: "Futbol Club A", awayTeam: "Atlético B",
            homeLogo: "", awayLogo: "",
            leagueId: leagueId, leagueName: "Mock League",
            status: "NS"
        },
        {
            id: leagueId * 2000 + 2,
            date: new Date(tomorrow.getTime() + 2 * 60 * 60 * 1000).toISOString(), // +2 hours
            homeTeam: "Deportivo C", awayTeam: "Real D",
            homeLogo: "", awayLogo: "",
            leagueId: leagueId, leagueName: "Mock League",
            status: "NS"
        }
    ];
}

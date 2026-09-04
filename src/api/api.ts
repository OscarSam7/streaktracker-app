import type { MatchData } from '../logic/streaks';

export interface DataTelemetryMetadata {
  lastUpdated: string;
  dataSource: 'PROXY_BACKEND' | 'API_SPORTS_LIVE' | 'CENTRAL_CACHE' | 'LOCAL_PERSISTENT_CACHE' | 'MOCK_FALLBACK';
  dataFreshness: 'FRESH' | 'CACHED' | 'FALLBACK';
  ageSeconds: number;
  apiStatus: 'ONLINE' | 'DEGRADED_QUOTA_REACHED' | 'UPSTREAM_OFFLINE';
}

export let latestDataTelemetry: DataTelemetryMetadata = {
  lastUpdated: new Date().toISOString(),
  dataSource: 'LOCAL_PERSISTENT_CACHE',
  dataFreshness: 'CACHED',
  ageSeconds: 0,
  apiStatus: 'ONLINE'
};

// Backend Proxy URL (in production points to /api or serverless proxy endpoint)
const BACKEND_API_BASE = (import.meta as any).env?.VITE_PROXY_BACKEND_URL || '/api';
const USE_MOCK = false;

// =========================================================================
// INTELLIGENT MULTI-TIER CLIENT CACHE & TIMEOUT CONTROLLER
// =========================================================================
const LIVE_CACHE_TTL_MS = 45 * 1000;
const RECENT_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const UPCOMING_CACHE_TTL_MS = 2 * 60 * 60 * 1000;

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  meta?: DataTelemetryMetadata;
}

const memoryCache = {
  liveMatches: null as CacheEntry<MatchData[]> | null,
  recentMatches: {} as Record<number, CacheEntry<MatchData[]>>,
  upcomingMatches: {} as Record<number, CacheEntry<any[]>>,
  lastQuotaErrorNotice: 0
};

const CACHE_KEY_PREFIX = 'football_api_cache_';

function getPersistentCache<T>(key: string, maxAgeMs: number): T | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY_PREFIX + key);
    if (!raw) return null;
    const parsed: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - parsed.timestamp < maxAgeMs) {
      return parsed.data;
    }
  } catch (e) {
    // Ignore cache parse error
  }
  return null;
}

function setPersistentCache<T>(key: string, data: T) {
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY_PREFIX + key, JSON.stringify(entry));
  } catch (e) {
    // LocalStorage full or private browsing
  }
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 6000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

// -------------------------------------------------------------------------
// 1. FETCH LIVE MATCHES (High frequency: 45s TTL)
// -------------------------------------------------------------------------
export async function fetchLiveMatches(leagueIds: number[]): Promise<MatchData[]> {
  if (USE_MOCK) return getMockLiveMatches(leagueIds);

  const now = Date.now();
  if (memoryCache.liveMatches && (now - memoryCache.liveMatches.timestamp < LIVE_CACHE_TTL_MS)) {
    return (memoryCache.liveMatches.data || []).filter(m => leagueIds.includes(m.leagueId));
  }

  try {
    const response = await fetchWithTimeout(`${BACKEND_API_BASE}/fixtures?live=all`);
    if (!response.ok) throw new Error(`Proxy status ${response.status}`);
    const result = await response.json();

    if (result._meta) {
      latestDataTelemetry = {
        lastUpdated: result._meta.lastUpdated,
        dataSource: result._meta.dataSource,
        dataFreshness: result._meta.dataFreshness,
        ageSeconds: result._meta.ageSeconds,
        apiStatus: result._meta.apiStatus
      };
    } else {
      latestDataTelemetry = {
        lastUpdated: new Date().toISOString(),
        dataSource: 'PROXY_BACKEND',
        dataFreshness: 'FRESH',
        ageSeconds: 0,
        apiStatus: 'ONLINE'
      };
    }

    const allLiveMatches: MatchData[] = (result.response || []).map(mapResponseToMatchData);
    memoryCache.liveMatches = {
      data: allLiveMatches,
      timestamp: now
    };

    return allLiveMatches.filter(m => leagueIds.includes(m.leagueId));
  } catch (error) {
    latestDataTelemetry = {
      ...latestDataTelemetry,
      dataFreshness: 'FALLBACK',
      dataSource: 'LOCAL_PERSISTENT_CACHE',
      apiStatus: 'UPSTREAM_OFFLINE'
    };
    return memoryCache.liveMatches ? (memoryCache.liveMatches.data || []).filter(m => leagueIds.includes(m.leagueId)) : [];
  }
}

// Helper to determine the active football season (European leagues running Aug-May vs Calendar year leagues)
function getActiveSeasonYear(leagueId: number): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1; // 1-12

  // Calendar-year leagues (Jan/Feb to Nov/Dec): Conmebol Libertadores (13), Sudamericana (11), Brazil (71, 72), Colombia (239, 240), Chile (265, 266), Ecuador (242), Peru (281), Uruguay (268), Paraguay (252), etc.
  const calendarYearLeagueIds = [13, 11, 71, 72, 239, 240, 265, 266, 242, 281, 268, 252, 253, 479, 329, 362, 188, 190, 278];
  if (calendarYearLeagueIds.includes(leagueId)) {
    return year;
  }

  // European / Winter leagues (La Liga 140, Premier 39, Serie A 135, Bundesliga 477, Ligue 1 61, etc.):
  // If month is January to June, season started in previous year (e.g. May 2026 -> season 2025). If July-Dec, season is current year.
  return month <= 6 ? year - 1 : year;
}

export function clearApiCache(leagueId?: number) {
  if (leagueId) {
    delete memoryCache.recentMatches[leagueId];
    delete memoryCache.upcomingMatches[leagueId];
    localStorage.removeItem(CACHE_KEY_PREFIX + `recent_${leagueId}`);
    localStorage.removeItem(CACHE_KEY_PREFIX + `upcoming_${leagueId}`);
  } else {
    memoryCache.liveMatches = null;
    memoryCache.recentMatches = {};
    memoryCache.upcomingMatches = {};
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(CACHE_KEY_PREFIX)) localStorage.removeItem(key);
    });
  }
}

// -------------------------------------------------------------------------
// 2. FETCH RECENT SEASON MATCHES (Dynamic Season + Force Refresh Support)
// -------------------------------------------------------------------------
export async function fetchRecentMatches(leagueId: number, forceRefresh: boolean = false): Promise<MatchData[]> {
  if (USE_MOCK) return getMockRecentMatches(leagueId);

  const now = Date.now();
  if (!forceRefresh) {
    const mem = memoryCache.recentMatches[leagueId];
    if (mem && (now - mem.timestamp < RECENT_CACHE_TTL_MS)) {
      return mem.data;
    }

    const local = getPersistentCache<MatchData[]>(`recent_${leagueId}`, RECENT_CACHE_TTL_MS);
    if (local && local.length > 0) {
      memoryCache.recentMatches[leagueId] = { data: local, timestamp: now };
      return local;
    }
  }

  try {
    const season = getActiveSeasonYear(leagueId);
    let response = await fetchWithTimeout(`${BACKEND_API_BASE}/fixtures?league=${leagueId}&season=${season}&status=FT-AET-PEN`);
    if (!response.ok) throw new Error(`Proxy status ${response.status}`);
    let result = await response.json();

    let matches = result.response || [];

    // Fallback: If no matches returned for calculated season (e.g. transition month), try current year
    if (matches.length === 0 && season !== new Date().getFullYear()) {
      const fallbackResp = await fetchWithTimeout(`${BACKEND_API_BASE}/fixtures?league=${leagueId}&season=${new Date().getFullYear()}&status=FT-AET-PEN`);
      if (fallbackResp.ok) {
        const fallbackResult = await fallbackResp.json();
        if (fallbackResult.response && fallbackResult.response.length > 0) {
          matches = fallbackResult.response;
        }
      }
    }

    matches = matches.filter((item: any) => {
      const round = (item.league?.round || '').toLowerCase();
      return !round.includes('friendly') && !round.includes('pre-season') && !round.includes('qualif');
    });

    matches.sort((a: any, b: any) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime());
    const parsedMatches = matches.map(mapResponseToMatchData);

    memoryCache.recentMatches[leagueId] = { data: parsedMatches, timestamp: now };
    setPersistentCache(`recent_${leagueId}`, parsedMatches);

    return parsedMatches;
  } catch (error) {
    const localFallback = getPersistentCache<MatchData[]>(`recent_${leagueId}`, RECENT_CACHE_TTL_MS);
    return localFallback || [];
  }
}

// -------------------------------------------------------------------------
// 3. FETCH UPCOMING MATCHES (Moderate frequency: 2 hours TTL)
// -------------------------------------------------------------------------
export async function fetchUpcomingMatches(leagueId: number, count: number = 10): Promise<any[]> {
  if (USE_MOCK) return getMockUpcomingMatches(leagueId);

  const mem = memoryCache.upcomingMatches[leagueId];
  const now = Date.now();
  if (mem && (now - mem.timestamp < UPCOMING_CACHE_TTL_MS)) {
    return mem.data;
  }

  const local = getPersistentCache<any[]>(`upcoming_${leagueId}`, UPCOMING_CACHE_TTL_MS);
  if (local && local.length > 0) {
    memoryCache.upcomingMatches[leagueId] = { data: local, timestamp: now };
    return local;
  }

  try {
    const response = await fetchWithTimeout(`${BACKEND_API_BASE}/fixtures?league=${leagueId}&next=${count}`);
    if (!response.ok) throw new Error(`Proxy status ${response.status}`);
    const result = await response.json();

    const matches = result.response || [];
    const parsedUpcoming = matches.map((fixtureItem: any) => ({
      id: fixtureItem.fixture.id,
      date: fixtureItem.fixture.date,
      homeTeam: fixtureItem.teams.home.name,
      awayTeam: fixtureItem.teams.away.name,
      homeLogo: fixtureItem.teams.home.logo,
      awayLogo: fixtureItem.teams.away.logo,
      leagueId: fixtureItem.league.id,
      leagueName: fixtureItem.league.name,
      status: fixtureItem.fixture.status.short,
    }));

    memoryCache.upcomingMatches[leagueId] = { data: parsedUpcoming, timestamp: now };
    setPersistentCache(`upcoming_${leagueId}`, parsedUpcoming);

    return parsedUpcoming;
  } catch (error) {
    return local || [];
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
    status: fixtureItem.fixture.status.short,
    elapsed: fixtureItem.fixture.status.elapsed || 0,
    goalsHome: fixtureItem.goals.home ?? 0,
    goalsAway: fixtureItem.goals.away ?? 0,
    halftimeHome: fixtureItem.score?.halftime?.home ?? 0,
    halftimeAway: fixtureItem.score?.halftime?.away ?? 0,
  };
}

function getMockLiveMatches(leagueIds: number[]): MatchData[] {
  return [
    {
      id: 10001,
      homeTeam: "Palmeiras", awayTeam: "Flamengo",
      homeLogo: "https://media.api-sports.io/football/teams/121.png",
      awayLogo: "https://media.api-sports.io/football/teams/127.png",
      leagueId: 71, leagueName: "Serie A",
      status: "2H", elapsed: 78,
      goalsHome: 1, goalsAway: 1, halftimeHome: 0, halftimeAway: 0
    }
  ].filter(m => leagueIds.includes(m.leagueId));
}

function getMockRecentMatches(leagueId: number): MatchData[] {
  const mockResults = [
    { gh: 0, ga: 0, hth: 0, hta: 0 },
    { gh: 1, ga: 0, hth: 1, hta: 0 },
    { gh: 0, ga: 2, hth: 0, hta: 1 },
    { gh: 3, ga: 0, hth: 2, hta: 0 },
    { gh: 1, ga: 1, hth: 1, hta: 1 },
    { gh: 0, ga: 1, hth: 0, hta: 0 },
    { gh: 2, ga: 0, hth: 1, hta: 0 },
    { gh: 3, ga: 2, hth: 2, hta: 1 },
    { gh: 1, ga: 0, hth: 1, hta: 0 },
    { gh: 0, ga: 1, hth: 0, hta: 1 },
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
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(15, 0, 0, 0);
  
  return [
    {
      id: leagueId * 2000 + 1,
      date: tomorrow.toISOString(),
      homeTeam: "Palmeiras", awayTeam: "Sao Paulo",
      homeLogo: "", awayLogo: "",
      leagueId: leagueId, leagueName: "Serie A",
      status: "NS"
    }
  ];
}

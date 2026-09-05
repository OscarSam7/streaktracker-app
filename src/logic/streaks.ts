// Types
export interface MatchData {
    id: number;
    homeTeam: string;
    awayTeam: string;
    homeLogo: string;
    awayLogo: string;
    leagueId: number;
    leagueName: string;
    status: string; // 'NS', '1H', 'HT', '2H', 'FT'
    elapsed: number;
    receivedAt?: number;
    goalsHome: number;
    goalsAway: number;
    halftimeHome: number;
    halftimeAway: number;
}

export interface StreakCounters {
    matchId: number;
    draw: number;        // Consecutivos sin que sea empate el final
    over35: number;      // Consecutivos sin que haya > 3.5 goles
    htDraw: number;      // Consecutivos sin empate al Medio Tiempo
    bttsOver25: number;  // Consecutivos sin Ambos Marcan Y > 2.5
    btts1H: number;      // Consecutivos sin Ambos Marcan en 1er Tiempo
}

export interface StreakInfo {
    current: number; // The current active negative streak
    maxHistory: number; // The longest streak it reached before breaking
    previous: number; // The length of the streak before it was last broken
}

// In-memory or localStorage cache for streaks per league per team or global per league.
// The user asked to track consecutive matches in a LEAGUE where the result DOES NOT happen.
// Example: "In La Liga, 10 matches have passed without a Draw".

const STATE_KEY = 'football_streaks_state_v14_round1_lifecycle';

export interface LeagueStreaks {
    [leagueId: number]: {
        draw: StreakInfo;
        over35: StreakInfo;
        htDraw: StreakInfo;
        bttsOver25: StreakInfo;
        btts1H: StreakInfo;
        lastProcessedMatchId: number;
    }
}

export function loadStreaksState(): LeagueStreaks {
    const saved = localStorage.getItem(STATE_KEY);
    return saved ? JSON.parse(saved) : {};
}

export function saveStreaksState(state: LeagueStreaks) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

export function computeStreaksForMatches(matches: MatchData[]): {
    draw: StreakInfo;
    over35: StreakInfo;
    htDraw: StreakInfo;
    bttsOver25: StreakInfo;
    btts1H: StreakInfo;
    lastProcessedMatchId: number;
} {
    const initStreak = () => ({ current: 0, maxHistory: 0, previous: 0 });
    const result = {
        draw: initStreak(),
        over35: initStreak(),
        htDraw: initStreak(),
        bttsOver25: initStreak(),
        btts1H: initStreak(),
        lastProcessedMatchId: 0
    };

    function updateStreak(info: StreakInfo, didHappen: boolean) {
        if (didHappen) {
            if (info.current > 0) {
                if (info.current > info.maxHistory) {
                    info.maxHistory = info.current;
                }
                info.previous = info.current;
            }
            info.current = 0;
        } else {
            info.current++;
        }
    }

    matches.forEach(match => {
        if (match.status !== 'FT' && match.status !== 'AET' && match.status !== 'PEN') {
            return;
        }

        const totalGoals = match.goalsHome + match.goalsAway;

        // 1. Draw (did it happen?)
        updateStreak(result.draw, match.goalsHome === match.goalsAway);

        // 2. Over 3.5 (did it happen?)
        updateStreak(result.over35, totalGoals >= 4);

        // 3. HT Draw (did it happen?)
        updateStreak(result.htDraw, match.halftimeHome === match.halftimeAway);

        // 4. Ambos Marcan y > 2.5 goles (did it happen?)
        const btts = match.goalsHome > 0 && match.goalsAway > 0;
        updateStreak(result.bttsOver25, btts && totalGoals > 2.5);

        // 5. Ambos marcan primer tiempo (did it happen?)
        const btts1h = match.halftimeHome > 0 && match.halftimeAway > 0;
        updateStreak(result.btts1H, btts1h);

        result.lastProcessedMatchId = match.id;
    });

    return result;
}

export function processMatch(match: MatchData, state: LeagueStreaks): boolean {
    const lid = match.leagueId;

    if (!state[lid]) {
        const initStreak = () => ({ current: 0, maxHistory: 0, previous: 0 });
        state[lid] = {
            draw: initStreak(),
            over35: initStreak(),
            htDraw: initStreak(),
            bttsOver25: initStreak(),
            btts1H: initStreak(),
            lastProcessedMatchId: 0
        };
    }

    if (match.status !== 'FT' && match.status !== 'AET' && match.status !== 'PEN') {
        return false;
    }

    if (match.id <= state[lid].lastProcessedMatchId) {
        return false;
    }

    const s = state[lid];

    function updateStreak(info: StreakInfo, didHappen: boolean) {
        if (didHappen) {
            if (info.current > 0) {
                if (info.current > info.maxHistory) {
                    info.maxHistory = info.current;
                }
                info.previous = info.current;
            }
            info.current = 0;
        } else {
            info.current++;
        }
    }

    // 1. Draw
    updateStreak(s.draw, match.goalsHome === match.goalsAway);

    // 2. Over 3.5
    const totalGoals = match.goalsHome + match.goalsAway;
    updateStreak(s.over35, totalGoals >= 4);

    // 3. HT Draw
    updateStreak(s.htDraw, match.halftimeHome === match.halftimeAway);

    // 4. BTTS + > 2.5
    const btts = match.goalsHome > 0 && match.goalsAway > 0;
    updateStreak(s.bttsOver25, btts && totalGoals > 2.5);

    // 5. BTTS 1H
    const btts1h = match.halftimeHome > 0 && match.halftimeAway > 0;
    updateStreak(s.btts1H, btts1h);

    s.lastProcessedMatchId = match.id;
    return true;
}

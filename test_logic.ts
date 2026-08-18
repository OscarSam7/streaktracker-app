import { fetchRecentMatches } from './src/api/api.js';
import { processMatch } from './src/logic/streaks.js';

async function testStreaks() {
    console.log('Fetching recent La Liga (140) matches...');
    const matches = await fetchRecentMatches(140, 10);

    const emptyStreak = { current: 0, maxHistory: 0, previous: 0 };
    // Create a mock state
    const state: any = {
        140: { draw: {...emptyStreak}, over35: {...emptyStreak}, htDraw: {...emptyStreak}, bttsOver25: {...emptyStreak}, btts1H: {...emptyStreak}, lastProcessedMatchId: 0 }
    };

    console.log('Processing matches sequentially:');
    for (const m of matches) {
        console.log(`[${m.id}] ${m.homeTeam} ${m.goalsHome}-${m.goalsAway} ${m.awayTeam} (HT: ${m.halftimeHome}-${m.halftimeAway})`);
        processMatch(m, state);
        console.log(`   -> Streaks: Draw=${state[140].draw.current}, O3.5=${state[140].over35.current}, HTDraw=${state[140].htDraw.current}, BTTS+O25=${state[140].bttsOver25.current}, BTTS1H=${state[140].btts1H.current}`);
    }
}

testStreaks();

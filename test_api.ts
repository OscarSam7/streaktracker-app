import { fetchRecentMatches } from './src/api/api.js';

async function testFetch() {
    console.log('Testing 30-day date range fetch for La Liga (140)...');
    const result = await fetchRecentMatches(140, 20);
    console.log(`Found ${result.length} matches.`);

    if (result.length > 0) {
        console.log('Latest match grabbed:', result[result.length - 1].homeTeam, 'vs', result[result.length - 1].awayTeam, '| Status:', result[result.length - 1].status);
    } else {
        console.log('No matches found. This is why streaks are 0.');
    }
}
testFetch();

import './style.css';
import { LEAGUES, DEFAULT_ACTIVE_LEAGUES } from './config/leagues';
import { fetchLiveMatches, fetchRecentMatches, fetchUpcomingMatches } from './api/api';
import { loadStreaksState, saveStreaksState, processMatch } from './logic/streaks';

const state = {
  activeLeagues: [...DEFAULT_ACTIVE_LEAGUES],
  streaks: loadStreaksState(),
  upcoming: {} as Record<number, any[]>
};

// UI Elements
const dashboard = document.getElementById('dashboard') as HTMLDivElement;
const leagueBtn = document.getElementById('league-btn') as HTMLButtonElement;
const leagueModal = document.getElementById('league-modal') as HTMLDialogElement;
const closeModal = document.getElementById('close-modal') as HTMLButtonElement;
const leagueTogglesContainer = document.getElementById('league-toggles') as HTMLDivElement;

async function run() {
  setupLeagueModal();
  // 1. Fetch initial streak data logic to populate missing states
  await initializeStreaks();

  // 2. Render initial Dashboard (With local state)
  renderDashboard();

  // 3. Start polling live fixtures (mocked by default)
  setInterval(pollLiveMatches, 2 * 60 * 60 * 1000); // Poll every 2 hours
  pollLiveMatches();
}

async function initializeStreaks() {
  for (const lid of state.activeLeagues) {
    if (!state.streaks[lid]) {
      const history = await fetchRecentMatches(lid, 15);
      // Sort ascending by ID (assumes ID correlates to chronological order)
      history.sort((a, b) => a.id - b.id);
      history.forEach(m => processMatch(m, state.streaks));
    }
  }
  saveStreaksState(state.streaks);
}

async function pollLiveMatches() {
  const liveMatches = await fetchLiveMatches(state.activeLeagues);

  // We would ideally process live match events if they just finished.
  let changed = false;
  liveMatches.forEach(m => {
    if (m.status === 'FT') {
      const updated = processMatch(m, state.streaks);
      if (updated) changed = true;
    }
  });

  if (changed) {
    saveStreaksState(state.streaks);
  }

  // For any league with NO live matches, try to fetch upcoming matches if we haven't already
  const liveLeagueIds = new Set(liveMatches.map(m => m.leagueId));
  const noLiveLeagues = state.activeLeagues.filter(lid => !liveLeagueIds.has(lid));
  
  for (const lid of noLiveLeagues) {
    if (!state.upcoming[lid] || state.upcoming[lid].length === 0) {
      const upcoming = await fetchUpcomingMatches(lid);
      if (upcoming && upcoming.length > 0) {
         state.upcoming[lid] = upcoming;
      }
    }
  }

  // Even if no new FullTime finish, redrawing might update live scores UI
  renderDashboard(liveMatches);
}

// ---------------------------------------------------------
// RENDER UI
// ---------------------------------------------------------

// Helper to get color classes based on thresholds
// Extracted to top-level for accessibility by sorting algorithms
export function getStreakColorClass(streakValue: number, isGroup1: boolean): string {
    const base = isGroup1 ? 7 : 4;
    if (streakValue >= base + 3) return 'streak-green'; // 10+ or 7+
    if (streakValue >= base + 2) return 'streak-blue';  // 9 or 6
    if (streakValue >= base + 1) return 'streak-yellow';// 8 or 5
    if (streakValue >= base) return 'streak-orange';    // 7 or 4
    return '';
}

function renderDashboard(liveMatches: any[] = []) {
  dashboard.innerHTML = '';
  
  let countOrange = 0;
  let countYellow = 0;
  let countBlue = 0;
  let countGreen = 0;

  // Sorting logic: "Pin on top" for leagues with Green or Blue streaks
  const sortedLeagues = [...state.activeLeagues].sort((idA, idB) => {
    const sA = state.streaks[idA];
    const sB = state.streaks[idB];
    
    function getLeagueScore(streaksInfo: any) {
      if (!streaksInfo) return 0;
      const conditions = [
        getStreakColorClass(streaksInfo.draw.current, true),
        getStreakColorClass(streaksInfo.over35.current, true),
        getStreakColorClass(streaksInfo.htDraw.current, false),
        getStreakColorClass(streaksInfo.bttsOver25.current, false),
        getStreakColorClass(streaksInfo.btts1H.current, true)
      ];
      
      if (conditions.includes('streak-green')) return 3;
      if (conditions.includes('streak-blue')) return 2;
      return 0; // Orange or Yellow are not explicitly pinned by instructions, just Green/Blue
    }

    const scoreA = getLeagueScore(sA);
    const scoreB = getLeagueScore(sB);
    return scoreB - scoreA; // Descending order
  });

  sortedLeagues.forEach(lid => {
    const leagueInfo = Object.values(LEAGUES).find(l => l.id === lid);
    if (!leagueInfo) return;
    const emptyStreak = { current: 0, maxHistory: 0, previous: 0 };
    const leagueStreaks = state.streaks[lid] || { 
      draw: emptyStreak, 
      over35: emptyStreak, 
      htDraw: emptyStreak, 
      bttsOver25: emptyStreak, 
      btts1H: emptyStreak 
    };

    // Increment counts for the global header based on what is going to be drawn
    const cDraw = getStreakColorClass(leagueStreaks.draw.current, true);
    const cO35 = getStreakColorClass(leagueStreaks.over35.current, true);
    const cHtd = getStreakColorClass(leagueStreaks.htDraw.current, false);
    const cBttso = getStreakColorClass(leagueStreaks.bttsOver25.current, false);
    const cBtts1 = getStreakColorClass(leagueStreaks.btts1H.current, true);

    [cDraw, cO35, cHtd, cBttso, cBtts1].forEach(color => {
      if (color === 'streak-green') countGreen++;
      if (color === 'streak-blue') countBlue++;
      if (color === 'streak-yellow') countYellow++;
      if (color === 'streak-orange') countOrange++;
    });

    const liveMatch = liveMatches.find(m => m.leagueId === lid);

    const card = document.createElement('div');
    card.className = 'glass-card';

    // Add live glow effect if there's a live match
    if (liveMatch) {
      card.style.boxShadow = 'var(--glow)';
    }

    // Generate upcoming HTML
    let upcomingHTML = '';
    const upcomingList = state.upcoming[lid];
    if (!liveMatch && upcomingList && upcomingList.length > 0) {
       // Find the closest date (first item after sorting)
       upcomingList.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
       const closestDateRaw = upcomingList[0].date;
       const closestDateObj = new Date(closestDateRaw);
       
       // Filter matches that happen on the SAME DAY as the closest one
       const targetDateString = closestDateObj.toISOString().split('T')[0];
       const matchesNextDay = upcomingList.filter(m => m.date.startsWith(targetDateString));
       
       const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
       const displayDate = closestDateObj.toLocaleDateString('es-ES', options);

       upcomingHTML = `
           <div style="margin-bottom: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 0.5rem; padding: 0.5rem;">
               <div style="font-size: 0.75rem; color: var(--text-accent); margin-bottom: 0.4rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.2rem;">
                   Próximos: ${displayDate.charAt(0).toUpperCase() + displayDate.slice(1)}
               </div>
               ${matchesNextDay.map(um => {
                   const timeRaw = new Date(um.date);
                   const timeString = timeRaw.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
                   return `
                       <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; margin-bottom: 0.3rem;">
                          <div style="display: flex; align-items: center; gap: 0.3rem; flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">
                             <span>${um.homeTeam}</span>
                             <span style="font-size: 0.6rem; color: var(--text-muted);">vs</span>
                             <span>${um.awayTeam}</span>
                          </div>
                          <span style="font-size: 0.75rem; background: rgba(0,0,0,0.5); padding: 0.1rem 0.3rem; border-radius: 0.2rem; margin-left: 0.3rem;">
                             ${timeString}
                          </span>
                       </div>
                   `;
               }).join('')}
           </div>
       `;
    }

    const liveHTML = liveMatch ? `
            <div style="margin-bottom: 0.3rem; padding: 0.4rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem;">
                <div class="match-header">
                    <span>${liveMatch.status} ${liveMatch.elapsed}'</span>
                </div>
                <div class="match-teams">
                    <div class="team-info">
                        <img class="team-logo" src="${liveMatch.homeLogo}" alt="${liveMatch.homeTeam}">
                        <span>${liveMatch.homeTeam}</span>
                    </div>
                    <div class="score">${liveMatch.goalsHome} - ${liveMatch.goalsAway}</div>
                    <div class="team-info">
                        <img class="team-logo" src="${liveMatch.awayLogo}" alt="${liveMatch.awayTeam}">
                        <span>${liveMatch.awayTeam}</span>
                    </div>
                </div>
            </div>
        ` : (upcomingHTML || `<div style="margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">Actualmente no hay partidos en directo.</div>`);

    card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
                <h3 style="font-weight: 600; font-size: 0.9rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
                    ${liveMatch ? '<span class="live-indicator"></span>' : ''} ${leagueInfo.name} (${leagueInfo.country})
                </h3>
            </div>
            
            ${liveHTML}

            <div style="margin-bottom: 0.3rem; margin-top: 0.2rem; font-size: 0.8rem; font-weight: 600;">Rachas Negativas:</div>
            <div class="streaks-container">
                <div class="streak-item ${getStreakColorClass(leagueStreaks.draw.current, true)}">
                    <span style="display:flex; flex-direction:column;">
                      <span>Sin Empate (FT)</span>
                      ${leagueStreaks.draw.previous > 0 ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">Se cortó en: ${leagueStreaks.draw.previous} partido(s)</span>` : ''}
                    </span>
                    <span class="streak-value">${leagueStreaks.draw.current}</span>
                </div>
                <div class="streak-item ${getStreakColorClass(leagueStreaks.over35.current, true)}">
                    <span style="display:flex; flex-direction:column;">
                      <span>Menos de 3.5 goles</span>
                      ${leagueStreaks.over35.previous > 0 ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">Se cortó en: ${leagueStreaks.over35.previous} partido(s)</span>` : ''}
                    </span>
                    <span class="streak-value">${leagueStreaks.over35.current}</span>
                </div>
                <div class="streak-item ${getStreakColorClass(leagueStreaks.htDraw.current, false)}">
                    <span style="display:flex; flex-direction:column;">
                      <span>Sin Empate (HT)</span>
                      ${leagueStreaks.htDraw.previous > 0 ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">Se cortó en: ${leagueStreaks.htDraw.previous} partido(s)</span>` : ''}
                    </span>
                    <span class="streak-value">${leagueStreaks.htDraw.current}</span>
                </div>
                <div class="streak-item ${getStreakColorClass(leagueStreaks.bttsOver25.current, false)}">
                    <span style="display:flex; flex-direction:column;">
                      <span style="white-space: nowrap;">Sin BTTS + >2.5 Goles</span>
                      ${leagueStreaks.bttsOver25.previous > 0 ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">Se cortó en: ${leagueStreaks.bttsOver25.previous} partido(s)</span>` : ''}
                    </span>
                    <span class="streak-value">${leagueStreaks.bttsOver25.current}</span>
                </div>
                <div class="streak-item ${getStreakColorClass(leagueStreaks.btts1H.current, true)}">
                    <span style="display:flex; flex-direction:column;">
                      <span>Sin BTTS (1er Tiempo)</span>
                      ${leagueStreaks.btts1H.previous > 0 ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">Se cortó en: ${leagueStreaks.btts1H.previous} partido(s)</span>` : ''}
                    </span>
                    <span class="streak-value">${leagueStreaks.btts1H.current}</span>
                </div>
            </div>
        `;
    dashboard.appendChild(card);
  });

  // Update Global Headers
  const elOrange = document.getElementById('count-orange');
  const elYellow = document.getElementById('count-yellow');
  const elBlue = document.getElementById('count-blue');
  const elGreen = document.getElementById('count-green');
  
  if (elOrange) elOrange.innerText = countOrange.toString();
  if (elYellow) elYellow.innerText = countYellow.toString();
  if (elBlue) elBlue.innerText = countBlue.toString();
  if (elGreen) elGreen.innerText = countGreen.toString();
}

function setupLeagueModal() {
  const selectAllCheckbox = document.getElementById('select-all-leagues') as HTMLInputElement;

  leagueBtn.addEventListener('click', () => {
    // Set initial state of the massive Select All box
    selectAllCheckbox.checked = state.activeLeagues.length === Object.keys(LEAGUES).length;
    leagueModal.showModal();
  });

  closeModal.addEventListener('click', () => {
    leagueModal.close();
    // Re-initialize and Re-render just in case they toggled new ones
    initializeStreaks().then(() => {
      renderDashboard();
      pollLiveMatches(); // Fetch latest for potentially new leagues
    });
  });

  // Close modal when clicking outside (on the backdrop)
  leagueModal.addEventListener('click', (e) => {
    if (e.target === leagueModal) {
      leagueModal.close();
      initializeStreaks().then(() => {
        renderDashboard();
        pollLiveMatches();
      });
    }
  });

  selectAllCheckbox.addEventListener('change', (e) => {
    const isChecked = (e.target as HTMLInputElement).checked;
    if (isChecked) {
      state.activeLeagues = Object.values(LEAGUES).map(l => l.id);
    } else {
      state.activeLeagues = [];
    }
    
    // Visually update all individual checkboxes
    const checkboxes = leagueTogglesContainer.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkboxes.forEach(cb => {
      cb.checked = isChecked;
    });
  });

  Object.values(LEAGUES).forEach(leagueInfo => {
    const row = document.createElement('div');
    row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.justifyContent = 'space-between';
    label.style.alignItems = 'center';
    label.style.padding = '0.75rem 0.5rem';
    label.style.cursor = 'pointer';
    label.style.width = '100%';

    const span = document.createElement('span');
    span.innerText = `${leagueInfo.country} - ${leagueInfo.name}`;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.cursor = 'pointer';
    checkbox.checked = state.activeLeagues.includes(leagueInfo.id);

    checkbox.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
        if (!state.activeLeagues.includes(leagueInfo.id)) state.activeLeagues.push(leagueInfo.id);
      } else {
        state.activeLeagues = state.activeLeagues.filter(id => id !== leagueInfo.id);
      }

      // Automatically update the Master select-all checkbox visually
      selectAllCheckbox.checked = state.activeLeagues.length === Object.keys(LEAGUES).length;
    });

    label.appendChild(span);
    label.appendChild(checkbox);
    row.appendChild(label);
    leagueTogglesContainer.appendChild(row);
  });
}

// Boot
run();

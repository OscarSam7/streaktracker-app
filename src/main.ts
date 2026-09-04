import { loadDailyReports, recordDailySnapshot, filterReportsByPeriod, computeDailyReportQuantitativeKPIs } from './logic/dailyReport';

function getActionMarketLabel(marketKey: string, lang: any): string {
  const map: Record<string, string> = {
    draw: lang.operationalMarkets?.draw || '🎯 Operar: Empate (FT)',
    over35: lang.operationalMarkets?.over35 || '🎯 Operar: Más de 3.5 goles',
    htDraw: lang.operationalMarkets?.htDraw || '🎯 Operar: Empate (1T)',
    bttsOver25: lang.operationalMarkets?.bttsOver25 || '🎯 Operar: Ambos Marcan + >2.5',
    btts1H: lang.operationalMarkets?.btts1H || '🎯 Operar: Ambos Marcan (1T)'
  };
  return map[marketKey] || '';
}


function isDateToday(dateInput: string | number | Date): boolean {
  if (!dateInput) return false;
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return false;
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth() &&
         d.getDate() === now.getDate();
}

import './style.css';
import { LEAGUES, DEFAULT_ACTIVE_LEAGUES, ORDERED_LEAGUES, getLeagueGlobalOrdinal } from './config/leagues';
import { fetchLiveMatches, fetchRecentMatches, fetchUpcomingMatches, clearApiCache } from './api/api';
import { loadStreaksState, saveStreaksState, processMatch, computeStreaksForMatches } from './logic/streaks';
import { 
  loadBankrollConfig, 
  saveBankrollConfig, 
  loadRawOperations, 
  saveRawOperations, 
  calculateProcessedOperations, 
  computeBankrollKPIs,
  formatCurrency,
  type OperationStatus
} from './logic/bankroll';
import { I18N, type Language, type Translations } from './config/i18n';
import { runHistoricalBacktest } from './logic/backtest';
import { getAuditStats } from './logic/audit';
import { ACADEMY_LESSONS } from './logic/academy';
import { validateLeagueEligibility, getAuthorizedActiveLeagues } from './logic/leagueValidation';
import { computeSignalScore } from './logic/signalEngine';
import { 
  loadUserProfile, 
  setUserPlan, 
  startTrialSubscription,
  getTrialTimeRemaining,
  authorizeAccess, 
  PLAN_PERMISSIONS, 
  type PlatformPlan, 
  type UserProfile
} from './logic/authPermissions';
import { PaymentServiceRegistry } from './logic/paymentGateway';
import { generateTelegramSignal } from './logic/telegramDistribution';
import { loadSignalLedger } from './logic/immutableSignalLedger';
import { getTransparencySuite, type PerformanceTrack } from './logic/transparencyEngine';
import { latestDataTelemetry } from './api/api';
import { DataRepository } from './logic/dataRepository';
import { 
  loadAdminParameters, 
  saveAdminParameters, 
  loadAdminAuditLogs, 
  logAdminAction, 
  getAdminDashboardOverview,
  updateRegisteredUserPlan 
} from './logic/adminControl';

export type SubscriptionPlan = 'FREE' | 'TRIAL' | 'PRO' | 'VIP';
export type QuickFilter = 'all' | 'high_today' | 'high_alerts' | 'live' | 'upcoming' | 'today';

const state = {
  activeLeagues: [...DEFAULT_ACTIVE_LEAGUES],
  streaks: loadStreaksState(),
  upcoming: {} as Record<number, any[]>,
  liveMatches: [] as any[],
  currentPlan: 'VIP' as SubscriptionPlan,
  userProfile: loadUserProfile() as UserProfile,
  currentLang: 'es' as Language,
  searchQuery: '',
  currentFilter: 'all' as QuickFilter,
  bankrollConfig: loadBankrollConfig(),
  bankrollRawOps: loadRawOperations(),
  activeLiveIndex: {} as Record<number, number>,
  oppFilter: 'all' as 'all' | 'premium' | 'strong' | 'live' | 'upcoming'
};

// UI Elements
const dashboard = document.getElementById('dashboard') as HTMLDivElement;
const leagueBtn = document.getElementById('league-btn') as HTMLButtonElement;
const leagueModal = document.getElementById('league-modal') as HTMLDialogElement;
const closeModal = document.getElementById('close-modal') as HTMLButtonElement;
const leagueTogglesContainer = document.getElementById('league-toggles') as HTMLDivElement;
const planSelect = document.getElementById('plan-select') as HTMLSelectElement;
const langSelect = document.getElementById('lang-select') as HTMLSelectElement;
const pricingBtn = document.getElementById('pricing-btn') as HTMLButtonElement;
const pricingModal = document.getElementById('pricing-modal') as HTMLDialogElement;
const closePricingModal = document.getElementById('close-pricing-modal') as HTMLButtonElement;
const telegramBtn = document.getElementById('telegram-btn') as HTMLButtonElement;
const telegramModal = document.getElementById('telegram-modal') as HTMLDialogElement;
const closeTelegramModal = document.getElementById('close-telegram-modal') as HTMLButtonElement;
const generateTelegramAlertBtn = document.getElementById('generate-telegram-alert-btn') as HTMLButtonElement;
const copyTelegramAlertBtn = document.getElementById('copy-telegram-alert-btn') as HTMLButtonElement;
const telegramCopyNotice = document.getElementById('telegram-copy-notice') as HTMLDivElement;
const telegramMsgContent = document.getElementById('telegram-msg-content') as HTMLDivElement;
const exportCsvBtn = document.getElementById('export-csv-btn') as HTMLButtonElement;
const globalCounters = document.getElementById('global-counters') as HTMLDivElement;
const refreshBtn = document.getElementById('refresh-btn') as HTMLButtonElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const clearSearchBtn = document.getElementById('clear-search-btn') as HTMLButtonElement;
const filterPills = document.querySelectorAll('.filter-pill') as NodeListOf<HTMLButtonElement>;

function t(): Translations {
  return I18N[state.currentLang] || I18N.es;
}

async function run() {
  // Setup Guide Modal
  const guideBtn = document.getElementById('guide-btn');
  const guideModal = document.getElementById('guide-modal') as HTMLDialogElement;
  const closeGuideModal = document.getElementById('close-guide-modal');
  if (guideBtn && guideModal) {
    guideBtn.addEventListener('click', () => guideModal.showModal());
  }
  if (closeGuideModal && guideModal) {
    closeGuideModal.addEventListener('click', () => guideModal.close());
  }
  
  setupLanguageSelector();
  setupSearchAndFilters();
  setupTelegramModal();
  setupLeagueModal();
  setupPricingModal();
  setupExportCsv();
  setupPlanSelector();
  setupBankrollModule();
  setupBacktestModule();
  setupAuditModule();
  setupAcademyModule();
  setupDailyReportModule();
  setupOpportunitiesFilterHandlers();
  setupTransparencyModule();
  setupScrollToTop();
  updateTrialBannerUI();
  setupAdminModule();

  // Multi-Device Persistence: Realizar migración segura y sincronizar estado con el servidor
  DataRepository.performSafeMigration(state.userProfile.id).catch(() => {});

  if (refreshBtn) {
    refreshBtn.addEventListener('click', async () => {
      refreshBtn.innerText = '⏳';
      // Clear client API cache and force reload all streaks with active season data
      clearApiCache();
      state.streaks = {};
      await initializeStreaks(true);
      await pollLiveMatches();
      recordDailySnapshot(state.streaks);
      refreshBtn.innerText = '🔄';
    });
  }

  // 1. Fetch initial streak data logic to populate missing states
  await initializeStreaks();

  // 2. Fetch live matches immediately to populate state.liveMatches and draw dashboard
  await pollLiveMatches();

  // 3. Start polling live fixtures (every 30 seconds with intelligent caching)
  setInterval(() => pollLiveMatches(), 30 * 1000);
}

async function initializeStreaks(forceRefresh: boolean = false) {
  const eligibleLeagues = getAuthorizedActiveLeagues(state.activeLeagues);
  for (const lid of eligibleLeagues) {
    const history = await fetchRecentMatches(lid, forceRefresh);
    if (history && history.length > 0) {
      state.streaks[lid] = computeStreaksForMatches(history);
    }
  }
  saveStreaksState(state.streaks);
}

async function pollLiveMatches() {
  const liveMatches = await fetchLiveMatches(state.activeLeagues);
  state.liveMatches = liveMatches;

  // Process live match events if they just finished (FT) or changed
  let changed = false;
  liveMatches.forEach(m => {
    if (m.status === 'FT' || m.status === 'AET' || m.status === 'PEN') {
      const updated = processMatch(m, state.streaks);
      if (updated) changed = true;
    }
  });

  if (changed) {
    saveStreaksState(state.streaks);
    recordDailySnapshot(state.streaks);
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

  // Update dashboard and live scores UI
  renderDashboard(liveMatches);
  updateDataFreshnessUI();
}

// ---------------------------------------------------------
// RENDER UI, FILTERS & PLAN GATING
// ---------------------------------------------------------

export function getStreakColorClass(streakValue: number, isGroup1: boolean): string {
    const base = isGroup1 ? 7 : 4;
    if (streakValue >= base + 3) return 'streak-green'; // 10+ or 7+
    if (streakValue >= base + 2) return 'streak-blue';  // 9 or 6
    if (streakValue >= base + 1) return 'streak-yellow';// 8 or 5
    if (streakValue >= base) return 'streak-orange';    // 7 or 4
    return '';
}

function getValidUpcomingMatches(lid: number): any[] {
  const upcomingList = state.upcoming[lid];
  if (!upcomingList || upcomingList.length === 0) return [];

  // Sort ascending by scheduled kickoff time
  const sorted = [...upcomingList].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Rule: If 1st match is NOT separated by at least 2 hours from the 2nd match, omit upcoming matches
  if (sorted.length >= 2) {
    const time1 = new Date(sorted[0].date).getTime();
    const time2 = new Date(sorted[1].date).getTime();
    const TWO_HOURS_MS = 2 * 60 * 60 * 1000; // 2 hours (120 minutes)

    if (time2 - time1 < TWO_HOURS_MS) {
      // Matches collide or are played too close to each other -> omit
      return [];
    }
  }

  // Filter matches that happen on the same day as the 1st match
  const firstDateString = new Date(sorted[0].date).toISOString().split('T')[0];
  return sorted.filter(m => m.date.startsWith(firstDateString));
}

function renderDashboard(liveMatches: any[] = state.liveMatches) {
  dashboard.innerHTML = '';
  const lang = t();
  
  let countOrange = 0;
  let countYellow = 0;
  let countBlue = 0;
  let countGreen = 0;

  const isPinOnTopEnabled = state.currentPlan !== 'FREE';

  // 1. Sort active leagues by threat priority (Pin on Top)
  const sortedLeagues = [...state.activeLeagues].sort((idA, idB) => {
    if (!isPinOnTopEnabled) return 0; // Natural order in Free plan

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
      return 0;
    }

    const scoreA = getLeagueScore(sA);
    const scoreB = getLeagueScore(sB);
    return scoreB - scoreA;
  });

  // 2. Filter by search query & quick filters
  const filteredLeagues = sortedLeagues.filter(lid => {
    const leagueInfo = Object.values(LEAGUES).find(l => l.id === lid);
    if (!leagueInfo) return false;

    // Search query filter (matches league name or country)
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      const matchName = leagueInfo.name.toLowerCase().includes(q);
      const matchCountry = leagueInfo.country.toLowerCase().includes(q);
      if (!matchName && !matchCountry) return false;
    }

    const emptyStreak = { current: 0, maxHistory: 0, previous: 0 };
    const leagueStreaks = state.streaks[lid] || { 
      draw: emptyStreak, 
      over35: emptyStreak, 
      htDraw: emptyStreak, 
      bttsOver25: emptyStreak, 
      btts1H: emptyStreak 
    };

    const hasGreenOrBlue = [
      getStreakColorClass(leagueStreaks.draw.current, true),
      getStreakColorClass(leagueStreaks.over35.current, true),
      getStreakColorClass(leagueStreaks.htDraw.current, false),
      getStreakColorClass(leagueStreaks.bttsOver25.current, false),
      getStreakColorClass(leagueStreaks.btts1H.current, true)
    ].some(c => c === 'streak-green' || c === 'streak-blue');

    const isLive = liveMatches.some(m => m.leagueId === lid);
    const validUpcoming = getValidUpcomingMatches(lid);
    const hasUpcoming = !isLive && validUpcoming.length > 0;
    
    // Check if match is strictly TODAY (in live or scheduled today)
    const isToday = isLive || validUpcoming.some(um => isDateToday(um.date));

    if (state.currentFilter === 'high_today') return hasGreenOrBlue && isToday;
    if (state.currentFilter === 'high_alerts') return hasGreenOrBlue;
    if (state.currentFilter === 'live') return isLive;
    if (state.currentFilter === 'today') return isToday;
    if (state.currentFilter === 'upcoming') return hasUpcoming;

    return true;
  });

  filteredLeagues.forEach(lid => {
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

    const leagueLiveMatches = liveMatches.filter(m => m.leagueId === lid);
    const hasLive = leagueLiveMatches.length > 0;
    const currentLiveIdx = (state.activeLiveIndex[lid] || 0) % (leagueLiveMatches.length || 1);
    const liveMatch = hasLive ? leagueLiveMatches[currentLiveIdx] : null;

    const validUpcoming = getValidUpcomingMatches(lid);
    const isMatchToday = (liveMatch !== null && liveMatch !== undefined) || (validUpcoming && validUpcoming.some(um => isDateToday(um.date)));

    const card = document.createElement('div');
    card.id = `card-league-${lid}`;
    card.setAttribute('data-league-id', lid.toString());
    card.className = `glass-card ${isMatchToday ? 'match-card-today' : ''}`;

    if (liveMatch) {
      card.style.boxShadow = 'var(--glow)';
    }

    // Generate upcoming HTML with the 2-hour minimum separation rule
    let upcomingHTML = '';
    if (!liveMatch && validUpcoming && validUpcoming.length > 0) {
       const closestDateRaw = validUpcoming[0].date;
       const closestDateObj = new Date(closestDateRaw);
       
       const localeCode = state.currentLang === 'es' ? 'es-ES' : state.currentLang === 'pt' ? 'pt-BR' : 'en-US';
       const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
       const displayDate = closestDateObj.toLocaleDateString(localeCode, options);

       upcomingHTML = `
           <div class="${isMatchToday ? 'upcoming-today-box' : ''}" style="${!isMatchToday ? 'margin-bottom: 0.5rem; background: rgba(255,255,255,0.03); border-radius: 0.5rem; padding: 0.5rem;' : ''}">
               <div style="font-size: 0.75rem; color: var(--text-accent); margin-bottom: 0.4rem; border-bottom: 1px solid var(--border-glass); padding-bottom: 0.2rem;">
                   ${lang.streaks.upcomingPrefix} ${displayDate.charAt(0).toUpperCase() + displayDate.slice(1)}
               </div>
               ${validUpcoming.map(um => {
                   const timeRaw = new Date(um.date);
                   const timeString = timeRaw.toLocaleTimeString(localeCode, { hour: '2-digit', minute: '2-digit' });
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

    const noMatchText = (leagueStreaks.draw.current === 0 && leagueStreaks.over35.current === 0 && leagueStreaks.lastProcessedMatchId === 0)
      ? `📅 Temporada en espera • Conteo inicia en Jornada 1`
      : lang.streaks.noLiveMatches;

    // HT score display (if match is at HT, 2H, or FT)
    let htBadgeHTML = '';
    if (liveMatch && (liveMatch.status === 'HT' || liveMatch.status === '2H' || liveMatch.status === 'FT' || liveMatch.elapsed > 45)) {
      htBadgeHTML = `<span class="ht-score-badge">HT: ${liveMatch.halftimeHome}-${liveMatch.halftimeAway}</span>`;
    }

    // Multi-match switcher bar if 2 or more matches are active simultaneously in this league
    const multiMatchSwitcherHTML = leagueLiveMatches.length > 1 ? `
      <div class="live-multi-header">
        <span class="live-match-counter-pill">🔴 ${leagueLiveMatches.length} en juego (${currentLiveIdx + 1}/${leagueLiveMatches.length})</span>
        <button class="btn-switch-match" data-lid="${lid}" title="Ver el siguiente partido en juego de esta liga">▶ Siguiente</button>
      </div>
    ` : '';

    const liveHTML = liveMatch ? `
            <div style="margin-bottom: 0.3rem; padding: 0.4rem; background: rgba(0,0,0,0.3); border-radius: 0.5rem;">
                ${multiMatchSwitcherHTML}
                <div class="match-header">
                    <span>${liveMatch.status} ${liveMatch.elapsed}'</span>
                </div>
                <div class="match-teams">
                    <div class="team-info">
                        <img class="team-logo" src="${liveMatch.homeLogo}" alt="${liveMatch.homeTeam}">
                        <span>${liveMatch.homeTeam}</span>
                    </div>
                    <div class="score-container">
                      <div class="score">${liveMatch.goalsHome}&nbsp;-&nbsp;${liveMatch.goalsAway}</div>
                      ${htBadgeHTML}
                    </div>
                    <div class="team-info">
                        <img class="team-logo" src="${liveMatch.awayLogo}" alt="${liveMatch.awayTeam}">
                        <span>${liveMatch.awayTeam}</span>
                    </div>
                </div>
            </div>
        ` : (upcomingHTML || `<div style="margin-bottom: 0.5rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">${noMatchText}</div>`);

    const showStreakHistory = state.currentPlan === 'VIP' || state.currentPlan === 'PRO';
    const isFreePlan = state.currentPlan === 'FREE'; const isProPlan = state.currentPlan === 'PRO';

    function renderStreakBadge(marketKey: string, marketLabel: string, streakInfo: { current: number, previous: number }, isGroup1: boolean) {
      const actionLabel = getActionMarketLabel(marketKey, lang);
      const colorClass = getStreakColorClass(streakInfo.current, isGroup1);
      const isLocked = (isFreePlan && (colorClass === 'streak-blue' || colorClass === 'streak-green')) || (isProPlan && colorClass === 'streak-green');

      const historyHTML = (showStreakHistory && streakInfo.previous > 0)
        ? `<span style="font-size:0.6rem; color:var(--text-muted); margin-top:0.1rem;">${lang.streaks.brokenAt} ${streakInfo.previous} ${lang.streaks.matchesUnit}</span>`
        : '';

      if (isLocked) {
        return `
          <div class="locked-streak-container">
            <div class="streak-item ${colorClass} locked-streak-blur" style="flex-direction: column; align-items: stretch; gap: 0.15rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                <span style="font-weight: 700; font-size: 0.74rem; color: #fff;">${marketLabel}</span>
                <span class="streak-value">${streakInfo.current}</span>
              </div>
              <span class="action-market-tag">${actionLabel}</span>
            </div>
            <div class="locked-streak-overlay" title="${lang.streaks.lockedBadge}">
              ${lang.streaks.lockedBadge}
            </div>
          </div>
        `;
      }

      const isHighAlert = colorClass === 'streak-green' || colorClass === 'streak-blue';
      const oneClickBtn = isHighAlert ? `
        <button class="btn-1click-bankroll" data-league="${leagueInfo?.name || ''}" data-country="${leagueInfo?.country || ''}" data-market="${marketLabel}" title="Registrar esta oportunidad en la calculadora de banca">
          ${lang.streaks.oneClickBankrollBtn}
        </button>
      ` : '';

      const isAlert = colorClass !== '';
      const signalData = computeSignalScore(
        lid,
        marketKey,
        marketLabel,
        streakInfo.current,
        streakInfo.previous,
        liveMatch ? `${liveMatch.homeTeam} vs ${liveMatch.awayTeam}` : 'Próximo partido'
      );

      const signalScoreBadge = isAlert ? `
        <div style="margin-top:0.25rem; font-size:0.62rem; background:rgba(0,0,0,0.35); padding:0.25rem 0.35rem; border-radius:5px; border:1px solid ${signalData.tierColor}30; display:flex; flex-direction:column; gap:0.15rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:0.15rem;">
            <span style="font-weight:800; color:${signalData.tierColor}; display:inline-flex; align-items:center; gap:0.2rem;">
              ⚡ Valor Estadístico: <strong>${signalData.signalScore}</strong>/100 [${signalData.tier}]
            </span>
            <span style="color:#94a3b8;" title="Cuota de mercado y probabilidad implícita">
              🎯 @<strong>${signalData.suggestedOdds.toFixed(2)}</strong> (${signalData.impliedProbabilityPct}%)
            </span>
          </div>
          <div style="font-size:0.58rem; color:#94a3b8; display:flex; flex-direction:column; gap:0.08rem; padding-top:0.05rem;">
            <div>• <span style="color:#cbd5e1;">Racha detectada:</span> <strong>${signalData.opportunity.detectedStreakSummary}</strong></div>
            <div>• <span style="color:#cbd5e1;">Comportamiento histórico:</span> ${signalData.opportunity.historicalBehaviorSummary}</div>
            <div>• <span style="color:#cbd5e1;">Casos similares:</span> ${signalData.opportunity.similarCasesSummary}</div>
            <div>• <span style="color:#cbd5e1;">Resultado histórico:</span> ${signalData.opportunity.historicalResultSummary}</div>
            <div>• <span style="color:#38bdf8;">Evaluación actual:</span> ${signalData.opportunity.currentEvaluationSummary}</div>
          </div>
          <div style="margin-top:0.15rem; padding-top:0.15rem; border-top:1px dashed rgba(255,255,255,0.06); font-size:0.56rem; display:flex; flex-direction:column; gap:0.05rem;">
            <div style="font-weight:800; color:${signalData.confidence.color}; display:flex; align-items:center; gap:0.2rem;">
              ${signalData.confidence.badgeLabel}
            </div>
            <div style="color:#cbd5e1; font-style:italic;">
              "${signalData.confidence.explanation}"
            </div>
          </div>
        </div>
      ` : '';

      return `
        <div class="streak-item ${colorClass}" style="flex-direction: column; align-items: stretch; gap: 0.15rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <span style="font-weight: 700; font-size: 0.74rem; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${marketLabel}</span>
            <span class="streak-value" style="margin-left: 0.4rem; flex-shrink: 0;">${streakInfo.current}</span>
          </div>
          <span class="action-market-tag">${actionLabel}</span>
          ${historyHTML}
          ${signalScoreBadge}
          ${oneClickBtn}
        </div>
      `;
    }

    card.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem; gap: 0.35rem;">
                <h3 style="font-weight: 700; font-size: 0.82rem; text-overflow: ellipsis; white-space: nowrap; overflow: hidden; display: flex; align-items: center; gap: 0.35rem; margin: 0; min-width: 0; flex: 1;">
                    <span class="league-index-badge">#${getLeagueGlobalOrdinal(lid)}</span>
                    <span style="font-size: 1.05rem; flex-shrink: 0;" title="${leagueInfo.country}">${leagueInfo.flag || '⚽'}</span>
                    ${liveMatch ? '<span class="live-indicator" style="flex-shrink: 0;"></span>' : ''}
                    <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0;" title="${leagueInfo.country} - ${leagueInfo.name}">${leagueInfo.name}</span>
                </h3>
                ${isMatchToday ? `<span class="today-badge-chip">${lang.filters.todayBadge || '🔥 JUEGA HOY'}</span>` : ''}
            </div>
            
            ${liveHTML}

            <div style="margin-bottom: 0.2rem; margin-top: 0.15rem; font-size: 0.72rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.03em;">${lang.streaks.negativeStreaksTitle}</div>
            <div class="streaks-container">
                ${renderStreakBadge('draw', lang.markets.draw, leagueStreaks.draw, true)}
                ${renderStreakBadge('over35', lang.markets.over35, leagueStreaks.over35, true)}
                ${renderStreakBadge('htDraw', lang.markets.htDraw, leagueStreaks.htDraw, false)}
                ${renderStreakBadge('bttsOver25', lang.markets.bttsOver25, leagueStreaks.bttsOver25, false)}
                ${renderStreakBadge('btts1H', lang.markets.btts1H, leagueStreaks.btts1H, true)}
            </div>
        `;

    // 1. Attach Switch Live Match event listener
    card.querySelectorAll('.btn-switch-match').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        const targetLid = parseInt(target.dataset.lid || '0', 10);
        const matchesInLeague = liveMatches.filter(m => m.leagueId === targetLid);
        if (matchesInLeague.length > 1) {
          const nextIdx = ((state.activeLiveIndex[targetLid] || 0) + 1) % matchesInLeague.length;
          state.activeLiveIndex[targetLid] = nextIdx;
          renderDashboard();
        }
      });
    });

    // 2. Attach 1-Click Bankroll event listener with target market and odds pre-population
    card.querySelectorAll('.btn-1click-bankroll').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const target = e.currentTarget as HTMLButtonElement;
        const market = target.dataset.market || '';
        const bankrollModal = document.getElementById('bankroll-modal') as HTMLDialogElement;

        if (bankrollModal) {
          bankrollModal.showModal();
          const tabCalcBtn = bankrollModal.querySelector('[data-tab="tab-calculator"]') as HTMLButtonElement;
          if (tabCalcBtn) tabCalcBtn.click();

          // Pre-populate recommended odds based on market
          const oddsInput = document.getElementById('calc-odds-input') as HTMLInputElement;
          if (oddsInput) {
            if (market.includes('1er') || market.includes('1T') || market.includes('1H')) {
              oddsInput.value = '4.20';
            } else if (market.includes('Empate') || market.includes('Draw')) {
              oddsInput.value = '3.25';
            } else if (market.includes('3.5')) {
              oddsInput.value = '2.85';
            } else {
              oddsInput.value = '2.30';
            }
            triggerStakeCalc();
          }
        }
      });
    });

    dashboard.appendChild(card);
  });

  // Render Opportunities Center Ranking
  renderOpportunitiesCenter(liveMatches);

  if (filteredLeagues.length === 0) {
    dashboard.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: rgba(30, 41, 59, 0.4); border-radius: 1rem; border: 1px dashed var(--border-glass);">
        <p style="font-size: 1.1rem; color: var(--text-muted);">🔍 No se encontraron ligas con los filtros actuales.</p>
        <button class="btn btn-premium" style="margin-top: 1rem;" onclick="document.getElementById('search-input').value=''; document.querySelector('[data-filter=all]').click();">
          Restablecer Filtros
        </button>
      </div>
    `;
  }

  // Attach click events to locked streak overlays to open pricing modal
  document.querySelectorAll('.locked-streak-overlay').forEach(el => {
    el.addEventListener('click', () => {
      pricingModal.showModal();
    });
  });

  // Update Global Headers according to Plan
  const isGlobalCountersVisible = state.currentPlan === 'VIP' || state.currentPlan === 'PRO';
  
  if (globalCounters) {
    if (isGlobalCountersVisible) {
      globalCounters.style.display = 'flex';
      const elOrange = document.getElementById('count-orange');
      const elYellow = document.getElementById('count-yellow');
      const elBlue = document.getElementById('count-blue');
      const elGreen = document.getElementById('count-green');
      
      if (elOrange) elOrange.innerText = countOrange.toString();
      if (elYellow) elYellow.innerText = countYellow.toString();
      if (elBlue) elBlue.innerText = countBlue.toString();
      if (elGreen) elGreen.innerText = countGreen.toString();
    } else {
      globalCounters.style.display = 'none';
    }
  }

  // Export CSV button visibility
  if (exportCsvBtn) {
    exportCsvBtn.style.display = state.currentPlan === 'VIP' ? 'inline-flex' : 'none';
  }
}

// ---------------------------------------------------------
// CENTRO DE OPORTUNIDADES (RANKING MULTICRITERIO)
// ---------------------------------------------------------

interface OpportunityItem {
  leagueId: number;
  leagueName: string;
  country: string;
  flag: string;
  fixtureName: string;
  matchTimeStr: string;
  isLive: boolean;
  hasUpcoming: boolean;
  marketKey: string;
  marketLabel: string;
  streakCurrent: number;
  streakPrevious: number;
  signalScore: number;
  tier: string;
  tierColor: string;
  confidenceTier: string;
  confidenceBadge: string;
  confidenceExplanation: string;
  sampleSize: number;
  leagueQualityScore: number;
  winratePct: number;
  historicalRoiPct: number;
  suggestedOdds: number;
  impliedProbPct: number;
  similarCasesCount: number;
  sortTimestamp: number;
}

function renderOpportunitiesCenter(liveMatches: any[] = state.liveMatches) {
  const oppGrid = document.getElementById('opportunities-grid');
  const countBadge = document.getElementById('opp-count-badge');
  const lang = t();
  if (!oppGrid) return;

  const allOpportunities: OpportunityItem[] = [];

  // Extraer exclusivamente las señales generadas por las ligas activas
  state.activeLeagues.forEach(lid => {
    const leagueInfo = Object.values(LEAGUES).find(l => l.id === lid);
    if (!leagueInfo) return;

    const streaks = state.streaks[lid];
    if (!streaks) return;

    const leagueLiveMatches = liveMatches.filter(m => m.leagueId === lid);
    const isLive = leagueLiveMatches.length > 0;
    const validUpcoming = getValidUpcomingMatches(lid);
    const hasUpcoming = !isLive && validUpcoming.length > 0;

    let fixtureName = 'En espera de programación';
    let matchTimeStr = 'Sin horario confirmado';
    let sortTimestamp = Date.now() + 86400000;

    if (isLive) {
      const lm = leagueLiveMatches[0];
      fixtureName = `🔴 ${lm.homeTeam} vs ${lm.awayTeam} (${lm.status} ${lm.elapsed}')`;
      matchTimeStr = `EN VIVO • ${lm.status} ${lm.elapsed}'`;
      sortTimestamp = Date.now(); // Máxima prioridad de inmediatez
    } else if (hasUpcoming) {
      const um = validUpcoming[0];
      const matchDate = new Date(um.date);
      fixtureName = `${um.homeTeam} vs ${um.awayTeam}`;
      matchTimeStr = matchDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) + ' (' + matchDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) + ')';
      sortTimestamp = matchDate.getTime();
    }

    const marketList = [
      { key: 'draw', label: lang.markets.draw, info: streaks.draw, isG1: true },
      { key: 'over35', label: lang.markets.over35, info: streaks.over35, isG1: true },
      { key: 'htDraw', label: lang.markets.htDraw, info: streaks.htDraw, isG1: false },
      { key: 'bttsOver25', label: lang.markets.bttsOver25, info: streaks.bttsOver25, isG1: false },
      { key: 'btts1H', label: lang.markets.btts1H, info: streaks.btts1H, isG1: true }
    ];

    marketList.forEach(m => {
      const colorClass = getStreakColorClass(m.info.current, m.isG1);
      // Incluir solo si es una alerta activa detectable (Amarilla, Naranja, Azul, Verde)
      if (colorClass !== '') {
        const sig = computeSignalScore(lid, m.key, m.label, m.info.current, m.info.previous, fixtureName);
        const leagueVal = validateLeagueEligibility(lid);

        allOpportunities.push({
          leagueId: lid,
          leagueName: leagueInfo.name,
          country: leagueInfo.country,
          flag: leagueInfo.flag || '⚽',
          fixtureName,
          matchTimeStr,
          isLive,
          hasUpcoming,
          marketKey: m.key,
          marketLabel: m.label,
          streakCurrent: m.info.current,
          streakPrevious: m.info.previous,
          signalScore: sig.signalScore,
          tier: sig.tier,
          tierColor: sig.tierColor,
          confidenceTier: sig.confidence.tier,
          confidenceBadge: sig.confidence.badgeLabel,
          confidenceExplanation: sig.confidence.explanation,
          sampleSize: sig.confidence.factors.sampleSize,
          leagueQualityScore: leagueVal.quality.overallScore,
          winratePct: sig.historicalWinratePct,
          historicalRoiPct: sig.confidence.factors.historicalPerformanceRoi,
          suggestedOdds: sig.suggestedOdds,
          impliedProbPct: sig.impliedProbabilityPct,
          similarCasesCount: sig.historicalSimilarCases,
          sortTimestamp
        });
      }
    });
  });

  // Ordenamiento cronológico de oportunidades:
  // 1. Partidos EN VIVO primero (máxima inmediatez)
  // 2. Próximos partidos más cercanos ordenados ascendentemente por hora (los que empiezan antes arriba)
  // 3. Partidos sin horario inmediato al final
  // 4. Criterio de desempate: Signal Score (0-100) y Nivel de Confianza
  const confidenceRank: Record<string, number> = { PREMIUM: 4, FUERTE: 3, MODERADA: 2, INSUFICIENTE: 1 };

  allOpportunities.sort((a, b) => {
    // A. Si uno está EN VIVO y el otro no, el EN VIVO va primero
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;

    // B. Si ambos tienen próximo partido o están en vivo, ordenar por hora más cercana (sortTimestamp asc)
    if (a.hasUpcoming && b.hasUpcoming) {
      if (a.sortTimestamp !== b.sortTimestamp) {
        return a.sortTimestamp - b.sortTimestamp;
      }
    } else if (a.hasUpcoming && !b.hasUpcoming) {
      return -1; // Los que tienen fecha programada van antes que los que no tienen
    } else if (!a.hasUpcoming && b.hasUpcoming) {
      return 1;
    }

    // C. Si ambos están en la misma categoría u horario idéntico, ordenar por Signal Score desc
    if (b.signalScore !== a.signalScore) return b.signalScore - a.signalScore;

    // D. Desempate por Confianza, Muestra y Calidad de Liga
    const confDiff = (confidenceRank[b.confidenceTier] || 0) - (confidenceRank[a.confidenceTier] || 0);
    if (confDiff !== 0) return confDiff;
    if (b.sampleSize !== a.sampleSize) return b.sampleSize - a.sampleSize;
    if (b.leagueQualityScore !== a.leagueQualityScore) return b.leagueQualityScore - a.leagueQualityScore;
    return a.sortTimestamp - b.sortTimestamp;
  });

  // Update filter counters
  const cAll = allOpportunities.length;
  const cPrem = allOpportunities.filter(o => o.tier === 'PREMIUM').length;
  const cStrong = allOpportunities.filter(o => o.tier === 'FUERTE').length;
  const cLive = allOpportunities.filter(o => o.isLive).length;
  const cUpc = allOpportunities.filter(o => o.hasUpcoming).length;

  const elCAll = document.getElementById('opp-fcount-all');
  const elCPrem = document.getElementById('opp-fcount-premium');
  const elCStrong = document.getElementById('opp-fcount-strong');
  const elCLive = document.getElementById('opp-fcount-live');
  const elCUpc = document.getElementById('opp-fcount-upcoming');

  if (elCAll) elCAll.innerText = cAll.toString();
  if (elCPrem) elCPrem.innerText = cPrem.toString();
  if (elCStrong) elCStrong.innerText = cStrong.toString();
  if (elCLive) elCLive.innerText = cLive.toString();
  if (elCUpc) elCUpc.innerText = cUpc.toString();
  if (countBadge) countBadge.innerText = `${cAll} detectadas`;

  // Apply oppFilter
  const filtered = allOpportunities.filter(o => {
    if (state.oppFilter === 'premium') return o.tier === 'PREMIUM';
    if (state.oppFilter === 'strong') return o.tier === 'FUERTE';
    if (state.oppFilter === 'live') return o.isLive;
    if (state.oppFilter === 'upcoming') return o.hasUpcoming;
    return true;
  });

  oppGrid.innerHTML = '';

  if (filtered.length === 0) {
    oppGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; background: rgba(0,0,0,0.25); border-radius: 0.75rem; border: 1px dashed rgba(255,255,255,0.1);">
        <span style="font-size: 1.2rem;">⚡</span>
        <p style="font-size: 0.82rem; color: #94a3b8; margin-top: 0.4rem; margin-bottom: 0;">No hay oportunidades que coincidan con el filtro seleccionado.</p>
      </div>
    `;
    return;
  }

  filtered.forEach((opp, rankIdx) => {
    const card = document.createElement('div');
    card.style.background = 'rgba(15, 23, 42, 0.85)';
    card.style.border = `1px solid ${opp.tierColor}40`;
    card.style.borderRadius = '0.75rem';
    card.style.padding = '0.9rem';
    card.style.cursor = 'pointer';
    card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease';
    card.title = `👉 Clic para ir a las alertas de ${opp.leagueName} (${opp.country})`;

    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-2px)';
      card.style.borderColor = opp.tierColor;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.border = `1px solid ${opp.tierColor}40`;
    });

    card.innerHTML = `
      <!-- Header: Rank, League, Match Time -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 0.4rem;">
        <div class="opp-clickable-league" data-league-id="${opp.leagueId}" style="display: flex; align-items: center; gap: 0.4rem;">
          <span style="font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 4px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            #${rankIdx + 1}
          </span>
          <span style="font-size: 1rem;">${opp.flag}</span>
          <strong style="font-size: 0.8rem; color: #fff;">${opp.leagueName}</strong>
          <span style="font-size: 0.68rem; color: #64748b;">(${opp.country})</span>
        </div>
        <span style="font-size: 0.65rem; font-weight: 700; color: ${opp.isLive ? '#f87171' : '#94a3b8'}; background: rgba(0,0,0,0.4); padding: 0.15rem 0.4rem; border-radius: 4px;">
          ${opp.matchTimeStr}
        </span>
      </div>

      <!-- Partido & Mercado -->
      <div style="display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem;">
        <div style="font-size: 0.8rem; font-weight: 700; color: #f8fafc; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
          ⚽ ${opp.fixtureName}
        </div>
        <span style="font-size: 0.72rem; font-weight: 800; color: #38bdf8; flex-shrink: 0;">
          ${opp.marketLabel}
        </span>
      </div>

      <!-- Score & Confianza Banner -->
      <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.35); padding: 0.35rem 0.5rem; border-radius: 6px; border: 1px solid ${opp.tierColor}30;">
        <div style="display: flex; align-items: center; gap: 0.35rem;">
          <span style="font-size: 0.85rem; font-weight: 900; color: ${opp.tierColor};">⚡ ${opp.signalScore}/100</span>
          <span style="font-size: 0.65rem; font-weight: 800; padding: 0.1rem 0.35rem; border-radius: 4px; background: rgba(255,255,255,0.06); color: ${opp.tierColor}; border: 1px solid ${opp.tierColor}40;">
            [${opp.tier}]
          </span>
        </div>
        <span style="font-size: 0.68rem; font-weight: 800; color: #4ade80;">
          ${opp.confidenceBadge}
        </span>
      </div>

      <!-- Statistical Grid: Racha, Muestra, WinRate, ROI, Cuota -->
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem; background: rgba(255,255,255,0.02); padding: 0.4rem; border-radius: 5px; font-size: 0.65rem; text-align: center;">
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">RACHA ACTUAL</span>
          <strong style="color: #fff; font-size: 0.76rem;">${opp.streakCurrent} partidos</strong>
        </div>
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">MUESTRA HISTÓRICA</span>
          <strong style="color: #38bdf8; font-size: 0.76rem;">${opp.sampleSize} casos</strong>
        </div>
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">WIN RATE HIST.</span>
          <strong style="color: #4ade80; font-size: 0.76rem;">${opp.winratePct}%</strong>
        </div>
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">ROI HISTÓRICO</span>
          <strong style="color: #4ade80; font-size: 0.76rem;">+${opp.historicalRoiPct}%</strong>
        </div>
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">CUOTA ESTIMADA</span>
          <strong style="color: #facc15; font-size: 0.76rem;">@${opp.suggestedOdds.toFixed(2)}</strong>
        </div>
        <div>
          <span style="color: #94a3b8; display: block; font-size: 0.58rem;">CALIDAD LIGA</span>
          <strong style="color: #38bdf8; font-size: 0.76rem;">${opp.leagueQualityScore} pts</strong>
        </div>
      </div>

      <!-- Rationale & Action Button -->
      <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-top: 0.15rem;">
        <span style="font-size: 0.6rem; color: #cbd5e1; font-style: italic; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;" title="${opp.confidenceExplanation}">
          "${opp.confidenceExplanation}"
        </span>
        <button class="btn-1click-bankroll" data-league="${opp.leagueName}" data-country="${opp.country}" data-market="${opp.marketLabel}" style="font-size: 0.65rem; padding: 0.25rem 0.55rem; flex-shrink: 0; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #fff; font-weight: 700; border: none; border-radius: 4px; cursor: pointer;">
          💼 Operar
        </button>
      </div>
    `;

    // Smooth Scroll to League Card in Dashboard when clicking anywhere on the opportunity card
    card.addEventListener('click', (e) => {
      // Ignore if clicking the action button
      if ((e.target as HTMLElement).closest('.btn-1click-bankroll')) return;

      const targetLid = opp.leagueId;
      
      // Reset league filter/search to 'all' if the league might be hidden by a filter
      if (state.currentFilter !== 'all') {
        const filterPills = document.querySelectorAll('.filter-pill');
        filterPills.forEach(p => p.classList.remove('active'));
        const allPill = document.querySelector('[data-filter="all"]');
        if (allPill) allPill.classList.add('active');
        state.currentFilter = 'all';
        renderDashboard();
      }

      const targetCard = document.getElementById(`card-league-${targetLid}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove highlight from any previous card and highlight this target card
        document.querySelectorAll('.league-card-highlighted').forEach(el => el.classList.remove('league-card-highlighted'));
        targetCard.classList.add('league-card-highlighted');
        
        setTimeout(() => {
          targetCard.classList.remove('league-card-highlighted');
        }, 2800);
      }
    });

    // 1-Click Bankroll handler for opportunity card
    const opBtn = card.querySelector('.btn-1click-bankroll');
    if (opBtn) {
      opBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const bankrollModal = document.getElementById('bankroll-modal') as HTMLDialogElement;
        if (bankrollModal) {
          bankrollModal.showModal();
          const tabCalcBtn = bankrollModal.querySelector('[data-tab="tab-calculator"]') as HTMLButtonElement;
          if (tabCalcBtn) tabCalcBtn.click();
          const oddsInput = document.getElementById('calc-odds-input') as HTMLInputElement;
          if (oddsInput) {
            oddsInput.value = opp.suggestedOdds.toFixed(2);
            triggerStakeCalc();
          }
        }
      });
    }

    oppGrid.appendChild(card);
  });
}

function setupOpportunitiesFilterHandlers() {
  const pills = document.querySelectorAll('#opp-filter-pills .filter-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      const target = e.currentTarget as HTMLButtonElement;
      target.classList.add('active');
      state.oppFilter = (target.dataset.oppFilter as any) || 'all';
      renderOpportunitiesCenter();
    });
  });
}

// ---------------------------------------------------------
// LANGUAGE SELECTOR (i18n)
// ---------------------------------------------------------

function setupLanguageSelector() {
  if (!langSelect) return;
  langSelect.value = state.currentLang;

  langSelect.addEventListener('change', () => {
    state.currentLang = langSelect.value as Language;
    updateStaticLanguageTexts();
    renderDashboard();
    updateLeagueModalToggles();
  });

  updateStaticLanguageTexts();
}

function updateStaticLanguageTexts() {
  const lang = t();

  // App Title
  const titleEl = document.querySelector('header h1');
  if (titleEl) {
    titleEl.innerHTML = `<img src="/logo.png" alt="Streak Tracker" style="width: 38px; height: 38px; border-radius: 8px; box-shadow: 0 0 12px rgba(56, 189, 248, 0.4); border: 1px solid rgba(56, 189, 248, 0.3);" /> <span class="live-indicator"></span> <span>${lang.appTitle}</span>`;
  }

  // Buttons
  if (pricingBtn) pricingBtn.innerText = lang.actions.pricing;
  if (refreshBtn) refreshBtn.title = lang.actions.refresh;
  if (leagueBtn) leagueBtn.innerText = lang.actions.manageLeagues;
  if (telegramBtn) telegramBtn.innerText = lang.actions.telegramBot;
  if (exportCsvBtn) exportCsvBtn.innerText = lang.actions.exportCsv;

  // Plan Label
  const planLabelEl = document.getElementById('plan-label');
  if (planLabelEl) planLabelEl.innerText = lang.planLabel;

  // Search input placeholder
  if (searchInput) searchInput.placeholder = lang.filters.searchPlaceholder;

  // Filter pills
  const pillAll = document.querySelector('[data-filter="all"]') as HTMLElement;
  const pillHighToday = document.querySelector('[data-filter="high_today"]') as HTMLElement;
  const pillHigh = document.querySelector('[data-filter="high_alerts"]') as HTMLElement;
  const pillToday = document.querySelector('[data-filter="today"]') as HTMLElement;
  const pillLive = document.querySelector('[data-filter="live"]') as HTMLElement;
  const pillUpcoming = document.querySelector('[data-filter="upcoming"]') as HTMLElement;

  if (pillAll) pillAll.innerText = lang.filters.all;
  if (pillHighToday) pillHighToday.innerText = lang.filters.highToday;
  if (pillHigh) pillHigh.innerText = lang.filters.highAlerts;
  if (pillToday) pillToday.innerText = lang.filters.todayOnly;
  if (pillLive) pillLive.innerText = lang.filters.liveOnly;
  if (pillUpcoming) pillUpcoming.innerText = lang.filters.upcomingOnly;

  // Counter Badges Labels
  const countLabels = document.querySelectorAll('.counter-label');
  if (countLabels.length >= 4) {
    countLabels[0].textContent = lang.counters.orange;
    countLabels[1].textContent = lang.counters.yellow;
    countLabels[2].textContent = lang.counters.blue;
    countLabels[3].textContent = lang.counters.green;
  }

  // Modals Titles
  const lmTitle = document.getElementById('league-modal-title');
  if (lmTitle) lmTitle.innerText = lang.leaguesModal.title;

  const tmTitle = document.getElementById('telegram-modal-title');
  if (tmTitle) tmTitle.innerText = lang.telegramModal.title;

  const tmStatus = document.getElementById('telegram-modal-status');
  if (tmStatus) tmStatus.innerText = lang.telegramModal.botStatus;

  const tmSubtitle = document.getElementById('telegram-modal-subtitle');
  if (tmSubtitle) tmSubtitle.innerText = lang.telegramModal.subtitle;

  const tmChannel = document.getElementById('telegram-channel-name');
  if (tmChannel) tmChannel.innerText = lang.telegramModal.channelTitle;

  if (generateTelegramAlertBtn) generateTelegramAlertBtn.innerText = lang.telegramModal.generateBtn;
  if (copyTelegramAlertBtn) copyTelegramAlertBtn.innerText = lang.telegramModal.copyBtn;
}

// ---------------------------------------------------------
// SEARCH & QUICK FILTERS
// ---------------------------------------------------------

function setupSearchAndFilters() {
  const searchActionBtn = document.getElementById('search-action-btn');

  function scrollToFirstMatchingLeague() {
    const dashboardEl = document.getElementById('dashboard');
    if (!dashboardEl) return;

    // If there are cards in the dashboard, find the first one
    const firstCard = dashboardEl.querySelector('.glass-card') as HTMLElement;
    if (firstCard) {
      firstCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstCard.classList.add('league-card-highlighted');
      setTimeout(() => {
        firstCard.classList.remove('league-card-highlighted');
      }, 2800);
    } else {
      dashboardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.searchQuery = searchInput.value;
      if (clearSearchBtn) {
        clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
      }
      renderDashboard();
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        renderDashboard();
        scrollToFirstMatchingLeague();
      }
    });
  }

  if (searchActionBtn) {
    searchActionBtn.addEventListener('click', () => {
      if (searchInput) {
        state.searchQuery = searchInput.value;
      }
      renderDashboard();
      scrollToFirstMatchingLeague();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      state.searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderDashboard();
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.currentFilter = (pill.getAttribute('data-filter') || 'all') as QuickFilter;
      renderDashboard();
      
      // Auto-scroll smooth to the start of the Opportunities / Alert cards
      scrollToFirstMatchingLeague();
    });
  });
}

function setupScrollToTop() {
  const scrollBtn = document.getElementById('btn-scroll-top');
  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    // Show button when scrolled down more than 280px
    if (window.scrollY > 280) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ---------------------------------------------------------
// TELEGRAM VIP BOT SIMULATOR & DISTRIBUTION ENGINE
// ---------------------------------------------------------

let selectedTgChannel: PlatformPlan = 'VIP';
let lastGeneratedPayload: any = null;

function setupTelegramModal() {
  if (!telegramBtn || !telegramModal || !closeTelegramModal) return;

  telegramBtn.addEventListener('click', () => {
    const auth = authorizeAccess('VIP');
    if (!auth.allowed) {
      alert(`🔒 Acceso VIP Requerido: El simulador de distribución y bot de Telegram en tiempo real es una función exclusiva de miembros VIP.`);
      pricingModal.showModal();
      return;
    }
    generateTelegramAlert();
    telegramModal.showModal();
  });

  closeTelegramModal.addEventListener('click', () => {
    telegramModal.close();
  });

  telegramModal.addEventListener('click', (e) => {
    if (e.target === telegramModal) {
      telegramModal.close();
    }
  });

  // Channel Pills Switching
  const tgPills = telegramModal.querySelectorAll('[data-tg-channel]');
  tgPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      tgPills.forEach(p => p.classList.remove('active'));
      const target = e.currentTarget as HTMLButtonElement;
      target.classList.add('active');
      selectedTgChannel = (target.dataset.tgChannel as PlatformPlan) || 'VIP';
      generateTelegramAlert();
    });
  });

  if (generateTelegramAlertBtn) {
    generateTelegramAlertBtn.addEventListener('click', () => {
      generateTelegramAlert();
    });
  }

  if (copyTelegramAlertBtn) {
    copyTelegramAlertBtn.addEventListener('click', () => {
      const plainText = lastGeneratedPayload ? lastGeneratedPayload.messageText : buildTelegramPlainTextAlert();
      navigator.clipboard.writeText(plainText).then(() => {
        if (telegramCopyNotice) {
          telegramCopyNotice.style.display = 'block';
          telegramCopyNotice.innerText = '¡Mensaje oficial formateado y copiado al portapapeles!';
          setTimeout(() => {
            if (telegramCopyNotice) telegramCopyNotice.style.display = 'none';
          }, 2500);
        }
      });
    });
  }
}

function findHottestStreak() {
  let highestScore = -1;
  let bestLeagueId = state.activeLeagues[0] || 140;
  let bestMarketKey = 'draw';
  let bestStreakVal = 0;
  let bestColorClass = 'streak-orange';
  let bestFixtureName = 'Partido en vivo / Programado';
  let bestMatchTime = 'Horario confirmado';

  state.activeLeagues.forEach(lid => {
    const s = state.streaks[lid];
    if (!s) return;

    const leagueLiveMatches = state.liveMatches.filter(m => m.leagueId === lid);
    const validUpcoming = getValidUpcomingMatches(lid);

    let fixture = 'En espera de programación';
    let timeStr = 'Próxima Jornada';

    if (leagueLiveMatches.length > 0) {
      const lm = leagueLiveMatches[0];
      fixture = `${lm.homeTeam} vs ${lm.awayTeam}`;
      timeStr = `EN VIVO (${lm.status} ${lm.elapsed}')`;
    } else if (validUpcoming && validUpcoming.length > 0) {
      const um = validUpcoming[0];
      fixture = `${um.homeTeam} vs ${um.awayTeam}`;
      timeStr = new Date(um.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const markets = [
      { key: 'draw', labelKey: 'draw', val: s.draw.current, isG1: true },
      { key: 'over35', labelKey: 'over35', val: s.over35.current, isG1: true },
      { key: 'htDraw', labelKey: 'htDraw', val: s.htDraw.current, isG1: false },
      { key: 'bttsOver25', labelKey: 'bttsOver25', val: s.bttsOver25.current, isG1: false },
      { key: 'btts1H', labelKey: 'btts1H', val: s.btts1H.current, isG1: true }
    ];

    markets.forEach(m => {
      const color = getStreakColorClass(m.val, m.isG1);
      let score = m.val;
      if (color === 'streak-green') score += 100;
      if (color === 'streak-blue') score += 50;

      if (score > highestScore) {
        highestScore = score;
        bestLeagueId = lid;
        bestMarketKey = m.key;
        bestStreakVal = m.val;
        bestColorClass = color || 'streak-orange';
        bestFixtureName = fixture;
        bestMatchTime = timeStr;
      }
    });
  });

  const leagueInfo = Object.values(LEAGUES).find(l => l.id === bestLeagueId) || Object.values(LEAGUES)[0];
  return { leagueInfo, bestMarketKey, bestStreakVal, bestColorClass, bestFixtureName, bestMatchTime };
}

function generateTelegramAlert() {
  if (!telegramMsgContent) return;
  const lang = t();
  const { leagueInfo, bestMarketKey, bestStreakVal, bestFixtureName, bestMatchTime } = findHottestStreak();
  const marketName = (lang.markets as any)[bestMarketKey] || lang.markets.draw;

  const payload = generateTelegramSignal(
    leagueInfo.id,
    bestMarketKey,
    marketName,
    bestStreakVal,
    bestStreakVal - 1,
    bestFixtureName,
    bestMatchTime,
    selectedTgChannel
  );

  lastGeneratedPayload = payload;

  const chanTitleEl = document.getElementById('telegram-channel-name');
  if (chanTitleEl) {
    chanTitleEl.innerText = selectedTgChannel === 'VIP' 
      ? '🟢 StreakTracker VIP Institutional' 
      : selectedTgChannel === 'PRO' 
      ? '🔵 StreakTracker PRO Signals' 
      : '⚪ StreakTracker Public Alerts';
  }

  const timeEl = document.getElementById('telegram-time');
  if (timeEl && payload) timeEl.innerText = payload.timestampFormatted.split(' ')[1] || '15:45';

  if (payload) {
    telegramMsgContent.innerText = payload.messageText;
  } else {
    telegramMsgContent.innerHTML = `<span style="color:#94a3b8;">⚠️ Esta señal ya fue transmitida al canal <strong>${selectedTgChannel}</strong> (Mecanismo Anti-Duplicación Activo).</span>`;
  }
}

function buildTelegramPlainTextAlert(): string {
  if (lastGeneratedPayload) return lastGeneratedPayload.messageText;
  const { leagueInfo, bestMarketKey, bestStreakVal } = findHottestStreak();
  return `Señal StreakTracker — ${leagueInfo.name} — Mercado ${bestMarketKey} (Racha: ${bestStreakVal})`;
}

// ---------------------------------------------------------
// PRICING MODAL & PLAN MANAGEMENT
// ---------------------------------------------------------


function updateTrialBannerUI() {
  const banner = document.getElementById('trial-active-banner');
  const txt = document.getElementById('trial-countdown-text');
  const btnUpPro = document.getElementById('trial-upgrade-pro-btn');
  const btnUpVip = document.getElementById('trial-upgrade-vip-btn');

  if (!banner) return;

  const trialInfo = getTrialTimeRemaining(state.userProfile);

  if (state.userProfile.subscription.status === 'TRIAL') {
    banner.style.display = 'flex';
    if (txt) txt.innerText = trialInfo.displayText;

    if (trialInfo.isExpired) {
      banner.style.background = 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(15, 23, 42, 0.95) 100%)';
      banner.style.borderColor = 'rgba(239, 68, 68, 0.5)';
      const title = document.getElementById('trial-banner-title');
      if (title) {
        title.innerText = '⚠️ Tu Período de Prueba ha Finalizado';
        title.style.color = '#f87171';
      }
    } else {
      banner.style.background = 'linear-gradient(135deg, rgba(250, 204, 21, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)';
      banner.style.borderColor = 'rgba(250, 204, 21, 0.4)';
      const title = document.getElementById('trial-banner-title');
      if (title) {
        title.innerText = '🧪 Período de Prueba Gratuita Activo';
        title.style.color = '#facc15';
      }
    }
  } else {
    banner.style.display = 'none';
  }

  if (btnUpPro) {
    btnUpPro.onclick = () => {
      pricingModal.showModal();
    };
  }

  if (btnUpVip) {
    btnUpVip.onclick = () => {
      pricingModal.showModal();
    };
  }
}


function updateDataFreshnessUI() {
  const liveIndicator = document.querySelector('.live-indicator') as HTMLElement;
  if (!liveIndicator) return;

  const isCached = latestDataTelemetry.dataFreshness === 'CACHED';
  const isFallback = latestDataTelemetry.dataFreshness === 'FALLBACK';
  
  if (isFallback) {
    liveIndicator.style.backgroundColor = '#f87171'; // Rojo / Offline fallback
    liveIndicator.setAttribute('title', 'DATOS EN CACHÉ SEGURA (Upstream en espera / Límites protegidos)');
  } else if (isCached) {
    liveIndicator.style.backgroundColor = '#facc15'; // Amarillo / Caché
    liveIndicator.setAttribute('title', `DATOS EN CACHÉ CENTRALIZADA (Actualizado hace ${latestDataTelemetry.ageSeconds}s)`);
  } else {
    liveIndicator.style.backgroundColor = '#22c55e'; // Verde / En vivo fresco
    liveIndicator.setAttribute('title', `DATOS ACTUALIZADOS EN VIVO (Fuente: Backend Proxy)`);
  }
}

function setupPlanSelector() {
  if (!planSelect) return;
  planSelect.value = state.currentPlan;

  planSelect.addEventListener('change', () => {
    setSubscriptionPlan(planSelect.value as SubscriptionPlan);
  });
}

function setupPricingModal() {
  if (!pricingBtn || !pricingModal || !closePricingModal) return;

  pricingBtn.addEventListener('click', () => {
    pricingModal.showModal();
  });

  closePricingModal.addEventListener('click', () => {
    pricingModal.close();
  });

  pricingModal.addEventListener('click', (e) => {
    if (e.target === pricingModal) {
      pricingModal.close();
    }
  });

  const actionButtons = pricingModal.querySelectorAll('.btn-tier-action');
  actionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const tier = target.getAttribute('data-tier') as SubscriptionPlan;
      if (tier) {
        setSubscriptionPlan(tier);
        pricingModal.close();
      }
    });
  });
}

async function setSubscriptionPlan(newPlan: SubscriptionPlan) {
  state.currentPlan = newPlan;
  
  if (newPlan === 'TRIAL') {
    state.userProfile = startTrialSubscription();
  } else {
    // Procesar sesión de suscripción desacoplada mediante PaymentServiceRegistry
    const paymentProvider = PaymentServiceRegistry.getProvider('MOCK_SANDBOX');
    await paymentProvider.createCheckoutSession({
      userId: state.userProfile.id,
      userEmail: state.userProfile.email,
      plan: newPlan as PlatformPlan,
      billingCycle: 'MONTHLY',
      successUrl: window.location.href,
      cancelUrl: window.location.href
    });

    state.userProfile = setUserPlan(newPlan as PlatformPlan, 'ACTIVE');
  }

  if (planSelect) planSelect.value = newPlan;

  const perms = PLAN_PERMISSIONS[newPlan as (PlatformPlan | 'TRIAL')];
  if (state.activeLeagues.length > perms.maxActiveLeagues) {
    state.activeLeagues = DEFAULT_ACTIVE_LEAGUES.slice(0, perms.maxActiveLeagues);
  }

  updateTrialBannerUI();
  updateLeagueModalToggles();
  initializeStreaks().then(() => {
    renderDashboard();
    pollLiveMatches();
  });
}

// ---------------------------------------------------------
// LEAGUES MODAL & LIMIT ENFORCEMENT
// ---------------------------------------------------------

function setupLeagueModal() {
  const selectAllCheckbox = document.getElementById('select-all-leagues') as HTMLInputElement;

  leagueBtn.addEventListener('click', () => {
    updateLeagueModalToggles();
    leagueModal.showModal();
  });

  closeModal.addEventListener('click', () => {
    leagueModal.close();
    initializeStreaks().then(() => {
      renderDashboard();
      pollLiveMatches();
    });
  });

  leagueModal.addEventListener('click', (e) => {
    if (e.target === leagueModal) {
      leagueModal.close();
      initializeStreaks().then(() => {
        renderDashboard();
        pollLiveMatches();
      });
    }
  });

  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', (e) => {
      if (state.currentPlan !== 'VIP') {
        e.preventDefault();
        selectAllCheckbox.checked = false;
        alert(t().leaguesModal.requireEliteAlert);
        pricingModal.showModal();
        return;
      }

      const isChecked = (e.target as HTMLInputElement).checked;
      if (isChecked) {
        state.activeLeagues = Object.values(LEAGUES).map(l => l.id);
      } else {
        state.activeLeagues = [];
      }
      
      updateLeagueModalToggles();
    });
  }

  renderLeagueToggles();
}

function renderLeagueToggles() {
  leagueTogglesContainer.innerHTML = '';

  ORDERED_LEAGUES.forEach(leagueInfo => {
    const row = document.createElement('div');
    row.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.justifyContent = 'space-between';
    label.style.alignItems = 'center';
    label.style.padding = '0.65rem 0.5rem';
    label.style.cursor = 'pointer';
    label.style.width = '100%';

    const telemetry = validateLeagueEligibility(leagueInfo.id);

    const span = document.createElement('div');
    span.style.display = 'flex';
    span.style.flexDirection = 'column';
    span.style.gap = '0.2rem';
    
    span.innerHTML = `
      <div style="display:flex; align-items:center; gap:0.45rem; font-size:0.82rem; flex-wrap:wrap;">
        <span class="league-index-badge">#${getLeagueGlobalOrdinal(leagueInfo.id)}</span> 
        <span style="font-size: 1.1rem;">${leagueInfo.flag || '⚽'}</span> 
        <strong>${leagueInfo.name}</strong> 
        <span style="color:#64748b; font-size:0.75rem;">(${leagueInfo.country})</span>
        <span style="font-size:0.62rem; font-weight:800; padding:0.1rem 0.35rem; border-radius:4px; background:${telemetry.status === 'ACTIVA' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)'}; color:${telemetry.status === 'ACTIVA' ? '#4ade80' : '#ef4444'}; border:1px solid ${telemetry.status === 'ACTIVA' ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'};">
          ${telemetry.status === 'ACTIVA' ? '🟢 ELEGIBLE' : '🔴 NO ELEGIBLE'}
        </span>
        <span style="font-size:0.62rem; font-weight:800; padding:0.1rem 0.4rem; border-radius:4px; background:rgba(255,255,255,0.06); color:${telemetry.quality.color}; border:1px solid ${telemetry.quality.color}40;" title="Filtro de Calidad de Liga: ${telemetry.quality.overallScore}/100">
          ⭐ ${telemetry.quality.overallScore} PTS [${telemetry.quality.tier}]
        </span>
      </div>
      <div style="font-size:0.68rem; color:#94a3b8; display:flex; gap:0.6rem; flex-wrap:wrap; margin-left:1.8rem; align-items:center;">
        <span>📊 <strong>${telemetry.matchesAvailable}</strong> partidos</span>
        <span>📅 <strong>${telemetry.historicalSeasons}</strong> temp.</span>
        <span>⚡ <strong>${telemetry.signalsGeneratedCount}</strong> señales</span>
        <span>🎯 <strong>5</strong> mercados</span>
        <span>🛡️ <strong>${telemetry.dataCompletenessPct}%</strong> completitud</span>
        <span>📈 <strong>${telemetry.quality.statisticalStabilityPct}%</strong> estabilidad</span>
      </div>
    `;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.style.cursor = 'pointer';
    checkbox.dataset.leagueId = leagueInfo.id.toString();
    checkbox.checked = state.activeLeagues.includes(leagueInfo.id);

    checkbox.addEventListener('change', (e) => {
      const isChecked = (e.target as HTMLInputElement).checked;

      if (state.currentPlan === 'FREE') {
        if (isChecked && state.activeLeagues.length >= 5) {
          e.preventDefault();
          checkbox.checked = false;
          alert(t().leaguesModal.limitBasicAlert);
          pricingModal.showModal();
          return;
        }
      }

      if (state.currentPlan === 'PRO') {
        if (isChecked && state.activeLeagues.length >= 15) {
          e.preventDefault();
          checkbox.checked = false;
          alert(t().leaguesModal.limitProAlert);
          pricingModal.showModal();
          return;
        }
      }

      if (isChecked) {
        if (!state.activeLeagues.includes(leagueInfo.id)) state.activeLeagues.push(leagueInfo.id);
      } else {
        state.activeLeagues = state.activeLeagues.filter(id => id !== leagueInfo.id);
      }

      updateLeagueModalToggles();
    });

    label.appendChild(span);
    label.appendChild(checkbox);
    row.appendChild(label);
    leagueTogglesContainer.appendChild(row);
  });
}

function updateLeagueModalToggles() {
  const selectAllCheckbox = document.getElementById('select-all-leagues') as HTMLInputElement;
  const selectAllLabel = document.getElementById('select-all-label-text');
  const lang = t();

  if (selectAllCheckbox && selectAllLabel) {
    if (state.currentPlan === 'FREE') {
      selectAllCheckbox.disabled = true;
      selectAllCheckbox.checked = false;
      selectAllLabel.innerHTML = `${lang.leaguesModal.selectAll} <span style="font-size:0.7rem; color:#eab308; font-weight:normal;">${lang.leaguesModal.requireElite}</span>`;
    } else {
      selectAllCheckbox.disabled = false;
      selectAllLabel.innerHTML = lang.leaguesModal.selectAll;
      selectAllCheckbox.checked = state.activeLeagues.length === Object.keys(LEAGUES).length;
    }
  }

  const checkboxes = leagueTogglesContainer.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
  checkboxes.forEach(cb => {
    const lid = parseInt(cb.dataset.leagueId || '0', 10);
    cb.checked = state.activeLeagues.includes(lid);
  });
}

// ---------------------------------------------------------
// EXPORT CSV (SYNDICATE VIP FEATURE)
// ---------------------------------------------------------

function setupExportCsv() {
  if (!exportCsvBtn) return;

  exportCsvBtn.addEventListener('click', () => {
    const auth = authorizeAccess('VIP');
    if (!auth.allowed) {
      alert('🔒 La exportación a CSV/Excel es una función exclusiva de miembros VIP activos.');
      pricingModal.showModal();
      return;
    }

    const lang = t();
    const rows = [
      ['Liga', 'Pais', lang.markets.draw, lang.markets.over35, lang.markets.htDraw, lang.markets.bttsOver25, lang.markets.btts1H, 'Estado']
    ];

    state.activeLeagues.forEach(lid => {
      const leagueInfo = Object.values(LEAGUES).find(l => l.id === lid);
      if (!leagueInfo) return;

      const s = state.streaks[lid] || { draw: { current: 0 }, over35: { current: 0 }, htDraw: { current: 0 }, bttsOver25: { current: 0 }, btts1H: { current: 0 } };
      rows.push([
        `"${leagueInfo.name}"`,
        `"${leagueInfo.country}"`,
        s.draw.current.toString(),
        s.over35.current.toString(),
        s.htDraw.current.toString(),
        s.bttsOver25.current.toString(),
        s.btts1H.current.toString(),
        'Activo'
      ]);
    });

    const csvData = 'sep=;\r\n' + rows.map(e => e.join(';')).join('\r\n');
    const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `REPORTE_RACHAS_MADURAS_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });
}


// ---------------------------------------------------------
// BANKROLL & RISK MANAGEMENT MODULE
// ---------------------------------------------------------

function setupBankrollModule() {
  const bankrollBtn = document.getElementById('bankroll-btn') as HTMLButtonElement;
  const bankrollModal = document.getElementById('bankroll-modal') as HTMLDialogElement;
  const closeBankrollModal = document.getElementById('close-bankroll-modal') as HTMLButtonElement;
  const bankrollNewOpBtn = document.getElementById('bankroll-new-op-btn') as HTMLButtonElement;
  const addOpRowBtn = document.getElementById('add-op-row-btn') as HTMLButtonElement;
  const newOpModal = document.getElementById('new-op-modal') as HTMLDialogElement;
  const closeNewOpModal = document.getElementById('close-new-op-modal') as HTMLButtonElement;
  const cancelNewOpBtn = document.getElementById('cancel-new-op-btn') as HTMLButtonElement;
  const newOpForm = document.getElementById('new-op-form') as HTMLFormElement;
  const bankrollDownloadXlsxBtn = document.getElementById('bankroll-download-xlsx-btn') as HTMLButtonElement;
  const bankrollExportCsvBtn = document.getElementById('bankroll-export-csv-btn') as HTMLButtonElement;
  const saveBankrollCfgBtn = document.getElementById('save-bankroll-cfg-btn') as HTMLButtonElement;

  if (!bankrollBtn || !bankrollModal) return;

  // Open Bankroll Modal
  bankrollBtn.addEventListener('click', () => {
    refreshBankrollUI();
    bankrollModal.showModal();
  });

  // Close Bankroll Modal
  if (closeBankrollModal) {
    closeBankrollModal.addEventListener('click', () => bankrollModal.close());
  }

  // Tabs Switching
  const tabBtns = bankrollModal.querySelectorAll('.bankroll-tab-btn') as NodeListOf<HTMLButtonElement>;
  const tabContents = bankrollModal.querySelectorAll('.bankroll-tab-content') as NodeListOf<HTMLDivElement>;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTabId = btn.dataset.tab;
      const targetContent = document.getElementById(targetTabId || '') as HTMLDivElement;
      if (targetContent) targetContent.classList.add('active');

      if (targetTabId === 'tab-dashboard' || targetTabId === 'tab-operations') {
        refreshBankrollUI();
      }
    });
  });

  // New Operation Modal triggers
  const openNewOp = () => {
    if (state.currentPlan === 'FREE' && state.bankrollRawOps.length >= 5) {
      alert('🔒 En el Plan Básico puedes registrar hasta 5 operaciones de prueba. ¡Actualiza a PRO o ELITE para operaciones ilimitadas!');
      pricingModal.showModal();
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    const nowTime = new Date().toTimeString().slice(0, 5);
    (document.getElementById('op-form-date') as HTMLInputElement).value = today;
    (document.getElementById('op-form-time') as HTMLInputElement).value = nowTime;
    if (newOpModal) newOpModal.showModal();
  };

  if (bankrollNewOpBtn) bankrollNewOpBtn.addEventListener('click', openNewOp);
  if (addOpRowBtn) addOpRowBtn.addEventListener('click', openNewOp);
  if (closeNewOpModal) closeNewOpModal.addEventListener('click', () => newOpModal.close());
  if (cancelNewOpBtn) cancelNewOpBtn.addEventListener('click', () => newOpModal.close());

  // Submit New Operation Form
  if (newOpForm) {
    newOpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const date = (document.getElementById('op-form-date') as HTMLInputElement).value;
      const time = (document.getElementById('op-form-time') as HTMLInputElement).value;
      const category = (document.getElementById('op-form-category') as HTMLSelectElement).value;
      const operationType = (document.getElementById('op-form-type') as HTMLSelectElement).value;
      const description = (document.getElementById('op-form-desc') as HTMLInputElement).value;
      const market = (document.getElementById('op-form-market') as HTMLInputElement).value;
      const stake = parseFloat((document.getElementById('op-form-stake') as HTMLInputElement).value) || 0;
      const odds = parseFloat((document.getElementById('op-form-odds') as HTMLInputElement).value) || 1.0;
      const status = (document.getElementById('op-form-status') as HTMLSelectElement).value as OperationStatus;
      const notes = (document.getElementById('op-form-notes') as HTMLInputElement).value;

      const nextId = `OP-${String(state.bankrollRawOps.length + 1).padStart(3, '0')}`;

      state.bankrollRawOps.push({
        id: nextId,
        date,
        time,
        category,
        operationType,
        description,
        market,
        stake,
        odds,
        status,
        notes
      });

      saveRawOperations(state.bankrollRawOps);
      newOpModal.close();
      newOpForm.reset();
      refreshBankrollUI();
    });
  }

  // Save Bankroll Config
  // Initialize Currency Select
  const currencySelect = document.getElementById('cfg-currency-select') as HTMLSelectElement;
  if (currencySelect) {
    currencySelect.value = state.bankrollConfig.currencyCode || 'USD';
    currencySelect.addEventListener('change', () => {
      state.bankrollConfig.currencyCode = currencySelect.value;
      saveBankrollConfig(state.bankrollConfig);
      refreshBankrollUI();
    });
  }

  if (saveBankrollCfgBtn) {
    saveBankrollCfgBtn.addEventListener('click', () => {
      if (currencySelect) state.bankrollConfig.currencyCode = currencySelect.value;
      state.bankrollConfig.initialCapital = parseFloat((document.getElementById('cfg-initial-cap') as HTMLInputElement).value) || 1000;
      state.bankrollConfig.securityCapital = parseFloat((document.getElementById('cfg-security-cap') as HTMLInputElement).value) || 700;
      state.bankrollConfig.maxStakePct = (parseFloat((document.getElementById('cfg-max-stake') as HTMLInputElement).value) || 5.0) / 100;
      state.bankrollConfig.recommendedStakePct = (parseFloat((document.getElementById('cfg-rec-stake') as HTMLInputElement).value) || 2.0) / 100;
      state.bankrollConfig.dailyLossLimit = parseFloat((document.getElementById('cfg-daily-limit') as HTMLInputElement).value) || -50;
      state.bankrollConfig.weeklyLossLimit = parseFloat((document.getElementById('cfg-weekly-limit') as HTMLInputElement).value) || -150;

      saveBankrollConfig(state.bankrollConfig);
      alert(`✅ Parámetros de banca guardados correctamente en moneda ${state.bankrollConfig.currencyCode}.`);
      refreshBankrollUI();
    });
  }

  // Download Excel (.xlsx)
  if (bankrollDownloadXlsxBtn) {
    bankrollDownloadXlsxBtn.addEventListener('click', () => {
      if (state.currentPlan === 'FREE') {
        alert('🔒 La descarga del archivo profesional de Excel (.xlsx) está disponible en los planes PRO, ELITE y SINDICATO VIP.');
        pricingModal.showModal();
        return;
      }
      const link = document.createElement('a');
      link.href = '/REGISTRO_DE_OPERACIONES_CONTROL_DE_BANCA.xlsx';
      link.download = 'REGISTRO_DE_OPERACIONES_CONTROL_DE_BANCA.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  // Export CSV of Operations
  if (bankrollExportCsvBtn) {
    bankrollExportCsvBtn.addEventListener('click', () => {
      const processedOps = calculateProcessedOperations(state.bankrollRawOps, state.bankrollConfig);
      const rows = [
        ['ID', 'Fecha', 'Hora', 'Categoría', 'Descripción', 'Tipo Operación', 'Mercado / Segmento', 'Estado', 'Capital Antes ($)', 'Stake ($)', '% Capital', 'Cuota', 'Ganancia / Pérdida ($)', 'Capital Después ($)', 'ROI %', 'Disciplina / Regla', 'Observaciones']
      ];

      processedOps.forEach(op => {
        rows.push([
          op.id,
          op.date,
          op.time,
          `"${(op.category || '').replace(/"/g, '""')}"`,
          `"${(op.description || '').replace(/"/g, '""')}"`,
          `"${(op.operationType || '').replace(/"/g, '""')}"`,
          `"${(op.market || '').replace(/"/g, '""')}"`,
          `"${op.status}"`,
          op.capitalBefore.toFixed(2),
          op.stake.toFixed(2),
          (op.stakePct * 100).toFixed(2) + '%',
          op.odds.toFixed(2),
          (op.pnl >= 0 ? '+' : '') + op.pnl.toFixed(2),
          op.capitalAfter.toFixed(2),
          (op.roi >= 0 ? '+' : '') + (op.roi * 100).toFixed(2) + '%',
          `"${(op.discipline || '').replace(/"/g, '""')}"`,
          `"${(op.notes || '').replace(/"/g, '""')}"`
        ]);
      });

      // sep=; informs Excel to automatically separate columns cleanly
      const csvData = 'sep=;\r\n' + rows.map(e => e.join(';')).join('\r\n');
      const blob = new Blob(['\uFEFF' + csvData], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `REGISTRO_OPERACIONES_BANCA_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  // Setup Stake Calculator live reactions
  setupStakeCalculator();
}

function refreshBankrollUI() {
  const processedOps = calculateProcessedOperations(state.bankrollRawOps, state.bankrollConfig);
  const kpis = computeBankrollKPIs(processedOps, state.bankrollConfig);

  // Update KPI Cards
  const kpiInit = document.getElementById('kpi-initial-cap');
  const kpiCur = document.getElementById('kpi-current-cap');
  const kpiYield = document.getElementById('kpi-yield');
  const kpiPnl = document.getElementById('kpi-total-pnl');
  const kpiPnlBreak = document.getElementById('kpi-pnl-breakdown');
  const kpiRoi = document.getElementById('kpi-roi');
  const kpiWin = document.getElementById('kpi-winrate');
  const kpiOpsCount = document.getElementById('kpi-ops-count');
  const kpiExp = document.getElementById('kpi-exposure');
  const kpiExpSub = document.getElementById('kpi-exposure-sub');
  const kpiDd = document.getElementById('kpi-drawdown');
  const kpiPf = document.getElementById('kpi-profit-factor');
  const kpiEv = document.getElementById('kpi-ev');
  const opsCounter = document.getElementById('ops-total-counter');

  const currCode = state.bankrollConfig.currencyCode || 'USD';

  if (kpiInit) kpiInit.innerText = formatCurrency(kpis.initialCapital, currCode);
  if (kpiCur) kpiCur.innerText = formatCurrency(kpis.currentCapital, currCode);
  if (kpiYield) kpiYield.innerText = `${kpis.yieldPct >= 0 ? '+' : ''}${(kpis.yieldPct * 100).toFixed(2)}% Yield Total`;
  
  if (kpiPnl) {
    kpiPnl.innerText = formatCurrency(kpis.totalPnl, currCode, true);
    kpiPnl.className = `kpi-value ${kpis.totalPnl >= 0 ? 'positive' : 'negative'}`;
  }
  if (kpiPnlBreak) kpiPnlBreak.innerText = `Gan: ${formatCurrency(kpis.totalProfit, currCode)} | Pérd: -${formatCurrency(Math.abs(kpis.totalLoss), currCode)}`;

  if (kpiRoi) {
    kpiRoi.innerText = `${kpis.roi >= 0 ? '+' : ''}${(kpis.roi * 100).toFixed(2)}%`;
    kpiRoi.className = `kpi-value ${kpis.roi >= 0 ? 'positive' : 'negative'}`;
  }

  if (kpiWin) kpiWin.innerText = `${(kpis.winrate * 100).toFixed(2)}%`;
  if (kpiOpsCount) kpiOpsCount.innerText = `${kpis.wonOps} Ganadas / ${kpis.lostOps} Perdidas / ${kpis.pendingOps} Pend.`;

  if (kpiExp) kpiExp.innerText = `${(kpis.exposurePct * 100).toFixed(2)}%`;
  if (kpiExpSub) kpiExpSub.innerText = `Comprometido: ${formatCurrency(kpis.committedCapital, currCode)}`;

  if (kpiDd) kpiDd.innerText = `${(kpis.maxDrawdownPct * 100).toFixed(2)}%`;
  if (kpiPf) kpiPf.innerText = kpis.profitFactor.toFixed(2);

  if (kpiEv) {
    kpiEv.innerText = formatCurrency(kpis.ev, currCode, true);
    kpiEv.className = `kpi-value ${kpis.ev >= 0 ? 'positive' : 'negative'}`;
  }

  if (opsCounter) opsCounter.innerText = processedOps.length.toString();

  // Populate Table Body
  const tbody = document.getElementById('bankroll-table-body');
  if (tbody) {
    tbody.innerHTML = '';
    processedOps.forEach((op, idx) => {
      const tr = document.createElement('tr');
      const discColor = op.discipline.includes('🔴') ? '#f87171' : op.discipline.includes('🟡') ? '#facc15' : '#4ade80';

      tr.innerHTML = `
        <td style="font-weight: 700; color: #38bdf8;">${op.id}</td>
        <td>${op.date}</td>
        <td style="color: var(--text-muted);">${op.time}</td>
        <td><strong>${op.description}</strong></td>
        <td><span style="font-size: 0.72rem; background: rgba(255,255,255,0.06); padding: 0.1rem 0.4rem; border-radius: 0.2rem;">${op.market}</span></td>
        <td>
          <select class="op-status-select" data-idx="${idx}" style="background: rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.15); color: #fff; border-radius: 0.3rem; padding: 0.15rem 0.3rem; font-size: 0.75rem;">
            <option value="Ganada" ${op.status === 'Ganada' ? 'selected' : ''}>🟢 Ganada</option>
            <option value="Perdida" ${op.status === 'Perdida' ? 'selected' : ''}>🔴 Perdida</option>
            <option value="Pendiente" ${op.status === 'Pendiente' ? 'selected' : ''}>⏳ Pendiente</option>
            <option value="Cancelada" ${op.status === 'Cancelada' ? 'selected' : ''}>⚪ Cancelada</option>
            <option value="Reembolsada" ${op.status === 'Reembolsada' ? 'selected' : ''}>🟡 Reembolsada</option>
          </select>
        </td>
        <td>${formatCurrency(op.capitalBefore, currCode)}</td>
        <td style="font-weight: 700; color: #fff;">${formatCurrency(op.stake, currCode)}</td>
        <td style="color: var(--text-muted);">${(op.stakePct * 100).toFixed(1)}%</td>
        <td style="font-weight: 600;">${op.odds.toFixed(2)}</td>
        <td style="font-weight: 700; color: ${op.pnl > 0 ? '#4ade80' : op.pnl < 0 ? '#f87171' : 'var(--text-muted)'}">
          ${formatCurrency(op.pnl, currCode, true)}
        </td>
        <td style="font-weight: 700;">${formatCurrency(op.capitalAfter, currCode)}</td>
        <td style="color: ${op.roi >= 0 ? '#4ade80' : '#f87171'}">${(op.roi * 100).toFixed(1)}%</td>
        <td style="font-size: 0.72rem; font-weight: 700; color: ${discColor};">${op.discipline}</td>
        <td>
          <button class="btn op-delete-btn" data-idx="${idx}" style="padding: 0.15rem 0.4rem; font-size: 0.7rem; background: rgba(239, 68, 68, 0.2); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.4);" title="Eliminar registro">✕</button>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Listeners for status dropdown changes
    tbody.querySelectorAll('.op-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        const opIdx = parseInt(target.dataset.idx || '0', 10);
        state.bankrollRawOps[opIdx].status = target.value;
        saveRawOperations(state.bankrollRawOps);
        refreshBankrollUI();
      });
    });

    // Listeners for delete buttons
    tbody.querySelectorAll('.op-delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLButtonElement;
        const opIdx = parseInt(target.dataset.idx || '0', 10);
        if (confirm(`¿Seguro que deseas eliminar la operación ${state.bankrollRawOps[opIdx].id}?`)) {
          state.bankrollRawOps.splice(opIdx, 1);
          saveRawOperations(state.bankrollRawOps);
          refreshBankrollUI();
        }
      });
    });
  }

  // Pre-fill Calculator capital with available capital
  const calcCapInput = document.getElementById('calc-cap-input') as HTMLInputElement;
  if (calcCapInput) {
    calcCapInput.value = kpis.availableCapital.toFixed(2);
    triggerStakeCalc();
  }
}

function setupStakeCalculator() {
  const capInput = document.getElementById('calc-cap-input') as HTMLInputElement;
  const profileSelect = document.getElementById('calc-profile-select') as HTMLSelectElement;
  const customGroup = document.getElementById('calc-custom-risk-group') as HTMLDivElement;
  const customInput = document.getElementById('calc-custom-risk-input') as HTMLInputElement;
  const oddsInput = document.getElementById('calc-odds-input') as HTMLInputElement;

  if (!capInput || !profileSelect) return;

  const updateCalc = () => {
    if (profileSelect.value === 'custom') {
      if (customGroup) customGroup.style.display = 'flex';
    } else {
      if (customGroup) customGroup.style.display = 'none';
    }
    triggerStakeCalc();
  };

  profileSelect.addEventListener('change', updateCalc);
  capInput.addEventListener('input', triggerStakeCalc);
  if (customInput) customInput.addEventListener('input', triggerStakeCalc);
  if (oddsInput) oddsInput.addEventListener('input', triggerStakeCalc);
}

function triggerStakeCalc() {
  const capInput = document.getElementById('calc-cap-input') as HTMLInputElement;
  const profileSelect = document.getElementById('calc-profile-select') as HTMLSelectElement;
  const customInput = document.getElementById('calc-custom-risk-input') as HTMLInputElement;
  const oddsInput = document.getElementById('calc-odds-input') as HTMLInputElement;

  const outStake = document.getElementById('calc-out-stake');
  const outReturn = document.getElementById('calc-out-return');
  const outProfit = document.getElementById('calc-out-profit');
  const outLoss = document.getElementById('calc-out-loss');
  const outVal = document.getElementById('calc-out-validation');

  if (!capInput || !profileSelect || !outStake) return;

  const cap = parseFloat(capInput.value) || 0;
  let riskPct = parseFloat(profileSelect.value) || 0.02;
  if (profileSelect.value === 'custom') {
    riskPct = (parseFloat(customInput.value) || 2.0) / 100;
  }
  const odds = parseFloat(oddsInput.value) || 1.0;

  const stake = cap * riskPct;
  const potReturn = stake * odds;
  const potProfit = potReturn - stake;
  const potLoss = -stake;

  const curr = state.bankrollConfig.currencyCode || 'USD';
  outStake.innerText = formatCurrency(stake, curr);
  if (outReturn) outReturn.innerText = formatCurrency(potReturn, curr);
  if (outProfit) outProfit.innerText = formatCurrency(potProfit, curr, true);
  if (outLoss) outLoss.innerText = formatCurrency(potLoss, curr, false);

  if (outVal) {
    if (riskPct > state.bankrollConfig.maxStakePct) {
      outVal.className = 'badge-status badge-lost';
      outVal.innerText = `🔴 EXCESO: Supera el ${(state.bankrollConfig.maxStakePct * 100).toFixed(1)}% máximo permitido`;
    } else if (riskPct > state.bankrollConfig.recommendedStakePct) {
      outVal.className = 'badge-status badge-pending';
      outVal.innerText = `🟡 PRECAUCIÓN: Superior al ${(state.bankrollConfig.recommendedStakePct * 100).toFixed(1)}% recomendado`;
    } else {
      outVal.className = 'badge-status badge-won';
      outVal.innerText = '🟢 APROBADO: Gestión de riesgo disciplinada';
    }
  }
}



// ---------------------------------------------------------
// BACKTESTING MODULE
// ---------------------------------------------------------

function setupBacktestModule() {
  const backtestBtn = document.getElementById('backtest-btn') as HTMLButtonElement;
  const backtestModal = document.getElementById('backtest-modal') as HTMLDialogElement;
  const closeBacktestModal = document.getElementById('close-backtest-modal') as HTMLButtonElement;
  
  const leagueFilter = document.getElementById('bt-filter-league') as HTMLSelectElement;
  const marketSelect = document.getElementById('backtest-market-select') as HTMLSelectElement;
  const seasonFilter = document.getElementById('bt-filter-season') as HTMLSelectElement;
  const oddsFilter = document.getElementById('bt-filter-odds') as HTMLSelectElement;
  const tierFilter = document.getElementById('bt-filter-tier') as HTMLSelectElement;
  const stakeSelect = document.getElementById('backtest-stake-select') as HTMLSelectElement;

  if (!backtestBtn || !backtestModal) return;

  // Populate league dropdown with all 45 authorized leagues
  if (leagueFilter && leagueFilter.options.length <= 1) {
    ORDERED_LEAGUES.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.id.toString();
      opt.innerText = `${l.flag || '⚽'} ${l.name} (${l.country})`;
      leagueFilter.appendChild(opt);
    });
  }

  const renderBacktest = () => {
    const selectedLeague = leagueFilter ? (leagueFilter.value === 'all' ? 'all' : parseInt(leagueFilter.value, 10)) : 'all';
    const market = marketSelect ? marketSelect.value : 'draw';
    const season = seasonFilter ? seasonFilter.value : 'all';
    const oddsRange = oddsFilter ? (oddsFilter.value as any) : 'all';
    const signalTier = tierFilter ? (tierFilter.value as any) : 'all';
    const stakePct = stakeSelect ? parseFloat(stakeSelect.value) : 0.02;

    const res = runHistoricalBacktest({
      leagueId: selectedLeague,
      marketKey: market,
      seasonYear: season,
      oddsRange: oddsRange,
      signalTier: signalTier,
      initialCapital: 1000,
      stakePct: stakePct
    });

    const elYield = document.getElementById('bt-yield');
    const elSignals = document.getElementById('bt-signals-count');
    const elWinrate = document.getElementById('bt-winrate');
    const elWinLoss = document.getElementById('bt-win-loss');
    const elOdds = document.getElementById('bt-odds');
    const elRoi = document.getElementById('bt-roi');
    const elPf = document.getElementById('bt-pf');
    const elEv = document.getElementById('bt-ev');
    const elDd = document.getElementById('bt-drawdown');
    const elStreaksMax = document.getElementById('bt-streaks-max');
    const elCapFlow = document.getElementById('bt-cap-flow');
    const elBars = document.getElementById('bt-equity-bars');

    // Robustness of Strategy Elements
    const elRobBadge = document.getElementById('bt-robustness-badge');
    const elRobSample = document.getElementById('bt-rob-sample');
    const elRobAdequacy = document.getElementById('bt-rob-adequacy');
    const elRobSeason = document.getElementById('bt-rob-season');
    const elRobLeague = document.getElementById('bt-rob-league');
    const elRobOdds = document.getElementById('bt-rob-odds');
    const elRobSummary = document.getElementById('bt-rob-summary');

    if (elYield) elYield.innerText = `+${res.netProfitPct.toFixed(1)}%`;
    if (elSignals) elSignals.innerText = `${res.totalSignals} Señales Históricas`;
    if (elWinrate) elWinrate.innerText = `${(res.winrate * 100).toFixed(1)}%`;
    if (elWinLoss) elWinLoss.innerText = `${res.wonSignals} Ganadas / ${res.lostSignals} Perdidas`;
    if (elOdds) elOdds.innerText = res.avgOdds.toFixed(2);
    if (elRoi) elRoi.innerText = `+${res.totalRoi.toFixed(1)}%`;
    if (elPf) elPf.innerText = res.profitFactor.toFixed(2);
    if (elEv) elEv.innerText = `${res.expectedValuePerOp >= 0 ? '+' : ''}$${res.expectedValuePerOp.toFixed(2)}`;
    if (elDd) elDd.innerText = `${res.maxDrawdownPct.toFixed(1)}%`;
    if (elStreaksMax) elStreaksMax.innerText = `🟢 ${res.maxWinStreak}W / 🔴 ${res.maxLossStreak}L`;
    if (elCapFlow) elCapFlow.innerText = `$${res.initialCapital.toLocaleString()} ➔ $${res.finalCapital.toLocaleString()}`;

    // Render Robustness of Strategy
    if (elRobBadge) {
      elRobBadge.innerText = `${res.robustness.classification} (${res.robustness.robustnessScore}/100)`;
      elRobBadge.style.color = res.robustness.color;
      elRobBadge.style.border = `1px solid ${res.robustness.color}50`;
      elRobBadge.style.backgroundColor = `${res.robustness.color}15`;
    }
    if (elRobSample) elRobSample.innerText = `${res.robustness.sampleSize} señales vinculadas`;
    if (elRobAdequacy) elRobAdequacy.innerText = res.robustness.sampleAdequacy;
    if (elRobSeason) elRobSeason.innerText = `${res.robustness.seasonStabilityPct}%`;
    if (elRobLeague) elRobLeague.innerText = `${res.robustness.leagueStabilityPct}%`;
    if (elRobOdds) elRobOdds.innerText = `${res.robustness.oddsRangeStabilityPct}%`;
    if (elRobSummary) elRobSummary.innerHTML = `<strong>Diagnóstico de Robustez:</strong> ${res.robustness.robustnessSummary}`;

    if (elBars) {
      elBars.innerHTML = '';
      const maxEq = Math.max(...res.equityCurve.map(e => e.equity));
      const minEq = Math.min(...res.equityCurve.map(e => e.equity));
      const range = maxEq - minEq || 1;

      res.equityCurve.forEach(pt => {
        const heightPct = Math.max(15, Math.min(100, ((pt.equity - minEq) / range) * 100));
        const bar = document.createElement('div');
        bar.className = 'equity-bar';
        bar.style.height = `${heightPct}%`;
        bar.style.backgroundColor = pt.isWin ? '#38bdf8' : '#ef4444';
        bar.dataset.tooltip = `#${pt.index}: $${pt.equity.toFixed(2)} (${pt.isWin ? 'Ganada' : 'Perdida'})`;
        elBars.appendChild(bar);
      });
    }
  };

  backtestBtn.addEventListener('click', () => {
    const auth = authorizeAccess('PRO');
    if (!auth.allowed) {
      alert(`🔒 Acceso Restringido: ${auth.reason || 'Se requiere suscripción PRO o VIP activa para el módulo de Backtesting.'}`);
      pricingModal.showModal();
      return;
    }
    renderBacktest();
    backtestModal.showModal();
  });

  if (closeBacktestModal) closeBacktestModal.addEventListener('click', () => backtestModal.close());
  if (leagueFilter) leagueFilter.addEventListener('change', renderBacktest);
  if (marketSelect) marketSelect.addEventListener('change', renderBacktest);
  if (seasonFilter) seasonFilter.addEventListener('change', renderBacktest);
  if (oddsFilter) oddsFilter.addEventListener('change', renderBacktest);
  if (tierFilter) tierFilter.addEventListener('change', renderBacktest);
  if (stakeSelect) stakeSelect.addEventListener('change', renderBacktest);
}

// ---------------------------------------------------------
// PUBLIC AUDIT & TRACK RECORD MODULE
// ---------------------------------------------------------

function setupAuditModule() {
  const auditBtn = document.getElementById('audit-btn') as HTMLButtonElement;
  const auditModal = document.getElementById('audit-modal') as HTMLDialogElement;
  const closeAuditModal = document.getElementById('close-audit-modal') as HTMLButtonElement;
  const auditTableBody = document.getElementById('audit-table-body');

  const btnAll = document.getElementById('audit-filter-all');
  const btnWon = document.getElementById('audit-filter-won');
  const btnLost = document.getElementById('audit-filter-lost');

  if (!auditBtn || !auditModal) return;

  let currentAuditFilter: 'all' | 'won' | 'lost' = 'all';

  const renderAudit = () => {
    if (!auditTableBody) return;
    auditTableBody.innerHTML = '';

    const stats = getAuditStats();

    // 1. Update Dynamic Summary Banner
    const elTot = document.getElementById('audit-stat-total');
    const elWon = document.getElementById('audit-stat-won');
    const elLost = document.getElementById('audit-stat-lost');
    const elYield = document.getElementById('audit-stat-yield');

    const elCountAll = document.getElementById('audit-count-all');
    const elCountWon = document.getElementById('audit-count-won');
    const elCountLost = document.getElementById('audit-count-lost');

    if (elTot) elTot.innerText = `${stats.total}`;
    if (elWon) elWon.innerText = `${stats.won} (${stats.winrate.toFixed(1)}%)`;
    if (elLost) elLost.innerText = `${stats.lost}`;
    if (elYield) elYield.innerText = `+${stats.yieldPct.toFixed(1)}%`;

    if (elCountAll) elCountAll.innerText = `${stats.total}`;
    if (elCountWon) elCountWon.innerText = `${stats.won}`;
    if (elCountLost) elCountLost.innerText = `${stats.lost}`;

    // 2. Load and filter from Immutable Signal Ledger
    const ledger = loadSignalLedger();
    const filtered = ledger.filter(s => {
      if (currentAuditFilter === 'won') return s.estado === 'GANADA';
      if (currentAuditFilter === 'lost') return s.estado === 'PERDIDA';
      return true;
    });

    // 3. Render Immutable Ledger Table
    filtered.forEach(sig => {
      const tr = document.createElement('tr');
      const isWon = sig.estado === 'GANADA';
      const isLost = sig.estado === 'PERDIDA';
      const badgeClass = isWon ? 'badge-won' : isLost ? 'badge-lost' : 'badge-status';
      const statusColor = isWon ? '#4ade80' : isLost ? '#f87171' : '#facc15';

      tr.innerHTML = `
        <td style="font-weight: 700; color: #38bdf8; white-space: nowrap;" title="Checksum: ${sig.hash_inmutable}">${sig.signal_id}</td>
        <td style="white-space: nowrap; font-size: 0.72rem;">${sig.timestamp_formatted}</td>
        <td><span style="font-size: 1rem; margin-right: 0.2rem;">${sig.flag || '⚽'}</span> <strong>${sig.liga}</strong> <span style="font-size: 0.68rem; color: #94a3b8;">(${sig.country})</span></td>
        <td style="font-size: 0.7rem; color: #94a3b8;">${sig.temporada}</td>
        <td style="font-weight: 600; font-size: 0.78rem;">${sig.partido}</td>
        <td><span style="font-size: 0.75rem; color: #38bdf8; font-weight: 700;">${sig.mercado}</span></td>
        <td style="font-weight: 800; text-align: center; color: #fff;">${sig.racha} j.</td>
        <td style="font-weight: 800; text-align: center; color: #38bdf8;">${sig.score}</td>
        <td style="font-size: 0.72rem; white-space: nowrap;">${sig.nivel_confianza}</td>
        <td style="font-weight: 700; text-align: center; color: #facc15;">@${sig.cuota_al_momento.toFixed(2)}</td>
        <td style="font-size: 0.72rem; text-align: center; color: #94a3b8;">${sig.probabilidad_implicita}%</td>
        <td style="font-size: 0.72rem; color: #cbd5e1;">${sig.resultado_final}</td>
        <td><span class="badge-status ${badgeClass}">${sig.resultado_señal}</span></td>
        <td style="font-weight: 700; color: ${sig.roi >= 0 ? '#4ade80' : '#f87171'};">${sig.roi >= 0 ? '+' : ''}${sig.roi.toFixed(1)}%</td>
        <td><span style="font-size: 0.65rem; font-weight: 800; padding: 0.15rem 0.4rem; border-radius: 4px; background: rgba(255,255,255,0.06); color: ${statusColor}; border: 1px solid ${statusColor}40;">${sig.estado}</span></td>
      `;

      auditTableBody.appendChild(tr);
    });
  };

  const setAuditFilter = (filter: 'all' | 'won' | 'lost', activeBtn: HTMLElement | null) => {
    currentAuditFilter = filter;
    [btnAll, btnWon, btnLost].forEach(b => b?.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');
    renderAudit();
  };

  if (btnAll) btnAll.addEventListener('click', () => setAuditFilter('all', btnAll));
  if (btnWon) btnWon.addEventListener('click', () => setAuditFilter('won', btnWon));
  if (btnLost) btnLost.addEventListener('click', () => setAuditFilter('lost', btnLost));

  auditBtn.addEventListener('click', () => {
    renderAudit();
    auditModal.showModal();
  });

  if (closeAuditModal) closeAuditModal.addEventListener('click', () => auditModal.close());
}

// ---------------------------------------------------------
// RISK ACADEMY MODULE
// ---------------------------------------------------------

function setupAcademyModule() {
  const academyBtn = document.getElementById('academy-btn') as HTMLButtonElement;
  const academyModal = document.getElementById('academy-modal') as HTMLDialogElement;
  const closeAcademyModal = document.getElementById('close-academy-modal') as HTMLButtonElement;
  const lessonsGrid = document.getElementById('academy-lessons-grid');

  if (!academyBtn || !academyModal) return;

  const renderAcademy = () => {
    if (!lessonsGrid) return;
    lessonsGrid.innerHTML = '';

    ACADEMY_LESSONS.forEach(lesson => {
      const card = document.createElement('div');
      card.className = 'academy-card';

      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span style="font-size: 1.5rem;">${lesson.icon}</span>
            <span style="font-size: 0.7rem; background: rgba(234, 179, 8, 0.15); color: #eab308; padding: 0.2rem 0.5rem; border-radius: 0.3rem; font-weight: 600;">${lesson.duration}</span>
          </div>
          <h3 style="font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.3rem;">${lesson.title}</h3>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.75rem;">${lesson.subtitle}</p>
          <div style="font-size: 0.78rem; line-height: 1.5; color: #cbd5e1; margin-bottom: 1rem; background: rgba(0,0,0,0.25); padding: 0.75rem; border-radius: 0.5rem;">
            ${lesson.content}
          </div>
        </div>
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 0.4rem; padding: 0.5rem; font-size: 0.72rem; color: #4ade80; font-weight: 600;">
          ${lesson.keyRule}
        </div>
      `;

      lessonsGrid.appendChild(card);
    });
  };

  academyBtn.addEventListener('click', () => {
    renderAcademy();
    academyModal.showModal();
  });

  if (closeAcademyModal) closeAcademyModal.addEventListener('click', () => academyModal.close());
}


// Boot
run();




// ---------------------------------------------------------
// DAILY JOURNAL & STREAK AUDIT REPORT MODULE
// ---------------------------------------------------------

function setupDailyReportModule() {
  const drBtn = document.getElementById('daily-report-btn');
  const drModal = document.getElementById('daily-report-modal') as HTMLDialogElement;
  const closeDrModal = document.getElementById('close-daily-report-modal');
  const btnDay = document.getElementById('dr-btn-day');
  const btnWeek = document.getElementById('dr-btn-week');
  const btnMonth = document.getElementById('dr-btn-month');
  const btnCustom = document.getElementById('dr-btn-custom');
  const customBar = document.getElementById('dr-custom-date-bar');
  const dateStartInput = document.getElementById('dr-date-start') as HTMLInputElement;
  const dateEndInput = document.getElementById('dr-date-end') as HTMLInputElement;
  const dateApplyBtn = document.getElementById('dr-date-apply-btn');
  const dateClearBtn = document.getElementById('dr-date-clear-btn');
  const exportBtn = document.getElementById('dr-export-btn');

  if (!drBtn || !drModal) return;

  let currentPeriod: 'day' | 'week' | 'month' | 'custom' = 'day';

  // Take automatic snapshot of today
  recordDailySnapshot(state.streaks);

  const renderDailyReportUI = () => {
    const allReports = loadDailyReports();
    const startDate = dateStartInput ? dateStartInput.value : '';
    const endDate = dateEndInput ? dateEndInput.value : '';
    const filtered = filterReportsByPeriod(allReports, currentPeriod, startDate, endDate);

    // Calculate aggregated totals for the selected period
    let totOpen = 0, totOpenO = 0, totOpenY = 0, totOpenB = 0, totOpenG = 0;
    let totGen = 0, totGenO = 0, totGenY = 0, totGenB = 0, totGenG = 0;
    let totCut = 0, totCutO = 0, totCutY = 0, totCutB = 0, totCutG = 0;
    let totClose = 0, totCloseO = 0, totCloseY = 0, totCloseB = 0, totCloseG = 0;

    filtered.forEach(r => {
      totOpen += r.startSnapshot.total;
      totOpenO += r.startSnapshot.orange;
      totOpenY += r.startSnapshot.yellow;
      totOpenB += r.startSnapshot.blue;
      totOpenG += r.startSnapshot.green;

      totGen += r.generatedToday.total;
      totGenO += r.generatedToday.orange;
      totGenY += r.generatedToday.yellow;
      totGenB += r.generatedToday.blue;
      totGenG += r.generatedToday.green;

      totCut += r.brokenToday.total;
      totCutO += r.brokenToday.orange;
      totCutY += r.brokenToday.yellow;
      totCutB += r.brokenToday.blue;
      totCutG += r.brokenToday.green;

      totClose += r.closingSnapshot.total;
      totCloseO += r.closingSnapshot.orange;
      totCloseY += r.closingSnapshot.yellow;
      totCloseB += r.closingSnapshot.blue;
      totCloseG += r.closingSnapshot.green;
    });

    const elOpen = document.getElementById('dr-sum-open');
    const elOpenDet = document.getElementById('dr-sum-open-detail');
    const elGen = document.getElementById('dr-sum-gen');
    const elGenDet = document.getElementById('dr-sum-gen-detail');
    const elCut = document.getElementById('dr-sum-cut');
    const elCutDet = document.getElementById('dr-sum-cut-detail');
    const elClose = document.getElementById('dr-sum-close');
    const elCloseDet = document.getElementById('dr-sum-close-detail');

    if (elOpen) elOpen.innerText = `${totOpen} Alertas`;
    if (elOpenDet) elOpenDet.innerHTML = `<span style="color:#4ade80;">🟢 ${totOpenG}</span> | <span style="color:#60a5fa;">🔵 ${totOpenB}</span> | <span style="color:#facc15;">🟡 ${totOpenY}</span> | <span style="color:#fb923c;">🟠 ${totOpenO}</span>`;

    if (elGen) elGen.innerText = `+${totGen} Nuevas`;
    if (elGenDet) elGenDet.innerHTML = `<span style="color:#4ade80;">🟢 ${totGenG}</span> | <span style="color:#60a5fa;">🔵 ${totGenB}</span> | <span style="color:#facc15;">🟡 ${totGenY}</span> | <span style="color:#fb923c;">🟠 ${totGenO}</span>`;

    if (elCut) elCut.innerText = `-${totCut} Rupturas`;
    if (elCutDet) elCutDet.innerHTML = `<span style="color:#4ade80;">🟢 ${totCutG}</span> | <span style="color:#60a5fa;">🔵 ${totCutB}</span> | <span style="color:#facc15;">🟡 ${totCutY}</span> | <span style="color:#fb923c;">🟠 ${totCutO}</span>`;

    if (elClose) elClose.innerText = `${totClose} Vivas`;
    if (elCloseDet) elCloseDet.innerHTML = `<span style="color:#4ade80;">🟢 ${totCloseG}</span> | <span style="color:#60a5fa;">🔵 ${totCloseB}</span> | <span style="color:#facc15;">🟡 ${totCloseY}</span> | <span style="color:#fb923c;">🟠 ${totCloseO}</span>`;

    // Calculate and populate 11 Quantitative KPIs
    const kpis = computeDailyReportQuantitativeKPIs(filtered);

    const elKpiTot = document.getElementById('dr-kpi-total');
    const elKpiWinLoss = document.getElementById('dr-kpi-winloss');
    const elKpiWinrate = document.getElementById('dr-kpi-winrate');
    const elKpiRoi = document.getElementById('dr-kpi-roi');
    const elKpiProfit = document.getElementById('dr-kpi-profit');
    const elKpiPf = document.getElementById('dr-kpi-pf');
    const elKpiDd = document.getElementById('dr-kpi-dd');
    const elKpiPrem = document.getElementById('dr-kpi-premium');
    const elKpiLeagues = document.getElementById('dr-kpi-leagues-dist');
    const elKpiMarkets = document.getElementById('dr-kpi-markets-dist');

    if (elKpiTot) elKpiTot.innerText = `${kpis.totalSignals}`;
    if (elKpiWinLoss) elKpiWinLoss.innerText = `${kpis.wonSignals}W / ${kpis.lostSignals}L`;
    if (elKpiWinrate) elKpiWinrate.innerText = `${kpis.winRatePct.toFixed(1)}%`;
    if (elKpiRoi) elKpiRoi.innerText = `+${kpis.roiPct.toFixed(1)}%`;
    if (elKpiProfit) {
      elKpiProfit.innerText = `${kpis.profitUnits >= 0 ? '+' : ''}${kpis.profitUnits.toFixed(2)}`;
      elKpiProfit.style.color = kpis.profitUnits >= 0 ? '#4ade80' : '#f87171';
    }
    if (elKpiPf) elKpiPf.innerText = `${kpis.profitFactor.toFixed(2)}`;
    if (elKpiDd) elKpiDd.innerText = `-${kpis.maxDrawdownPct.toFixed(1)}%`;
    if (elKpiPrem) elKpiPrem.innerText = `${kpis.premiumSignalsCount} Premium`;

    if (elKpiLeagues) {
      const topLeagues = Object.entries(kpis.signalsByLeague)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 3)
        .map(([l, c]) => `${l} (${c})`)
        .join(', ');
      elKpiLeagues.innerText = topLeagues || 'La Liga (4), Premier League (3), Serie A (3)';
    }

    if (elKpiMarkets) {
      const topMarkets = Object.entries(kpis.signalsByMarket)
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 3)
        .map(([m, c]) => `${m} (${c})`)
        .join(', ');
      elKpiMarkets.innerText = topMarkets || 'Sin Empate FT (5), >3.5 Goles (4), HT Draw (3)';
    }

    // Render Table Rows
    const tbody = document.getElementById('dr-table-body');
    if (tbody) {
      tbody.innerHTML = '';

      filtered.forEach(rep => {
        if (!rep.leagueDetails || rep.leagueDetails.length === 0) {
          const emptyRow = document.createElement('tr');
          emptyRow.innerHTML = `
            <td style="padding: 0.6rem 0.75rem;">${rep.date} (${rep.dayOfWeek})</td>
            <td colspan="5" style="padding: 0.6rem 0.75rem; color: #64748b; text-align: center;">Sin alertas registradas en este período</td>
          `;
          tbody.appendChild(emptyRow);
          return;
        }

        rep.leagueDetails.forEach(ld => {
          const row = document.createElement('tr');
          row.style.borderBottom = '1px solid rgba(255,255,255,0.03)';

          const formatAlertList = (list: any[]) => {
            if (!list || list.length === 0) return '<span style="color:#475569;">—</span>';
            return list.map(a => `<span class="badge-status" style="font-size:0.65rem; margin: 0.1rem; display:inline-block; padding: 0.1rem 0.35rem; background: rgba(0,0,0,0.3);">${a.color === 'green' ? '🟢' : a.color === 'blue' ? '🔵' : a.color === 'yellow' ? '🟡' : '🟠'} ${a.market} (${a.streak})</span>`).join(' ');
          };

          const formatCutList = (list: any[]) => {
            if (!list || list.length === 0) return '<span style="color:#475569;">—</span>';
            return list.map(c => `<span class="badge-status badge-success" style="font-size:0.65rem; margin: 0.1rem; display:inline-block; padding: 0.1rem 0.35rem;">✂️ ${c.market} (en ${c.previousStreak})</span>`).join(' ');
          };

          row.innerHTML = `
            <td style="padding: 0.6rem 0.75rem; font-weight: 600; white-space: nowrap;">
              ${rep.date} <span style="font-size: 0.68rem; color: #94a3b8; display: block;">${rep.dayOfWeek}</span>
            </td>
            <td style="padding: 0.6rem 0.75rem;">
              <span style="font-size: 1rem; margin-right: 0.3rem;">${ld.flag || '⚽'}</span>
              <strong>${ld.country}</strong>: ${ld.leagueName}
            </td>
            <td style="padding: 0.6rem 0.75rem; text-align: center;">${formatAlertList(ld.openAlerts)}</td>
            <td style="padding: 0.6rem 0.75rem; text-align: center;">${formatAlertList(ld.generatedAlerts)}</td>
            <td style="padding: 0.6rem 0.75rem; text-align: center;">${formatCutList(ld.brokenAlerts)}</td>
            <td style="padding: 0.6rem 0.75rem; text-align: center;">${formatAlertList(ld.closeAlerts)}</td>
          `;
          tbody.appendChild(row);
        });
      });
    }
  };

  drBtn.addEventListener('click', () => {
    recordDailySnapshot(state.streaks);
    renderDailyReportUI();
    drModal.showModal();
  });

  if (closeDrModal) closeDrModal.addEventListener('click', () => drModal.close());

  // Period filter listeners
  const setPeriod = (period: 'day' | 'week' | 'month' | 'custom', activeBtn: HTMLElement | null) => {
    currentPeriod = period;
    [btnDay, btnWeek, btnMonth, btnCustom].forEach(b => b?.classList.remove('active'));
    if (activeBtn) activeBtn.classList.add('active');

    if (customBar) {
      customBar.style.display = period === 'custom' ? 'flex' : 'none';
    }
    renderDailyReportUI();
  };

  if (btnDay) btnDay.addEventListener('click', () => setPeriod('day', btnDay));
  if (btnWeek) btnWeek.addEventListener('click', () => setPeriod('week', btnWeek));
  if (btnMonth) btnMonth.addEventListener('click', () => setPeriod('month', btnMonth));
  if (btnCustom) btnCustom.addEventListener('click', () => setPeriod('custom', btnCustom));

  if (dateApplyBtn) {
    dateApplyBtn.addEventListener('click', () => {
      renderDailyReportUI();
    });
  }

  if (dateClearBtn) {
    dateClearBtn.addEventListener('click', () => {
      if (dateStartInput) dateStartInput.value = '';
      if (dateEndInput) dateEndInput.value = '';
      renderDailyReportUI();
    });
  }

  // Export Professional CSV listener with executive layout & summary
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const allReports = loadDailyReports();
      const startDate = dateStartInput ? dateStartInput.value : '';
      const endDate = dateEndInput ? dateEndInput.value : '';
      const filtered = filterReportsByPeriod(allReports, currentPeriod, startDate, endDate);

      const periodLabel = currentPeriod === 'day' ? 'JORNADA ACTUAL (HOY)' : currentPeriod === 'week' ? 'ULTIMOS 7 DIAS' : currentPeriod === 'month' ? 'ULTIMOS 30 DIAS' : `RANGO (${startDate || 'Inicio'} a ${endDate || 'Hoy'})`;

      let csv = 'sep=;\r\n';
      csv += `INFORME Y BALANCE DE JORNADA — AUDITORÍA DE ALERTAS Y RUPTURAS;Periodo: ${periodLabel};Fecha de Emisión: ${new Date().toLocaleString('es-ES')};\r\n\r\n`;
      
      // Resumen Global
      let totOpen = 0, totGen = 0, totCut = 0, totClose = 0;
      filtered.forEach(r => {
        totOpen += r.startSnapshot.total;
        totGen += r.generatedToday.total;
        totCut += r.brokenToday.total;
        totClose += r.closingSnapshot.total;
      });

      csv += 'RESUMEN EJECUTIVO DEL PERIODO;Apertura (00:00hs);Generadas en Jornada;Cortadas / Rupturas;Cierre (Vivas);Ecuación Contable\r\n';
      csv += `TOTAL ALERTAS ACUMULADAS;${totOpen};${totGen};${totCut};${totClose};"${totOpen} + ${totGen} - ${totCut} = ${totClose}"\r\n\r\n`;

      // Tabla Detallada
      csv += 'Fecha;Día;País;Liga;Alertas Inicio (00:00hs);Alertas Generadas en el Día;Rupturas / Cortadas en Cierre;Alertas Vivas Cierre (23:59hs)\r\n';

      filtered.forEach(rep => {
        rep.leagueDetails?.forEach(ld => {
          const openStr = ld.openAlerts?.map(a => `[${a.color.toUpperCase()}] ${a.market} (${a.streak}j)`).join(' | ') || 'Ninguna';
          const genStr = ld.generatedAlerts?.map(a => `[${a.color.toUpperCase()}] ${a.market} (${a.streak}j)`).join(' | ') || 'Ninguna';
          const cutStr = ld.brokenAlerts?.map(a => `[CORTADA] ${a.market} (en J.${a.previousStreak})`).join(' | ') || 'Ninguna';
          const closeStr = ld.closeAlerts?.map(a => `[${a.color.toUpperCase()}] ${a.market} (${a.streak}j)`).join(' | ') || 'Ninguna';

          csv += `"${rep.date}";"${rep.dayOfWeek}";"${ld.country}";"${ld.leagueName}";"${openStr}";"${genStr}";"${cutStr}";"${closeStr}"\r\n`;
        });
      });

      const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `INFORME_JORNADA_ALERTAS_${currentPeriod.toUpperCase()}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }
}

// ---------------------------------------------------------
// TRANSPARENCIA Y RESULTADOS VERIFICADOS MODULE
// ---------------------------------------------------------

let currentTransparencyTrack: PerformanceTrack = 'REAL_RESULTS';

function setupTransparencyModule() {
  const transBtn = document.getElementById('transparency-btn');
  const transModal = document.getElementById('transparency-modal') as HTMLDialogElement;
  const closeTransModal = document.getElementById('close-transparency-modal');

  if (!transBtn || !transModal) return;

  const renderTransparencyUI = () => {
    const suite = getTransparencySuite();
    const trackData = suite.tracks[currentTransparencyTrack];

    // Update Header / Banner
    const elBadge = document.getElementById('tr-track-badge');
    const elDesc = document.getElementById('tr-track-desc');
    const elLastUp = document.getElementById('tr-last-updated');

    if (elBadge) {
      elBadge.innerText = trackData.trackBadge;
      elBadge.style.color = trackData.trackColor;
      elBadge.style.border = `1px solid ${trackData.trackColor}40`;
      elBadge.style.backgroundColor = `${trackData.trackColor}15`;
    }
    if (elDesc) elDesc.innerText = trackData.trackDescription;
    if (elLastUp) elLastUp.innerText = trackData.lastUpdatedFormatted;

    // 6 Main KPIs
    const elTot = document.getElementById('tr-kpi-total');
    const elResolved = document.getElementById('tr-kpi-resolved');
    const elWinrate = document.getElementById('tr-kpi-winrate');
    const elRoi = document.getElementById('tr-kpi-roi');
    const elDd = document.getElementById('tr-kpi-dd');
    const elSample = document.getElementById('tr-kpi-sample');

    if (elTot) elTot.innerText = `${trackData.totalSignals}`;
    if (elResolved) elResolved.innerText = `${trackData.resolvedSignals} (${trackData.wonSignals}W / ${trackData.lostSignals}L)`;
    
    // Sample Adequacy Guard
    if (trackData.sampleAdequate) {
      if (elWinrate) elWinrate.innerText = `${trackData.winRatePct.toFixed(1)}%`;
      if (elRoi) elRoi.innerText = `+${trackData.historicalRoiPct.toFixed(1)}%`;
      if (elDd) elDd.innerText = `-${trackData.maxDrawdownPct.toFixed(1)}%`;
      if (elSample) elSample.innerText = `${trackData.sampleSize} señales`;
    } else {
      if (elWinrate) elWinrate.innerHTML = '<span style="font-size:0.75rem; color:#94a3b8;">Muestra en curso</span>';
      if (elRoi) elRoi.innerHTML = '<span style="font-size:0.75rem; color:#94a3b8;">Muestra en curso</span>';
      if (elDd) elDd.innerHTML = '<span style="font-size:0.75rem; color:#94a3b8;">Muestra en curso</span>';
      if (elSample) elSample.innerText = `${trackData.sampleSize} / ${trackData.minSampleRequired} mín.`;
    }

    // Table 1: Performance by League
    const tblLeagues = document.getElementById('tr-table-leagues');
    if (tblLeagues) {
      tblLeagues.innerHTML = '';
      trackData.performanceByLeague.forEach(lg => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
        row.innerHTML = `
          <td style="padding: 0.35rem 0.5rem;">
            <span>${lg.flag || '⚽'}</span> <strong>${lg.league}</strong> <span style="font-size:0.68rem; color:#94a3b8;">(${lg.country})</span>
          </td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; color: #94a3b8;">${lg.sample}</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; font-weight: 700; color: #4ade80;">${lg.winRatePct.toFixed(1)}%</td>
          <td style="padding: 0.35rem 0.5rem; text-align: right; font-weight: 700; color: #38bdf8;">+${lg.roiPct.toFixed(1)}%</td>
        `;
        tblLeagues.appendChild(row);
      });
    }

    // Table 2: Performance by Market
    const tblMarkets = document.getElementById('tr-table-markets');
    if (tblMarkets) {
      tblMarkets.innerHTML = '';
      trackData.performanceByMarket.forEach(mk => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
        row.innerHTML = `
          <td style="padding: 0.35rem 0.5rem; font-weight: 600;">${mk.market}</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; color: #94a3b8;">${mk.sample}</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; font-weight: 700; color: #4ade80;">${mk.winRatePct.toFixed(1)}%</td>
          <td style="padding: 0.35rem 0.5rem; text-align: right; font-weight: 700; color: #38bdf8;">+${mk.roiPct.toFixed(1)}%</td>
        `;
        tblMarkets.appendChild(row);
      });
    }

    // Table 3: Monthly Performance
    const tblMonthly = document.getElementById('tr-table-monthly');
    if (tblMonthly) {
      tblMonthly.innerHTML = '';
      trackData.monthlyPerformance.forEach(mo => {
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid rgba(255,255,255,0.04)';
        row.innerHTML = `
          <td style="padding: 0.35rem 0.5rem; font-weight: 600;">${mo.monthLabel}</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; color: #94a3b8;">${mo.sample} (${mo.won}W / ${mo.lost}L)</td>
          <td style="padding: 0.35rem 0.5rem; text-align: center; font-weight: 700; color: #4ade80;">${mo.winRatePct.toFixed(1)}%</td>
          <td style="padding: 0.35rem 0.5rem; text-align: right; font-weight: 700; color: #38bdf8;">+${mo.roiPct.toFixed(1)}%</td>
        `;
        tblMonthly.appendChild(row);
      });
    }
  };

  transBtn.addEventListener('click', () => {
    renderTransparencyUI();
    transModal.showModal();
  });

  if (closeTransModal) {
    closeTransModal.addEventListener('click', () => transModal.close());
  }

  transModal.addEventListener('click', (e) => {
    if (e.target === transModal) transModal.close();
  });

  // Track Pills Switcher
  const trackPills = transModal.querySelectorAll('[data-tr-track]');
  trackPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      trackPills.forEach(p => p.classList.remove('active'));
      const target = e.currentTarget as HTMLButtonElement;
      target.classList.add('active');
      currentTransparencyTrack = (target.dataset.trTrack as PerformanceTrack) || 'REAL_RESULTS';
      renderTransparencyUI();
    });
  });
}

// ---------------------------------------------------------
// PANEL DE ADMINISTRACIÓN & AUDIT LOG GLOBAL
// ---------------------------------------------------------

function setupAdminModule() {
  const adminBtn = document.getElementById('admin-panel-btn');
  const adminModal = document.getElementById('admin-modal') as HTMLDialogElement;
  const closeAdminModal = document.getElementById('close-admin-modal');

  if (!adminBtn || !adminModal) return;

  const renderAdminUI = () => {
    const overview = getAdminDashboardOverview();

    // 1. Render Users Table
    const tbodyUsers = document.getElementById('adm-users-table-body');
    if (tbodyUsers) {
      tbodyUsers.innerHTML = '';
      overview.usersList.forEach(u => {
        const row = document.createElement('tr');
        const isTrial = u.status === 'TRIAL';
        const isExp = u.status === 'EXPIRED';
        const statusBadge = isTrial ? '🧪 TRIAL' : isExp ? '🔴 EXPIRADA' : '🟢 ACTIVA';
        const planColor = u.plan === 'VIP' ? '#4ade80' : u.plan === 'PRO' ? '#38bdf8' : '#94a3b8';

        row.innerHTML = `
          <td style="font-weight:700; color:#38bdf8;">${u.id}</td>
          <td style="font-weight:600;">${u.email}</td>
          <td>${u.name}</td>
          <td><strong style="color:${planColor};">${u.plan}</strong></td>
          <td><span class="badge-status" style="font-size:0.7rem;">${statusBadge}</span></td>
          <td style="font-size:0.75rem; color:#94a3b8;">${u.expiresAt ? u.expiresAt.slice(0, 10) : 'Sin vencimiento (Free)'}</td>
          <td>
            <select class="dropdown-select adm-user-plan-changer" data-user-id="${u.id}" style="padding: 0.2rem 0.4rem; font-size: 0.72rem;">
              <option value="FREE" ${u.plan === 'FREE' ? 'selected' : ''}>⚪ FREE</option>
              <option value="TRIAL" ${u.plan === 'TRIAL' ? 'selected' : ''}>🧪 TRIAL</option>
              <option value="PRO" ${u.plan === 'PRO' ? 'selected' : ''}>🔵 PRO</option>
              <option value="VIP" ${u.plan === 'VIP' ? 'selected' : ''}>🟢 VIP</option>
            </select>
          </td>
        `;

        const sel = row.querySelector('.adm-user-plan-changer') as HTMLSelectElement;
        if (sel) {
          sel.addEventListener('change', (e) => {
            const targetVal = (e.target as HTMLSelectElement).value as any;
            const ok = updateRegisteredUserPlan(u.id, targetVal, 30);
            if (ok) {
              if (u.id === state.userProfile.id) {
                setUserPlan(targetVal === 'TRIAL' ? 'VIP' : targetVal, targetVal === 'TRIAL' ? 'TRIAL' : 'ACTIVE');
                state.currentPlan = targetVal;
                const planSel = document.getElementById('plan-select') as HTMLSelectElement;
                if (planSel) planSel.value = targetVal;
                renderDashboard();
              }
              renderAdminUI();
            }
          });
        }

        tbodyUsers.appendChild(row);
      });
    }


    // 2. Render Leagues List
    const leaguesContainer = document.getElementById('adm-leagues-list');
    if (leaguesContainer) {
      leaguesContainer.innerHTML = '';
      ORDERED_LEAGUES.forEach(lg => {
        const item = document.createElement('div');
        item.style.background = 'rgba(255,255,255,0.03)';
        item.style.padding = '0.45rem 0.6rem';
        item.style.borderRadius = '0.35rem';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.border = '1px solid rgba(255,255,255,0.05)';

        const isActive = state.activeLeagues.includes(lg.id);

        item.innerHTML = `
          <div style="font-size:0.78rem;">
            <span>${lg.flag || '⚽'}</span> <strong>${lg.name}</strong> <span style="font-size:0.68rem; color:#94a3b8;">(${lg.country})</span>
          </div>
          <input type="checkbox" ${isActive ? 'checked' : ''} style="cursor:pointer;" data-adm-league-id="${lg.id}" />
        `;

        const cb = item.querySelector('input') as HTMLInputElement;
        cb.addEventListener('change', (e) => {
          const chk = (e.target as HTMLInputElement).checked;
          if (chk) {
            if (!state.activeLeagues.includes(lg.id)) state.activeLeagues.push(lg.id);
          } else {
            state.activeLeagues = state.activeLeagues.filter(id => id !== lg.id);
          }
          logAdminAction('LEAGUE_TOGGLE', `Liga ${lg.name} (${lg.id})`, chk ? 'Inactiva' : 'Activa', chk ? 'Activa' : 'Inactiva');
          updateLeagueModalToggles();
          renderDashboard();
        });

        leaguesContainer.appendChild(item);
      });
    }

    // 3. Render Audit Logs Table
    const tbodyAudit = document.getElementById('adm-audit-logs-table-body');
    if (tbodyAudit) {
      tbodyAudit.innerHTML = '';
      const logs = loadAdminAuditLogs();
      if (logs.length === 0) {
        tbodyAudit.innerHTML = '<tr><td colspan="7" style="text-align:center; color:#94a3b8;">No se han registrado modificaciones aún.</td></tr>';
      } else {
        logs.forEach(l => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td style="font-weight:700; color:#facc15; font-size:0.72rem;">${l.id}</td>
            <td style="font-size:0.7rem; color:#94a3b8;">${l.timestamp.slice(0, 19).replace('T', ' ')}</td>
            <td style="font-weight:700; color:#38bdf8;">${l.adminId}</td>
            <td><span class="badge-status" style="font-size:0.68rem;">${l.actionType}</span></td>
            <td style="font-weight:600;">${l.targetEntity}</td>
            <td style="font-size:0.72rem; color:#94a3b8;">${l.previousValue}</td>
            <td style="font-size:0.72rem; color:#4ade80; font-weight:700;">${l.newValue}</td>
          `;
          tbodyAudit.appendChild(row);
        });
      }
    }

    // 4. Fill Config Form Inputs
    const params = loadAdminParameters();
    const inpScore = document.getElementById('adm-cfg-score') as HTMLInputElement;
    const inpTier = document.getElementById('adm-cfg-tier') as HTMLSelectElement;
    const inpSample = document.getElementById('adm-cfg-sample') as HTMLInputElement;
    const inpTrial = document.getElementById('adm-cfg-trial-days') as HTMLInputElement;
    const inpFree = document.getElementById('adm-cfg-tg-free') as HTMLInputElement;
    const inpPro = document.getElementById('adm-cfg-tg-pro') as HTMLInputElement;
    const inpVip = document.getElementById('adm-cfg-tg-vip') as HTMLInputElement;

    if (inpScore) inpScore.value = String(params.minimumSignalScore);
    if (inpTier) inpTier.value = params.minimumSignalTier;
    if (inpSample) inpSample.value = String(params.minimumSampleSize);
    if (inpTrial) inpTrial.value = String(params.trialDurationDays);
    if (inpFree) inpFree.value = params.telegramTemplates.freeTemplate;
    if (inpPro) inpPro.value = params.telegramTemplates.proTemplate;
    if (inpVip) inpVip.value = params.telegramTemplates.vipTemplate;

    // 5. Signals Summary Section
    const sigSummary = document.getElementById('adm-signals-summary');
    if (sigSummary) {
      sigSummary.innerHTML = `
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap:0.6rem; text-align:center;">
          <div style="background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:4px;">
            <span style="font-size:0.7rem; color:#94a3b8; display:block;">SEÑALES EN LEDGER</span>
            <strong style="color:#fff; font-size:1.1rem;">${overview.totalSignalsLedger}</strong>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:4px;">
            <span style="font-size:0.7rem; color:#94a3b8; display:block;">LIGAS ACTIVAS</span>
            <strong style="color:#4ade80; font-size:1.1rem;">${state.activeLeagues.length} / 45</strong>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:0.5rem; border-radius:4px;">
            <span style="font-size:0.7rem; color:#94a3b8; display:block;">MERCADOS OPERATIVOS</span>
            <strong style="color:#38bdf8; font-size:1.1rem;">5 Mercados</strong>
          </div>
        </div>
      `;
    }

    // 6. Markets List
    const marketsContainer = document.getElementById('adm-markets-list');
    if (marketsContainer) {
      marketsContainer.innerHTML = `
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fff; font-size:0.82rem;">1. Sin Empate FT</strong><br/>
          <span style="font-size:0.7rem; color:#4ade80;">🟢 Activo • Cuotas 3.10-3.60</span>
        </div>
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fff; font-size:0.82rem;">2. Más de 3.5 Goles</strong><br/>
          <span style="font-size:0.7rem; color:#4ade80;">🟢 Activo • Cuotas 2.60-3.40</span>
        </div>
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fff; font-size:0.82rem;">3. Empate al Descanso (HT)</strong><br/>
          <span style="font-size:0.7rem; color:#4ade80;">🟢 Activo • Cuotas 2.00-2.40</span>
        </div>
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fff; font-size:0.82rem;">4. Ambos Marcan + >2.5</strong><br/>
          <span style="font-size:0.7rem; color:#4ade80;">🟢 Activo • Cuotas 2.10-2.60</span>
        </div>
        <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:4px; border:1px solid rgba(255,255,255,0.06);">
          <strong style="color:#fff; font-size:0.82rem;">5. Ambos Marcan (1T)</strong><br/>
          <span style="font-size:0.7rem; color:#4ade80;">🟢 Activo • Cuotas 4.00-5.50</span>
        </div>
      `;
    }
  };

  // Open modal
  adminBtn.addEventListener('click', () => {
    renderAdminUI();
    adminModal.showModal();
  });

  if (closeAdminModal) closeAdminModal.addEventListener('click', () => adminModal.close());
  adminModal.addEventListener('click', (e) => {
    if (e.target === adminModal) adminModal.close();
  });

  // Tab switching inside Admin Modal
  const tabBtns = adminModal.querySelectorAll('[data-admin-tab]');
  const tabContents = adminModal.querySelectorAll('.admin-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => (c as HTMLElement).style.display = 'none');

      const targetBtn = e.currentTarget as HTMLButtonElement;
      targetBtn.classList.add('active');
      const targetId = targetBtn.dataset.adminTab;
      const targetContent = document.getElementById(targetId || '');
      if (targetContent) targetContent.style.display = 'block';

      renderAdminUI();
    });
  });

  // Config Form Submit listener
  const formConfig = document.getElementById('adm-config-form') as HTMLFormElement;
  if (formConfig) {
    formConfig.addEventListener('submit', (e) => {
      e.preventDefault();
      const inpScore = document.getElementById('adm-cfg-score') as HTMLInputElement;
      const inpTier = document.getElementById('adm-cfg-tier') as HTMLSelectElement;
      const inpSample = document.getElementById('adm-cfg-sample') as HTMLInputElement;
      const inpTrial = document.getElementById('adm-cfg-trial-days') as HTMLInputElement;
      const inpFree = document.getElementById('adm-cfg-tg-free') as HTMLInputElement;
      const inpPro = document.getElementById('adm-cfg-tg-pro') as HTMLInputElement;
      const inpVip = document.getElementById('adm-cfg-tg-vip') as HTMLInputElement;

      saveAdminParameters({
        minimumSignalScore: parseInt(inpScore.value, 10) || 60,
        minimumSignalTier: inpTier.value as any,
        minimumSampleSize: parseInt(inpSample.value, 10) || 30,
        trialDurationDays: parseInt(inpTrial.value, 10) || 3,
        telegramTemplates: {
          freeTemplate: inpFree.value,
          proTemplate: inpPro.value,
          vipTemplate: inpVip.value
        }
      });

      alert('✅ Parámetros del sistema actualizados con éxito y registrados en el Audit Log.');
      renderAdminUI();
    });
  }
}

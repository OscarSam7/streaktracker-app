export type OperationStatus = 'Ganada' | 'Perdida' | 'Pendiente' | 'Cancelada' | 'Reembolsada';

export interface CurrencyConfig {
  code: string;
  symbol: string;
  name: string;
  flag: string;
  decimals: number;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', symbol: '$', name: 'Dólar Estadounidense (USD)', flag: '🇺🇸', decimals: 2 },
  { code: 'EUR', symbol: '€', name: 'Euro (EUR)', flag: '🇪🇺', decimals: 2 },
  { code: 'BRL', symbol: 'R$', name: 'Real Brasileño (BRL)', flag: '🇧🇷', decimals: 2 },
  { code: 'PYG', symbol: '₲', name: 'Guaraní Paraguayo (PYG)', flag: '🇵🇾', decimals: 0 },
  { code: 'ARS', symbol: '$', name: 'Peso Argentino (ARS)', flag: '🇦🇷', decimals: 0 },
  { code: 'MXN', symbol: '$', name: 'Peso Mexicano (MXN)', flag: '🇲🇽', decimals: 2 },
  { code: 'COP', symbol: '$', name: 'Peso Colombiano (COP)', flag: '🇨🇴', decimals: 0 },
  { code: 'CLP', symbol: '$', name: 'Peso Chileno (CLP)', flag: '🇨🇱', decimals: 0 },
  { code: 'PEN', symbol: 'S/.', name: 'Sol Peruano (PEN)', flag: '🇵🇪', decimals: 2 },
  { code: 'GBP', symbol: '£', name: 'Libra Esterlina (GBP)', flag: '🇬🇧', decimals: 2 },
  { code: 'UYU', symbol: '$U', name: 'Peso Uruguayo (UYU)', flag: '🇺🇾', decimals: 0 }
];

export interface BankrollOperation {
  id: string;
  date: string;
  time: string;
  category: string;
  description: string;
  operationType: string;
  market: string;
  status: OperationStatus;
  capitalBefore: number;
  stake: number;
  stakePct: number;
  odds: number;
  potentialReturn: number;
  potentialProfit: number;
  pnl: number;
  capitalAfter: number;
  roi: number;
  riskPct: number;
  cumulativePnl: number;
  discipline: '🟢 DENTRO LÍMITE' | '🟡 PRECAUCIÓN' | '🔴 EXCESO RIESGO';
  notes: string;
}

export interface BankrollConfig {
  currencyCode: string;
  initialCapital: number;
  securityCapital: number;
  maxStakePct: number;
  recommendedStakePct: number;
  maxExposurePct: number;
  dailyLossLimit: number;
  weeklyLossLimit: number;
  monthlyLossLimit: number;
  monthlyGrowthTarget: number;
}

export interface BankrollKPIs {
  initialCapital: number;
  currentCapital: number;
  totalPnl: number;
  totalProfit: number;
  totalLoss: number;
  roi: number;
  yieldPct: number;
  totalOps: number;
  wonOps: number;
  lostOps: number;
  pendingOps: number;
  winrate: number;
  avgOdds: number;
  avgStake: number;
  maxWin: number;
  maxLoss: number;
  committedCapital: number;
  availableCapital: number;
  exposurePct: number;
  maxDrawdownPct: number;
  profitFactor: number;
  ev: number;
  disciplineRate: number;
  excessRiskOps: number;
}

const STORAGE_KEY_OPERATIONS = 'football_streaks_bankroll_ops_v1';
const STORAGE_KEY_CONFIG = 'football_streaks_bankroll_cfg_v2_multicurrency';

export const DEFAULT_CONFIG: BankrollConfig = {
  currencyCode: 'USD',
  initialCapital: 1000,
  securityCapital: 700,
  maxStakePct: 0.05,
  recommendedStakePct: 0.02,
  maxExposurePct: 0.15,
  dailyLossLimit: -50,
  weeklyLossLimit: -150,
  monthlyLossLimit: -300,
  monthlyGrowthTarget: 0.15
};

export const INITIAL_SAMPLE_OPERATIONS: Array<Omit<BankrollOperation, 'capitalBefore' | 'stakePct' | 'potentialReturn' | 'potentialProfit' | 'pnl' | 'capitalAfter' | 'roi' | 'riskPct' | 'cumulativePnl' | 'discipline'>> = [
  { id: 'OP-001', date: '2026-08-01', time: '15:30', category: 'Fútbol', description: 'Real Madrid vs Sevilla', operationType: 'Pre-partido', market: 'Sin Empate (FT)', status: 'Ganada', stake: 20, odds: 1.85, notes: 'Operación según racha madura' },
  { id: 'OP-002', date: '2026-08-02', time: '18:00', category: 'Fútbol', description: 'Inter vs Monza', operationType: 'Pre-partido', market: 'Sin Empate (HT)', status: 'Ganada', stake: 20, odds: 2.10, notes: 'Señal en Serie A' },
  { id: 'OP-003', date: '2026-08-03', time: '20:45', category: 'Fútbol', description: 'Sporting CP vs Braga', operationType: 'En vivo (Live)', market: 'Menos de 3.5 Goles', status: 'Perdida', stake: 20, odds: 1.90, notes: 'Riesgo controlado al 2%' },
  { id: 'OP-004', date: '2026-08-04', time: '19:00', category: 'Fútbol', description: 'Flamengo vs Palmeiras', operationType: 'Pre-partido', market: 'Sin Empate (FT)', status: 'Ganada', stake: 20, odds: 2.05, notes: 'Sin martingala' },
  { id: 'OP-005', date: '2026-08-05', time: '17:15', category: 'Fútbol', description: 'Arsenal vs Chelsea', operationType: 'Pre-partido', market: 'Sin BTTS + >2.5', status: 'Ganada', stake: 25, odds: 2.20, notes: 'Stake moderado 2.5%' },
  { id: 'OP-006', date: '2026-08-06', time: '21:00', category: 'Fútbol', description: 'Boca Juniors vs River Plate', operationType: 'Pre-partido', market: 'Sin Empate (FT)', status: 'Perdida', stake: 20, odds: 1.95, notes: 'Límite diario respetado' },
  { id: 'OP-007', date: '2026-08-07', time: '16:00', category: 'Fútbol', description: 'Bayern vs Dortmund', operationType: 'En vivo (Live)', market: 'Menos de 3.5 Goles', status: 'Ganada', stake: 20, odds: 1.80, notes: 'Ejecución disciplinada' },
  { id: 'OP-008', date: '2026-08-08', time: '18:30', category: 'Fútbol', description: 'PSG vs Marseille', operationType: 'Pre-partido', market: 'Sin BTTS 1er Tiempo', status: 'Ganada', stake: 20, odds: 2.15, notes: 'Señal de oportunidad verde' },
  { id: 'OP-009', date: '2026-08-09', time: '20:00', category: 'Fútbol', description: 'Juventus vs Roma', operationType: 'Pre-partido', market: 'Sin Empate (FT)', status: 'Pendiente', stake: 20, odds: 1.90, notes: 'Operación en curso' }
];

export function getCurrencyConfig(code: string = 'USD'): CurrencyConfig {
  return SUPPORTED_CURRENCIES.find(c => c.code === code) || SUPPORTED_CURRENCIES[0];
}

export function formatCurrency(amount: number, currencyCode: string = 'USD', showSign: boolean = false): string {
  const cfg = getCurrencyConfig(currencyCode);
  const isNeg = amount < 0;
  const absVal = Math.abs(amount);
  const formattedNum = absVal.toLocaleString('en-US', {
    minimumFractionDigits: cfg.decimals,
    maximumFractionDigits: cfg.decimals
  });

  const signStr = showSign ? (amount > 0 ? '+' : isNeg ? '-' : '') : (isNeg ? '-' : '');
  
  if (cfg.code === 'PYG' || cfg.code === 'BRL' || cfg.code === 'PEN' || cfg.code === 'UYU') {
    return `${signStr}${cfg.symbol} ${formattedNum}`;
  }
  return `${signStr}${cfg.symbol}${formattedNum}`;
}

export function loadBankrollConfig(): BankrollConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    return saved ? { ...DEFAULT_CONFIG, ...JSON.parse(saved) } : { ...DEFAULT_CONFIG };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export function saveBankrollConfig(cfg: BankrollConfig) {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(cfg));
}

export function loadRawOperations(): any[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_OPERATIONS);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return INITIAL_SAMPLE_OPERATIONS;
  } catch {
    return INITIAL_SAMPLE_OPERATIONS;
  }
}

export function saveRawOperations(ops: any[]) {
  localStorage.setItem(STORAGE_KEY_OPERATIONS, JSON.stringify(ops));
}

export function calculateProcessedOperations(rawOps: any[], config: BankrollConfig): BankrollOperation[] {
  let currentRunningCap = config.initialCapital;
  let runningPnl = 0;

  return rawOps.map((op, idx) => {
    const capBefore = currentRunningCap;
    const stake = Number(op.stake) || 0;
    const odds = Number(op.odds) || 1.0;
    const stakePct = capBefore > 0 ? stake / capBefore : 0;
    const potReturn = stake * odds;
    const potProfit = potReturn - stake;

    let realPnl = 0;
    if (op.status === 'Ganada') {
      realPnl = potProfit;
    } else if (op.status === 'Perdida') {
      realPnl = -stake;
    } else {
      realPnl = 0; // Pendiente, Cancelada, Reembolsada
    }

    const capAfter = op.status === 'Pendiente' ? capBefore : capBefore + realPnl;
    if (op.status !== 'Pendiente') {
      currentRunningCap = capAfter;
      runningPnl += realPnl;
    }

    const roi = stake > 0 ? realPnl / stake : 0;

    let discipline: '🟢 DENTRO LÍMITE' | '🟡 PRECAUCIÓN' | '🔴 EXCESO RIESGO' = '🟢 DENTRO LÍMITE';
    if (stakePct > config.maxStakePct) {
      discipline = '🔴 EXCESO RIESGO';
    } else if (stakePct > config.recommendedStakePct) {
      discipline = '🟡 PRECAUCIÓN';
    }

    return {
      id: op.id || `OP-${String(idx + 1).padStart(3, '0')}`,
      date: op.date || new Date().toISOString().split('T')[0],
      time: op.time || '18:00',
      category: op.category || 'Fútbol',
      description: op.description || 'Operación de racha',
      operationType: op.operationType || 'Pre-partido',
      market: op.market || 'Empate (FT)',
      status: op.status || 'Pendiente',
      capitalBefore: capBefore,
      stake: stake,
      stakePct: stakePct,
      odds: odds,
      potentialReturn: potReturn,
      potentialProfit: potProfit,
      pnl: realPnl,
      capitalAfter: capAfter,
      roi: roi,
      riskPct: stakePct,
      cumulativePnl: runningPnl,
      discipline: discipline,
      notes: op.notes || ''
    };
  });
}

export function computeBankrollKPIs(processedOps: BankrollOperation[], config: BankrollConfig): BankrollKPIs {
  const initialCapital = config.initialCapital;
  let totalProfit = 0;
  let totalLoss = 0;
  let totalStaked = 0;
  let wonOps = 0;
  let lostOps = 0;
  let pendingOps = 0;
  let properDisciplineOps = 0;
  let excessRiskOps = 0;
  let sumOdds = 0;
  let maxWin = 0;
  let maxLoss = 0;

  let peakCap = initialCapital;
  let maxDrawdownPct = 0;
  let runningCap = initialCapital;
  let committedCapital = 0;

  processedOps.forEach(op => {
    totalStaked += op.stake;
    sumOdds += op.odds;

    if (op.discipline === '🟢 DENTRO LÍMITE') {
      properDisciplineOps++;
    } else if (op.discipline === '🔴 EXCESO RIESGO') {
      excessRiskOps++;
    }

    if (op.status === 'Ganada') {
      wonOps++;
      totalProfit += op.pnl;
      if (op.pnl > maxWin) maxWin = op.pnl;
      runningCap += op.pnl;
    } else if (op.status === 'Perdida') {
      lostOps++;
      totalLoss += op.pnl;
      if (Math.abs(op.pnl) > maxLoss) maxLoss = Math.abs(op.pnl);
      runningCap += op.pnl;
    } else if (op.status === 'Pendiente') {
      pendingOps++;
      committedCapital += op.stake;
    }

    if (runningCap > peakCap) {
      peakCap = runningCap;
    }
    const currentDd = peakCap > 0 ? (peakCap - runningCap) / peakCap : 0;
    if (currentDd > maxDrawdownPct) {
      maxDrawdownPct = currentDd;
    }
  });

  const totalOps = processedOps.length;
  const currentCapital = initialCapital + totalProfit + totalLoss;
  const totalPnl = totalProfit + totalLoss;
  const roi = totalStaked > 0 ? totalPnl / totalStaked : 0;
  const yieldPct = initialCapital > 0 ? totalPnl / initialCapital : 0;
  const winrate = (wonOps + lostOps) > 0 ? wonOps / (wonOps + lostOps) : 0;
  const lossrate = 1 - winrate;
  const avgOdds = totalOps > 0 ? sumOdds / totalOps : 0;
  const avgStake = totalOps > 0 ? totalStaked / totalOps : 0;

  const avgWin = wonOps > 0 ? totalProfit / wonOps : 0;
  const avgLoss = lostOps > 0 ? Math.abs(totalLoss) / lostOps : 0;
  const profitFactor = Math.abs(totalLoss) > 0 ? totalProfit / Math.abs(totalLoss) : totalProfit;
  const ev = (winrate * avgWin) - (lossrate * avgLoss);

  const availableCapital = Math.max(0, currentCapital - committedCapital);
  const exposurePct = currentCapital > 0 ? committedCapital / currentCapital : 0;
  const disciplineRate = totalOps > 0 ? properDisciplineOps / totalOps : 1.0;

  return {
    initialCapital,
    currentCapital,
    totalPnl,
    totalProfit,
    totalLoss,
    roi,
    yieldPct,
    totalOps,
    wonOps,
    lostOps,
    pendingOps,
    winrate,
    avgOdds,
    avgStake,
    maxWin,
    maxLoss,
    committedCapital,
    availableCapital,
    exposurePct,
    maxDrawdownPct,
    profitFactor,
    ev,
    disciplineRate,
    excessRiskOps
  };
}

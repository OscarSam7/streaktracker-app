export type OperationStatus = 'Ganada' | 'Perdida' | 'Pendiente' | 'Cancelada' | 'Reembolsada' | 'Nula';
export type CapitalMovementType = 'INYECCION' | 'EXTRACCION' | 'GASTO';

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
  is_locked: boolean;
  locked_at: string | null;
}

export interface CapitalMovement {
  id: string;
  date: string;
  time: string;
  type: CapitalMovementType;
  category: string;
  description: string;
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  notes?: string;
  created_at: string;
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
  totalInjections: number;
  totalWithdrawals: number;
  totalExpenses: number;
  netCashflow: number;
  tradingPnl: number;
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
const STORAGE_KEY_MOVEMENTS = 'football_streaks_capital_movements_v1';

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
  { id: 'OP-001', date: '2026-08-01', time: '15:30', category: 'Fútbol Cuantitativo', description: 'Real Madrid vs Sevilla', operationType: 'Pre-partido', market: 'Empate (FT)', status: 'Ganada', stake: 20, odds: 3.20, notes: 'Operación por racha Sin Empate (FT)', is_locked: true, locked_at: '2026-08-01T17:30:00.000Z' },
  { id: 'OP-002', date: '2026-08-02', time: '18:00', category: 'Fútbol Cuantitativo', description: 'Inter vs Monza', operationType: 'Pre-partido', market: 'Empate (HT)', status: 'Ganada', stake: 20, odds: 2.10, notes: 'Operación por racha Sin Empate (HT)', is_locked: true, locked_at: '2026-08-02T19:00:00.000Z' },
  { id: 'OP-003', date: '2026-08-03', time: '20:45', category: 'Fútbol Cuantitativo', description: 'Sporting CP vs Braga', operationType: 'En vivo (Live)', market: 'Más de 3.5 goles', status: 'Perdida', stake: 20, odds: 2.80, notes: 'Operación por racha Menos de 3.5 goles', is_locked: true, locked_at: '2026-08-03T22:45:00.000Z' },
  { id: 'OP-004', date: '2026-08-04', time: '19:00', category: 'Fútbol Cuantitativo', description: 'Flamengo vs Palmeiras', operationType: 'Pre-partido', market: 'Empate (FT)', status: 'Ganada', stake: 20, odds: 3.10, notes: 'Operación por racha Sin Empate (FT)', is_locked: true, locked_at: '2026-08-04T21:00:00.000Z' },
  { id: 'OP-005', date: '2026-08-05', time: '17:15', category: 'Fútbol Cuantitativo', description: 'Arsenal vs Chelsea', operationType: 'Pre-partido', market: 'Ambos Marcan + >2.5', status: 'Ganada', stake: 25, odds: 2.20, notes: 'Operación por racha Sin BTTS + >2.5', is_locked: true, locked_at: '2026-08-05T19:15:00.000Z' },
  { id: 'OP-006', date: '2026-08-06', time: '21:00', category: 'Fútbol Cuantitativo', description: 'Boca Juniors vs River Plate', operationType: 'Pre-partido', market: 'Empate (FT)', status: 'Perdida', stake: 20, odds: 3.00, notes: 'Operación por racha Sin Empate (FT)', is_locked: true, locked_at: '2026-08-06T23:00:00.000Z' },
  { id: 'OP-007', date: '2026-08-07', time: '16:00', category: 'Fútbol Cuantitativo', description: 'Bayern vs Dortmund', operationType: 'En vivo (Live)', market: 'Más de 3.5 goles', status: 'Ganada', stake: 20, odds: 2.65, notes: 'Operación por racha Menos de 3.5 goles', is_locked: true, locked_at: '2026-08-07T18:00:00.000Z' },
  { id: 'OP-008', date: '2026-08-08', time: '18:30', category: 'Fútbol Cuantitativo', description: 'PSG vs Marseille', operationType: 'Pre-partido', market: 'Ambos Marcan (HT)', status: 'Ganada', stake: 20, odds: 4.20, notes: 'Operación por racha Sin BTTS (1er Tiempo)', is_locked: true, locked_at: '2026-08-08T19:30:00.000Z' },
  { id: 'OP-009', date: '2026-08-09', time: '20:00', category: 'Fútbol Cuantitativo', description: 'Juventus vs Roma', operationType: 'Pre-partido', market: 'Empate (FT)', status: 'Pendiente', stake: 20, odds: 3.25, notes: 'Operación en curso', is_locked: false, locked_at: null }
];

export const INITIAL_SAMPLE_MOVEMENTS: CapitalMovement[] = [
  {
    id: 'MOV-001',
    date: '2026-08-01',
    time: '09:00',
    type: 'INYECCION',
    category: 'Depósito Inicial de Capital',
    description: 'Aporte de fondos para banca operativa',
    amount: 500,
    balanceBefore: 1000,
    balanceAfter: 1500,
    notes: 'Inyección inicial de fondos',
    created_at: '2026-08-01T09:00:00.000Z'
  },
  {
    id: 'MOV-002',
    date: '2026-08-04',
    time: '14:30',
    type: 'GASTO',
    category: 'Pago Plan VIP / Suscripción',
    description: 'Suscripción mensual a plataforma StreakTracker',
    amount: 39,
    balanceBefore: 1500,
    balanceAfter: 1461,
    notes: 'Costo de herramientas de análisis',
    created_at: '2026-08-04T14:30:00.000Z'
  },
  {
    id: 'MOV-003',
    date: '2026-08-08',
    time: '12:00',
    type: 'EXTRACCION',
    category: 'Retiro de Ganancias',
    description: 'Retiro a cuenta bancaria / Billetera',
    amount: 100,
    balanceBefore: 1461,
    balanceAfter: 1361,
    notes: 'Cosecha de beneficios acumulados',
    created_at: '2026-08-08T12:00:00.000Z'
  }
];

export function getCurrencyConfig(code: string = 'USD'): CurrencyConfig {
  return SUPPORTED_CURRENCIES.find(c => c.code === code) || SUPPORTED_CURRENCIES[0];
}

export function formatCurrency(amount: number, currencyCode: string = 'USD', showSign: boolean = false): string {
  const cfg = getCurrencyConfig(currencyCode);
  const isNeg = amount < 0;
  const absVal = Math.abs(amount);

  let formattedNum: string;
  if (cfg.decimals === 0) {
    // Guaraní (PYG) y monedas de 0 decimales: números enteros con punto (.) como separador de miles
    const rounded = Math.round(absVal);
    formattedNum = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } else {
    // Monedas con 2 decimales (USD, EUR, BRL, etc.)
    const parts = absVal.toFixed(cfg.decimals).split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    formattedNum = parts.join('.');
  }

  const signStr = showSign ? (amount > 0 ? '+' : isNeg ? '-' : '') : (isNeg ? '-' : '');
  
  if (cfg.code === 'PYG') {
    return `${signStr}${formattedNum} ₲`;
  }
  if (cfg.code === 'BRL' || cfg.code === 'PEN' || cfg.code === 'UYU') {
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

export function loadCapitalMovements(): CapitalMovement[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_MOVEMENTS);
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return INITIAL_SAMPLE_MOVEMENTS;
  } catch {
    return INITIAL_SAMPLE_MOVEMENTS;
  }
}

export function saveCapitalMovements(movements: CapitalMovement[]) {
  localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(movements));
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
      realPnl = 0; // Pendiente, Nula, Cancelada, Reembolsada
    }

    const isResolved = op.status === 'Ganada' || op.status === 'Perdida' || op.status === 'Nula' || op.status === 'Cancelada' || op.status === 'Reembolsada';
    const isLocked = op.is_locked !== undefined ? Boolean(op.is_locked) : isResolved;
    const lockedAt = isLocked ? (op.locked_at || new Date().toISOString()) : null;

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
      notes: op.notes || '',
      is_locked: isLocked,
      locked_at: lockedAt
    };
  });
}

export function computeBankrollKPIs(
  processedOps: BankrollOperation[],
  config: BankrollConfig,
  movements: CapitalMovement[] = []
): BankrollKPIs {
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

  // Compute Capital Movements totals
  let totalInjections = 0;
  let totalWithdrawals = 0;
  let totalExpenses = 0;

  movements.forEach(m => {
    const amt = Math.abs(Number(m.amount) || 0);
    if (m.type === 'INYECCION') {
      totalInjections += amt;
    } else if (m.type === 'EXTRACCION') {
      totalWithdrawals += amt;
    } else if (m.type === 'GASTO') {
      totalExpenses += amt;
    }
  });

  const netCashflow = totalInjections - totalWithdrawals - totalExpenses;
  let peakCap = initialCapital + totalInjections;
  let maxDrawdownPct = 0;
  let runningCap = initialCapital + netCashflow;
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
  const tradingPnl = totalProfit + totalLoss;
  const currentCapital = initialCapital + totalInjections - totalWithdrawals - totalExpenses + tradingPnl;
  const totalPnl = tradingPnl;
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
    totalInjections,
    totalWithdrawals,
    totalExpenses,
    netCashflow,
    tradingPnl,
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

// ---------------------------------------------------------
// MARTINGALA ACOTADA CON STOP-LOSS ESTRICTO (3-4 PASOS)
// ---------------------------------------------------------

export interface BoundedMartingaleParams {
  bankroll_actual: number;
  racha_perdidas_consecutivas: number;
  max_pasos?: number; // por defecto = 4
  max_stake_permitido_pct?: number; // por defecto = 5.0 (%)
}

export interface BoundedMartingaleResult {
  stake_recomendado: number;
  porcentaje_del_bankroll: number;
  paso_actual: number;
  alerta_stop_loss: boolean;
  stake_base: number;
  max_stake_permitido: number;
  riesgo_acumulado_ciclo: number;
  riesgo_acumulado_ciclo_pct: number;
  multiplicador: number;
  max_pasos_configurados: number;
  mensaje_estado: string;
}

export interface MartingaleSimulationStep {
  operacion: number;
  racha_perdidas_consecutivas: number;
  paso_actual: number;
  stake_recomendado: number;
  porcentaje_del_bankroll: number;
  alerta_stop_loss: boolean;
  pnl_simulado: number;
  capital_restante: number;
  riesgo_acumulado_ciclo: number;
  estado: string;
}

/**
 * Dimensiona el tamaño de la posición utilizando Martingala Acotada con Stop-Loss Estricto.
 * Garantiza matemáticamente que el intento final nunca supere el max_stake_permitido_pct
 * y dispara un evento de Stop-Loss obligatorio cortando la secuencia al alcanzar max_pasos.
 */
export function calcularMartingalaAcotada(params: BoundedMartingaleParams): BoundedMartingaleResult {
  // 1. Validaciones defensivas contra valores nulos, negativos o cero
  const bankroll = Math.max(0, Number(params.bankroll_actual) || 0);
  const maxPasos = Math.max(1, Math.floor(Number(params.max_pasos) || 4));
  const maxPct = Math.max(0.01, Number(params.max_stake_permitido_pct) || 5.0);
  const rachaPerdidas = Math.max(0, Math.floor(Number(params.racha_perdidas_consecutivas) || 0));

  if (bankroll <= 0) {
    return {
      stake_recomendado: 0,
      porcentaje_del_bankroll: 0,
      paso_actual: 1,
      alerta_stop_loss: false,
      stake_base: 0,
      max_stake_permitido: 0,
      riesgo_acumulado_ciclo: 0,
      riesgo_acumulado_ciclo_pct: 0,
      multiplicador: 1,
      max_pasos_configurados: maxPasos,
      mensaje_estado: 'Bankroll insuficiente para operar.'
    };
  }

  // 2. Cálculo dinámico de Stake Base Anti-Ruina
  // Fórmula: stake_base = (bankroll_actual * (max_stake_permitido_pct / 100)) / (2^(max_pasos - 1))
  const maxStakePermitido = bankroll * (maxPct / 100);
  const divisorBase = Math.pow(2, maxPasos - 1);
  const stakeBase = maxStakePermitido / (divisorBase > 0 ? divisorBase : 1);

  let stakeCalculado = stakeBase;
  let pasoActual = 1;
  let alertaStopLoss = false;
  let multiplicador = 1;
  let mensaje = 'Operación inicial del ciclo (Paso 1).';

  // 3. Lógica del algoritmo
  if (rachaPerdidas === 0) {
    pasoActual = 1;
    multiplicador = 1;
    stakeCalculado = stakeBase;
    alertaStopLoss = false;
    mensaje = `Paso 1/${maxPasos}: Stake base inicial (${((stakeBase / bankroll) * 100).toFixed(3)}% del bankroll).`;
  } else if (rachaPerdidas < maxPasos) {
    pasoActual = rachaPerdidas + 1;
    multiplicador = Math.pow(2, rachaPerdidas);
    stakeCalculado = stakeBase * multiplicador;
    alertaStopLoss = false;
    mensaje = `Paso ${pasoActual}/${maxPasos}: Progresión acotada (x${multiplicador}). Límite de seguridad activo.`;
  } else {
    // racha_perdidas_consecutivas >= max_pasos: DISPARO DE STOP-LOSS / RESET
    alertaStopLoss = true;
    pasoActual = 1; // Se asume la pérdida y se reinicia el contador
    multiplicador = 1;
    stakeCalculado = stakeBase;
    mensaje = `🛑 STOP-LOSS ACTIVADO: Límite de ${maxPasos} pasos fallidos alcanzado. Se corta la secuencia, se asume la pérdida controlada y se reinicia al stake base sin duplicar.`;
  }

  // 4. Clamping de seguridad absoluto (defensa estricta ante errores de punto flotante)
  if (stakeCalculado > maxStakePermitido) {
    stakeCalculado = maxStakePermitido;
  }

  // 5. Cálculo de riesgo acumulado del ciclo actual
  const pasoEfectivo = alertaStopLoss ? maxPasos : pasoActual;
  const riesgoAcumulado = stakeBase * (Math.pow(2, pasoEfectivo) - 1);
  const riesgoAcumuladoPct = bankroll > 0 ? (riesgoAcumulado / bankroll) * 100 : 0;
  const porcentajeBankroll = bankroll > 0 ? Number(((stakeCalculado / bankroll) * 100).toFixed(4)) : 0;
  const stakeRecomendado = Number(stakeCalculado.toFixed(2));

  return {
    stake_recomendado: stakeRecomendado,
    porcentaje_del_bankroll: porcentajeBankroll,
    paso_actual: pasoActual,
    alerta_stop_loss: alertaStopLoss,
    stake_base: Number(stakeBase.toFixed(2)),
    max_stake_permitido: Number(maxStakePermitido.toFixed(2)),
    riesgo_acumulado_ciclo: Number(riesgoAcumulado.toFixed(2)),
    riesgo_acumulado_ciclo_pct: Number(riesgoAcumuladoPct.toFixed(2)),
    multiplicador: multiplicador,
    max_pasos_configurados: maxPasos,
    mensaje_estado: mensaje
  };
}

/**
 * Simula una secuencia de N operaciones consecutivas con pérdidas para verificar
 * de forma auditable que al alcanzar max_pasos se corte la duplicación y se dispare el Stop-Loss.
 */
export function simulateMartingaleSequence(
  bankrollInicial: number = 1000,
  maxPasos: number = 4,
  maxPct: number = 5.0,
  numOps: number = 5
): MartingaleSimulationStep[] {
  const steps: MartingaleSimulationStep[] = [];
  let currentBankroll = bankrollInicial;
  let rachaPerdidas = 0;

  for (let i = 1; i <= numOps; i++) {
    const res = calcularMartingalaAcotada({
      bankroll_actual: currentBankroll,
      racha_perdidas_consecutivas: rachaPerdidas,
      max_pasos: maxPasos,
      max_stake_permitido_pct: maxPct
    });

    const stake = res.stake_recomendado;
    const pnl = -stake;
    currentBankroll += pnl;

    steps.push({
      operacion: i,
      racha_perdidas_consecutivas: rachaPerdidas,
      paso_actual: res.paso_actual,
      stake_recomendado: res.stake_recomendado,
      porcentaje_del_bankroll: res.porcentaje_del_bankroll,
      alerta_stop_loss: res.alerta_stop_loss,
      pnl_simulado: pnl,
      capital_restante: Number(currentBankroll.toFixed(2)),
      riesgo_acumulado_ciclo: res.riesgo_acumulado_ciclo,
      estado: res.alerta_stop_loss
        ? `🛑 STOP-LOSS ACTIVADO (Corte de Secuencia & Reset)`
        : `Paso ${res.paso_actual}/${maxPasos} (Pérdida -$${stake.toFixed(2)})`
    });

    if (res.alerta_stop_loss) {
      rachaPerdidas = 1; // Reinició ciclo y falló el nuevo intento
    } else {
      rachaPerdidas++;
    }
  }

  return steps;
}


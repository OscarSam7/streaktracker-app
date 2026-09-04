import { validateLeagueEligibility } from './leagueValidation';
import { computeSignalScore } from './signalEngine';
import type { PlatformPlan } from './authPermissions';

export interface TelegramSignalPayload {
  signalId: string;                   // ID único generado (ej: SIG-ENG39-DRAW-178839)
  timestamp: string;                  // Timestamp ISO
  timestampFormatted: string;         // Fecha/Hora humana
  channel: 'FREE' | 'PRO' | 'VIP';
  leagueName: string;
  country: string;
  flag: string;
  fixtureName: string;
  matchTimeStr: string;
  marketLabel: string;
  currentStreak: number;
  historicalCasesCount: number;
  historicalWinratePct: number;
  historicalRoiPct: number;
  signalScore: number;
  confidenceBadge: string;
  suggestedOdds: number;
  platformUrl: string;
  messageText: string;
}

// Historial en memoria de señales emitidas para evitar duplicados estrictamente
const SENT_SIGNAL_IDS = new Set<string>();

export function generateTelegramSignal(
  leagueId: number,
  marketKey: string,
  marketLabel: string,
  currentStreak: number,
  previousStreak: number,
  fixtureName: string,
  matchTimeStr: string,
  channel: PlatformPlan = 'VIP'
): TelegramSignalPayload | null {
  // 1. Motor de señales & Validación de liga
  const sig = computeSignalScore(leagueId, marketKey, marketLabel, currentStreak, previousStreak, fixtureName);
  const leagueVal = validateLeagueEligibility(leagueId);

  // 2. Generación de ID Único e inmutable
  // Formato: SIG-{LeagueId}-{MarketKey}-{StreakLength}
  const signalId = `SIG-${leagueId}-${marketKey.toUpperCase()}-STK${currentStreak}`;

  // 3. Mecanismo Anti-Duplicados
  if (SENT_SIGNAL_IDS.has(signalId + '-' + channel)) {
    // Señal ya transmitida a este canal
    return null;
  }

  const now = new Date();
  const timeFormatted = now.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }) + ' ' + 
                        now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  const platformUrl = 'https://streaktracker.io/app';

  let messageText = '';

  if (channel === 'FREE') {
    // Canal FREE: Información pública limitada con invitación al análisis completo
    messageText = 
`🚨 [CANAL PÚBLICO FREE] — SEÑAL OBSERVABLE DETECTADA
━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 Se detectó una oportunidad estadística.
🏆 Liga: ${leagueVal.flag} ${leagueVal.country} (Ver en App)
🎯 Mercado: *** (Oculto en Plan FREE)
⚡ Estado: En etapa de maduración
📈 Valor Estadístico: ${sig.signalScore}/100 [${sig.tier}]

🔒 Para desbloquear el mercado exacto, la cuota de valor y la telemetría histórica:
👉 Accede gratis en: ${platformUrl}`;

  } else if (channel === 'PRO') {
    // Canal PRO: Mayor detalle y datos cuantitativos esenciales
    messageText = 
`🔵 [CANAL PRO] — ALERTA CUANTITATIVA CONFIRMADA
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 ${sig.flag} ${sig.leagueName} (${sig.country})
⚽ ${sig.fixtureName}
⏰ Horario: ${matchTimeStr}
🎯 Mercado: ${sig.marketLabel}
🔥 Racha Actual: ${sig.currentStreak} partidos sin ocurrir
⭐ Score de Señal: ${sig.signalScore}/100 [${sig.tier}]
📊 Muestra: ${sig.confidence.factors.sampleSize} casos | Win Rate: ${sig.historicalWinratePct}%
🎯 Cuota Estimada: @${sig.suggestedOdds.toFixed(2)}

👉 Gestiona tu stake en la Calculadora: ${platformUrl}`;

  } else {
    // Canal VIP: Información estadística integral e inmediata
    messageText = 
`🟢 [CANAL VIP INSTITUCIONAL] — OPORTUNIDAD PREMIUM #${signalId}
━━━━━━━━━━━━━━━━━━━━━━━━━━
🏆 Liga: ${sig.flag} ${sig.leagueName} (${sig.country}) • Calidad: ${leagueVal.quality.overallScore} pts
⚽ Partido: ${sig.fixtureName}
⏰ Horario: ${matchTimeStr}
🎯 Mercado Objetivo: ${sig.marketLabel}
🔥 Racha Detectada: ${sig.currentStreak} partidos (Máx. Histórica: ${sig.maxHistoryStreak})

📈 MÉTRICAS CUANTITATIVAS AUDITADAS:
• Casos Históricos Similares: ${sig.confidence.factors.sampleSize} eventos
• Win Rate Histórico en Ruptura: ${sig.historicalWinratePct}%
• Retorno Histórico (ROI): +${sig.confidence.factors.historicalPerformanceRoi}%
• Cuota Estimada de Mercado: @${sig.suggestedOdds.toFixed(2)} (${sig.impliedProbabilityPct}% prob. implícita)
• Score de la Señal: ${sig.signalScore}/100 [${sig.tier}]
• Nivel de Confianza: ${sig.confidence.badgeLabel}
  "${sig.confidence.explanation}"

🆔 ID Señal: ${signalId} | Emisión: ${timeFormatted}
💼 Abrir en Terminal: ${platformUrl}`;
  }

  // Registrar como enviada para evitar duplicaciones
  SENT_SIGNAL_IDS.add(signalId + '-' + channel);

  return {
    signalId,
    timestamp: now.toISOString(),
    timestampFormatted: timeFormatted,
    channel,
    leagueName: sig.leagueName,
    country: sig.country,
    flag: sig.flag,
    fixtureName: sig.fixtureName,
    matchTimeStr,
    marketLabel: sig.marketLabel,
    currentStreak: sig.currentStreak,
    historicalCasesCount: sig.confidence.factors.sampleSize,
    historicalWinratePct: sig.historicalWinratePct,
    historicalRoiPct: sig.confidence.factors.historicalPerformanceRoi,
    signalScore: sig.signalScore,
    confidenceBadge: sig.confidence.badgeLabel,
    suggestedOdds: sig.suggestedOdds,
    platformUrl,
    messageText
  };
}

export function resetSentSignalsCache(): void {
  SENT_SIGNAL_IDS.clear();
}

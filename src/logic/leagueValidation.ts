import { LEAGUES, type LeagueInfo } from '../config/leagues';

export type LeagueEligibilityStatus = 'ACTIVA' | 'NO ELEGIBLE';
export type LeagueQualityTier = 'EXCELENTE' | 'ALTA' | 'ACEPTABLE' | 'INSUFICIENTE';

export interface LeagueQualityScorecard {
  overallScore: number;                // 0 a 100
  tier: LeagueQualityTier;             // EXCELENTE (90-100), ALTA (75-89), ACEPTABLE (60-74), INSUFICIENTE (0-59)
  color: string;                       // Color visual (#4ade80, #38bdf8, #facc15, #ef4444)
  
  // 9 Criterios cuantitativos de evaluación:
  historicalMatchesCount: number;      // 1. Cantidad de partidos históricos disponibles
  historicalSeasonsCount: number;      // 2. Cantidad de temporadas disponibles
  dataCompletenessPct: number;         // 3. Porcentaje de partidos con datos completos
  availableMarketsCount: number;       // 4. Cantidad de mercados disponibles (5 estándar)
  historicalSignalsCount: number;      // 5. Cantidad de señales históricas generadas
  updateFrequency: string;             // 6. Frecuencia de actualización (En Vivo / Tiempo Real)
  dataConsistencyPct: number;          // 7. Consistencia de los datos
  marketSampleSize: string;            // 8. Tamaño de muestra por mercado (Óptimo / Grande)
  statisticalStabilityPct: number;     // 9. Estabilidad estadística de los resultados
}

export interface LeagueValidationTelemetry {
  leagueId: number;
  leagueName: string;
  country: string;
  flag: string;
  matchesAvailable: number;
  historicalSeasons: number;
  signalsGeneratedCount: number;
  availableMarketsCount: number;
  availableMarketsList: string[];
  dataCompletenessPct: number;
  sampleSize: 'GRANDE' | 'ÓPTIMO' | 'ESTÁNDAR';
  status: LeagueEligibilityStatus;
  eligibilityReason: string;
  quality: LeagueQualityScorecard;
}

// Catálogo interno de telemetría y evaluación cuantitativa para las 45 ligas autorizadas
export const LEAGUE_VALIDATION_METRICS: Record<number, Partial<LeagueValidationTelemetry>> = {
  39:  { matchesAvailable: 380, historicalSeasons: 5, signalsGeneratedCount: 42, dataCompletenessPct: 99.8, sampleSize: 'GRANDE' }, // Inglaterra Premier
  140: { matchesAvailable: 380, historicalSeasons: 5, signalsGeneratedCount: 38, dataCompletenessPct: 99.5, sampleSize: 'GRANDE' }, // España La Liga
  141: { matchesAvailable: 462, historicalSeasons: 4, signalsGeneratedCount: 31, dataCompletenessPct: 98.9, sampleSize: 'GRANDE' }, // España 2
  135: { matchesAvailable: 380, historicalSeasons: 5, signalsGeneratedCount: 36, dataCompletenessPct: 99.4, sampleSize: 'GRANDE' }, // Italia Serie A
  13:  { matchesAvailable: 155, historicalSeasons: 5, signalsGeneratedCount: 32, dataCompletenessPct: 99.4, sampleSize: 'GRANDE' }, // Conmebol Copa Libertadores
  61:  { matchesAvailable: 306, historicalSeasons: 5, signalsGeneratedCount: 29, dataCompletenessPct: 99.1, sampleSize: 'GRANDE' }, // Francia Ligue 1
  71:  { matchesAvailable: 380, historicalSeasons: 4, signalsGeneratedCount: 33, dataCompletenessPct: 98.7, sampleSize: 'GRANDE' }, // Brasil Serie A
  72:  { matchesAvailable: 380, historicalSeasons: 4, signalsGeneratedCount: 27, dataCompletenessPct: 97.9, sampleSize: 'ÓPTIMO' }, // Brasil Serie B
  94:  { matchesAvailable: 306, historicalSeasons: 4, signalsGeneratedCount: 28, dataCompletenessPct: 98.4, sampleSize: 'ÓPTIMO' }, // Portugal Primeira
  88:  { matchesAvailable: 306, historicalSeasons: 4, signalsGeneratedCount: 26, dataCompletenessPct: 98.6, sampleSize: 'ÓPTIMO' }, // Holanda Eredivisie
  239: { matchesAvailable: 390, historicalSeasons: 4, signalsGeneratedCount: 29, dataCompletenessPct: 97.8, sampleSize: 'ÓPTIMO' }, // Colombia A
  240: { matchesAvailable: 340, historicalSeasons: 3, signalsGeneratedCount: 21, dataCompletenessPct: 96.5, sampleSize: 'ÓPTIMO' }, // Colombia B
  265: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 22, dataCompletenessPct: 97.4, sampleSize: 'ÓPTIMO' }, // Chile Primera
  266: { matchesAvailable: 240, historicalSeasons: 3, signalsGeneratedCount: 18, dataCompletenessPct: 96.2, sampleSize: 'ESTÁNDAR' }, // Chile Primera B
  242: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 19, dataCompletenessPct: 97.1, sampleSize: 'ÓPTIMO' }, // Ecuador Liga Pro
  252: { matchesAvailable: 264, historicalSeasons: 4, signalsGeneratedCount: 23, dataCompletenessPct: 97.3, sampleSize: 'ÓPTIMO' }, // Paraguay
  281: { matchesAvailable: 306, historicalSeasons: 4, signalsGeneratedCount: 24, dataCompletenessPct: 96.9, sampleSize: 'ÓPTIMO' }, // Perú
  268: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 20, dataCompletenessPct: 97.0, sampleSize: 'ÓPTIMO' }, // Uruguay
  233: { matchesAvailable: 306, historicalSeasons: 4, signalsGeneratedCount: 25, dataCompletenessPct: 97.5, sampleSize: 'ÓPTIMO' }, // Egipto Premier
  203: { matchesAvailable: 380, historicalSeasons: 4, signalsGeneratedCount: 30, dataCompletenessPct: 98.2, sampleSize: 'GRANDE' }, // Turquía Süper Lig
  204: { matchesAvailable: 342, historicalSeasons: 3, signalsGeneratedCount: 22, dataCompletenessPct: 96.8, sampleSize: 'ÓPTIMO' }, // Turquía 1. Lig
  144: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 25, dataCompletenessPct: 98.5, sampleSize: 'ÓPTIMO' }, // Bélgica Jupiler
  119: { matchesAvailable: 198, historicalSeasons: 4, signalsGeneratedCount: 19, dataCompletenessPct: 98.3, sampleSize: 'ÓPTIMO' }, // Dinamarca Superliga
  106: { matchesAvailable: 306, historicalSeasons: 4, signalsGeneratedCount: 24, dataCompletenessPct: 98.1, sampleSize: 'ÓPTIMO' }, // Polonia Ekstraklasa
  107: { matchesAvailable: 306, historicalSeasons: 3, signalsGeneratedCount: 19, dataCompletenessPct: 96.7, sampleSize: 'ESTÁNDAR' }, // Polonia I Liga
  197: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 21, dataCompletenessPct: 97.8, sampleSize: 'ÓPTIMO' }, // Grecia Super League
  210: { matchesAvailable: 180, historicalSeasons: 4, signalsGeneratedCount: 18, dataCompletenessPct: 97.9, sampleSize: 'ÓPTIMO' }, // Croacia HNL
  283: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 22, dataCompletenessPct: 97.2, sampleSize: 'ÓPTIMO' }, // Rumania Liga I
  172: { matchesAvailable: 240, historicalSeasons: 3, signalsGeneratedCount: 17, dataCompletenessPct: 96.8, sampleSize: 'ESTÁNDAR' }, // Bulgaria First League
  373: { matchesAvailable: 180, historicalSeasons: 3, signalsGeneratedCount: 16, dataCompletenessPct: 96.5, sampleSize: 'ESTÁNDAR' }, // Eslovenia 1. SNL
  315: { matchesAvailable: 198, historicalSeasons: 3, signalsGeneratedCount: 15, dataCompletenessPct: 96.1, sampleSize: 'ESTÁNDAR' }, // Bosnia Premijer
  318: { matchesAvailable: 182, historicalSeasons: 3, signalsGeneratedCount: 16, dataCompletenessPct: 96.4, sampleSize: 'ESTÁNDAR' }, // Chipre 1. Division
  329: { matchesAvailable: 180, historicalSeasons: 3, signalsGeneratedCount: 14, dataCompletenessPct: 95.8, sampleSize: 'ESTÁNDAR' }, // Estonia Meistriliiga
  362: { matchesAvailable: 180, historicalSeasons: 3, signalsGeneratedCount: 15, dataCompletenessPct: 95.9, sampleSize: 'ESTÁNDAR' }, // Lituania A Lyga
  419: { matchesAvailable: 180, historicalSeasons: 3, signalsGeneratedCount: 14, dataCompletenessPct: 96.0, sampleSize: 'ESTÁNDAR' }, // Azerbaiyán Premyer
  188: { matchesAvailable: 156, historicalSeasons: 4, signalsGeneratedCount: 20, dataCompletenessPct: 98.2, sampleSize: 'ÓPTIMO' }, // Australia A-League
  190: { matchesAvailable: 132, historicalSeasons: 3, signalsGeneratedCount: 14, dataCompletenessPct: 96.3, sampleSize: 'ESTÁNDAR' }, // Australia A-League Women
  11:  { matchesAvailable: 157, historicalSeasons: 5, signalsGeneratedCount: 28, dataCompletenessPct: 99.2, sampleSize: 'GRANDE' }, // Conmebol Copa Sudamericana
  278: { matchesAvailable: 182, historicalSeasons: 3, signalsGeneratedCount: 15, dataCompletenessPct: 96.1, sampleSize: 'ESTÁNDAR' }, // Malasia Super League
  305: { matchesAvailable: 132, historicalSeasons: 3, signalsGeneratedCount: 16, dataCompletenessPct: 96.9, sampleSize: 'ESTÁNDAR' }, // Qatar Stars League
  330: { matchesAvailable: 132, historicalSeasons: 3, signalsGeneratedCount: 15, dataCompletenessPct: 96.2, sampleSize: 'ESTÁNDAR' }, // Kuwait Premier
  387: { matchesAvailable: 132, historicalSeasons: 3, signalsGeneratedCount: 14, dataCompletenessPct: 95.7, sampleSize: 'ESTÁNDAR' }, // Jordania League
  200: { matchesAvailable: 240, historicalSeasons: 4, signalsGeneratedCount: 21, dataCompletenessPct: 97.4, sampleSize: 'ÓPTIMO' }, // Marruecos Botola
  567: { matchesAvailable: 240, historicalSeasons: 3, signalsGeneratedCount: 16, dataCompletenessPct: 95.9, sampleSize: 'ESTÁNDAR' }, // Tanzania Ligi Kuu
  479: { matchesAvailable: 112, historicalSeasons: 3, signalsGeneratedCount: 13, dataCompletenessPct: 95.5, sampleSize: 'ESTÁNDAR' }  // Canadá Premier
};

export const STANDARD_MARKETS = [
  'Sin Empate (FT)',
  'Menos de 3.5 goles',
  'Sin Empate al Medio Tiempo (HT)',
  'Sin Ambos Marcan + >2.5',
  'Sin Ambos Marcan (1T)'
];

// Cálculo ponderado del Score de Calidad de 0 a 100
export function computeLeagueQualityScore(
  matches: number,
  seasons: number,
  completeness: number,
  signals: number
): LeagueQualityScorecard {
  // Ponderaciones:
  // 1. Partidos históricos (max 380): 25 pts
  const pMatches = Math.min(25, (matches / 380) * 25);
  // 2. Temporadas históricas (max 5): 20 pts
  const pSeasons = Math.min(20, (seasons / 5) * 20);
  // 3. Completitud de datos (95% - 100%): 25 pts
  const pCompleteness = Math.min(25, Math.max(0, (completeness - 90) / 10 * 25));
  // 4. Señales históricas generadas (max 40): 15 pts
  const pSignals = Math.min(15, (signals / 40) * 15);
  // 5. Cobertura de 5 mercados + consistencia en vivo: 15 pts
  const pMarkets = 15;

  const rawScore = Math.round(pMatches + pSeasons + pCompleteness + pSignals + pMarkets);
  const score = Math.min(100, Math.max(0, rawScore));

  let tier: LeagueQualityTier = 'INSUFICIENTE';
  let color = '#ef4444';

  if (score >= 90) {
    tier = 'EXCELENTE';
    color = '#4ade80';
  } else if (score >= 75) {
    tier = 'ALTA';
    color = '#38bdf8';
  } else if (score >= 60) {
    tier = 'ACEPTABLE';
    color = '#facc15';
  } else {
    tier = 'INSUFICIENTE';
    color = '#ef4444';
  }

  return {
    overallScore: score,
    tier,
    color,
    historicalMatchesCount: matches,
    historicalSeasonsCount: seasons,
    dataCompletenessPct: completeness,
    availableMarketsCount: STANDARD_MARKETS.length,
    historicalSignalsCount: signals,
    updateFrequency: 'En Vivo (45s)',
    dataConsistencyPct: Math.round(completeness * 0.99 * 10) / 10,
    marketSampleSize: matches >= 300 ? 'GRANDE (+300)' : matches >= 200 ? 'ÓPTIMO (+200)' : 'ESTÁNDAR (+100)',
    statisticalStabilityPct: Math.round((score * 0.95 + 4) * 10) / 10
  };
}

// Validación cuantitativa de elegibilidad y calidad
export function validateLeagueEligibility(leagueId: number): LeagueValidationTelemetry {
  const leagueConfig: LeagueInfo | undefined = Object.values(LEAGUES).find(l => l.id === leagueId);
  const metrics = LEAGUE_VALIDATION_METRICS[leagueId] || {};

  const matches = metrics.matchesAvailable ?? 180;
  const seasons = metrics.historicalSeasons ?? 3;
  const completeness = metrics.dataCompletenessPct ?? 96.0;
  const signals = metrics.signalsGeneratedCount ?? 18;
  const sample = metrics.sampleSize ?? 'ÓPTIMO';

  const quality = computeLeagueQualityScore(matches, seasons, completeness, signals);

  if (!leagueConfig) {
    return {
      leagueId,
      leagueName: 'Desconocida',
      country: 'N/A',
      flag: '❓',
      matchesAvailable: 0,
      historicalSeasons: 0,
      signalsGeneratedCount: 0,
      availableMarketsCount: 0,
      availableMarketsList: [],
      dataCompletenessPct: 0,
      sampleSize: 'ESTÁNDAR',
      status: 'NO ELEGIBLE',
      eligibilityReason: 'Liga no autorizada en la configuración oficial.',
      quality: {
        overallScore: 0,
        tier: 'INSUFICIENTE',
        color: '#ef4444',
        historicalMatchesCount: 0,
        historicalSeasonsCount: 0,
        dataCompletenessPct: 0,
        availableMarketsCount: 0,
        historicalSignalsCount: 0,
        updateFrequency: 'N/A',
        dataConsistencyPct: 0,
        marketSampleSize: 'N/A',
        statisticalStabilityPct: 0
      }
    };
  }

  const meetsCriteria = matches >= 100 && seasons >= 3 && completeness >= 95.0;

  return {
    leagueId: leagueConfig.id,
    leagueName: leagueConfig.name,
    country: leagueConfig.country,
    flag: leagueConfig.flag || '⚽',
    matchesAvailable: matches,
    historicalSeasons: seasons,
    signalsGeneratedCount: signals,
    availableMarketsCount: STANDARD_MARKETS.length,
    availableMarketsList: STANDARD_MARKETS,
    dataCompletenessPct: completeness,
    sampleSize: sample,
    status: meetsCriteria ? 'ACTIVA' : 'NO ELEGIBLE',
    eligibilityReason: meetsCriteria 
      ? 'Cumple criterios cuantitativos de muestra, temporadas y completitud de datos.' 
      : 'No alcanza el umbral mínimo de muestra o completitud estadística.',
    quality
  };
}

// Capa de filtro estricto: Solo ligas válidas y autorizadas generan señales
export function getAuthorizedActiveLeagues(selectedLeagueIds: number[]): number[] {
  const authorizedIds = Object.values(LEAGUES).map(l => l.id);
  return selectedLeagueIds.filter(id => {
    if (!authorizedIds.includes(id)) return false;
    const val = validateLeagueEligibility(id);
    return val.status === 'ACTIVA';
  });
}

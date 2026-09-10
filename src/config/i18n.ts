export type Language = 'es' | 'en' | 'pt' | 'gn';

export interface Translations {
  appTitle: string;
  planLabel: string;
  plans: {
    BASIC: string;
    PRO: string;
    VIP: string;
  };
  header: {
    indicators: string;
    logout: string;
    whichMarket: string;
    backtest: string;
    audit: string;
    academy: string;
    bankroll: string;
    exportCsv: string;
    telegram: string;
    pricing: string;
    refreshTitle: string;
    manageLeagues: string;
    dailyReport: string;
    transparency: string;
    portalWeb: string;
    adminPanel: string;
  };
  trialBanner: {
    title: string;
    countdown: string;
    upgradePro: string;
    upgradeVip: string;
  };
  actions: {
    exportCsv: string;
    pricing: string;
    refresh: string;
    manageLeagues: string;
    telegramBot: string;
    bankroll: string;
    backtest: string;
    audit: string;
    academy: string;
    close: string;
  };
  filters: {
    searchPlaceholder: string;
    searchBtn: string;
    all: string;
    highAlerts: string;
    highToday: string;
    liveOnly: string;
    upcomingOnly: string;
    todayOnly: string;
    todayBadge: string;
    operating: string;
  };
  opportunitiesCenter: {
    title: string;
    subtitle: string;
    detectedBadge: string;
    fAll: string;
    fPremium: string;
    fStrong: string;
    fLive: string;
    fUpcoming: string;
    fOperating: string;
    operatingTag: string;
    inProgressBadge: string;
    monitoringBreak: string;
    deactivateBtn: string;
    startTradeHeader: string;
    validatedSignal: string;
    activateBtn: string;
    startBtn: string;
    currentStreakLabel: string;
    matchesSuffix: string;
    sampleSizeLabel: string;
    casesSuffix: string;
    winrateLabel: string;
    roiLabel: string;
    suggestedOddsLabel: string;
    leagueQualityLabel: string;
    pushAlertTitle: string;
    noOpportunities: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    clickToOpp: string;
    waitingSchedule: string;
    noLiveMatches: string;
    noUpcoming: string;
  };
  markets: {
    draw: string;
    over35: string;
    htDraw: string;
    bttsOver25: string;
    btts1H: string;
  };
  operationalMarkets: {
    draw: string;
    over35: string;
    htDraw: string;
    bttsOver25: string;
    btts1H: string;
  };
  actionGuide: {
    title: string;
    subtitle: string;
    rule: string;
  };
  streaks: {
    negativeStreaksTitle: string;
    brokenAt: string;
    matchesUnit: string;
    lockedBadge: string;
    noLiveMatches: string;
    upcomingPrefix: string;
    oneClickBankrollBtn: string;
    recentRoundsTitle: string;
    viewHistoryBtn: string;
    hideHistoryBtn: string;
    loadingHistory: string;
    noHistoryAvailable: string;
    fullscreenBtn: string;
    sortAscBtn: string;
    sortDescBtn: string;
    closeFullscreenBtn: string;
    closeDropdownBtn: string;
    nextRoundTitle: string;
    nextRoundBadge: string;
    previousRoundsBadge: string;
  };
  counters: {
    orange: string;
    yellow: string;
    blue: string;
    green: string;
  };
  newOpModal: {
    title: string;
    date: string;
    time: string;
    category: string;
    operationType: string;
    desc: string;
    market: string;
    stake: string;
    odds: string;
    status: string;
    notes: string;
    cancelBtn: string;
    saveBtn: string;
  };
  leaguesModal: {
    title: string;
    selectAll: string;
    requireElite: string;
    limitBasicAlert: string;
    limitProAlert: string;
    requireEliteAlert: string;
  };
  telegramModal: {
    title: string;
    subtitle: string;
    botStatus: string;
    channelTitle: string;
    generateBtn: string;
    copyBtn: string;
    copiedNotice: string;
    alertTitleGreen: string;
    alertTitleBlue: string;
    leagueLabel: string;
    marketLabel: string;
    streakLabel: string;
    nextMatchLabel: string;
    suggestionLabel: string;
    suggestionGreen: string;
    suggestionBlue: string;
    footerNote: string;
  };
  pricingModal: {
    title: string;
    subtitle: string;
  };
  pricingModalDetails: {
    title: string;
    subtitle: string;
    badgePopular: string;
    badgeAllIncluded: string;
    free: { name: string; price: string; period: string; desc: string; features: string[]; btn: string };
    pro: { name: string; price: string; period: string; desc: string; features: string[]; btn: string };
    vip: { name: string; price: string; period: string; desc: string; features: string[]; btn: string };
  };
  guideModal: {
    title: string;
    subtitle: string;
    principleTitle: string;
    principleDesc: string;
    steps: Array<{ title: string; badge: string; desc: string }>;
    understandBtn: string;
  };
  checkoutModal: {
    title: string;
    subtitle: string;
    planSelectedLabel: string;
    totalToPayLabel: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    paymentMethodLabel: string;
    stripeLabel: string;
    mercadopagoLabel: string;
    sslNotice: string;
    submitBtn: string;
    successTitle: string;
    successMsg: string;
    goToDashboardBtn: string;
  };
  pushNotifyModal: {
    title: string;
    subtitle: string;
    nextFixtureLabel: string;
    targetMarketLabel: string;
    timeLabel: string;
    opt10minTitle: string;
    opt10minDesc: string;
    optLiveTitle: string;
    optLiveDesc: string;
    optGoalTitle: string;
    optGoalDesc: string;
    optFtTitle: string;
    optFtDesc: string;
    cancelBtn: string;
    saveBtn: string;
  };
  dailyReportModal: {
    title: string;
    subtitle: string;
    periodDay: string;
    periodWeek: string;
    periodMonth: string;
    periodCustom: string;
    exportBtn: string;
    dateFrom: string;
    dateTo: string;
    dateFilterBtn: string;
    dateClearBtn: string;
    snapOpen: string;
    snapGen: string;
    snapCut: string;
    snapClose: string;
    alertsUnit: string;
    newsUnit: string;
    cutsUnit: string;
    vivasUnit: string;
    kpiTitle: string;
    kpiSub: string;
    kpiTotal: string;
    kpiWinLoss: string;
    kpiWinrate: string;
    kpiRoi: string;
    kpiProfit: string;
    kpiPf: string;
    kpiDd: string;
    kpiPremium: string;
    distLeagues: string;
    distMarkets: string;
    tableHeading: string;
    thDate: string;
    thLeague: string;
    thOpen: string;
    thGen: string;
    thCut: string;
    thClose: string;
    noAlerts: string;
  };
  backtestModal: {
    title: string;
    subtitle: string;
    tagHistorical: string;
    lblLeague: string;
    lblMarket: string;
    lblSeason: string;
    lblOdds: string;
    lblTier: string;
    lblStake: string;
    optAllLeagues: string;
    optAllSeasons: string;
    optAllOdds: string;
    optLowOdds: string;
    optMidOdds: string;
    optHighOdds: string;
    optAllTiers: string;
    optPremTier: string;
    optStrongTier: string;
    optObsTier: string;
    optStake1: string;
    optStake2: string;
    optStake3: string;
    kpiAccumYield: string;
    kpiWinRate: string;
    kpiAvgOdds: string;
    kpiTotalRoi: string;
    kpiPf: string;
    kpiEv: string;
    kpiDrawdown: string;
    kpiStreaks: string;
    kpiCapFlow: string;
    subYield: string;
    subWinLoss: string;
    subOdds: string;
    subRoi: string;
    subPf: string;
    subEv: string;
    subDd: string;
    subStreaks: string;
    subCapFlow: string;
    robTitle: string;
    robBadgeRobust: string;
    robSample: string;
    robSampleAdequacy: string;
    robSeason: string;
    robSeasonSub: string;
    robLeague: string;
    robLeagueSub: string;
    robOdds: string;
    robOddsSub: string;
    robSummary: string;
    chartTitle: string;
    chartSub: string;
    disclaimer: string;
  };
  auditModal: {
    title: string;
    subtitle: string;
    statTotal: string;
    statWon: string;
    statLost: string;
    statYield: string;
    filterAll: string;
    filterWon: string;
    filterLost: string;
    footnote: string;
    thSignalId: string;
    thTimestamp: string;
    thLeague: string;
    thSeason: string;
    thMatch: string;
    thMarket: string;
    thStreak: string;
    thScore: string;
    thConfidence: string;
    thOdds: string;
    thProbability: string;
    thFinalResult: string;
    thSignalResult: string;
    thRoi: string;
    thStatus: string;
  };
  academyModal: {
    title: string;
    subtitle: string;
  };
  transparencyModal: {
    title: string;
    subtitle: string;
    trackReal: string;
    trackPaper: string;
    trackBacktest: string;
    bannerRealDesc: string;
    bannerPaperDesc: string;
    bannerBacktestDesc: string;
    lastUpdated: string;
    kpiTotal: string;
    kpiResolved: string;
    kpiWinrate: string;
    kpiRoi: string;
    kpiDd: string;
    kpiSample: string;
    sampleInProgress: string;
    tableLeaguesTitle: string;
    tableMarketsTitle: string;
    tableMonthlyTitle: string;
    thLeague: string;
    thSample: string;
    thWinrate: string;
    thRoi: string;
    thMarket: string;
    thMonth: string;
    thSignalsWL: string;
    disclaimerTitle: string;
    disclaimerText: string;
  };
  adminModal: {
    title: string;
    subtitle: string;
    thId: string;
    thEmail: string;
    thName: string;
    thPlan: string;
    thStatus: string;
    thExpires: string;
    thAction: string;
  };
  bankroll: {
    btnTitle: string;
    modalTitle: string;
    modalSubtitle: string;
    tabDashboard: string;
    tabOperations: string;
    tabCalculator: string;
    tabConfig: string;
    newOpBtn: string;
    exportExcelBtn: string;
    exportCsvBtn: string;
    capitalInitial: string;
    capitalCurrent: string;
    totalPnl: string;
    totalProfit: string;
    totalLoss: string;
    roi: string;
    yield: string;
    winrate: string;
    exposure: string;
    availableCap: string;
    committedCap: string;
    maxDrawdown: string;
    profitFactor: string;
    ev: string;
    calcTitle: string;
    calcDesc: string;
    suggestedStake: string;
    riskValidation: string;
    calcCapLabel: string;
    calcRiskLabel: string;
    calcOddsLabel: string;
    calcRetPotential: string;
    calcNetProfit: string;
    calcMaxLoss: string;
    calcProfileConservative: string;
    calcProfileUltra: string;
    calcProfileModerate: string;
    calcProfileModerateHigh: string;
    calcProfileCustom: string;
    cfgTitle: string;
    cfgDesc: string;
    cfgCurrency: string;
    cfgInitialCap: string;
    cfgSecurityCap: string;
    cfgMaxStake: string;
    cfgRecStake: string;
    cfgDailyLimit: string;
    cfgWeeklyLimit: string;
    cfgSaveBtn: string;
  };
}

export const I18N: Record<Language, Translations> = {
  "es": {
    "appTitle": "Rastreador de Rachas",
    "planLabel": "Plan:",
    "plans": {
      "BASIC": "Plan FREE ($0)",
      "PRO": "Plan PRO ($19)",
      "VIP": "Plan VIP ($39)"
    },
    "header": {
      "indicators": "Indicadores:",
      "logout": "🚪 Salir",
      "whichMarket": "📖 ¿Qué Mercado Operar?",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoría",
      "academy": "🎓 Academia",
      "bankroll": "💼 Control de Banca",
      "exportCsv": "📥 Exportar CSV",
      "telegram": "🤖 Bot Telegram",
      "pricing": "💎 Ver Planes",
      "refreshTitle": "Actualizar datos de las ligas ahora",
      "manageLeagues": "Gestionar Ligas",
      "dailyReport": "📊 Informe de Jornada",
      "transparency": "🔍 Transparencia & Resultados",
      "portalWeb": "🌐 Portal Web",
      "adminPanel": "⚙️ Panel Admin"
    },
    "trialBanner": {
      "title": "Período de Prueba Gratuita Activo",
      "countdown": "Tu prueba termina en {days} días.",
      "upgradePro": "⚡ Actualizar a PRO ($19/m)",
      "upgradeVip": "👑 Actualizar a VIP ($39/m)"
    },
    "actions": {
      "exportCsv": "📥 Exportar CSV",
      "pricing": "💎 Ver Planes",
      "refresh": "🔄 Actualizar",
      "manageLeagues": "Gestionar Ligas",
      "telegramBot": "🤖 Bot Telegram",
      "bankroll": "💼 Control de Banca",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoría",
      "academy": "🎓 Academia",
      "close": "✓ Aceptar"
    },
    "filters": {
      "searchPlaceholder": "🔍 Buscar liga o país...",
      "searchBtn": "🔍 Buscar",
      "all": "🔘 Todas las Ligas",
      "highAlerts": "🟢 Alertas Verdes / Azules (Todas)",
      "highToday": "🟢🔵 Alertas Verdes / Azules de Hoy",
      "liveOnly": "🔴 Solo En Vivo",
      "upcomingOnly": "📅 Con Próximos Partidos",
      "operating": "⚡ Operando",
      "todayOnly": "🔥 Partidos de Hoy",
      "todayBadge": "🔥 JUEGA HOY"
    },
    "opportunitiesCenter": {
      "title": "CENTRO DE OPORTUNIDADES",
      "subtitle": "Ranking algorítmico multicriterio (Signal Score, Confianza, Muestra, Calidad de Liga y Horario).",
      "detectedBadge": "detectadas",
      "fAll": "🔘 TODAS",
      "fPremium": "🟢 PREMIUM",
      "fStrong": "🔵 FUERTES",
      "fLive": "🔴 EN VIVO",
      "fUpcoming": "📅 PRÓXIMAS",
      "fOperating": "⚡ OPERANDO",
      "operatingTag": "OPERANDO:",
      "inProgressBadge": "EN CURSO",
      "monitoringBreak": "⚡ Monitoreando hasta el quiebre (Racha: {streak})",
      "deactivateBtn": "⏸️ Desactivar",
      "startTradeHeader": "INICIAR OPERACIÓN:",
      "validatedSignal": "✅ Señal Validada (Racha: {streak}) • Cuota sugerida: @{odds}",
      "activateBtn": "⚡ Activar",
      "startBtn": "🚀 Iniciar",
      "currentStreakLabel": "RACHA ACTUAL",
      "matchesSuffix": "partidos",
      "sampleSizeLabel": "MUESTRA HISTÓRICA",
      "casesSuffix": "casos",
      "winrateLabel": "WIN RATE HIST.",
      "roiLabel": "ROI HISTÓRICO",
      "suggestedOddsLabel": "CUOTA ESTIMADA",
      "leagueQualityLabel": "CALIDAD LIGA",
      "pushAlertTitle": "🔔 Configurar Alerta Push (10 min antes)",
      "noOpportunities": "No hay oportunidades que coincidan con el filtro seleccionado."
    },
    "dashboard": {
      "title": "RASTREADORES",
      "subtitle": "Monitoreo en Vivo por Liga",
      "clickToOpp": "👉 Clic para ver las oportunidades de {league} en el Centro de Oportunidades",
      "waitingSchedule": "En espera de programación",
      "noLiveMatches": "Actualmente no hay partidos en directo.",
      "noUpcoming": "Sin partidos programados"
    },
    "operationalMarkets": {
      "draw": "🎯 Operar: Empate (FT)",
      "over35": "🎯 Operar: Más de 3.5 goles",
      "htDraw": "🎯 Operar: Empate (1T)",
      "bttsOver25": "🎯 Operar: Ambos Marcan + >2.5",
      "btts1H": "🎯 Operar: Ambos Marcan (1T)"
    },
    "actionGuide": {
      "title": "Guía de Ejecución: Mercados de Operación",
      "subtitle": "¿Cómo interpretar las Alertas de Oportunidad y qué mercado operar?",
      "rule": "Principio Estadístico: Cuando una liga acumula una racha prolongada sin que ocurra un evento (anomalía), la probabilidad estadística de corte aumenta y el mercado a operar es el evento opuesto que romperá dicha racha."
    },
    "markets": {
      "draw": "Sin Empate (FT)",
      "over35": "Menos de 3.5 goles",
      "htDraw": "Sin Empate (HT)",
      "bttsOver25": "Sin BTTS + >2.5 Goles",
      "btts1H": "Sin BTTS (1er Tiempo)"
    },
    "streaks": {
      "negativeStreaksTitle": "Rastreadores • Alertas de Oportunidad:",
      "brokenAt": "Se cortó en:",
      "matchesUnit": "partido(s)",
      "lockedBadge": "🔒 Desbloquear en PRO",
      "noLiveMatches": "Actualmente no hay partidos en directo.",
      "upcomingPrefix": "Próximos:",
      "oneClickBankrollBtn": "⚡ Operar en Banca",
      "recentRoundsTitle": "Últimas Jornadas (Resultados Anteriores)",
      "viewHistoryBtn": "📊 Ver Últimas 3 Jornadas",
      "hideHistoryBtn": "▲ Ocultar Resultados",
      "loadingHistory": "Cargando resultados de la liga...",
      "noHistoryAvailable": "No hay resultados registrados en las últimas jornadas.",
      "fullscreenBtn": "⛶ Pantalla Completa",
      "sortAscBtn": "▲ Fecha: Antigua a Reciente",
      "sortDescBtn": "▼ Fecha: Reciente a Antigua",
      "closeFullscreenBtn": "✕ Cerrar",
      "closeDropdownBtn": "✕ Cerrar Vista de Jornadas",
      "nextRoundTitle": "Próxima Jornada a Disputarse",
      "nextRoundBadge": "PRÓXIMA JORNADA",
      "previousRoundsBadge": "JORNADA ANTERIOR"
    },
    "counters": {
      "orange": "Naranjas",
      "yellow": "Amarillos",
      "blue": "Azules",
      "green": "Verdes"
    },
    "newOpModal": {
      "title": "➕ Registrar Nueva Operación",
      "date": "Fecha",
      "time": "Hora",
      "category": "Categoría",
      "operationType": "Tipo Operación",
      "desc": "Descripción / Evento",
      "market": "Mercado / Segmento",
      "stake": "Monto Utilizado ($)",
      "odds": "Cuota / Multiplicador",
      "status": "Estado Inicial",
      "notes": "Observaciones (Opcional)",
      "cancelBtn": "Cancelar",
      "saveBtn": "💾 Guardar Operación"
    },
    "leaguesModal": {
      "title": "Ligas Activas",
      "selectAll": "Seleccionar Todas",
      "requireElite": "(🔒 Requiere Plan VIP)",
      "limitBasicAlert": "🔒 En el Plan FREE solo puedes monitorear hasta 5 ligas. ¡Actualiza a PRO para 15 ligas o a VIP para todas las 51 ligas oficiales!",
      "limitProAlert": "🔒 En el Plan PRO tienes un límite de 15 ligas activas simultáneas. ¡Actualiza a VIP para monitorear todas las 51 ligas oficiales!",
      "requireEliteAlert": "🔒 La opción \"Seleccionar Todas\" está disponible exclusivamente en el Plan VIP (51 ligas oficiales)."
    },
    "telegramModal": {
      "title": "Simulador de Bot de Telegram VIP",
      "subtitle": "Previsualiza cómo se emiten las señales automáticas a tus canales de suscriptores.",
      "botStatus": "Bot Conectado • 24/7 en tiempo real",
      "channelTitle": "🏆 StreakTracker VIP Signals",
      "generateBtn": "🔔 Generar Alerta en Vivo",
      "copyBtn": "📋 Copiar Señal",
      "copiedNotice": "¡Copiado al portapapeles!",
      "alertTitleGreen": "🚨 ALERTA VERDE (MÁXIMA PROBABILIDAD)",
      "alertTitleBlue": "⚡ ALERTA AZUL (MERCADO SEGURO)",
      "leagueLabel": "⚽ Liga:",
      "marketLabel": "📊 Mercado:",
      "streakLabel": "🔥 Racha:",
      "nextMatchLabel": "⏰ Próximo juego:",
      "suggestionLabel": "💡 Sugerencia:",
      "suggestionGreen": "Extrema probabilidad estadística de reversión a la media.",
      "suggestionBlue": "Racha madura. Considerar cuotas de valor en el corte.",
      "footerNote": "🤖 Alerta generada automáticamente por StreakTracker Engine"
    },
    "pricingModal": {
      "title": "💎 Planes y Suscripciones",
      "subtitle": "Desbloquea análisis cuantitativo en tiempo real y maximiza tu ventaja matemática."
    },
    "pricingModalDetails": {
      "title": "💎 Planes y Suscripciones",
      "subtitle": "Desbloquea análisis cuantitativo en tiempo real y maximiza tu ventaja matemática.",
      "badgePopular": "POPULAR",
      "badgeAllIncluded": "TODO INCLUIDO",
      "free": {
        "name": "⚪ FREE",
        "price": "$0.00",
        "period": "/ mes",
        "desc": "Acceso introductorio para explorar la plataforma.",
        "features": [
          "✓ Hasta 5 ligas activas",
          "✓ Estadísticas y rachas básicas",
          "✓ 2 oportunidades diarias observables",
          "✓ Calculadora de stake básica",
          "✕ Alertas PREMIUM y FUERTES bloqueadas",
          "✕ Sin Backtesting Histórico avanzado",
          "✕ Sin alertas de Telegram VIP",
          "✕ Sin informes diarios de jornada"
        ],
        "btn": "Activar Plan FREE"
      },
      "pro": {
        "name": "🔵 PRO",
        "price": "$19.00",
        "period": "/ mes",
        "desc": "Para operadores cuantitativos que buscan mayor volumen de señales.",
        "features": [
          "✓ Hasta 15 ligas activas simultáneas",
          "✓ Alertas FUERTES desbloqueadas (🔵 Azul)",
          "✓ Estadísticas avanzadas y telemetría",
          "✓ Filtros adicionales y Centro de Oportunidades",
          "✓ Módulo de Backtesting Ampliado (+3 Temp)",
          "✓ Control de banca hasta 50 operaciones",
          "✓ 📥 Descarga de Planilla Excel Oficial (.xlsx)",
          "✕ Sin Bot de Telegram VIP"
        ],
        "btn": "Activar Plan PRO"
      },
      "vip": {
        "name": "🟢 VIP",
        "price": "$39.00",
        "period": "/ mes",
        "desc": "La suite definitiva para traders profesionales y sindicatos.",
        "features": [
          "✓ Todas las 50+ ligas mundiales desbloqueadas",
          "✓ 100% Señales PREMIUM desbloqueadas (🟢 Verde)",
          "✓ Alertas prioritarias instantáneas",
          "✓ Información estadística e institucional completa",
          "✓ 🤖 Integración con Bot de Telegram VIP en tiempo real",
          "✓ Historial completo y auditoría inmutable",
          "✓ Herramientas avanzadas de banca ILIMITADAS",
          "✓ 📊 Balance e Informes de Jornada profesionales"
        ],
        "btn": "Activar Plan VIP"
      }
    },
    "guideModal": {
      "title": "📖 GUÍA OFICIAL: MERCADOS A EJECUTAR",
      "subtitle": "Correspondencia directa entre la anomalía estadística detectada y la orden de mercado.",
      "principleTitle": "📌 Principio Cuantitativo de Reversión a la Media:",
      "principleDesc": "El rastreador detecta ligas que acumulan anomalías de partidos consecutivos sin que ocurra un evento específico. Cuando la alerta llega a nivel Verde / Azul, la orden a ejecutar en tu casa de inversión es el evento de ruptura:",
      "steps": [
        {
          "title": "1. Racha: Sin Empate (FT)",
          "badge": "🎯 MERCADO A OPERAR: EMPATE (X)",
          "desc": "La liga lleva muchos partidos sin finalizar en tablas. Se opera el Empate al Final del Partido (Cuota típica: 3.10 - 3.60)."
        },
        {
          "title": "2. Racha: Menos de 3.5 goles",
          "badge": "🎯 MERCADO A OPERAR: MÁS DE 3.5 GOLES (Over 3.5)",
          "desc": "La liga lleva una sequía de partidos con ≤ 3 goles. Se opera Más de 3.5 Goles Totales (Cuota típica: 2.60 - 3.40)."
        },
        {
          "title": "3. Racha: Sin Empate al Medio Tiempo (HT)",
          "badge": "🎯 MERCADO A OPERAR: EMPATE 1er TIEMPO (HT)",
          "desc": "Se opera el Empate al llegar al descanso (0-0, 1-1, etc.) (Cuota típica: 2.00 - 2.40)."
        },
        {
          "title": "4. Racha: Sin BTTS + >2.5 Goles",
          "badge": "🎯 MERCADO A OPERAR: AMBOS MARCAN Y > 2.5 GOLES",
          "desc": "Se opera el mercado combinado Ambos Equipos Anotan + Más de 2.5 Goles (Cuota típica: 2.10 - 2.80)."
        },
        {
          "title": "5. Racha: Sin BTTS en 1er Tiempo",
          "badge": "🎯 MERCADO A OPERAR: AMBOS MARCAN EN 1er TIEMPO",
          "desc": "Se opera que ambos equipos marcan antes del minuto 45 (Cuota de alto valor: 4.00 - 5.50)."
        }
      ],
      "understandBtn": "Entendido"
    },
    "checkoutModal": {
      "title": "💳 Pasarela de Suscripción",
      "subtitle": "Registro de cuenta y activación de plan cuantitativo.",
      "planSelectedLabel": "Plan Seleccionado:",
      "totalToPayLabel": "Total a Pagar:",
      "fullNameLabel": "Nombre Completo:",
      "fullNamePlaceholder": "Ej. Juan Pérez",
      "emailLabel": "Correo Electrónico:",
      "emailPlaceholder": "tu.email@ejemplo.com",
      "paymentMethodLabel": "Método de Pago:",
      "stripeLabel": "💳 Tarjeta (Stripe)",
      "mercadopagoLabel": "🤝 Mercado Pago",
      "sslNotice": "🔒 Entorno Seguro SSL (Modo Demo / Sandbox Activo)",
      "submitBtn": "🚀 Confirmar Registro y Activar Suscripción",
      "successTitle": "¡Suscripción Activada Exitosamente!",
      "successMsg": "Tu plan ha sido activado por 30 días. Todas las herramientas y alertas están disponibles.",
      "goToDashboardBtn": "✓ Ir al Dashboard"
    },
    "pushNotifyModal": {
      "title": "Configurar Alerta Push",
      "subtitle": "Aviso automático 10 minutos antes del inicio del partido.",
      "nextFixtureLabel": "Próximo Encuentro / Oportunidad:",
      "targetMarketLabel": "🎯 Mercado Objetivo",
      "timeLabel": "📅 Horario",
      "opt10minTitle": "⏰ Notificar 10 minutos antes",
      "opt10minDesc": "Aviso sonoro y push en pantalla para preparar la operación.",
      "optLiveTitle": "🔴 Notificar al inicio del partido",
      "optLiveDesc": "Aviso en tiempo real cuando el partido pase a En Vivo (00').",
      "optGoalTitle": "⚽ Notificar cuando se convierte un GOL",
      "optGoalDesc": "Aviso instantáneo de gol con nuevo marcador (ej. 1-0, 1-1).",
      "optFtTitle": "🏁 Notificar cuando finaliza el partido (FT)",
      "optFtDesc": "Aviso del resultado final y confirmación de acierto/quiebre de racha.",
      "cancelBtn": "Cancelar",
      "saveBtn": "🔔 Activar Notificación Push"
    },
    "dailyReportModal": {
      "title": "📊 INFORME Y BALANCE DE JORNADA (00:00hs - 23:59hs)",
      "subtitle": "Auditoría histórica de alertas vivas al inicio de jornada, alertas generadas en el día y alertas cortadas al cierre.",
      "periodDay": "📅 Hoy (Jornada Actual)",
      "periodWeek": "🗓️ Últimos 7 Días (Semana)",
      "periodMonth": "📈 Últimos 30 Días (Mes)",
      "periodCustom": "🔍 Por Rango de Fechas",
      "exportBtn": "📥 Exportar Informe Profesional (CSV)",
      "dateFrom": "Desde:",
      "dateTo": "Hasta:",
      "dateFilterBtn": "🔍 Filtrar",
      "dateClearBtn": "✕ Limpiar",
      "snapOpen": "🌅 APERTURA (00:00hs)",
      "snapGen": "⚡ GENERADAS (Nuevas)",
      "snapCut": "✂️ RESUELTAS (Gan/Pérd)",
      "snapClose": "🌙 CIERRE (23:59hs Vivas)",
      "alertsUnit": "Alertas",
      "newsUnit": "Nuevas",
      "cutsUnit": "Rupturas",
      "vivasUnit": "Vivas",
      "kpiTitle": "📈 Balance Cuantitativo del Período",
      "kpiSub": "*Basado en el Ledger Inmutable de Señales",
      "kpiTotal": "TOTAL SEÑALES",
      "kpiWinLoss": "GANADAS / PERDIDAS",
      "kpiWinrate": "WIN RATE %",
      "kpiRoi": "ROI ESTIMADO",
      "kpiProfit": "PROFIT / LOSS",
      "kpiPf": "PROFIT FACTOR",
      "kpiDd": "MAX DRAWDOWN",
      "kpiPremium": "SEÑALES PREMIUM",
      "distLeagues": "🏆 Distribución por Liga:",
      "distMarkets": "🎯 Distribución por Mercado:",
      "tableHeading": "📋 Desglose Detallado por Liga & Jornada",
      "thDate": "Fecha / Día",
      "thLeague": "Liga / País",
      "thOpen": "Inicio (00:00)",
      "thGen": "Generadas",
      "thCut": "Cortadas (23:59)",
      "thClose": "Cierre Actual",
      "noAlerts": "Sin alertas registradas en este período"
    },
    "backtestModal": {
      "title": "📈 BACKTESTING & RENDIMIENTO HISTÓRICO",
      "subtitle": "Simulación cuantitativa y validación empírica sobre más de 3 temporadas completas en las 50+ ligas oficiales.",
      "tagHistorical": "RESULTADO HISTÓRICO / BACKTEST",
      "lblLeague": "1. Liga",
      "lblMarket": "2. Mercado",
      "lblSeason": "3. Temporada",
      "lblOdds": "4. Rango Cuotas",
      "lblTier": "5. Nivel Señal",
      "lblStake": "6. Stake %",
      "optAllLeagues": "🌐 Todas las 50+ Ligas",
      "optAllSeasons": "📅 Todas (Últimas 3+ temp)",
      "optAllOdds": "🎲 Todas las cuotas",
      "optLowOdds": "Conservadoras (< 2.00)",
      "optMidOdds": "Equilibradas (2.00 - 3.50)",
      "optHighOdds": "Alto Valor (> 3.50)",
      "optAllTiers": "⚡ Todos los niveles",
      "optPremTier": "🟢 Solo PREMIUM (90-100)",
      "optStrongTier": "🔵 Solo FUERTE (75-89)",
      "optObsTier": "🟡 OBSERVABLE (60-74)",
      "optStake1": "1.00% (Conservador)",
      "optStake2": "2.00% (Moderado)",
      "optStake3": "3.00% (Agresivo)",
      "kpiAccumYield": "Rendimiento Acumulado",
      "kpiWinRate": "Tasa de Acierto (Win Rate)",
      "kpiAvgOdds": "Cuota Media Ponderada",
      "kpiTotalRoi": "ROI Total %",
      "kpiPf": "Profit Factor",
      "kpiEv": "Expectativa por Operación",
      "kpiDrawdown": "Máximo Drawdown",
      "kpiStreaks": "Rachas Consecutivas",
      "kpiCapFlow": "Capital Inicial ➔ Final",
      "subYield": "Señales Históricas",
      "subWinLoss": "Ganadas / Perdidas",
      "subOdds": "Multiplicador medio",
      "subRoi": "Retorno sobre inversión",
      "subPf": "Ganancia / Pérdida bruta",
      "subEv": "Valor esperado medio ($ EV)",
      "subDd": "Bajo control (< 15%)",
      "subStreaks": "Máx. Victorias / Pérdidas",
      "subCapFlow": "Simulación de crecimiento",
      "robTitle": "ROBUSTEZ DE ESTRATEGIA",
      "robBadgeRobust": "ROBUSTA",
      "robSample": "TAMAÑO DE MUESTRA VINCULADA",
      "robSampleAdequacy": "Muestra Amplia",
      "robSeason": "ESTABILIDAD POR TEMPORADA",
      "robSeasonSub": "Consistencia interanual",
      "robLeague": "ESTABILIDAD POR LIGA",
      "robLeagueSub": "Generalización multiligas",
      "robOdds": "ESTABILIDAD POR CUOTAS",
      "robOddsSub": "Resistencia al sesgo",
      "robSummary": "Diagnóstico: Alta significancia estadística con excelente consistencia interanual y estricto control de drawdown.",
      "chartTitle": "Simulación de Evolución de Capital (Banca Inicial: $1,000)",
      "chartSub": "*Ejecución cuantitativa estricta sin martingala",
      "disclaimer": "*Aviso Metodológico: Los resultados mostrados provienen de un BACKTESTING HISTÓRICO cuantitativo. El rendimiento pasado no constituye una garantía de resultados futuros."
    },
    "auditModal": {
      "title": "🛡️ AUDITORÍA PÚBLICA & TRACK RECORD VERIFICADO",
      "subtitle": "Registro transparente, cronológico e inmutable de señales emitidas por el algoritmo.",
      "statTotal": "SEÑALES AUDITADAS",
      "statWon": "SEÑALES ACERTADAS",
      "statLost": "SEÑALES FALLADAS",
      "statYield": "YIELD / RETORNO NETO",
      "filterAll": "🔘 Todas",
      "filterWon": "✅ Acertadas",
      "filterLost": "❌ Falladas",
      "footnote": "*Verificación auditada con cuotas reales de mercado",
      "thSignalId": "signal_id",
      "thTimestamp": "timestamp",
      "thLeague": "liga",
      "thSeason": "temporada",
      "thMatch": "partido",
      "thMarket": "mercado",
      "thStreak": "racha",
      "thScore": "score",
      "thConfidence": "nivel_confianza",
      "thOdds": "cuota_momento",
      "thProbability": "prob_implícita",
      "thFinalResult": "resultado_final",
      "thSignalResult": "resultado_señal",
      "thRoi": "ROI",
      "thStatus": "estado"
    },
    "academyModal": {
      "title": "🎓 ACADEMIA ANTI-RUINA & GESTIÓN CUANTITATIVA",
      "subtitle": "5 Masterclasses esenciales para preservar tu capital y maximizar tu rentabilidad a largo plazo."
    },
    "transparencyModal": {
      "title": "🔍 TRANSPARENCIA Y RESULTADOS VERIFICADOS",
      "subtitle": "Rendimiento auditado de StreakTracker segregado estrictamente por categoría metodológica.",
      "trackReal": "🛡️ RESULTADOS REALES (Ledger Inmutable)",
      "trackPaper": "🧪 PAPER TRADING (Forward Test)",
      "trackBacktest": "📈 BACKTEST (Histórico 3 Temp)",
      "bannerRealDesc": "Señales auditadas y liquidadas directamente en el Ledger Inmutable oficial de StreakTracker.",
      "bannerPaperDesc": "Señales capturadas en tiempo real y registradas a cuota de apertura en entorno de simulación riguroso.",
      "bannerBacktestDesc": "Simulación algorítmica cuantitativa sobre 51 ligas y +3 temporadas históricas (2022-2026).",
      "lastUpdated": "ÚLTIMA ACTUALIZACIÓN",
      "kpiTotal": "NÚMERO TOTAL SEÑALES",
      "kpiResolved": "SEÑALES RESUELTAS",
      "kpiWinrate": "WIN RATE GLOBAL",
      "kpiRoi": "ROI HISTÓRICO",
      "kpiDd": "DRAWDOWN MÁXIMO",
      "kpiSample": "TAMAÑO DE MUESTRA",
      "sampleInProgress": "Muestra en curso",
      "tableLeaguesTitle": "🏆 Rendimiento por Liga",
      "tableMarketsTitle": "🎯 Rendimiento por Mercado",
      "tableMonthlyTitle": "📅 Rendimiento Mensual",
      "thLeague": "Liga",
      "thSample": "Muestra",
      "thWinrate": "Win Rate",
      "thRoi": "ROI %",
      "thMarket": "Mercado",
      "thMonth": "Mes",
      "thSignalsWL": "Señales (W/L)",
      "disclaimerTitle": "📌 Aviso Metodológico Obligatorio:",
      "disclaimerText": "\"Los resultados se calculan a partir de las señales registradas por el sistema y no representan garantía de resultados futuros.\""
    },
    "adminModal": {
      "title": "⚙️ PANEL DE ADMINISTRACIÓN & AUDIT LOG",
      "subtitle": "Control de usuarios registrados, licencias, estado del sistema y telemetría inmutable.",
      "thId": "ID Usuario",
      "thEmail": "Correo Electrónico",
      "thName": "Nombre Completo",
      "thPlan": "Plan Actual",
      "thStatus": "Estado Licencia",
      "thExpires": "Fecha Vencimiento",
      "thAction": "Cambiar Nivel de Plan"
    },
    "bankroll": {
      "btnTitle": "💼 Control de Banca",
      "modalTitle": "REGISTRO DE OPERACIONES — CONTROL DE BANCA",
      "modalSubtitle": "Sistema profesional de gestión de capital, análisis estadístico y control estricto de riesgo.",
      "tabDashboard": "📊 Dashboard Financiero",
      "tabOperations": "📝 Registro de Operaciones",
      "tabCalculator": "🧮 Calculadora de Stake",
      "tabConfig": "⚙️ Parámetros de Banca",
      "newOpBtn": "➕ Nueva Operación",
      "exportExcelBtn": "📥 Descargar Excel (.xlsx)",
      "exportCsvBtn": "📄 Exportar CSV",
      "capitalInitial": "Capital Inicial",
      "capitalCurrent": "Capital Actual",
      "totalPnl": "Resultado Neto (P&L)",
      "totalProfit": "Ganancias Brutas",
      "totalLoss": "Pérdidas Brutas",
      "roi": "ROI Global %",
      "yield": "Yield Total",
      "winrate": "Tasa de Acierto (Win%)",
      "exposure": "Exposición en Juego",
      "availableCap": "Capital Disponible",
      "committedCap": "Capital Comprometido",
      "maxDrawdown": "Drawdown Máximo",
      "profitFactor": "Profit Factor",
      "ev": "Expectativa Matemática (EV)",
      "calcTitle": "🧮 Calculadora de Gestión de Riesgo y Stake",
      "calcDesc": "Dimensionamiento matemático de posición. Nunca aumenta el monto tras una pérdida (Regla Anti-Martingala).",
      "suggestedStake": "Monto Sugerido (Stake)",
      "riskValidation": "Validación de Riesgo",
      "calcCapLabel": "Capital Disponible ($)",
      "calcRiskLabel": "Perfil de Riesgo",
      "calcOddsLabel": "Cuota / Multiplicador",
      "calcRetPotential": "Retorno Potencial",
      "calcNetProfit": "Ganancia Neta",
      "calcMaxLoss": "Pérdida Máxima",
      "calcProfileConservative": "Conservador (2.00%)",
      "calcProfileUltra": "Ultra Conservador (1.00%)",
      "calcProfileModerate": "Moderado (3.00%)",
      "calcProfileModerateHigh": "Moderado Alto (4.00%)",
      "calcProfileCustom": "Personalizado (%)",
      "cfgTitle": "⚙️ Parámetros de Gestión de Banca y Riesgo",
      "cfgDesc": "Establece las reglas de control de capital y los límites de pérdida que dispararán alertas preventivas.",
      "cfgCurrency": "🌎 Moneda / Divisa Principal",
      "cfgInitialCap": "Capital Inicial",
      "cfgSecurityCap": "Capital Mínimo Stop-Bank",
      "cfgMaxStake": "% Máximo Permitido por Operación",
      "cfgRecStake": "% Recomendado por Operación",
      "cfgDailyLimit": "Límite de Pérdida Diaria ($)",
      "cfgWeeklyLimit": "Límite de Pérdida Semanal ($)",
      "cfgSaveBtn": "💾 Guardar Parámetros"
    }
  },
  "en": {
    "appTitle": "Streak Tracker",
    "planLabel": "Plan:",
    "plans": {
      "BASIC": "FREE Plan ($0)",
      "PRO": "PRO Plan ($19)",
      "VIP": "VIP Plan ($39)"
    },
    "header": {
      "indicators": "Indicators:",
      "logout": "🚪 Log Out",
      "whichMarket": "📖 Which Market to Trade?",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Public Audit",
      "academy": "🎓 Risk Academy",
      "bankroll": "💼 Bankroll Tracker",
      "exportCsv": "📥 Export CSV",
      "telegram": "🤖 Telegram Bot",
      "pricing": "💎 Upgrade Plans",
      "refreshTitle": "Refresh all leagues telemetry now",
      "manageLeagues": "Manage Leagues",
      "dailyReport": "📊 Daily Matchday Report",
      "transparency": "🔍 Transparency & Results",
      "portalWeb": "🌐 Web Portal",
      "adminPanel": "⚙️ Admin Panel"
    },
    "trialBanner": {
      "title": "Free Trial Active",
      "countdown": "Your trial expires in {days} days.",
      "upgradePro": "⚡ Upgrade to PRO ($19/mo)",
      "upgradeVip": "👑 Upgrade to VIP ($39/mo)"
    },
    "actions": {
      "exportCsv": "📥 Export CSV",
      "pricing": "💎 Upgrade Plans",
      "refresh": "🔄 Refresh",
      "manageLeagues": "Manage Leagues",
      "telegramBot": "🤖 Telegram Bot",
      "bankroll": "💼 Bankroll Tracker",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Public Audit",
      "academy": "🎓 Risk Academy",
      "close": "✓ OK"
    },
    "filters": {
      "searchPlaceholder": "🔍 Search league or country...",
      "searchBtn": "🔍 Search",
      "all": "🔘 All Leagues",
      "highAlerts": "🟢 Green / Blue Alerts (All)",
      "highToday": "🟢🔵 Today's High Alerts",
      "liveOnly": "🔴 Live Only",
      "upcomingOnly": "📅 With Upcoming Fixtures",
      "operating": "⚡ In Operation",
      "todayOnly": "🔥 Today's Matches",
      "todayBadge": "🔥 PLAYS TODAY"
    },
    "opportunitiesCenter": {
      "title": "OPPORTUNITY RADAR",
      "subtitle": "Multi-criteria algorithmic ranking (Signal Score, Confidence, Sample Size, League Tier & Kickoff).",
      "detectedBadge": "detected",
      "fAll": "🔘 ALL",
      "fPremium": "🟢 PREMIUM",
      "fStrong": "🔵 STRONG",
      "fLive": "🔴 LIVE",
      "fUpcoming": "📅 UPCOMING",
      "fOperating": "⚡ IN PROGRESS",
      "operatingTag": "OPERATING:",
      "inProgressBadge": "TRACKING",
      "monitoringBreak": "⚡ Tracking until break (Streak: {streak})",
      "deactivateBtn": "⏸️ Deactivate",
      "startTradeHeader": "START TRADE:",
      "validatedSignal": "✅ Validated Signal (Streak: {streak}) • Suggested Odds: @{odds}",
      "activateBtn": "⚡ Activate",
      "startBtn": "🚀 Start Trade",
      "currentStreakLabel": "CURRENT STREAK",
      "matchesSuffix": "matches",
      "sampleSizeLabel": "HISTORICAL SAMPLE",
      "casesSuffix": "cases",
      "winrateLabel": "HIST. WIN RATE",
      "roiLabel": "HISTORICAL ROI",
      "suggestedOddsLabel": "ESTIMATED ODDS",
      "leagueQualityLabel": "LEAGUE TIER",
      "pushAlertTitle": "🔔 Set Push Alert (10 min before)",
      "noOpportunities": "No opportunities found matching the selected filter."
    },
    "dashboard": {
      "title": "LEAGUE TRACKERS",
      "subtitle": "Real-Time Quantitative Monitoring",
      "clickToOpp": "👉 Click to view {league} opportunities in Opportunity Radar",
      "waitingSchedule": "Awaiting schedule confirmation",
      "noLiveMatches": "No live matches currently in progress.",
      "noUpcoming": "No upcoming fixtures scheduled"
    },
    "operationalMarkets": {
      "draw": "🎯 Trade: Full Time Draw (X)",
      "over35": "🎯 Trade: Over 3.5 Goals",
      "htDraw": "🎯 Trade: Half Time Draw (HT)",
      "bttsOver25": "🎯 Trade: Both Teams To Score + >2.5",
      "btts1H": "🎯 Trade: 1st Half BTTS"
    },
    "actionGuide": {
      "title": "Execution Guide: Target Markets",
      "subtitle": "How to interpret anomaly alerts and execute the optimal market?",
      "rule": "Quantitative Rule: When a league accumulates an extended drought without an event (anomaly), the statistical probability of reversion increases sharply. The order to place is the breaking event."
    },
    "markets": {
      "draw": "No Draw (FT)",
      "over35": "Under 3.5 Goals",
      "htDraw": "No Draw (HT)",
      "bttsOver25": "No BTTS + >2.5 Goals",
      "btts1H": "No 1st Half BTTS"
    },
    "streaks": {
      "negativeStreaksTitle": "Trackers • Opportunity Alerts:",
      "brokenAt": "Broken at:",
      "matchesUnit": "match(es)",
      "lockedBadge": "🔒 Unlock in PRO",
      "noLiveMatches": "No live fixtures active right now.",
      "upcomingPrefix": "Next up:",
      "oneClickBankrollBtn": "⚡ Add to Bankroll",
      "recentRoundsTitle": "Recent Rounds (Matchday Results)",
      "viewHistoryBtn": "📊 View Past 3 Rounds",
      "hideHistoryBtn": "▲ Hide Results",
      "loadingHistory": "Loading league round history...",
      "noHistoryAvailable": "No recorded matchday results found.",
      "fullscreenBtn": "⛶ Fullscreen View",
      "sortAscBtn": "▲ Date: Oldest to Newest",
      "sortDescBtn": "▼ Date: Newest to Oldest",
      "closeFullscreenBtn": "✕ Close",
      "closeDropdownBtn": "✕ Close History",
      "nextRoundTitle": "Next Scheduled Matchday",
      "nextRoundBadge": "NEXT ROUND",
      "previousRoundsBadge": "PAST ROUND"
    },
    "counters": {
      "orange": "Orange",
      "yellow": "Yellow",
      "blue": "Blue",
      "green": "Green"
    },
    "newOpModal": {
      "title": "➕ Log New Trade",
      "date": "Date",
      "time": "Time",
      "category": "Category",
      "operationType": "Trade Type",
      "desc": "Fixture / Description",
      "market": "Market / Segment",
      "stake": "Stake Amount ($)",
      "odds": "Decimal Odds",
      "status": "Initial Status",
      "notes": "Notes (Optional)",
      "cancelBtn": "Cancel",
      "saveBtn": "💾 Save Trade"
    },
    "leaguesModal": {
      "title": "Active Monitored Leagues",
      "selectAll": "Select All Leagues",
      "requireElite": "(🔒 Requires VIP Plan)",
      "limitBasicAlert": "🔒 On the FREE Plan you can monitor up to 5 leagues. Upgrade to PRO for 15 leagues or VIP for all 51 official leagues!",
      "limitProAlert": "🔒 On the PRO Plan you have a limit of 15 active leagues. Upgrade to VIP to monitor all 51 official leagues!",
      "requireEliteAlert": "🔒 \"Select All\" is exclusively available for VIP subscribers (51 official worldwide leagues)."
    },
    "telegramModal": {
      "title": "Telegram VIP Signal Bot Simulator",
      "subtitle": "Preview how automated real-time signals are delivered to subscriber channels.",
      "botStatus": "Bot Online • 24/7 Real-Time Telemetry",
      "channelTitle": "🏆 StreakTracker VIP Signals",
      "generateBtn": "🔔 Generate Live Signal",
      "copyBtn": "📋 Copy Signal",
      "copiedNotice": "Copied to clipboard!",
      "alertTitleGreen": "🚨 GREEN ALERT (MAXIMUM PROBABILITY)",
      "alertTitleBlue": "⚡ BLUE ALERT (HIGH VALUE REVERSION)",
      "leagueLabel": "⚽ League:",
      "marketLabel": "📊 Market:",
      "streakLabel": "🔥 Streak:",
      "nextMatchLabel": "⏰ Next Fixture:",
      "suggestionLabel": "💡 Recommendation:",
      "suggestionGreen": "Extreme statistical mean reversion probability. High value target.",
      "suggestionBlue": "Mature streak. Favorable risk/reward on streak break.",
      "footerNote": "🤖 Signal generated by StreakTracker Quantitative Engine"
    },
    "pricingModal": {
      "title": "💎 Subscription Plans",
      "subtitle": "Unlock quantitative real-time edge and maximize your mathematical advantage."
    },
    "pricingModalDetails": {
      "title": "💎 Subscription Plans",
      "subtitle": "Unlock quantitative real-time edge and maximize your mathematical advantage.",
      "badgePopular": "POPULAR",
      "badgeAllIncluded": "ALL INCLUSIVE",
      "free": {
        "name": "⚪ FREE",
        "price": "$0.00",
        "period": "/ mo",
        "desc": "Introductory tier to explore platform capabilities.",
        "features": [
          "✓ Up to 5 active leagues",
          "✓ Basic streak metrics & statistics",
          "✓ 2 observable opportunities per day",
          "✓ Basic position sizing calculator",
          "✕ PREMIUM and STRONG alerts locked",
          "✕ No Historical Backtesting suite",
          "✕ No VIP Telegram signal alerts",
          "✕ No daily matchday audit reports"
        ],
        "btn": "Activate FREE Plan"
      },
      "pro": {
        "name": "🔵 PRO",
        "price": "$19.00",
        "period": "/ mo",
        "desc": "For quantitative traders seeking higher signal flow and analytics.",
        "features": [
          "✓ Up to 15 simultaneous active leagues",
          "✓ STRONG alerts unlocked (🔵 Blue)",
          "✓ Advanced telemetry & statistics",
          "✓ Extended filters & Opportunity Radar",
          "✓ Extended Backtesting Suite (+3 Seasons)",
          "✓ Bankroll tracking up to 50 operations",
          "✓ 📥 Official Excel Workbook export (.xlsx)",
          "✕ No VIP Telegram Bot integration"
        ],
        "btn": "Activate PRO Plan"
      },
      "vip": {
        "name": "🟢 VIP",
        "price": "$39.00",
        "period": "/ mo",
        "desc": "The ultimate suite for professional traders and betting syndicates.",
        "features": [
          "✓ All 50+ worldwide leagues unlocked",
          "✓ 100% PREMIUM signals unlocked (🟢 Green)",
          "✓ Instant priority push alerts",
          "✓ Complete statistical & institutional intelligence",
          "✓ 🤖 Real-time VIP Telegram Bot integration",
          "✓ Full history & immutable signal ledger",
          "✓ UNLIMITED advanced bankroll management",
          "✓ 📊 Professional Matchday Reports & Balance"
        ],
        "btn": "Activate VIP Plan"
      }
    },
    "guideModal": {
      "title": "📖 OFFICIAL GUIDE: TARGET MARKETS",
      "subtitle": "Direct relationship between detected statistical anomaly and market execution.",
      "principleTitle": "📌 Quantitative Mean Reversion Principle:",
      "principleDesc": "StreakTracker detects leagues accumulating anomalous sequences of matches without a specific event. When an alert reaches Green / Blue status, your market order is the break event:",
      "steps": [
        {
          "title": "1. Streak: No Draw (FT)",
          "badge": "🎯 TARGET MARKET: FULL TIME DRAW (X)",
          "desc": "League has accumulated extensive matches without drawing. Back the Full Time Draw (Typical odds: 3.10 - 3.60)."
        },
        {
          "title": "2. Streak: Under 3.5 Goals",
          "badge": "🎯 TARGET MARKET: OVER 3.5 GOALS",
          "desc": "League is on a goal drought of ≤ 3 goals. Back Over 3.5 Total Goals (Typical odds: 2.60 - 3.40)."
        },
        {
          "title": "3. Streak: No Half Time Draw (HT)",
          "badge": "🎯 TARGET MARKET: 1st HALF DRAW (HT)",
          "desc": "Back a tied scoreline at half time (0-0, 1-1, etc.) (Typical odds: 2.00 - 2.40)."
        },
        {
          "title": "4. Streak: No BTTS + >2.5 Goals",
          "badge": "🎯 TARGET MARKET: BOTH TEAMS TO SCORE & OVER 2.5",
          "desc": "Back the combo market Both Teams Score + Over 2.5 Goals (Typical odds: 2.10 - 2.80)."
        },
        {
          "title": "5. Streak: No 1st Half BTTS",
          "badge": "🎯 TARGET MARKET: BOTH TEAMS SCORE IN 1st HALF",
          "desc": "Back both teams to score before the 45th minute (High value odds: 4.00 - 5.50)."
        }
      ],
      "understandBtn": "Understood"
    },
    "checkoutModal": {
      "title": "💳 Subscription Checkout",
      "subtitle": "Account registration and quantitative tier activation.",
      "planSelectedLabel": "Selected Tier:",
      "totalToPayLabel": "Total to Pay:",
      "fullNameLabel": "Full Name:",
      "fullNamePlaceholder": "e.g. John Doe",
      "emailLabel": "Email Address:",
      "emailPlaceholder": "your.email@example.com",
      "paymentMethodLabel": "Payment Method:",
      "stripeLabel": "💳 Credit Card (Stripe)",
      "mercadopagoLabel": "🤝 Mercado Pago",
      "sslNotice": "🔒 Secure SSL Environment (Demo Sandbox Mode)",
      "submitBtn": "🚀 Confirm & Activate Subscription",
      "successTitle": "Subscription Activated Successfully!",
      "successMsg": "Your tier has been activated for 30 days. All tools and signals are ready for use.",
      "goToDashboardBtn": "✓ Go to Dashboard"
    },
    "pushNotifyModal": {
      "title": "Configure Push Alert",
      "subtitle": "Automatic notification 10 minutes prior to kickoff.",
      "nextFixtureLabel": "Next Fixture / Opportunity:",
      "targetMarketLabel": "🎯 Target Market",
      "timeLabel": "📅 Kickoff Time",
      "opt10minTitle": "⏰ Notify 10 minutes before kickoff",
      "opt10minDesc": "Audible chime and screen push alert to prepare position.",
      "optLiveTitle": "🔴 Notify when match goes LIVE",
      "optLiveDesc": "Real-time notification when match officially starts (00').",
      "optGoalTitle": "⚽ Notify on every GOAL",
      "optGoalDesc": "Instant goal notification with updated scoreline (e.g. 1-0, 1-1).",
      "optFtTitle": "🏁 Notify when match ends (FT)",
      "optFtDesc": "Final whistle notification with win/loss streak resolution.",
      "cancelBtn": "Cancel",
      "saveBtn": "🔔 Enable Push Alert"
    },
    "dailyReportModal": {
      "title": "📊 MATCHDAY AUDIT & BALANCE (00:00 - 23:59)",
      "subtitle": "Historical audit of opening alerts, newly generated signals, and broken streaks upon day close.",
      "periodDay": "📅 Today (Current Day)",
      "periodWeek": "🗓️ Past 7 Days (Week)",
      "periodMonth": "📈 Past 30 Days (Month)",
      "periodCustom": "🔍 Custom Date Range",
      "exportBtn": "📥 Export Professional Report (CSV)",
      "dateFrom": "From:",
      "dateTo": "To:",
      "dateFilterBtn": "🔍 Filter",
      "dateClearBtn": "✕ Clear",
      "snapOpen": "🌅 OPENING (00:00)",
      "snapGen": "⚡ GENERATED (New)",
      "snapCut": "✂️ RESOLVED (Broken)",
      "snapClose": "🌙 CLOSING (23:59 Active)",
      "alertsUnit": "Alerts",
      "newsUnit": "New",
      "cutsUnit": "Breaks",
      "vivasUnit": "Active",
      "kpiTitle": "📈 Quantitative Matchday Balance",
      "kpiSub": "*Derived from Immutable Signal Ledger",
      "kpiTotal": "TOTAL SIGNALS",
      "kpiWinLoss": "WON / LOST",
      "kpiWinrate": "WIN RATE %",
      "kpiRoi": "ESTIMATED ROI",
      "kpiProfit": "PROFIT / LOSS",
      "kpiPf": "PROFIT FACTOR",
      "kpiDd": "MAX DRAWDOWN",
      "kpiPremium": "PREMIUM SIGNALS",
      "distLeagues": "🏆 Breakdown by League:",
      "distMarkets": "🎯 Breakdown by Market:",
      "tableHeading": "📋 Detailed Matchday Breakdown by League",
      "thDate": "Date / Day",
      "thLeague": "League / Country",
      "thOpen": "Open (00:00)",
      "thGen": "Generated",
      "thCut": "Broken (23:59)",
      "thClose": "Current Close",
      "noAlerts": "No alerts recorded in this selected period"
    },
    "backtestModal": {
      "title": "📈 BACKTESTING & HISTORICAL PERFORMANCE",
      "subtitle": "Quantitative simulation and empirical backtest across 3+ full seasons in 50+ official leagues.",
      "tagHistorical": "HISTORICAL RESULT / BACKTEST",
      "lblLeague": "1. League",
      "lblMarket": "2. Market",
      "lblSeason": "3. Season",
      "lblOdds": "4. Odds Range",
      "lblTier": "5. Signal Tier",
      "lblStake": "6. Stake %",
      "optAllLeagues": "🌐 All 50+ Leagues",
      "optAllSeasons": "📅 All (Past 3+ seasons)",
      "optAllOdds": "🎲 All Odds",
      "optLowOdds": "Conservative (< 2.00)",
      "optMidOdds": "Balanced (2.00 - 3.50)",
      "optHighOdds": "High Value (> 3.50)",
      "optAllTiers": "⚡ All Tiers",
      "optPremTier": "🟢 PREMIUM Only (90-100)",
      "optStrongTier": "🔵 STRONG Only (75-89)",
      "optObsTier": "🟡 OBSERVABLE (60-74)",
      "optStake1": "1.00% (Conservative)",
      "optStake2": "2.00% (Moderate)",
      "optStake3": "3.00% (Aggressive)",
      "kpiAccumYield": "Accumulated Yield",
      "kpiWinRate": "Win Rate %",
      "kpiAvgOdds": "Weighted Avg Odds",
      "kpiTotalRoi": "Total ROI %",
      "kpiPf": "Profit Factor",
      "kpiEv": "Expected Value / Trade",
      "kpiDrawdown": "Max Drawdown",
      "kpiStreaks": "Streak Extremes",
      "kpiCapFlow": "Starting ➔ Final Capital",
      "subYield": "Historical Signals",
      "subWinLoss": "Won / Lost",
      "subOdds": "Average multiplier",
      "subRoi": "Return on investment",
      "subPf": "Gross Profit / Loss",
      "subEv": "Average EV per trade",
      "subDd": "Controlled (< 15%)",
      "subStreaks": "Max Win / Loss streak",
      "subCapFlow": "Growth simulation",
      "robTitle": "STRATEGY ROBUSTNESS",
      "robBadgeRobust": "ROBUST",
      "robSample": "LINKED SAMPLE SIZE",
      "robSampleAdequacy": "Broad Sample",
      "robSeason": "SEASON STABILITY",
      "robSeasonSub": "Year-over-year consistency",
      "robLeague": "LEAGUE STABILITY",
      "robLeagueSub": "Multi-league generalization",
      "robOdds": "ODDS RANGE STABILITY",
      "robOddsSub": "Bias resistance",
      "robSummary": "Diagnostic: High statistical significance with excellent multi-year consistency and strict drawdown control.",
      "chartTitle": "Capital Growth Equity Curve (Starting Capital: $1,000)",
      "chartSub": "*Strict quantitative execution without martingale",
      "disclaimer": "*Methodological Notice: Displayed performance is based on historical quantitative backtesting. Past performance does not guarantee future results."
    },
    "auditModal": {
      "title": "🛡️ PUBLIC AUDIT & VERIFIED TRACK RECORD",
      "subtitle": "Transparent, chronological, and immutable ledger of signals issued by the algorithm.",
      "statTotal": "AUDITED SIGNALS",
      "statWon": "WON SIGNALS",
      "statLost": "LOST SIGNALS",
      "statYield": "NET YIELD / RETURN",
      "filterAll": "🔘 All",
      "filterWon": "✅ Won",
      "filterLost": "❌ Lost",
      "footnote": "*Audited verification with authentic market closing odds",
      "thSignalId": "signal_id",
      "thTimestamp": "timestamp",
      "thLeague": "league",
      "thSeason": "season",
      "thMatch": "fixture",
      "thMarket": "market",
      "thStreak": "streak",
      "thScore": "score",
      "thConfidence": "confidence",
      "thOdds": "odds_at_entry",
      "thProbability": "implied_prob",
      "thFinalResult": "final_score",
      "thSignalResult": "signal_result",
      "thRoi": "ROI",
      "thStatus": "status"
    },
    "academyModal": {
      "title": "🎓 ANTI-RUIN RISK ACADEMY & CAPITAL MANAGEMENT",
      "subtitle": "5 essential masterclasses to preserve bankroll and compound long-term returns."
    },
    "transparencyModal": {
      "title": "🔍 TRANSPARENCY & VERIFIED TRACK RECORD",
      "subtitle": "StreakTracker audited performance segregated strictly by quantitative methodological track.",
      "trackReal": "🛡️ REAL RESULTS (Immutable Ledger)",
      "trackPaper": "🧪 PAPER TRADING (Forward Test)",
      "trackBacktest": "📈 BACKTEST (3-Season Historical)",
      "bannerRealDesc": "Audited and settled signals directly verified on StreakTracker's official Immutable Ledger.",
      "bannerPaperDesc": "Real-time signals captured at open odds in a strict zero-risk forward testing sandbox.",
      "bannerBacktestDesc": "Quantitative multi-season simulation across 51 worldwide leagues and +3 complete seasons.",
      "lastUpdated": "LAST UPDATED",
      "kpiTotal": "TOTAL SIGNALS",
      "kpiResolved": "RESOLVED SIGNALS",
      "kpiWinrate": "OVERALL WIN RATE",
      "kpiRoi": "HISTORICAL ROI",
      "kpiDd": "MAX DRAWDOWN",
      "kpiSample": "SAMPLE SIZE",
      "sampleInProgress": "Sample in progress",
      "tableLeaguesTitle": "🏆 Breakdown by League",
      "tableMarketsTitle": "🎯 Breakdown by Market",
      "tableMonthlyTitle": "📅 Monthly Performance",
      "thLeague": "League",
      "thSample": "Sample",
      "thWinrate": "Win Rate",
      "thRoi": "ROI %",
      "thMarket": "Market",
      "thMonth": "Month",
      "thSignalsWL": "Signals (W/L)",
      "disclaimerTitle": "📌 Mandatory Methodological Notice:",
      "disclaimerText": "\"Results are calculated from recorded system signals and do not represent a guarantee of future performance.\""
    },
    "adminModal": {
      "title": "⚙️ ADMIN CONTROL PANEL & AUDIT LOG",
      "subtitle": "User management, subscription tiers, system health, and immutable telemetry.",
      "thId": "User ID",
      "thEmail": "Email Address",
      "thName": "Full Name",
      "thPlan": "Current Plan",
      "thStatus": "License Status",
      "thExpires": "Expiration Date",
      "thAction": "Change Tier"
    },
    "bankroll": {
      "btnTitle": "💼 Bankroll Tracker",
      "modalTitle": "TRADE LOG — BANKROLL MANAGEMENT",
      "modalSubtitle": "Professional capital management, statistical analytics, and strict drawdown risk control.",
      "tabDashboard": "📊 Financial Dashboard",
      "tabOperations": "📝 Trade Journal",
      "tabCalculator": "🧮 Stake Sizing Calculator",
      "tabConfig": "⚙️ Bankroll Parameters",
      "newOpBtn": "➕ Log New Trade",
      "exportExcelBtn": "📥 Download Excel (.xlsx)",
      "exportCsvBtn": "📄 Export CSV",
      "capitalInitial": "Starting Capital",
      "capitalCurrent": "Current Capital",
      "totalPnl": "Net Result (P&L)",
      "totalProfit": "Gross Profit",
      "totalLoss": "Gross Loss",
      "roi": "Total ROI %",
      "yield": "Total Yield",
      "winrate": "Win Rate %",
      "exposure": "Open Risk Exposure",
      "availableCap": "Available Capital",
      "committedCap": "Committed Capital",
      "maxDrawdown": "Max Drawdown",
      "profitFactor": "Profit Factor",
      "ev": "Expected Value (EV)",
      "calcTitle": "🧮 Risk Management & Stake Calculator",
      "calcDesc": "Mathematical position sizing. Never increases stake after a loss (Strict Anti-Martingale Rule).",
      "suggestedStake": "Suggested Stake",
      "riskValidation": "Risk Validation",
      "calcCapLabel": "Available Bankroll ($)",
      "calcRiskLabel": "Risk Profile",
      "calcOddsLabel": "Decimal Odds / Multiplier",
      "calcRetPotential": "Potential Return",
      "calcNetProfit": "Net Profit",
      "calcMaxLoss": "Maximum Loss",
      "calcProfileConservative": "Conservative (2.00%)",
      "calcProfileUltra": "Ultra Conservative (1.00%)",
      "calcProfileModerate": "Moderate (3.00%)",
      "calcProfileModerateHigh": "Moderate High (4.00%)",
      "calcProfileCustom": "Custom (%)",
      "cfgTitle": "⚙️ Bankroll Management & Risk Rules",
      "cfgDesc": "Set capital protection rules and stop-loss limits that trigger protective alerts.",
      "cfgCurrency": "🌎 Primary Currency",
      "cfgInitialCap": "Starting Capital",
      "cfgSecurityCap": "Minimum Stop-Bank Floor",
      "cfgMaxStake": "Max Allowed % per Trade",
      "cfgRecStake": "Recommended % per Trade",
      "cfgDailyLimit": "Daily Loss Limit ($)",
      "cfgWeeklyLimit": "Weekly Loss Limit ($)",
      "cfgSaveBtn": "💾 Save Parameters"
    }
  },
  "pt": {
    "appTitle": "Rastreador de Sequências",
    "planLabel": "Plano:",
    "plans": {
      "BASIC": "Plano FREE ($0)",
      "PRO": "Plano PRO ($19)",
      "VIP": "Plano VIP ($39)"
    },
    "header": {
      "indicators": "Indicadores:",
      "logout": "🚪 Sair",
      "whichMarket": "📖 Qual Mercado Operar?",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoria",
      "academy": "🎓 Academia",
      "bankroll": "💼 Gestão de Banca",
      "exportCsv": "📥 Exportar CSV",
      "telegram": "🤖 Bot Telegram",
      "pricing": "💎 Ver Planos",
      "refreshTitle": "Atualizar dados das ligas agora",
      "manageLeagues": "Gerenciar Ligas",
      "dailyReport": "📊 Relatório da Rodada",
      "transparency": "🔍 Transparência & Resultados",
      "portalWeb": "🌐 Portal Web",
      "adminPanel": "⚙️ Painel Admin"
    },
    "trialBanner": {
      "title": "Período de Teste Gratuito Ativo",
      "countdown": "Seu teste termina em {days} dias.",
      "upgradePro": "⚡ Atualizar para PRO ($19/m)",
      "upgradeVip": "👑 Atualizar para VIP ($39/m)"
    },
    "actions": {
      "exportCsv": "📥 Exportar CSV",
      "pricing": "💎 Ver Planos",
      "refresh": "🔄 Atualizar",
      "manageLeagues": "Gerenciar Ligas",
      "telegramBot": "🤖 Bot Telegram",
      "bankroll": "💼 Gestão de Banca",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoria",
      "academy": "🎓 Academia",
      "close": "✓ Aceitar"
    },
    "filters": {
      "searchPlaceholder": "🔍 Buscar liga ou país...",
      "searchBtn": "🔍 Buscar",
      "all": "🔘 Todas as Ligas",
      "highAlerts": "🟢 Alertas Verdes / Azuis (Todas)",
      "highToday": "🟢🔵 Alertas Verdes / Azuis de Hoje",
      "liveOnly": "🔴 Apenas Ao Vivo",
      "upcomingOnly": "📅 Com Próximos Jogos",
      "operating": "⚡ Operando",
      "todayOnly": "🔥 Jogos de Hoje",
      "todayBadge": "🔥 JOGA HOJE"
    },
    "opportunitiesCenter": {
      "title": "CENTRO DE OPORTUNIDADES",
      "subtitle": "Ranking algorítmico multicritério (Signal Score, Confiança, Amostra, Qualidade da Liga e Horário).",
      "detectedBadge": "detectadas",
      "fAll": "🔘 TODAS",
      "fPremium": "🟢 PREMIUM",
      "fStrong": "🔵 FORTES",
      "fLive": "🔴 AO VIVO",
      "fUpcoming": "📅 PRÓXIMAS",
      "fOperating": "⚡ OPERANDO",
      "operatingTag": "OPERANDO:",
      "inProgressBadge": "EM ANDAMENTO",
      "monitoringBreak": "⚡ Monitorando até a quebra (Sequência: {streak})",
      "deactivateBtn": "⏸️ Desativar",
      "startTradeHeader": "INICIAR OPERAÇÃO:",
      "validatedSignal": "✅ Sinal Validado (Sequência: {streak}) • Odd sugerida: @{odds}",
      "activateBtn": "⚡ Ativar",
      "startBtn": "🚀 Iniciar",
      "currentStreakLabel": "SEQUÊNCIA ATUAL",
      "matchesSuffix": "jogos",
      "sampleSizeLabel": "AMOSTRA HISTÓRICA",
      "casesSuffix": "casos",
      "winrateLabel": "WIN RATE HIST.",
      "roiLabel": "ROI HISTÓRICO",
      "suggestedOddsLabel": "ODD ESTIMADA",
      "leagueQualityLabel": "QUALIDADE LIGA",
      "pushAlertTitle": "🔔 Configurar Alerta Push (10 min antes)",
      "noOpportunities": "Nenhuma oportunidade encontrada com o filtro selecionado."
    },
    "dashboard": {
      "title": "RASTREADORES",
      "subtitle": "Monitoramento Ao Vivo por Liga",
      "clickToOpp": "👉 Clique para ver as oportunidades de {league} no Centro de Oportunidades",
      "waitingSchedule": "Aguardando confirmação de horário",
      "noLiveMatches": "Atualmente não há jogos ao vivo.",
      "noUpcoming": "Sem jogos agendados"
    },
    "operationalMarkets": {
      "draw": "🎯 Operar: Empate (FT)",
      "over35": "🎯 Operar: Mais de 3.5 gols",
      "htDraw": "🎯 Operar: Empate (1T)",
      "bttsOver25": "🎯 Operar: Ambas Marcam + >2.5",
      "btts1H": "🎯 Operar: Ambas Marcam (1T)"
    },
    "actionGuide": {
      "title": "Guia de Execução: Mercados de Operação",
      "subtitle": "Como interpretar os Alertas de Oportunidade e qual mercado operar?",
      "rule": "Princípio Estatístico: Quando uma liga acumula uma sequência prolongada sem a ocorrência de um evento (anomalia), a probabilidade estatística de quebra aumenta e o mercado a operar é o evento oposto que romperá a sequência."
    },
    "markets": {
      "draw": "Sem Empate (FT)",
      "over35": "Menos de 3.5 gols",
      "htDraw": "Sem Empate (HT)",
      "bttsOver25": "Sem BTTS + >2.5 Gols",
      "btts1H": "Sem BTTS (1º Tempo)"
    },
    "streaks": {
      "negativeStreaksTitle": "Rastreadores • Alertas de Oportunidade:",
      "brokenAt": "Quebrou em:",
      "matchesUnit": "jogo(s)",
      "lockedBadge": "🔒 Desbloquear no PRO",
      "noLiveMatches": "Atualmente não há jogos ao vivo.",
      "upcomingPrefix": "Próximos:",
      "oneClickBankrollBtn": "⚡ Operar na Banca",
      "recentRoundsTitle": "Últimas Rodadas (Resultados Anteriores)",
      "viewHistoryBtn": "📊 Ver Últimas 3 Rodadas",
      "hideHistoryBtn": "▲ Ocultar Resultados",
      "loadingHistory": "Carregando histórico da liga...",
      "noHistoryAvailable": "Nenhum resultado registrado nas rodadas anteriores.",
      "fullscreenBtn": "⛶ Tela Cheia",
      "sortAscBtn": "▲ Data: Antiga para Recente",
      "sortDescBtn": "▼ Data: Recente para Antiga",
      "closeFullscreenBtn": "✕ Fechar",
      "closeDropdownBtn": "✕ Fechar Rodadas",
      "nextRoundTitle": "Próxima Rodada a Ser Disputada",
      "nextRoundBadge": "PRÓXIMA RODADA",
      "previousRoundsBadge": "RODADA ANTERIOR"
    },
    "counters": {
      "orange": "Laranjas",
      "yellow": "Amarelos",
      "blue": "Azuis",
      "green": "Verdes"
    },
    "newOpModal": {
      "title": "➕ Registrar Nova Operação",
      "date": "Data",
      "time": "Hora",
      "category": "Categoria",
      "operationType": "Tipo Operação",
      "desc": "Descrição / Evento",
      "market": "Mercado / Segmento",
      "stake": "Valor Utilizado ($)",
      "odds": "Odd / Multiplicador",
      "status": "Status Inicial",
      "notes": "Observações (Opcional)",
      "cancelBtn": "Cancelar",
      "saveBtn": "💾 Salvar Operação"
    },
    "leaguesModal": {
      "title": "Ligas Ativas",
      "selectAll": "Selecionar Todas",
      "requireElite": "(🔒 Requer Plano VIP)",
      "limitBasicAlert": "🔒 No Plano FREE você pode monitorar até 5 ligas. Atualize para PRO para 15 ligas ou VIP para todas as 51 ligas oficiais!",
      "limitProAlert": "🔒 No Plano PRO você tem o limite de 15 ligas ativas simultâneas. Atualize para VIP para monitorar todas as 51 ligas oficiais!",
      "requireEliteAlert": "🔒 A opção \"Selecionar Todas\" está disponível exclusivamente no Plano VIP (51 ligas oficiais)."
    },
    "telegramModal": {
      "title": "Simulador de Bot do Telegram VIP",
      "subtitle": "Veja como os sinais automáticos são emitidos para seus canais de assinantes.",
      "botStatus": "Bot Conectado • 24/7 em tempo real",
      "channelTitle": "🏆 StreakTracker VIP Signals",
      "generateBtn": "🔔 Gerar Alerta Ao Vivo",
      "copyBtn": "📋 Copiar Sinal",
      "copiedNotice": "Copiado para a área de transferência!",
      "alertTitleGreen": "🚨 ALERTA VERDE (MÁXIMA PROBABILIDADE)",
      "alertTitleBlue": "⚡ ALERTA AZUL (MERCADO SEGURO)",
      "leagueLabel": "⚽ Liga:",
      "marketLabel": "📊 Mercado:",
      "streakLabel": "🔥 Sequência:",
      "nextMatchLabel": "⏰ Próximo jogo:",
      "suggestionLabel": "💡 Sugestão:",
      "suggestionGreen": "Extrema probabilidade estatística de reversão à média.",
      "suggestionBlue": "Sequência madura. Avalie odds de valor na quebra.",
      "footerNote": "🤖 Alerta gerado automaticamente pelo StreakTracker Engine"
    },
    "pricingModal": {
      "title": "💎 Planos e Assinaturas",
      "subtitle": "Desbloqueie análises quantitativas em tempo real e maximize sua vantagem matemática."
    },
    "pricingModalDetails": {
      "title": "💎 Planos e Assinaturas",
      "subtitle": "Desbloqueie análises quantitativas em tempo real e maximize sua vantagem matemática.",
      "badgePopular": "POPULAR",
      "badgeAllIncluded": "TUDO INCLUÍDO",
      "free": {
        "name": "⚪ FREE",
        "price": "$0.00",
        "period": "/ mês",
        "desc": "Acesso introdutório para explorar a plataforma.",
        "features": [
          "✓ Até 5 ligas ativas",
          "✓ Estatísticas e sequências básicas",
          "✓ 2 oportunidades diárias observáveis",
          "✓ Calculadora de stake básica",
          "✕ Alertas PREMIUM e FORTES bloqueados",
          "✕ Sem Backtesting Histórico avançado",
          "✕ Sem alertas do Telegram VIP",
          "✕ Sem relatórios diários de rodada"
        ],
        "btn": "Ativar Plano FREE"
      },
      "pro": {
        "name": "🔵 PRO",
        "price": "$19.00",
        "period": "/ mês",
        "desc": "Para operadores quantitativos que buscam maior volume de sinais.",
        "features": [
          "✓ Até 15 ligas ativas simultâneas",
          "✓ Alertas FORTES desbloqueados (🔵 Azul)",
          "✓ Estatísticas avançadas e telemetria",
          "✓ Filtros adicionais e Centro de Oportunidades",
          "✓ Módulo de Backtesting Ampliado (+3 Temp)",
          "✓ Gestão de banca até 50 operações",
          "✓ 📥 Download de Planilha Excel Oficial (.xlsx)",
          "✕ Sem Bot do Telegram VIP"
        ],
        "btn": "Ativar Plano PRO"
      },
      "vip": {
        "name": "🟢 VIP",
        "price": "$39.00",
        "period": "/ mês",
        "desc": "A suíte definitiva para traders profissionais e sindicatos.",
        "features": [
          "✓ Todas as 50+ ligas mundiais desbloqueadas",
          "✓ 100% Sinais PREMIUM desbloqueados (🟢 Verde)",
          "✓ Alertas prioritários instantâneos",
          "✓ Informações estatísticas e institucionais completas",
          "✓ 🤖 Integração com Bot do Telegram VIP em tempo real",
          "✓ Histórico completo e auditoria imutável",
          "✓ Ferramentas avançadas de banca ILIMITADAS",
          "✓ 📊 Balanço e Relatórios de Rodada profissionais"
        ],
        "btn": "Ativar Plano VIP"
      }
    },
    "guideModal": {
      "title": "📖 GUIA OFICIAL: MERCADOS A EXECUTAR",
      "subtitle": "Correspondência direta entre a anomalia estatística detectada e a ordem de mercado.",
      "principleTitle": "📌 Princípio Quantitativo de Reversão à Média:",
      "principleDesc": "O rastreador detecta ligas que acumulam anomalias de jogos consecutivos sem a ocorrência de um evento específico. Quando o alerta atinge o nível Verde / Azul, a ordem a executar é o evento de quebra:",
      "steps": [
        {
          "title": "1. Sequência: Sem Empate (FT)",
          "badge": "🎯 MERCADO A OPERAR: EMPATE (X)",
          "desc": "A liga está há muitos jogos sem empatar. Opera-se o Empate no Fim do Jogo (Odd típica: 3.10 - 3.60)."
        },
        {
          "title": "2. Sequência: Menos de 3.5 gols",
          "badge": "🎯 MERCADO A OPERAR: MAIS DE 3.5 GOLS (Over 3.5)",
          "desc": "A liga está com seca de gols (≤ 3 gols). Opera-se Mais de 3.5 Gols Totais (Odd típica: 2.60 - 3.40)."
        },
        {
          "title": "3. Sequência: Sem Empate no Intervalo (HT)",
          "badge": "🎯 MERCADO A OPERAR: EMPATE 1º TEMPO (HT)",
          "desc": "Opera-se o Empate ao intervalo (0-0, 1-1, etc.) (Odd típica: 2.00 - 2.40)."
        },
        {
          "title": "4. Sequência: Sem BTTS + >2.5 Gols",
          "badge": "🎯 MERCADO A OPERAR: AMBAS MARCAM E > 2.5 GOLS",
          "desc": "Opera-se o mercado combinado Ambas as Equipas Marcam + Mais de 2.5 Gols (Odd típica: 2.10 - 2.80)."
        },
        {
          "title": "5. Sequência: Sem BTTS no 1º Tempo",
          "badge": "🎯 MERCADO A OPERAR: AMBAS MARCAM NO 1º TEMPO",
          "desc": "Opera-se que ambas as equipes marcam antes do minuto 45 (Odd de alto valor: 4.00 - 5.50)."
        }
      ],
      "understandBtn": "Entendido"
    },
    "checkoutModal": {
      "title": "💳 Checkout de Assinatura",
      "subtitle": "Registro de conta e ativação de plano quantitativo.",
      "planSelectedLabel": "Plano Selecionado:",
      "totalToPayLabel": "Total a Pagar:",
      "fullNameLabel": "Nome Completo:",
      "fullNamePlaceholder": "Ex. João Silva",
      "emailLabel": "E-mail:",
      "emailPlaceholder": "seu.email@exemplo.com",
      "paymentMethodLabel": "Forma de Pagamento:",
      "stripeLabel": "💳 Cartão de Crédito (Stripe)",
      "mercadopagoLabel": "🤝 Mercado Pago",
      "sslNotice": "🔒 Ambiente Seguro SSL (Modo Demonstração Ativo)",
      "submitBtn": "🚀 Confirmar Registro e Ativar Assinatura",
      "successTitle": "Assinatura Ativada com Sucesso!",
      "successMsg": "Seu plano foi ativado por 30 dias. Todas as ferramentas e alertas estão liberados.",
      "goToDashboardBtn": "✓ Ir para o Painel"
    },
    "pushNotifyModal": {
      "title": "Configurar Alerta Push",
      "subtitle": "Notificação automática 10 minutos antes do início do jogo.",
      "nextFixtureLabel": "Próximo Confronto / Oportunidade:",
      "targetMarketLabel": "🎯 Mercado Alvo",
      "timeLabel": "📅 Horário",
      "opt10minTitle": "⏰ Notificar 10 minutos antes",
      "opt10minDesc": "Alerta sonoro e push na tela para preparar a operação.",
      "optLiveTitle": "🔴 Notificar no início do jogo",
      "optLiveDesc": "Aviso em tempo real quando o jogo passar para Ao Vivo (00').",
      "optGoalTitle": "⚽ Notificar quando sair um GOL",
      "optGoalDesc": "Aviso instantâneo de gol com novo placar (ex. 1-0, 1-1).",
      "optFtTitle": "🏁 Notificar no apito final (FT)",
      "optFtDesc": "Aviso do resultado final e confirmação de acerto/quebra de sequência.",
      "cancelBtn": "Cancelar",
      "saveBtn": "🔔 Ativar Notificação Push"
    },
    "dailyReportModal": {
      "title": "📊 RELATÓRIO E BALANÇO DA RODADA (00:00h - 23:59h)",
      "subtitle": "Auditoria histórica de alertas vivos na abertura, alertas gerados no dia e quebras no encerramento.",
      "periodDay": "📅 Hoje (Rodada Atual)",
      "periodWeek": "🗓️ Últimos 7 Dias (Semana)",
      "periodMonth": "📈 Últimos 30 Dias (Mês)",
      "periodCustom": "🔍 Por Intervalo de Datas",
      "exportBtn": "📥 Exportar Relatório Profissional (CSV)",
      "dateFrom": "De:",
      "dateTo": "Até:",
      "dateFilterBtn": "🔍 Filtrar",
      "dateClearBtn": "✕ Limpar",
      "snapOpen": "🌅 ABERTURA (00:00h)",
      "snapGen": "⚡ GERADAS (Novas)",
      "snapCut": "✂️ RESOLVIDAS (Quebras)",
      "snapClose": "🌙 FECHAMENTO (23:59h Vivas)",
      "alertsUnit": "Alertas",
      "newsUnit": "Novas",
      "cutsUnit": "Quebras",
      "vivasUnit": "Vivas",
      "kpiTitle": "📈 Balanço Quantitativo do Período",
      "kpiSub": "*Baseado no Ledger Imutável de Sinais",
      "kpiTotal": "TOTAL DE SINAIS",
      "kpiWinLoss": "GANHOS / PERDIDOS",
      "kpiWinrate": "WIN RATE %",
      "kpiRoi": "ROI ESTIMADO",
      "kpiProfit": "PROFIT / LOSS",
      "kpiPf": "PROFIT FACTOR",
      "kpiDd": "MAX DRAWDOWN",
      "kpiPremium": "SINAIS PREMIUM",
      "distLeagues": "🏆 Distribuição por Liga:",
      "distMarkets": "🎯 Distribuição por Mercado:",
      "tableHeading": "📋 Detalhamento por Liga & Rodada",
      "thDate": "Data / Dia",
      "thLeague": "Liga / País",
      "thOpen": "Início (00:00)",
      "thGen": "Geradas",
      "thCut": "Quebras (23:59)",
      "thClose": "Fechamento Atual",
      "noAlerts": "Nenhum alerta registrado neste período"
    },
    "backtestModal": {
      "title": "📈 BACKTESTING & DESEMPENHO HISTÓRICO",
      "subtitle": "Simulação quantitativa e validação empírica em mais de 3 temporadas completas nas 50+ ligas oficiais.",
      "tagHistorical": "RESULTADO HISTÓRICO / BACKTEST",
      "lblLeague": "1. Liga",
      "lblMarket": "2. Mercado",
      "lblSeason": "3. Temporada",
      "lblOdds": "4. Faixa de Odds",
      "lblTier": "5. Nível do Sinal",
      "lblStake": "6. Stake %",
      "optAllLeagues": "🌐 Todas as 50+ Ligas",
      "optAllSeasons": "📅 Todas (Últimas 3+ temp)",
      "optAllOdds": "🎲 Todas as odds",
      "optLowOdds": "Conservadoras (< 2.00)",
      "optMidOdds": "Equilibradas (2.00 - 3.50)",
      "optHighOdds": "Alto Valor (> 3.50)",
      "optAllTiers": "⚡ Todos os níveis",
      "optPremTier": "🟢 Apenas PREMIUM (90-100)",
      "optStrongTier": "🔵 Apenas FORTE (75-89)",
      "optObsTier": "🟡 OBSERVÁVEL (60-74)",
      "optStake1": "1.00% (Conservador)",
      "optStake2": "2.00% (Moderado)",
      "optStake3": "3.00% (Agressivo)",
      "kpiAccumYield": "Rendimento Acumulado",
      "kpiWinRate": "Taxa de Acerto (Win Rate)",
      "kpiAvgOdds": "Odd Média Ponderada",
      "kpiTotalRoi": "ROI Total %",
      "kpiPf": "Profit Factor",
      "kpiEv": "Expectativa por Operação",
      "kpiDrawdown": "Drawdown Máximo",
      "kpiStreaks": "Sequências Consecutivas",
      "kpiCapFlow": "Capital Inicial ➔ Final",
      "subYield": "Sinais Históricos",
      "subWinLoss": "Ganhos / Perdidos",
      "subOdds": "Multiplicador médio",
      "subRoi": "Retorno sobre investimento",
      "subPf": "Lucro / Prejuízo bruto",
      "subEv": "Valor esperado médio ($ EV)",
      "subDd": "Sob controle (< 15%)",
      "subStreaks": "Máx. Vitórias / Perdas",
      "subCapFlow": "Simulação de crescimento",
      "robTitle": "ROBUSTEZ DA ESTRATÉGIA",
      "robBadgeRobust": "ROBUSTA",
      "robSample": "TAMANHO DA AMOSTRA VINCULADA",
      "robSampleAdequacy": "Amostra Ampla",
      "robSeason": "ESTABILIDADE POR TEMPORADA",
      "robSeasonSub": "Consistência anual",
      "robLeague": "ESTABILIDADE POR LIGA",
      "robLeagueSub": "Generalização multiligas",
      "robOdds": "ESTABILIDADE POR ODDS",
      "robOddsSub": "Resistência ao viés",
      "robSummary": "Diagnóstico: Alta significância estatística com excelente consistência anual e rígido controle de drawdown.",
      "chartTitle": "Simulação de Evolução de Capital (Banca Inicial: $1,000)",
      "chartSub": "*Execução quantitativa rígida sem martingale",
      "disclaimer": "*Aviso Metodológico: Os resultados apresentados provêm de BACKTESTING HISTÓRICO quantitativo. Desempenho passado não garante resultados futuros."
    },
    "auditModal": {
      "title": "🛡️ AUDITORIA PÚBLICA & TRACK RECORD VERIFICADO",
      "subtitle": "Registro transparente, cronológico e imutável de sinais emitidos pelo algoritmo.",
      "statTotal": "SINAIS AUDITADOS",
      "statWon": "SINAIS ACERTADOS",
      "statLost": "SINAIS PERDIDOS",
      "statYield": "YIELD / RETORNO LÍQUIDO",
      "filterAll": "🔘 Todos",
      "filterWon": "✅ Acertados",
      "filterLost": "❌ Perdidos",
      "footnote": "*Verificação auditada com odds reais de mercado",
      "thSignalId": "signal_id",
      "thTimestamp": "timestamp",
      "thLeague": "liga",
      "thSeason": "temporada",
      "thMatch": "jogo",
      "thMarket": "mercado",
      "thStreak": "sequência",
      "thScore": "score",
      "thConfidence": "confiança",
      "thOdds": "odd_entrada",
      "thProbability": "prob_implícita",
      "thFinalResult": "resultado_final",
      "thSignalResult": "resultado_sinal",
      "thRoi": "ROI",
      "thStatus": "status"
    },
    "academyModal": {
      "title": "🎓 ACADEMIA ANTI-RUÍNA & GESTÃO QUANTITATIVA",
      "subtitle": "5 Masterclasses essenciais para preservar seu capital e maximizar sua lucratividade a longo prazo."
    },
    "transparencyModal": {
      "title": "🔍 TRANSPARÊNCIA E RESULTADOS VERIFICADOS",
      "subtitle": "Desempenho auditado do StreakTracker segregado estritamente por metodologia quantitativa.",
      "trackReal": "🛡️ RESULTADOS REAIS (Ledger Imutável)",
      "trackPaper": "🧪 PAPER TRADING (Forward Test)",
      "trackBacktest": "📈 BACKTEST (Histórico 3 Temp)",
      "bannerRealDesc": "Sinais auditados e liquidados diretamente no Ledger Imutável oficial do StreakTracker.",
      "bannerPaperDesc": "Sinais capturados em tempo real e registrados na odd de abertura em ambiente estrito de simulação.",
      "bannerBacktestDesc": "Simulação algorítmica quantitativa em 51 ligas e +3 temporadas históricas (2022-2026).",
      "lastUpdated": "ÚLTIMA ATUALIZAÇÃO",
      "kpiTotal": "NÚMERO TOTAL DE SINAIS",
      "kpiResolved": "SINAIS RESOLVIDOS",
      "kpiWinrate": "WIN RATE GLOBAL",
      "kpiRoi": "ROI HISTÓRICO",
      "kpiDd": "DRAWDOWN MÁXIMO",
      "kpiSample": "TAMANHO DA AMOSTRA",
      "sampleInProgress": "Amostra em andamento",
      "tableLeaguesTitle": "🏆 Desempenho por Liga",
      "tableMarketsTitle": "🎯 Desempenho por Mercado",
      "tableMonthlyTitle": "📅 Desempenho Mensal",
      "thLeague": "Liga",
      "thSample": "Amostra",
      "thWinrate": "Win Rate",
      "thRoi": "ROI %",
      "thMarket": "Mercado",
      "thMonth": "Mês",
      "thSignalsWL": "Sinais (W/L)",
      "disclaimerTitle": "📌 Aviso Metodológico Obrigatório:",
      "disclaimerText": "\"Os resultados são calculados a partir dos sinais registrados pelo sistema e não representam garantia de lucros futuros.\""
    },
    "adminModal": {
      "title": "⚙️ PAINEL DE ADMINISTRAÇÃO & AUDIT LOG",
      "subtitle": "Gerenciamento de usuários, assinaturas, integridade do sistema e telemetria imutável.",
      "thId": "ID Usuário",
      "thEmail": "E-mail",
      "thName": "Nome Completo",
      "thPlan": "Plano Atual",
      "thStatus": "Status Licença",
      "thExpires": "Expiração",
      "thAction": "Alterar Plano"
    },
    "bankroll": {
      "btnTitle": "💼 Gestão de Banca",
      "modalTitle": "REGISTRO DE OPERAÇÕES — GESTÃO DE BANCA",
      "modalSubtitle": "Sistema profissional de gestão de capital, análise estatística e controle rigoroso de risco.",
      "tabDashboard": "📊 Painel Financeiro",
      "tabOperations": "📝 Diário de Operações",
      "tabCalculator": "🧮 Calculadora de Stake",
      "tabConfig": "⚙️ Parâmetros de Banca",
      "newOpBtn": "➕ Nova Operação",
      "exportExcelBtn": "📥 Baixar Excel (.xlsx)",
      "exportCsvBtn": "📄 Exportar CSV",
      "capitalInitial": "Capital Inicial",
      "capitalCurrent": "Capital Atual",
      "totalPnl": "Resultado Líquido (P&L)",
      "totalProfit": "Lucro Bruto",
      "totalLoss": "Prejuízo Bruto",
      "roi": "ROI Global %",
      "yield": "Yield Total",
      "winrate": "Taxa de Acerto (Win%)",
      "exposure": "Exposição em Aberto",
      "availableCap": "Capital Disponível",
      "committedCap": "Capital Comprometido",
      "maxDrawdown": "Drawdown Máximo",
      "profitFactor": "Profit Factor",
      "ev": "Expectativa Matemática (EV)",
      "calcTitle": "🧮 Calculadora de Gestão de Risco e Stake",
      "calcDesc": "Dimensionamento matemático de posição. Nunca aumenta o valor após uma perda (Regra Anti-Martingale).",
      "suggestedStake": "Valor Sugerido (Stake)",
      "riskValidation": "Validação de Risco",
      "calcCapLabel": "Capital Disponível ($)",
      "calcRiskLabel": "Perfil de Risco",
      "calcOddsLabel": "Odd / Multiplicador",
      "calcRetPotential": "Retorno Potencial",
      "calcNetProfit": "Lucro Líquido",
      "calcMaxLoss": "Perda Máxima",
      "calcProfileConservative": "Conservador (2.00%)",
      "calcProfileUltra": "Ultra Conservador (1.00%)",
      "calcProfileModerate": "Moderado (3.00%)",
      "calcProfileModerateHigh": "Moderado Alto (4.00%)",
      "calcProfileCustom": "Personalizado (%)",
      "cfgTitle": "⚙️ Parâmetros de Gestão de Banca e Risco",
      "cfgDesc": "Defina as regras de proteção de capital e limites de perda que disparam alertas preventivos.",
      "cfgCurrency": "🌎 Moeda Principal",
      "cfgInitialCap": "Capital Inicial",
      "cfgSecurityCap": "Capital Mínimo Stop-Bank",
      "cfgMaxStake": "% Máximo Permitido por Operação",
      "cfgRecStake": "% Recomendado por Operação",
      "cfgDailyLimit": "Limite de Perda Diária ($)",
      "cfgWeeklyLimit": "Limite de Perda Semanal ($)",
      "cfgSaveBtn": "💾 Salvar Parâmetros"
    }
  },
  "gn": {
    "appTitle": "Rastreador de Rachas",
    "planLabel": "Plan:",
    "plans": {
      "BASIC": "Plan FREE ($0)",
      "PRO": "Plan PRO ($19)",
      "VIP": "Plan VIP ($39)"
    },
    "header": {
      "indicators": "Indicadores:",
      "logout": "🚪 Sẽ",
      "whichMarket": "📖 Mba'e Mercado Jaiporuta?",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoría Pública",
      "academy": "🎓 Academia",
      "bankroll": "💼 Banca Ñangareko",
      "exportCsv": "📥 Exportar CSV",
      "telegram": "🤖 Bot Telegram",
      "pricing": "💎 Ehecha Plan-kuéra",
      "refreshTitle": "Embopyahu ligakuéra datos ko'ág̃a",
      "manageLeagues": "Ligas Ñangareko",
      "dailyReport": "📊 Jornada Marandu",
      "transparency": "🔍 Transparencia & Resultados",
      "portalWeb": "🌐 Portal Web",
      "adminPanel": "⚙️ Panel Admin"
    },
    "trialBanner": {
      "title": "Prueba Gratuita Oĩva Hína",
      "countdown": "Nde prueba opáta {days} ára pukukue ryepýpe.",
      "upgradePro": "⚡ Embotuicha PRO-pe ($19/m)",
      "upgradeVip": "👑 Embotuicha VIP-pe ($39/m)"
    },
    "actions": {
      "exportCsv": "📥 Exportar CSV",
      "pricing": "💎 Ehecha Plan-kuéra",
      "refresh": "🔄 Embopyahu",
      "manageLeagues": "Ligas Ñangareko",
      "telegramBot": "🤖 Bot Telegram",
      "bankroll": "💼 Banca Ñangareko",
      "backtest": "📈 Backtesting",
      "audit": "🛡️ Auditoría Pública",
      "academy": "🎓 Academia",
      "close": "✓ Mboaje"
    },
    "filters": {
      "searchPlaceholder": "🔍 Eheka liga térã tetã...",
      "searchBtn": "🔍 Eheka",
      "all": "🔘 Opaite Ligakuéra",
      "highAlerts": "🟢 Alertas Hovy / Hovyũ (Opaite)",
      "highToday": "🟢🔵 Ko'ág̃agua Alerta Hovy / Hovyũ",
      "liveOnly": "🔴 En Vivo Añoite",
      "upcomingOnly": "📅 Partidokuéra Oúva",
      "operating": "⚡ Jaoperahína",
      "todayOnly": "🔥 Ko'árape Oñeha'ãva",
      "todayBadge": "🔥 OHA'Ã KO'ÁG̃A"
    },
    "opportunitiesCenter": {
      "title": "OPORTUNIDADES RENDA",
      "subtitle": "Ranking algorítmico multicriterio (Signal Score, Jerovia, Muestra, Liga Calidad ha Horario).",
      "detectedBadge": "ojetopa",
      "fAll": "🔘 OPAITE",
      "fPremium": "🟢 PREMIUM",
      "fStrong": "🔵 IMBARETE",
      "fLive": "🔴 EN VIVO",
      "fUpcoming": "📅 OÚVA",
      "fOperating": "⚡ JAOPERAHÍNA",
      "operatingTag": "JAOPERAHÍNA:",
      "inProgressBadge": "OJEHÚHINA",
      "monitoringBreak": "⚡ Ñama'ẽ hese opa peve (Racha: {streak})",
      "deactivateBtn": "⏸️ Embopa",
      "startTradeHeader": "EÑEPYRŨ OPERACIÓN:",
      "validatedSignal": "✅ Señal Validada (Racha: {streak}) • Cuota sugerida: @{odds}",
      "activateBtn": "⚡ Emohenda",
      "startBtn": "🚀 Eñepyrũ",
      "currentStreakLabel": "RACHA KO'ÁG̃AGUA",
      "matchesSuffix": "partido",
      "sampleSizeLabel": "MUESTRA HISTÓRICA",
      "casesSuffix": "kaso",
      "winrateLabel": "WIN RATE HIST.",
      "roiLabel": "ROI HISTÓRICO",
      "suggestedOddsLabel": "CUOTA ESTIMADA",
      "leagueQualityLabel": "LIGA CALIDAD",
      "pushAlertTitle": "🔔 Emohenda Push Alerta (10 min mboyve)",
      "noOpportunities": "Ndaipóri oportunidad ko filtro rupive."
    },
    "dashboard": {
      "title": "RASTREADORES",
      "subtitle": "Monitoreo en Vivo Liga-rehe",
      "clickToOpp": "👉 Epoko rehecha haguã {league} oportunidades",
      "waitingSchedule": "Oñeha'arõ hína horario",
      "noLiveMatches": "Ko'ág̃a ndaipóri partido en vivo.",
      "noUpcoming": "Ndaipóri partido oñeprogramáva"
    },
    "operationalMarkets": {
      "draw": "🎯 Operar: Empate (FT)",
      "over35": "🎯 Operar: 3.5 Gol Ári",
      "htDraw": "🎯 Operar: Empate (1T)",
      "bttsOver25": "🎯 Operar: Mokõivéva Omoinge + >2.5",
      "btts1H": "🎯 Operar: Mokõivéva Omoinge (1T)"
    },
    "actionGuide": {
      "title": "Mba'e Mercado Jaiporuta: Guía de Ejecución",
      "subtitle": "Mba'éichapa jahechakuaáta Alertas de Oportunidad ha mba'e mercado jaiporúta?",
      "rule": "Principio Estadístico: Peteĩ liga ohasávo heta partido peteĩ suceso oiko'ỹre (anomalía), probabilidad tuicha ojupi opa haguã pe racha, ha mercado jaiporúva ha'e pe evento opávo pe racha."
    },
    "markets": {
      "draw": "Empate'ỹre (FT)",
      "over35": "3.5 Goles Mboyve",
      "htDraw": "Empate'ỹre (1T)",
      "bttsOver25": "Mokõivéva Omba'apo'ỹre + >2.5",
      "btts1H": "Mokõivéva Omba'apo'ỹre (1T)"
    },
    "streaks": {
      "negativeStreaksTitle": "Rastreadores • Oportunidades Alertas:",
      "brokenAt": "Opáma ko'ápe:",
      "matchesUnit": "partido",
      "lockedBadge": "🔒 Eipe'a PRO-pe",
      "noLiveMatches": "Ko'ág̃a ndaipóri partido en directo.",
      "upcomingPrefix": "Oúva hína:",
      "oneClickBankrollBtn": "⚡ Emoinge Bancape",
      "recentRoundsTitle": "Jornadas Mboyvegua (Resultados)",
      "viewHistoryBtn": "📊 Ehecha 3 Jornadas Mboyve",
      "hideHistoryBtn": "▲ Emoñemi Resultados",
      "loadingHistory": "Oñemboguejy hína liga resultados...",
      "noHistoryAvailable": "Ndaipóri resultado ko'ã jornadas-pe.",
      "fullscreenBtn": "⛶ Pantalla Completa",
      "sortAscBtn": "▲ Fecha: Ymaguare guive Ko'ág̃agua peve",
      "sortDescBtn": "▼ Fecha: Ko'ág̃agua guive Ymaguare peve",
      "closeFullscreenBtn": "✕ Mboty",
      "closeDropdownBtn": "✕ Mboty Jornadas",
      "nextRoundTitle": "Jornada Oúva Oñeha'ãta",
      "nextRoundBadge": "JORNADA OÚVA",
      "previousRoundsBadge": "JORNADA MBOYVE"
    },
    "counters": {
      "orange": "Narãmby",
      "yellow": "Sa'yju",
      "blue": "Hovy",
      "green": "Hovyũ"
    },
    "newOpModal": {
      "title": "➕ Emoinge Operación Pyahu",
      "date": "Ára (Fecha)",
      "time": "Hora",
      "category": "Categoría",
      "operationType": "Tipo Operación",
      "desc": "Descripción / Partidokuéra",
      "market": "Mercado / Segmento",
      "stake": "Monto Jaipurúva ($)",
      "odds": "Cuota / Multiplicador",
      "status": "Estado Inicial",
      "notes": "Observaciones (Opcional)",
      "cancelBtn": "Embogue",
      "saveBtn": "💾 Eñongatu Operación"
    },
    "leaguesModal": {
      "title": "Ligakuéra Oĩva Activo",
      "selectAll": "Eiporavo Opaite",
      "requireElite": "(🔒 Oikotevẽ VIP)",
      "limitBasicAlert": "🔒 FREE Plan-pe ikatu emoĩ 5 ligas añoite. Embotuicha PRO-pe 15 ligas térã VIP-pe opa 51 ligas oficiales!",
      "limitProAlert": "🔒 PRO Plan-pe oreko 15 ligas límite. Embotuicha VIP-pe emoĩ hag̃ua opaite 51 ligas oficiales!",
      "requireEliteAlert": "🔒 \"Eiporavo Opaite\" oĩ exclusivamente Plan VIP-pe (51 ligas oficiales)."
    },
    "telegramModal": {
      "title": "Telegram VIP Bot Simulador",
      "subtitle": "Ehecha mba'éichapa og̃uahẽ señales automáticas nde canal suscriptor-kuérape.",
      "botStatus": "Bot Oĩ Conectado • 24/7 en tiempo real",
      "channelTitle": "🏆 StreakTracker VIP Signals",
      "generateBtn": "🔔 Emoheñói Alerta en Vivo",
      "copyBtn": "📋 Ecopia Señal",
      "copiedNotice": "Oñecopia portapapeles-pe!",
      "alertTitleGreen": "🚨 ALERTA HOVYŨ (PROBABILIDAD TUICHAITE)",
      "alertTitleBlue": "⚡ ALERTA HOVY (MERCADO SEGURO)",
      "leagueLabel": "⚽ Liga:",
      "marketLabel": "📊 Mercado:",
      "streakLabel": "🔥 Racha:",
      "nextMatchLabel": "⏰ Partido oúva:",
      "suggestionLabel": "💡 Mba'épa jajapóta:",
      "suggestionGreen": "Probabilidad estadística tuichaite opávo racha (reversión a la media).",
      "suggestionBlue": "Racha hi'ajuetéva. Ema'ẽ porã cuotas de valor-rehe.",
      "footerNote": "🤖 Alerta omoheñói automáticamente StreakTracker Engine"
    },
    "pricingModal": {
      "title": "💎 Planes ha Suscripciones",
      "subtitle": "Eipe'a análisis estadístico mbarete en tiempo real ha embotuicha nde ganancias."
    },
    "pricingModalDetails": {
      "title": "💎 Planes ha Suscripciones",
      "subtitle": "Eipe'a análisis estadístico mbarete en tiempo real ha embotuicha nde ganancias.",
      "badgePopular": "HERAKUÃVÉVA",
      "badgeAllIncluded": "OPARUPIETE",
      "free": {
        "name": "⚪ FREE",
        "price": "$0.00",
        "period": "/ jasy",
        "desc": "Eñepyrũ hag̃ua rehecha mba'éichapa omba'apo plataforma.",
        "features": [
          "✓ 5 ligas activas peve",
          "✓ Estadísticas ha rachas básicas",
          "✓ 2 oportunidades ára ha ára",
          "✓ Stake calculadora básica",
          "✕ Alertas PREMIUM ha IMBARETE oñemboty",
          "✕ Ndaipóri Backtesting Histórico",
          "✕ Ndaipóri Telegram VIP bot",
          "✕ Ndaipóri informe ára ha ára"
        ],
        "btn": "Emboaje Plan FREE"
      },
      "pro": {
        "name": "🔵 PRO",
        "price": "$19.00",
        "period": "/ jasy",
        "desc": "Operadores kuantitativos ohekáva hetave señales añetegua.",
        "features": [
          "✓ 15 ligas activas peve",
          "✓ Alertas IMBARETE ojepe'a (🔵 Hovy)",
          "✓ Estadísticas ha telemetría tuicháva",
          "✓ Filtros pyahu ha Oportunidades Renda",
          "✓ Backtesting Módulo (+3 Temporadas)",
          "✓ Banca ñangareko 50 operaciones peve",
          "✓ 📥 Emboguejy Planilla Excel Oficial (.xlsx)",
          "✕ Ndaipóri Telegram VIP Bot"
        ],
        "btn": "Emboaje Plan PRO"
      },
      "vip": {
        "name": "🟢 VIP",
        "price": "$39.00",
        "period": "/ jasy",
        "desc": "Suíte tuichavéva traders profesionales ha sindicatos-pe g̃uarã.",
        "features": [
          "✓ Opaite 50+ ligas del mundo ojepe'a",
          "✓ 100% Señales PREMIUM ojepe'a (🟢 Hovyũ)",
          "✓ Alertas prioritarias instantáneas",
          "✓ Marandu institucional ha estadístico completo",
          "✓ 🤖 Telegram VIP Bot en tiempo real",
          "✓ Historial completo ha auditoría inmutable",
          "✓ Herramientas de banca OPA'ỸVA",
          "✓ 📊 Balance ha Jornada Marandu profesional"
        ],
        "btn": "Emboaje Plan VIP"
      }
    },
    "guideModal": {
      "title": "📖 OFICIAL GUÍA: MBA'E MERCADO JAIPORUTA",
      "subtitle": "Mba'éichapa anomalía estadística ojogueraha pe mercado orden jaiporútavandi.",
      "principleTitle": "📌 Principio Cuantitativo de Reversión a la Media:",
      "principleDesc": "Rastreador otopa ligas orekóva heta partido oiko'ỹre peteĩ evento. Alerta og̃uahẽvo nivel Hovyũ / Hovy-pe, pe orden emoĩ va'erã ha'e pe evento ombopáva racha:",
      "steps": [
        {
          "title": "1. Racha: Empate'ỹre (FT)",
          "badge": "🎯 MERCADO JAIPORÚTA: EMPATE (X)",
          "desc": "Liga oreko heta partido empate'ỹre. Jaipuru Empate Partido Pahápe (Cuota: 3.10 - 3.60)."
        },
        {
          "title": "2. Racha: 3.5 Goles Mboyve",
          "badge": "🎯 MERCADO JAIPORÚTA: 3.5 GOL ÁRI (Over 3.5)",
          "desc": "Liga oreko seco gol (≤ 3 goles). Jaipuru 3.5 Gol Ári Oparupiete (Cuota: 2.60 - 3.40)."
        },
        {
          "title": "3. Racha: Empate'ỹre 1er Tiempo (HT)",
          "badge": "🎯 MERCADO JAIPORÚTA: EMPATE 1T (HT)",
          "desc": "Jaipuru Empate descanso mboyve (0-0, 1-1, etc.) (Cuota: 2.00 - 2.40)."
        },
        {
          "title": "4. Racha: Mokõivéva Omba'apo'ỹre + >2.5",
          "badge": "🎯 MERCADO JAIPORÚTA: MOKÕIVÉVA OMOINGE HA > 2.5 GOL",
          "desc": "Jaipuru mercado combinado Mokõivéva Omoinge + 2.5 Gol Ári (Cuota: 2.10 - 2.80)."
        },
        {
          "title": "5. Racha: Mokõivéva Omba'apo'ỹre 1T",
          "badge": "🎯 MERCADO JAIPORÚTA: MOKÕIVÉVA OMOINGE 1er TIEMPO-PE",
          "desc": "Jaipuru mokõive equipo omoinge gol minuto 45 mboyve (Cuota tuicha: 4.00 - 5.50)."
        }
      ],
      "understandBtn": "Aikũmby"
    },
    "checkoutModal": {
      "title": "💳 Suscripción Renda",
      "subtitle": "Cuenta ñemboguapy ha plan kuantitativo ñemohenda.",
      "planSelectedLabel": "Plan Reiporavóva:",
      "totalToPayLabel": "Repagáta:",
      "fullNameLabel": "Téra ha Rerajoapy Completo:",
      "fullNamePlaceholder": "Techapyrã: Juan Pérez",
      "emailLabel": "Correo Electrónico:",
      "emailPlaceholder": "nde.email@techapyrã.com",
      "paymentMethodLabel": "Forma de Pago:",
      "stripeLabel": "💳 Tarjeta (Stripe)",
      "mercadopagoLabel": "🤝 Mercado Pago",
      "sslNotice": "🔒 SSL Entorno Seguro (Modo Demo / Sandbox Activo)",
      "submitBtn": "🚀 Emboaje Registro ha Emohenda Suscripción",
      "successTitle": "¡Suscripción Oñemohenda Porãiterei!",
      "successMsg": "Nde plan oñemboaje 30 ára pukukue. Opaite tembipuru ha alertas oĩma nde pópe.",
      "goToDashboardBtn": "✓ Tereho Dashboard-pe"
    },
    "pushNotifyModal": {
      "title": "Emohenda Push Alerta",
      "subtitle": "Marandu oúta automáticamente 10 minutos partido mboyve.",
      "nextFixtureLabel": "Partido Oúva / Oportunidad:",
      "targetMarketLabel": "🎯 Mercado Objetivo",
      "timeLabel": "📅 Ára ha Horario",
      "opt10minTitle": "⏰ Emomarandu 10 min mboyve",
      "opt10minDesc": "Hyapu ha push pantalla-pe emomba'apo haguã operación.",
      "optLiveTitle": "🔴 Emomarandu oñepyrũvo partido",
      "optLiveDesc": "Marandu en vivo partido ohasa jave En Vivo-pe (00').",
      "optGoalTitle": "⚽ Emomarandu oiko jave GOL",
      "optGoalDesc": "Aviso instantáneo gol marcajevy reheve (techapyrã: 1-0, 1-1).",
      "optFtTitle": "🏁 Emomarandu opa jave partido (FT)",
      "optFtDesc": "Resultado final marandu ha racha quiebre confirmación.",
      "cancelBtn": "Embogue",
      "saveBtn": "🔔 Emohenda Push Alerta"
    },
    "dailyReportModal": {
      "title": "📊 JORNADA MARANDU HA BALANCE (00:00 - 23:59)",
      "subtitle": "Auditoría histórica alertas apertura-pe, alertas pyahu jornada pukukue ha alertas opáva cierre-pe.",
      "periodDay": "📅 Ko'ág̃a (Jornada Ko'ág̃agua)",
      "periodWeek": "🗓️ 7 Ára Mboyvegua (Semana)",
      "periodMonth": "📈 30 Ára Mboyvegua (Jasy)",
      "periodCustom": "🔍 Fechas Rango Rupive",
      "exportBtn": "📥 Exportar Informe Profesional (CSV)",
      "dateFrom": "Guive:",
      "dateTo": "Peve:",
      "dateFilterBtn": "🔍 Eiporavo",
      "dateClearBtn": "✕ Embogue",
      "snapOpen": "🌅 APERTURA (00:00hs)",
      "snapGen": "⚡ OÑEMOHEÑÓIVA (Pyahu)",
      "snapCut": "✂️ OPÁVA (Rupturas)",
      "snapClose": "🌙 CIERRE (23:59hs Oĩva)",
      "alertsUnit": "Alertas",
      "newsUnit": "Pyahu",
      "cutsUnit": "Rupturas",
      "vivasUnit": "Oĩva",
      "kpiTitle": "📈 Balance Cuantitativo Ko Período-pe",
      "kpiSub": "*Oñemopyenda Signal Ledger Inmutable-re",
      "kpiTotal": "OPAITE SEÑALES",
      "kpiWinLoss": "OGANÁVA / OPERDÉVA",
      "kpiWinrate": "WIN RATE %",
      "kpiRoi": "ROI ESTIMADO",
      "kpiProfit": "PROFIT / LOSS",
      "kpiPf": "PROFIT FACTOR",
      "kpiDd": "MAX DRAWDOWN",
      "kpiPremium": "SEÑALES PREMIUM",
      "distLeagues": "🏆 Liga Distribución:",
      "distMarkets": "🎯 Mercado Distribución:",
      "tableHeading": "📋 Liga & Jornada Desglose Detallado",
      "thDate": "Ára / Día",
      "thLeague": "Liga / Tetã",
      "thOpen": "Apertura (00:00)",
      "thGen": "Pyahu",
      "thCut": "Opáva (23:59)",
      "thClose": "Cierre Ko'ág̃agua",
      "noAlerts": "Ndaipóri alerta oñemboguapýva ko período-pe"
    },
    "backtestModal": {
      "title": "📈 BACKTESTING & RENDIMIENTO HISTÓRICO",
      "subtitle": "Simulación cuantitativa ha validación empírica 3+ temporadas pukukue opaite 50+ ligas oficiales-pe.",
      "tagHistorical": "RESULTADO HISTÓRICO / BACKTEST",
      "lblLeague": "1. Liga",
      "lblMarket": "2. Mercado",
      "lblSeason": "3. Temporada",
      "lblOdds": "4. Cuotas Rango",
      "lblTier": "5. Señal Nivel",
      "lblStake": "6. Stake %",
      "optAllLeagues": "🌐 Opaite 50+ Ligakuéra",
      "optAllSeasons": "📅 Opaite (3+ temporadas)",
      "optAllOdds": "🎲 Opaite cuotas",
      "optLowOdds": "Conservadoras (< 2.00)",
      "optMidOdds": "Equilibradas (2.00 - 3.50)",
      "optHighOdds": "Alto Valor (> 3.50)",
      "optAllTiers": "⚡ Opaite niveles",
      "optPremTier": "🟢 PREMIUM Añoite (90-100)",
      "optStrongTier": "🔵 IMBARETE Añoite (75-89)",
      "optObsTier": "🟡 OBSERVABLE (60-74)",
      "optStake1": "1.00% (Conservador)",
      "optStake2": "2.00% (Moderado)",
      "optStake3": "3.00% (Agresivo)",
      "kpiAccumYield": "Rendimiento Acumulado",
      "kpiWinRate": "Acierto Tasa (Win Rate)",
      "kpiAvgOdds": "Cuota Media Ponderada",
      "kpiTotalRoi": "ROI Total %",
      "kpiPf": "Profit Factor",
      "kpiEv": "Expectativa Operación-pe",
      "kpiDrawdown": "Máximo Drawdown",
      "kpiStreaks": "Rachas Seguidas",
      "kpiCapFlow": "Capital Inicial ➔ Final",
      "subYield": "Señales Históricas",
      "subWinLoss": "Oganáva / Operdéva",
      "subOdds": "Multiplicador medio",
      "subRoi": "Retorno sobre inversión",
      "subPf": "Ganancia / Pérdida bruta",
      "subEv": "Valor esperado medio ($ EV)",
      "subDd": "Oñeñangareko porã (< 15%)",
      "subStreaks": "Máx. Victorias / Pérdidas",
      "subCapFlow": "Crecimiento simulación",
      "robTitle": "ESTRATEGIA ROBUSTEZ",
      "robBadgeRobust": "IMBARETE / ROBUSTA",
      "robSample": "MUESTRA VINCULADA TUICHA",
      "robSampleAdequacy": "Muestra Tuicha",
      "robSeason": "TEMPORADA ESTABILIDAD",
      "robSeasonSub": "Consistencia interanual",
      "robLeague": "LIGA ESTABILIDAD",
      "robLeagueSub": "Generalización multiligas",
      "robOdds": "CUOTAS ESTABILIDAD",
      "robOddsSub": "Resistencia al sesgo",
      "robSummary": "Diagnóstico: Significancia estadística tuichaite consistencia interanual ha drawdown control estricto reheve.",
      "chartTitle": "Capital Ñemongakuaa Simulación (Banca Inicial: $1,000)",
      "chartSub": "*Ejecución cuantitativa estricta martingala'ỹre",
      "disclaimer": "*Aviso Metodológico: Ko'ã resultados oúva BACKTESTING HISTÓRICO cuantitativo-gui. Rendimiento ymaguare ndaha'éi garantía rendimiento oútavape."
    },
    "auditModal": {
      "title": "🛡️ AUDITORÍA PÚBLICA & TRACK RECORD VERIFICADO",
      "subtitle": "Registro transparente, cronológico ha inmutable señales algoritmo omoheñóivare.",
      "statTotal": "SEÑALES AUDITADAS",
      "statWon": "SEÑALES ACERTADAS",
      "statLost": "SEÑALES FALLADAS",
      "statYield": "YIELD / RETORNO NETO",
      "filterAll": "🔘 Opaite",
      "filterWon": "✅ Acertadas",
      "filterLost": "❌ Falladas",
      "footnote": "*Verificación auditada cuotas reales de mercado reheve",
      "thSignalId": "signal_id",
      "thTimestamp": "timestamp",
      "thLeague": "liga",
      "thSeason": "temporada",
      "thMatch": "partido",
      "thMarket": "mercado",
      "thStreak": "racha",
      "thScore": "score",
      "thConfidence": "jerovia_nivel",
      "thOdds": "cuota_momento",
      "thProbability": "prob_implícita",
      "thFinalResult": "resultado_final",
      "thSignalResult": "resultado_señal",
      "thRoi": "ROI",
      "thStatus": "estado"
    },
    "academyModal": {
      "title": "🎓 ACADEMIA ANTI-RUINA & GESTIÓN CUANTITATIVA",
      "subtitle": "5 Masterclasses tekotevẽva eñangareko haguã nde capital ha embotuicha ganancias are pukukue."
    },
    "transparencyModal": {
      "title": "🔍 TRANSPARENCIA HA RESULTADOS VERIFICADOS",
      "subtitle": "StreakTracker rendimiento auditado oñemboja'óva categoría metodológica rupive.",
      "trackReal": "🛡️ RESULTADOS REALES (Ledger Inmutable)",
      "trackPaper": "🧪 PAPER TRADING (Forward Test)",
      "trackBacktest": "📈 BACKTEST (Histórico 3 Temp)",
      "bannerRealDesc": "Señales auditadas ha liquidadas directamente Ledger Inmutable oficial StreakTracker-pe.",
      "bannerPaperDesc": "Señales ojehecháva en tiempo real cuota de apertura simulación entorno-pe.",
      "bannerBacktestDesc": "Simulación algorítmica cuantitativa 51 ligas ha +3 temporadas históricas-pe (2022-2026).",
      "lastUpdated": "ÚLTIMA ACTUALIZACIÓN",
      "kpiTotal": "OPAITE SEÑALES",
      "kpiResolved": "SEÑALES RESUELTAS",
      "kpiWinrate": "WIN RATE GLOBAL",
      "kpiRoi": "ROI HISTÓRICO",
      "kpiDd": "DRAWDOWN MÁXIMO",
      "kpiSample": "MUESTRA TUICHAKUE",
      "sampleInProgress": "Muestra ojehúhina",
      "tableLeaguesTitle": "🏆 Rendimiento Liga-rehe",
      "tableMarketsTitle": "🎯 Rendimiento Mercado-rehe",
      "tableMonthlyTitle": "📅 Rendimiento Jasy-rehe",
      "thLeague": "Liga",
      "thSample": "Muestra",
      "thWinrate": "Win Rate",
      "thRoi": "ROI %",
      "thMarket": "Mercado",
      "thMonth": "Jasy",
      "thSignalsWL": "Señales (W/L)",
      "disclaimerTitle": "📌 Aviso Metodológico Tekotevẽva:",
      "disclaimerText": "\"Resultados oñecalcula señales sistema oregistrávagui ha ndaha'éi garantía resultados futuros-pe g̃uarã.\""
    },
    "adminModal": {
      "title": "⚙️ ADMIN CONTROL PANEL & AUDIT LOG",
      "subtitle": "Usuarios ñangareko, licencias, sistema estado ha telemetría inmutable.",
      "thId": "ID Usuario",
      "thEmail": "Correo Electrónico",
      "thName": "Téra Completo",
      "thPlan": "Plan Ko'ág̃agua",
      "thStatus": "Licencia Estado",
      "thExpires": "Vencimiento",
      "thAction": "Emoambue Plan"
    },
    "bankroll": {
      "btnTitle": "💼 Banca Ñangareko",
      "modalTitle": "OPERACIONES CUADERNO — BANCA ÑANGAREKO",
      "modalSubtitle": "Sistema profesional pirapire ñangarekópe, estadística ha riesgo control strict-pe.",
      "tabDashboard": "📊 Dashboard Financiero",
      "tabOperations": "📝 Operaciones Kuatia",
      "tabCalculator": "🧮 Stake Calculadora",
      "tabConfig": "⚙️ Banca Parámetros",
      "newOpBtn": "➕ Operación Pyahu",
      "exportExcelBtn": "📥 Emboguejy Excel (.xlsx)",
      "exportCsvBtn": "📄 Exportar CSV",
      "capitalInitial": "Capital Inicial",
      "capitalCurrent": "Capital Ko'ág̃agua",
      "totalPnl": "Resultado Neto (P&L)",
      "totalProfit": "Ganancias Oparupigua",
      "totalLoss": "Pérdidas Oparupigua",
      "roi": "ROI Global",
      "yield": "Yield Total",
      "winrate": "Win Rate (Acierto %)",
      "exposure": "Exposición Ko'ág̃a",
      "availableCap": "Capital Oĩva Libre",
      "committedCap": "Capital Oñeha'ãva",
      "maxDrawdown": "Drawdown Máximo",
      "profitFactor": "Profit Factor",
      "ev": "Expectativa Matemática (EV)",
      "calcTitle": "Calculadora de Stake & Regla Anti-Martingala",
      "calcDesc": "Eikuaa mboy pirapire reipuru va'erã nde capital ha riesgo perfil rupive.",
      "suggestedStake": "Monto Sugerido (Stake)",
      "riskValidation": "Riesgo Validación",
      "calcCapLabel": "Capital Oĩva ($)",
      "calcRiskLabel": "Riesgo Perfil",
      "calcOddsLabel": "Cuota / Multiplicador",
      "calcRetPotential": "Retorno Potencial",
      "calcNetProfit": "Ganancia Neta",
      "calcMaxLoss": "Pérdida Máxima",
      "calcProfileConservative": "Conservador (2.00%)",
      "calcProfileUltra": "Ultra Conservador (1.00%)",
      "calcProfileModerate": "Moderado (3.00%)",
      "calcProfileModerateHigh": "Moderado Alto (4.00%)",
      "calcProfileCustom": "Personalizado (%)",
      "cfgTitle": "⚙️ Banca & Riesgo Ñangareko Parámetros",
      "cfgDesc": "Emohenda capital ñangareko reglas ha pérdida límites omombay haguã alertas preventivas.",
      "cfgCurrency": "🌎 Divisa Principal",
      "cfgInitialCap": "Capital Inicial",
      "cfgSecurityCap": "Capital Mínimo Stop-Bank",
      "cfgMaxStake": "% Tuichavéva Operación-pe",
      "cfgRecStake": "% Oñerecomendáva Operación-pe",
      "cfgDailyLimit": "Pérdida Límite Ára ha Ára ($)",
      "cfgWeeklyLimit": "Pérdida Límite Semana-pe ($)",
      "cfgSaveBtn": "💾 Eñongatu Parámetros"
    }
  }
};

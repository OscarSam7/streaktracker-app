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
  };
}

export const I18N: Record<Language, Translations> = {
  es: {
    appTitle: "Rastreador de Rachas",
    planLabel: "Plan:",
    plans: {
      BASIC: "Plan FREE ($0)",
      PRO: "Plan PRO ($19)",
      VIP: "Plan VIP ($39)"
    },
    header: {
      indicators: "Indicadores:",
      logout: "🚪 Salir",
      whichMarket: "📖 ¿Qué Mercado Operar?",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoría",
      academy: "🎓 Academia",
      bankroll: "💼 Control de Banca",
      exportCsv: "📥 Exportar CSV",
      telegram: "🤖 Bot Telegram",
      pricing: "💎 Ver Planes",
      refreshTitle: "Actualizar datos de las ligas ahora",
      manageLeagues: "Gestionar Ligas",
      dailyReport: "📊 Informe de Jornada",
      transparency: "🔍 Transparencia & Resultados",
      portalWeb: "🌐 Portal Web",
      adminPanel: "⚙️ Panel Admin"
    },
    trialBanner: {
      title: "Período de Prueba Gratuita Activo",
      countdown: "Tu prueba termina en {days} días.",
      upgradePro: "⚡ Actualizar a PRO ($19/m)",
      upgradeVip: "👑 Actualizar a VIP ($39/m)"
    },
    actions: {
      exportCsv: "📥 Exportar CSV",
      pricing: "💎 Ver Planes",
      refresh: "🔄 Actualizar",
      manageLeagues: "Gestionar Ligas",
      telegramBot: "🤖 Bot Telegram",
      bankroll: "💼 Control de Banca",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoría",
      academy: "🎓 Academia",
      close: "✓ Aceptar"
    },
    filters: {
      searchPlaceholder: "🔍 Buscar liga o país...",
      searchBtn: "🔍 Buscar",
      all: "🔘 Todas las Ligas",
      highAlerts: "🟢 Alertas Verdes / Azules (Todas)",
      highToday: "🟢🔵 Alertas Verdes / Azules de Hoy",
      liveOnly: "🔴 Solo En Vivo",
      upcomingOnly: "📅 Con Próximos Partidos",
      operating: "⚡ Operando",
      todayOnly: "🔥 Partidos de Hoy",
      todayBadge: "🔥 JUEGA HOY"
    },
    opportunitiesCenter: {
      title: "CENTRO DE OPORTUNIDADES",
      subtitle: "Ranking algorítmico multicriterio (Signal Score, Confianza, Muestra, Calidad de Liga y Horario).",
      detectedBadge: "detectadas",
      fAll: "🔘 TODAS",
      fPremium: "🟢 PREMIUM",
      fStrong: "🔵 FUERTES",
      fLive: "🔴 EN VIVO",
      fUpcoming: "📅 PRÓXIMAS",
      fOperating: "⚡ OPERANDO",
      operatingTag: "OPERANDO:",
      inProgressBadge: "EN CURSO",
      monitoringBreak: "⚡ Monitoreando hasta el quiebre (Racha: {streak})",
      deactivateBtn: "⏸️ Desactivar",
      startTradeHeader: "INICIAR OPERACIÓN:",
      validatedSignal: "✅ Señal Validada (Racha: {streak}) • Cuota sugerida: @{odds}",
      activateBtn: "⚡ Activar",
      startBtn: "🚀 Iniciar",
      currentStreakLabel: "RACHA ACTUAL",
      matchesSuffix: "partidos",
      sampleSizeLabel: "MUESTRA HISTÓRICA",
      casesSuffix: "casos",
      winrateLabel: "WIN RATE HIST.",
      roiLabel: "ROI HISTÓRICO",
      suggestedOddsLabel: "CUOTA ESTIMADA",
      leagueQualityLabel: "CALIDAD LIGA",
      pushAlertTitle: "🔔 Configurar Alerta Push (10 min antes)",
      noOpportunities: "No hay oportunidades que coincidan con el filtro seleccionado."
    },
    dashboard: {
      title: "RASTREADORES",
      subtitle: "Monitoreo en Vivo por Liga",
      clickToOpp: "👉 Clic para ver las oportunidades de {league} en el Centro de Oportunidades",
      waitingSchedule: "En espera de programación",
      noLiveMatches: "Actualmente no hay partidos en directo.",
      noUpcoming: "Sin partidos programados"
    },
    operationalMarkets: {
      draw: "🎯 Operar: Empate (FT)",
      over35: "🎯 Operar: Más de 3.5 goles",
      htDraw: "🎯 Operar: Empate (1T)",
      bttsOver25: "🎯 Operar: Ambos Marcan + >2.5",
      btts1H: "🎯 Operar: Ambos Marcan (1T)"
    },
    actionGuide: {
      title: "Guía de Ejecución: Mercados de Operación",
      subtitle: "¿Cómo interpretar las Alertas de Oportunidad y qué mercado operar?",
      rule: "Principio Estadístico: Cuando una liga acumula una racha prolongada sin que ocurra un evento (anomalía), la probabilidad estadística de corte aumenta y el mercado a operar es el evento opuesto que romperá dicha racha."
    },
    markets: {
      draw: "Sin Empate (FT)",
      over35: "Menos de 3.5 goles",
      htDraw: "Sin Empate (HT)",
      bttsOver25: "Sin BTTS + >2.5 Goles",
      btts1H: "Sin BTTS (1er Tiempo)"
    },
    streaks: {
      negativeStreaksTitle: "Rastreadores • Alertas de Oportunidad:",
      brokenAt: "Se cortó en:",
      matchesUnit: "partido(s)",
      lockedBadge: "🔒 Desbloquear en PRO",
      noLiveMatches: "Actualmente no hay partidos en directo.",
      upcomingPrefix: "Próximos:",
      oneClickBankrollBtn: "⚡ Operar en Banca",
      recentRoundsTitle: "Últimas Jornadas (Resultados Anteriores)",
      viewHistoryBtn: "📊 Ver Últimas 3 Jornadas",
      hideHistoryBtn: "▲ Ocultar Resultados",
      loadingHistory: "Cargando resultados de la liga...",
      noHistoryAvailable: "No hay resultados registrados en las últimas jornadas.",
      fullscreenBtn: "⛶ Pantalla Completa",
      sortAscBtn: "▲ Fecha: Antigua a Reciente",
      sortDescBtn: "▼ Fecha: Reciente a Antigua",
      closeFullscreenBtn: "✕ Cerrar",
      closeDropdownBtn: "✕ Cerrar Vista de Jornadas",
      nextRoundTitle: "Próxima Jornada a Disputarse",
      nextRoundBadge: "PRÓXIMA JORNADA",
      previousRoundsBadge: "JORNADA ANTERIOR"
    },
    counters: {
      orange: "Naranjas",
      yellow: "Amarillos",
      blue: "Azules",
      green: "Verdes"
    },
    newOpModal: {
      title: "➕ Registrar Nueva Operación",
      date: "Fecha",
      time: "Hora",
      category: "Categoría",
      operationType: "Tipo Operación",
      desc: "Descripción / Evento",
      market: "Mercado / Segmento",
      stake: "Monto Utilizado ($)",
      odds: "Cuota / Multiplicador",
      status: "Estado Inicial",
      notes: "Observaciones (Opcional)",
      cancelBtn: "Cancelar",
      saveBtn: "💾 Guardar Operación"
    },
    leaguesModal: {
      title: "Ligas Activas",
      selectAll: "Seleccionar Todas",
      requireElite: "(🔒 Requiere Plan VIP)",
      limitBasicAlert: "🔒 En el Plan FREE solo puedes monitorear hasta 5 ligas. ¡Actualiza a PRO para 15 ligas o a VIP para todas las 51 ligas oficiales!",
      limitProAlert: "🔒 En el Plan PRO tienes un límite de 15 ligas activas simultáneas. ¡Actualiza a VIP para monitorear todas las 51 ligas oficiales!",
      requireEliteAlert: "🔒 La opción \"Seleccionar Todas\" está disponible exclusivamente en el Plan VIP (51 ligas oficiales)."
    },
    telegramModal: {
      title: "Simulador de Bot de Telegram VIP",
      subtitle: "Previsualiza cómo se emiten las señales automáticas a tus canales de suscriptores.",
      botStatus: "Bot Conectado • 24/7 en tiempo real",
      channelTitle: "🏆 StreakTracker VIP Signals",
      generateBtn: "🔔 Generar Alerta en Vivo",
      copyBtn: "📋 Copiar Señal",
      copiedNotice: "¡Copiado al portapapeles!",
      alertTitleGreen: "🚨 ALERTA VERDE (MÁXIMA PROBABILIDAD)",
      alertTitleBlue: "⚡ ALERTA AZUL (MERCADO SEGURO)",
      leagueLabel: "⚽ Liga:",
      marketLabel: "📊 Mercado:",
      streakLabel: "🔥 Racha:",
      nextMatchLabel: "⏰ Próximo juego:",
      suggestionLabel: "💡 Sugerencia:",
      suggestionGreen: "Extrema probabilidad estadística de reversión a la media.",
      suggestionBlue: "Alta maduración de racha. Monitorear cuotas de valor.",
      footerNote: "🤖 Alerta generada automáticamente por StreakTracker Engine"
    },
    pricingModal: {
      title: "Planes y Suscripciones",
      subtitle: "Desbloquea el poder del análisis estadístico en tiempo real y maximiza tus oportunidades."
    },
    bankroll: {
      btnTitle: "💼 Control de Banca",
      modalTitle: "REGISTRO DE OPERACIONES — CONTROL DE BANCA",
      modalSubtitle: "Sistema profesional de gestión de capital, análisis estadístico y control estricto de riesgo.",
      tabDashboard: "📊 Dashboard Financiero",
      tabOperations: "📝 Registro de Operaciones",
      tabCalculator: "🧮 Calculadora de Stake",
      tabConfig: "⚙️ Parámetros de Banca",
      newOpBtn: "➕ Nueva Operación",
      exportExcelBtn: "📥 Descargar Excel (.xlsx)",
      exportCsvBtn: "📄 Exportar CSV",
      capitalInitial: "Capital Inicial",
      capitalCurrent: "Capital Actual",
      totalPnl: "Resultado Neto (P&L)",
      totalProfit: "Ganancias Totales",
      totalLoss: "Pérdidas Totales",
      roi: "ROI Global",
      yield: "Rendimiento (Yield)",
      winrate: "Tasa de Acierto (Win%)",
      exposure: "Exposición Actual",
      availableCap: "Capital Disponible",
      committedCap: "Capital en Juego",
      maxDrawdown: "Drawdown Máximo",
      profitFactor: "Profit Factor",
      ev: "Expectativa Matemática (EV)",
      calcTitle: "Calculadora de Stake & Regla Anti-Martingala",
      calcDesc: "Calcula el tamaño óptimo de posición en función de tu capital disponible y perfil de riesgo.",
      suggestedStake: "Monto Sugerido (Stake)",
      riskValidation: "Validación de Riesgo"
    }
  },

  en: {
    appTitle: "Streak Tracker",
    planLabel: "Plan:",
    plans: {
      BASIC: "FREE Plan ($0)",
      PRO: "PRO Plan ($19)",
      VIP: "VIP Plan ($39)"
    },
    header: {
      indicators: "Indicators:",
      logout: "🚪 Logout",
      whichMarket: "📖 Which Market to Trade?",
      backtest: "📈 Backtesting",
      audit: "🛡️ Public Audit",
      academy: "🎓 Academy",
      bankroll: "💼 Bankroll Control",
      exportCsv: "📥 Export CSV",
      telegram: "🤖 Telegram Bot",
      pricing: "💎 View Plans",
      refreshTitle: "Refresh league data now",
      manageLeagues: "Manage Leagues",
      dailyReport: "📊 Matchday Report",
      transparency: "🔍 Transparency & Results",
      portalWeb: "🌐 Web Portal",
      adminPanel: "⚙️ Admin Panel"
    },
    trialBanner: {
      title: "Active Free Trial Period",
      countdown: "Your trial ends in {days} days.",
      upgradePro: "⚡ Upgrade to PRO ($19/mo)",
      upgradeVip: "👑 Upgrade to VIP ($39/mo)"
    },
    actions: {
      exportCsv: "📥 Export CSV",
      pricing: "💎 View Plans",
      refresh: "🔄 Refresh",
      manageLeagues: "Manage Leagues",
      telegramBot: "🤖 Telegram Bot",
      bankroll: "💼 Bankroll Control",
      backtest: "📈 Backtesting",
      audit: "🛡️ Public Audit",
      academy: "🎓 Risk Academy",
      close: "✓ Accept"
    },
    filters: {
      searchPlaceholder: "🔍 Search league or country...",
      searchBtn: "🔍 Search",
      all: "🔘 All Leagues",
      highToday: "🟢🔵 Today's Green / Blue Alerts",
      highAlerts: "🟢 Green / Blue Alerts (All)",
      liveOnly: "🔴 Live Matches Only",
      upcomingOnly: "📅 With Upcoming Fixtures",
      operating: "⚡ Active Trades",
      todayOnly: "🔥 Matches Today",
      todayBadge: "🔥 PLAYS TODAY"
    },
    opportunitiesCenter: {
      title: "OPPORTUNITIES CENTER",
      subtitle: "Multicriteria algorithmic ranking (Signal Score, Confidence, Sample, League Quality and Schedule).",
      detectedBadge: "detected",
      fAll: "🔘 ALL",
      fPremium: "🟢 PREMIUM",
      fStrong: "🔵 STRONG",
      fLive: "🔴 LIVE",
      fUpcoming: "📅 UPCOMING",
      fOperating: "⚡ OPERATING",
      operatingTag: "OPERATING:",
      inProgressBadge: "IN PROGRESS",
      monitoringBreak: "⚡ Monitoring until streak breaks (Streak: {streak})",
      deactivateBtn: "⏸️ Deactivate",
      startTradeHeader: "START TRADE:",
      validatedSignal: "✅ Validated Signal (Streak: {streak}) • Suggested odds: @{odds}",
      activateBtn: "⚡ Activate",
      startBtn: "🚀 Start",
      currentStreakLabel: "CURRENT STREAK",
      matchesSuffix: "matches",
      sampleSizeLabel: "HISTORICAL SAMPLE",
      casesSuffix: "cases",
      winrateLabel: "HIST. WIN RATE",
      roiLabel: "HISTORICAL ROI",
      suggestedOddsLabel: "ESTIMATED ODDS",
      leagueQualityLabel: "LEAGUE QUALITY",
      pushAlertTitle: "🔔 Configure Push Alert (10 min before)",
      noOpportunities: "No opportunities match the selected filter."
    },
    dashboard: {
      title: "TRACKERS",
      subtitle: "Live Monitoring by League",
      clickToOpp: "👉 Click to see opportunities for {league} in Opportunities Center",
      waitingSchedule: "Waiting for schedule",
      noLiveMatches: "No live matches currently in progress.",
      noUpcoming: "No fixtures scheduled"
    },
    operationalMarkets: {
      draw: "🎯 Action: Draw (FT)",
      over35: "🎯 Action: Over 3.5 Goals",
      htDraw: "🎯 Action: Draw (HT)",
      bttsOver25: "🎯 Action: Both Teams Score + >2.5",
      btts1H: "🎯 Action: Both Teams Score (HT)"
    },
    actionGuide: {
      title: "Execution Guide: Target Markets",
      subtitle: "How to interpret Opportunity Alerts and which market to place?",
      rule: "Statistical Principle: When a league accumulates a long streak without an event, the probability of mean reversion rises and your target trade is the breaking event."
    },
    markets: {
      draw: "No Draw (FT)",
      over35: "Under 3.5 Goals",
      htDraw: "No Draw (HT)",
      bttsOver25: "No BTTS + >2.5 Goals",
      btts1H: "No BTTS (1st Half)"
    },
    streaks: {
      negativeStreaksTitle: "Opportunity Alerts:",
      brokenAt: "Broken at:",
      matchesUnit: "match(es)",
      lockedBadge: "🔒 Unlock with PRO",
      noLiveMatches: "No live matches currently in progress.",
      upcomingPrefix: "Upcoming:",
      oneClickBankrollBtn: "⚡ Trade in Bankroll",
      recentRoundsTitle: "Recent Matchdays (Previous Results)",
      viewHistoryBtn: "📊 View Last 3 Matchdays",
      hideHistoryBtn: "▲ Hide Results",
      loadingHistory: "Loading league results...",
      noHistoryAvailable: "No past match results recorded for recent matchdays.",
      fullscreenBtn: "⛶ Fullscreen",
      sortAscBtn: "▲ Date: Oldest to Newest",
      sortDescBtn: "▼ Date: Newest to Oldest",
      closeFullscreenBtn: "✕ Close",
      closeDropdownBtn: "✕ Close Matchdays View",
      nextRoundTitle: "Upcoming Matchday (Next Fixtures)",
      nextRoundBadge: "NEXT MATCHDAY",
      previousRoundsBadge: "PAST MATCHDAY"
    },
    counters: {
      orange: "Orange",
      yellow: "Yellow",
      blue: "Blue",
      green: "Green"
    },
    newOpModal: {
      title: "➕ Register New Operation",
      date: "Date",
      time: "Time",
      category: "Category",
      operationType: "Operation Type",
      desc: "Description / Event",
      market: "Market / Segment",
      stake: "Stake Amount ($)",
      odds: "Odds / Multiplier",
      status: "Initial Status",
      notes: "Notes (Optional)",
      cancelBtn: "Cancel",
      saveBtn: "💾 Save Operation"
    },
    leaguesModal: {
      title: "Active Leagues",
      selectAll: "Select All",
      requireElite: "(🔒 Requires VIP Plan)",
      limitBasicAlert: "🔒 FREE Plan allows up to 5 leagues. Upgrade to PRO for 15 leagues or VIP for all 51 official leagues!",
      limitProAlert: "🔒 PRO Plan allows up to 15 active leagues. Upgrade to VIP to track all 51 official leagues simultaneously!",
      requireEliteAlert: "🔒 The \"Select All\" option is available exclusively on VIP Plan (51 official leagues)."
    },
    telegramModal: {
      title: "Telegram VIP Bot Simulator",
      subtitle: "Preview automated betting signals broadcasted directly to VIP subscriber channels.",
      botStatus: "Bot Connected • 24/7 Live Monitoring",
      channelTitle: "🏆 StreakTracker VIP Signals",
      generateBtn: "🔔 Generate Live Signal",
      copyBtn: "📋 Copy Signal",
      copiedNotice: "Copied to clipboard!",
      alertTitleGreen: "🚨 GREEN ALERT (MAXIMUM PROBABILITY)",
      alertTitleBlue: "⚡ BLUE ALERT (SAFE MARKET SIGNAL)",
      leagueLabel: "⚽ League:",
      marketLabel: "📊 Market:",
      streakLabel: "🔥 Current Streak:",
      nextMatchLabel: "⏰ Next Fixture:",
      suggestionLabel: "💡 Recommendation:",
      suggestionGreen: "Extreme statistical probability of mean reversion.",
      suggestionBlue: "High streak maturity. Monitor value market odds.",
      footerNote: "🤖 Automated signal powered by StreakTracker Engine"
    },
    pricingModal: {
      title: "Plans & Subscriptions",
      subtitle: "Unlock the power of real-time sports statistical analytics."
    },
    bankroll: {
      btnTitle: "💼 Bankroll Control",
      modalTitle: "TRADE OPERATIONS LOG — BANKROLL CONTROL",
      modalSubtitle: "Professional capital management, statistical analytics, and strict risk control system.",
      tabDashboard: "📊 Financial Dashboard",
      tabOperations: "📝 Operations Log",
      tabCalculator: "🧮 Stake Calculator",
      tabConfig: "⚙️ Bankroll Settings",
      newOpBtn: "➕ New Operation",
      exportExcelBtn: "📥 Download Excel (.xlsx)",
      exportCsvBtn: "📄 Export CSV",
      capitalInitial: "Initial Capital",
      capitalCurrent: "Current Capital",
      totalPnl: "Net P&L",
      totalProfit: "Total Profit",
      totalLoss: "Total Loss",
      roi: "Global ROI",
      yield: "Capital Yield",
      winrate: "Win Rate (Win%)",
      exposure: "Current Exposure",
      availableCap: "Available Capital",
      committedCap: "Committed Capital",
      maxDrawdown: "Max Drawdown",
      profitFactor: "Profit Factor",
      ev: "Expected Value (EV)",
      calcTitle: "Stake Sizer & Anti-Martingale Rule",
      calcDesc: "Calculates optimal position size based on available capital and risk profile.",
      suggestedStake: "Suggested Stake",
      riskValidation: "Risk Compliance"
    }
  },

  pt: {
    appTitle: "Rastreador de Sequências",
    planLabel: "Plano:",
    plans: {
      BASIC: "Plano FREE ($0)",
      PRO: "Plano PRO ($19)",
      VIP: "Plano VIP ($39)"
    },
    header: {
      indicators: "Indicadores:",
      logout: "🚪 Sair",
      whichMarket: "📖 Qual Mercado Operar?",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoria Pública",
      academy: "🎓 Academia",
      bankroll: "💼 Gestão de Banca",
      exportCsv: "📥 Exportar CSV",
      telegram: "🤖 Bot Telegram",
      pricing: "💎 Ver Planos",
      refreshTitle: "Atualizar dados das ligas agora",
      manageLeagues: "Gerenciar Ligas",
      dailyReport: "📊 Relatório de Rodada",
      transparency: "🔍 Transparência & Resultados",
      portalWeb: "🌐 Portal Web",
      adminPanel: "⚙️ Painel Admin"
    },
    trialBanner: {
      title: "Período de Teste Grátis Ativo",
      countdown: "Seu teste termina em {days} dias.",
      upgradePro: "⚡ Atualizar para PRO ($19/m)",
      upgradeVip: "👑 Atualizar para VIP ($39/m)"
    },
    actions: {
      exportCsv: "📥 Exportar CSV",
      pricing: "💎 Ver Planos",
      refresh: "🔄 Atualizar",
      manageLeagues: "Gerenciar Ligas",
      telegramBot: "🤖 Bot Telegram",
      bankroll: "💼 Gestão de Banca",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoria Pública",
      academy: "🎓 Academia Anti-Ruína",
      close: "✓ Aceitar"
    },
    filters: {
      searchPlaceholder: "🔍 Buscar liga ou país...",
      searchBtn: "🔍 Buscar",
      all: "🔘 Todas as Ligas",
      highAlerts: "🟢 Alertas Verdes / Azuis (Todas)",
      highToday: "🟢🔵 Alertas Verdes / Azuis de Hoje",
      liveOnly: "🔴 Apenas Ao Vivo",
      upcomingOnly: "📅 Com Próximos Jogos",
      operating: "⚡ Operando",
      todayOnly: "🔥 Jogos de Hoje",
      todayBadge: "🔥 JOGA HOJE"
    },
    opportunitiesCenter: {
      title: "CENTRO DE OPORTUNIDADES",
      subtitle: "Ranking algorítmico multicritério (Signal Score, Confiança, Amostra, Qualidade da Liga e Horário).",
      detectedBadge: "detectadas",
      fAll: "🔘 TODAS",
      fPremium: "🟢 PREMIUM",
      fStrong: "🔵 FORTES",
      fLive: "🔴 AO VIVO",
      fUpcoming: "📅 PRÓXIMAS",
      fOperating: "⚡ OPERANDO",
      operatingTag: "OPERANDO:",
      inProgressBadge: "EM ANDAMENTO",
      monitoringBreak: "⚡ Monitorando até quebrar a sequência (Sequência: {streak})",
      deactivateBtn: "⏸️ Desativar",
      startTradeHeader: "INICIAR OPERAÇÃO:",
      validatedSignal: "✅ Sinal Validado (Sequência: {streak}) • Odd sugerida: @{odds}",
      activateBtn: "⚡ Ativar",
      startBtn: "🚀 Iniciar",
      currentStreakLabel: "SEQUÊNCIA ATUAL",
      matchesSuffix: "jogos",
      sampleSizeLabel: "AMOSTRA HISTÓRICA",
      casesSuffix: "casos",
      winrateLabel: "WIN RATE HIST.",
      roiLabel: "ROI HISTÓRICO",
      suggestedOddsLabel: "ODD ESTIMADA",
      leagueQualityLabel: "QUALIDADE LIGA",
      pushAlertTitle: "🔔 Configurar Alerta Push (10 min antes)",
      noOpportunities: "Nenhuma oportunidade corresponde ao filtro selecionado."
    },
    dashboard: {
      title: "RASTREADORES",
      subtitle: "Monitoramento Ao Vivo por Liga",
      clickToOpp: "👉 Clique para ver as oportunidades de {league} no Centro de Oportunidades",
      waitingSchedule: "Aguardando programação",
      noLiveMatches: "Nenhuma partida ao vivo no momento.",
      noUpcoming: "Sem jogos programados"
    },
    operationalMarkets: {
      draw: "🎯 Operar: Empate (FT)",
      over35: "🎯 Operar: Mais de 3.5 Gols",
      htDraw: "🎯 Operar: Empate (HT)",
      bttsOver25: "🎯 Operar: Ambas Marcam + >2.5",
      btts1H: "🎯 Operar: Ambas Marcam (HT)"
    },
    actionGuide: {
      title: "Guia de Execução: Mercados Alvo",
      subtitle: "Como interpretar os Alertas de Oportunidade e qual mercado operar?",
      rule: "Princípio Estatístico: Quando uma liga acumula uma longa sequência sem um evento, a probabilidade de reversão aumenta e a sua entrada é no evento que quebra a sequência."
    },
    markets: {
      draw: "Sem Empate (FT)",
      over35: "Menos de 3.5 Gols",
      htDraw: "Sem Empate (HT)",
      bttsOver25: "Sem BTTS + >2.5 Gols",
      btts1H: "Sem BTTS (1º Tempo)"
    },
    streaks: {
      negativeStreaksTitle: "Alertas de Oportunidade:",
      brokenAt: "Interrompido em:",
      matchesUnit: "jogo(s)",
      lockedBadge: "🔒 Desbloquear no PRO",
      noLiveMatches: "Nenhuma partida ao vivo no momento.",
      upcomingPrefix: "Próximos:",
      oneClickBankrollBtn: "⚡ Operar na Banca",
      recentRoundsTitle: "Últimas Rodadas (Resultados Anteriores)",
      viewHistoryBtn: "📊 Ver Últimas 3 Rodadas",
      hideHistoryBtn: "▲ Ocultar Resultados",
      loadingHistory: "Carregando resultados da liga...",
      noHistoryAvailable: "Nenhum resultado registrado nas últimas rodadas.",
      fullscreenBtn: "⛶ Tela Cheia",
      sortAscBtn: "▲ Data: Antiga para Recente",
      sortDescBtn: "▼ Data: Recente para Antiga",
      closeFullscreenBtn: "✕ Fechar",
      closeDropdownBtn: "✕ Fechar Visualização de Rodadas",
      nextRoundTitle: "Próxima Rodada a Ser Disputada",
      nextRoundBadge: "PRÓXIMA RODADA",
      previousRoundsBadge: "RODADA ANTERIOR"
    },
    counters: {
      orange: "Laranjas",
      yellow: "Amarelos",
      blue: "Azuis",
      green: "Verdes"
    },
    newOpModal: {
      title: "➕ Registrar Nova Operação",
      date: "Data",
      time: "Hora",
      category: "Categoria",
      operationType: "Tipo Operação",
      desc: "Descrição / Evento",
      market: "Mercado / Segmento",
      stake: "Montante Utilizado ($)",
      odds: "Odd / Multiplicador",
      status: "Status Inicial",
      notes: "Observações (Opcional)",
      cancelBtn: "Cancelar",
      saveBtn: "💾 Salvar Operação"
    },
    leaguesModal: {
      title: "Ligas Ativas",
      selectAll: "Selecionar Todas",
      requireElite: "(🔒 Requer Plano VIP)",
      limitBasicAlert: "🔒 No Plano FREE você pode monitorar até 5 ligas. Atualize para o PRO para até 15 ligas ou VIP para todas as 51 ligas oficiais!",
      limitProAlert: "🔒 No Plano PRO você tem limite de 15 ligas ativas. Atualize para o VIP para rastrear todas as 51 ligas simultaneamente!",
      requireEliteAlert: "🔒 A opção \"Selecionar Todas\" está disponível exclusivamente no Plano VIP (51 ligas oficiais)."
    },
    telegramModal: {
      title: "Simulador de Bot do Telegram VIP",
      subtitle: "Visualize como os sinais automáticos são enviados para os canais de assinantes.",
      botStatus: "Bot Conectado • 24/7 em tempo real",
      channelTitle: "🏆 StreakTracker VIP Signals",
      generateBtn: "🔔 Gerar Alerta Ao Vivo",
      copyBtn: "📋 Copiar Sinal",
      copiedNotice: "Copiado para a área de transferência!",
      alertTitleGreen: "🚨 ALERTA VERDE (MÁXIMA PROBABILIDADE)",
      alertTitleBlue: "⚡ ALERTA AZUL (MERCADO SEGURO)",
      leagueLabel: "⚽ Liga:",
      marketLabel: "📊 Mercado:",
      streakLabel: "🔥 Sequência:",
      nextMatchLabel: "⏰ Próximo Jogo:",
      suggestionLabel: "💡 Sugestão:",
      suggestionGreen: "Probabilidade estatística extrema de reversão à média.",
      suggestionBlue: "Alta maturação de sequência. Monitore odds de valor.",
      footerNote: "🤖 Alerta gerado automaticamente pelo StreakTracker Engine"
    },
    pricingModal: {
      title: "Planos e Assinaturas",
      subtitle: "Desbloqueie o poder da análise estatística em tempo real e maximize seus lucros."
    },
    bankroll: {
      btnTitle: "💼 Gestão de Banca",
      modalTitle: "REGISTRO DE OPERAÇÕES — CONTROLE DE BANCA",
      modalSubtitle: "Sistema profissional de gestão de capital, análise estatística e controle rigoroso de risco.",
      tabDashboard: "📊 Dashboard Financeiro",
      tabOperations: "📝 Registro de Operações",
      tabCalculator: "🧮 Calculadora de Stake",
      tabConfig: "⚙️ Parámetros da Banca",
      newOpBtn: "➕ Nova Operação",
      exportExcelBtn: "📥 Baixar Excel (.xlsx)",
      exportCsvBtn: "📄 Exportar CSV",
      capitalInitial: "Capital Inicial",
      capitalCurrent: "Capital Atual",
      totalPnl: "Resultado Líquido (P&L)",
      totalProfit: "Lucros Totais",
      totalLoss: "Perdas Totais",
      roi: "ROI Global",
      yield: "Rendimento (Yield)",
      winrate: "Taxa de Acerto (Win%)",
      exposure: "Exposição Atual",
      availableCap: "Capital Disponível",
      committedCap: "Capital em Jogo",
      maxDrawdown: "Drawdown Máximo",
      profitFactor: "Profit Factor",
      ev: "Expectativa Matemática (EV)",
      calcTitle: "Calculadora de Stake & Regra Anti-Martingale",
      calcDesc: "Calcula o tamanho ideal de posição com base no capital disponível e perfil de risco.",
      suggestedStake: "Monto Sugerido (Stake)",
      riskValidation: "Validação de Risco"
    }
  },

  gn: {
    appTitle: "Rastreador de Rachas",
    planLabel: "Plán:",
    plans: {
      BASIC: "Plán FREE ($0) — Básico",
      PRO: "Plán PRO ($19) — Kuantitativo",
      VIP: "Plán VIP ($39) — Oparupiete"
    },
    header: {
      indicators: "Techaukaha:",
      logout: "🚪 Sẽ",
      whichMarket: "📖 Mba'e Mercado Jaiporuta?",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoría Pública",
      academy: "🎓 Academia",
      bankroll: "💼 Banca Ñangareko",
      exportCsv: "📥 Exportar CSV",
      telegram: "🤖 Bot Telegram",
      pricing: "💎 Ehecha Plan-kuéra",
      refreshTitle: "Embopyahu ligakuéra ko'ápe",
      manageLeagues: "Ligas Ñangareko",
      dailyReport: "📊 Jornada Informe",
      transparency: "🔍 Transparencia ha Resultados",
      portalWeb: "🌐 Portal Web",
      adminPanel: "⚙️ Panel Admin"
    },
    trialBanner: {
      title: "Prueba Gratuita Oĩva Hína",
      countdown: "Nde prueba opáta {days} ára pukukue ryepýpe.",
      upgradePro: "⚡ Embotuicha PRO-pe ($19/m)",
      upgradeVip: "👑 Embotuicha VIP-pe ($39/m)"
    },
    actions: {
      exportCsv: "📥 Exportar CSV",
      pricing: "💎 Ehecha Plan-kuéra",
      refresh: "🔄 Embopyahu",
      manageLeagues: "Ligas Ñangareko",
      telegramBot: "🤖 Bot Telegram",
      bankroll: "💼 Banca Ñangareko",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoría Pública",
      academy: "🎓 Academia",
      close: "✓ Mboaje"
    },
    filters: {
      searchPlaceholder: "🔍 Eheka liga térã tetã...",
      searchBtn: "🔍 Eheka",
      all: "🔘 Opaite Ligakuéra",
      highAlerts: "🟢 Alertas Hovy / Hovyũ (Opaite)",
      highToday: "🟢🔵 Ko'ág̃agua Alerta Hovy / Hovyũ",
      liveOnly: "🔴 En Vivo Añoite",
      upcomingOnly: "📅 Partidokuéra Oúva",
      operating: "⚡ Jaoperahína",
      todayOnly: "🔥 Ko'árape Oñeha'ãva",
      todayBadge: "🔥 OHA'Ã KO'ÁG̃A"
    },
    opportunitiesCenter: {
      title: "OPORTUNIDADES RENDA",
      subtitle: "Ranking algorítmico multicriterio (Signal Score, Jerovia, Muestra, Liga Calidad ha Horario).",
      detectedBadge: "ojetopa",
      fAll: "🔘 OPAITE",
      fPremium: "🟢 PREMIUM",
      fStrong: "🔵 IMBARETE",
      fLive: "🔴 EN VIVO",
      fUpcoming: "📅 OÚVA",
      fOperating: "⚡ JAOPERAHÍNA",
      operatingTag: "JAOPERAHÍNA:",
      inProgressBadge: "OJEHÚHINA",
      monitoringBreak: "⚡ Ñama'ẽ hese opa peve (Racha: {streak})",
      deactivateBtn: "⏸️ Embopa",
      startTradeHeader: "EÑEPYRŨ OPERACIÓN:",
      validatedSignal: "✅ Señal Validada (Racha: {streak}) • Cuota sugerida: @{odds}",
      activateBtn: "⚡ Emohenda",
      startBtn: "🚀 Eñepyrũ",
      currentStreakLabel: "RACHA KO'ÁG̃AGUA",
      matchesSuffix: "partido",
      sampleSizeLabel: "MUESTRA HISTÓRICA",
      casesSuffix: "kaso",
      winrateLabel: "WIN RATE HIST.",
      roiLabel: "ROI HISTÓRICO",
      suggestedOddsLabel: "CUOTA ESTIMADA",
      leagueQualityLabel: "LIGA CALIDAD",
      pushAlertTitle: "🔔 Emohenda Push Alerta (10 min mboyve)",
      noOpportunities: "Ndaipóri oportunidad ko filtro rupive."
    },
    dashboard: {
      title: "RASTREADORES",
      subtitle: "Monitoreo en Vivo Liga-rehe",
      clickToOpp: "👉 Epoko rehecha haguã {league} oportunidades",
      waitingSchedule: "Oñeha'arõ hína horario",
      noLiveMatches: "Ko'ág̃a ndaipóri partido en vivo.",
      noUpcoming: "Ndaipóri partido oñeprogramáva"
    },
    operationalMarkets: {
      draw: "🎯 Operar: Empate (FT)",
      over35: "🎯 Operar: 3.5 Gol Ári",
      htDraw: "🎯 Operar: Empate (1T)",
      bttsOver25: "🎯 Operar: Mokõivéva Omoinge + >2.5",
      btts1H: "🎯 Operar: Mokõivéva Omoinge (1T)"
    },
    actionGuide: {
      title: "Mba'e Mercado Jaiporuta: Guía de Ejecución",
      subtitle: "Mba'éichapa jahechakuaáta Alertas de Oportunidad ha mba'e mercado jaiporúta?",
      rule: "Principio Estadístico: Peteĩ liga ohasávo heta partido peteĩ suceso oiko'ỹre (anomalía), probabilidad tuicha ojupi opa haguã pe racha, ha mercado jaiporúva ha'e pe evento opávo pe racha."
    },
    markets: {
      draw: "Empate'ỹre (FT)",
      over35: "3.5 Goles Mboyve",
      htDraw: "Empate'ỹre (1T)",
      bttsOver25: "Mokõivéva Omba'apo'ỹre + >2.5",
      btts1H: "Mokõivéva Omba'apo'ỹre (1T)"
    },
    streaks: {
      negativeStreaksTitle: "Rastreadores • Oportunidades Alertas:",
      brokenAt: "Opáma ko'ápe:",
      matchesUnit: "partido",
      lockedBadge: "🔒 Eipe'a PRO-pe",
      noLiveMatches: "Ko'ág̃a ndaipóri partido en directo.",
      upcomingPrefix: "Oúva hína:",
      oneClickBankrollBtn: "⚡ Emoinge Bancape",
      recentRoundsTitle: "Jornadas Mboyvegua (Resultados)",
      viewHistoryBtn: "📊 Ehecha 3 Jornadas Mboyve",
      hideHistoryBtn: "▲ Emoñemi Resultados",
      loadingHistory: "Oñemboguejy hína liga resultados...",
      noHistoryAvailable: "Ndaipóri resultado ko'ã jornadas-pe.",
      fullscreenBtn: "⛶ Pantalla Completa",
      sortAscBtn: "▲ Fecha: Ymaguare guive Ko'ág̃agua peve",
      sortDescBtn: "▼ Fecha: Ko'ág̃agua guive Ymaguare peve",
      closeFullscreenBtn: "✕ Mboty",
      closeDropdownBtn: "✕ Mboty Jornadas",
      nextRoundTitle: "Jornada Oúva Oñeha'ãta",
      nextRoundBadge: "JORNADA OÚVA",
      previousRoundsBadge: "JORNADA MBOYVE"
    },
    counters: {
      orange: "Narãmby",
      yellow: "Sa'yju",
      blue: "Hovy",
      green: "Hovyũ"
    },
    newOpModal: {
      title: "➕ Emoinge Operación Pyahu",
      date: "Ára (Fecha)",
      time: "Hora",
      category: "Categoría",
      operationType: "Tipo Operación",
      desc: "Descripción / Partidokuéra",
      market: "Mercado / Segmento",
      stake: "Monto Jaipurúva ($)",
      odds: "Cuota / Multiplicador",
      status: "Estado Inicial",
      notes: "Observaciones (Opcional)",
      cancelBtn: "Embogue",
      saveBtn: "💾 Eñongatu Operación"
    },
    leaguesModal: {
      title: "Ligakuéra Oĩva Activo",
      selectAll: "Eiporavo Opaite",
      requireElite: "(🔒 Oikotevẽ VIP)",
      limitBasicAlert: "🔒 FREE Plan-pe ikatu emoĩ 5 ligas añoite. Embotuicha PRO-pe 15 ligas térã VIP-pe opa 51 ligas oficiales!",
      limitProAlert: "🔒 PRO Plan-pe oreko 15 ligas límite. Embotuicha VIP-pe emoĩ hag̃ua opaite 51 ligas oficiales!",
      requireEliteAlert: "🔒 \"Eiporavo Opaite\" oĩ exclusivamente Plan VIP-pe (51 ligas oficiales)."
    },
    telegramModal: {
      title: "Telegram VIP Bot Simulador",
      subtitle: "Ehecha mba'éichapa og̃uahẽ señales automáticas nde canal suscriptor-kuérape.",
      botStatus: "Bot Oĩ Conectado • 24/7 en tiempo real",
      channelTitle: "🏆 StreakTracker VIP Signals",
      generateBtn: "🔔 Emoheñói Alerta en Vivo",
      copyBtn: "📋 Ecopia Señal",
      copiedNotice: "Oñecopia portapapeles-pe!",
      alertTitleGreen: "🚨 ALERTA HOVYŨ (PROBABILIDAD TUICHAITE)",
      alertTitleBlue: "⚡ ALERTA HOVY (MERCADO SEGURO)",
      leagueLabel: "⚽ Liga:",
      marketLabel: "📊 Mercado:",
      streakLabel: "🔥 Racha:",
      nextMatchLabel: "⏰ Partido oúva:",
      suggestionLabel: "💡 Mba'épa jajapóta:",
      suggestionGreen: "Probabilidad estadística tuichaite opávo racha (reversión a la media).",
      suggestionBlue: "Racha hi'ajuetéva. Ema'ẽ porã cuotas de valor-rehe.",
      footerNote: "🤖 Alerta omoheñói automáticamente StreakTracker Engine"
    },
    pricingModal: {
      title: "Planes ha Suscripciones",
      subtitle: "Eipe'a análisis estadístico mbarete en tiempo real ha embotuicha nde ganancias."
    },
    bankroll: {
      btnTitle: "💼 Banca Ñangareko",
      modalTitle: "OPERACIONES CUADERNO — BANCA ÑANGAREKO",
      modalSubtitle: "Sistema profesional pirapire ñangarekópe, estadística ha riesgo control strict-pe.",
      tabDashboard: "📊 Dashboard Financiero",
      tabOperations: "📝 Operaciones Kuatia",
      tabCalculator: "🧮 Stake Calculadora",
      tabConfig: "⚙️ Banca Parámetros",
      newOpBtn: "➕ Operación Pyahu",
      exportExcelBtn: "📥 Emboguejy Excel (.xlsx)",
      exportCsvBtn: "📄 Exportar CSV",
      capitalInitial: "Capital Inicial",
      capitalCurrent: "Capital Ko'ág̃agua",
      totalPnl: "Resultado Neto (P&L)",
      totalProfit: "Ganancias Oparupigua",
      totalLoss: "Pérdidas Oparupigua",
      roi: "ROI Global",
      yield: "Yield Total",
      winrate: "Win Rate (Acierto %)",
      exposure: "Exposición Ko'ág̃a",
      availableCap: "Capital Oĩva Libre",
      committedCap: "Capital Oñeha'ãva",
      maxDrawdown: "Drawdown Máximo",
      profitFactor: "Profit Factor",
      ev: "Expectativa Matemática (EV)",
      calcTitle: "Calculadora de Stake & Regla Anti-Martingala",
      calcDesc: "Eikuaa mboy pirapire reipuru va'erã nde capital ha riesgo perfil rupive.",
      suggestedStake: "Monto Sugerido (Stake)",
      riskValidation: "Riesgo Validación"
    }
  }
};


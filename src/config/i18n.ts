export type Language = 'es' | 'en' | 'pt';

export interface Translations {
  appTitle: string;
  planLabel: string;
  plans: {
    BASIC: string;
    PRO: string;
    ELITE: string;
    SYNDICATE: string;
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
    all: string;
    highAlerts: string;
    highToday: string;
    liveOnly: string;
    upcomingOnly: string;
    todayOnly: string;
    todayBadge: string;
  };
  markets: {
    draw: string;
    over35: string;
    htDraw: string;
    bttsOver25: string;
    btts1H: string;
  };
  operationalMarkets?: {
    draw: string;
    over35: string;
    htDraw: string;
    bttsOver25: string;
    btts1H: string;
  };
  actionGuide?: {
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
  };
  counters: {
    orange: string;
    yellow: string;
    blue: string;
    green: string;
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
      BASIC: "Básico (Gratis)",
      PRO: "PRO",
      ELITE: "ELITE (Full)",
      SYNDICATE: "Sindicato VIP"
    },
    actions: {
      exportCsv: "📥 Exportar CSV",
      pricing: "💎 Ver Planes",
      refresh: "🔄 Actualizar",
      manageLeagues: "Gestionar Ligas",
      telegramBot: "🤖 Bot Telegram",
      bankroll: "💼 Control de Banca",
      backtest: "📈 Backtesting",
      audit: "🛡️ Auditoría Pública",
      academy: "🎓 Academia Anti-Ruina",
      close: "✓ Aceptar"
    },
    filters: {
      searchPlaceholder: "🔍 Buscar liga o país...",
      all: "🔘 Todas las Ligas",
      highAlerts: "🟢 Alertas Verdes / Azules (Todas)",
      highToday: "🟢🔵 Alertas Verdes / Azules de Hoy",
      liveOnly: "🔴 Solo En Vivo",
      upcomingOnly: "📅 Con Próximos Partidos",
      todayOnly: "🔥 Partidos de Hoy",
      todayBadge: "🔥 JUEGA HOY"
    },
    operationalMarkets: {
      draw: "🎯 Operar: Empate (FT)",
      over35: "🎯 Operar: Más de 3.5 goles",
      htDraw: "🎯 Operar: Empate (1T / HT)",
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
      negativeStreaksTitle: "Alertas de Oportunidad:",
      brokenAt: "Se cortó en:",
      matchesUnit: "partido(s)",
      lockedBadge: "🔒 Desbloquear en PRO",
      noLiveMatches: "Actualmente no hay partidos en directo.",
      upcomingPrefix: "Próximos:",
      oneClickBankrollBtn: "⚡ Operar en Banca"
    },
    counters: {
      orange: "Naranjas",
      yellow: "Amarillos",
      blue: "Azules",
      green: "Verdes"
    },
    leaguesModal: {
      title: "Ligas Activas",
      selectAll: "Seleccionar Todas",
      requireElite: "(🔒 Requiere Plan ELITE)",
      limitBasicAlert: "🔒 En el Plan Básico solo puedes monitorear hasta 3 ligas. ¡Actualiza a PRO para desbloquear hasta 10 ligas o a ELITE para tener todas!",
      limitProAlert: "🔒 En el Plan PRO tienes un límite de 10 ligas activas. ¡Actualiza a ELITE para monitorear todas las 32+ ligas simultáneamente!",
      requireEliteAlert: "🔒 La opción \"Seleccionar Todas\" está disponible a partir del Plan ELITE (32+ ligas)."
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
      BASIC: "Basic (Free)",
      PRO: "PRO",
      ELITE: "ELITE (Full)",
      SYNDICATE: "Syndicate VIP"
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
      all: "🔘 All Leagues",
      highToday: "🟢🔵 Today's Green / Blue Alerts",
      highAlerts: "🟢 Green / Blue Alerts (All)",
      liveOnly: "🔴 Live Matches Only",
      upcomingOnly: "📅 With Upcoming Fixtures",
      todayOnly: "🔥 Matches Today",
      todayBadge: "🔥 PLAYS TODAY"
    },
    operationalMarkets: {
      draw: "🎯 Action: Draw (FT)",
      over35: "🎯 Action: Over 3.5 Goals",
      htDraw: "🎯 Action: Draw Half-Time (HT)",
      bttsOver25: "🎯 Action: Both Teams Score + >2.5",
      btts1H: "🎯 Action: Both Teams Score (1H)"
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
      oneClickBankrollBtn: "⚡ Trade in Bankroll"
    },
    counters: {
      orange: "Orange",
      yellow: "Yellow",
      blue: "Blue",
      green: "Green"
    },
    leaguesModal: {
      title: "Active Leagues",
      selectAll: "Select All",
      requireElite: "(🔒 Requires ELITE Plan)",
      limitBasicAlert: "🔒 Basic Plan allows up to 3 leagues. Upgrade to PRO for 10 leagues or ELITE for unlimited!",
      limitProAlert: "🔒 PRO Plan allows up to 10 active leagues. Upgrade to ELITE to track all 32+ leagues simultaneously!",
      requireEliteAlert: "🔒 The \"Select All\" option is available exclusively on ELITE Plan (32+ leagues)."
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
      BASIC: "Básico (Grátis)",
      PRO: "PRO",
      ELITE: "ELITE (Completo)",
      SYNDICATE: "Sindicato VIP"
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
      all: "🔘 Todas as Ligas",
      highAlerts: "🟢 Alertas Verdes / Azuis (Todas)",
      highToday: "🟢🔵 Alertas Verdes / Azuis de Hoje",
      liveOnly: "🔴 Apenas Ao Vivo",
      upcomingOnly: "📅 Com Próximos Jogos",
      todayOnly: "🔥 Jogos de Hoje",
      todayBadge: "🔥 JOGA HOJE"
    },
    operationalMarkets: {
      draw: "🎯 Operar: Empate (FT)",
      over35: "🎯 Operar: Mais de 3.5 Gols",
      htDraw: "🎯 Operar: Empate no Intervalo (HT)",
      bttsOver25: "🎯 Operar: Ambas Marcam + >2.5",
      btts1H: "🎯 Operar: Ambas Marcam (1º T)"
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
      oneClickBankrollBtn: "⚡ Operar na Banca"
    },
    counters: {
      orange: "Laranjas",
      yellow: "Amarelos",
      blue: "Azuis",
      green: "Verdes"
    },
    leaguesModal: {
      title: "Ligas Ativas",
      selectAll: "Selecionar Todas",
      requireElite: "(🔒 Requer Plano ELITE)",
      limitBasicAlert: "🔒 No Plano Básico você pode monitorar até 3 ligas. Atualize para o PRO para até 10 ligas ou ELITE para todas!",
      limitProAlert: "🔒 No Plano PRO você tem limite de 10 ligas ativas. Atualize para o ELITE para rastrear mais de 32 ligas simultaneamente!",
      requireEliteAlert: "🔒 A opção \"Selecionar Todas\" está disponível a partir do Plano ELITE (32+ ligas)."
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
  }
};

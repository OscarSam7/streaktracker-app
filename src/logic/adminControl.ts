import { LEAGUES } from '../config/leagues';
import { loadUserProfile, saveAdminSystemConfig, type PlatformPlan } from './authPermissions';
import { loadSignalLedger } from './immutableSignalLedger';

export interface AdminAuditLogEntry {
  id: string;
  timestamp: string;
  adminId: string;
  actionType: 'LEAGUE_TOGGLE' | 'MARKET_TOGGLE' | 'CONFIG_UPDATE' | 'PLAN_PERMS_UPDATE' | 'TELEGRAM_TEMPLATE_UPDATE' | 'USER_ROLE_OVERRIDE';
  targetEntity: string;
  previousValue: string;
  newValue: string;
  ipAddress?: string;
}

export interface AdminSystemParameters {
  activeLeagueIds: number[];
  activeMarkets: Array<'draw' | 'over35' | 'htDraw' | 'bttsOver25' | 'btts1H'>;
  minimumSignalScore: number;           // Default: 60
  minimumSignalTier: 'OBSERVABLE' | 'FUERTE' | 'PREMIUM'; // Default: OBSERVABLE
  minimumSampleSize: number;            // Default: 30
  trialDurationDays: number;            // Default: 3
  telegramTemplates: {
    freeTemplate: string;
    proTemplate: string;
    vipTemplate: string;
  };
}

const STORAGE_KEY_ADMIN_PARAMS = 'streaktracker_admin_parameters_v1';
const STORAGE_KEY_ADMIN_AUDIT_LOG = 'streaktracker_admin_audit_logs_v1';

export function loadAdminAuditLogs(): AdminAuditLogEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_AUDIT_LOG);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function logAdminAction(
  actionType: AdminAuditLogEntry['actionType'],
  targetEntity: string,
  previousValue: any,
  newValue: any,
  adminId: string = 'admin_root'
): AdminAuditLogEntry {
  const logs = loadAdminAuditLogs();
  const now = new Date();
  
  const entry: AdminAuditLogEntry = {
    id: `LOG-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: now.toISOString(),
    adminId,
    actionType,
    targetEntity,
    previousValue: typeof previousValue === 'object' ? JSON.stringify(previousValue) : String(previousValue),
    newValue: typeof newValue === 'object' ? JSON.stringify(newValue) : String(newValue)
  };

  logs.unshift(entry);
  if (logs.length > 500) logs.pop(); // Mantener hasta 500 entradas
  
  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_AUDIT_LOG, JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to persist admin audit log:', e);
  }

  return entry;
}

export function loadAdminParameters(): AdminSystemParameters {
  const defaultParams: AdminSystemParameters = {
    activeLeagueIds: Object.values(LEAGUES).map(l => l.id), // Las 45 ligas oficiales
    activeMarkets: ['draw', 'over35', 'htDraw', 'bttsOver25', 'btts1H'],
    minimumSignalScore: 60,
    minimumSignalTier: 'OBSERVABLE',
    minimumSampleSize: 30,
    trialDurationDays: 3,
    telegramTemplates: {
      freeTemplate: '🚨 [CANAL FREE] — Oportunidad estadística en {league}. Mercado oculto.',
      proTemplate: '🔵 [CANAL PRO] — {league}: {fixture} | {market} (Racha: {streak}) | Score: {score}',
      vipTemplate: '🟢 [CANAL VIP] — {league}: {fixture} | {market} | Score: {score}/100 | Muestra: {sample}'
    }
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_ADMIN_PARAMS);
    if (!raw) return defaultParams;
    const parsed = JSON.parse(raw);
    return { ...defaultParams, ...parsed };
  } catch (e) {
    return defaultParams;
  }
}

export function saveAdminParameters(params: Partial<AdminSystemParameters>, adminId: string = 'admin_root'): AdminSystemParameters {
  const current = loadAdminParameters();
  const updated = { ...current, ...params };

  // Registrar auditoría de cambios
  if (params.minimumSignalScore !== undefined && params.minimumSignalScore !== current.minimumSignalScore) {
    logAdminAction('CONFIG_UPDATE', 'minimumSignalScore', current.minimumSignalScore, params.minimumSignalScore, adminId);
  }
  if (params.trialDurationDays !== undefined && params.trialDurationDays !== current.trialDurationDays) {
    logAdminAction('CONFIG_UPDATE', 'trialDurationDays', current.trialDurationDays, params.trialDurationDays, adminId);
    saveAdminSystemConfig({ trialDurationDays: params.trialDurationDays });
  }
  if (params.activeLeagueIds !== undefined && params.activeLeagueIds.length !== current.activeLeagueIds.length) {
    logAdminAction('LEAGUE_TOGGLE', 'activeLeagueIds', current.activeLeagueIds.length, params.activeLeagueIds.length, adminId);
  }
  if (params.activeMarkets !== undefined) {
    logAdminAction('MARKET_TOGGLE', 'activeMarkets', current.activeMarkets, params.activeMarkets, adminId);
  }

  try {
    localStorage.setItem(STORAGE_KEY_ADMIN_PARAMS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save admin parameters:', e);
  }

  return updated;
}

const STORAGE_KEY_USERS_DB = 'streaktracker_admin_users_db_v1';

export function loadAllRegisteredUsers(): Array<{ id: string; email: string; name: string; plan: PlatformPlan | 'TRIAL'; status: string; expiresAt: string | null; role: string }> {
  const user = loadUserProfile();
  const defaultUsers = [
    { id: user.id, email: user.email, name: user.name, plan: user.subscription.plan, status: user.subscription.status, expiresAt: user.subscription.expiresAt, role: user.role },
    { id: 'usr_demo_02', email: 'carlos.vip@quant.com', name: 'Carlos Mendoza', plan: 'VIP' as const, status: 'ACTIVE', expiresAt: new Date(Date.now() + 28 * 86400000).toISOString(), role: 'VIP' },
    { id: 'usr_demo_03', email: 'miguel.pro@trader.io', name: 'Miguel Ángel Fernández', plan: 'PRO' as const, status: 'ACTIVE', expiresAt: new Date(Date.now() + 15 * 86400000).toISOString(), role: 'PRO' },
    { id: 'usr_demo_04', email: 'laura.trial@gmail.com', name: 'Laura Benítez', plan: 'TRIAL' as const, status: 'TRIAL', expiresAt: new Date(Date.now() + 2 * 86400000).toISOString(), role: 'TRIAL' },
    { id: 'usr_demo_05', email: 'roberto.free@hotmail.com', name: 'Roberto Silva', plan: 'FREE' as const, status: 'ACTIVE', expiresAt: null, role: 'FREE' },
    { id: 'usr_demo_06', email: 'juan.expired@yahoo.com', name: 'Juan Pablo Duarte', plan: 'PRO' as const, status: 'EXPIRED', expiresAt: new Date(Date.now() - 5 * 86400000).toISOString(), role: 'FREE' }
  ];

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(defaultUsers));
      return defaultUsers;
    }
    const parsed = JSON.parse(raw);
    // Asegurar que el usuario actual siempre esté actualizado en la primera posición
    if (parsed.length > 0 && parsed[0].id === user.id) {
      parsed[0] = { id: user.id, email: user.email, name: user.name, plan: user.subscription.plan, status: user.subscription.status, expiresAt: user.subscription.expiresAt, role: user.role };
    }
    return parsed;
  } catch (e) {
    return defaultUsers;
  }
}

export function saveAllRegisteredUsers(users: any[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving users db:', e);
  }
}

export function updateRegisteredUserPlan(userId: string, targetPlan: PlatformPlan | 'TRIAL', daysDuration: number = 30): boolean {
  const users = loadAllRegisteredUsers();
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return false;

  const prevPlan = users[idx].plan;
  const isFree = targetPlan === 'FREE';
  const isTrial = targetPlan === 'TRIAL';

  users[idx].plan = targetPlan;
  users[idx].status = isTrial ? 'TRIAL' : 'ACTIVE';
  users[idx].role = targetPlan;
  users[idx].expiresAt = isFree ? null : new Date(Date.now() + daysDuration * 86400000).toISOString();

  saveAllRegisteredUsers(users);
  logAdminAction('USER_ROLE_OVERRIDE', `Usuario ${users[idx].email} (${userId})`, prevPlan, `${targetPlan} (${daysDuration}d)`);
  return true;
}

// Resumen cuantitativo integral para visualización del Administrador
export function getAdminDashboardOverview() {
  const params = loadAdminParameters();
  const ledger = loadSignalLedger();
  const logs = loadAdminAuditLogs();
  const usersList = loadAllRegisteredUsers();

  return {
    usersCount: usersList.length,
    usersList,
    totalSignalsLedger: ledger.length,
    activeLeaguesCount: params.activeLeagueIds.length,
    totalOfficialLeagues: Object.keys(LEAGUES).length,
    activeMarketsCount: params.activeMarkets.length,
    totalAuditLogs: logs.length,
    auditLogs: logs.slice(0, 30),
    parameters: params
  };
}


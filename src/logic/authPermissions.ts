export type UserRole = 'FREE' | 'TRIAL' | 'PRO' | 'VIP' | 'ADMIN';
export type PlatformPlan = 'FREE' | 'PRO' | 'VIP';
export type SubscriptionStatus = 'ACTIVE' | 'TRIAL' | 'EXPIRED' | 'CANCELLED' | 'PAST_DUE';

export interface SystemConfigAdmin {
  trialDurationDays: number;          // Duración configurable desde panel de administración (default: 3)
  allowTrialOnRegistration: boolean;
  maxLeaguesTrial: number;
}

export interface UserSubscription {
  plan: PlatformPlan;
  status: SubscriptionStatus;
  startedAt: string;                  // Fecha de inicio (ISO 8601)
  expiresAt: string | null;           // Fecha de vencimiento (null para free o timestamp)
  autoRenew: boolean;                 // Renovación automática
  accessLevel: UserRole;              // Nivel de acceso efectivo
  providerReferenceId?: string;       // ID de cliente en Stripe / MercadoPago
  paymentGatewayReady: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  subscription: UserSubscription;
}

export interface PlanFeatureMatrix {
  plan: PlatformPlan | 'TRIAL';
  displayName: string;
  priceTag: string;
  maxActiveLeagues: number;
  maxDailyOpportunities: number;
  unlockedTiers: Array<'PREMIUM' | 'FUERTE' | 'OBSERVABLE' | 'SECUNDARIA'>;
  unlockedAlertColors: Array<'orange' | 'yellow' | 'blue' | 'green'>;
  hasAdvancedBacktest: boolean;
  hasDemoBacktest: boolean;
  hasTelegramVIP: boolean;
  hasAdvancedBankroll: boolean;
  hasDailyReports: boolean;
  hasFullHistoricalAudit: boolean;
  pinOnTopEnabled: boolean;
  canManageSystem?: boolean;
}

const STORAGE_KEY_CONFIG = 'streaktracker_admin_system_config_v1';

export function loadAdminSystemConfig(): SystemConfigAdmin {
  const defaultConfig: SystemConfigAdmin = {
    trialDurationDays: 3,             // Configurable: 3 días por defecto
    allowTrialOnRegistration: true,
    maxLeaguesTrial: 10
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) return defaultConfig;
    return { ...defaultConfig, ...JSON.parse(raw) };
  } catch (e) {
    return defaultConfig;
  }
}

export function saveAdminSystemConfig(cfg: Partial<SystemConfigAdmin>): SystemConfigAdmin {
  const current = loadAdminSystemConfig();
  const updated = { ...current, ...cfg };
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save admin system config:', e);
  }
  return updated;
}

export const PLAN_PERMISSIONS: Record<PlatformPlan | 'TRIAL', PlanFeatureMatrix> = {
  FREE: {
    plan: 'FREE',
    displayName: 'Plan FREE (Básico)',
    priceTag: '$0.00 / mes',
    maxActiveLeagues: 5,
    maxDailyOpportunities: 2,
    unlockedTiers: ['OBSERVABLE', 'SECUNDARIA'],
    unlockedAlertColors: ['orange', 'yellow'],
    hasAdvancedBacktest: false,
    hasDemoBacktest: false,
    hasTelegramVIP: false,
    hasAdvancedBankroll: false,
    hasDailyReports: false,
    hasFullHistoricalAudit: false,
    pinOnTopEnabled: false,
    canManageSystem: false
  },
  TRIAL: {
    plan: 'TRIAL',
    displayName: 'Prueba Gratuita (Trial 3 Días)',
    priceTag: 'Gratis (Prueba)',
    maxActiveLeagues: 10,
    maxDailyOpportunities: 6,
    unlockedTiers: ['FUERTE', 'OBSERVABLE', 'SECUNDARIA'], // Acceso a señales fuertes y algunas premium demo
    unlockedAlertColors: ['orange', 'yellow', 'blue'],
    hasAdvancedBacktest: false,
    hasDemoBacktest: true, // Demostración de backtesting con datos históricos
    hasTelegramVIP: false, // Reservado para VIP
    hasAdvancedBankroll: true, // Funcionalidades básicas de banca
    hasDailyReports: true,
    hasFullHistoricalAudit: true,
    pinOnTopEnabled: true,
    canManageSystem: false
  },
  PRO: {
    plan: 'PRO',
    displayName: 'Plan PRO Cuantitativo',
    priceTag: '$19.00 / mes',
    maxActiveLeagues: 15,
    maxDailyOpportunities: 8,
    unlockedTiers: ['FUERTE', 'OBSERVABLE', 'SECUNDARIA'],
    unlockedAlertColors: ['orange', 'yellow', 'blue'],
    hasAdvancedBacktest: true,
    hasDemoBacktest: true,
    hasTelegramVIP: false,
    hasAdvancedBankroll: true,
    hasDailyReports: true,
    hasFullHistoricalAudit: true,
    pinOnTopEnabled: true,
    canManageSystem: false
  },
  VIP: {
    plan: 'VIP',
    displayName: 'Plan VIP Todo Incluido',
    priceTag: '$39.00 / mes',
    maxActiveLeagues: 45,
    maxDailyOpportunities: 999, // Ilimitado
    unlockedTiers: ['PREMIUM', 'FUERTE', 'OBSERVABLE', 'SECUNDARIA'],
    unlockedAlertColors: ['orange', 'yellow', 'blue', 'green'],
    hasAdvancedBacktest: true,
    hasDemoBacktest: true,
    hasTelegramVIP: true,
    hasAdvancedBankroll: true,
    hasDailyReports: true,
    hasFullHistoricalAudit: true,
    pinOnTopEnabled: true,
    canManageSystem: true
  }
};

const STORAGE_KEY_USER = 'streaktracker_user_profile_v2';

export function loadUserProfile(): UserProfile {
  const defaultProfile: UserProfile = {
    id: 'usr_default_01',
    email: 'trader@streaktracker.io',
    name: 'Usuario StreakTracker',
    role: 'VIP',
    subscription: {
      plan: 'VIP',
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      autoRenew: true,
      accessLevel: 'VIP',
      paymentGatewayReady: true
    }
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (!raw) return defaultProfile;
    const parsed = JSON.parse(raw);
    return { ...defaultProfile, ...parsed };
  } catch (e) {
    return defaultProfile;
  }
}

export function saveUserProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile:', e);
  }
}

// Iniciar un nuevo usuario en modalidad TRIAL (3 días configurables)
export function startTrialSubscription(userEmail: string = 'nuevo_usuario@streaktracker.io'): UserProfile {
  const cfg = loadAdminSystemConfig();
  const trialDurationMs = cfg.trialDurationDays * 24 * 60 * 60 * 1000;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + trialDurationMs).toISOString();

  const trialUser: UserProfile = {
    id: `usr_trial_${Date.now()}`,
    email: userEmail,
    name: 'Nuevo Operador (Trial)',
    role: 'TRIAL',
    subscription: {
      plan: 'PRO', // Experiencia guiada durante el trial
      status: 'TRIAL',
      startedAt: now.toISOString(),
      expiresAt,
      autoRenew: false,
      accessLevel: 'TRIAL',
      paymentGatewayReady: true
    }
  };

  saveUserProfile(trialUser);
  return trialUser;
}

export function setUserPlan(plan: PlatformPlan, customStatus: SubscriptionStatus = 'ACTIVE'): UserProfile {
  const profile = loadUserProfile();
  profile.subscription.plan = plan;
  profile.role = plan as UserRole;
  profile.subscription.accessLevel = plan as UserRole;
  profile.subscription.status = customStatus;
  
  if (plan === 'FREE') {
    profile.subscription.expiresAt = null;
  } else {
    profile.subscription.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
  }
  
  saveUserProfile(profile);
  return profile;
}

// Cálculo de tiempo restante de Trial en tiempo real
export function getTrialTimeRemaining(user?: UserProfile): { 
  isTrial: boolean; 
  isExpired: boolean; 
  daysLeft: number; 
  hoursLeft: number; 
  displayText: string; 
} {
  const u = user || loadUserProfile();
  const sub = u.subscription;

  if (sub.status !== 'TRIAL' || !sub.expiresAt) {
    return { isTrial: false, isExpired: false, daysLeft: 0, hoursLeft: 0, displayText: '' };
  }

  const now = Date.now();
  const expTime = new Date(sub.expiresAt).getTime();
  const diffMs = expTime - now;

  if (diffMs <= 0) {
    return {
      isTrial: true,
      isExpired: true,
      daysLeft: 0,
      hoursLeft: 0,
      displayText: 'Tu prueba ha finalizado. Actualiza tu cuenta para reactivar el acceso premium.'
    };
  }

  const daysLeft = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const hoursLeft = Math.floor((diffMs % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));

  let displayText = '';
  if (daysLeft >= 1) {
    displayText = `Tu prueba termina en ${daysLeft} ${daysLeft === 1 ? 'día' : 'días'}${hoursLeft > 0 ? ` y ${hoursLeft}h` : ''}.`;
  } else {
    displayText = `Tu prueba termina en ${Math.max(1, hoursLeft)} horas.`;
  }

  return {
    isTrial: true,
    isExpired: false,
    daysLeft,
    hoursLeft,
    displayText
  };
}

// ---------------------------------------------------------
// MIDDLEWARE DE AUTORIZACIÓN Y PROTECCIÓN DE DATOS EN CAPA LÓGICA
// ---------------------------------------------------------

export interface AuthorizationResult {
  allowed: boolean;
  effectiveRole: UserRole;
  effectiveStatus: SubscriptionStatus;
  reason?: string;
}

export function authorizeAccess(requiredRole: UserRole, user?: UserProfile): AuthorizationResult {
  const currentUser = user || loadUserProfile();
  const sub = currentUser.subscription;

  // 1. Verificación de Expiración Temporal
  let effectiveStatus = sub.status;
  if (sub.expiresAt && new Date(sub.expiresAt).getTime() < Date.now()) {
    effectiveStatus = 'EXPIRED';
  }

  // 2. Degradar a FREE si expiró o fue cancelado
  let effectiveRole: UserRole = currentUser.role;
  if (effectiveStatus !== 'ACTIVE' && effectiveStatus !== 'TRIAL') {
    effectiveRole = 'FREE';
  }

  // 3. Jerarquía de Roles
  const roleHierarchy: Record<UserRole, number> = {
    ADMIN: 5,
    VIP: 4,
    PRO: 3,
    TRIAL: 2, // Trial tiene acceso intermedio
    FREE: 1
  };

  const userLevel = roleHierarchy[effectiveRole] || 1;
  const reqLevel = roleHierarchy[requiredRole] || 1;

  if (userLevel >= reqLevel) {
    return {
      allowed: true,
      effectiveRole,
      effectiveStatus
    };
  }

  return {
    allowed: false,
    effectiveRole,
    effectiveStatus,
    reason: `Acceso restringido. Se requiere membresía ${requiredRole} activa.`
  };
}

import type { PlatformPlan, SubscriptionStatus, UserProfile, UserRole } from './authPermissions';
import { saveUserProfile } from './authPermissions';
import { logAdminAction } from './adminControl';

export type SubscriptionLifecycleEvent = 
  | 'TRIAL_STARTED'
  | 'SUBSCRIPTION_CREATED'
  | 'SUBSCRIPTION_ACTIVATED'
  | 'SUBSCRIPTION_CHANGED'
  | 'SUBSCRIPTION_CANCELED'
  | 'PAYMENT_FAILED'
  | 'SUBSCRIPTION_RENEWED'
  | 'SUBSCRIPTION_EXPIRED'
  | 'SUBSCRIPTION_DOWNGRADED';

export interface SubscriptionAuditRecord {
  id: string;
  eventId: string;                 // ID único para idempotencia
  userId: string;
  eventType: SubscriptionLifecycleEvent;
  provider: 'STRIPE' | 'MERCADOPAGO' | 'MOCK_SANDBOX';
  subscriptionId: string;
  previousPlan: PlatformPlan;
  newPlan: PlatformPlan;
  previousStatus: SubscriptionStatus;
  newStatus: SubscriptionStatus;
  startedAt: string;
  expiresAt: string | null;
  timestamp: string;
  reason?: string;
}

const STORAGE_KEY_PROCESSED_EVENTS = 'streaktracker_processed_webhook_events_v1';
const STORAGE_KEY_SUB_AUDIT = 'streaktracker_subscription_audit_ledger_v1';

export function loadProcessedEventIds(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROCESSED_EVENTS);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function saveProcessedEventId(eventId: string): void {
  try {
    const set = loadProcessedEventIds();
    set.add(eventId);
    localStorage.setItem(STORAGE_KEY_PROCESSED_EVENTS, JSON.stringify(Array.from(set)));
  } catch {}
}

export function loadSubscriptionAuditLedger(): SubscriptionAuditRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SUB_AUDIT);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function recordSubscriptionAudit(record: SubscriptionAuditRecord): void {
  try {
    const list = loadSubscriptionAuditLedger();
    list.unshift(record);
    if (list.length > 500) list.pop();
    localStorage.setItem(STORAGE_KEY_SUB_AUDIT, JSON.stringify(list));
  } catch {}
}

/**
 * Motor de Ciclo de Vida de Suscripciones (Sandbox & Producción Compatible)
 * Determina el estado efectivo sin confiar en manipulaciones de cliente.
 */
export class SubscriptionLifecycleEngine {
  
  /**
   * Calcula el estado efectivo y plan de un usuario evaluando fechas y banderas del servidor.
   */
  static evaluateEffectiveSubscription(user: UserProfile): {
    effectiveRole: UserRole;
    effectiveStatus: SubscriptionStatus;
    effectivePlan: PlatformPlan;
    isGracePeriod: boolean;
  } {
    const sub = user.subscription;
    const now = Date.now();
    const expiresTimestamp = sub.expiresAt ? new Date(sub.expiresAt).getTime() : null;

    // 1. Caso TRIAL
    if (sub.status === 'TRIAL') {
      if (expiresTimestamp && expiresTimestamp < now) {
        return {
          effectiveRole: 'FREE',
          effectiveStatus: 'EXPIRED',
          effectivePlan: 'FREE',
          isGracePeriod: false
        };
      }
      return {
        effectiveRole: 'TRIAL',
        effectiveStatus: 'TRIAL',
        effectivePlan: 'PRO', // Experiencia guiada durante el trial
        isGracePeriod: false
      };
    }

    // 2. Caso CANCELLED (Cancelada pero con tiempo restante pagado)
    if (sub.status === 'CANCELLED') {
      if (expiresTimestamp && expiresTimestamp >= now) {
        // Mantiene acceso hasta la fecha de expiración
        return {
          effectiveRole: sub.plan as UserRole,
          effectiveStatus: 'CANCELLED',
          effectivePlan: sub.plan,
          isGracePeriod: true
        };
      }
      return {
        effectiveRole: 'FREE',
        effectiveStatus: 'EXPIRED',
        effectivePlan: 'FREE',
        isGracePeriod: false
      };
    }

    // 3. Caso PAST_DUE (Fallo de pago / En recuperación)
    if (sub.status === 'PAST_DUE') {
      if (expiresTimestamp && expiresTimestamp >= now) {
        // En período de gracia controlado
        return {
          effectiveRole: sub.plan as UserRole,
          effectiveStatus: 'PAST_DUE',
          effectivePlan: sub.plan,
          isGracePeriod: true
        };
      }
      return {
        effectiveRole: 'FREE',
        effectiveStatus: 'EXPIRED',
        effectivePlan: 'FREE',
        isGracePeriod: false
      };
    }

    // 4. Caso ACTIVE
    if (sub.status === 'ACTIVE') {
      if (sub.plan === 'FREE') {
        return {
          effectiveRole: 'FREE',
          effectiveStatus: 'ACTIVE',
          effectivePlan: 'FREE',
          isGracePeriod: false
        };
      }
      if (expiresTimestamp && expiresTimestamp < now) {
        return {
          effectiveRole: 'FREE',
          effectiveStatus: 'EXPIRED',
          effectivePlan: 'FREE',
          isGracePeriod: false
        };
      }
      return {
        effectiveRole: sub.plan as UserRole,
        effectiveStatus: 'ACTIVE',
        effectivePlan: sub.plan,
        isGracePeriod: false
      };
    }

    // 5. Por defecto EXPIRED o desconocido
    return {
      effectiveRole: 'FREE',
      effectiveStatus: 'EXPIRED',
      effectivePlan: 'FREE',
      isGracePeriod: false
    };
  }

  /**
   * Procesa un cambio de plan o transición de estado en modo Sandbox con garantía de idempotencia.
   */
  static processSubscriptionTransition(
    user: UserProfile,
    targetPlan: PlatformPlan,
    targetStatus: SubscriptionStatus,
    provider: 'STRIPE' | 'MERCADOPAGO' | 'MOCK_SANDBOX' = 'MOCK_SANDBOX',
    customEventId?: string,
    reason?: string
  ): { success: boolean; updatedUser: UserProfile; wasIdempotentDuplicate: boolean } {
    const eventId = customEventId || ('EVT-' + Date.now() + '-' + Math.floor(Math.random() * 10000));
    const processedEvents = loadProcessedEventIds();

    // Verificación de Idempotencia
    if (processedEvents.has(eventId)) {
      return { success: true, updatedUser: user, wasIdempotentDuplicate: true };
    }

    const previousPlan = user.subscription.plan;
    const previousStatus = user.subscription.status;
    const now = new Date();

    let newExpiresAt: string | null = null;
    if (targetPlan !== 'FREE' && targetStatus !== 'EXPIRED') {
      newExpiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // Determinar tipo de evento para auditoría
    let eventType: SubscriptionLifecycleEvent = 'SUBSCRIPTION_CHANGED';
    if (targetStatus === 'TRIAL') eventType = 'TRIAL_STARTED';
    else if (targetStatus === 'CANCELLED') eventType = 'SUBSCRIPTION_CANCELED';
    else if (targetStatus === 'PAST_DUE') eventType = 'PAYMENT_FAILED';
    else if (targetStatus === 'EXPIRED') eventType = 'SUBSCRIPTION_EXPIRED';
    else if (targetPlan === 'VIP' && previousPlan !== 'VIP') eventType = 'SUBSCRIPTION_ACTIVATED';
    else if (targetPlan === 'PRO' && previousPlan === 'FREE') eventType = 'SUBSCRIPTION_ACTIVATED';
    else if (targetPlan === 'FREE' && previousPlan !== 'FREE') eventType = 'SUBSCRIPTION_DOWNGRADED';

    user.subscription.plan = targetPlan;
    user.subscription.status = targetStatus;
    user.subscription.startedAt = now.toISOString();
    user.subscription.expiresAt = newExpiresAt;
    user.subscription.accessLevel = targetPlan as UserRole;
    user.subscription.providerReferenceId = 'sub_' + provider.toLowerCase() + '_' + user.id + '_' + Date.now();
    user.role = targetPlan as UserRole;

    saveUserProfile(user);
    saveProcessedEventId(eventId);

    // Registrar en Ledger de Auditoría de Suscripción
    recordSubscriptionAudit({
      id: 'AUD-' + Date.now(),
      eventId,
      userId: user.id,
      eventType,
      provider,
      subscriptionId: user.subscription.providerReferenceId,
      previousPlan,
      newPlan: targetPlan,
      previousStatus,
      newStatus: targetStatus,
      startedAt: user.subscription.startedAt,
      expiresAt: user.subscription.expiresAt,
      timestamp: now.toISOString(),
      reason
    });

    logAdminAction('CONFIG_UPDATE', 'Subscription ' + user.id, previousPlan + ' (' + previousStatus + ')', targetPlan + ' (' + targetStatus + ')');

    return { success: true, updatedUser: user, wasIdempotentDuplicate: false };
  }
}

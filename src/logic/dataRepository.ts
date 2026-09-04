import type { UserProfile } from './authPermissions';
import type { BankrollConfig, BankrollOperation } from './bankroll';
import type { ImmutableSignalRecord } from './immutableSignalLedger';
import type { AdminSystemParameters, AdminAuditLogEntry } from './adminControl';

const BACKEND_BASE = (import.meta as any).env?.VITE_PROXY_BACKEND_URL || '/api';

/**
 * Data Access Layer / Repository Pattern
 * Utiliza sesiones autenticadas de servidor con cookies HttpOnly seguras y credenciales incluidas.
 * Elimina la confianza en el header X-User-Id para la autorización.
 */
export class DataRepository {
  private static getHeaders(): HeadersInit {
    return {
      'Content-Type': 'application/json'
    };
  }

  // 1. Sincronización de Perfil de Usuario & Suscripción
  static async syncUserProfile(profile: UserProfile): Promise<UserProfile> {
    try {
      const res = await fetch(`${BACKEND_BASE}/user/profile`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        return data.user || profile;
      }
    } catch (e) {
      // Fallback a persistencia local ante fallo de red
    }
    return profile;
  }

  static async fetchUserProfile(_userId?: string): Promise<UserProfile | null> {
    try {
      const res = await fetch(`${BACKEND_BASE}/user/profile`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        return data.user || null;
      }
    } catch (e) {
      // Network offline
    }
    return null;
  }

  // 2. Sincronización de Control de Banca (Operaciones & Configuración)
  static async syncBankroll(_userId: string, operations: BankrollOperation[], config?: BankrollConfig): Promise<boolean> {
    try {
      const res = await fetch(`${BACKEND_BASE}/user/bankroll`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ operations, config })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  static async fetchBankroll(_userId?: string): Promise<{ operations: BankrollOperation[]; config: BankrollConfig | null } | null> {
    try {
      const res = await fetch(`${BACKEND_BASE}/user/bankroll`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        return json.data || null;
      }
    } catch (e) {
      // Offline fallback
    }
    return null;
  }

  // 3. Sincronización del Ledger Inmutable
  static async syncSignalLedger(ledger: ImmutableSignalRecord[]): Promise<boolean> {
    try {
      const res = await fetch(`${BACKEND_BASE}/signals/ledger`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ ledger })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  static async fetchSignalLedger(): Promise<ImmutableSignalRecord[] | null> {
    try {
      const res = await fetch(`${BACKEND_BASE}/signals/ledger`, {
        method: 'GET',
        headers: this.getHeaders(),
        credentials: 'include'
      });
      if (res.ok) {
        const json = await res.json();
        return json.ledger || null;
      }
    } catch (e) {
      // Offline fallback
    }
    return null;
  }

  // 4. Sincronización de Parámetros de Administración y Audit Logs (Requiere sesión ADMIN)
  static async syncAdminData(parameters: AdminSystemParameters, auditLogs: AdminAuditLogEntry[]): Promise<boolean> {
    try {
      const res = await fetch(`${BACKEND_BASE}/admin/parameters`, {
        method: 'POST',
        headers: this.getHeaders(),
        credentials: 'include',
        body: JSON.stringify({ parameters, auditLogs })
      });
      return res.ok;
    } catch (e) {
      return false;
    }
  }

  // 5. Migrador Seguro One-Time desde localStorage al Servidor
  static async performSafeMigration(userId: string): Promise<{ migrated: boolean; itemsCount: number }> {
    const MIGRATION_FLAG_KEY = `streaktracker_migrated_${userId}`;
    if (localStorage.getItem(MIGRATION_FLAG_KEY) === 'true') {
      return { migrated: true, itemsCount: 0 };
    }

    let itemsCount = 0;
    try {
      const localUserRaw = localStorage.getItem('streaktracker_user_profile_v2');
      if (localUserRaw) {
        const localUser = JSON.parse(localUserRaw);
        await this.syncUserProfile(localUser);
        itemsCount++;
      }

      const localOpsRaw = localStorage.getItem('football_streaks_bankroll_ops_v1');
      const localCfgRaw = localStorage.getItem('football_streaks_bankroll_cfg_v2_multicurrency');
      if (localOpsRaw || localCfgRaw) {
        const ops = localOpsRaw ? JSON.parse(localOpsRaw) : [];
        const cfg = localCfgRaw ? JSON.parse(localCfgRaw) : null;
        await this.syncBankroll(userId, ops, cfg);
        itemsCount += ops.length;
      }

      const localLedgerRaw = localStorage.getItem('streaktracker_immutable_signal_ledger');
      if (localLedgerRaw) {
        const ledger = JSON.parse(localLedgerRaw);
        await this.syncSignalLedger(ledger);
        itemsCount += ledger.length;
      }

      localStorage.setItem(MIGRATION_FLAG_KEY, 'true');
      return { migrated: true, itemsCount };
    } catch (e) {
      return { migrated: false, itemsCount: 0 };
    }
  }
}

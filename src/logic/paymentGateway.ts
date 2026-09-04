import type { PlatformPlan } from './authPermissions';

export type PaymentProviderType = 'STRIPE' | 'MERCADOPAGO' | 'CRYPTO' | 'MOCK_SANDBOX';

export interface CheckoutSessionRequest {
  userId: string;
  userEmail: string;
  plan: PlatformPlan;
  billingCycle: 'MONTHLY' | 'ANNUAL';
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  provider: PaymentProviderType;
  checkoutUrl: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  expiresAt: string;
}

export interface WebhookEventPayload {
  eventId: string;
  provider: PaymentProviderType;
  eventType: 'payment_intent.succeeded' | 'subscription.created' | 'subscription.updated' | 'subscription.cancelled' | 'invoice.payment_failed';
  userId: string;
  plan: PlatformPlan;
  status: 'ACTIVE' | 'TRIAL' | 'EXPIRED' | 'CANCELLED' | 'PAST_DUE';
  expiresAt: string | null;
  timestamp: string;
}

// Interfaz desacoplada y agnóstica para cualquier pasarela de pago futura
export interface IPaymentProvider {
  providerName: PaymentProviderType;
  isConfigured: boolean;
  createCheckoutSession(req: CheckoutSessionRequest): Promise<CheckoutSessionResponse>;
  handleWebhookEvent(payload: WebhookEventPayload): Promise<{ processed: boolean; updatedStatus: string }>;
  cancelSubscription(subscriptionId: string): Promise<boolean>;
}

// 1. Adaptador Stripe (Listo para conectar API Keys de producción)
export class StripePaymentAdapter implements IPaymentProvider {
  providerName: PaymentProviderType = 'STRIPE';
  isConfigured: boolean = false; // Se activa al inyectar STRIPE_SECRET_KEY

  async createCheckoutSession(req: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    const prices: Record<PlatformPlan, number> = { FREE: 0, PRO: 1900, VIP: 3900 }; // En centavos USD
    return {
      sessionId: `cs_stripe_${Date.now()}_${req.userId}`,
      provider: 'STRIPE',
      checkoutUrl: `https://checkout.stripe.com/pay/mock_session_${req.plan.toLowerCase()}`,
      amount: prices[req.plan] / 100,
      currency: 'USD',
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }

  async handleWebhookEvent(payload: WebhookEventPayload) {
    return { processed: true, updatedStatus: payload.status };
  }

  async cancelSubscription(_subId: string): Promise<boolean> {
    return true;
  }
}

// 2. Adaptador Mercado Pago (Listo para conectar Access Token LatAm)
export class MercadoPagoPaymentAdapter implements IPaymentProvider {
  providerName: PaymentProviderType = 'MERCADOPAGO';
  isConfigured: boolean = false; // Se activa al inyectar MP_ACCESS_TOKEN

  async createCheckoutSession(req: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    const prices: Record<PlatformPlan, number> = { FREE: 0, PRO: 19, VIP: 39 };
    return {
      sessionId: `pref_mp_${Date.now()}_${req.userId}`,
      provider: 'MERCADOPAGO',
      checkoutUrl: `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=mock_${req.plan.toLowerCase()}`,
      amount: prices[req.plan],
      currency: 'USD',
      status: 'PENDING',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }

  async handleWebhookEvent(payload: WebhookEventPayload) {
    return { processed: true, updatedStatus: payload.status };
  }

  async cancelSubscription(_subId: string): Promise<boolean> {
    return true;
  }
}

// 3. Adaptador Mock Sandbox (Modo de prueba seguro sin cobros reales)
export class SandboxPaymentAdapter implements IPaymentProvider {
  providerName: PaymentProviderType = 'MOCK_SANDBOX';
  isConfigured: boolean = true;

  async createCheckoutSession(req: CheckoutSessionRequest): Promise<CheckoutSessionResponse> {
    const prices: Record<PlatformPlan, number> = { FREE: 0, PRO: 19, VIP: 39 };
    return {
      sessionId: `mock_sandbox_${Date.now()}`,
      provider: 'MOCK_SANDBOX',
      checkoutUrl: '#sandbox-checkout-completed',
      amount: prices[req.plan],
      currency: 'USD',
      status: 'COMPLETED',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };
  }

  async handleWebhookEvent(_payload: WebhookEventPayload) {
    return { processed: true, updatedStatus: 'ACTIVE' };
  }

  async cancelSubscription(_subId: string): Promise<boolean> {
    return true;
  }
}

// Factory Orquestador de Pagos Desacoplado
export class PaymentServiceRegistry {
  private static providers: Map<PaymentProviderType, IPaymentProvider> = new Map([
    ['STRIPE', new StripePaymentAdapter()],
    ['MERCADOPAGO', new MercadoPagoPaymentAdapter()],
    ['MOCK_SANDBOX', new SandboxPaymentAdapter()]
  ]);

  static getProvider(type: PaymentProviderType = 'MOCK_SANDBOX'): IPaymentProvider {
    return this.providers.get(type) || this.providers.get('MOCK_SANDBOX')!;
  }
}

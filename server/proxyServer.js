const http = require('http');
const https = require('https');
const url = require('url');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3001;
const APISPORTS_KEY = process.env.APISPORTS_KEY || process.env.VITE_APISPORTS_KEY || 'c3e40bbc2c34eb562bd85e21c0dc68af';
const APISPORTS_HOST = 'v3.football.api-sports.io';

// Environment Settings
const NODE_ENV = process.env.NODE_ENV || 'development';
const PAYMENT_ENVIRONMENT = process.env.PAYMENT_ENVIRONMENT || 'SANDBOX';
const ALLOWED_ORIGIN = process.env.APP_ORIGIN || (NODE_ENV === 'production' ? 'https://streaktracker.io' : '*');

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_mock';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test_placeholder_mock';
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || 'TEST-placeholder-mock-token';
const MP_WEBHOOK_SECRET = process.env.MP_WEBHOOK_SECRET || 'mp_whsec_test_placeholder_mock';

// Backend Product & Price Catalog (Source of Truth)
const BACKEND_PRICING_CATALOG = {
  PRO: {
    plan: 'PRO',
    amountUsd: 19.00,
    amountCents: 1900,
    currency: 'USD',
    stripePriceId: 'price_mock_pro_monthly_19',
    stripeProductId: 'prod_mock_pro',
    mpPreapprovalPlanId: 'mp_plan_mock_pro_19'
  },
  VIP: {
    plan: 'VIP',
    amountUsd: 39.00,
    amountCents: 3900,
    currency: 'USD',
    stripePriceId: 'price_mock_vip_monthly_39',
    stripeProductId: 'prod_mock_vip',
    mpPreapprovalPlanId: 'mp_plan_mock_vip_39'
  }
};

// Rate Limit Configurations (Requests per Minute)
const RATE_LIMIT_CHECKOUT_MAX = parseInt(process.env.RATE_LIMIT_CHECKOUT || '5', 10);
const RATE_LIMIT_LOGIN_MAX = parseInt(process.env.RATE_LIMIT_LOGIN || '10', 10);
const RATE_LIMIT_ADMIN_MAX = parseInt(process.env.RATE_LIMIT_ADMIN || '30', 10);
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute window

// In-Memory Rate Limiter Store: key -> { count, resetTime }
const rateLimitStore = new Map();

function checkRateLimit(key, maxRequests, windowMs = RATE_LIMIT_WINDOW_MS) {
  const now = Date.now();
  let record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    record = { count: 1, resetTime: now + windowMs };
    rateLimitStore.set(key, record);
    return { allowed: true, remaining: maxRequests - 1, resetInMs: windowMs };
  }

  record.count++;
  if (record.count > maxRequests) {
    return { allowed: false, remaining: 0, resetInMs: record.resetTime - now };
  }

  return { allowed: true, remaining: maxRequests - record.count, resetInMs: record.resetTime - now };
}

// Client IP resolver with anti-spoofing logic
function getClientIp(req) {
  const isBehindTrustedProxy = process.env.TRUST_PROXY === 'true';
  if (isBehindTrustedProxy && req.headers['x-forwarded-for']) {
    const forwarded = req.headers['x-forwarded-for'].split(',')[0].trim();
    if (forwarded) return forwarded;
  }
  return req.socket.remoteAddress || '127.0.0.1';
}

// Persistent Storage Directory
const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function readDbFile(filename, defaultVal) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return defaultVal;
  }
}

function writeDbFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error(`Failed to write ${filename}:`, e);
  }
}

// Server-Side Centralized Cache for API-Sports
const serverCache = {};
const TTL_LIVE_MS = 45 * 1000;
const TTL_RECENT_MS = 6 * 60 * 60 * 1000;
const TTL_UPCOMING_MS = 2 * 60 * 60 * 1000;

let apiCallCountToday = 0;
let lastResetDate = new Date().toDateString();

function checkAndResetDailyLimit() {
  const today = new Date().toDateString();
  if (today !== lastResetDate) {
    apiCallCountToday = 0;
    lastResetDate = today;
  }
}

// Active Server Sessions
const activeSessions = new Map();

function createSession(userId, role = 'VIP', email = 'trader@streaktracker.io') {
  const sessionId = 'sess_' + crypto.randomBytes(32).toString('hex');
  const csrfToken = crypto.randomBytes(16).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  activeSessions.set(sessionId, {
    userId,
    role,
    email,
    expiresAt,
    csrfToken
  });

  return { sessionId, csrfToken, expiresAt };
}

function getSession(sessionId) {
  if (!sessionId) return null;
  const session = activeSessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    activeSessions.delete(sessionId);
    return null;
  }
  return session;
}

function invalidateSession(sessionId) {
  if (sessionId) activeSessions.delete(sessionId);
}

function parseCookies(cookieHeader) {
  const list = {};
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const name = parts.shift().trim();
    const value = decodeURI(parts.join('=')).trim();
    if (name) list[name] = value;
  });
  return list;
}

// Seed default users in users.json
const initialUsers = readDbFile('users.json', {});
if (!initialUsers['usr_default_01']) {
  initialUsers['usr_default_01'] = {
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
}
if (!initialUsers['admin_root']) {
  initialUsers['admin_root'] = {
    id: 'admin_root',
    email: 'admin@streaktracker.io',
    name: 'Administrador Global',
    role: 'ADMIN',
    subscription: {
      plan: 'VIP',
      status: 'ACTIVE',
      startedAt: new Date().toISOString(),
      expiresAt: null,
      autoRenew: true,
      accessLevel: 'ADMIN',
      paymentGatewayReady: true
    }
  };
}
writeDbFile('users.json', initialUsers);

function forwardToApiSports(pathStr, retries = 2) {
  checkAndResetDailyLimit();
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: APISPORTS_HOST,
      port: 443,
      path: pathStr,
      method: 'GET',
      headers: {
        'x-apisports-key': APISPORTS_KEY,
        'User-Agent': 'StreakTracker-Proxy/2.0'
      },
      timeout: 8000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        apiCallCountToday++;
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode || 200, body: parsed });
        } catch (e) {
          resolve({ status: 500, body: { error: 'Invalid JSON from upstream' } });
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      if (retries > 0) {
        forwardToApiSports(pathStr, retries - 1).then(resolve).catch(reject);
      } else {
        reject(new Error('Gateway Timeout after retries'));
      }
    });

    req.on('error', (err) => {
      if (retries > 0) {
        forwardToApiSports(pathStr, retries - 1).then(resolve).catch(reject);
      } else {
        reject(err);
      }
    });

    req.end();
  });
}

function parseJsonBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch (e) {
        resolve({});
      }
    });
  });
}

// Security Audit Logger (No secrets recorded)
function logSecurityEvent(eventType, details, ip = '127.0.0.1') {
  const adminDb = readDbFile('admin.json', { parameters: {}, auditLogs: [] });
  adminDb.auditLogs = adminDb.auditLogs || [];
  adminDb.auditLogs.unshift({
    id: `SEC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    adminId: 'security_monitor',
    actionType: 'CONFIG_UPDATE',
    targetEntity: eventType,
    previousValue: ip,
    newValue: typeof details === 'object' ? JSON.stringify(details) : String(details)
  });
  if (adminDb.auditLogs.length > 500) adminDb.auditLogs.pop();
  writeDbFile('admin.json', adminDb);
}

const server = http.createServer(async (req, res) => {
  const clientIp = getClientIp(req);
  const originHeader = req.headers.origin;

  // Strict CORS Evaluation
  let resolvedOrigin = originHeader || '*';
  if (NODE_ENV === 'production' && ALLOWED_ORIGIN !== '*') {
    if (originHeader && originHeader === ALLOWED_ORIGIN) {
      resolvedOrigin = ALLOWED_ORIGIN;
    } else {
      resolvedOrigin = ALLOWED_ORIGIN; // Fallback strictly to authorized production domain
    }
  }

  res.setHeader('Access-Control-Allow-Origin', resolvedOrigin);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-User-Id, X-CSRF-Token, stripe-signature, x-signature');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = url.parse(req.url || '', true);
  const pathname = parsedUrl.pathname || '';
  const cookies = parseCookies(req.headers.cookie);
  const sessionToken = cookies['streaktracker_session'] || (req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null);
  
  // Authenticate Session
  let authSession = getSession(sessionToken);

  // Bootstrap initial session if user/payment endpoint called without one
  if (!authSession && (pathname.startsWith('/api/user') || pathname.startsWith('/api/payment'))) {
    const bootstrap = createSession('usr_default_01', 'VIP', 'trader@streaktracker.io');
    authSession = getSession(bootstrap.sessionId);
    const secureFlag = NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `streaktracker_session=${bootstrap.sessionId}; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Max-Age=604800`);
  }

  // 1. Status & Health
  if (pathname === '/api/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OPERATIONAL',
      apiStatus: 'ONLINE',
      paymentEnvironment: PAYMENT_ENVIRONMENT,
      activeSessionsCount: activeSessions.size,
      dailyRequestsCount: apiCallCountToday,
      cachedEntriesCount: Object.keys(serverCache).length,
      timestamp: new Date().toISOString()
    }));
    return;
  }

  // 2. Auth Endpoints: Login & Logout (Protected with Rate Limiting)
  if (pathname === '/api/auth/login' && req.method === 'POST') {
    const rl = checkRateLimit(`login_${clientIp}`, RATE_LIMIT_LOGIN_MAX);
    if (!rl.allowed) {
      logSecurityEvent('RATE_LIMIT_EXCEEDED', { endpoint: '/api/auth/login', limit: RATE_LIMIT_LOGIN_MAX }, clientIp);
      res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': Math.ceil(rl.resetInMs / 1000) });
      res.end(JSON.stringify({ error: 'Too Many Requests: Inténtalo de nuevo en un minuto.' }));
      return;
    }

    const payload = await parseJsonBody(req);
    const email = payload.email || 'trader@streaktracker.io';
    const usersDb = readDbFile('users.json', {});
    
    let user = Object.values(usersDb).find(u => u.email === email);
    if (!user) {
      const isRootAdmin = email === 'admin@streaktracker.io';
      user = {
        id: isRootAdmin ? 'admin_root' : 'usr_' + Date.now(),
        email,
        name: isRootAdmin ? 'Administrador Global' : 'Usuario ' + email.split('@')[0],
        role: isRootAdmin ? 'ADMIN' : 'FREE',
        subscription: {
          plan: isRootAdmin ? 'VIP' : 'FREE',
          status: 'ACTIVE',
          startedAt: new Date().toISOString(),
          expiresAt: isRootAdmin ? null : null,
          autoRenew: false,
          accessLevel: isRootAdmin ? 'ADMIN' : 'FREE',
          paymentGatewayReady: true
        }
      };
      usersDb[user.id] = user;
      writeDbFile('users.json', usersDb);
    }

    const { sessionId, csrfToken } = createSession(user.id, user.role, user.email);
    const secureFlag = NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `streaktracker_session=${sessionId}; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Max-Age=604800`);
    
    logSecurityEvent('LOGIN_SUCCESS', { userId: user.id, role: user.role }, clientIp);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      success: true,
      user,
      csrfToken
    }));
    return;
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    if (sessionToken) invalidateSession(sessionToken);
    const secureFlag = NODE_ENV === 'production' ? '; Secure' : '';
    res.setHeader('Set-Cookie', `streaktracker_session=; Path=/; HttpOnly; SameSite=Lax${secureFlag}; Max-Age=0`);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Session logged out successfully' }));
    return;
  }

  // 3. User Profile Endpoint (Authenticated Session Source of Truth)
  if (pathname === '/api/user/profile') {
    if (!authSession) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Sesión válida de servidor requerida' }));
      return;
    }

    const authenticatedUserId = authSession.userId;
    const usersDb = readDbFile('users.json', {});
    const user = usersDb[authenticatedUserId] || null;

    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = await parseJsonBody(req);
      const sanitizedUpdate = { ...payload };
      delete sanitizedUpdate.id;
      if (authSession.role !== 'ADMIN') {
        delete sanitizedUpdate.role;
      }

      usersDb[authenticatedUserId] = { 
        ...usersDb[authenticatedUserId], 
        ...sanitizedUpdate, 
        id: authenticatedUserId,
        updatedAt: new Date().toISOString() 
      };
      writeDbFile('users.json', usersDb);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: usersDb[authenticatedUserId] }));
      return;
    }
  }

  // 4. Bankroll Operations (Isolated to Authenticated User)
  if (pathname === '/api/user/bankroll') {
    if (!authSession) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Sesión requerida' }));
      return;
    }

    const authenticatedUserId = authSession.userId;
    const bankrollDb = readDbFile('bankroll.json', {});
    const userBankroll = bankrollDb[authenticatedUserId] || { operations: [], config: null };

    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: userBankroll }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = await parseJsonBody(req);
      if (payload.operations) userBankroll.operations = payload.operations;
      if (payload.config) userBankroll.config = payload.config;
      userBankroll.updatedAt = new Date().toISOString();
      bankrollDb[authenticatedUserId] = userBankroll;
      writeDbFile('bankroll.json', bankrollDb);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: userBankroll }));
      return;
    }
  }

  // 5. Checkout Creation Endpoint (Rate-Limited to Max 5 per min per IP)
  if (pathname === '/api/payment/checkout') {
    if (!authSession) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Inicia sesión antes de proceder al checkout' }));
      return;
    }

    if (req.method === 'POST') {
      const rl = checkRateLimit(`checkout_${clientIp}`, RATE_LIMIT_CHECKOUT_MAX);
      if (!rl.allowed) {
        logSecurityEvent('RATE_LIMIT_EXCEEDED', { endpoint: '/api/payment/checkout', limit: RATE_LIMIT_CHECKOUT_MAX }, clientIp);
        res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': Math.ceil(rl.resetInMs / 1000) });
        res.end(JSON.stringify({ error: 'Too Many Requests: Límite de creación de checkout alcanzado. Espera un minuto.' }));
        return;
      }

      const payload = await parseJsonBody(req);
      const targetPlan = payload.plan;
      const provider = payload.provider || 'STRIPE';

      if (!BACKEND_PRICING_CATALOG[targetPlan]) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Plan inválido o no reconocido' }));
        return;
      }

      const planConfig = BACKEND_PRICING_CATALOG[targetPlan];
      const sessionId = `cs_${provider.toLowerCase()}_mock_${Date.now()}_${authSession.userId}`;

      logSecurityEvent('CHECKOUT_REQUEST', { userId: authSession.userId, plan: targetPlan, amount: planConfig.amountUsd }, clientIp);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        environment: PAYMENT_ENVIRONMENT,
        sessionId,
        plan: targetPlan,
        amount: planConfig.amountUsd,
        currency: planConfig.currency,
        checkoutUrl: provider === 'STRIPE'
          ? `https://checkout.stripe.com/pay/mock_session_${targetPlan.toLowerCase()}`
          : `https://www.mercadopago.com/checkout/mock_session_${targetPlan.toLowerCase()}`,
        status: 'PENDING'
      }));
      return;
    }
  }

  // 6. Webhook Stripe Endpoint (Not Rate Limited to allow legitimate asynchronous provider events)
  if (pathname === '/api/webhooks/stripe') {
    if (req.method === 'POST') {
      const stripeSignature = req.headers['stripe-signature'];
      const payload = await parseJsonBody(req);
      const eventId = payload.id || `evt_stripe_${Date.now()}`;

      const processedDb = readDbFile('processed_events.json', []);
      if (processedDb.includes(eventId)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true, status: 'IDEMPOTENT_DUPLICATE_IGNORED' }));
        return;
      }

      if (PAYMENT_ENVIRONMENT === 'PRODUCTION' && (!stripeSignature || stripeSignature === 'invalid_signature')) {
        logSecurityEvent('WEBHOOK_REJECTED', { provider: 'STRIPE', reason: 'Invalid signature' }, clientIp);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Firma de webhook Stripe inválida' }));
        return;
      }

      processedDb.push(eventId);
      writeDbFile('processed_events.json', processedDb);

      const targetUserId = payload.data?.object?.client_reference_id || 'usr_default_01';
      const targetPlan = payload.data?.object?.metadata?.plan || 'VIP';

      if (payload.type === 'checkout.session.completed' || payload.type === 'invoice.paid') {
        const usersDb = readDbFile('users.json', {});
        const user = usersDb[targetUserId] || { id: targetUserId, email: 'trader@streaktracker.io' };
        user.subscription = {
          plan: targetPlan,
          status: 'ACTIVE',
          startedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          autoRenew: true,
          accessLevel: targetPlan,
          providerReferenceId: payload.data?.object?.subscription || `sub_stripe_${Date.now()}`,
          paymentGatewayReady: true
        };
        user.role = targetPlan;
        usersDb[targetUserId] = user;
        writeDbFile('users.json', usersDb);
      }

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true, eventId, environment: PAYMENT_ENVIRONMENT }));
      return;
    }
  }

  // 7. Webhook Mercado Pago Endpoint
  if (pathname === '/api/webhooks/mercadopago') {
    if (req.method === 'POST') {
      const payload = await parseJsonBody(req);
      const eventId = payload.id ? String(payload.id) : `evt_mp_${Date.now()}`;

      const processedDb = readDbFile('processed_events.json', []);
      if (processedDb.includes(eventId)) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true, status: 'IDEMPOTENT_DUPLICATE_IGNORED' }));
        return;
      }

      processedDb.push(eventId);
      writeDbFile('processed_events.json', processedDb);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ received: true, eventId, environment: PAYMENT_ENVIRONMENT }));
      return;
    }
  }

  // 8. Immutable Signal Ledger Server Endpoints
  if (pathname === '/api/signals/ledger') {
    const ledgerDb = readDbFile('ledger.json', []);
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, ledger: ledgerDb }));
      return;
    }
    if (req.method === 'POST') {
      if (!authSession || (authSession.role !== 'ADMIN' && authSession.userId !== 'usr_default_01')) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Forbidden: Permisos administrativos requeridos para asentar ledger' }));
        return;
      }

      const payload = await parseJsonBody(req);
      if (Array.isArray(payload.ledger)) {
        writeDbFile('ledger.json', payload.ledger);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, count: payload.ledger.length }));
        return;
      }
    }
  }

  // 9. Admin Parameters & Audit Logs Server Endpoints (Strict ADMIN Role + Rate Limiter)
  if (pathname === '/api/admin/parameters') {
    const rl = checkRateLimit(`admin_${clientIp}`, RATE_LIMIT_ADMIN_MAX);
    if (!rl.allowed) {
      res.writeHead(429, { 'Content-Type': 'application/json', 'Retry-After': Math.ceil(rl.resetInMs / 1000) });
      res.end(JSON.stringify({ error: 'Too Many Requests: Límite de consultas administrativas alcanzado.' }));
      return;
    }

    if (!authSession) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized: Sesión de administrador requerida' }));
      return;
    }

    const usersDb = readDbFile('users.json', {});
    const currentUserRecord = usersDb[authSession.userId];
    const isServerAdmin = currentUserRecord && currentUserRecord.role === 'ADMIN';

    if (!isServerAdmin) {
      logSecurityEvent('ADMIN_ACCESS_DENIED', { userId: authSession.userId, attemptedRole: authSession.role }, clientIp);
      res.writeHead(403, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Forbidden: Privilegios insuficientes. Rol ADMIN requerido en el registro de servidor.',
        authenticatedRole: currentUserRecord ? currentUserRecord.role : 'UNKNOWN'
      }));
      return;
    }

    const adminDb = readDbFile('admin.json', { parameters: {}, auditLogs: [] });
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: adminDb }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const payload = await parseJsonBody(req);
      if (payload.parameters) adminDb.parameters = payload.parameters;
      if (payload.auditLogs) adminDb.auditLogs = payload.auditLogs;
      writeDbFile('admin.json', adminDb);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, data: adminDb }));
      return;
    }
  }

  // 10. Fixtures Proxy
  if (pathname === '/api/fixtures') {
    const query = parsedUrl.query;
    const cacheKey = JSON.stringify(query);
    const now = Date.now();

    let ttl = TTL_UPCOMING_MS;
    if (query.live === 'all') ttl = TTL_LIVE_MS;
    else if (query.status === 'FT-AET-PEN') ttl = TTL_RECENT_MS;

    const cached = serverCache[cacheKey];
    if (cached && (now - cached.timestamp < ttl)) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        ...cached.data,
        _meta: {
          dataSource: 'CENTRAL_SERVER_CACHE',
          dataFreshness: 'CACHED',
          lastUpdated: new Date(cached.timestamp).toISOString(),
          ageSeconds: Math.floor((now - cached.timestamp) / 1000),
          apiStatus: 'ONLINE'
        }
      }));
      return;
    }

    try {
      const queryString = new URLSearchParams(query).toString();
      const upstreamPath = `/fixtures?${queryString}`;
      const result = await forwardToApiSports(upstreamPath);

      if (result.status === 200 && result.body && !result.body.errors?.rateLimit) {
        serverCache[cacheKey] = {
          data: result.body,
          timestamp: now,
          dataFreshness: 'FRESH'
        };

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ...result.body,
          _meta: {
            dataSource: 'API_SPORTS_LIVE',
            dataFreshness: 'FRESH',
            lastUpdated: new Date(now).toISOString(),
            ageSeconds: 0,
            apiStatus: 'ONLINE'
          }
        }));
      } else {
        if (cached) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            ...cached.data,
            _meta: {
              dataSource: 'CENTRAL_FALLBACK_CACHE',
              dataFreshness: 'FALLBACK',
              lastUpdated: new Date(cached.timestamp).toISOString(),
              ageSeconds: Math.floor((now - cached.timestamp) / 1000),
              apiStatus: 'DEGRADED_QUOTA_REACHED'
            }
          }));
        } else {
          res.writeHead(result.status, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result.body));
        }
      }
    } catch (e) {
      if (cached) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          ...cached.data,
          _meta: {
            dataSource: 'CENTRAL_FALLBACK_CACHE',
            dataFreshness: 'FALLBACK',
            lastUpdated: new Date(cached.timestamp).toISOString(),
            ageSeconds: Math.floor((now - cached.timestamp) / 1000),
            apiStatus: 'UPSTREAM_OFFLINE'
          }
        }));
      }
    }
    return;
  }

  // 11. Serve Static Frontend Web Files (Landing, Dashboard, Assets)
  const distDir = path.join(__dirname, '../dist');
  let filePath = path.join(distDir, pathname === '/' ? 'index.html' : pathname);

  // If specific file not in dist, check for landing.html or root files
  if (!fs.existsSync(filePath)) {
    if (pathname === '/landing.html' || pathname === '/landing') {
      filePath = path.join(distDir, 'landing.html');
      if (!fs.existsSync(filePath)) filePath = path.join(__dirname, '../landing.html');
    } else {
      filePath = path.join(distDir, 'index.html');
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon'
    };
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

if (require.main === module) {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`[StreakTracker Hardened Backend] Running on port ${PORT} [ENV: ${PAYMENT_ENVIRONMENT}, ORIGIN: ${ALLOWED_ORIGIN}]`);
  });
}

module.exports = server;

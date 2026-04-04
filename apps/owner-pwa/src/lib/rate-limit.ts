/**
 * In-memory rate limiter for login attempts.
 * Limits to MAX_ATTEMPTS per WINDOW_MS per IP address.
 */

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, RateLimitEntry>();

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of attempts) {
    if (now > entry.resetAt) {
      attempts.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
} {
  const now = Date.now();
  const entry = attempts.get(identifier);

  // No previous attempts or window expired
  if (!entry || now > entry.resetAt) {
    attempts.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_ATTEMPTS - 1, retryAfterSeconds: 0 };
  }

  // Within window
  if (entry.count < MAX_ATTEMPTS) {
    entry.count++;
    return {
      allowed: true,
      remaining: MAX_ATTEMPTS - entry.count,
      retryAfterSeconds: 0,
    };
  }

  // Rate limited
  const retryAfterSeconds = Math.ceil((entry.resetAt - now) / 1000);
  return { allowed: false, remaining: 0, retryAfterSeconds };
}

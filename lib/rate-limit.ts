/**
 * Phase 1 in-memory rate limit (~3 PDFs/day/IP).
 * Replace with Redis (or Supabase usage_daily) before multi-instance production.
 */

type Entry = { day: string; count: number };

const store = new Map<string, Entry>();

function utcDay(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}

export function checkAndIncrementDemoLimit(
  ip: string,
  limit = 3
): { allowed: boolean; remaining: number; used: number } {
  const day = utcDay();
  const key = `${ip}:${day}`;
  const current = store.get(key);

  if (!current || current.day !== day) {
    store.set(key, { day, count: 1 });
    return { allowed: true, remaining: limit - 1, used: 1 };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, used: current.count };
  }

  current.count += 1;
  store.set(key, current);
  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    used: current.count,
  };
}

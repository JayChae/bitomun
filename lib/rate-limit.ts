type RateLimitStore = {
  count: number;
  resetTime: number;
};

const store = new Map<string, RateLimitStore>();

export type RateLimitConfig = {
  interval: number; // milliseconds
  uniqueTokenPerInterval: number;
};

export function rateLimit(config: RateLimitConfig) {
  const { interval, uniqueTokenPerInterval } = config;

  return {
    check: async (
      limit: number,
      token: string,
    ): Promise<{ success: boolean; remaining: number }> => {
      const now = Date.now();
      const tokenKey = token;

      // Clean up old entries
      if (store.size > uniqueTokenPerInterval) {
        const entries = Array.from(store.entries());
        const expired = entries.filter(([, value]) => value.resetTime < now);
        expired.forEach(([key]) => store.delete(key));
      }

      const tokenData = store.get(tokenKey);

      if (!tokenData || tokenData.resetTime < now) {
        // New window
        store.set(tokenKey, {
          count: 1,
          resetTime: now + interval,
        });
        return { success: true, remaining: limit - 1 };
      }

      // Within window
      if (tokenData.count >= limit) {
        return { success: false, remaining: 0 };
      }

      tokenData.count++;
      store.set(tokenKey, tokenData);
      return { success: true, remaining: limit - tokenData.count };
    },
  };
}

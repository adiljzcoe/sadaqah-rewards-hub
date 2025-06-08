
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class Cache {
  private storage: Map<string, CacheItem<any>> = new Map();
  private defaultTTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl?: number): void {
    const expiry = Date.now() + (ttl || this.defaultTTL);
    this.storage.set(key, {
      data,
      timestamp: Date.now(),
      expiry
    });
  }

  get<T>(key: string): T | null {
    const item = this.storage.get(key);
    
    if (!item) {
      return null;
    }

    if (Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key: string): boolean {
    return this.storage.delete(key);
  }

  clear(): void {
    this.storage.clear();
  }

  // Clean up expired items
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.storage.entries()) {
      if (now > item.expiry) {
        this.storage.delete(key);
      }
    }
  }

  // Get cache statistics
  getStats() {
    return {
      size: this.storage.size,
      keys: Array.from(this.storage.keys()),
      memory: JSON.stringify(Array.from(this.storage.entries())).length
    };
  }
}

// Singleton instance
export const cache = new Cache();

// Cleanup expired items every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => cache.cleanup(), 10 * 60 * 1000);
}

// React Query cache configuration
export const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
};

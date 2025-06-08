
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { cache } from '@/utils/cache';

export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastRun = useRef<number>(Date.now());

  return useCallback(
    ((...args: Parameters<T>) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args);
        lastRun.current = Date.now();
      }
    }) as T,
    [callback, delay]
  );
};

export const useMemoizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  return useCallback(callback, deps);
};

export const useCachedData = <T>(
  key: string,
  fetchFunction: () => Promise<T>,
  ttl?: number
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Check cache first
      const cachedData = cache.get<T>(key);
      if (cachedData) {
        setData(cachedData);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const result = await fetchFunction();
        cache.set(key, result, ttl);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFunction, ttl]);

  return { data, loading, error };
};

// Import useState at the top
import { useState } from 'react';

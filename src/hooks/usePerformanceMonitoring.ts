
import { useEffect, useCallback } from 'react';

interface PerformanceMetrics {
  pageLoadTime: number;
  renderTime: number;
  componentCount: number;
  memoryUsage?: number;
}

export const usePerformanceMonitoring = (componentName: string) => {
  const trackMetrics = useCallback((metrics: Partial<PerformanceMetrics>) => {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = {
        component: componentName,
        timestamp: Date.now(),
        url: window.location.pathname,
        ...metrics
      };
      
      // Log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Performance Metrics:', perfData);
      }
      
      // In production, you could send this to analytics
      // analytics.track('performance_metric', perfData);
    }
  }, [componentName]);

  const measureRenderTime = useCallback(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      trackMetrics({ renderTime: endTime - startTime });
    };
  }, [trackMetrics]);

  useEffect(() => {
    // Track page load time
    if (typeof window !== 'undefined' && window.performance) {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      trackMetrics({ pageLoadTime: loadTime });
    }
  }, [trackMetrics]);

  return { trackMetrics, measureRenderTime };
};

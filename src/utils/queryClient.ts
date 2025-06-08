
import { QueryClient } from '@tanstack/react-query';
import { queryConfig } from '@/utils/cache';

export const queryClient = new QueryClient(queryConfig);

// Global error handler
queryClient.setDefaultOptions({
  queries: {
    ...queryConfig.defaultOptions.queries,
    onError: (error) => {
      console.error('Query error:', error);
      // In production, send to error monitoring service
    },
  },
  mutations: {
    onError: (error) => {
      console.error('Mutation error:', error);
      // In production, send to error monitoring service
    },
  },
});


import { QueryClient } from '@tanstack/react-query';
import { queryConfig } from '@/utils/cache';

export const queryClient = new QueryClient(queryConfig);

// Global error handler using the correct React Query v5 API
queryClient.setDefaultOptions({
  queries: {
    ...queryConfig.defaultOptions.queries,
    throwOnError: (error) => {
      console.error('Query error:', error);
      // In production, send to error monitoring service
      return false;
    },
  },
  mutations: {
    throwOnError: (error) => {
      console.error('Mutation error:', error);
      // In production, send to error monitoring service
      return false;
    },
  },
});

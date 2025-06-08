
import React, { Suspense, lazy } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const LazyWrapper: React.FC<LazyWrapperProps> = ({ 
  children, 
  fallback,
  className 
}) => {
  const defaultFallback = (
    <div className={className}>
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-32 w-full" />
      </div>
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
};

// Higher-order component for lazy loading
export const withLazyLoading = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) => {
  const LazyComponent = lazy(() => Promise.resolve({ default: Component }));
  
  return (props: P) => (
    <LazyWrapper fallback={fallback}>
      <LazyComponent {...props} />
    </LazyWrapper>
  );
};

export default LazyWrapper;

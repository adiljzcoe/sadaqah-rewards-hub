
import React, { Suspense, ReactNode } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface LoadingBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  skeleton?: 'card' | 'list' | 'table' | 'dashboard';
}

const LoadingSkeleton = ({ type }: { type: 'card' | 'list' | 'table' | 'dashboard' }) => {
  switch (type) {
    case 'card':
      return (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-4/5" />
          </CardContent>
        </Card>
      );
    
    case 'list':
      return (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      );
    
    case 'table':
      return (
        <div className="space-y-3">
          <Skeleton className="h-8 w-full" />
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          ))}
        </div>
      );
    
    case 'dashboard':
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-8 w-8 mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      );
    
    default:
      return <Skeleton className="h-32 w-full" />;
  }
};

const LoadingBoundary: React.FC<LoadingBoundaryProps> = ({ 
  children, 
  fallback, 
  skeleton = 'card' 
}) => {
  const loadingFallback = fallback || <LoadingSkeleton type={skeleton} />;

  return (
    <Suspense fallback={loadingFallback}>
      {children}
    </Suspense>
  );
};

export default LoadingBoundary;

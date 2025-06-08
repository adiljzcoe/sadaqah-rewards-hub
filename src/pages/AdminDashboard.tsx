
import React from 'react';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import LoadingBoundary from '@/components/common/LoadingBoundary';
import ProtectedRoute from '@/components/ui/protected-route';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';
import { usePermissions } from '@/hooks/usePermissions';
import logger from '@/utils/logger';

const AdminDashboard = () => {
  const { userRole } = usePermissions();

  // Log admin access
  React.useEffect(() => {
    logger.userAction('Admin Dashboard Accessed', undefined, { component: 'AdminDashboard', role: userRole });
  }, [userRole]);

  return (
    <ProtectedRoute 
      requireAuth={true} 
      requiredPermissions={['admin.full_access', 'admin.user_management', 'admin.content_management']}
    >
      <ErrorBoundary>
        <LoadingBoundary skeleton="dashboard">
          <AdminDashboardContent />
        </LoadingBoundary>
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

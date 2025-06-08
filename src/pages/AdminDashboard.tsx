
import React from 'react';
import AdminDashboardContent from '@/components/admin/AdminDashboardContent';
import { AuthProvider } from '@/hooks/useAuth';

const AdminDashboard = () => {
  return (
    <AuthProvider>
      <AdminDashboardContent />
    </AuthProvider>
  );
};

export default AdminDashboard;

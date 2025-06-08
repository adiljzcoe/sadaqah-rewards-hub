
import { useAuth } from '@/hooks/useAuth';
import { useMemo } from 'react';

export type Permission = 
  | 'admin.full_access'
  | 'admin.user_management'
  | 'admin.financial_management'
  | 'admin.content_management'
  | 'charity.manage_campaigns'
  | 'charity.view_analytics'
  | 'masjid.manage_content'
  | 'masjid.manage_events'
  | 'user.make_donations'
  | 'user.view_profile';

export type UserRole = 'super_admin' | 'admin' | 'charity_admin' | 'masjid_admin' | 'user';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  super_admin: [
    'admin.full_access',
    'admin.user_management',
    'admin.financial_management',
    'admin.content_management',
    'charity.manage_campaigns',
    'charity.view_analytics',
    'masjid.manage_content',
    'masjid.manage_events',
    'user.make_donations',
    'user.view_profile',
  ],
  admin: [
    'admin.user_management',
    'admin.content_management',
    'charity.view_analytics',
    'user.make_donations',
    'user.view_profile',
  ],
  charity_admin: [
    'charity.manage_campaigns',
    'charity.view_analytics',
    'user.make_donations',
    'user.view_profile',
  ],
  masjid_admin: [
    'masjid.manage_content',
    'masjid.manage_events',
    'user.make_donations',
    'user.view_profile',
  ],
  user: [
    'user.make_donations',
    'user.view_profile',
  ],
};

export const usePermissions = () => {
  const { user } = useAuth();

  const userRole = useMemo((): UserRole => {
    if (!user) return 'user';
    
    // This should come from user profile/roles table
    // For now, using a simple check - in production this would be from database
    if (user.email === 'admin@test.com') return 'super_admin';
    if (user.email?.includes('admin')) return 'admin';
    
    return 'user';
  }, [user]);

  const permissions = useMemo(() => {
    return ROLE_PERMISSIONS[userRole] || [];
  }, [userRole]);

  const hasPermission = (permission: Permission): boolean => {
    return permissions.includes(permission);
  };

  const hasAnyPermission = (permissionList: Permission[]): boolean => {
    return permissionList.some(permission => hasPermission(permission));
  };

  const hasAllPermissions = (permissionList: Permission[]): boolean => {
    return permissionList.every(permission => hasPermission(permission));
  };

  return {
    userRole,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

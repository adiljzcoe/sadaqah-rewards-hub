
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Users, Settings, Edit3, Save, X } from 'lucide-react';
import { usePermissions, UserRole, Permission } from '@/hooks/usePermissions';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@test.com',
    full_name: 'Super Admin',
    role: 'super_admin',
    created_at: '2024-01-01'
  },
  {
    id: '2',
    email: 'john@charity.org',
    full_name: 'John Smith',
    role: 'charity_admin',
    created_at: '2024-01-15'
  },
  {
    id: '3',
    email: 'sarah@mosque.org',
    full_name: 'Sarah Ahmed',
    role: 'masjid_admin',
    created_at: '2024-01-20'
  },
];

const roleDescriptions: Record<UserRole, string> = {
  super_admin: 'Full platform access with all permissions',
  admin: 'General admin access with user and content management',
  charity_admin: 'Charity-specific admin access for campaigns and analytics',
  masjid_admin: 'Masjid-specific admin access for content and events',
  user: 'Standard user access with donation and profile management'
};

const roleColors: Record<UserRole, string> = {
  super_admin: 'bg-red-100 text-red-800',
  admin: 'bg-blue-100 text-blue-800',
  charity_admin: 'bg-green-100 text-green-800',
  masjid_admin: 'bg-purple-100 text-purple-800',
  user: 'bg-gray-100 text-gray-800'
};

const RoleManagement = () => {
  const { hasPermission, userRole } = usePermissions();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('user');

  const handleRoleChange = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role } : user
    ));
    setEditingUser(null);
    console.log(`Updated user ${userId} role to ${role}`);
  };

  const canEditRoles = hasPermission('admin.full_access');

  if (!canEditRoles) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <Shield className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">Access Restricted</h3>
          <p className="text-gray-600">
            Only super admins can manage user roles and permissions.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Role & Permission Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-6">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Be careful when changing user roles. Role changes take effect immediately and affect user access to platform features.
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h4 className="font-medium">{user.full_name}</h4>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <Badge className={roleColors[user.role]}>
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  {editingUser === user.id ? (
                    <>
                      <Select
                        value={newRole}
                        onValueChange={(value: UserRole) => setNewRole(value)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="masjid_admin">Masjid Admin</SelectItem>
                          <SelectItem value="charity_admin">Charity Admin</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          {userRole === 'super_admin' && (
                            <SelectItem value="super_admin">Super Admin</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        onClick={() => handleRoleChange(user.id, newRole)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUser(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingUser(user.id);
                        setNewRole(user.role);
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Role Permissions Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(roleDescriptions).map(([role, description]) => (
              <div key={role} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={roleColors[role as UserRole]}>
                    {role.replace('_', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoleManagement;

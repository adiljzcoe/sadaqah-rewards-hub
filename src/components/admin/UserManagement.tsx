
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UserPlus, Users, Mail, Lock, User } from 'lucide-react';

const UserManagement = () => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'user'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const createUser = async () => {
    setIsCreating(true);
    try {
      console.log('🔧 Creating user:', formData.email);

      // Create the user using Supabase Admin API
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: formData.email,
        password: formData.password,
        email_confirm: true,
        user_metadata: {
          full_name: formData.fullName
        }
      });

      if (authError) {
        console.error('❌ Auth user creation failed:', authError);
        throw new Error(`Failed to create user: ${authError.message}`);
      }

      console.log('✅ Auth user created:', authData.user.id);

      // Create the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          email: formData.email,
          full_name: formData.fullName,
          role: formData.role as any
        });

      if (profileError) {
        console.error('❌ Profile creation failed:', profileError);
        throw new Error(`Failed to create profile: ${profileError.message}`);
      }

      console.log('✅ Profile created successfully');

      toast({
        title: "User Created Successfully! 🎉",
        description: `User ${formData.email} has been created and can now log in.`,
      });

      // Reset form
      setFormData({
        email: '',
        password: '',
        fullName: '',
        role: 'user'
      });

    } catch (error: any) {
      console.error('❌ Error creating user:', error);
      toast({
        title: "User Creation Failed",
        description: error.message || 'Failed to create user. Check console for details.',
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const createTestUsers = async () => {
    setIsCreating(true);
    try {
      console.log('🚀 Creating test users...');

      const testUsers = [
        {
          email: 'admin@test.com',
          password: 'admin123',
          fullName: 'Test Admin',
          role: 'admin'
        },
        {
          email: 'user@test.com',
          password: 'user123',
          fullName: 'Test User',
          role: 'user'
        },
        {
          email: 'donor@test.com',
          password: 'donor123',
          fullName: 'Test Donor',
          role: 'user'
        }
      ];

      let successCount = 0;
      let failCount = 0;

      for (const userData of testUsers) {
        try {
          // Create auth user
          const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: userData.email,
            password: userData.password,
            email_confirm: true,
            user_metadata: {
              full_name: userData.fullName
            }
          });

          if (authError) {
            console.error(`❌ Failed to create ${userData.email}:`, authError);
            failCount++;
            continue;
          }

          // Create profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: authData.user.id,
              email: userData.email,
              full_name: userData.fullName,
              role: userData.role as any
            });

          if (profileError) {
            console.error(`❌ Failed to create profile for ${userData.email}:`, profileError);
            failCount++;
            continue;
          }

          console.log(`✅ Created user: ${userData.email}`);
          successCount++;

        } catch (error) {
          console.error(`❌ Error with ${userData.email}:`, error);
          failCount++;
        }
      }

      toast({
        title: "Test Users Creation Complete! 🎉",
        description: `Created ${successCount} users successfully. ${failCount} failed.`,
      });

    } catch (error: any) {
      console.error('❌ Error creating test users:', error);
      toast({
        title: "Test Users Creation Failed",
        description: error.message || 'Failed to create test users.',
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>
          Create authenticated users that can be used with donations and other features.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <User className="h-4 w-4" />
              Create Individual User
            </h4>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <Button 
                onClick={createUser}
                disabled={isCreating || !formData.email || !formData.password}
                className="w-full"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium flex items-center gap-2">
              <Users className="h-4 w-4" />
              Quick Test Users
            </h4>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <p>This will create 3 test users:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><strong>admin@test.com</strong> (password: admin123) - Admin role</li>
                  <li><strong>user@test.com</strong> (password: user123) - User role</li>
                  <li><strong>donor@test.com</strong> (password: donor123) - User role</li>
                </ul>
              </div>
              
              <Button 
                onClick={createTestUsers}
                disabled={isCreating}
                variant="outline"
                className="w-full"
              >
                <Users className="h-4 w-4 mr-2" />
                {isCreating ? 'Creating...' : 'Create Test Users'}
              </Button>
            </div>
          </div>
        </div>

        {isCreating && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              🔄 Creating users... Check the console for detailed progress logs.
            </p>
          </div>
        )}

        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-700">
            ✅ Users created here will be real authenticated users that can log in and be used in donations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;

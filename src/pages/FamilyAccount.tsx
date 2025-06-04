
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import FamilyDashboard from '@/components/family/FamilyDashboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowRight } from 'lucide-react';

const FamilyAccount = () => {
  const { user, fakeUserLogin } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <CardTitle>Family Account Access</CardTitle>
            <CardDescription>
              Please log in to access your family dashboard and manage your children's charity accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={fakeUserLogin} className="w-full">
              <Users className="h-4 w-4 mr-2" />
              Demo Family Login
            </Button>
            <div className="text-center">
              <Button variant="link" className="text-blue-600">
                Go to Main Login Page
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <FamilyDashboard />;
};

export default FamilyAccount;

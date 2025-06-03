
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, User, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const FloatingLoginWidget = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const { user, fakeAdminLogin, fakeUserLogin } = useAuth();

  // Don't show the widget if user is already logged in
  if (user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`bg-white rounded-lg shadow-lg border transition-all duration-300 ${
        isMinimized ? 'w-12 h-12' : 'w-64 p-4'
      }`}>
        {isMinimized ? (
          <Button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            <User className="h-5 w-5" />
          </Button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800">Test Login</h3>
              <Button
                onClick={() => setIsMinimized(true)}
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              <Button 
                onClick={fakeUserLogin}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm"
              >
                <User className="h-4 w-4 mr-2" />
                Test User
              </Button>
              
              <Button 
                onClick={fakeAdminLogin}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm"
              >
                <Shield className="h-4 w-4 mr-2" />
                Test Admin
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingLoginWidget;

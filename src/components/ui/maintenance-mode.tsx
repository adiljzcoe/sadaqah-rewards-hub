
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Construction, RefreshCw } from 'lucide-react';
import { appConfig } from '@/config/app.config';

const MaintenanceMode: React.FC = () => {
  if (!appConfig.features.maintenance) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-4">
            <Construction className="w-8 h-8 text-orange-600" />
          </div>
          <CardTitle className="text-2xl">Under Maintenance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-gray-600">
            We're currently performing scheduled maintenance to improve your experience. 
            We'll be back shortly.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Expected Duration:</strong> Approximately 30 minutes
            </p>
            <p className="text-sm text-blue-800 mt-1">
              <strong>Started:</strong> {new Date().toLocaleTimeString()}
            </p>
          </div>
          
          <Button 
            onClick={() => window.location.reload()} 
            variant="outline" 
            className="w-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Check Again
          </Button>
          
          <p className="text-xs text-gray-500">
            Follow us on social media for updates on maintenance progress.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceMode;

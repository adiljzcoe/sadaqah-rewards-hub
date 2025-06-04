
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { AlertTriangle, Shield, ShieldOff, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const DemoModeControl = () => {
  const [demoMode, setDemoMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchDemoModeStatus();
  }, []);

  const fetchDemoModeStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'demo_mode')
        .single();

      if (error) {
        console.error('Error fetching demo mode status:', error);
        return;
      }

      setDemoMode(data?.setting_value === 'true');
    } catch (error) {
      console.error('Error fetching demo mode status:', error);
    }
  };

  const toggleDemoMode = async (enabled: boolean) => {
    setLoading(true);
    
    try {
      // Update the demo mode setting
      const { error: settingsError } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'demo_mode',
          setting_value: enabled.toString(),
          updated_at: new Date().toISOString()
        });

      if (settingsError) {
        throw settingsError;
      }

      // Call the appropriate RLS function
      const functionName = enabled ? 'disable_rls_for_testing' : 'enable_rls_for_production';
      const { error: functionError } = await supabase.rpc(functionName);

      if (functionError) {
        throw functionError;
      }

      setDemoMode(enabled);
      
      toast({
        title: enabled ? "Demo Mode Enabled" : "Production Mode Enabled",
        description: enabled 
          ? "Row Level Security has been disabled for testing. All admin features should now work."
          : "Row Level Security has been re-enabled. The system is now secure for production.",
      });

    } catch (error) {
      console.error('Error toggling demo mode:', error);
      toast({
        title: "Error",
        description: "Failed to toggle demo mode. Please check the console for details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const testPushNotifications = async () => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-push-notification', {
        body: {
          title: 'Test Notification',
          message: 'This is a test notification from the admin dashboard',
          audience: 'all'
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Test Successful",
        description: "Push notification test completed successfully!",
      });

    } catch (error) {
      console.error('Push notification test failed:', error);
      toast({
        title: "Test Failed",
        description: `Push notification test failed: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Demo Mode Control
        </CardTitle>
        <CardDescription>
          Manage Row Level Security settings for testing and production
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <span className="font-medium">Current Mode:</span>
          <Badge variant={demoMode ? "destructive" : "default"} className="flex items-center gap-1">
            {demoMode ? (
              <>
                <ShieldOff className="h-3 w-3" />
                Demo Mode (RLS Disabled)
              </>
            ) : (
              <>
                <Shield className="h-3 w-3" />
                Production Mode (RLS Enabled)
              </>
            )}
          </Badge>
        </div>

        {/* Warning for Demo Mode */}
        {demoMode && (
          <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Demo Mode Active</p>
              <p className="text-yellow-700">
                Row Level Security is currently disabled. This is great for testing but should be 
                re-enabled before going to production.
              </p>
            </div>
          </div>
        )}

        {/* Toggle Control */}
        <div className="flex items-center space-x-2">
          <Switch
            id="demo-mode"
            checked={demoMode}
            onCheckedChange={toggleDemoMode}
            disabled={loading}
          />
          <Label htmlFor="demo-mode">
            {demoMode ? 'Disable Demo Mode (Enable RLS)' : 'Enable Demo Mode (Disable RLS)'}
          </Label>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="font-medium">Quick Tests:</h4>
          <Button
            onClick={testPushNotifications}
            disabled={loading}
            variant="outline"
            className="w-full"
          >
            Test Push Notifications
          </Button>
        </div>

        {/* Information */}
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>Demo Mode:</strong> Disables RLS for easier testing of admin features</p>
          <p><strong>Production Mode:</strong> Enables RLS for secure production deployment</p>
          <p><strong>Note:</strong> You can toggle between modes as needed during development</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DemoModeControl;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe, Mail, Shield, Database, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const SystemSettings = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    siteName: 'Donate Feels Great',
    siteDescription: 'Islamic charity platform with gamification and community features',
    supportEmail: 'support@donatefeelsgreat.com',
    defaultCurrency: 'GBP',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    pushNotifications: true,
    analyticsEnabled: true,
    maxUploadSize: '10MB',
    sessionTimeout: 30,
    rateLimitRequests: 1000,
    rateLimitWindow: 60,
    autoBackup: true,
    backupRetention: 30,
    logLevel: 'info',
    cacheExpiry: 3600
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSetting = (section: string) => {
    toast({
      title: "Settings Saved",
      description: `${section} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="h-6 w-6" />
        <h2 className="text-2xl font-bold">System Settings</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => updateSetting('siteName', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => updateSetting('siteDescription', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => updateSetting('supportEmail', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="defaultCurrency">Default Currency</Label>
              <Select value={settings.defaultCurrency} onValueChange={(value) => updateSetting('defaultCurrency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="SAR">SAR (ر.س)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={() => saveSetting('General')} className="w-full mt-4">
              Save General Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security & Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Temporarily disable site access</p>
              </div>
              <Switch
                checked={settings.maintenanceMode}
                onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>User Registration</Label>
                <p className="text-sm text-gray-600">Allow new user registrations</p>
              </div>
              <Switch
                checked={settings.registrationEnabled}
                onCheckedChange={(checked) => updateSetting('registrationEnabled', checked)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rateLimitRequests">Rate Limit (requests per window)</Label>
              <Input
                id="rateLimitRequests"
                type="number"
                value={settings.rateLimitRequests}
                onChange={(e) => updateSetting('rateLimitRequests', parseInt(e.target.value))}
              />
            </div>

            <Button onClick={() => saveSetting('Security')} className="w-full mt-4">
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Enable browser push notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-gray-600">Track user behavior for insights</p>
              </div>
              <Switch
                checked={settings.analyticsEnabled}
                onCheckedChange={(checked) => updateSetting('analyticsEnabled', checked)}
              />
            </div>

            <Button onClick={() => saveSetting('Notifications')} className="w-full mt-4">
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* System Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="maxUploadSize">Max Upload Size</Label>
              <Select value={settings.maxUploadSize} onValueChange={(value) => updateSetting('maxUploadSize', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1MB">1MB</SelectItem>
                  <SelectItem value="5MB">5MB</SelectItem>
                  <SelectItem value="10MB">10MB</SelectItem>
                  <SelectItem value="25MB">25MB</SelectItem>
                  <SelectItem value="50MB">50MB</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cacheExpiry">Cache Expiry (seconds)</Label>
              <Input
                id="cacheExpiry"
                type="number"
                value={settings.cacheExpiry}
                onChange={(e) => updateSetting('cacheExpiry', parseInt(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logLevel">Log Level</Label>
              <Select value={settings.logLevel} onValueChange={(value) => updateSetting('logLevel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600">Automatically backup database</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => updateSetting('autoBackup', checked)}
              />
            </div>

            <Button onClick={() => saveSetting('Performance')} className="w-full mt-4">
              Save Performance Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemSettings;

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Settings, Mail, CreditCard, BarChart3, Globe } from 'lucide-react';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SiteSettings: React.FC = () => {
  const { data: configs, refetch } = useSiteConfig();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState({
    // General
    site_name: '',
    site_description: '',
    site_logo_url: '',
    contact_email: '',
    support_phone: '',
    maintenance_mode: false,
    
    // Payments
    stripe_publishable_key: '',
    stripe_secret_key: '',
    paypal_client_id: '',
    
    // Email
    smtp_host: '',
    smtp_port: 587,
    smtp_username: '',
    smtp_password: '',
    
    // Analytics
    google_analytics_id: '',
    facebook_pixel_id: '',
    
    // Media
    max_upload_size: 10485760,
    allowed_file_types: 'jpg,jpeg,png,gif,pdf,doc,docx'
  });

  React.useEffect(() => {
    if (configs && Array.isArray(configs)) {
      const configObject = configs.reduce((acc, config) => {
        let value = config.config_value;
        
        // Parse JSON values
        if (typeof value === 'string') {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if not valid JSON
          }
        }
        
        if (config.config_key === 'allowed_file_types' && Array.isArray(value)) {
          value = value.join(',');
        }
        
        acc[config.config_key] = value;
        return acc;
      }, {} as any);

      setSettings(prev => ({ ...prev, ...configObject }));
    }
  }, [configs]);

  const updateConfig = async (key: string, value: any, type: string = 'string') => {
    try {
      let processedValue = value;
      
      // Convert to appropriate JSON format
      if (type === 'string') {
        processedValue = JSON.stringify(value);
      } else if (type === 'number') {
        processedValue = Number(value);
      } else if (type === 'boolean') {
        processedValue = Boolean(value);
      } else if (type === 'array' && typeof value === 'string') {
        processedValue = JSON.stringify(value.split(',').map(item => item.trim()));
      }

      const { error } = await supabase
        .from('site_config')
        .upsert({
          config_key: key,
          config_value: processedValue,
          config_type: type
        }, {
          onConflict: 'config_key'
        });

      if (error) throw error;
      
      return true;
    } catch (error) {
      console.error('Error updating config:', error);
      return false;
    }
  };

  const handleSave = async (category: string) => {
    setLoading(true);
    
    try {
      const updates = [];
      
      if (category === 'general') {
        updates.push(
          updateConfig('site_name', settings.site_name, 'string'),
          updateConfig('site_description', settings.site_description, 'string'),
          updateConfig('site_logo_url', settings.site_logo_url, 'string'),
          updateConfig('contact_email', settings.contact_email, 'string'),
          updateConfig('support_phone', settings.support_phone, 'string'),
          updateConfig('maintenance_mode', settings.maintenance_mode, 'boolean')
        );
      } else if (category === 'payments') {
        updates.push(
          updateConfig('stripe_publishable_key', settings.stripe_publishable_key, 'string'),
          updateConfig('stripe_secret_key', settings.stripe_secret_key, 'string'),
          updateConfig('paypal_client_id', settings.paypal_client_id, 'string')
        );
      } else if (category === 'email') {
        updates.push(
          updateConfig('smtp_host', settings.smtp_host, 'string'),
          updateConfig('smtp_port', settings.smtp_port, 'number'),
          updateConfig('smtp_username', settings.smtp_username, 'string'),
          updateConfig('smtp_password', settings.smtp_password, 'string')
        );
      } else if (category === 'analytics') {
        updates.push(
          updateConfig('google_analytics_id', settings.google_analytics_id, 'string'),
          updateConfig('facebook_pixel_id', settings.facebook_pixel_id, 'string')
        );
      } else if (category === 'media') {
        updates.push(
          updateConfig('max_upload_size', settings.max_upload_size, 'number'),
          updateConfig('allowed_file_types', settings.allowed_file_types, 'array')
        );
      }

      const results = await Promise.all(updates);
      
      if (results.every(Boolean)) {
        toast({
          title: "Success",
          description: "Settings updated successfully",
        });
        refetch();
      } else {
        throw new Error('Some updates failed');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Site Settings</h2>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="site_name">Site Name</Label>
                  <Input
                    id="site_name"
                    value={settings.site_name}
                    onChange={(e) => setSettings({ ...settings, site_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="site_logo_url">Site Logo URL</Label>
                  <Input
                    id="site_logo_url"
                    value={settings.site_logo_url}
                    onChange={(e) => setSettings({ ...settings, site_logo_url: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => setSettings({ ...settings, site_description: e.target.value })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact_email">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="support_phone">Support Phone</Label>
                  <Input
                    id="support_phone"
                    value={settings.support_phone}
                    onChange={(e) => setSettings({ ...settings, support_phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance_mode"
                  checked={settings.maintenance_mode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenance_mode: checked })}
                />
                <Label htmlFor="maintenance_mode">Maintenance Mode</Label>
              </div>

              <Button 
                onClick={() => handleSave('general')}
                disabled={loading}
                className="bg-islamic-green-600 hover:bg-islamic-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="stripe_publishable_key">Stripe Publishable Key</Label>
                  <Input
                    id="stripe_publishable_key"
                    value={settings.stripe_publishable_key}
                    onChange={(e) => setSettings({ ...settings, stripe_publishable_key: e.target.value })}
                    placeholder="pk_..."
                  />
                </div>
                <div>
                  <Label htmlFor="stripe_secret_key">Stripe Secret Key</Label>
                  <Input
                    id="stripe_secret_key"
                    type="password"
                    value={settings.stripe_secret_key}
                    onChange={(e) => setSettings({ ...settings, stripe_secret_key: e.target.value })}
                    placeholder="sk_..."
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="paypal_client_id">PayPal Client ID</Label>
                <Input
                  id="paypal_client_id"
                  value={settings.paypal_client_id}
                  onChange={(e) => setSettings({ ...settings, paypal_client_id: e.target.value })}
                />
              </div>

              <Button 
                onClick={() => handleSave('payments')}
                disabled={loading}
                className="bg-islamic-green-600 hover:bg-islamic-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp_host">SMTP Host</Label>
                  <Input
                    id="smtp_host"
                    value={settings.smtp_host}
                    onChange={(e) => setSettings({ ...settings, smtp_host: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label htmlFor="smtp_port">SMTP Port</Label>
                  <Input
                    id="smtp_port"
                    type="number"
                    value={settings.smtp_port}
                    onChange={(e) => setSettings({ ...settings, smtp_port: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="smtp_username">SMTP Username</Label>
                  <Input
                    id="smtp_username"
                    value={settings.smtp_username}
                    onChange={(e) => setSettings({ ...settings, smtp_username: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="smtp_password">SMTP Password</Label>
                  <Input
                    id="smtp_password"
                    type="password"
                    value={settings.smtp_password}
                    onChange={(e) => setSettings({ ...settings, smtp_password: e.target.value })}
                  />
                </div>
              </div>

              <Button 
                onClick={() => handleSave('email')}
                disabled={loading}
                className="bg-islamic-green-600 hover:bg-islamic-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                <Input
                  id="google_analytics_id"
                  value={settings.google_analytics_id}
                  onChange={(e) => setSettings({ ...settings, google_analytics_id: e.target.value })}
                  placeholder="GA-XXXXXXXXX-X"
                />
              </div>

              <div>
                <Label htmlFor="facebook_pixel_id">Facebook Pixel ID</Label>
                <Input
                  id="facebook_pixel_id"
                  value={settings.facebook_pixel_id}
                  onChange={(e) => setSettings({ ...settings, facebook_pixel_id: e.target.value })}
                />
              </div>

              <Button 
                onClick={() => handleSave('analytics')}
                disabled={loading}
                className="bg-islamic-green-600 hover:bg-islamic-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Analytics Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>Media Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="max_upload_size">Max Upload Size (bytes)</Label>
                <Input
                  id="max_upload_size"
                  type="number"
                  value={settings.max_upload_size}
                  onChange={(e) => setSettings({ ...settings, max_upload_size: parseInt(e.target.value) })}
                />
              </div>

              <div>
                <Label htmlFor="allowed_file_types">Allowed File Types</Label>
                <Input
                  id="allowed_file_types"
                  value={settings.allowed_file_types}
                  onChange={(e) => setSettings({ ...settings, allowed_file_types: e.target.value })}
                  placeholder="jpg,jpeg,png,gif,pdf,doc,docx"
                />
              </div>

              <Button 
                onClick={() => handleSave('media')}
                disabled={loading}
                className="bg-islamic-green-600 hover:bg-islamic-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Media Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SiteSettings;

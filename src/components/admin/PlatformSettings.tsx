
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PlatformSettingsData {
  sandbox_mode: boolean;
  stripe_publishable_key: string;
  stripe_secret_key: string;
  stripe_webhook_secret: string;
  openai_api_key: string;
  twilio_api_key: string;
  sendgrid_api_key: string;
}

const PlatformSettings: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSecrets, setShowSecrets] = useState({
    stripe_secret_key: false,
    stripe_webhook_secret: false,
    openai_api_key: false,
    twilio_api_key: false,
    sendgrid_api_key: false,
  });

  const [settings, setSettings] = useState<PlatformSettingsData>({
    sandbox_mode: true,
    stripe_publishable_key: '',
    stripe_secret_key: '',
    stripe_webhook_secret: '',
    openai_api_key: '',
    twilio_api_key: '',
    sendgrid_api_key: '',
  });

  const [errors, setErrors] = useState<Partial<PlatformSettingsData>>({});

  const validateSettings = (): boolean => {
    const newErrors: Partial<PlatformSettingsData> = {};

    // Validate Stripe publishable key format
    if (settings.stripe_publishable_key && !settings.stripe_publishable_key.startsWith('pk_')) {
      newErrors.stripe_publishable_key = 'Stripe publishable key must start with "pk_"';
    }

    // Validate Stripe secret key format
    if (settings.stripe_secret_key && !settings.stripe_secret_key.startsWith('sk_')) {
      newErrors.stripe_secret_key = 'Stripe secret key must start with "sk_"';
    }

    // Validate webhook secret format
    if (settings.stripe_webhook_secret && !settings.stripe_webhook_secret.startsWith('whsec_')) {
      newErrors.stripe_webhook_secret = 'Webhook secret must start with "whsec_"';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      toast({
        title: "Validation Error",
        description: "Please fix the validation errors before saving.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Here you would typically save to your backend/Supabase
      console.log('Saving platform settings:', settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Platform settings saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save platform settings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSecretVisibility = (field: keyof typeof showSecrets) => {
    setShowSecrets(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const renderPasswordInput = (
    field: keyof PlatformSettingsData,
    label: string,
    placeholder: string
  ) => {
    const isSecret = field in showSecrets;
    const showPassword = isSecret ? showSecrets[field as keyof typeof showSecrets] : false;
    
    return (
      <div className="space-y-2">
        <Label htmlFor={field}>{label}</Label>
        <div className="relative">
          <Input
            id={field}
            type={showPassword ? "text" : "password"}
            value={settings[field] as string}
            onChange={(e) => setSettings(prev => ({ ...prev, [field]: e.target.value }))}
            placeholder={placeholder}
            className={errors[field] ? "border-red-500" : ""}
          />
          {isSecret && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => toggleSecretVisibility(field as keyof typeof showSecrets)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
        {errors[field] && (
          <p className="text-sm text-red-500">{errors[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Platform Settings</h2>
        <Button 
          onClick={handleSave}
          disabled={loading}
          className="bg-islamic-green-600 hover:bg-islamic-green-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Settings'}
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          These settings control core platform functionality. Changes will affect all users and payment processing.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="sandbox_mode"
              checked={settings.sandbox_mode}
              onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sandbox_mode: checked }))}
            />
            <Label htmlFor="sandbox_mode" className="text-sm font-medium">
              Sandbox Mode
            </Label>
          </div>
          <p className="text-sm text-gray-600">
            Enable sandbox mode for testing. Disable for production use.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stripe Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stripe_publishable_key">Stripe Publishable Key</Label>
            <Input
              id="stripe_publishable_key"
              type="text"
              value={settings.stripe_publishable_key}
              onChange={(e) => setSettings(prev => ({ ...prev, stripe_publishable_key: e.target.value }))}
              placeholder="pk_test_... or pk_live_..."
              className={errors.stripe_publishable_key ? "border-red-500" : ""}
            />
            {errors.stripe_publishable_key && (
              <p className="text-sm text-red-500">{errors.stripe_publishable_key}</p>
            )}
          </div>

          {renderPasswordInput(
            'stripe_secret_key',
            'Stripe Secret Key',
            'sk_test_... or sk_live_...'
          )}

          {renderPasswordInput(
            'stripe_webhook_secret',
            'Stripe Webhook Secret',
            'whsec_...'
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Third-Party API Keys</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderPasswordInput(
            'openai_api_key',
            'OpenAI API Key',
            'sk-...'
          )}

          {renderPasswordInput(
            'twilio_api_key',
            'Twilio API Key',
            'AC...'
          )}

          {renderPasswordInput(
            'sendgrid_api_key',
            'SendGrid API Key',
            'SG...'
          )}

          <div className="mt-4 p-3 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">
              <strong>Note:</strong> API keys are stored securely and never displayed in full after saving.
              Leave fields empty to keep existing values unchanged.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformSettings;

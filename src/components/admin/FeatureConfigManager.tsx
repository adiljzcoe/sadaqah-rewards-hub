
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Settings, Save, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeatureConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  settings: Record<string, any>;
}

const FeatureConfigManager = () => {
  const { toast } = useToast();
  const [configs, setConfigs] = useState<FeatureConfig[]>([
    {
      id: 'live-video',
      name: 'Live Video Stream',
      description: 'Configure live video streaming settings',
      enabled: true,
      settings: {
        streamUrl: 'https://example.com/stream',
        autoPlay: true,
        showControls: true,
        maxViewers: 1000
      }
    },
    {
      id: 'leaderboards',
      name: 'Leaderboards',
      description: 'Configure leaderboard display and calculations',
      enabled: true,
      settings: {
        updateInterval: 300,
        showTop: 10,
        includeAnonymous: false,
        resetPeriod: 'monthly'
      }
    },
    {
      id: 'notifications',
      name: 'Push Notifications',
      description: 'Configure push notification settings',
      enabled: true,
      settings: {
        allowSubscriptions: true,
        defaultEnabled: true,
        batchingEnabled: true,
        maxPerDay: 5
      }
    },
    {
      id: 'qurbani-season',
      name: 'Qurbani Season',
      description: 'Configure Qurbani season dates and settings',
      enabled: true,
      settings: {
        startDate: '2025-06-15',
        endDate: '2025-06-20',
        preorderEnabled: true,
        allowMultipleOrders: true
      }
    },
    {
      id: 'ramadan-calendar',
      name: 'Ramadan Calendar',
      description: 'Configure Ramadan calendar features',
      enabled: true,
      settings: {
        startDate: '2025-02-28',
        endDate: '2025-03-29',
        dailyRewards: true,
        shareEnabled: true
      }
    },
    {
      id: 'zakat-calculator',
      name: 'Zakat Calculator',
      description: 'Configure Zakat calculation settings',
      enabled: true,
      settings: {
        nisabGoldRate: 87.48,
        nisabSilverRate: 612.36,
        zakatRate: 2.5,
        currencyCode: 'GBP'
      }
    },
    {
      id: 'charity-ticker',
      name: 'Charity Ticker',
      description: 'Configure charity donation ticker',
      enabled: true,
      settings: {
        scrollSpeed: 50,
        showAmount: true,
        showDonorName: true,
        maxItems: 100
      }
    },
    {
      id: 'business-features',
      name: 'Business Features',
      description: 'Configure business partnership features',
      enabled: true,
      settings: {
        allowRegistration: true,
        requireApproval: true,
        showAds: true,
        maxAdSlots: 3
      }
    }
  ]);

  const updateConfig = (configId: string, field: string, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, [field]: value }
        : config
    ));
  };

  const updateSetting = (configId: string, settingKey: string, value: any) => {
    setConfigs(prev => prev.map(config => 
      config.id === configId 
        ? { ...config, settings: { ...config.settings, [settingKey]: value } }
        : config
    ));
  };

  const saveConfig = (configId: string) => {
    // In a real app, this would save to the backend
    toast({
      title: "Configuration Saved",
      description: "Feature configuration has been updated successfully.",
    });
  };

  const resetConfig = (configId: string) => {
    // Reset to defaults
    toast({
      title: "Configuration Reset",
      description: "Feature configuration has been reset to defaults.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6" />
        <h2 className="text-2xl font-bold">Feature Configuration</h2>
      </div>

      <Tabs defaultValue={configs[0]?.id} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {configs.slice(0, 8).map((config) => (
            <TabsTrigger key={config.id} value={config.id} className="text-xs">
              {config.name.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {configs.map((config) => (
          <TabsContent key={config.id} value={config.id}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{config.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{config.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={config.enabled}
                        onCheckedChange={(enabled) => updateConfig(config.id, 'enabled', enabled)}
                      />
                      <Label>Enabled</Label>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(config.settings).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={`${config.id}-${key}`} className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      {typeof value === 'boolean' ? (
                        <div className="flex items-center space-x-2">
                          <Switch
                            id={`${config.id}-${key}`}
                            checked={value}
                            onCheckedChange={(newValue) => updateSetting(config.id, key, newValue)}
                          />
                          <Label htmlFor={`${config.id}-${key}`}>{value ? 'Yes' : 'No'}</Label>
                        </div>
                      ) : typeof value === 'number' ? (
                        <Input
                          id={`${config.id}-${key}`}
                          type="number"
                          value={value}
                          onChange={(e) => updateSetting(config.id, key, parseFloat(e.target.value) || 0)}
                        />
                      ) : key.includes('Date') ? (
                        <Input
                          id={`${config.id}-${key}`}
                          type="date"
                          value={value}
                          onChange={(e) => updateSetting(config.id, key, e.target.value)}
                        />
                      ) : key.includes('Url') || typeof value === 'string' && value.length > 50 ? (
                        <Textarea
                          id={`${config.id}-${key}`}
                          value={value}
                          onChange={(e) => updateSetting(config.id, key, e.target.value)}
                          rows={2}
                        />
                      ) : (
                        <Input
                          id={`${config.id}-${key}`}
                          value={value}
                          onChange={(e) => updateSetting(config.id, key, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={() => saveConfig(config.id)} className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Configuration
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => resetConfig(config.id)}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FeatureConfigManager;

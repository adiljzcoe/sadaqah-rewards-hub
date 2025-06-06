
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Palette, Settings, Check } from 'lucide-react';
import { useMasjidManagement } from '@/hooks/useMasjidManagement';

const MasjidWebsiteCreator = () => {
  const { userMasjidRole, createMasjidWebsite } = useMasjidManagement();
  const [selectedTheme, setSelectedTheme] = useState('traditional-green');
  const [formData, setFormData] = useState({
    subdomain_slug: '',
    custom_domain: '',
    website_settings: {
      title: '',
      description: '',
      contact_email: '',
      contact_phone: '',
      address: ''
    },
    theme_settings: {
      primary_color: '#059669',
      secondary_color: '#0891b2',
      font_family: 'Inter'
    }
  });

  const classicThemes = [
    {
      id: 'traditional-green',
      name: 'Traditional Green',
      description: 'Classic Islamic green with gold accents',
      primary_color: '#059669',
      secondary_color: '#D97706',
      accent_color: '#065F46',
      text_color: '#1F2937',
      background: 'linear-gradient(135deg, #ECFDF5 0%, #F0FDF4 100%)',
      preview: 'bg-gradient-to-br from-green-50 to-green-100'
    },
    {
      id: 'elegant-blue',
      name: 'Elegant Blue',
      description: 'Deep blue inspired by Islamic art',
      primary_color: '#1E40AF',
      secondary_color: '#DC2626',
      accent_color: '#1E3A8A',
      text_color: '#1F2937',
      background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
      preview: 'bg-gradient-to-br from-blue-50 to-blue-100'
    },
    {
      id: 'madinah-cream',
      name: 'Madinah Cream',
      description: 'Warm cream and brown tones',
      primary_color: '#92400E',
      secondary_color: '#059669',
      accent_color: '#78350F',
      text_color: '#1C1917',
      background: 'linear-gradient(135deg, #FEF7ED 0%, #FED7AA 100%)',
      preview: 'bg-gradient-to-br from-orange-50 to-orange-100'
    },
    {
      id: 'royal-purple',
      name: 'Royal Purple',
      description: 'Regal purple with golden highlights',
      primary_color: '#7C3AED',
      secondary_color: '#F59E0B',
      accent_color: '#5B21B6',
      text_color: '#1F2937',
      background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
      preview: 'bg-gradient-to-br from-purple-50 to-purple-100'
    },
    {
      id: 'desert-sand',
      name: 'Desert Sand',
      description: 'Warm sand colors with teal accents',
      primary_color: '#D97706',
      secondary_color: '#0D9488',
      accent_color: '#92400E',
      text_color: '#1C1917',
      background: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      preview: 'bg-gradient-to-br from-yellow-50 to-yellow-100'
    },
    {
      id: 'makkah-black',
      name: 'Makkah Black',
      description: 'Elegant black and gold combination',
      primary_color: '#1F2937',
      secondary_color: '#F59E0B',
      accent_color: '#111827',
      text_color: '#F9FAFB',
      background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
      preview: 'bg-gradient-to-br from-gray-900 to-black'
    }
  ];

  const handleThemeSelect = (theme: any) => {
    setSelectedTheme(theme.id);
    setFormData({
      ...formData,
      theme_settings: {
        primary_color: theme.primary_color,
        secondary_color: theme.secondary_color,
        font_family: 'Inter'
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMasjidRole?.masjid_id) return;

    createMasjidWebsite.mutate({
      masjid_id: userMasjidRole.masjid_id,
      ...formData
    });
  };

  if (!userMasjidRole) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-gray-600">
            You need to be assigned as staff to a masjid to create a website.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Masjid Website</h1>
        <p className="text-gray-600">
          Set up a beautiful website for {userMasjidRole.masjids?.name}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Basic Settings
            </TabsTrigger>
            <TabsTrigger value="design" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Design & Themes
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Website Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="subdomain">Subdomain *</Label>
                    <div className="flex mt-1">
                      <Input
                        id="subdomain"
                        value={formData.subdomain_slug}
                        onChange={(e) => setFormData({
                          ...formData,
                          subdomain_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
                        })}
                        placeholder="your-masjid"
                        required
                      />
                      <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-l-0 rounded-r-md">
                        .yourjannah.com
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      This will be your website URL: {formData.subdomain_slug || 'your-masjid'}.yourjannah.com
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="custom_domain">Custom Domain (Optional)</Label>
                    <Input
                      id="custom_domain"
                      value={formData.custom_domain}
                      onChange={(e) => setFormData({
                        ...formData,
                        custom_domain: e.target.value
                      })}
                      placeholder="www.yourmasjid.org"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Connect your own domain name
                    </p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="title">Website Title</Label>
                  <Input
                    id="title"
                    value={formData.website_settings.title}
                    onChange={(e) => setFormData({
                      ...formData,
                      website_settings: {
                        ...formData.website_settings,
                        title: e.target.value
                      }
                    })}
                    placeholder={userMasjidRole.masjids?.name || 'Your Masjid Name'}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Website Description</Label>
                  <Textarea
                    id="description"
                    value={formData.website_settings.description}
                    onChange={(e) => setFormData({
                      ...formData,
                      website_settings: {
                        ...formData.website_settings,
                        description: e.target.value
                      }
                    })}
                    placeholder="Welcome to our Islamic community center..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contact_email">Contact Email</Label>
                    <Input
                      id="contact_email"
                      type="email"
                      value={formData.website_settings.contact_email}
                      onChange={(e) => setFormData({
                        ...formData,
                        website_settings: {
                          ...formData.website_settings,
                          contact_email: e.target.value
                        }
                      })}
                      placeholder="info@yourmasjid.org"
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact_phone">Contact Phone</Label>
                    <Input
                      id="contact_phone"
                      value={formData.website_settings.contact_phone}
                      onChange={(e) => setFormData({
                        ...formData,
                        website_settings: {
                          ...formData.website_settings,
                          contact_phone: e.target.value
                        }
                      })}
                      placeholder="+44 20 1234 5678"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="design">
            <Card>
              <CardHeader>
                <CardTitle>Classic Islamic Themes</CardTitle>
                <p className="text-sm text-gray-600">Choose from our collection of beautiful Arabic and Islamic-inspired designs</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classicThemes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                        selectedTheme === theme.id 
                          ? 'border-blue-500 shadow-lg' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleThemeSelect(theme)}
                    >
                      <div className={`h-24 ${theme.preview} rounded-t-lg relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                        <div className="absolute top-2 left-2 w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary_color }}></div>
                        <div className="absolute top-2 right-2 w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary_color }}></div>
                        <div className="absolute bottom-2 left-2 right-2 h-1 rounded-full bg-white/30"></div>
                      </div>
                      <div className="p-3">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold text-sm">{theme.name}</h4>
                          {selectedTheme === theme.id && (
                            <Check className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600">{theme.description}</p>
                        <div className="flex gap-1 mt-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.primary_color }}></div>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.secondary_color }}></div>
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent_color }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-semibold mb-4">Custom Colors</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="primary_color">Primary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="primary_color"
                          type="color"
                          value={formData.theme_settings.primary_color}
                          onChange={(e) => setFormData({
                            ...formData,
                            theme_settings: {
                              ...formData.theme_settings,
                              primary_color: e.target.value
                            }
                          })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={formData.theme_settings.primary_color}
                          onChange={(e) => setFormData({
                            ...formData,
                            theme_settings: {
                              ...formData.theme_settings,
                              primary_color: e.target.value
                            }
                          })}
                          placeholder="#059669"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="secondary_color">Secondary Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          id="secondary_color"
                          type="color"
                          value={formData.theme_settings.secondary_color}
                          onChange={(e) => setFormData({
                            ...formData,
                            theme_settings: {
                              ...formData.theme_settings,
                              secondary_color: e.target.value
                            }
                          })}
                          className="w-16 h-10"
                        />
                        <Input
                          value={formData.theme_settings.secondary_color}
                          onChange={(e) => setFormData({
                            ...formData,
                            theme_settings: {
                              ...formData.theme_settings,
                              secondary_color: e.target.value
                            }
                          })}
                          placeholder="#0891b2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Custom Domain Setup</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    To use your custom domain, you'll need to add these DNS records:
                  </p>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• CNAME record: www → yourjannah.com</li>
                    <li>• A record: @ → 76.76.19.123 (example IP)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-8">
          <Button 
            type="submit" 
            size="lg"
            disabled={createMasjidWebsite.isPending || !formData.subdomain_slug}
          >
            {createMasjidWebsite.isPending ? (
              <>Creating Website...</>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Create Website
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MasjidWebsiteCreator;


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
              Design
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
                <CardTitle>Website Design</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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

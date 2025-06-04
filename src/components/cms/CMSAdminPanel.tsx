
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Palette, 
  Layout, 
  Settings, 
  Users, 
  BarChart3, 
  Globe,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react';
import PageBuilderWrapper from './PageBuilderWrapper';
import ComponentLibrary from './ComponentLibrary';
import TemplateLibrary from './TemplateLibrary';
import CMSManagement from './CMSManagement';

const CMSAdminPanel = () => {
  const [activeTab, setActiveTab] = useState('pages');

  // Mock statistics
  const stats = {
    totalPages: 12,
    publishedPages: 8,
    draftPages: 4,
    totalViews: 15420,
    mobileViews: 9250,
    desktopViews: 6170
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">CMS Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage your charity platform content with our visual page builder</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-600">
            <Globe className="h-3 w-3 mr-1" />
            Live Site
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Pages</p>
                <p className="text-2xl font-bold">{stats.totalPages}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold text-green-600">{stats.publishedPages}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-4 w-4 bg-green-600 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Mobile Traffic</p>
                <p className="text-2xl font-bold">{Math.round((stats.mobileViews / stats.totalViews) * 100)}%</p>
              </div>
              <Smartphone className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main CMS Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pages" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Pages
          </TabsTrigger>
          <TabsTrigger value="builder" className="flex items-center gap-2">
            <Layout className="h-4 w-4" />
            Page Builder
          </TabsTrigger>
          <TabsTrigger value="components" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Components
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pages">
          <Card>
            <CardHeader>
              <CardTitle>Page Management</CardTitle>
              <CardDescription>
                Create, edit, and manage all your website pages. Use the traditional editor 
                or switch to the visual page builder for advanced layouts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CMSManagement />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder">
          <Card>
            <CardHeader>
              <CardTitle>Visual Page Builder</CardTitle>
              <CardDescription>
                Drag and drop components to create beautiful pages. Perfect for landing pages, 
                campaigns, and custom layouts.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <PageBuilderWrapper />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="components">
          <Card>
            <CardHeader>
              <CardTitle>Component Library</CardTitle>
              <CardDescription>
                Browse all available components for your charity platform. Each component 
                is designed specifically for nonprofit organizations.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ComponentLibrary />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Template Library</CardTitle>
              <CardDescription>
                Ready-made page templates for common charity website needs. Start with 
                a template and customize to match your organization.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TemplateLibrary />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>CMS Settings</CardTitle>
              <CardDescription>
                Configure global settings for your content management system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">General Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Auto-save</p>
                        <p className="text-sm text-gray-600">Automatically save changes</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Version Control</p>
                        <p className="text-sm text-gray-600">Track page revisions</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">SEO Optimization</p>
                        <p className="text-sm text-gray-600">Auto-generate meta tags</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Image Optimization</p>
                        <p className="text-sm text-gray-600">Auto-compress images</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">CDN Integration</p>
                        <p className="text-sm text-gray-600">Fast global delivery</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Caching</p>
                        <p className="text-sm text-gray-600">Smart page caching</p>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Device Preview</h3>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Monitor className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Desktop</p>
                      <p className="text-sm text-gray-600">{stats.desktopViews.toLocaleString()} views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Tablet className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Tablet</p>
                      <p className="text-sm text-gray-600">1,250 views</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <Smartphone className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Mobile</p>
                      <p className="text-sm text-gray-600">{stats.mobileViews.toLocaleString()} views</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSAdminPanel;

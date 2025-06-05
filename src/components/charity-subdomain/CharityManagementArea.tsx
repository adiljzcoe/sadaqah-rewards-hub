
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Settings, 
  Users, 
  MessageSquare, 
  Upload, 
  Globe,
  TrendingUp,
  Target,
  DollarSign
} from 'lucide-react';

const CharityManagementArea = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Charity Management</h1>
          <p className="text-gray-600">Manage your subdomain, campaigns, and fundraising activities</p>
        </div>
        <Badge className="bg-green-100 text-green-800">
          islamicrelief.yourjannah.com
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="fundraisers">Fundraisers</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Raised</p>
                  <p className="text-2xl font-bold">£45,250</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Fundraisers</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Subdomain Visits</p>
                  <p className="text-2xl font-bold">8,520</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">New donation received</p>
                    <p className="text-sm text-gray-600">£250 from Sarah Ahmed</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium">Fundraiser created</p>
                    <p className="text-sm text-gray-600">"London Marathon Challenge" by Ahmad Hassan</p>
                  </div>
                  <span className="text-sm text-gray-500">1 day ago</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Campaign message updated</p>
                    <p className="text-sm text-gray-600">Emergency Relief Campaign</p>
                  </div>
                  <span className="text-sm text-gray-500">3 days ago</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Your Campaigns</h3>
                <Button>Create New Campaign</Button>
              </div>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Emergency Relief Campaign</h4>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Providing immediate aid to families affected by natural disasters
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Raised: </span>
                      <span className="font-medium">£25,400</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Target: </span>
                      <span className="font-medium">£50,000</span>
                    </div>
                    <div>
                      <span className="text-gray-600">UTM Link: </span>
                      <span className="text-blue-600 font-mono text-xs">emergency_relief_2024</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">Clean Water Initiative</h4>
                    <Badge className="bg-blue-100 text-blue-800">Active</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Building wells and water systems in remote communities
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Raised: </span>
                      <span className="font-medium">£19,850</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Target: </span>
                      <span className="font-medium">£30,000</span>
                    </div>
                    <div>
                      <span className="text-gray-600">UTM Link: </span>
                      <span className="text-blue-600 font-mono text-xs">clean_water_2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fundraisers">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Manage Fundraisers</h3>
              <p className="text-gray-600 mb-6">
                View and manage all fundraising campaigns created for your charity
              </p>
              
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Fundraiser management tools will be displayed here</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Marketing Dashboard</h3>
              <p className="text-gray-600 mb-6">
                Create campaign messages for email newsletters and push notifications
              </p>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Email Campaign Section</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Your charity gets a dedicated section in our weekly email newsletter
                  </p>
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows={4}
                    placeholder="Write your message for this week's email campaign..."
                  />
                  <Button className="mt-3">Update Email Message</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">Push Notification Campaign</h4>
                  <p className="text-sm text-gray-600 mb-3">
                    Featured placement in our push notification campaigns
                  </p>
                  <input 
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    placeholder="Push notification title..."
                  />
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows={3}
                    placeholder="Push notification message..."
                  />
                  <Button className="mt-3">Schedule Push Campaign</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Media Library</h3>
              <p className="text-gray-600 mb-6">
                Upload and manage images and videos for your campaigns
              </p>
              
              <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 mb-4">Upload media files for your campaigns</p>
                <Button>Upload Media</Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Subdomain Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Subdomain URL</label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text"
                      value="islamicrelief"
                      className="border rounded-md px-3 py-2"
                      disabled
                    />
                    <span className="text-gray-600">.yourjannah.com</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Contact support to change your subdomain</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Charity Description</label>
                  <textarea 
                    className="w-full p-3 border rounded-md"
                    rows={4}
                    placeholder="Update your charity description..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Rate</label>
                  <input 
                    type="text"
                    value="5%"
                    className="border rounded-md px-3 py-2"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-1">Platform commission for attributed donations</p>
                </div>
                
                <Button>Save Settings</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CharityManagementArea;

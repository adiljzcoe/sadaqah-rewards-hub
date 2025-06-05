
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, ExternalLink, BarChart3, Settings, TrendingUp, DollarSign, Globe } from 'lucide-react';
import { useCharityPartners } from '@/hooks/useCharityPartners';

const CharityPartnerManagement = () => {
  const { useCharityPartnersList, useCreateAdCampaign, useUpdateCampaignStatus } = useCharityPartners();
  const { data: partners, isLoading } = useCharityPartnersList();
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const CreateCampaignDialog = ({ partnerId, charitySlug }: { partnerId: string; charitySlug: string }) => {
    const [campaignData, setCampaignData] = useState({
      campaign_name: '',
      platform: 'facebook',
      budget_allocated: 1000,
      target_audience: {},
      utm_parameters: {
        utm_source: 'facebook',
        utm_medium: 'cpc',
        utm_campaign: '',
        utm_charity: charitySlug
      }
    });

    const createCampaign = useCreateAdCampaign();

    const handleSubmit = () => {
      createCampaign.mutate({
        charity_partner_id: partnerId,
        ...campaignData
      });
    };

    const subdomainUrl = `https://${charitySlug}.yourjannah.com`;

    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create Subdomain Campaign</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Label className="text-sm font-medium text-blue-800">Campaign Subdomain</Label>
              <code className="block text-blue-600 text-sm mt-1">{subdomainUrl}</code>
            </div>
            
            <div>
              <Label>Campaign Name</Label>
              <Input
                value={campaignData.campaign_name}
                onChange={(e) => setCampaignData({...campaignData, campaign_name: e.target.value})}
                placeholder="Ramadan 2024 Campaign"
              />
            </div>
            <div>
              <Label>Platform</Label>
              <select 
                className="w-full p-2 border rounded-md"
                value={campaignData.platform}
                onChange={(e) => setCampaignData({...campaignData, platform: e.target.value})}
              >
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="google">Google Ads</option>
                <option value="tiktok">TikTok</option>
              </select>
            </div>
            <div>
              <Label>Budget (£)</Label>
              <Input
                type="number"
                value={campaignData.budget_allocated}
                onChange={(e) => setCampaignData({...campaignData, budget_allocated: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label>UTM Campaign</Label>
              <Input
                value={campaignData.utm_parameters.utm_campaign}
                onChange={(e) => setCampaignData({
                  ...campaignData, 
                  utm_parameters: {...campaignData.utm_parameters, utm_campaign: e.target.value}
                })}
                placeholder="ramadan_2024"
              />
            </div>
            <Button onClick={handleSubmit} className="w-full">
              Create Subdomain Campaign
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (isLoading) {
    return <div className="p-6">Loading charity partners...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Charity Partner Subdomain Management</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Partner
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
          <TabsTrigger value="campaigns">Ad Campaigns</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Subdomains</p>
                  <p className="text-2xl font-bold">{partners?.length || 0}</p>
                </div>
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Ad Spend</p>
                  <p className="text-2xl font-bold">£24,500</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue Generated</p>
                  <p className="text-2xl font-bold">£85,200</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
          </div>

          {/* Partners Table */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Partner Subdomains</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Charity</TableHead>
                    <TableHead>Subdomain</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners?.map((partner: any) => (
                    <TableRow key={partner.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            {partner.charities?.logo_url ? (
                              <img src={partner.charities.logo_url} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span className="text-sm">🤲</span>
                            )}
                          </div>
                          <span className="font-medium">{partner.charities?.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <code className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm block">
                            {partner.partner_slug}.yourjannah.com
                          </code>
                          <div className="text-xs text-gray-500">SSL Enabled • CDN Active</div>
                        </div>
                      </TableCell>
                      <TableCell>{(partner.commission_rate * 100).toFixed(1)}%</TableCell>
                      <TableCell>
                        <Badge className={partner.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {partner.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit Subdomain
                          </Button>
                          <CreateCampaignDialog partnerId={partner.id} charitySlug={partner.partner_slug} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="subdomains">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Subdomain Management</h3>
              <div className="text-center py-8 text-gray-500">
                <Globe className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Subdomain configuration and DNS management</p>
                <p className="text-sm">Manage SSL certificates, custom domains, and subdomain redirects</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Subdomain Campaign Management</h3>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Campaign management interface for subdomain-based campaigns</p>
                <p className="text-sm">Track performance, adjust budgets, monitor subdomain traffic</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Subdomain Revenue Attribution</h3>
              <div className="text-center py-8 text-gray-500">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Revenue tracking and attribution analytics per subdomain</p>
                <p className="text-sm">See which subdomains generate the most revenue and conversions</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Subdomain Analytics</h3>
              <div className="text-center py-8 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detailed subdomain traffic and conversion analytics</p>
                <p className="text-sm">Cross-device attribution, conversion funnels, and ROI analysis per subdomain</p>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CharityPartnerManagement;

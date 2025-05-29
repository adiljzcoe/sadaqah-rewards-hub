
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Target, Heart } from 'lucide-react';

const AddCampaignForm = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    description: '',
    target: '',
    category: '',
    deadline: ''
  });

  const [fundraiserData, setFundraiserData] = useState({
    title: '',
    description: '',
    target: '',
    category: '',
    deadline: ''
  });

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle campaign creation
    console.log('Creating campaign:', campaignData);
  };

  const handleFundraiserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle fundraiser creation
    console.log('Creating fundraiser:', fundraiserData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Campaign or Fundraiser
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="campaign" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="campaign" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Campaign
            </TabsTrigger>
            <TabsTrigger value="fundraiser" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Fundraiser
            </TabsTrigger>
          </TabsList>

          <TabsContent value="campaign" className="space-y-4">
            <form onSubmit={handleCampaignSubmit} className="space-y-4">
              <div>
                <Label htmlFor="campaign-title">Campaign Title</Label>
                <Input
                  id="campaign-title"
                  placeholder="e.g., Orphans of Gaza Emergency Aid"
                  value={campaignData.title}
                  onChange={(e) => setCampaignData({ ...campaignData, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="campaign-description">Description</Label>
                <Textarea
                  id="campaign-description"
                  placeholder="Describe your campaign..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="campaign-target">Target Amount (£)</Label>
                  <Input
                    id="campaign-target"
                    type="number"
                    placeholder="50000"
                    value={campaignData.target}
                    onChange={(e) => setCampaignData({ ...campaignData, target: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="campaign-category">Category</Label>
                  <Select value={campaignData.category} onValueChange={(value) => setCampaignData({ ...campaignData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency Aid</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="water">Water & Sanitation</SelectItem>
                      <SelectItem value="food">Food Security</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="campaign-deadline">Deadline</Label>
                <Input
                  id="campaign-deadline"
                  type="date"
                  value={campaignData.deadline}
                  onChange={(e) => setCampaignData({ ...campaignData, deadline: e.target.value })}
                />
              </div>
              
              <Button type="submit" className="w-full bg-islamic-green-600 hover:bg-islamic-green-700">
                <Heart className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="fundraiser" className="space-y-4">
            <form onSubmit={handleFundraiserSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fundraiser-title">Fundraiser Title</Label>
                <Input
                  id="fundraiser-title"
                  placeholder="e.g., Build 10 Water Wells"
                  value={fundraiserData.title}
                  onChange={(e) => setFundraiserData({ ...fundraiserData, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="fundraiser-description">Description</Label>
                <Textarea
                  id="fundraiser-description"
                  placeholder="Describe your fundraiser goals..."
                  value={fundraiserData.description}
                  onChange={(e) => setFundraiserData({ ...fundraiserData, description: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fundraiser-target">Target Amount (£)</Label>
                  <Input
                    id="fundraiser-target"
                    type="number"
                    placeholder="100000"
                    value={fundraiserData.target}
                    onChange={(e) => setFundraiserData({ ...fundraiserData, target: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="fundraiser-category">Category</Label>
                  <Select value={fundraiserData.category} onValueChange={(value) => setFundraiserData({ ...fundraiserData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="water">Water & Sanitation</SelectItem>
                      <SelectItem value="community">Community Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="fundraiser-deadline">Deadline</Label>
                <Input
                  id="fundraiser-deadline"
                  type="date"
                  value={fundraiserData.deadline}
                  onChange={(e) => setFundraiserData({ ...fundraiserData, deadline: e.target.value })}
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Target className="h-4 w-4 mr-2" />
                Create Fundraiser
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AddCampaignForm;

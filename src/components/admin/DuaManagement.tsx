
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Play, Heart, Upload, Download, DollarSign } from 'lucide-react';

const DuaManagement = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [formData, setFormData] = useState({
    title: '',
    arabic_text: '',
    translation: '',
    transliteration: '',
    category_id: '',
    when_to_recite: '',
    benefits: '',
    reference: '',
    audio_url: '',
    is_featured: false,
    is_active: true,
    recommended_donation_amount: 100
  });

  const mockCategories = [
    { id: '1', name: 'Morning Duas', color: 'bg-yellow-500', count: 15 },
    { id: '2', name: 'Evening Duas', color: 'bg-purple-500', count: 12 },
    { id: '3', name: 'Prayer Duas', color: 'bg-green-500', count: 25 },
    { id: '4', name: 'Travel Duas', color: 'bg-blue-500', count: 8 }
  ];

  const mockDuas = [
    {
      id: '1',
      title: 'Morning Protection Dua',
      arabic_text: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
      translation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
      category: 'Morning Duas',
      total_donations: 2450,
      total_ameens: 1250,
      is_featured: true,
      is_active: true,
      recommended_donation: 100
    },
    {
      id: '2',
      title: 'Travel Safety Dua',
      arabic_text: 'اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى',
      translation: 'O Allah, we ask You in this journey of ours for righteousness and piety.',
      category: 'Travel Duas',
      total_donations: 890,
      total_ameens: 650,
      is_featured: false,
      is_active: true,
      recommended_donation: 150
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating/updating dua:', formData);
    setShowCreateForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      arabic_text: '',
      translation: '',
      transliteration: '',
      category_id: '',
      when_to_recite: '',
      benefits: '',
      reference: '',
      audio_url: '',
      is_featured: false,
      is_active: true,
      recommended_donation_amount: 100
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Dua Management</h2>
          <p className="text-muted-foreground">Manage duas, categories, donations, and user submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Duas
          </Button>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Dua
          </Button>
        </div>
      </div>

      <Tabs defaultValue="duas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="duas">Dua Library</TabsTrigger>
          <TabsTrigger value="submissions">User Submissions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="donations">Donation Tracking</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="duas">
          <Card>
            <CardHeader>
              <CardTitle>Dua Library Management</CardTitle>
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Dua</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Donations</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockDuas.map((dua) => (
                    <TableRow key={dua.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium">{dua.title}</div>
                          <div className="text-sm font-arabic text-lg mt-1">{dua.arabic_text}</div>
                          <div className="text-sm text-muted-foreground mt-1">{dua.translation}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{dua.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm">
                            <Heart className="h-3 w-3" />
                            {dua.total_ameens} Ameens
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Recommended: £{(dua.recommended_donation / 100).toFixed(2)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm font-medium">
                            <DollarSign className="h-3 w-3" />
                            £{(dua.total_donations / 100).toFixed(2)}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Total raised
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Badge className={dua.is_featured ? 'bg-yellow-500' : 'bg-gray-500'}>
                            {dua.is_featured ? 'Featured' : 'Standard'}
                          </Badge>
                          <Badge className={dua.is_active ? 'bg-green-500' : 'bg-red-500'}>
                            {dua.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submissions">
          <Card>
            <CardHeader>
              <CardTitle>User Dua Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>User-submitted duas for review</p>
                <p className="text-sm">Review, approve, or reject community-submitted duas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Dua Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockCategories.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">{category.count} duas</div>
                        </div>
                        <div className={`w-4 h-4 rounded ${category.color}`}></div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Dua Donation Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Track donations made for specific duas</p>
                <p className="text-sm">Monitor donation patterns and top-performing duas</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Duas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">127</div>
                <p className="text-sm text-muted-foreground">In library</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Ameens</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45,680</div>
                <p className="text-sm text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Dua Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">£12,450</div>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Active Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-sm text-muted-foreground">Categories</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Dua</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Dua Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCategories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="arabic_text">Arabic Text</Label>
                <Textarea
                  id="arabic_text"
                  value={formData.arabic_text}
                  onChange={(e) => setFormData({ ...formData, arabic_text: e.target.value })}
                  className="font-arabic text-lg"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="translation">English Translation</Label>
                <Textarea
                  id="translation"
                  value={formData.translation}
                  onChange={(e) => setFormData({ ...formData, translation: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="transliteration">Transliteration</Label>
                <Textarea
                  id="transliteration"
                  value={formData.transliteration}
                  onChange={(e) => setFormData({ ...formData, transliteration: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="when_to_recite">When to Recite</Label>
                  <Input
                    id="when_to_recite"
                    value={formData.when_to_recite}
                    onChange={(e) => setFormData({ ...formData, when_to_recite: e.target.value })}
                    placeholder="e.g., Morning, Evening, Before sleep"
                  />
                </div>
                <div>
                  <Label htmlFor="recommended_donation_amount">Recommended Donation (pence)</Label>
                  <Input
                    id="recommended_donation_amount"
                    type="number"
                    value={formData.recommended_donation_amount}
                    onChange={(e) => setFormData({ ...formData, recommended_donation_amount: parseInt(e.target.value) })}
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference">Reference</Label>
                  <Input
                    id="reference"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    placeholder="e.g., Sahih Bukhari 123"
                  />
                </div>
                <div>
                  <Label htmlFor="audio_url">Audio URL</Label>
                  <Input
                    id="audio_url"
                    value={formData.audio_url}
                    onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                    placeholder="https://audio.example.com/dua.mp3"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_featured"
                    checked={formData.is_featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Dua</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default DuaManagement;

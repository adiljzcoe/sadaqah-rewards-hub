
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Globe, Eye, FileText } from 'lucide-react';
import { useCMSPages } from '@/hooks/useCMSPages';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CMSManagement: React.FC = () => {
  const { data: pages, refetch } = useCMSPages();
  const { toast } = useToast();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPage, setEditingPage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    content: '',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    featured_image_url: '',
    status: 'draft',
    template_type: 'default',
    page_type: 'standard',
    sort_order: '0',
    is_homepage: false,
    custom_css: '',
    custom_js: '',
    canonical_url: '',
    redirect_url: ''
  });

  const resetForm = () => {
    setFormData({
      slug: '',
      title: '',
      content: '',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      featured_image_url: '',
      status: 'draft',
      template_type: 'default',
      page_type: 'standard',
      sort_order: '0',
      is_homepage: false,
      custom_css: '',
      custom_js: '',
      canonical_url: '',
      redirect_url: ''
    });
    setShowAddForm(false);
    setEditingPage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const pageData = {
      slug: formData.slug,
      title: formData.title,
      content: formData.content ? JSON.stringify({ body: formData.content }) : null,
      meta_title: formData.meta_title || null,
      meta_description: formData.meta_description || null,
      meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : null,
      featured_image_url: formData.featured_image_url || null,
      status: formData.status,
      template_type: formData.template_type,
      page_type: formData.page_type,
      sort_order: parseInt(formData.sort_order) || 0,
      is_homepage: formData.is_homepage,
      custom_css: formData.custom_css || null,
      custom_js: formData.custom_js || null,
      canonical_url: formData.canonical_url || null,
      redirect_url: formData.redirect_url || null,
      updated_by: (await supabase.auth.getUser()).data.user?.id
    };

    try {
      let result;
      if (editingPage) {
        result = await supabase
          .from('cms_pages')
          .update(pageData)
          .eq('id', editingPage);
      } else {
        result = await supabase
          .from('cms_pages')
          .insert([{
            ...pageData,
            created_by: (await supabase.auth.getUser()).data.user?.id
          }]);
      }

      if (result.error) throw result.error;

      toast({
        title: "Success",
        description: editingPage ? "Page updated successfully" : "Page created successfully",
      });

      resetForm();
      refetch();
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: "Failed to save page. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (page: any) => {
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content?.body || '',
      meta_title: page.meta_title || '',
      meta_description: page.meta_description || '',
      meta_keywords: page.meta_keywords?.join(', ') || '',
      featured_image_url: page.featured_image_url || '',
      status: page.status,
      template_type: page.template_type,
      page_type: page.page_type,
      sort_order: page.sort_order.toString(),
      is_homepage: page.is_homepage,
      custom_css: page.custom_css || '',
      custom_js: page.custom_js || '',
      canonical_url: page.canonical_url || '',
      redirect_url: page.redirect_url || ''
    });
    setEditingPage(page.id);
    setShowAddForm(true);
  };

  const handleDelete = async (pageId: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const { error } = await supabase
        .from('cms_pages')
        .delete()
        .eq('id', pageId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Page deleted successfully",
      });

      refetch();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: "Error",
        description: "Failed to delete page. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      case 'archived': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">CMS Page Management</h2>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="bg-islamic-green-600 hover:bg-islamic-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Page
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingPage ? 'Edit Page' : 'Create New Page'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Page Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="slug">URL Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') })}
                    placeholder="page-url-slug"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Page Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={8}
                  placeholder="Enter page content (supports HTML)"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meta_title">SEO Title</Label>
                  <Input
                    id="meta_title"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    placeholder="SEO optimized title"
                  />
                </div>
                <div>
                  <Label htmlFor="meta_description">SEO Description</Label>
                  <Input
                    id="meta_description"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    placeholder="SEO meta description"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="meta_keywords">SEO Keywords</Label>
                <Input
                  id="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label>Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Page Type</Label>
                  <Select 
                    value={formData.page_type} 
                    onValueChange={(value) => setFormData({ ...formData, page_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="charity">Charity</SelectItem>
                      <SelectItem value="campaign">Campaign</SelectItem>
                      <SelectItem value="landing">Landing Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="sort_order">Sort Order</Label>
                  <Input
                    id="sort_order"
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_homepage"
                  checked={formData.is_homepage}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_homepage: checked })}
                />
                <Label htmlFor="is_homepage">Set as Homepage</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-islamic-green-600 hover:bg-islamic-green-700">
                  {editingPage ? 'Update Page' : 'Create Page'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {pages?.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold">{page.title}</h3>
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
                    {page.is_homepage && (
                      <Badge variant="outline">Homepage</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                  {page.meta_description && (
                    <p className="text-sm text-gray-500">{page.meta_description}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  {page.status === 'published' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(`/${page.slug}`, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(page)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(page.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CMSManagement;

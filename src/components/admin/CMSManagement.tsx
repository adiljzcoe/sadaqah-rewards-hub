
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Globe, Eye, FileText, Loader2 } from 'lucide-react';
import { useCMSPages, useCMSPageMutations } from '@/hooks/useCMSPages';
import { useToast } from '@/hooks/use-toast';

const CMSManagement: React.FC = () => {
  const { data: pagesResponse, isLoading, refetch } = useCMSPages();
  const { createPage, updatePage, deletePage } = useCMSPageMutations();
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
    status: 'draft' as 'draft' | 'published' | 'archived',
    template_type: 'default',
    page_type: 'standard' as 'standard' | 'charity' | 'campaign' | 'landing',
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

    try {
      const pageData = {
        slug: formData.slug,
        title: formData.title,
        content: formData.content,
        meta_title: formData.meta_title || undefined,
        meta_description: formData.meta_description || undefined,
        meta_keywords: formData.meta_keywords ? formData.meta_keywords.split(',').map(k => k.trim()) : undefined,
        featured_image_url: formData.featured_image_url || undefined,
        status: formData.status,
        template_type: formData.template_type,
        page_type: formData.page_type,
        sort_order: parseInt(formData.sort_order),
        is_homepage: formData.is_homepage,
        custom_css: formData.custom_css || undefined,
        custom_js: formData.custom_js || undefined,
        canonical_url: formData.canonical_url || undefined,
        redirect_url: formData.redirect_url || undefined,
      };

      if (editingPage) {
        await updatePage.mutateAsync({ id: editingPage, data: pageData });
      } else {
        await createPage.mutateAsync(pageData);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const handleEdit = (page: any) => {
    setFormData({
      slug: page.slug,
      title: page.title,
      content: page.content || '',
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
      await deletePage.mutateAsync(pageId);
    } catch (error) {
      console.error('Error deleting page:', error);
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

  // Extract pages data from response
  const pages = pagesResponse?.data || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading CMS pages...</span>
      </div>
    );
  }

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
                    onValueChange={(value) => setFormData({ ...formData, status: value as 'draft' | 'published' | 'archived' })}
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
                    onValueChange={(value) => setFormData({ ...formData, page_type: value as 'standard' | 'charity' | 'campaign' | 'landing' })}
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
                <Button 
                  type="submit" 
                  className="bg-islamic-green-600 hover:bg-islamic-green-700"
                  disabled={createPage.isPending || updatePage.isPending}
                >
                  {(createPage.isPending || updatePage.isPending) ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      {editingPage ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingPage ? 'Update Page' : 'Create Page'
                  )}
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
                    <Badge variant="secondary">{page.page_type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                  {page.meta_description && (
                    <p className="text-sm text-gray-500">{page.meta_description}</p>
                  )}
                  <div className="text-xs text-gray-400 mt-2">
                    Version {page.version} • Created {new Date(page.created_at).toLocaleDateString()}
                  </div>
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
                    disabled={deletePage.isPending}
                  >
                    {deletePage.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {pages?.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No pages found</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first CMS page.</p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Page
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CMSManagement;

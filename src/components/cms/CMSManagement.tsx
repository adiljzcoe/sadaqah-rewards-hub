
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FileText, Globe } from 'lucide-react';

interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
  meta_title?: string;
  meta_description?: string;
}

const CMSManagement = () => {
  const [pages, setPages] = useState<CMSPage[]>([
    {
      id: '1',
      title: 'About Our Mission',
      slug: '/about',
      content: '<h1>About Our Mission</h1><p>We are dedicated to making charitable giving accessible and transparent...</p>',
      status: 'published',
      created_at: '2024-01-01',
      updated_at: '2024-01-15',
      meta_title: 'About Our Mission - Charity Platform',
      meta_description: 'Learn about our mission to make charitable giving transparent and accessible to everyone.'
    },
    {
      id: '2',
      title: 'How It Works',
      slug: '/how-it-works',
      content: '<h1>How It Works</h1><p>Our platform makes it easy to donate to verified charities...</p>',
      status: 'draft',
      created_at: '2024-01-02',
      updated_at: '2024-01-10'
    }
  ]);

  const [editingPage, setEditingPage] = useState<CMSPage | null>(null);
  const [showForm, setShowForm] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const createNewPage = () => {
    const newPage: CMSPage = {
      id: `page-${Date.now()}`,
      title: 'New Page',
      slug: '/new-page',
      content: '<h1>New Page</h1><p>Start editing this page...</p>',
      status: 'draft',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setPages(prev => [...prev, newPage]);
    setEditingPage(newPage);
    setShowForm(true);
  };

  const editPage = (page: CMSPage) => {
    setEditingPage(page);
    setShowForm(true);
  };

  const savePage = (updatedPage: CMSPage) => {
    setPages(prev => prev.map(p => p.id === updatedPage.id ? { ...updatedPage, updated_at: new Date().toISOString() } : p));
    setShowForm(false);
    setEditingPage(null);
  };

  const deletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(prev => prev.filter(p => p.id !== pageId));
    }
  };

  if (showForm && editingPage) {
    return <PageEditor page={editingPage} onSave={savePage} onCancel={() => setShowForm(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Page Management</h2>
          <p className="text-gray-600">Create and manage your website pages</p>
        </div>
        <Button onClick={createNewPage}>
          <Plus className="h-4 w-4 mr-2" />
          New Page
        </Button>
      </div>

      <div className="grid gap-4">
        {pages.map((page) => (
          <Card key={page.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{page.title}</h3>
                    <Badge className={getStatusColor(page.status)}>
                      {page.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{page.slug}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Created: {new Date(page.created_at).toLocaleDateString()}</span>
                    <span>Updated: {new Date(page.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {page.status === 'published' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(page.slug, '_blank')}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => editPage(page)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deletePage(page.id)}
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

const PageEditor = ({ page, onSave, onCancel }: { 
  page: CMSPage; 
  onSave: (page: CMSPage) => void; 
  onCancel: () => void; 
}) => {
  const [formData, setFormData] = useState(page);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Edit Page</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Page</Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Page Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="/page-url"
                required
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value as 'draft' | 'published' })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="meta_title">Meta Title (SEO)</Label>
              <Input
                id="meta_title"
                value={formData.meta_title || ''}
                onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                placeholder="SEO title for search engines"
              />
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description (SEO)</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description || ''}
                onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                placeholder="Brief description for search engines"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div>
          <Label htmlFor="content">Page Content</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={15}
            className="font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            You can use HTML tags for formatting
          </p>
        </div>
      </form>
    </div>
  );
};

export default CMSManagement;

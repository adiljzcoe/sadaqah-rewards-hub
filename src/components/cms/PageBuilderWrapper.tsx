
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Eye, Trash2, FileText } from 'lucide-react';
import PageBuilder from './PageBuilder';

interface Page {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  type: 'landing' | 'charity' | 'campaign' | 'standard';
  created_at: string;
  updated_at: string;
}

const PageBuilderWrapper = () => {
  const [currentView, setCurrentView] = useState<'list' | 'builder'>('list');
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);

  // Mock pages data - replace with real data from your backend
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      title: 'Homepage',
      slug: '/',
      status: 'published',
      type: 'landing',
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'About Us',
      slug: '/about',
      status: 'published',
      type: 'standard',
      created_at: '2024-01-02',
      updated_at: '2024-01-10'
    },
    {
      id: '3',
      title: 'Emergency Relief Campaign',
      slug: '/campaigns/emergency-relief',
      status: 'draft',
      type: 'campaign',
      created_at: '2024-01-05',
      updated_at: '2024-01-12'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'landing': return 'bg-blue-500';
      case 'charity': return 'bg-purple-500';
      case 'campaign': return 'bg-orange-500';
      case 'standard': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const createNewPage = () => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      title: 'New Page',
      slug: '/new-page',
      status: 'draft',
      type: 'standard',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    setPages(prev => [...prev, newPage]);
    setSelectedPageId(newPage.id);
    setCurrentView('builder');
  };

  const editPage = (pageId: string) => {
    setSelectedPageId(pageId);
    setCurrentView('builder');
  };

  const deletePage = (pageId: string) => {
    if (confirm('Are you sure you want to delete this page?')) {
      setPages(prev => prev.filter(p => p.id !== pageId));
    }
  };

  const backToList = () => {
    setCurrentView('list');
    setSelectedPageId(null);
  };

  if (currentView === 'builder') {
    return (
      <div className="h-screen">
        <div className="h-12 bg-gray-100 border-b flex items-center px-4">
          <Button variant="outline" size="sm" onClick={backToList}>
            ← Back to Pages
          </Button>
        </div>
        <div className="h-[calc(100vh-3rem)]">
          <PageBuilder />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Visual Page Builder</h2>
          <p className="text-gray-600">Create and manage pages with our drag-and-drop builder</p>
        </div>
        <Button onClick={createNewPage} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Page
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
                    <Badge variant="outline" className={getTypeColor(page.type)}>
                      {page.type}
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
                    onClick={() => editPage(page.id)}
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

      {pages.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Pages Yet</h3>
          <p className="text-gray-500 mb-4">Create your first page to get started</p>
          <Button onClick={createNewPage}>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default PageBuilderWrapper;

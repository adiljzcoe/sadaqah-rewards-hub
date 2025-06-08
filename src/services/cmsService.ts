
import { supabase } from '@/integrations/supabase/client';

// Types
export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  featured_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  template_type: string;
  page_type: 'standard' | 'charity' | 'campaign' | 'landing';
  sort_order: number;
  is_homepage: boolean;
  custom_css?: string;
  custom_js?: string;
  canonical_url?: string;
  redirect_url?: string;
  created_at: string;
  updated_at: string;
  created_by?: string;
  updated_by?: string;
  deleted_at?: string;
  version: number;
  is_active: boolean;
}

export interface CreatePageDTO {
  slug: string;
  title: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  featured_image_url?: string;
  status?: 'draft' | 'published' | 'archived';
  template_type?: string;
  page_type?: 'standard' | 'charity' | 'campaign' | 'landing';
  sort_order?: number;
  is_homepage?: boolean;
  custom_css?: string;
  custom_js?: string;
  canonical_url?: string;
  redirect_url?: string;
}

export interface PageFilters {
  status?: string[];
  page_type?: string[];
  search?: string;
  is_active?: boolean;
  created_after?: string;
  created_before?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PageResponse {
  data: CMSPage[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

// Mock data since CMS tables don't exist in Supabase yet
const mockPages: CMSPage[] = [
  {
    id: '1',
    slug: 'home',
    title: 'Welcome to Our Platform',
    content: '<h1>Welcome</h1><p>This is the homepage content.</p>',
    meta_title: 'Home - Islamic Platform',
    meta_description: 'Welcome to our Islamic charity platform',
    meta_keywords: ['islamic', 'charity', 'donation'],
    featured_image_url: '/images/home-banner.jpg',
    status: 'published',
    template_type: 'default',
    page_type: 'standard',
    sort_order: 0,
    is_homepage: true,
    custom_css: '',
    custom_js: '',
    canonical_url: '',
    redirect_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    is_active: true
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Us',
    content: '<h1>About Our Mission</h1><p>Learn more about our Islamic charity work.</p>',
    meta_title: 'About Us - Islamic Platform',
    meta_description: 'Learn about our mission and values',
    status: 'published',
    template_type: 'default',
    page_type: 'standard',
    sort_order: 1,
    is_homepage: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    version: 1,
    is_active: true
  }
];

class CMSService {
  // Get all pages with pagination and filters
  async getPages(
    filters?: PageFilters,
    pagination?: PaginationParams
  ): Promise<PageResponse> {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'created_at', 
      sortOrder = 'desc' 
    } = pagination || {};

    // Filter mock data
    let filteredPages = [...mockPages];

    if (filters) {
      if (filters.status?.length) {
        filteredPages = filteredPages.filter(page => filters.status!.includes(page.status));
      }
      if (filters.page_type?.length) {
        filteredPages = filteredPages.filter(page => filters.page_type!.includes(page.page_type));
      }
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredPages = filteredPages.filter(page => 
          page.title.toLowerCase().includes(searchTerm) || 
          page.content.toLowerCase().includes(searchTerm)
        );
      }
      if (filters.is_active !== undefined) {
        filteredPages = filteredPages.filter(page => page.is_active === filters.is_active);
      }
    }

    // Sort
    filteredPages.sort((a, b) => {
      const aValue = (a as any)[sortBy];
      const bValue = (b as any)[sortBy];
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    // Paginate
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedPages = filteredPages.slice(startIndex, endIndex);

    return {
      data: paginatedPages,
      totalCount: filteredPages.length,
      currentPage: page,
      totalPages: Math.ceil(filteredPages.length / limit),
      hasMore: endIndex < filteredPages.length
    };
  }

  // Get single page by ID
  async getPageById(id: string): Promise<CMSPage> {
    const page = mockPages.find(p => p.id === id);
    if (!page) throw new Error('Page not found');
    return page;
  }

  // Get page by slug (for public view)
  async getPageBySlug(slug: string, incrementView = true): Promise<CMSPage> {
    const page = mockPages.find(p => 
      p.slug === slug && 
      p.status === 'published' && 
      p.is_active && 
      !p.deleted_at
    );
    if (!page) throw new Error('Page not found');

    // Mock increment view count
    if (incrementView) {
      console.log('Mock: Incrementing view count for page', page.id);
    }

    return page;
  }

  // Create new page
  async createPage(pageData: CreatePageDTO): Promise<CMSPage> {
    // Check slug uniqueness
    const isSlugAvailable = await this.checkSlugAvailability(pageData.slug);
    if (!isSlugAvailable) {
      throw new Error('Slug already exists');
    }

    // If setting as homepage, unset any existing homepage
    if (pageData.is_homepage) {
      await this.unsetCurrentHomepage();
    }

    const newPage: CMSPage = {
      id: Math.random().toString(36).substr(2, 9),
      ...pageData,
      status: pageData.status || 'draft',
      template_type: pageData.template_type || 'default',
      page_type: pageData.page_type || 'standard',
      sort_order: pageData.sort_order || 0,
      is_homepage: pageData.is_homepage || false,
      is_active: true,
      version: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    mockPages.push(newPage);
    console.log('Mock: Created new page', newPage);

    return newPage;
  }

  // Update page
  async updatePage(id: string, updates: Partial<CreatePageDTO>): Promise<CMSPage> {
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) throw new Error('Page not found');

    const currentPage = mockPages[pageIndex];
    
    // Check slug uniqueness if slug is being updated
    if (updates.slug && updates.slug !== currentPage.slug) {
      const isSlugAvailable = await this.checkSlugAvailability(updates.slug, id);
      if (!isSlugAvailable) {
        throw new Error('Slug already exists');
      }
    }

    // If setting as homepage, unset any existing homepage
    if (updates.is_homepage && !currentPage.is_homepage) {
      await this.unsetCurrentHomepage();
    }

    const updatedPage = {
      ...currentPage,
      ...updates,
      version: currentPage.version + 1,
      updated_at: new Date().toISOString()
    };

    mockPages[pageIndex] = updatedPage;
    console.log('Mock: Updated page', updatedPage);

    return updatedPage;
  }

  // Soft delete page
  async deletePage(id: string): Promise<void> {
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) throw new Error('Page not found');

    mockPages[pageIndex] = {
      ...mockPages[pageIndex],
      deleted_at: new Date().toISOString(),
      is_active: false,
      updated_at: new Date().toISOString()
    };

    console.log('Mock: Soft deleted page', id);
  }

  // Hard delete page
  async hardDeletePage(id: string): Promise<void> {
    const pageIndex = mockPages.findIndex(p => p.id === id);
    if (pageIndex === -1) throw new Error('Page not found');

    mockPages.splice(pageIndex, 1);
    console.log('Mock: Hard deleted page', id);
  }

  // Publish page
  async publishPage(id: string): Promise<CMSPage> {
    return this.updatePage(id, { status: 'published' });
  }

  // Unpublish page
  async unpublishPage(id: string): Promise<CMSPage> {
    return this.updatePage(id, { status: 'draft' });
  }

  // Archive page
  async archivePage(id: string): Promise<CMSPage> {
    return this.updatePage(id, { status: 'archived' });
  }

  // Duplicate page
  async duplicatePage(id: string): Promise<CMSPage> {
    const originalPage = await this.getPageById(id);
    if (!originalPage) throw new Error('Page not found');

    const { 
      id: _id, 
      created_at, 
      updated_at, 
      slug, 
      title, 
      version,
      created_by,
      updated_by,
      deleted_at,
      ...pageData 
    } = originalPage;

    // Generate unique slug for the copy
    let copySlug = `${slug}-copy`;
    let counter = 1;
    while (!(await this.checkSlugAvailability(copySlug))) {
      copySlug = `${slug}-copy-${counter}`;
      counter++;
    }

    return this.createPage({
      ...pageData,
      slug: copySlug,
      title: `${title} (Copy)`,
      status: 'draft',
      is_homepage: false
    });
  }

  // Get page versions
  async getPageVersions(pageId: string) {
    // Mock versions data
    console.log('Mock: Getting page versions for', pageId);
    return [];
  }

  // Restore page version
  async restorePageVersion(pageId: string, versionId: string): Promise<CMSPage> {
    console.log('Mock: Restoring page version', pageId, versionId);
    return this.getPageById(pageId);
  }

  // Check slug availability
  async checkSlugAvailability(slug: string, excludeId?: string): Promise<boolean> {
    const existingPage = mockPages.find(p => 
      p.slug === slug && 
      !p.deleted_at && 
      p.id !== excludeId
    );
    return !existingPage;
  }

  // Generate slug from title
  generateSlug(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }

  // Get homepage
  async getHomepage(): Promise<CMSPage | null> {
    const homepage = mockPages.find(p => 
      p.is_homepage && 
      p.status === 'published' && 
      p.is_active && 
      !p.deleted_at
    );
    return homepage || null;
  }

  // Search pages
  async searchPages(query: string, limit = 10): Promise<CMSPage[]> {
    const searchTerm = query.toLowerCase();
    const results = mockPages
      .filter(p => 
        p.status === 'published' && 
        p.is_active && 
        !p.deleted_at &&
        (p.title.toLowerCase().includes(searchTerm) || 
         p.content.toLowerCase().includes(searchTerm) ||
         p.meta_description?.toLowerCase().includes(searchTerm))
      )
      .slice(0, limit);

    return results;
  }

  // Get recent pages
  async getRecentPages(limit = 5): Promise<CMSPage[]> {
    return mockPages
      .filter(p => p.status === 'published' && p.is_active && !p.deleted_at)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  // Bulk operations
  async bulkUpdateStatus(ids: string[], status: 'draft' | 'published' | 'archived'): Promise<void> {
    ids.forEach(id => {
      const pageIndex = mockPages.findIndex(p => p.id === id);
      if (pageIndex !== -1) {
        mockPages[pageIndex] = {
          ...mockPages[pageIndex],
          status,
          updated_at: new Date().toISOString()
        };
      }
    });
    console.log('Mock: Bulk updated status for pages', ids, status);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    ids.forEach(id => {
      const pageIndex = mockPages.findIndex(p => p.id === id);
      if (pageIndex !== -1) {
        mockPages[pageIndex] = {
          ...mockPages[pageIndex],
          deleted_at: new Date().toISOString(),
          is_active: false,
          updated_at: new Date().toISOString()
        };
      }
    });
    console.log('Mock: Bulk deleted pages', ids);
  }

  // Get page analytics
  async getPageAnalytics(pageId: string, startDate?: string, endDate?: string) {
    // Mock analytics data
    console.log('Mock: Getting page analytics for', pageId, startDate, endDate);
    return [];
  }

  // Private helper methods
  private async unsetCurrentHomepage(): Promise<void> {
    const currentHomepage = mockPages.find(p => p.is_homepage);
    if (currentHomepage) {
      currentHomepage.is_homepage = false;
      currentHomepage.updated_at = new Date().toISOString();
    }
    console.log('Mock: Unset current homepage');
  }

  private async createVersionEntry(pageId: string, pageData: CMSPage): Promise<void> {
    console.log('Mock: Creating version entry for page', pageId);
  }

  private async incrementPageView(pageId: string): Promise<void> {
    console.log('Mock: Incrementing page view for', pageId);
  }
}

// Export singleton instance
export const cmsService = new CMSService();
export default cmsService;

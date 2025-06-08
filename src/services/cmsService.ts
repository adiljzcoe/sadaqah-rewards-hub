
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

    let query = supabase
      .from('cms_pages')
      .select('*', { count: 'exact' })
      .is('deleted_at', null);

    // Apply filters
    if (filters) {
      if (filters.status?.length) {
        query = query.in('status', filters.status);
      }
      if (filters.page_type?.length) {
        query = query.in('page_type', filters.page_type);
      }
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
      }
      if (filters.is_active !== undefined) {
        query = query.eq('is_active', filters.is_active);
      }
      if (filters.created_after) {
        query = query.gte('created_at', filters.created_after);
      }
      if (filters.created_before) {
        query = query.lte('created_at', filters.created_before);
      }
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data || [],
      totalCount: count || 0,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / limit),
      hasMore: to < (count || 0) - 1
    };
  }

  // Get single page by ID
  async getPageById(id: string): Promise<CMSPage> {
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  // Get page by slug (for public view)
  async getPageBySlug(slug: string, incrementView = true): Promise<CMSPage> {
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .eq('is_active', true)
      .is('deleted_at', null)
      .single();

    if (error) throw error;

    // Increment view count if requested
    if (data && incrementView) {
      await this.incrementPageView(data.id);
    }

    return data;
  }

  // Create new page
  async createPage(pageData: CreatePageDTO): Promise<CMSPage> {
    const { data: userData } = await supabase.auth.getUser();
    
    // Check slug uniqueness
    const isSlugAvailable = await this.checkSlugAvailability(pageData.slug);
    if (!isSlugAvailable) {
      throw new Error('Slug already exists');
    }

    // If setting as homepage, unset any existing homepage
    if (pageData.is_homepage) {
      await this.unsetCurrentHomepage();
    }

    const { data, error } = await supabase
      .from('cms_pages')
      .insert({
        ...pageData,
        status: pageData.status || 'draft',
        template_type: pageData.template_type || 'default',
        page_type: pageData.page_type || 'standard',
        sort_order: pageData.sort_order || 0,
        is_homepage: pageData.is_homepage || false,
        is_active: true,
        created_by: userData.user?.id,
        updated_by: userData.user?.id,
        version: 1
      })
      .select()
      .single();

    if (error) throw error;

    // Create initial version entry
    await this.createVersionEntry(data.id, data);

    return data;
  }

  // Update page
  async updatePage(id: string, updates: Partial<CreatePageDTO>): Promise<CMSPage> {
    const { data: userData } = await supabase.auth.getUser();

    // Get current page
    const currentPage = await this.getPageById(id);
    
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

    const { data, error } = await supabase
      .from('cms_pages')
      .update({
        ...updates,
        updated_by: userData.user?.id,
        version: currentPage.version + 1,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Create version entry for the update
    await this.createVersionEntry(id, data);

    return data;
  }

  // Soft delete page
  async deletePage(id: string): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('cms_pages')
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_by: userData.user?.id,
        is_active: false
      })
      .eq('id', id);

    if (error) throw error;
  }

  // Hard delete page
  async hardDeletePage(id: string): Promise<void> {
    const { error } = await supabase
      .from('cms_pages')
      .delete()
      .eq('id', id);

    if (error) throw error;
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
    const { data, error } = await supabase
      .from('cms_page_versions')
      .select('*')
      .eq('page_id', pageId)
      .order('version_number', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Restore page version
  async restorePageVersion(pageId: string, versionId: string): Promise<CMSPage> {
    const { data: version } = await supabase
      .from('cms_page_versions')
      .select('*')
      .eq('id', versionId)
      .single();

    if (!version) throw new Error('Version not found');

    const { content_snapshot } = version;
    
    return this.updatePage(pageId, content_snapshot);
  }

  // Check slug availability
  async checkSlugAvailability(slug: string, excludeId?: string): Promise<boolean> {
    let query = supabase
      .from('cms_pages')
      .select('id')
      .eq('slug', slug)
      .is('deleted_at', null);

    if (excludeId) {
      query = query.neq('id', excludeId);
    }

    const { data, error } = await query;
    
    if (error) throw error;
    return !data || data.length === 0;
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
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('is_homepage', true)
      .eq('status', 'published')
      .eq('is_active', true)
      .is('deleted_at', null)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  }

  // Search pages
  async searchPages(query: string, limit = 10): Promise<CMSPage[]> {
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .or(`title.ilike.%${query}%,content.ilike.%${query}%,meta_description.ilike.%${query}%`)
      .eq('status', 'published')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Get recent pages
  async getRecentPages(limit = 5): Promise<CMSPage[]> {
    const { data, error } = await supabase
      .from('cms_pages')
      .select('*')
      .eq('status', 'published')
      .eq('is_active', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Bulk operations
  async bulkUpdateStatus(ids: string[], status: 'draft' | 'published' | 'archived'): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('cms_pages')
      .update({ 
        status,
        updated_by: userData.user?.id,
        updated_at: new Date().toISOString()
      })
      .in('id', ids);

    if (error) throw error;
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('cms_pages')
      .update({ 
        deleted_at: new Date().toISOString(),
        updated_by: userData.user?.id,
        is_active: false
      })
      .in('id', ids);

    if (error) throw error;
  }

  // Get page analytics
  async getPageAnalytics(pageId: string, startDate?: string, endDate?: string) {
    let query = supabase
      .from('cms_page_analytics')
      .select('*')
      .eq('page_id', pageId);

    if (startDate) {
      query = query.gte('date', startDate);
    }
    if (endDate) {
      query = query.lte('date', endDate);
    }

    const { data, error } = await query
      .order('date', { ascending: true });

    if (error) throw error;
    return data || [];
  }

  // Private helper methods
  private async unsetCurrentHomepage(): Promise<void> {
    const { error } = await supabase
      .from('cms_pages')
      .update({ is_homepage: false })
      .eq('is_homepage', true);

    if (error) throw error;
  }

  private async createVersionEntry(pageId: string, pageData: CMSPage): Promise<void> {
    const { data: userData } = await supabase.auth.getUser();

    const { error } = await supabase
      .from('cms_page_versions')
      .insert({
        page_id: pageId,
        version_number: pageData.version,
        title: pageData.title,
        content: pageData.content,
        content_snapshot: {
          slug: pageData.slug,
          title: pageData.title,
          content: pageData.content,
          meta_title: pageData.meta_title,
          meta_description: pageData.meta_description,
          meta_keywords: pageData.meta_keywords,
          featured_image_url: pageData.featured_image_url,
          template_type: pageData.template_type,
          page_type: pageData.page_type,
          custom_css: pageData.custom_css,
          custom_js: pageData.custom_js,
          canonical_url: pageData.canonical_url,
          redirect_url: pageData.redirect_url
        },
        created_by: userData.user?.id
      });

    if (error) console.error('Failed to create version entry:', error);
  }

  private async incrementPageView(pageId: string): Promise<void> {
    const today = new Date().toISOString().split('T')[0];

    // Try to increment existing analytics record
    const { data: existing } = await supabase
      .from('cms_page_analytics')
      .select('id, view_count')
      .eq('page_id', pageId)
      .eq('date', today)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('cms_page_analytics')
        .update({ view_count: existing.view_count + 1 })
        .eq('id', existing.id);

      if (error) console.error('Failed to increment page view:', error);
    } else {
      // Create new analytics record
      const { error } = await supabase
        .from('cms_page_analytics')
        .insert({
          page_id: pageId,
          date: today,
          view_count: 1
        });

      if (error) console.error('Failed to create page analytics:', error);
    }
  }
}

// Export singleton instance
export const cmsService = new CMSService();
export default cmsService;

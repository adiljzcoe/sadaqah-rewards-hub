
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: any;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  featured_image_url?: string;
  status: 'draft' | 'published' | 'archived';
  template_type: string;
  page_type: 'standard' | 'charity' | 'campaign' | 'landing';
  parent_page_id?: string;
  sort_order: number;
  is_homepage: boolean;
  custom_css?: string;
  custom_js?: string;
  schema_markup?: any;
  canonical_url?: string;
  redirect_url?: string;
  created_by?: string;
  updated_by?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
}

// Mock data for CMS pages since the table doesn't exist yet
const mockCMSPages: CMSPage[] = [
  {
    id: '1',
    slug: 'home',
    title: 'Home Page',
    content: { body: 'Welcome to our Islamic charity platform' },
    status: 'published',
    template_type: 'default',
    page_type: 'standard',
    sort_order: 0,
    is_homepage: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    slug: 'about',
    title: 'About Us',
    content: { body: 'Learn more about our mission' },
    status: 'published',
    template_type: 'default',
    page_type: 'standard',
    sort_order: 1,
    is_homepage: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export const useCMSPages = (status?: 'published' | 'draft' | 'archived') => {
  return useQuery({
    queryKey: ['cms-pages', status],
    queryFn: async () => {
      console.log('Fetching CMS pages (mock data):', status);
      
      // Filter mock data by status if provided
      let filteredPages = mockCMSPages;
      if (status) {
        filteredPages = mockCMSPages.filter(page => page.status === status);
      }
      
      console.log('Fetched CMS pages:', filteredPages);
      return filteredPages;
    },
  });
};

export const useCMSPage = (slug: string) => {
  return useQuery({
    queryKey: ['cms-page', slug],
    queryFn: async () => {
      console.log('Fetching CMS page by slug (mock data):', slug);
      
      const page = mockCMSPages.find(p => p.slug === slug && p.status === 'published');
      
      if (!page) {
        throw new Error('Page not found');
      }

      console.log('Fetched CMS page:', page);
      return page;
    },
  });
};

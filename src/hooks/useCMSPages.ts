
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

export const useCMSPages = (status?: 'published' | 'draft' | 'archived') => {
  return useQuery({
    queryKey: ['cms-pages', status],
    queryFn: async () => {
      console.log('Fetching CMS pages:', status);
      
      let query = supabase.from('cms_pages').select('*');
      
      if (status) {
        query = query.eq('status', status);
      }
      
      query = query.order('sort_order', { ascending: true });
      
      const { data, error } = await query;

      if (error) {
        console.error('Error fetching CMS pages:', error);
        throw error;
      }

      console.log('Fetched CMS pages:', data);
      return data as CMSPage[];
    },
  });
};

export const useCMSPage = (slug: string) => {
  return useQuery({
    queryKey: ['cms-page', slug],
    queryFn: async () => {
      console.log('Fetching CMS page by slug:', slug);
      
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) {
        console.error('Error fetching CMS page:', error);
        throw error;
      }

      console.log('Fetched CMS page:', data);
      return data as CMSPage;
    },
  });
};

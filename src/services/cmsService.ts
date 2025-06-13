import { useQuery } from 'react-query';
import { fetchAppConfig } from '@/api/appConfig';

export interface CMSPage {
  id: string;
  title: string;
  slug: string;
  content?: any; // Make content optional to fix the build error
  meta_title?: string;
  meta_description?: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by?: string;
  template_type: string;
  page_type: 'standard' | 'charity' | 'campaign' | 'landing';
  sort_order: number;
  is_homepage: boolean;
  is_active: boolean;
  parent_id?: string;
  seo_keywords?: string[];
  featured_image?: string;
  excerpt?: string;
  publish_date?: string;
  author_id?: string;
  view_count: number;
  language_code: string;
  redirect_url?: string;
}

export const useCMSPages = () => {
  return useQuery('cmsPages', async () => {
    // Replace this with your actual CMS data fetching logic
    const response = await fetch('/api/cms-pages');
    if (!response.ok) {
      throw new Error('Failed to fetch CMS pages');
    }
    return response.json();
  });
};

export const useCMSPage = (slug: string) => {
  return useQuery(['cmsPage', slug], async () => {
    // Replace this with your actual CMS data fetching logic
    const response = await fetch(`/api/cms-pages?slug=${slug}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch CMS page with slug: ${slug}`);
    }
    const data = await response.json();
    return data[0]; // Assuming the API returns an array
  });
};

export const useAppConfigData = () => {
  return useQuery('appConfig', fetchAppConfig);
};

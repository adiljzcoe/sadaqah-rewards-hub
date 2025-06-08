
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface CMSPage {
  id: string;
  slug: string;
  title: string;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  featured_image_url: string | null;
  status: 'draft' | 'published' | 'archived';
  template_type: string;
  page_type: 'standard' | 'charity' | 'campaign' | 'landing';
  parent_page_id?: string;
  sort_order: number;
  is_homepage: boolean;
  custom_css: string | null;
  custom_js: string | null;
  canonical_url: string | null;
  redirect_url: string | null;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  version: number;
  is_active: boolean;
}

export const useCMSPages = (status?: 'published' | 'draft' | 'archived') => {
  return useQuery({
    queryKey: ['cms-pages', status],
    queryFn: async () => {
      let query = supabase
        .from('cms_pages')
        .select('*')
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });
      
      if (status) {
        query = query.eq('status', status);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data as CMSPage[];
    },
  });
};

export const useCMSPage = (slug: string) => {
  return useQuery({
    queryKey: ['cms-page', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'published')
        .eq('is_active', true)
        .is('deleted_at', null)
        .single();

      if (error) throw error;
      return data as CMSPage;
    },
  });
};

export const useCreateCMSPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (pageData: Omit<CMSPage, 'id' | 'created_at' | 'updated_at' | 'version' | 'deleted_at'>) => {
      const { data, error } = await supabase
        .from('cms_pages')
        .insert([{
          ...pageData,
          created_by: (await supabase.auth.getUser()).data.user?.id
        }])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
      toast({ title: 'Page created successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error creating page', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useUpdateCMSPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...pageData }: Partial<CMSPage> & { id: string }) => {
      const { data, error } = await supabase
        .from('cms_pages')
        .update({
          ...pageData,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
      toast({ title: 'Page updated successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error updating page', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

export const useDeleteCMSPage = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      // Soft delete by setting deleted_at timestamp
      const { error } = await supabase
        .from('cms_pages')
        .update({ 
          deleted_at: new Date().toISOString(),
          updated_by: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-pages'] });
      toast({ title: 'Page deleted successfully' });
    },
    onError: (error: any) => {
      toast({ 
        title: 'Error deleting page', 
        description: error.message,
        variant: 'destructive'
      });
    }
  });
};

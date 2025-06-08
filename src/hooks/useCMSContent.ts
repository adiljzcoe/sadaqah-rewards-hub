
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface CMSContent {
  id: string;
  content_key: string;
  content_type: 'text' | 'html' | 'json' | 'markdown';
  content_value: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useCMSContent = (contentKey?: string) => {
  return useQuery({
    queryKey: ['cms-content', contentKey],
    queryFn: async () => {
      let query = supabase
        .from('cms_content')
        .select('*')
        .eq('is_active', true);
      
      if (contentKey) {
        query = query.eq('content_key', contentKey);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      return contentKey ? data?.[0] : data;
    },
  });
};

export const useUpdateCMSContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content_value }: { id: string; content_value: string }) => {
      const { data, error } = await supabase
        .from('cms_content')
        .update({ content_value, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cms-content'] });
    },
  });
};


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

// Since cms_content table doesn't exist yet, using admin_settings as a temporary solution
export const useCMSContent = (contentKey?: string) => {
  return useQuery({
    queryKey: ['cms-content', contentKey],
    queryFn: async () => {
      let query = supabase
        .from('admin_settings')
        .select('*')
        .like('setting_key', 'cms_%');
      
      if (contentKey) {
        query = query.eq('setting_key', `cms_${contentKey}`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      
      // Transform admin_settings data to CMS format
      const transformedData = data?.map(item => ({
        id: item.id,
        content_key: item.setting_key.replace('cms_', ''),
        content_type: 'text' as const,
        content_value: item.setting_value,
        is_active: true,
        created_at: item.created_at,
        updated_at: item.updated_at
      }));
      
      return contentKey ? transformedData?.[0] : transformedData;
    },
  });
};

export const useUpdateCMSContent = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, content_value }: { id: string; content_value: string }) => {
      const { data, error } = await supabase
        .from('admin_settings')
        .update({ setting_value: content_value, updated_at: new Date().toISOString() })
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

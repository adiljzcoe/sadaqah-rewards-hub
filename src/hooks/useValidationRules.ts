
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ValidationRule {
  id: string;
  field_name: string;
  rule_type: string;
  rule_value: any;
  error_message: string;
  component_name: string;
  is_active: boolean;
}

interface SanitizationRule {
  id: string;
  field_name: string;
  sanitization_type: string;
  component_name: string;
  is_active: boolean;
}

export const useValidationRules = (componentName: string) => {
  return useQuery({
    queryKey: ['validation-rules', componentName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('validation_rules')
        .select('*')
        .eq('component_name', componentName)
        .eq('is_active', true);

      if (error) throw error;
      return data as ValidationRule[];
    },
  });
};

export const useSanitizationRules = (componentName: string) => {
  return useQuery({
    queryKey: ['sanitization-rules', componentName],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sanitization_rules')
        .select('*')
        .eq('component_name', componentName)
        .eq('is_active', true);

      if (error) throw error;
      return data as SanitizationRule[];
    },
  });
};

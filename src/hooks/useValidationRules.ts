
import { useQuery } from '@tanstack/react-query';

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

// Mock data for now until tables are properly synced
const mockValidationRules: ValidationRule[] = [
  {
    id: '1',
    field_name: 'amount',
    rule_type: 'required',
    rule_value: {},
    error_message: 'Donation amount is required',
    component_name: 'DonationForm',
    is_active: true
  },
  {
    id: '2',
    field_name: 'email',
    rule_type: 'email',
    rule_value: {},
    error_message: 'Please enter a valid email address',
    component_name: 'DonationForm',
    is_active: true
  }
];

const mockSanitizationRules: SanitizationRule[] = [
  {
    id: '1',
    field_name: 'email',
    sanitization_type: 'trim',
    component_name: 'DonationForm',
    is_active: true
  },
  {
    id: '2',
    field_name: 'email',
    sanitization_type: 'lower',
    component_name: 'DonationForm',
    is_active: true
  }
];

export const useValidationRules = (componentName: string) => {
  return useQuery({
    queryKey: ['validation-rules', componentName],
    queryFn: async () => {
      // TODO: Replace with actual Supabase query once tables are synced
      return mockValidationRules.filter(rule => rule.component_name === componentName);
    },
  });
};

export const useSanitizationRules = (componentName: string) => {
  return useQuery({
    queryKey: ['sanitization-rules', componentName],
    queryFn: async () => {
      // TODO: Replace with actual Supabase query once tables are synced
      return mockSanitizationRules.filter(rule => rule.component_name === componentName);
    },
  });
};

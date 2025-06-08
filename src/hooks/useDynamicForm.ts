
import { useState, useCallback } from 'react';
import { useValidationRules, useSanitizationRules } from './useValidationRules';
import { createDynamicSchema, sanitizeFormData } from '@/utils/dynamicValidation';
import { validateInput } from '@/utils/validation';

interface UseDynamicFormOptions {
  componentName: string;
  onSubmit: (data: any) => Promise<void> | void;
  defaultValues?: Record<string, any>;
}

export function useDynamicForm({
  componentName,
  onSubmit,
  defaultValues = {},
}: UseDynamicFormOptions) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: validationRules = [], isLoading: validationLoading } = useValidationRules(componentName);
  const { data: sanitizationRules = [], isLoading: sanitizationLoading } = useSanitizationRules(componentName);

  const setValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const validate = useCallback(() => {
    if (validationRules.length === 0) return true;

    try {
      const schema = createDynamicSchema(validationRules);
      const result = validateInput(schema, values);
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.errors?.forEach(error => {
          newErrors.form = error;
        });
        setErrors(newErrors);
        return false;
      }
      
      setErrors({});
      return true;
    } catch (error) {
      console.error('Validation error:', error);
      setErrors({ form: 'Validation failed' });
      return false;
    }
  }, [validationRules, values]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      // Validate first
      if (!validate()) {
        return;
      }

      // Sanitize data
      const sanitizedData = sanitizeFormData(values, sanitizationRules);
      
      // Submit
      await onSubmit(sanitizedData);
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationRules, sanitizationRules, onSubmit, isSubmitting, validate]);

  const reset = useCallback(() => {
    setValues(defaultValues);
    setErrors({});
  }, [defaultValues]);

  return {
    values,
    errors,
    isSubmitting,
    isLoading: validationLoading || sanitizationLoading,
    setValue,
    setValues,
    handleSubmit,
    reset,
    validate,
  };
}

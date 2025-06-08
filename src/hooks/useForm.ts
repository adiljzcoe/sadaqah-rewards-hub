
import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateInput } from '@/utils/validation';

interface UseFormOptions<T> {
  schema: z.ZodSchema<T>;
  onSubmit: (data: T) => Promise<void> | void;
  defaultValues?: Partial<T>;
}

interface UseFormReturn<T> {
  values: Partial<T>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: (field: keyof T, value: any) => void;
  setValues: (values: Partial<T>) => void;
  setError: (field: keyof T, error: string) => void;
  clearError: (field: keyof T) => void;
  clearErrors: () => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  reset: () => void;
  validate: () => boolean;
}

export function useForm<T>({
  schema,
  onSubmit,
  defaultValues = {},
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValuesState] = useState<Partial<T>>(defaultValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setValue = useCallback((field: keyof T, value: any) => {
    setValuesState(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as string];
        return newErrors;
      });
    }
  }, [errors]);

  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState(prev => ({ ...prev, ...newValues }));
  }, []);

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field as string]: error }));
  }, []);

  const clearError = useCallback((field: keyof T) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field as string];
      return newErrors;
    });
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const validate = useCallback((): boolean => {
    const result = validateInput(schema, values);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.errors?.forEach(error => {
        // Extract field name from error message or use a generic key
        // This is a simplified approach - in production you might want more sophisticated error mapping
        const fieldName = Object.keys(values)[0] || 'form';
        newErrors[fieldName] = error;
      });
      setErrors(newErrors);
      return false;
    }
    
    clearErrors();
    return true;
  }, [schema, values, clearErrors]);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const result = validateInput(schema, values);
      
      if (!result.success) {
        const newErrors: Record<string, string> = {};
        result.errors?.forEach(error => {
          // More sophisticated error mapping would be needed in production
          newErrors.form = error;
        });
        setErrors(newErrors);
        return;
      }
      
      clearErrors();
      await onSubmit(result.data);
    } catch (error) {
      console.error('Form submission error:', error);
      setError('form' as keyof T, 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [values, schema, onSubmit, isSubmitting, clearErrors, setError]);

  const reset = useCallback(() => {
    setValuesState(defaultValues);
    clearErrors();
  }, [defaultValues, clearErrors]);

  const isValid = Object.keys(errors).length === 0 && Object.keys(values).length > 0;

  return {
    values,
    errors,
    isSubmitting,
    isValid,
    setValue,
    setValues,
    setError,
    clearError,
    clearErrors,
    handleSubmit,
    reset,
    validate,
  };
}

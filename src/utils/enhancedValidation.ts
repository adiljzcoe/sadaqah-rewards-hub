
import { z } from 'zod';

// Enhanced validation schemas that work with the database-driven system
export const createEnhancedEmailSchema = (customMessage?: string) => 
  z.string().email(customMessage || 'Please enter a valid email address');

export const createEnhancedPasswordSchema = (customMessage?: string) =>
  z.string()
    .min(8, customMessage || 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, customMessage || 'Password must contain uppercase, lowercase and number');

export const createEnhancedPhoneSchema = (customMessage?: string) =>
  z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, customMessage || 'Please enter a valid phone number')
    .min(10, 'Phone number must be at least 10 digits');

export const createEnhancedAmountSchema = (min: number = 1, max: number = 100000, customMessage?: string) =>
  z.number()
    .min(min, customMessage || `Minimum amount is £${min}`)
    .max(max, customMessage || `Maximum amount is £${max}`)
    .multipleOf(0.01, 'Amount must have at most 2 decimal places');

export const createEnhancedNameSchema = (minLength: number = 2, maxLength: number = 50, customMessage?: string) =>
  z.string()
    .min(minLength, customMessage || `Name must be at least ${minLength} characters`)
    .max(maxLength, customMessage || `Name must be less than ${maxLength} characters`)
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

// Field-specific validation helpers
export const validateDonationAmount = (amount: number): { isValid: boolean; error?: string } => {
  if (!amount || amount <= 0) {
    return { isValid: false, error: 'Donation amount is required' };
  }
  if (amount < 1) {
    return { isValid: false, error: 'Minimum donation amount is £1' };
  }
  if (amount > 100000) {
    return { isValid: false, error: 'Maximum donation amount is £100,000' };
  }
  return { isValid: true };
};

export const validateCharityRegistrationNumber = (regNumber: string): { isValid: boolean; error?: string } => {
  if (!regNumber) {
    return { isValid: false, error: 'Registration number is required' };
  }
  if (!/^[0-9]{6,8}$/.test(regNumber)) {
    return { isValid: false, error: 'Registration number must be 6-8 digits' };
  }
  return { isValid: true };
};

// Enhanced sanitization functions
export const sanitizeUserInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential XSS
    .replace(/\s+/g, ' '); // Normalize whitespace
};

export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizePhoneNumber = (phone: string): string => {
  return phone.trim().replace(/\s+/g, '');
};

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  sanitizedData?: Record<string, any>;
}

export const validateAndSanitizeForm = (
  data: Record<string, any>,
  schema: z.ZodSchema
): ValidationResult => {
  try {
    // First sanitize the data
    const sanitizedData: Record<string, any> = {};
    
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === 'string') {
        switch (key) {
          case 'email':
            sanitizedData[key] = sanitizeEmail(value);
            break;
          case 'phone':
            sanitizedData[key] = sanitizePhoneNumber(value);
            break;
          default:
            sanitizedData[key] = sanitizeUserInput(value);
        }
      } else {
        sanitizedData[key] = value;
      }
    });

    // Then validate
    const result = schema.safeParse(sanitizedData);
    
    if (result.success) {
      return {
        isValid: true,
        errors: {},
        sanitizedData,
      };
    } else {
      const errors: Record<string, string> = {};
      result.error.errors.forEach(err => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      
      return {
        isValid: false,
        errors,
        sanitizedData,
      };
    }
  } catch (error) {
    return {
      isValid: false,
      errors: { form: 'Validation failed' },
    };
  }
};

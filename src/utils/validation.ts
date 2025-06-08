
import { z } from 'zod';

// Common validation schemas - now enhanced to work with database-driven validation
export const emailSchema = z.string().email('Please enter a valid email address');

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number')
  .min(10, 'Phone number must be at least 10 digits');

export const currencyAmountSchema = z
  .number()
  .positive('Amount must be positive')
  .multipleOf(0.01, 'Amount must have at most 2 decimal places');

export const donationAmountSchema = z
  .number()
  .min(1, 'Minimum donation amount is £1')
  .max(100000, 'Maximum donation amount is £100,000')
  .multipleOf(0.01, 'Amount must have at most 2 decimal places');

export const nameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes');

export const urlSchema = z
  .string()
  .url('Please enter a valid URL')
  .refine((url) => {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  }, 'URL must use HTTP or HTTPS protocol');

// Enhanced form validation schemas that integrate with database-driven validation
export const donationFormSchema = z.object({
  amount: donationAmountSchema,
  charityId: z.string().uuid('Please select a charity').optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  anonymous: z.boolean().default(false),
  giftAid: z.boolean().default(false),
  email: emailSchema.optional(),
  full_name: nameSchema.optional(),
});

export const profileFormSchema = z.object({
  full_name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  dateOfBirth: z.date().max(new Date(), 'Date of birth cannot be in the future').optional(),
  address: z.object({
    street: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    postcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i, 'Please enter a valid UK postcode'),
    country: z.string().default('United Kingdom'),
  }).optional(),
});

export const campaignFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters').max(2000, 'Description must be less than 2000 characters'),
  targetAmount: currencyAmountSchema.min(100, 'Target amount must be at least £100'),
  endDate: z.date().min(new Date(), 'End date must be in the future'),
  category: z.string().min(1, 'Please select a category'),
  imageUrl: urlSchema.optional(),
});

export const charityFormSchema = z.object({
  charity_name: z.string().min(3, 'Charity name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  registration_number: z.string().regex(/^[0-9]{6,8}$/, 'Registration number must be 6-8 digits'),
  website_url: urlSchema.optional(),
  category: z.string().min(1, 'Please select a category'),
});

// Utility functions
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateInput = <T>(schema: z.ZodSchema<T>, data: unknown): { success: boolean; data?: T; errors?: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => err.message),
      };
    }
    return {
      success: false,
      errors: ['Validation failed'],
    };
  }
};

// Enhanced validation with real-time feedback
export const validateField = <T>(schema: z.ZodSchema<T>, value: unknown): { isValid: boolean; error?: string } => {
  try {
    schema.parse(value);
    return { isValid: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0]?.message };
    }
    return { isValid: false, error: 'Invalid input' };
  }
};

// Batch validation for multiple fields
export const validateMultipleFields = (
  validations: Array<{ schema: z.ZodSchema<any>; value: unknown; fieldName: string }>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  validations.forEach(({ schema, value, fieldName }) => {
    const result = validateField(schema, value);
    if (!result.isValid) {
      errors[fieldName] = result.error || 'Invalid input';
      isValid = false;
    }
  });

  return { isValid, errors };
};

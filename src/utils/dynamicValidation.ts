
import { z } from 'zod';

interface ValidationRule {
  field_name: string;
  rule_type: string;
  rule_value: any;
  error_message: string;
}

interface SanitizationRule {
  field_name: string;
  sanitization_type: string;
}

export const createDynamicSchema = (validationRules: ValidationRule[]) => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  // Group rules by field name
  const rulesByField = validationRules.reduce((acc, rule) => {
    if (!acc[rule.field_name]) {
      acc[rule.field_name] = [];
    }
    acc[rule.field_name].push(rule);
    return acc;
  }, {} as Record<string, ValidationRule[]>);

  // Create schema for each field
  Object.entries(rulesByField).forEach(([fieldName, rules]) => {
    let fieldSchema: z.ZodTypeAny = z.string();

    rules.forEach(rule => {
      switch (rule.rule_type) {
        case 'required':
          fieldSchema = fieldSchema.min(1, rule.error_message);
          break;
        case 'min_length':
          fieldSchema = fieldSchema.min(rule.rule_value.length, rule.error_message);
          break;
        case 'max_length':
          fieldSchema = fieldSchema.max(rule.rule_value.length, rule.error_message);
          break;
        case 'pattern':
          fieldSchema = fieldSchema.regex(new RegExp(rule.rule_value.regex), rule.error_message);
          break;
        case 'range':
          // For numeric fields, convert to number first
          if (fieldName === 'amount') {
            fieldSchema = z.number()
              .min(rule.rule_value.min / 100, rule.error_message) // Convert pence to pounds
              .max(rule.rule_value.max / 100, rule.error_message);
          }
          break;
        case 'email':
          fieldSchema = z.string().email(rule.error_message);
          break;
      }
    });

    schemaFields[fieldName] = fieldSchema;
  });

  return z.object(schemaFields);
};

export const sanitizeInput = (value: string, rules: SanitizationRule[]): string => {
  let sanitized = value;

  rules.forEach(rule => {
    switch (rule.sanitization_type) {
      case 'trim':
        sanitized = sanitized.trim();
        break;
      case 'lower':
        sanitized = sanitized.toLowerCase();
        break;
      case 'upper':
        sanitized = sanitized.toUpperCase();
        break;
      case 'strip_html':
        sanitized = sanitized.replace(/<[^>]*>/g, '');
        break;
      case 'escape_html':
        sanitized = sanitized
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
        break;
      case 'remove_special':
        sanitized = sanitized.replace(/[^\w\s-]/g, '');
        break;
    }
  });

  return sanitized;
};

export const sanitizeFormData = (
  data: Record<string, any>, 
  sanitizationRules: SanitizationRule[]
): Record<string, any> => {
  const sanitized = { ...data };

  Object.keys(sanitized).forEach(fieldName => {
    const fieldRules = sanitizationRules.filter(rule => rule.field_name === fieldName);
    if (fieldRules.length > 0 && typeof sanitized[fieldName] === 'string') {
      sanitized[fieldName] = sanitizeInput(sanitized[fieldName], fieldRules);
    }
  });

  return sanitized;
};

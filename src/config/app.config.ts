
// Enterprise Application Configuration
interface AppConfig {
  app: {
    name: string;
    version: string;
    environment: 'development' | 'staging' | 'production';
    debug: boolean;
  };
  api: {
    baseUrl: string;
    timeout: number;
    retries: number;
  };
  auth: {
    sessionTimeout: number;
    refreshThreshold: number;
    maxLoginAttempts: number;
    lockoutDuration: number;
  };
  security: {
    csrfProtection: boolean;
    rateLimit: {
      windowMs: number;
      maxRequests: number;
    };
  };
  features: {
    maintenance: boolean;
    registration: boolean;
    analytics: boolean;
    pushNotifications: boolean;
  };
  ui: {
    theme: 'light' | 'dark' | 'auto';
    language: string;
    itemsPerPage: number;
  };
}

export const appConfig: AppConfig = {
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Your Jannah',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    environment: (import.meta.env.VITE_ENVIRONMENT as AppConfig['app']['environment']) || 'development',
    debug: import.meta.env.VITE_DEBUG === 'true',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://omkrbduvavbkmbjtphgw.supabase.co',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000'),
    retries: parseInt(import.meta.env.VITE_API_RETRIES || '3'),
  },
  auth: {
    sessionTimeout: parseInt(import.meta.env.VITE_SESSION_TIMEOUT || '1800000'), // 30 minutes
    refreshThreshold: parseInt(import.meta.env.VITE_REFRESH_THRESHOLD || '300000'), // 5 minutes
    maxLoginAttempts: parseInt(import.meta.env.VITE_MAX_LOGIN_ATTEMPTS || '5'),
    lockoutDuration: parseInt(import.meta.env.VITE_LOCKOUT_DURATION || '900000'), // 15 minutes
  },
  security: {
    csrfProtection: import.meta.env.VITE_CSRF_PROTECTION !== 'false',
    rateLimit: {
      windowMs: parseInt(import.meta.env.VITE_RATE_LIMIT_WINDOW || '900000'), // 15 minutes
      maxRequests: parseInt(import.meta.env.VITE_RATE_LIMIT_MAX || '100'),
    },
  },
  features: {
    maintenance: import.meta.env.VITE_MAINTENANCE_MODE === 'true',
    registration: import.meta.env.VITE_REGISTRATION_ENABLED !== 'false',
    analytics: import.meta.env.VITE_ANALYTICS_ENABLED !== 'false',
    pushNotifications: import.meta.env.VITE_PUSH_NOTIFICATIONS_ENABLED !== 'false',
  },
  ui: {
    theme: (import.meta.env.VITE_DEFAULT_THEME as AppConfig['ui']['theme']) || 'light',
    language: import.meta.env.VITE_DEFAULT_LANGUAGE || 'en',
    itemsPerPage: parseInt(import.meta.env.VITE_ITEMS_PER_PAGE || '20'),
  },
};

export default appConfig;

/**
 * Environment configuration
 * Centralized configuration for different environments
 */

export const ENV = {
  // Supabase Configuration
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  
  // Application Configuration
  APP_NAME: import.meta.env.VITE_APP_NAME || 'Capex Analysis',
  APP_VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Environment Detection
  IS_PRODUCTION: import.meta.env.PROD,
  IS_DEVELOPMENT: import.meta.env.DEV,
  
  // API Configuration
  API_TIMEOUT: 30000, // 30 seconds
  
  // Feature Flags
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_ERROR_TRACKING: import.meta.env.VITE_ENABLE_ERROR_TRACKING === 'true',
}

/**
 * Validate required environment variables
 */
export function validateEnvironment() {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ]
  
  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing)
    return false
  }
  
  return true
}

/**
 * Log environment info (only in development)
 */
export function logEnvironmentInfo() {
  if (ENV.IS_DEVELOPMENT) {
    console.log('Environment:', {
      mode: import.meta.env.MODE,
      production: ENV.IS_PRODUCTION,
      development: ENV.IS_DEVELOPMENT,
      appName: ENV.APP_NAME,
      appVersion: ENV.APP_VERSION
    })
  }
}

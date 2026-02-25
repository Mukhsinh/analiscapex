/**
 * Centralized error handling utilities
 */

import { ENV } from '../config/environment'

/**
 * Log error (only in development)
 */
export function logError(error, context = '') {
  if (ENV.IS_DEVELOPMENT) {
    console.error(`[Error${context ? ` - ${context}` : ''}]:`, error)
  }
}

/**
 * Format error message for user display
 */
export function formatErrorMessage(error) {
  if (typeof error === 'string') {
    return error
  }
  
  if (error?.message) {
    return error.message
  }
  
  return 'Terjadi kesalahan. Silakan coba lagi.'
}

/**
 * Handle API errors
 */
export function handleApiError(error, context = '') {
  logError(error, context)
  
  // Network errors
  if (error?.message?.includes('fetch')) {
    return 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.'
  }
  
  // Supabase errors
  if (error?.code) {
    switch (error.code) {
      case '23505':
        return 'Data sudah ada dalam database.'
      case '23503':
        return 'Data terkait tidak ditemukan.'
      case 'PGRST116':
        return 'Data tidak ditemukan.'
      case '42501':
        return 'Anda tidak memiliki akses untuk operasi ini.'
      default:
        return formatErrorMessage(error)
    }
  }
  
  return formatErrorMessage(error)
}

/**
 * Async error wrapper
 */
export function asyncErrorHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args)
    } catch (error) {
      logError(error, fn.name)
      throw error
    }
  }
}

/**
 * Safe JSON parse
 */
export function safeJsonParse(json, fallback = null) {
  try {
    return JSON.parse(json)
  } catch (error) {
    logError(error, 'JSON Parse')
    return fallback
  }
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error) {
      if (i === maxRetries - 1) throw error
      
      const backoffDelay = delay * Math.pow(2, i)
      logError(`Retry ${i + 1}/${maxRetries} after ${backoffDelay}ms`, 'Retry')
      
      await new Promise(resolve => setTimeout(resolve, backoffDelay))
    }
  }
}

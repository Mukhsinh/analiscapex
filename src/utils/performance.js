/**
 * Performance monitoring utilities
 */

import { ENV } from '../config/environment'

/**
 * Measure function execution time
 */
export function measurePerformance(fn, label) {
  return async (...args) => {
    if (!ENV.IS_DEVELOPMENT) {
      return await fn(...args)
    }
    
    const start = performance.now()
    const result = await fn(...args)
    const end = performance.now()
    
    console.log(`[Performance] ${label}: ${(end - start).toFixed(2)}ms`)
    
    return result
  }
}

/**
 * Debounce function
 */
export function debounce(fn, delay = 300) {
  let timeoutId
  
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn.apply(this, args), delay)
  }
}

/**
 * Throttle function
 */
export function throttle(fn, limit = 300) {
  let inThrottle
  
  return function (...args) {
    if (!inThrottle) {
      fn.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Lazy load component
 */
export function lazyLoadComponent(importFn) {
  return React.lazy(importFn)
}

/**
 * Check if browser supports feature
 */
export const browserSupport = {
  localStorage: () => {
    try {
      const test = '__test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch (e) {
      return false
    }
  },
  
  webWorkers: () => typeof Worker !== 'undefined',
  
  serviceWorker: () => 'serviceWorker' in navigator,
  
  indexedDB: () => 'indexedDB' in window
}

/**
 * Get performance metrics
 */
export function getPerformanceMetrics() {
  if (!window.performance) return null
  
  const navigation = performance.getEntriesByType('navigation')[0]
  
  return {
    dns: navigation?.domainLookupEnd - navigation?.domainLookupStart,
    tcp: navigation?.connectEnd - navigation?.connectStart,
    request: navigation?.responseStart - navigation?.requestStart,
    response: navigation?.responseEnd - navigation?.responseStart,
    dom: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
    load: navigation?.loadEventEnd - navigation?.loadEventStart,
    total: navigation?.loadEventEnd - navigation?.fetchStart
  }
}

/**
 * Log performance metrics (development only)
 */
export function logPerformanceMetrics() {
  if (!ENV.IS_DEVELOPMENT) return
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = getPerformanceMetrics()
      if (metrics) {
        console.table(metrics)
      }
    }, 0)
  })
}

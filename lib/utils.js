// lib/utils.js

/**
 * Configuration constants
 */
const SHORT_CODE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789';
const DEFAULT_SHORT_CODE_LENGTH = 8;
const DEFAULT_DELETE_TOKEN_LENGTH = 16; // Bytes, results in 32 hex chars
const MIN_EXPIRATION_DAYS = 1;
const MAX_EXPIRATION_DAYS = 30;

/**
 * Generates a cryptographically secure short code
 * @param {number} length - Length of the short code (default: 8)
 * @returns {string} - Generated short code
 */
export function generateShortCode(length = DEFAULT_SHORT_CODE_LENGTH) {
  if (length < 4 || length > 20) {
    throw new Error('Short code length must be between 4 and 20 characters');
  }

  // Always use crypto for security-critical operations
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto API not available - secure random generation required');
  }

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, byte => {
    return SHORT_CODE_CHARS[byte % SHORT_CODE_CHARS.length];
  }).join('');
}

/**
 * Generates a cryptographically secure delete token
 * @param {number} length - Length in bytes (default: 16, results in 32 hex chars)
 * @returns {string} - Generated delete token as hex string
 */
export function generateDeleteToken(length = DEFAULT_DELETE_TOKEN_LENGTH) {
  if (length < 8 || length > 32) {
    throw new Error('Delete token length must be between 8 and 32 bytes');
  }

  // Always use crypto for security-critical operations
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto API not available - secure random generation required');
  }

  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  
  return Array.from(array, byte => 
    byte.toString(16).padStart(2, '0')
  ).join('');
}

/**
 * Calculates expiration date with validation
 * @param {number} days - Number of days from now (default: 7)
 * @returns {Date} - Calculated expiration date
 */
export function calculateExpirationDate(days = 7) {
  if (typeof days !== 'number' || !Number.isInteger(days)) {
    throw new Error('Days must be an integer');
  }

  if (days < MIN_EXPIRATION_DAYS || days > MAX_EXPIRATION_DAYS) {
    throw new Error(`Expiration days must be between ${MIN_EXPIRATION_DAYS} and ${MAX_EXPIRATION_DAYS}`);
  }

  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Validates URL format (centralized validation)
 * @param {string} urlString - URL to validate
 * @returns {boolean} - True if valid URL
 */
export function isValidUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    return false;
  }

  try {
    const url = new URL(urlString);
    // Only allow http and https protocols
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

/**
 * Normalizes a URL by adding protocol if missing
 * @param {string} urlString - URL to normalize
 * @returns {string} - Normalized URL
 */
export function normalizeUrl(urlString) {
  if (!urlString || typeof urlString !== 'string') {
    throw new Error('Invalid URL string provided');
  }

  let normalized = urlString.trim();
  
  // Add https:// if no protocol is specified
  if (!normalized.match(/^https?:\/\//i)) {
    normalized = 'https://' + normalized;
  }

  // Validate the normalized URL
  if (!isValidUrl(normalized)) {
    throw new Error('Unable to create valid URL from input');
  }

  return normalized;
}

/**
 * Formats expiration date for display
 * @param {Date|string} expirationDate - Date to format
 * @returns {string} - Formatted date string
 */
export function formatExpirationDate(expirationDate) {
  try {
    const date = new Date(expirationDate);
    
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return 'Expired';
    } else if (diffDays === 0) {
      return 'Expires today';
    } else if (diffDays === 1) {
      return 'Expires tomorrow';
    } else if (diffDays <= 7) {
      return `Expires in ${diffDays} days`;
    } else {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.error('Error formatting expiration date:', error);
    return 'Unknown';
  }
}

/**
 * Generates a slug-friendly string from text
 * @param {string} text - Text to slugify
 * @param {number} maxLength - Maximum length (default: 20)
 * @returns {string} - Slugified text
 */
export function slugify(text, maxLength = 20) {
  if (!text || typeof text !== 'string') {
    return '';
  }

  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .slice(0, maxLength);
}

/**
 * Validates short code format
 * @param {string} shortCode - Short code to validate
 * @returns {boolean} - True if valid
 */
export function isValidShortCode(shortCode) {
  if (!shortCode || typeof shortCode !== 'string') {
    return false;
  }

  const codeRegex = new RegExp(`^[${SHORT_CODE_CHARS}]+$`);
  return shortCode.length >= 4 && 
         shortCode.length <= 20 && 
         codeRegex.test(shortCode);
}

/**
 * Checks if the crypto API is available
 * @returns {boolean} - True if crypto is available
 */
export function isCryptoAvailable() {
  return typeof crypto !== 'undefined' && 
         typeof crypto.getRandomValues === 'function';
}

/**
 * Safe JSON parse with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {any} defaultValue - Default value if parsing fails
 * @returns {any} - Parsed object or default value
 */
export function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Failed to parse JSON:', error);
    return defaultValue;
  }
}

/**
 * Debounce function for limiting API calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
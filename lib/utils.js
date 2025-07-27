// lib/utils.js

/**
 * Generates a random short code with cryptographically secure randomness
 * @param {number} length - Length of the short code (default: 6)
 * @returns {string} - Random short code
 */
export function generateShortCode(length = 6) {
  // Use crypto.getRandomValues if available (browser/node), fallback to Math.random
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(36)).join('').substring(0, length).toLowerCase();
  }
  
  // Fallback for older environments
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generates a secure delete token with cryptographically secure randomness
 * @param {number} length - Length of the token in bytes (default: 16)
 * @returns {string} - Random delete token
 */
export function generateDeleteToken(length = 16) {
  // Use crypto.getRandomValues if available, fallback to Math.random
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  
  // Fallback for older environments
  let result = '';
  for (let i = 0; i < length * 2; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

/**
 * Calculates expiration date by adding days to current date
 * @param {number} days - Number of days to add (default: 7)
 * @returns {Date} - Expiration date
 */
export function calculateExpirationDate(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Validates if a string is a valid URL
 * @param {string} string - String to validate
 * @returns {boolean} - True if valid URL, false otherwise
 */
export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
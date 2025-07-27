// lib/utils.js

export function generateShortCode(length = 6) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(36)).join('').substring(0, length).toLowerCase();
  }
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function generateDeleteToken(length = 16) {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }
  let result = '';
  for (let i = 0; i < length * 2; i++) {
    result += Math.floor(Math.random() * 16).toString(16);
  }
  return result;
}

export function calculateExpirationDate(days = 7) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
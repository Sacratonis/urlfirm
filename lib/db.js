import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// --- ADD THESE LINES FOR DEBUGGING ---
console.log("DEBUG: NEXT_PUBLIC_SUPABASE_URL from env:", supabaseUrl);
console.log("DEBUG: NEXT_PUBLIC_SUPABASE_ANON_KEY from env:", supabaseAnonKey ? "[REDACTED]" : "undefined");
// --- END DEBUGGING LINES ---

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

// Ensure the URL doesn't have trailing slashes which can sometimes cause issues
const cleanSupabaseUrl = supabaseUrl.replace(/\/$/, '');

const supabase = createClient(cleanSupabaseUrl, supabaseAnonKey);

/**
 * Database operation result type
 * @typedef {Object} DatabaseResult
 * @property {boolean} success - Whether the operation succeeded
 * @property {any} data - The returned data (if successful)
 * @property {string} error - Error message (if failed)
 * @property {string} code - Error code for categorization
 */

/**
 * Validates slug format
 * @param {string} slug - The slug to validate
 * @returns {boolean} - True if valid
 */
function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') return false;
  if (slug.length < 1 || slug.length > 50) return false;
  return /^[a-zA-Z0-9_-]+$/.test(slug);
}

/**
 * Validates delete token format
 * @param {string} token - The token to validate
 * @returns {boolean} - True if valid
 */
function isValidDeleteToken(token) {
  if (!token || typeof token !== 'string') return false;
  if (token.length !== 32) return false; // Expecting 16 bytes as hex = 32 chars
  return /^[a-f0-9]+$/.test(token);
}

/**
 * Finds a link by its slug
 * @param {string} shortCode - The slug to search for
 * @returns {Promise<DatabaseResult>} - Database operation result
 */
export async function findLinkBySlug(shortCode) {
  try {
    // Input validation
    if (!isValidSlug(shortCode)) {
      return {
        success: false,
        data: null,
        error: 'Invalid slug format',
        code: 'INVALID_INPUT'
      };
    }

    const { data, error } = await supabase
      .from('shortened_links')
      .select('*')
      .eq('slug', shortCode)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows found - this is expected behavior
        return {
          success: true,
          data: null,
          error: null,
          code: 'NOT_FOUND'
        };
      }
      console.error('Database error in findLinkBySlug:', {
        error: error.message,
        code: error.code,
        slug: shortCode
      });
      return {
        success: false,
        data: null,
        error: 'Database query failed',
        code: error.code || 'DB_ERROR'
      };
    }

    return {
      success: true,
      data: data,
      error: null,
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error('Unexpected error in findLinkBySlug:', {
      error: error.message,
      slug: shortCode,
      stack: error.stack
    });
    return {
      success: false,
      data: null,
      error: 'Unexpected database error',
      code: 'UNEXPECTED_ERROR'
    };
  }
}

/**
 * Inserts a new shortened link
 * @param {Object} linkData - The link data to insert
 * @param {string} linkData.original_url - The original URL
 * @param {string} linkData.slug - The short slug
 * @param {string} linkData.delete_token - The deletion token
 * @param {string} linkData.expires_at - The expiration timestamp
 * @returns {Promise<DatabaseResult>} - Database operation result
 */
export async function insertLink(linkData) {
  try {
    // Input validation
    if (!linkData || typeof linkData !== 'object') {
      return {
        success: false,
        data: null,
        error: 'Invalid link data provided',
        code: 'INVALID_INPUT'
      };
    }

    const { original_url, slug, delete_token, expires_at } = linkData;

    // Validate required fields
    if (!original_url || typeof original_url !== 'string') {
      return {
        success: false,
        data: null,
        error: 'Invalid original URL',
        code: 'INVALID_URL'
      };
    }
    if (!isValidSlug(slug)) {
      return {
        success: false,
        data: null,
        error: 'Invalid slug format',
        code: 'INVALID_SLUG'
      };
    }
    if (!isValidDeleteToken(delete_token)) {
      return {
        success: false,
        data: null,
        error: 'Invalid delete token format',
        code: 'INVALID_TOKEN'
      };
    }
    if (!expires_at || !Date.parse(expires_at)) {
      return {
        success: false,
        data: null,
        error: 'Invalid expiration date',
        code: 'INVALID_DATE'
      };
    }

    const { data, error } = await supabase
      .from('shortened_links')
      .insert([{
        original_url,
        slug,
        delete_token,
        expires_at,
      }])
      .select()
      .single();

    if (error) {
      console.error('Database error in insertLink:', {
        error: error.message,
        code: error.code,
        slug: slug
      });
      // Handle specific database errors
      if (error.code === '23505') {
        return {
          success: false,
          data: null,
          error: 'Slug already exists',
          code: 'DUPLICATE_SLUG'
        };
      }
      return {
        success: false,
        data: null,
        error: 'Failed to save link',
        code: error.code || 'DB_ERROR'
      };
    }

    return {
      success: true,
      data: data,
      error: null,
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error('Unexpected error in insertLink:', {
      error: error.message,
      linkData: { ...linkData, delete_token: '[REDACTED]' },
      stack: error.stack
    });
    return {
      success: false,
      data: null,
      error: 'Unexpected database error',
      code: 'UNEXPECTED_ERROR'
    };
  }
}

/**
 * Deletes expired links from the database
 * @returns {Promise<DatabaseResult>} - Database operation result with count
 */
export async function deleteExpiredLinks() {
  try {
    const currentTime = new Date().toISOString();

    // --- CORRECTED APPROACH ---
    // 1. Count expired links first (without head: true to get the count correctly)
    const { count: expiredCount, error: countError } = await supabase
      .from('shortened_links')
      .select('*', { count: 'exact', head: true }) // head: true is okay for counting
      .lt('expires_at', currentTime);

    if (countError) {
      console.error('Error counting expired links:', countError);
      return {
        success: false,
        data: null,
        error: 'Failed to count expired links',
        code: countError.code || 'COUNT_ERROR'
      };
    }

    // 2. Check the count correctly. Supabase returns count in the 'count' property.
    const countValue = expiredCount; // expiredCount should be the number now

    // 3. If no expired links, return early
    if (countValue === 0 || countValue === null) { // Check for 0 or null/undefined
      return {
        success: true,
        data: { deletedCount: 0 },
        error: null,
        code: 'NO_EXPIRED_LINKS'
      };
    }

    // 4. Delete expired links
    const { error: deleteError } = await supabase
      .from('shortened_links')
      .delete()
      .lt('expires_at', currentTime);

    if (deleteError) {
      console.error('Error deleting expired links:', deleteError);
      return {
        success: false,
        data: null,
        error: 'Failed to delete expired links',
        code: deleteError.code || 'DELETE_ERROR'
      };
    }

    console.log(`Successfully deleted ${countValue} expired links.`);
    return {
      success: true,
      data: { deletedCount: countValue }, // Return the correct count
      error: null,
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error('Unexpected error in deleteExpiredLinks:', {
      error: error.message,
      stack: error.stack
    });
    return {
      success: false,
      data: null,
      error: 'Unexpected database error',
      code: 'UNEXPECTED_ERROR'
    };
  }
}

/**
 * Deletes a specific link by slug and delete token
 * @param {string} slug - The link slug
 * @param {string} deleteToken - The delete token
 * @returns {Promise<DatabaseResult>} - Database operation result
 */
export async function deleteLinkByToken(slug, deleteToken) {
  try {
    // Input validation
    if (!isValidSlug(slug)) {
      return {
        success: false,
        data: null,
        error: 'Invalid slug format',
        code: 'INVALID_SLUG'
      };
    }
    if (!isValidDeleteToken(deleteToken)) {
      return {
        success: false,
        data: null,
        error: 'Invalid delete token format',
        code: 'INVALID_TOKEN'
      };
    }

    const { data, error } = await supabase
      .from('shortened_links')
      .delete()
      .eq('slug', slug)
      .eq('delete_token', deleteToken)
      .select(); // Select the deleted row(s) to confirm

    if (error) {
      console.error('Error in deleteLinkByToken:', {
        error: error.message,
        code: error.code,
        slug: slug
      });
      // --- IMPROVED ERROR HANDLING ---
      // While there isn't a specific unique code like 23505 for deletes,
      // we can still provide a generic error response.
      return {
        success: false,
        data: null,
        error: 'Failed to delete link',
        code: error.code || 'DELETE_ERROR'
      };
    }

    if (!data || data.length === 0) {
      return {
        success: false,
        data: null,
        error: 'Link not found or invalid token',
        code: 'NOT_FOUND'
      };
    }

    return {
      success: true,
      data: { deletedLink: data[0] }, // Return the deleted link data
      error: null,
      code: 'SUCCESS'
    };
  } catch (error) {
    console.error('Unexpected error in deleteLinkByToken:', {
      error: error.message,
      slug: slug,
      stack: error.stack
    });
    return {
      success: false,
      data: null,
      error: 'Unexpected database error',
      code: 'UNEXPECTED_ERROR'
    };
  }
}

/**
 * Gets database health status
 * @returns {Promise<DatabaseResult>} - Database health result
 */
export async function getDatabaseHealth() {
  try {
    // --- CORRECTED APPROACH ---
    // Perform a simple, non-destructive check.
    // E.g., count total links or select a specific known row.
    // Using head: true with select('count') is tricky, let's do a simple count.
    const { count, error } = await supabase
      .from('shortened_links')
      .select('*', { count: 'exact', head: true }); // head: true is okay for counting total

    if (error) {
      return {
        success: false,
        data: null,
        error: 'Database health check failed',
        code: error.code || 'HEALTH_CHECK_FAILED'
      };
    }

    // The 'count' variable now holds the total number of links (or 0)
    return {
      success: true,
      data: { status: 'healthy', totalLinks: count !== null ? count : 0 }, // Safely use count
      error: null,
      code: 'SUCCESS'
    };
  } catch (error) {
    // Catch unexpected errors during the health check process itself
    console.error('Unexpected error during database health check:', error);
    return {
      success: false,
      data: null,
      error: 'Database connection failed or unexpected error during check',
      code: 'CONNECTION_FAILED' // Or a more specific code if needed
    };
  }
}
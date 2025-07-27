// lib/db.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Mapping from old schema (links table) to new Supabase schema (shortened_links table) ---
// old column name (links)     => new column name (shortened_links)
// ------------------------------------------------------------
// short_code                  => slug
// original_url                => original_url
// delete_token                => delete_token
// expires_at                  => expires_at
// is_custom                   => (not present in new schema, handled in app logic if needed)

/**
 * Finds a link by its slug (previously short_code).
 * @param {string} shortCode - The unique slug for the link.
 * @returns {Promise<Object|null>} The link object or null if not found.
 */
export async function findLinkBySlug(shortCode) {
  try {
    // Map 'shortCode' parameter to 'slug' column
    // --- UPDATE: Select only necessary columns ---
    const { data, error } = await supabase
      .from('shortened_links')
      .select('original_url, slug, delete_token, expires_at') // Explicitly select columns
      .eq('slug', shortCode) // Use 'slug' column
      .single(); // Expect a single row

    if (error) {
      // Handle case where no row is found (404-like)
      if (error.code === 'PGRST116') { // No rows returned
         return null;
      }
      console.error('Error finding link by slug:', error);
      throw error; // Re-throw for API route to handle
    }
    // Return the raw data from Supabase, mapping column names as needed by the caller
    // The caller expects properties like original_url, expires_at, delete_token
    return data;
  } catch (error) {
    console.error('Unexpected error in findLinkBySlug:', error);
    throw error;
  }
}

/**
 * Inserts a new link into the database.
 * @param {Object} linkData - The data for the new link.
 * @returns {Promise<Object>} The inserted link object.
 */
export async function insertLink(linkData) {
  try {
    // Map linkData properties to Supabase table columns
    // --- FIX: Corrected property name from 'short_code' to 'slug' ---
    // --- UPDATE: Select only necessary columns ---
    const { data, error } = await supabase
      .from('shortened_links')
      .insert([
        {
          original_url: linkData.original_url, // Map property
          slug: linkData.slug,                 // FIX: Use 'slug' property correctly
          delete_token: linkData.delete_token, // Map property
          expires_at: linkData.expires_at,     // Map property
          // is_custom is not in the new schema, so it's ignored or handled elsewhere
        }
      ])
      .select('original_url, slug, delete_token, expires_at') // Select inserted data explicitly
      .single(); // Expect a single row back

    if (error) {
      console.error('Error inserting link:', error);
      throw error; // Let API route handle unique constraint violations etc.
    }
    // Return the inserted row data
    return data;
  } catch (error) {
    console.error('Unexpected error in insertLink:', error);
    throw error;
  }
}

/**
 * Deletes a link by its slug (previously short_code) and delete token.
 * @param {string} shortCode - The slug of the link to delete.
 * @param {string} deleteToken - The delete token associated with the link.
 * @returns {Promise<number>} The number of rows deleted (0 or 1).
 */
// --- UPDATE: This function is kept for potential future use or cleanup, but the API route is removed ---
export async function deleteLinkBySlugAndToken(shortCode, deleteToken) {
  try {
    // Map parameters to Supabase table columns
    const { data, error } = await supabase
      .from('shortened_links')
      .delete()
      .match({ slug: shortCode, delete_token: deleteToken }); // Match on 'slug' and 'delete_token'

    if (error) {
      console.error('Error deleting link:', error);
      throw error;
    }
    // Supabase returns an array of deleted rows in `data`
    // Return the count of deleted rows
    return data ? data.length : 0;
  } catch (error) {
    console.error('Unexpected error in deleteLinkBySlugAndToken:', error);
    throw error;
  }
}

/**
 * Optional: Function to delete expired links.
 * @returns {Promise<number>} The number of rows deleted.
 */
export async function deleteExpiredLinks() {
  try {
    // Use Supabase's `lt` (less than) filter for timestamps
    // --- UPDATE: Select only necessary columns (though data might be empty for delete) ---
    const { data, error } = await supabase
      .from('shortened_links')
      .delete()
      .lt('expires_at', new Date().toISOString()); // Delete where expires_at is less than now

    if (error) {
      console.error('Error deleting expired links:', error);
      throw error;
    }
    const deletedCount = data ? data.length : 0;
    console.log(`Deleted ${deletedCount} expired links.`);
    return deletedCount;
  } catch (error) {
    console.error('Unexpected error in deleteExpiredLinks:', error);
    throw error;
  }
}
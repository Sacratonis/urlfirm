// lib/db.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
  );
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function findLinkBySlug(shortCode) {
  try {
    const { data, error } = await supabase
      .from('shortened_links')
      .select('*')
      .eq('slug', shortCode)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
         return null;
      }
      console.error('Error finding link by slug:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in findLinkBySlug:', error);
    throw error;
  }
}

export async function insertLink(linkData) {
  try {
    const { data, error } = await supabase
      .from('shortened_links')
      .insert([
        {
          original_url: linkData.original_url,
          slug: linkData.slug,
          delete_token: linkData.delete_token,
          expires_at: linkData.expires_at,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error inserting link:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in insertLink:', error);
    throw error;
  }
}

// Optional: Function to delete expired links remains for potential background tasks
export async function deleteExpiredLinks() {
  try {
    const { data, error } = await supabase
      .from('shortened_links')
      .delete()
      .lt('expires_at', new Date().toISOString());

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

// deleteLinkBySlugAndToken function removed as it's no longer used by the frontend
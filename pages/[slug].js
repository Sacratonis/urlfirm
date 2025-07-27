// pages/[slug].js

// Ensure this function in lib/db.js now uses Supabase and operates on the 'slug' column
import { findLinkBySlug } from '../lib/db';

export async function getServerSideProps(context) {
  // The 'slug' parameter from the URL path (e.g., /abc123) corresponds to the 'slug' column value
  const { slug } = context.params;

  try {
    // --- UPDATE 1: findLinkBySlug now queries the 'slug' column ---
    // The updated function returns the row data from the 'shortened_links' table
    const link = await findLinkBySlug(slug);

    if (!link) {
      return {
        notFound: true, // Triggers the 404 page
      };
    }

    const now = new Date();
    // --- UPDATE 2: Access 'expires_at' property from Supabase response ---
    // Supabase returns column values as object properties with the same name
    const expiresAt = new Date(link.expires_at);

    if (expiresAt < now) {
      // Redirect to expired page
      return {
        redirect: {
          destination: '/expired',
          permanent: false,
        },
      };
    }

    // --- UPDATE 3: Access 'original_url' property from Supabase response ---
    // Supabase returns column values as object properties with the same name
    return {
      redirect: {
        destination: link.original_url,
        permanent: false, // 307 Temporary Redirect
      },
    };
  } catch (error) {
    console.error('Error fetching link for slug:', slug, error);
    // Return 404 on system errors
    return {
      notFound: true,
    };
  }
}

// This page component will not be rendered if getServerSideProps redirects or returns notFound
export default function RedirectToOriginal() {
  return null; // This should never be reached
}
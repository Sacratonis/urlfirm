// Optional API endpoint to get redirect information
// The main redirect logic is in pages/[slug].js using getServerSideProps
import { findLinkBySlug } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  // Expect slug as a query parameter, e.g., /api/redirect?slug=abc123
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid slug parameter.' });
  }

  try {
    // --- UPDATE: Select only necessary columns ---
    const { data: link, error } = await findLinkBySlug(slug); // Destructure data

    if (error) {
        console.error('Database error fetching link:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!link) {
      return res.status(404).json({ error: 'Link not found.' });
    }

    const now = new Date();
    const expiresAt = new Date(link.expires_at);
    if (expiresAt < now) {
      // Link has expired
      return res.status(410).json({ error: 'Link has expired.' }); // 410 Gone
    }

    // Return the original URL for the client to handle the redirect
    return res.status(200).json({ original_url: link.original_url });
  } catch (error) {
    console.error('API Error in /api/redirect:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
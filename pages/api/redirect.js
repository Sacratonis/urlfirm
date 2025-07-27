// pages/api/redirect.js
import { findLinkBySlug } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid slug parameter.' });
  }

  try {
    const link = await findLinkBySlug(slug);
    if (!link) {
      return res.status(404).json({ error: 'Link not found.' });
    }

    const now = new Date();
    const expiresAt = new Date(link.expires_at);

    if (expiresAt < now) {
      return res.status(410).json({ error: 'Link has expired.' });
    }

    return res.status(200).json({ original_url: link.original_url });
  } catch (error) {
    console.error('API Error in /api/redirect:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
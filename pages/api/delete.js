// pages/api/delete.js
import { deleteLinkBySlugAndToken } from '../../lib/db';

export default async function handler(req, res) {
  // Standardize on DELETE method
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', ['DELETE']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { slug, deleteToken } = req.body;

  // Basic validation
  if (!slug || !deleteToken) {
    return res.status(400).json({ error: 'Slug and delete token are required.' });
  }

  try {
    const deletedCount = await deleteLinkBySlugAndToken(slug, deleteToken);
    if (deletedCount > 0) {
      return res.status(200).json({ message: 'Link deleted successfully.' });
    } else {
      return res.status(404).json({ error: 'Link not found or invalid delete token.' });
    }
  } catch (error) {
    console.error('API Error in /api/delete:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
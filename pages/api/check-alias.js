// pages/api/check-alias.js
import { findLinkBySlug } from '../../lib/db'; // Import the DB function

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { alias } = req.body;

  // Validate input
  if (!alias || typeof alias !== 'string') {
    return res.status(400).json({ error: 'Invalid alias provided' });
  }

  try {
    // Use the existing DB function to check if the slug exists
    const result = await findLinkBySlug(alias);

    // Check the structured result from findLinkBySlug
    if (result.success) {
      // If data is null, the slug was NOT found -> Available
      // If data exists, the slug WAS found -> Not Available
      const isAvailable = result.data === null;
      return res.status(200).json({ available: isAvailable });
    } else {
      // Handle potential DB errors during the check
      console.error('DB Error checking alias availability:', result.error);
      // It's safer to report as unavailable if we can't check
      return res.status(500).json({ error: 'Failed to check alias availability' });
    }
  } catch (error) {
    console.error('Unexpected error checking alias:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
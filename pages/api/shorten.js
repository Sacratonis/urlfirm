// pages/api/shorten.js
import { generateShortCode, generateDeleteToken, calculateExpirationDate, isValidUrl } from '../../lib/utils';
import { insertLink, findLinkBySlug } from '../../lib/db';
import { isBlockedURL } from '../../lib/contentFilter';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { longUrl, customAlias } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: 'Please provide a long URL.' });
  }
  if (typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'Long URL must be a string.' });
  }
  if (!isValidUrl(longUrl)) {
    return res.status(400).json({ error: 'Please provide a valid long URL.' });
  }
  if (customAlias && (typeof customAlias !== 'string' || customAlias.length > 20)) {
    return res.status(400).json({ error: 'Custom alias must be a string and less than 21 characters.' });
  }

  const blocked = await isBlockedURL(longUrl);
  if (blocked) {
    return res.status(400).json({ error: 'The provided URL is not allowed.' });
  }

  let slugToUse = customAlias;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  try {
    if (customAlias) {
      const existingLink = await findLinkBySlug(customAlias);
      if (existingLink) {
        return res.status(409).json({ error: 'Custom alias is already taken. Please choose another.' });
      }
      isUnique = true;
    }

    while (!isUnique && attempts < maxAttempts) {
      const generatedSlug = generateShortCode(8);
      const existingLink = await findLinkBySlug(generatedSlug);
      if (!existingLink) {
        slugToUse = generatedSlug;
        isUnique = true;
      }
      attempts++;
    }

    if (!isUnique) {
      return res.status(500).json({ error: 'Unable to generate a unique short code. Please try again.' });
    }

    if (!slugToUse) {
        return res.status(500).json({ error: 'Failed to determine a slug for the link.' });
    }

    const deleteToken = generateDeleteToken(16);
    const expiresAt = calculateExpirationDate(7);
    const newLinkData = {
      original_url: longUrl,
      slug: slugToUse,
      delete_token: deleteToken,
      expires_at: expiresAt.toISOString(),
    };

    const insertedLink = await insertLink(newLinkData);

    if (!insertedLink) {
        return res.status(500).json({ error: 'Failed to insert link into database.' });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const shortUrl = `${siteUrl}/${insertedLink.slug}`;

    return res.status(201).json({
      shortUrl: shortUrl,
      slug: insertedLink.slug,
      deleteToken: insertedLink.delete_token,
    });
  } catch (error) {
    console.error('API Error in /api/shorten:', error);
    if (error?.code === '23505') {
        if (error.message?.includes('slug')) {
             return res.status(409).json({ error: 'Generated alias conflict. Please try again.' });
        }
    }
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
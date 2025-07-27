// pages/api/shorten.js
import { generateShortCode, generateDeleteToken, calculateExpirationDate, isValidUrl } from '../../lib/utils';
import { insertLink, findLinkBySlug } from '../../lib/db';
import { isBlockedURL } from '../../lib/contentFilter';

export default async function handler(req, res) {
  // console.log("=== DEBUG: API /api/shorten called ===");
  // console.log("Request Method:", req.method);
  // console.log("Request Body:", req.body);

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const { longUrl, customAlias } = req.body;

  // --- DEBUG LOGS ---
  // console.log("Extracted longUrl:", longUrl);
  // console.log("Extracted customAlias:", customAlias);
  // console.log("Type of longUrl:", typeof longUrl);
  // if (longUrl) {
  //   console.log("isValidUrl(longUrl) result:", isValidUrl(longUrl));
  //   console.log("isBlockedURL(longUrl) result:", await isBlockedURL(longUrl));
  // }
  // --- END DEBUG LOGS ---

  // Basic validation
  if (!longUrl) {
    // console.log("Validation Failed: longUrl is missing or falsy");
    return res.status(400).json({ error: 'Please provide a long URL.' });
  }
  if (typeof longUrl !== 'string') {
    // console.log("Validation Failed: longUrl is not a string");
    return res.status(400).json({ error: 'Long URL must be a string.' });
  }
  if (!isValidUrl(longUrl)) {
    // console.log("Validation Failed: longUrl failed isValidUrl check");
    return res.status(400).json({ error: 'Please provide a valid long URL.' });
  }
  if (customAlias && (typeof customAlias !== 'string' || customAlias.length > 20)) {
    // console.log("Validation Failed: customAlias check failed");
    return res.status(400).json({ error: 'Custom alias must be a string and less than 21 characters.' });
  }

  // Content Filtering: Check if the URL is BLOCKED
  const blocked = await isBlockedURL(longUrl);
  if (blocked) {
    // console.log("Validation Failed: URL is blocked by content filter");
    return res.status(400).json({ error: 'The provided URL is not allowed.' });
  }

  // --- UPDATED: Slug generation with enhanced debug logs ---
  let slugToUse = customAlias;
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  // console.log("DEBUG: Before slug generation logic");
  // console.log("  customAlias:", customAlias);
  // console.log("  Initial slugToUse:", slugToUse);

  try {
    if (customAlias) {
      // console.log("DEBUG: Handling custom alias");
      // --- UPDATE: Select only necessary columns ---
      const { data: existingLink, error: findError } = await findLinkBySlug(customAlias); // Destructure data

      if (findError) {
        console.error('Database error checking custom alias:', findError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (existingLink) {
        // console.log("Conflict: Custom alias already taken");
        return res.status(409).json({ error: 'Custom alias is already taken. Please choose another.' });
      }
      isUnique = true; // Alias is available
      // console.log("  Custom alias is unique, slugToUse:", slugToUse);
    }

    // console.log("DEBUG: Entering slug generation loop. isUnique:", isUnique, "attempts:", attempts);
    // Generate a unique slug if no custom alias or if custom alias was taken (though taken case is handled above)
    while (!isUnique && attempts < maxAttempts) {
      // console.log("  Loop iteration:", attempts + 1);
      const generatedSlug = generateShortCode(8); // Adjust length as needed
      // console.log("    Generated slug:", generatedSlug);
      // --- UPDATE: Select only necessary columns ---
      const { data: existingLink, error: findError } = await findLinkBySlug(generatedSlug); // Destructure data

      if (findError) {
        console.error('Database error checking generated slug:', findError);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // console.log("    Checked for existing link:", existingLink ? "Found" : "Not Found");
      if (!existingLink) {
        slugToUse = generatedSlug;
        isUnique = true;
        // console.log("    Slug is unique, slugToUse set to:", slugToUse);
      }
      attempts++;
      // console.log("    End of loop iteration. isUnique:", isUnique, "attempts:", attempts);
    }
    // console.log("DEBUG: Exited slug generation loop. isUnique:", isUnique, "attempts:", attempts, "slugToUse:", slugToUse);

    if (!isUnique) {
      // console.log("Error: Could not generate unique slug");
      return res.status(500).json({ error: 'Unable to generate a unique short code. Please try again.' });
    }

    // --- Add a critical check here ---
    if (!slugToUse) {
        // console.log("CRITICAL ERROR: slugToUse is still null/undefined after all logic!");
        return res.status(500).json({ error: 'Failed to determine a slug for the link.' });
    }
    // --- End critical check ---

    const deleteToken = generateDeleteToken(16);
    const expiresAt = calculateExpirationDate(7);

    const newLinkData = {
      original_url: longUrl,
      slug: slugToUse,
      delete_token: deleteToken,
      expires_at: expiresAt.toISOString(),
    };

    // console.log("DEBUG: About to call insertLink with data:", newLinkData);
    // --- UPDATE: Select only necessary columns ---
    const { data: insertedLink, error: insertError } = await insertLink(newLinkData); // Destructure data

    if (insertError) {
        console.error('Database error inserting link:', insertError);
        // Handle specific errors like unique constraint violation if needed
        return res.status(500).json({ error: 'Internal Server Error' });
    }


    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const shortUrl = `${siteUrl}/${insertedLink.slug}`;
    // --- UPDATE: QR Code logic removed ---

    // console.log("=== DEBUG: Successfully created short URL ===");
    return res.status(201).json({
      shortUrl: shortUrl,
      // qrCode: qrCodeUrl, // Removed QR Code
      slug: insertedLink.slug,
      deleteToken: insertedLink.delete_token, // Included for completeness, though UI hides it
    });
  } catch (error) {
    console.error('API Error in /api/shorten:', error);
    // Include more details in the error response during debugging if helpful
    // return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
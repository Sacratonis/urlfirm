// pages/api/shorten.js
// Import the correct utility function
import { generateShortCode, generateDeleteToken, calculateExpirationDate, isValidUrl, normalizeUrl } from '../../lib/utils'; 
import { insertLink, findLinkBySlug } from '../../lib/db';
import { isBlockedURL } from '../../lib/contentFilter';

// Rate limiting map (in production, use Redis or external service)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10;

function checkRateLimit(ip) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];
  
  // Clean old requests
  const recentRequests = userRequests.filter(time => now - time < RATE_LIMIT_WINDOW);
  
  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

export default async function handler(req, res) {
  // Set security and cache headers
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests.'
    });
  }

  // Rate limiting
  // Consider using x-real-ip or x-forwarded-for correctly based on your proxy setup
  const clientIP = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown').split(',')[0].trim(); 
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ 
      error: 'Too many requests',
      message: 'Please wait a moment before creating another link.'
    });
  }

  const { longUrl, customAlias } = req.body;

  // Enhanced input validation
  if (!longUrl) {
    return res.status(400).json({ 
      error: 'URL required',
      message: 'Please provide a URL to shorten.'
    });
  }

  if (typeof longUrl !== 'string') {
    return res.status(400).json({ 
      error: 'Invalid URL format',
      message: 'URL must be provided as text.'
    });
  }

  // Normalize and validate URL
  let normalizedUrl;
  try {
    normalizedUrl = normalizeUrl(longUrl.trim()); // Use normalizeUrl instead of sanitizeUrl
  } catch (err) {
    return res.status(400).json({ 
      error: 'Invalid URL',
      message: err.message || 'Please provide a valid URL.'
    });
  }

  if (!isValidUrl(normalizedUrl)) { // Use isValidUrl for final check
    return res.status(400).json({ 
      error: 'Invalid URL',
      message: 'Please provide a valid URL (including http:// or https://).'
    });
  }

  // Enhanced custom alias validation
  if (customAlias) {
    if (typeof customAlias !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid custom alias',
        message: 'Custom alias must be text.'
      });
    }
    
    const trimmedAlias = customAlias.trim();
    if (trimmedAlias.length === 0 || trimmedAlias.length > 20) {
      return res.status(400).json({ 
        error: 'Invalid custom alias length',
        message: 'Custom alias must be 1-20 characters long.'
      });
    }
    
    // Check for invalid characters
    if (!/^[a-zA-Z0-9_-]+$/.test(trimmedAlias)) {
      return res.status(400).json({ 
        error: 'Invalid custom alias characters',
        message: 'Custom alias can only contain letters, numbers, hyphens, and underscores.'
      });
    }
  }

  // Content filtering
  try {
    const blocked = await isBlockedURL(normalizedUrl);
    if (blocked.blocked) { // Check the 'blocked' property
      return res.status(400).json({ 
        error: 'URL not allowed',
        message: blocked.reason || 'This URL cannot be shortened due to our content policy.'
      });
    }
  } catch (error) {
    console.error('Content filter error:', error);
    return res.status(500).json({ 
      error: 'Service temporarily unavailable',
      message: 'Unable to process your request right now. Please try again.'
    });
  }

  let slugToUse = customAlias?.trim();
  let isUnique = false;
  let attempts = 0;
  const maxAttempts = 5;

  try {
    // Check custom alias availability
    if (slugToUse) {
      const existingLink = await findLinkBySlug(slugToUse);
      if (existingLink.success && existingLink.data) { // Check success and data
        return res.status(409).json({ 
          error: 'Alias unavailable',
          message: 'This custom alias is already taken. Please choose another.'
        });
      }
      // Handle potential DB errors for alias check
      if (!existingLink.success) {
         console.error('DB Error checking alias:', existingLink.error);
         return res.status(500).json({ 
           error: 'Internal server error',
           message: 'Unable to check alias availability. Please try again.'
         });
      }
      isUnique = true;
    }

    // Generate unique slug if needed
    while (!isUnique && attempts < maxAttempts) {
      const generatedSlug = generateShortCode(8);
      const existingLink = await findLinkBySlug(generatedSlug);
      if (existingLink.success && !existingLink.data) { // Check success and no data (not found)
        slugToUse = generatedSlug;
        isUnique = true;
      } else if (!existingLink.success) {
        // Handle potential DB errors during slug generation
        console.error('DB Error checking generated slug:', existingLink.error);
        throw new Error('Database error during slug generation');
      }
      attempts++;
    }

    if (!isUnique) {
      console.error('Failed to generate unique slug after maximum attempts');
      return res.status(500).json({ 
        error: 'Service temporarily busy',
        message: 'Unable to generate a unique short code. Please try again in a moment.'
      });
    }

    // Create link data
    const deleteToken = generateDeleteToken(16);
    const expiresAt = calculateExpirationDate(7);

    const newLinkData = {
      original_url: normalizedUrl, // Use the normalized URL
      slug: slugToUse,
      delete_token: deleteToken,
      expires_at: expiresAt.toISOString(),
    };

    const insertedLink = await insertLink(newLinkData);
    if (!insertedLink.success) { // Check success
      console.error('DB Insert Error:', insertedLink.error);
      throw new Error(insertedLink.error || 'Failed to insert link into database');
    }

    // Generate response
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const shortUrl = `${siteUrl}/${insertedLink.data.slug}`; // Use data from DB response

    return res.status(201).json({
      success: true,
      shortUrl: shortUrl,
      slug: insertedLink.data.slug,
      deleteToken: insertedLink.data.delete_token,
      expiresAt: insertedLink.data.expires_at,
    });

  } catch (error) {
    console.error('API Error in /api/shorten:', error);
    
    // Handle specific database errors
    if (error?.code === '23505') {
      if (error.message?.includes('slug')) {
        return res.status(409).json({ 
          error: 'Alias conflict',
          message: 'A conflict occurred with your alias. Please try again.'
        });
      }
    }

    return res.status(500).json({ 
      error: 'Internal server error',
      message: 'Something went wrong on our end. Please try again.'
    });
  }
}
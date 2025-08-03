// lib/contentFilter.js

/**
 * Validates if a URL object has the required properties and protocol
 * @param {URL} urlObject - A URL object (not string)
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidURLObject(urlObject) {
  if (!urlObject || typeof urlObject !== 'object') {
    return false;
  }
  if (!urlObject.protocol || !urlObject.hostname) {
    return false;
  }
  if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
    return false;
  }
  if (urlObject.hostname.length === 0 || urlObject.hostname.length > 253) {
    return false;
  }
  return true;
}

/**
 * Validates if a URL string is properly formatted
 * @param {string} urlString - The URL string to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidURLString(urlString) {
  try {
    const url = new URL(urlString);
    return isValidURLObject(url);
  } catch (error) {
    return false;
  }
}

/**
 * Checks if a URL should be blocked based on security and policy rules
 * @param {string} urlString - The URL string to check
 * @returns {Promise<object>} - Object with blocked status and reason
 */
export async function isBlockedURL(urlString) {
  const result = {
    blocked: false,
    reason: null,
    category: null
  };

  try {
    const url = new URL(urlString);
    const hostname = url.hostname.toLowerCase();
    const domain = extractDomain(hostname);
    const tld = extractTLD(hostname);

    // Check self-referencing URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      try {
        const siteHostname = new URL(siteUrl).hostname.toLowerCase();
        // Allow homepage access, block other paths on the same domain
        if (hostname === siteHostname && url.pathname !== '/' && url.pathname !== '') {
          return {
            blocked: true,
            reason: 'Self-referencing URL not allowed',
            category: 'self_reference'
          };
        }
      } catch (e) {
        console.warn("NEXT_PUBLIC_SITE_URL is not a valid URL:", siteUrl);
      }
    }

    // Enhanced suspicious TLD list with better categorization
    const suspiciousTLDs = {
      'high_risk': ['tk', 'ml', 'ga', 'cf', 'pw', 'xyz'],
      'adult_content': ['porn', 'sex', 'adult', 'xxx', 'cam'],
      'suspicious_activity': ['click', 'download', 'racing', 'stream', 'trade', 'loan', 'bid']
    };
    
    for (const [category, tlds] of Object.entries(suspiciousTLDs)) {
      if (tlds.includes(tld)) {
        return {
          blocked: true,
          reason: `Suspicious TLD detected: .${tld}`,
          category: category
        };
      }
    }

    // Refined domain blocklist - removed legitimate services
    const blockedDomains = [
      // Known malicious domains (examples - should be updated regularly)
      'example-spam.com', 'spam-domain.com', 'fake-site.net',
      'malware-site.org', 'phishing-url.com', 'scam-website.com',
      'dangerous-link.info', 'unsafe-redirect.biz', 'suspicious-url.co',
      // Removed legitimate shorteners like bit.ly, t.co, etc.
    ];
    
    if (blockedDomains.includes(domain) || blockedDomains.includes(hostname)) {
      return {
        blocked: true,
        reason: `Domain is on blocklist: ${domain}`,
        category: 'blocked_domain'
      };
    }

    // More precise suspicious pattern matching
    const suspiciousPatterns = [
      'free-money-now', 'win-prize-today', 'urgent-action-required',
      'limited-time-offer', 'miracle-cure', 'get-rich-quick',
      'guaranteed-winner', 'earn-money-fast'
    ];
    
    for (const pattern of suspiciousPatterns) {
      // Check both domain and full hostname
      if (domain.includes(pattern) || hostname.includes(pattern)) {
        return {
          blocked: true,
          reason: `Suspicious pattern detected: ${pattern}`,
          category: 'suspicious_pattern'
        };
      }
    }

    return result;
  } catch (error) {
    console.error('Error in URL blocking check:', error);
    // Be more permissive on error - only block if we're certain
    return {
      blocked: false,
      reason: 'Unable to validate URL - allowing by default',
      category: 'validation_error'
    };
  }
}

/**
 * Extracts the main domain from a hostname
 * @param {string} hostname - The hostname to process
 * @returns {string} - The extracted domain
 */
function extractDomain(hostname) {
  if (hostname.startsWith('www.')) {
    hostname = hostname.substring(4);
  }
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts.slice(-2).join('.');
  }
  return hostname;
}

/**
 * Extracts the top-level domain from a hostname
 * @param {string} hostname - The hostname to process
 * @returns {string} - The TLD
 */
function extractTLD(hostname) {
  const parts = hostname.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : '';
}

/**
 * Checks if a URL is safe for shortening (combines validation and blocking checks)
 * @param {string} urlString - The URL string to check
 * @returns {Promise<object>} - Object with safety status and details
 */
export async function checkURLSafety(urlString) {
  // First validate the URL format
  if (!isValidURLString(urlString)) {
    return {
      safe: false,
      reason: 'Invalid URL format',
      category: 'invalid_format'
    };
  }

  // Then check if it should be blocked
  const blockResult = await isBlockedURL(urlString);
  
  return {
    safe: !blockResult.blocked,
    reason: blockResult.reason,
    category: blockResult.category
  };
}
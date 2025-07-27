/**
 * Validates if a URL has a proper format
 * @param {URL} url - The URL object to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export function isValidURL(url) {
  // Check for basic URL structure
  if (!url.protocol || !url.hostname) {
    return false;
  }
  
  // Only allow http and https protocols
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return false;
  }
  
  // Check for reasonable hostname
  if (url.hostname.length === 0 || url.hostname.length > 253) {
    return false;
  }
  
  return true;
}

/**
 * Checks if a URL is considered spam, adult, or dangerous
 * @param {string} urlString - The URL string to check
 * @returns {Promise<boolean>} - True if blocked, false otherwise
 */
export async function isBlockedURL(urlString) {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname.toLowerCase();
    const domain = extractDomain(hostname);
    const tld = extractTLD(hostname);
    
    // Prevent shortening internal URLs
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      try {
        const siteHostname = new URL(siteUrl).hostname;
        if (url.hostname === siteHostname && url.pathname !== '/' && url.pathname !== '') {
          return true; // Block shortening internal pages (except homepage)
        }
      } catch (e) {
        console.warn("NEXT_PUBLIC_SITE_URL is not a valid URL:", siteUrl);
      }
    }
    
    // Check suspicious TLDs
    const suspiciousTLDs = [
      'xyz', 'tk', 'ml', 'ga', 'cf', 'click', 'loan', 'download', 
      'racing', 'stream', 'trade', 'review', 'date', 'win', 'vip',
      'party', 'science', 'country', 'gq', 'bid', 'top', 'pw',
      'porn', 'sex', 'adult', 'xxx', 'cam', 'dating'
    ];
    
    if (suspiciousTLDs.includes(tld)) {
      return true;
    }
    
    // Check known bad domains
    const badDomains = [
      'bit.ly', 'adf.ly', 'tinyurl.com', 'ow.ly', 't.co',
      'example-spam.com', 'spam-domain.com', 'fake-site.net',
      'malware-site.org', 'phishing-url.com', 'scam-website.com',
      'dangerous-link.info', 'unsafe-redirect.biz', 'suspicious-url.co',
      'shorturl.com', 'linkbucks.com', 'lnk.co', 'tr.im',
      'is.gd', 'v.gd', 'cli.gs', 'twurl.nl', 'budurl.com'
    ];
    
    if (badDomains.includes(domain) || badDomains.includes(hostname)) {
      return true;
    }
    
    // Check for suspicious patterns in domain
    const suspiciousPatterns = [
      'free-money', 'win-prize', 'click-here', 'urgent-action',
      'limited-time', 'act-now', 'miracle-cure', 'get-rich',
      'lose-weight', 'make-money', 'casino', 'gambling', 'lottery'
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (domain.includes(pattern)) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    // If we can't parse the URL, consider it suspicious
    return true;
  }
}

/**
 * Extracts the main domain from a hostname
 * @param {string} hostname - The hostname to process
 * @returns {string} - The main domain
 */
function extractDomain(hostname) {
  // Remove www prefix if present
  if (hostname.startsWith('www.')) {
    hostname = hostname.substring(4);
  }
  
  // For domains with multiple parts, take the last two (domain.tld)
  const parts = hostname.split('.');
  if (parts.length > 2) {
    return parts.slice(-2).join('.');
  }
  
  return hostname;
}

/**
 * Extracts the TLD from a hostname
 * @param {string} hostname - The hostname to process
 * @returns {string} - The TLD
 */
function extractTLD(hostname) {
  const parts = hostname.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : '';
}
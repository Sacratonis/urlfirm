// lib/contentFilter.js

export function isValidURL(url) {
  if (!url.protocol || !url.hostname) {
    return false;
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    return false;
  }
  if (url.hostname.length === 0 || url.hostname.length > 253) {
    return false;
  }
  return true;
}

export async function isBlockedURL(urlString) {
  try {
    const url = new URL(urlString);
    const hostname = url.hostname.toLowerCase();
    const domain = extractDomain(hostname);
    const tld = extractTLD(hostname);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (siteUrl) {
      try {
        const siteHostname = new URL(siteUrl).hostname;
        if (url.hostname === siteHostname && url.pathname !== '/' && url.pathname !== '') {
          return true;
        }
      } catch (e) {
        console.warn("NEXT_PUBLIC_SITE_URL is not a valid URL:", siteUrl);
      }
    }

    const suspiciousTLDs = [
      'xyz', 'tk', 'ml', 'ga', 'cf', 'click', 'loan', 'download',
      'racing', 'stream', 'trade', 'review', 'date', 'win', 'vip',
      'party', 'science', 'country', 'gq', 'bid', 'top', 'pw',
      'porn', 'sex', 'adult', 'xxx', 'cam', 'dating'
    ];
    if (suspiciousTLDs.includes(tld)) {
      return true;
    }

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
    return true;
  }
}

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

function extractTLD(hostname) {
  const parts = hostname.split('.');
  return parts.length > 0 ? parts[parts.length - 1] : '';
}
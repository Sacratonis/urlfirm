// pages/index.js
import React, { useState, useCallback, useMemo } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import ShortenerForm from '../components/ShortenerForm';
import ResultBox from '../components/ResultBox';
import FeatureCard from '../components/FeatureCard';
import ErrorBoundary from '../components/ErrorBoundary';
import { Shield, Clock, Link as LinkIcon, Zap } from 'lucide-react';
import Link from 'next/link';

// Custom hook for URL validation
const useUrlValidation = () => {
  return useCallback((url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }, []);
};

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);
  const validateUrl = useUrlValidation();

  const handleSubmit = useCallback(async ({ longUrl, customAlias }) => {
    // Client-side validation (redundant but fast)
    if (!validateUrl(longUrl)) {
      setError('Please enter a valid URL');
      return;
    }
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl, customAlias }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        // Handle non-JSON responses (e.g., 500 errors from server)
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        // Use message from API if available, otherwise generic error
        throw new Error(data.message || data.error || 'Failed to shorten URL');
      }

      setResult(data);
      // Clear any previous errors
      setError(null);
    } catch (err) {
      console.error("API Error:", err);
      // More specific error handling
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Network error. Please check your connection and try again.');
      } else if (err.message.includes('timeout')) {
        setError('Request timed out. Please try again.');
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [validateUrl]);

  const handleCopySuccess = useCallback(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Memoized structured data with correct image references
  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://www.urlfirm.com/#webapp",
        "name": "URLFIRM",
        "url": "https://www.urlfirm.com/",
        "description": "A private, no-tracking URL shortener with no account required. Shorten links anonymously without data collection.",
        "applicationCategory": "WebApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        "featureList": [
          "No tracking",
          "No account required", 
          "Anonymous URL shortening",
          "Auto-expiring links",
          "Privacy-focused"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://www.urlfirm.com/#webpage",
        "url": "https://www.urlfirm.com/",
        "name": "Private Link Shortener - No Tracking, No Cookies | URLFIRM",
        "description": "Shorten links 100% privately. No tracking, no cookies, no data collection. No account needed. Fast, secure, and anonymous URL shortening.",
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.urlfirm.com/#website"
        },
        "primaryImageOfPage": {
          "@type": "ImageObject",
          // Ensure this image path is correct
          "url": "https://www.urlfirm.com/Logo.png", 
          "width": 200,
          "height": 200
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.urlfirm.com/"
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.urlfirm.com/#website",
        "name": "URLFIRM",
        "url": "https://www.urlfirm.com/",
        "description": "Private URL shortener with no tracking",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.urlfirm.com/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://www.urlfirm.com/#organization",
        "name": "URLFIRM",
        "url": "https://www.urlfirm.com/",
        "logo": {
          "@type": "ImageObject",
          // Ensure this image path is correct
          "url": "https://www.urlfirm.com/Logo.png", 
          "width": 200,
          "height": 200
        }
      }
    ]
  }), []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 w-full flex flex-col items-center">
        <Head>
          {/* Essential Meta Tags */}
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          {/* Primary SEO */}
          <title>Private Link Shortener - No Tracking, No Cookies, No Account | URLFIRM</title>
          <meta
            name="description"
            content="Shorten links 100% privately. No tracking, no cookies, no data collection. No account needed. Fast, secure, and anonymous URL shortening service."
          />
          <meta
            name="keywords"
            content="private link shortener, no tracking url, shorten link without account, anonymous url shortener, zero data collection, secure link shortener, privacy focused url shortener"
          />
          {/* Advanced SEO */}
          <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
          <meta name="googlebot" content="index, follow" />
          <meta name="bingbot" content="index, follow" />
          <meta name="author" content="URLFIRM" />
          <meta name="publisher" content="URLFIRM" />
          <meta name="theme-color" content="#6366f1" />
          <meta name="color-scheme" content="light" />
          {/* Favicon & Icons - Ensure paths are correct */}
          <link rel="icon" href="/favicon/Logo (1).ico" sizes="any" /> {/* Note: Consider renaming this file to avoid spaces/parentheses */}
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
          {/* Preconnect for Performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          {/* Open Graph / Social Media */}
          <meta property="og:title" content="URLFIRM - Private, No-Tracking Link Shortener" />
          <meta property="og:description" content="Shorten URLs without being tracked. No cookies, no sign-up, no data collection. 100% anonymous URL shortening service." />
          <meta property="og:url" content="https://www.urlfirm.com/" />
          <meta property="og:type" content="website" />
          {/* Ensure this image path is correct */}
          <meta property="og:image" content="https://www.urlfirm.com/Logo.png" />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:image:alt" content="URLFIRM - Private Link Shortener" />
          <meta property="og:site_name" content="URLFirm" />
          <meta property="og:locale" content="en_US" />
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Private Link Shortener - No Tracking | URLFIRM" />
          <meta name="twitter:description" content="Fast, anonymous URL shortening with zero data collection. No account required." />
          {/* Ensure this image path is correct */}
          <meta name="twitter:image" content="https://www.urlfirm.com/Logo.png" />
          <meta name="twitter:image:alt" content="URLFIRM Private Link Shortener" />
          {/* Canonical URL */}
          <link rel="canonical" href="https://www.urlfirm.com/" />
          {/* Alternative Languages */}
          <link rel="alternate" hrefLang="en" href="https://www.urlfirm.com/" />
          <link rel="alternate" hrefLang="x-default" href="https://www.urlfirm.com/" />
          {/* Sitemap */}
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
          {/* Enhanced Schema Markup */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData),
            }}
          />
          {/* Prefetch likely next pages */}
          <link rel="prefetch" href="/privacy-policy" />
          <link rel="prefetch" href="/terms-of-service" />
          {/* Performance hints */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-tap-highlight" content="no" />
        </Head>
        {/* Skip to main content for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>
        <main id="main-content" className="w-full">
          {/* Hero Section - Reduced vertical padding */}
          <section className="py-12 px-4 sm:px-6 lg:px-8 w-full" aria-labelledby="hero-heading"> {/* Changed py-24 to py-12 */}
            <div className="max-w-4xl mx-auto text-center animate-fade-in w-full">
              {/* Logo */}
              <Link 
                href="/" 
                className="inline-block mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
                aria-label="URLFIRM Home"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                    <LinkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    URLFIRM
                  </span>
                </div>
              </Link>
              {/* Main Heading - Primary H1 */}
              <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Shorten Links Privately<br />
                <span className="text-indigo-600">No Tracking. No Account.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                A 100% private link shortener — no cookies, no data collection, no IP logging. 
                Shorten your links in seconds, completely anonymously.
              </p>
              {/* Error Display */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
                  <p className="text-red-800">{error}</p>
                </div>
              )}
              {/* URL Shortener Form */}
              <ShortenerForm onSubmit={handleSubmit} loading={loading} />
              <ResultBox result={result} onCopy={handleCopySuccess} />
              {/* Success Message */}
              {copied && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg" role="status" aria-live="polite">
                  <p className="text-green-800">✅ Link copied to clipboard!</p>
                </div>
              )}
              {/* Internal Link */}
              <div className="mt-12">
                <Link 
                  href="/privacy-policy" 
                  className="text-indigo-600 hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded"
                >
                  🔒 Learn about our privacy commitment
                </Link>
              </div>
            </div>
          </section>
          {/* Features Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white w-full" aria-labelledby="features-heading">
            <div className="max-w-7xl mx-auto animate-fade-in w-full">
              <div className="text-center mb-16">
                <h2 id="features-heading" className="text-3xl font-bold text-gray-900 mb-4">
                  Why Choose URLFIRM?
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  The only link shortener that respects your privacy by design.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list">
                <div role="listitem">
                  <FeatureCard
                    icon={<Shield aria-hidden="true" />}
                    title="Zero Tracking"
                    description="We don't collect your IP, referral data, or device info. No analytics, no cookies, no fingerprinting."
                    bgColorClass="bg-gradient-to-br from-indigo-50 to-purple-50"
                    borderColorClass="border-indigo-100"
                    iconBgClass="bg-indigo-100"
                    iconColorClass="text-indigo-600"
                  />
                </div>
                <div role="listitem">
                  <FeatureCard
                    icon={<Clock aria-hidden="true" />}
                    title="Auto Expiration (7 Days)"
                    description="All links expire after 7 days to reduce exposure and protect your privacy automatically."
                    bgColorClass="bg-gradient-to-br from-purple-50 to-pink-50"
                    borderColorClass="border-purple-100"
                    iconBgClass="bg-purple-100"
                    iconColorClass="text-purple-600"
                  />
                </div>
                <div role="listitem">
                  <FeatureCard
                    icon={<Zap aria-hidden="true" />}
                    title="No Account Needed"
                    description="No registration, no password, no email. Just paste, shorten, and go — completely anonymous."
                    bgColorClass="bg-gradient-to-br from-pink-50 to-rose-50"
                    borderColorClass="border-pink-100"
                    iconBgClass="bg-pink-100"
                    iconColorClass="text-rose-600"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

// IMPORTANT: Remove this export - it's for App Router only, not Pages Router
// export const metadata = { ... } 
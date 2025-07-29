// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Footer from '../components/Footer';
import ShortenerForm from '../components/ShortenerForm';
import ResultBox from '../components/ResultBox';
import FeatureCard from '../components/FeatureCard';
import { Shield, Clock, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async ({ longUrl, customAlias }) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl, customAlias }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to shorten URL');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("API Error:", err);
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopySuccess = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 w-full flex flex-col items-center">
      <Head>
        {/* Primary SEO */}
        <title>Private Link Shortener - No Tracking, No Cookies, No Account | URLFirm</title>
        <meta
          name="description"
          content="Shorten links 100% privately. No tracking, no cookies, no data collection. No account needed. Fast, secure, and anonymous URL shortening."
        />
        <meta
          name="keywords"
          content="private link shortener, no tracking url, shorten link without account, anonymous url shortener, zero data collection, secure link shortener"
        />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Social */}
        <meta property="og:title" content="URLFirm - Private, No-Tracking Link Shortener" />
        <meta property="og:description" content="Shorten URLs without being tracked. No cookies, no sign-up, no data collection. 100% anonymous." />
        <meta property="og:url" content="https://www.urlfirm.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.urlfirm.com/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Private Link Shortener - No Tracking" />
        <meta name="twitter:description" content="Fast, anonymous URL shortening with zero data collection." />
        <meta name="twitter:image" content="https://www.urlfirm.com/og-image.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.urlfirm.com" />

        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "URLFirm",
              "url": "https://www.urlfirm.com",
              "description": "A private, no-tracking URL shortener with no account required.",
              "applicationCategory": "Utilities",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </Head>

      <section className="py-24 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl mx-auto text-center animate-fade-in w-full">
          {/* Logo */}
          <Link href="/" className="inline-block mb-8">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                <LinkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                URLFirm
              </h1>
            </div>
          </Link>

          {/* H1 - Most Important for SEO */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shorten Links Privately<br />
            <span className="text-indigo-600">No Tracking. No Account.</span>
          </h1>

          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            A 100% private link shortener — no cookies, no data collection, no IP logging. 
            Shorten your links in seconds, completely anonymously.
          </p>

          {/* CTA: Shortener Tool */}
          <ShortenerForm onSubmit={handleSubmit} loading={loading} />
          <ResultBox result={result} onCopy={handleCopySuccess} />

          {/* Internal Link to Build Content & SEO */}
          <div className="mt-12">
            <Link href="/blog/how-to-shorten-link-without-tracking" className="text-indigo-600 hover:underline font-medium">
              👉 Learn how to shorten links without being tracked
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white w-full">
        <div className="max-w-7xl mx-auto animate-fade-in w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose URLFirm?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The only link shortener that respects your privacy by design.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield />}
              title="Zero Tracking"
              description="We don’t collect your IP, referral data, or device info. No analytics, no cookies, no fingerprinting."
              bgColorClass="bg-gradient-to-br from-indigo-50 to-purple-50"
              borderColorClass="border-indigo-100"
              iconBgClass="bg-indigo-100"
              iconColorClass="text-indigo-600"
            />
            <FeatureCard
              icon={<Clock />}
              title="Auto Expiration (7 Days)"
              description="All links expire after 7 days to reduce exposure and protect your privacy automatically."
              bgColorClass="bg-gradient-to-br from-purple-50 to-pink-50"
              borderColorClass="border-purple-100"
              iconBgClass="bg-purple-100"
              iconColorClass="text-purple-600"
            />
            <FeatureCard
              icon={<Shield />}
              title="No Account Needed"
              description="No registration, no password, no email. Just paste, shorten, and go — completely anonymous."
              bgColorClass="bg-gradient-to-br from-pink-50 to-rose-50"
              borderColorClass="border-pink-100"
              iconBgClass="bg-pink-100"
              iconColorClass="text-rose-600"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
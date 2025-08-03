import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Shield, Clock, Link as LinkIcon, Zap } from 'lucide-react';

export default function About() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About URLFIRM",
    "description": "Learn about URLFIRM's mission to provide private, no-tracking URL shortening service.",
    "url": "https://www.urlfirm.com/about",
    "isPartOf": {
      "@type": "WebSite",
      "name": "URLFIRM",
      "url": "https://www.urlfirm.com"
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.urlfirm.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About",
          "item": "https://www.urlfirm.com/about"
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>About URLFIRM - A Private, No-Tracking Link Shortener</title>
        <meta
          name="description"
          content="Learn about URLFIRM: a link shortener built for privacy, with no cookies, no tracking, and no account needed. Discover our mission and values."
        />
        <meta name="keywords" content="about urlfirm, private link shortener, no tracking url, anonymous url tool, privacy-focused" />
        <link rel="canonical" href="https://www.urlfirm.com/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About URLFIRM - Private Link Shortener" />
        <meta property="og:description" content="Learn about URLFIRM's mission to provide completely private URL shortening with no tracking or data collection." />
        <meta property="og:url" content="https://www.urlfirm.com/about" />
        <meta property="og:image" content="https://www.urlfirm.com/og-image.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About URLFIRM - Private Link Shortener" />
        <meta name="twitter:description" content="Learn about URLFIRM's mission to provide completely private URL shortening with no tracking or data collection." />
        <meta name="twitter:image" content="https://www.urlfirm.com/og-image.png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Skip to main content */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>

        <main id="main-content" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link href="/" className="hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span aria-hidden="true" className="mx-2">/</span>
                <span className="text-gray-900 dark:text-gray-100 font-medium">About</span>
              </li>
            </ol>
          </nav>

          {/* Page Header */}
          <header className="mb-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LinkIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">About URLFIRM</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">Built for privacy. Designed for simplicity.</p>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg prose-indigo max-w-none text-gray-700 dark:text-gray-200">
            <div className="bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 rounded-xl p-6 mb-8">
              <p className="text-indigo-900 dark:text-indigo-100 font-medium mb-0">
                URLFIRM was created for one reason: <strong>most link shorteners spy on you</strong>.
              </p>
            </div>

            <p>
              They track your clicks, collect your IP, log your device, and even require accounts. 
              We think that's wrong.
            </p>

            {/* Mission Section */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" aria-hidden="true" />
                Our Mission
              </h2>
              <p>
                To offer a truly <strong>private</strong> alternative — where shortening a link 
                doesn't mean giving up your freedom.
              </p>
            </section>

            {/* Privacy Features */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">No Tracking. No Compromises.</h2>
              <p>When you use URLFIRM:</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6" role="list">
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>No cookies are set</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>No IP addresses are logged</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>No analytics scripts run</span>
                </div>
                
                <div className="flex items-center.ConcurrentHashMap space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>No account is required</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>No data is stored long-term</span>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900 rounded-lg" role="listitem">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-300 text-sm font-bold">✓</span>
                  </div>
                  <span>Just paste, shorten, and go</span>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3" aria-hidden="true" />
                How It Works
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <p className="mb-4">
                  We generate a short code for your link and store the mapping for <strong>7 days</strong>. 
                  After that, it's automatically deleted — no trace left behind.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Why 7 Days?</strong> Most shared links are clicked within a few days. By auto-expiring links, we reduce 
                  the risk of misuse and protect your privacy by design.
                </p>
              </div>
            </section>

            {/* Who Made This */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Who Made This?</h2>
              <p>
                URLFIRM is built and maintained by a developer who values privacy and simplicity. 
                No corporate backing. No ads. No data harvesting.
              </p>
            </section>

            {/* Future Plans */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What's Next?</h2>
              <p>We're focused on keeping URLFIRM fast, clean, and private. Future plans include:</p>
              <ul className="space-y-2 mt-4" role="list">
                <li className="flex items-center space-x-2" role="listitem">
                  <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <span>Open-sourcing the code</span>
                </li>
                <li className="flex items-center space-x-2" role="listitem">
                  <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <span>Adding QR code download</span>
                </li>
                <li className="flex items-center space-x-2" role="listitem">
                  <Zap className="h-4 w-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <span>Supporting custom domains (privacy-first)</span>
                </li>
              </ul>
            </section>

            {/* Call to Action */}
            <section className="my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Join the Movement</h2>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white text-center">
                <p className="text-lg mb-4">
                  The web doesn't have to be tracked. Every time you choose a private tool, 
                  you vote for a better internet.
                </p>
                <p className="text-indigo-100 mb-6">Thanks for using URLFIRM.</p>
                <Link href="/" className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors">
                  Shorten Your First Link
                </Link>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
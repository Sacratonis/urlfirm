// pages/about.js
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function About() {
  return (
    <>
      <Head>
        <title>About URLFirm - A Private, No-Tracking Link Shortener</title>
        <meta
          name="description"
          content="Learn about URLFirm: a link shortener built for privacy, with no cookies, no tracking, and no account needed."
        />
        <meta name="keywords" content="about urlfirm, private link shortener, no tracking url, anonymous url tool" />
        <link rel="canonical" href="https://www.urlfirm.com/about" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Back to Home */}
          <Link href="/" className="text-indigo-600 hover:underline mb-8 inline-block transition">
            ← Back to URLFirm
          </Link>

          {/* Page Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">About URLFirm</h1>
            <p className="text-lg text-gray-600 mt-2">Built for privacy. Designed for simplicity.</p>
          </header>

          {/* Main Content */}
          <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
            <p>
              URLFirm was created for one reason: <strong>most link shorteners spy on you</strong>.
            </p>

            <p>
              They track your clicks, collect your IP, log your device, and even require accounts. 
              We think that’s wrong.
            </p>

            <h2>Our Mission</h2>
            <p>
              To offer a truly <strong>private</strong> alternative — where shortening a link 
              doesn’t mean giving up your freedom.
            </p>

            <h2>No Tracking. No Compromises.</h2>
            <p>
              When you use URLFirm:
            </p>
            <ul>
              <li>✅ No cookies are set</li>
              <li>✅ No IP addresses are logged</li>
              <li>✅ No analytics scripts run</li>
              <li>✅ No account is required</li>
              <li>✅ No data is stored long-term</li>
            </ul>
            <p>
              Just paste, shorten, and go.
            </p>

            <h2>How It Works</h2>
            <p>
              We generate a short code for your link and store the mapping for <strong>7 days</strong>. 
              After that, it’s automatically deleted — no trace left behind.
            </p>

            <h2>Why 7 Days?</h2>
            <p>
              Most shared links are clicked within a few days. By auto-expiring links, we reduce 
              the risk of misuse and protect your privacy by design.
            </p>

            <h2>Who Made This?</h2>
            <p>
              URLFirm is built and maintained by a developer who values privacy and simplicity. 
              No corporate backing. No ads. No data harvesting.
            </p>

            <h2>What’s Next?</h2>
            <p>
              We’re focused on keeping URLFirm fast, clean, and private. 
              Future plans include:
            </p>
            <ul>
              <li>Open-sourcing the code</li>
              <li>Adding QR code download</li>
              <li>Supporting custom domains (privacy-first)</li>
            </ul>

            <h2>Join the Movement</h2>
            <p>
              The web doesn’t have to be tracked. Every time you choose a private tool, 
              you vote for a better internet.
            </p>

            <p>
              Thanks for using URLFirm.
            </p>

            {/* Final CTA */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-indigo-600 font-medium hover:underline">
                ← Shorten Your First Link
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
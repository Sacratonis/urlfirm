// pages/terms.js
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Terms() {
  return (
    <>
      <Head>
        <title>Terms of Service - URLFirm | No Tracking, No Account, No BS</title>
        <meta
          name="description"
          content="Terms of use for URLFirm, a private, no-tracking URL shortener. Learn how the service works and your responsibilities."
        />
        <meta name="keywords" content="url shortener terms, terms of service, link shortener rules, no tracking terms" />
        <link rel="canonical" href="https://www.urlfirm.com/terms" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Back Link */}
          <Link href="/" className="text-indigo-600 hover:underline mb-8 inline-block transition">
            ← Back to URLFirm
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-lg text-gray-600 mt-2">
              <strong>Last Updated:</strong> April 5, 2025
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
            <p>
              Welcome to <strong>URLFirm</strong>. By using our service, you agree to these Terms of Service. 
              If you don’t agree, please do not use our site.
            </p>

            <h2>1. Acceptable Use</h2>
            <p>
              You may use URLFirm to shorten links for personal, professional, or promotional use, but you must not:
            </p>
            <ul>
              <li>Use it for spam, phishing, malware, or illegal content</li>
              <li>Attempt to abuse, overload, or disrupt the service</li>
              <li>Use it to track others or bypass privacy protections</li>
            </ul>

            <h2>2. Link Expiration</h2>
            <p>
              All shortened links <strong>expire after 7 days</strong> and are permanently deleted. 
              We do not store or archive links beyond this period.
            </p>

            <h2>3. No Guarantee of Uptime or Availability</h2>
            <p>
              URLFirm is provided "as-is". While we strive for reliability, we make no guarantees about 
              continuous availability, uptime, or performance.
            </p>

            <h2>4. No Ownership of Links</h2>
            <p>
              You do not own the shortened URL. We reserve the right to disable or remove any link 
              that violates these terms or harms the service.
            </p>

            <h2>5. No Data Collection = No Liability for User Content</h2>
            <p>
              We do not collect, monitor, or moderate link destinations. You are responsible for the content 
              you share. We are not liable for any damages arising from the use of shortened links.
            </p>

            <h2>6. Changes to These Terms</h2>
            <p>
              We may update these terms at any time. The latest version will always be posted here.
            </p>

            <h2>7. Contact</h2>
            <p>
              If you have questions, reach out via{' '}
              <Link href="https://twitter.com/urlfirm" target="_blank" className="text-indigo-600 hover:underline">
                @urlfirm on Twitter
              </Link>.
            </p>

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-indigo-600 font-medium hover:underline">
                ← Back to URLFirm – Shorten Privately. No Tracking. No Account.
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
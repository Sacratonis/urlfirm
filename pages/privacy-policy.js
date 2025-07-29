// pages/privacy-policy.js
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - URLFirm | 100% No Tracking, No Data Collection</title>
        <meta
          name="description"
          content="URLFirm collects zero user data. No cookies, no IP logging, no analytics. Learn how we protect your privacy when shortening links."
        />
        <meta name="keywords" content="privacy policy, no tracking link shortener, private url, zero data collection" />
        <link rel="canonical" href="https://www.urlfirm.com/privacy-policy" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Back Link */}
          <Link href="/" className="text-indigo-600 hover:underline mb-8 inline-block transition">
            ← Back to URLFirm
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600">
              <strong>Last Updated:</strong> April 5, 2025
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg prose-indigo max-w-none text-gray-700">
            <p>
              <strong>URLFirm does not collect any personal data.</strong> We believe your privacy is non-negotiable. When you shorten a link with URLFirm, you keep full control — no tracking, no cookies, no hidden scripts.
            </p>

            <h2>Our Commitment to Privacy</h2>
            <p>
              Unlike other link shorteners that track clicks, log IPs, or sell data, URLFirm is built from the ground up to <strong>collect nothing</strong>. We don’t want your data — because it’s not ours to take.
            </p>

            <h2>What We Don’t Collect</h2>
            <ul>
              <li><strong>No IP addresses</strong> — We do not log where you’re connecting from.</li>
              <li><strong>No cookies or local storage</strong> — No tracking scripts, ever.</li>
              <li><strong>No device or browser fingerprints</strong> — We don’t identify or follow your device.</li>
              <li><strong>No referral data</strong> — We don’t see what site you came from.</li>
              <li><strong>No account information</strong> — No sign-up, no email, no password.</li>
              <li><strong>No click analytics</strong> — We don’t count or store who clicks your links.</li>
            </ul>

            <h2>Link Expiration & Data Deletion</h2>
            <p>
              All shortened links <strong>automatically expire after 7 days</strong> and are permanently deleted from our database. This reduces exposure and ensures your links don’t live forever.
            </p>

            <h2>How We Work</h2>
            <p>
              When you shorten a URL:
            </p>
            <ol>
              <li>You enter a long link and optionally a custom alias.</li>
              <li>We generate a short code and store the mapping temporarily.</li>
              <li>The link works for 7 days — then it’s gone.</li>
              <li>No logs. No backups. No tracking.</li>
            </ol>

            <h2>Third-Party Services</h2>
            <p>
              We use <strong>Supabase</strong> for secure, encrypted database storage. We do not use Google Analytics, Facebook Pixel, or any advertising or tracking scripts.
            </p>

            <h2>Children’s Privacy</h2>
            <p>
              Our service is not intended for users under 13. We do not knowingly collect data from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. Any changes will be posted here with a new "Last Updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about our privacy practices, you can reach us via{' '}
              <Link href="https://twitter.com/urlfirm" target="_blank" className="text-indigo-600 hover:underline">
                @urlfirm on Twitter
              </Link>.
            </p>

            {/* Back to Home */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link href="/" className="text-indigo-600 font-medium hover:underline">
                ← Back to URLFirm – Private. Fast. No Tracking.
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
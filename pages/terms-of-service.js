import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Link as LinkIcon, ChevronRight, FileText, Shield, Clock } from 'lucide-react';

export default function Terms() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service - URLFirm",
    "description": "Terms of service for URLFirm private URL shortener. Learn about acceptable use, service limitations, and user responsibilities.",
    "url": "https://www.urlfirm.com/terms",
    "isPartOf": {
      "@type": "WebSite",
      "name": "URLFirm",
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
          "name": "Terms of Service",
          "item": "https://www.urlfirm.com/terms"
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>Terms of Service - URLFirm | Private Link Shortener Rules</title>
        <meta
          name="description"
          content="Terms of service for URLFirm private URL shortener. Learn about acceptable use, service limitations, user responsibilities, and privacy protections."
        />
        <meta name="keywords" content="url shortener terms, terms of service, link shortener rules, no tracking terms, acceptable use policy" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.urlfirm.com/terms" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Terms of Service - URLFirm" />
        <meta property="og:description" content="Terms of service for URLFirm: acceptable use, service limitations, and user responsibilities for our private URL shortener." />
        <meta property="og:url" content="https://www.urlfirm.com/terms" />
        <meta property="og:type" content="website" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Skip to main content */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50">
          Skip to main content
        </a>

        {/* Header */}
        <header className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/" 
              className="inline-flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 rounded-lg"
              aria-label="URLFirm Home"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <LinkIcon className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                URLFirm
              </span>
            </Link>
          </div>
        </header>

        <main id="main-content" className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center space-x-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">
                    Home
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mx-2 h-4 w-4" aria-hidden="true" />
                  <span className="text-gray-900 font-medium">Terms of Service</span>
                </li>
              </ol>
            </nav>

            {/* Hero Section */}
            <div className="text-center mb-16">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Simple, fair terms for our private URL shortener service.
              </p>
              <div className="text-sm text-gray-500">
                <p><strong>Last Updated:</strong> August 1, 2025</p>
              </div>
            </div>

            {/* Quick Summary */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-12">
              <h2 className="text-lg font-semibold text-indigo-900 mb-4">Quick Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  <span className="text-indigo-800">Use responsibly</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  <span className="text-indigo-800">Links expire in 7 days</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-indigo-600" aria-hidden="true" />
                  <span className="text-indigo-800">No account needed</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm prose prose-lg max-w-none">
              <div className="mb-8">
                <p className="text-gray-700 text-lg">
                  Welcome to <strong>URLFirm</strong>. By using our service, you agree to these Terms of Service.
                  If you don't agree, please do not use our site.
                </p>
              </div>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Acceptable Use</h2>
                <p className="text-gray-600 mb-4">
                  You may use URLFirm to shorten links for personal, professional, or promotional use, but you must not:
                </p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use it for spam, phishing, malware, or illegal content</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Attempt to abuse, overload, or disrupt the service</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Use it to track others or bypass privacy protections</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Violate any applicable laws or regulations</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span>Infringe on intellectual property rights</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Link Expiration & Data Retention</h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                  <p className="text-yellow-800 mb-4">
                    <strong>Important:</strong> All shortened links <strong>expire after 7 days</strong> and are permanently deleted.
                    We do not store or archive links beyond this period.
                  </p>
                  <p className="text-yellow-700 text-sm">
                    This automatic expiration is a key privacy feature and cannot be extended or disabled.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">3. Service Availability</h2>
                <p className="text-gray-600 mb-4">
                  URLFirm is provided "as-is" without any warranties. While we strive for reliability:
                </p>
                <ul className="space-y-2 text-gray-600 ml-6">
                  <li>• We make no guarantees about continuous availability or uptime</li>
                  <li>• Service may be temporarily unavailable for maintenance</li>
                  <li>• We reserve the right to modify or discontinue features</li>
                  <li>• No refunds are applicable as the service is free</li>
                </ul>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">4. Ownership & Content Responsibility</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    <strong>No Link Ownership:</strong> You do not own the shortened URL. We reserve the right to disable 
                    or remove any link that violates these terms or harms the service.
                  </p>
                  <p>
                    <strong>Content Responsibility:</strong> You are fully responsible for the content of URLs you shorten. 
                    We do not pre-screen destinations but may remove harmful content when reported.
                  </p>
                  <p>
                    <strong>No Monitoring:</strong> Consistent with our privacy policy, we do not collect data about 
                    link destinations or user behavior.
                  </p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Limitation of Liability</h2>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    <strong>To the maximum extent permitted by law:</strong>
                  </p>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• URLFirm is not liable for any damages arising from service use</li>
                    <li>• We are not responsible for the content of shortened URLs</li>
                    <li>• Users assume all risks when clicking shortened links</li>
                    <li>• Our total liability is limited to the amount you paid (which is $0)</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Privacy & Data Protection</h2>
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <p className="text-green-800 mb-4">
                    <strong>Good news:</strong> Our privacy-first approach means minimal terms complexity.
                  </p>
                  <ul className="space-y-2 text-green-700 text-sm">
                    <li>• We don't collect personal data, so no data breach risks</li>
                    <li>• No user accounts mean no account security concerns</li>
                    <li>• Automatic deletion protects against data retention issues</li>
                    <li>• See our <Link href="/privacy-policy" className="text-green-600 hover:underline">Privacy Policy</Link> for complete details</li>
                  </ul>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">7. Changes to These Terms</h2>
                <p className="text-gray-600">
                  We may update these terms at any time. Changes will be posted here with an updated "Last Modified" date. 
                  Continued use of the service after changes constitutes acceptance of the new terms.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">8. Governing Law & Disputes</h2>
                <p className="text-gray-600 mb-4">
                  These terms are governed by the laws of [Your Jurisdiction]. Any disputes will be resolved through 
                  binding arbitration rather than court proceedings.
                </p>
                <p className="text-sm text-gray-500">
                  Note: Specific jurisdiction should be added based on your business location.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions about these terms, contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700">
                    <strong>Email:</strong> <a href="mailto:hello@urlfirm.com" className="text-indigo-600 hover:underline">hello@urlfirm.com</a><br />
                    <strong>Response Time:</strong> Within 48 hours
                  </p>
                </div>
              </section>

              {/* Back to Home CTA */}
              <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                <Link 
                  href="/" 
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                >
                  Start Using URLFirm - Private & Secure
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
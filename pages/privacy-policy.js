import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Shield, Eye, Database, Clock, Link as LinkIcon, ChevronRight } from 'lucide-react';

export default function Privacy() {
  const [activeSection, setActiveSection] = useState('');

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy - URLFirm",
    "description": "URLFirm's privacy policy explaining our no-tracking, no-data-collection approach to URL shortening.",
    "url": "https://www.urlfirm.com/privacy-policy",
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
          "name": "Privacy Policy",
          "item": "https://www.urlfirm.com/privacy-policy"
        }
      ]
    }
  };

  const tableOfContents = [
    { id: 'commitment', title: 'Our Privacy Commitment' },
    { id: 'what-we-dont-collect', title: 'What We Don\'t Collect' },
    { id: 'what-we-store', title: 'What We Do Store (Temporarily)' },
    { id: 'how-we-protect', title: 'How We Protect Your Privacy' },
    { id: 'third-party', title: 'Third-Party Services' },
    { id: 'changes', title: 'Changes to This Policy' },
    { id: 'contact', title: 'Contact Us' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* SEO Meta Tags */}
        <title>Privacy Policy - No Tracking, No Data Collection | URLFirm</title>
        <meta
          name="description"
          content="URLFirm's privacy policy: We don't track users, collect personal data, or use cookies. Learn about our commitment to your privacy and anonymity."
        />
        <meta
          name="keywords"
          content="privacy policy, no tracking, no data collection, anonymous url shortener, privacy-focused"
        />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Privacy Policy - URLFirm" />
        <meta property="og:description" content="URLFirm's commitment to user privacy: no tracking, no data collection, complete anonymity." />
        <meta property="og:url" content="https://www.urlfirm.com/privacy-policy" />
        <meta property="og:type" content="website" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://www.urlfirm.com/privacy-policy" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>

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
                <span className="text-gray-900 font-medium">Privacy Policy</span>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your privacy is our foundation. We built URLFirm to be completely anonymous — 
              no tracking, no data collection, no compromises.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              <p>Last updated: August 1, 2025</p>
            </div>
          </div>

          {/* Table of Contents */}
          <div className="bg-gray-50 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h2>
            <nav aria-label="Privacy Policy Table of Contents">
              <ul className="space-y-2">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a 
                      href={`#${item.id}`}
                      className="text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded flex items-center"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(item.id);
                      }}
                    >
                      <ChevronRight className="h-4 w-4 mr-2" aria-hidden="true" />
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Privacy Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tracking</h3>
              <p className="text-gray-600">We don't track your clicks, browsing behavior, or collect analytics data.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-purple-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Data Storage</h3>
              <p className="text-gray-600">We don't store your personal information, IP addresses, or device fingerprints.</p>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-rose-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Auto-Delete</h3>
              <p className="text-gray-600">All shortened links automatically expire after 7 days for your protection.</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm prose prose-lg max-w-none">
            
            <section id="commitment">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Privacy Commitment</h2>
              <p className="text-gray-600 mb-8">
                URLFirm was built from the ground up with privacy as our core principle. Unlike other URL shorteners, 
                we don't monetize your data because we don't collect it in the first place.
              </p>
            </section>

            <section id="what-we-dont-collect">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Don't Collect</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">IP Addresses</h4>
                    <p className="text-gray-600">We don't log or store your IP address when you use our service.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">✗</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Browser Fingerprinting</h4>
                   <p className="text-gray-600">No device fingerprinting, canvas fingerprinting, or browser profiling.</p>
                 </div>
               </div>
               
               <div className="flex items-start space-x-3">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-sm font-bold">✗</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Personal Information</h4>
                   <p className="text-gray-600">No names, emails, phone numbers, or any identifying information.</p>
                 </div>
               </div>
               
               <div className="flex items-start space-x-3">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-sm font-bold">✗</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Analytics & Tracking</h4>
                   <p className="text-gray-600">No Google Analytics, Facebook Pixel, or any tracking scripts.</p>
                 </div>
               </div>
               
               <div className="flex items-start space-x-3">
                 <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                   <span className="text-red-600 text-sm font-bold">✗</span>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900">Cookies</h4>
                   <p className="text-gray-600">We don't use any cookies, not even "necessary" ones.</p>
                 </div>
               </div>
             </div>
           </section>

           <section id="what-we-store">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Do Store (Temporarily)</h2>
             <div className="bg-gray-50 rounded-xl p-6 mb-8">
               <p className="text-gray-700 mb-4">
                 To provide the URL shortening service, we temporarily store:
               </p>
               <ul className="space-y-2 text-gray-600">
                 <li className="flex items-center space-x-2">
                   <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                   <span><strong>The original URL</strong> - So we can redirect visitors to the correct destination</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                   <span><strong>The short code</strong> - The random identifier for your shortened link</span>
                 </li>
                 <li className="flex items-center space-x-2">
                   <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                   <span><strong>Creation timestamp</strong> - Only to enable the 7-day auto-deletion</span>
                 </li>
               </ul>
               <div className="mt-4 p-4 bg-indigo-50 rounded-lg">
                 <p className="text-indigo-800 font-medium">
                   🕒 All of this data is automatically deleted after 7 days, no exceptions.
                 </p>
               </div>
             </div>
           </section>

           <section id="how-we-protect">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Protect Your Privacy</h2>
             <div className="space-y-6 mb-8">
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🔒 Secure Infrastructure</h4>
                 <p className="text-gray-600">Our servers use industry-standard encryption and security practices.</p>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🌐 No Cross-Site Tracking</h4>
                 <p className="text-gray-600">We don't embed tracking pixels or scripts on third-party websites.</p>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🚫 No Data Sales</h4>
                 <p className="text-gray-600">We will never sell, rent, or share any data because we don't have any to share.</p>
               </div>
               
               <div>
                 <h4 className="font-semibold text-gray-900 mb-2">🔍 No Law Enforcement Cooperation</h4>
                 <p className="text-gray-600">We can't provide data we don't have. Our privacy-by-design approach protects everyone.</p>
               </div>
             </div>
           </section>

           <section id="third-party">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services</h2>
             <p className="text-gray-600 mb-6">
               We don't use any third-party analytics, advertising, or tracking services. The only external service 
               we use is our hosting provider, and they don't have access to any user data.
             </p>
           </section>

           <section id="changes">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
             <p className="text-gray-600 mb-6">
               If we ever need to update this privacy policy, we'll post the changes here and update the 
               "last modified" date. However, our core commitment to privacy will never change.
             </p>
           </section>

           <section id="contact">
             <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
             <p className="text-gray-600 mb-4">
               If you have any questions about this privacy policy or our practices, you can contact us at:
             </p>
             <div className="bg-gray-50 rounded-xl p-6">
               <p className="text-gray-700">
                 <strong>Email:</strong> <a href="mailto:hello@urlfirm.com" className="text-indigo-600 hover:underline">hello@urlfirm.com</a><br />
                 <strong>Response Time:</strong> Within 48 hours
               </p>
             </div>
           </section>
         </div>

         {/* Call to Action */}
         <div className="mt-16 text-center">
           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
             <h2 className="text-2xl font-bold mb-4">Ready to shorten links privately?</h2>
             <p className="text-indigo-100 mb-6">
               No tracking, no data collection, no account required.
             </p>
             <Link
               href="/"
               className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors"
             >
               Start Shortening Links
             </Link>
           </div>
         </div>
       </div>
     </main>

     {/* Footer */}
     <Footer />
   </div>
 );
}
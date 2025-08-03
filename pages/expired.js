import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Clock, Shield, ArrowRight } from 'lucide-react';

const ExpiredPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Link Expired - URLFIRM",
    "description": "This shortened link has expired as part of URLFIRM's privacy protection. Links automatically expire after 7 days.",
    "url": "https://www.urlfirm.com/expired"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex flex-col">
      <Head>
        <title>Link Expired - URLFIRM</title>
        <meta 
          name="description" 
          content="This shortened link has expired after 7 days for privacy protection. Create a new short link with URLFIRM." 
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://www.urlfirm.com/expired" />
        
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

      <Header />

      <main id="main-content" className="flex-grow flex items-center justify-center px-4 py-12" role="main">
        <article className="text-center max-w-md bg-white rounded-2xl shadow-xl p-8">
          {/* Icon with better accessibility */}
          <div className="mx-auto w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-6" role="img" aria-label="Clock icon indicating expiration">
            <Clock className="h-8 w-8 text-orange-500" aria-hidden="true" />
          </div>

          {/* Main heading */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Link Expired
          </h1>

          {/* Informative description */}
          <div className="text-gray-600 mb-6 space-y-3">
            <p>
              Sorry, this shortened link is no longer available. 
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="h-4 w-4 text-indigo-600" aria-hidden="true" />
                <span className="text-sm font-medium text-indigo-900">Privacy Protection</span>
              </div>
              <p className="text-sm text-indigo-800">Links on URLFIRM automatically expire after 7 days to protect your privacy and reduce the risk of misuse.
             </p>
           </div>
         </div>

         {/* Call to action buttons */}
         <div className="space-y-3">
           <Link 
             href="/" 
             className="inline-flex items-center justify-center w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           >
             Create New Short Link
             <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
           </Link>
           
           <Link 
             href="/about" 
             className="inline-flex items-center justify-center w-full text-indigo-600 hover:text-indigo-700 font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
           >
             Learn About Our Privacy Policy
           </Link>
         </div>

         {/* Additional context */}
         <div className="mt-6 pt-4 border-t border-gray-100">
           <p className="text-xs text-gray-500">
             Need the original link? Contact the person who shared it with you.
           </p>
         </div>
       </article>
     </main>

     <Footer />
   </div>
 );
};

export default ExpiredPage;
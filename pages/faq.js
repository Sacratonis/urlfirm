// pages/faq.js
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import { Link as LinkIcon, ChevronRight } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      question: "How is URLFirm different from other link shorteners?",
      answer: "URLFirm prioritizes your privacy above all else. We don't track your clicks, collect your IP address, use cookies, or require an account. Your link data is automatically deleted after 7 days. Other services often monetize your data through tracking and advertising."
    },
    {
      question: "Is using URLFirm really free?",
      answer: "Yes, URLFirm is completely free to use with no hidden costs or premium features. We cover our minimal operational costs through other means and believe privacy should be accessible to everyone."
    },
    {
      question: "Do you store my personal information?",
      answer: "No. We do not collect, store, or process any personal information. We don't ask for your name, email, or any identifying details. We only temporarily store the original URL and the generated short code."
    },
    {
      question: "Do you use cookies or tracking scripts?",
      answer: "No. URLFirm does not use any cookies (including 'necessary' ones), analytics scripts (like Google Analytics), or tracking pixels. We don't profile your device or browser."
    },
    {
      question: "How long do shortened links last?",
      answer: "All shortened links automatically expire and are permanently deleted 7 days after creation. This is a core privacy feature to limit data retention and reduce the risk of misuse."
    },
    {
      question: "Can I delete my link before it expires?",
      answer: "Yes. When you create a link, you receive a unique 'Management Code'. You can use this code on our (forthcoming) link management page to delete your link immediately."
    },
    {
      question: "What happens if someone tries to access an expired link?",
      answer: "Visitors will be directed to a page indicating that the link has expired and is no longer available. No information about the original URL is retained or accessible."
    },
    {
      question: "Is there a limit to how many links I can shorten?",
      answer: "There is currently no strict limit on the number of links you can shorten. We encourage responsible use. If excessive automated use impacts service quality, we may implement rate-limiting."
    },
    {
      question: "Can I use a custom alias/keyword for my short link?",
      answer: "Yes. During the shortening process, you can optionally create a custom alias. Aliases must be unique and adhere to our guidelines (e.g., alphanumeric characters and hyphens). Availability is checked in real-time."
    },
    {
      question: "What kind of links are not allowed?",
      answer: "We prohibit links leading to illegal content, spam, phishing, malware, or content that violates our Terms of Service. We employ automated checks and reserve the right to disable any links found to be harmful."
    },
    {
      question: "Is URLFirm open source?",
      answer: "We are planning to open-source the codebase in the near future. We believe in transparency and community involvement in building privacy-respecting tools."
    },
    {
      question: "How do you make money if you don't track users?",
      answer: "URLFirm is a service built on strong privacy principles. Operational costs are kept minimal. We may explore ethical monetization strategies in the future that align with our privacy values, but the core service will always remain free and private."
    },
    {
      question: "I have feedback or found a bug. How can I contact you?",
      answer: "We appreciate feedback and bug reports. You can reach us via email at hello@urlfirm.com. We aim to respond within 48 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* SEO Meta Tags */}
        <title>Frequently Asked Questions (FAQ) - URLFirm</title>
        <meta
          name="description"
          content="Answers to common questions about URLFirm's private, no-tracking URL shortening service. Learn about privacy, link expiration, custom aliases, and more."
        />
        <meta
          name="keywords"
          content="url shortener faq, link shortener questions, private url service, no tracking faq, urlfirm help"
        />
        <meta name="robots" content="index, follow" />
        {/* Open Graph */}
        <meta property="og:title" content="FAQ - URLFirm Private Link Shortener" />
        <meta property="og:description" content="Find answers to frequently asked questions about URLFirm's privacy-focused URL shortening service." />
        <meta property="og:url" content="https://www.urlfirm.com/faq" />
        <meta property="og:type" content="website" />
        {/* Canonical */}
        <link rel="canonical" href="https://www.urlfirm.com/faq" />
        {/* Structured Data - FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            }),
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
                <span className="text-gray-900 font-medium">FAQ</span>
              </li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about URLFirm's privacy-first URL shortening service.
            </p>
          </div>

          {/* FAQ Content */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm">
            <div className="space-y-10">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-10 last:border-0 last:pb-0">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">{faq.question}</h2>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Still Need Help? */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-indigo-100 mb-6">
                We're here to help. Reach out to us directly.
              </p>
              <Link
                href="mailto:hello@urlfirm.com"
                className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 transition-colors"
              >
                Contact Support
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
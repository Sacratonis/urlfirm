// pages/deleted.js
import Head from 'next/head';
import Link from 'next/link';
// Import the shared Header and Footer components
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DeletedPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Head>
        <title>Link Deleted - URLFirm</title>
        <meta name="description" content="Your link has been deleted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Add the Header component */}
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mb-6 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Link Deleted</h1>
          <p className="text-gray-600 mb-8">
            ✅ Your link has been successfully deleted.
          </p>
          
          <Link href="/">
            <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
              Create New Short Link
            </button>
          </Link>
        </div>
      </main>

      {/* Add the Footer component */}
      <Footer />
    </div>
  );
}
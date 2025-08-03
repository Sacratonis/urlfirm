import '../styles/globals.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

// Global loading component
function LoadingBar({ isLoading }) {
  if (!isLoading) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-600 animate-pulse"></div>
    </div>
  );
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Global loading state management
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <ErrorBoundary>
      <Head>
        {/* Global defaults for SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#6366f1" />
        
        {/* Default Open Graph tags */}
        <meta property="og:site_name" content="URLFirm" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon/logo.ico" /> {/* Updated path */}
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" /> {/* Updated path */}
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      
      <LoadingBar isLoading={isLoading} />
      
      {/* Global skip navigation for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-indigo-600 text-white px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Skip to main content
      </a>
      
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
// pages/[slug].js
import { findLinkBySlug } from '../lib/db';
import Head from 'next/head';
import { useEffect } from 'react';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔍 Looking for slug:', slug);
  }

  try {
    const linkResult = await findLinkBySlug(slug); // Use the structured result

    // Check if DB query was successful
    if (!linkResult.success) {
      console.error('Database error fetching link:', linkResult.error);
      return {
        notFound: true, // Or return a 500 error page
      };
    }

    // Check if link was found
    if (!linkResult.data) {
      return {
        notFound: true,
      };
    }

    const link = linkResult.data;
    const now = new Date();
    const expiresAt = new Date(link.expires_at);

    if (expiresAt < now) {
      return {
        redirect: {
          destination: '/expired',
          permanent: false,
        },
      };
    }

    // Add security headers for redirect
    context.res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    context.res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    return {
      redirect: {
        destination: link.original_url,
        permanent: false,
      },
    };

  } catch (error) {
    // Log error server-side only
    console.error('Unexpected error in [slug].js getServerSideProps:', error);
    
    return {
      notFound: true, // Or return a 500 error page
    };
  }
}

export default function RedirectToOriginal() {
  // Fallback client-side redirect (should not normally execute)
  useEffect(() => {
    // If we somehow reach this component, redirect to home
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting... - URLFirm</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta httpEquiv="refresh" content="0;url=/" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    </>
  );
}
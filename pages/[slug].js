import { findLinkBySlug } from '../lib/db';

export async function getServerSideProps(context) {
  const { slug } = context.params;

  console.log('🔍 Looking for slug:', slug);
  console.log('🌍 Environment check:', {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING'
  });

  try {
    const link = await findLinkBySlug(slug);
    console.log('🔗 Database result:', link);

    if (!link) {
      console.log('❌ No link found for slug:', slug);
      return {
        notFound: true,
      };
    }

    const now = new Date();
    const expiresAt = new Date(link.expires_at);
    console.log('⏰ Time check:', { now, expiresAt, expired: expiresAt < now });

    if (expiresAt < now) {
      console.log('⏰ Link expired, redirecting to /expired');
      return {
        redirect: {
          destination: '/expired',
          permanent: false,
        },
      };
    }

    console.log('✅ Redirecting to:', link.original_url);
    return {
      redirect: {
        destination: link.original_url,
        permanent: false,
      },
    };
  } catch (error) {
    console.error('💥 Error in [slug].js:', error);
    return {
      notFound: true,
    };
  }
}

export default function RedirectToOriginal() {
  return null;
}
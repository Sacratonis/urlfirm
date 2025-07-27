// pages/[slug].js
import { findLinkBySlug } from '../lib/db';

export async function getServerSideProps(context) {
  const { slug } = context.params;

  try {
    const link = await findLinkBySlug(slug);

    if (!link) {
      return {
        notFound: true,
      };
    }

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

    return {
      redirect: {
        destination: link.original_url,
        permanent: false,
      },
    };
  } catch (error) {
    console.error('Error fetching link for slug:', slug, error);
    return {
      notFound: true,
    };
  }
}

export default function RedirectToOriginal() {
  return null;
}
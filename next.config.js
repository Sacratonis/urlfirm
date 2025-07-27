// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'vercel.app'], // Removed QR code API domain
  },
  env: {
    SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,       // Updated to match .env.local
    SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, // Updated to match .env.local and be more specific
  },
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Optional: Add more security headers like CSP, Referrer-Policy, etc.
          // {
          //   key: 'Strict-Transport-Security',
          //   value: 'max-age=63072000; includeSubDomains; preload',
          // },
          // {
          //   key: 'X-XSS-Protection', // Considered deprecated but can be added for older browsers
          //   value: '1; mode=block',
          // },
        ],
      },
    ];
  },
};

export default nextConfig;
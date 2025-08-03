// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // --- Image Optimization ---
  images: {
    // Update domains for production
    domains: [
      'localhost',
      'vercel.app',
      'www.urlfirm.com',  // Add your live domain
      'urlfirm.com',      // Also include non-www if used
    ],
    // Support modern formats for better SEO & performance
    formats: ['image/avif', 'image/webp'],
    // Optional: Set a default loader if you use external images later
    // loader: 'default',
  },

  // --- Security Headers (Keep your great work!) ---
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
            value: 'DENY', // Removed trailing space
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // --- CORS for API Routes (if needed) ---
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ];
  },

  // --- Optional: Trailing Slash (SEO-friendly) ---
  // trailingSlash: false, // Keep as is (clean URLs)

  // --- Environment Variables ---
  env: {
    // Removed trailing spaces
    SITE_URL: process.env.SITE_URL || 'https://www.urlfirm.com', 
  },

  // --- Internationalization (i18n) - Optional ---
  // If you ever expand to multiple languages
  // i18n: {
  //   locales: ['en-US'],
  //   defaultLocale: 'en-US',
  // },
};

export default nextConfig;
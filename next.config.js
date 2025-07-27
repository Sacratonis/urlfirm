// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // Removed 'api.qrserver.com' as QR code feature is removed
    domains: ['localhost', 'vercel.app'],
  },
  // Removed the `env` section to prevent potential confusion and rely on .env.local for NEXT_PUBLIC_ vars
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
        ],
      },
    ];
  },
};
export default nextConfig;
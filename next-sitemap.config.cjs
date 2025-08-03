// next-sitemap.config.cjs
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.urlfirm.com', // Removed trailing spaces
  generateRobotsTxt: true,

  // 🔥 Force flat sitemap — no index
  useSitemapIndex: false,

  // Exclude non-public routes from the *generated* sitemap
  exclude: [
    '/api/*',
    '/_next/*',
    '/static/*',
    '/deleted',
    '/expired',
  ],

  // Manually define which paths to include in the *generated* sitemap
  // Consider if /expired should really be here
  additionalPaths: async (config) => {
    return [
      await config.transform(config, '/'),
      // await config.transform(config, '/expired'), // Usually excluded
    ];
  },

  // Add sitemap to robots.txt
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/', '/deleted', '/expired'],
      },
    ],
    additionalSitemaps: ['https://www.urlfirm.com/sitemap.xml'], // Removed trailing spaces
  },

  transform: async (config, path) => {
    return {
      loc: path,
      changefreq: path === '/' ? 'daily' : 'weekly',
      priority: path === '/' ? 1 : 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
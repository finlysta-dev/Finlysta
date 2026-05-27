/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,

  trailingSlash: false,

  images: {
    domains: ['static.wixstatic.com'],
  },

  async redirects() {
    return [
      // =========================
      // WWW → NON-WWW
      // =========================
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.finlysta.com',
          },
        ],
        destination: 'https://finlysta.com/:path*',
        permanent: true,
      },

      // =========================
      // OLD LEARN URLS
      // =========================
      {
        source: '/learn/:path*',
        destination: '/learning-hub/:path*',
        permanent: true,
      },

      // =========================
      // OLD BLOG URLS
      // =========================
      {
        source: '/blog/:path*',
        destination: '/blogs/:path*',
        permanent: true,
      },

      // =========================
      // OLD FINANCE PATH
      // =========================
      {
        source:
          '/learning-hub/financial-statements/:path*',

        destination:
          '/learning-hub/finance-fundamentals/:path*',

        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // =========================
      // API CACHE CONTROL
      // =========================
      {
        source: '/api/:path*',

        headers: [
          {
            key: 'Cache-Control',
            value:
              'no-store, no-cache, must-revalidate, proxy-revalidate',
          },

          {
            key: 'Pragma',
            value: 'no-cache',
          },

          {
            key: 'Expires',
            value: '0',
          },

          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
        ],
      },

      // =========================
      // SECURITY HEADERS
      // =========================
      {
        source: '/:path*',

        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },

          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },

          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },

          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
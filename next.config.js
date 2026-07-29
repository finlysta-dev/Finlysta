/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  swcMinify: true, // ADDED
  compress: true, // ADDED

  images: {
    domains: ['static.wixstatic.com'],
    formats: ['image/avif', 'image/webp'], // ADDED
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
      // REMOVE DYNAMIC PARAMETERS (ADDED)
      // =========================
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_.*',
          },
        ],
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'ref',
          },
        ],
        destination: '/:path*',
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
        source: '/learning-hub/financial-statements/:path*',
        destination: '/learning-hub/finance-fundamentals/:path*',
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
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
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
      // CACHE STATIC ASSETS (ADDED)
      // =========================
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.(jpg|jpeg|png|webp|avif|svg|woff|woff2|ttf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400',
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
          {
            key: 'Content-Security-Policy', // ADDED
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://static.wixstatic.com; font-src 'self' data:; connect-src 'self' https://*.cloudflareinsights.com;",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
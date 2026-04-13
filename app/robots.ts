import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/auth/',
        '/profile/',
        '/dashboard/',
      ],
    },
    sitemap: 'https://www.tryinternify.in/sitemap.xml',
  }
}
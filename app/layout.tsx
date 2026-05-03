import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, lazy } from 'react';
import "./globals.css";
import Providers from "./providers";

// Lazy load non-critical components
const VisitorTracker = lazy(() => import("@/components/VisitorTracker"));

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://www.finlysta.com'),
  title: {
    default: 'Entry Level Financial Analyst Jobs & Internships | Finlysta',
    template: '%s | Finlysta'
  },
  description: 'Find entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.',
  keywords: 'entry level financial analyst jobs India, financial analyst internship for freshers, junior financial analyst jobs, finance internships India, finance jobs for freshers, FP&A analyst jobs, financial reporting analyst jobs, remote financial analyst jobs, finance internships with stipend, MBA finance fresher jobs',
  authors: [{ name: 'Finlysta' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.finlysta.com',
  },
  openGraph: {
    title: 'Entry Level Financial Analyst Jobs & Internships | Finlysta',
    description: 'Find entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.',
    url: 'https://www.finlysta.com',
    siteName: 'Finlysta',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://www.finlysta.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finlysta - Entry Level Financial Analyst Jobs & Internships',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Entry Level Financial Analyst Jobs & Internships | Finlysta',
    description: 'Find entry level financial analyst jobs and internships in India. Start your finance career. 100% free.',
    images: ['https://www.finlysta.com/og-image.png'], // ✅ Use same image
    creator: '@Finlysta',
    site: '@Finlysta',
  },
  category: 'finance',
  classification: 'Entry Level Financial Analyst Job Board',
  referrer: 'origin-when-cross-origin',
  creator: 'Finlysta',
  publisher: 'Finlysta Pvt. Ltd.',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Finlysta',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    google: 'BfRqajHG-sL52c0zcQaP_PCRfQ1ZJ3-6DmqeeeSC0bw',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get actual GA ID from environment variable
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-FINLYSTA01';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ✅ Preconnect with proper attributes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* ✅ DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* ✅ Preload only critical image */}
        <link 
          rel="preload" 
          href="/Finlysta.png" 
          as="image" 
          type="image/png"
          fetchPriority="high"
        />
        
        {/* ✅ REMOVED: Hardcoded CSS preload - Next.js handles this */}
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="revisit-after" content="7 days" />
        
        {/* ✅ REMOVED: Non-standard geo meta tags */}
        
        {/* ✅ Language meta */}
        <meta name="language" content="English" />
        
        {/* Favicon Icons - All formats */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* ✅ COMBINED: Single Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Finlysta",
              "url": "https://www.finlysta.com",
              "logo": "https://www.finlysta.com/Finlysta.png",
              "description": "Entry level financial analyst job board. Find paid internships and fresher jobs in financial analysis, corporate finance, and fintech.",
              "foundingDate": "2024",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/finlysta",
                "https://twitter.com/Finlysta"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "finlystahelp@gmail.com",
                "contactType": "customer support",
                "availableLanguage": ["English", "Hindi"],
                "responseTime": "PT24H"
              }
            })
          }}
        />
        
        {/* ✅ BreadcrumbList Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.finlysta.com"
                }
              ]
            })
          }}
        />
        
        {/* ✅ WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Finlysta",
              "url": "https://www.finlysta.com",
              "logo": "https://www.finlysta.com/Finlysta.png",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://www.finlysta.com/jobs?search={search_term}"
                },
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* ✅ REMOVED: Generic JobPosting schema - not appropriate for homepage */}
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <Suspense fallback={<div className="min-h-screen" />}>
            {children}
          </Suspense>
          
          <Suspense fallback={null}>
            <VisitorTracker />
          </Suspense>
        </Providers>
        
        {/* ✅ Google Analytics with environment variable */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_enhanced_conversions: true
              });
              
              // Track SPA navigation
              if (typeof window !== 'undefined') {
                const originalPushState = history.pushState;
                const originalReplaceState = history.replaceState;
                
                history.pushState = function() {
                  originalPushState.apply(this, arguments);
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                };
                
                history.replaceState = function() {
                  originalReplaceState.apply(this, arguments);
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                };
                
                window.addEventListener('popstate', function() {
                  gtag('config', '${gaId}', { page_path: window.location.pathname });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
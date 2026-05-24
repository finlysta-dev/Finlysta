import type { Metadata } from 'next';
import Script from 'next/script';
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
  metadataBase: new URL('https://finlysta.com'),
  title: {
    default: 'Finance Jobs, Internships, Learning & Career Growth | Finlysta',
    template: '%s | Finlysta'
  },
  description: 'Discover finance jobs, internships, interview preparation, and learning resources across Financial Analysis, Investment Banking, FP&A, Credit Analysis, Risk Analysis, and more.',
  keywords: [
    'finance jobs',
    'finance internships',
    'financial analyst jobs',
    'investment banking jobs',
    'FP&A analyst jobs',
    'credit analyst jobs',
    'risk analyst jobs',
    'article trainee jobs',
    'finance careers',
    'finance interview preparation',
    'finance learning',
    'entry level financial analyst jobs India',
    'financial analyst internship for freshers',
    'junior financial analyst jobs',
    'finance internships India',
    'finance jobs for freshers',
    'financial reporting analyst jobs',
    'remote financial analyst jobs',
    'finance internships with stipend',
    'MBA finance fresher jobs'
  ],
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
    canonical: 'https://finlysta.com',
  },
  openGraph: {
    title: 'Finance Jobs, Internships, Learning & Career Growth | Finlysta',
    description: 'Discover finance jobs, internships, interview preparation, and learning resources across Financial Analysis, Investment Banking, FP&A, Credit Analysis, Risk Analysis, and more.',
    url: 'https://finlysta.com',
    siteName: 'Finlysta',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://finlysta.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Finlysta - Finance Jobs, Internships, Learning & Career Growth Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finance Jobs, Internships, Learning & Career Growth | Finlysta',
    description: 'Discover finance jobs, internships, interview preparation, and learning resources. Launch your finance career today.',
    images: ['https://finlysta.com/og-image.png'],
    creator: '@Finlysta',
    site: '@Finlysta',
  },
  category: 'finance',
  classification: 'Finance Career Platform - Jobs, Internships, Learning & Interview Prep',
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
        
        {/* ❌ ALL duplicate/problematic meta tags REMOVED */}
        {/* Only keep referrer meta */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Favicon Icons - All formats */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* ✅ Organization Schema - Updated with correct founding date and broader description */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Finlysta",
              "alternateName": "Finlysta - Finance Career Platform",
              "url": "https://finlysta.com",
              "logo": "https://finlysta.com/Finlysta.png",
              "description": "Finance career platform helping students and freshers discover jobs, internships, learning resources, and interview preparation opportunities.",
              "foundingDate": "2024",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/finlysta",
                "https://twitter.com/Finlysta",
                "https://www.instagram.com/Finlysta.in/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "availableLanguage": ["English", "Hindi"],
                "responseTime": "PT24H",
                "url": "https://finlysta.com/contact"
              }
            })
          }}
        />
        
        {/* ✅ WebSite Schema - Updated for broader platform */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Finlysta",
              "alternateName": "Finance Jobs, Internships, Learning & Career Growth Platform",
              "url": "https://finlysta.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://finlysta.com/jobs?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* ❌ REMOVED: BreadcrumbList Schema (add to individual pages if needed) */}
        {/* ❌ REMOVED: SearchResultsPage Schema (belongs on /jobs page only) */}
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
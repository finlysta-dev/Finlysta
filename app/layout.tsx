import type { Metadata } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";
import Providers from "./providers";
import VisitorTracker from "@/components/VisitorTracker";

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
  title: 'Entry Level Financial Analyst Jobs & Internships | Finlysta - Start Your Finance Career',
  description: 'Find entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.',
  // ✅ FIXED: Reduced from 30+ to 15 high-quality keywords
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
    images: ['https://www.finlysta.com/twitter-image.png'],
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
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect and Preload */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" href="/Finlysta.png" as="image" type="image/png" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.amplitude.com" />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        
        {/* Favicon Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Organization Schema */}
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
              "foundingDate": "2026",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/finlysta/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "finlystahelp@gmail.com",
                "contactType": "customer support",
                "availableLanguage": ["English", "Hindi"],
                "responseTime": "PT24H"
              },
              "offers": {
                "@type": "Offer",
                "description": "Free entry level financial analyst job listings for students",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/OnlineOnly"
              }
            })
          }}
        />
        
        {/* WebSite Schema */}
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
                  "urlTemplate": "https://www.finlysta.com/entry-level-financial-analyst-jobs?search={search_term}&location={location}"
                },
                "query-input": "required name=search_term"
              }
            })
          }}
        />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Finlysta",
              "url": "https://www.finlysta.com",
              "logo": "https://www.finlysta.com/Finlysta.png",
              "description": "Entry level financial analyst job platform for freshers",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "priceRange": "₹0",
              "email": "finlystahelp@gmail.com"
            })
          }}
        />
        
        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to get a financial analyst job with no experience?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Start with financial analyst internships, build skills in Excel and financial modeling, get certifications, and apply to entry level positions on Finlysta."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What skills are required for entry level financial analyst jobs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Key skills include Excel, financial modeling, financial statement analysis, analytical thinking, and communication skills."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Finlysta free for job seekers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Finlysta is 100% free for students and freshers. You never pay to apply or find opportunities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How to get an internship in finance?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Apply through Finlysta, build a strong resume, learn Excel and financial modeling, and prepare for interview questions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which internship is best for finance students?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Investment banking, equity research, financial analysis, and fintech internships are popular choices for finance students."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          {children}
          <VisitorTracker />
        </Providers>
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-FINLYSTA01"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-FINLYSTA01', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_enhanced_conversions: true
              });
            `,
          }}
        />
      </body>
    </html>
  );
}
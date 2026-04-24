import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";
import VisitorTracker from "@/components/VisitorTracker";

export const viewport: Viewport = {
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
  title: 'Entry Level Financial Analyst Jobs & Internships 2026 | Finlysta - Start Your Finance Career',
  description: 'Find 2,400+ entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.',
  keywords: 'entry level financial analyst jobs, entry level financial analyst internships, financial analyst jobs for freshers, financial analyst internship for freshers, financial analyst fresher jobs, financial analyst entry level, junior financial analyst jobs, financial analyst no experience, financial analyst 0 experience, financial analyst graduate jobs, finance jobs for freshers, finance internship for students, finance fresher jobs, finance graduate jobs, entry level finance jobs, finance internship for freshers, paid finance internship, finance internship with stipend, financial analyst internship paid, financial analyst remote internship, financial analyst work from home, financial analyst jobs mumbai fresher, financial analyst jobs delhi fresher, financial analyst jobs bangalore fresher, financial analyst jobs hyderabad fresher, financial analyst jobs chennai fresher, financial analyst jobs pune fresher, financial analyst internship mumbai, financial analyst internship delhi, financial analyst internship bangalore, financial analyst internship hyderabad, financial analyst internship chennai, financial analyst internship pune, how to become a financial analyst, how to get a financial analyst job with no experience, financial analyst career path, financial analyst skills required, financial analyst salary for freshers, MBA finance fresher jobs, MBA finance internship, BCOM finance jobs, BBA finance jobs, CA fresher jobs, finance graduate jobs for freshers',
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
    title: 'Entry Level Financial Analyst Jobs & Internships 2026 | Finlysta - Start Your Finance Career',
    description: 'Find 2,400+ entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free for students.',
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
    title: 'Entry Level Financial Analyst Jobs & Internships 2026 | Finlysta',
    description: 'Find 2,400+ entry level financial analyst jobs and internships in India. Start your finance career with paid internships and fresher jobs. 100% free.',
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
    google: 'pFMAqcI7R1rA_0xWzK7w5zl79-8RvsnoPfa7lOIdEHA',
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
        
        {/* Additional SEO Keywords Meta - Only Entry Level */}
        <meta name="keywords" content="entry level financial analyst jobs, entry level financial analyst internships, financial analyst jobs for freshers, financial analyst internship for freshers, financial analyst fresher jobs, financial analyst entry level, junior financial analyst jobs, financial analyst no experience, financial analyst 0 experience, financial analyst graduate jobs, finance jobs for freshers, finance internship for students, finance fresher jobs, finance graduate jobs, entry level finance jobs, finance internship for freshers, paid finance internship, finance internship with stipend, financial analyst internship paid, financial analyst remote internship, financial analyst work from home, how to become a financial analyst, how to get a financial analyst job with no experience, financial analyst career path, financial analyst skills required, financial analyst salary for freshers, MBA finance fresher jobs, MBA finance internship, BCOM finance jobs, BBA finance jobs, CA fresher jobs" />
        
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
              "description": "India's #1 entry level financial analyst job board. Find paid internships and fresher jobs in financial analysis, corporate finance, and fintech.",
              "foundingDate": "2026",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/finlysta/",
                "https://www.instagram.com/finlysta/",
                "https://x.com/finlysta"
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
              "description": "India's fastest-growing entry level financial analyst job platform for freshers",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "priceRange": "₹0",
              "telephone": "+91-XXXXXXXXXX",
              "email": "finlystahelp@gmail.com"
            })
          }}
        />
        
        {/* JobPosting Schema for Entry Level */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": "Entry Level Financial Analyst Jobs & Internships",
              "description": "Browse 2,400+ entry level financial analyst jobs and internships across India. Perfect for freshers, graduates, and students starting their finance career.",
              "employmentType": ["FULL_TIME", "INTERN", "PART_TIME"],
              "experienceRequirements": "0-2 years",
              "experienceInPlaceOfEducation": false,
              "hiringOrganization": {
                "@type": "Organization",
                "name": "Finlysta",
                "sameAs": "https://www.finlysta.com"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "India"
                }
              },
              "skills": "Financial Analysis, Excel, Financial Modeling, SQL, Power BI, Communication Skills",
              "educationRequirements": "Bachelor's Degree in Finance, Accounting, Economics, BCOM, BBA, MBA Finance",
              "validThrough": "2026-12-31"
            })
          }}
        />
        
        {/* FAQ Schema - Focused on Entry Level */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How to get an entry level financial analyst job with no experience?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Start with financial analyst internships, build skills in Excel and financial modeling, get certifications, network with professionals, and apply to entry level positions on Finlysta. Many companies hire freshers for financial analyst roles."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What skills are required for entry level financial analyst jobs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Key skills for freshers include Excel, basic financial modeling, financial statement analysis, attention to detail, analytical thinking, and good communication skills."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the salary for entry level financial analyst in India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Entry level financial analyst salary in India ranges from ₹3-6 LPA. Internships typically offer ₹15,000-30,000 per month. Top companies may offer higher packages for freshers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Finlysta free for job seekers?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, Finlysta is 100% free for students and freshers. Companies pay to post jobs — you never pay to apply or find entry level financial analyst opportunities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How are entry level financial analyst jobs verified?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Every listing is manually reviewed — company confirmed, role checked for genuine entry level positions, links tested. No ghost jobs, no spam."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I find remote entry level financial analyst jobs?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Use the 'Remote' filter to find work-from-home entry level financial analyst roles and internships."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which companies hire freshers for financial analyst roles?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Top companies include Deloitte, EY, KPMG, PwC, Amazon, JP Morgan, Goldman Sachs, and many startups. Check Finlysta regularly for new entry level opportunities."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What qualifications do I need for a financial analyst internship?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bachelor's degree in Finance, BCOM, BBA, Economics, or MBA Finance students. Basic Excel knowledge is usually required."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
            {/* Visitor Tracker - Tracks page views and user sessions */}
            <VisitorTracker />
          </NotificationProvider>
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
              
              window.gtagEvent = function(eventName, eventParams = {}) {
                gtag('event', eventName, eventParams);
              };
            `,
          }}
        />
        
        {/* Amplitude Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://cdn.amplitude.com/libs/amplitude-8.21.0-min-gz.js"
        />
        <Script
          id="amplitude"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function initAmplitude() {
                  if (typeof amplitude !== 'undefined' && amplitude.init) {
                    try {
                      amplitude.init('finlysta_analytics_key', null, {
                        defaultTracking: {
                          pageViews: true,
                          sessions: true,
                          formInteractions: false,
                          fileDownloads: false,
                          linkClicks: false
                        },
                        logLevel: 'WARN',
                        optOut: false,
                        saveEvents: true,
                        includeUtm: true,
                        includeReferrer: true,
                        includeGclid: true
                      });
                    } catch (error) {
                      console.warn('Amplitude initialization error:', error);
                    }
                  } else {
                    setTimeout(initAmplitude, 1000);
                  }
                }
                
                if (document.readyState === 'complete') {
                  initAmplitude();
                } else {
                  window.addEventListener('load', initAmplitude);
                }
                
                window.trackEvent = function(eventName, eventProperties) {
                  if (typeof amplitude !== 'undefined' && amplitude.track) {
                    try {
                      amplitude.track(eventName, eventProperties);
                    } catch (error) {
                      console.warn('Amplitude track error:', error);
                    }
                  }
                };
                
                window.identifyUser = function(userId, userProperties) {
                  if (typeof amplitude !== 'undefined' && amplitude.setUserId) {
                    amplitude.setUserId(userId);
                    if (userProperties) {
                      amplitude.setUserProperties(userProperties);
                    }
                  }
                };
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
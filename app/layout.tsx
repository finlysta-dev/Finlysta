import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";

// Separate Viewport export (required in Next.js 14+)
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
  title: 'Internify: Find Verified Internships in India 2026 | 100% Free',
  description: 'Hand-picked, manually verified internships from real companies. No spam, no ghost listings. Frontend, Data Analyst, Marketing & more. 50-75 new internships daily. Free for students.',
  keywords: 'internships in India, student internships, fresher jobs, remote internships, summer internships 2026, verified internships, paid internships, internship portal',
  authors: [{ name: 'Internify' }],
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
    canonical: 'https://tryinternify.in',
  },
  openGraph: {
    title: 'Internify: Find Verified Internships in India 2026 | 100% Free',
    description: 'Hand-picked, manually verified internships from real companies. 100% free for students. Apply in under 30 seconds.',
    url: 'https://tryinternify.in',
    siteName: 'Internify',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: 'https://tryinternify.in/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Internify - Verified Internships for Students',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internify: Find Verified Internships in India 2026 | 100% Free',
    description: 'Hand-picked, manually verified internships from real companies. 100% free. Apply in under 30 seconds.',
    images: ['https://tryinternify.in/twitter-image.png'],
    creator: '@internify83656',
    site: '@internify83656',
  },
  // verification removed - not needed for domain property
  category: 'education',
  classification: 'Internship Portal',
  referrer: 'origin-when-cross-origin',
  creator: 'Internify',
  publisher: 'Internify Pvt. Ltd.',
  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Internify',
    statusBarStyle: 'black-translucent',
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
        {/* PERFORMANCE: Preconnect for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* PERFORMANCE: Preload Critical Assets */}
        <link rel="preload" href="/Internify.png" as="image" type="image/png" />
        
        {/* PERFORMANCE: DNS Prefetch for analytics */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://cdn.amplitude.com" />
        
        {/* SECURITY: Content Security Policy (adjust for your needs) */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* iOS detection fix - prevents iOS from auto-converting text to links */}
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* PWA: Mobile app capabilities */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* ORGANIZATION SCHEMA (Main Schema) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Internify",
              "url": "https://tryinternify.in",
              "logo": "https://tryinternify.in/Internify.png",
              "description": "Free internship platform connecting students with manually verified internships. 50-75 new listings daily across 24+ domains.",
              "foundingDate": "2026",
              "foundingLocation": "India",
              "areaServed": "India",
              "sameAs": [
                "https://www.linkedin.com/company/join-internify/",
                "https://www.instagram.com/internify.in/",
                "https://x.com/internify83656"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "internifyhelp@gmail.com",
                "contactType": "customer support",
                "availableLanguage": ["English", "Hindi"],
                "responseTime": "PT24H"
              },
              "offers": {
                "@type": "Offer",
                "description": "Free internship listings for students",
                "price": "0",
                "priceCurrency": "INR",
                "availability": "https://schema.org/OnlineOnly"
              }
            })
          }}
        />
        
        {/* WEBSITE SCHEMA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Internify",
              "url": "https://tryinternify.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://tryinternify.in/internships?search={search_term}&location={location}"
                },
                "query-input": "required name=search_term"
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
          </NotificationProvider>
        </Providers>
        
        {/* GOOGLE ANALYTICS - Optimized loading */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-CZM79LK7MR"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZM79LK7MR', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_enhanced_conversions: true
              });
              
              // Custom event tracking helper
              window.gtagEvent = function(eventName, eventParams = {}) {
                gtag('event', eventName, eventParams);
              };
            `,
          }}
        />
        
        {/* AMPLITUDE - Lazy loaded */}
        <Script
          strategy="lazyOnload"
          src="https://cdn.amplitude.com/libs/amplitude-8.21.0-min.gz.js"
        />
        <Script
          id="amplitude"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Initialize Amplitude with error handling
                function initAmplitude() {
                  if (typeof amplitude !== 'undefined' && amplitude.init) {
                    try {
                      amplitude.init('c66e28122c6cfea9315d9422db79a9d5', null, {
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
                      console.log('Amplitude initialized successfully');
                    } catch (error) {
                      console.warn('Amplitude initialization error:', error);
                    }
                  } else {
                    // Retry after a delay if amplitude not available
                    setTimeout(initAmplitude, 1000);
                  }
                }
                
                // Start initialization
                if (document.readyState === 'complete') {
                  initAmplitude();
                } else {
                  window.addEventListener('load', initAmplitude);
                }
                
                // Track custom events helper
                window.trackEvent = function(eventName, eventProperties) {
                  if (typeof amplitude !== 'undefined' && amplitude.track) {
                    try {
                      amplitude.track(eventName, eventProperties);
                    } catch (error) {
                      console.warn('Amplitude track error:', error);
                    }
                  }
                };
                
                // Identify user when logged in (to be called from auth)
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
        
        {/* COOKIE CONSENT BANNER - GDPR compliance */}
        <Script
          id="cookie-consent"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (!localStorage.getItem('cookieConsent')) {
                  // Create cookie banner
                  const banner = document.createElement('div');
                  banner.id = 'cookie-consent-banner';
                  banner.style.cssText = \`
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: #1f2937;
                    color: white;
                    padding: 16px;
                    z-index: 1000;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 16px;
                    font-family: system-ui, -apple-system, sans-serif;
                    box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.1);
                  \`;
                  banner.innerHTML = \`
                    <div style="flex: 1; font-size: 14px;">
                      🍪 We use cookies to improve your experience. By using Internify, you accept our 
                      <a href="/privacy" style="color: #60a5fa; text-decoration: underline;">Privacy Policy</a>.
                    </div>
                    <div style="display: flex; gap: 12px;">
                      <button id="accept-cookies" style="background: #2563eb; color: white; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer; font-weight: 600;">Accept</button>
                      <button id="decline-cookies" style="background: #374151; color: white; border: none; padding: 8px 20px; border-radius: 8px; cursor: pointer;">Decline</button>
                    </div>
                  \`;
                  document.body.appendChild(banner);
                  
                  document.getElementById('accept-cookies').addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'accepted');
                    banner.remove();
                    // Enable analytics after consent
                    if (typeof gtag !== 'undefined') {
                      gtag('consent', 'update', {
                        'analytics_storage': 'granted'
                      });
                    }
                  });
                  
                  document.getElementById('decline-cookies').addEventListener('click', () => {
                    localStorage.setItem('cookieConsent', 'declined');
                    banner.remove();
                    // Disable analytics after decline
                    if (typeof gtag !== 'undefined') {
                      gtag('consent', 'update', {
                        'analytics_storage': 'denied'
                      });
                    }
                  });
                }
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
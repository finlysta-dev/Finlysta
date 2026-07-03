import type { Metadata } from "next";
import Script from "next/script";
import { Suspense, lazy } from "react";
import "./globals.css";
import Providers from "./providers";
import AmplitudeProvider from "./AmplitudeProvider";

// Lazy load non-critical components
const VisitorTracker = lazy(() => import("@/components/VisitorTracker"));

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://finlysta.com/"),

  title: {
    default: "Finlysta - Finance Jobs, Internships & Career Platform for Freshers",
    template: "%s | Finlysta - Finance Career Platform",
  },

  description:
    "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",

  keywords: [
    "finance jobs",
    "finance internships",
    "financial analyst jobs",
    "finance careers",
    "finance interview prep",
    "finance learning",
    "finance roadmap",
    "entry level finance jobs",
    "fresher finance jobs India",
    "accounting jobs for freshers",
    "finance graduate jobs",
    "finance career guidance",
    "finance skill development",
  ],

  authors: [{ name: "Finlysta" }],

  creator: "Finlysta",

  publisher: "Finlysta Pvt. Ltd.",

  applicationName: "Finlysta",

  category: "finance",

  classification: "Finance Career Platform",

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://finlysta.com",
  },

  formatDetection: {
    email: true,
    address: false,
    telephone: true,
  },

  manifest: "/site.webmanifest",

  appleWebApp: {
    capable: true,
    title: "Finlysta",
    statusBarStyle: "black-translucent",
  },

  verification: {
    google: "BfRqajHG-sL52c0zcQaP_PCRfQ1ZJ3-6DmqeeeSC0bw",
  },

  openGraph: {
    title: "Finlysta - Finance Jobs, Internships & Career Platform for Freshers",
    description:
      "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
    url: "https://finlysta.com",
    siteName: "Finlysta",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finlysta - Finance Jobs, Internships & Career Platform for Freshers",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Finlysta - Finance Jobs, Internships & Career Platform for Freshers",
    description:
      "Find entry-level finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers in India.",
    images: ["https://finlysta.com/og-image.png"],
    creator: "@Finlysta",
    site: "@Finlysta",
  },

  // Additional SEO improvements
  other: {
    "geo.region": "IN-OR",
    "geo.placename": "Bhubaneswar",
    "geo.position": "20.2961;85.8245",
    "ICBM": "20.2961, 85.8245",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google Analytics ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-FMF7M4ZRVL";
  // Amplitude API Key
  const amplitudeApiKey = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* ============================================
            PERFORMANCE OPTIMIZATIONS
            ============================================ */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Preload Critical Assets */}
        <link
          rel="preload"
          href="/Finlysta.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />

        {/* ============================================
            LLMS.TXT - For AI Crawlers
            ============================================ */}
        <link rel="llms" href="/llms.txt" />

        {/* ============================================
            SEO META TAGS
            ============================================ */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="theme-color" content="#2563EB" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* ============================================
            FAVICONS
            ============================================ */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* ============================================
            SCHEMA MARKUP - ENHANCED FOR SEO
            ============================================ */}

        {/* 1. Organization Schema - Complete with Address & Social */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Finlysta",
              alternateName: "Finlysta - Finance Career Platform",
              url: "https://finlysta.com",
              logo: "https://finlysta.com/Finlysta.png",
              description:
                "Finance career platform helping students and freshers discover jobs, internships, learning resources, and interview preparation opportunities.",
              foundingDate: "2026",
              foundingLocation: "India",
              areaServed: "India",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Finance District",
                addressLocality: "Bhubaneswar",
                addressRegion: "Odisha",
                postalCode: "751001",
                addressCountry: "IN",
              },
              sameAs: [
                "https://www.linkedin.com/company/finlysta",
                "https://twitter.com/Finlysta",
                "https://www.instagram.com/Finlysta.in/",
                "https://facebook.com/finlysta",
                "https://youtube.com/@finlysta",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "support@finlysta.com",
                availableLanguage: ["English", "Hindi"],
                responseTime: "PT24H",
                url: "https://finlysta.com/contact",
              },
            }),
          }}
        />

        {/* 2. LocalBusiness Schema - For Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Finlysta",
              description:
                "Finance career platform helping students and freshers discover jobs, internships, learning resources, and interview preparation opportunities.",
              url: "https://finlysta.com",
              logo: "https://finlysta.com/Finlysta.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Finance District",
                addressLocality: "Bhubaneswar",
                addressRegion: "Odisha",
                postalCode: "751001",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "20.2961",
                longitude: "85.8245",
              },
              areaServed: "IN",
              priceRange: "₹",
              openingHours: "Mo-Fr 09:00-18:00",
              sameAs: [
                "https://www.linkedin.com/company/finlysta",
                "https://twitter.com/Finlysta",
                "https://www.instagram.com/Finlysta.in/",
                "https://facebook.com/finlysta",
                "https://youtube.com/@finlysta",
              ],
            }),
          }}
        />

        {/* 3. Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Finlysta",
              alternateName: "Finance Jobs, Internships & Career Platform",
              url: "https://finlysta.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://finlysta.com/jobs?search={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* 4. Breadcrumb Schema - Helps with search result display */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://finlysta.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Finance Jobs",
                  item: "https://finlysta.com/jobs",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Internships",
                  item: "https://finlysta.com/internships",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Learning Hub",
                  item: "https://finlysta.com/learning-hub",
                },
              ],
            }),
          }}
        />

        {/* 5. Navigation Schema - Improved with complete structure */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "SiteNavigationElement",
                  position: 1,
                  name: "Jobs",
                  url: "https://finlysta.com/jobs",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 2,
                  name: "Internships",
                  url: "https://finlysta.com/internships",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 3,
                  name: "Roadmap",
                  url: "https://finlysta.com/roadmap",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 4,
                  name: "Learning Hub",
                  url: "https://finlysta.com/learning-hub",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 5,
                  name: "Interview Prep",
                  url: "https://finlysta.com/interview-prep",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 6,
                  name: "Blogs",
                  url: "https://finlysta.com/blogs",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 7,
                  name: "About",
                  url: "https://finlysta.com/about",
                },
                {
                  "@type": "SiteNavigationElement",
                  position: 8,
                  name: "Contact",
                  url: "https://finlysta.com/contact",
                },
              ],
            }),
          }}
        />

        {/* 6. JobPosting Schema - For job listings (add dynamically on job pages) */}
        {/* This should be added on individual job pages, not globally */}
      </head>

      <body suppressHydrationWarning>
        <Providers>
          <Suspense fallback={<div className="min-h-screen" />}>
            <AmplitudeProvider>
              {children}
            </AmplitudeProvider>
          </Suspense>

          <Suspense fallback={null}>
            <VisitorTracker />
          </Suspense>
        </Providers>

        {/* ============================================
            GOOGLE ANALYTICS - ENHANCED
            ============================================ */}
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

              function gtag() {
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config', '${gaId}', {
                page_path: window.location.pathname,
                send_page_view: true,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_enhanced_conversions: true,
                linker: {
                  domains: ['finlysta.com']
                }
              });

              // Track all page views including SPA navigation
              if (typeof window !== 'undefined') {
                const originalPushState = history.pushState;
                const originalReplaceState = history.replaceState;

                history.pushState = function () {
                  originalPushState.apply(this, arguments);
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname + window.location.search
                  });
                };

                history.replaceState = function () {
                  originalReplaceState.apply(this, arguments);
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname + window.location.search
                  });
                };

                window.addEventListener('popstate', function () {
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname + window.location.search
                  });
                });
              }

              // Track outbound link clicks
              document.addEventListener('click', function(e) {
                const target = e.target.closest('a');
                if (target && target.href && !target.href.startsWith(window.location.origin)) {
                  gtag('event', 'click', {
                    event_category: 'outbound',
                    event_label: target.href,
                    transport_type: 'beacon'
                  });
                }
              });
            `,
          }}
        />

        {/* ============================================
            AMPLITUDE ANALYTICS
            ============================================ */}
        {amplitudeApiKey && (
          <Script
            id="amplitude-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // Amplitude is initialized in the client component
                console.log('Amplitude script loaded');
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
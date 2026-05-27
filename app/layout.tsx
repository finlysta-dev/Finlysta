import type { Metadata } from "next";
import Script from "next/script";
import { Suspense, lazy } from "react";
import "./globals.css";
import Providers from "./providers";

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
    default: "Finlysta - Finance Jobs, Internships & Career Platform",
    template: "%s | Finlysta",
  },

  description:
    "Discover finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers.",

  keywords: [
    "finance jobs",
    "finance internships",
    "financial analyst jobs",
    "finance careers",
    "finance interview prep",
    "finance learning",
    "finance roadmap",
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
    title: "Finlysta - Finance Jobs, Internships & Career Platform",

    description:
      "Discover finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers.",

    url: "https://finlysta.com",

    siteName: "Finlysta",

    locale: "en_IN",

    type: "website",

    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finlysta - Finance Jobs, Internships & Career Platform",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "Finlysta - Finance Jobs, Internships & Career Platform",

    description:
      "Discover finance jobs, internships, career roadmaps, interview preparation, and learning resources for finance students and freshers.",

    images: ["https://finlysta.com/og-image.png"],

    creator: "@Finlysta",

    site: "@Finlysta",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Google Analytics ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-FMF7M4ZRVL";

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        {/* Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
        />

        <link
          rel="dns-prefetch"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="dns-prefetch"
          href="https://fonts.gstatic.com"
        />

        <link
          rel="dns-prefetch"
          href="https://www.google-analytics.com"
        />

        {/* Preload Logo */}
        <link
          rel="preload"
          href="/Finlysta.png"
          as="image"
          type="image/png"
          fetchPriority="high"
        />

        {/* Referrer */}
        <meta
          name="referrer"
          content="strict-origin-when-cross-origin"
        />

        {/* Favicons */}
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

        <link
          rel="icon"
          href="/favicon.ico"
          sizes="any"
        />

        <link
          rel="icon"
          href="/icon.svg"
          type="image/svg+xml"
        />

        <link rel="manifest" href="/site.webmanifest" />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "Organization",

              name: "Finlysta",

              alternateName:
                "Finlysta - Finance Career Platform",

              url: "https://finlysta.com",

              logo: "https://finlysta.com/Finlysta.png",

              description:
                "Finance career platform helping students and freshers discover jobs, internships, learning resources, and interview preparation opportunities.",

              foundingDate: "2026",

              foundingLocation: "India",

              areaServed: "India",

              sameAs: [
                "https://www.linkedin.com/company/finlysta",
                "https://twitter.com/Finlysta",
                "https://www.instagram.com/Finlysta.in/",
              ],

              contactPoint: {
                "@type": "ContactPoint",

                contactType: "customer support",

                availableLanguage: ["English", "Hindi"],

                responseTime: "PT24H",

                url: "https://finlysta.com/contact",
              },
            }),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",

              "@type": "WebSite",

              name: "Finlysta",

              alternateName:
                "Finance Jobs, Internships & Career Platform",

              url: "https://finlysta.com",
            }),
          }}
        />

        {/* Navigation Schema */}
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
              ],
            }),
          }}
        />
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

        {/* Google Analytics */}
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
                allow_enhanced_conversions: true
              });

              if (typeof window !== 'undefined') {
                const originalPushState = history.pushState;
                const originalReplaceState = history.replaceState;

                history.pushState = function () {
                  originalPushState.apply(this, arguments);

                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname
                  });
                };

                history.replaceState = function () {
                  originalReplaceState.apply(this, arguments);

                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname
                  });
                };

                window.addEventListener('popstate', function () {
                  gtag('config', '${gaId}', {
                    page_path: window.location.pathname
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}

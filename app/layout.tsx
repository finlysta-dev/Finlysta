import type { Metadata } from "next";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://finlysta.com"),
  title: {
    default: "Finlysta | Excel Practice & Interview Preparation",
    template: "%s | Finlysta",
  },
  description:
    "Practice Excel, finance and analytical skills through realistic challenges, assessments and interview questions for students, freshers and entry-level professionals.",
  keywords: [
    "Excel practice",
    "Excel interview questions",
    "Excel assessment test",
    "Advanced Excel practice",
    "Excel interview questions for freshers",
    "financial analyst Excel",
    "finance interview preparation",
    "Excel practical test",
    "VLOOKUP practice",
    "Pivot Tables practice",
    "Excel for beginners",
    "Excel skills test",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Finlysta | Practice Skills. Get Interview Ready.",
    description:
      "Practice Excel, finance and analytical skills through realistic challenges and interview preparation.",
    url: "https://finlysta.com",
    siteName: "Finlysta",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finlysta - Excel Practice Online & Interview Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finlysta | Practice Skills. Get Interview Ready.",
    description:
      "Practice Excel, finance and analytical skills through realistic challenges and interview preparation.",
    images: ["/og-image.png"],
  },
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
  verification: {
    google: "BfRqajHG-sL52c0zcQaP_PCRfQ1ZJ3-6DmqeeeSC0bw",
  },
  authors: [{ name: "Finlysta" }],
  category: "Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // JSON-LD structured data for better SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Finlysta",
    "url": "https://finlysta.com",
    "logo": "https://finlysta.com/Finlysta.png",
    "description": "Practice Excel, finance and analytical skills through realistic challenges, assessments and interview questions for students, freshers and entry-level professionals.",
    "sameAs": [],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Support",
      "email": "support@finlysta.com",
      "url": "https://finlysta.com/contact"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Finlysta",
    "url": "https://finlysta.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://finlysta.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* Google Search Console verification */}
        <meta name="google-site-verification" content="BfRqajHG-sL52c0zcQaP_PCRfQ1ZJ3-6DmqeeeSC0bw" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

        {/* Viewport - Only ONE viewport tag */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="theme-color" content="#2563eb" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased">
        {children}
        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-FMF7M4ZRVL" />
      </body>
    </html>
  );
}
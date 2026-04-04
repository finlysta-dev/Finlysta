import type { Metadata } from 'next';
import Script from 'next/script';
import "./globals.css";
import Providers from "./providers";
import BanWatcher from "@/components/BanWatcher";
import { NotificationProvider } from "@/context/NotificationContext";

export const metadata: Metadata = {
  title: 'Internify: Find Verified Internships in India 2026 | 100% Free',
  description: 'Hand-picked, verified internships from real companies. No spam, no ghost listings. Frontend, Data Analyst, Marketing & more. Free internship portal for students.',
  keywords: 'internships in India, student internships, fresher jobs, remote internships, summer internships 2026, verified internships',
  authors: [{ name: 'Internify' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://tryinternify.in',
  },
  openGraph: {
    title: 'Internify: Find Verified Internships in India 2026',
    description: 'Hand-picked, verified internships from real companies. 100% free.',
    url: 'https://tryinternify.in',
    siteName: 'Internify',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Internify: Find Verified Internships in India 2026',
    description: 'Hand-picked, verified internships from real companies. 100% free.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* 
          PERFORMANCE OPTIMIZATION 1: Preconnect
          Establishes early connections to critical third-party origins.
        */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* 
          PERFORMANCE OPTIMIZATION 2: Preload Critical Assets
          Tells the browser to download your logo immediately as it's above the fold.
        */}
        <link rel="preload" href="/Internify.png" as="image" type="image/webp" />
        
        {/* JSON-LD Schema for SEO (Does not impact performance score) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Internify",
              "url": "https://tryinternify.in",
              "logo": "https://tryinternify.in/Internify.png",
              "sameAs": [
                "https://www.linkedin.com/company/join-internify/",
                "https://www.instagram.com/internify.in/",
                "https://x.com/internify83656"
              ]
            })
          }}
        />
      </head>
      <body>
        <Providers>
          <NotificationProvider>
            <BanWatcher />
            {children}
          </NotificationProvider>
        </Providers>
        
        {/* 
          PERFORMANCE OPTIMIZATION 3: Defer Non-Critical JavaScript
          'strategy="lazyOnload"' moves Google Analytics to load *after* your page is interactive.
          This directly fixes the "render-blocking requests" issue in Lighthouse.
        */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-CZM79LK7MR"
        />
        <Script
          id="google-analytics"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CZM79LK7MR');
            `,
          }}
        />
      </body>
    </html>
  );
}
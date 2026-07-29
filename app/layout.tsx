// app/layout.tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/app/providers/AuthProvider"
import { NextAuthSessionProvider } from "@/app/providers/SessionProvider"
import GoogleAnalytics from "@/app/components/GoogleAnalytics"
import ClientOnly from "@/components/ClientOnly"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://finlysta.com"),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: "Finlysta – Finance Jobs & Internships for Freshers in India",
    template: "%s | Finlysta",
  },
  description:
    "Find Finance Jobs, Finance Internships, Financial Analyst Jobs, Accounting Jobs, Articleships, Interview Preparation, and Career Resources for Finance Students and Freshers in India.",
  keywords: [
    "finance jobs",
    "finance internships",
    "entry level finance",
    "finance freshers",
    "financial analyst jobs India",
    "finance career",
    "finlysta",
    "accounting jobs",
    "articleship",
    "finance interview preparation",
  ],
  authors: [
    {
      name: "Finlysta",
      url: "https://finlysta.com",
    },
  ],
  category: "Finance",
  applicationName: "Finlysta",
  openGraph: {
    siteName: "Finlysta",
    locale: "en_IN",
    type: "website",
    url: "https://finlysta.com",
    title: "Finlysta – Finance Jobs & Internships for Freshers in India",
    description:
      "Find Finance Jobs, Finance Internships, Financial Analyst Jobs, Accounting Jobs, Articleships, Interview Preparation, and Career Resources for Finance Students and Freshers in India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finlysta - Finance Jobs & Internships for Freshers in India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Finlysta",
    creator: "@Finlysta",
    title: "Finlysta – Finance Jobs & Internships for Freshers in India",
    description:
      "Find Finance Jobs, Finance Internships, Financial Analyst Jobs, Accounting Jobs, Articleships, Interview Preparation, and Career Resources for Finance Students and Freshers in India.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://finlysta.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <NextAuthSessionProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  )
}
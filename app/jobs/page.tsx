// app/jobs/page.tsx
import type { Metadata } from "next";
import FinlystaUI from "./FinlystaUI";

export const metadata: Metadata = {
  title: "Entry-Level Finance Jobs in India",  // template appends "| Finlysta" automatically
  description:
    "Browse verified entry-level finance jobs in India. Financial analyst, accounting, audit, MIS, and banking roles for freshers with 0–2 years experience.",
  keywords: [
    "finance jobs India",
    "entry level finance jobs",
    "fresher finance jobs",
    "financial analyst jobs freshers",
    "accounting jobs India",
    "audit jobs freshers",
    "MIS analyst jobs",
    "finance jobs 0 experience",
  ],
  alternates: { canonical: "https://finlysta.com/jobs" },
  openGraph: {
    title: "Entry-Level Finance Jobs in India | Finlysta",
    description:
      "Browse verified entry-level finance jobs in India. Financial analyst, accounting, audit, MIS, and banking roles for freshers with 0–2 years experience.",
    url: "https://finlysta.com/jobs",
    siteName: "Finlysta",
    images: [{ url: "/Finlysta.png", width: 1200, height: 630, alt: "Finance Jobs for Freshers – Finlysta" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Entry-Level Finance Jobs in India | Finlysta",
    description:
      "Browse verified entry-level finance jobs in India for freshers. Financial analyst, accounting, audit and more.",
    images: ["/Finlysta.png"],
    site: "@Finlysta",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function JobsPage() {
  return <FinlystaUI />;
}
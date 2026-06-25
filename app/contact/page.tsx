import type { Metadata } from "next";
import ContactFormClient from "./ContactFormClient";

// ✅ METADATA ADDED HERE - Server Component can export metadata
export const metadata: Metadata = {
  title: "Contact Finlysta - Support & Career Queries",
  description:
    "Get in touch with the Finlysta team for support, job-related queries, internship assistance, partnerships, or career guidance. We're here to help you build your finance career.",
  keywords: [
    "contact finlysta",
    "finance career support",
    "internship help",
    "finance jobs query",
    "finlysta support",
  ],
  openGraph: {
    title: "Contact Finlysta - Support & Career Queries",
    description:
      "Get in touch with the Finlysta team for support, job-related queries, internship assistance, partnerships, or career guidance.",
    url: "https://finlysta.com/contact",
    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Finlysta - Support & Career Queries",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Finlysta - Support & Career Queries",
    description:
      "Get in touch with the Finlysta team for support, job-related queries, internship assistance, partnerships, or career guidance.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function ContactPage() {
  return <ContactFormClient />;
}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Free Finance Templates - Resume, Excel & More",
  description:
    "Download free finance templates — resumes, cover letters, Excel financial models, and career tools built for finance students and freshers in India.",
  keywords: [
    "finance resume template",
    "finance excel templates",
    "free finance templates",
    "finance cover letter template",
  ],
  alternates: { canonical: "https://finlysta.com/templates" },
  openGraph: {
    title: "Free Finance Templates - Resume, Excel & More | Finlysta",
    description:
      "Download free finance templates — resumes, cover letters, Excel financial models, and career tools.",
    url: "https://finlysta.com/templates",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Finance Templates - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Finance Templates - Resume, Excel & More | Finlysta",
    description: "Download free finance templates and career tools.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function TemplatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

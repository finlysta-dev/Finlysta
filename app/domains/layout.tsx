import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Finance Domains & Career Guide",
  description:
    "Explore finance career domains — investment banking, financial analysis, accounting, taxation, and more. Understand each path and find the right fit for your finance career.",
  keywords: [
    "finance domains",
    "finance career guide",
    "investment banking career",
    "financial analysis career",
    "accounting career path",
  ],
  alternates: { canonical: "https://finlysta.com/domains" },
  openGraph: {
    title: "Finance Domains & Career Guide | Finlysta",
    description:
      "Explore finance career domains — investment banking, financial analysis, accounting, taxation, and more.",
    url: "https://finlysta.com/domains",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Finance Domains - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Domains & Career Guide | Finlysta",
    description: "Explore finance career domains and find the right fit for your career.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function DomainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

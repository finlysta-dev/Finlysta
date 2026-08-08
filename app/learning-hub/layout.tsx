import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Learning Hub - Free Finance & Excel Courses for Freshers",
  description:
    "Learn finance fundamentals and advanced Excel for free — balance sheets, cash flow, financial ratios, VLOOKUP, and more. Built for finance students and freshers in India.",
  keywords: [
    "learn finance online",
    "finance fundamentals course",
    "excel for finance",
    "vlookup tutorial",
    "financial ratios explained",
    "free finance course india",
  ],
  alternates: { canonical: "https://finlysta.com/learning-hub" },
  openGraph: {
    title: "Learning Hub - Free Finance & Excel Courses for Freshers | Finlysta",
    description:
      "Learn finance fundamentals and advanced Excel for free — built for finance students and freshers in India.",
    url: "https://finlysta.com/learning-hub",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Learning Hub - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning Hub - Free Finance & Excel Courses for Freshers | Finlysta",
    description: "Learn finance fundamentals and advanced Excel for free.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function LearningHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

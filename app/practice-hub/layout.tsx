import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Practice Hub - Finance Interview Questions & Case Studies",
  description:
    "Sharpen your finance skills with practice questions, case studies, and mock exercises covering accounting, financial modeling, and interview scenarios for freshers.",
  keywords: [
    "finance practice questions",
    "finance case studies",
    "accounting practice",
    "financial modeling practice",
    "finance interview practice",
  ],
  alternates: { canonical: "https://finlysta.com/practice-hub" },
  openGraph: {
    title: "Practice Hub - Finance Interview Questions & Case Studies | Finlysta",
    description:
      "Sharpen your finance skills with practice questions, case studies, and mock exercises for freshers.",
    url: "https://finlysta.com/practice-hub",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Practice Hub - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Practice Hub - Finance Interview Questions & Case Studies | Finlysta",
    description: "Sharpen your finance skills with practice questions and case studies for freshers.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function PracticeHubLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Finance Internships for Students & Freshers in India",
  description:
    "Browse verified finance internships in India — accounting, financial analysis, articleship, and CA internships. Remote, hybrid, and on-site roles updated daily. Apply free.",
  keywords: [
    "finance internships india",
    "accounting internships",
    "articleship internship",
    "ca internship",
    "financial analyst internship",
    "internships for finance students",
  ],
  alternates: { canonical: "https://finlysta.com/internships" },
  openGraph: {
    title: "Finance Internships for Students & Freshers in India | Finlysta",
    description:
      "Browse verified finance internships in India — accounting, financial analysis, articleship, and CA internships. Updated daily.",
    url: "https://finlysta.com/internships",
    images: [
      {
        url: "https://finlysta.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Finance Internships in India - Finlysta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Internships for Students & Freshers in India | Finlysta",
    description:
      "Browse verified finance internships in India — accounting, financial analysis, articleship, and CA internships.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function InternshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

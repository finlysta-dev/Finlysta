import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Roadmap to Become a Financial Analyst",
  description:
    "A step-by-step roadmap to becoming a financial analyst in India — skills, tools, certifications, and career progression explained for freshers.",
  keywords: [
    "financial analyst roadmap",
    "how to become financial analyst",
    "finance career roadmap india",
  ],
  alternates: { canonical: "https://finlysta.com/roadmap" },
  openGraph: {
    title: "Roadmap to Become a Financial Analyst | Finlysta",
    description:
      "A step-by-step roadmap to becoming a financial analyst in India — skills, tools, certifications, and career progression.",
    url: "https://finlysta.com/roadmap",
    images: [
      { url: "https://finlysta.com/og-image.png", width: 1200, height: 630, alt: "Financial Analyst Roadmap - Finlysta" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roadmap to Become a Financial Analyst | Finlysta",
    description: "A step-by-step roadmap to becoming a financial analyst in India.",
    images: ["https://finlysta.com/og-image.png"],
  },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
